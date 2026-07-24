"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Loader2, X } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

const CHAPTERS = [
  { num: "01", title: "Building Your Infrastructure" },
  { num: "02", title: "Authentication" },
  { num: "03", title: "Mailbox Configuration" },
  { num: "04", title: "Warmup" },
  { num: "05", title: "Launch Readiness" },
  { num: "06", title: "Audience Fit" },
  { num: "07", title: "List Hygiene" },
  { num: "08", title: "Scaling Safely" },
  { num: "09", title: "Ongoing Maintenance" },
];

const ACCORDION = [
  {
    title: "1. Building Your Infrastructure",
    body: "Your domain reputation determines whether providers trust your emails. Buy dedicated sending domains — never your root domain — move DNS to Cloudflare, and age new domains 3-5 days minimum (2 weeks is better) before warmup begins.",
  },
  {
    title: "2. Authentication",
    body: "SPF, DKIM, and DMARC prove to inbox providers that you are who you say you are. Miss any one of the three and even a perfectly warmed-up mailbox lands in spam. The full record values for Google Workspace and Microsoft 365 are inside.",
  },
  {
    title: "3. Mailbox Configuration",
    body: "Each mailbox is its own sending identity with its own reputation. Use Google Workspace or Microsoft 365 only, cap at 3 mailboxes per domain, and give every mailbox a complete profile and photo before it sends a single email.",
  },
  {
    title: "4. Warmup",
    body: "A brand new mailbox has no sending history, and providers treat unknown senders with suspicion. Warmup builds that history gradually — and should keep running quietly in the background even at full campaign volume, indefinitely.",
  },
  {
    title: "5. Launch Readiness",
    body: "Your last checkpoint before real prospects see your emails. Mail-Tester score of 8/10 or above, clean blacklist checks, and natural variation in subject lines and openers — not spintax, which modern filters detect easily.",
  },
  {
    title: "6. Audience Fit",
    body: "Inbox providers reward engagement — opens, replies, time spent reading. A tightly-targeted list of 500 contacts that actually reply protects your reputation far better than a loose list of 5,000 that gets ignored.",
  },
  {
    title: "7. List Hygiene",
    body: "A dirty list is the fastest way to burn a domain. Remove duplicates, role-based addresses, and personal providers from B2B lists, then verify the rest — only 'Deliverable' status ever enters the sequence.",
  },
  {
    title: "8. Scaling Safely",
    body: "Scaling too fast is the most common way operators destroy the infrastructure they just built. Add new domains in batches of 3-5, stagger mailbox warmup by two weeks, and scale by adding mailboxes, not pushing more through one.",
  },
  {
    title: "9. Ongoing Maintenance",
    body: "Infrastructure health is monitored continuously, not set up once. Reply rate, spam complaint rate, and bounce rate predict a problem weeks before it shows up in your results — the playbook includes the full weekly and monthly cadence.",
  },
];

const MYTHS = [
  {
    myth: "Buying older domains automatically improves deliverability.",
    reality:
      "Domain age helps, but an old domain with no sending history still needs a full warmup cycle. Age alone isn't a shortcut.",
  },
  {
    myth: "Warmup fixes everything.",
    reality:
      "Warmup builds sending history. It can't fix bad list quality, broken authentication, or a mismatched audience.",
  },
  {
    myth: "Personalizing every sentence guarantees inbox placement.",
    reality:
      "Personalization improves reply rates. It has almost no effect on spam filter scoring, which cares about infrastructure — not copy quality.",
  },
  {
    myth: "More mailboxes always means more deliverability.",
    reality:
      "More mailboxes means more sending capacity. If your list and targeting are weak, more mailboxes just damage reputation across more assets, faster.",
  },
  {
    myth: "A high open rate means your infrastructure is healthy.",
    reality:
      "Open rate is increasingly unreliable due to Apple Mail Privacy Protection. Reply rate and spam complaint rate are far more honest signals.",
  },
];

const ROLE_OPTIONS = ["Business Owner", "Outbound Agency", "Freelancer", "Other"];

const inputCls =
  "w-full border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-[#1f3a5f] focus:outline-none focus:ring-1 focus:ring-[#1f3a5f] transition-colors";

