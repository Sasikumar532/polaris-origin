import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Clock, Calendar } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

export const POSTS = [
  {
    slug: "the-offer-doctrine",
    title: "The Offer Doctrine: why every outbound engagement should begin with a written one.",
    excerpt:
      "Most outbound stalls because the offer is undefended. Before a single sequence is built, an Offer Doctrine forces three uncomfortable questions every revenue team should be able to answer in writing.",
    category: "Method",
    author: "Adelaide Brae",
    date: "Nov 14, 2025",
    readTime: "9 min read",
    cover:
      "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB3aGl0ZSUyMG1pbmltYWx8ZW58MHx8fHwxNzgyMjUyMTM2fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    slug: "why-pay-per-show-up",
    title: "Pay-per-show-up: the only outbound contract a CFO will defend.",
    excerpt:
      "Retainer agencies invoice for optics. We rebuilt the contract around the only metric that has ever moved a forecast: a qualified prospect, in the room.",
    category: "Engagement Model",
    author: "Iván Caro",
    date: "Oct 22, 2025",
    readTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1531591022136-eb8b0da1e6d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyYWx8ZW58MHx8fHwxNzgyMjUyMTM1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    slug: "buying-committees",
    title: "Outbound to a committee, not a contact: a field manual for enterprise sequencing.",
    excerpt:
      "Enterprise deals are bought by groups of seven. Single-threaded outbound is statistical malpractice. Here is the framework we use to map and address a buying committee in a single quarter.",
    category: "Method",
    author: "Helena Vance",
    date: "Sep 30, 2025",
    readTime: "11 min read",
    cover:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB3aGl0ZSUyMG1pbmltYWx8ZW58MHx8fHwxNzgyMjUyMTM2fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    slug: "deliverability-doctrine",
    title: "Deliverability is a discipline, not a checkbox.",
    excerpt:
      "If your first-touch is a researched point of view, the inbox provider's reputation system is your distribution layer. We treat deliverability as engineering, not as an afterthought.",
    category: "Operations",
    author: "Iván Caro",
    date: "Aug 18, 2025",
    readTime: "7 min read",
    cover:
      "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyYWx8ZW58MHx8fHwxNzgyMjUyMTM1fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    slug: "qualified-show-up-rubric",
    title: "Writing a qualified show-up rubric your sales and finance teams will both sign.",
    excerpt:
      "A rubric is not a wish list. It is the operating definition of 'qualified' — and it must be defensible at the deal review, at the QBR, and at the audit.",
    category: "Operating Cadence",
    author: "Adelaide Brae",
    date: "Jul 02, 2025",
    readTime: "8 min read",
    cover:
      "https://images.pexels.com/photos/5686077/pexels-photo-5686077.jpeg",
  },
  {
    slug: "the-weekly-review",
    title: "The weekly review: the single operating ritual that holds an engagement together.",
    excerpt:
      "Engagements do not fail in the discovery phase. They fail in week eleven, when momentum quietly stalls. The weekly review is how we keep momentum auditable.",
    category: "Operating Cadence",
    author: "Helena Vance",
    date: "Jun 05, 2025",
    readTime: "5 min read",
    cover:
      "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB3aGl0ZSUyMG1pbmltYWx8ZW58MHx8fHwxNzgyMjUyMTM2fDA&ixlib=rb-4.1.0&q=85",
  },
];

