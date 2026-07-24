"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
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
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch border border-slate-200">
        {/* LEFT — image panel (swap the inner block for a real <img> when ready) */}
        <div className="relative min-h-[280px] lg:min-h-full bg-[#16294a] grid-lines-dark overflow-hidden">
          <span className="absolute top-4 left-4 z-10 bg-white px-3 py-1.5 text-[11px] tracking-[0.2em] uppercase text-slate-900">
            Infrastructure
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display italic text-white/10 text-[120px] lg:text-[160px] leading-none select-none">
              60
            </span>
          </div>
          <span className="absolute bottom-4 right-4 z-10 bg-[#1f3a5f] text-white px-4 py-2.5 text-[12px] font-mono-tight tracking-[0.04em]">
            9 Chapters · 60-Point Audit
          </span>
        </div>

        {/* RIGHT — form */}
        <div className="p-8 lg:p-12">
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
