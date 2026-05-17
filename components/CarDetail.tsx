"use client";

import Link from "next/link";
import { useState } from "react";
import type { CarModel } from "@/lib/cars";

type Props = {
  car: CarModel;
};

export default function CarDetail({ car }: Props) {
  const [selectedId, setSelectedId] = useState(car.variants[0].id);
  const variant =
    car.variants.find((v) => v.id === selectedId) ?? car.variants[0];

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/#cars"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          ← Back to all cars
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl bg-white shadow">
              <img
                src={car.image}
                alt={car.name}
                className="h-64 w-full object-cover sm:h-80"
              />
              <div className="p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {car.brand} · Model Year {car.modelYear}
                </p>
                <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
                  {car.name}
                </h1>
                <p className="mt-2 text-lg text-slate-600">{car.tagline}</p>
                <p className="mt-4 text-2xl font-bold text-slate-900">
                  {car.priceRange}{" "}
                  <span className="text-sm font-normal text-slate-500">
                    ex-showroom
                  </span>
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  {car.summary}
                </p>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Engine options
                  </h2>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-slate-600">
                    {car.engines.map((engine) => (
                      <li key={engine}>{engine}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Dimensions
                  </h2>
                  <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {car.dimensions.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg bg-slate-50 px-3 py-2"
                      >
                        <dt className="text-xs text-slate-500">{item.label}</dt>
                        <dd className="font-medium text-slate-900">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Safety
                  </h2>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-slate-600">
                    {car.safety.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow">
                <label
                  htmlFor="variant-select"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Select variant
                </label>
                <select
                  id="variant-select"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  {car.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} — {v.price}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-500">
                  {car.variants.length} variants · 2026 model year
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6 text-white shadow">
                <p className="text-sm text-slate-400">{variant.trim}</p>
                <h2 className="mt-1 text-xl font-bold">{variant.name}</h2>
                <p className="mt-2 text-2xl font-bold text-white">
                  {variant.price}
                </p>
                <p className="text-sm text-slate-400">ex-showroom</p>

                <dl className="mt-5 space-y-3 border-t border-slate-700 pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Engine</dt>
                    <dd className="text-right font-medium">{variant.engine}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Transmission</dt>
                    <dd className="text-right font-medium">
                      {variant.transmission}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Fuel</dt>
                    <dd className="text-right font-medium">{variant.fuelType}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Power</dt>
                    <dd className="text-right font-medium">{variant.power}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Torque</dt>
                    <dd className="text-right font-medium">{variant.torque}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Mileage</dt>
                    <dd className="text-right font-medium">{variant.mileage}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">Specifications</h3>
                <dl className="mt-4 space-y-3">
                  {variant.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-4 border-b border-slate-100 pb-3 text-sm last:border-0 last:pb-0"
                    >
                      <dt className="text-slate-500">{spec.label}</dt>
                      <dd className="text-right font-medium text-slate-900">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">Key features</h3>
                <ul className="mt-4 space-y-2">
                  {variant.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-sm text-slate-600"
                    >
                      <span className="text-emerald-600" aria-hidden="true">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Prices and specs are indicative for the 2026 model year (India,
          ex-showroom). Confirm with your nearest dealership before booking.
        </p>
      </div>
    </main>
  );
}
