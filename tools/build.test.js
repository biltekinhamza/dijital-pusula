"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");

const build = require("./build.js");
const routes = require("../src/routes.js");

/* Map değerleri Buffer olabilir (statik/üretilmiş varlıklar) ya da string
   (HTML). Buffer'lar için `!==` her zaman true döner (referans karşılaştırır,
   içerik değil) — bu yüzden içerik eşitliğini Buffer.equals() ile, string
   için normal `!==` ile kontrol ediyoruz (arayuz-gelistirici İTİRAZ madde 8). */
function contentDiffers(a, b) {
  if (Buffer.isBuffer(a) || Buffer.isBuffer(b)) {
    const bufA = Buffer.isBuffer(a) ? a : Buffer.from(String(a), "utf8");
    const bufB = Buffer.isBuffer(b) ? b : Buffer.from(String(b), "utf8");
    return !bufA.equals(bufB);
  }
  return a !== b;
}

test("contentDiffers: aynı baytlı iki ayrı Buffer nesnesi FARKLI sayılmaz (arayuz-gelistirici İTİRAZ madde 8 regresyon testi)", () => {
  const a = Buffer.from("aynı içerik", "utf8");
  const b = Buffer.from("aynı içerik", "utf8");
  assert.notEqual(a, b); // referans olarak farklı nesneler (naif `!==` burada yanlış "farklı" derdi)
  assert.equal(contentDiffers(a, b), false);
  assert.equal(contentDiffers(a, Buffer.from("başka içerik", "utf8")), true);
});

function hashOf(files) {
  const h = crypto.createHash("sha256");
  for (const relPath of [...files.keys()].sort()) {
    h.update(relPath);
    h.update("\u0000");
    h.update(files.get(relPath));
    h.update("\u0000");
  }
  return h.digest("hex");
}

test("collectOutputFiles(): açık rota sayısı × 2 dil + 2×404 kadar HTML üretir", () => {
  const files = build.collectOutputFiles();
  const htmlPaths = [...files.keys()].filter((p) => p.endsWith(".html") || p.endsWith("/index.html") || p === "404.html" || p === "en/404.html" || p.endsWith("index.html"));
  const expectedPages = routes.enabledRoutes().length * 2 + 2;
  const pageLike = [...files.keys()].filter((p) => p.endsWith("index.html") || p.endsWith("404.html"));
  assert.equal(pageLike.length, expectedPages, `beklenen ${expectedPages}, bulunan ${pageLike.length}: ${pageLike.join(", ")}`);
});

test("collectOutputFiles(): sitemap.xml, robots.txt, _redirects, _headers üretir", () => {
  const files = build.collectOutputFiles();
  assert.ok(files.has("sitemap.xml"));
  assert.ok(files.has("robots.txt"));
  assert.ok(files.has("_redirects"));
  assert.ok(files.has("_headers"));
});

test("belirlenimci: iki art arda çalıştırma bayt bayt aynı çıktıyı üretir", () => {
  const first = build.collectOutputFiles();
  const second = build.collectOutputFiles();
  assert.equal(hashOf(first), hashOf(second));
});

test("metin çıktılar LF sabit — CRLF girdi taze klonla bayt bayt tutmaz (check-site kural 1 regresyonu)", () => {
  const files = build.collectOutputFiles();
  const textExt = new Set([".css", ".js", ".svg", ".txt", ".xml", ".html", ".json"]);
  const offenders = [];
  for (const [relPath, content] of files) {
    const isText = typeof content === "string" || textExt.has(path.extname(relPath).toLowerCase());
    if (!isText) continue; // png, woff2: binary, olduğu gibi
    const buf = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8");
    if (buf.includes(0x0d)) offenders.push(relPath);
  }
  assert.deepEqual(offenders, []);
});

test("?v=, üretilen asset'in kendi baytından hesaplanan hash ile aynı (hash/asset uyuşmazlığı regresyonu)", () => {
  const files = build.collectOutputFiles();
  const home = files.get("index.html");
  for (const assetRel of ["assets/site.css", "assets/site.js"]) {
    const expected = crypto.createHash("sha1").update(files.get(assetRel)).digest("hex").slice(0, 8);
    assert.ok(
      home.includes(`${assetRel}?v=${expected}`),
      `index.html içinde ${assetRel}?v=${expected} bulunamadı`
    );
  }
});

