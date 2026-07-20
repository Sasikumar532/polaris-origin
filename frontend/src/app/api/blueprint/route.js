import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/blueprint/store";
import { processBlueprint } from "@/lib/blueprint/process";
import { sendSubmissionNotification } from "@/lib/email";

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

  // 2. Notify the team by email (fire-and-forget; never blocks the response).
  sendSubmissionNotification(body).catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Notification email failed:", err);
  });

  // 3. Kick off blueprint generation in the background (fire-and-forget) so the
  //    prospect gets an instant response instead of waiting ~1 minute.
  processBlueprint(submissionId, body).catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Background blueprint processing crashed:", err);
  });

  // 3. Acknowledge the submission only — never expose any generated data or the
  //    background process to the public form.
  return NextResponse.json({ ok: true });
}
