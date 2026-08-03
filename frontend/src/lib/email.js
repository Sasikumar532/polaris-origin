// Sends a notification email on every Blueprint form submission via SMTP
// (Gmail with an app password by default). Best-effort: never throws to the
// caller so a mail failure can't break the submission flow.

import nodemailer from "nodemailer";
import path from "node:path";
import { existsSync } from "node:fs";

let transporter;
let playbookTransporter;

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

// Separate SMTP account used only for the Cold Email Playbook (3rd resource).
// Falls back to the default SMTP account if the PLAYBOOK_SMTP_* vars aren't set.
function getPlaybookTransporter() {
  if (playbookTransporter) return playbookTransporter;
  const user = process.env.PLAYBOOK_SMTP_USER;
  const pass = (process.env.PLAYBOOK_SMTP_PASS || "").replace(/\s+/g, "");
  if (!user || !pass) return getTransporter();
  playbookTransporter = nodemailer.createTransport({
    host: process.env.PLAYBOOK_SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.PLAYBOOK_SMTP_PORT || 465),
    secure: Number(process.env.PLAYBOOK_SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });
  return playbookTransporter;
}

// The from/to addresses the playbook uses (defaults to its own SMTP user).
function playbookFrom() {
  return (
    process.env.PLAYBOOK_MAIL_FROM ||
    process.env.PLAYBOOK_SMTP_USER ||
    process.env.MAIL_FROM ||
    process.env.SMTP_USER
  );
}
function playbookTo() {
  return (
    process.env.PLAYBOOK_MAIL_TO ||
    process.env.PLAYBOOK_SMTP_USER ||
    process.env.MAIL_TO ||
    process.env.SMTP_USER
  );
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

// Notify the team when someone downloads the Cold Email Playbook.
export async function sendPlaybookNotification(lead) {
  const to = playbookTo();
  const from = playbookFrom();
  const rows = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Role", lead.role],
  ];
  try {
    const t = getPlaybookTransporter();
    await t.sendMail({
      from,
      to,
      subject: `New Playbook lead — ${lead.company || lead.name}`,
      text: `New Cold Email Playbook download.\n\n${rows
        .map(([l, v]) => `${l}: ${v || "-"}`)
        .join("\n")}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">
        <h2 style="color:#1f3a5f;margin:0 0 12px">New Playbook lead</h2>
        <table style="border-collapse:collapse">${rows
          .map(
            ([l, v]) =>
              `<tr><td style="padding:6px 12px;color:#475569"><strong>${esc(
                l
              )}</strong></td><td style="padding:6px 12px;color:#0f172a">${esc(
                v || "-"
              )}</td></tr>`
          )
          .join("")}</table>
      </div>`,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Playbook notification email failed:", err?.message || err);
  }
}

// Path to the playbook PDF that gets emailed to leads. Override with
// PLAYBOOK_PDF_PATH; defaults to <project root>/assets/…
function playbookPdfPath() {
  return (
    process.env.PLAYBOOK_PDF_PATH ||
    path.join(process.cwd(), "assets", "cold-email-infrastructure-playbook.pdf")
  );
}

// Emails the actual playbook PDF to the person who filled out the form.
export async function sendPlaybookToLead(lead) {
  const from = playbookFrom();
  const pdfPath = playbookPdfPath();
  if (!existsSync(pdfPath)) {
    // eslint-disable-next-line no-console
    console.error("Playbook PDF not found at:", pdfPath);
    return false;
  }
  const firstName = String(lead.name || "there").split(" ")[0];
  try {
    const t = getPlaybookTransporter();
    await t.sendMail({
      from,
      to: lead.email,
      subject: "Your Cold Email Infrastructure Playbook",
      text: `Hi ${firstName},

Thanks for requesting the Cold Email Infrastructure Playbook — it's attached to this email as a PDF.

Inside you'll find the full nine-chapter build order, setup checklists, DNS record values, the warmup schedule, and our 60-point infrastructure audit.

If you'd rather not build this yourself, just reply and we can talk about setting it up for you.

— Polaris Origin`,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#0f172a">
        <p>Hi ${esc(firstName)},</p>
        <p>Thanks for requesting the <strong>Cold Email Infrastructure Playbook</strong> — it's attached to this email as a PDF.</p>
        <p>Inside you'll find the full nine-chapter build order, setup checklists, DNS record values, the warmup schedule, and our 60-point infrastructure audit.</p>
        <p>If you'd rather not build this yourself, just reply and we can talk about setting it up for you.</p>
        <p style="color:#475569">— Polaris Origin</p>
      </div>`,
      attachments: [
        {
          filename: "Cold Email Infrastructure Playbook.pdf",
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Playbook delivery email failed:", err?.message || err);
    return false;
  }
}

export function formatMeetingDay(dateObj) {
  const d = new Date(dateObj);
  if (isNaN(d.getTime())) return "our scheduled day";
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayName = days[d.getDay()];
  const monthName = months[d.getMonth()];
  const dayNum = d.getDate();
  let suffix = "th";
  if (dayNum % 10 === 1 && dayNum !== 11) suffix = "st";
  else if (dayNum % 10 === 2 && dayNum !== 12) suffix = "nd";
  else if (dayNum % 10 === 3 && dayNum !== 13) suffix = "rd";
  return `${dayName}, ${monthName} ${dayNum}${suffix}`;
}

function getCloserName() {
  return process.env.CLOSER_NAME || "Lakshan";
}

// e.g. "3:45 PM GMT+5:30" in the attendee's own timezone when known.
export function formatMeetingTime(dateObj, timeZone) {
  const d = new Date(dateObj);
  if (isNaN(d.getTime())) return "the scheduled time";
  const opts = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };
  try {
    return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: timeZone || "Asia/Kolkata" }).format(d);
  } catch {
    // Unknown/invalid IANA zone in the payload — fall back to a safe default.
    return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "Asia/Kolkata" }).format(d);
  }
}

// 1. Confirmation — sent immediately when a new booking comes in.
export async function sendBookingConfirmationEmail(booking) {
  const from = playbookFrom();
  const firstName = String(booking.name || "there").split(" ")[0];
  const dayStr = formatMeetingDay(booking.startTime);
  const timeStr = formatMeetingTime(booking.startTime, booking.attendeeTimeZone);
  const meetingLink = booking.meetingLink || "the link in your calendar invite";
  const closerName = getCloserName();

  const text = `Hey ${firstName}, you're locked in for ${dayStr} at ${timeStr}.

One favor: click "Yes" on the calendar invite so it actually sits on your calendar instead of just floating in your inbox.

Link: ${meetingLink}

What you can expect: We'll go over your existing outbound setup, and design a system live that would get you qualified bookings with increased show-up rates.

See you then,
${closerName}`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#0f172a">
    <p>Hey ${esc(firstName)}, you're locked in for <strong>${esc(dayStr)}</strong> at <strong>${esc(timeStr)}</strong>.</p>
    <p>One favor: click "Yes" on the calendar invite so it actually sits on your calendar instead of just floating in your inbox.</p>
    <p>Link: <a href="${esc(meetingLink)}" style="color:#1f3a5f">${esc(meetingLink)}</a></p>
    <p><strong>What you can expect:</strong> We'll go over your existing outbound setup, and design a system live that would get you qualified bookings with increased show-up rates.</p>
    <p>See you then,</p>
    <p style="color:#334155;font-weight:600;margin-top:4px">${esc(closerName)}</p>
  </div>`;

  try {
    const t = getPlaybookTransporter();
    await t.sendMail({
      from,
      to: booking.email,
      subject: `Call confirmation — ${dayStr} at ${timeStr}`,
      text,
      html,
    });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Booking Confirmation email failed:", err?.message || err);
    return false;
  }
}

// 2. Value touch — sent at the branch-specific offset before the call.
export async function sendBookingValueEmail(booking) {
  const from = playbookFrom();
  const dayStr = formatMeetingDay(booking.startTime);
  const closerName = getCloserName();

  const text = `We're not just talking on ${dayStr}.

We're building your ICP live, then pulling 10 real companies that match it.

You walk away with a working list either way, whether we end up working together or not.

Come with a rough sense of your best clients. We'll do the rest on the call.

${closerName}`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#0f172a">
    <p>We're not just talking on <strong>${esc(dayStr)}</strong>.</p>
    <p>We're building your ICP live, then pulling 10 real companies that match it.</p>
    <p>You walk away with a working list either way, whether we end up working together or not.</p>
    <p>Come with a rough sense of your best clients. We'll do the rest on the call.</p>
    <p style="color:#334155;font-weight:600;margin-top:16px">${esc(closerName)}</p>
  </div>`;

  try {
    const t = getPlaybookTransporter();
    await t.sendMail({
      from,
      to: booking.email,
      subject: "what we're building on the call",
      text,
      html,
    });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Booking Value email failed:", err?.message || err);
    return false;
  }
}

// 3. Reminder 1 — 24 hours before (branches A/B only).
export async function sendBookingReminder1Email(booking) {
  const from = playbookFrom();
  const dayStr = formatMeetingDay(booking.startTime);
  const timeStr = formatMeetingTime(booking.startTime, booking.attendeeTimeZone);
  const meetingLink = booking.meetingLink || "the link in your calendar invite";
  const closerName = getCloserName();

  const text = `Reminder: we're on at ${timeStr}, ${dayStr}.

The link is ${meetingLink}.

${closerName}`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#0f172a">
    <p>Reminder: we're on at <strong>${esc(timeStr)}, ${esc(dayStr)}</strong>.</p>
    <p>The link is <a href="${esc(meetingLink)}" style="color:#1f3a5f">${esc(meetingLink)}</a>.</p>
    <p style="color:#334155;font-weight:600;margin-top:16px">${esc(closerName)}</p>
  </div>`;

  try {
    const t = getPlaybookTransporter();
    await t.sendMail({
      from,
      to: booking.email,
      subject: "24 hours remaining",
      text,
      html,
    });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Booking Reminder 1 email failed:", err?.message || err);
    return false;
  }
}

// 4. Reminder 2 — 2 hours before (all branches).
export async function sendBookingReminder2Email(booking) {
  const from = playbookFrom();
  const closerName = getCloserName();

  const text = `Looking forward to the call in a couple hours.

If something came up, just reply and I'll send new times.

${closerName}`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#0f172a">
    <p>Looking forward to the call in a couple hours.</p>
    <p>If something came up, just reply and I'll send new times.</p>
    <p style="color:#334155;font-weight:600;margin-top:16px">${esc(closerName)}</p>
  </div>`;

  try {
    const t = getPlaybookTransporter();
    await t.sendMail({
      from,
      to: booking.email,
      subject: "in 2 hours",
      text,
      html,
    });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Booking Reminder 2 email failed:", err?.message || err);
    return false;
  }
}

