import type { CarModel, CarSpec, CarVariant } from "@/lib/cars";
import { getSegmentSpecs } from "@/data/official-features/segment-enrichment";
import { formatVariantDisplayName } from "@/lib/variant-label";

export type SpecGroup = {
  id: string;
  title: string;
  specs: CarSpec[];
};

function dedupeSpecsByLabel(specs: CarSpec[]): CarSpec[] {
  const seen = new Set<string>();
  const result: CarSpec[] = [];
  for (const spec of specs) {
    const key = spec.label.toLowerCase();
    if (seen.has(key) || !spec.value || spec.value === "—") continue;
    seen.add(key);
    result.push(spec);
  }
  return result;
}

/** Core variant + model spec groups for detail pages */
export function buildVariantSpecGroups(
  variant: CarVariant,
  car: CarModel
): SpecGroup[] {
  const segment = car.segment ?? "suv-c";

  const pricing: CarSpec[] = [
    { label: "Variant", value: formatVariantDisplayName(car, variant) },
    { label: "Trim", value: variant.trim },
    { label: "Ex-showroom price", value: variant.price },
    { label: "Price basis", value: "Ex-showroom, India" },
    { label: "Model", value: `${car.brand} ${car.name}` },
    { label: "Model year", value: String(car.modelYear) },
  ];

  const powertrain: CarSpec[] = [
    { label: "Engine / battery", value: variant.engine },
    { label: "Cylinders", value: variant.cylinders ?? "" },
    { label: "Fuel type", value: variant.fuelType },
    { label: "Transmission", value: variant.transmission },
    { label: "Drive type", value: variant.driveType ?? "" },
    { label: "Max power", value: variant.power },
    { label: "Max torque", value: variant.torque },
    { label: "Power-to-weight", value: variant.powerWeight ?? "" },
    { label: "Torque-to-weight", value: variant.torqueWeight ?? "" },
  ];

  const efficiency: CarSpec[] = [
    { label: "Mileage / range (ARAI)", value: variant.mileage },
    { label: "Real-world mileage / range", value: variant.realWorldMileage ?? "" },
  ];

  const dimensions: CarSpec[] = [
    ...getSegmentSpecs(segment, variant),
    { label: "Kerb weight", value: variant.kerbWeight ?? "" },
    ...car.dimensions,
  ];

  return [
    { id: "pricing", title: "Pricing & identity", specs: dedupeSpecsByLabel(pricing) },
    {
      id: "powertrain",
      title: "Engine & performance",
      specs: dedupeSpecsByLabel(powertrain),
    },
    {
      id: "efficiency",
      title: "Efficiency",
      specs: dedupeSpecsByLabel(efficiency),
    },
    {
      id: "dimensions",
      title: "Dimensions & body",
      specs: dedupeSpecsByLabel(dimensions),
    },
  ].filter((g) => g.specs.length > 0);
}

/** Flat list (compare tool, legacy) */
export function buildFullVariantSpecs(
  variant: CarVariant,
  car: CarModel
): CarSpec[] {
  return buildVariantSpecGroups(variant, car).flatMap((g) => g.specs);
}
