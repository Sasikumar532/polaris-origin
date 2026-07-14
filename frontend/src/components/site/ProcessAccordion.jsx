"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const STEPS = [
  {
    title: "ICP Defining & Offer Building Workshop",
    body:
      "We start by defining the ideal customer profile, sharpening the offer, and positioning the message so outreach is aimed at buyers with clear demand and buying intent.",
  },
  {
    title: "Email Infrastructure Setup",
    body:
      "We build and configure the sending infrastructure properly from day one, ensuring deliverability, domain health, and a foundation that supports long-term outbound growth.",
  },
  {
    title: "Lead Sourcing & Data Enrichment",
    body:
      "Target accounts are carefully sourced and enriched with accurate contact data and relevant company insights, giving every campaign a stronger starting point.",
  },
  {
    title: "Hyper-Personalized Sequence Writing",
    body:
      "Every sequence is crafted around the prospect's context and pain points, turning cold outreach into conversations that feel relevant and worth replying to.",
  },
  {
    title: "Revenue Infrastructure",
    body:
      "We configure the CRM, automations and workflows that support long-term growth.",
  },
  {
    title: "A/B Testing & Iteration",
    body:
      "Campaigns are continuously refined through structured testing, allowing messaging, targeting, and timing to improve based on real-world performance.",
  },
  {
    title: "Multi-Channel Outbound",
    body:
      "Cold email and LinkedIn work together as one conversation, in the same researched point of view per account.",
  },
  {
    title: "Reply Management & Lead Qualification",
    body:
      "Responses are handled promptly and consistently, with prospects qualified against agreed criteria so meetings are booked only with accounts that fit the engagement objectives.",
  },
];

export default function ProcessAccordion() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex flex-col gap-2" data-testid="process-accordion">
      {STEPS.map((step, i) => {
        const isOpen = open === i;
        return (
          <div
            key={step.title}
            className="bg-white border border-slate-200 transition-colors"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 px-8 py-5 text-left group"
            >
              <div className="flex items-center gap-6">
                <span className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] num-cap shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[17px] font-semibold text-slate-900 tracking-tight">
                  {step.title}
                </p>
              </div>
              <Plus
                size={20}
                strokeWidth={1.75}
                className={`shrink-0 text-[#1f3a5f] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mx-8 border-t border-slate-100" />
                <p className="px-8 pt-6 pb-6 pl-[74px] max-w-3xl text-[16px] leading-[1.8] text-slate-600">
                  {step.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
