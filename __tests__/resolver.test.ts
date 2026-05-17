import { describe, expect, it } from "vitest";
import {
  isAutomaticTransmission,
  normalizeTrimKey,
  resolveOfficialFeatures,
} from "@/data/official-features/resolver";

describe("isAutomaticTransmission", () => {
  it("treats CVT as automatic", () => {
    expect(isAutomaticTransmission("CVT")).toBe(true);
  });

  it("treats plain manual as not automatic", () => {
    expect(isAutomaticTransmission("6-speed MT")).toBe(false);
  });

  it("treats AMT as automatic", () => {
    expect(isAutomaticTransmission("6-speed AMT")).toBe(true);
  });
});

describe("normalizeTrimKey", () => {
  it("strips cosmetic suffixes", () => {
    expect(normalizeTrimKey("HTX Plus Dual Tone")).toBe("HTX Plus");
  });
});

describe("resolveOfficialFeatures", () => {
  it("returns safety features for Kia Seltos", () => {
    const features = resolveOfficialFeatures("kia-seltos", {
      id: "x",
      name: "Seltos HTX",
      trim: "HTX",
      price: "₹1",
      engine: "1497cc",
      transmission: "CVT",
      fuelType: "Petrol",
      power: "115PS",
      torque: "144Nm",
      mileage: "17kmpl",
      specs: [],
      features: [],
    });
    expect(features.safety?.length).toBeGreaterThan(0);
  });

  it("returns brand ladder fallback for unlisted model", () => {
    const features = resolveOfficialFeatures("kia-sonet", {
      id: "x",
      name: "Sonet HTK",
      trim: "HTK",
      price: "₹1",
      engine: "1497cc",
      transmission: "6-speed MT",
      fuelType: "Petrol",
      power: "115PS",
      torque: "144Nm",
      mileage: "17kmpl",
      specs: [],
      features: [],
    });
    expect(features.safety?.length).toBeGreaterThan(0);
  });
});
