#!/usr/bin/env node
/**
 * Fetches variant-wise ex-showroom prices and specs from v3cars.com
 * (aligned with OEM India price lists) and writes data/generated/models/{slug}.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "data", "generated", "models");
const REGISTRY_PATH = path.join(ROOT, "data", "catalog", "model-registry.ts");

const DELAY_MS = 400;
const MODEL_YEAR = 2026;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseRegistry() {
  const src = fs.readFileSync(REGISTRY_PATH, "utf8");
  const entries = [];
  const blockRe =
    /\{\s*slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?brand:\s*"([^"]+)"[\s\S]*?v3Path:\s*"([^"]+)"[\s\S]*?segment:\s*"([^"]+)"[\s\S]*?tagline:\s*"([^"]+)"[\s\S]*?summary:\s*"([^"]+)"[\s\S]*?imageUrl:\s*"([^"]+)"/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    entries.push({
      slug: m[1],
      name: m[2],
      brand: m[3],
      v3Path: m[4],
      segment: m[5],
      tagline: m[6],
      summary: m[7],
      imageUrl: m[8],
    });
  }
  return entries;
}

function parseLakh(s) {
  const m = s.match(/₹\s*([\d,.]+)\s*(lakh|cr)/i);
  if (!m) return null;
  const n = parseFloat(m[1].replace(/,/g, ""));
  return /cr/i.test(m[2]) ? n * 100 : n;
}

function parseDimensions(text) {
  const dims = [];
  const add = (label, val) => {
    if (!val) return;
    dims.push({ label, value: String(val).trim() });
  };

  const prose = text.match(
    /is (\d+)mm long, (\d+)mm wide and (\d+)mm tall/i
  );
  if (prose) {
    add("Length", `${prose[1]} mm`);
    add("Width", `${prose[2]} mm`);
    add("Height", `${prose[3]} mm`);
  }
  const wb = text.match(/(\d+)mm long wheelbase/i);
  if (wb) add("Wheelbase", `${wb[1]} mm`);
  const boot = text.match(/boot space measuring (\d+) litres/i);
  if (boot) add("Boot Space", `${boot[1]} litres`);
  const gc = text.match(/ground clearance of (\d+)mm/i);
  if (gc) add("Ground Clearance", `${gc[1]} mm`);
  const tank = text.match(/fuel tank capacity of (\d+) litres/i);
  if (tank) add("Fuel Tank", `${tank[1]} litres`);

  const htmlPairs =
    /<span class="lenth-text">(\d+mm)<\/span>|<td[^>]*>(\d+mm)<\/td>/gi;
  const dimLabels = ["Length", "Width", "Height", "Wheelbase"];
  let di = 0;
  let hm;
  while ((hm = htmlPairs.exec(text)) !== null && di < dimLabels.length) {
    const v = hm[1] || hm[2];
    if (v && !dims.find((d) => d.label === dimLabels[di])) {
      add(dimLabels[di], v);
      di++;
    }
  }

  return dims;
}

function inferFuel(sectionTitle, engineTable) {
  const t = `${sectionTitle} ${engineTable}`.toLowerCase();
  if (/electric|ev\b|kwh|battery/.test(t)) return "Electric";
  if (/diesel/.test(t)) return "Diesel";
  if (/cng/.test(t)) return "CNG";
  if (/hybrid|hev|mild/.test(t)) return "Hybrid";
  return "Petrol";
}

function parseEngineTableHtml(block) {
  const get = (label) => {
    const re = new RegExp(
      `<td class="leftview">${label}</td>\\s*<td class="rightview">([^<]+)</td>`,
      "i"
    );
    const m = block.match(re);
    return m ? m[1].trim() : "";
  };
  const disp = get("Engine Displacement") || get("Battery Capacity");
  const trans = get("Transmission") || get("Drive Type");
  const power = get("Max Power");
  const torque = get("Max Torque");
  const fe = get("Claimed FE") || get("ARAI Range");
  let engine = disp || "";
  if (engine && !/cc|kwh|kw/i.test(engine)) engine += "cc";
  const clean = (v) => (v ? v.replace(/@.*/, "").trim() : "—");
  return {
    engine: engine || "—",
    transmission: trans || "—",
    power: clean(power),
    torque: clean(torque),
    mileage: fe || "—",
    cylinders: get("Cylinders") || "—",
    kerbWeight: get("Kerb Weight") || "—",
    powerWeight: get("Power:Weight") || "—",
    torqueWeight: get("Torque:Weight") || "—",
    realWorldMileage: get("Real World Mileage") || get("Real-world Range") || "—",
    driveType: get("Drive Type") || "—",
  };
}

