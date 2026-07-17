// One-time helper: obtains a Google OAuth refresh token for the Blueprint
// Generator, so the server can copy your template Doc and fill it on your
// behalf. Run once:
//
//   node scripts/get-google-refresh-token.mjs
//
// It reads GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET from .env.local,
// opens a consent URL, catches the redirect on http://localhost:5175, and
// prints the refresh token to paste back into .env.local.
//
// If your OAuth client is a "Web application" type, add this exact redirect URI
// in Google Cloud Console → Credentials → your client → Authorized redirect URIs:
//   http://localhost:5175/oauth2callback

import http from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { google } from "googleapis";

const PORT = 5175;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;
const SCOPES = [
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/drive",
];

// Minimal .env.local loader (no dotenv dependency).
function loadEnvLocal() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const envPath = path.join(here, "..", ".env.local");
  const env = {};
  try {
    const text = readFileSync(envPath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      let val = m[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      env[m[1]] = val;
    }
  } catch {
    // fall through to process.env
  }
  return { ...env, ...process.env };
}

const env = loadEnvLocal();
const clientId = env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = env.GOOGLE_OAUTH_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error(
    "Missing GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET in .env.local"
  );
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent", // force a refresh_token every time
  scope: SCOPES,
});

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith("/oauth2callback")) {
    res.writeHead(404).end();
    return;
  }
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    res.writeHead(400, { "Content-Type": "text/plain" }).end(`Error: ${error}`);
    console.error("Consent failed:", error);
    server.close();
    process.exit(1);
  }

  try {
    const { tokens } = await oauth2.getToken(code);
    res
      .writeHead(200, { "Content-Type": "text/html" })
      .end(
        "<h2>Done. You can close this tab and return to the terminal.</h2>"
      );
    console.log("\n✅ Success. Add this to your .env.local:\n");
    console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}\n`);
    if (!tokens.refresh_token) {
      console.warn(
        "⚠️  No refresh_token returned. Revoke prior access at " +
          "https://myaccount.google.com/permissions and run this again."
      );
    }
  } catch (e) {
    res.writeHead(500).end("Token exchange failed. Check the terminal.");
    console.error("Token exchange failed:", e.message);
  } finally {
    server.close();
    setTimeout(() => process.exit(0), 100);
  }
});

server.listen(PORT, () => {
  console.log("\nOpen this URL in your browser to authorize:\n");
  console.log(authUrl + "\n");
  console.log(`Waiting for the redirect on ${REDIRECT_URI} ...`);
});
