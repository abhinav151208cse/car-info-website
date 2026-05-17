import ContactSection from "@/components/ContactSection";
import { getAllCars } from "@/lib/cars";
import Link from "next/link";

export default function Home() {
  const cars = getAllCars();

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <div className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-4xl font-bold text-black sm:text-5xl">
          Car Details Website
        </h1>
        <p className="mb-10 text-slate-600">
          2026 model year — Kia Seltos, Hyundai Creta & Tata Nexon
        </p>

        <div id="cars" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <article
              key={car.id}
              className="overflow-hidden rounded-xl bg-white text-black shadow"
            >
              <img
                src={car.image}
                alt={car.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <Link
                  href={`/cars/${car.slug}`}
                  className="text-2xl font-semibold text-slate-900 transition-colors hover:text-slate-600"
                >
                  {car.name}
                </Link>

                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                  2026 Model Year
                </p>

                <p className="mt-3">Price: {car.price}</p>
                <p>Mileage: {car.mileage}</p>
                <p>Fuel Type: {car.fuel}</p>

                <Link
                  href={`/cars/${car.slug}`}
                  className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                >
                  View specs & variants
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ContactSection />
    </main>
  );
}
