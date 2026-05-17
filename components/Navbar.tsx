"use client";

import { getBrands, getModelsByBrand } from "@/lib/catalog-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#cars", label: "Browse Cars" },
  { href: "/compare", label: "Compare" },
  { href: "/contact", label: "Contact" },
];

function scrollToHash(href: string) {
  const id = href.includes("#") ? href.split("#")[1] : null;
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [mobileBrand, setMobileBrand] = useState<string>("");

  const brands = useMemo(() => getBrands(), []);
  const hoveredModels = useMemo(
    () => (hoveredBrand ? getModelsByBrand(hoveredBrand) : []),
    [hoveredBrand],
  );
  const mobileModels = useMemo(
    () => (mobileBrand ? getModelsByBrand(mobileBrand) : []),
    [mobileBrand],
  );

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    setMenuOpen(false);
    setHoveredBrand(null);

    if (!href.includes("#")) return;

    const targetPath = href.split("#")[0] || "/";
    if (pathname !== targetPath) return;

    e.preventDefault();
    scrollToHash(href);
    window.history.pushState(null, "", href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between py-3">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 text-slate-900"
            onClick={() => {
              setMenuOpen(false);
              setHoveredBrand(null);
            }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white transition-colors group-hover:bg-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </span>
            <span className="text-lg font-bold tracking-tight">
              Auto<span className="text-slate-500">Verse</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Brand navigation — desktop (hover to show models) */}
        <div
          className="hidden lg:block"
          onMouseLeave={() => setHoveredBrand(null)}
        >
          <div className="border-t border-slate-100 pb-2 pt-1">
            <div className="flex flex-wrap items-center gap-1">
              <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Brands
              </span>
              {brands.map((b) => (
                <button
                  key={b.brand}
                  type="button"
                  onMouseEnter={() => setHoveredBrand(b.brand)}
                  onFocus={() => setHoveredBrand(b.brand)}
                  aria-expanded={hoveredBrand === b.brand}
                  aria-haspopup="true"
                  className={`rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
                    hoveredBrand === b.brand
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {b.brand}
                </button>
              ))}
            </div>
          </div>

          {hoveredBrand && hoveredModels.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 shadow-inner">
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <p className="mb-3 text-sm font-semibold text-slate-900">
                  {hoveredBrand}{" "}
                  <span className="font-normal text-slate-500">
                    — {hoveredModels.length} models (opens in new tab)
                  </span>
                </p>
                <ul className="grid max-h-64 gap-1 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {hoveredModels.map((model) => (
                    <li key={model.slug}>
                      <Link
                        href={`/cars/${model.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white hover:text-slate-900"
                      >
                        <span className="font-medium text-slate-800">
                          {model.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {model.priceRange}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-slate-200/80 bg-white lg:hidden ${
          menuOpen ? "max-h-[85vh] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
        } transition-all duration-300 ease-in-out`}
      >
        <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-slate-100 px-4 pb-4 pt-2 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Brands
          </p>
          <select
            value={mobileBrand}
            onChange={(e) => setMobileBrand(e.target.value)}
            className="mb-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900"
          >
            <option value="">Select brand</option>
            {brands.map((b) => (
              <option key={b.brand} value={b.brand}>
                {b.brand} ({b.count} models)
              </option>
            ))}
          </select>
          {mobileBrand && mobileModels.length > 0 && (
            <ul className="max-h-64 space-y-0.5 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
              {mobileModels.map((model) => (
                <li key={model.slug}>
                  <Link
                    href={`/cars/${model.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="font-medium text-slate-800">
                      {model.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {model.priceRange}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
