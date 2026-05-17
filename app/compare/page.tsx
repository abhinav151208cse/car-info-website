import CompareView from "@/components/CompareView";
import Link from "next/link";

export const metadata = {
  title: "Compare Cars — CarInfo",
  description:
    "Compare up to 3 car variants side by side — prices, specifications, and features.",
};

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-28">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/#cars"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          ← Back to all cars
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Compare cars
        </h1>
        <p className="mt-2 text-slate-600">
          Pick up to 3 variants and compare specifications, exterior, interior,
          entertainment, safety, and more.
        </p>
        <div className="mt-8">
          <CompareView />
        </div>
      </div>
    </main>
  );
}
