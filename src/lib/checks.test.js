"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const checks = require("./checks.js");

/* ---------- kural 2: TR/EN içerik eşliği ---------- */

test("kural 2 (checkContentParity): şu anki gerçek içerikte fark yok", () => {
  const result = checks.checkContentParity();
  assert.equal(result.ok, true);
  assert.ok(result.count > 0);
});

test("kural 2: bozuk örnek (bir dilde eksik anahtar) hata verir", () => {
  const tr = { common: { a: { x: "1" } } };
  const en = { common: { a: {} } };
  const result = checks.diffTrees({ tr, en });
  assert.equal(result.ok, false);
  assert.ok(result.diffs.length > 0);
});

/* ---------- kural 3: HTML yapısı ---------- */

const config = { origin: "https://www.dijitalpusula.example" };

function htmlDoc({ lang, canonical, hreflangs, h1Count = 1, ids = ["a"] }) {
  const h1s = Array.from({ length: h1Count }, () => "<h1>Başlık</h1>").join("");
  const idTags = ids.map((id) => `<div id="${id}"></div>`).join("");
  const hreflangTags = hreflangs.map((h) => `<link rel="alternate" hreflang="${h.lang}" href="${h.href}">`).join("\n");
  return `<!doctype html><html lang="${lang}"><head><link rel="canonical" href="${canonical}">\n${hreflangTags}\n</head><body>${h1s}${idTags}</body></html>`;
}

test("kural 3: doğru sayfa (tek h1, doğru lang, kendi canonical'ı, 3 hreflang, benzersiz id) geçer", () => {
  const files = new Map([
    ["index.html", htmlDoc({
      lang: "tr",
      canonical: "https://www.dijitalpusula.example/",
      hreflangs: [
        { lang: "tr", href: "https://www.dijitalpusula.example/" },
        { lang: "en", href: "https://www.dijitalpusula.example/en/" },
        { lang: "x-default", href: "https://www.dijitalpusula.example/" }
      ]
    })]
  ]);
  const result = checks.checkHtmlStructure(files, config);
  assert.equal(result.ok, true, JSON.stringify(result.details));
});

test("kural 3: iki <h1> varsa hata verir", () => {
  const files = new Map([
    ["index.html", htmlDoc({
      lang: "tr", h1Count: 2,
      canonical: "https://www.dijitalpusula.example/",
      hreflangs: [
        { lang: "tr", href: "https://www.dijitalpusula.example/" },
        { lang: "en", href: "https://www.dijitalpusula.example/en/" },
        { lang: "x-default", href: "https://www.dijitalpusula.example/" }
      ]
    })]
  ]);
  const result = checks.checkHtmlStructure(files, config);
  assert.equal(result.ok, false);
  assert.match(result.details.join(" "), /h1/i);
});

test("kural 3: yanlış lang (en/ altında lang=\"tr\") hata verir", () => {
  const files = new Map([
    ["en/index.html", htmlDoc({
      lang: "tr",
      canonical: "https://www.dijitalpusula.example/en/",
      hreflangs: [
        { lang: "tr", href: "https://www.dijitalpusula.example/" },
        { lang: "en", href: "https://www.dijitalpusula.example/en/" },
        { lang: "x-default", href: "https://www.dijitalpusula.example/" }
      ]
    })]
  ]);
  const result = checks.checkHtmlStructure(files, config);
  assert.equal(result.ok, false);
  assert.match(result.details.join(" "), /lang/i);
});

test("kural 3: canonical origin+yol ile uyuşmuyorsa hata verir", () => {
  const files = new Map([
    ["index.html", htmlDoc({
      lang: "tr",
      canonical: "https://yanlis-adres.example/",
      hreflangs: [
        { lang: "tr", href: "https://www.dijitalpusula.example/" },
        { lang: "en", href: "https://www.dijitalpusula.example/en/" },
        { lang: "x-default", href: "https://www.dijitalpusula.example/" }
      ]
    })]
  ]);
  const result = checks.checkHtmlStructure(files, config);
  assert.equal(result.ok, false);
  assert.match(result.details.join(" "), /canonical/i);
});

