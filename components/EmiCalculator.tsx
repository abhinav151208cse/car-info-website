"use client";

import SearchableSelect from "@/components/SearchableSelect";
import {
  getBrands,
  getCarModel,
  getModelsByBrand,
  getVariantsForModel,
} from "@/lib/catalog-nav";
import {
  buildAmortizationSchedule,
  calculateEmi,
  formatInr,
  formatInrCompact,
  loanFromPrice,
  parseLakhPrice,
} from "@/lib/emi";
import { buildVariantSelectOptions } from "@/lib/variant-label";
import { Fragment, useEffect, useMemo, useState } from "react";

const DEFAULT_CAR_PRICE = 1_500_000;
const DEFAULT_DOWN_PERCENT = 20;
const DEFAULT_RATE = 9.5;
const DEFAULT_TENURE_YEARS = 5;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function parseAmount(value: string): number {
  const n = Number.parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function EmiCalculator() {
  const brands = useMemo(() => getBrands(), []);

  const [useCatalog, setUseCatalog] = useState(false);
  const [brand, setBrand] = useState("");
  const [modelSlug, setModelSlug] = useState("");
  const [variantId, setVariantId] = useState("");

  const [carPrice, setCarPrice] = useState(DEFAULT_CAR_PRICE);
  const [carPriceText, setCarPriceText] = useState(String(DEFAULT_CAR_PRICE));
  const [downPercent, setDownPercent] = useState(DEFAULT_DOWN_PERCENT);
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [tenureYears, setTenureYears] = useState(DEFAULT_TENURE_YEARS);

  const models = useMemo(
    () => (brand ? getModelsByBrand(brand) : []),
    [brand],
  );
  const car = modelSlug ? getCarModel(modelSlug) : undefined;
  const variants = modelSlug ? getVariantsForModel(modelSlug) : [];
  const variantOptions = useMemo(
    () => (car ? buildVariantSelectOptions(car) : []),
    [car],
  );
  const variant = variants.find((v) => v.id === variantId) ?? variants[0];

  useEffect(() => {
    if (variants.length && !variants.some((v) => v.id === variantId)) {
      setVariantId(variants[0].id);
    } else if (!modelSlug) {
      setVariantId("");
    }
  }, [modelSlug, variants, variantId]);

  useEffect(() => {
    if (!useCatalog || !variant?.price) return;
    const parsed = parseLakhPrice(variant.price);
    if (parsed) {
      setCarPrice(parsed);
      setCarPriceText(String(parsed));
    }
  }, [useCatalog, variant?.price, variant?.id]);

  const downPayment = Math.round((carPrice * downPercent) / 100);
  const principal = loanFromPrice(carPrice, downPayment);
  const tenureMonths = tenureYears * 12;

  const emiResult = calculateEmi({
    principal,
    annualRatePercent: rate,
    tenureMonths,
  });

  const schedule = emiResult
    ? buildAmortizationSchedule({
        principal,
        annualRatePercent: rate,
        tenureMonths,
      })
    : null;

  function syncCarPriceFromText(text: string) {
    setCarPriceText(text);
    const value = parseAmount(text);
    if (value >= 0) setCarPrice(value);
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Loan details</h2>
          <p className="mt-1 text-sm text-slate-600">
            Estimate monthly EMI using standard reducing-balance method (India).
          </p>

          <label className="mt-6 flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={useCatalog}
              onChange={(e) => setUseCatalog(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
            />
            <span className="text-sm font-medium text-slate-700">
              Fill price from catalog variant
            </span>
          </label>

          {useCatalog && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="emi-brand"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Brand
                </label>
                <select
                  id="emi-brand"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setModelSlug("");
                    setVariantId("");
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  <option value="">Select brand</option>
                  {brands.map((b) => (
                    <option key={b.brand} value={b.brand}>
                      {b.brand}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="emi-model"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Model
                </label>
                <select
                  id="emi-model"
                  value={modelSlug}
                  disabled={!brand}
                  onChange={(e) => {
                    setModelSlug(e.target.value);
                    setVariantId("");
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:bg-slate-50"
                >
                  <option value="">Select model</option>
                  {models.map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <SearchableSelect
                  id="emi-variant"
                  label="Variant"
                  value={variantId}
                  onChange={setVariantId}
                  disabled={!modelSlug || variantOptions.length === 0}
                  placeholder="Select variant"
                  options={variantOptions}
                />
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="emi-car-price"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Car price (ex-showroom, ₹)
              </label>
              <input
                id="emi-car-price"
                type="text"
                inputMode="numeric"
                value={carPriceText}
                onChange={(e) => syncCarPriceFromText(e.target.value)}
                onBlur={() => setCarPriceText(String(carPrice))}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              <p className="mt-1 text-xs text-slate-500">
                {formatInrCompact(carPrice)} · adjust for on-road if needed
              </p>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="emi-down"
                  className="text-sm font-medium text-slate-700"
                >
                  Down payment ({downPercent}%)
                </label>
                <span className="text-sm font-semibold text-slate-900">
                  {formatInr(downPayment)}
                </span>
              </div>
              <input
                id="emi-down"
                type="range"
                min={0}
                max={80}
                step={5}
                value={downPercent}
                onChange={(e) => setDownPercent(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer accent-slate-900"
              />
            </div>

            <div>
              <label
                htmlFor="emi-rate"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Interest rate (% p.a.)
              </label>
              <input
                id="emi-rate"
                type="number"
                min={0}
                max={30}
                step={0.1}
                value={rate}
                onChange={(e) =>
                  setRate(clamp(Number(e.target.value), 0, 30))
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="emi-tenure"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Loan tenure (years)
              </label>
              <input
                id="emi-tenure"
                type="number"
                min={1}
                max={7}
                step={1}
                value={tenureYears}
                onChange={(e) =>
                  setTenureYears(clamp(Math.round(Number(e.target.value)), 1, 7))
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <p className="mt-5 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Loan amount:{" "}
            <span className="font-semibold text-slate-900">
              {formatInr(principal)}
            </span>{" "}
            over {tenureMonths} months
          </p>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-2xl border border-slate-900 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-sm font-medium text-slate-300">Estimated monthly EMI</p>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {emiResult ? formatInr(emiResult.emi) : "—"}
          </p>
          {emiResult && (
            <p className="mt-2 text-sm text-slate-400">
              per month for {tenureYears} years at {rate}% p.a.
            </p>
          )}
        </div>

        {emiResult && (
          <ul className="grid gap-3 sm:grid-cols-1">
            {[
              { label: "Principal", value: emiResult.principal },
              { label: "Total interest", value: emiResult.totalInterest },
              { label: "Total payment", value: emiResult.totalPayment },
            ].map((row) => (
              <li
                key={row.label}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {row.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {formatInr(row.value)}
                </p>
              </li>
            ))}
          </ul>
        )}

        {schedule && schedule.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-sm font-semibold text-slate-900">
              Payment schedule (sample)
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              First months and final months of your loan
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[320px] text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2 pr-2 font-medium">Month</th>
                    <th className="py-2 pr-2 font-medium">Principal</th>
                    <th className="py-2 pr-2 font-medium">Interest</th>
                    <th className="py-2 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, i) => {
                    const prev = schedule[i - 1];
                    const showGap = prev && row.month - prev.month > 1;
                    return (
                      <Fragment key={row.month}>
                        {showGap && (
                          <tr>
                            <td
                              colSpan={4}
                              className="py-2 text-center text-slate-400"
                            >
                              …
                            </td>
                          </tr>
                        )}
                        <tr
                          key={row.month}
                          className="border-b border-slate-100 text-slate-700"
                        >
                          <td className="py-2 pr-2 font-medium">{row.month}</td>
                          <td className="py-2 pr-2">
                            {formatInr(row.principalPart)}
                          </td>
                          <td className="py-2 pr-2">
                            {formatInr(row.interestPart)}
                          </td>
                          <td className="py-2">{formatInr(row.balance)}</td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="text-xs leading-relaxed text-slate-500">
          Indicative only. Actual EMI depends on bank, credit profile, insurance,
          and on-road costs. Not financial advice.
        </p>
      </div>
    </div>
  );
}
