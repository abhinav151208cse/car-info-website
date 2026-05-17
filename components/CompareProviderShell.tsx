"use client";

import { CompareProvider } from "@/context/CompareContext";
import CompareBar from "@/components/CompareBar";

export default function CompareProviderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompareProvider>
      {children}
      <CompareBar />
    </CompareProvider>
  );
}