test("kural 3: hreflang eksikse (yalnız 2 tane) hata verir", () => {
  const files = new Map([
    ["index.html", htmlDoc({
      lang: "tr",
      canonical: "https://www.dijitalpusula.example/",
      hreflangs: [
        { lang: "tr", href: "https://www.dijitalpusula.example/" },
        { lang: "en", href: "https://www.dijitalpusula.example/en/" }
      ]
    })]
  ]);
  const result = checks.checkHtmlStructure(files, config);
  assert.equal(result.ok, false);
  assert.match(result.details.join(" "), /hreflang/i);
});

test("kural 3: tekrarlanan id hata verir", () => {
  const files = new Map([
    ["index.html", htmlDoc({
      lang: "tr", ids: ["ayni", "ayni"],
      canonical: "https://www.dijitalpusula.example/",
      hreflangs: [
        { lang: "tr", href: "https://www.dijitalpusula.example/" },
        { lang: "en", href: "https://www.dijitalpusula.example/en/" },
        { lang: "x-default", href: "https://www.dijitalpusula.example/" }
      ]
    })]
  ]);
  const result = checks.checkHtmlStructure(files, config);
  assert.equal(result.ok, false);
  assert.match(result.details.join(" "), /id/i);
});

test("kural 3: gerçek üretilen site şu anda temiz", () => {
  const build = require("../../tools/build.js");
  const files = build.collectOutputFiles();
  const result = checks.checkHtmlStructure(files, config);
  assert.equal(result.ok, true, JSON.stringify(result.details));
  assert.ok(result.count > 0);
});

/* ---------- kural 4: iç bağlantı/çapa hedefleri ---------- */

test("kural 4 (checkInternalLinks): var olmayan bir hedefe bağlantı hata verir", () => {
  const files = new Map([
    ["index.html", `<html><body><a href="/olmayan-sayfa/">x</a></body></html>`]
  ]);
  const result = checks.checkInternalLinks(files);
  assert.equal(result.ok, false);
  assert.match(result.details.join(" "), /olmayan-sayfa/);
});

test("kural 4: kapalı bir rotaya (routes.js enabled:false) bağlantı hata verir", () => {
  const files = new Map([
    ["index.html", `<html><body><a href="/hakkimizda/">x</a></body></html>`]
  ]);
  const result = checks.checkInternalLinks(files);
  assert.equal(result.ok, false);
  assert.match(result.details.join(" "), /kapalı/i);
});

test("kural 4: yalnız <a href> denetlenir — <link>/<use> gibi öznitelikler yok sayılır (İTİRAZ madde 8 regresyonu)", () => {
  const files = new Map([
    ["index.html", `<html><head><link rel="stylesheet" href="/assets/olmayan.css"></head>
      <body><svg><use href="/assets/icons.svg#icon-check"></use></svg>
      <a href="/">ana sayfa</a></body></html>`]
  ]);
  const result = checks.checkInternalLinks(files);
  assert.equal(result.ok, true, JSON.stringify(result.details));
});

test("kural 4: ?query dizesi taşıyan <a href> doğru sayfaya çözülür (İTİRAZ madde 8 regresyonu)", () => {
  const files = new Map([
    ["index.html", `<html><body><a href="/iletisim/?urun=hvac">demo</a></body></html>`],
    ["iletisim/index.html", `<html><body>ok</body></html>`]
  ]);
  const result = checks.checkInternalLinks(files);
  assert.equal(result.ok, true, JSON.stringify(result.details));
});

test("kural 4: gerçek üretilen sitede tüm bağlantılar geçerli", () => {
  const build = require("../../tools/build.js");
  const files = build.collectOutputFiles();
  const result = checks.checkInternalLinks(files);
  assert.equal(result.ok, true, JSON.stringify(result.details));
  assert.ok(result.count > 0);
});

/* ---------- kural 5: görseller ---------- */

test("kural 5 (checkImages): width/height/alt eksik img hata verir", () => {
  const files = new Map([["index.html", `<html><body><img src="/assets/x.webp"></body></html>`]]);
  const result = checks.checkImages(files);
  assert.equal(result.ok, false);
});

