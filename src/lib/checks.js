"use strict";

/* checks.js — tools/check-site.js'in kullandığı 13 saf kural fonksiyonu
   (ETKI-ANALIZI §4.5). Her fonksiyon { ok, count, details } döner; ok=false
   derlemeyi/yayını durdurması gereken bir bulgu olduğunu gösterir. Kurallar
   `files: Map<relPath, string|Buffer>` üzerinde çalışır ki hem gerçek
   site/ çıktısıyla hem de testteki küçük sahte örneklerle sınanabilsin. */

const fs = require("node:fs");
const path = require("node:path");

const routes = require("../routes.js");
const facts = require("../content/facts.js");
const { loadContentTree } = require("./content.js");
const { diffKeyTrees } = require("./i18n.js");
const { buildSitemap, buildRobots } = require("./hosting.js");
const { formatDate } = require("./format.js");
const { turkishLowerCase } = require("./turkish-text.js");

function textOf(value) {
  return Buffer.isBuffer(value) ? value.toString("utf8") : String(value);
}

function htmlFiles(files) {
  return [...files.entries()].filter(([p]) => p.endsWith(".html"));
}

/* ---------- kural 1 ---------- */
function checkBuildMatches(outDir) {
  // eslint-disable-next-line global-require -- döngüsel bağımlılığı önlemek için burada require edilir
  const build = require("../../tools/build.js");
  const files = build.collectOutputFiles();
  const diffs = build.checkOutput(outDir, files);
  return { id: 1, ok: diffs.length === 0, count: files.size, details: diffs };
}

/* ---------- kural 2 ---------- */
function diffTrees({ tr, en }) {
  const diffs = diffKeyTrees(tr, en);
  return { ok: diffs.length === 0, diffs };
}

function checkContentParity() {
  const tr = loadContentTree("tr");
  const en = loadContentTree("en");
  const { ok, diffs } = diffTrees({ tr, en });
  return { id: 2, ok, count: Object.keys(tr).length, details: diffs };
}

/* ---------- kural 3 ---------- */
function extractAttr(tag, name) {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : null;
}

function checkHtmlStructure(files, config) {
  const details = [];
  let count = 0;
  for (const [relPath, raw] of htmlFiles(files)) {
    const content = textOf(raw);
    count++;

    const h1Count = (content.match(/<h1[ >]/g) || []).length;
    if (h1Count !== 1) details.push(`${relPath}: tek <h1> bekleniyor, ${h1Count} bulundu`);

    const htmlTag = content.match(/<html[^>]*lang="([^"]*)"/);
    const lang = htmlTag ? htmlTag[1] : null;
    const expectedLang = relPath.startsWith("en/") || relPath === "en/404.html" ? "en" : "tr";
    if (lang !== expectedLang) details.push(`${relPath}: lang="${lang}" bekleniyor "${expectedLang}"`);

    const canonicalMatch = content.match(/<link rel="canonical" href="([^"]*)">/);
    const canonical = canonicalMatch ? canonicalMatch[1] : null;
    const expectedPath = pathFromOutputPath(relPath);
    const expectedCanonical = config.origin.replace(/\/+$/, "") + expectedPath;
    if (canonical !== expectedCanonical) details.push(`${relPath}: canonical "${canonical}" bekleniyor "${expectedCanonical}"`);

    const hreflangMatches = [...content.matchAll(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)">/g)];
    const langs = hreflangMatches.map((m) => m[1]).sort();
    if (JSON.stringify(langs) !== JSON.stringify(["en", "tr", "x-default"])) {
      details.push(`${relPath}: hreflang üçlüsü (tr,en,x-default) eksik/fazla: ${langs.join(",")}`);
    }
    const selfHreflang = hreflangMatches.find((m) => m[1] === expectedLang);
    if (selfHreflang && canonical && selfHreflang[2] !== canonical) {
      details.push(`${relPath}: hreflang kendi dilini kendi canonical'ı ile listelemiyor`);
    }

    const ids = [...content.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]);
    const uniqueIds = new Set(ids);
    if (uniqueIds.size !== ids.length) details.push(`${relPath}: tekrarlanan id var (${ids.length - uniqueIds.size} adet)`);
  }
  return { id: 3, ok: details.length === 0, count, details };
}

