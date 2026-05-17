import type { CarSpec, CarVariant } from "@/lib/cars";

export type VariantRow = {
  id: string;
  trim: string;
  name: string;
  priceLakh: number;
  fuelType: string;
  engine: string;
  transmission: string;
  power: string;
  torque: string;
  mileage: string;
  featureTier?: "base" | "mid" | "upper" | "top" | "gt";
};

export function formatPriceLakh(lakh: number): string {
  return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
}

const tierFeatures: Record<
  string,
  Record<VariantRow["featureTier"] & string, string[]>
> = {
  "kia-seltos": {
    base: [
      "6 airbags standard",
      "12.3-inch touchscreen & digital cluster",
      "LED headlamps & connected tail lamps",
      "Wireless Apple CarPlay & Android Auto",
      "Rear AC vents & cruise control",
    ],
    mid: [
      "Panoramic sunroof",
      "Smart key with push-button start",
      "Ventilated front seats (select trims)",
      "Auto-fold ORVMs with LED fog lamps",
      "Electronic parking brake (automatic variants)",
    ],
    upper: [
      "64-colour ambient lighting",
      "8-way powered driver seat",
      "Bose 8-speaker premium audio",
      "360° surround-view camera",
      "Wireless phone charger",
    ],
    top: [
      "Level 2 ADAS (SmartSense)",
      "Adaptive cruise control & lane keep assist",
      "Driver seat memory",
      "Dual-zone automatic climate control",
      "Connected car with OTA updates",
    ],
    gt: [
      "GT Line / X-Line exclusive styling",
      "18-inch alloy wheels",
      "Sport steering with integrated drive modes",
      "Red brake calipers (GT Line)",
      "Full ADAS & Bose audio",
    ],
  },
  "hyundai-creta": {
    base: [
      "6 airbags standard",
      "8-inch / 10.25-inch touchscreen (trim dependent)",
      "Rear AC vents",
      "Halogen / LED lighting (trim dependent)",
    ],
    mid: [
      "Electric sunroof",
      "Smart key with push-button start",
      "Wireless Android Auto & Apple CarPlay",
      "Dual-zone climate control",
      "Rear centre armrest",
    ],
    upper: [
      "10.25-inch dual displays (select trims)",
      "Ventilated front seats",
      "8-way powered driver seat",
      "Bose 8-speaker audio",
      "Ambient interior lighting",
    ],
    top: [
      "Panoramic sunroof",
      "Level 2 ADAS on King / select trims",
      "360° camera (select trims)",
      "Wireless charging pad",
      "Leatherette upholstery",
    ],
    gt: [
      "King / N Line styling accents",
      "Turbo petrol 160 PS (King DCT)",
      "Sport seats & metal pedals",
      "Premium Bose audio",
    ],
  },
  "tata-nexon": {
    base: [
      "6 airbags standard",
      "5-star Bharat NCAP rating",
      "ESP, hill-hold assist & ISOFIX",
      "Multi-drive modes (Eco, City, Sport)",
    ],
    mid: [
      "10.25-inch touchscreen",
      "Wireless Android Auto & Apple CarPlay",
      "Push-button start / keyless entry",
      "Rear camera & cruise control",
      "Connected car (iRA)",
    ],
    upper: [
      "Electric sunroof",
      "360° Surround View system",
      "Voice-assisted sunroof (top trims)",
      "Leatherette upholstery",
      "Rain-sensing wipers",
    ],
    top: [
      "7-speed DCT (select petrol variants)",
      "Ventilated seats (Fearless+ PS)",
      "Wireless charging",
      "JBL / premium audio (select trims)",
      "ADAS features on top trims",
    ],
    gt: [],
  },
  "tata-punch": {
    base: [
      "6 airbags standard",
      "5-star Bharat NCAP (2026 facelift)",
      "ESP & traction control",
      "LED DRLs",
    ],
    mid: [
      "10.25-inch touchscreen",
      "Wireless connectivity",
      "Push-button start",
      "Cruise control",
      "Automatic climate control (Adventure+)",
    ],
    upper: [
      "360° camera",
      "Electric sunroof",
      "Blind-view monitor",
      "Voice-assisted controls",
    ],
    top: [
      "iTurbo 120 PS engine (top trims)",
      "Galaxy ambient lighting",
      "Premium interior trim",
      "Connected vehicle features",
    ],
    gt: [],
  },
  "hyundai-venue": {
    base: [
      "6 airbags standard",
      "5-star Bharat NCAP (2026)",
      "Dual 12.3-inch curved displays",
      "Rear AC vents",
    ],
    mid: [
      "Smart key with push-button start",
      "Wireless phone charger",
      "Sunroof (select HX trims)",
      "Cruise control",
      "Connected Bluelink features",
    ],
    upper: [
      "Dual-zone climate control",
      "Ventilated seats (select trims)",
      "Bose audio (select trims)",
      "360° camera (HX10)",
    ],
    top: [
      "Level 2 ADAS (HX10)",
      "Panoramic sunroof (select trims)",
      "7-speed DCT (turbo petrol)",
      "6-speed diesel automatic (HX10)",
    ],
    gt: [],
  },
  "skoda-kylaq": {
    base: [
      "6 airbags standard",
      "10.25-inch touchscreen",
      "Wireless Android Auto & Apple CarPlay",
      "LED headlamps & DRLs",
    ],
    mid: [
      "Electric sunroof",
      "Push-button start",
      "Automatic climate control",
      "Cruise control",
      "Rear centre armrest",
    ],
    upper: [
      "Wireless phone charger",
      "Ambient lighting",
      "17-inch dual-tone alloys (Signature+)",
      "Leatherette upholstery",
    ],
    top: [
      "Ventilated front seats",
      "6-way powered driver seat",
      "Premium ambient lighting",
      "Auto headlamps & rain sensor",
    ],
    gt: [],
  },
};

