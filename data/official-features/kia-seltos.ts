import type { CarFeatureConfig } from "./types";

/** Kia India All-new Seltos — trim features (Meet the Family / showroom, 2026) */
export const kiaSeltosFeatures: CarFeatureConfig = {
  standard: {
    safety: [
      "5-star Bharat NCAP safety rating",
      "6 airbags (driver, passenger, side & curtain)",
      "24 standard safety features",
      "High-strength steel body with hot-stamped parts",
      "ABS with EBD, ESC, hill-start assist & VSM",
      "All-wheel disc brakes & ISOFIX child mounts",
      "Tyre-pressure monitoring system",
    ],
    comfort: [
      "Drive Mode Select (Eco / Normal / Sport)",
      "Rear AC vents",
      "Tilt & telescopic steering adjustment",
    ],
    convenience: [
      "Power windows (all four)",
      "Rear defogger & rear washer/wiper",
    ],
  },
  trimOrder: ["HTE", "HTE (O)", "HTK", "HTK (O)", "HTX", "HTX (A)"],
  trimAdditions: {
    HTE: {
      exterior: [
        "Ice Cube MFR LED headlamps",
        "Kia Digital Tiger Face grille",
        "Streamline door handles (manual)",
        "Star Map LED tail lamps",
      ],
      entertainment: [
        "10.25-inch HD touchscreen infotainment",
        "Wireless Android Auto & Apple CarPlay",
        "6-speaker audio system",
      ],
      comfort: ["Cruise control with manual speed limit assist"],
      interior: ["Premium fabric upholstery", "6-way manual driver seat"],
    },
    "HTE (O)": {
      interior: [
        "60:40 split rear seats",
        "Rear centre armrest with cup holders",
      ],
      exterior: ["Star Map LED connected tail lamps"],
      convenience: [
        "Electric parking brake with auto hold (automatic only)",
        "Traction control modes — Sand / Mud / Snow (automatic only)",
        "Paddle shifters (automatic only)",
      ],
    },
    HTK: {
      exterior: [
        "Electric adjust outside mirrors with auto fold",
        "Hidden rear wiper",
      ],
      convenience: [
        "Streamline door handles (automatic)",
        "Smart key with push-button start",
        "Smart key proximity unlock",
      ],
    },
    "HTK (O)": {
      comfort: ["Dual pane panoramic sunroof"],
    },
    HTX: {
      interior: [
        "Smoky Black leatherette upholstery",
        "Front ventilated seats (automatic only)",
        "Dual-tone leatherette-wrapped steering wheel",
      ],
      comfort: ["Smartphone wireless charger"],
      entertainment: [
        "12.3-inch HD touchscreen infotainment",
        "Bose premium 8-speaker sound system",
        "64-colour ambient mood lighting",
        "OTA software updates with Kia remote diagnostics",
      ],
      convenience: [
        "Dual-zone automatic temperature control",
        "12.7 cm (5-inch) climate control display",
      ],
    },
    "HTX (A)": {
      interior: ["31.24 cm (12.3-inch) HD digital instrument cluster"],
      convenience: [
        "Side parking sensors (2 per side)",
        "Smart cruise control with stop & go (automatic only)",
      ],
      adas: [
        "Kia ADAS Level 2 with 21 autonomous features",
        "360-degree camera",
        "Blind-view monitor in instrument cluster",
      ],
    },
  },
  branches: {
    GTX: {
      fromTrim: "HTX",
      trimOrder: ["GTX", "GTX (A)"],
      trimAdditions: {
        GTX: {
          exterior: [
            "Ice Cube LED projection headlamps with dynamic welcome",
            "Star Map LED DRLs with integrated turn signal",
            "Digital Tiger Face grille with dark gunmetal accents",
            "R18 (46.20 cm) sporty crystal-cut alloy wheels",
          ],
          interior: [
            "10-way power driver seat with power lumbar adjust",
            "Integrated memory system (driver seat)",
            "GT Line sporty interior accents",
          ],
        },
        "GTX (A)": {
          interior: ["31.24 cm (12.3-inch) HD digital instrument cluster"],
          adas: [
            "Kia ADAS Level 2 with 21 autonomous features",
            "360-degree camera",
            "Blind-view monitor in instrument cluster",
            "OTA software updates with Kia remote diagnostics",
          ],
          convenience: ["Integrated memory system (driver seat)"],
        },
      },
    },
    "X-Line": {
      fromTrim: "HTX",
      trimOrder: ["X-Line", "X-Line (A)"],
      trimAdditions: {
        "X-Line": {
          exterior: [
            "Ice Cube LED projection headlamps with dynamic welcome",
            "Star Map LED DRLs with integrated turn signal",
            "Digital Tiger Face grille with dark gunmetal accents",
            "R18 (46.20 cm) black painted alloy wheels",
          ],
          interior: [
            "Smoky Black & Hunter Green two-tone interiors",
            "Satin metal interior accents",
            "10-way power driver seat with power lumbar adjust",
          ],
        },
        "X-Line (A)": {
          interior: ["31.24 cm (12.3-inch) HD digital instrument cluster"],
          adas: [
            "Kia ADAS Level 2 with 21 autonomous features",
            "360-degree camera",
            "Blind-view monitor in instrument cluster",
            "OTA software updates with Kia remote diagnostics",
          ],
          convenience: ["Integrated memory system (driver seat)"],
        },
      },
    },
  },
};
