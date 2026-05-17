/**
 * 2026 model-year catalog (India).
 * Ex-showroom prices from v3cars.com (aligned with Kia / Hyundai / Tata / Skoda India), May 2026.
 */

import { tuplesToVariants } from "@/lib/build-variants";
import type { CarModel } from "@/lib/cars";
import {
  hyundaiCretaPrices,
  hyundaiVenuePrices,
  kiaSeltosPrices,
  skodaKylaqPrices,
  tataNexonPrices,
  tataPunchPrices,
} from "./official-prices";

const seltosDimensions = [
  { label: "Length", value: "4,460 mm" },
  { label: "Width", value: "1,830 mm" },
  { label: "Height", value: "1,635 mm" },
  { label: "Wheelbase", value: "2,690 mm" },
  { label: "Boot Space", value: "447 litres" },
  { label: "Ground Clearance", value: "200 mm" },
];

const cretaDimensions = [
  { label: "Length", value: "4,330 mm" },
  { label: "Width", value: "1,790 mm" },
  { label: "Height", value: "1,635 mm" },
  { label: "Wheelbase", value: "2,610 mm" },
  { label: "Boot Space", value: "433 litres" },
  { label: "Ground Clearance", value: "190 mm" },
];

const nexonDimensions = [
  { label: "Length", value: "3,995 mm" },
  { label: "Width", value: "1,804 mm" },
  { label: "Height", value: "1,620 mm" },
  { label: "Wheelbase", value: "2,498 mm" },
  { label: "Boot Space", value: "382 litres" },
  { label: "Ground Clearance", value: "208 mm" },
];

const punchDimensions = [
  { label: "Length", value: "3,876 mm" },
  { label: "Width", value: "1,742 mm" },
  { label: "Height", value: "1,615 mm" },
  { label: "Wheelbase", value: "2,445 mm" },
  { label: "Boot Space", value: "366 litres" },
  { label: "Ground Clearance", value: "193 mm" },
];

const venueDimensions = [
  { label: "Length", value: "3,995 mm" },
  { label: "Width", value: "1,800 mm" },
  { label: "Height", value: "1,665 mm" },
  { label: "Wheelbase", value: "2,520 mm" },
  { label: "Boot Space", value: "375 litres" },
  { label: "Ground Clearance", value: "190 mm" },
];

const kylaqDimensions = [
  { label: "Length", value: "3,995 mm" },
  { label: "Width", value: "1,783 mm" },
  { label: "Height", value: "1,619 mm" },
  { label: "Wheelbase", value: "2,566 mm" },
  { label: "Boot Space", value: "360 litres" },
  { label: "Ground Clearance", value: "189 mm" },
];

