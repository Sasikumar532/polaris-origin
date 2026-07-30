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
  return process.env.CLOSER_NAME || "Lakshan Kannan";
}

// Email 2: 2 or 3 Days before the call
export async function sendBookingReminderEmail2(booking) {
  const from = playbookFrom();
  const firstName = String(booking.name || "there").split(" ")[0];
  const dayStr = formatMeetingDay(booking.startTime);
  const company = booking.company || "your company";
  const closerName = getCloserName();

  const text = `Hi ${firstName},

Just a quick note before our conversation on ${dayStr}. I've already started looking into ${company} and putting together a few ideas I'd like to walk you through.

Rather than spending the call talking about ourselves, I'd rather spend it talking about your business. We'll look at things like:
• Whether your current positioning is attracting the right buyers
• Opportunities to generate more qualified meetings through outbound
• Messaging angles I think would resonate with your ideal customers
• Where I'd focus first if I were responsible for your outbound GTM

My goal is simple: I want you to leave the meeting with at least a few actionable ideas, regardless of whether we ever work together.

Looking forward to it.

${closerName}`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#0f172a">
    <p>Hi ${esc(firstName)},</p>
    <p>Just a quick note before our conversation on <strong>${esc(dayStr)}</strong>. I've already started looking into <strong>${esc(company)}</strong> and putting together a few ideas I'd like to walk you through.</p>
    <p>Rather than spending the call talking about ourselves, I'd rather spend it talking about your business. We'll look at things like:</p>
    <ul style="padding-left:20px;margin:12px 0">
      <li>Whether your current positioning is attracting the right buyers</li>
      <li>Opportunities to generate more qualified meetings through outbound</li>
      <li>Messaging angles I think would resonate with your ideal customers</li>
      <li>Where I'd focus first if I were responsible for your outbound GTM</li>
    </ul>
    <p>My goal is simple: I want you to leave the meeting with at least a few actionable ideas, regardless of whether we ever work together.</p>
    <p>Looking forward to it.</p>
    <p style="color:#334155;font-weight:600;margin-top:16px">${esc(closerName)}</p>
  </div>`;

  try {
    const t = getPlaybookTransporter();
    await t.sendMail({
      from,
      to: booking.email,
      subject: "here’s what you can look forward to",
      text,
      html,
    });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Booking Reminder Email 2 failed:", err?.message || err);
    return false;
  }
}

// Email 3: 24 Hours Before
export async function sendBookingReminderEmail3(booking) {
  const from = playbookFrom();
  const firstName = String(booking.name || "there").split(" ")[0];
  const company = booking.company || "your company";
  const closerName = getCloserName();

  const text = `Hi ${firstName},

Looking forward to speaking tomorrow. I've reserved time specifically to prepare for our conversation, so I want to make sure we get as much value out of the meeting as possible.

During our call we'll review:
✓ The custom outbound GTM blueprint I prepared
✓ Where I think ${company} has the biggest growth opportunities
✓ The fastest wins I'd prioritize first
✓ Any questions you have around outbound, deliverability, targeting, or messaging

One thing that would help: Come with your biggest outbound challenge or goal. That'll let us spend more time on what's most valuable to you.

See you tomorrow.

${closerName}`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#0f172a">
    <p>Hi ${esc(firstName)},</p>
    <p>Looking forward to speaking tomorrow. I've reserved time specifically to prepare for our conversation, so I want to make sure we get as much value out of the meeting as possible.</p>
    <p>During our call we'll review:</p>
    <ul style="list-style-type:none;padding-left:0;margin:12px 0">
      <li style="margin-bottom:6px">✓ The custom outbound GTM blueprint I prepared</li>
      <li style="margin-bottom:6px">✓ Where I think <strong>${esc(company)}</strong> has the biggest growth opportunities</li>
      <li style="margin-bottom:6px">✓ The fastest wins I'd prioritize first</li>
      <li style="margin-bottom:6px">✓ Any questions you have around outbound, deliverability, targeting, or messaging</li>
    </ul>
    <p>One thing that would help: Come with your biggest outbound challenge or goal. That'll let us spend more time on what's most valuable to you.</p>
    <p>See you tomorrow.</p>
    <p style="color:#334155;font-weight:600;margin-top:16px">${esc(closerName)}</p>
  </div>`;

  try {
    const t = getPlaybookTransporter();
    await t.sendMail({
      from,
      to: booking.email,
      subject: "ready for tomorrow?",
      text,
      html,
    });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Booking Reminder Email 3 failed:", err?.message || err);
    return false;
  }
}

// Email 4: 2 Hours Before
export async function sendBookingReminderEmail4(booking) {
  const from = playbookFrom();
  const firstName = String(booking.name || "there").split(" ")[0];
  const meetingLink = booking.meetingLink || "your calendar invitation";
  const closerName = getCloserName();

  const text = `Hi ${firstName},

Just a quick reminder that we're meeting in about two hours. Here's your meeting link: ${meetingLink}

I've finished preparing your outbound GTM blueprint and I'm looking forward to walking you through it.

See you soon.

${closerName}`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#0f172a">
    <p>Hi ${esc(firstName)},</p>
    <p>Just a quick reminder that we're meeting in about two hours. Here's your meeting link:</p>
    <p style="margin:16px 0"><a href="${esc(meetingLink)}" style="display:inline-block;padding:10px 20px;background-color:#16294a;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600">${esc(meetingLink)}</a></p>
    <p>I've finished preparing your outbound GTM blueprint and I'm looking forward to walking you through it.</p>
    <p>See you soon.</p>
    <p style="color:#334155;font-weight:600;margin-top:16px">${esc(closerName)}</p>
  </div>`;

  try {
    const t = getPlaybookTransporter();
    await t.sendMail({
      from,
      to: booking.email,
      subject: "see you shortly",
      text,
      html,
    });
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Booking Reminder Email 4 failed:", err?.message || err);
    return false;
  }
}

