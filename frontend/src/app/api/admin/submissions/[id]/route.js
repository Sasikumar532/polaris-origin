import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin/auth";
import { deleteSubmission } from "@/lib/blueprint/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  try {
    const deleted = await deleteSubmission(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Submission not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to delete submission:", err);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
