"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

// Monospace stack used for every figure (matches the site's font-mono-tight).
const MONO =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

// Gold-underlined numeric input, shared by every editable field.
const numInput = {
  width: "100%",
  border: "1px solid #e3d5b3",
  borderBottom: "2px solid #c9a14a",
  padding: "10px 12px",
  fontFamily: MONO,
  fontSize: 20,
  color: "#0f172a",
  background: "#fdfaf3",
  boxSizing: "border-box",
};

const DEFAULTS = {
  leads: "5000",
  seq: "4",
  days: "22",
  sendCost: "94",
  crmCost: "100",
  clay: "0",
  respRate: 1.5,
  posRate: 26,
  bookRate: 70,
  showRate: 85,
  closeRate: 70,
  upfront: "1498",
  mrr: "2000",
  stay: "6",
  closesOv: [null, null, null, null, null],
};

function toNum(v) {
  const n = parseFloat(v);
  return isFinite(n) ? n : 0;
}

function fmt(n, dec) {
  if (!isFinite(n)) return "—";
  const neg = n < 0;
  const a = Math.abs(n);
  const d = dec != null ? dec : Math.round(a * 100) % 100 ? 2 : 0;
  return (
    (neg ? "−$" : "$") +
    a.toLocaleString("en-US", {
      minimumFractionDigits: d ? 2 : 0,
      maximumFractionDigits: d ? 2 : 0,
    })
  );
}

function int(n) {
  return isFinite(n) ? Math.round(n).toLocaleString("en-US") : "—";
}

// Small section header: "01 — Label"
function SectionHead({ num, label, children }) {
  return (
    <>
      <div className="flex items-baseline gap-3.5 mb-3">
        <span style={{ fontFamily: MONO }} className="text-[12px] text-[#c9a14a]">
          {num} —
        </span>
        <span className="text-[11px] tracking-[0.28em] uppercase text-slate-600">
          {label}
        </span>
      </div>
      <h2 className="text-[28px] lg:text-[34px] tracking-[-0.02em] font-semibold text-slate-900 mb-10">
        {children}
      </h2>
    </>
  );
}

const INPUT_TAG = (
  <span
    style={{ fontFamily: MONO }}
    className="text-[10px] text-[#c9a14a] tracking-[0.1em]"
  >
    [INPUT]
  </span>
);

function KindLabel({ color, children }) {
  return (
    <div className="text-[11px] tracking-[0.2em] uppercase text-slate-600 mb-7 flex items-center gap-2.5">
      <span
        style={{ width: 8, height: 8, background: color, display: "inline-block" }}
      />
      {children}
    </div>
  );
}

