import { connectDb } from "@/lib/mongoose";
import Booking from "@/models/Booking";
import {
  sendBookingReminderEmail2,
  sendBookingReminderEmail3,
  sendBookingReminderEmail4,
} from "@/lib/email";

export async function processPendingReminders() {
  await connectDb();

  const now = new Date();
  // Look for active bookings with start time in the future or within past 6 hours
  const minStart = new Date(now.getTime() - 6 * 60 * 60 * 1000);
  const bookings = await Booking.find({
    status: "BOOKED",
    startTime: { $gte: minStart },
  });

  const results = {
    processed: bookings.length,
    email2SentCount: 0,
    email3SentCount: 0,
    email4SentCount: 0,
    errors: [],
  };

  for (const booking of bookings) {
    // Re-check status right before sending — the booking may have been
    // cancelled after this batch was fetched but before this iteration ran.
    const current = await Booking.findById(booking._id).select("status").lean();
    if (!current || current.status !== "BOOKED") {
      continue;
    }

    const startTime = new Date(booking.startTime);
    const diffHours = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    // 1. Email 2 (2 or 3 Days before call, between 36h and 72h)
    if (diffHours <= 72 && diffHours >= 36 && !booking.reminders?.email2Sent) {
      const ok = await sendBookingReminderEmail2(booking);
      if (ok) {
        booking.reminders.email2Sent = true;
        booking.reminders.email2SentAt = new Date();
        await booking.save();
        results.email2SentCount++;
      }
    } else if (diffHours < 36 && !booking.reminders?.email2Sent) {
      // Mark skipped so it doesn't trigger late
      booking.reminders.email2Sent = true;
      await booking.save();
    }

    // 2. Email 3 (24 Hours Before, between 6h and 30h)
    if (diffHours <= 30 && diffHours >= 6 && !booking.reminders?.email3Sent) {
      const ok = await sendBookingReminderEmail3(booking);
      if (ok) {
        booking.reminders.email3Sent = true;
        booking.reminders.email3SentAt = new Date();
        await booking.save();
        results.email3SentCount++;
      }
    } else if (diffHours < 6 && !booking.reminders?.email3Sent) {
      // Mark skipped so it doesn't trigger late
      booking.reminders.email3Sent = true;
      await booking.save();
    }

    // 3. Email 4 (2 Hours Before, between 0.1h and 3.5h)
    if (diffHours <= 3.5 && diffHours >= 0.1 && !booking.reminders?.email4Sent) {
      const ok = await sendBookingReminderEmail4(booking);
      if (ok) {
        booking.reminders.email4Sent = true;
        booking.reminders.email4SentAt = new Date();
        await booking.save();
        results.email4SentCount++;
      }
    }
  }

  return results;
}
