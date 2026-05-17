import ContactSection from "@/components/ContactSection";
import Link from "next/link";

export const metadata = {
  title: "Contact — CarInfo",
  description: "Contact CarInfo for inquiries about cars and specifications.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100 pb-28">
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          ← Back to home
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Contact us
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Reach out for questions about models, variants, or this website.
        </p>
      </div>
      <ContactSection showHeading={false} />
    </main>
  );
}
