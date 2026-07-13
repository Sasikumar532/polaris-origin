import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Users,
  Server,
  Code,
  Briefcase,
  Megaphone,
  Building2,
} from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";
import CTASection from "@/components/site/CTASection";
import ProcessAccordion from "@/components/site/ProcessAccordion";
import CalEmbed from "@/components/site/CalEmbed";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB3aGl0ZSUyMG1pbmltYWx8ZW58MHx8fHwxNzgyMjUyMTM2fDA&ixlib=rb-4.1.0&q=85";

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

const INDUSTRIES = [
  { icon: Server, title: "IT Services" },
  { icon: Megaphone, title: "Marketing Agencies" },
  { icon: Code, title: "Software & SaaS" },
  { icon: Building2, title: "Professional Services" },
  { icon: Users, title: "Recruitment" },
  { icon: Briefcase, title: "Consulting Firms" },
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
              We get you{" "}
              <span className="font-display italic text-[#1f3a5f]">qualified sales calls</span>
              <br />
              with your ideal customers.
            </h1>

            <p className="mt-10 max-w-2xl text-[17px] lg:text-[18px] leading-[1.7] text-slate-600">
              Polaris Origin is an Outbound GTM and RevOps firm that helps B2B
              service companies get qualified, ICP-matched sales calls on their
              calendar. We help define your ICP, setup the infrastructure, and
              operate the entire outbound system in a completely done-for-you
              manner, without any retainers or setup fees.
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
                href="/contact"
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
            </h2>
            <p className="mt-8 text-[16px] leading-[1.8] text-white/75 max-w-lg">
              Polaris Origin engagements are structured to compound. We invest
              in strategy and infrastructure before we send a single message,
              and we run on a weekly optimisation cadence with your revenue
              team.
            </p>
            <Link
              href="/services"
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

      {/* HOW ENGAGEMENTS WORK */}
      <section className="bg-[#f5f6f8] border-b border-slate-200" data-testid="how-engagements-work">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-6">
              <SectionLabel index="(III)" label="Process" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                How we{" "}
                <span className="font-display italic text-[#1f3a5f]">work</span>.
              </h2>
            </div>
          </div>

          <ProcessAccordion />
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="border-b border-slate-200 bg-white" data-testid="industries-section">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-6">
              <SectionLabel index="(IV)" label="Industries" />
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

      {/* BOOK A CALL */}
      <section className="border-b border-slate-200 bg-[#f5f6f8]" data-testid="home-booking">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-7">
              <SectionLabel index="(V)" label="Book a Consultation" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                Pick a time that{" "}
                <span className="font-display italic text-[#1f3a5f]">works for you</span>.
              </h2>
              <p className="mt-8 max-w-xl text-[16px] leading-[1.8] text-slate-600">
                A 30-minute working session — we discuss the segment, the offer,
                and the system, and you leave with a written next step whether we
                work together or not.
              </p>
            </div>
          </div>

          <CalEmbed />
        </div>
      </section>

      {/* CTA */}
      <CTASection testId="home-cta" />
    </div>
  );
}
