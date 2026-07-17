import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Content defaults to the site-wide CTA. Pass overrides to customise the copy
// per page without touching the color theme.
export default function CTASection({
  testId = "site-cta",
  eyebrow,
  titleLead = "Tell us about your",
  titleAccent = "segment and offer",
  titleBreak = true,
  body = "A 30-minute conversation, we go over your current revops setup, and give you suggestions for improvement. We'll see whether we are a fit, and tell you how we can help you.",
  buttonLabel = "Book Free Consultation",
  note,
  align = "right",
}) {
  const alignLeft = align === "left";
  return (
    <section className="bg-white border-b border-slate-200" data-testid={testId}>
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
        <div className="border border-slate-200 px-8 lg:px-16 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            {eyebrow && (
              <div className="mb-5 text-[11px] tracking-[0.28em] uppercase text-slate-500">
                {eyebrow}
              </div>
            )}
            <h2 className="text-[34px] lg:text-[52px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
              {titleLead}
              {titleBreak ? <br /> : " "}
              <span className="font-display italic text-[#1f3a5f]">
                {titleAccent}
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] text-slate-600 leading-[1.8]">
              {body}
            </p>
          </div>
          <div className={`lg:col-span-4 ${alignLeft ? "lg:text-left" : "lg:text-right"}`}>
            <Link
              href="/contact"
              data-testid={`${testId}-button`}
              className="group inline-flex items-center gap-3 bg-[#C9A14A] text-[#1f3a5f] px-8 py-5 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#1f3a5f] hover:text-white transition-colors"
            >
              {buttonLabel}
              <ArrowUpRight
                size={18}
                strokeWidth={1.75}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            {note && (
              <p
                className={`mt-5 text-[13px] text-slate-500 leading-[1.7] ${
                  alignLeft
                    ? "lg:whitespace-nowrap"
                    : "lg:max-w-xs lg:ml-auto"
                }`}
              >
                {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
