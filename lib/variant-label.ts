import type { SearchableSelectOption } from "@/lib/searchable-select";
import type { CarModel, CarVariant } from "@/lib/cars";

/** User-facing transmission label (e.g. Kia CVT → IVT) */
export function formatTransmissionLabel(transmission: string): string {
  const t = transmission.trim();
  if (/^cvt$/i.test(t) || /\bivt\b/i.test(t)) return "IVT";
  if (/7-speed dct/i.test(t)) return "7-speed DCT";
  if (/6-speed dct/i.test(t)) return "6-speed DCT";
  if (/6-speed tc/i.test(t)) return "6-speed AT";
  if (/6-speed acmt|6-speed amt/i.test(t)) return "6-speed AMT";
  if (/6-speed mt/i.test(t)) return "6-speed MT";
  if (/5-speed mt/i.test(t)) return "5-speed MT";
  if (/single speed|1-speed/i.test(t)) return "Single-speed";
  return t;
}

/** Build a unique, readable variant name: "Seltos HTX · Petrol · IVT" */
export function formatVariantDisplayName(
  car: Pick<CarModel, "name" | "brand">,
  variant: Pick<CarVariant, "trim" | "fuelType" | "transmission" | "engine">
): string {
  const short = car.name.replace(new RegExp(`^${car.brand}\\s+`, "i"), "").trim();
  let trim = variant.trim;
  for (const prefix of [car.name, short]) {
    if (prefix && trim.toLowerCase().startsWith(prefix.toLowerCase())) {
      trim = trim.slice(prefix.length).trim();
    }
  }

  const trans = formatTransmissionLabel(variant.transmission);
  const engine =
    variant.engine && variant.engine !== "—" ? ` · ${variant.engine}` : "";

  return `${short} ${trim} · ${variant.fuelType} · ${trans}${engine}`;
}

/** Dropdown / list label with price */
export function formatVariantOptionLabel(
  car: Pick<CarModel, "name" | "brand">,
  variant: CarVariant
): string {
  return `${formatVariantDisplayName(car, variant)} — ${variant.price}`;
}

/** Options for searchable variant dropdowns */
export function buildVariantSelectOptions(
  car: CarModel
): SearchableSelectOption[] {
  return car.variants.map((v) => ({
    id: v.id,
    label: formatVariantOptionLabel(car, v),
    keywords: `${v.trim} ${v.fuelType} ${v.transmission} ${v.engine} ${v.power} ${v.price}`,
  }));
}
