import connectDB from "@/lib/mongoose";
import Booking from "@/models/Booking";

export async function getBookingsList(limit = 100) {
  await connectDB();
  return await Booking.find().sort({ startTime: -1 }).limit(limit).lean();
}

export async function deleteBookingById(id) {
  await connectDB();
  return await Booking.findByIdAndDelete(id);
}
