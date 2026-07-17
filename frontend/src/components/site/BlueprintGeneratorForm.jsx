"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, X } from "lucide-react";

const FIELDS = [
  {
    name: "company_name",
    label: "Company name",
    help: "So we can personalize the document properly.",
    type: "text",
    required: true,
  },
  {
    name: "website_url",
    label: "Website URL",
    help: "We'll read this ourselves, no need to describe your site to us.",
    type: "url",
    placeholder: "https://",
    required: true,
  },
  {
    name: "offer_description",
    label: "Describe your offer",
    help: "One paragraph. What you do, how you do it, plain language.",
    type: "textarea",
    required: true,
  },
  {
    name: "industries_list",
    label: "What industries have you worked in, or could work in?",
    help: "List as many as apply, even ones you haven't landed yet.",
    type: "textarea",
    required: true,
  },
  {
    name: "best_fit_industry",
    label: "Which industry has been your best-fit or most successful so far?",
    help: "Where your strongest results and happiest clients tend to come from.",
    type: "text",
    required: true,
  },
  {
    name: "pain_points",
    label: "What pain points does your offer solve?",
    help: "The problem a client has right before they call you.",
    type: "textarea",
    required: true,
  },
  {
    name: "value_delivered",
    label: "What value do clients get from working with you?",
    help: "The outcome after the work is done, not the process itself.",
    type: "textarea",
    required: true,
  },
  {
    name: "geography",
    label: "What geography do you serve?",
    help: "Country, region, or specific states/cities if that matters to you.",
    type: "text",
    required: true,
  },
  {
    name: "capacity",
    label:
      "How many more clients could you realistically take on right now before you'd be at capacity?",
    help: "This shapes how selective the strategy gets, not how big the outreach volume is.",
    type: "text",
    required: true,
  },
  {
    name: "aov",
    label: "Average Order Value — how much you typically charge for your services",
    help: "This decides who we target. We only build blueprints around clients who can actually afford what you sell.",
    type: "text",
    required: true,
  },
  {
    name: "competitor",
    label:
      "Name a direct competitor or the market leader in your space, plus their website if you know it",
    help: "Doesn't have to be exact, whoever comes to mind first is usually right.",
    type: "competitor",
    required: true,
  },
  {
    name: "qualifying_criteria",
    label: "What tells you someone's a good fit before you even talk to them?",
    help: "Company size, tools they already use, a role they're hiring for, anything you notice that predicts a good client. Example: 10-50 employees, already using a CRM like HubSpot, hiring for a sales or ops role, recently raised funding.",
    type: "textarea",
    required: true,
  },
  {
    name: "additional_notes",
    label: "Anything else you want us to know?",
    help: "Optional. Anything that didn't fit above.",
    type: "textarea",
    required: false,
  },
];

const inputClasses =
  "w-full border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-[#1f3a5f] focus:outline-none focus:ring-1 focus:ring-[#1f3a5f] transition-colors";

export default function BlueprintGeneratorForm() {
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (name, value) =>
    setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }
      setStatus("done");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  // Dismiss the success popup and reset the form for a fresh submission.
  const closeSuccess = () => {
    setStatus("idle");
    setValues({});
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      data-testid="blueprint-form"
      className="space-y-12"
    >
      {FIELDS.map((field, i) => (
        <div key={field.name}>
          <div className="flex gap-4">
            <span className="text-[13px] tracking-[0.2em] uppercase text-[#C9A14A] num-cap font-medium pt-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-[17px] lg:text-[19px] font-semibold text-slate-900 leading-snug"
              >
                {field.label}
                {!field.required && (
                  <span className="ml-2 text-[12px] font-normal uppercase tracking-[0.14em] text-slate-400">
                    Optional
                  </span>
                )}
              </label>
              <p className="mt-2 text-[14px] leading-[1.6] text-slate-500">
                {field.help}
              </p>

              <div className="mt-4">
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    rows={4}
                    value={values[field.name] || ""}
                    onChange={(e) => update(field.name, e.target.value)}
                    className={`${inputClasses} resize-y`}
                  />
                ) : field.type === "competitor" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      id={field.name}
                      name="competitor_name"
                      type="text"
                      required={field.required}
                      placeholder="Competitor name"
                      value={values.competitor_name || ""}
                      onChange={(e) => update("competitor_name", e.target.value)}
                      className={inputClasses}
                    />
                    <input
                      name="competitor_website"
                      type="url"
                      placeholder="https:// (optional)"
                      value={values.competitor_website || ""}
                      onChange={(e) =>
                        update("competitor_website", e.target.value)
                      }
                      className={inputClasses}
                    />
                  </div>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={values[field.name] || ""}
                    onChange={(e) => update(field.name, e.target.value)}
                    className={inputClasses}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="pl-0 sm:pl-[52px]">
        {status === "error" && (
          <p
            data-testid="blueprint-error"
            className="mb-5 text-[14px] leading-[1.6] text-red-600"
          >
            {errorMsg}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          data-testid="blueprint-submit"
          className="group inline-flex items-center gap-2 bg-[#1f3a5f] text-white px-8 py-4 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#C9A14A] transition-colors disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#1f3a5f]"
        >
          {status === "loading" ? (
            <>
              Submitting
              <Loader2 size={16} strokeWidth={1.75} className="animate-spin" />
            </>
          ) : (
            <>
              Submit
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </>
          )}
        </button>
        {status === "loading" && (
          <p className="mt-4 text-[13px] leading-[1.6] text-slate-500">
            Sending your details…
          </p>
        )}
      </div>
    </form>

    {status === "done" && (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="blueprint-success-title"
        data-testid="blueprint-form-success"
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
            id="blueprint-success-title"
            className="mt-6 text-[26px] lg:text-[30px] tracking-tighter-2 font-semibold text-slate-900"
          >
            Thanks for submitting.
          </h2>
          <p className="mt-4 text-[16px] leading-[1.8] text-slate-600">
            We've received your details. Our team will review them and be in
            touch shortly.
          </p>
          <p className="mt-6 text-[14px] leading-[1.7] text-slate-500">
            Questions? Email{" "}
            <a
              href="mailto:contact@polarisorigin.com"
              className="text-[#1f3a5f] underline underline-offset-4 hover:text-[#C9A14A] transition-colors"
            >
              contact@polarisorigin.com
            </a>
            .
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
    </>
  );
}
 