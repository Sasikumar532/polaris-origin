import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/site/Logo";

const SITEMAP = [
  {
    title: "Engagement",
    items: [
      { label: "Services", to: "/services" },
      { label: "Book Consultation", to: "/contact" },
    ],
  },
  {
    title: "Firm",
    items: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Operating Regions",
    items: [
      { label: "North America", to: "/contact" },
      { label: "United Kingdom", to: "/contact" },
      { label: "India", to: "/contact" },
    ],
  },
];

const CONTACT_INFO = [
  { label: "partners@polarisorigin.com", href: "mailto:partners@polarisorigin.com" },
  { label: "contact@polarisorigin.com", href: "mailto:contact@polarisorigin.com" },
  { label: "careers@polarisorigin.com", href: "mailto:careers@polarisorigin.com" },
  { label: "+1 332-290-3120", href: "tel:+13322903120" },
  { label: "+91 87789 31001", href: "tel:+918778931001" },
];

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#1f3a5f] text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines-dark opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 pb-12 border-b border-white/15">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-8 max-w-md text-[15px] leading-[1.7] text-white/70">
              Polaris Origin is an Outbound GTM firm for B2B service and
              product companies. We help define the market, build the
              infrastructure, and operate outbound systems that consistently
              create pipeline.
            </p>

            <Link
              href="/contact"
              data-testid="footer-cta"
              className="group mt-10 inline-flex items-center gap-3 bg-[#C9A14A] text-[#1f3a5f] px-6 py-4 text-[13px] tracking-[0.04em] uppercase font-medium"
            >
              Book Free Consultation
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {SITEMAP.map((group) => (
              <div key={group.title}>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#C9A14A] mb-6">
                  {group.title}
                </p>
                <ul className="space-y-4">
                  {group.items.map((it) => (
                    <li key={it.label}>
                      <Link
                        href={it.to}
                        data-testid={`footer-link-${it.label.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-[14px] text-white/80 hover:text-white link-underline"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#C9A14A] mb-6">
                Contact
              </p>
              <ul className="space-y-4">
                {CONTACT_INFO.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      data-testid={`footer-contact-${it.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="text-[14px] text-white/80 hover:text-white link-underline"
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-6 pt-10">
          <p className="text-[12px] tracking-[0.04em] text-white/55 num-cap">
            © {new Date().getFullYear()} Polaris Origin · Outbound GTM ·
            Performance-based engagement model
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/privacy-policy"
              className="text-[12px] uppercase tracking-[0.18em] text-white/60 hover:text-white"
              data-testid="footer-privacy"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-[12px] uppercase tracking-[0.18em] text-white/60 hover:text-white"
              data-testid="footer-terms"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
