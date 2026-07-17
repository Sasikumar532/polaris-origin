"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed.");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message || "Login failed.");
      setLoading(false);
    }
  };

  const input =
    "w-full border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-900 focus:border-[#1f3a5f] focus:outline-none focus:ring-1 focus:ring-[#1f3a5f] transition-colors";

  return (
    <section className="mx-auto max-w-md px-6 py-24 lg:py-32">
      <span className="text-[11px] tracking-[0.28em] uppercase text-[#C9A14A]">
        Admin
      </span>
      <h1 className="mt-4 text-[32px] lg:text-[40px] tracking-tighter-2 font-semibold text-slate-900">
        Sign in
      </h1>
      <form onSubmit={submit} className="mt-10 space-y-6">
        <label className="block">
          <span className="block text-[13px] text-slate-600 mb-2">Email</span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
          />
        </label>
        <label className="block">
          <span className="block text-[13px] text-slate-600 mb-2">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={input}
          />
        </label>
        {error && <p className="text-[14px] text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-[#1f3a5f] text-white px-8 py-4 text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#C9A14A] transition-colors disabled:opacity-70"
        >
          {loading ? (
            <>
              Signing in
              <Loader2 size={16} strokeWidth={1.75} className="animate-spin" />
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </section>
  );
}
