"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, Mail, LogOut } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Blueprint submissions", icon: FileText },
  { href: "/admin/playbook", label: "Playbook leads", icon: Mail },
];

export default function AdminShell({ adminEmail, children }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 shrink-0 bg-[#16294a] text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <span className="text-[11px] tracking-[0.28em] uppercase text-[#C9A14A]">
            Polaris Origin
          </span>
          <div className="mt-1 text-[15px] font-semibold">Admin</div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 text-[14px] transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} strokeWidth={1.75} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          {adminEmail && (
            <div className="px-3 py-2 text-[12px] text-white/50 truncate">
              {adminEmail}
            </div>
          )}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-[14px] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 bg-white">{children}</main>
    </div>
  );
}
