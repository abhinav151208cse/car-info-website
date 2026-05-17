import CarDetail from "@/components/CarDetail";
import { getAllCarSlugs, getCarBySlug } from "@/lib/cars";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCarSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return { title: "Car not found" };
  return {
    title: `${car.name} ${car.modelYear} — Specs & Variants | CarInfo`,
    description: car.summary,
  };
}

export default async function CarPage({ params }: Props) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-gray-100 text-slate-600">
          Loading…
        </div>
      }
    >
      <CarDetail car={car} />
    </Suspense>
  );
}
