import { powertrains } from "@/lib/powertrains";
import { rowToVariant, type VariantRow } from "@/lib/variant-helpers";
import type { CarVariant } from "@/lib/cars";

/** [id, trim, nameSuffix, priceLakh, powertrainKey] */
export type PriceTuple = [string, string, string, number, string];

export function tuplesToVariants(
  tuples: PriceTuple[],
  carSlug: string
): CarVariant[] {
  const rows: VariantRow[] = tuples.map(([id, trim, name, priceLakh, ptKey]) => {
    const pt = powertrains[ptKey];
    if (!pt) throw new Error(`Unknown powertrain: ${ptKey} for ${id}`);
    return {
      id,
      trim,
      name,
      priceLakh,
      fuelType: pt.fuelType,
      engine: pt.engine,
      transmission: pt.transmission,
      power: pt.power,
      torque: pt.torque,
      mileage: pt.mileage,
    };
  });
  return rows.map((row) => rowToVariant(row, carSlug));
}
