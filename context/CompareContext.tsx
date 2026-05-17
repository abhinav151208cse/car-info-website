"use client";

import {
  COMPARE_STORAGE_KEY,
  MAX_COMPARE,
  type CompareEntry,
  compareEntryKey,
} from "@/lib/compare";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CompareContextValue = {
  entries: CompareEntry[];
  add: (entry: CompareEntry) => boolean;
  remove: (key: string) => void;
  replace: (key: string, entry: CompareEntry) => void;
  toggle: (entry: CompareEntry) => void;
  clear: () => void;
  isInCompare: (entry: CompareEntry) => boolean;
  isFull: boolean;
  count: number;
};

const CompareContext = createContext<CompareContextValue | null>(null);

function loadStored(): CompareEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CompareEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_COMPARE);
  } catch {
    return [];
  }
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<CompareEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setEntries(loadStored());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(entries));
  }, [entries, hydrated]);

  const isInCompare = useCallback(
    (entry: CompareEntry) =>
      entries.some((e) => compareEntryKey(e) === compareEntryKey(entry)),
    [entries]
  );

  const add = useCallback((entry: CompareEntry) => {
    let added = false;
    setEntries((prev) => {
      const key = compareEntryKey(entry);
      if (prev.some((e) => compareEntryKey(e) === key)) {
        added = true;
        return prev;
      }
      if (prev.length >= MAX_COMPARE) return prev;
      added = true;
      return [...prev, entry];
    });
    return added;
  }, []);

  const remove = useCallback((key: string) => {
    setEntries((prev) => prev.filter((e) => compareEntryKey(e) !== key));
  }, []);

  const replace = useCallback((key: string, entry: CompareEntry) => {
    setEntries((prev) =>
      prev.map((e) => (compareEntryKey(e) === key ? entry : e))
    );
  }, []);

  const toggle = useCallback(
    (entry: CompareEntry) => {
      const key = compareEntryKey(entry);
      if (entries.some((e) => compareEntryKey(e) === key)) {
        remove(key);
        return;
      }
      add(entry);
    },
    [entries, add, remove]
  );

  const clear = useCallback(() => setEntries([]), []);

  const value = useMemo(
    () => ({
      entries,
      add,
      remove,
      replace,
      toggle,
      clear,
      isInCompare,
      isFull: entries.length >= MAX_COMPARE,
      count: entries.length,
    }),
    [entries, add, remove, replace, toggle, clear, isInCompare]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error("useCompare must be used within CompareProvider");
  }
  return ctx;
}
