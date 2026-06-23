export default function SectionLabel({ index, label, tone = "dark", className = "" }) {
  const color = tone === "light" ? "text-white/70" : "text-[#1f3a5f]";
  const num = tone === "light" ? "text-[#C9A14A]" : "text-[#C9A14A]";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {index && (
        <span
          className={`text-[11px] tracking-[0.32em] uppercase ${num} num-cap`}
        >
          {index}
        </span>
      )}
      <span
        className={`text-[11px] tracking-[0.32em] uppercase ${color} font-medium`}
      >
        {label}
      </span>
    </div>
  );
}
