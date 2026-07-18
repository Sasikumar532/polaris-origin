import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin-login");
  return <AdminDashboard adminEmail={admin.email} />;
}
