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
    status: {
      type: String,
      enum: ["BOOKED", "CANCELLED", "RESCHEDULED"],
      default: "BOOKED",
      index: true,
    },
    cancelReason: { type: String, default: "" },
    reminders: {
      email2Sent: { type: Boolean, default: false },
      email2SentAt: { type: Date, default: null },
      email3Sent: { type: Boolean, default: false },
      email3SentAt: { type: Date, default: null },
      email4Sent: { type: Boolean, default: false },
      email4SentAt: { type: Date, default: null },
    },
    rawPayload: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true, collection: "meeting_bookings" }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
