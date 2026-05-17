#!/usr/bin/env node
/**
 * Downloads model images from v3cars.com (media/model-imgs) and updates the catalog.
 * v3cars images are used on their site for each model page and load reliably.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MODELS_DIR = path.join(ROOT, "data", "generated", "models");
const CARS_DIR = path.join(ROOT, "public", "cars");
const CATALOG_PATH = path.join(ROOT, "data", "full-catalog.json");
const REGISTRY_PATH = path.join(ROOT, "data", "catalog", "model-registry.ts");

const DELAY_MS = 300;
const V3_BASE = "https://www.v3cars.com";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseRegistry() {
  const src = fs.readFileSync(REGISTRY_PATH, "utf8");
  const entries = [];
  const re =
    /slug:\s*"([^"]+)"[\s\S]*?v3Path:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    entries.push({ slug: m[1], v3Path: m[2] });
  }
  return entries;
}

function findModelImage(html, v3Path) {
  const modelKey = v3Path.split("/").pop().toLowerCase();
  const found = new Set();
  const re =
    /\/media\/model-imgs\/([a-zA-Z0-9][a-zA-Z0-9-]*\.(?:png|webp|jpe?g))/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    found.add(m[1].toLowerCase());
  }
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

async function fetchHtml(v3Path) {
  const res = await fetch(`${V3_BASE}/${v3Path}`, {
    headers: { "User-Agent": "car-info-website-image-sync/1.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function downloadFile(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "car-info-website-image-sync/1.0" },
  });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) return false;
  fs.writeFileSync(dest, buf);
  return true;
}

async function main() {
  const onlySlug = process.argv[2];
  const entries = parseRegistry().filter((e) => !onlySlug || e.slug === onlySlug);
  fs.mkdirSync(CARS_DIR, { recursive: true });

  const catalog = fs.existsSync(CATALOG_PATH)
    ? JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"))
    : [];
  const catalogBySlug = Object.fromEntries(catalog.map((c) => [c.slug, c]));

  let ok = 0;
  let fail = 0;

  for (const { slug, v3Path } of entries) {
    try {
      const html = await fetchHtml(v3Path);
      const file = findModelImage(html, v3Path);
      if (!file) throw new Error("no model image on page");

      const ext = path.extname(file) || ".png";
      const dest = path.join(CARS_DIR, `${slug}${ext}`);
      const url = `${V3_BASE}/media/model-imgs/${file}`;

      const saved = await downloadFile(url, dest);
      if (!saved) throw new Error(`download failed: ${url}`);

      const publicPath = `/cars/${slug}${ext}`;
      if (catalogBySlug[slug]) catalogBySlug[slug].image = publicPath;

      const modelJson = path.join(MODELS_DIR, `${slug}.json`);
      if (fs.existsSync(modelJson)) {
        const raw = JSON.parse(fs.readFileSync(modelJson, "utf8"));
        raw.v3carsImage = publicPath;
        raw.v3carsImageUrl = url;
        fs.writeFileSync(modelJson, JSON.stringify(raw, null, 2));
      }

      console.log(`✓ ${slug} → ${publicPath}`);
      ok++;
    } catch (err) {
      const localJpeg = path.join(CARS_DIR, `${slug}.jpeg`);
      if (fs.existsSync(localJpeg) && fs.statSync(localJpeg).size > 5000) {
        if (catalogBySlug[slug]) catalogBySlug[slug].image = `/cars/${slug}.jpeg`;
        console.log(`○ ${slug} (kept existing local image)`);
        ok++;
      } else {
        console.error(`✗ ${slug}: ${err.message}`);
        fail++;
      }
    }
    await sleep(DELAY_MS);
  }

  if (catalog.length) {
    fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
    console.log(`Updated ${CATALOG_PATH}`);
  }

  console.log(`Done: ${ok} ok, ${fail} failed`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
