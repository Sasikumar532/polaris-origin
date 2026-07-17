// Admin authentication helpers: password hashing, JWT session tokens, and a
// cookie-based "who is the current admin" check for server components/routes.

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_token";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s) throw new Error("ADMIN_JWT_SECRET is not set.");
  return s;
}

export function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(admin) {
  return jwt.sign({ sub: String(admin._id), email: admin.email }, secret(), {
    expiresIn: `${MAX_AGE_SECONDS}s`,
  });
}

function verifyAdminToken(token) {
  try {
    return jwt.verify(token, secret());
  } catch {
    return null;
  }
}

// Options for the session cookie, shared by login (set) and logout (clear).
export function cookieOptions(maxAge = MAX_AGE_SECONDS) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

// Returns the decoded admin payload if the request carries a valid session, else null.
export async function getAdmin() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
