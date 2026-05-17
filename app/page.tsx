import CarExplorer from "@/components/CarExplorer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100 pb-28">
      <div className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-4xl font-bold text-black sm:text-5xl">
          Car Details Website
        </h1>
        <p className="mb-6 text-slate-600">
          2026 model year — Kia, Tata, Hyundai, Maruti Suzuki, Skoda, Toyota,
          Renault, Volkswagen & Citroën (ex-showroom prices from official
          sources via v3cars.com, May 2026)
        </p>

        <CarExplorer />
      </div>
    </main>
  );
}