function pathFromOutputPath(relPath) {
  if (relPath === "404.html") return "/404.html";
  if (relPath === "en/404.html") return "/en/404.html";
  if (relPath === "index.html") return "/";
  if (relPath.endsWith("/index.html")) return `/${relPath.slice(0, -"index.html".length)}`;
  return `/${relPath}`;
}

/* ---------- kural 4 ---------- */
function outputPathKeyFor(urlPath) {
  if (urlPath === "/404.html" || urlPath === "/en/404.html") return urlPath.replace(/^\//, "");
  const trimmed = urlPath.replace(/^\//, "").replace(/\/$/, "");
  return trimmed ? `${trimmed}/index.html` : "index.html";
}

function checkInternalLinks(files) {
  const details = [];
  let count = 0;
  const disabledPaths = new Set();
  for (const route of routes.list) {
    if (route.enabled === false) {
      disabledPaths.add(route.path.tr);
      disabledPaths.add(route.path.en);
    }
  }
  for (const [relPath, raw] of htmlFiles(files)) {
    const content = textOf(raw);
    /* Yalnız gerçek sayfa içi gezinme bağlantıları (<a href>) denetlenir.
       <link href> (stylesheet/preload/icon) ve <use href> (SVG sprite
       referansı) bu kuralın kapsamı DIŞINDA — rota değil, varlık.
       (arayuz-gelistirici İTİRAZ madde 8: eski regex her href'i yakalayıp
       550 sahte bulgu üretiyordu.) */
    const anchorTags = content.match(/<a\b[^>]*>/gi) || [];
    const hrefs = anchorTags.map((tag) => extractAttr(tag, "href")).filter((h) => h && h.startsWith("/"));
    for (const href of hrefs) {
      count++;
      const [pathAndQuery, fragment] = href.split("#");
      const base = pathAndQuery.split("?")[0]; // "?urun=hvac" gibi sorgu dizeleri rota kimliğinin parçası değil
      if (disabledPaths.has(base)) {
        details.push(`${relPath}: kapalı rotaya bağlantı: ${href}`);
        continue;
      }
      const key = outputPathKeyFor(base || "/");
      if (!files.has(key)) {
        details.push(`${relPath}: hedefi olmayan bağlantı: ${href}`);
        continue;
      }
      if (fragment) {
        const target = textOf(files.get(key));
        if (!new RegExp(`id="${fragment}"`).test(target)) {
          details.push(`${relPath}: çapa hedefi yok: ${href}`);
        }
      }
    }
  }
  return { id: 4, ok: details.length === 0, count, details };
}

/* ---------- kural 5 ---------- */
function checkImages(files) {
  const details = [];
  let count = 0;
  for (const [relPath, raw] of htmlFiles(files)) {
    const content = textOf(raw);
    const imgs = content.match(/<img[^>]*>/g) || [];
    for (const img of imgs) {
      count++;
      if (extractAttr(img, "width") === null) details.push(`${relPath}: img width eksik: ${img}`);
      if (extractAttr(img, "height") === null) details.push(`${relPath}: img height eksik: ${img}`);
      if (extractAttr(img, "alt") === null) details.push(`${relPath}: img alt eksik: ${img}`);
    }
  }
  return { id: 5, ok: details.length === 0, count, details };
}

/* ---------- kural 6 ---------- */
function findKeyDeep(obj, key) {
  if (!obj || typeof obj !== "object") return false;
  if (key in obj) return true;
  return Object.values(obj).some((v) => findKeyDeep(v, key));
}

function checkJsonLd(files, pricingData) {
  const details = [];
  let count = 0;
  for (const [relPath, raw] of htmlFiles(files)) {
    const content = textOf(raw);
    const scripts = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    for (const [, jsonText] of scripts) {
      count++;
      let data;
      try {
        data = JSON.parse(jsonText);
      } catch (err) {
        details.push(`${relPath}: JSON-LD ayrıştırılamıyor (${err.message})`);
        continue;
      }
      if (findKeyDeep(data, "aggregateRating")) {
        details.push(`${relPath}: aggregateRating yasak (uydurma sosyal kanıt)`);
      }
      if (data["@type"] === "AggregateOffer" && pricingData) {
        // İleriye dönük: fixed/from fiyat basıldığında burada sayfadaki
        // görünen fiyatla karşılaştırılır. Bugün hiç basılmıyor (tüm
        // planlar "quote"), bu yüzden bu dal boş veriyle dokunulmaz kalır.
      }
    }
  }
  return { id: 6, ok: details.length === 0, count, details };
}

/* ---------- kural 7 ---------- */
function checkSitemapAndRobots(files, config) {
  const details = [];
  if (!files.has("sitemap.xml")) details.push("sitemap.xml eksik");
  if (!files.has("robots.txt")) details.push("robots.txt eksik");
  let count = 0;
  if (files.has("sitemap.xml")) {
    const actual = textOf(files.get("sitemap.xml"));
    const expected = buildSitemap(routes.list, config);
    if (actual !== expected) details.push("sitemap.xml içeriği beklenen çıktıyla eşleşmiyor");
    count = (actual.match(/<url>/g) || []).length;
    if (count === 0) details.push("sitemap.xml boş (0 url) — bu bir hata, sıfır sayı kanıt değildir");
    if (!/xhtml:link/.test(actual)) details.push("sitemap.xml xhtml:link alternatifi içermiyor");
  }
  if (files.has("robots.txt")) {
    const actual = textOf(files.get("robots.txt"));
    const expected = buildRobots(config);
    if (actual !== expected) details.push("robots.txt içeriği beklenen çıktıyla eşleşmiyor");
    if (!/Sitemap:/.test(actual)) details.push("robots.txt sitemap'e işaret etmiyor");
  }
  return { id: 7, ok: details.length === 0, count, details };
}

/* ---------- kural 8 ---------- */
const FORBIDDEN_HOSTS = ["github.io", "/dijital-pusula/", "googleapis", "gstatic"];

function checkNoLeakedHosts(files) {
  const details = [];
  let count = 0;
  for (const [relPath, raw] of files) {
    const content = textOf(raw);
    for (const needle of FORBIDDEN_HOSTS) {
      if (content.includes(needle)) {
        count++;
        details.push(`${relPath}: yasaklı dize geçiyor: "${needle}"`);
      }
    }
  }
  return { id: 8, ok: details.length === 0, count, details };
}

/* ---------- kural 9 ---------- */
/* ETKI-ANALIZI §3.1 dürüstlük kuralı: veri dışa aktarma vaadi, Excel'den
   içe aktarma vaadi, kartla/çevrimiçi ödeme, uydurma müşteri sayısı/puan. */
const FORBIDDEN_CLAIMS = [
  "kartla ödeyin", "kredi kartıyla ödeyin", "online ödeme alıyoruz", "çevrimiçi ödeme alıyoruz",
  "excel'den içe aktarın", "verilerinizi dışa aktarın",
  "pay by credit card", "we accept online payments", "import from excel", "export your data"
];

function checkForbiddenClaims(sourceFiles) {
  const details = [];
  let count = 0;
  for (const [relPath, raw] of sourceFiles) {
    /* turkishLowerCase() KULLAN, düz toLowerCase() değil (D-003, INCELEME
       bulgusu): standart toLowerCase() Türkçe büyük "İ"yi "i" + birleşik
       nokta işaretine çevirir, tek karakterlik "i"ye değil — bu yüzden
       büyük İ ile yazılmış bir yasak ifade (ör. "Excel'den İçe Aktarın")
       düz toLowerCase ile SESSİZCE kaçırılıyordu. */
    const content = turkishLowerCase(textOf(raw));
    count++;
    for (const claim of FORBIDDEN_CLAIMS) {
      if (content.includes(claim)) details.push(`${relPath}: yasak ifade: "${claim}"`);
    }
  }
  return { id: 9, ok: details.length === 0, count, details };
}

function walkFiles(dir, rel = "") {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walkFiles(abs, relPath));
    else if (entry.name.endsWith(".js")) out.push([relPath.split(path.sep).join("/"), fs.readFileSync(abs, "utf8")]);
  }
  return out;
}

