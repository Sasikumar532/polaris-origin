import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin/auth";
import AdminShell from "@/components/admin/AdminShell";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin-login");
  return <AdminShell adminEmail={admin.email}>{children}</AdminShell>;
}
