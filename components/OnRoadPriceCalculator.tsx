"use client";

import {
  DEFAULT_ON_ROAD_CITY,
  ON_ROAD_CITIES,
  calculateOnRoadFromPriceString,
  getOnRoadCityGroups,
} from "@/lib/on-road-price";
import { formatInr, formatInrCompact } from "@/lib/emi";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "autoverse-on-road-city";

type Props = {
  exShowroomLabel: string;
  fuelType: string;
  variantLabel: string;
};

export default function OnRoadPriceCalculator({
  exShowroomLabel,
  fuelType,
  variantLabel,
}: Props) {
  const [cityCode, setCityCode] = useState(DEFAULT_ON_ROAD_CITY);
  const cityGroups = useMemo(() => getOnRoadCityGroups(), []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ON_ROAD_CITIES.some((c) => c.code === saved)) {
        setCityCode(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, cityCode);
    } catch {
      /* ignore */
    }
  }, [cityCode]);

  const result = useMemo(
    () => calculateOnRoadFromPriceString(exShowroomLabel, fuelType, cityCode),
    [exShowroomLabel, fuelType, cityCode],
  );

  if (!result) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        On-road estimate unavailable for this variant price.
      </div>
    );
  }

  const extras = result.onRoadTotal - result.exShowroom;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">On-road price</h2>
          <p className="mt-1 text-xs text-slate-500">
            For {variantLabel} · {result.cityName}, {result.stateName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">
            {formatInr(result.onRoadTotal)}
          </p>
          <p className="text-xs text-emerald-700">
            +{formatInrCompact(extras)} over ex-showroom
          </p>
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="on-road-city"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Registering in (city)
        </label>
        <select
          id="on-road-city"
          value={cityCode}
          onChange={(e) => setCityCode(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          {cityGroups.map((group) => (
            <optgroup key={group.state} label={group.state}>
              {group.cities.map((city) => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <ul className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm">
        {result.lines.map((line) => (
          <li
            key={line.id}
            className={`flex items-start justify-between gap-3 ${
              line.id === "ex-showroom" ? "font-medium" : ""
            }`}
          >
            <span className="text-slate-600">
              {line.label}
              {line.note ? (
                <span className="mt-0.5 block text-xs font-normal text-slate-400">
                  {line.note}
                </span>
              ) : null}
            </span>
            <span
              className={`shrink-0 tabular-nums ${
                line.id === "ex-showroom"
                  ? "text-slate-900"
                  : "text-slate-800"
              }`}
            >
              {formatInr(line.amount)}
            </span>
          </li>
        ))}
        <li className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
          <span>Estimated on-road</span>
          <span className="tabular-nums">{formatInr(result.onRoadTotal)}</span>
        </li>
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Estimates use typical RTO, insurance, and dealer charges for{" "}
        {result.cityName} ({result.stateName}). Actual on-road price varies by
        dealer, discounts, and add-ons. Confirm with the dealership before
        booking.
      </p>
    </div>
  );
}
