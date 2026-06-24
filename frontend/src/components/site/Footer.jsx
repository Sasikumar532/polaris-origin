import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/site/Logo";

const SITEMAP = [
  {
    title: "Engagement",
    items: [
      { label: "Services", to: "/services" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Resources", to: "/resources" },
      { label: "Blog", to: "/blog" },
      { label: "Book Consultation", to: "/contact" },
    ],
  },
  {
    title: "Firm",
    items: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Operating Regions",
    items: [
      { label: "North America", to: "/contact" },
      { label: "United Kingdom", to: "/contact" },
      { label: "DACH & Nordics", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#1f3a5f] text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines-dark opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/15">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-8 max-w-md text-[15px] leading-[1.7] text-white/70">
              Polaris Origin is an Outbound GTM firm for B2B service and
              product companies. We help define the market, build the
              infrastructure, and operate outbound systems that consistently
              create pipeline.
            </p>

            <Link
              to="/contact"
              data-testid="footer-cta"
              className="group mt-10 inline-flex items-center gap-3 border border-[#C9A14A] text-white px-6 py-4 text-[13px] tracking-[0.04em] uppercase font-medium hover:bg-[#C9A14A] hover:text-[#1f3a5f] transition-colors"
            >
              Book Free Consultation
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {SITEMAP.map((group) => (
              <div key={group.title}>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#C9A14A] mb-6">
                  {group.title}
                </p>
                <ul className="space-y-4">
                  {group.items.map((it) => (
                    <li key={it.label}>
                      <Link
                        to={it.to}
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
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-6 pt-10">
          <p className="text-[12px] tracking-[0.04em] text-white/55 num-cap">
            © {new Date().getFullYear()} Polaris Origin · Outbound GTM ·
            Performance-based engagement model
          </p>
          <div className="flex items-center gap-8">
            <Link
              to="/contact"
              className="text-[12px] uppercase tracking-[0.18em] text-white/60 hover:text-white"
              data-testid="footer-privacy"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
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
