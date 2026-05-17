"use client";

import { useCompare } from "@/context/CompareContext";
import { resolveCompareColumn } from "@/lib/compare";
import { onCarImageError } from "@/lib/image-fallback";
import Link from "next/link";

export default function CompareBar() {
  const { entries, remove, count, clear } = useCompare();

  if (count === 0) return null;

  const columns = entries
    .map((e) => resolveCompareColumn(e))
    .filter((c): c is NonNullable<typeof c> => c !== null);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md"
      role="region"
      aria-label="Compare selection"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto">
          <p className="shrink-0 text-sm font-semibold text-slate-900">
            Compare ({count}/3)
          </p>
          <ul className="flex gap-2">
            {columns.map((col) => (
              <li
                key={col.key}
                className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-1 pl-1 pr-2"
              >
                <img
                  src={col.image}
                  alt=""
                  className="h-9 w-12 rounded object-cover"
                  onError={onCarImageError}
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-900">
                    {col.carName}
                  </p>
                  <p className="max-w-[140px] truncate text-[10px] text-slate-500">
                    {col.variantName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(col.key)}
                  className="ml-1 rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  aria-label={`Remove ${col.carName} from compare`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={clear}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Clear
          </button>
          <Link
            href="/compare"
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
              count >= 2
                ? "bg-slate-900 hover:bg-slate-700"
                : "bg-slate-400 pointer-events-none"
            }`}
            aria-disabled={count < 2}
            tabIndex={count < 2 ? -1 : 0}
          >
            Compare now
          </Link>
        </div>
      </div>
      {count < 2 && (
        <p className="mx-auto max-w-7xl px-4 pb-2 text-center text-xs text-slate-500 sm:text-left sm:px-6 lg:px-8">
          Add at least 2 cars to start comparing
        </p>
      )}
    </div>
  );
}
