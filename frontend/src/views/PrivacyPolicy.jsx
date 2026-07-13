import SectionLabel from "@/components/site/SectionLabel";

const SECTIONS = [
  {
    index: "01",
    label: "Who We Are",
    content: (
      <>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          Polaris Origin is an Outbound GTM and RevOps firm. We build and operate outbound pipeline
          systems for B2B companies.
        </p>
        <p className="mt-4 text-[16px] leading-[1.85] text-slate-600">
          Polaris Origin is a trading name of Aeontrix AI.
        </p>
        <div className="mt-6 space-y-1">
          <p className="text-[15px] text-slate-700">
            <span className="font-semibold">Website:</span>{" "}
            <a href="https://polarisorigin.com" className="text-[#1f3a5f] underline underline-offset-4 hover:text-[#C9A14A] transition-colors">PolarisOrigin.com</a>
          </p>
          <p className="text-[15px] text-slate-700">
            <span className="font-semibold">Contact:</span>{" "}
            <a href="mailto:contact@polarisorigin.com" className="text-[#1f3a5f] underline underline-offset-4 hover:text-[#C9A14A] transition-colors">contact@polarisorigin.com</a>
          </p>
        </div>
      </>
    ),
  },
  {
    index: "02",
    label: "What This Policy Covers",
    content: (
      <p className="text-[16px] leading-[1.85] text-slate-600">
        This policy explains how we collect, use, and protect personal data when you visit PolarisOrigin.com,
        submit an enquiry, or correspond with us. It does not cover data processed as part of client service
        delivery, which is governed by a separate written agreement.
      </p>
    ),
  },
  {
    index: "03",
    label: "What Data We Collect and Why",
    content: (
      <div className="space-y-6">
        {[
          {
            title: "Contact and enquiry forms.",
            body: "When you submit a form on our website, we collect your name, email address, company name, and any information you include in your message. We use this to respond to your enquiry and assess whether our services are a fit.",
          },
          {
            title: "Website analytics.",
            body: "We may collect standard technical data — including IP address, browser type, device, pages visited, and session duration — through analytics tools. This data is used in aggregate to understand how visitors use the website. We do not use it to identify you individually.",
          },
          {
            title: "Direct email correspondence.",
            body: "We retain emails you send us for the purpose of managing business communications. This includes your contact details and message content.",
          },
          {
            title: "If you become a client.",
            body: "Data collected during a service engagement is governed by the terms of our Service Agreement, not this policy.",
          },
        ].map((item) => (
          <div key={item.title}>
            <p className="text-[16px] leading-[1.85] text-slate-700">
              <span className="font-semibold">{item.title}</span>{" "}
              <span className="text-slate-600">{item.body}</span>
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    index: "04",
    label: "How We Use Your Data",
    content: (
      <p className="text-[16px] leading-[1.85] text-slate-600">
        We use the data we collect to respond to enquiries, assess service fit, follow up on active
        commercial conversations, improve the website, and comply with applicable law. We do not use your
        data for automated decision-making, and we do not sell it.
      </p>
    ),
  },
  {
    index: "05",
    label: "Who We Share Data With",
    content: (
      <div className="space-y-4">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          We share personal data only with service providers that help us operate our business — such as
          email platforms, analytics tools, and document management services. These providers act on our
          instructions. We do not share your data with third parties for their own marketing purposes.
        </p>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          We may disclose data where required by applicable law or legal process.
        </p>
      </div>
    ),
  },
  {
    index: "06",
    label: "International Data Transfers",
    content: (
      <p className="text-[16px] leading-[1.85] text-slate-600">
        Polaris Origin operates from India. Data you submit through this website may be transferred to and
        processed in India. We handle your data with the same standard of care required under applicable
        privacy law regardless of where it is processed. If you have questions about international data
        handling, contact us at{" "}
        <a href="mailto:contact@polarisorigin.com" className="text-[#1f3a5f] underline underline-offset-4 hover:text-[#C9A14A] transition-colors">contact@polarisorigin.com</a>.
      </p>
    ),
  },
  {
    index: "07",
    label: "How Long We Keep Your Data",
    content: (
      <ul className="space-y-3 text-[16px] leading-[1.85] text-slate-600">
        {[
          "Enquiry data is retained for 12 months from last contact.",
          "If an engagement follows, data is kept for the duration of the relationship and for 3 years afterward.",
          "Analytics data is retained per the analytics provider's standard settings.",
          "Email correspondence is retained for 3 years from the date of last contact.",
        ].map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[10px] w-1 h-1 rounded-full bg-[#C9A14A] shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    index: "08",
    label: "Your Rights — General",
    content: (
      <div className="space-y-4">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          Regardless of where you are located, you may contact us at any time to:
        </p>
        <ul className="space-y-3 text-[16px] leading-[1.85] text-slate-600">
          {[
            "Request access to the personal data we hold about you",
            "Ask us to correct inaccurate information",
            "Ask us to delete your data where we have no ongoing legal basis to retain it",
            "Object to how we are using your data",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[10px] w-1 h-1 rounded-full bg-[#C9A14A] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          Email us at{" "}
          <a href="mailto:contact@polarisorigin.com" className="text-[#1f3a5f] underline underline-offset-4 hover:text-[#C9A14A] transition-colors">contact@polarisorigin.com</a>.{" "}
          We will respond within 30 days.
        </p>
      </div>
    ),
  },
  {
    index: "09",
    label: "Your Rights — GDPR (EEA and UK Residents)",
    content: (
      <div className="space-y-4">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          If you are located in the European Economic Area or the United Kingdom, you have additional rights
          under the General Data Protection Regulation (GDPR) or UK GDPR, including the right to data
          portability, the right to restrict processing, and the right to lodge a complaint with your local data
          protection supervisory authority.
        </p>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          Our legal basis for processing your enquiry data is legitimate interests. You contacted us with a
          business enquiry and responding to it is a reasonable and proportionate use of your information.
        </p>
      </div>
    ),
  },
  {
    index: "10",
    label: "Your Rights — CCPA (California Residents)",
    content: (
      <div className="space-y-5">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          If you are a California resident, the California Consumer Privacy Act (CCPA) gives you the following rights:
        </p>
        {[
          {
            title: "Right to know.",
            body: "You can request details about the categories and specific pieces of personal information we have collected about you, and how we use and share it.",
          },
          {
            title: "Right to delete.",
            body: "You can request that we delete personal information we hold about you, subject to certain exceptions.",
          },
          {
            title: "Right to opt out of sale.",
            body: "We do not sell your personal information. This right does not apply to Polaris Origin's data practices.",
          },
          {
            title: "Right to non-discrimination.",
            body: "We will not treat you differently for exercising your CCPA rights.",
          },
        ].map((item) => (
          <p key={item.title} className="text-[16px] leading-[1.85] text-slate-700">
            <span className="font-semibold">{item.title}</span>{" "}
            <span className="text-slate-600">{item.body}</span>
          </p>
        ))}
        <p className="text-[16px] leading-[1.85] text-slate-600">
          To exercise any of these rights, email{" "}
          <a href="mailto:contact@polarisorigin.com" className="text-[#1f3a5f] underline underline-offset-4 hover:text-[#C9A14A] transition-colors">contact@polarisorigin.com</a>{" "}
          with the subject line "California Privacy Request." We will verify your identity and respond within 45 days as required by law.
        </p>
      </div>
    ),
  },
  {
    index: "11",
    label: "Cookies",
    content: (
      <div className="space-y-4">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          This website may use cookies for essential functionality and analytics. Essential cookies are
          required for the site to operate. Analytics cookies help us understand how visitors use the website.
        </p>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          You can control cookies through your browser settings at any time. Disabling analytics cookies will
          not affect your ability to use the website.
        </p>
      </div>
    ),
  },
  {
    index: "12",
    label: "Changes to This Policy",
    content: (
      <p className="text-[16px] leading-[1.85] text-slate-600">
        We may update this policy from time to time. When we do, the "last updated" date at the top of the
        page will change. Continued use of the website after any update constitutes acceptance of the revised policy.
      </p>
    ),
  },
  {
    index: "13",
    label: "Contact",
    content: (
      <div className="space-y-1">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          <a href="mailto:contact@polarisorigin.com" className="text-[#1f3a5f] underline underline-offset-4 hover:text-[#C9A14A] transition-colors">contact@polarisorigin.com</a>
        </p>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          <a href="https://polarisorigin.com" className="text-[#1f3a5f] underline underline-offset-4 hover:text-[#C9A14A] transition-colors">PolarisOrigin.com</a>
        </p>
      </div>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div data-testid="page-privacy-policy">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-20">
          <SectionLabel index="Legal" label="Privacy Policy" />
          <h1 className="mt-10 text-[44px] sm:text-[58px] lg:text-[72px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
            Privacy{" "}
            <span className="font-display italic text-[#1f3a5f]">Policy</span>
          </h1>
          <p className="mt-6 text-[15px] text-slate-500 tracking-[0.04em]">
            Last updated: July 2, 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-slate-200 border border-slate-200">
            {SECTIONS.map((section, i) => (
              <div
                key={section.index}
                className="lg:col-span-12 bg-white grid grid-cols-1 lg:grid-cols-12 gap-px bg-slate-200"
              >
                <div
                  className="lg:col-span-12 bg-white grid grid-cols-1 lg:grid-cols-12 border-b border-slate-200 last:border-b-0"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="lg:col-span-4 bg-white p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-200">
                    <span className="text-[11px] tracking-[0.32em] uppercase text-[#C9A14A] num-cap block mb-4">
                      {section.index}
                    </span>
                    <h2 className="text-[18px] lg:text-[22px] font-semibold text-slate-900 tracking-tight leading-snug">
                      {section.label}
                    </h2>
                  </div>
                  <div className="lg:col-span-8 bg-white p-8 lg:p-12">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
