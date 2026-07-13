"use client";

import { useEffect } from "react";

// Loads Cal.com's inline embed once on mount and mounts it into #my-cal-inline-strategy.
export default function CalEmbed() {
  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = window.Cal;
    Cal("init", "strategy", { origin: "https://app.cal.com" });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;

    Cal.ns.strategy("inline", {
      elementOrSelector: "#my-cal-inline-strategy",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "polarisorigin/strategy",
    });

    Cal.ns.strategy("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": "#1f3a5f" },
        dark: { "cal-brand": "#cfab5e" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <div
      id="my-cal-inline-strategy"
      style={{ width: "100%", height: "100%", overflow: "scroll", minHeight: "700px" }}
      className="border border-slate-200 bg-white"
      data-testid="cal-embed"
    />
  );
}
