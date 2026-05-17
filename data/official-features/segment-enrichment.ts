import type { CarVariant } from "@/lib/cars";
import type { CatalogSegment } from "@/data/catalog/model-registry";
import type { TrimFeaturePack } from "./types";

type SegmentProfile = {
  bodyStyle: string;
  seating: string;
  doors: string;
  standard: TrimFeaturePack;
};

const profiles: Record<CatalogSegment, SegmentProfile> = {
  hatch: {
    bodyStyle: "Hatchback",
    seating: "5 seats",
    doors: "5 doors",
    standard: {
      exterior: ["Compact footprint for city driving", "High-mounted tail lamps"],
      comfort: ["Fold-flat rear seat (variant dependent)", "Front power windows"],
      convenience: ["Compact turning circle", "Rear washer/wiper (variant dependent)"],
    },
  },
  sedan: {
    bodyStyle: "Sedan",
    seating: "5 seats",
    doors: "4 doors + boot",
    standard: {
      exterior: ["Three-box silhouette with dedicated boot", "Chrome accent trim (variant dependent)"],
      comfort: ["Rear armrest with cup holders (variant dependent)", "Boot lamp"],
      convenience: ["Large boot for luggage", "Cruise-friendly highway manners"],
    },
  },
  "suv-b": {
    bodyStyle: "Sub-compact SUV",
    seating: "5 seats",
    doors: "5 doors",
    standard: {
      exterior: ["Cladding & roof rails (variant dependent)", "Raised ground clearance vs hatchback"],
      comfort: ["Commanding driving position", "Split-fold rear seat"],
      convenience: ["Higher seating for ingress/egress"],
    },
  },
  "suv-c": {
    bodyStyle: "Mid-size SUV",
    seating: "5 seats (7-seat on select models)",
    doors: "5 doors",
    standard: {
      exterior: ["Bold SUV stance with skid plates (variant dependent)", "Roof rails"],
      comfort: ["Panoramic sunroof option on top trims", "Rear AC vents standard on most trims"],
      convenience: ["All-wheel-drive not offered / FWD (India spec, model dependent)"],
    },
  },
  "suv-d": {
    bodyStyle: "Full-size SUV",
    seating: "5–7 seats",
    doors: "5 doors",
    standard: {
      exterior: ["Full-size SUV proportions", "LED lighting signature (variant dependent)"],
      comfort: ["Three-row seating (variant dependent)", "Premium cabin materials on top trims"],
      convenience: ["Strong touring & towing capability (model dependent)"],
    },
  },
  muv: {
    bodyStyle: "MPV / MUV",
    seating: "6–8 seats",
    doors: "5 doors",
    standard: {
      exterior: ["Tall body for cabin space", "Sliding rear doors (model dependent)"],
      comfort: ["Multiple rows with flexible seating", "Rear AC vents for all rows (variant dependent)"],
      convenience: ["Family-focused storage & cup holders"],
    },
  },
  pickup: {
    bodyStyle: "Pickup / lifestyle truck",
    seating: "5 seats",
    doors: "4 doors",
    standard: {
      exterior: ["Open load bed", "Rugged cladding & skid plates"],
      comfort: ["Crew-cab seating", "4x4 hardware (variant dependent)"],
      convenience: ["High payload & towing ratings (model dependent)"],
    },
  },
  ev: {
    bodyStyle: "Electric vehicle",
    seating: "5 seats",
    doors: "5 doors",
    standard: {
      exterior: ["Aero-optimised EV body design", "Closed grille / EV design cues"],
      comfort: ["Regenerative braking with drive modes", "Battery preconditioning (app, variant dependent)"],
      convenience: [
        "CCS2 / AC charging support (model dependent)",
        "Single-speed reduction gear transmission",
      ],
    },
  },
  luxury: {
    bodyStyle: "Premium / luxury segment",
    seating: "5–7 seats",
    doors: "4–5 doors",
    standard: {
      exterior: ["Premium paint & lighting packages", "Large alloy wheel options"],
      comfort: ["Multi-zone climate control", "Premium leather upholstery"],
      convenience: ["Advanced NVH insulation", "Concierge connected services (variant dependent)"],
    },
  },
};

export function getSegmentSpecs(
  segment: CatalogSegment | string,
  variant: CarVariant
): { label: string; value: string }[] {
  const profile = profiles[segment as CatalogSegment] ?? profiles["suv-c"];
  const fuel = variant.fuelType.toLowerCase();
  const rows = [
    { label: "Body style", value: profile.bodyStyle },
    { label: "Seating capacity", value: profile.seating },
    { label: "Doors", value: profile.doors },
    { label: "Drivetrain layout", value: /4wd|awd|4x4/i.test(variant.driveType ?? "") ? "AWD / 4x4" : "Front-wheel drive (typical India spec)" },
  ];
  if (fuel.includes("electric")) {
    rows.push({ label: "Emission standard", value: "Zero tailpipe emissions (BEV)" });
  } else if (fuel.includes("cng")) {
    rows.push({ label: "Fuel option", value: "Petrol + CNG dual fuel" });
  } else {
    rows.push({ label: "Emission standard", value: "BS6 Phase 2 compliant" });
  }
  return rows;
}

export function getSegmentFeaturePack(
  segment: CatalogSegment | string
): TrimFeaturePack {
  const profile = profiles[segment as CatalogSegment] ?? profiles["suv-c"];
  return profile.standard;
}
