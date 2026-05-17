import type { CarFeatureConfig } from "./types";

/** Tata Motors Nexon 2026 — feature ladder (official / v3cars variant structure) */
export const tataNexonFeatures: CarFeatureConfig = {
  standard: {
    safety: [
      "5-star Bharat NCAP safety rating",
      "6 airbags (standard)",
      "ESP, ABS with EBD & hill-hold assist",
      "ISOFIX child-seat mounts",
      "Rear parking sensors",
    ],
    comfort: [
      "Multi-drive modes (Eco / City / Sport)",
      "Height-adjustable driver seat",
    ],
    convenience: ["Connected car — iRA (Tata connected services)"],
  },
  trimOrder: [
    "Smart",
    "Smart Plus",
    "Smart Plus S",
    "Pure Plus",
    "Pure Plus S",
    "Pure Plus PS",
    "Creative",
    "Creative Plus S",
    "Creative Plus PS",
    "Fearless Plus PS",
  ],
  trimAdditions: {
    Smart: {
      exterior: ["LED DRLs", "Roof rails", "R16 steel wheels"],
      interior: ["Fabric upholstery"],
      entertainment: ["7-inch touchscreen (Smart)"],
    },
    "Smart Plus": {
      entertainment: ["10.25-inch touchscreen infotainment"],
      convenience: ["Push-button start / keyless entry"],
    },
    "Smart Plus S": {
      exterior: ["R16 styled wheels"],
      comfort: ["Cruise control"],
    },
    "Pure Plus": {
      exterior: ["R16 alloy wheels", "Electrically adjustable ORVMs"],
      entertainment: [
        "Wireless Android Auto & Apple CarPlay",
        "4-speaker Harman audio",
      ],
      comfort: ["Automatic climate control"],
    },
    "Pure Plus S": {
      exterior: ["Front fog lamps with cornering function"],
      interior: ["Leatherette upholstery"],
    },
    "Pure Plus PS": {
      comfort: ["Electric sunroof"],
      convenience: ["Rear centre armrest"],
    },
    Creative: {
      exterior: ["R17 alloy wheels", "Shark-fin antenna"],
      entertainment: ["7-speed DCT with drive modes (petrol DCT variants)"],
      comfort: ["Rain-sensing wipers", "Auto headlamps"],
    },
    "Creative Plus S": {
      convenience: ["Rear camera with guidelines"],
    },
    "Creative Plus PS": {
      entertainment: ["Voice-assisted sunroof controls"],
      comfort: ["Cooled glove box"],
    },
    "Fearless Plus PS": {
      exterior: ["R17 dual-tone alloys (top trims)"],
      interior: [
        "Ventilated front seats",
        "Leatherette seats with contrast stitching",
      ],
      entertainment: ["Premium audio with subwoofer (top trims)"],
      convenience: [
        "Wireless phone charger",
        "360° Surround View system",
        "Front parking sensors",
      ],
      adas: [
        "Advanced driver assistance features (top Fearless+ trims)",
        "Electronic parking brake (select variants)",
      ],
    },
  },
};
