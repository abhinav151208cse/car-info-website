import EmiCalculator from "@/components/EmiCalculator";
import Link from "next/link";

export const metadata = {
  title: "EMI Calculator — AutoVerse",
  description:
    "Calculate car loan EMI for India — monthly payment, total interest, and amortization schedule.",
};

export default function EmiCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-28">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          ← Back to home
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Car loan EMI calculator
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Plan your budget with an estimated monthly EMI. Pick a variant from our
          catalog or enter your own on-road price, down payment, rate, and tenure.
        </p>
        <EmiCalculator />
      </div>
    </main>
  );
}
