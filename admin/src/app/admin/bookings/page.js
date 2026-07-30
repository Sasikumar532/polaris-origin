import { getBookingsList } from "@/lib/booking/store";
import BookingsTable from "@/components/admin/BookingsTable";

export default async function AdminBookingsPage() {
  const bookings = await getBookingsList();
  // Serialize Mongo _id and Date objects
  const serialized = JSON.parse(JSON.stringify(bookings));
  return <BookingsTable initialBookings={serialized} />;
}
