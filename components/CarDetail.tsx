"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CarModel } from "@/lib/cars";
import AddToCompareButton from "@/components/AddToCompareButton";
import {
  buildVariantDetailSections,
  countDetailItems,
} from "@/lib/variant-details";
import { onCarImageError } from "@/lib/image-fallback";
import SearchableSelect from "@/components/SearchableSelect";
import {
  buildVariantSelectOptions,
  formatVariantDisplayName,
} from "@/lib/variant-label";

type Props = {
  car: CarModel;
};

export default function CarDetail({ car }: Props) {
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState(car.variants[0].id);

  useEffect(() => {
    const fromUrl = searchParams.get("variant");
    if (fromUrl && car.variants.some((v) => v.id === fromUrl)) {
      setSelectedId(fromUrl);
    }
  }, [searchParams, car]);

  const variant =
    car.variants.find((v) => v.id === selectedId) ?? car.variants[0];

  const variantOptions = useMemo(() => buildVariantSelectOptions(car), [car]);

  const detailSections = useMemo(
    () => buildVariantDetailSections(variant, car),
    [variant, car]
  );

  const totalItems = useMemo(
    () => countDetailItems(detailSections),
    [detailSections]
  );

  return (
    <main className="min-h-screen bg-gray-100 pb-28">
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
                onError={onCarImageError}
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

                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Selected variant snapshot
                  </h2>
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                    {[
                      { label: "Engine", value: variant.engine },
                      { label: "Transmission", value: variant.transmission },
                      { label: "Fuel", value: variant.fuelType },
                      { label: "Power", value: variant.power },
                      { label: "Torque", value: variant.torque },
                      { label: "ARAI mileage", value: variant.mileage },
                      ...(variant.kerbWeight && variant.kerbWeight !== "—"
                        ? [{ label: "Kerb weight", value: variant.kerbWeight }]
                        : []),
                      ...(variant.realWorldMileage &&
                      variant.realWorldMileage !== "—"
                        ? [
                            {
                              label: "Real-world",
                              value: variant.realWorldMileage,
                            },
                          ]
                        : []),
                    ].map((item) => (
                      <div key={item.label}>
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
                    Dimensions & capacity
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
                    Safety highlights
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
                <SearchableSelect
                  id="variant-select"
                  label="Select variant"
                  labelClassName="block text-sm font-semibold text-slate-900"
                  className="mt-2"
                  value={selectedId}
                  onChange={setSelectedId}
                  options={variantOptions}
                  searchPlaceholder="Search…"
                  triggerClassName="focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  hint={`${car.variants.length} variants · ex-showroom (India) · features aligned to official trim sheets`}
                />
                <div className="mt-4">
                  <AddToCompareButton
                    entry={{
                      carSlug: car.slug,
                      variantId: variant.id,
                    }}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex max-h-[min(640px,75vh)] flex-col rounded-2xl bg-slate-900 p-6 text-white shadow">
                <p className="shrink-0 text-sm text-slate-400">{variant.trim}</p>
                <h2 className="mt-1 shrink-0 text-xl font-bold">
                  {formatVariantDisplayName(car, variant)}
                </h2>
                <p className="mt-2 shrink-0 text-2xl font-bold text-white">
                  {variant.price}
                </p>
                <p className="shrink-0 text-sm text-slate-400">ex-showroom</p>

                <div className="mt-4 flex shrink-0 items-center justify-between gap-2 border-t border-slate-700 pt-4">
                  <h3 className="text-sm font-semibold text-slate-300">
                    Variant details
                  </h3>
                  <span className="text-xs text-slate-500">
                    {totalItems} items
                  </span>
                </div>

                <div
                  key={variant.id}
                  className="mt-3 min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain pr-2 [scrollbar-color:rgb(100_116_139)_rgb(30_41_59)] [scrollbar-width:thin]"
                  aria-label={`Full specifications and features for ${variant.name}`}
                >
                  {detailSections.map((section) => (
                    <section key={`${variant.id}-${section.id}`}>
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {section.title}
                      </h4>

                      {section.type === "specs" && section.specs ? (
                        <dl className="space-y-2.5 text-sm">
                          {section.specs.map((spec) => (
                            <div
                              key={spec.label}
                              className="flex justify-between gap-4 border-b border-slate-800 pb-2.5 last:border-0"
                            >
                              <dt className="shrink-0 text-slate-400">
                                {spec.label}
                              </dt>
                              <dd className="text-right font-medium text-white">
                                {spec.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <ul className="space-y-2 text-sm">
                          {section.items?.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-slate-200"
                            >
                              <span
                                className="mt-0.5 shrink-0 text-emerald-400"
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Prices from v3cars.com (ex-showroom, May 2026). Features compiled from
          official {car.brand} India trim sheets — confirm with your dealership
          before booking.
        </p>
      </div>
    </main>
  );
}
