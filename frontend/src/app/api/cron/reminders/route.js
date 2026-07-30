import { NextResponse } from "next/server";
import { processPendingReminders } from "@/lib/booking/reminders";

export async function GET() {
  try {
    const results = await processPendingReminders();
    return NextResponse.json({ ok: true, results });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Cron reminders error:", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Cron reminders failed" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