function parseSafetyHighlights(html) {
  const items = [];
  const seen = new Set();
  const add = (text) => {
    const key = text.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    items.push(text);
  };

  const ncap =
    html.match(/(\d)-star[^<]{0,60}Bharat NCAP/i) ||
    html.match(/(\d)-star safety rating in Bharat NCAP/i);
  if (ncap) add(`${ncap[1]}-star Bharat NCAP safety rating`);

  if (/\b6 airbags\b/i.test(html)) add("6 airbags (variant dependent)");
  else if (/\b4 airbags\b/i.test(html)) add("4 airbags (variant dependent)");
  else if (/\b2 airbags\b/i.test(html)) add("Dual front airbags (base variants)");

  if (/\bESC\b|electronic stability control/i.test(html))
    add("Electronic stability control (ESP/ESC)");
  if (/\bISOFIX\b/i.test(html)) add("ISOFIX child-seat anchorages");
  if (/\bABS\b|anti-lock braking/i.test(html)) add("ABS with EBD");
  if (/\bHill[- ]hold|hill start assist/i.test(html))
    add("Hill-hold / hill-start assist");
  if (/\bADAS\b|advanced driver assistance/i.test(html))
    add("ADAS driver-assistance (top trims)");
  if (/\b360|surround view/i.test(html))
    add("360° camera (select trims)");
  if (/\bTPMS\b|tyre pressure/i.test(html))
    add("Tyre-pressure monitoring");

  return items.slice(0, 8);
}

