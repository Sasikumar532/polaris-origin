import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

const CASES = [
  {
    id: "quartermast",
    company: "Quartermast",
    industry: "Logistics SaaS",
    title: "From 11 to 47 enterprise show-ups in two cycles.",
    metric: "+328%",
    metricLabel: "Qualified pipeline · 90 days",
    excerpt:
      "We rebuilt the ICP, the wedge offer, and the operating cadence around a single contested account list — and routed every outbound action through one defended hypothesis.",
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB3aGl0ZSUyMG1pbmltYWx8ZW58MHx8fHwxNzgyMjUyMTM2fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "sequora",
    company: "Sequora AI",
    industry: "Enterprise AI",
    title: "Replaced three SDRs and two agencies with one operating cadence.",
    metric: "11.4×",
    metricLabel: "Pipeline-to-fee ratio",
    excerpt:
      "An infra-AI company with a complex story and a polite outbound motion. We re-architected the wedge and built a research-led sequence engine the AE team now drives themselves.",
    image:
      "https://images.unsplash.com/photo-1531591022136-eb8b0da1e6d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyYWx8ZW58MHx8fHwxNzgyMjUyMTM1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "halden",
    company: "Halden Capital",
    industry: "Finance / Private Credit",
    title: "Booked the LP committee they had been chasing for 18 months.",
    metric: "94%",
    metricLabel: "Show-up rate · LP segment",
    excerpt:
      "Private-credit fundraising is a relationship business. We engineered an outbound motion that respected the etiquette of the segment — and produced 17 LP meetings in a single quarter.",
    image:
      "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyYWx8ZW58MHx8fHwxNzgyMjUyMTM1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "meridian",
    company: "Meridian Health",
    industry: "Healthcare Operations",
    title: "Built a regulator-compliant outbound motion for hospital CFOs.",
    metric: "+217%",
    metricLabel: "Qualified meetings · CFO segment",
    excerpt:
      "Hospital CFOs do not read cold email. They read written points of view from people who understand reimbursement. We built one — and then operationalised it.",
    image:
      "https://images.pexels.com/photos/5686077/pexels-photo-5686077.jpeg",
  },
  {
    id: "northvane",
    company: "Northvane Logistics",
    industry: "Logistics SaaS",
    title: "Compressed a 9-month enterprise sales cycle to 113 days.",
    metric: "−63%",
    metricLabel: "Sales-cycle compression",
    excerpt:
      "We rewrote the first three meetings — discovery, mutual-action plan, and the technical workshop — and aligned outbound around the buying committee, not the individual buyer.",
    image:
      "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB3aGl0ZSUyMG1pbmltYWx8ZW58MHx8fHwxNzgyMjUyMTM2fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "atlas",
    company: "Atlas Cloud",
    industry: "Cloud Infrastructure",
    title: "Opened a new vertical with 9 named-account show-ups in 30 days.",
    metric: "9 / 22",
    metricLabel: "Named-account show-ups",
    excerpt:
      "A new vertical, a new ICP, and a board commitment. We compressed discovery into ten days and ran a tight, named-account motion that produced nine show-ups inside thirty days.",
    image:
      "https://images.unsplash.com/photo-1531591022136-eb8b0da1e6d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyYWx8ZW58MHx8fHwxNzgyMjUyMTM1fDA&ixlib=rb-4.1.0&q=85",
  },
];

const INDUSTRIES = [
  "All",
  "Logistics SaaS",
  "Enterprise AI",
  "Finance / Private Credit",
  "Healthcare Operations",
  "Cloud Infrastructure",
];

export default function CaseStudies() {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () => (filter === "All" ? CASES : CASES.filter((c) => c.industry === filter)),
    [filter]
  );

  return (
    <div data-testid="page-case-studies">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24">
          <SectionLabel index="01 — Casework" label="Selected Engagements" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <h1 className="lg:col-span-8 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              The work,{" "}
              <span className="font-display italic text-[#1f3a5f]">in numbers</span>.
            </h1>
            <div className="lg:col-span-4 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Engagements published with client consent. Numbers measured
                inside the client&apos;s revenue stack — not ours. Every casework
                page links to the operating doctrine that produced it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="border-b border-slate-200 bg-white sticky top-[72px] z-30">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
              Filter
            </p>
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                type="button"
                data-testid={`filter-${ind.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                onClick={() => setFilter(ind)}
                className={`text-[13px] tracking-[0.04em] uppercase font-medium transition-colors pb-1 ${
                  filter === ind
                    ? "text-[#1f3a5f] border-b border-[#C9A14A]"
                    : "text-slate-500 hover:text-[#1f3a5f] border-b border-transparent"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="border-b border-slate-200" data-testid="case-studies-grid">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-28">
          {filtered.length === 0 ? (
            <p className="text-slate-500 text-[15px] py-24 text-center">
              No engagements published in this segment yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
              {filtered.map((c, i) => (
                <article
                  key={c.id}
                  data-testid={`case-card-${c.id}`}
                  className="group bg-white p-10 lg:p-12 flex flex-col reveal"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="border border-slate-200 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.company}
                      className="w-full h-[260px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#1f3a5f] font-medium">
                      {c.company}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      {c.industry}
                    </p>
                  </div>
                  <h2 className="mt-6 text-[22px] lg:text-[28px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.15]">
                    {c.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.75] text-slate-600">
                    {c.excerpt}
                  </p>
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-end justify-between">
                    <div>
                      <p className="text-[36px] lg:text-[44px] tracking-tighter font-semibold text-slate-900 num-cap leading-none">
                        {c.metric}
                      </p>
                      <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                        {c.metricLabel}
                      </p>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-[#1f3a5f] font-medium link-underline"
                    >
                      Discuss this case
                      <ArrowRight size={14} strokeWidth={1.75} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f5f6f8]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="border border-slate-200 bg-white px-8 lg:px-16 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <SectionLabel label="Talk to the team that produced this work" />
              <h2 className="mt-8 text-[34px] lg:text-[52px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                Want a similar number on your dashboard?
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/contact"
                data-testid="cases-cta"
                className="group inline-flex items-center gap-3 bg-[#1f3a5f] text-white px-8 py-5 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#16294a] transition-colors"
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
        </div>
      </section>
    </div>
  );
}
