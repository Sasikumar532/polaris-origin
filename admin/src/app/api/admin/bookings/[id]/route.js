import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin/auth";
import { deleteBookingById } from "@/lib/booking/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(req, { params }) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const deleted = await deleteBookingById(id);
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Failed to delete booking" },
      { status: 500 }
    );
  }
}
