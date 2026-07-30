import { connectDb } from "@/lib/mongoose";
import Booking from "@/models/Booking";

export async function getBookingsList(limit = 100) {
  await connectDb();
  return await Booking.find().sort({ startTime: -1 }).limit(limit).lean();
}

export async function deleteBookingById(id) {
  await connectDb();
  return await Booking.findByIdAndDelete(id);
}
