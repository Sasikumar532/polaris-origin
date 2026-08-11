"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  PlayCircle,
  MapPin,
  Users,
  Calendar,
  Target,
  Building2,
  Trophy,
  User,
  Search,
  Zap,
  AlertTriangle,
  Gift,
  ArrowUpRight,
  ExternalLink,
  Lock,
  Plus,
  Minus,
  Check,
  ArrowRight,
  ArrowDown,
  Mail,
  Database,
  TrendingUp,
  Radio,
  ShieldCheck,
  CalendarClock,
  CalendarDays,
  Globe,
} from "lucide-react";
import Logo from "@/components/site/Logo";
import SectionLabel from "@/components/site/SectionLabel";

const MONO =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

const GOLD = "#c9a14a";
const NAVY = "#1f3a5f";
const NAVY_DEEP = "#16294a";

// Every value below is a placeholder — this page will later be filled from
// per-prospect research data. Structure and copy match the design export.
const PLACEHOLDER = "﹛ %s ﹜";
const ph = (label) => `﹛ ${label} ﹜`;

const NAV_ITEMS = [
  { index: "01", label: "Walkthrough", href: "#sec-01" },
  { index: "02", label: "Source data", href: "#sec-02" },
  { index: "03", label: "Campaign plan", href: "#sec-03" },
  { index: "04", label: "Your customers", href: "#sec-04" },
  { index: "05", label: "Volume math", href: "#sec-05" },
  { index: "06", label: "The full system", href: "#sec-06" },
  { index: "07", label: "Next step", href: "#sec-07" },
];

const SNAPSHOT_ITEMS = [
  { icon: MapPin, label: "Headquarters", value: ph("City, State") },
  { icon: Users, label: "Team size", value: `~${ph("headcount")}` },
  { icon: Calendar, label: "Founded", value: ph("Year") },
  { icon: Target, label: "Focus", value: ph("What they build") },
  { icon: Building2, label: "Industries worked with", value: ph("From their case studies") },
  { icon: Trophy, label: "Signals / Achievements", value: ph("Signals or achievements, or delete this row") },
];

const CAMPAIGNS = [
  {
    name: ph("Campaign name"),
    typeLabel: "Signal triggered",
    typeIcon: Radio,
    badgeBg: GOLD,
    badgeColor: NAVY_DEEP,
    who: ph("The segment and the titles inside it"),
    sourcing: [ph("tool and filter"), ph("tool and filter"), ph("tool and filter")],
    trigger: ph("The event that puts a company into this campaign"),
    pain: ph("The specific consequence the trigger creates for them"),
    leadMagnet: ph("The asset offered in the email, built from public information, produced in minutes not hours"),
    angle: ph("One line on what the email leads with"),
  },
  {
    name: "Broad volume base",
    typeLabel: "Broad volume",
    typeIcon: Users,
    badgeBg: NAVY,
    badgeColor: "#ffffff",
    who: "Every decision maker across the segments above",
    sourcing: [
      "The searches from the campaigns above",
      "Everyone not captured by a live signal",
      "Refresh and re-enter every 90 days",
    ],
    trigger: "None. This is the base layer.",
    pain: "Most companies that will hire you this year are not showing a public signal today. Waiting for one means missing them.",
    leadMagnet: ph("A self-serve asset that needs no research, so it can go to everyone"),
    angle: "Straight value proposition, tightest possible copy, high volume.",
  },
];

const BREAKDOWN = [
  { label: "Decision maker", max: 30 },
  { label: "Industry", max: 20 },
  { label: "Signal strength", max: 50 },
];

const LOCKED_ROW_COUNT = 5;
const BLURRED_ROWS = Array.from({ length: 5 }, (_, i) => ({ key: i + 1, locked: true }));

const KEEPS = [
  "Your ICP defined properly, with you, on the call",
  "25 companies matching it, sourced live",
  "The decision maker at each one, with a verified email address",
  "The signal that makes each company worth contacting now",
  "Yours to keep and use, whether you work with us or not",
];

