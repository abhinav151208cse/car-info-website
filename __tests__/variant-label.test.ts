import { describe, expect, it } from "vitest";
import {
  buildVariantSelectOptions,
  formatTransmissionLabel,
  formatVariantDisplayName,
  formatVariantOptionLabel,
} from "@/lib/variant-label";
import { mockCar } from "./fixtures/mock-car";

describe("formatTransmissionLabel", () => {
  it("maps CVT to IVT", () => {
    expect(formatTransmissionLabel("CVT")).toBe("IVT");
  });

  it("normalizes DCT labels", () => {
    expect(formatTransmissionLabel("7-speed DCT")).toBe("7-speed DCT");
  });

  it("maps torque converter to AT", () => {
    expect(formatTransmissionLabel("6-speed TC")).toBe("6-speed AT");
  });
});

describe("formatVariantDisplayName", () => {
  it("includes fuel and distinct transmissions for same trim", () => {
    const ivt = formatVariantDisplayName(mockCar, mockCar.variants[0]);
    const dct = formatVariantDisplayName(mockCar, mockCar.variants[1]);
    expect(ivt).toContain("IVT");
    expect(dct).toContain("7-speed DCT");
    expect(ivt).not.toBe(dct);
  });
});

describe("buildVariantSelectOptions", () => {
  it("returns unique labels per variant", () => {
    const options = buildVariantSelectOptions(mockCar);
    expect(options).toHaveLength(2);
    expect(new Set(options.map((o) => o.label)).size).toBe(2);
  });

  it("includes searchable keywords", () => {
    const options = buildVariantSelectOptions(mockCar);
    expect(options[1].keywords).toMatch(/DCT/i);
  });
});

describe("formatVariantOptionLabel", () => {
  it("appends price", () => {
    const label = formatVariantOptionLabel(mockCar, mockCar.variants[0]);
    expect(label).toContain("₹16.89 Lakh");
  });
});
