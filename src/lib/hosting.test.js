"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { buildSitemap, buildRobots, buildRedirects, buildHeaders } = require("./hosting.js");

const routes = [
  { id: "home", path: { tr: "/", en: "/en/" }, enabled: true, legacy: [] },
  { id: "hvac", path: { tr: "/hvac-pro-suite/", en: "/en/hvac-pro-suite/" }, enabled: true, legacy: ["/havalandirma-yazilimi.html", "/havalandirma-yazilimi"] },
  { id: "about", path: { tr: "/hakkimizda/", en: "/en/about/" }, enabled: false, legacy: [] }
];
const config = { origin: "https://www.dijitalpusula.example" };

test("buildSitemap: yalnız açık rotalar, her biri x2 dil, xhtml:link alternatifleriyle", () => {
  const xml = buildSitemap(routes, config);
  assert.equal((xml.match(/<url>/g) || []).length, 4); // 2 acik rota x 2 dil
  assert.match(xml, /xhtml:link/);
  assert.doesNotMatch(xml, /hakkimizda/); // kapalı rota sitemap'te yok
});

test("buildSitemap: her <loc> origin ile başlar", () => {
  const xml = buildSitemap(routes, config);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.length > 0);
  for (const loc of locs) assert.ok(loc.startsWith(config.origin));
});

test("buildRobots: sitemap'e işaret eder", () => {
  const txt = buildRobots(config);
  assert.match(txt, /Sitemap: https:\/\/www\.dijitalpusula\.example\/sitemap\.xml/);
  assert.match(txt, /User-agent: \*/);
});

test("buildRedirects: routes.js legacy alanından üretilir, satır sayısı legacy girdi sayısına eşit", () => {
  const txt = buildRedirects(routes);
  const lines = txt.trim().split("\n").filter(Boolean);
  assert.equal(lines.length, 2); // hvac'ın 2 legacy girdisi
  assert.match(txt, /\/havalandirma-yazilimi\.html\s+\/hvac-pro-suite\/\s+301/);
});

test("buildRedirects: kapalı rotanın legacy'si olsa bile üretilmez", () => {
  const withDisabledLegacy = [...routes, { id: "x", path: { tr: "/x/", en: "/en/x/" }, enabled: false, legacy: ["/old-x.html"] }];
  const txt = buildRedirects(withDisabledLegacy);
  assert.doesNotMatch(txt, /old-x/);
});

test("buildHeaders: güvenlik başlıkları içerir", () => {
  const txt = buildHeaders();
  assert.match(txt, /X-Content-Type-Options: nosniff/);
  assert.match(txt, /X-Frame-Options: DENY/);
  assert.match(txt, /Referrer-Policy: strict-origin-when-cross-origin/);
});
