import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin/auth";
import {
  getSubmissionById,
  markSubmissionProcessing,
} from "@/lib/blueprint/store";
import { processBlueprint } from "@/lib/blueprint/process";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request, { params }) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const submission = await getSubmissionById(id);
  if (!submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }

  await markSubmissionProcessing(id);
  // Fire-and-forget: generation can take a while (site fetch + LLM + Docs), so
  // we return immediately to avoid a proxy timeout. The dashboard polls for the
  // result. PM2 keeps the process alive to finish the background job.
  processBlueprint(id, submission).catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Admin background generation crashed:", err);
  });

  return NextResponse.json({ ok: true, status: "processing" });
}