export default function GtmRoiCalculator() {
  const [s, setS] = useState(DEFAULTS);

  const set = (k) => (e) => setS((p) => ({ ...p, [k]: e.target.value }));
  const setRate = (k) => (e) =>
    setS((p) => ({ ...p, [k]: parseFloat(e.target.value) }));

  const v = useMemo(() => {
    const leads = toNum(s.leads);
    const seq = toNum(s.seq);
    const days = toNum(s.days);
    const emailsMonthly = leads * seq;
    const emailsDaily = days > 0 ? Math.ceil(emailsMonthly / days) : 0;
    const inboxes = Math.ceil(emailsDaily / 20);
    const domains = Math.ceil(inboxes / 3);
    const softwareTotal = toNum(s.sendCost) + toNum(s.crmCost);
    const inboxCost = inboxes * 4.5;
    const leadCost = 100 * (leads / 2000);
    const variableTotal = inboxCost + toNum(s.clay) + leadCost;
    const domainAnnual = domains * 12;
    const monthlySpend = softwareTotal + variableTotal;

    // funnel
    const responses = (leads * s.respRate) / 100;
    const positive = (responses * s.posRate) / 100;
    const calls = Math.floor((positive * s.bookRate) / 100);
    const shows = Math.floor((calls * s.showRate) / 100);
    const closes = Math.floor((shows * s.closeRate) / 100);
    const costPerCall = calls > 0 ? monthlySpend / calls : Infinity;
    const cac = closes > 0 ? monthlySpend / closes : Infinity;

    // per client
    const upfront = toNum(s.upfront);
    const mrr = toNum(s.mrr);
    const stay = toNum(s.stay);
    const clv = upfront + mrr * stay;
    const grossMargin =
      clv > 0
        ? 1 - ((softwareTotal + variableTotal + domainAnnual / 12) * stay) / clv
        : NaN;
    const clvCac = isFinite(cac) && cac > 0 ? clv / cac : NaN;

    // cashflow — month 1 closes held at 0; months 2–6 default to funnel closes.
    const closesArr = [0];
    for (let i = 0; i < 5; i++) {
      const ov = s.closesOv[i];
      const val = ov == null || ov === "" ? closes : parseFloat(ov);
      closesArr.push(isFinite(val) ? val : 0);
    }
    const cashRows = [];
    let total = 0;
    for (let m = 1; m <= 6; m++) {
      const cl = closesArr[m - 1];
      const up = cl * upfront;
      let active = 0;
      for (let k = 1; k <= m; k++) if (k > m - stay) active += closesArr[k - 1];
      const rec = active * mrr;
      const costs = monthlySpend + (m === 1 ? domainAnnual : 0);
      const net = up + rec - costs;
      total += net;
      const ovIdx = m - 2;
      cashRows.push({
        m: String(m).padStart(2, "0"),
        editable: m > 1,
        closesVal:
          m > 1 && s.closesOv[ovIdx] != null ? s.closesOv[ovIdx] : String(closes),
        onCloses: (e) => {
          const val = e.target.value;
          setS((p) => {
            const arr = p.closesOv.slice();
            arr[ovIdx] = val;
            return { ...p, closesOv: arr };
          });
        },
        onBlurCloses: (e) => {
          const val = e.target.value;
          if (val === "" || !isFinite(parseFloat(val))) {
            setS((p) => {
              const arr = p.closesOv.slice();
              arr[ovIdx] = null;
              return { ...p, closesOv: arr };
            });
          }
        },
        upfront: fmt(up, 0),
        active: int(active),
        recurring: fmt(rec, 0),
        costs: fmt(costs),
        net: fmt(net),
        netColor: net < 0 ? "#94a3b8" : "#0f172a",
      });
    }

    const bar = (x) =>
      leads > 0 && x > 0
        ? Math.max(1.5, 100 * Math.pow(x / leads, 0.45)).toFixed(1) + "%"
        : "1.5%";

    const funnelRows = [
      { label: "Leads reached", display: int(leads), width: "100%", color: "#e2e8f0" },
      { label: "Responses", display: int(responses), width: bar(responses), color: "#94a3b8" },
      { label: "Positive responses", display: int(positive), width: bar(positive), color: "#64748b" },
      { label: "Calls booked", display: int(calls), width: bar(calls), color: "#1f3a5f" },
      { label: "Show-ups", display: int(shows), width: bar(shows), color: "#16294a" },
      { label: "Clients closed", display: int(closes), width: bar(closes), color: "#c9a14a" },
    ];

    const rateRows = [
      { label: "Response rate", value: s.respRate, display: s.respRate + "%", max: 20, step: 0.5, onChange: setRate("respRate") },
      { label: "Positive response rate", value: s.posRate, display: s.posRate + "%", max: 100, step: 1, onChange: setRate("posRate") },
      { label: "Call booking rate (on positives)", value: s.bookRate, display: s.bookRate + "%", max: 100, step: 1, onChange: setRate("bookRate") },
      { label: "Show rate", value: s.showRate, display: s.showRate + "%", max: 100, step: 1, onChange: setRate("showRate") },
      { label: "Close rate", value: s.closeRate, display: s.closeRate + "%", max: 100, step: 1, onChange: setRate("closeRate") },
    ];

    const optRows = [
      { metric: "Response rate", levers: ["Script", "Offer", "Deliverability"] },
      { metric: "Positive response rate", levers: ["Script", "Offer", "Deliverability"] },
      { metric: "Call booking rate", levers: ["Speed to respond", "Response handling ability"] },
      { metric: "Close rate", levers: ["Offer", "Case studies", "Sales assets", "Content / social presence", "Target market", "Sales skills", "Follow-up activity"] },
      { metric: "Avg monthly revenue", levers: ["Offer", "Case studies", "Content / social presence", "Sales assets", "Target market"] },
      { metric: "Avg gross profit", levers: ["Operations & management", "Team efficiency", "Automation", "Follow-up activity"] },
      { metric: "Avg customer stay", levers: ["Communication frequency", "Client results", "Reporting"] },
    ];

    return {
      emailsMonthly: int(emailsMonthly),
      emailsDaily: int(emailsDaily),
      inboxes: int(inboxes),
      domains: int(domains),
      inboxCost: fmt(inboxCost),
      leadCost: fmt(leadCost),
      domainAnnual: fmt(domainAnnual),
      softwareTotal: fmt(softwareTotal),
      variableTotal: fmt(variableTotal),
      monthlySpend: fmt(monthlySpend),
      costPerCall: fmt(costPerCall, 2),
      cac: fmt(cac, 2),
      clv: fmt(clv),
      grossMargin: isFinite(grossMargin) ? (grossMargin * 100).toFixed(1) + "%" : "—",
      clvCac: isFinite(clvCac) ? clvCac.toFixed(1) + " : 1" : "—",
      totalCashflow: fmt(total),
      funnelRows,
      rateRows,
      cashRows,
      optRows,
    };
  }, [s]);

  const cellBox = "bg-white p-10";

  return (
    <div className="roi-calc text-slate-900">
      {/* Range-input styling scoped to this widget. */}
      <style>{`
        .roi-calc input[type="number"]::-webkit-outer-spin-button,
        .roi-calc input[type="number"]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
        .roi-calc input[type="number"]{-moz-appearance:textfield;appearance:textfield;}
        .roi-calc input[type="range"]{-webkit-appearance:none;appearance:none;width:100%;height:2px;background:#e2e8f0;outline:none;cursor:pointer;}
        .roi-calc input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;border-radius:0;background:#c9a14a;border:none;cursor:pointer;}
        .roi-calc input[type="range"]::-webkit-slider-thumb:hover{background:#d4af37;}
        .roi-calc input[type="range"]::-moz-range-thumb{width:14px;height:14px;border-radius:0;background:#c9a14a;border:none;cursor:pointer;}
      `}</style>

      {/* Legend + reset */}
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-6 pb-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap gap-7 items-center">
          <span className="flex items-center gap-2.5 text-[13px] text-slate-600">
            <span style={{ width: 10, height: 10, background: "#c9a14a" }} className="inline-block" />
            Your inputs
          </span>
          <span className="flex items-center gap-2.5 text-[13px] text-slate-600">
            <span style={{ width: 10, height: 10, background: "#1f3a5f" }} className="inline-block" />
            Calculated automatically
          </span>
          <span className="flex items-center gap-2.5 text-[13px] text-slate-600">
            <span style={{ width: 10, height: 10, border: "1px solid #94a3b8", boxSizing: "border-box" }} className="inline-block" />
            Fixed variables
          </span>
        </div>
        <button
          type="button"
          onClick={() => setS(DEFAULTS)}
          data-testid="roi-reset"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#1f3a5f] border border-slate-200 px-4 py-2.5 hover:border-[#1f3a5f] transition-colors"
        >
          <RotateCcw size={13} strokeWidth={1.75} />
          Reset defaults
        </button>
      </div>

      {/* Sticky headline metrics band (sits below the 72px navbar). */}
      <div className="grid-lines-dark sticky top-[72px] z-40" style={{ background: "#16294a" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-3.5">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
              gap: 1,
              background: "rgba(255,255,255,.15)",
              border: "1px solid rgba(255,255,255,.15)",
            }}
          >
            {[
              ["Monthly GTM spend", v.monthlySpend, "#fff"],
              ["Cost per call", v.costPerCall, "#fff"],
              ["Acquisition cost", v.cac, "#fff"],
              ["Client lifetime value", v.clv, "#fff"],
              ["CLV : CAC", v.clvCac, "#d4af37"],
              ["6-month net cashflow", v.totalCashflow, "#fff"],
            ].map(([label, val, color]) => (
              <div key={label} style={{ background: "#16294a", padding: "12px 18px" }}>
                <div className="text-[10px] tracking-[0.18em] uppercase mb-1.5" style={{ color: "rgba(255,255,255,.72)" }}>
                  {label}
                </div>
                <div style={{ fontFamily: MONO, fontSize: 19, color }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* 01 — Infrastructure & costs */}
        <div className="py-16 lg:py-20 border-b border-slate-200">
          <SectionHead num="01" label="Sending infrastructure & costs">
            What it costs to <em className="font-display font-normal">reach your market.</em>
          </SectionHead>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {/* volume inputs */}
            <div className={cellBox}>
              <KindLabel color="#c9a14a">Sending volume {INPUT_TAG}</KindLabel>
              <div className="flex flex-col gap-6">
                {[
                  ["Leads reached monthly", "leads"],
                  ["Emails in sequence", "seq"],
                  ["Sending days in month", "days"],
                ].map(([label, key]) => (
                  <label key={key} className="block">
                    <span className="block text-[13px] text-slate-600 mb-2">{label}</span>
                    <input type="number" value={s[key]} onChange={set(key)} style={numInput} />
                  </label>
                ))}
              </div>
            </div>

            {/* software inputs */}
            <div className={cellBox}>
              <KindLabel color="#c9a14a">Software spend / month {INPUT_TAG}</KindLabel>
              <div className="flex flex-col gap-6">
                {[
                  ["Sending software", "sendCost"],
                  ["CRM + Slack + misc software", "crmCost"],
                  ["Clay (optional)", "clay"],
                ].map(([label, key]) => (
                  <label key={key} className="block">
                    <span className="block text-[13px] text-slate-600 mb-2">{label}</span>
                    <input type="number" value={s[key]} onChange={set(key)} style={numInput} />
                  </label>
                ))}
              </div>
              <p className="text-[12px] leading-[1.6] text-slate-500 mt-6">
                Clay ranges from $125–$1,000+ depending on requirements. An advanced
                prospecting and enrichment tool — not required in the beginning.
              </p>
            </div>

            {/* calculated infra */}
            <div className="p-10" style={{ background: "#f5f6f8" }}>
              <KindLabel color="#1f3a5f">Infrastructure required</KindLabel>
              <div className="flex flex-col">
                {[
                  ["Emails sent per month", v.emailsMonthly],
                  ["Cold emails per day", v.emailsDaily],
                  ["Inboxes required", v.inboxes],
                  ["Domains required", v.domains],
                  ["Inbox cost / month", v.inboxCost],
                  ["Leads + enrichment / month", v.leadCost],
                  ["Domains / year (paid month 1)", v.domainAnnual],
                ].map(([label, val], i, arr) => (
                  <div
                    key={label}
                    className="flex justify-between items-baseline py-[11px]"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #e2e8f0" : "none" }}
                  >
                    <span className="text-[13px] text-slate-600">{label}</span>
                    <span style={{ fontFamily: MONO, fontSize: 16 }}>{val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "20 emails / inbox / day",
                  "3 inboxes / domain",
                  "$4.50 / inbox / mo",
                  "$100 / 2,000 leads",
                  "$12 / domain / yr",
                ].map((t) => (
                  <span
                    key={t}
                    style={{ fontFamily: MONO }}
                    className="text-[11px] text-slate-600 border border-slate-300 px-2.5 py-[5px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* totals strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 border-t-0">
            <div className="bg-white px-10 py-7">
              <div className="text-[11px] tracking-[0.2em] uppercase text-slate-600 mb-2.5">Software total / mo</div>
              <div style={{ fontFamily: MONO, fontSize: 24 }}>{v.softwareTotal}</div>
            </div>
            <div className="bg-white px-10 py-7">
              <div className="text-[11px] tracking-[0.2em] uppercase text-slate-600 mb-2.5">Variable total / mo</div>
              <div style={{ fontFamily: MONO, fontSize: 24 }}>{v.variableTotal}</div>
            </div>
            <div className="px-10 py-7" style={{ background: "#1f3a5f" }}>
              <div className="text-[11px] tracking-[0.2em] uppercase mb-2.5" style={{ color: "rgba(255,255,255,.72)" }}>Total monthly spend</div>
              <div style={{ fontFamily: MONO, fontSize: 24, color: "#fff" }}>{v.monthlySpend}</div>
            </div>
          </div>
        </div>

        {/* 02 — Funnel */}
        <div className="py-16 lg:py-20 border-b border-slate-200">
          <SectionHead num="02" label="KPI projections">
            From cold email to <em className="font-display font-normal">closed client.</em>
          </SectionHead>

          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-px bg-slate-200 border border-slate-200">
            {/* sliders */}
            <div className="bg-white p-10 flex flex-col gap-7">
              <KindLabel color="#c9a14a">Conversion rates</KindLabel>
              {v.rateRows.map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between items-baseline mb-2.5">
                    <span className="text-[13px] text-slate-600">{r.label}</span>
                    <span style={{ fontFamily: MONO, fontSize: 16 }}>{r.display}</span>
                  </div>
                  <input type="range" min="0" max={r.max} step={r.step} value={r.value} onChange={r.onChange} />
                </div>
              ))}
            </div>
            {/* funnel bars */}
            <div className="bg-white p-10">
              <KindLabel color="#1f3a5f">Projected funnel / month</KindLabel>
              <div className="flex flex-col gap-[18px]">
                {v.funnelRows.map((f) => (
                  <div key={f.label}>
                    <div className="flex justify-between items-baseline mb-[7px]">
                      <span className="text-[13px] text-slate-600">{f.label}</span>
                      <span style={{ fontFamily: MONO, fontSize: 18 }}>{f.display}</span>
                    </div>
                    <div style={{ height: 6, background: "#f5f6f8" }}>
                      <div style={{ height: 6, background: f.color, width: f.width }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 mt-8">
                <div className="px-6 py-5" style={{ background: "#f5f6f8" }}>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-slate-600 mb-2">Cost per call booked</div>
                  <div style={{ fontFamily: MONO, fontSize: 22 }}>{v.costPerCall}</div>
                </div>
                <div className="px-6 py-5" style={{ background: "#f5f6f8" }}>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-slate-600 mb-2">Cost to acquire customer</div>
                  <div style={{ fontFamily: MONO, fontSize: 22 }}>{v.cac}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 03 — Per-client economics */}
        <div className="py-16 lg:py-20 border-b border-slate-200">
          <SectionHead num="03" label="Per-client economics">
            What one client is <em className="font-display font-normal">actually worth.</em>
          </SectionHead>

          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-px bg-slate-200 border border-slate-200">
            <div className="bg-white p-10">
              <KindLabel color="#c9a14a">Revenue inputs</KindLabel>
              <div className="flex flex-col gap-6">
                {[
                  ["Average upfront revenue", "upfront"],
                  ["Average monthly recurring revenue", "mrr"],
                  ["Average customer stay (months)", "stay"],
                ].map(([label, key]) => (
                  <label key={key} className="block">
                    <span className="block text-[13px] text-slate-600 mb-2">{label}</span>
                    <input type="number" value={s[key]} onChange={set(key)} style={numInput} />
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
                <div className="p-6" style={{ background: "#f5f6f8" }}>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-slate-600 mb-2.5">Client lifetime value</div>
                  <div style={{ fontFamily: MONO, fontSize: 26 }}>{v.clv}</div>
                </div>
                <div className="p-6" style={{ background: "#f5f6f8" }}>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-slate-600 mb-2.5">Gross margin</div>
                  <div style={{ fontFamily: MONO, fontSize: 26 }}>{v.grossMargin}</div>
                </div>
                <div className="p-6" style={{ background: "#16294a" }}>
                  <div className="text-[11px] tracking-[0.2em] uppercase mb-2.5" style={{ color: "rgba(255,255,255,.72)" }}>CLV : CAC</div>
                  <div style={{ fontFamily: MONO, fontSize: 26, color: "#d4af37" }}>{v.clvCac}</div>
                </div>
              </div>
              <p className="text-[13px] leading-[1.7] text-slate-500 mt-7">
                Gross margin here is illustrative only — it shows the margin on a single
                client with the full GTM spend attributed to it. Delivery cost is already
                captured in acquisition cost, so it is not subtracted again in the cashflow
                model below.
              </p>
            </div>
          </div>
        </div>

        {/* 04 — Cashflow */}
        <div className="py-16 lg:py-20 border-b border-slate-200">
          <SectionHead num="04" label="Cashflow model">
            Six months, <em className="font-display font-normal">month by month.</em>
          </SectionHead>
          <p className="text-[15px] leading-[1.7] text-slate-600 max-w-[680px] mb-10 -mt-4">
            Month 1 closes are held at zero, assuming a sales cycle of at least one month.
            Closes from month 2 onwards default to your projected funnel — edit them to model
            ramp-up. Domains are billed annually in month 1.
          </p>

          <div className="border border-slate-200 overflow-x-auto">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "0.7fr 1fr 1.2fr 1fr 1.4fr 1.2fr 1.3fr",
                gap: 1,
                background: "#e2e8f0",
                minWidth: 900,
              }}
            >
              {["Month", "Closes", "Upfront rev", "Active clients", "Recurring rev", "Total costs", "Net cashflow"].map(
                (h) => (
                  <div
                    key={h}
                    className="px-[18px] py-3.5 text-[11px] tracking-[0.16em] uppercase"
                    style={{ background: "#1f3a5f", color: "rgba(255,255,255,.8)" }}
                  >
                    {h}
                  </div>
                )
              )}
              {v.cashRows.map((c) => (
                <CashRow key={c.m} c={c} />
              ))}
            </div>
            <div
              className="flex justify-between items-center px-9 py-8"
              style={{ background: "#16294a", minWidth: 900, boxSizing: "border-box" }}
            >
              <span className="text-[14px] tracking-[0.24em] uppercase" style={{ color: "rgba(255,255,255,.85)" }}>
                Total net cashflow over 6 months
              </span>
              <span style={{ fontFamily: MONO, fontSize: 40, color: "#d4af37" }}>{v.totalCashflow}</span>
            </div>
          </div>
        </div>

        {/* 05 — Optimization */}
        <div className="py-16 lg:py-20">
          <SectionHead num="05" label="KPI optimization">
            Know exactly <em className="font-display font-normal">what to fix.</em>
          </SectionHead>
          <p className="text-[15px] leading-[1.7] text-slate-600 max-w-[640px] mb-10 -mt-4">
            Each metric in the model is driven by a specific set of levers. If a number above
            disappoints, this is where you look.
          </p>
          <div className="border border-slate-200">
            {v.optRows.map((o) => (
              <div
                key={o.metric}
                className="grid grid-cols-1 md:grid-cols-[4fr_8fr] gap-px bg-slate-200 border-b border-slate-200"
              >
                <div className="px-7 py-5 text-[14px] font-semibold text-slate-900 flex items-center" style={{ background: "#f5f6f8" }}>
                  {o.metric}
                </div>
                <div className="bg-white px-7 py-5 flex flex-wrap gap-2 items-center">
                  {o.levers.map((l) => (
                    <span key={l} className="text-[12px] text-slate-600 border border-slate-200 px-[11px] py-[5px]">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CashRow({ c }) {
  const cell = "px-[18px] py-3.5 flex items-center";
  return (
    <>
      <div className={cell} style={{ background: "#fff", fontFamily: MONO, fontSize: 14, color: "#475569" }}>
        {c.m}
      </div>
      <div className="px-[18px] py-2 flex items-center" style={{ background: c.editable ? "#fdfaf3" : "#fff" }}>
        {c.editable ? (
          <input
            type="number"
            min="0"
            value={c.closesVal}
            onChange={c.onCloses}
            onBlur={c.onBlurCloses}
            title="Defaults to your projected closes. Clear the field to re-sync with the funnel."
            style={{
              width: 64,
              border: "1px solid #e3d5b3",
              borderBottom: "2px solid #c9a14a",
              padding: "5px 8px",
              fontFamily: MONO,
              fontSize: 15,
              color: "#0f172a",
              background: "#fdfaf3",
            }}
          />
        ) : (
          <span style={{ fontFamily: MONO, fontSize: 15, color: "#94a3b8" }}>0</span>
        )}
      </div>
      <div className={cell} style={{ background: "#fff", fontFamily: MONO, fontSize: 15, color: "#0f172a" }}>{c.upfront}</div>
      <div className={cell} style={{ background: "#fff", fontFamily: MONO, fontSize: 15, color: "#0f172a" }}>{c.active}</div>
      <div className={cell} style={{ background: "#fff", fontFamily: MONO, fontSize: 15, color: "#0f172a" }}>{c.recurring}</div>
      <div className={cell} style={{ background: "#fff", fontFamily: MONO, fontSize: 15, color: "#0f172a" }}>{c.costs}</div>
      <div className={cell} style={{ background: "#fff", fontFamily: MONO, fontSize: 15, color: c.netColor }}>{c.net}</div>
    </>
  );
}