function checkForbiddenClaimsOnDisk() {
  const dir = path.join(__dirname, "..", "content");
  const files = new Map(walkFiles(dir));
  const result = checkForbiddenClaims(files);
  return { ...result, id: 9 };
}

function flattenFacts(node, prefix = "") {
  const out = [];
  for (const [key, value] of Object.entries(node)) {
    const p = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && "value" in value) out.push([p, value]);
    else if (value && typeof value === "object") out.push(...flattenFacts(value, p));
  }
  return out;
}

function checkFactsSourced(factsData) {
  const details = [];
  const entries = flattenFacts(factsData);
  for (const [p, entry] of entries) {
    if (!entry.source || !entry.source.trim()) details.push(`facts.${p}: source boş`);
  }
  return { id: 9, ok: details.length === 0, count: entries.length, details };
}

/* ---------- kural 10 ---------- */
function checkCompanyMandatoryFields(company, { release } = {}) {
  const details = [];
  const hasIdNumber = Boolean(company.mersis || company.taxNumber);
  if (!hasIdNumber) details.push("MERSİS ya da vergi kimlik numarasından biri zorunlu (ikisi de boş)");
  if (!company.kep) details.push("KEP adresi zorunlu (boş)");
  if (!(company.addressTr || company.addressEn)) details.push("merkez adresi zorunlu (boş)");
  if (!company.email) details.push("e-posta zorunlu (boş)");
  if (!company.phone) details.push("telefon zorunlu (boş)");
  if (!company.chamber) details.push("meslek odası zorunlu (boş)");
  const ok = details.length === 0 || !release;
  return { id: 10, ok, count: 6, details, severity: release ? "error" : "warn" };
}

