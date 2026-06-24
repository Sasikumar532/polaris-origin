import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionLabel from "@/components/site/SectionLabel";

const ROLES = [
  {
    id: "senior-research-analyst",
    title: "Senior Research Analyst",
    department: "Research",
    location: "Boston · Remote (US/EU overlap)",
    type: "Full-time",
    summary:
      "Lead the account research for our toughest engagements. You will write the briefs and primitives that every other discipline at the firm operates from.",
    responsibilities: [
      "Lead account research for two simultaneous engagements",
      "Author wedge primitives and buying-committee maps",
      "Review every analyst-authored first touch before it ships",
      "Contribute to the Offer Doctrine method we use across clients",
    ],
    requirements: [
      "5+ years of B2B research or strategy consulting experience",
      "Demonstrable writing samples — POVs, white papers, briefs",
      "Comfort working across regulated industries (Finance, Healthcare)",
      "Pattern recognition across buying committees",
    ],
  },
  {
    id: "partner-track-strategist",
    title: "Partner-Track Strategist",
    department: "Engagements",
    location: "New York · London",
    type: "Full-time",
    summary:
      "Run two engagements end-to-end. Author the engagement strategy, own the weekly review, and help shape the long-term operating system at Polaris Origin.",
    responsibilities: [
      "Lead Discovery & Doctrine for two engagements per quarter",
      "Own the weekly operating review with the client revenue team",
      "Hire, mentor, and review the analyst staffed to your engagements",
      "Co-author the next iteration of the engagement methodology",
    ],
    requirements: [
      "8+ years across GTM strategy, sales leadership, or consulting",
      "Track record of accountability for revenue or pipeline numbers",
      "Strong written communication — writing samples requested",
      "Willingness to be measured on show-ups, not activity",
    ],
  },
  {
    id: "outbound-operations-engineer",
    title: "Outbound Operations Engineer",
    department: "Operations",
    location: "Remote · North America",
    type: "Full-time",
    summary:
      "Own the infrastructure layer — deliverability, signal pipelines, and the engagement-grade sequencing stack that supports every client engagement we run.",
    responsibilities: [
      "Operate three-domain deliverability architecture for every client",
      "Build and maintain signal pipelines (firmographic, intent, news)",
      "Engineer engagement-grade sequencing — no off-the-shelf tools",
      "Own the engagement attestation and invoicing pipeline",
    ],
    requirements: [
      "4+ years in revenue operations or outbound engineering",
      "Hands-on with deliverability tooling, DNS, and authentication",
      "Comfort writing SQL and basic scripts to manipulate data",
      "Has run a multi-domain outbound stack at scale",
    ],
  },
  {
    id: "junior-research-analyst",
    title: "Junior Research Analyst",
    department: "Research",
    location: "Boston · Hybrid",
    type: "Full-time",
    summary:
      "Entry point into the research bench. You will write account briefs, contribute to wedge primitives, and apprentice under our Director of Research.",
    responsibilities: [
      "Produce 5–8 account briefs per week to firm standard",
      "Contribute to the wedge-primitive library",
      "Sit weekly engagement reviews to learn the operating cadence",
      "Own one piece of internal methodology research per quarter",
    ],
    requirements: [
      "2+ years in B2B research, journalism, or analyst roles",
      "Strong writing portfolio — long-form and short-form",
      "Curiosity about how revenue organizations actually work",
      "Comfort with structured ambiguity",
    ],
  },
];

const CULTURE = [
  {
    title: "Senior by default.",
    body:
      "We do not staff engagements with junior pyramids. Every client is run by a partner. We hire seniors, train juniors patiently, and never let the floor dilute.",
  },
  {
    title: "Write everything.",
    body:
      "If it is not written, it does not exist. Doctrines, briefs, weekly reviews, hire decisions. Writing is how we think — and how we hold ourselves accountable.",
  },
  {
    title: "Long compounding work.",
    body:
      "We do not chase flashy logos for the deck. We choose engagements where six months of disciplined work compounds into a defensible growth asset for the client.",
  },
];

