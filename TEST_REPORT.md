# AutoVerse — Unit Test Report

**Date:** 17 May 2026  
**Project:** car-info-website (AutoVerse)  
**Runner:** Vitest 4.x + React Testing Library + jsdom  
**Command:** `npm run test:coverage`

---

## Executive summary

| Metric | Result |
|--------|--------|
| **Test files** | 6 passed |
| **Tests** | **29 passed**, 0 failed |
| **Duration** | ~2s |
| **Overall line coverage** | **42.32%** |

Unit tests were added for core business logic (variant naming, compare, catalog navigation, feature resolution, spec grouping) and the searchable variant dropdown component. UI pages and layout components are not yet covered (typical for a first testing pass focused on logic).

---

## Test suites

### 1. `__tests__/variant-label.test.ts` (7 tests) — **PASS**

| Test | Purpose |
|------|---------|
| CVT → IVT mapping | Ensures Kia-style transmission labels |
| DCT / TC labels | Transmission shorthand |
| HTX IVT vs DCT names | **Regression:** duplicate trim names are distinguishable |
| Unique select options | No duplicate dropdown labels |
| Search keywords | Filter metadata includes powertrain |
| Price in label | Option label format |

### 2. `__tests__/compare.test.ts` (7 tests) — **PASS**

| Test | Purpose |
|------|---------|
| `compareEntryKey` | Stable compare slot keys |
| `parseCompareEntryKey` | Round-trip parse |
| Invalid key handling | Returns `null` |
| `resolveCompareColumn` | Real catalog (Kia Seltos) |
| Unknown car | Returns `null` |
| `buildCompareTable` | Up to 3 columns |
| Feature rows | Compare matrix has features |

### 3. `__tests__/catalog-nav.test.ts` (4 tests) — **PASS**

| Test | Purpose |
|------|---------|
| Brand list | Alphabetical, non-empty counts |
| Models by brand | Kia includes Seltos |
| Load by slug | 80+ variants on Seltos |
| `variantLabel` | Multiple distinct HTX labels |

### 4. `__tests__/resolver.test.ts` (6 tests) — **PASS**

| Test | Purpose |
|------|---------|
| CVT / MT / AMT detection | Transmission classification |
| Trim normalization | Cosmetic suffix stripping |
| Seltos official features | Full feature config |
| Sonet brand ladder | Fallback for non-detailed models |

### 5. `__tests__/variant-specs.test.ts` (2 tests) — **PASS**

| Test | Purpose |
|------|---------|
| Spec groups | pricing, powertrain, efficiency, dimensions |
| Powertrain fields | Power, transmission present |

### 6. `__tests__/SearchableSelect.test.tsx` (3 tests) — **PASS**

| Test | Purpose |
|------|---------|
| Trigger shows selection | Renders current variant |
| Search filter | Typing "DCT" hides non-matches |
| `onChange` | Selecting option fires callback |

---

## Coverage by area

| Area | Line coverage | Notes |
|------|---------------|--------|
| `lib/variant-label.ts` | 80% | Core naming logic well covered |
| `lib/compare.ts` | 90% | Compare flow well covered |
| `lib/catalog-nav.ts` | 87% | Navigation helpers covered |
| `lib/variant-specs.ts` | 94% | Spec grouping covered |
| `data/official-features/resolver.ts` | 77% | Feature resolution partially covered |
| `components/SearchableSelect.tsx` | 84% | Search dropdown covered |
| **Pages & layout** | 0% | Not in scope yet (CarDetail, Navbar, etc.) |

---

## What is tested vs not tested

### Covered

- Variant display names (IVT vs DCT disambiguation)
- Compare entry keys and table building
- Catalog brand/model/variant APIs
- Official + ladder feature resolution
- Searchable variant dropdown (filter + select)

### Not covered (recommended next)

- E2E / integration: Next.js routes (`/`, `/cars/[slug]`, `/compare`, `/contact`)
- `CompareContext` + localStorage persistence
- `AddToCompareButton`, `CompareBar`, `Navbar` brand hover menu
- Image fallback handler
- Catalog build scripts (`scripts/*.mjs`)
- Full `CarDetail` variant switch + URL `?variant=` sync

---

## How to run tests locally

```bash
# Run all tests once
npm test

# Watch mode during development
npm run test:watch

# With coverage (HTML report in coverage/)
npm run test:coverage
```

Open `coverage/index.html` in a browser for the interactive coverage report.

---

## Conclusion

All **29 unit tests pass**. Core data and compare logic behave as expected against the live catalog (82 models). The highest-value regression guard is **variant name disambiguation** (e.g. Seltos HTX IVT vs 7-speed DCT).

**Recommendation:** Add Playwright or Cypress smoke tests for critical user paths (home → car detail → compare) before production releases.