export default function Blog() {
  const featured = POSTS[0];
  const rest = POSTS.slice(1);

  return (
    <div data-testid="page-blog">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-20">
          <SectionLabel index="01 — Field Notes" label="Writing from the firm" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <h1 className="lg:col-span-8 text-[44px] sm:text-[58px] lg:text-[80px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
              Notes from inside the{" "}
              <span className="font-display italic text-[#1f3a5f]">
                engagement floor
              </span>
              .
            </h1>
            <div className="lg:col-span-4 flex items-end">
              <p className="text-[16px] leading-[1.8] text-slate-600">
                Long-form, partner-authored writing on outbound doctrine, the
                pay-per-show-up model, deliverability, and the operating
                cadence of a modern enterprise revenue motion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-b border-slate-200 bg-white" data-testid="blog-featured">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-7 border border-slate-200 overflow-hidden">
              <img
                src={featured.cover}
                alt={featured.title}
                className="w-full h-full max-h-[560px] object-cover grayscale"
              />
            </div>
            <div className="lg:col-span-5 flex flex-col justify-between border border-slate-200 p-10 lg:p-12">
              <div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-[#C9A14A] font-medium num-cap">
                    Featured
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    {featured.category}
                  </span>
                </div>
                <h2 className="mt-10 text-[28px] lg:text-[36px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.1]">
                  {featured.title}
                </h2>
                <p className="mt-6 text-[15px] leading-[1.8] text-slate-600">
                  {featured.excerpt}
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-6 gap-y-2">
                <p className="text-[12px] uppercase tracking-[0.18em] text-slate-700">
                  By {featured.author}
                </p>
                <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500 flex items-center gap-2">
                  <Calendar size={12} strokeWidth={1.5} />
                  {featured.date}
                </p>
                <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500 flex items-center gap-2">
                  <Clock size={12} strokeWidth={1.5} />
                  {featured.readTime}
                </p>
              </div>
              <Link
                to={`/blog/${featured.slug}`}
                data-testid="blog-featured-cta"
                className="mt-8 inline-flex items-center gap-2 text-[13px] tracking-[0.06em] uppercase text-[#1f3a5f] font-medium link-underline self-start"
              >
                Read the essay
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="border-b border-slate-200" data-testid="blog-grid">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-6">
              <SectionLabel index="02" label="The Archive" />
              <h2 className="mt-10 text-[34px] lg:text-[48px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.05]">
                Recent writing.
              </h2>
            </div>
            <div className="lg:col-span-6 flex lg:justify-end items-end">
              <p className="text-[12px] uppercase tracking-[0.22em] text-slate-500">
                {POSTS.length} essays · Partner-authored
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {rest.map((p, i) => (
              <article
                key={p.slug}
                data-testid={`blog-card-${p.slug}`}
                className="group bg-white p-8 lg:p-10 flex flex-col reveal"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="border border-slate-200 overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="w-full h-[200px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-[#1f3a5f] font-medium">
                    {p.category}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    {p.readTime}
                  </span>
                </div>
                <h3 className="mt-6 text-[20px] lg:text-[24px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.2]">
                  {p.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.75] text-slate-600">
                  {p.excerpt}
                </p>
                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                  <p className="text-[12px] uppercase tracking-[0.18em] text-slate-700">
                    {p.author}
                  </p>
                  <Link
                    to={`/blog/${p.slug}`}
                    data-testid={`blog-card-link-${p.slug}`}
                    className="inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-[#1f3a5f] font-medium link-underline"
                  >
                    Read
                    <ArrowRight size={14} strokeWidth={1.75} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f5f6f8]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-32">
          <div className="border border-slate-200 bg-white px-8 lg:px-16 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <SectionLabel label="Want to discuss any of this?" />
              <h2 className="mt-8 text-[34px] lg:text-[52px] leading-[1.05] tracking-tighter-2 font-semibold text-slate-900">
                Bring the topic. We&apos;ll bring a partner.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/contact"
                data-testid="blog-cta"
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

export function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="border-b border-slate-200" data-testid="blog-post-not-found">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-32">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#C9A14A]">
            404 · Essay
          </p>
          <h1 className="mt-8 text-[40px] lg:text-[64px] tracking-tighter-2 font-semibold text-slate-900">
            This essay has not been published.
          </h1>
          <Link
            to="/blog"
            className="mt-10 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.06em] text-[#1f3a5f] link-underline"
          >
            Return to the archive
            <ArrowRight size={16} strokeWidth={1.75} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article data-testid={`blog-post-${post.slug}`}>
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10 pt-20 lg:pt-28 pb-12">
          <Link
            to="/blog"
            className="text-[12px] uppercase tracking-[0.22em] text-slate-500 hover:text-[#1f3a5f] link-underline"
            data-testid="blog-post-back"
          >
            ← All field notes
          </Link>
          <p className="mt-12 text-[11px] uppercase tracking-[0.32em] text-[#C9A14A] num-cap">
            {post.category}
          </p>
          <h1 className="mt-6 text-[36px] sm:text-[48px] lg:text-[68px] leading-[1.02] tracking-tighter-2 font-semibold text-slate-900">
            {post.title}
          </h1>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 pb-10 border-b border-slate-200">
            <p className="text-[12px] uppercase tracking-[0.18em] text-slate-700">
              By {post.author}
            </p>
            <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500 flex items-center gap-2">
              <Calendar size={12} strokeWidth={1.5} />
              {post.date}
            </p>
            <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500 flex items-center gap-2">
              <Clock size={12} strokeWidth={1.5} />
              {post.readTime}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10 py-12">
          <div className="border border-slate-200">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-[420px] lg:h-[520px] object-cover grayscale"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[760px] px-6 lg:px-0 py-16 lg:py-24 prose prose-slate">
          <p className="text-[20px] leading-[1.7] text-slate-800 font-medium">
            {post.excerpt}
          </p>
          <p className="mt-10 text-[17px] leading-[1.85] text-slate-700">
            Most outbound vendors will tell you the problem is volume. It is
            not. The problem is that almost no outbound motion is built on a
            written, defended hypothesis about the buyer — the offer, the
            timing, the buying committee, the political risk of saying yes.
            Without that written hypothesis, every channel is just guessing in
            parallel.
          </p>
          <h2 className="mt-14 text-[28px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.15]">
            What this essay argues
          </h2>
          <p className="mt-6 text-[17px] leading-[1.85] text-slate-700">
            The discipline that separates a forgettable outbound program from
            a defensible growth asset is the doctrine: a written, internally
            audited document that every sequence, every call, and every
            meeting agenda has to be traceable back to. We write it before we
            send a single email.
          </p>
          <blockquote className="mt-12 border-l-2 border-[#C9A14A] pl-8 font-display italic text-[28px] leading-[1.25] text-slate-900">
            "If you cannot write down — in one paragraph — what makes your
            offer worth a buyer&apos;s next hour, you have no business putting
            it in their inbox."
          </blockquote>
          <h2 className="mt-14 text-[28px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.15]">
            Three questions every doctrine must answer
          </h2>
          <ol className="mt-8 space-y-6 list-none">
            {[
              "Who, specifically, is the buyer — and what does the next 30 days look like for them?",
              "What is the wedge offer — the single, narrow, defensible thing we are asking them to do first?",
              "What is the political and operational risk to them of saying yes — and how does our motion absorb that risk?",
            ].map((q, i) => (
              <li key={i} className="flex gap-5">
                <span className="text-[#C9A14A] font-display italic text-[28px] leading-none num-cap mt-1">
                  0{i + 1}
                </span>
                <span className="text-[17px] leading-[1.85] text-slate-700">
                  {q}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-[17px] leading-[1.85] text-slate-700">
            We have run this discipline across forty-plus engagements. The
            pattern is consistent: when the doctrine is sharp, the program
            compounds; when it is fuzzy, the program produces noise.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f5f6f8]">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10 py-20 lg:py-24">
          <div className="border border-slate-200 bg-white px-8 lg:px-12 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <h2 className="text-[26px] lg:text-[36px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.15]">
                Want to discuss this with a partner?
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/contact"
                data-testid="blog-post-cta"
                className="group inline-flex items-center gap-3 bg-[#1f3a5f] text-white px-7 py-4 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#16294a] transition-colors"
              >
                Book Free Consultation
                <ArrowUpRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
