import { connectDb } from "@/lib/mongoose";
import Booking from "@/models/Booking";
import {
  sendBookingValueEmail,
  sendBookingReminder1Email,
  sendBookingReminder2Email,
} from "@/lib/email";

// Hours before the meeting the "Value" email targets, per branch — decided
// once at booking time from how much notice existed (see store.js).
const VALUE_OFFSET_HOURS = { A: 72, B: 48, C: 24, D: 12 };
// Only branches A and B (>=72h notice) get the standalone 24h reminder — for
// C/D the Value email already lands close to that mark, so a second touch
// right after would be redundant.
const HAS_REMINDER1 = { A: true, B: true, C: false, D: false };
const REMINDER1_OFFSET_HOURS = 24;

const WINDOW = 2; // hours of slack around each target, so a ~15min cron never misses it

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
    valueSentCount: 0,
    reminder1SentCount: 0,
    reminder2SentCount: 0,
  };

  for (const booking of bookings) {
    // Re-check status right before sending — the booking may have been
    // cancelled after this batch was fetched but before this iteration ran.
    const current = await Booking.findById(booking._id).select("status").lean();
    if (!current || current.status !== "BOOKED") {
      continue;
    }

    const branch = booking.reminderBranch || "D";
    const startTime = new Date(booking.startTime);
    const diffHours = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    // 1. Value touch — offset depends on branch.
    const valueTarget = VALUE_OFFSET_HOURS[branch];
    if (!booking.reminders?.valueSent) {
      if (diffHours <= valueTarget + WINDOW && diffHours >= valueTarget - WINDOW) {
        const ok = await sendBookingValueEmail(booking);
        if (ok) {
          booking.reminders.valueSent = true;
          booking.reminders.valueSentAt = new Date();
          await booking.save();
          results.valueSentCount++;
        }
      } else if (diffHours < valueTarget - WINDOW) {
        // Window already passed (e.g. booked too close to the call) — skip
        // silently rather than sending it late.
        booking.reminders.valueSent = true;
        await booking.save();
      }
    }

    // 2. Reminder 1 — 24h before, branches A/B only.
    if (HAS_REMINDER1[branch] && !booking.reminders?.reminder1Sent) {
      if (
        diffHours <= REMINDER1_OFFSET_HOURS + WINDOW &&
        diffHours >= REMINDER1_OFFSET_HOURS - WINDOW
      ) {
        const ok = await sendBookingReminder1Email(booking);
        if (ok) {
          booking.reminders.reminder1Sent = true;
          booking.reminders.reminder1SentAt = new Date();
          await booking.save();
          results.reminder1SentCount++;
        }
      } else if (diffHours < REMINDER1_OFFSET_HOURS - WINDOW) {
        booking.reminders.reminder1Sent = true;
        await booking.save();
      }
    }

    // 3. Reminder 2 — 2 hours before, all branches.
    if (diffHours <= 3.5 && diffHours >= 0.1 && !booking.reminders?.reminder2Sent) {
      const ok = await sendBookingReminder2Email(booking);
      if (ok) {
        booking.reminders.reminder2Sent = true;
        booking.reminders.reminder2SentAt = new Date();
        await booking.save();
        results.reminder2SentCount++;
      }
    }
  }

  return results;
}
