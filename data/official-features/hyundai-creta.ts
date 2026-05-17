import type { CarFeatureConfig } from "./types";

/** Hyundai India CRETA 2026 — variant feature ladder (official highlights / brochure) */
export const hyundaiCretaFeatures: CarFeatureConfig = {
  standard: {
    safety: [
      "6 airbags (standard across variants)",
      "ABS with EBD, ESC & hill-start assist",
      "ISOFIX child-seat mounts",
      "Rear parking camera with dynamic guidelines (variant dependent)",
      "Tyre-pressure monitoring",
    ],
    comfort: ["Rear AC vents", "Drive modes (Eco / Normal / Sport)"],
    convenience: ["Tilt & telescopic steering", "Power windows (all four)"],
  },
  trimOrder: [
    "E",
    "EX",
    "EX(O)",
    "S",
    "S(O)",
    "S(O) Knight",
    "SX",
    "SX Tech",
    "SX Premium",
    "SX(O)",
    "SX(O) Knight",
    "King",
    "King Knight",
    "King Limited",
  ],
  trimAdditions: {
    E: {
      exterior: ["Halogen headlamps", "Body-coloured bumpers", "R16 steel wheels"],
      interior: ["Fabric upholstery", "Manual AC"],
      entertainment: ["8-inch touchscreen audio (base)"],
    },
    EX: {
      exterior: ["LED positioning lamps & DRLs", "Roof rails", "R16 styled wheels"],
      entertainment: [
        "8-inch touchscreen with Android Auto & Apple CarPlay",
        "4-speaker audio",
      ],
      comfort: ["Cruise control", "Rear centre armrest"],
    },
    "EX(O)": {
      exterior: ["LED tail lamps", "Rear spoiler"],
      convenience: [
        "Smart key with push-button start (select variants)",
        "Rear window sunshade (select editions)",
      ],
    },
    S: {
      exterior: ["R17 alloy wheels", "Chrome outside door handles"],
      comfort: ["Automatic climate control"],
      interior: ["Leatherette upholstery (select variants)"],
    },
    "S(O)": {
      exterior: ["Electric sunroof"],
      entertainment: [
        "10.25-inch touchscreen infotainment",
        "Wireless Android Auto & Apple CarPlay",
      ],
      convenience: ["Wireless phone charger (select variants)"],
    },
    "S(O) Knight": {
      exterior: [
        "All-black exterior theme",
        "Black alloy wheels with red brake calipers",
        "Matte-black Hyundai & CRETA emblems",
      ],
      interior: ["All-black interior with brass inserts"],
    },
    SX: {
      exterior: ["R17 diamond-cut alloy wheels", "Connecting LED tail lamps"],
      entertainment: ["26.03 cm (10.25-inch) digital instrument cluster"],
      comfort: ["Dual-zone automatic temperature control (DATC)"],
    },
    "SX Tech": {
      entertainment: ["Bose 8-speaker premium audio"],
      convenience: ["Front parking sensors"],
    },
    "SX Premium": {
      adas: ["Blind-spot view monitor (BVM)"],
      convenience: [
        "Surround view monitor (SVM)",
        "Front parking sensors",
      ],
    },
    "SX(O)": {
      interior: ["Ventilated front seats", "8-way powered driver seat"],
      comfort: ["Panoramic sunroof (select variants)"],
    },
    "SX(O) Knight": {
      exterior: ["Knight edition black styling package"],
      interior: ["Brass-accented black interior"],
    },
    King: {
      exterior: [
        "Dark chrome radiator grille",
        "Quad-beam LED headlamps",
        "R18 diamond-cut alloy wheels",
      ],
      interior: [
        "Premium seats with piping",
        "Driver power seat memory function",
        "Front seatback table with device holder",
      ],
      entertainment: [
        "26.03 cm (10.25-inch) infotainment with wireless connectivity",
        "Fully digital cluster integration",
      ],
      comfort: [
        "Dual-zone DATC with touch control",
        "Soothing amber ambient lighting",
        "Auto-folding ORVMs",
      ],
      convenience: ["Built-in dashcam (King / Limited editions)"],
    },
    "King Knight": {
      exterior: ["King Knight exclusive black theme & red calipers"],
      interior: ["King Knight brass-accent cabin"],
    },
    "King Limited": {
      convenience: [
        "King Limited edition badging",
        "Exclusive seat belt & headrest cushions",
        "Premium key cover",
        "Door cladding",
      ],
    },
  },
};
