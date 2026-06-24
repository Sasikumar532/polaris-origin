import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Clock,
  Compass,
  Workflow,
  Network,
  Gauge,
  Quote,
  Layers,
  Rocket,
  Activity,
  Users,
  Server,
  Code,
  Briefcase,
  Megaphone,
  Building2,
} from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";
import { POSTS } from "@/pages/Blog";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB3aGl0ZSUyMG1pbmltYWx8ZW58MHx8fHwxNzgyMjUyMTM2fDA&ixlib=rb-4.1.0&q=85";

const CASE_IMAGE =
  "https://images.pexels.com/photos/5686077/pexels-photo-5686077.jpeg";

const TRUSTED = [
  "Recruitment",
  "IT Services",
  "Software & SaaS",
  "Consulting Firms",
  "Marketing Agencies",
  "Professional Services",
  "B2B Operators",
  "Founder-Led Teams",
];

const METRICS = [
  { k: "Performance", v: "Engagements are priced against qualified prospects who attend the meeting." },
  { k: "Founder-led", v: "Every engagement is personally overseen by the Polaris Origin founder." },
  { k: "Research-driven", v: "Accounts are researched before sequences are written, not after." },
  { k: "Weekly review", v: "We optimise pipeline quality on a weekly cadence with the revenue team." },
];

const DIFFERENTIATORS = [
  {
    n: "01",
    icon: Compass,
    title: "Strategy First",
    body:
      "We begin with ICP development, offer refinement and messaging before launching campaigns.",
  },
  {
    n: "02",
    icon: Workflow,
    title: "Revenue Infrastructure",
    body:
      "CRM architecture, automations and workflows designed to support long-term growth.",
  },
  {
    n: "03",
    icon: Network,
    title: "Multi-Channel Outbound",
    body:
      "Cold email and LinkedIn work together as one conversation.",
  },
  {
    n: "04",
    icon: Gauge,
    title: "Performance-Based Model",
    body:
      "You pay when qualified prospects show up.",
  },
];

const PHASES = [
  {
    n: "01",
    icon: Compass,
    title: "Strategy",
    body: "Define ICP, refine the offer, establish positioning and messaging.",
    duration: "Week 1",
  },
  {
    n: "02",
    icon: Layers,
    title: "Infrastructure",
    body: "Configure CRM, automations, domains and outbound systems.",
    duration: "Week 2",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Launch",
    body: "Begin email and LinkedIn outreach and monitor early signals.",
    duration: "Week 3",
  },
  {
    n: "04",
    icon: Activity,
    title: "Optimization",
    body:
      "Review conversations, improve messaging and continuously refine pipeline quality.",
    duration: "Ongoing",
  },
];

const INDUSTRIES = [
  { icon: Users, title: "Recruitment" },
  { icon: Server, title: "IT Services" },
  { icon: Code, title: "Software & SaaS" },
  { icon: Briefcase, title: "Consulting Firms" },
  { icon: Megaphone, title: "Marketing Agencies" },
  { icon: Building2, title: "Professional Services" },
];

