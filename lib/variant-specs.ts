import type { CarModel, CarSpec, CarVariant } from "@/lib/cars";

/**
 * Builds the complete spec list for one variant. Every powertrain value is taken
 * directly from the selected variant record (set via powertrain key at catalog build).
 */
export function buildFullVariantSpecs(
  variant: CarVariant,
  car: CarModel
): CarSpec[] {
  const rows: CarSpec[] = [
    { label: "Variant", value: variant.name },
    { label: "Trim", value: variant.trim },
    { label: "Ex-showroom price", value: variant.price },
    { label: "Price basis", value: "Ex-showroom, India" },
    { label: "Model", value: `${car.brand} ${car.name}` },
    { label: "Model year", value: String(car.modelYear) },
    { label: "Engine", value: variant.engine },
    { label: "Transmission", value: variant.transmission },
    { label: "Fuel type", value: variant.fuelType },
    { label: "Max power", value: variant.power },
    { label: "Max torque", value: variant.torque },
    { label: "Mileage (ARAI)", value: variant.mileage },
    ...car.dimensions,
  ];

  return dedupeSpecsByLabel(rows);
}

function dedupeSpecsByLabel(specs: CarSpec[]): CarSpec[] {
  const seen = new Set<string>();
  const result: CarSpec[] = [];
  for (const spec of specs) {
    const key = spec.label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(spec);
  }
  return result;
}
