#!/usr/bin/env node
"use strict";

/* tools/build.js — bağımlılıksız Node üretici (ETKI-ANALIZI ADR-1, §5 G1).
   src/'i okur, site/'i SIFIRDAN yazar (önce siler). Şablonlar Aşama 0'da
   geçicidir (src/templates/pages/stub.js) — arayuz-gelistirici Aşama 1'de
   TASARIM-STANDARDI.md'ye göre değiştirecek; üretici hattı (bu dosya)
   değişmeyecek sözleşmedir.

   Kullanım:
     node tools/build.js            # site/'i üretir
     node tools/build.js --check    # yeniden üretip site/'teki ile farkı raporlar (sıfır olmayan çıkışla durur) */

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const routes = require("../src/routes.js");
const siteConfig = require("../src/site.config.js");
const company = require("../src/company.js");
const facts = require("../src/content/facts.js");
const pricing = require("../src/content/pricing.js");
const changelog = require("../src/content/changelog.js");
const { loadContentTree } = require("../src/lib/content.js");
const { diffKeyTrees, makeTranslator, interpolateDeep } = require("../src/lib/i18n.js");
const { makeUrlHelper, makeAssetHelper } = require("../src/lib/urls.js");
const { buildSitemap, buildRobots, buildRedirects, buildHeaders } = require("../src/lib/hosting.js");
const { bundleStyles, bundleClientJs } = require("../src/lib/assets-bundle.js");
const legalText = require("../src/lib/legal-text.js");
const { layout } = require("../src/templates/layout.js");
const { stub } = require("../src/templates/pages/stub.js");

const ROOT = path.join(__dirname, "..");
const STATIC_DIR = path.join(ROOT, "src", "static");
const STYLES_DIR = path.join(ROOT, "src", "styles");
const CLIENT_DIR = path.join(ROOT, "src", "client");
const OUT_DIR = path.join(ROOT, "site");

const DEFAULT_TEMPLATES = { stub };

/* --- statik dosya taraması (asset() için var mı kontrolü + hash) --- */
function scanStatic() {
  const files = new Map(); // relPath(posix, "assets/..") -> absPath
  function walk(dir, rel) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(abs, relPath);
      else files.set(relPath.split(path.sep).join("/"), abs);
    }
  }
  walk(STATIC_DIR, "");
  return files;
}

/* src/styles/*.css ve src/client/site.js'i BURADA, gerçekten build.js
   içinde birleştirir (ETKI-ANALIZI §4.2). arayuz-gelistirici'nin elle
   ürettiği src/static/assets/{site.css,site.js} köprü dosyaları bu yüzden
   kaldırıldı — artık tek üretim yeri burası. */
function buildGeneratedAssets() {
  return new Map([
    ["assets/site.css", Buffer.from(bundleStyles(STYLES_DIR), "utf8")],
    ["assets/site.js", Buffer.from(bundleClientJs(CLIENT_DIR), "utf8")]
  ]);
}

/* asset() hem statik dosyaları (src/static/**) hem üretilmiş paketleri
   (assets/site.css, assets/site.js) aynı ad alanından çözebilmeli. */
function buildAssetSources(staticFiles, generatedAssets) {
  const sources = new Map();
  for (const [relPath, abs] of staticFiles) sources.set(relPath, { kind: "file", abs });
  for (const [relPath, buf] of generatedAssets) sources.set(relPath, { kind: "buffer", data: buf });
  return sources;
}

/* Metin varlıklarının satır sonu LF'a sabitlenmesi (?v= hash'i ve site/
   çıktısı için tek kural): git depoyu LF tutuyor (.gitattributes), hash ise
   ham bayttan üretiliyor. CRLF checkout / CRLF editör kaydı, hash'i
   commit'lenen LF varlıktan koparıyor. Binary (png, woff2, …) uzantılar
   listeye girmez, olduğu gibi geçer. */
const TEXT_EXT = new Set([".css", ".js", ".svg", ".txt", ".xml", ".html", ".json"]);
function normalizeTextEol(relPath, data) {
  if (!TEXT_EXT.has(path.extname(relPath).toLowerCase())) return data;
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8");
  if (!buf.includes(0x0d)) return buf;
  return Buffer.from(buf.toString("utf8").replace(/\r\n/g, "\n"), "utf8");
}

function makeAssetCtx(assetSources) {
  return makeAssetHelper({
    exists: (relPath) => assetSources.has(relPath),
    hash: (relPath) => {
      const src = assetSources.get(relPath);
      const data = normalizeTextEol(relPath, src.kind === "file" ? fs.readFileSync(src.abs) : src.data);
      return crypto.createHash("sha1").update(data).digest("hex").slice(0, 8);
    }
  });
}

