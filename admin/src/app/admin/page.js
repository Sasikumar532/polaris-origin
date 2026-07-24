import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

// Auth + sidebar are handled by the /admin layout.
export default function AdminPage() {
  return <AdminDashboard />;
}
