// Sends a notification email on every Blueprint form submission via SMTP
// (Gmail with an app password by default). Best-effort: never throws to the
// caller so a mail failure can't break the submission flow.

import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  // Gmail app passwords are shown in groups of four; strip the spaces.
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
  if (!user || !pass) {
    throw new Error("SMTP_USER / SMTP_PASS are not set.");
  }
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return transporter;
}

const ROWS = [
  ["Company", "company_name"],
  ["Website", "website_url"],
  ["Offer", "offer_description"],
  ["Industries", "industries_list"],
  ["Best-fit industry", "best_fit_industry"],
  ["Pain points", "pain_points"],
  ["Value delivered", "value_delivered"],
  ["Geography", "geography"],
  ["Capacity", "capacity"],
  ["Average order value", "aov"],
  ["Competitor", "competitor_name"],
  ["Competitor website", "competitor_website"],
  ["Qualifying criteria", "qualifying_criteria"],
  ["Additional notes", "additional_notes"],
];

function esc(s) {
  return String(s ?? "").replace(/[&<>]/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"
  );
}

// Fire-and-forget from the API route. Resolves regardless of outcome.
export async function sendSubmissionNotification(submission) {
  const to = process.env.MAIL_TO || process.env.SMTP_USER;
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const company = submission.company_name || "Unknown company";

  const textLines = ROWS.map(
    ([label, key]) => `${label}: ${submission[key] || "-"}`
  );
  const htmlRows = ROWS.map(
    ([label, key]) =>
      `<tr><td style="padding:6px 12px;color:#475569;vertical-align:top;white-space:nowrap"><strong>${esc(
        label
      )}</strong></td><td style="padding:6px 12px;color:#0f172a">${esc(
        submission[key] || "-"
      )}</td></tr>`
  ).join("");

  try {
    const t = getTransporter();
    await t.sendMail({
      from,
      to,
      subject: `New Blueprint submission — ${company}`,
      text: `New Outbound GTM Blueprint form submission.\n\n${textLines.join("\n")}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">
        <h2 style="color:#1f3a5f;margin:0 0 12px">New Blueprint submission</h2>
        <table style="border-collapse:collapse">${htmlRows}</table>
      </div>`,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Submission notification email failed:", err?.message || err);
  }
}
