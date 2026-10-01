"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const routes = require("./routes.js");

test("enabledRoutes(): açık rota sayısı 10 (ETKI-ANALIZI §3.2 tablosundaki 9 + Puantaj Pro Suite)", () => {
  assert.equal(routes.enabledRoutes().length, 10);
});

test("her rotanın tr ve en yolu / ile başlar ve / ile biter (notfound hariç)", () => {
  for (const route of routes.list) {
    assert.match(route.path.tr, /^\/.*\/$|^\/$/);
    assert.match(route.path.en, /^\/.*\/$|^\/$/);
  }
});

test("get(): kapalı rotalar da tabloda bulunur (yalnız url() üretimi engellenir)", () => {
  const about = routes.get("about");
  assert.equal(about.enabled, false);
});

test("get(): bilinmeyen kimlikte hata fırlatır", () => {
  assert.throws(() => routes.get("olmayan-rota"));
});

test("notfound: tr ve en 404 yolu tanımlı", () => {
  assert.equal(routes.notfound.path.tr, "/404.html");
  assert.equal(routes.notfound.path.en, "/en/404.html");
});