/* facts.js'ten türeyen, içerikteki {param} yer tutucularının karşılığı
   (ETKI-ANALIZI §4.4 örneği: "Deneme hesabı {trialDays} gün..."). Anahtar
   adları içerik dosyalarında geçen isimlerle birebir aynı olmalı. */
function buildFactParams() {
  return {
    trialDays: facts.hvac.trialDays.value,
    trialUsers: facts.hvac.trialUsers.value,
    partTypes: facts.hvac.partTypes.value,
    demoRoomLimit: facts.cold.demoRoomLimit.value,
    stackOverlapMinPercent: facts.cold.stackOverlapMinPercent.value,
    backendTestCount: facts.cold.backendTestCount.value,
    frontendTestCount: facts.cold.frontendTestCount.value,
    attendanceCodes: facts.puantaj.attendanceCodes.value,
    mobileCodes: facts.puantaj.mobileCodes.value,
    fixedHolidays: facts.puantaj.fixedHolidays.value,
    monthlyBaseDays: facts.puantaj.monthlyBaseDays.value,
    puantajTestCount: facts.puantaj.testCount.value,
    testCount: facts.combined.testCount.value
  };
}

/* --- içerik doğrulama: EN/TR eşliği (eksik anahtar derlemeyi durdurur),
   ardından facts.js parametrelerinin İÇERİK AĞACININ TAMAMINA bir kez
   uygulanması (bkz. src/lib/i18n.js#interpolateDeep — t(path) yalnız tek
   bir yaprağı çözer, bir şablon bütün bir SSS listesini çektiğinde bu
   yetmez). Eksik/yanlış parametre adı burada, derleme anında patlar. --- */
function loadAndValidateContent(config) {
  const tr = loadContentTree("tr");
  const en = loadContentTree("en");
  const diffs = diffKeyTrees(tr, en);
  if (diffs.length > 0) {
    throw new Error(`i18n: TR/EN anahtar ağacı eşleşmiyor:\n  - ${diffs.join("\n  - ")}`);
  }
  const factParams = buildFactParams();
  const resolved = { tr: interpolateDeep(tr, factParams), en: interpolateDeep(en, factParams) };
  /* contact.notice.text statik içerikte yazılıydı (G2); iletişim sayfası
     şablonu (arayuz-gelistirici) bunu doğrudan ctx.content.contact.notice
     üzerinden okuyor. G6 (config yalanı önleme, ADR-7): bu metin de
     form.mode'a göre DEĞİŞMELİ — burada, şablon hiç değiştirilmeden,
     içerik ağacına derleme anında yazılır (bkz. src/lib/legal-text.js). */
  for (const lang of ["tr", "en"]) {
    resolved[lang].contact.notice.text = legalText.contactNotice(config, lang);
  }
  return resolved;
}

/* --- tek bir rota × dil için ctx üretir --- */
function makeCtx({ route, lang, contentTree, urlHelper, assetSources, year, templates, config }) {
  const t = makeTranslator(contentTree, lang);
  const asset = makeAssetCtx(assetSources);
  return {
    lang,
    route,
    t,
    content: contentTree,
    company,
    facts,
    pricing,
    changelog,
    config,
    year,
    url: (routeId, opts) => urlHelper.url(routeId, lang, opts),
    canonical: (routeId) => urlHelper.canonical(routeId, lang),
    altLangPath: (routeId) => urlHelper.altLangPath(routeId, lang),
    asset,
    templates,
    /* G6 (ETKI-ANALIZI ADR-7, §7 "config yalanı"): bu paragraflar
       config.form.mode / config.analytics'ten üretilir, elle iki yerde
       tutulmaz — bkz. src/lib/legal-text.js. */
    legal: {
      transferParagraph: () => legalText.transferParagraph(config, lang),
      cookieParagraph: () => legalText.cookieParagraph(config, lang),
      contactNotice: () => legalText.contactNotice(config, lang),
      bindingNote: () => legalText.bindingNote(lang)
    }
  };
}

