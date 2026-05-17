import type { CarModel, CarVariant } from "@/lib/cars";
import { getCarBySlug } from "@/lib/cars";
import {
  buildVariantDetailSections,
  type VariantDetailSection,
} from "@/lib/variant-details";

export const MAX_COMPARE = 3;
export const COMPARE_STORAGE_KEY = "carinfo-compare-v1";

export type CompareEntry = {
  carSlug: string;
  variantId: string;
};

export type CompareColumn = {
  key: string;
  carSlug: string;
  variantId: string;
  carName: string;
  brand: string;
  image: string;
  variantName: string;
  trim: string;
  price: string;
  engine: string;
  transmission: string;
  fuelType: string;
  power: string;
  torque: string;
  mileage: string;
};

export type CompareSpecRow = {
  label: string;
  values: string[];
};

export type CompareFeatureRow = {
  sectionId: string;
  sectionTitle: string;
  feature: string;
  /** true = has feature, false = does not */
  present: boolean[];
};

export type CompareTable = {
  columns: CompareColumn[];
  specRows: CompareSpecRow[];
  featureRows: CompareFeatureRow[];
};

export function compareEntryKey(entry: CompareEntry): string {
  return `${entry.carSlug}::${entry.variantId}`;
}

export function parseCompareEntryKey(key: string): CompareEntry | null {
  const [carSlug, variantId] = key.split("::");
  if (!carSlug || !variantId) return null;
  return { carSlug, variantId };
}

export function resolveCompareColumn(
  entry: CompareEntry
): CompareColumn | null {
  const car = getCarBySlug(entry.carSlug);
  if (!car) return null;
  const variant =
    car.variants.find((v) => v.id === entry.variantId) ?? car.variants[0];
  if (!variant) return null;

  return {
    key: compareEntryKey({ carSlug: car.slug, variantId: variant.id }),
    carSlug: car.slug,
    variantId: variant.id,
    carName: car.name,
    brand: car.brand,
    image: car.image,
    variantName: variant.name,
    trim: variant.trim,
    price: variant.price,
    engine: variant.engine,
    transmission: variant.transmission,
    fuelType: variant.fuelType,
    power: variant.power,
    torque: variant.torque,
    mileage: variant.mileage,
  };
}

function specValueForColumn(
  sections: VariantDetailSection[],
  label: string
): string {
  const specSection = sections.find((s) => s.id === "specifications");
  const hit = specSection?.specs?.find((s) => s.label === label);
  return hit?.value ?? "—";
}

function hasFeature(
  sections: VariantDetailSection[],
  sectionId: string,
  feature: string
): boolean {
  const section = sections.find((s) => s.id === sectionId);
  if (!section?.items) return false;
  return section.items.some(
    (item) => item.toLowerCase() === feature.toLowerCase()
  );
}

export function buildCompareTable(entries: CompareEntry[]): CompareTable {
  const columns: CompareColumn[] = [];
  const sectionSets: VariantDetailSection[][] = [];

  for (const entry of entries) {
    const col = resolveCompareColumn(entry);
    if (!col) continue;
    columns.push(col);

    const car = getCarBySlug(entry.carSlug)!;
    const variant =
      car.variants.find((v) => v.id === entry.variantId) ?? car.variants[0];
    sectionSets.push(buildVariantDetailSections(variant, car));
  }

  const specLabels = new Set<string>();
  for (const sections of sectionSets) {
    const specSection = sections.find((s) => s.id === "specifications");
    specSection?.specs?.forEach((s) => specLabels.add(s.label));
  }

  const specRows: CompareSpecRow[] = Array.from(specLabels).map((label) => ({
    label,
    values: sectionSets.map((sections) => specValueForColumn(sections, label)),
  }));

  const featureMap = new Map<
    string,
    { sectionId: string; sectionTitle: string; feature: string }
  >();

  sectionSets.forEach((sections) => {
    sections.forEach((section) => {
      if (section.type !== "list" || !section.items) return;
      section.items.forEach((feature) => {
        const key = `${section.id}::${feature}`;
        if (!featureMap.has(key)) {
          featureMap.set(key, {
            sectionId: section.id,
            sectionTitle: section.title,
            feature,
          });
        }
      });
    });
  });

  const featureRows: CompareFeatureRow[] = Array.from(featureMap.values())
    .map(({ sectionId, sectionTitle, feature }) => ({
      sectionId,
      sectionTitle,
      feature,
      present: sectionSets.map((sections) =>
        hasFeature(sections, sectionId, feature)
      ),
    }))
    .sort((a, b) => {
      const sectionCmp = a.sectionTitle.localeCompare(b.sectionTitle);
      if (sectionCmp !== 0) return sectionCmp;
      return a.feature.localeCompare(b.feature);
    });

  return { columns, specRows, featureRows };
}

export function getVariantsForCar(car: CarModel): CarVariant[] {
  return car.variants;
}
