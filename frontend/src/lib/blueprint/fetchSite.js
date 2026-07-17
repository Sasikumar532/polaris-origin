// Fetch a public web page and reduce it to plain, readable text so it can be
// handed to the model as a "website content summary". This is intentionally
// dependency-free: fetch the HTML, strip scripts/styles/markup, collapse
// whitespace, and truncate. Never throws — a failed read just yields null so
// the blueprint can still generate from the form answers alone.

const MAX_CHARS = 6000;
const FETCH_TIMEOUT_MS = 12000;

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<\/(p|div|section|article|li|h[1-6]|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&rsquo;|&lsquo;/gi, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/gi, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .trim();
}

function normalizeUrl(raw) {
  if (!raw) return null;
  let url = String(raw).trim();
  if (!url) return null;
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

export async function fetchSiteText(rawUrl) {
  const url = normalizeUrl(rawUrl);
  if (!url) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; PolarisOriginBot/1.0; +https://polarisorigin.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("html") && !contentType.includes("text")) {
      return null;
    }
    const html = await res.text();
    const text = htmlToText(html);
    if (!text) return null;
    return text.length > MAX_CHARS
      ? `${text.slice(0, MAX_CHARS)}\n\n[content truncated]`
      : text;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
