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
  // Admin clicks are synchronous: wait for the doc so we can return the link.
  const result = await processBlueprint(id, submission);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ ok: true, documentUrl: result.documentUrl });
}
