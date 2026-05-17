"use client";

type CarSilhouetteProps = {
  className?: string;
  style?: React.CSSProperties;
};

function CarSilhouette({ className, style }: CarSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 140 56"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M6 38c2-10 14-16 26-16l10-8h32l8 6h22c10 0 18 6 20 14l6 4H6zm18-6h8l5-10h22l6 8h26l4 8H24l-4-6z" />
      <circle cx="34" cy="38" r="7" className="fill-slate-100" />
      <circle cx="102" cy="38" r="7" className="fill-slate-100" />
      <circle
        cx="34"
        cy="38"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle
        cx="102"
        cy="38"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export default function AutoBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Sky → horizon */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/90 via-slate-100 to-slate-200" />

      {/* Soft clouds */}
      <div className="absolute left-[8%] top-[10%] h-16 w-40 rounded-full bg-white/50 blur-2xl" />
      <div className="absolute right-[12%] top-[14%] h-20 w-52 rounded-full bg-white/40 blur-3xl" />
      <div className="absolute left-[45%] top-[6%] h-12 w-32 rounded-full bg-white/35 blur-xl" />

      {/* Speed lines */}
      <div className="absolute inset-0 opacity-[0.07]">
        {[12, 28, 44, 60, 76, 88].map((top) => (
          <div
            key={top}
            className="road-speed-line absolute left-0 h-px w-[38%] bg-gradient-to-r from-transparent via-slate-600 to-transparent"
            style={{ top: `${top}%` }}
          />
        ))}
        {[18, 34, 50, 66, 82].map((top) => (
          <div
            key={`r-${top}`}
            className="road-speed-line absolute right-0 h-px w-[38%] bg-gradient-to-l from-transparent via-slate-600 to-transparent"
            style={{ top: `${top}%`, animationDelay: "1.2s" }}
          />
        ))}
      </div>

      {/* Car silhouettes */}
      <CarSilhouette
        className="absolute -left-4 bottom-[38%] w-36 text-slate-500/25 sm:w-44"
        style={{ transform: "scaleX(-1)" }}
      />
      <CarSilhouette className="absolute -right-6 bottom-[52%] w-32 text-slate-500/20 sm:w-40" />
      <CarSilhouette className="absolute left-[6%] bottom-[22%] hidden w-28 text-slate-600/15 sm:block" />
      <CarSilhouette
        className="absolute right-[4%] bottom-[28%] hidden w-32 text-slate-600/18 md:block"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* Road surface (perspective) */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%] min-h-[220px]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="road-surface" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <polygon fill="url(#road-surface)" points="0,500 1200,500 920,80 280,80" />
          <polygon
            fill="#475569"
            opacity="0.35"
            points="0,500 1200,500 1180,500 40,500"
          />
          {/* Lane edges */}
          <line
            x1="310"
            y1="95"
            x2="40"
            y2="500"
            stroke="white"
            strokeWidth="3"
            opacity="0.35"
          />
          <line
            x1="890"
            y1="95"
            x2="1160"
            y2="500"
            stroke="white"
            strokeWidth="3"
            opacity="0.35"
          />
          {/* Center dashed line */}
          <line
            x1="600"
            y1="110"
            x2="600"
            y2="500"
            stroke="white"
            strokeWidth="4"
            strokeDasharray="28 36"
            className="road-dash-line"
            opacity="0.55"
          />
        </svg>

        {/* Road shoulder texture */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-600/30 to-transparent" />
      </div>

      {/* Center vignette — keeps form readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,transparent_0%,rgba(248,250,252,0.75)_100%)]" />
    </div>
  );
}
