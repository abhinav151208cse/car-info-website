import catalog from "@/data/cars-catalog";

export type CarSpec = { label: string; value: string };

export type CarVariant = {
  id: string;
  name: string;
  trim: string;
  price: string;
  engine: string;
  transmission: string;
  fuelType: string;
  power: string;
  torque: string;
  mileage: string;
  cylinders?: string;
  kerbWeight?: string;
  powerWeight?: string;
  torqueWeight?: string;
  realWorldMileage?: string;
  driveType?: string;
  specs: CarSpec[];
  features: string[];
};

export type CarModel = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  segment?: string;
  modelYear: number;
  tagline: string;
  image: string;
  priceRange: string;
  summary: string;
  dimensions: CarSpec[];
  safety: string[];
  engines: string[];
  variants: CarVariant[];
};

export type CarSummary = {
  id: number;
  slug: string;
  name: string;
  price: string;
  mileage: string;
  fuel: string;
  image: string;
};

export const carsCatalog = catalog as CarModel[];

export function getAllCars(): CarSummary[] {
  return carsCatalog.map((car) => ({
    id: car.id,
    slug: car.slug,
    name: car.name,
    price: car.priceRange,
    mileage: car.variants[0]?.mileage ?? "—",
    fuel: car.variants[0]?.fuelType ?? "—",
    image: car.image,
  }));
}

export function getCarBySlug(slug: string): CarModel | undefined {
  return carsCatalog.find((car) => car.slug === slug);
}

export function getAllCarSlugs(): string[] {
  return carsCatalog.map((car) => car.slug);
}
