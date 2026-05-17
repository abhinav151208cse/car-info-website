import type { CarVariant } from "@/lib/cars";
import type { CarFeatureConfig, FeatureCategory, TrimFeaturePack } from "./types";
import { hyundaiCretaFeatures } from "./hyundai-creta";
import { hyundaiVenueFeatures } from "./hyundai-venue";
import { kiaSeltosFeatures } from "./kia-seltos";
import { skodaKylaqFeatures } from "./skoda-kylaq";
import { tataNexonFeatures } from "./tata-nexon";
import { tataPunchFeatures } from "./tata-punch";
import { brandKeyFromSlug, brandLadders } from "./brand-ladder";

const configs: Record<string, CarFeatureConfig> = {
  "kia-seltos": kiaSeltosFeatures,
  "hyundai-creta": hyundaiCretaFeatures,
  "tata-nexon": tataNexonFeatures,
  "tata-punch": tataPunchFeatures,
  "hyundai-venue": hyundaiVenueFeatures,
  "skoda-kylaq": skodaKylaqFeatures,
};

export function isAutomaticTransmission(transmission: string): boolean {
  const t = transmission.toLowerCase();
  if (/\bmanual\b/.test(t) && !/automated|amt|imt|tc\b/.test(t)) return false;
  return /automatic|cvt|dct|\btc\b|amt|imt|ivt/.test(t);
}

export function normalizeTrimKey(trim: string): string {
  return trim
    .replace(/\s+Red Dark$/i, "")
    .replace(/\s+Dark$/i, "")
    .replace(/\s+Dual Tone$/i, "")
    .replace(/\s+DT$/i, "")
    .replace(/\s+Knight DT$/i, " Knight")
    .replace(/\s+\(160PS\)$/i, "")
    .trim();
}

function findTrimIndex(order: string[], trimKey: string): number {
  const exact = order.indexOf(trimKey);
  if (exact !== -1) return exact;

  let best = -1;
  let bestLen = 0;
  for (let i = 0; i < order.length; i++) {
    const t = order[i];
    const matches =
      trimKey === t ||
      trimKey.startsWith(`${t} `) ||
      trimKey.startsWith(`${t}(`);
    if (matches && t.length > bestLen) {
      best = i;
      bestLen = t.length;
    }
  }
  return best;
}

function mergePacks(target: TrimFeaturePack, source: TrimFeaturePack): TrimFeaturePack {
  const result: TrimFeaturePack = { ...target };
  for (const key of Object.keys(source) as FeatureCategory[]) {
    const items = source[key];
    if (!items?.length) continue;
    result[key] = [...(result[key] ?? []), ...items];
  }
  return result;
}

function dedupeItems(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function mergeCumulative(
  config: CarFeatureConfig,
  trimOrder: string[],
  trimAdditions: Record<string, TrimFeaturePack>,
  trimKey: string,
  base: TrimFeaturePack
): TrimFeaturePack {
  let merged = { ...base };
  const index = findTrimIndex(trimOrder, trimKey);
  if (index === -1) return merged;

  for (let i = 0; i <= index; i++) {
    const add = trimAdditions[trimOrder[i]];
    if (add) merged = mergePacks(merged, add);
  }
  return merged;
}

function findBranch(
  config: CarFeatureConfig,
  trimKey: string
): { branch: NonNullable<CarFeatureConfig["branches"]>[string]; name: string } | null {
  if (!config.branches) return null;

  let match: { branch: NonNullable<CarFeatureConfig["branches"]>[string]; name: string } | null =
    null;
  let matchLen = 0;

  for (const [name, branch] of Object.entries(config.branches)) {
    const fits =
      trimKey === name ||
      trimKey.startsWith(`${name} `) ||
      trimKey.startsWith(`${name}(`);
    if (fits && name.length > matchLen) {
      match = { branch, name };
      matchLen = name.length;
    }
  }
  return match;
}

function applyCumulative(config: CarFeatureConfig, trimKey: string): TrimFeaturePack {
  let merged: TrimFeaturePack = { ...config.standard };

  const branchHit = findBranch(config, trimKey);
  if (branchHit) {
    const { branch } = branchHit;
    const mainBase = applyCumulative(
      { ...config, branches: undefined },
      branch.fromTrim
    );
    merged = mergePacks(merged, mainBase);
    merged = mergeCumulative(
      config,
      branch.trimOrder,
      branch.trimAdditions,
      trimKey,
      merged
    );
    return merged;
  }

  merged = mergeCumulative(
    config,
    config.trimOrder,
    config.trimAdditions,
    trimKey,
    merged
  );
  return merged;
}

function filterTransmissionItems(items: string[], automatic: boolean): string[] {
  return items.filter((item) => {
    const lower = item.toLowerCase();
    const autoOnly =
      lower.includes("automatic only") || lower.includes("(automatic)");
    const manualOnly =
      lower.includes("manual only") ||
      lower.includes("(manual type)") ||
      lower.includes("(manual)");
    if (autoOnly && !automatic) return false;
    if (manualOnly && automatic) return false;
    return true;
  });
}

function powertrainNotes(variant: CarVariant): TrimFeaturePack {
  const notes: TrimFeaturePack = {};
  const fuel = variant.fuelType.toLowerCase();

  if (fuel.includes("cng")) {
    notes.comfort = [
      "Factory-fitted CNG kit with dual-cylinder tech (where applicable)",
      "CNG / petrol dual-fuel mode",
    ];
  }
  if (fuel.includes("diesel")) {
    notes.comfort = [
      ...(notes.comfort ?? []),
      "Diesel engine with DPF regeneration (official spec)",
    ];
  }
  if (variant.engine.toLowerCase().includes("turbo")) {
    notes.comfort = [
      ...(notes.comfort ?? []),
      `Turbocharged engine: ${variant.power} / ${variant.torque}`,
    ];
  }

  return notes;
}

function cosmeticTrimNotes(trim: string): TrimFeaturePack {
  const notes: TrimFeaturePack = {};
  if (/dual tone|\bdt\b/i.test(trim)) {
    notes.exterior = ["Dual-tone body colour option"];
  }
  if (/red dark/i.test(trim)) {
    notes.exterior = [
      ...(notes.exterior ?? []),
      "Fearless+ PS Red Dark exclusive exterior theme",
    ];
  } else if (/dark/i.test(trim)) {
    notes.exterior = [...(notes.exterior ?? []), "Dark edition exterior theme"];
  }
  if (/knight/i.test(trim)) {
    notes.exterior = [
      ...(notes.exterior ?? []),
      "Knight edition styling package",
    ];
  }
  return notes;
}

export function resolveOfficialFeatures(
  carSlug: string,
  variant: CarVariant
): Partial<Record<FeatureCategory, string[]>> {
  const config =
    configs[carSlug] ??
    (() => {
      const key = brandKeyFromSlug(carSlug);
      return key ? brandLadders[key] : undefined;
    })();
  if (!config) return {};

  const trimKey = normalizeTrimKey(variant.trim);
  const automatic = isAutomaticTransmission(variant.transmission);

  let merged = applyCumulative(config, trimKey);
  merged = mergePacks(merged, cosmeticTrimNotes(variant.trim));
  merged = mergePacks(merged, powertrainNotes(variant));

  const result: Partial<Record<FeatureCategory, string[]>> = {};
  for (const key of Object.keys(merged) as FeatureCategory[]) {
    const items = merged[key];
    if (!items?.length) continue;
    result[key] = dedupeItems(filterTransmissionItems(items, automatic));
  }

  return result;
}