export default function ColdEmailPlaybook() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [openIdx, setOpenIdx] = useState(0);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.role) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/playbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setSubmitted(true);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Dismiss the success popup and reset the form for another submission.
  const closeSuccess = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", company: "", role: "" });
  };

  return (
    <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
      {/* LEAD FORM */}
      <div className="mx-auto max-w-2xl border border-slate-200 p-8 lg:p-12">
        <SectionLabel index="01" label="Get The Playbook" />
            <h2 className="mt-5 text-[24px] lg:text-[28px] tracking-tighter-2 font-semibold text-slate-900">
              Get the full playbook, free
            </h2>
            <p className="mt-3 text-[15px] leading-[1.8] text-slate-600">
              All nine chapters, the complete setup checklists, DNS record
              values, the warmup schedule, and the 60-point infrastructure audit
              — sent straight to your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <label className="block">
                <span className="block text-[13px] text-slate-600 mb-2">
                  Full Name
                </span>
                <input
                  type="text"
                  required
                  placeholder="Jordan Smith"
                  value={form.name}
                  onChange={set("name")}
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="block text-[13px] text-slate-600 mb-2">
                  Work Email
                </span>
                <input
                  type="email"
                  required
                  placeholder="jordan@company.com"
                  value={form.email}
                  onChange={set("email")}
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="block text-[13px] text-slate-600 mb-2">
                  Phone <span className="text-slate-400">(optional)</span>
                </span>
                <input
                  type="tel"
                  placeholder="+1 332 290 3120"
                  value={form.phone}
                  onChange={set("phone")}
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="block text-[13px] text-slate-600 mb-2">
                  Company Name
                </span>
                <input
                  type="text"
                  required
                  placeholder="Acme Outbound"
                  value={form.company}
                  onChange={set("company")}
                  className={inputCls}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="block text-[13px] text-slate-600 mb-2">
                  What best describes you?
                </span>
                <select
                  required
                  value={form.role}
                  onChange={set("role")}
                  className={inputCls}
                >
                  <option value="">Select…</option>
                  {ROLE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
              {error && (
                <p className="sm:col-span-2 text-[14px] text-red-600">{error}</p>
              )}
              <div className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1f3a5f] text-white px-8 py-4 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#C9A14A] transition-colors disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      Submitting
                      <Loader2 size={16} strokeWidth={1.75} className="animate-spin" />
                    </>
                  ) : (
                    "Get the Playbook"
                  )}
                </button>
              </div>
            </form>
      </div>

      {/* WHAT'S INSIDE — chapters grid */}
      <div className="mt-20 lg:mt-28">
        <SectionLabel index="02" label="What's Inside" />
        <h2 className="mt-5 max-w-2xl text-[28px] lg:text-[34px] tracking-tighter-2 font-semibold text-slate-900">
          A complete, chapter-by-chapter build order
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {CHAPTERS.map((ch) => (
            <div key={ch.num} className="bg-white p-8">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#c9a14a] num-cap">
                Chapter {ch.num}
              </span>
              <p className="mt-3 text-[17px] font-semibold text-slate-900 tracking-tighter-2">
                {ch.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CHAPTER DETAILS — accordion */}
      <div className="mt-20 lg:mt-28">
        <SectionLabel index="03" label="Inside Each Chapter" />
        <h2 className="mt-5 max-w-2xl text-[28px] lg:text-[34px] tracking-tighter-2 font-semibold text-slate-900">
          What each chapter actually covers
        </h2>
        <div className="mt-10 border border-slate-200">
          {ACCORDION.map((item, i) => {
            const open = openIdx === i;
            return (
              <div
                key={item.title}
                className="border-b border-slate-200 last:border-b-0"
              >
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[16px] lg:text-[17px] font-semibold text-slate-900">
                    {item.title}
                  </span>
                  <ChevronDown
                    size={20}
                    strokeWidth={1.75}
                    className={`shrink-0 text-slate-400 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open && (
                  <p className="px-6 pb-6 max-w-3xl text-[15px] leading-[1.85] text-slate-600">
                    {item.body}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MYTHS */}
      <div className="mt-20 lg:mt-28">
        <SectionLabel index="04" label="Myths vs Reality" />
        <h2 className="mt-5 max-w-2xl text-[28px] lg:text-[34px] tracking-tighter-2 font-semibold text-slate-900">
          Five myths that quietly burn domains
        </h2>
        <div className="mt-10 border border-slate-200">
          {MYTHS.map((m, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 px-6 py-7 border-b border-slate-200 last:border-b-0"
            >
              <div>
                <span className="text-[11px] tracking-[0.18em] uppercase text-red-500">
                  Myth
                </span>
                <p className="mt-2 text-[15px] leading-[1.7] text-slate-500 line-through decoration-slate-300">
                  {m.myth}
                </p>
              </div>
              <div>
                <span className="text-[11px] tracking-[0.18em] uppercase text-[#1f3a5f]">
                  Reality
                </span>
                <p className="mt-2 text-[15px] leading-[1.7] text-slate-800">
                  {m.reality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {submitted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="playbook-success-title"
          data-testid="playbook-success"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-slate-900/60"
            onClick={closeSuccess}
          />
          <div className="relative z-10 w-full max-w-lg bg-white border border-slate-200 shadow-xl p-10 lg:p-14 text-center">
            <button
              type="button"
              onClick={closeSuccess}
              aria-label="Close"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
            <CheckCircle2
              size={40}
              strokeWidth={1.25}
              className="text-[#1f3a5f] mx-auto"
            />
            <h2
              id="playbook-success-title"
              className="mt-6 text-[26px] lg:text-[30px] tracking-tighter-2 font-semibold text-slate-900"
            >
              You&apos;re all set.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-slate-600">
              We&apos;ve sent the Cold Email Infrastructure Playbook to{" "}
              <span className="text-slate-900 font-medium">{form.email}</span>.
              Check your inbox — and your spam folder, just in case it landed
              there.
            </p>
            <button
              type="button"
              onClick={closeSuccess}
              className="mt-8 inline-flex items-center justify-center bg-[#1f3a5f] text-white px-8 py-4 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#C9A14A] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
