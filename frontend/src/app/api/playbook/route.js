import { NextResponse } from "next/server";
import {
  savePlaybookLead,
  markPlaybookEmailSent,
} from "@/lib/playbook/store";
import {
  sendPlaybookNotification,
  sendPlaybookToLead,
} from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REQUIRED = ["name", "email", "company"];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const missing = REQUIRED.filter(
    (f) => !body?.[f] || String(body[f]).trim() === ""
  );
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  let leadId;
  try {
    leadId = await savePlaybookLead(body);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to save playbook lead:", err);
    return NextResponse.json(
      { error: "We couldn't submit that. Please try again shortly." },
      { status: 500 }
    );
  }

  // Fire-and-forget emails (never block the response):
  //  1. Deliver the playbook PDF, then flag the lead as emailed if it sent.
  //  2. Notify the team of the new lead.
  sendPlaybookToLead(body)
    .then((sent) => (sent ? markPlaybookEmailSent(leadId) : null))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error("Playbook delivery / status update failed:", err);
    });
  sendPlaybookNotification(body).catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Playbook notification email failed:", err);
  });

  return NextResponse.json({ ok: true });
}
