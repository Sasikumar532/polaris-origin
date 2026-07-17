import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";
import {
  verifyPassword,
  signAdminToken,
  cookieOptions,
  ADMIN_COOKIE,
} from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(body?.email || "").toLowerCase().trim();
  const password = String(body?.password || "");
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  try {
    await connectDb();
    const admin = await AdminUser.findOne({ email });
    // Same generic error whether the email or the password is wrong.
    if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, signAdminToken(admin), cookieOptions());
    return res;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Admin login failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
