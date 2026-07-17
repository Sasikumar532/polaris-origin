"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ExternalLink,
  RefreshCw,
  LogOut,
  ChevronDown,
  ChevronRight,
  Trash2,
} from "lucide-react";

// All prospect-answer fields, in form order, for the expanded detail panel.
const DETAIL_FIELDS = [
  ["Website", "website_url"],
  ["Offer description", "offer_description"],
  ["Industries", "industries_list"],
  ["Best-fit industry", "best_fit_industry"],
  ["Pain points", "pain_points"],
  ["Value delivered", "value_delivered"],
  ["Geography", "geography"],
  ["Capacity", "capacity"],
  ["Average order value", "aov"],
  ["Competitor", "competitor_name"],
  ["Competitor website", "competitor_website"],
  ["Qualifying criteria", "qualifying_criteria"],
  ["Additional notes", "additional_notes"],
];

const STATUS_STYLES = {
  completed: "bg-green-50 text-green-700 border-green-200",
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  failed: "bg-red-50 text-red-700 border-red-200",
};

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

export default function AdminDashboard({ adminEmail }) {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin-login");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load.");
      setRows(data.submissions);
    } catch (err) {
      setError(err.message || "Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const generate = async (id) => {
    setBusyId(id);
    setError("");
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, status: "processing" } : r))
    );
    try {
      const res = await fetch(`/api/admin/submissions/${id}/generate`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.status === 401) {
        router.push("/admin-login");
        return;
      }
      if (!res.ok) throw new Error(data?.error || "Generation failed.");
      setRows((rs) =>
        rs.map((r) =>
          r.id === id
            ? { ...r, status: "completed", documentUrl: data.documentUrl, error: null }
            : r
        )
      );
    } catch (err) {
      setRows((rs) =>
        rs.map((r) =>
          r.id === id ? { ...r, status: "failed", error: err.message } : r
        )
      );
      setError(err.message || "Generation failed.");
    } finally {
      setBusyId(null);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  };

  const doDelete = async (id) => {
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
      });
      if (res.status === 401) {
        router.push("/admin-login");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Delete failed.");
      setRows((rs) => rs.filter((r) => r.id !== id));
      setConfirmDeleteId(null);
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
            Blueprint submissions
          </h1>
          <p className="mt-2 text-[14px] text-slate-500">
            Signed in as {adminEmail}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2.5 text-[12px] tracking-[0.08em] uppercase text-slate-600 hover:border-[#1f3a5f] hover:text-[#1f3a5f] transition-colors"
          >
            <RefreshCw size={14} strokeWidth={1.75} />
            Refresh
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2.5 text-[12px] tracking-[0.08em] uppercase text-slate-600 hover:border-red-400 hover:text-red-600 transition-colors"
          >
            <LogOut size={14} strokeWidth={1.75} />
            Log out
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-6 text-[14px] text-red-600 break-words">{error}</p>
      )}

      {loading ? (
        <div className="mt-16 flex items-center gap-2 text-slate-500">
          <Loader2 size={18} className="animate-spin" /> Loading…
        </div>
      ) : rows.length === 0 ? (
        <p className="mt-16 text-slate-500">No submissions yet.</p>
      ) : (
        <div className="mt-10 border border-slate-200 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-[14px]">
            <thead>
              <tr className="bg-[#1f3a5f] text-white">
                <th className="w-10 px-2 py-3" />
                {["Company", "Industry", "AOV", "Competitor", "Submitted", "Status", "Blueprint"].map(
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
              {rows.map((r) => {
                const open = expandedId === r.id;
                return (
                  <Fragment key={r.id}>
                    <tr className="border-t border-slate-200 align-top">
                      <td className="px-2 py-4">
                        <button
                          onClick={() => setExpandedId(open ? null : r.id)}
                          aria-label={open ? "Collapse" : "Expand"}
                          className="text-slate-400 hover:text-[#1f3a5f] transition-colors"
                        >
                          {open ? (
                            <ChevronDown size={18} strokeWidth={1.75} />
                          ) : (
                            <ChevronRight size={18} strokeWidth={1.75} />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900">
                          {r.company_name}
                        </div>
                        {r.website_url && (
                          <a
                            href={r.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] text-slate-500 hover:text-[#1f3a5f] break-all"
                          >
                            {r.website_url}
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {r.best_fit_industry}
                      </td>
                      <td className="px-4 py-4 text-slate-600">{r.aov}</td>
                      <td className="px-4 py-4 text-slate-600">
                        {r.competitor_name}
                      </td>
                      <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                        {fmtDate(r.createdAt)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block border px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] ${
                            STATUS_STYLES[r.status] ||
                            "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {r.status}
                        </span>
                        {r.status === "failed" && r.error && (
                          <div className="mt-1 text-[11px] text-red-500 max-w-[220px] break-words">
                            {r.error}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {r.documentUrl ? (
                          <a
                            href={r.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] text-[#1f3a5f] hover:text-[#C9A14A] font-medium"
                          >
                            Open doc
                            <ExternalLink size={14} strokeWidth={1.75} />
                          </a>
                        ) : (
                          <button
                            onClick={() => generate(r.id)}
                            disabled={busyId === r.id}
                            className="inline-flex items-center gap-2 bg-[#1f3a5f] text-white px-4 py-2 text-[12px] tracking-[0.06em] uppercase font-medium hover:bg-[#C9A14A] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {busyId === r.id ? (
                              <>
                                Generating
                                <Loader2 size={13} className="animate-spin" />
                              </>
                            ) : (
                              "Generate"
                            )}
                          </button>
                        )}
                      </td>
                      <td className="px-2 py-4">
                        <button
                          onClick={() => setConfirmDeleteId(r.id)}
                          aria-label="Delete submission"
                          className="text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} strokeWidth={1.75} />
                        </button>
                      </td>
                    </tr>
                    {open && (
                      <tr className="border-t border-slate-100 bg-[#f5f6f8]">
                        <td colSpan={9} className="px-6 py-6">
                          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                            {DETAIL_FIELDS.map(([label, key]) => (
                              <div key={key}>
                                <dt className="text-[11px] tracking-[0.14em] uppercase text-slate-500 mb-1">
                                  {label}
                                </dt>
                                <dd className="text-[14px] leading-[1.7] text-slate-800 break-words whitespace-pre-wrap">
                                  {r[key] ? r[key] : "—"}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {confirmDeleteId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-slate-900/60"
            onClick={() => !deletingId && setConfirmDeleteId(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 shadow-xl p-8">
            <h2 className="text-[22px] font-semibold text-slate-900">
              Delete submission?
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
              This permanently removes{" "}
              <span className="font-medium text-slate-900">
                {rows.find((r) => r.id === confirmDeleteId)?.company_name ||
                  "this submission"}
              </span>{" "}
              from the database. This can&apos;t be undone.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                disabled={!!deletingId}
                className="border border-slate-300 px-5 py-2.5 text-[13px] uppercase tracking-[0.06em] text-slate-600 hover:border-slate-500 transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={() => doDelete(confirmDeleteId)}
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
