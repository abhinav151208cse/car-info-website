import { describe, expect, it } from "vitest";
import {
  buildAmortizationSchedule,
  calculateEmi,
  formatInr,
  loanFromPrice,
  parseLakhPrice,
} from "@/lib/emi";

describe("parseLakhPrice", () => {
  it("parses lakh strings", () => {
    expect(parseLakhPrice("₹16.89 Lakh")).toBe(1_689_000);
  });

  it("returns null for invalid input", () => {
    expect(parseLakhPrice("N/A")).toBeNull();
  });
});

describe("calculateEmi", () => {
  it("computes EMI for a typical car loan", () => {
    const result = calculateEmi({
      principal: 1_200_000,
      annualRatePercent: 9.5,
      tenureMonths: 60,
    });
    expect(result).not.toBeNull();
    expect(result!.emi).toBeGreaterThan(20_000);
    expect(result!.emi).toBeLessThan(30_000);
    expect(result!.totalPayment).toBeGreaterThan(result!.principal);
  });

  it("handles zero interest", () => {
    const result = calculateEmi({
      principal: 600_000,
      annualRatePercent: 0,
      tenureMonths: 36,
    });
    expect(result?.emi).toBeCloseTo(16_666.67, 0);
  });

  it("returns null for invalid principal", () => {
    expect(
      calculateEmi({
        principal: 0,
        annualRatePercent: 9,
        tenureMonths: 60,
      }),
    ).toBeNull();
  });
});

describe("loanFromPrice", () => {
  it("subtracts down payment from price", () => {
    expect(loanFromPrice(1_000_000, 200_000)).toBe(800_000);
  });
});

describe("buildAmortizationSchedule", () => {
  it("returns rows that end near zero balance", () => {
    const rows = buildAmortizationSchedule(
      {
        principal: 500_000,
        annualRatePercent: 10,
        tenureMonths: 24,
      },
      24,
    );
    expect(rows?.length).toBe(24);
    expect(rows?.at(-1)?.balance).toBeLessThan(1);
  });
});

describe("formatInr", () => {
  it("formats rupees in en-IN locale", () => {
    expect(formatInr(25000)).toMatch(/25/);
  });
});
