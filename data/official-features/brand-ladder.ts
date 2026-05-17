import type { CarFeatureConfig, TrimFeaturePack } from "./types";

function ladder(trims: Record<string, TrimFeaturePack>): CarFeatureConfig {
  return {
    standard: {
      safety: [
        "ABS with EBD",
        "Rear parking sensors (variant dependent)",
        "Speed-sensing auto door lock",
      ],
      convenience: [
        "Power-adjustable ORVMs",
        "12V power outlet",
        "USB charging ports",
      ],
    },
    trimOrder: Object.keys(trims),
    trimAdditions: trims,
  };
}

const kiaTrims: Record<string, TrimFeaturePack> = {
  HTE: {
    safety: ["6 airbags", "ESC", "Hill-start assist", "ISOFIX mounts"],
    exterior: ["LED DRLs", "Projector headlamps", "Body-coloured bumpers"],
    entertainment: ["Wireless Android Auto & Apple CarPlay", "Touchscreen infotainment"],
    comfort: ["Manual AC with rear vents", "Tilt & telescopic steering"],
  },
  HTK: {
    convenience: ["Smart key", "Push-button start", "Cruise control"],
    comfort: ["Rear centre armrest", "Height-adjustable driver seat"],
  },
  "HTK Plus": {
    exterior: ["Alloy wheels", "Roof rails"],
    comfort: ["Automatic climate control"],
    entertainment: ["Connected car app suite"],
  },
  HTX: {
    exterior: ["LED headlamps", "Electric ORVMs with fold"],
    comfort: ["Sunroof (trim dependent)", "Wireless charger"],
    entertainment: ["Premium audio upgrade"],
  },
  "GTX Plus": {
    safety: ["ADAS Level 2 pack (trim dependent)", "360° camera"],
    comfort: ["Ventilated front seats", "Powered driver seat"],
    adas: ["Lane keep assist", "Adaptive cruise control", "Blind-spot monitor"],
  },
};

const hyundaiTrims: Record<string, TrimFeaturePack> = {
  Era: { safety: ["6 airbags", "ABS", "ESC"], comfort: ["Manual AC"] },
  Magna: {
    entertainment: ["Touchscreen with Android Auto / CarPlay"],
    comfort: ["Rear AC vents", "Height-adjustable driver seat"],
  },
  Sportz: {
    exterior: ["Alloy wheels", "Roof rails (SUV models)"],
    convenience: ["Push-button start", "Smart key"],
  },
  Asta: {
    comfort: ["Automatic climate control", "Sunroof (model dependent)"],
    safety: ["ESP with hill assist", "Cornering lamps"],
  },
  SX: {
    safety: ["ADAS on supported variants", "Front parking sensors"],
    comfort: ["Dual-zone climate (model dependent)", "Wireless charging"],
    adas: ["Lane following assist", "Forward collision warning"],
  },
  HX2: {
    safety: ["6 airbags", "ESC", "TPMS"],
    entertainment: ["Connected touchscreen infotainment"],
  },
  HX4: {
    comfort: ["Panoramic sunroof (model dependent)", "Rear sunshade"],
    exterior: ["LED headlamps & connected DRLs"],
  },
  HX10: {
    safety: ["Level 2 ADAS suite"],
    adas: ["Highway drive assist", "Safe exit warning", "Surround view monitor"],
    comfort: ["Ventilated seats", "BOSE / premium audio (model dependent)"],
  },
};

const tataTrims: Record<string, TrimFeaturePack> = {
  Smart: {
    safety: ["6 airbags", "ESP", "ISOFIX", "Hill hold control"],
    entertainment: ["7\" / 10\" touchscreen (model dependent)"],
  },
  Pure: {
    convenience: ["Push-button start", "Smart key", "Cruise control"],
    comfort: ["Automatic climate control (model dependent)"],
  },
  Creative: {
    exterior: ["Alloy wheels", "Roof rails", "LED DRLs"],
    comfort: ["Sunroof (model dependent)", "Rear AC vents"],
  },
  Fearless: {
    safety: ["ADAS on top trims", "360° Surround View system"],
    adas: ["Lane keep assist", "Traffic sign recognition"],
  },
  Accomplished: {
    comfort: ["Ventilated seats", "Powered driver seat", "Air purifier (model dependent)"],
    entertainment: ["JBL / premium audio (model dependent)"],
  },
  Adventure: {
    exterior: ["Rugged cladding", "All-terrain modes (model dependent)"],
    comfort: ["Raised ground clearance tune"],
  },
};

