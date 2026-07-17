import { NextResponse } from "next/server";
import { fetchSiteText } from "@/lib/blueprint/fetchSite";
import { generateBlueprint } from "@/lib/blueprint/generate";
import { createBlueprintDoc } from "@/lib/blueprint/googleDoc";
import {
  saveSubmission,
  markSubmissionComplete,
  markSubmissionFailed,
} from "@/lib/blueprint/store";

// googleapis + fetch of arbitrary sites need the Node runtime, not Edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REQUIRED_FIELDS = [
  "company_name",
  "website_url",
  "offer_description",
  "industries_list",
  "best_fit_industry",
  "pain_points",
  "value_delivered",
  "geography",
  "capacity",
  "aov",
  "competitor_name",
  "qualifying_criteria",
];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter(
    (f) => !body?.[f] || String(body[f]).trim() === ""
  );
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // 1. Persist the submission immediately so nothing is ever lost.
  let submissionId;
  try {
    submissionId = await saveSubmission(body);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to save submission:", err);
    return NextResponse.json(
      { error: "We couldn't save your submission. Please try again shortly." },
      { status: 500 }
    );
  }

  // 2. Kick off blueprint generation in the background (fire-and-forget) so the
  //    prospect gets an instant response instead of waiting ~1 minute.
  processBlueprint(submissionId, body).catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Background blueprint processing crashed:", err);
  });

  // 3. Acknowledge the submission only — never expose any generated data or the
  //    background process to the public form.
  return NextResponse.json({ ok: true });
}

// Runs after the response is sent: fetch sites, generate, build the doc, and
// record the result (or the failure) against the stored submission.
async function processBlueprint(submissionId, body) {
  try {
    const [websiteContent, competitorContent] = await Promise.all([
      fetchSiteText(body.website_url),
      fetchSiteText(body.competitor_website),
    ]);

    const values = {
      ...body,
      website_content: websiteContent || "(could not be fetched automatically)",
      competitor_website_content:
        competitorContent || "(not provided or could not be fetched)",
    };

    const { flat } = await generateBlueprint(values);
    const doc = await createBlueprintDoc({ flat, companyName: body.company_name });

    await markSubmissionComplete(submissionId, {
      documentUrl: doc.editUrl,
      viewUrl: doc.viewUrl,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Blueprint generation failed:", err);
    await markSubmissionFailed(submissionId, String(err?.message || err)).catch(
      () => {}
    );
  }
}