export default function Careers() {
  return (
    <div data-testid="page-careers">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24">
          <SectionLabel index="01 — Careers" label="Build the Engine" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <h1 className="lg:col-span-9 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              Build the discipline
              <br />
              <span className="font-display italic text-[#1f3a5f]">
                of consulting-grade outbound
              </span>
              .
            </h1>
          </div>
          <p className="mt-12 max-w-3xl text-[17px] leading-[1.8] text-slate-600">
            Polaris Origin hires senior operators who want to compound their
            craft. We do not staff engagements with pyramids of juniors. We do
            not run revenue on bonuses tied to activity. We build long, careful
            careers — and the firm where they are possible.
          </p>
        </div>
      </section>

      {/* CULTURE */}
      <section className="border-b border-slate-200 bg-[#f5f6f8]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel index="02" label="How We Operate" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                Three commitments
                <br />
                <span className="font-display italic text-[#1f3a5f]">we hire for</span>.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Every hire goes through a writing exercise, a live engagement
                review, and a partner interview. We hire slowly, on purpose.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {CULTURE.map((c, i) => (
              <div key={c.title} className="bg-white p-10">
                <span className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] num-cap">
                  0{i + 1}
                </span>
                <h3 className="mt-10 text-[22px] tracking-tighter-2 font-semibold text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-5 text-[15px] leading-[1.75] text-slate-600">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="bg-white border-b border-slate-200" data-testid="open-roles-section">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-6">
              <SectionLabel index="03" label="Open Roles" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                Currently hiring.
              </h2>
            </div>
            <div className="lg:col-span-6 flex lg:justify-end items-end">
              <p className="text-[12px] uppercase tracking-[0.22em] text-slate-500">
                {ROLES.length} positions · Updated this quarter
              </p>
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            className="border-t border-slate-200"
            data-testid="roles-accordion"
          >
            {ROLES.map((r) => (
              <AccordionItem
                key={r.id}
                value={r.id}
                className="border-b border-slate-200"
                data-testid={`role-${r.id}`}
              >
                <AccordionTrigger className="hover:no-underline py-8 px-2 group">
                  <div className="grid grid-cols-12 gap-6 w-full items-center text-left">
                    <div className="col-span-12 md:col-span-6">
                      <h3 className="text-[22px] lg:text-[28px] tracking-tighter-2 font-semibold text-slate-900 leading-tight group-hover:text-[#1f3a5f] transition-colors">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-[14px] text-slate-500">
                        {r.summary}
                      </p>
                    </div>
                    <div className="col-span-6 md:col-span-2 flex items-center gap-2">
                      <Briefcase
                        size={14}
                        strokeWidth={1.5}
                        className="text-[#C9A14A]"
                      />
                      <span className="text-[12px] uppercase tracking-[0.18em] text-slate-600">
                        {r.department}
                      </span>
                    </div>
                    <div className="col-span-6 md:col-span-3 flex items-center gap-2">
                      <MapPin
                        size={14}
                        strokeWidth={1.5}
                        className="text-[#C9A14A]"
                      />
                      <span className="text-[12px] uppercase tracking-[0.18em] text-slate-600">
                        {r.location}
                      </span>
                    </div>
                    <div className="col-span-12 md:col-span-1 flex md:justify-end">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-[#1f3a5f] font-medium">
                        {r.type}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-12 px-2">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4 border-t border-slate-200">
                    <div className="lg:col-span-6">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                        Responsibilities
                      </p>
                      <ul className="mt-6 space-y-4">
                        {r.responsibilities.map((b) => (
                          <li
                            key={b}
                            className="text-[15px] leading-[1.75] text-slate-700 flex gap-3"
                          >
                            <span className="mt-3 inline-block w-2 h-px bg-[#C9A14A]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-5 lg:col-start-8">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                        What we look for
                      </p>
                      <ul className="mt-6 space-y-4">
                        {r.requirements.map((b) => (
                          <li
                            key={b}
                            className="text-[15px] leading-[1.75] text-slate-700 flex gap-3"
                          >
                            <span className="mt-3 inline-block w-2 h-px bg-[#C9A14A]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/contact"
                        data-testid={`role-apply-${r.id}`}
                        className="mt-10 inline-flex items-center gap-2 bg-[#1f3a5f] text-white px-6 py-3 text-[12px] tracking-[0.06em] uppercase font-medium hover:bg-[#16294a] transition-colors"
                      >
                        Apply for this role
                        <ArrowUpRight size={14} strokeWidth={1.75} />
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1f3a5f] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-lines-dark opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <SectionLabel label="Don't see your role" tone="light" />
            <h2 className="mt-8 text-[34px] lg:text-[52px] leading-[1.05] tracking-tighter-2 font-semibold">
              We always read thoughtful, written introductions.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] text-white/70 leading-[1.8]">
              If your discipline is craft-led and your career is long-form, we
              want to hear from you. Send a written introduction and a sample
              of your best work.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/contact"
              data-testid="careers-cta"
              className="group inline-flex items-center gap-3 bg-white text-[#1f3a5f] px-8 py-5 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#C9A14A] hover:text-[#1f3a5f] transition-colors"
            >
              Introduce yourself
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
