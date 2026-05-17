import type { CarFeatureConfig } from "./types";

/** Skoda India Kylaq 2026 — Classic to Prestige Plus (official variant ladder) */
export const skodaKylaqFeatures: CarFeatureConfig = {
  standard: {
    safety: [
      "6 airbags (standard)",
      "ESP, ABS with EBD & multi-collision brake",
      "ISOFIX child-seat mounts",
      "Rear parking sensors & camera",
    ],
    comfort: ["Rear AC vents"],
    convenience: ["4-year / 1,00,000 km warranty"],
  },
  trimOrder: [
    "Classic",
    "Classic Plus",
    "Signature",
    "Signature Plus",
    "Prestige",
    "Prestige Plus",
  ],
  trimAdditions: {
    Classic: {
      exterior: ["LED headlamps with DRLs", "R16 alloy wheels"],
      interior: ["Fabric upholstery"],
      entertainment: [
        "10.25-inch touchscreen infotainment",
        "Wireless Android Auto & Apple CarPlay",
        "4-speaker audio",
      ],
    },
    "Classic Plus": {
      exterior: ["Electric sunroof"],
      convenience: [
        "Push-button start",
        "Cruise control",
        "Automatic climate control",
      ],
    },
    Signature: {
      exterior: ["R16 dual-tone alloy wheels"],
      interior: ["Leatherette upholstery"],
      comfort: ["Rear centre armrest with cup holders"],
    },
    "Signature Plus": {
      exterior: ["17-inch dual-tone alloy wheels"],
      convenience: ["Wireless phone charger"],
      comfort: ["Ambient interior lighting"],
    },
    Prestige: {
      interior: [
        "Ventilated front seats",
        "6-way powered driver seat",
      ],
      convenience: ["Auto headlamps & rain-sensing wipers"],
    },
    "Prestige Plus": {
      entertainment: ["Premium audio upgrade"],
      comfort: ["Enhanced ambient lighting package"],
      interior: ["Premium leatherette with contrast stitching"],
    },
  },
};
