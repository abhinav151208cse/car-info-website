import { describe, expect, it } from "vitest";
import {
  getBrands,
  getCarModel,
  getModelsByBrand,
  variantLabel,
} from "@/lib/catalog-nav";

describe("catalog-nav", () => {
  it("lists brands alphabetically with counts", () => {
    const brands = getBrands();
    expect(brands.length).toBeGreaterThan(5);
    const names = brands.map((b) => b.brand);
    expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names);
    expect(brands.every((b) => b.count > 0)).toBe(true);
  });

  it("returns Kia models", () => {
    const models = getModelsByBrand("Kia");
    expect(models.some((m) => m.slug === "kia-seltos")).toBe(true);
  });

  it("loads car by slug with variants", () => {
    const car = getCarModel("kia-seltos");
    expect(car?.variants.length).toBeGreaterThan(10);
  });

  it("variantLabel disambiguates powertrains", () => {
    const car = getCarModel("kia-seltos")!;
    const htx = car.variants.filter((v) => v.trim === "HTX");
    const labels = htx.map((v) => variantLabel(v, car));
    expect(new Set(labels).size).toBeGreaterThan(1);
  });
});
