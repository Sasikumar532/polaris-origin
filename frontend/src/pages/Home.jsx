import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  Target,
  Network,
  ShieldCheck,
  Quote,
  Minus,
  Clock,
} from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";
import { POSTS } from "@/pages/Blog";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB3aGl0ZSUyMG1pbmltYWx8ZW58MHx8fHwxNzgyMjUyMTM2fDA&ixlib=rb-4.1.0&q=85";

const CASE_IMAGE =
  "https://images.pexels.com/photos/5686077/pexels-photo-5686077.jpeg";

const TRUSTED = [
  "Halden Capital",
  "Northvane Logistics",
  "Meridian Health",
  "Atlas Cloud",
  "Quartermast",
  "Sequora AI",
  "Bramley & Co.",
  "Iron Harbor",
];

const METRICS = [
  { k: "100%", v: "Pay-per-show-up. Zero retainer risk on outcomes." },
  { k: "11.4×", v: "Average pipeline-to-fee ratio across 2024 cohort." },
  { k: "94%", v: "Booked meeting show-up rate, last twelve months." },
  { k: "21 days", v: "Median time from kickoff to first qualified meeting." },
];

const PILLARS = [
  {
    n: "01",
    icon: Target,
    title: "ICP & Offer Engineering",
    body:
      "We codify the buyer, the buying committee, and the wedge offer. The first deliverable is a 14-page Offer Doctrine your AE team can defend.",
  },
  {
    n: "02",
    icon: Compass,
    title: "Hyper-Personalized Outbound",
    body:
      "Research-led, one-to-one outbound. No spray. No spin. Every sequence is built on signal, account context, and a written point of view.",
  },
  {
    n: "03",
    icon: Network,
    title: "Multi-Channel Orchestration",
    body:
      "Email, LinkedIn, voice, and warm direct. Sequencing engineered around your buyer's decision rhythm — not our send schedule.",
  },
  {
    n: "04",
    icon: ShieldCheck,
    title: "Show-Up Guarantee",
    body:
      "Meetings only count when the prospect attends and matches the qualification rubric you signed. Anything else is on us.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Discovery & Doctrine",
    body:
      "Two-week intensive. We interview your closers, study your pipeline, and write the operating doctrine for your outbound motion.",
  },
  {
    n: "02",
    title: "Build & Calibrate",
    body:
      "Signal lists, messaging frameworks, deliverability infrastructure. Three calibration cohorts before scale.",
  },
  {
    n: "03",
    title: "Run & Compound",
    body:
      "Weekly review cadence. Show-ups, qualified pipeline, accepted deals — measured on the same dashboard as your revenue team.",
  },
];

