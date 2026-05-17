import type { CarModel, CarSpec, CarVariant } from "@/lib/cars";
import {
  FEATURE_CATEGORY_LABELS,
  type FeatureCategory,
} from "@/data/official-features/types";
import { resolveOfficialFeatures } from "@/data/official-features/resolver";
import { buildVariantSpecGroups } from "@/lib/variant-specs";

export type VariantDetailSection = {
  id: string;
  title: string;
  type: "specs" | "list";
  specs?: CarSpec[];
  items?: string[];
};

const FEATURE_SECTION_ORDER: FeatureCategory[] = [
  "exterior",
  "interior",
  "entertainment",
  "safety",
  "comfort",
  "convenience",
  "adas",
];

export function buildVariantDetailSections(
  variant: CarVariant,
  car: CarModel
): VariantDetailSection[] {
  const sections: VariantDetailSection[] = buildVariantSpecGroups(
    variant,
    car
  ).map((group) => ({
    id: group.id,
    title: group.title,
    type: "specs" as const,
    specs: group.specs,
  }));

  const features = resolveOfficialFeatures(car.slug, variant);

  for (const category of FEATURE_SECTION_ORDER) {
    const items = features[category];
    if (!items?.length) continue;
    sections.push({
      id: category,
      title: FEATURE_CATEGORY_LABELS[category],
      type: "list",
      items,
    });
  }

  return sections;
}

export function countDetailItems(sections: VariantDetailSection[]): number {
  return sections.reduce((sum, section) => {
    if (section.type === "specs") return sum + (section.specs?.length ?? 0);
    return sum + (section.items?.length ?? 0);
  }, 0);
}
