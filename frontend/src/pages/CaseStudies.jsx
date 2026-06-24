import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

const CASES = [
  {
    id: "northbridge-it",
    company: "Mid-market IT Services Firm",
    industry: "IT Services",
    title: "From inconsistent referrals to a predictable outbound motion.",
    challenge:
      "A 60-person IT services firm relied on referrals for new business. Pipeline was unpredictable, sales cycles varied wildly, and outbound experiments had stalled twice.",
    approach:
      "Defined the ICP around technology buyers at $50M–$250M companies, sharpened the managed-services offer, configured the CRM around true pipeline stages, and ran coordinated email + LinkedIn outreach to a named-account list.",
    results: [
      "32 qualified meetings booked in 90 days",
      "74% show-up rate on booked meetings",
      "First meeting attended within 21 days of launch",
    ],
    timeline: "90 days",
    stack: ["HubSpot", "Smartlead", "Apollo", "LinkedIn Sales Navigator"],
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB3aGl0ZSUyMG1pbmltYWx8ZW58MHx8fHwxNzgyMjUyMTM2fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "vantage-saas",
    company: "Vertical SaaS Platform",
    industry: "Software & SaaS",
    title: "Built the outbound layer for a Series-A vertical SaaS.",
    challenge:
      "A vertical SaaS company had product-market fit in one segment but no repeatable outbound. Founder-led sales worked, but didn't scale beyond warm introductions.",
    approach:
      "Documented the offer, mapped the buying committee per ICP tier, and built a researcher-led outbound system. CRM and pipeline reporting were rebuilt to track qualified opportunities, not activity.",
    results: [
      "26 qualified meetings in the first quarter",
      "9 opportunities advanced past discovery",
      "Sales cycle stabilised at ~62 days",
    ],
    timeline: "Quarter 1 + ongoing",
    stack: ["Pipedrive", "Instantly", "Clay", "LinkedIn"],
    image:
      "https://images.unsplash.com/photo-1531591022136-eb8b0da1e6d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyYWx8ZW58MHx8fHwxNzgyMjUyMTM1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "halden-recruitment",
    company: "Specialist Recruitment Firm",
    industry: "Recruitment",
    title: "Replaced cold-call agencies with a multi-channel outbound system.",
    challenge:
      "A specialist recruitment firm was paying two agencies for inconsistent results. Hiring managers were not responding, and the firm needed a predictable way to reach in-house talent leaders.",
    approach:
      "Rebuilt the ICP around director-and-above talent leaders in life-sciences companies. Designed a coordinated email + LinkedIn cadence with researcher-written first touches. Configured CRM workflows for handoff to the recruiting team.",
    results: [
      "19 conversations with in-house talent leaders in 60 days",
      "11 of 19 advanced to a second meeting",
      "Three new client engagements signed in the same quarter",
    ],
    timeline: "60 days",
    stack: ["HubSpot", "Lemlist", "LinkedIn Sales Navigator"],
    image:
      "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyYWx8ZW58MHx8fHwxNzgyMjUyMTM1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "marketing-agency",
    company: "Boutique Marketing Agency",
    industry: "Marketing Agencies",
    title: "Productised the offer and opened a new segment.",
    challenge:
      "A founder-led marketing agency wanted to move upmarket but lacked a clear offer for $20M+ ARR companies. Outbound attempts felt generic and stopped converting.",
    approach:
      "Worked with the founder to productise the offer into a defined 90-day engagement. Rebuilt outbound around three named-account tiers and a researched first-touch per account. CRM stages were redefined around the new offer.",
    results: [
      "14 qualified meetings booked in the first 90 days",
      "5 paid engagements signed in the new segment",
      "Average deal size 2.4× the previous segment",
    ],
    timeline: "90 days",
    stack: ["HubSpot", "Smartlead", "Apollo", "Notion"],
    image:
      "https://images.pexels.com/photos/5686077/pexels-photo-5686077.jpeg",
  },
  {
    id: "consulting-firm",
    company: "B2B Consulting Firm",
    industry: "Consulting Firms",
    title: "Built outbound for a referral-driven consultancy.",
    challenge:
      "A boutique consulting firm grew on referrals and a small partner network. Leadership wanted a second, controllable channel — without diluting the brand or running cold-call campaigns.",
    approach:
      "Defined the ICP around two named segments, refined the offer into a clear discovery engagement, and ran a low-volume, high-research outbound motion that respected the etiquette of the segment.",
    results: [
      "11 qualified discovery calls in 90 days",
      "4 proposals issued from the discovery calls",
      "2 long-form engagements signed",
    ],
    timeline: "90 days",
    stack: ["Pipedrive", "Apollo", "LinkedIn", "Loom"],
    image:
      "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB3aGl0ZSUyMG1pbmltYWx8ZW58MHx8fHwxNzgyMjUyMTM2fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    id: "professional-services",
    company: "Professional Services Firm",
    industry: "Professional Services",
    title: "Outbound for a high-trust, regulated services firm.",
    challenge:
      "A professional-services firm in a regulated industry needed a careful outbound motion. Existing tooling produced too many low-fit conversations and was burning brand equity.",
    approach:
      "Restructured the ICP, rewrote the first-touch around a researched point of view on the buyer's regulatory pressure, and rebuilt the CRM to surface only ICP-matched opportunities.",
    results: [
      "17 qualified conversations with target buyers in 90 days",
      "6 advanced to formal scoping",
      "Pipeline visibility shifted from 'unknown' to 'forecasted'",
    ],
    timeline: "90 days",
    stack: ["HubSpot", "Smartlead", "LinkedIn", "Airtable"],
    image:
      "https://images.unsplash.com/photo-1531591022136-eb8b0da1e6d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyYWx8ZW58MHx8fHwxNzgyMjUyMTM1fDA&ixlib=rb-4.1.0&q=85",
  },
];

