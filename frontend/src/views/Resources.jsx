import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";
import CTASection from "@/components/site/CTASection";
import { RESOURCES } from "@/data/resources";

export default function Resources() {
  return (
    <div data-testid="page-resources">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24">
          <SectionLabel index="01 — Resources" label="Playbooks & Insights" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <h1 className="lg:col-span-8 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              Ideas from how we{" "}
              <span className="font-display italic text-[#1f3a5f]">
                actually operate
              </span>
              .
            </h1>
            <div className="lg:col-span-4 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Practical frameworks, checklists and writing on Outbound GTM and
                RevOps — drawn from the systems we build and run for clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESOURCE GRID */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-28">
          <SectionLabel index="02 — Library" label="Browse Resources" />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCES.map((r) => {
              const Icon = r.icon;
              return (
                <article
                  key={r.title}
                  data-testid={`resource-${r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="group bg-white border border-slate-200 p-10 lg:p-12 flex flex-col"
                >
                  <Icon size={26} strokeWidth={1.25} className="text-[#1f3a5f]" />
                  <h2 className="mt-10 text-[24px] lg:text-[28px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.15]">
                    {r.title}
                  </h2>
                  <p className="mt-5 text-[16px] leading-[1.8] text-slate-600 flex-1">
                    {r.excerpt}
                  </p>
                  <Link
                    href={`/resources/${r.slug}`}
                    data-testid={`resource-link-${r.slug}`}
                    className="group/btn mt-8 inline-flex items-center gap-2 self-start bg-[#1f3a5f] text-white px-6 py-3 text-[13px] tracking-[0.04em] uppercase font-medium hover:bg-[#C9A14A] transition-colors"
                  >
                    TRY IT OUT
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.75}
                      className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </Link>
                </article>
              );
            })}
          </div>

          <p className="mt-10 text-[15px] leading-[1.8] text-slate-600">
            More playbooks are on the way. Want a specific topic covered?{" "}
            <Link
              href="/contact"
              className="text-[#1f3a5f] underline underline-offset-4 hover:text-[#C9A14A] transition-colors"
            >
              Tell us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTASection testId="resources-cta" />
    </div>
  );
}
