#!/usr/bin/env node
/**
 * Compiles data/generated/models/*.json into data/full-catalog.json
 * and downloads OEM images to public/cars/{slug}.jpeg
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MODELS_DIR = path.join(ROOT, "data", "generated", "models");
const OUT_JSON = path.join(ROOT, "data", "full-catalog.json");
const CARS_DIR = path.join(ROOT, "public", "cars");

function formatRange(min, max) {
  const fmt = (n) =>
    n >= 100
      ? `₹${(n / 100).toFixed(2).replace(/\.00$/, "")} Cr`
      : `₹${n.toFixed(2).replace(/\.00$/, "")} Lakh`;
  if (min === max) return fmt(min);
  return `${fmt(min)} – ${fmt(max)}`;
}

function slugifyTrim(trim) {
  return trim
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildVariantId(carSlug, trim, fuel, trans, index) {
  const base = `${carSlug}-${slugifyTrim(trim)}-${slugifyTrim(fuel)}-${slugifyTrim(trans)}`;
  return `${base}-${index}`;
}

function formatTransmissionLabel(transmission) {
  const t = String(transmission).trim();
  if (/^cvt$/i.test(t) || /\bivt\b/i.test(t)) return "IVT";
  if (/7-speed dct/i.test(t)) return "7-speed DCT";
  if (/6-speed dct/i.test(t)) return "6-speed DCT";
  if (/6-speed tc/i.test(t)) return "6-speed AT";
  if (/6-speed acmt|6-speed amt/i.test(t)) return "6-speed AMT";
  if (/6-speed mt/i.test(t)) return "6-speed MT";
  if (/5-speed mt/i.test(t)) return "5-speed MT";
  if (/single speed|1-speed/i.test(t)) return "Single-speed";
  return t;
}

function variantDisplayName(carName, brand, trim, suffix, fuelType, transmission, engine) {
  const short = carName.replace(new RegExp(`^${brand}\\s+`, "i"), "").trim();
  let cleanTrim = trim;
  for (const prefix of [carName, short]) {
    if (prefix && cleanTrim.toLowerCase().startsWith(prefix.toLowerCase())) {
      cleanTrim = cleanTrim.slice(prefix.length).trim();
    }
  }
  const base = [short, cleanTrim || trim, suffix].filter(Boolean).join(" ");
  const trans = formatTransmissionLabel(transmission);
  const eng =
    engine && engine !== "—" ? ` · ${engine}` : "";
  return `${base} · ${fuelType} · ${trans}${eng}`;
}

function tierForTrim(trim) {
  const t = trim.toUpperCase();
  if (/GTX|X LINE|X-LINE|KNIGHT|N LINE|ICONIC|HX10|\bMAX\b/.test(t)) return "gt";
  if (/PRESTIGE|FEARLESS|ACCOMPLISHED|ALPHA|HTX|\bSX\b|TECHNO PLUS|EMOTION/.test(t))
    return "top";
  if (/CREATIVE|ADVENTURE|ZETA|HX[6-8]|HTK PLUS|TECHNO|SPORTZ|PLUS/.test(t))
    return "upper";
  if (/HTK|PURE|HX|DELTA|MAGNA|CLASSIC|EVOLUTION|HIGHLINE/.test(t)) return "mid";
  return "base";
}

const genericFeatures = {
  base: [
    "ABS with EBD & dual front airbags (standard on most variants)",
    "Power steering with tilt adjustment",
    "Power windows & central locking",
    "Infotainment with Bluetooth / smartphone connectivity",
    "Rear defogger & adjustable ORVMs",
  ],
  mid: [
    "Smart key / push-button start (variant dependent)",
    "Automatic climate control with rear AC vents",
    "Alloy wheels & body-coloured mirrors",
    "Steering-mounted audio & phone controls",
    "Rear parking sensors",
  ],
  upper: [
    "Electric sunroof / panoramic roof (variant dependent)",
    "Premium upholstery (leatherette / leather)",
    "Rear camera with dynamic guidelines",
    "Cruise control & auto headlamps",
    "Wireless smartphone charging (variant dependent)",
  ],
  top: [
    "6 airbags & ESC (variant dependent)",
    "Ventilated front seats & powered driver seat",
    "Connected car telematics & OTA updates",
    "Premium audio system with additional speakers",
    "ADAS / Level 2 assist (top trims, model dependent)",
  ],
  gt: [
    "Flagship powertrain calibration",
    "Full ADAS suite with lane / brake assist (where offered)",
    "360° surround-view camera (variant dependent)",
    "Digital instrument cluster & large touchscreen",
    "Top-spec convenience & lighting package",
  ],
};

function variantSpecRows(v) {
  const rows = [
    { label: "Trim", value: v.trim },
    { label: "Engine / battery", value: v.engine },
    { label: "Cylinders", value: v.cylinders },
    { label: "Transmission", value: v.transmission },
    { label: "Drive type", value: v.driveType },
    { label: "Fuel type", value: v.fuelType },
    { label: "Max power", value: v.power },
    { label: "Max torque", value: v.torque },
    { label: "Mileage (ARAI)", value: v.mileage },
    { label: "Real-world mileage / range", value: v.realWorldMileage },
    { label: "Kerb weight", value: v.kerbWeight },
    { label: "Power-to-weight", value: v.powerWeight },
    { label: "Torque-to-weight", value: v.torqueWeight },
    { label: "Price type", value: "Ex-showroom, India" },
  ];
  return rows.filter((r) => r.value && r.value !== "—");
}

const V3_BASE = "https://www.v3cars.com";

function findModelImage(html, v3Path) {
  const modelKey = v3Path.split("/").pop().toLowerCase();
  const found = new Set();
  const re =
    /\/media\/model-imgs\/([a-zA-Z0-9][a-zA-Z0-9-]*\.(?:png|webp|jpe?g))/gi;
  let m;
  while ((m = re.exec(html)) !== null) found.add(m[1].toLowerCase());
  const imgs = [...found];
  if (!imgs.length) return null;
  const stripNum = (f) => f.replace(/^\d+/, "");
  const baseName = (f) =>
    stripNum(f).replace(/\.(png|webp|jpeg|jpg)$/i, "");
  let best = null;
  let bestScore = 0;
  for (const img of imgs) {
    const base = baseName(img);
    let score = 0;
    if (base === modelKey) score = 100;
    else if (base.endsWith(modelKey) || modelKey.endsWith(base)) score = 85;
    else if (base.includes(modelKey) || modelKey.includes(base)) score = 70;
    else {
      const parts = modelKey.split("-").filter((p) => p.length > 2);
      const hits = parts.filter((p) => base.includes(p)).length;
      if (hits === parts.length && parts.length) score = 60;
      else if (hits > 0) score = 35 + hits * 5;
    }
    if (score > bestScore) {
      bestScore = score;
      best = img;
    }
  }
  return bestScore >= 35 ? best : imgs[0] ?? null;
}

async function downloadV3carsImage(v3Path, slug) {
  try {
    const html = await (
      await fetch(`${V3_BASE}/${v3Path}`, {
        headers: { "User-Agent": "car-info-website/1.0" },
      })
    ).text();
    const file = findModelImage(html, v3Path);
    if (!file) return null;
    const ext = path.extname(file) || ".png";
    const dest = path.join(CARS_DIR, `${slug}${ext}`);
    const res = await fetch(`${V3_BASE}/media/model-imgs/${file}`, {
      headers: { "User-Agent": "car-info-website/1.0" },
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) return null;
    fs.writeFileSync(dest, buf);
    return `/cars/${slug}${ext}`;
  } catch {
    return null;
  }
}

async function main() {
  const files = fs
    .readdirSync(MODELS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  fs.mkdirSync(CARS_DIR, { recursive: true });

  const catalog = [];
  let id = 1;

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(MODELS_DIR, file), "utf8"));
    const slug = raw.slug;
    let image = null;
    const v3Path = raw.source?.replace(/^https:\/\/www\.v3cars\.com\//, "") ?? null;
    if (v3Path) {
      image = await downloadV3carsImage(v3Path, slug);
    }
    if (!image) {
      for (const ext of [".jpeg", ".jpg", ".png", ".webp"]) {
        const local = path.join(CARS_DIR, `${slug}${ext}`);
        if (fs.existsSync(local) && fs.statSync(local).size > 5000) {
          image = `/cars/${slug}${ext}`;
          break;
        }
      }
    }
    if (!image) image = "/cars/placeholder.svg";

    const trimCounts = {};
    const variants = raw.variants.map((v, i) => {
      let trim = v.trim;
      const shortName = raw.name.replace(/^[\w\s]+\s+/i, "").trim();
      for (const prefix of [raw.name, shortName]) {
        if (prefix && trim.toLowerCase().startsWith(prefix.toLowerCase())) {
          trim = trim.slice(prefix.length).trim();
        }
      }
      const vid = buildVariantId(slug, trim, v.fuelType, v.transmission, i);
      trimCounts[trim] = (trimCounts[trim] ?? 0) + 1;
      const priceStr =
        v.priceLakh >= 100
          ? `₹${(v.priceLakh / 100).toFixed(2).replace(/\.00$/, "")} Cr`
          : `₹${v.priceLakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
      const tier = tierForTrim(trim);
      const features = genericFeatures[tier] ?? genericFeatures.base;

      return {
        id: vid,
        name: variantDisplayName(
          raw.name,
          raw.brand,
          trim,
          v.nameSuffix,
          v.fuelType,
          v.transmission,
          v.engine
        ),
        trim,
        price: priceStr,
        engine: v.engine,
        transmission: v.transmission,
        fuelType: v.fuelType,
        power: v.power,
        torque: v.torque,
        mileage: v.mileage,
        specs: variantSpecRows(v),
        features,
      };
    });

    const registrySafety = (() => {
      try {
        const regSrc = fs.readFileSync(
          path.join(ROOT, "data", "catalog", "model-registry.ts"),
          "utf8"
        );
        const esc = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const block = regSrc.match(
          new RegExp(`slug:\\s*"${esc}"[\\s\\S]*?\\n\\s*\\},`, "m")
        );
        if (!block) return [];
        const items = [];
        const safetyRe = /"([^"]+)"/g;
        const safetyBlock = block[0].match(/safety:\s*\[([\s\S]*?)\]/);
        if (safetyBlock) {
          let sm;
          while ((sm = safetyRe.exec(safetyBlock[1])) !== null) items.push(sm[1]);
        }
        return items;
      } catch {
        return [];
      }
    })();

    const safety = [
      ...new Set([...(raw.safety ?? []), ...registrySafety]),
    ];
    if (!safety.length) {
      safety.push(
        "Refer to official brochure for variant-wise safety equipment"
      );
    }

    catalog.push({
      id: id++,
      slug,
      name: raw.name,
      brand: raw.brand,
      segment: raw.segment ?? "suv-c",
      modelYear: raw.modelYear ?? 2026,
      tagline: raw.tagline,
      image,
      priceRange: formatRange(raw.priceRangeMin, raw.priceRangeMax),
      summary: raw.summary,
      dimensions: raw.dimensions?.length
        ? raw.dimensions
        : [
            { label: "Length", value: "—" },
            { label: "Width", value: "—" },
            { label: "Height", value: "—" },
            { label: "Wheelbase", value: "—" },
            { label: "Boot space", value: "—" },
            { label: "Ground clearance", value: "—" },
          ],
      safety,
      engines: raw.engines?.length ? raw.engines : ["See variant list"],
      variants,
    });
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(catalog, null, 2));
  console.log(`Wrote ${catalog.length} models to ${OUT_JSON}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
