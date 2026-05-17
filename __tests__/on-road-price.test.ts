import { describe, expect, it } from "vitest";
import {
  calculateOnRoadFromPriceString,
  calculateOnRoadPrice,
  classifyFuel,
  getOnRoadCityGroups,
} from "@/lib/on-road-price";

describe("classifyFuel", () => {
  it("detects electric variants", () => {
    expect(classifyFuel("Electric")).toBe("electric");
  });

  it("defaults to petrol", () => {
    expect(classifyFuel("Petrol")).toBe("petrol");
  });
});

describe("getOnRoadCityGroups", () => {
  it("groups cities under states", () => {
    const groups = getOnRoadCityGroups();
    const mh = groups.find((g) => g.state === "Maharashtra");
    expect(mh?.cities.some((c) => c.code === "pune")).toBe(true);
    expect(mh?.cities.some((c) => c.code === "mumbai")).toBe(true);
  });
});

describe("calculateOnRoadPrice", () => {
  it("returns a breakdown that sums to on-road total", () => {
    const result = calculateOnRoadPrice(1_500_000, "Petrol", "pune");
    expect(result).not.toBeNull();
    const sum = result!.lines.reduce((acc, line) => acc + line.amount, 0);
    expect(sum).toBe(result!.onRoadTotal);
    expect(result!.onRoadTotal).toBeGreaterThan(result!.exShowroom);
    expect(result!.cityName).toBe("Pune");
    expect(result!.stateName).toBe("Maharashtra");
  });

  it("applies TCS above ten lakh ex-showroom", () => {
    const below = calculateOnRoadPrice(900_000, "Petrol", "delhi");
    const above = calculateOnRoadPrice(1_200_000, "Petrol", "delhi");
    expect(below?.lines.some((l) => l.id === "tcs")).toBe(false);
    expect(above?.lines.some((l) => l.id === "tcs")).toBe(true);
  });

  it("charges lower road tax for EV than diesel in same city", () => {
    const ev = calculateOnRoadPrice(1_500_000, "Electric", "mumbai");
    const diesel = calculateOnRoadPrice(1_500_000, "Diesel", "mumbai");
    const evTax = ev?.lines.find((l) => l.id === "road-tax")?.amount ?? 0;
    const dieselTax =
      diesel?.lines.find((l) => l.id === "road-tax")?.amount ?? 0;
    expect(evTax).toBeLessThan(dieselTax);
  });

  it("varies other charges between cities in the same state", () => {
    const mumbai = calculateOnRoadPrice(1_000_000, "Petrol", "mumbai");
    const pune = calculateOnRoadPrice(1_000_000, "Petrol", "pune");
    const mumbaiOther =
      mumbai?.lines.find((l) => l.id === "other")?.amount ?? 0;
    const puneOther = pune?.lines.find((l) => l.id === "other")?.amount ?? 0;
    expect(mumbaiOther).toBeGreaterThan(puneOther);
  });
});

describe("calculateOnRoadFromPriceString", () => {
  it("parses lakh price labels for a city", () => {
    const result = calculateOnRoadFromPriceString(
      "₹12.50 Lakh",
      "Petrol",
      "bangalore",
    );
    expect(result?.exShowroom).toBe(1_250_000);
    expect(result?.cityName).toBe("Bengaluru");
    expect(result?.stateName).toBe("Karnataka");
  });
});
