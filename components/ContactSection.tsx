export default function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-slate-200 bg-slate-900 text-white"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 id="contact-heading" className="text-2xl font-bold sm:text-3xl">
          Contact
        </h2>
        <p className="mt-2 text-slate-400">
          Get in touch for inquiries about our cars.
        </p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          <li className="rounded-xl bg-slate-800/60 p-5">
            <p className="text-sm font-medium text-slate-400">Name</p>
            <p className="mt-1 text-lg font-semibold">Abhinav Kumar Singh</p>
          </li>
          <li className="rounded-xl bg-slate-800/60 p-5">
            <p className="text-sm font-medium text-slate-400">Phone</p>
            <a
              href="tel:6260564666"
              className="mt-1 block text-lg font-semibold text-white transition-colors hover:text-slate-300"
            >
              6260564666
            </a>
          </li>
          <li className="rounded-xl bg-slate-800/60 p-5 sm:col-span-1">
            <p className="text-sm font-medium text-slate-400">Address</p>
            <p className="mt-1 text-lg font-semibold">
              Phase 1, Hinjewadi, Pune
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