test("kural 5: width/height/alt (boş alt dahil) tam olan img geçer", () => {
  const files = new Map([["index.html", `<html><body><img src="/assets/x.webp" width="10" height="10" alt=""></body></html>`]]);
  const result = checks.checkImages(files);
  assert.equal(result.ok, true);
});

/* ---------- kural 6: JSON-LD ---------- */

test("kural 6 (checkJsonLd): bozuk JSON hata verir", () => {
  const files = new Map([["index.html", `<html><head><script type="application/ld+json">{bozuk</script></head></html>`]]);
  const result = checks.checkJsonLd(files, {});
  assert.equal(result.ok, false);
});

test("kural 6: aggregateRating içeren şema hata verir", () => {
  const files = new Map([["index.html", `<html><head><script type="application/ld+json">${JSON.stringify({ "@type": "Product", aggregateRating: { ratingValue: 5 } })}</script></head></html>`]]);
  const result = checks.checkJsonLd(files, {});
  assert.equal(result.ok, false);
  assert.match(result.details.join(" "), /aggregateRating/);
});

test("kural 6: gerçek üretilen sitede tüm JSON-LD ayrıştırılıyor, aggregateRating yok", () => {
  const build = require("../../tools/build.js");
  const files = build.collectOutputFiles();
  const result = checks.checkJsonLd(files, {});
  assert.equal(result.ok, true, JSON.stringify(result.details));
  assert.ok(result.count > 0);
});

/* ---------- kural 7: sitemap/robots ---------- */

test("kural 7 (checkSitemapAndRobots): eksik sitemap hata verir", () => {
  const files = new Map([["robots.txt", "User-agent: *"]]);
  const result = checks.checkSitemapAndRobots(files, config);
  assert.equal(result.ok, false);
});

test("kural 7: gerçek üretilen sitede sitemap = açık rota × 2 dil, robots sitemap'e işaret eder", () => {
  const build = require("../../tools/build.js");
  const files = build.collectOutputFiles();
  const result = checks.checkSitemapAndRobots(files, config);
  assert.equal(result.ok, true, JSON.stringify(result.details));
});

/* ---------- kural 8: yasaklı adres/domain dizeleri ---------- */

test("kural 8 (checkNoLeakedHosts): github.io geçen içerik hata verir", () => {
  const files = new Map([["index.html", `<a href="https://biltekinhamza.github.io/dijital-pusula/">eski</a>`]]);
  const result = checks.checkNoLeakedHosts(files);
  assert.equal(result.ok, false);
});

test("kural 8: gerçek üretilen sitede hiçbiri geçmiyor", () => {
  const build = require("../../tools/build.js");
  const files = build.collectOutputFiles();
  const result = checks.checkNoLeakedHosts(files);
  assert.equal(result.ok, true, JSON.stringify(result.details));
});

/* ---------- kural 9: yasak iddia + facts source ---------- */

test("kural 9 (checkForbiddenClaims): yasak ifade içeren içerik dosyası hata verir", () => {
  const sourceFiles = new Map([["src/content/tr/home.js", 'module.exports = { x: "Kartla online ödeme alıyoruz" };']]);
  const result = checks.checkForbiddenClaims(sourceFiles);
  assert.equal(result.ok, false);
});

test("kural 9: BÜYÜK NOKTALI İ ile yazılmış yasak ifade de yakalanır (D-003, INCELEME bulgusu)", () => {
  const sourceFiles = new Map([["src/content/tr/hvac.js", 'module.exports = { a: "Excel\'den İçe Aktarın" };']]);
  const result = checks.checkForbiddenClaims(sourceFiles);
  assert.equal(result.ok, false, "büyük İ ile yazılmış \"içe aktarın\" yakalanmalıydı");
  assert.match(result.details.join(" "), /içe aktarın/);
});

test("kural 9: gerçek içerik dosyalarında yasak ifade yok", () => {
  const result = checks.checkForbiddenClaimsOnDisk();
  assert.equal(result.ok, true, JSON.stringify(result.details));
});

