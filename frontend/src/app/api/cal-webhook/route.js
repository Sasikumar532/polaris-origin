import { NextResponse } from "next/server";
import crypto from "crypto";
import { upsertBookingFromCal } from "@/lib/booking/store";
import { processPendingReminders } from "@/lib/booking/reminders";

export async function POST(req) {
  const log = (...args) => console.log("[cal-webhook]", ...args); // eslint-disable-line no-console

  try {
    const rawBodyText = await req.text();
    const secret = process.env.CAL_WEBHOOK_SECRET;
    const hasSignatureHeader = req.headers.has("x-cal-signature-256");

    log(
      "incoming request — bytes:",
      rawBodyText.length,
      "| secretConfigured:",
      Boolean(secret),
      "| signatureHeaderPresent:",
      hasSignatureHeader
    );

    if (secret) {
      // With a secret configured, a request MUST carry a matching signature —
      // a missing header is rejected too, not silently allowed through.
      const signature = req.headers.get("x-cal-signature-256");
      const hmac = crypto
        .createHmac("sha256", secret)
        .update(rawBodyText)
        .digest("hex");
      if (!signature || hmac !== signature) {
        log("REJECTED — signature missing or mismatched");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
      log("signature verified OK");
    }

    const body = JSON.parse(rawBodyText || "{}");
    const payload = body.payload || body;
    log(
      "triggerEvent:",
      body.triggerEvent || body.event || "(none, defaults to BOOKING_CREATED)",
      "| uid:",
      payload.uid,
      "| eventTypeId:",
      payload.eventTypeId ?? payload.eventType?.id,
      "| attendee:",
      payload.attendees?.[0]?.email || payload.responses?.email,
      "| startTime:",
      payload.startTime
    );

    // Save/update booking in DB
    const booking = await upsertBookingFromCal(body);

    if (!booking) {
      log(
        "SKIPPED — not saved (unhandled trigger type or eventTypeId did not match CAL_EVENT_TYPE_ID)"
      );
    } else {
      log("SAVED — bookingId:", booking._id, "| status:", booking.status);
    }

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
