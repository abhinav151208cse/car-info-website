/**
 * Full India catalog (May 2026).
 * Variant prices synced from v3cars.com (aligned with OEM ex-showroom).
 * Run: npm run sync:catalog && npm run build:catalog
 */

import catalogJson from "./full-catalog.json";
import type { CarModel } from "@/lib/cars";

const catalog = catalogJson as CarModel[];

export default catalog;
