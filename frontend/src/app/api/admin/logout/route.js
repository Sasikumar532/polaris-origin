import { NextResponse } from "next/server";
import { cookieOptions, ADMIN_COOKIE } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Expire the session cookie immediately.
  res.cookies.set(ADMIN_COOKIE, "", cookieOptions(0));
  return res;
}
