import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Calendar, Mail, FileText, Quote } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionLabel from "@/components/site/SectionLabel";

const REV_RANGES = [
  "Under $5M ARR",
  "$5M – $20M ARR",
  "$20M – $100M ARR",
  "$100M+ ARR",
  "Pre-revenue / Stealth",
];

const INTENTS = [
  "Book a Free Consultation",
  "Discuss a specific engagement",
  "Press / Speaking enquiry",
  "Apply for an open role",
];

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
    body: "If we are not the right firm, we will say so — and recommend two we trust.",
  },
];

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    revenue: "",
    intent: INTENTS[0],
    icp: "",
    message: "",
  });

  const handle = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e?.target ? e.target.value : e }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.message) {
      toast.error("A few fields are still empty.", {
        description: "Name, work email, company and a short message are required.",
      });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Please use a valid work email address.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Enquiry received.", {
      description: "A partner will be in touch within one business day.",
    });
  };

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
            <aside className="lg:col-span-5 order-2 lg:order-1">
              <div className="border border-slate-200 p-8 lg:p-10 bg-[#f5f6f8]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#1f3a5f] font-medium">
                  What to expect
                </p>
                <ul className="mt-10 space-y-10">
                  {EXPECT.map((e, i) => {
                    const Icon = e.icon;
                    return (
                      <li key={e.title} className="flex gap-5">
                        <div className="shrink-0 w-10 h-10 border border-[#1f3a5f] flex items-center justify-center text-[#1f3a5f]">
                          <Icon size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-[#C9A14A] num-cap">
                            0{i + 1}
                          </p>
                          <h3 className="mt-2 text-[18px] font-semibold tracking-tight text-slate-900">
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
                  <Quote
                    size={22}
                    strokeWidth={1.25}
                    className="text-[#C9A14A]"
                  />
                  <p className="font-display text-[20px] leading-snug text-slate-900 mt-4">
                    "We do not pitch. We diagnose. If we are not the right
                    fit, you will know inside thirty minutes."
                  </p>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    — The PolarisOrigin Partners
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

            {/* RIGHT — form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              {submitted ? (
                <div
                  className="border border-[#1f3a5f] p-10 lg:p-14 bg-white"
                  data-testid="contact-success"
                >
                  <div className="w-12 h-12 border border-[#1f3a5f] flex items-center justify-center text-[#1f3a5f]">
                    <CheckCircle2 size={24} strokeWidth={1.5} />
                  </div>
                  <h2 className="mt-10 text-[28px] lg:text-[40px] tracking-tighter-2 font-semibold text-slate-900 leading-[1.1]">
                    Enquiry received,{" "}
                    <span className="font-display italic text-[#1f3a5f]">
                      {form.name.split(" ")[0] || "thank you"}
                    </span>
                    .
                  </h2>
                  <p className="mt-6 text-[15px] leading-[1.8] text-slate-600 max-w-lg">
                    A founding partner will personally review your context and
                    reply with a calendar link inside one business day. If
                    your matter is time-sensitive, write to{" "}
                    <a
                      href="mailto:partners@polarisorigin.com"
                      className="text-[#1f3a5f] link-underline"
                    >
                      partners@polarisorigin.com
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    data-testid="contact-submit-another"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        company: "",
                        role: "",
                        revenue: "",
                        intent: INTENTS[0],
                        icp: "",
                        message: "",
                      });
                    }}
                    className="mt-10 inline-flex items-center gap-2 border border-slate-300 text-slate-900 px-6 py-3 text-[12px] tracking-[0.06em] uppercase font-medium hover:border-[#1f3a5f] transition-colors"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  data-testid="contact-form"
                  className="border border-slate-200 p-8 lg:p-12 bg-white"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <Field
                      id="name"
                      label="Full name"
                      required
                      value={form.name}
                      onChange={handle("name")}
                      placeholder="Adelaide Brae"
                    />
                    <Field
                      id="email"
                      label="Work email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handle("email")}
                      placeholder="adelaide@company.com"
                    />
                    <Field
                      id="company"
                      label="Company"
                      required
                      value={form.company}
                      onChange={handle("company")}
                      placeholder="Quartermast Logistics"
                    />
                    <Field
                      id="role"
                      label="Role"
                      value={form.role}
                      onChange={handle("role")}
                      placeholder="VP Revenue"
                    />
                    <SelectField
                      id="revenue"
                      label="Revenue range"
                      value={form.revenue}
                      onChange={handle("revenue")}
                      options={REV_RANGES}
                      placeholder="Select range"
                    />
                    <SelectField
                      id="intent"
                      label="Reason for contact"
                      value={form.intent}
                      onChange={handle("intent")}
                      options={INTENTS}
                      placeholder="Select intent"
                    />
                    <div className="md:col-span-2">
                      <Field
                        id="icp"
                        label="Ideal Customer Profile (one sentence)"
                        value={form.icp}
                        onChange={handle("icp")}
                        placeholder="VP Operations at logistics SaaS companies, $20M–$100M ARR, North America."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="message"
                        className="block text-[11px] uppercase tracking-[0.22em] text-[#1f3a5f] font-medium"
                      >
                        What would you like to discuss?{" "}
                        <span className="text-[#C9A14A]">*</span>
                      </label>
                      <textarea
                        id="message"
                        data-testid="field-message"
                        required
                        value={form.message}
                        onChange={handle("message")}
                        rows={5}
                        placeholder="The segment we are trying to crack, what we have tried, where it has stalled."
                        className="mt-3 w-full bg-transparent border-b border-slate-300 focus:border-[#1f3a5f] outline-none py-3 text-[15px] text-slate-900 placeholder:text-slate-400 resize-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
                    <p className="text-[12px] tracking-[0.04em] text-slate-500 max-w-md">
                      By submitting, you agree to be contacted by a
                      PolarisOrigin partner. No mailing list. No automated
                      sequences. We never share your details.
                    </p>
                    <button
                      type="submit"
                      data-testid="contact-submit"
                      disabled={submitting}
                      className="group inline-flex items-center justify-center gap-3 bg-[#1f3a5f] text-white px-8 py-4 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#16294a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Submitting…" : "Book Free Consultation"}
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.75}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </button>
                  </div>
                </form>
              )}
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

function Field({ id, label, required, ...rest }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.22em] text-[#1f3a5f] font-medium"
      >
        {label}
        {required && <span className="text-[#C9A14A]"> *</span>}
      </label>
      <input
        id={id}
        data-testid={`field-${id}`}
        required={required}
        className="mt-3 w-full bg-transparent border-b border-slate-300 focus:border-[#1f3a5f] outline-none py-3 text-[15px] text-slate-900 placeholder:text-slate-400 transition-colors"
        {...rest}
      />
    </div>
  );
}

function SelectField({ id, label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.22em] text-[#1f3a5f] font-medium"
      >
        {label}
      </label>
      <div className="mt-3 border-b border-slate-300 focus-within:border-[#1f3a5f] transition-colors">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            id={id}
            data-testid={`field-${id}`}
            className="w-full bg-transparent border-0 rounded-none px-0 py-3 h-auto text-[15px] text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:ring-offset-0 shadow-none"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="rounded-none border border-slate-200">
            {options.map((opt) => (
              <SelectItem
                key={opt}
                value={opt}
                className="rounded-none text-[14px]"
                data-testid={`option-${id}-${opt
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`}
              >
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