const FUNNEL_STATS = [
  { icon: Building2, n: ph("~X,000"), l: "Companies in your market", width: "100%" },
  { icon: CalendarClock, n: ph("TAM / 3"), l: "To reach per month", width: "68%" },
  { icon: CalendarDays, n: ph("/ 22"), l: "Per working day", width: "40%" },
];

const INFRA_STATS = [
  { icon: Mail, n: ph("/ 25"), l: "Sending inboxes" },
  { icon: Globe, n: ph("/ 2"), l: "Domains" },
  { icon: ShieldCheck, n: ph("same as active"), l: "Inboxes warming in reserve" },
];

const dashedTag = {
  borderBottom: `1px dashed ${GOLD}`,
  display: "inline-block",
};

function Placeholder({ children, className = "" }) {
  return (
    <span style={dashedTag} className={className}>
      {children}
    </span>
  );
}

function SideNav() {
  const [active, setActive] = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href));
    sectionsRef.current = sections;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionsRef.current.indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden lg:flex fixed left-7 top-1/2 -translate-y-1/2 z-40 flex-col">
      {NAV_ITEMS.map((item, i) => {
        const isActive = i === active;
        return (
          <a
            key={item.index}
            href={item.href}
            className="flex items-center gap-2.5 no-underline px-0.5 py-2 text-[#c9a14a] hover:text-[#a9822f]"
            style={{
              fontFamily: MONO,
              fontSize: isActive ? 14 : 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              marginTop: isActive ? 8 : 0,
              marginBottom: isActive ? 8 : 0,
              transition: "font-size .3s ease, margin .3s ease, color .2s ease",
            }}
          >
            <span
              className="block bg-current flex-shrink-0"
              style={{
                width: isActive ? 22 : 15,
                height: isActive ? 2 : 1,
                transition: "width .3s ease, height .3s ease",
              }}
            />
            {item.index}
          </a>
        );
      })}
    </nav>
  );
}

