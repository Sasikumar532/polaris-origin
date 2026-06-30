import { Star, Compass } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";
import CTASection from "@/components/site/CTASection";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyYWx8ZW58MHx8fHwxNzgyMjUyMTM1fDA&ixlib=rb-4.1.0&q=85";

const FOUNDER = {
  name: "Lakshan Anirudh Kannan",
  role: "Founder · Polaris Origin",
  photo:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&w=900&q=85",
  bio:
    "Every Polaris Origin engagement is personally overseen by founder Lakshan Anirudh Kannan. As Polaris Origin grows, we intend to remain intentionally selective and maintain a high standard of execution.",
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Strategy first.",
    body:
      "Every engagement begins with ICP development, offer refinement and messaging — before campaigns launch.",
  },
  {
    n: "02",
    title: "Performance-based pricing.",
    body:
      "Our engagement model is structured around qualified prospects who actually attend the meeting.",
  },
  {
    n: "03",
    title: "Research-driven outreach.",
    body:
      "Accounts are researched before sequences are written. Every message is grounded in a specific point of view.",
  },
  {
    n: "04",
    title: "Weekly optimization.",
    body:
      "Engagements run on a weekly cadence — reviewing conversations, refining messaging, and improving pipeline quality.",
  },
];

export default function About() {
  return (
    <div data-testid="page-about">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <SectionLabel index="01 — The Firm" label="About Polaris Origin" />
            <h1 className="mt-10 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              An Outbound GTM firm,{" "}
              <span className="font-display italic text-[#1f3a5f]">built deliberately</span>.
            </h1>
            <p className="mt-10 max-w-2xl text-[17px] leading-[1.8] text-slate-600">
              Polaris Origin partners with B2B service and product companies
              to build outbound systems that consistently produce qualified
              meetings. We help define the market, build the infrastructure,
              and run the campaigns — and we only charge against the
              meetings that actually take place.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative border border-slate-200">
              <img
                src={ABOUT_IMAGE}
                alt="Geometric architecture — order from system"
                className="w-full h-[480px] lg:h-[600px] object-cover grayscale"
              />
              <div className="absolute left-0 top-0 bg-white border-b border-r border-slate-200 px-5 py-3">
                <p className="text-[10px] tracking-[0.32em] uppercase text-slate-500">
                  Built around
                </p>
                <p className="text-[13px] mt-1 text-slate-900">
                  Strategy · Infrastructure · Outbound
                </p>
              </div>
              <div className="absolute right-0 bottom-0 bg-[#1f3a5f] text-white px-6 py-5 max-w-[280px]">
                <Star
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#C9A14A] mb-3"
                />
                <p className="text-[14px] leading-snug text-white/90">
                  Founder-led.
                  <br />
                  Intentionally selective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE NAME */}
      <section className="bg-[#1f3a5f] text-white relative overflow-hidden border-b border-[#16294a]">
        <div className="absolute inset-0 grid-lines-dark opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <Compass
              size={48}
              strokeWidth={1}
              className="text-[#C9A14A]"
              aria-hidden="true"
            />
            <SectionLabel
              index="02"
              label="The Name"
              tone="light"
              className="mt-10"
            />
          </div>
          <div className="lg:col-span-9">
            <p className="font-display text-[28px] sm:text-[34px] lg:text-[44px] leading-[1.25] tracking-tight text-white max-w-4xl">
              Our name reflects a belief that growth should be intentional and
              directional from the start.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-white border-b border-slate-200" data-testid="principles-section">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel index="03" label="How We Operate" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                Four commitments{" "}
                <span className="font-display italic text-[#1f3a5f]">we work by</span>.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.n}
                className="bg-white p-10 lg:p-12 reveal"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] num-cap">
                  {p.n}
                </span>
                <h3 className="mt-10 text-[24px] lg:text-[30px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.15]">
                  {p.title}
                </h3>
                <p className="mt-6 text-[15px] leading-[1.8] text-slate-600">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-[#f5f6f8] border-b border-slate-200" data-testid="team-section">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-6">
              <SectionLabel index="04" label="Meet the Team" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                <span className="font-display italic text-[#1f3a5f]">Founder-led</span>.
              </h2>
            </div>
          </div>

          <div className="border border-slate-200 bg-white grid grid-cols-1 md:grid-cols-12 gap-px bg-slate-200">
            <div className="md:col-span-5 bg-white">
              <div className="relative h-full w-full">
                <img
                  src={FOUNDER.photo}
                  alt={FOUNDER.name}
                  className="w-full h-full object-cover grayscale aspect-square md:aspect-auto"
                  data-testid="founder-photo"
                />
                <span className="absolute left-0 bottom-0 bg-[#1f3a5f] text-white text-[10px] tracking-[0.28em] uppercase px-4 py-2">
                  Founder
                </span>
              </div>
            </div>
            <div className="md:col-span-7 bg-white p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] font-medium">
                Founder · Operator
              </p>
              <h3 className="mt-6 text-[32px] lg:text-[44px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                {FOUNDER.name}
              </h3>
              <p className="mt-3 text-[14px] uppercase tracking-[0.18em] text-[#1f3a5f]">
                {FOUNDER.role}
              </p>
              <p className="mt-8 max-w-2xl text-[16px] leading-[1.85] text-slate-600">
                {FOUNDER.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection testId="about-cta">
        Start a conversation with the founder.
      </CTASection>
    </div>
  );
}
