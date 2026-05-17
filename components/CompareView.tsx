"use client";

import { useCompare } from "@/context/CompareContext";
import AddToCompareButton from "@/components/AddToCompareButton";
import {
  buildCompareTable,
  compareEntryKey,
  type CompareEntry,
} from "@/lib/compare";
import { carsCatalog, type CarModel } from "@/lib/cars";
import { onCarImageError } from "@/lib/image-fallback";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";

export default function CompareView() {
  const { entries, add, remove, replace, clear, count } = useCompare();
  const [pickSlug, setPickSlug] = useState(carsCatalog[0]?.slug ?? "");

  const table = useMemo(() => buildCompareTable(entries), [entries]);

  const featureRowsWithHeaders = useMemo(() => {
    let last = "";
    return table.featureRows.map((row) => {
      const showHeader = row.sectionTitle !== last;
      if (showHeader) last = row.sectionTitle;
      return { row, showHeader };
    });
  }, [table.featureRows]);

  function updateVariant(columnIndex: number, variantId: string) {
    const entry = entries[columnIndex];
    if (!entry) return;
    replace(compareEntryKey(entry), {
      carSlug: entry.carSlug,
      variantId,
    });
  }

  const pickCar = carsCatalog.find((c) => c.slug === pickSlug);
  const pickVariantId = pickCar?.variants[0]?.id ?? "";

  if (count === 0) {
    return (
      <ComparePicker
        pickSlug={pickSlug}
        setPickSlug={setPickSlug}
        pickCar={pickCar}
        pickVariantId={pickVariantId}
        onAdd={(entry) => add(entry)}
      />
    );
  }

  if (count === 1 && table.columns[0]) {
    return (
      <div className="space-y-8">
        <SingleColumnHeader column={table.columns[0]} onRemove={remove} />
        <ComparePicker
          pickSlug={pickSlug}
          setPickSlug={setPickSlug}
          pickCar={pickCar}
          pickVariantId={pickVariantId}
          onAdd={(entry) => add(entry)}
          title="Add another car to compare"
        />
      </div>
    );
  }

  if (count < 2) {
    return (
      <ComparePicker
        pickSlug={pickSlug}
        setPickSlug={setPickSlug}
        pickCar={pickCar}
        pickVariantId={pickVariantId}
        onAdd={(entry) => add(entry)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-slate-600">
          Side-by-side comparison of {table.columns.length} variants (ex-showroom
          prices & official trim features).
        </p>
        <button
          type="button"
          onClick={clear}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Clear all
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="sticky left-0 z-10 w-48 min-w-[12rem] bg-slate-50 px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Details
              </th>
              {table.columns.map((col, i) => (
                <th
                  key={col.key}
                  className="min-w-[200px] border-l border-slate-200 px-4 py-4 text-left align-top"
                >
                  <CompareColumnHeader
                    column={col}
                    car={carsCatalog.find((c) => c.slug === col.carSlug)}
                    onVariantChange={(variantId) => updateVariant(i, variantId)}
                    onRemove={() => remove(col.key)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 bg-slate-900/5">
              <td
                colSpan={table.columns.length + 1}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Specifications
              </td>
            </tr>
            {table.specRows.map((row) => (
              <tr key={row.label} className="border-b border-slate-100">
                <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-slate-600">
                  {row.label}
                </td>
                {row.values.map((value, i) => (
                  <td
                    key={`${row.label}-${i}`}
                    className="border-l border-slate-100 px-4 py-3 text-slate-900"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}

            {featureRowsWithHeaders.map(({ row, showHeader }) => (
              <Fragment key={`${row.sectionId}-${row.feature}`}>
                {showHeader && (
                  <tr className="border-b border-slate-100 bg-slate-900/5">
                    <td
                      colSpan={table.columns.length + 1}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      {row.sectionTitle}
                    </td>
                  </tr>
                )}
                <tr className="border-b border-slate-50">
                  <td className="sticky left-0 z-10 bg-white px-4 py-2.5 pl-6 text-slate-600">
                    {row.feature}
                  </td>
                  {row.present.map((has, i) => (
                    <td
                      key={i}
                      className="border-l border-slate-100 px-4 py-2.5 text-center"
                    >
                      {has ? (
                        <span className="text-emerald-600" aria-label="Yes">
                          ✓
                        </span>
                      ) : (
                        <span className="text-slate-300" aria-label="No">
                          —
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <ComparePicker
        pickSlug={pickSlug}
        setPickSlug={setPickSlug}
        pickCar={pickCar}
        pickVariantId={pickVariantId}
        onAdd={(entry) => add(entry)}
        title={
          count < 3 ? "Add a third car (optional)" : undefined
        }
        hidden={count >= 3}
      />
    </div>
  );
}

function CompareColumnHeader({
  column,
  car,
  onVariantChange,
  onRemove,
}: {
  column: ReturnType<typeof buildCompareTable>["columns"][0];
  car: CarModel | undefined;
  onVariantChange: (variantId: string) => void;
  onRemove: () => void;
}) {
  if (!car) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-slate-500">{column.brand}</p>
          <p className="font-bold text-slate-900">{column.carName}</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="rounded p-1 text-slate-400 hover:bg-slate-200"
          aria-label="Remove from compare"
        >
          ×
        </button>
      </div>
      <img
        src={column.image}
        alt={column.carName}
        className="h-24 w-full rounded-lg object-cover"
        onError={onCarImageError}
      />
      <select
        value={column.variantId}
        onChange={(e) => onVariantChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900"
        aria-label={`Variant for ${column.carName}`}
      >
        {car.variants.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>
      <p className="text-lg font-bold text-slate-900">{column.price}</p>
      <p className="text-[10px] text-slate-500">ex-showroom</p>
    </div>
  );
}

function SingleColumnHeader({
  column,
  onRemove,
}: {
  column: ReturnType<typeof buildCompareTable>["columns"][0];
  onRemove: (key: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
      <p className="text-sm font-medium text-emerald-800">
        1 car selected — add one more to compare
      </p>
      <div className="mt-4 flex items-center gap-4">
        <img
          src={column.image}
          alt={column.carName}
          className="h-20 w-28 rounded-lg object-cover"
          onError={onCarImageError}
        />
        <div>
          <p className="font-bold text-slate-900">{column.carName}</p>
          <p className="text-sm text-slate-600">{column.variantName}</p>
          <p className="mt-1 font-semibold">{column.price}</p>
        </div>
        <button
          type="button"
          onClick={() => onRemove(column.key)}
          className="ml-auto text-sm text-slate-500 hover:text-slate-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function ComparePicker({
  pickSlug,
  setPickSlug,
  pickCar,
  pickVariantId,
  onAdd,
  title = "Add cars to compare",
  hidden = false,
}: {
  pickSlug: string;
  setPickSlug: (s: string) => void;
  pickCar: CarModel | undefined;
  pickVariantId: string;
  onAdd: (entry: CompareEntry) => boolean;
  title?: string;
  hidden?: boolean;
}) {
  const [variantId, setVariantId] = useState(pickVariantId);

  useEffect(() => {
    setVariantId(pickVariantId);
  }, [pickVariantId, pickSlug]);

  if (hidden) return null;

  const effectiveVariantId = variantId || pickVariantId;
  const entry: CompareEntry = {
    carSlug: pickSlug,
    variantId: effectiveVariantId,
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">
        Choose a model and variant (up to 3 cars).
      </p>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex-1 text-sm">
          <span className="font-medium text-slate-700">Model</span>
          <select
            value={pickSlug}
            onChange={(e) => {
              setPickSlug(e.target.value);
              const car = carsCatalog.find((c) => c.slug === e.target.value);
              setVariantId(car?.variants[0]?.id ?? "");
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900"
          >
            {carsCatalog.map((car) => (
              <option key={car.slug} value={car.slug}>
                {car.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex-[2] text-sm">
          <span className="font-medium text-slate-700">Variant</span>
          <select
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900"
          >
            {pickCar?.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — {v.price}
              </option>
            ))}
          </select>
        </label>
        <AddToCompareButton
          entry={entry}
          disabled={!effectiveVariantId}
        />
      </div>
      <p className="mt-4 text-sm text-slate-500">
        Or use{" "}
        <Link href="/#cars" className="font-medium text-slate-900 underline">
          Browse Cars
        </Link>{" "}
        and tap &quot;Add to compare&quot; on any card.
      </p>
    </div>
  );
}
