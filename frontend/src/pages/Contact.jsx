import { CheckCircle2, Calendar, Mail, FileText, Quote } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

const EXPECT = [
  {
    icon: Calendar,
    title: "Within 24 business hours",
    body: "A partner — not an SDR — reviews your enquiry and replies with a calendar link.",
  },
  {
    icon: FileText,
    title: "A 30-minute working session",
    body: "We discuss the segment, the offer, and the system. We leave with a written next step.",
  },
  {
    icon: CheckCircle2,
    title: "A usable plan, whether we work together or not",
    body: "If we are not the right firm, we will say so.",
  },
];

export default function Contact() {
  return (
    <div data-testid="page-contact">
      {/* HERO + SPLIT */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-20 lg:pb-28">
          <SectionLabel index="01 — Contact" label="Book a Consultation" />
          <h1 className="mt-10 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900 max-w-5xl">
            Start with a{" "}
            <span className="font-display italic text-[#1f3a5f]">working session</span>,
            <br />
            not a sales call.
          </h1>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* LEFT — what to expect */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="border border-slate-200 p-8 lg:p-10 bg-[#f5f6f8]">
                <p className="text-[14px] uppercase tracking-[0.28em] text-[#1f3a5f] font-medium">
                  What to expect
                </p>
                <ul className="mt-10 space-y-10">
                  {EXPECT.map((e, i) => {
                    const Icon = e.icon;
                    return (
                      <li key={e.title} className="flex items-start gap-4">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#C9A14A] num-cap shrink-0 mt-[11px]">
                          0{i + 1}
                        </p>
                        <div className="shrink-0 w-8 h-8 border border-[#1f3a5f] flex items-center justify-center text-[#1f3a5f]">
                          <Icon size={14} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-[18px] font-semibold tracking-tight text-slate-900">
                            {e.title}
                          </h3>
                          <p className="mt-2 text-[14px] leading-[1.75] text-slate-600">
                            {e.body}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-12 pt-8 border-t border-slate-300">
                  <Quote size={22} strokeWidth={1.25} className="text-[#C9A14A]" />
                  <p className="font-display text-[20px] leading-snug text-slate-900 mt-4">
                    "We do not pitch. We diagnose. If we are not the right
                    fit, you will know inside thirty minutes."
                  </p>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    — Polaris Origin
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-300 flex items-center gap-3">
                  <Mail size={16} strokeWidth={1.5} className="text-[#1f3a5f]" />
                  <a
                    href="mailto:partners@polarisorigin.com"
                    className="text-[14px] text-slate-700 link-underline"
                    data-testid="contact-email-direct"
                  >
                    partners@polarisorigin.com
                  </a>
                </div>
              </div>
            </aside>

            {/* RIGHT — Cal.com embed */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <iframe
                src="https://cal.com/polarisorigin/revops-consultation?embed=true"
                frameBorder="0"
                title="Book a consultation"
                className="w-full border border-slate-200 bg-white"
                style={{ minHeight: "700px" }}
                data-testid="cal-embed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="bg-[#f5f6f8]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-24 grid grid-cols-1 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
          {[
            { city: "Boston", note: "Founding office · HQ" },
            { city: "New York", note: "Engagement floor · Finance" },
            { city: "London", note: "EMEA partner office" },
            { city: "Singapore", note: "APAC referral partner" },
          ].map((o) => (
            <div key={o.city} className="bg-white p-8">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#C9A14A]">
                Office
              </p>
              <p className="mt-6 text-[22px] tracking-tight font-semibold text-slate-900">
                {o.city}
              </p>
              <p className="mt-2 text-[13px] text-slate-500">{o.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
