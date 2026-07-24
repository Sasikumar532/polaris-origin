import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin/auth";
import { deletePlaybookLead } from "@/lib/playbook/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  try {
    const deleted = await deletePlaybookLead(id);
    if (!deleted) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to delete lead:", err);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