function decodeHtml(html) {
  return html
    .replace(/&#8377;/g, "₹")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");
}

function parsePriceSections(html) {
  const headers = [];
  const headerRe = /font-weight:600;">([^<]+Price List)<\/div>/gi;
  let hm;
  while ((hm = headerRe.exec(html)) !== null) {
    headers.push({
      title: hm[1].trim(),
      index: hm.index,
      contentStart: hm.index + hm[0].length,
    });
  }
  if (!headers.length) return [];

  const specStart = html.indexOf('id="powertrainSpecs-');
  const sections = [];

  for (let i = 0; i < headers.length; i++) {
    const sliceEnd =
      i + 1 < headers.length
        ? headers[i + 1].index
        : specStart > headers[i].contentStart
          ? specStart
          : html.length;
    const body = html.slice(headers[i].contentStart, sliceEnd);
    const title = headers[i].title;
    const rows = [];
    const tbodyBlocks = body.match(/<tbody[^>]*>[\s\S]*?<\/tbody>/gi) ?? [body];
    const rowRe =
      /<tr[^>]*>[\s\S]*?<td class="leftview[^"]*"[^>]*>[\s\S]*?<b>([^<]+)<\/b>[\s\S]*?<td class="rightview[^"]*"[^>]*>[\s\S]*?class="margin-auto">(?:&#8377;|₹)\s*([\d,.]+)\s*(lakh|Cr)/gi;
    for (const tbody of tbodyBlocks) {
      let rm;
      while ((rm = rowRe.exec(tbody)) !== null) {
        const variantCell = rm[1].trim();
        if (/^variant$/i.test(variantCell)) continue;
        const n = parseFloat(rm[2].replace(/,/g, ""));
        const priceLakh = /cr/i.test(rm[3]) ? n * 100 : n;
        rows.push({ trim: variantCell, priceLakh, rawName: variantCell });
      }
    }
    if (rows.length) sections.push({ title, rows });
  }
  return sections;
}

function parseEngineTables(html) {
  const blocks = [];
  const re =
    /<div id="powertrainSpecs-\d+"[\s\S]*?<table>([\s\S]*?)<\/table>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (/Engine Displacement/.test(m[1])) blocks.push(m[1]);
  }
  if (blocks.length) return blocks;
  const alt =
    /<td class="leftview">Engine Displacement<\/td>[\s\S]*?<\/table>/gi;
  let a;
  while ((a = alt.exec(html)) !== null) {
    blocks.push(a[0]);
  }
  return blocks;
}

function parsePage(text, entry) {
  const html = decodeHtml(text);
  const modelShort = entry.name
    .replace(new RegExp(`^${entry.brand}\\s+`, "i"), "")
    .trim();

  const sections = parsePriceSections(html).map((sec) => ({
    ...sec,
    rows: sec.rows.map((row) => {
      let trim = row.trim
        .replace(new RegExp(`^${modelShort}\\s+`, "i"), "")
        .replace(new RegExp(`^${entry.brand}\\s+`, "i"), "")
        .trim();
      return { ...row, trim: trim || row.trim };
    }),
  }));

  const engineBlocks = parseEngineTables(html);

  const variants = [];
  let ptIndex = 0;
  for (const sec of sections) {
    const eng =
      engineBlocks[ptIndex] ??
      engineBlocks[engineBlocks.length - 1] ??
      "";
    ptIndex++;
    const specs = parseEngineTableHtml(eng);
    const fuelType = inferFuel(sec.title, eng);
    if (fuelType === "Electric" && specs.mileage === "—" && /kmpu/i.test(eng)) {
      const fe = eng.match(/\|\s*Claimed FE\s*\|\s*([^|]+)\|/i);
      if (fe) specs.mileage = fe[1].trim();
    }
    for (const row of sec.rows) {
      variants.push({
        trim: row.trim,
        nameSuffix: "",
        priceLakh: row.priceLakh,
        fuelType,
        engine: specs.engine,
        transmission: specs.transmission,
        power: specs.power,
        torque: specs.torque,
        mileage: specs.mileage,
        cylinders: specs.cylinders,
        kerbWeight: specs.kerbWeight,
        powerWeight: specs.powerWeight,
        torqueWeight: specs.torqueWeight,
        realWorldMileage: specs.realWorldMileage,
        driveType: specs.driveType,
        section: sec.title,
      });
    }
  }

  const prices = variants.map((v) => v.priceLakh);
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;

  const engines = [
    ...new Set(
      variants.map((v) => `${v.engine} (${v.transmission})`).filter((e) => e !== "— (—)")
    ),
  ];

  return {
    slug: entry.slug,
    name: entry.name,
    brand: entry.brand,
    modelYear: MODEL_YEAR,
    tagline: entry.tagline,
    summary: entry.summary,
    segment: entry.segment,
    imageUrl: entry.imageUrl,
    priceRangeMin: min,
    priceRangeMax: max,
    dimensions: parseDimensions(html),
    safety: parseSafetyHighlights(html),
    engines: engines.slice(0, 8),
    variants,
    syncedAt: new Date().toISOString(),
    source: `https://www.v3cars.com/${entry.v3Path}`,
  };
}

async function fetchModel(entry) {
  const url = `https://www.v3cars.com/${entry.v3Path}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "car-info-website-catalog-sync/1.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const text = await res.text();
  return parsePage(text, entry);
}

async function main() {
  const onlySlug = process.argv[2];
  const entries = parseRegistry().filter((e) => !onlySlug || e.slug === onlySlug);
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Syncing ${entries.length} models from v3cars.com…`);
  let ok = 0;
  let fail = 0;

  for (const entry of entries) {
    const outPath = path.join(OUT_DIR, `${entry.slug}.json`);
    try {
      const data = await fetchModel(entry);
      if (!data.variants.length) {
        throw new Error("no variants parsed");
      }
      fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
      console.log(`✓ ${entry.slug} (${data.variants.length} variants)`);
      ok++;
    } catch (err) {
      console.error(`✗ ${entry.slug}: ${err.message}`);
      fail++;
    }
    await sleep(DELAY_MS);
  }

  console.log(`Done: ${ok} ok, ${fail} failed`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
