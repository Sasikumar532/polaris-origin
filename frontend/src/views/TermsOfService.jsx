import CTASection from "@/components/site/CTASection";
import SectionLabel from "@/components/site/SectionLabel";

const SECTIONS = [
  {
    index: "01",
    label: "About These Terms",
    content: (
      <div className="space-y-4">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          These Terms of Service govern your use of PolarisOrigin.com (the "Website"). By accessing or using
          the Website, you agree to these terms. If you do not agree, please do not use the Website.
        </p>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          These terms apply to the Website only. They do not constitute or replace any service agreement.
          Commercial engagements are governed by a separate written contract.
        </p>
      </div>
    ),
  },
  {
    index: "02",
    label: "Who We Are",
    content: (
      <>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          Polaris Origin is an Outbound GTM and RevOps firm and a trading name of Aeontrix AI. References
          to "Polaris Origin", "we", "us", or "our" refer to Aeontrix AI trading as Polaris Origin.
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
    index: "03",
    label: "Using This Website",
    content: (
      <div className="space-y-4">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          You may use this Website for lawful purposes only. You agree not to:
        </p>
        <ul className="space-y-3 text-[16px] leading-[1.85] text-slate-600">
          {[
            "Use the Website in any way that violates applicable law",
            "Attempt to gain unauthorised access to any part of the Website or its underlying systems",
            "Use automated tools to scrape or extract content without our written permission",
            "Submit false or misleading information through any form on the Website",
            "Interfere with or disrupt the Website's operation",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[10px] w-1 h-1 rounded-full bg-[#C9A14A] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          We reserve the right to restrict or terminate access to the Website at any time without notice.
        </p>
      </div>
    ),
  },
  {
    index: "04",
    label: "Intellectual Property",
    content: (
      <div className="space-y-4">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          All content on this Website — including text, graphics, design, copy, and branding — is the
          intellectual property of Aeontrix AI (trading as Polaris Origin) or its licensors. All rights are reserved.
        </p>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          You may view and print pages for personal, non-commercial reference. You may not reproduce,
          republish, distribute, or exploit any Website content without our prior written consent.
        </p>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          The Polaris Origin name, logo, and associated marks are proprietary and may not be used without
          written permission.
        </p>
      </div>
    ),
  },
  {
    index: "05",
    label: "Accuracy of Information",
    content: (
      <p className="text-[16px] leading-[1.85] text-slate-600">
        We aim to keep Website content accurate and current. However, we make no warranties about the
        completeness, accuracy, or reliability of any information on the Website. Performance figures and
        statistics referenced on the Website are illustrative and do not guarantee any specific outcome.
      </p>
    ),
  },
  {
    index: "06",
    label: "Contact Forms and Enquiries",
    content: (
      <div className="space-y-4">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          Submitting a contact form or emailing us does not create a contractual or commercial relationship.
          Any service engagement requires a separate written agreement signed by both parties.
        </p>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          We will make reasonable efforts to respond to genuine enquiries. We reserve the right to decline any
          enquiry without explanation.
        </p>
      </div>
    ),
  },
  {
    index: "07",
    label: "Our Services",
    content: (
      <p className="text-[16px] leading-[1.85] text-slate-600">
        Polaris Origin provides outbound GTM and RevOps services to B2B companies. The Website
        describes those services at a general level. Specific deliverables, pricing, and commitments are
        defined exclusively in individual service agreements. Nothing on this Website constitutes a binding
        offer or guarantee of results.
      </p>
    ),
  },
  {
    index: "08",
    label: "Third-Party Links",
    content: (
      <p className="text-[16px] leading-[1.85] text-slate-600">
        This Website may link to third-party websites for convenience. We do not endorse or accept
        responsibility for third-party content or practices. Accessing external sites is at your own risk.
      </p>
    ),
  },
  {
    index: "09",
    label: "Limitation of Liability",
    content: (
      <div className="space-y-4">
        <p className="text-[16px] leading-[1.85] text-slate-600">
          To the fullest extent permitted by applicable law, Polaris Origin is not liable for any loss or damage
          — direct or indirect — arising from your use of or inability to use the Website, any errors or
          omissions in Website content, or any interruption or termination of the Website.
        </p>
        <p className="text-[16px] leading-[1.85] text-slate-600">
          Nothing in these terms excludes liability that cannot be excluded under applicable law.
        </p>
      </div>
    ),
  },
  {
    index: "10",
    label: "Governing Law",
    content: (
      <p className="text-[16px] leading-[1.85] text-slate-600">
        These Terms are governed by the laws of India. Any dispute arising in connection with these terms
        shall be resolved through good-faith negotiation in the first instance. If unresolved, disputes shall be
        referred to binding arbitration in accordance with applicable arbitration rules.
      </p>
    ),
  },
  {
    index: "11",
    label: "Changes",
    content: (
      <p className="text-[16px] leading-[1.85] text-slate-600">
        We may update these terms at any time. The "last updated" date will reflect when changes were
        made. Continued use of the Website after changes constitutes acceptance.
      </p>
    ),
  },
  {
    index: "12",
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

export default function TermsOfService() {
  return (
    <div data-testid="page-terms-of-service">
      {/* HERO */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 lg:pt-28 pb-16 lg:pb-20">
          <SectionLabel index="Legal" label="Terms of Service" />
          <h1 className="mt-10 text-[44px] sm:text-[58px] lg:text-[72px] leading-[0.98] tracking-tighter-2 font-semibold text-slate-900">
            Terms of{" "}
            <span className="font-display italic text-[#1f3a5f]">Service</span>
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

      <CTASection testId="terms-cta" />
    </div>
  );
}
