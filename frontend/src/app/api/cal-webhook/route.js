import { NextResponse } from "next/server";
import crypto from "crypto";
import { upsertBookingFromCal } from "@/lib/booking/store";
import { processPendingReminders } from "@/lib/booking/reminders";

export async function POST(req) {
  try {
    const rawBodyText = await req.text();
    const secret = process.env.CAL_WEBHOOK_SECRET;

    if (secret) {
      // With a secret configured, a request MUST carry a matching signature —
      // a missing header is rejected too, not silently allowed through.
      const signature = req.headers.get("x-cal-signature-256");
      const hmac = crypto
        .createHmac("sha256", secret)
        .update(rawBodyText)
        .digest("hex");
      if (!signature || hmac !== signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const body = JSON.parse(rawBodyText || "{}");

    // Save/update booking in DB
    const booking = await upsertBookingFromCal(body);

    // Fire-and-forget check for any pending reminders
    processPendingReminders().catch((err) =>
      // eslint-disable-next-line no-console
      console.error("[cal-webhook] Reminder processing error:", err?.message || err)
    );

    return NextResponse.json({ ok: true, bookingId: booking?._id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[cal-webhook] ERROR:", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Webhook processing failed" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Cal.com webhook endpoint is active",
    endpoint: "/api/cal-webhook",
  });
}
