import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin/auth";
import { getSubmissions } from "@/lib/blueprint/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const submissions = await getSubmissions(500);
    // Normalize Mongo types for the client.
    const rows = submissions.map((s) => ({
      id: String(s._id),
      company_name: s.company_name,
      website_url: s.website_url,
      best_fit_industry: s.best_fit_industry,
      geography: s.geography,
      aov: s.aov,
      competitor_name: s.competitor_name,
      status: s.status,
      documentUrl: s.documentUrl || null,
      error: s.error || null,
      createdAt: s.createdAt,
    }));
    return NextResponse.json({ submissions: rows });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to load submissions:", err);
    return NextResponse.json(
      { error: "Failed to load submissions." },
      { status: 500 }
    );
  }
}
