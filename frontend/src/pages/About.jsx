import { Link } from "react-router-dom";
import { ArrowUpRight, Star, Compass, Quote } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyYWx8ZW58MHx8fHwxNzgyMjUyMTM1fDA&ixlib=rb-4.1.0&q=85";

const PRINCIPLES = [
  {
    n: "01",
    title: "Defend the hypothesis.",
    body:
      "Every action — every email, every list, every meeting — must trace back to a single written hypothesis about the buyer. We refuse to operate on instinct dressed up as strategy.",
  },
  {
    n: "02",
    title: "Pay for outcomes, not activity.",
    body:
      "We refused the retainer model because it rewards optics. Our contracts charge for show-ups because that is the only metric a CFO will defend in a board meeting.",
  },
  {
    n: "03",
    title: "Write before you send.",
    body:
      "Every engagement begins with a written Offer Doctrine. If we cannot write down what makes the offer worth a buyer's hour, we will not put it in their inbox.",
  },
  {
    n: "04",
    title: "Compounding over campaigns.",
    body:
      "We do not run campaigns. We build operating systems. Six months in, the engagement should look less like outbound and more like a discipline embedded in your revenue team.",
  },
];

const LEADERS = [
  {
    name: "Adelaide Brae",
    role: "Founding Partner · Strategy",
    bio:
      "Previously led GTM strategy at three enterprise SaaS scale-ups. Built the Offer Doctrine method we now use across every engagement.",
  },
  {
    name: "Iván Caro",
    role: "Founding Partner · Operations",
    bio:
      "Twelve years architecting outbound infrastructure for revenue teams. Owns the deliverability, signal, and sequencing layer.",
  },
  {
    name: "Helena Vance",
    role: "Director · Research",
    bio:
      "Runs the research bench. Every account brief, every wedge primitive, every named-account map crosses her desk before it leaves the firm.",
  },
];

export default function About() {
  return (
    <div data-testid="page-about">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <SectionLabel index="01 — The Firm" label="About PolarisOrigin" />
            <h1 className="mt-10 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              Clarity in complex{" "}
              <span className="font-display italic text-[#1f3a5f]">growth systems</span>.
            </h1>
            <p className="mt-10 max-w-2xl text-[17px] leading-[1.8] text-slate-600">
              PolarisOrigin was founded on a single conviction: that outbound,
              done with the discipline of a consulting firm, is one of the most
              defensible growth assets a company can own. We are not an agency.
              We do not sell hours. We sell the rare combination of judgement,
              research, and operational rigour — and we only invoice when a
              qualified prospect shows up.
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
                  Founded
                </p>
                <p className="text-[13px] mt-1 text-slate-900 num-cap">2021 · Boston</p>
              </div>
              <div className="absolute right-0 bottom-0 bg-[#1f3a5f] text-white px-6 py-5 max-w-[280px]">
                <Star
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#C9A14A] mb-3"
                />
                <p className="text-[14px] leading-snug text-white/90">
                  Polaris does not move.
                  <br />
                  Everything else navigates by it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NORTH STAR */}
      <section className="bg-[#1f3a5f] text-white relative overflow-hidden border-b border-[#16294a]">
        <div className="absolute inset-0 grid-lines-dark opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
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
            <p className="font-display text-[28px] sm:text-[36px] lg:text-[48px] leading-[1.2] tracking-tight text-white max-w-4xl">
              "Polaris" is the fixed point that sailors used to navigate by for
              three thousand years. "Origin" is the coordinate every other point
              on the map is measured from. We chose the name because that is
              the role we play for revenue leaders — the steady reference point
              that lets a complex growth system know where it is.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-white border-b border-slate-200" data-testid="principles-section">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel index="03" label="Operating Principles" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                Four sentences <br />
                <span className="font-display italic text-[#1f3a5f]">we live by</span>.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                These principles are not posters on a wall. They are the
                criteria we use to decide who we hire, which engagements we
                accept, and which lines we never cross — no matter what a
                quarter looks like.
              </p>
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

      {/* LEADERSHIP */}
      <section className="bg-[#f5f6f8] border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <SectionLabel index="04" label="Leadership" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                Senior operators.
                <br />
                <span className="font-display italic text-[#1f3a5f]">No layered teams.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                You will not be handed off to an account manager. Every
                engagement is staffed and run by a partner. The partner who
                wrote your Offer Doctrine is the partner who reads your
                weekly review.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {LEADERS.map((l) => (
              <div key={l.name} className="bg-white p-10">
                <div className="border border-slate-200 h-72 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-[#1f3a5f] flex items-end p-6">
                    <div>
                      <p className="font-display text-[42px] leading-none text-white">
                        {l.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </p>
                      <div className="mt-4 w-10 h-px bg-[#C9A14A]" />
                    </div>
                  </div>
                </div>
                <h3 className="mt-8 text-[20px] tracking-tight font-semibold text-slate-900">
                  {l.name}
                </h3>
                <p className="mt-2 text-[12px] uppercase tracking-[0.22em] text-[#1f3a5f]">
                  {l.role}
                </p>
                <p className="mt-6 text-[14px] leading-[1.75] text-slate-600">
                  {l.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-2 hidden lg:block">
            <Quote size={36} strokeWidth={1.25} className="text-[#C9A14A]" />
          </div>
          <div className="lg:col-span-9">
            <p className="font-display text-[28px] sm:text-[34px] lg:text-[44px] leading-[1.2] text-slate-900">
              "PolarisOrigin behaves like the strategy team inside our company —
              except they care more about the next ten meetings than we do."
            </p>
            <p className="mt-10 text-[13px] uppercase tracking-[0.18em] text-slate-700">
              — David Renshaw · CRO · Atlas Cloud
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="border border-slate-200 px-8 lg:px-16 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <h2 className="text-[34px] lg:text-[52px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                Start a conversation with a partner.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/contact"
                data-testid="about-cta"
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
