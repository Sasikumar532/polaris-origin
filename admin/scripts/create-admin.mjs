// One-off helper to create (or update) an admin login for /admin-login.
//
//   node scripts/create-admin.mjs <email> <password>
//
// Reads MONGODB_URI / MONGODB_DB from .env.local, bcrypt-hashes the password,
// and upserts the admin into the "admin_users" collection.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

function loadEnvLocal() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const envPath = path.join(here, "..", ".env.local");
  const env = {};
  try {
    for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].trim();
    }
  } catch {
    /* fall back to process.env */
  }
  return { ...env, ...process.env };
}

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs <email> <password>");
  process.exit(1);
}

const env = loadEnvLocal();
if (!env.MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

const client = new MongoClient(env.MONGODB_URI);
try {
  await client.connect();
  const db = client.db(env.MONGODB_DB || "polaris-origin");
  const passwordHash = await bcrypt.hash(password, 10);
  const normEmail = email.toLowerCase().trim();
  const now = new Date();
  const res = await db.collection("admin_users").updateOne(
    { email: normEmail },
    {
      $set: { email: normEmail, passwordHash, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );
  console.log(
    res.upsertedCount ? "✅ Admin created:" : "✅ Admin password updated:",
    normEmail
  );
} catch (err) {
  console.error("Failed to create admin:", err.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
