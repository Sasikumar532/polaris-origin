import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin/auth";
import { getBookingsList } from "@/lib/booking/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const list = await getBookingsList();
    return NextResponse.json({ bookings: list });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
