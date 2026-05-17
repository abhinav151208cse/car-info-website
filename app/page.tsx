import CarGrid from "@/components/CarGrid";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100 pb-28">
      <div className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-4xl font-bold text-black sm:text-5xl">
          Car Details Website
        </h1>
        <p className="mb-6 text-slate-600">
          2026 model year — Seltos, Creta, Nexon, Punch, Venue & Kylaq
        </p>

        <section
          id="compare"
          className="mb-10 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-xl font-bold text-slate-900">Compare cars</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Add up to 3 variants from any model and compare prices,
            specifications, and features side by side — including exterior,
            interior, and entertainment.
          </p>
          <Link
            href="/compare"
            className="mt-4 inline-flex rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Open compare tool
          </Link>
        </section>

        <CarGrid />
      </div>

      <ContactSection />
    </main>
  );
}
