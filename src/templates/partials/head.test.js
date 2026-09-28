"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { head } = require("./head.js");
const routes = require("../../routes.js");
const siteConfig = require("../../site.config.js");
const company = require("../../company.js");
const pricing = require("../../content/pricing.js");
const { loadContentTree } = require("../../lib/content.js");
const { makeTranslator } = require("../../lib/i18n.js");
const { makeUrlHelper } = require("../../lib/urls.js");

function makeCtx(routeId, lang) {
  const route = routes.get(routeId);
  const content = loadContentTree(lang);
  const t = makeTranslator(content, lang);
  const urlHelper = makeUrlHelper({ routes, config: siteConfig });
  return {
    lang,
    route,
    t,
    content,
    company,
    config: siteConfig,
    pricing,
    canonical: (id) => urlHelper.canonical(id, lang),
    asset: (relPath) => `/${relPath}`
  };
}

function notfoundCtx(lang) {
  const content = loadContentTree(lang);
  const t = makeTranslator(content, lang);
  return {
    lang,
    route: routes.notfound,
    t,
    content,
    company,
    config: siteConfig,
    pricing,
    canonical: () => siteConfig.origin + routes.notfound.path[lang],
    asset: (relPath) => `/${relPath}`
  };
}

test("head(): title ve description meta.* dosyasindan gelir", () => {
  const out = String(head(makeCtx("home", "tr")));
  assert.match(out, /<title>.*Dijital Pusula.*<\/title>/);
  assert.match(out, /<meta name="description" content="[^"]+">/);
});

test("head(): canonical dogru dil ve origin ile uretilir", () => {
  const out = String(head(makeCtx("pricing", "en")));
  assert.match(out, /<link rel="canonical" href="https:\/\/www\.dijitalpusula\.example\/en\/pricing\/">/);
});

test("head(): uc hreflang bagi var (tr, en, x-default), her biri kendini de listeler", () => {
  const out = String(head(makeCtx("hvac", "tr")));
  assert.match(out, /hreflang="tr" href="https:\/\/www\.dijitalpusula\.example\/hvac-pro-suite\/"/);
  assert.match(out, /hreflang="en" href="https:\/\/www\.dijitalpusula\.example\/en\/hvac-pro-suite\/"/);
  assert.match(out, /hreflang="x-default"/);
});

test("head(): Organization JSON-LD her sayfada var", () => {
  const out = String(head(makeCtx("services", "tr")));
  assert.match(out, /"@type":"Organization"/);
});

test("head(): SoftwareApplication yalnız ürün sayfasında (hvac/cold) basılır", () => {
  const productOut = String(head(makeCtx("hvac", "tr")));
  assert.match(productOut, /"@type":"SoftwareApplication"/);
  const nonProductOut = String(head(makeCtx("services", "tr")));
  assert.doesNotMatch(nonProductOut, /"@type":"SoftwareApplication"/);
});

test("head(): tüm planlar quote modundayken AggregateOffer hiç basılmaz", () => {
  const out = String(head(makeCtx("hvac", "tr")));
  assert.doesNotMatch(out, /AggregateOffer/);
});

test("head(): aggregateRating hiçbir sayfada basılmaz (kural 6)", () => {
  const out = String(head(makeCtx("home", "tr")));
  assert.doesNotMatch(out, /aggregateRating/i);
});

test("head(): FAQPage yalnız ana sayfada (SSS içeriği olan) basılır", () => {
  const homeOut = String(head(makeCtx("home", "tr")));
  assert.match(homeOut, /"@type":"FAQPage"/);
  const contactOut = String(head(makeCtx("contact", "tr")));
  assert.doesNotMatch(contactOut, /"@type":"FAQPage"/);
});

test("head(): BreadcrumbList ana sayfada ve 404'te basılmaz, diğer sayfalarda basılır", () => {
  assert.doesNotMatch(String(head(makeCtx("home", "tr"))), /BreadcrumbList/);
  assert.doesNotMatch(String(head(notfoundCtx("tr"))), /BreadcrumbList/);
  assert.match(String(head(makeCtx("contact", "tr"))), /BreadcrumbList/);
});

test("head(): 404 sayfası için canonical kök-mutlak /404.html ve /en/404.html", () => {
  assert.match(String(head(notfoundCtx("tr"))), /canonical" href="https:\/\/www\.dijitalpusula\.example\/404\.html"/);
  assert.match(String(head(notfoundCtx("en"))), /canonical" href="https:\/\/www\.dijitalpusula\.example\/en\/404\.html"/);
});

/* ---------- og:image (arayuz-gelistirici İTİRAZ madde 7) ---------- */

test("head(): og:image/twitter:image mutlak URL olarak basılır, ürün sayfası kendi görselini kullanır", () => {
  const out = String(head(makeCtx("hvac", "tr")));
  assert.match(out, /<meta property="og:image" content="https:\/\/www\.dijitalpusula\.example\/assets\/og\/og-hvac\.png">/);
  assert.match(out, /<meta name="twitter:image" content="https:\/\/www\.dijitalpusula\.example\/assets\/og\/og-hvac\.png">/);
  assert.match(out, /og:image:width" content="1200"/);
  assert.match(out, /og:image:height" content="630"/);
});

test("head(): EN sayfada og:image dosya adına -en eki eklenir", () => {
  const out = String(head(makeCtx("cold", "en")));
  assert.match(out, /og:image" content="https:\/\/www\.dijitalpusula\.example\/assets\/og\/og-cold-en\.png"/);
});

test("head(): kendi görseli olmayan sayfa (ör. iletişim) og-home'a düşer", () => {
  const out = String(head(makeCtx("contact", "tr")));
  assert.match(out, /og:image" content="https:\/\/www\.dijitalpusula\.example\/assets\/og\/og-home\.png"/);
});
