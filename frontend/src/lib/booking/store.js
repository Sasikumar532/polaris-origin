import { connectDb } from "@/lib/mongoose";
import Booking from "@/models/Booking";

// Cal.com's `responses` fields are usually plain strings, but the booking
// form can also send them as { label, value } objects, or — for name fields
// specifically — { value: { firstName, lastName } }. Unwrap any of these
// shapes into a plain string so downstream .toLowerCase()/.trim() never crash.
function asString(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object") {
    if ("value" in v) return asString(v.value);
    if ("firstName" in v || "lastName" in v) {
      return [v.firstName, v.lastName].filter(Boolean).join(" ").trim();
    }
  }
  return String(v);
}

function extractCompany(data, email) {
  const fromResponses =
    asString(data.responses?.company) ||
    asString(data.responses?.Company) ||
    asString(data.responses?.["company-name"]) ||
    asString(data.responses?.["Company Name"]);
  if (fromResponses.trim()) return fromResponses.trim();
  if (asString(data.company).trim()) return asString(data.company).trim();

  // Try to derive from email domain if non-generic
  if (email && email.includes("@")) {
    const domain = email.split("@")[1]?.toLowerCase();
    const genericDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "protonmail.com"];
    if (domain && !genericDomains.includes(domain)) {
      const parts = domain.split(".");
      if (parts[0]) {
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      }
    }
  }
  return "your company";
}

// Cal.com's `location` field is often a non-URL placeholder like
// "integrations:google:meet" — the real join link usually lives in one of
// several other fields depending on the video integration. Check the
// specific fields first and only fall back to `location` if it's an actual URL.
function extractMeetingLink(data) {
  const isUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v.trim());
  const candidates = [
    data.videoCallData?.url,
    data.metadata?.videoCallUrl,
    data.metadata?.hangoutLink,
    data.additionalInformation?.hangoutLink,
    data.location,
    data.meetingUrl,
  ];
  return candidates.find(isUrl) || "";
}

// The Cal.com webhook is subscribed account-wide with every trigger type
// enabled (payments, requests, etc.), but we only act on these three — any
// other trigger (e.g. BOOKING_PAID) is ignored rather than treated as a create.
const HANDLED_TRIGGERS = new Set([
  "BOOKING_CREATED",
  "BOOKING_CANCELLED",
  "BOOKING_RESCHEDULED",
]);

export async function upsertBookingFromCal(rawBody) {
  await connectDb();

  const data = rawBody.payload || rawBody;
  const triggerEvent = rawBody.triggerEvent || rawBody.event || "BOOKING_CREATED";

  if (!HANDLED_TRIGGERS.has(triggerEvent)) {
    return null;
  }

  // Optional scoping: if CAL_EVENT_TYPE_ID is set, ignore webhooks from any
  // other Cal.com event type (relevant if the webhook is attached account-wide
  // rather than to this one event's own settings).
  const wantedEventTypeId = process.env.CAL_EVENT_TYPE_ID;
  if (wantedEventTypeId) {
    const incomingEventTypeId = String(
      data.eventTypeId ?? data.eventType?.id ?? ""
    );
    if (incomingEventTypeId && incomingEventTypeId !== String(wantedEventTypeId)) {
      return null;
    }
  }

  const uid = String(data.uid || data.bookingId || data.id || `cal_${Date.now()}`);
  const bookingId = data.bookingId || data.id || null;
  const title = data.title || data.eventTitle || "Strategy Call";

  // attendees[].name is Cal.com's canonical display name and is reliably a
  // plain string; prefer it over `responses.name`, whose shape varies by
  // booking-form configuration (plain string vs { firstName, lastName }).
  const name =
    asString(data.attendees?.[0]?.name) ||
    asString(data.responses?.name) ||
    asString(data.name) ||
    "Attendee";

  const email = asString(
    asString(data.responses?.email) ||
      asString(data.attendees?.[0]?.email) ||
      asString(data.email)
  )
    .toLowerCase()
    .trim();

  const company = extractCompany(data, email);

  const startTime = data.startTime || data.start_time || data.start;
  const endTime = data.endTime || data.end_time || data.end || null;
  const meetingLink = extractMeetingLink(data);

  const cancelReason = data.cancellationReason || data.rejectionReason || "";

  if (triggerEvent === "BOOKING_CANCELLED") {
    const updated = await Booking.findOneAndUpdate(
      { uid },
      {
        $set: {
          status: "CANCELLED",
          cancelReason,
          rawPayload: rawBody,
        },
      },
      { new: true }
    );
    if (!updated && email && startTime) {
      // Fallback matching by email + startTime if uid wasn't matched
      return await Booking.findOneAndUpdate(
        { email, startTime: new Date(startTime) },
        { $set: { status: "CANCELLED", cancelReason, rawPayload: rawBody } },
        { new: true }
      );
    }
    return updated;
  }

  // Handle BOOKING_CREATED or BOOKING_RESCHEDULED
  const existing = await Booking.findOne({ uid });

  if (triggerEvent === "BOOKING_RESCHEDULED" || (existing && existing.startTime?.getTime() !== new Date(startTime).getTime())) {
    return await Booking.findOneAndUpdate(
      { uid },
      {
        $set: {
          title,
          name,
          email,
          company,
          startTime: new Date(startTime),
          endTime: endTime ? new Date(endTime) : null,
          meetingLink,
          status: "BOOKED",
          cancelReason: "",
          "reminders.email2Sent": false,
          "reminders.email3Sent": false,
          "reminders.email4Sent": false,
          rawPayload: rawBody,
        },
      },
      { upsert: true, new: true }
    );
  }

  // BOOKING_CREATED or standard upsert
  return await Booking.findOneAndUpdate(
    { uid },
    {
      $setOnInsert: {
        bookingId,
        title,
        name,
        email,
        company,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        meetingLink,
        status: "BOOKED",
        reminders: {
          email2Sent: false,
          email3Sent: false,
          email4Sent: false,
        },
      },
      $set: {
        rawPayload: rawBody,
      },
    },
    { upsert: true, new: true }
  );
}

export async function getBookingsList(limit = 100) {
  await connectDb();
  return await Booking.find().sort({ startTime: -1 }).limit(limit).lean();
}

export async function deleteBookingById(id) {
  await connectDb();
  return await Booking.findByIdAndDelete(id);
}
