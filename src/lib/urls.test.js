"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { makeUrlHelper, makeAssetHelper } = require("./urls.js");

const routes = {
  get(id) {
    const table = {
      home: { path: { tr: "/", en: "/en/" }, enabled: true },
      pricing: { path: { tr: "/fiyatlandirma/", en: "/en/pricing/" }, enabled: true },
      about: { path: { tr: "/hakkimizda/", en: "/en/about/" }, enabled: false }
    };
    if (!table[id]) throw new Error(`routes: bilinmeyen rota kimligi "${id}"`);
    return table[id];
  },
  notfound: { path: { tr: "/404.html", en: "/en/404.html" } }
};

const config = { origin: "https://www.dijitalpusula.example" };

test("url(): acik rota icin dogru dildeki kok-mutlak yolu doner", () => {
  const { url } = makeUrlHelper({ routes, config });
  assert.equal(url("home", "tr"), "/");
  assert.equal(url("pricing", "en"), "/en/pricing/");
});

test("url(): hash verilirse capa eklenir", () => {
  const { url } = makeUrlHelper({ routes, config });
  assert.equal(url("pricing", "tr", { hash: "hvac" }), "/fiyatlandirma/#hvac");
});

test("url(): KAPALI rotaya cagri derlemeyi durdurur (hata firlatir)", () => {
  const { url } = makeUrlHelper({ routes, config });
  assert.throws(() => url("about", "tr"), /kapal/i);
});

test("url(): bilinmeyen rota kimliginde hata firlatir", () => {
  const { url } = makeUrlHelper({ routes, config });
  assert.throws(() => url("yok-boyle-bir-rota", "tr"));
});

test("canonical(): origin + yol, sondaki / origin'de tekrarlanmaz", () => {
  const { canonical } = makeUrlHelper({ routes, config });
  assert.equal(canonical("home", "tr"), "https://www.dijitalpusula.example/");
  assert.equal(canonical("pricing", "en"), "https://www.dijitalpusula.example/en/pricing/");
});

test("altLangPath(): karsi dilin ayni rotasina giden yolu doner", () => {
  const { altLangPath } = makeUrlHelper({ routes, config });
  assert.equal(altLangPath("pricing", "tr"), "/en/pricing/");
  assert.equal(altLangPath("pricing", "en"), "/fiyatlandirma/");
});

/* --- asset() --- */

test("asset(): var olan dosya icin kok-mutlak yol doner", () => {
  const exists = (p) => p === "assets/favicon.svg";
  const hash = () => "deadbeef";
  const asset = makeAssetHelper({ exists, hash });
  assert.equal(asset("assets/favicon.svg"), "/assets/favicon.svg");
});

test("asset(): css/js dosyasina icerik hash'i (?v=) eklenir", () => {
  const exists = () => true;
  const hash = () => "abc12345";
  const asset = makeAssetHelper({ exists, hash });
  assert.equal(asset("assets/site.css"), "/assets/site.css?v=abc12345");
});

test("asset(): dosya yoksa derlemeyi durdurur (hata firlatir)", () => {
  const exists = () => false;
  const hash = () => "x";
  const asset = makeAssetHelper({ exists, hash });
  assert.throws(() => asset("assets/eksik.png"), /assets\/eksik\.png/);
});
