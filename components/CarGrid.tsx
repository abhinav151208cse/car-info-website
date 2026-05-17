"use client";

import AddToCompareButton from "@/components/AddToCompareButton";
import { getAllCars, getCarBySlug } from "@/lib/cars";
import { onCarImageError } from "@/lib/image-fallback";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function CarGrid() {
  const cars = getAllCars();
  const [brand, setBrand] = useState<string>("All");

  const brands = useMemo(() => {
    const set = new Set<string>();
    for (const car of cars) {
      const b = getCarBySlug(car.slug)?.brand;
      if (b) set.add(b);
    }
    return ["All", ...Array.from(set).sort()];
  }, [cars]);

  const filtered =
    brand === "All"
      ? cars
      : cars.filter((c) => getCarBySlug(c.slug)?.brand === brand);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {brands.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBrand(b)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              brand === b
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <div
        id="cars"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((car) => {
          const full = getCarBySlug(car.slug);
          const defaultVariant = full?.variants[0];
          const compareEntry =
            full && defaultVariant
              ? { carSlug: full.slug, variantId: defaultVariant.id }
              : null;

          return (
            <article
              key={car.id}
              className="overflow-hidden rounded-xl bg-white text-black shadow"
            >
              <img
                src={car.image}
                alt={car.name}
                className="h-52 w-full object-cover"
                loading="lazy"
                onError={onCarImageError}
              />

              <div className="p-5">
                <Link
                  href={`/cars/${car.slug}`}
                  className="text-2xl font-semibold text-slate-900 transition-colors hover:text-slate-600"
                >
                  {car.name}
                </Link>

                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {full?.brand ?? "2026"} · Model Year 2026
                </p>

                <p className="mt-3">
                  Price: {car.price}{" "}
                  <span className="text-slate-500">(ex-showroom)</span>
                </p>
                <p>Mileage: {car.mileage}</p>
                <p>Fuel Type: {car.fuel}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/cars/${car.slug}`}
                    className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                  >
                    View specs & variants
                  </Link>
                  {compareEntry && (
                    <AddToCompareButton entry={compareEntry} compact />
                  )}
                </div>
                {defaultVariant && (
                  <p className="mt-2 text-[11px] text-slate-400">
                    Compare uses base variant — change on compare page
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
