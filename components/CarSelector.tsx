"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SearchableSelect from "@/components/SearchableSelect";
import {
  getBrands,
  getModelsByBrand,
  getCarModel,
} from "@/lib/catalog-nav";
import { buildVariantSelectOptions } from "@/lib/variant-label";
import { onCarImageError } from "@/lib/image-fallback";

type Props = {
  /** When set, brand is fixed and the brand dropdown is hidden */
  lockBrand?: string;
  showVariant?: boolean;
  showPreview?: boolean;
  showViewButton?: boolean;
  idPrefix?: string;
  size?: "default" | "large";
};

export default function CarSelector({
  lockBrand,
  showVariant = true,
  showPreview = true,
  showViewButton = true,
  idPrefix = "car",
  size = "default",
}: Props) {
  const large = size === "large";
  const selectClass = large
    ? "w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
    : "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200";
  const labelClass = large
    ? "mb-2 block text-base font-medium text-slate-700"
    : "mb-1.5 block text-sm font-medium text-slate-700";
  const brands = useMemo(() => getBrands(), []);
  const [brand, setBrand] = useState(lockBrand ?? "");
  const [modelSlug, setModelSlug] = useState("");
  const [variantId, setVariantId] = useState("");

  useEffect(() => {
    if (lockBrand) setBrand(lockBrand);
  }, [lockBrand]);

  const models = useMemo(
    () => (brand ? getModelsByBrand(brand) : []),
    [brand]
  );

  const car = modelSlug ? getCarModel(modelSlug) : undefined;
  const variants = car?.variants ?? [];

  useEffect(() => {
    if (!lockBrand && brand && !models.some((m) => m.slug === modelSlug)) {
      setModelSlug("");
      setVariantId("");
    }
  }, [brand, models, modelSlug, lockBrand]);

  useEffect(() => {
    if (modelSlug && variants.length) {
      if (!variants.some((v) => v.id === variantId)) {
        setVariantId(variants[0].id);
      }
    } else {
      setVariantId("");
    }
  }, [modelSlug, variants, variantId]);

  const variant = variants.find((v) => v.id === variantId) ?? variants[0];

  const detailHref =
    modelSlug && variant
      ? `/cars/${modelSlug}?variant=${encodeURIComponent(variant.id)}`
      : modelSlug
        ? `/cars/${modelSlug}`
        : null;

  return (
    <div className={large ? "space-y-6" : "space-y-4"}>
      <div
        className={`grid ${large ? "gap-6" : "gap-4"} ${lockBrand ? (showVariant ? "sm:grid-cols-2" : "grid-cols-1") : showVariant ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        {!lockBrand && (
          <div>
            <label htmlFor={`${idPrefix}-brand`} className={labelClass}>
              Brand
            </label>
            <select
              id={`${idPrefix}-brand`}
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setModelSlug("");
                setVariantId("");
              }}
              className={selectClass}
            >
              <option value="">Select brand</option>
              {brands.map((b) => (
                <option key={b.brand} value={b.brand}>
                  {b.brand} ({b.count} models)
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor={`${idPrefix}-model`} className={labelClass}>
            Model
          </label>
          <select
            id={`${idPrefix}-model`}
            value={modelSlug}
            disabled={!brand}
            onChange={(e) => {
              setModelSlug(e.target.value);
              setVariantId("");
            }}
            className={selectClass}
          >
            <option value="">
              {brand ? "Select model" : "Select brand first"}
            </option>
            {models.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name} — {m.priceRange}
              </option>
            ))}
          </select>
        </div>

        {showVariant && (
          <SearchableSelect
            id={`${idPrefix}-variant`}
            label="Variant"
            labelClassName={labelClass}
            value={variantId}
            onChange={setVariantId}
            disabled={!modelSlug || !car || variants.length === 0}
            options={car ? buildVariantSelectOptions(car) : []}
            emptyOption={{
              id: "",
              label: modelSlug ? "Select variant" : "Select model first",
            }}
            searchPlaceholder="Search…"
            className={large ? "mt-0" : ""}
            triggerClassName={selectClass.replace(/^w-full\s+/, "")}
            size={large ? "large" : "default"}
          />
        )}
      </div>

      {showPreview && car && (
        <div
          className={`overflow-hidden border border-slate-200 bg-slate-50 ${large ? "rounded-2xl" : "rounded-xl"}`}
        >
          <div className="grid gap-0 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <img
                src={car.image}
                alt={car.name}
                className={
                  large
                    ? "h-56 w-full object-cover sm:h-full sm:min-h-[280px]"
                    : "h-48 w-full object-cover sm:h-full sm:min-h-[200px]"
                }
                onError={onCarImageError}
              />
            </div>
            <div
              className={`sm:col-span-3 ${large ? "space-y-3 p-7" : "space-y-2 p-5"}`}
            >
              <p
                className={
                  large
                    ? "text-sm font-semibold uppercase tracking-wide text-slate-500"
                    : "text-xs font-semibold uppercase tracking-wide text-slate-500"
                }
              >
                {car.brand} · {car.modelYear}
              </p>
              <h3
                className={
                  large
                    ? "text-2xl font-bold text-slate-900 sm:text-3xl"
                    : "text-xl font-bold text-slate-900"
                }
              >
                {car.name}
              </h3>
              <p className={large ? "text-base text-slate-600" : "text-sm text-slate-600"}>
                {car.tagline}
              </p>
              {variant && (
                <dl
                  className={`mt-3 grid grid-cols-2 gap-x-4 gap-y-2 ${large ? "text-base" : "text-sm"}`}
                >
                  <dt className="text-slate-500">Ex-showroom</dt>
                  <dd className="font-medium text-slate-900">{variant.price}</dd>
                  <dt className="text-slate-500">Fuel</dt>
                  <dd className="text-slate-900">{variant.fuelType}</dd>
                  <dt className="text-slate-500">Mileage</dt>
                  <dd className="text-slate-900">{variant.mileage}</dd>
                  <dt className="text-slate-500">Power</dt>
                  <dd className="text-slate-900">{variant.power}</dd>
                </dl>
              )}
              {!variant && showVariant && (
                <p className={large ? "text-base text-slate-500" : "text-sm text-slate-500"}>
                  Price range: {car.priceRange} (ex-showroom)
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {showViewButton && detailHref && (
        <Link
          href={detailHref}
          className={
            large
              ? "inline-flex rounded-xl bg-slate-900 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-slate-700"
              : "inline-flex rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          }
        >
          View full specs & features
        </Link>
      )}
    </div>
  );
}