const INDUSTRIES = [
  "All",
  "IT Services",
  "Software & SaaS",
  "Recruitment",
  "Marketing Agencies",
  "Consulting Firms",
  "Professional Services",
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
          <SectionLabel index="01 — Case Studies" label="Selected Engagements" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <h1 className="lg:col-span-8 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              The work,{" "}
              <span className="font-display italic text-[#1f3a5f]">in detail</span>.
            </h1>
            <div className="lg:col-span-4 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Engagements published with client consent. Each study covers
                the industry, the challenge, the approach we took, the
                results, the timeline, and the technology stack.
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
            <div className="grid grid-cols-1 gap-px bg-slate-200 border border-slate-200">
              {filtered.map((c, i) => (
                <article
                  key={c.id}
                  data-testid={`case-card-${c.id}`}
                  className="group bg-white p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 reveal"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="lg:col-span-4">
                    <div className="border border-slate-200 overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.company}
                        className="w-full h-[220px] lg:h-[280px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#1f3a5f] font-medium">
                      {c.industry}
                    </p>
                    <p className="mt-2 text-[14px] text-slate-500">
                      {c.company}
                    </p>
                    <h2 className="mt-6 text-[22px] lg:text-[26px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.15]">
                      {c.title}
                    </h2>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-1 gap-8">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#C9A14A] font-medium">
                        Challenge
                      </p>
                      <p className="mt-3 text-[15px] leading-[1.8] text-slate-700">
                        {c.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#C9A14A] font-medium">
                        Approach
                      </p>
                      <p className="mt-3 text-[15px] leading-[1.8] text-slate-700">
                        {c.approach}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#C9A14A] font-medium">
                        Results
                      </p>
                      <ul className="mt-3 space-y-2">
                        {c.results.map((r) => (
                          <li
                            key={r}
                            className="text-[15px] leading-[1.7] text-slate-700 flex gap-3"
                          >
                            <span className="mt-3 inline-block w-2 h-px bg-[#C9A14A] shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-3 lg:border-l lg:border-slate-200 lg:pl-8 grid grid-cols-2 lg:grid-cols-1 gap-8 content-start">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                        Timeline
                      </p>
                      <p className="mt-3 text-[20px] lg:text-[24px] tracking-tighter-2 font-semibold text-slate-900">
                        {c.timeline}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                        Technology stack
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                        {c.stack.map((s) => (
                          <li
                            key={s}
                            className="text-[12px] uppercase tracking-[0.12em] text-slate-700 border border-slate-300 px-3 py-1"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      to="/contact"
                      data-testid={`case-card-cta-${c.id}`}
                      className="col-span-2 lg:col-span-1 inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-[#1f3a5f] font-medium link-underline mt-2"
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
