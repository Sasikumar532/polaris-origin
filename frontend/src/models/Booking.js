import mongoose from "mongoose";

const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true, index: true },
    bookingId: { type: Schema.Types.Mixed, default: null },
    title: { type: String, default: "Strategy Call" },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    company: { type: String, default: "" },
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, default: null },
    meetingLink: { type: String, default: "" },
    // IANA zone from Cal.com's attendee data, used to show meeting time in
    // the attendee's own timezone in reminder emails.
    attendeeTimeZone: { type: String, default: "" },
    status: {
      type: String,
      enum: ["BOOKED", "CANCELLED", "RESCHEDULED"],
      default: "BOOKED",
      index: true,
    },
    cancelReason: { type: String, default: "" },
    // Which follow-up track this booking was placed on, decided once from the
    // gap between booking-time and the meeting (see lib/booking/reminders.js).
    // A: >96h notice, B: 72-96h, C: 48-72h, D: <48h.
    reminderBranch: { type: String, enum: ["A", "B", "C", "D"], default: null },
    reminders: {
      confirmationSent: { type: Boolean, default: false },
      confirmationSentAt: { type: Date, default: null },
      valueSent: { type: Boolean, default: false },
      valueSentAt: { type: Date, default: null },
      reminder1Sent: { type: Boolean, default: false },
      reminder1SentAt: { type: Date, default: null },
      reminder2Sent: { type: Boolean, default: false },
      reminder2SentAt: { type: Date, default: null },
    },
    rawPayload: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true, collection: "meeting_bookings" }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
