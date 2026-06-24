import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  Workflow,
  Network,
  Gauge,
  Layers,
  Rocket,
  Activity,
  Inbox,
  Linkedin,
  Database,
} from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

const PILLARS = [
  {
    n: "01",
    icon: Compass,
    title: "Strategy First",
    summary: "ICP, offer, messaging — defined before outreach.",
    body:
      "We begin every engagement with ICP development, offer refinement and messaging. Outreach only launches once the strategy can be defended on paper.",
    deliverables: [
      "ICP definition with named accounts",
      "Refined offer and wedge messaging",
      "Buyer-level point of view library",
      "Engagement objectives & success criteria",
    ],
  },
  {
    n: "02",
    icon: Workflow,
    title: "Revenue Infrastructure",
    summary: "CRM, automations and workflows that compound.",
    body:
      "We configure the CRM, automations and workflows that support long-term growth — so the work compounds with every engagement quarter.",
    deliverables: [
      "CRM architecture and pipeline stages",
      "Automation flows and routing rules",
      "Domains, mailboxes and outbound stack",
      "Reporting on pipeline quality, not activity",
    ],
  },
  {
    n: "03",
    icon: Network,
    title: "Multi-Channel Outbound",
    summary: "Email and LinkedIn as one conversation.",
    body:
      "Cold email and LinkedIn work together as one conversation — coordinated, timed, and grounded in the same researched point of view per account.",
    deliverables: [
      "Per-account research briefs",
      "Coordinated email & LinkedIn cadence",
      "Manual QA on every first touch",
      "Reply handling and meeting booking",
    ],
  },
  {
    n: "04",
    icon: Gauge,
    title: "Performance-Based Model",
    summary: "You pay when qualified prospects show up.",
    body:
      "Polaris Origin is paid against qualified prospects who attend the meeting and match the agreed ICP — so incentives stay aligned with pipeline outcomes.",
    deliverables: [
      "Mutually agreed ICP and qualification rubric",
      "Performance-based engagement contract",
      "Weekly attestation and review",
      "Net-30 invoicing, post-attendance",
    ],
  },
];

const PROCESS = [
  {
    icon: Compass,
    label: "Phase 01",
    title: "Strategy",
    duration: "Week 1",
    bullets: [
      "Define ICP and named-account tiers",
      "Refine offer and messaging",
      "Establish positioning",
    ],
  },
  {
    icon: Layers,
    label: "Phase 02",
    title: "Infrastructure",
    duration: "Week 2",
    bullets: [
      "Configure CRM and pipeline stages",
      "Provision domains and mailboxes",
      "Build automation and routing",
    ],
  },
  {
    icon: Rocket,
    label: "Phase 03",
    title: "Launch",
    duration: "Week 3",
    bullets: [
      "Begin coordinated email outreach",
      "Begin LinkedIn outreach",
      "Monitor early signals and reply rates",
    ],
  },
  {
    icon: Activity,
    label: "Phase 04",
    title: "Optimization",
    duration: "Ongoing",
    bullets: [
      "Weekly review of conversations",
      "Refine messaging and offer",
      "Improve pipeline quality continuously",
    ],
  },
];

const CHANNELS = [
  {
    icon: Inbox,
    title: "Email",
    body:
      "Three-domain architecture, warmed and monitored. Every first-touch is hand-written by a researcher and reviewed before send.",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    body:
      "Coordinated with email as one conversation. Connection requests, engagement, and messaging tied to the same researched point of view.",
  },
  {
    icon: Database,
    title: "CRM & Workflows",
    body:
      "CRM architecture, automations and reporting designed so pipeline quality is visible — not just activity volume.",
  },
];

export default function Services() {
  return (
    <div data-testid="page-services">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24">
          <SectionLabel index="01 — Services" label="What We Do" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <h1 className="lg:col-span-8 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              Outbound systems,{" "}
              <span className="font-display italic text-[#1f3a5f]">
                built end to end
              </span>
              .
            </h1>
            <div className="lg:col-span-4 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Polaris Origin engagements cover strategy, revenue
                infrastructure, multi-channel outbound, and performance-based
                pricing — operated as a single system, not four disconnected
                workstreams.
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
              <SectionLabel index="02 — Process" label="Engagement Phases" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                How engagements{" "}
                <span className="font-display italic text-[#1f3a5f]">work</span>.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Four phases. Strategy and infrastructure come first; outbound
                launches in week three; optimisation is continuous. Every
                deliverable has an owner, a due date, and a defended
                hypothesis.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
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
            <SectionLabel index="03 — Channels" label="Where We Operate" />
            <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
              Two channels,{" "}
              <span className="font-display italic text-[#1f3a5f]">one CRM.</span>
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
              Tell us about your{" "}
              <span className="font-display italic text-[#C9A14A]">
                segment and offer
              </span>
              .
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] text-white/70 leading-[1.8]">
              A 30-minute call with the founder. We&apos;ll discuss the market,
              the current motion, and whether Polaris Origin is the right
              partner for the next quarter.
            </p>
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
