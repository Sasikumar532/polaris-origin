import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Target,
  Compass,
  Network,
  ShieldCheck,
  FileText,
  Layers,
  LineChart,
  Inbox,
  Phone,
  Calendar,
} from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

const PILLARS = [
  {
    n: "01",
    icon: Target,
    title: "ICP & Offer Engineering",
    summary: "Codify the buyer. Sharpen the wedge.",
    body:
      "Two-week intensive that produces an Offer Doctrine, a tiered ICP map, and the messaging primitives every downstream channel will use. No more anecdotal positioning.",
    deliverables: [
      "Offer Doctrine (14-page operating document)",
      "ICP tiering with named accounts",
      "Buying-committee map per segment",
      "Wedge messaging primitives",
    ],
  },
  {
    n: "02",
    icon: Compass,
    title: "Hyper-Personalized Outbound",
    summary: "Research-led. One-to-one. No spray.",
    body:
      "Every account receives a researched point of view before a sequence ever begins. Our analysts build account briefs your AEs would build — if they had the time.",
    deliverables: [
      "Per-account research briefs",
      "Researcher-written first touches",
      "Signal-led trigger libraries",
      "Manual QA on every send",
    ],
  },
  {
    n: "03",
    icon: Network,
    title: "Multi-Channel Orchestration",
    summary: "Email · LinkedIn · Voice · Warm direct.",
    body:
      "Sequencing engineered around your buyer's decision rhythm — not our send schedule. We treat outbound as a single conversation, not five disconnected channels.",
    deliverables: [
      "Channel orchestration plan",
      "Deliverability & domain architecture",
      "Calling cadence with scripts",
      "Account-level rhythm dashboards",
    ],
  },
  {
    n: "04",
    icon: ShieldCheck,
    title: "Show-Up Guarantee",
    summary: "Paid only when prospects show up.",
    body:
      "Qualified meetings count when the prospect attends and matches the rubric you signed. No-shows, mismatches, and reschedules are on us.",
    deliverables: [
      "Mutually signed qualification rubric",
      "Pay-per-show-up contract",
      "Weekly attestation report",
      "Net-30 invoicing, post-attendance",
    ],
  },
];

const PROCESS = [
  {
    icon: FileText,
    label: "Phase 01",
    title: "Discovery & Doctrine",
    duration: "Weeks 1–2",
    bullets: [
      "Interviews with closers, CS, and product",
      "Pipeline & deal-loss audit",
      "Offer Doctrine drafted and reviewed",
    ],
  },
  {
    icon: Layers,
    label: "Phase 02",
    title: "Build & Calibrate",
    duration: "Weeks 3–4",
    bullets: [
      "Signal lists, sequences, infrastructure",
      "Three calibration cohorts",
      "Compliance & deliverability sign-off",
    ],
  },
  {
    icon: LineChart,
    label: "Phase 03",
    title: "Run & Compound",
    duration: "Week 5 → ongoing",
    bullets: [
      "Weekly operating review with revenue",
      "Pay-per-show-up invoicing begins",
      "Quarterly doctrine refresh",
    ],
  },
];

const CHANNELS = [
  {
    icon: Inbox,
    title: "Email",
    body:
      "Three-domain architecture, warmed and monitored. Every first-touch is hand-written by a named analyst on the engagement.",
  },
  {
    icon: Phone,
    title: "Voice",
    body:
      "Senior callers — not gig SDRs. Scripts written against the Offer Doctrine, with weekly call reviews against the live pipeline.",
  },
  {
    icon: Calendar,
    title: "Calendar",
    body:
      "Mutual-action booking, agenda-first invites, and pre-call briefs delivered to your AE 24 hours before the meeting.",
  },
];

export default function Services() {
  return (
    <div data-testid="page-services">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24">
          <SectionLabel index="01 — Capabilities" label="Services" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <h1 className="lg:col-span-8 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              Systematic growth.
              <br />
              <span className="font-display italic text-[#1f3a5f]">
                Engineered for enterprise.
              </span>
            </h1>
            <div className="lg:col-span-4 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                A single firm executing four tightly integrated disciplines.
                One contract. One operating cadence. One number that matters:
                qualified meetings that show up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS DETAIL */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-px bg-slate-200 border border-slate-200">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.n}
                  data-testid={`service-pillar-${p.n}`}
                  className="bg-white p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10"
                >
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] num-cap">
                        {p.n}
                      </span>
                      <Icon
                        size={20}
                        strokeWidth={1.25}
                        className="text-[#1f3a5f]"
                      />
                    </div>
                    <h2 className="mt-8 text-[26px] lg:text-[34px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.1]">
                      {p.title}
                    </h2>
                    <p className="mt-4 text-[15px] text-[#1f3a5f] font-medium">
                      {p.summary}
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-[16px] leading-[1.8] text-slate-600">
                      {p.body}
                    </p>
                  </div>
                  <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-slate-200 lg:pl-8 pt-6 lg:pt-0">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                      Deliverables
                    </p>
                    <ul className="mt-5 space-y-3">
                      {p.deliverables.map((d) => (
                        <li
                          key={d}
                          className="text-[14px] text-slate-700 flex gap-3"
                        >
                          <span className="mt-2 inline-block w-2 h-px bg-[#C9A14A]" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#f5f6f8] border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel index="02 — Method" label="Engagement Phases" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                Three phases. <br />
                <span className="font-display italic text-[#1f3a5f]">One operating cadence.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Engagements move on a fixed cadence. Every artifact has an
                owner, a due date, and a defended hypothesis. No surprise
                deliverables. No "strategy decks" that never ship.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {PROCESS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-white p-10 lg:p-12">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#1f3a5f] font-medium">
                      {p.label}
                    </p>
                    <Icon
                      size={20}
                      strokeWidth={1.25}
                      className="text-[#C9A14A]"
                    />
                  </div>
                  <h3 className="mt-12 text-[24px] tracking-tight font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.18em] text-slate-500">
                    {p.duration}
                  </p>
                  <ul className="mt-8 space-y-4 border-t border-slate-200 pt-8">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-[14px] leading-[1.7] text-slate-700 flex gap-3"
                      >
                        <span className="mt-2 inline-block w-2 h-px bg-[#C9A14A]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <SectionLabel index="03 — Channels" label="Where we operate" />
            <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
              Three channels.{" "}
              <span className="font-display italic text-[#1f3a5f]">One conversation.</span>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="bg-white p-10">
                  <Icon
                    size={22}
                    strokeWidth={1.25}
                    className="text-[#1f3a5f]"
                  />
                  <h3 className="mt-10 text-[22px] tracking-tight font-semibold text-slate-900">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.75] text-slate-600">
                    {c.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1f3a5f] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-lines-dark opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <SectionLabel index="04 —" label="Next Step" tone="light" />
            <h2 className="mt-8 text-[36px] lg:text-[56px] leading-[1.05] tracking-tighter-2 font-semibold">
              Tell us the segment.
              <br />
              <span className="font-display italic text-[#C9A14A]">
                We will return the playbook.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/contact"
              data-testid="services-cta"
              className="group inline-flex items-center gap-3 bg-white text-[#1f3a5f] px-8 py-5 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#C9A14A] hover:text-[#1f3a5f] transition-colors"
            >
              Book Free Consultation
              <ArrowUpRight
                size={18}
                strokeWidth={1.75}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
