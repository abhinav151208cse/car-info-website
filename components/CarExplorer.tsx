"use client";

import CarSelector from "@/components/CarSelector";
import { useEffect } from "react";

export default function CarExplorer() {
  useEffect(() => {
    if (window.location.hash === "#cars") {
      document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section id="cars" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-slate-900">Browse cars</h2>
      <p className="mt-2 max-w-2xl text-slate-600">
        Choose a brand and model to see a quick preview. Open the full page for
        all variants, dimensions, and feature lists.
      </p>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <CarSelector
          showVariant={false}
          showPreview
          showViewButton
          idPrefix="home"
        />
      </div>
    </section>
  );
}
