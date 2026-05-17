import { describe, expect, it } from "vitest";
import {
  MAX_COMPARE,
  buildCompareTable,
  compareEntryKey,
  parseCompareEntryKey,
  resolveCompareColumn,
} from "@/lib/compare";
import { getCarBySlug } from "@/lib/cars";

describe("compareEntryKey", () => {
  it("joins slug and variant id", () => {
    expect(
      compareEntryKey({ carSlug: "kia-seltos", variantId: "abc-1" })
    ).toBe("kia-seltos::abc-1");
  });
});

describe("parseCompareEntryKey", () => {
  it("round-trips valid keys", () => {
    const entry = { carSlug: "kia-seltos", variantId: "kia-seltos-htx-petrol-cvt-9" };
    const key = compareEntryKey(entry);
    expect(parseCompareEntryKey(key)).toEqual(entry);
  });

  it("returns null for invalid keys", () => {
    expect(parseCompareEntryKey("invalid")).toBeNull();
  });
});

describe("resolveCompareColumn", () => {
  it("resolves real catalog car", () => {
    const car = getCarBySlug("kia-seltos");
    expect(car).toBeDefined();
    const col = resolveCompareColumn({
      carSlug: "kia-seltos",
      variantId: car!.variants[0].id,
    });
    expect(col?.carName).toBe("Kia Seltos");
    expect(col?.variantName).toMatch(/·/);
  });

  it("returns null for unknown slug", () => {
    expect(
      resolveCompareColumn({ carSlug: "no-such-car", variantId: "x" })
    ).toBeNull();
  });
});

describe("buildCompareTable", () => {
  it("builds columns for up to MAX_COMPARE entries", () => {
    const car = getCarBySlug("kia-seltos")!;
    const entries = car.variants.slice(0, MAX_COMPARE).map((v) => ({
      carSlug: car.slug,
      variantId: v.id,
    }));
    const table = buildCompareTable(entries);
    expect(table.columns).toHaveLength(MAX_COMPARE);
  });

  it("includes feature rows when comparing variants", () => {
    const car = getCarBySlug("kia-seltos")!;
    const table = buildCompareTable([
      { carSlug: car.slug, variantId: car.variants[0].id },
      { carSlug: car.slug, variantId: car.variants[1].id },
    ]);
    expect(table.featureRows.length).toBeGreaterThan(0);
  });
});