function defaultTier(
  trim: string,
  carSlug: string
): NonNullable<VariantRow["featureTier"]> {
  const t = trim.toUpperCase();
  if (carSlug === "kia-seltos") {
    if (t.includes("GTX") || t.includes("X-LINE") || t.includes("X LINE"))
      return "gt";
    if (t.includes("(A)") || t.includes("HX10") || t.includes("KING") || t.includes("PRESTIGE"))
      return "top";
    if (
      t.includes("HTX") ||
      t.includes("SX") ||
      t.includes("CREATIVE") ||
      t.includes("ACCOMPLISHED") ||
      t.includes("SIGNATURE")
    )
      return "upper";
    if (
      t.includes("HTK") ||
      t.includes("HX") ||
      t.includes("PURE") ||
      t.includes("ADVENTURE") ||
      t.includes("CLASSIC PLUS")
    )
      return "mid";
    return "base";
  }
  if (carSlug === "hyundai-creta") {
    if (t.includes("KING") || t.includes("N LINE") || t.includes("N10"))
      return "gt";
    if (t.includes("SX") || t.includes("SIGNATURE") || t.includes("PRESTIGE"))
      return "upper";
    if (t.includes("S") || t.includes("EX")) return "mid";
    return "base";
  }
  if (carSlug === "tata-nexon") {
    if (t.includes("FEARLESS")) return "top";
    if (t.includes("CREATIVE")) return "upper";
    if (t.includes("PURE")) return "mid";
    return "base";
  }
  if (carSlug === "tata-punch") {
    if (t.includes("ACCOMPLISHED")) return "top";
    if (t.includes("ADVENTURE")) return "upper";
    if (t.includes("PURE")) return "mid";
    return "base";
  }
  if (carSlug === "hyundai-venue") {
    if (t.includes("HX10") || t.includes("HX8")) return "top";
    if (t.includes("HX6") || t.includes("HX7")) return "upper";
    if (t.includes("HX5") || t.includes("HX4")) return "mid";
    return "base";
  }
  if (carSlug === "skoda-kylaq") {
    if (t.includes("PRESTIGE")) return "top";
    if (t.includes("SIGNATURE")) return "upper";
    if (t.includes("CLASSIC PLUS")) return "mid";
    return "base";
  }
  return "base";
}

export function rowToVariant(row: VariantRow, carSlug: string): CarVariant {
  const tier: NonNullable<VariantRow["featureTier"]> =
    row.featureTier ?? defaultTier(row.trim, carSlug) ?? "base";
  const carTiers = tierFeatures[carSlug];
  const features =
    carTiers?.[tier] ?? carTiers?.base ?? [];

  const specs: CarSpec[] = [
    { label: "Trim", value: row.trim },
    { label: "Engine", value: row.engine },
    { label: "Transmission", value: row.transmission },
    { label: "Fuel Type", value: row.fuelType },
    { label: "Power", value: row.power },
    { label: "Torque", value: row.torque },
    { label: "Mileage (ARAI)", value: row.mileage },
    { label: "Price Type", value: "Ex-showroom, India" },
  ];

  return {
    id: row.id,
    name: row.name,
    trim: row.trim,
    price: formatPriceLakh(row.priceLakh),
    engine: row.engine,
    transmission: row.transmission,
    fuelType: row.fuelType,
    power: row.power,
    torque: row.torque,
    mileage: row.mileage,
    specs,
    features,
  };
}

export function rowsToVariants(rows: VariantRow[], carSlug: string): CarVariant[] {
  return rows.map((row) => rowToVariant(row, carSlug));
}
