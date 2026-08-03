"use client";

import { useState } from "react";
import { RefreshCw, Trash2, Calendar, ExternalLink, CheckCircle2, Clock } from "lucide-react";

export default function BookingsTable({ initialBookings = [] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete booking for "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return "-";
    const d = new Date(isoStr);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Cal.com Bookings</h1>
          <p className="text-[14px] text-slate-500 mt-1">
            Bookings synced from Cal.com with automated reminder notifications
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-[14px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition-colors disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Attendee / Company</th>
                <th className="px-5 py-3.5">Meeting Time</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Reminders Sent</th>
                <th className="px-5 py-3.5">Meeting Link</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                    No bookings found yet. Webhook submissions will appear here automatically.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">{b.name}</div>
                      <div className="text-[12px] text-slate-500">
                        <a href={`mailto:${b.email}`} className="hover:underline text-blue-600">
                          {b.email}
                        </a>
                        {b.company && (
                          <span className="ml-2 px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                            {b.company}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-700 font-medium">
                      {formatDate(b.startTime)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {b.status === "BOOKED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Booked
                        </span>
                      )}
                      {b.status === "CANCELLED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Cancelled
                        </span>
                      )}
                      {b.status === "RESCHEDULED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Rescheduled
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-[12px]">
                      {b.reminderBranch && (
                        <div className="mb-1.5 inline-block px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold tracking-wide">
                          BRANCH {b.reminderBranch}
                        </div>
                      )}
                      <div className="space-y-1">
                        <ReminderRow label="Confirmation" sent={b.reminders?.confirmationSent} />
                        <ReminderRow label="Value" sent={b.reminders?.valueSent} />
                        {(b.reminderBranch === "A" || b.reminderBranch === "B") && (
                          <ReminderRow label="Reminder 1 (24h)" sent={b.reminders?.reminder1Sent} />
                        )}
                        <ReminderRow label="Reminder 2 (2h)" sent={b.reminders?.reminder2Sent} />
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {b.meetingLink ? (
                        <a
                          href={b.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[13px] text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Join Link <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[12px]">No link</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(b._id, b.name)}
                        disabled={deletingId === b._id}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors disabled:opacity-50"
                        title="Delete record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReminderRow({ label, sent }) {
  return (
    <div className="flex items-center gap-1.5">
      {sent ? (
        <CheckCircle2 size={13} className="text-emerald-600" />
      ) : (
        <Clock size={13} className="text-slate-400" />
      )}
      <span className={sent ? "text-emerald-800 font-medium" : "text-slate-500"}>
        {label}
      </span>
    </div>
  );
}
