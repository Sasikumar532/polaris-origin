import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="border-b border-slate-200" data-testid="page-not-found">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-32 lg:py-44">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#C9A14A] num-cap">
          404
        </p>
        <h1 className="mt-10 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900 max-w-3xl">
          This page is{" "}
          <span className="font-display italic text-[#1f3a5f]">off the chart</span>.
        </h1>
        <p className="mt-10 max-w-xl text-[16px] leading-[1.8] text-slate-600">
          The page you tried to reach does not exist — or it has been moved
          inside a private engagement. Return to the home page and resume.
        </p>
        <Link
          href="/"
          data-testid="notfound-cta"
          className="mt-12 inline-flex items-center gap-2 bg-[#1f3a5f] text-white px-7 py-4 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#16294a] transition-colors"
        >
          Return Home
          <ArrowUpRight size={16} strokeWidth={1.75} />
        </Link>
      </div>
    </section>
  );
}
