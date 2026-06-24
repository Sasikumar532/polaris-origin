import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Plus, Minus } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

const FAQS = [
  {
    q: "What is a qualified meeting?",
    a: "A qualified meeting involves a prospect that matches the agreed ICP and attends the meeting.",
  },
  {
    q: "How are you different from lead generation agencies?",
    a: "Polaris Origin approaches outbound as a system. Engagements begin with ICP development, offer refinement and infrastructure before outreach begins.",
  },
  {
    q: "Which channels do you use?",
    a: "We primarily use email and LinkedIn as coordinated outbound channels.",
  },
  {
    q: "How long before campaigns start producing meetings?",
    a: "Most engagements begin generating conversations within the first few weeks, though timelines vary by market and offer.",
  },
  {
    q: "Do you work with all industries?",
    a: "We primarily partner with B2B service and product companies.",
  },
  {
    q: "Do you provide CRM setup and automations?",
    a: "Yes. We help configure CRM systems, workflows and automations to support outbound operations.",
  },
  {
    q: "Do you only do outreach?",
    a: "No. Engagements often include ICP development, offer refinement and revenue operations support.",
  },
  {
    q: "Is there a setup fee?",
    a: "Polaris Origin does not charge setup fees. Any infrastructure required for execution — including domains, mailboxes and supporting software — is provisioned under your accounts and billed directly by the respective providers, ensuring you retain full ownership and control.",
  },
  {
    q: "Do you guarantee revenue?",
    a: "No. We generate qualified opportunities and help build the systems behind them, but revenue depends on factors beyond outbound such as your ability to close a highly interested ICP-matched prospect during the sales call that we help book for you.",
  },
];

export default function Resources() {
  const [open, setOpen] = useState(0);

  return (
    <div data-testid="page-resources">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-20">
          <SectionLabel index="01 — Resources" label="Frequently Asked Questions" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <h1 className="lg:col-span-8 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              The questions we{" "}
              <span className="font-display italic text-[#1f3a5f]">
                hear most
              </span>
              .
            </h1>
            <div className="lg:col-span-4 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Direct answers to what revenue leaders and founders ask before
                starting an engagement with Polaris Origin. If a question
                isn&apos;t covered here, the fastest answer is a 30-minute call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="border-b border-slate-200 bg-white" data-testid="faq-section">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10 py-20 lg:py-24">
          <ul className="border-t border-slate-200">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={i}
                  className="border-b border-slate-200"
                  data-testid={`faq-item-${i}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    data-testid={`faq-trigger-${i}`}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-8 text-left py-7 lg:py-9 group"
                  >
                    <div className="flex items-start gap-6 lg:gap-8">
                      <span className="text-[11px] tracking-[0.28em] uppercase text-[#C9A14A] num-cap mt-2 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2
                        className={`text-[20px] lg:text-[26px] tracking-tighter-2 font-semibold leading-[1.25] transition-colors ${
                          isOpen
                            ? "text-[#1f3a5f]"
                            : "text-slate-900 group-hover:text-[#1f3a5f]"
                        }`}
                      >
                        {item.q}
                      </h2>
                    </div>
                    <div className="shrink-0 mt-2 w-9 h-9 border border-slate-300 flex items-center justify-center text-[#1f3a5f]">
                      {isOpen ? (
                        <Minus size={16} strokeWidth={1.5} />
                      ) : (
                        <Plus size={16} strokeWidth={1.5} />
                      )}
                    </div>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] pb-10 lg:pb-12"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="lg:pl-[88px]">
                        <p
                          className="text-[16px] lg:text-[17px] leading-[1.85] text-slate-600 max-w-3xl"
                          data-testid={`faq-answer-${i}`}
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* RELATED */}
      <section className="bg-[#f5f6f8] border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-28">
          <SectionLabel index="02" label="Continue Reading" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {[
              {
                label: "Services",
                title: "How we build outbound systems",
                body:
                  "Strategy, infrastructure, multi-channel outbound and performance-based pricing — explained in detail.",
                to: "/services",
              },
              {
                label: "Case Studies",
                title: "Engagements & results",
                body:
                  "Industry, challenge, approach, results, timeline and tech stack — published with client consent.",
                to: "/case-studies",
              },
              {
                label: "Blog",
                title: "Field notes from the firm",
                body:
                  "Long-form writing on outbound, CRM architecture, deliverability and pipeline operations.",
                to: "/blog",
              },
            ].map((c) => (
              <Link
                key={c.label}
                to={c.to}
                data-testid={`resources-related-${c.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="group bg-white p-10 hover:bg-[#f9fafb] transition-colors"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#C9A14A] font-medium">
                  {c.label}
                </p>
                <h3 className="mt-8 text-[22px] lg:text-[24px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.2]">
                  {c.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.75] text-slate-600">
                  {c.body}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-[#1f3a5f] font-medium link-underline">
                  Open {c.label}
                  <ArrowRight size={14} strokeWidth={1.75} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="border border-slate-200 px-8 lg:px-16 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <SectionLabel label="Still have a question?" />
              <h2 className="mt-8 text-[34px] lg:text-[52px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                The fastest answer is{" "}
                <span className="font-display italic text-[#1f3a5f]">
                  a 30-minute call
                </span>
                .
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/contact"
                data-testid="resources-cta"
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
