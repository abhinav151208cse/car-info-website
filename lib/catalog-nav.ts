import { carsCatalog, type CarModel, type CarVariant } from "@/lib/cars";
import { formatVariantOptionLabel } from "@/lib/variant-label";

export type BrandOption = { brand: string; count: number };

export type ModelOption = {
  slug: string;
  name: string;
  priceRange: string;
  image: string;
};

export function getBrands(): BrandOption[] {
  const counts = new Map<string, number>();
  for (const car of carsCatalog) {
    counts.set(car.brand, (counts.get(car.brand) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => a.brand.localeCompare(b.brand));
}

export function getModelsByBrand(brand: string): ModelOption[] {
  return carsCatalog
    .filter((c) => c.brand === brand)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      priceRange: c.priceRange,
      image: c.image,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCarModel(slug: string): CarModel | undefined {
  return carsCatalog.find((c) => c.slug === slug);
}

export function getVariantsForModel(slug: string): CarVariant[] {
  return getCarModel(slug)?.variants ?? [];
}

/** Short label for variant dropdown */
export function variantLabel(v: CarVariant, car?: CarModel): string {
  const model = car ?? carsCatalog.find((c) => c.variants.some((x) => x.id === v.id));
  if (model) return formatVariantOptionLabel(model, v);
  return `${v.trim} · ${v.fuelType} · ${v.transmission} · ${v.price}`;
}
