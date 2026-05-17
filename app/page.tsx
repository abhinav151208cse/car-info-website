import CarExplorer from "@/components/CarExplorer";
import AutoBackground from "@/components/AutoBackground";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden pb-28">
      <AutoBackground />
      <div className="relative z-10 mx-auto max-w-7xl flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <CarExplorer />
      </div>
    </main>
  );
}
