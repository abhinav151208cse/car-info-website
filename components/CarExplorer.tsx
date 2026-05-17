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
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
        Browse cars
      </h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-600 sm:text-xl">
        Choose a brand and model to see a quick preview. Open the full page for
        all variants, dimensions, and feature lists.
      </p>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-md sm:p-10 lg:p-12">
        <CarSelector
          showVariant={false}
          showPreview
          showViewButton
          idPrefix="home"
          size="large"
        />
      </div>
    </section>
  );
}