function outputPathFor(routePath) {
  // "/fiyatlandirma/" -> "fiyatlandirma/index.html" ; "/" -> "index.html" ; "/404.html" -> "404.html"
  if (routePath.endsWith(".html")) return routePath.replace(/^\//, "");
  const trimmed = routePath.replace(/^\//, "").replace(/\/$/, "");
  return trimmed ? `${trimmed}/index.html` : "index.html";
}

function collectOutputFiles(overrides = {}) {
  const templates = { ...DEFAULT_TEMPLATES, ...(overrides.templates || {}) };
  const config = overrides.config || siteConfig;
  const { tr, en } = loadAndValidateContent(config);
  const urlHelper = makeUrlHelper({ routes, config });
  const staticFiles = scanStatic();
  const generatedAssets = buildGeneratedAssets();
  const assetSources = buildAssetSources(staticFiles, generatedAssets);
  const year = overrides.year || new Date().getFullYear();

  const files = new Map();

  for (const route of routes.enabledRoutes()) {
    for (const lang of ["tr", "en"]) {
      const contentTree = lang === "tr" ? tr : en;
      const ctx = makeCtx({ route, lang, contentTree, urlHelper, assetSources, year, templates, config });
      const body = templates.stub(ctx);
      const htmlDoc = String(layout(ctx, body));
      files.set(outputPathFor(route.path[lang]), htmlDoc);
    }
  }

  // 404 (her iki dil)
  for (const lang of ["tr", "en"]) {
    const contentTree = lang === "tr" ? tr : en;
    const ctx = makeCtx({ route: routes.notfound, lang, contentTree, urlHelper, assetSources, year, templates, config });
    const body = templates.stub(ctx);
    const htmlDoc = String(layout(ctx, body));
    files.set(outputPathFor(routes.notfound.path[lang]), htmlDoc);
  }

  files.set("sitemap.xml", buildSitemap(routes.list, config));
  files.set("robots.txt", buildRobots(config));
  files.set("_redirects", buildRedirects(routes.list));
  files.set("_headers", buildHeaders());

  for (const [relPath, absPath] of staticFiles) {
    files.set(relPath, normalizeTextEol(relPath, fs.readFileSync(absPath)));
  }
  for (const [relPath, buf] of generatedAssets) {
    files.set(relPath, normalizeTextEol(relPath, buf));
  }

  /* Metin çıktılar LF'a sabitlenir: git depoyu LF olarak tutar
     (bkz. .gitattributes), CRLF girdiyle (ör. CRLF kaydedilmiş bir şablon)
     üretilen HTML diske CRLF ile yazılırsa taze klonla bayt bayt tutmaz
     ve check-site kural 1 orada düşer. Buffer'lar (png, woff2, …)
     olduğu gibi kalır. */
  for (const [relPath, content] of files) {
    if (typeof content === "string") files.set(relPath, content.replace(/\r\n/g, "\n"));
  }

  return files;
}

/* --- diske yazma: site/'i önce siler (bayat sayfa kalamaz) --- */
function writeOutput(outDir, files) {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  for (const [relPath, content] of files) {
    const abs = path.join(outDir, ...relPath.split("/"));
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content);
  }
}

/* --- --check: diskteki site/'i beklenen çıktıyla karşılaştırır --- */
function checkOutput(outDir, files) {
  const diffs = [];
  const expectedPaths = new Set(files.keys());
  for (const [relPath, expected] of files) {
    const abs = path.join(outDir, ...relPath.split("/"));
    if (!fs.existsSync(abs)) {
      diffs.push(`eksik: ${relPath}`);
      continue;
    }
    const actual = fs.readFileSync(abs);
    const expectedBuf = Buffer.isBuffer(expected) ? expected : Buffer.from(expected, "utf8");
    if (!actual.equals(expectedBuf)) diffs.push(`farklı: ${relPath}`);
  }
  if (fs.existsSync(outDir)) {
    walkDiskFiles(outDir, "").forEach((relPath) => {
      if (!expectedPaths.has(relPath)) diffs.push(`fazladan: ${relPath}`);
    });
  }
  return diffs;
}

function walkDiskFiles(dir, rel) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walkDiskFiles(abs, relPath));
    else out.push(relPath.split(path.sep).join("/"));
  }
  return out;
}

function main() {
  const checkMode = process.argv.includes("--check");
  const files = collectOutputFiles();
  if (checkMode) {
    const diffs = checkOutput(OUT_DIR, files);
    if (diffs.length > 0) {
      console.error(`build --check: site/ kaynakla eşleşmiyor (${diffs.length} fark):`);
      diffs.slice(0, 50).forEach((d) => console.error(`  - ${d}`));
      process.exitCode = 1;
      return;
    }
    console.log("build --check: site/ kaynakla eşleşiyor.");
    return;
  }
  writeOutput(OUT_DIR, files);
  const pageCount = [...files.keys()].filter((p) => p.endsWith("index.html") || p.endsWith("404.html")).length;
  console.log(`build: ${pageCount} HTML sayfası, ${files.size} toplam dosya → site/`);
}

if (require.main === module) {
  main();
}

module.exports = { collectOutputFiles, writeOutput, checkOutput, outputPathFor, main };
