import type { CarFeatureConfig } from "./types";

/** Tata Motors Punch 2026 facelift — official launch features */
export const tataPunchFeatures: CarFeatureConfig = {
  standard: {
    safety: [
      "5-star Bharat NCAP (all variants & powertrains)",
      "6 airbags standard",
      "ESP, ABS with EBD & traction control",
      "ISOFIX child-seat mounts",
    ],
    comfort: ["Multi-drive modes (Eco / City / Sport)"],
    convenience: ["Connected vehicle — iRA"],
  },
  trimOrder: [
    "Smart",
    "Pure",
    "Pure Plus",
    "Pure Plus S",
    "Adventure",
    "Adventure S",
    "Accomplished",
    "Accomplished Plus S",
  ],
  trimAdditions: {
    Smart: {
      exterior: ["LED DRLs", "R15 steel wheels", "Roof rails"],
      interior: ["Fabric upholstery"],
      entertainment: ["7-inch touchscreen"],
    },
    Pure: {
      exterior: ["R15 alloy wheels", "Body-coloured ORVMs"],
      entertainment: ["8-inch touchscreen"],
      comfort: ["Manual AC with heater"],
    },
    "Pure Plus": {
      entertainment: [
        "10.25-inch touchscreen",
        "Wireless Android Auto & Apple CarPlay",
      ],
      convenience: ["Push-button start"],
    },
    "Pure Plus S": {
      comfort: ["Automatic climate control"],
    },
    Adventure: {
      exterior: ["R16 alloy wheels", "Front fog lamps"],
      comfort: ["Cruise control"],
      convenience: ["Rear camera"],
    },
    "Adventure S": {
      exterior: ["Side cladding & skid plates (Adventure styling)"],
    },
    Accomplished: {
      comfort: ["Electric sunroof"],
      convenience: ["360° camera", "Blind-view monitor"],
    },
    "Accomplished Plus S": {
      entertainment: ["Galaxy ambient lighting"],
      interior: ["Premium interior trim & leatherette seats"],
      comfort: ["iTurbo 120 PS engine (turbo variants)"],
    },
  },
};