export default function OutboundBlueprint() {
  const [expandedRow, setExpandedRow] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const selCamp = CAMPAIGNS[selectedCampaign];

  return (
    <div className="text-slate-900 bg-white" style={{ fontFamily: "inherit" }}>
      <SideNav />

      {/* HEADER */}
      <div className="grid-lines-dark relative overflow-hidden" style={{ background: NAVY_DEEP }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 lg:pl-[92px] pt-16 lg:pt-20 pb-16 lg:pb-[88px] relative">
          <div className="max-w-[1040px] mx-auto">
            <div className="flex items-center gap-5 flex-wrap mb-14">
              <div
                className="h-[60px] min-w-[60px] px-[18px] flex items-center justify-center"
                style={{ background: "rgba(255,255,255,.04)", border: `1px dashed ${GOLD}` }}
              >
                <span
                  className="font-display italic whitespace-nowrap"
                  style={{ fontSize: 18, color: "rgba(255,255,255,.72)" }}
                >
                  {ph("Company name")}
                </span>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 16, color: "rgba(255,255,255,.4)" }}>&#215;</span>
              <div className="h-[60px] px-4 flex items-center bg-white" style={{ border: "1px solid rgba(255,255,255,.14)" }}>
                <Logo tone="dark" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              <div className="lg:col-span-7">
                <h1
                  className="font-semibold tracking-tighter-2 text-white"
                  style={{ fontSize: "clamp(34px,4.8vw,58px)", lineHeight: 1.1, margin: 0 }}
                >
                  Custom Outbound{" "}
                  <span className="font-display italic font-normal" style={{ color: GOLD }}>
                    Action Plan
                  </span>
                </h1>
                <p className="mt-6 max-w-[56ch] text-white/70 text-[16px] leading-[1.75]">
                  Everything in this page is built from publicly available information about{" "}
                  <Placeholder>{ph("Company name")}</Placeholder>: your website, your published case
                  studies, your job postings, and public company data. Nothing here came from
                  anywhere you did not put it yourself.
                </p>
              </div>
              <div
                className="lg:col-span-5 flex flex-col gap-7 pl-0 lg:pl-8"
                style={{ borderLeft: "1px solid rgba(255,255,255,.15)" }}
              >
                <div>
                  <div
                    className="uppercase mb-3"
                    style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD }}
                  >
                    Prepared exclusively for
                  </div>
                  <div className="text-white font-semibold" style={{ fontSize: 20 }}>
                    <Placeholder>{ph("Name, Title")}</Placeholder>
                  </div>
                  <div className="mt-1.5 text-white/70 text-[14px]">{ph("Company name")}</div>
                </div>
                <div>
                  <div
                    className="uppercase mb-3"
                    style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,.5)" }}
                  >
                    Prepared by
                  </div>
                  <div className="text-white font-semibold text-[16px]">Polaris Origin</div>
                  <div className="mt-1.5 text-white/70 text-[14px]">Outbound GTM &amp; RevOps</div>
                </div>
                <Placeholder className="text-white/70" >
                  <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.06em" }}>{ph("Date")}</span>
                </Placeholder>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 01 — WALKTHROUGH */}
      <section id="sec-01" className="relative">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 lg:pl-[92px] pt-20 lg:pt-24">
          <div className="max-w-[760px] mx-auto">
            <SectionLabel index="01" label="Walkthrough" />
            <h2 className="mt-5 mb-4.5 font-semibold tracking-tighter-2 text-slate-900" style={{ fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.2 }}>
              I recorded a walkthrough of this
            </h2>
            <p className="text-slate-600 max-w-[64ch] mb-8" style={{ fontSize: 18, lineHeight: 1.75 }}>
              Five minutes on what I found, where the demand in your market is sitting right now,
              and what I would run first.
            </p>
            <div
              className="flex flex-col items-center justify-center text-center"
              style={{ border: "1px dashed #e6e8ec", background: "#f5f6f8", aspectRatio: "16/9" }}
            >
              <PlayCircle size={44} strokeWidth={1.5} style={{ color: GOLD, marginBottom: 18 }} />
              <p className="text-slate-600 text-[16px] m-0">
                Recording now. You will get an email the moment it is up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — SOURCE DATA */}
      <section id="sec-02" className="relative">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 lg:pl-[92px] pt-20 lg:pt-24">
          <div className="max-w-[760px] mx-auto">
            <SectionLabel index="02" label="Source data" />
            <h2 className="mt-5 mb-4.5 font-semibold tracking-tighter-2 text-slate-900" style={{ fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.2 }}>
              What this is built from
            </h2>
            <p className="text-slate-600 max-w-[64ch]" style={{ fontSize: 18, lineHeight: 1.75 }}>
              Before anything else, here is what the public record says about you. If any of this
              is wrong, everything below it shifts, so it is worth two minutes of your time.
            </p>
            <div className="grid gap-px bg-slate-200 border border-slate-200 mt-9" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
              {SNAPSHOT_ITEMS.map((item) => (
                <div key={item.label} className="bg-white p-6">
                  <item.icon size={16} strokeWidth={1.75} style={{ color: GOLD, marginBottom: 14 }} />
                  <div
                    className="uppercase text-slate-500 mb-2"
                    style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em" }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="inline-block text-slate-600 font-medium"
                    style={{ fontSize: 16, lineHeight: 1.4, padding: "2px 8px", borderBottom: `1px dashed ${GOLD}`, background: "rgba(201,161,74,.08)" }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — CAMPAIGN PLAN */}
      <section id="sec-03" className="relative">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 lg:pl-[92px] pt-20 lg:pt-24 pb-16">
          <div className="max-w-[760px] mx-auto">
            <SectionLabel index="03" label="Campaign plan" />
            <h2 className="mt-5 mb-4.5 font-semibold tracking-tighter-2 text-slate-900" style={{ fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.2 }}>
              What I would run, and in what order
            </h2>
            <div className="bg-[#f5f6f8] py-5 px-7" style={{ borderLeft: `2px solid ${GOLD}` }}>
              <p className="text-slate-600 m-0 max-w-[66ch]" style={{ fontSize: 15.5, lineHeight: 1.75 }}>
                Every campaign here leads with something useful rather than a call. Lead magnets
                have been shown to lift reply rates by around 5x, because it nurtures a cold
                prospect and turns them into a warm prospect who will more likely be open to a
                call after receiving value upfront, as opposed to just giving a stranger, time on
                their calendar.
              </p>
            </div>
          </div>

          <div className="max-w-[1080px] mx-auto mt-10 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-px bg-slate-200 border border-slate-200">
            <div className="flex flex-col gap-px bg-slate-200">
              {CAMPAIGNS.map((camp, i) => {
                const isSel = i === selectedCampaign;
                return (
                  <button
                    key={camp.name + i}
                    type="button"
                    onClick={() => setSelectedCampaign(i)}
                    className="w-full flex items-center gap-3.5 py-4 px-6 text-left border-0 cursor-pointer"
                    style={{
                      background: isSel ? "rgba(201,161,74,.14)" : "#fff",
                      borderLeft: isSel ? `3px solid ${GOLD}` : "3px solid transparent",
                    }}
                  >
                    <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: GOLD, flexShrink: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-medium tracking-tight text-slate-900" style={{ fontSize: 16 }}>
                      {camp.name}
                    </span>
                    <camp.typeIcon size={15} strokeWidth={1.75} style={{ color: GOLD, flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>
            <div className="bg-[#f5f6f8] p-9 lg:p-10">
              <div
                className="inline-flex items-center whitespace-nowrap uppercase font-medium mb-5"
                style={{
                  padding: "6px 14px",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  border: "1px solid",
                  background: selCamp.badgeBg,
                  color: selCamp.badgeColor,
                  borderColor: selCamp.badgeBg,
                }}
              >
                {selCamp.typeLabel}
              </div>
              <div className="grid" style={{ borderTop: "1px solid #e6e8ec" }}>
                <DetailRow icon={User} label="Who (ICP)" value={selCamp.who} />
                <DetailRow icon={Search} label="Where (Source)">
                  <div className="flex flex-col items-start gap-1.5">
                    {selCamp.sourcing.map((src, i) => (
                      <code
                        key={i}
                        className="inline-block bg-white border border-slate-200"
                        style={{ fontFamily: MONO, fontSize: 13, padding: "3px 9px" }}
                      >
                        {src}
                      </code>
                    ))}
                  </div>
                </DetailRow>
                <DetailRow icon={Zap} label="Trigger" value={selCamp.trigger} />
                <DetailRow icon={AlertTriangle} label="Why they buy now" value={selCamp.pain} />
                <DetailRow icon={Gift} label="Lead magnet" value={selCamp.leadMagnet} />
                <DetailRow icon={ArrowUpRight} label="The angle" value={selCamp.angle} last />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — YOUR IDEAL CUSTOMERS */}
      <section id="sec-04">
        <div className="relative overflow-hidden" style={{ background: NAVY_DEEP, padding: "104px 0 112px" }}>
          <div className="grid-lines-dark absolute inset-0" style={{ opacity: 0.5 }} />
          <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-10 lg:pl-[92px]">
            <div className="max-w-[860px] mx-auto">
              <SectionLabel index="04" label="Live results" tone="light" />
              <h2 className="mt-5 mb-4.5 font-semibold tracking-tighter-2 text-white" style={{ fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.2 }}>
                Your Ideal Customers
              </h2>
              <p className="text-white/70 max-w-[64ch]" style={{ fontSize: 18, lineHeight: 1.75 }}>
                These came out of the searches above. Real companies, ranked by how well they fit
                and how recently their signal fired.
              </p>

              <div className="mt-10 overflow-x-auto" style={{ border: "1px solid rgba(255,255,255,.15)" }}>
                <table className="w-full border-collapse" style={{ fontSize: 12.5, tableLayout: "fixed" }}>
                  <thead>
                    <tr>
                      {["Name", "LinkedIn", "Email", "Company", "Headcount", "Location", "Signal", "Score"].map((h, i) => (
                        <th
                          key={h}
                          className="uppercase font-medium"
                          style={{
                            fontFamily: MONO,
                            fontSize: 10.5,
                            letterSpacing: "0.12em",
                            color: "rgba(255,255,255,.7)",
                            textAlign: i === 7 ? "right" : "left",
                            padding: "11px 10px",
                            background: NAVY_DEEP,
                            borderBottom: "1px solid rgba(255,255,255,.15)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      onClick={() => setExpandedRow((v) => !v)}
                      className="cursor-pointer"
                      style={{ transition: "background-color .2s ease" }}
                    >
                      <td style={tdInverse}>
                        <div className="flex items-center gap-2.5">
                          <span
                            className="inline-block text-white font-medium whitespace-nowrap"
                            style={{ padding: "2px 8px", borderBottom: `1px dashed ${GOLD}`, background: "rgba(255,255,255,.06)" }}
                          >
                            {ph("Name")}
                          </span>
                          {expandedRow ? (
                            <Minus size={13} strokeWidth={1.75} style={{ color: GOLD, flexShrink: 0 }} />
                          ) : (
                            <Plus size={13} strokeWidth={1.75} style={{ color: GOLD, flexShrink: 0 }} />
                          )}
                        </div>
                      </td>
                      <td style={{ ...tdInverse, color: "rgba(255,255,255,.7)" }}>
                        <span className="inline-flex items-center gap-1.5">
                          <ExternalLink size={13} strokeWidth={1.75} style={{ color: "rgba(255,255,255,.7)" }} />
                          <Placeholder>{ph("LinkedIn profile")}</Placeholder>
                        </span>
                      </td>
                      <td style={{ ...tdInverse, color: "rgba(255,255,255,.7)" }}><Placeholder>{ph("Email")}</Placeholder></td>
                      <td style={{ ...tdInverse, color: "rgba(255,255,255,.7)" }}><Placeholder>{ph("Company")}</Placeholder></td>
                      <td style={{ ...tdInverse, color: "rgba(255,255,255,.7)" }}><Placeholder>{ph("Headcount")}</Placeholder></td>
                      <td style={{ ...tdInverse, color: "rgba(255,255,255,.7)" }}><Placeholder>{ph("Location")}</Placeholder></td>
                      <td style={{ ...tdInverse, color: "rgba(255,255,255,.7)" }}><Placeholder>{ph("Signal and how recent")}</Placeholder></td>
                      <td style={{ ...tdInverse, textAlign: "right" }}>
                        <span style={{ fontFamily: MONO, fontSize: 14, color: GOLD, borderBottom: `1px dashed ${GOLD}` }}>
                          {ph("Score")}
                        </span>
                      </td>
                    </tr>
                    <tr style={{ display: expandedRow ? "table-row" : "none" }}>
                      <td colSpan={8} style={{ background: "rgba(255,255,255,.03)", padding: "0 16px" }}>
                        <div className="py-6">
                          <p className="text-white/70 max-w-[70ch] mb-5" style={{ fontSize: 15 }}>
                            {ph("What the signal is, what it implies, and why they are worth contacting this month")}
                          </p>
                          <div className="grid gap-3 max-w-[440px]">
                            {BREAKDOWN.map((b) => (
                              <div key={b.label} className="grid items-center gap-3" style={{ gridTemplateColumns: "140px 1fr 70px" }}>
                                <span className="uppercase text-white/70" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em" }}>
                                  {b.label}
                                </span>
                                <span className="block" style={{ height: 5, border: "1px dashed rgba(201,161,74,.55)" }} />
                                <span className="text-right whitespace-nowrap text-white/70" style={{ fontFamily: MONO, fontSize: 12 }}>
                                  {ph("Score")} / {b.max}
                                </span>
                              </div>
                            ))}
                          </div>
                          <a
                            href="#"
                            className="inline-block mt-4.5 no-underline"
                            style={{ fontFamily: MONO, fontSize: 11.5, color: GOLD, borderBottom: "1px solid rgba(201,161,74,.4)" }}
                          >
                            Source
                          </a>
                        </div>
                      </td>
                    </tr>
                    {BLURRED_ROWS.map((row) => (
                      <tr key={row.key}>
                        <td style={tdInverse}>
                          <span
                            className="inline-block text-white font-medium select-none"
                            style={{ filter: "blur(5px)", opacity: 0.55, pointerEvents: "none" }}
                          >
                            {ph("Name")}
                          </span>
                        </td>
                        {["LinkedIn profile", "Email", "Company", "Headcount", "Location", "Signal"].map((label) => (
                          <td
                            key={label}
                            style={{
                              ...tdInverse,
                              color: "rgba(255,255,255,.7)",
                              filter: row.locked ? "blur(5px)" : "none",
                              opacity: row.locked ? 0.55 : 1,
                              pointerEvents: row.locked ? "none" : "auto",
                            }}
                          >
                            {ph(label)}
                          </td>
                        ))}
                        <td style={{ ...tdInverse, textAlign: "right" }}>
                          <Lock size={14} strokeWidth={1.75} style={{ color: "rgba(255,255,255,.6)" }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="mt-7 p-8 lg:p-10"
                style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.15)" }}
              >
                <h3 className="text-white font-semibold mb-2.5" style={{ fontSize: 20 }}>
                  The rest of this list gets built with you, live
                </h3>
                <p className="text-white/70 max-w-[64ch] m-0" style={{ fontSize: 16, lineHeight: 1.75 }}>
                  With your inputs, we&apos;ll pull leads live on call and built you a small list
                  for you to check quality. You can keep it at the end of the call.
                </p>
                <div className="mt-6 flex justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 uppercase no-underline transition-colors"
                    style={{
                      background: GOLD,
                      color: NAVY_DEEP,
                      border: `1px solid ${GOLD}`,
                      padding: "18px 32px",
                      fontSize: 13,
                      letterSpacing: "0.1em",
                    }}
                  >
                    <strong className="font-bold">Book Your Lead Sourcing Session &#8594;</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — VOLUME MATH */}
      <section id="sec-05" className="relative">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 lg:pl-[92px] pt-20 lg:pt-24">
          <div className="max-w-[760px] mx-auto">
            <SectionLabel index="05" label="Volume math" />
            <h2 className="mt-5 mb-4.5 font-semibold tracking-tighter-2 text-slate-900" style={{ fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.2 }}>
              How much you need to send
            </h2>
            <p className="text-slate-600 max-w-[64ch] mb-6" style={{ fontSize: 18, lineHeight: 1.75 }}>
              Your market is roughly <Placeholder>{ph("TAM")}</Placeholder> companies. Basic
              thumbrule is for you to send as much emails as possible, such that you completely
              contact your TAM within a quarter.
            </p>
            <p className="text-slate-600 max-w-[66ch] mb-4.5" style={{ fontSize: 17, lineHeight: 1.75 }}>
              Work on a ninety day cycle. A company with no budget for you in March can have a
              signed off project by June. Priorities move, people change roles, a competitor
              misses a deadline, a board asks for something to ship.
            </p>
            <p className="text-slate-600 max-w-[66ch]" style={{ fontSize: 17, lineHeight: 1.75 }}>
              And nobody remembers a cold email they ignored last quarter. When you come back
              round, it lands like the first one.
            </p>

            <div className="flex flex-col items-center mt-10">
              {FUNNEL_STATS.map((stat) => (
                <div key={stat.l} className="w-full flex flex-col items-center">
                  <div
                    className="box-border text-center"
                    style={{ width: stat.width, border: "1px solid #e6e8ec", background: "#f5f6f8", padding: "20px 22px" }}
                  >
                    <stat.icon size={15} strokeWidth={1.75} style={{ color: GOLD, display: "inline-block", marginBottom: 10 }} />
                    <div className="font-display italic" style={{ fontSize: 30, lineHeight: 1, color: NAVY }}>
                      {stat.n}
                    </div>
                    <div
                      className="uppercase text-slate-500 mt-2.5"
                      style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.12em", lineHeight: 1.5 }}
                    >
                      {stat.l}
                    </div>
                  </div>
                  <div style={{ width: 1, height: 18, background: GOLD, opacity: 0.6 }} />
                </div>
              ))}
              <ArrowDown size={16} strokeWidth={1.75} style={{ color: GOLD, marginTop: -4 }} />
            </div>

            <div className="grid grid-cols-3 gap-px bg-slate-200 border border-slate-200 mt-7">
              {INFRA_STATS.map((stat) => (
                <div key={stat.l} className="bg-white p-5">
                  <stat.icon size={14} strokeWidth={1.75} style={{ color: GOLD, marginBottom: 10 }} />
                  <div className="font-display italic" style={{ fontSize: 24, lineHeight: 1, color: NAVY }}>
                    {stat.n}
                  </div>
                  <div
                    className="uppercase text-slate-500 mt-2.5"
                    style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", lineHeight: 1.5 }}
                  >
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-500 mt-5" style={{ fontFamily: MONO, fontSize: 12 }}>
              Based on 25 emails per inbox per day, two inboxes per domain, and one warming inbox
              held in reserve for every active one so nothing stops when a domain degrades.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/resources/outbound-gtm-roi-calculator"
                className="inline-flex items-center gap-2.5 font-bold uppercase no-underline transition-colors"
                style={{ fontSize: 13, letterSpacing: "0.08em", color: NAVY_DEEP, background: GOLD, border: `1px solid ${GOLD}`, padding: "14px 24px" }}
              >
                <strong className="font-bold">Run your numbers in our free GTM ROI Calculator</strong>
                <ArrowRight size={15} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — THE FULL SYSTEM */}
      <section id="sec-06" className="relative">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 lg:pl-[92px] pt-20 lg:pt-24 pb-10">
          <div className="max-w-[760px] mx-auto">
            <SectionLabel index="06" label="The full system" />
            <h2 className="mt-5 mb-4.5 font-semibold tracking-tighter-2 text-slate-900" style={{ fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.2 }}>
              Outbound can only do so much
            </h2>
            <div className="text-slate-600 max-w-[66ch]" style={{ fontSize: 18, lineHeight: 1.75 }}>
              <p className="mb-4.5">Outbound only works if the rest of your sales setup works.</p>
              <p className="m-0">You must have real sales capability to handle sales calls and convert them.</p>
            </div>

            <div className="flex items-start justify-center flex-wrap my-8">
              {[
                { icon: Mail, label: "Outbound", label2: "emails" },
                { icon: Database, label: "CRM", label2: "hygiene" },
                { icon: TrendingUp, label: "GTM", label2: "Engineering" },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-start">
                  <div className="flex flex-col items-center gap-3" style={{ width: 140 }}>
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{ width: 54, height: 54, border: `1px solid ${GOLD}` }}
                    >
                      <step.icon size={20} strokeWidth={1.75} style={{ color: GOLD }} />
                    </div>
                    <span className="font-medium text-center text-slate-900" style={{ fontSize: 13, lineHeight: 1.4 }}>
                      {step.label}
                      <br />
                      {step.label2}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight size={16} strokeWidth={1.75} className="text-slate-400 flex-shrink-0" style={{ margin: "18px 4px 0" }} />
                  )}
                </div>
              ))}
            </div>

            <p className="text-center mb-8" style={{ fontFamily: MONO, fontSize: 20, letterSpacing: "0.06em", color: NAVY }}>
              Outbound <span style={{ color: GOLD }}>&times;</span> RevOps <span style={{ color: GOLD }}>=</span> GTM Engineering
            </p>

            <div className="text-slate-600 max-w-[66ch]" style={{ fontSize: 18, lineHeight: 1.75 }}>
              <p className="m-0">
                Your CRM is where that starts. When records are messy or half filled, you cannot
                tell which campaign brought in money, which deals went quiet, or where you are
                losing people. You end up guessing.
              </p>
            </div>
            <div className="text-slate-600 max-w-[66ch] mt-7" style={{ fontSize: 18, lineHeight: 1.75 }}>
              <p className="mb-4.5">
                Maintaining a CRM with proper hygiene, is the best thing a sales team can have, and
                tracking the right KPIs and reviewing them regularly is how you can make data
                backed decisions.
              </p>
              <p className="m-0">
                This is also something we do as part of our service. Meanwhile, you still pay only
                when we get you results - for every meeting where the prospect actually shows up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — NEXT STEP */}
      <section id="sec-07">
        <div className="relative overflow-hidden" style={{ background: NAVY_DEEP, padding: "88px 0 110px" }}>
          <div className="grid-lines-dark absolute inset-0" style={{ opacity: 0.4 }} />
          <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-10 lg:pl-[92px]">
            <div className="max-w-[720px] mx-auto">
              <SectionLabel index="07" label="Next step" tone="light" />
              <h2 className="mt-5 mb-4 font-semibold tracking-tighter-2 text-white" style={{ fontSize: "clamp(32px,4.2vw,46px)", lineHeight: 1.2 }}>
                Your build session
              </h2>
              <p className="text-white/70 max-w-[60ch]" style={{ fontSize: 18, lineHeight: 1.75 }}>
                One call, about forty five minutes. We build your list together while you watch,
                and you keep what we build.
              </p>

              <div className="grid gap-3.5 mt-8">
                {KEEPS.map((k) => (
                  <div key={k} className="flex items-center gap-3">
                    <Check size={15} strokeWidth={2} style={{ color: GOLD, flexShrink: 0 }} />
                    <span className="text-[#DCE5F2]" style={{ fontSize: 16 }}>{k}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 uppercase no-underline transition-colors"
                  style={{ background: GOLD, color: NAVY_DEEP, border: `1px solid ${GOLD}`, padding: "18px 32px", fontSize: 13, letterSpacing: "0.1em" }}
                >
                  <strong className="font-bold">Book Your Lead Sourcing Session &#8594;</strong>
                </Link>
              </div>
              <p className="text-white/70 mt-9" style={{ fontSize: 14 }}>
                Nothing is prepared in advance and emailed over. The list is built during the
                session, which is the only reason it is worth your forty five minutes.
              </p>
              <div
                className="mt-14 pt-6 flex justify-between gap-5 flex-wrap"
                style={{ borderTop: "1px solid rgba(255,255,255,.15)" }}
              >
                <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.06em", color: "rgba(255,255,255,.6)" }}>
                  Polaris Origin&nbsp;&nbsp;&middot;&nbsp;&nbsp;polarisorigin.com
                </span>
                <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.06em", color: "rgba(255,255,255,.6)" }}>
                  Prepared for <Placeholder>{ph("Company name")}</Placeholder>&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                  <Placeholder>{ph("Date")}</Placeholder>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const tdInverse = {
  padding: "10px",
  borderBottom: "1px solid rgba(255,255,255,.15)",
  color: "#fff",
};

function DetailRow({ icon: Icon, label, value, children, last = false }) {
  return (
    <div
      className="grid gap-5 py-3.5"
      style={{ gridTemplateColumns: "150px 1fr", borderBottom: last ? "none" : "1px solid #e6e8ec" }}
    >
      <div
        className="flex items-center gap-1.5 uppercase text-slate-500"
        style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em" }}
      >
        <Icon size={13} strokeWidth={1.75} style={{ color: "#c9a14a" }} />
        {label}
      </div>
      {children ?? (
        <div className="text-slate-900" style={{ fontSize: 15.5, lineHeight: 1.6 }}>
          {value}
        </div>
      )}
    </div>
  );
}