export default function Home() {
  return (
    <div data-testid="page-home">
      {/* HERO */}
      <section className="relative border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 reveal">
            <SectionLabel index="(I)" label="Outbound GTM Firm · Est. 2021" />
            <h1 className="mt-10 text-[44px] sm:text-[58px] lg:text-[78px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              Hyper-personalized outbound
              <br />
              that <span className="font-display italic text-[#1f3a5f]">books meetings</span>.
              <br />
              You only pay for{" "}
              <span className="relative inline-block">
                show-ups
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#C9A14A]" />
              </span>
              .
            </h1>

            <p className="mt-10 max-w-2xl text-[17px] lg:text-[18px] leading-[1.7] text-slate-600">
              PolarisOrigin is an enterprise outbound firm for revenue leaders
              who have outgrown agencies. We engineer the strategy, the
              messaging, and the operating system — and we only invoice once a
              qualified prospect sits across the table from your team.
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
                See the Casework
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
                  Performance-based · No retainers
                </p>
              </div>
              <div className="border-t border-slate-200 pt-5">
                <p className="text-[12px] uppercase tracking-[0.22em] text-slate-500">
                  Minimum ACV
                </p>
                <p className="mt-2 text-[15px] text-slate-900">$36K · Mid-market & up</p>
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
                  Doctrine
                </p>
                <p className="text-[13px] mt-1 text-slate-900">
                  Polaris · Field manual 04.07
                </p>
              </div>
              <div className="absolute right-0 bottom-0 bg-[#1f3a5f] text-white px-6 py-5 max-w-[280px]">
                <p className="text-[11px] tracking-[0.24em] uppercase text-[#C9A14A]">
                  North-star metric
                </p>
                <p className="mt-2 text-[15px] leading-snug">
                  Qualified show-ups per sales rep per week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-b border-slate-200 bg-[#f5f6f8]" data-testid="trusted-strip">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-10">
          <div className="flex items-center gap-8">
            <p className="hidden md:block shrink-0 text-[11px] uppercase tracking-[0.28em] text-slate-500">
              Trusted by revenue teams at
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

      {/* THE MODEL */}
      <section className="bg-[#1f3a5f] text-white relative overflow-hidden border-b border-[#16294a]">
        <div className="absolute inset-0 grid-lines-dark opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <SectionLabel index="(II)" label="The Pay-Per-Show-Up Model" tone="light" />
            <h2 className="mt-10 text-[34px] lg:text-[48px] leading-[1.05] tracking-tighter-2 font-semibold">
              The agency model is broken.
              <br />
              <span className="font-display italic text-[#C9A14A]">
                We rebuilt the contract.
              </span>
            </h2>
            <p className="mt-8 text-[16px] leading-[1.8] text-white/75 max-w-lg">
              Most outbound vendors invoice for activity — emails sent,
              meetings "booked", dashboards delivered. We invoice for the only
              thing your CFO cares about: qualified prospects who actually
              showed up. No retainer. No setup fee theatre. No padded reports.
            </p>
            <Link
              to="/services"
              data-testid="model-link-services"
              className="mt-10 inline-flex items-center gap-2 text-[13px] tracking-[0.04em] uppercase text-[#C9A14A] hover:text-white transition-colors"
            >
              Read the engagement doctrine
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
                <p className="text-[44px] lg:text-[56px] leading-none tracking-tighter-2 font-semibold text-white num-cap">
                  {m.k}
                </p>
                <p className="mt-5 text-[14px] leading-[1.7] text-white/70 max-w-[260px]">
                  {m.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-slate-200" data-testid="capabilities-section">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel index="(III)" label="Capabilities" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                A single firm. <br />
                <span className="font-display italic text-[#1f3a5f]">Four disciplines.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                We do not sell tools, lists, or seats. We sell judgement —
                operationalised through four tightly integrated disciplines
                that produce one outcome: qualified meetings on your calendar.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-slate-200">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.n}
                  className="group border-r border-b border-slate-200 p-10 lg:p-12 bg-white hover:bg-[#f5f6f8] transition-colors"
                  data-testid={`pillar-${p.n}`}
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

      {/* HOW IT WORKS */}
      <section className="bg-[#f5f6f8] border-b border-slate-200" data-testid="how-it-works">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionLabel index="(IV)" label="Method" />
            <h2 className="mt-10 text-[34px] lg:text-[48px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
              How an engagement runs.
            </h2>
            <p className="mt-8 text-[16px] leading-[1.8] text-slate-600 max-w-md">
              Three phases. One operating cadence. Built so that every action
              ties back to one defended hypothesis about your buyer.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ol className="border-t border-slate-300">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className="grid grid-cols-12 gap-6 py-10 lg:py-12 border-b border-slate-300 reveal"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="col-span-3 lg:col-span-2">
                    <span className="text-[40px] lg:text-[56px] leading-none tracking-tighter font-display italic text-[#C9A14A] num-cap">
                      {s.n}
                    </span>
                  </div>
                  <div className="col-span-9 lg:col-span-10">
                    <h3 className="text-[22px] lg:text-[26px] tracking-tight font-semibold text-slate-900">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-[15px] leading-[1.8] text-slate-600">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
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
                alt="Quartermast — supply-chain SaaS case study"
                className="w-full h-full max-h-[560px] object-cover grayscale"
              />
            </div>
            <div className="lg:col-span-6 flex flex-col justify-between border border-slate-200 p-10 lg:p-14">
              <div>
                <SectionLabel index="(V)" label="Featured Casework · Supply-Chain SaaS" />
                <h3 className="mt-10 text-[28px] lg:text-[40px] tracking-tighter-2 font-semibold leading-[1.1] text-slate-900">
                  Quartermast went from{" "}
                  <span className="font-display italic text-[#1f3a5f]">
                    11 to 47
                  </span>{" "}
                  enterprise show-ups per quarter — in two cycles.
                </h3>
                <p className="mt-6 text-[15px] leading-[1.8] text-slate-600 max-w-xl">
                  A logistics SaaS company with a strong product and a soft
                  outbound motion. We rebuilt the ICP, the wedge offer, and
                  the operating cadence around a single contested account
                  list.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
                <div>
                  <p className="text-[36px] tracking-tighter font-semibold text-slate-900 num-cap">
                    +328%
                  </p>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500 mt-2">
                    qualified pipeline
                  </p>
                </div>
                <div>
                  <p className="text-[36px] tracking-tighter font-semibold text-slate-900 num-cap">
                    93%
                  </p>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500 mt-2">
                    show-up rate
                  </p>
                </div>
                <div>
                  <p className="text-[36px] tracking-tighter font-semibold text-slate-900 num-cap">
                    19d
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
              "We replaced three SDRs, two agencies, and a sales-enablement tool
              with PolarisOrigin. The line item on our P&amp;L is smaller and our
              forecast is no longer fiction."
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Minus size={20} strokeWidth={1.5} className="text-[#C9A14A]" />
              <p className="text-[13px] uppercase tracking-[0.18em] text-slate-700">
                Marisol Ortega · VP Revenue · Sequora AI
              </p>
            </div>
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
              <SectionLabel index="(VI)" label="A 30-minute working session — not a pitch" />
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
                No retainer. No sales pressure. Walk away with a usable plan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
