"use client";

type GearConfig = {
  x: string;
  y: string;
  size: number;
  teeth: number;
  duration: number;
  reverse?: boolean;
  opacity: number;
};

const gears: GearConfig[] = [
  { x: "-8%", y: "8%", size: 220, teeth: 14, duration: 48, opacity: 0.14 },
  { x: "72%", y: "-6%", size: 280, teeth: 16, duration: 56, reverse: true, opacity: 0.12 },
  { x: "58%", y: "52%", size: 160, teeth: 12, duration: 32, opacity: 0.1 },
  { x: "12%", y: "62%", size: 200, teeth: 14, duration: 40, reverse: true, opacity: 0.13 },
  { x: "38%", y: "28%", size: 96, teeth: 10, duration: 22, opacity: 0.08 },
  { x: "85%", y: "38%", size: 120, teeth: 11, duration: 26, reverse: true, opacity: 0.09 },
  { x: "-4%", y: "42%", size: 140, teeth: 12, duration: 34, opacity: 0.11 },
  { x: "22%", y: "18%", size: 72, teeth: 9, duration: 18, reverse: true, opacity: 0.07 },
  { x: "48%", y: "72%", size: 180, teeth: 13, duration: 38, reverse: true, opacity: 0.11 },
  { x: "92%", y: "68%", size: 150, teeth: 12, duration: 30, opacity: 0.1 },
  { x: "68%", y: "22%", size: 88, teeth: 10, duration: 20, reverse: true, opacity: 0.08 },
  { x: "5%", y: "78%", size: 110, teeth: 11, duration: 24, opacity: 0.09 },
  { x: "30%", y: "48%", size: 64, teeth: 8, duration: 16, reverse: true, opacity: 0.06 },
  { x: "52%", y: "8%", size: 130, teeth: 12, duration: 28, opacity: 0.1 },
  { x: "78%", y: "82%", size: 100, teeth: 10, duration: 21, reverse: true, opacity: 0.08 },
  { x: "-12%", y: "58%", size: 95, teeth: 9, duration: 19, opacity: 0.07 },
  { x: "42%", y: "88%", size: 76, teeth: 9, duration: 17, reverse: true, opacity: 0.07 },
  { x: "95%", y: "12%", size: 85, teeth: 10, duration: 23, opacity: 0.08 },
  { x: "18%", y: "38%", size: 52, teeth: 8, duration: 14, reverse: true, opacity: 0.05 },
  { x: "62%", y: "38%", size: 58, teeth: 8, duration: 15, opacity: 0.06 },
  { x: "8%", y: "-4%", size: 105, teeth: 11, duration: 25, reverse: true, opacity: 0.09 },
  { x: "88%", y: "55%", size: 68, teeth: 9, duration: 16, opacity: 0.07 },
  { x: "28%", y: "82%", size: 92, teeth: 10, duration: 20, reverse: true, opacity: 0.08 },
  { x: "50%", y: "42%", size: 44, teeth: 7, duration: 12, opacity: 0.05 },
];

/** Scales per-gear opacity for overall visibility */
const OPACITY_SCALE = 2.4;

function gearPath(
  cx: number,
  cy: number,
  teeth: number,
  outerR: number,
  innerR: number,
): string {
  const points: string[] = [];
  const step = Math.PI / teeth;

  for (let i = 0; i < teeth * 2; i++) {
    const angle = i * step - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return `${points.join(" ")} Z`;
}

function Gear({
  size,
  teeth,
  duration,
  reverse,
  opacity,
}: Pick<GearConfig, "size" | "teeth" | "duration" | "reverse" | "opacity">) {
  const path = gearPath(50, 50, teeth, 42, 32);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="gear-spin"
      style={{
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
        opacity: Math.min(opacity * OPACITY_SCALE, 0.52),
        filter: "drop-shadow(0 2px 6px rgb(15 23 42 / 0.12))",
      }}
      aria-hidden="true"
    >
      <path
        d={path}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        className="text-slate-700"
      />
      <circle
        cx="50"
        cy="50"
        r={14}
        className="fill-slate-100 stroke-slate-400"
        strokeWidth={1}
      />
    </svg>
  );
}

export default function GearsBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200" />

      {gears.map((g, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: g.x, top: g.y }}
        >
          <Gear
            size={g.size}
            teeth={g.teeth}
            duration={g.duration}
            reverse={g.reverse}
            opacity={g.opacity}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(241,245,249,0.18)_85%)]" />
    </div>
  );
}
