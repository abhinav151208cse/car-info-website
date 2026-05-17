import type { CarFeatureConfig, TrimFeaturePack } from "./types";

function ladder(trims: Record<string, TrimFeaturePack>): CarFeatureConfig {
  return {
    standard: {
      safety: ["Refer to official variant brochure for exact equipment"],
    },
    trimOrder: Object.keys(trims),
    trimAdditions: trims,
  };
}

const kiaTrims: Record<string, TrimFeaturePack> = {
  HTE: {
    safety: ["6 airbags", "ABS with EBD", "ESC", "Hill-start assist"],
    exterior: ["LED DRLs", "Projector headlamps"],
    entertainment: ["Wireless Android Auto & Apple CarPlay"],
    comfort: ["Manual AC with rear vents"],
  },
  HTK: { convenience: ["Smart key", "Push-button start"], comfort: ["Cruise control"] },
  "HTK Plus": { exterior: ["Alloy wheels"], comfort: ["Automatic climate control"] },
  HTX: {
    exterior: ["LED headlamps"],
    comfort: ["Sunroof (trim dependent)", "Wireless charger"],
  },
  "GTX Plus": {
    safety: ["ADAS pack (trim dependent)"],
    comfort: ["Ventilated seats", "Powered driver seat"],
    convenience: ["360° camera"],
  },
};

const hyundaiTrims: Record<string, TrimFeaturePack> = {
  Era: { safety: ["6 airbags", "ABS", "ESC"] },
  Magna: { comfort: ["AC", "Rear AC vents"] },
  Sportz: { entertainment: ["Touchscreen with connectivity"] },
  Asta: { exterior: ["Alloy wheels"], comfort: ["Automatic climate control"] },
  SX: { safety: ["ADAS on supported variants"], comfort: ["Dual-zone AC"] },
  HX2: { safety: ["6 airbags", "ESC"], entertainment: ["Touchscreen"] },
  HX4: { comfort: ["Sunroof (model dependent)"] },
  HX10: { safety: ["Level 2 ADAS (supported variants)"] },
};

const tataTrims: Record<string, TrimFeaturePack> = {
  Smart: { safety: ["6 airbags", "ESP", "ISOFIX"] },
  Pure: { entertainment: ["Touchscreen"], convenience: ["Push-button start"] },
  Creative: { comfort: ["Automatic climate control", "Sunroof (model dependent)"] },
  Fearless: { safety: ["ADAS on top trims"], convenience: ["360° camera"] },
  Accomplished: { comfort: ["Ventilated seats", "Premium audio"] },
  Adventure: { exterior: ["Rugged cladding"], comfort: ["Raised ground clearance"] },
};

const marutiTrims: Record<string, TrimFeaturePack> = {
  Sigma: { safety: ["ABS with EBD"], convenience: ["Power steering"] },
  Delta: { comfort: ["AC"], entertainment: ["SmartPlay (model dependent)"] },
  Zeta: { exterior: ["Alloy wheels"] },
  Alpha: { comfort: ["Automatic climate control"], safety: ["ESP (model dependent)"] },
};

const skodaTrims: Record<string, TrimFeaturePack> = {
  Classic: { safety: ["6 airbags"], entertainment: ["10.25-inch touchscreen"] },
  Signature: { comfort: ["Sunroof", "Automatic climate control"] },
  Prestige: { comfort: ["Ventilated seats"], safety: ["Advanced driver assistance"] },
};

const toyotaTrims: Record<string, TrimFeaturePack> = {
  E: { safety: ["ABS", "Airbags"] },
  S: { comfort: ["AC"], entertainment: ["Touchscreen"] },
  G: { exterior: ["Alloy wheels"], comfort: ["Cruise control"] },
  V: { comfort: ["Premium upholstery", "Sunroof (model dependent)"] },
};

const renaultTrims: Record<string, TrimFeaturePack> = {
  Authentic: { safety: ["6 airbags", "ESP"] },
  Evolution: { entertainment: ["Touchscreen infotainment"] },
  Techno: { comfort: ["Automatic climate control"] },
  Emotion: { convenience: ["Push-button start", "Wireless charging"] },
  Iconic: { safety: ["ADAS (select models)"] },
};

const vwTrims: Record<string, TrimFeaturePack> = {
  Comfortline: { entertainment: ["Touchscreen infotainment"] },
  Highline: { comfort: ["Automatic climate control"] },
  Topline: { comfort: ["Premium upholstery", "Sunroof"] },
};

const citroenTrims: Record<string, TrimFeaturePack> = {
  Live: { safety: ["ABS", "Airbags"] },
  Feel: { entertainment: ["Touchscreen"], comfort: ["Automatic AC"] },
  Shine: { exterior: ["Alloy wheels"] },
  You: { comfort: ["Citroën Advanced Comfort seats"] },
  Plus: { convenience: ["Connected car features"] },
  Max: { safety: ["Top safety kit"], comfort: ["Full convenience pack"] },
};

export const brandLadders: Record<string, CarFeatureConfig> = {
  kia: ladder(kiaTrims),
  hyundai: ladder(hyundaiTrims),
  tata: ladder(tataTrims),
  maruti: ladder(marutiTrims),
  skoda: ladder(skodaTrims),
  toyota: ladder(toyotaTrims),
  renault: ladder(renaultTrims),
  volkswagen: ladder(vwTrims),
  citroen: ladder(citroenTrims),
};

export function brandKeyFromSlug(carSlug: string): string | null {
  if (carSlug.startsWith("kia-")) return "kia";
  if (carSlug.startsWith("hyundai-")) return "hyundai";
  if (carSlug.startsWith("tata-")) return "tata";
  if (carSlug.startsWith("maruti-")) return "maruti";
  if (carSlug.startsWith("skoda-")) return "skoda";
  if (carSlug.startsWith("toyota-")) return "toyota";
  if (carSlug.startsWith("renault-")) return "renault";
  if (carSlug.startsWith("volkswagen-")) return "volkswagen";
  if (carSlug.startsWith("citroen-")) return "citroen";
  return null;
}
