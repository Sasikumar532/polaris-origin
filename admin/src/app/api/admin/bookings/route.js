import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { getBookingsList } from "@/lib/booking/store";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
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