const marutiTrims: Record<string, TrimFeaturePack> = {
  Sigma: {
    safety: ["ABS with EBD", "Dual airbags"],
    convenience: ["Power steering", "Remote keyless entry (model dependent)"],
  },
  Delta: {
    comfort: ["Front AC", "Rear power windows"],
    entertainment: ["SmartPlay / SmartPlay Pro system"],
  },
  Zeta: {
    exterior: ["Alloy wheels", "Fog lamps"],
    comfort: ["Automatic climate control (model dependent)"],
  },
  Alpha: {
    safety: ["ESP (model dependent)", "Hill hold assist"],
    comfort: ["Push-button start", "Cruise control"],
    entertainment: ["Connected car Suzuki Connect (model dependent)"],
  },
};

const skodaTrims: Record<string, TrimFeaturePack> = {
  Classic: {
    safety: ["6 airbags", "ESC", "Multi-collision brake"],
    entertainment: ["10.25\" touchscreen", "Wireless SmartLink"],
  },
  Signature: {
    comfort: ["Electric sunroof", "Automatic climate control"],
    exterior: ["Crystal LED headlamps (model dependent)"],
  },
  Prestige: {
    comfort: ["Ventilated seats", "Powered driver seat"],
    safety: ["Front & rear parking sensors", "Tyre pressure monitor"],
    adas: ["Driver fatigue alert", "Multi-collision brake assist"],
  },
};

const toyotaTrims: Record<string, TrimFeaturePack> = {
  E: { safety: ["ABS", "Dual airbags"], comfort: ["Manual AC"] },
  S: {
    entertainment: ["Touchscreen audio"],
    comfort: ["Rear AC vents", "Electric ORVMs"],
  },
  G: {
    exterior: ["Alloy wheels"],
    convenience: ["Push-button start", "Cruise control"],
  },
  V: {
    comfort: ["Leather upholstery", "Sunroof (model dependent)", "Powered seats"],
    safety: ["6 airbags & VSC (model dependent)"],
  },
};

const renaultTrims: Record<string, TrimFeaturePack> = {
  Authentic: {
    safety: ["6 airbags", "ESP", "Hill start assist"],
    entertainment: ["8\" Easy Link touchscreen"],
  },
  Evolution: {
    comfort: ["Automatic climate control"],
    convenience: ["Cruise control", "Steering controls"],
  },
  Techno: {
    exterior: ["LED Pure Vision headlamps", "Alloy wheels"],
    entertainment: ["Wireless Android Auto & CarPlay"],
  },
  Emotion: {
    convenience: ["Smart key", "Wireless charging"],
    comfort: ["Sunroof (model dependent)"],
  },
  Iconic: {
    safety: ["ADAS pack (select models)"],
    adas: ["Active emergency braking", "Lane departure warning"],
  },
};

const vwTrims: Record<string, TrimFeaturePack> = {
  Comfortline: {
    entertainment: ["Touchscreen infotainment", "App-Connect"],
    comfort: ["Automatic climate control"],
  },
  Highline: {
    exterior: ["Alloy wheels", "LED headlamps"],
    comfort: ["Cruise control", "Rain-sensing wipers"],
  },
  Topline: {
    comfort: ["Leather upholstery", "Electric sunroof", "Ambient lighting"],
    safety: ["ESC", "6 airbags", "Front & rear sensors"],
  },
};

const citroenTrims: Record<string, TrimFeaturePack> = {
  Live: {
    safety: ["ABS", "Dual airbags"],
    comfort: ["Manual AC with rear vents"],
  },
  Feel: {
    entertainment: ["10\" touchscreen", "Connected navigation"],
    comfort: ["Automatic climate control"],
  },
  Shine: {
    exterior: ["Alloy wheels", "LED DRLs"],
    comfort: ["Citroën Advanced Comfort suspension tuning"],
  },
  You: {
    comfort: ["Advanced Comfort seats", "Extra sound insulation"],
    convenience: ["Wireless smartphone charging"],
  },
  Plus: {
    entertainment: ["Connected car services", "Wireless mirroring"],
    convenience: ["Smart key", "Push-button start"],
  },
  Max: {
    safety: ["6 airbags", "ESP", "ISOFIX"],
    comfort: ["Panoramic sunroof (model dependent)", "Dual-zone AC"],
    exterior: ["Roof rails & skid plates (SUV models)"],
  },
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
