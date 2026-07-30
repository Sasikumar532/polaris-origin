import connectDB from "@/lib/mongoose";
import Booking from "@/models/Booking";

function extractCompany(data, email) {
  if (data.responses?.company) return String(data.responses.company).trim();
  if (data.responses?.Company) return String(data.responses.Company).trim();
  if (data.responses?.["company-name"]) return String(data.responses["company-name"]).trim();
  if (data.responses?.["Company Name"]) return String(data.responses["Company Name"]).trim();
  if (data.company) return String(data.company).trim();

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

export async function upsertBookingFromCal(rawBody) {
  await connectDB();

  const data = rawBody.payload || rawBody;
  const triggerEvent = rawBody.triggerEvent || rawBody.event || "BOOKING_CREATED";

  const uid = String(data.uid || data.bookingId || data.id || `cal_${Date.now()}`);
  const bookingId = data.bookingId || data.id || null;
  const title = data.title || data.eventTitle || "Strategy Call";

  const name =
    data.responses?.name ||
    data.attendees?.[0]?.name ||
    data.name ||
    "Attendee";

  const email = (
    data.responses?.email ||
    data.attendees?.[0]?.email ||
    data.email ||
    ""
  ).toLowerCase().trim();

  const company = extractCompany(data, email);

  const startTime = data.startTime || data.start_time || data.start;
  const endTime = data.endTime || data.end_time || data.end || null;
  const meetingLink =
    data.location ||
    data.videoCallData?.url ||
    data.meetingUrl ||
    data.metadata?.videoCallUrl ||
    "";

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
  await connectDB();
  return await Booking.find().sort({ startTime: -1 }).limit(limit).lean();
}

export async function deleteBookingById(id) {
  await connectDB();
  return await Booking.findByIdAndDelete(id);
}
