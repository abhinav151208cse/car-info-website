import type { CarFeatureConfig } from "./types";

/** Hyundai India Venue 2026 HX — official launch / v3cars HX lineup */
export const hyundaiVenueFeatures: CarFeatureConfig = {
  standard: {
    safety: [
      "5-star Bharat NCAP safety rating",
      "6 airbags (standard)",
      "ABS with EBD, ESC & hill-start assist",
      "ISOFIX child-seat mounts",
      "Tyre-pressure monitoring",
    ],
    comfort: ["Rear AC vents"],
    convenience: ["Hyundai Bluelink connected car technology"],
  },
  trimOrder: [
    "HX2",
    "HX4",
    "HX5",
    "HX5 Plus",
    "HX6",
    "HX6T",
    "HX7",
    "HX8",
    "HX10",
  ],
  trimAdditions: {
    HX2: {
      exterior: ["Halogen headlamps", "R15 steel wheels"],
      interior: ["Fabric upholstery"],
      entertainment: [
        "Dual 12.3-inch curved displays (HX generation)",
        "8-inch infotainment with smartphone connectivity",
      ],
    },
    HX4: {
      exterior: ["LED DRLs", "R16 alloy wheels"],
      comfort: ["Manual climate control"],
    },
    HX5: {
      exterior: ["LED headlamps & tail lamps"],
      entertainment: [
        "Wireless Android Auto & Apple CarPlay",
        "6-speaker audio",
      ],
      convenience: ["Smart key with push-button start"],
    },
    "HX5 Plus": {
      comfort: ["Electric sunroof"],
      convenience: ["Wireless phone charger"],
    },
    HX6: {
      comfort: ["Automatic climate control", "Cruise control"],
      interior: ["Leatherette upholstery"],
    },
    HX6T: {
      entertainment: ["1.0-litre turbo GDi petrol (120 PS) engine option"],
      convenience: ["7-speed DCT (turbo automatic variants)"],
    },
    HX7: {
      exterior: ["R16 diamond-cut alloys (diesel HX7)"],
      comfort: ["Rear centre armrest"],
    },
    HX8: {
      entertainment: ["Bose premium audio (select HX8 trims)"],
      comfort: ["Ventilated front seats (select variants)"],
      convenience: ["Dual-tone exterior (HX8 DT)"],
    },
    HX10: {
      adas: [
        "Hyundai SmartSense Level 2 ADAS",
        "Forward collision avoidance assist",
        "Lane keeping assist & lane following assist",
        "Adaptive cruise control",
        "High beam assist",
      ],
      convenience: [
        "360° surround view monitor",
        "Front & rear parking sensors",
        "6-speed automatic (diesel HX10)",
        "7-speed DCT (turbo petrol HX10)",
      ],
      comfort: ["Dual-zone automatic climate control"],
    },
  },
};
