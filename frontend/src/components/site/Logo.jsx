export default function Logo({ tone = "dark" }) {
  const fg = tone === "light" ? "text-white" : "text-[#1f3a5f]";
  const sub = tone === "light" ? "text-white/60" : "text-slate-500";
  return (
    <div className="flex items-center gap-3" data-testid="brand-logo">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M11 0L12.4 9.6 22 11l-9.6 1.4L11 22l-1.4-9.6L0 11l9.6-1.4L11 0z"
          fill="#C9A14A"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className={`text-[15px] font-semibold tracking-[0.18em] uppercase ${fg}`}
        >
          Polaris<span className="text-[#C9A14A]">·</span>Origin
        </span>
        <span className={`text-[9.5px] tracking-[0.32em] uppercase ${sub} mt-1`}>
          Outbound GTM · Pay per Show-up
        </span>
      </div>
    </div>
  );
}