test("kural 9: facts.js'te boş source hata verir", () => {
  const badFacts = { hvac: { x: { value: 1, source: "", checkedAt: "2026-09-28" } } };
  const result = checks.checkFactsSourced(badFacts);
  assert.equal(result.ok, false);
});

test("kural 9: gerçek facts.js'te her source dolu", () => {
  const facts = require("../content/facts.js");
  const result = checks.checkFactsSourced(facts);
  assert.equal(result.ok, true);
});

/* ---------- kural 10: MADDE 5 zorunlu alanlar ---------- */

test("kural 10 (checkCompanyMandatoryFields): eksik alanlarda normalde uyarı, --release'te hata", () => {
  const incomplete = { legalName: "X", email: "a@b.com", phone: "1", addressTr: "adres" }; // kep/mersis/vkn/chamber yok
  const warn = checks.checkCompanyMandatoryFields(incomplete, { release: false });
  assert.equal(warn.ok, true); // uyarı = derlemeyi durdurmaz
  assert.ok(warn.details.length > 0);
  const release = checks.checkCompanyMandatoryFields(incomplete, { release: true });
  assert.equal(release.ok, false);
});

test("kural 10: MERSİS ya da VKN'den biri + diğer zorunlu alanlar varsa --release'te de geçer", () => {
  const complete = {
    legalName: "X", email: "a@b.com", phone: "1", addressTr: "adres",
    kep: "x@hs01.kep.tr", mersis: "1234567890123456", chamber: "Oda"
  };
  const result = checks.checkCompanyMandatoryFields(complete, { release: true });
  assert.equal(result.ok, true);
});

/* ---------- kural 11: origin yer tutucu ---------- */

test("kural 11 (checkOriginPlaceholder): .example içeren origin normalde uyarı, --release'te hata", () => {
  const warn = checks.checkOriginPlaceholder({ origin: "https://a.example" }, { release: false });
  assert.equal(warn.ok, true);
  const release = checks.checkOriginPlaceholder({ origin: "https://a.example" }, { release: true });
  assert.equal(release.ok, false);
});

test("kural 11: gerçek alan adında geçer", () => {
  const result = checks.checkOriginPlaceholder({ origin: "https://www.dijitalpusula.com" }, { release: true });
  assert.equal(result.ok, true);
});

/* ---------- kural 12: fiyat tazeliği ---------- */

test("kural 12 (checkPricingFreshness): 90 günden eski updatedAt uyarı verir", () => {
  const old = new Date();
  old.setDate(old.getDate() - 91);
  const iso = old.toISOString().slice(0, 10);
  const result = checks.checkPricingFreshness({ updatedAt: iso });
  assert.equal(result.ok, false);
});

test("kural 12: güncel tarih geçer", () => {
  const today = new Date().toISOString().slice(0, 10);
  const result = checks.checkPricingFreshness({ updatedAt: today });
  assert.equal(result.ok, true);
});

/* ---------- kural 13: endpoint kipinde sağlayıcı zorunlu ---------- */

test("kural 13 (checkFormEndpointConfig): endpoint kipinde boş sağlayıcı hata verir", () => {
  const result = checks.checkFormEndpointConfig({ form: { mode: "endpoint", provider: { name: "", country: "" } } });
  assert.equal(result.ok, false);
});

test("kural 13: mailto kipinde sağlayıcı gerekmez", () => {
  const result = checks.checkFormEndpointConfig({ form: { mode: "mailto", provider: {} } });
  assert.equal(result.ok, true);
});

/* ---------- kural 1: build --check ---------- */

test("kural 1 (checkBuildMatches): temiz site/ dizininde fark yok", () => {
  const build = require("../../tools/build.js");
  const os = require("node:os");
  const path = require("node:path");
  const fs = require("node:fs");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dp-check-"));
  try {
    const files = build.collectOutputFiles();
    build.writeOutput(tmp, files);
    const result = checks.checkBuildMatches(tmp);
    assert.equal(result.ok, true);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
