// Calls an LLM (via OpenRouter, OpenAI-compatible) with the strategist system
// prompt and returns the parsed blueprint object, plus a flattened
// { "section.key": value } map ready for Google Docs find-and-replace.

import { buildSystemPrompt } from "./prompt";

const DEFAULT_MODEL = "z-ai/glm-5.2";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Free models are slow and flaky: they can hang, return empty content, hit 429,
// or emit invalid JSON. So each generation is retried a few times, optionally
// across fallback models, with a hard per-attempt timeout.
const PER_ATTEMPT_TIMEOUT_MS = Number(
  process.env.BLUEPRINT_ATTEMPT_TIMEOUT_MS || 75000
);
const MAX_ATTEMPTS_PER_MODEL = Number(process.env.BLUEPRINT_MAX_ATTEMPTS || 3);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Pull the first balanced JSON object out of the response, tolerating stray
// code fences or prose even though the prompt asks for none.
function extractJson(text) {
  let s = text.trim();
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in model response.");
  }
  return JSON.parse(s.slice(start, end + 1));
}

// Walk the nested object into dotted leaf paths: executive_summary.callout, etc.
export function flattenBlueprint(obj, prefix = "") {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flattenBlueprint(value, path));
    } else {
      out[path] = value == null ? "" : String(value);
    }
  }
  return out;
}

// One model call. Throws with a `.retryable` flag so the caller knows whether
// another attempt is worth making.
async function callModel({ apiKey, model, system }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PER_ATTEMPT_TIMEOUT_MS);
  let res;
  try {
    res = await fetch(OPENROUTER_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // A real User-Agent avoids WAF "security policy" blocks on some hosts.
        "User-Agent": "PolarisOrigin/1.0 (+https://polarisorigin.com)",
        // Optional attribution headers OpenRouter uses for its dashboard.
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_SITE_URL || "https://polarisorigin.com",
        "X-Title": "Polaris Origin Blueprint Generator",
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: 4096,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          {
            role: "user",
            content:
              "Generate the Outbound Growth Blueprint JSON for the input in your instructions. Return only the JSON object, nothing else.",
          },
        ],
      }),
    });
  } catch (err) {
    // Aborted (timeout) or network error — worth retrying.
    const e = new Error(
      err?.name === "AbortError"
        ? `Model call timed out after ${PER_ATTEMPT_TIMEOUT_MS}ms.`
        : `Network error calling OpenRouter: ${err?.message || err}`
    );
    e.retryable = true;
    throw e;
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    const e = new Error(
      `OpenRouter request failed (${res.status}): ${detail.slice(0, 300)}`
    );
    // 429 (rate limit) and 5xx are transient; 4xx like 400/401/402/404 are not.
    e.retryable = res.status === 429 || res.status >= 500;
    throw e;
  }

  const data = await res.json();
  const choice = data?.choices?.[0];
  const text = choice?.message?.content;
  if (!text || !text.trim()) {
    const e = new Error(
      `OpenRouter returned no content (finish_reason=${
        choice?.finish_reason ?? "unknown"
      }).`
    );
    e.retryable = true;
    throw e;
  }

  // Parsing can fail if a weaker model emits malformed JSON — retryable.
  try {
    const blueprint = extractJson(text);
    return { blueprint, flat: flattenBlueprint(blueprint) };
  } catch (err) {
    const e = new Error(`Model returned invalid JSON: ${err?.message || err}`);
    e.retryable = true;
    throw e;
  }
}

export async function generateBlueprint(values) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set.");
  }

  const system = buildSystemPrompt(values);

  // Primary model plus any comma-separated fallbacks (tried in order).
  const primary = process.env.BLUEPRINT_MODEL || DEFAULT_MODEL;
  const fallbacks = (process.env.BLUEPRINT_FALLBACK_MODELS || "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  const models = [primary, ...fallbacks];

  let lastErr;
  for (const model of models) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS_PER_MODEL; attempt++) {
      try {
        return await callModel({ apiKey, model, system });
      } catch (err) {
        lastErr = err;
        // eslint-disable-next-line no-console
        console.warn(
          `Blueprint model call failed (model=${model}, attempt=${attempt}/${MAX_ATTEMPTS_PER_MODEL}): ${err?.message}`
        );
        // Don't waste attempts on non-transient errors (bad key, no credits…).
        if (!err?.retryable) break;
        if (attempt < MAX_ATTEMPTS_PER_MODEL) await sleep(1200 * attempt);
      }
    }
  }
  throw lastErr || new Error("Blueprint generation failed.");
}
