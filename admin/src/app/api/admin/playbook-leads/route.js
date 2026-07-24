import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin/auth";
import { getPlaybookLeads } from "@/lib/playbook/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const leads = await getPlaybookLeads(500);
    const rows = leads.map((l) => ({
      id: String(l._id),
      name: l.name,
      email: l.email,
      phone: l.phone || "",
      company: l.company,
      role: l.role || "",
      emailSent: Boolean(l.emailSent),
      createdAt: l.createdAt,
    }));
    return NextResponse.json({ leads: rows });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to load playbook leads:", err);
    return NextResponse.json(
      { error: "Failed to load leads." },
      { status: 500 }
    );
  }
}