export default function Home() {
  return (
    <div data-testid="page-home">
      {/* HERO */}
      <section className="relative border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 reveal">
            <SectionLabel index="(I)" label="Outbound GTM · Polaris Origin" />
            <h1 className="mt-10 text-[44px] sm:text-[58px] lg:text-[78px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              We build outbound systems that
              <br />
              produce{" "}
              <span className="font-display italic text-[#1f3a5f]">qualified meetings</span>
              .
            </h1>

            <p className="mt-10 max-w-2xl text-[17px] lg:text-[18px] leading-[1.7] text-slate-600">
              Polaris Origin is an Outbound GTM firm for B2B service and
              product companies. We help define the market, build the
              infrastructure, and operate outbound systems that consistently
              create pipeline.
            </p>

            <p className="mt-6 max-w-2xl text-[17px] lg:text-[18px] leading-[1.7] text-slate-900 font-medium">
              You only pay when qualified buyers{" "}
              <span className="relative inline-block">
                show up
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#C9A14A]" />
              </span>
              .
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/contact"
                data-testid="hero-cta-primary"
                className="group inline-flex items-center justify-center gap-2 bg-[#1f3a5f] text-white px-7 py-4 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#16294a] transition-colors"
              >
                Book Free Consultation
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                to="/case-studies"
                data-testid="hero-cta-secondary"
                className="group inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-900 px-7 py-4 text-[13px] tracking-[0.06em] uppercase font-medium hover:border-[#1f3a5f] transition-colors"
              >
                See Case Studies
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-x-10 gap-y-8 max-w-xl">
              <div className="border-t border-slate-200 pt-5">
                <p className="text-[12px] uppercase tracking-[0.22em] text-slate-500">
                  Engagement
                </p>
                <p className="mt-2 text-[15px] text-slate-900">
                  Performance-based pricing
                </p>
              </div>
              <div className="border-t border-slate-200 pt-5">
                <p className="text-[12px] uppercase tracking-[0.22em] text-slate-500">
                  Execution
                </p>
                <p className="mt-2 text-[15px] text-slate-900">Founder-led, weekly cadence</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 reveal reveal-delay-2">
            <div className="relative border border-slate-200">
              <img
                src={HERO_IMAGE}
                alt="Architectural geometry — order in complex systems"
                className="w-full h-[520px] lg:h-[640px] object-cover grayscale"
                loading="eager"
              />
              <div className="absolute left-0 top-0 bg-white border-b border-r border-slate-200 px-5 py-3">
                <p className="text-[10px] tracking-[0.32em] uppercase text-slate-500">
                  Engagement
                </p>
                <p className="text-[13px] mt-1 text-slate-900">
                  Strategy · Infrastructure · Outbound
                </p>
              </div>
              <div className="absolute right-0 bottom-0 bg-[#1f3a5f] text-white px-6 py-5 max-w-[280px]">
                <p className="text-[11px] tracking-[0.24em] uppercase text-[#C9A14A]">
                  What we measure
                </p>
                <p className="mt-2 text-[15px] leading-snug">
                  Qualified meetings, attended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES STRIP */}
      <section className="border-b border-slate-200 bg-[#f5f6f8]" data-testid="industries-strip">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-10">
          <div className="flex items-center gap-8">
            <p className="hidden md:block shrink-0 text-[11px] uppercase tracking-[0.28em] text-slate-500">
              Industries we partner with
            </p>
            <div className="flex-1 overflow-hidden">
              <div className="flex gap-14 po-marquee whitespace-nowrap">
                {[...TRUSTED, ...TRUSTED].map((name, i) => (
                  <span
                    key={i}
                    className="text-[15px] uppercase tracking-[0.18em] text-slate-700 font-medium shrink-0"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY POLARIS ORIGIN */}
      <section className="bg-[#1f3a5f] text-white relative overflow-hidden border-b border-[#16294a]">
        <div className="absolute inset-0 grid-lines-dark opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <SectionLabel index="(II)" label="How We Operate" tone="light" />
            <h2 className="mt-10 text-[34px] lg:text-[48px] leading-[1.05] tracking-tighter-2 font-semibold">
              Outbound, built as a
              <br />
              <span className="font-display italic text-[#C9A14A]">
                long-term system
              </span>
              .
            </h2>
            <p className="mt-8 text-[16px] leading-[1.8] text-white/75 max-w-lg">
              Polaris Origin engagements are structured to compound. We invest
              in strategy and infrastructure before we send a single message,
              and we run on a weekly optimisation cadence with your revenue
              team.
            </p>
            <Link
              to="/services"
              data-testid="model-link-services"
              className="mt-10 inline-flex items-center gap-2 text-[13px] tracking-[0.04em] uppercase text-[#C9A14A] hover:text-white transition-colors"
            >
              See the services
              <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/15">
            {METRICS.map((m, i) => (
              <div
                key={i}
                className="bg-[#1f3a5f] p-10 lg:p-12 reveal"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <p className="text-[28px] lg:text-[36px] leading-[1.05] tracking-tighter-2 font-semibold text-white">
                  {m.k}
                </p>
                <p className="mt-5 text-[14px] leading-[1.7] text-white/70 max-w-[280px]">
                  {m.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="border-b border-slate-200" data-testid="differentiators-section">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel index="(III)" label="The Difference" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                What Makes Polaris Origin{" "}
                <span className="font-display italic text-[#1f3a5f]">
                  Different
                </span>
                .
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Four operating principles that shape every Polaris Origin
                engagement — from the first discovery call to the weekly
                optimisation review.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-slate-200">
            {DIFFERENTIATORS.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.n}
                  className="group border-r border-b border-slate-200 p-10 lg:p-12 bg-white hover:bg-[#f5f6f8] transition-colors"
                  data-testid={`differentiator-${p.n}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] num-cap">
                      {p.n}
                    </span>
                    <Icon
                      size={22}
                      strokeWidth={1.25}
                      className="text-[#1f3a5f]"
                    />
                  </div>
                  <h3 className="mt-12 text-[22px] lg:text-[26px] tracking-tight font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.75] text-slate-600">
                    {p.body}
                  </p>
                  <Link
                    to="/services"
                    className="mt-10 inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-[#1f3a5f] group-hover:text-[#16294a]"
                  >
                    Learn more
                    <ArrowRight size={14} strokeWidth={1.75} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW ENGAGEMENTS WORK */}
      <section className="bg-[#f5f6f8] border-b border-slate-200" data-testid="how-engagements-work">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-6">
              <SectionLabel index="(IV)" label="Process" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                How engagements{" "}
                <span className="font-display italic text-[#1f3a5f]">work</span>.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Four phases. Strategy and infrastructure come first;
                outbound launches in week three; optimisation is continuous.
              </p>
            </div>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-4 gap-px bg-slate-200 border border-slate-200 relative">
              {PHASES.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.n}
                    data-testid={`phase-${p.n}`}
                    className="bg-white p-8 xl:p-10 reveal relative"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] num-cap">
                        Phase {p.n}
                      </span>
                      <Icon
                        size={18}
                        strokeWidth={1.25}
                        className="text-[#1f3a5f]"
                      />
                    </div>
                    {/* Gold connector line across cards (z-10) */}
                    <div className="absolute left-0 right-0 top-[88px] h-px bg-[#C9A14A] z-10" />
                    {/* Dot punched on top of the line (z-20) */}
                    <div className="relative mt-12 mb-12 z-20">
                      <span
                        className="block w-4 h-4 bg-[#C9A14A] mx-auto"
                        style={{ boxShadow: "0 0 0 6px #ffffff" }}
                      />
                    </div>
                    <h3 className="text-[24px] xl:text-[28px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.1]">
                      {p.title}
                    </h3>
                    <p className="mt-5 text-[14px] leading-[1.7] text-slate-600 min-h-[80px]">
                      {p.body}
                    </p>
                    <p className="mt-8 pt-5 border-t border-slate-200 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      {p.duration}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <ol className="lg:hidden border-l border-[#C9A14A] ml-3">
            {PHASES.map((p) => {
              const Icon = p.icon;
              return (
                <li
                  key={p.n}
                  className="relative pl-8 pb-12 last:pb-0"
                  data-testid={`phase-mobile-${p.n}`}
                >
                  <span className="absolute -left-[7px] top-2 w-3 h-3 bg-[#C9A14A]" />
                  <div className="border border-slate-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] num-cap">
                        Phase {p.n}
                      </span>
                      <Icon size={16} strokeWidth={1.25} className="text-[#1f3a5f]" />
                    </div>
                    <h3 className="mt-6 text-[22px] tracking-tighter-2 font-semibold text-slate-900">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-slate-600">
                      {p.body}
                    </p>
                    <p className="mt-5 pt-4 border-t border-slate-200 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      {p.duration}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="border-b border-slate-200 bg-white" data-testid="industries-section">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-6">
              <SectionLabel index="(V)" label="Industries" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                Who we{" "}
                <span className="font-display italic text-[#1f3a5f]">work with</span>.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                We partner with B2B companies that rely on relationship-driven
                sales.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.title}
                  data-testid={`industry-${ind.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="bg-white p-10 lg:p-12 flex items-start justify-between gap-6 hover:bg-[#f5f6f8] transition-colors reveal"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <h3 className="text-[20px] lg:text-[22px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.2]">
                    {ind.title}
                  </h3>
                  <Icon size={22} strokeWidth={1.25} className="text-[#C9A14A] shrink-0 mt-1" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CASE TEASER */}
      <section className="border-b border-slate-200" data-testid="case-teaser">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-6 border border-slate-200">
              <img
                src={CASE_IMAGE}
                alt="Featured engagement"
                className="w-full h-full max-h-[560px] object-cover grayscale"
              />
            </div>
            <div className="lg:col-span-6 flex flex-col justify-between border border-slate-200 p-10 lg:p-14">
              <div>
                <SectionLabel index="(VI)" label="Featured Case Study · IT Services" />
                <h3 className="mt-10 text-[28px] lg:text-[40px] tracking-tighter-2 font-semibold leading-[1.1] text-slate-900">
                  A regional IT services firm went from{" "}
                  <span className="font-display italic text-[#1f3a5f]">
                    inconsistent referrals
                  </span>{" "}
                  to a predictable outbound motion in a single quarter.
                </h3>
                <p className="mt-6 text-[15px] leading-[1.8] text-slate-600 max-w-xl">
                  We rebuilt the ICP around mid-market technology buyers,
                  refined the offer to a specific managed-services wedge,
                  and operated a multi-channel outbound system that booked
                  qualified meetings with named accounts.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
                <div>
                  <p className="text-[36px] tracking-tighter font-semibold text-slate-900 num-cap">
                    32
                  </p>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500 mt-2">
                    qualified meetings · 90 days
                  </p>
                </div>
                <div>
                  <p className="text-[36px] tracking-tighter font-semibold text-slate-900 num-cap">
                    74%
                  </p>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500 mt-2">
                    show-up rate
                  </p>
                </div>
                <div>
                  <p className="text-[36px] tracking-tighter font-semibold text-slate-900 num-cap">
                    21d
                  </p>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500 mt-2">
                    to first meeting
                  </p>
                </div>
              </div>

              <Link
                to="/case-studies"
                data-testid="case-teaser-cta"
                className="mt-10 inline-flex items-center gap-2 text-[13px] tracking-[0.06em] uppercase text-[#1f3a5f] font-medium link-underline self-start"
              >
                Read the full story
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-2 hidden lg:block">
            <Quote size={36} strokeWidth={1.25} className="text-[#C9A14A]" />
          </div>
          <div className="lg:col-span-9">
            <p className="font-display text-[28px] sm:text-[34px] lg:text-[44px] leading-[1.2] tracking-tight text-slate-900">
              "Polaris Origin is the first team that treated our outbound the
              way our engineering team treats production systems — with
              strategy, infrastructure, and a weekly cadence we can actually
              measure."
            </p>
            <p className="mt-10 text-[13px] uppercase tracking-[0.18em] text-slate-700">
              Engagement reference · IT services, mid-market
            </p>
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="bg-[#f5f6f8] border-b border-slate-200" data-testid="home-blog-section">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-6">
              <SectionLabel index="(VII)" label="Field Notes · From the Firm" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                Writing from the
                <br />
                <span className="font-display italic text-[#1f3a5f]">engagement floor</span>.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Long-form, partner-authored essays on outbound doctrine, the
                pay-per-show-up model, deliverability discipline, and the
                operating cadence of enterprise revenue. Published when we
                have something to say — not on a schedule.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {POSTS.slice(0, 3).map((p, i) => (
              <article
                key={p.slug}
                data-testid={`home-blog-card-${p.slug}`}
                className="group bg-white p-8 lg:p-10 flex flex-col reveal"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="border border-slate-200 overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="w-full h-[200px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-[#1f3a5f] font-medium">
                    {p.category}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500 flex items-center gap-2">
                    <Clock size={12} strokeWidth={1.5} />
                    {p.readTime}
                  </span>
                </div>
                <h3 className="mt-6 text-[20px] lg:text-[22px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.2]">
                  {p.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.75] text-slate-600 flex-1">
                  {p.excerpt}
                </p>
                <Link
                  to={`/blog/${p.slug}`}
                  data-testid={`home-blog-card-link-${p.slug}`}
                  className="mt-8 pt-6 border-t border-slate-200 inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-[#1f3a5f] font-medium link-underline self-start"
                >
                  Read essay
                  <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-slate-300">
            <p className="text-[13px] text-slate-600 max-w-xl">
              The full archive — operating doctrine, deliverability essays,
              and field manuals — lives on the blog.
            </p>
            <Link
              to="/blog"
              data-testid="home-blog-read-more"
              className="group inline-flex items-center gap-3 bg-[#1f3a5f] text-white px-7 py-4 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#16294a] transition-colors"
            >
              Read More on the Blog
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        data-testid="home-cta"
        className="bg-white"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="border border-slate-200 px-8 lg:px-16 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <SectionLabel index="(VIII)" label="Start a Conversation" />
              <h2 className="mt-8 text-[36px] lg:text-[56px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                Bring us your toughest segment.
                <br />
                <span className="font-display italic text-[#1f3a5f]">
                  We will give you a written plan to win it.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/contact"
                data-testid="home-cta-button"
                className="group inline-flex items-center gap-3 bg-[#1f3a5f] text-white px-8 py-5 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#16294a] transition-colors"
              >
                Book Free Consultation
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.75}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <p className="mt-5 text-[12px] tracking-[0.04em] text-slate-500">
                Performance-based pricing. Founder-led conversation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
