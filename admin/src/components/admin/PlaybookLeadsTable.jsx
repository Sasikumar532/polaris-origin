"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw, Trash2 } from "lucide-react";

function fmtDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PlaybookLeadsTable() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("/api/admin/playbook-leads", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin-login");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load.");
      setRows(data.leads);
    } catch (err) {
      setError(err.message || "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const doDelete = async (id) => {
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/admin/playbook-leads/${id}`, {
        method: "DELETE",
      });
      if (res.status === 401) {
        router.push("/admin-login");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Delete failed.");
      setRows((rs) => rs.filter((r) => r.id !== id));
      setConfirmId(null);
    } catch (err) {
      setError(err.message || "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] tracking-[0.28em] uppercase text-[#C9A14A]">
            Admin
          </span>
          <h1 className="mt-3 text-[32px] lg:text-[42px] tracking-tighter-2 font-semibold text-slate-900">
            Playbook leads
          </h1>
          <p className="mt-2 text-[14px] text-slate-500">
            Cold Email Infrastructure Playbook downloads.
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2.5 text-[12px] tracking-[0.08em] uppercase text-slate-600 hover:border-[#1f3a5f] hover:text-[#1f3a5f] transition-colors"
        >
          <RefreshCw size={14} strokeWidth={1.75} />
          Refresh
        </button>
      </div>

      {error && (
        <p className="mt-6 text-[14px] text-red-600 break-words">{error}</p>
      )}

      {loading ? (
        <div className="mt-16 flex items-center gap-2 text-slate-500">
          <Loader2 size={18} className="animate-spin" /> Loading…
        </div>
      ) : rows.length === 0 ? (
        <p className="mt-16 text-slate-500">No leads yet.</p>
      ) : (
        <div className="mt-10 border border-slate-200 overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-[14px]">
            <thead>
              <tr className="bg-[#1f3a5f] text-white">
                {["Name", "Email", "Phone", "Company", "Role", "PDF sent", "Submitted"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[11px] tracking-[0.12em] uppercase font-medium"
                    >
                      {h}
                    </th>
                  )
                )}
                <th className="w-10 px-2 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-slate-200">
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {r.name}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    <a
                      href={`mailto:${r.email}`}
                      className="hover:text-[#1f3a5f]"
                    >
                      {r.email}
                    </a>
                  </td>
                  <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                    {r.phone || "—"}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{r.company}</td>
                  <td className="px-4 py-4 text-slate-600">{r.role || "—"}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block border px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] ${
                        r.emailSent
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {r.emailSent ? "Sent" : "Not sent"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                    {fmtDate(r.createdAt)}
                  </td>
                  <td className="px-2 py-4">
                    <button
                      onClick={() => setConfirmId(r.id)}
                      aria-label="Delete lead"
                      className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.75} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-slate-900/60"
            onClick={() => !deletingId && setConfirmId(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 shadow-xl p-8">
            <h2 className="text-[22px] font-semibold text-slate-900">
              Delete lead?
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
              This permanently removes{" "}
              <span className="font-medium text-slate-900">
                {rows.find((r) => r.id === confirmId)?.email || "this lead"}
              </span>{" "}
              from the database. This can&apos;t be undone.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                disabled={!!deletingId}
                className="border border-slate-300 px-5 py-2.5 text-[13px] uppercase tracking-[0.06em] text-slate-600 hover:border-slate-500 transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={() => doDelete(confirmId)}
                disabled={!!deletingId}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 text-[13px] uppercase tracking-[0.06em] font-medium hover:bg-red-700 transition-colors disabled:opacity-70"
              >
                {deletingId ? (
                  <>
                    Deleting
                    <Loader2 size={14} className="animate-spin" />
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
