"use client";

import { useCompare } from "@/context/CompareContext";
import type { CompareEntry } from "@/lib/compare";

type Props = {
  entry: CompareEntry;
  className?: string;
  compact?: boolean;
  disabled?: boolean;
};

export default function AddToCompareButton({
  entry,
  className = "",
  compact = false,
  disabled: disabledProp = false,
}: Props) {
  const { toggle, isInCompare, isFull } = useCompare();
  const selected = isInCompare(entry);
  const disabled = disabledProp || (!selected && isFull);

  return (
    <button
      type="button"
      onClick={() => !disabled && toggle(entry)}
      disabled={disabled}
      title={
        disabled
          ? "Compare list is full (max 3). Remove one to add another."
          : selected
            ? "Remove from compare"
            : "Add to compare"
      }
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border text-sm font-semibold transition-colors ${
        selected
          ? "border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
          : disabled
            ? "btn-inactive"
            : "border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900"
      } ${compact ? "px-3 py-1.5" : "px-4 py-2"} ${className}`}
      aria-pressed={selected}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      >
        {selected ? (
          <path strokeLinecap="round" d="M5 12h14" />
        ) : (
          <path strokeLinecap="round" d="M12 5v14M5 12h14" />
        )}
      </svg>
      {compact
        ? selected
          ? "Added"
          : "Compare"
        : selected
          ? "In compare"
          : "Add to compare"}
    </button>
  );
}