test("her HTML sayfasında tek <h1> var", () => {
  const files = build.collectOutputFiles();
  for (const [relPath, content] of files) {
    if (!relPath.endsWith(".html")) continue;
    const count = (content.match(/<h1[ >]/g) || []).length;
    assert.equal(count, 1, `${relPath}: ${count} adet <h1>`);
  }
});

test("bir EN anahtarı yapay olarak silinince derleme anahtar yolunu yazarak durur", () => {
  const Module = require("node:module");
  const enHomePath = require.resolve("../src/content/en/home.js");
  delete require.cache[enHomePath];
  const original = fs.readFileSync(enHomePath, "utf8");
  const broken = original.replace('"title":', '"__renamed_title__":');
  fs.writeFileSync(enHomePath, broken, "utf8");
  try {
    assert.throws(() => build.collectOutputFiles(), /home\.hero\.title|i18n/);
  } finally {
    fs.writeFileSync(enHomePath, original, "utf8");
    delete require.cache[enHomePath];
  }
});

test("kapalı bir rotaya url() çağrısı derlemeyi durdurur", () => {
  const badTemplates = { stub: (ctx) => { ctx.url("about"); return "x"; } };
  assert.throws(() => build.collectOutputFiles({ templates: badTemplates }), /kapalı/i);
});

test("G6 bitti ölçütü: form.mode mailto↔endpoint iki derlemede yalnız aktarım/iletişim paragrafı farklı", () => {
  const siteConfig = require("../src/site.config.js");
  const mailtoFiles = build.collectOutputFiles({ config: { ...siteConfig, form: { mode: "mailto", provider: {} } } });
  const endpointFiles = build.collectOutputFiles({
    config: { ...siteConfig, form: { mode: "endpoint", provider: { name: "Web3Forms", country: "ABD" } } }
  });
  assert.deepEqual([...mailtoFiles.keys()].sort(), [...endpointFiles.keys()].sort());

  const differingFiles = [];
  for (const [relPath, mailtoContent] of mailtoFiles) {
    const endpointContent = endpointFiles.get(relPath);
    if (contentDiffers(mailtoContent, endpointContent)) differingFiles.push(relPath);
  }
  // Yalnız aktarım paragrafını (legal-privacy) ve iletişim notunu (contact)
  // taşıyan sayfalar farklı olmalı — her ikisi de 2 dilde üretilir.
  assert.deepEqual(differingFiles.sort(), [
    "en/contact/index.html",
    "en/legal/privacy-notice/index.html",
    "iletisim/index.html",
    "yasal/kvkk-aydinlatma-metni/index.html"
  ].sort());

  for (const relPath of ["yasal/kvkk-aydinlatma-metni/index.html", "iletisim/index.html"]) {
    const before = mailtoFiles.get(relPath);
    const after = endpointFiles.get(relPath);
    assert.match(before, /e-posta/);
    assert.match(after, /Web3Forms/);
  }
});

test("G6: analytics none↔cloudflare iki derlemede yalnız çerez paragrafı taşıyan sayfalar farklı", () => {
  const siteConfig = require("../src/site.config.js");
  const noneFiles = build.collectOutputFiles({ config: { ...siteConfig, analytics: "none" } });
  const cfFiles = build.collectOutputFiles({ config: { ...siteConfig, analytics: "cloudflare" } });
  const differingFiles = [];
  for (const [relPath, a] of noneFiles) {
    if (contentDiffers(a, cfFiles.get(relPath))) differingFiles.push(relPath);
  }
  assert.deepEqual(differingFiles.sort(), [
    "en/legal/cookie-policy/index.html",
    "en/legal/privacy-notice/index.html",
    "yasal/cerez-politikasi/index.html",
    "yasal/kvkk-aydinlatma-metni/index.html"
  ].sort());
});

test("writeOutput + checkOutput: bozulmuş site/ dizinini yakalar", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dp-build-"));
  try {
    const files = build.collectOutputFiles();
    build.writeOutput(tmp, files);
    const cleanDiff = build.checkOutput(tmp, files);
    assert.deepEqual(cleanDiff, []);

    const anyHtml = [...files.keys()].find((p) => p.endsWith("index.html"));
    fs.writeFileSync(path.join(tmp, anyHtml), "<html>bozuldu</html>", "utf8");
    const dirtyDiff = build.checkOutput(tmp, files);
    assert.ok(dirtyDiff.length > 0);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
