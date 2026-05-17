"use client";

import type { SearchableSelectOption } from "@/lib/searchable-select";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export type { SearchableSelectOption };

const CHEVRON_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")";

type Props = {
  id?: string;
  label?: string;
  labelClassName?: string;
  value: string;
  onChange: (id: string) => void;
  options: SearchableSelectOption[];
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyOption?: { id: string; label: string };
  emptyMessage?: string;
  hint?: string;
  className?: string;
  triggerClassName?: string;
  size?: "default" | "compact" | "large";
  "aria-label"?: string;
};

export default function SearchableSelect({
  id: idProp,
  label,
  labelClassName,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyOption,
  emptyMessage = "No matches",
  hint,
  className = "",
  triggerClassName = "",
  size = "default",
  "aria-label": ariaLabel,
}: Props) {
  const autoId = useId();
  const listId = idProp ?? autoId;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(
    () => options.find((o) => o.id === value),
    [options, value]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => {
      const hay = `${o.label} ${o.keywords ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const sizePad = {
    default: { trigger: "py-2.5 pl-3 pr-9 text-sm", search: "px-3 py-2 text-sm", item: "px-3 py-1.5 text-sm" },
    compact: { trigger: "py-1.5 pl-2 pr-8 text-xs", search: "px-2 py-1.5 text-xs", item: "px-2 py-1 text-xs" },
    large: { trigger: "py-3.5 pl-4 pr-10 text-base", search: "px-4 py-2 text-base", item: "px-4 py-2 text-base" },
  }[size];

  function pick(id: string) {
    onChange(id);
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={`${listId}-trigger`}
          className={
            labelClassName ??
            "mb-1.5 block text-sm font-medium text-slate-700"
          }
        >
          {label}
        </label>
      )}

      <button
        id={`${listId}-trigger`}
        type="button"
        disabled={disabled}
        data-open={open ? "true" : "false"}
        aria-label={ariaLabel ?? label}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${listId}-listbox`}
        onClick={() => {
          if (disabled) return;
          setOpen((o) => !o);
        }}
        style={{
          backgroundImage: CHEVRON_SVG,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.6rem center",
          backgroundSize: "1.1rem",
        }}
        className={`select-trigger ${sizePad.trigger} ${triggerClassName}`}
      >
        <span className="block truncate pr-1">
          {selected?.label ?? emptyOption?.label ?? placeholder}
        </span>
      </button>

      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}

      {open && (
        <div className="select-menu" role="presentation">
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className={`select-search ${sizePad.search}`}
            aria-label={`${label ?? "Options"} search`}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                setQuery("");
              }
            }}
          />
          <ul id={`${listId}-listbox`} role="listbox" className="select-list">
            {emptyOption && !query && (
              <li role="option" aria-selected={value === emptyOption.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => pick(emptyOption.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") pick(emptyOption.id);
                  }}
                  className={`select-option-muted ${sizePad.item}`}
                >
                  {emptyOption.label}
                </div>
              </li>
            )}
            {filtered.length === 0 ? (
              <li className={`select-empty ${sizePad.item}`}>{emptyMessage}</li>
            ) : (
              filtered.map((o) => {
                const isSelected = value === o.id;
                return (
                  <li key={o.id} role="option" aria-selected={isSelected}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => pick(o.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") pick(o.id);
                      }}
                      className={`${isSelected ? "select-option-active" : "select-option"} ${sizePad.item}`}
                    >
                      {o.label}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
