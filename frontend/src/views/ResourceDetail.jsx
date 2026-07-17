import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CTASection from "@/components/site/CTASection";
import BlueprintGeneratorForm from "@/components/site/BlueprintGeneratorForm";
import GtmRoiCalculator from "@/components/site/GtmRoiCalculator";

export default function ResourceDetail({ resource }) {
  return (
    <div data-testid="page-resource-detail">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-20">
          <Link
            href="/resources"
            data-testid="resource-back"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-slate-500 hover:text-[#1f3a5f] transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={1.75} />
            All Resources
          </Link>
          <div className="mt-10 max-w-4xl">
            <h1 className="text-[40px] sm:text-[52px] lg:text-[68px] leading-[1.0] tracking-tighter-2 font-semibold text-slate-900">
              {resource.title}
            </h1>
            <p className="mt-8 text-[18px] leading-[1.75] text-slate-600">
              {resource.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* BODY */}
      {resource.type === "calculator" ? (
        <section className="border-b border-slate-200 bg-white pb-8">
          <GtmRoiCalculator />
        </section>
      ) : (
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[820px] px-6 lg:px-10 py-20 lg:py-28">
            {resource.type === "generator" ? (
              <BlueprintGeneratorForm />
            ) : (
              <div className="space-y-14">
                {resource.sections.map((s, i) => (
                  <div key={s.heading}>
                    <span className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] num-cap">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-5 text-[26px] lg:text-[32px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.15]">
                      {s.heading}
                    </h2>
                    <p className="mt-5 text-[17px] leading-[1.85] text-slate-600">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      {resource.type === "calculator" ? (
        <CTASection
          testId="resource-detail-cta"
          eyebrow="Done-for-you outbound"
          titleLead="Want this system"
          titleAccent="run for you?"
          titleBreak={false}
          body="We build and operate this exact engine for B2B service companies. You only pay when qualified buyers show up."
          buttonLabel="Book a strategy call"
          note="A 30-minute working session. We do not pitch. We diagnose."
          align="left"
        />
      ) : (
        <CTASection testId="resource-detail-cta" />
      )}
    </div>
  );
}
