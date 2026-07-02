import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/site/Logo";

const NAV = [
  { label: "Home", to: "/", id: "nav-home" },
  { label: "About", to: "/about", id: "nav-about" },
  { label: "Services", to: "/services", id: "nav-services" },
  { label: "Privacy Policy", to: "/privacy-policy", id: "nav-privacy" },
  { label: "Terms of Service", to: "/terms-of-service", id: "nav-terms" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      data-testid="site-navbar"
      className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          <Link
            to="/"
            data-testid="nav-logo-link"
            className="flex items-center gap-3"
            aria-label="Polaris Origin home"
          >
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                data-testid={item.id}
                className={({ isActive }) =>
                  `text-[13px] tracking-[0.04em] uppercase font-medium transition-colors ${
                    isActive
                      ? "text-[#1f3a5f]"
                      : "text-slate-600 hover:text-[#1f3a5f]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              data-testid="nav-cta-book"
              className="group inline-flex items-center gap-2 bg-[#1f3a5f] text-white px-5 py-3 text-[13px] tracking-[0.04em] uppercase font-medium hover:bg-[#16294a] transition-colors"
            >
              Book Free Consultation
              <ArrowUpRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <button
            data-testid="nav-mobile-toggle"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-slate-200 text-slate-900"
          >
            {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white" data-testid="nav-mobile-panel">
          <div className="mx-auto max-w-[1320px] px-6 py-6 flex flex-col gap-4">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                data-testid={`${item.id}-mobile`}
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-[#1f3a5f]" : "text-slate-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              data-testid="nav-cta-book-mobile"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#1f3a5f] text-white px-5 py-3 text-[13px] tracking-[0.04em] uppercase font-medium"
            >
              Book Free Consultation
              <ArrowUpRight size={16} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
