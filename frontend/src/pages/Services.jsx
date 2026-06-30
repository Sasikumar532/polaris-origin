import {
  Compass,
  Inbox,
  Database,
  PenTool,
  Gauge,
  MessageSquare,
  Linkedin,
} from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";
import CTASection from "@/components/site/CTASection";

const PILLARS = [
  {
    n: "01",
    icon: Compass,
    title: "ICP Defining & Offer Building Workshop",
    body:
      "We start by defining the ideal customer profile, sharpening the offer, and positioning the message so outreach is aimed at buyers with clear demand and buying intent.",
  },
  {
    n: "02",
    icon: Inbox,
    title: "Email Infrastructure Setup",
    body:
      "We build and configure the sending infrastructure properly from day one, ensuring deliverability, domain health, and a foundation that supports long-term outbound growth.",
  },
  {
    n: "03",
    icon: Database,
    title: "Lead Sourcing & Data Enrichment",
    body:
      "Target accounts are carefully sourced and enriched with accurate contact data and relevant company insights, giving every campaign a stronger starting point.",
  },
  {
    n: "04",
    icon: PenTool,
    title: "Hyper-Personalized Sequence Writing",
    body:
      "Every sequence is crafted around the prospect's context and pain points, turning cold outreach into conversations that feel relevant and worth replying to.",
  },
  {
    n: "05",
    icon: Gauge,
    title: "A/B Testing & Iteration",
    body:
      "Campaigns are continuously refined through structured testing, allowing messaging, targeting, and timing to improve based on real-world performance.",
  },
  {
    n: "06",
    icon: MessageSquare,
    title: "Reply Management & Lead Qualification",
    body:
      "Responses are handled promptly and consistently, with prospects qualified against agreed criteria so meetings are booked only with accounts that fit the engagement objectives.",
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
                pricing — operated as a single system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS DETAIL */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-28">
          <SectionLabel index="02 — Process" label="Engagement Phases" />
          <h2 className="mt-10 mb-16 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
            How engagements{" "}
            <span className="font-display italic text-[#1f3a5f]">work</span>.
          </h2>
          <div className="grid grid-cols-1 gap-px bg-slate-200 border border-slate-200">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.n}
                  data-testid={`service-pillar-${p.n}`}
                  className="bg-white p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center"
                >
                  <div className="lg:col-span-5 flex items-center gap-4">
                    <span className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] num-cap shrink-0">
                      {p.n}
                    </span>
                    <Icon
                      size={20}
                      strokeWidth={1.25}
                      className="text-[#1f3a5f] shrink-0"
                    />
                    <h2 className="text-[22px] lg:text-[26px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.15]">
                      {p.title}
                    </h2>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-[16px] leading-[1.8] text-slate-600">
                      {p.body}
                    </p>
                  </div>
                </article>
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
      <CTASection
        index="04 —"
        testId="services-cta"
        body="A 30-minute call with the founder. We'll discuss the market, the current motion, and whether Polaris Origin is the right partner for the next quarter."
      >
        Tell us about your{" "}
        <span className="font-display italic text-[#1f3a5f]">
          segment and offer
        </span>
        .
      </CTASection>
    </div>
  );
}
