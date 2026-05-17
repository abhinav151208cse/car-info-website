/**
 * On-sale India passenger models (May 2026).
 * Prices synced from v3cars.com (aligned with OEM ex-showroom).
 * Images: official brand media CDN — downloaded to /public/cars by sync script.
 */

export type CatalogSegment =
  | "hatch"
  | "sedan"
  | "suv-b"
  | "suv-c"
  | "suv-d"
  | "muv"
  | "pickup"
  | "ev"
  | "luxury";

export type ModelRegistryEntry = {
  slug: string;
  name: string;
  brand: string;
  v3Path: string;
  segment: CatalogSegment;
  tagline: string;
  summary: string;
  /** Official OEM hero image (India site / CDN) */
  imageUrl: string;
  safety?: string[];
};

export const modelRegistry: ModelRegistryEntry[] = [
  // —— Kia ——
  {
    slug: "kia-seltos",
    name: "Kia Seltos",
    brand: "Kia",
    v3Path: "kia-cars/seltos",
    segment: "suv-c",
    tagline: "Second-gen SUV on the global K3 platform",
    summary:
      "Mid-size SUV with petrol, turbo-petrol and diesel options, Level 2 ADAS on top trims, and dual 12.3-inch displays.",
    imageUrl:
      "https://www.kia.com/content/dam/kia2/in/en/images/showroom/2024/seltos/seltos-ice-hero-pc.jpg",
    safety: ["6 airbags standard", "5-star Bharat NCAP (2023)", "Level 2 ADAS on GTX+ trims"],
  },
  {
    slug: "kia-sonet",
    name: "Kia Sonet",
    brand: "Kia",
    v3Path: "kia-cars/sonet",
    segment: "suv-b",
    tagline: "Feature-rich sub-4 metre SUV",
    summary: "Compact SUV with turbo-petrol, NA petrol and diesel powertrains and connected-car tech.",
    imageUrl:
      "https://www.kia.com/content/dam/kia2/in/en/images/showroom/2024/sonet/sonet-ice-hero-pc.jpg",
    safety: ["6 airbags standard", "ESP with hill-assist", "ISOFIX child-seat mounts"],
  },
  {
    slug: "kia-syros",
    name: "Kia Syros",
    brand: "Kia",
    v3Path: "kia-cars/syros",
    segment: "suv-b",
    tagline: "Premium sub-4m SUV with captain seats",
    summary: "New B2 SUV with ventilated captain seats and multiple turbo-petrol and diesel options.",
    imageUrl:
      "https://www.kia.com/content/dam/kia2/in/en/images/showroom/2025/syros/syros-hero-pc.jpg",
  },
  {
    slug: "kia-carens",
    name: "Kia Carens",
    brand: "Kia",
    v3Path: "kia-cars/carens",
    segment: "muv",
    tagline: "6/7-seater family MPV",
    summary: "Three-row MPV with petrol, diesel and turbo-petrol engines and premium cabin features.",
    imageUrl:
      "https://www.kia.com/content/dam/kia2/in/en/images/showroom/carens/carens-hero-pc.jpg",
  },
  {
    slug: "kia-carnival",
    name: "Kia Carnival",
    brand: "Kia",
    v3Path: "kia-cars/carnival",
    segment: "muv",
    tagline: "Premium 7/8-seater MPV",
    summary: "Flagship MPV with diesel power, lounge seating and extensive comfort tech.",
    imageUrl:
      "https://www.kia.com/content/dam/kia2/in/en/images/showroom/carnival/carnival-hero-pc.jpg",
  },
  {
    slug: "kia-ev6",
    name: "Kia EV6",
    brand: "Kia",
    v3Path: "kia-cars/ev6",
    segment: "ev",
    tagline: "Electric crossover on E-GMP",
    summary: "Premium EV with ultra-fast charging and long-range battery options.",
    imageUrl:
      "https://www.kia.com/content/dam/kia2/in/en/images/showroom/ev6/ev6-hero-pc.jpg",
  },
  {
    slug: "kia-ev9",
    name: "Kia EV9",
    brand: "Kia",
    v3Path: "kia-cars/ev9",
    segment: "ev",
    tagline: "Three-row electric flagship SUV",
    summary: "Large electric SUV with 6/7-seat layouts and advanced driver assistance.",
    imageUrl:
      "https://www.kia.com/content/dam/kia2/in/en/images/showroom/ev9/ev9-hero-pc.jpg",
  },
  {
    slug: "kia-carens-clavis-ev",
    name: "Kia Carens Clavis EV",
    brand: "Kia",
    v3Path: "kia-cars/carens-clavis-ev",
    segment: "ev",
    tagline: "Electric 7-seater MPV",
    summary: "Battery-electric MPV based on the Carens Clavis platform.",
    imageUrl:
      "https://www.kia.com/content/dam/kia2/in/en/images/showroom/2025/carens-clavis-ev/clavis-ev-hero-pc.jpg",
  },

  // —— Tata ——
  {
    slug: "tata-punch",
    name: "Tata Punch",
    brand: "Tata",
    v3Path: "tata-cars/punch",
    segment: "suv-b",
    tagline: "India's safest micro-SUV",
    summary: "Sub-4m SUV with strong safety ratings, petrol, CNG and electric powertrains.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/punch/punch-ice/hero-banner/punch-hero-desktop.jpg",
  },
  {
    slug: "tata-nexon",
    name: "Tata Nexon",
    brand: "Tata",
    v3Path: "tata-cars/nexon",
    segment: "suv-b",
    tagline: "5-star safety compact SUV",
    summary: "Best-selling compact SUV with petrol, diesel, CNG and EV options.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/nexon/nexon-ice/hero/nexon-hero-desktop.jpg",
  },
  {
    slug: "tata-tiago",
    name: "Tata Tiago",
    brand: "Tata",
    v3Path: "tata-cars/tiago",
    segment: "hatch",
    tagline: "Affordable city hatchback",
    summary: "Entry hatch with petrol and CNG, strong safety and connected features.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/tiago/tiago-ice/hero/tiago-hero-desktop.jpg",
  },
  {
    slug: "tata-altroz",
    name: "Tata Altroz",
    brand: "Tata",
    v3Path: "tata-cars/altroz",
    segment: "hatch",
    tagline: "Premium hatchback",
    summary: "5-star rated hatch with turbo-petrol and diesel engines.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/altroz/altroz-ice/hero/altroz-hero-desktop.jpg",
  },
  {
    slug: "tata-tigor",
    name: "Tata Tigor",
    brand: "Tata",
    v3Path: "tata-cars/tigor",
    segment: "sedan",
    tagline: "Compact sedan with coupe roofline",
    summary: "Sub-4m sedan available in petrol, CNG and EV.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/tigor/tigor-ice/hero/tigor-hero-desktop.jpg",
  },
  {
    slug: "tata-harrier",
    name: "Tata Harrier",
    brand: "Tata",
    v3Path: "tata-cars/harrier",
    segment: "suv-d",
    tagline: "Landmark-based SUV",
    summary: "5-seat SUV with diesel power and premium cabin.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/harrier/harrier-ice/hero/harrier-hero-desktop.jpg",
  },
  {
    slug: "tata-safari",
    name: "Tata Safari",
    brand: "Tata",
    v3Path: "tata-cars/safari",
    segment: "suv-d",
    tagline: "7-seater adventure SUV",
    summary: "Three-row SUV sharing Harrier underpinnings with family-focused packaging.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/safari/safari-ice/hero/safari-hero-desktop.jpg",
  },
  {
    slug: "tata-curvv",
    name: "Tata Curvv",
    brand: "Tata",
    v3Path: "tata-cars/curvv",
    segment: "suv-c",
    tagline: "Coupe-SUV with multiple powertrains",
    summary: "Stylish mid-size SUV-coupe with petrol, diesel and EV options.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/curvv/curvv-ice/hero/curvv-hero-desktop.jpg",
  },
  {
    slug: "tata-sierra",
    name: "Tata Sierra",
    brand: "Tata",
    v3Path: "tata-cars/sierra",
    segment: "suv-c",
    tagline: "Iconic nameplate reborn",
    summary: "Lifestyle SUV with modern design and petrol/EV powertrains.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/sierra/sierra-ice/hero/sierra-hero-desktop.jpg",
  },
  {
    slug: "tata-tiago-nrg",
    name: "Tata Tiago NRG",
    brand: "Tata",
    v3Path: "tata-cars/tiago-nrg",
    segment: "hatch",
    tagline: "Cross-hatch with rugged styling",
    summary: "Raised Tiago derivative with crossover cladding.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/tiago-nrg/hero/tiago-nrg-hero-desktop.jpg",
  },
  {
    slug: "tata-nexon-ev",
    name: "Tata Nexon EV",
    brand: "Tata",
    v3Path: "tata-cars/nexon-ev",
    segment: "ev",
    tagline: "India's popular electric SUV",
    summary: "Long-range electric Nexon with multiple battery packs.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/nexon/nexon-ev/hero/nexon-ev-hero-desktop.jpg",
  },
  {
    slug: "tata-punch-ev",
    name: "Tata Punch EV",
    brand: "Tata",
    v3Path: "tata-cars/punch-ev",
    segment: "ev",
    tagline: "Electric micro-SUV",
    summary: "Battery-electric Punch with fast-charging support.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/punch/punch-ev/hero/punch-ev-hero-desktop.jpg",
  },
  {
    slug: "tata-tiago-ev",
    name: "Tata Tiago EV",
    brand: "Tata",
    v3Path: "tata-cars/tiago-ev",
    segment: "ev",
    tagline: "Affordable electric hatch",
    summary: "City EV based on the Tiago platform.",
    imageUrl:
      "https://www.tatamotors.com/content/dam/tata-motors/passenger-vehicles/tiago/tiago-ev/hero/tiago-ev-hero-desktop.jpg",
  },

  // —— Hyundai ——
  {
    slug: "hyundai-creta",
    name: "Hyundai Creta",
    brand: "Hyundai",
    v3Path: "hyundai-cars/creta",
    segment: "suv-c",
    tagline: "India's best-selling mid-size SUV",
    summary: "Comprehensive powertrain line-up with petrol, diesel, turbo and N Line options.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/creta/creta-ice/creta-hero.jpg",
  },
  {
    slug: "hyundai-venue",
    name: "Hyundai Venue",
    brand: "Hyundai",
    v3Path: "hyundai-cars/venue",
    segment: "suv-b",
    tagline: "Connected compact SUV",
    summary: "Sub-4m SUV with turbo-petrol, diesel and N Line variants.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/venue/venue-ice/venue-hero.jpg",
  },
  {
    slug: "hyundai-exter",
    name: "Hyundai Exter",
    brand: "Hyundai",
    v3Path: "hyundai-cars/exter",
    segment: "suv-b",
    tagline: "Micro-SUV with SUV styling",
    summary: "Entry SUV with petrol and CNG, sunroof on top trims.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/exter/exter-hero.jpg",
  },
  {
    slug: "hyundai-verna",
    name: "Hyundai Verna",
    brand: "Hyundai",
    v3Path: "hyundai-cars/verna",
    segment: "sedan",
    tagline: "Premium mid-size sedan",
    summary: "Sedan with NA petrol, turbo-petrol and ADAS on top trims.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/verna/verna-hero.jpg",
  },
  {
    slug: "hyundai-i20",
    name: "Hyundai i20",
    brand: "Hyundai",
    v3Path: "hyundai-cars/i20",
    segment: "hatch",
    tagline: "Premium hatchback",
    summary: "Feature-rich hatch with NA and turbo petrol engines.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/i20/i20-hero.jpg",
  },
  {
    slug: "hyundai-alcazar",
    name: "Hyundai Alcazar",
    brand: "Hyundai",
    v3Path: "hyundai-cars/alcazar",
    segment: "suv-d",
    tagline: "6/7-seater premium SUV",
    summary: "Three-row SUV with petrol and diesel, captain seats available.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/alcazar/alcazar-hero.jpg",
  },
  {
    slug: "hyundai-aura",
    name: "Hyundai Aura",
    brand: "Hyundai",
    v3Path: "hyundai-cars/aura",
    segment: "sedan",
    tagline: "Compact sedan",
    summary: "Sub-4m sedan with petrol and CNG options.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/aura/aura-hero.jpg",
  },
  {
    slug: "hyundai-grand-i10-nios",
    name: "Hyundai Grand i10 Nios",
    brand: "Hyundai",
    v3Path: "hyundai-cars/grand-i10-nios",
    segment: "hatch",
    tagline: "Practical city hatch",
    summary: "Affordable hatch with petrol and CNG powertrains.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/grand-i10-nios/nios-hero.jpg",
  },
  {
    slug: "hyundai-creta-n-line",
    name: "Hyundai Creta N Line",
    brand: "Hyundai",
    v3Path: "hyundai-cars/creta-n-line",
    segment: "suv-c",
    tagline: "Sporty Creta derivative",
    summary: "Turbo-petrol focused N Line with exclusive styling.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/creta-n-line/creta-nline-hero.jpg",
  },
  {
    slug: "hyundai-venue-n-line",
    name: "Hyundai Venue N Line",
    brand: "Hyundai",
    v3Path: "hyundai-cars/venue-n-line",
    segment: "suv-b",
    tagline: "Sporty Venue derivative",
    summary: "Performance-oriented Venue with turbo petrol DCT.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/venue-n-line/venue-nline-hero.jpg",
  },
  {
    slug: "hyundai-i20-n-line",
    name: "Hyundai i20 N Line",
    brand: "Hyundai",
    v3Path: "hyundai-cars/i20-n-line",
    segment: "hatch",
    tagline: "Hot hatch styling",
    summary: "Sport i20 with turbo petrol and DCT.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/i20-n-line/i20-nline-hero.jpg",
  },
  {
    slug: "hyundai-creta-electric",
    name: "Hyundai Creta Electric",
    brand: "Hyundai",
    v3Path: "hyundai-cars/creta-ev",
    segment: "ev",
    tagline: "Electric Creta",
    summary: "Battery-electric version of the Creta SUV.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/creta-electric/creta-ev-hero.jpg",
  },
  {
    slug: "hyundai-ioniq-5",
    name: "Hyundai Ioniq 5",
    brand: "Hyundai",
    v3Path: "hyundai-cars/ioniq-5",
    segment: "ev",
    tagline: "Premium electric crossover",
    summary: "E-GMP based EV with ultra-fast charging.",
    imageUrl:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-images/ioniq5/ioniq5-hero.jpg",
  },

  // —— Maruti Arena ——
  {
    slug: "maruti-victoris",
    name: "Maruti Victoris",
    brand: "Maruti Suzuki",
    v3Path: "maruti-arena-cars/victoris",
    segment: "suv-c",
    tagline: "Arena mid-size SUV",
    summary: "New Victoris SUV with petrol and strong hybrid options.",
    imageUrl:
      "https://www.marutisuzuki.com/-/media/marutisuzuki/india/vehicles/victoris/hero/victoris-hero.jpg",
  },
  {
    slug: "maruti-dzire",
    name: "Maruti Dzire",
    brand: "Maruti Suzuki",
    v3Path: "maruti-arena-cars/dzire",
    segment: "sedan",
    tagline: "Best-selling compact sedan",
    summary: "Efficient sedan with petrol and CNG, high fuel economy.",
    imageUrl:
      "https://www.marutisuzuki.com/-/media/marutisuzuki/india/vehicles/dzire/hero/dzire-hero.jpg",
  },
  {
    slug: "maruti-swift",
    name: "Maruti Swift",
    brand: "Maruti Suzuki",
    v3Path: "maruti-arena-cars/swift",
    segment: "hatch",
    tagline: "Sporty hatchback",
    summary: "Popular hatch with petrol and CNG, lightweight platform.",
    imageUrl:
      "https://www.marutisuzuki.com/-/media/marutisuzuki/india/vehicles/swift/hero/swift-hero.jpg",
  },
  {
    slug: "maruti-alto-k10",
    name: "Maruti Alto K10",
    brand: "Maruti Suzuki",
    v3Path: "maruti-arena-cars/alto-k10",
    segment: "hatch",
    tagline: "Entry hatchback",
    summary: "Budget hatch with petrol and CNG.",
    imageUrl:
      "https://www.marutisuzuki.com/-/media/marutisuzuki/india/vehicles/alto-k10/hero/alto-k10-hero.jpg",
  },
  {
    slug: "maruti-s-presso",
    name: "Maruti S-Presso",
    brand: "Maruti Suzuki",
    v3Path: "maruti-arena-cars/s-presso",
    segment: "suv-b",
    tagline: "Micro SUV",
    summary: "Affordable tall-boy with petrol engine.",
    imageUrl:
      "https://www.marutisuzuki.com/-/media/marutisuzuki/india/vehicles/s-presso/hero/s-presso-hero.jpg",
  },
  {
    slug: "maruti-brezza",
    name: "Maruti Brezza",
    brand: "Maruti Suzuki",
    v3Path: "maruti-arena-cars/brezza",
    segment: "suv-b",
    tagline: "Compact SUV with strong hybrid",
    summary: "Sub-4m SUV with petrol and strong hybrid powertrains.",
    imageUrl:
      "https://www.marutisuzuki.com/-/media/marutisuzuki/india/vehicles/brezza/hero/brezza-hero.jpg",
  },
  {
    slug: "maruti-ertiga",
    name: "Maruti Ertiga",
    brand: "Maruti Suzuki",
    v3Path: "maruti-arena-cars/ertiga",
    segment: "muv",
    tagline: "7-seater family MPV",
    summary: "Practical MPV with petrol and CNG.",
    imageUrl:
      "https://www.marutisuzuki.com/-/media/marutisuzuki/india/vehicles/ertiga/hero/ertiga-hero.jpg",
  },
  {
    slug: "maruti-wagon-r",
    name: "Maruti Wagon R",
    brand: "Maruti Suzuki",
    v3Path: "maruti-arena-cars/wagon-r",
    segment: "hatch",
    tagline: "Tall-boy hatch",
    summary: "Spacious city car with petrol and CNG.",
    imageUrl:
      "https://www.marutisuzuki.com/-/media/marutisuzuki/india/vehicles/wagon-r/hero/wagon-r-hero.jpg",
  },
  {
    slug: "maruti-celerio",
    name: "Maruti Celerio",
    brand: "Maruti Suzuki",
    v3Path: "maruti-arena-cars/celerio",
    segment: "hatch",
    tagline: "Efficient city hatch",
    summary: "Light hatch with petrol and CNG.",
    imageUrl:
      "https://www.marutisuzuki.com/-/media/marutisuzuki/india/vehicles/celerio/hero/celerio-hero.jpg",
  },
  {
    slug: "maruti-eeco",
    name: "Maruti Eeco",
    brand: "Maruti Suzuki",
    v3Path: "maruti-arena-cars/eeco",
    segment: "muv",
    tagline: "Versatile van/MPV",
    summary: "Affordable 5/7-seater with petrol and CNG.",
    imageUrl:
      "https://www.marutisuzuki.com/-/media/marutisuzuki/india/vehicles/eeco/hero/eeco-hero.jpg",
  },

  // —— Maruti Nexa ——
  {
    slug: "maruti-invicto",
    name: "Maruti Invicto",
    brand: "Maruti Suzuki",
    v3Path: "maruti-nexa-cars/invicto",
    segment: "muv",
    tagline: "Premium hybrid MPV",
    summary: "Toyota-derived hybrid MPV sold through Nexa.",
    imageUrl:
      "https://www.nexaexperience.com/-/media/nexa/invicto/hero/invicto-hero.jpg",
  },
  {
    slug: "maruti-jimny",
    name: "Maruti Jimny",
    brand: "Maruti Suzuki",
    v3Path: "maruti-nexa-cars/jimny",
    segment: "suv-b",
    tagline: "Compact off-roader",
    summary: "Ladder-frame 4x4 with petrol engine and retro design.",
    imageUrl:
      "https://www.nexaexperience.com/-/media/nexa/jimny/hero/jimny-hero.jpg",
  },
  {
    slug: "maruti-fronx",
    name: "Maruti Fronx",
    brand: "Maruti Suzuki",
    v3Path: "maruti-nexa-cars/fronx",
    segment: "suv-b",
    tagline: "Coupe-SUV crossover",
    summary: "Turbo and NA petrol compact SUV with Nexa positioning.",
    imageUrl:
      "https://www.nexaexperience.com/-/media/nexa/fronx/hero/fronx-hero.jpg",
  },
  {
    slug: "maruti-ciaz",
    name: "Maruti Ciaz",
    brand: "Maruti Suzuki",
    v3Path: "maruti-nexa-cars/ciaz",
    segment: "sedan",
    tagline: "Mid-size sedan",
    summary: "Comfort-focused sedan with petrol engine.",
    imageUrl:
      "https://www.nexaexperience.com/-/media/nexa/ciaz/hero/ciaz-hero.jpg",
  },
  {
    slug: "maruti-grand-vitara",
    name: "Maruti Grand Vitara",
    brand: "Maruti Suzuki",
    v3Path: "maruti-nexa-cars/grand-vitara",
    segment: "suv-c",
    tagline: "Strong hybrid mid-size SUV",
    summary: "SUV with petrol, strong hybrid and AWD options.",
    imageUrl:
      "https://www.nexaexperience.com/-/media/nexa/grand-vitara/hero/grand-vitara-hero.jpg",
  },
  {
    slug: "maruti-xl6",
    name: "Maruti XL6",
    brand: "Maruti Suzuki",
    v3Path: "maruti-nexa-cars/xl6",
    segment: "muv",
    tagline: "6-seater premium MPV",
    summary: "Ertiga-based MPV with captain seats in second row.",
    imageUrl:
      "https://www.nexaexperience.com/-/media/nexa/xl6/hero/xl6-hero.jpg",
  },
  {
    slug: "maruti-baleno",
    name: "Maruti Baleno",
    brand: "Maruti Suzuki",
    v3Path: "maruti-nexa-cars/baleno",
    segment: "hatch",
    tagline: "Premium Nexa hatch",
    summary: "Best-selling premium hatch with petrol and CNG.",
    imageUrl:
      "https://www.nexaexperience.com/-/media/nexa/baleno/hero/baleno-hero.jpg",
  },
  {
    slug: "maruti-ignis",
    name: "Maruti Ignis",
    brand: "Maruti Suzuki",
    v3Path: "maruti-nexa-cars/ignis",
    segment: "hatch",
    tagline: "Urban crossover hatch",
    summary: "Compact Nexa hatch with distinctive styling.",
    imageUrl:
      "https://www.nexaexperience.com/-/media/nexa/ignis/hero/ignis-hero.jpg",
  },
  {
    slug: "maruti-evitara",
    name: "Maruti e Vitara",
    brand: "Maruti Suzuki",
    v3Path: "maruti-nexa-cars/evitara",
    segment: "ev",
    tagline: "Electric Vitara",
    summary: "Maruti's first mass-market electric SUV.",
    imageUrl:
      "https://www.nexaexperience.com/-/media/nexa/evitara/hero/evitara-hero.jpg",
  },

  // —— Skoda ——
  {
    slug: "skoda-kylaq",
    name: "Skoda Kylaq",
    brand: "Skoda",
    v3Path: "skoda-cars/kylaq",
    segment: "suv-b",
    tagline: "European compact SUV",
    summary: "1.0 TSI SUV with premium cabin and safety kit.",
    imageUrl:
      "https://www.skoda-auto.co.in/content/dam/skoda/in/models/kylaq/hero/kylaq-hero.jpg",
  },
  {
    slug: "skoda-kushaq",
    name: "Skoda Kushaq",
    brand: "Skoda",
    v3Path: "skoda-cars/kushaq",
    segment: "suv-c",
    tagline: "Made-in-India C-SUV",
    summary: "Mid-size SUV with 1.0 and 1.5 TSI engines.",
    imageUrl:
      "https://www.skoda-auto.co.in/content/dam/skoda/in/models/kushaq/hero/kushaq-hero.jpg",
  },
  {
    slug: "skoda-slavia",
    name: "Skoda Slavia",
    brand: "Skoda",
    v3Path: "skoda-cars/slavia",
    segment: "sedan",
    tagline: "Premium mid-size sedan",
    summary: "Spacious sedan with turbo petrol engines.",
    imageUrl:
      "https://www.skoda-auto.co.in/content/dam/skoda/in/models/slavia/hero/slavia-hero.jpg",
  },
  {
    slug: "skoda-kodiaq",
    name: "Skoda Kodiaq",
    brand: "Skoda",
    v3Path: "skoda-cars/kodiaq",
    segment: "suv-d",
    tagline: "7-seater premium SUV",
    summary: "Flagship Skoda SUV with petrol engine and ADAS.",
    imageUrl:
      "https://www.skoda-auto.co.in/content/dam/skoda/in/models/kodiaq/hero/kodiaq-hero.jpg",
  },
  {
    slug: "skoda-octavia",
    name: "Skoda Octavia RS",
    brand: "Skoda",
    v3Path: "skoda-cars/octavia",
    segment: "sedan",
    tagline: "Performance sedan",
    summary: "Sporty Octavia RS with 2.0 TSI.",
    imageUrl:
      "https://www.skoda-auto.co.in/content/dam/skoda/in/models/octavia/hero/octavia-hero.jpg",
  },

  // —— Toyota ——
  {
    slug: "toyota-glanza",
    name: "Toyota Glanza",
    brand: "Toyota",
    v3Path: "toyota-cars/glanza",
    segment: "hatch",
    tagline: "Premium hatch",
    summary: "Baleno-based hatch sold by Toyota.",
    imageUrl:
      "https://www.toyota.co.in/content/dam/toyota/in/models/glanza/glanza-hero.jpg",
  },
  {
    slug: "toyota-taisor",
    name: "Toyota Taisor",
    brand: "Toyota",
    v3Path: "toyota-cars/taisor",
    segment: "suv-b",
    tagline: "Compact SUV",
    summary: "Fronx-based compact SUV from Toyota.",
    imageUrl:
      "https://www.toyota.co.in/content/dam/toyota/in/models/taisor/taisor-hero.jpg",
  },
  {
    slug: "toyota-rumion",
    name: "Toyota Rumion",
    brand: "Toyota",
    v3Path: "toyota-cars/rumion",
    segment: "muv",
    tagline: "7-seater MPV",
    summary: "Ertiga-based MPV with Toyota branding.",
    imageUrl:
      "https://www.toyota.co.in/content/dam/toyota/in/models/rumion/rumion-hero.jpg",
  },
  {
    slug: "toyota-urban-cruiser-hyryder",
    name: "Toyota Urban Cruiser Hyryder",
    brand: "Toyota",
    v3Path: "toyota-cars/urban-cruiser-hyryder",
    segment: "suv-c",
    tagline: "Strong hybrid SUV",
    summary: "Grand Vitara-based SUV with hybrid options.",
    imageUrl:
      "https://www.toyota.co.in/content/dam/toyota/in/models/hyryder/hyryder-hero.jpg",
  },
  {
    slug: "toyota-innova-hycross",
    name: "Toyota Innova Hycross",
    brand: "Toyota",
    v3Path: "toyota-cars/innova-hycross",
    segment: "muv",
    tagline: "Hybrid MPV",
    summary: "Premium Innova with petrol hybrid powertrain.",
    imageUrl:
      "https://www.toyota.co.in/content/dam/toyota/in/models/innova-hycross/hycross-hero.jpg",
  },
  {
    slug: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    v3Path: "toyota-cars/innova-crysta",
    segment: "muv",
    tagline: "Diesel MPV legend",
    summary: "Workhorse MPV with diesel engine.",
    imageUrl:
      "https://www.toyota.co.in/content/dam/toyota/in/models/innova-crysta/crysta-hero.jpg",
  },
  {
    slug: "toyota-fortuner",
    name: "Toyota Fortuner",
    brand: "Toyota",
    v3Path: "toyota-cars/fortuner",
    segment: "suv-d",
    tagline: "Full-size SUV",
    summary: "Body-on-frame SUV with petrol and diesel, 4x4 available.",
    imageUrl:
      "https://www.toyota.co.in/content/dam/toyota/in/models/fortuner/fortuner-hero.jpg",
  },
  {
    slug: "toyota-camry",
    name: "Toyota Camry",
    brand: "Toyota",
    v3Path: "toyota-cars/camry",
    segment: "sedan",
    tagline: "Hybrid executive sedan",
    summary: "Premium hybrid sedan with strong efficiency.",
    imageUrl:
      "https://www.toyota.co.in/content/dam/toyota/in/models/camry/camry-hero.jpg",
  },
  {
    slug: "toyota-vellfire",
    name: "Toyota Vellfire",
    brand: "Toyota",
    v3Path: "toyota-cars/vellfire",
    segment: "luxury",
    tagline: "Luxury hybrid MPV",
    summary: "Flagship MPV with hybrid power and lounge seating.",
    imageUrl:
      "https://www.toyota.co.in/content/dam/toyota/in/models/vellfire/vellfire-hero.jpg",
  },
  {
    slug: "toyota-land-cruiser",
    name: "Toyota Land Cruiser",
    brand: "Toyota",
    v3Path: "toyota-cars/land-cruiser",
    segment: "luxury",
    tagline: "Legendary off-roader",
    summary: "Ultimate Toyota SUV with diesel V6.",
    imageUrl:
      "https://www.toyota.co.in/content/dam/toyota/in/models/land-cruiser/lc-hero.jpg",
  },

  // —— Renault ——
  {
    slug: "renault-kwid",
    name: "Renault Kwid",
    brand: "Renault",
    v3Path: "renault-cars/kwid",
    segment: "hatch",
    tagline: "Entry hatchback",
    summary: "Budget hatch with SUV-inspired styling.",
    imageUrl:
      "https://www.renault.co.in/content/dam/renault/in/models/kwid/kwid-hero.jpg",
  },
  {
    slug: "renault-triber",
    name: "Renault Triber",
    brand: "Renault",
    v3Path: "renault-cars/triber",
    segment: "muv",
    tagline: "Modular 7-seater",
    summary: "Flexible MPV with removable third row.",
    imageUrl:
      "https://www.renault.co.in/content/dam/renault/in/models/triber/triber-hero.jpg",
  },
  {
    slug: "renault-kiger",
    name: "Renault Kiger",
    brand: "Renault",
    v3Path: "renault-cars/kiger",
    segment: "suv-b",
    tagline: "Compact SUV",
    summary: "Sub-4m SUV with turbo petrol engine.",
    imageUrl:
      "https://www.renault.co.in/content/dam/renault/in/models/kiger/kiger-hero.jpg",
  },
  {
    slug: "renault-duster",
    name: "Renault Duster",
    brand: "Renault",
    v3Path: "renault-cars/duster",
    segment: "suv-c",
    tagline: "Comeback SUV",
    summary: "All-new Duster with turbo petrol and mild-hybrid options.",
    imageUrl:
      "https://www.renault.co.in/content/dam/renault/in/models/duster/duster-hero.jpg",
  },

  // —— Volkswagen ——
  {
    slug: "volkswagen-virtus",
    name: "Volkswagen Virtus",
    brand: "Volkswagen",
    v3Path: "volkswagen-cars/virtus",
    segment: "sedan",
    tagline: "German engineering sedan",
    summary: "Mid-size sedan with 1.0 and 1.5 TSI engines.",
    imageUrl:
      "https://www.volkswagen.co.in/content/dam/vw/in/models/virtus/virtus-hero.jpg",
  },
  {
    slug: "volkswagen-taigun",
    name: "Volkswagen Taigun",
    brand: "Volkswagen",
    v3Path: "volkswagen-cars/taigun",
    segment: "suv-c",
    tagline: "European C-SUV",
    summary: "Sister model to Kushaq with VW styling.",
    imageUrl:
      "https://www.volkswagen.co.in/content/dam/vw/in/models/taigun/taigun-hero.jpg",
  },
  {
    slug: "volkswagen-tiguan",
    name: "Volkswagen Tiguan R-Line",
    brand: "Volkswagen",
    v3Path: "volkswagen-cars/tiguan-r-line",
    segment: "suv-d",
    tagline: "Performance SUV",
    summary: "Sporty Tiguan R-Line with 2.0 TSI.",
    imageUrl:
      "https://www.volkswagen.co.in/content/dam/vw/in/models/tiguan/tiguan-hero.jpg",
  },
  {
    slug: "volkswagen-tayron",
    name: "Volkswagen Tayron R-Line",
    brand: "Volkswagen",
    v3Path: "volkswagen-cars/tayron",
    segment: "suv-d",
    tagline: "3-row premium SUV",
    summary: "Seven-seat Tayron based on Tiguan platform.",
    imageUrl:
      "https://www.volkswagen.co.in/content/dam/vw/in/models/tayron/tayron-hero.jpg",
  },
  {
    slug: "volkswagen-golf-gti",
    name: "Volkswagen Golf GTI",
    brand: "Volkswagen",
    v3Path: "volkswagen-cars/golf-gti",
    segment: "hatch",
    tagline: "Hot hatch icon",
    summary: "Performance Golf GTI with 2.0 TSI.",
    imageUrl:
      "https://www.volkswagen.co.in/content/dam/vw/in/models/golf-gti/golf-gti-hero.jpg",
  },

  // —— Citroen ——
  {
    slug: "citroen-c3",
    name: "Citroen C3",
    brand: "Citroen",
    v3Path: "citroen-cars/c3",
    segment: "hatch",
    tagline: "French flair hatch",
    summary: "Stylish hatch with petrol and turbo petrol.",
    imageUrl:
      "https://www.citroen.in/content/dam/citroen/in/models/c3/c3-hero.jpg",
  },
  {
    slug: "citroen-ec3",
    name: "Citroen eC3",
    brand: "Citroen",
    v3Path: "citroen-cars/ec3",
    segment: "ev",
    tagline: "Electric C3",
    summary: "Affordable electric hatch based on C3.",
    imageUrl:
      "https://www.citroen.in/content/dam/citroen/in/models/ec3/ec3-hero.jpg",
  },
  {
    slug: "citroen-aircross",
    name: "Citroen Aircross",
    brand: "Citroen",
    v3Path: "citroen-cars/aircross",
    segment: "suv-b",
    tagline: "Comfort-focused SUV",
    summary: "C3 Aircross SUV with multiple engines.",
    imageUrl:
      "https://www.citroen.in/content/dam/citroen/in/models/aircross/aircross-hero.jpg",
  },
  {
    slug: "citroen-basalt",
    name: "Citroen Basalt",
    brand: "Citroen",
    v3Path: "citroen-cars/basalt-coupe",
    segment: "suv-b",
    tagline: "Coupe-SUV",
    summary: "Stylish coupe-SUV with turbo petrol.",
    imageUrl:
      "https://www.citroen.in/content/dam/citroen/in/models/basalt/basalt-hero.jpg",
  },
  {
    slug: "citroen-c5-aircross",
    name: "Citroen C5 Aircross",
    brand: "Citroen",
    v3Path: "citroen-cars/c5-aircross",
    segment: "suv-d",
    tagline: "Premium SUV",
    summary: "D-segment SUV with diesel automatic.",
    imageUrl:
      "https://www.citroen.in/content/dam/citroen/in/models/c5-aircross/c5-hero.jpg",
  },
];

export const registryBySlug = Object.fromEntries(
  modelRegistry.map((m) => [m.slug, m])
) as Record<string, ModelRegistryEntry>;
