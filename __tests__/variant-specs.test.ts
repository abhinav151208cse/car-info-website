import { describe, expect, it } from "vitest";
import { buildVariantSpecGroups } from "@/lib/variant-specs";
import { mockCar } from "./fixtures/mock-car";

describe("buildVariantSpecGroups", () => {
  it("returns grouped spec sections", () => {
    const groups = buildVariantSpecGroups(mockCar.variants[0], mockCar);
    expect(groups.map((g) => g.id)).toEqual(
      expect.arrayContaining(["pricing", "powertrain", "efficiency", "dimensions"])
    );
  });

  it("includes powertrain fields", () => {
    const groups = buildVariantSpecGroups(mockCar.variants[0], mockCar);
    const powertrain = groups.find((g) => g.id === "powertrain")!;
    const labels = powertrain.specs.map((s) => s.label);
    expect(labels).toContain("Max power");
    expect(labels).toContain("Transmission");
  });
});
