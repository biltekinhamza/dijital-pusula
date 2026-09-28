"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  productState,
  primaryCta,
  planPrice,
  formMode,
  analyticsMode
} = require("./model.js");

/* --- productState(): products.<id>.status enum (live | early-access) --- */

test("productState: 'live' → isLive true, doğru rozet anahtarı", () => {
  const s = productState({ status: "live" });
  assert.equal(s.isLive, true);
  assert.equal(s.badgeKey, "state.live");
});

test("productState: 'early-access' → isLive false", () => {
  const s = productState({ status: "early-access" });
  assert.equal(s.isLive, false);
  assert.equal(s.badgeKey, "state.earlyAccess");
});

test("productState: bilinmeyen değer derlemeyi durdurur (hata fırlatır)", () => {
  assert.throws(() => productState({ status: "beta" }), /status/);
});

/* --- primaryCta(): products.<id>.trial.mode (self-serve | request) --- */

test("primaryCta: self-serve + url verilmişse deneme bağlantısı döner", () => {
  const t = (k) => ({ "cta.tryFree": "Ücretsiz Deneyin" }[k]);
  const cta = primaryCta({ id: "hvac", trial: { mode: "self-serve", url: "https://app.example/register" } }, t);
  assert.equal(cta.label, "Ücretsiz Deneyin");
  assert.equal(cta.href, "https://app.example/register");
});

test("primaryCta: self-serve ama url boşsa hata fırlatır", () => {
  const t = () => "x";
  assert.throws(() => primaryCta({ id: "hvac", trial: { mode: "self-serve", url: "" } }, t), /url/);
});

test("primaryCta: request kipinde iletişime yönlendirir, ürün parametresi taşır", () => {
  const t = (k) => ({ "cta.requestTrial": "Deneme Hesabı İsteyin" }[k]);
  const cta = primaryCta({ id: "cold", trial: { mode: "request" } }, t);
  assert.equal(cta.label, "Deneme Hesabı İsteyin");
  assert.equal(cta.routeId, "contact");
  assert.deepEqual(cta.params, { urun: "cold" });
});

test("primaryCta: bilinmeyen trial.mode derlemeyi durdurur", () => {
  const t = () => "x";
  assert.throws(() => primaryCta({ id: "x", trial: { mode: "invite-only" } }, t), /trial\.mode/);
});

/* --- planPrice(): pricing.<id>.plans[].price.mode (fixed|from|quote) --- */

test("planPrice: fixed kipte aylık/yıllık tamsayı TL basar", () => {
  const p = planPrice({ mode: "fixed", monthly: 1500, yearly: 15000 });
  assert.equal(p.mode, "fixed");
  assert.match(p.monthlyLabel, /1\.500/);
  assert.match(p.yearlyLabel, /15\.000/);
});

test("planPrice: fixed kipte float fiyat hata fırlatır (para tamsayı olmalı)", () => {
  assert.throws(() => planPrice({ mode: "fixed", monthly: 1500.5 }), /tamsayı/);
});

test("planPrice: from kipte yalnız aylık taban rakam ister", () => {
  const p = planPrice({ mode: "from", monthly: 900 });
  assert.match(p.fromLabel, /900/);
});

test("planPrice: quote kipte rakam üretmez", () => {
  const p = planPrice({ mode: "quote" });
  assert.equal(p.monthlyLabel, undefined);
  assert.equal(p.yearlyLabel, undefined);
  assert.equal(p.mode, "quote");
});

test("planPrice: bilinmeyen mode derlemeyi durdurur", () => {
  assert.throws(() => planPrice({ mode: "auction" }), /price\.mode/);
});

/* --- formMode(): config.form.mode (mailto|endpoint) --- */

test("formMode: mailto kipinde sağlayıcı zorunlu değil", () => {
  assert.equal(formMode({ form: { mode: "mailto", provider: {} } }), "mailto");
});

test("formMode: endpoint kipinde sağlayıcı adı/ülkesi boşsa hata fırlatır (kural 13)", () => {
  assert.throws(() => formMode({ form: { mode: "endpoint", provider: { name: "", country: "" } } }), /provider/);
});

test("formMode: endpoint kipinde sağlayıcı doluysa geçer", () => {
  assert.equal(formMode({ form: { mode: "endpoint", provider: { name: "Web3Forms", country: "ABD" } } }), "endpoint");
});

test("formMode: bilinmeyen mode derlemeyi durdurur", () => {
  assert.throws(() => formMode({ form: { mode: "webhook", provider: {} } }), /form\.mode/);
});

/* --- analyticsMode(): config.analytics (none|cloudflare) --- */

test("analyticsMode: geçerli değerleri kabul eder", () => {
  assert.equal(analyticsMode({ analytics: "none" }), "none");
  assert.equal(analyticsMode({ analytics: "cloudflare" }), "cloudflare");
});

test("analyticsMode: bilinmeyen değer derlemeyi durdurur", () => {
  assert.throws(() => analyticsMode({ analytics: "google" }), /analytics/);
});