const catalog: CarModel[] = [
  {
    id: 1,
    slug: "kia-seltos",
    name: "Kia Seltos",
    brand: "Kia",
    modelYear: 2026,
    tagline: "Second-gen SUV on the global K3 platform",
    image: "/cars/seltos.jpeg",
    priceRange: "₹10.99 – ₹19.99 Lakh",
    summary:
      "The 2026 Kia Seltos is the all-new second generation with a 30-inch panoramic display, three engine options, and up to Level 2 ADAS on top trims. 40 variants across petrol, turbo-petrol and diesel.",
    dimensions: seltosDimensions,
    safety: [
      "5-star Bharat NCAP rating",
      "6 airbags (standard)",
      "ABS with EBD & ESC",
      "Hill-start assist",
      "Level 2 ADAS on HTX (A), GTX (A) & X-Line (A)",
    ],
    engines: [
      "1.5L NA Petrol — 115 PS / 144 Nm (6MT or CVT)",
      "1.5L Turbo Petrol — 160 PS / 253 Nm (6iMT or 7DCT)",
      "1.5L Diesel — 116 PS / 250 Nm (6MT or 6AT)",
    ],
    variants: tuplesToVariants(kiaSeltosPrices, "kia-seltos"),
  },
  {
    id: 2,
    slug: "hyundai-creta",
    name: "Hyundai Creta",
    brand: "Hyundai",
    modelYear: 2026,
    tagline: "India's best-selling mid-size SUV",
    image: "/cars/creta.jpeg",
    priceRange: "₹10.79 – ₹20.20 Lakh",
    summary:
      "The 2026 Hyundai Creta offers petrol, diesel and turbo-petrol powertrains with the new King trim line, panoramic sunroof on select variants, and Level 2 ADAS on top trims.",
    dimensions: cretaDimensions,
    safety: [
      "6 airbags (standard)",
      "ABS with EBD & ESC",
      "Hill-start assist",
      "ISOFIX child-seat mounts",
      "Level 2 ADAS on King & select SX(O) trims",
    ],
    engines: [
      "1.5L MPi Petrol — 115 PS / 144 Nm (6MT or IVT)",
      "1.5L U2 CRDi Diesel — 116 PS / 250 Nm (6MT or 6AT)",
      "1.5L Turbo GDi — 160 PS / 253 Nm (7DCT)",
    ],
    variants: tuplesToVariants(hyundaiCretaPrices, "hyundai-creta"),
  },
  {
    id: 3,
    slug: "tata-nexon",
    name: "Tata Nexon",
    brand: "Tata",
    modelYear: 2026,
    tagline: "5-star safety, petrol, diesel & CNG",
    image: "/cars/nexon.jpeg",
    priceRange: "₹7.37 – ₹14.32 Lakh",
    summary:
      "The Tata Nexon remains India's safest compact SUV with petrol, diesel, CNG and DCT options across Smart to Fearless Plus PS trims — 59 variant combinations listed.",
    dimensions: nexonDimensions,
    safety: [
      "5-star Bharat NCAP rating",
      "6 airbags (standard)",
      "ESP, hill-hold assist & ISOFIX",
      "ADAS on top Fearless Plus trims",
    ],
    engines: [
      "1.2L Revotron Turbo Petrol — 120 PS / 170 Nm (5MT, 6MT, AMT or 7DCT)",
      "1.5L Kryojet Turbo Diesel — 116 PS / 260 Nm (6MT or 6DCT)",
      "1.2L iCNG — 100 PS / 170 Nm (6MT)",
    ],
    variants: tuplesToVariants(tataNexonPrices, "tata-nexon"),
  },
  {
    id: 4,
    slug: "tata-punch",
    name: "Tata Punch",
    brand: "Tata",
    modelYear: 2026,
    tagline: "2026 facelift — 5-star Bharat NCAP micro-SUV",
    image: "/cars/punch.jpeg",
    priceRange: "₹5.65 – ₹10.60 Lakh",
    summary:
      "The 2026 Tata Punch facelift adds iTurbo petrol, updated styling, 360° camera on higher trims, and 6 airbags standard across all 26 variants.",
    dimensions: punchDimensions,
    safety: [
      "5-star Bharat NCAP (2026 facelift)",
      "6 airbags standard on all variants",
      "ESP, ABS with EBD, hill-hold assist",
      "360° surround-view camera (top trims)",
    ],
    engines: [
      "1.2L Revotron Petrol — 88 PS / 115 Nm (5MT or 5AMT)",
      "1.2L iCNG — 73 PS / 103 Nm (5MT or 5AMT)",
      "1.2L iTurbo — 120 PS / 170 Nm (6MT)",
    ],
    variants: tuplesToVariants(tataPunchPrices, "tata-punch"),
  },
  {
    id: 5,
    slug: "hyundai-venue",
    name: "Hyundai Venue",
    brand: "Hyundai",
    modelYear: 2026,
    tagline: "2026 HX generation — dual 12.3-inch displays",
    image: "/cars/venue.jpeg",
    priceRange: "₹8.00 – ₹15.69 Lakh",
    summary:
      "The all-new 2026 Hyundai Venue HX brings dual 12.3-inch curved displays, 5-star Bharat NCAP, petrol, turbo-petrol and diesel options across 27 variants.",
    dimensions: venueDimensions,
    safety: [
      "5-star Bharat NCAP rating",
      "6 airbags (standard)",
      "ABS with EBD & ESC",
      "Level 2 ADAS on HX10",
    ],
    engines: [
      "1.2L Kappa Petrol — 83 PS / 115 Nm (5MT)",
      "1.0L Turbo GDi — 120 PS / 172 Nm (6MT or 7DCT)",
      "1.5L U2 CRDi Diesel — 116 PS / 250 Nm (6MT or 6AT)",
    ],
    variants: tuplesToVariants(hyundaiVenuePrices, "hyundai-venue"),
  },
  {
    id: 6,
    slug: "skoda-kylaq",
    name: "Skoda Kylaq",
    brand: "Skoda",
    modelYear: 2026,
    tagline: "European engineering in a compact SUV",
    image: "/cars/kylaq.jpeg",
    priceRange: "₹7.59 – ₹12.99 Lakh",
    summary:
      "The Skoda Kylaq is Skoda's B2-SUV for India with a 1.0L TSI engine, sunroof from Signature trim, and 11 variants across manual and automatic.",
    dimensions: kylaqDimensions,
    safety: [
      "6 airbags (standard)",
      "ESP, ABS with EBD",
      "ISOFIX child-seat mounts",
      "Rear parking camera & sensors",
    ],
    engines: ["1.0L TSI Turbo Petrol — 116 PS / 178 Nm (6MT or 6AT)"],
    variants: tuplesToVariants(skodaKylaqPrices, "skoda-kylaq"),
  },
];

export default catalog;