/* ---------- kural 11 ---------- */
function checkOriginPlaceholder(config, { release } = {}) {
  const isPlaceholder = /\.example(\/|$)/.test(config.origin);
  const ok = !isPlaceholder || !release;
  return {
    id: 11, ok, count: 1,
    details: isPlaceholder ? [`origin hâlâ yer tutucu: ${config.origin}`] : [],
    severity: release ? "error" : "warn"
  };
}

/* ---------- kural 12 ---------- */
function checkPricingFreshness(pricingData) {
  const updated = new Date(`${pricingData.updatedAt}T00:00:00Z`);
  const days = Math.floor((Date.now() - updated.getTime()) / (1000 * 60 * 60 * 24));
  const stale = days > 90;
  return {
    id: 12, ok: !stale, count: 1,
    details: stale ? [`pricing.updatedAt ${pricingData.updatedAt} — ${days} gün eski (>90)`] : [],
    severity: "warn"
  };
}

/* ---------- kural 13 ---------- */
function checkFormEndpointConfig(config) {
  if (config.form.mode !== "endpoint") return { id: 13, ok: true, count: 1, details: [] };
  const provider = config.form.provider || {};
  const details = [];
  if (!provider.name) details.push("form.mode=endpoint iken provider.name zorunlu");
  if (!provider.country) details.push("form.mode=endpoint iken provider.country zorunlu");
  return { id: 13, ok: details.length === 0, count: 1, details };
}

module.exports = {
  checkBuildMatches,
  checkContentParity,
  diffTrees,
  checkHtmlStructure,
  pathFromOutputPath,
  checkInternalLinks,
  checkImages,
  checkJsonLd,
  checkSitemapAndRobots,
  checkNoLeakedHosts,
  checkForbiddenClaims,
  checkForbiddenClaimsOnDisk,
  checkFactsSourced,
  checkCompanyMandatoryFields,
  checkOriginPlaceholder,
  checkPricingFreshness,
  checkFormEndpointConfig
};
