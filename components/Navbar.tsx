"use client";

import CarSelector from "@/components/CarSelector";
import { getBrands } from "@/lib/catalog-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useRef, useState } from "react";

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
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [mobileBrand, setMobileBrand] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);

  const brands = useMemo(() => getBrands(), []);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    setMenuOpen(false);
    setActiveBrand(null);

    if (!href.includes("#")) return;

    const targetPath = href.split("#")[0] || "/";
    if (pathname !== targetPath) return;

    e.preventDefault();
    scrollToHash(href);
    window.history.pushState(null, "", href);
  }

  function toggleBrand(brand: string) {
    setActiveBrand((current) => (current === brand ? null : brand));
    setMenuOpen(false);
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
              setActiveBrand(null);
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
              Car<span className="text-slate-500">Info</span>
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

        {/* Brand navigation — desktop */}
        <div className="hidden border-t border-slate-100 pb-2 pt-1 lg:block">
          <div className="flex flex-wrap items-center gap-1">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Brands
            </span>
            {brands.map((b) => (
              <button
                key={b.brand}
                type="button"
                onClick={() => toggleBrand(b.brand)}
                aria-expanded={activeBrand === b.brand}
                className={`rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
                  activeBrand === b.brand
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {b.brand}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Brand panel — model + variant (desktop) */}
      {activeBrand && (
        <div
          ref={panelRef}
          className="hidden border-t border-slate-200 bg-slate-50 lg:block"
        >
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                {activeBrand} — select model & variant
              </h2>
              <button
                type="button"
                onClick={() => setActiveBrand(null)}
                className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                aria-label="Close brand menu"
              >
                Close
              </button>
            </div>
            <CarSelector
              key={activeBrand}
              lockBrand={activeBrand}
              showVariant
              showPreview={false}
              showViewButton
              idPrefix={`nav-${activeBrand}`}
            />
          </div>
        </div>
      )}

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
                {b.brand}
              </option>
            ))}
          </select>
          {mobileBrand && (
            <CarSelector
              key={mobileBrand}
              lockBrand={mobileBrand}
              showVariant
              showPreview={false}
              showViewButton
              idPrefix="mobile-nav"
            />
          )}
        </div>
      </div>
    </header>
  );
}
