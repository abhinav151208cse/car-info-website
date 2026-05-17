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

function variantDisplayName(carName, trim, suffix) {
  const short = carName.replace(/^[\w\s]+\s+/i, "").trim();
  let cleanTrim = trim;
  for (const prefix of [carName, short]) {
    if (prefix && cleanTrim.toLowerCase().startsWith(prefix.toLowerCase())) {
      cleanTrim = cleanTrim.slice(prefix.length).trim();
    }
  }
  const parts = [short, cleanTrim || trim, suffix].filter(Boolean);
  return parts.join(" ");
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
    "Standard safety kit (ABS, airbags — see official brochure)",
    "Infotainment with smartphone connectivity (variant dependent)",
    "Power windows & central locking",
  ],
  mid: [
    "Smart key / push-button start (variant dependent)",
    "Automatic climate control",
    "Alloy wheels",
  ],
  upper: [
    "Sunroof (variant dependent)",
    "Premium upholstery",
    "Rear camera & parking sensors",
  ],
  top: [
    "Advanced safety & ADAS (variant dependent)",
    "Ventilated / powered seats (variant dependent)",
    "Wireless charging & connected features",
  ],
  gt: [
    "Top powertrain & sport/flagship trim",
    "Full ADAS & premium convenience pack (variant dependent)",
  ],
};

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
        name: variantDisplayName(raw.name, trim, v.nameSuffix),
        trim,
        price: priceStr,
        engine: v.engine,
        transmission: v.transmission,
        fuelType: v.fuelType,
        power: v.power,
        torque: v.torque,
        mileage: v.mileage,
        specs: [
          { label: "Trim", value: v.trim },
          { label: "Engine", value: v.engine },
          { label: "Transmission", value: v.transmission },
          { label: "Fuel Type", value: v.fuelType },
          { label: "Power", value: v.power },
          { label: "Torque", value: v.torque },
          { label: "Mileage (ARAI)", value: v.mileage },
          { label: "Price Type", value: "Ex-showroom, India" },
        ],
        features,
      };
    });

    catalog.push({
      id: id++,
      slug,
      name: raw.name,
      brand: raw.brand,
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
          ],
      safety: raw.safety ?? [
        "Refer to official brochure for safety equipment by variant",
      ],
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
