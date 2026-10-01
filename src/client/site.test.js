"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  parseQueryParam,
  resolveProductPreselect,
  validateContactForm,
  buildMailtoBody,
  buildMailtoUrl
} = require("./site.js");

/* --- parseQueryParam --- */
test("parseQueryParam: verilen anahtarı bulur", () => {
  assert.equal(parseQueryParam("?urun=hvac", "urun"), "hvac");
});
test("parseQueryParam: birden fazla parametreden doğrusunu seçer", () => {
  assert.equal(parseQueryParam("?a=1&urun=cold&b=2", "urun"), "cold");
});
test("parseQueryParam: sorgu boşsa null döner", () => {
  assert.equal(parseQueryParam("", "urun"), null);
  assert.equal(parseQueryParam(null, "urun"), null);
});
test("parseQueryParam: anahtar yoksa null döner", () => {
  assert.equal(parseQueryParam("?a=1", "urun"), null);
});
test("parseQueryParam: yüzde kodlamasını çözer", () => {
  assert.equal(parseQueryParam("?urun=so%C4%9Fuk-hava", "urun"), "soğuk-hava");
});

/* --- resolveProductPreselect --- */
test("resolveProductPreselect: hvac eşleşir", () => {
  const opts = { hvac: "HVAC Pro Suite (havalandırma)", cold: "Soğuk Hava Deposu Yönetim Sistemi" };
  assert.equal(resolveProductPreselect("hvac", opts), opts.hvac);
});
test("resolveProductPreselect: cold ve eşanlamlıları eşleşir", () => {
  const opts = { hvac: "H", cold: "C" };
  assert.equal(resolveProductPreselect("cold", opts), "C");
  assert.equal(resolveProductPreselect("soguk-hava", opts), "C");
  assert.equal(resolveProductPreselect("shd", opts), "C");
});
test("resolveProductPreselect: bilinmeyen değer ya da boş -> null", () => {
  const opts = { hvac: "H", cold: "C" };
  assert.equal(resolveProductPreselect("baska-bir-urun", opts), null);
  assert.equal(resolveProductPreselect(null, opts), null);
  assert.equal(resolveProductPreselect(undefined, opts), null);
});
test("resolveProductPreselect: büyük/küçük harf duyarsız", () => {
  const opts = { hvac: "H", cold: "C" };
  assert.equal(resolveProductPreselect("HVAC", opts), "H");
});

/* --- validateContactForm --- */
const messages = {
  required: "Bu alan zorunludur.",
  invalidEmail: "Geçerli bir e-posta adresi girin.",
  shortDescription: "Lütfen en az 20 karakterlik bir açıklama girin."
};

test("validateContactForm: tüm alanlar dolu ve geçerliyse valid=true", () => {
  const result = validateContactForm({
    name: "Ayşe Yılmaz",
    email: "ayse@firma.com",
    description: "20 kullanıcılı bir işletmeyiz, Excel'den geçmek istiyoruz."
  }, messages);
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});
test("validateContactForm: boş ad -> zorunlu hatası", () => {
  const result = validateContactForm({ name: "", email: "a@b.com", description: "x".repeat(25) }, messages);
  assert.equal(result.valid, false);
  assert.equal(result.errors.name, messages.required);
});
test("validateContactForm: e-posta boşsa zorunlu, doluysa biçim hatası", () => {
  const empty = validateContactForm({ name: "A", email: "", description: "x".repeat(25) }, messages);
  assert.equal(empty.errors.email, messages.required);
  const invalid = validateContactForm({ name: "A", email: "gecersiz", description: "x".repeat(25) }, messages);
  assert.equal(invalid.errors.email, messages.invalidEmail);
});
test("validateContactForm: açıklama 20 karakterden kısaysa hata", () => {
  const result = validateContactForm({ name: "A", email: "a@b.com", description: "kısa" }, messages);
  assert.equal(result.valid, false);
  assert.equal(result.errors.description, messages.shortDescription);
});
test("validateContactForm: telefon/firma alanları isteğe bağlı, hata üretmez", () => {
  const result = validateContactForm({
    name: "A", email: "a@b.com", description: "x".repeat(25), phone: "", company: ""
  }, messages);
  assert.equal(result.valid, true);
});

/* --- buildMailtoBody / buildMailtoUrl --- */
test("buildMailtoBody: yalnız dolu alanları 'Etiket: değer' satırına çevirir", () => {
  const body = buildMailtoBody([
    { label: "Ad Soyad", value: "Ayşe Yılmaz" },
    { label: "Firma", value: "" },
    { label: "E-posta", value: "ayse@firma.com" },
    { label: "Telefon", value: null }
  ]);
  assert.equal(body, "Ad Soyad: Ayşe Yılmaz\r\nE-posta: ayse@firma.com");
});
test("buildMailtoBody: hiç dolu alan yoksa boş dize döner", () => {
  assert.equal(buildMailtoBody([{ label: "Firma", value: "" }]), "");
});
test("buildMailtoUrl: mailto: ile başlar, konu ve gövde kodlanmış olur", () => {
  const url = buildMailtoUrl("info@dijitalpusula.example", "Demo talebi", [
    { label: "Ad Soyad", value: "Ayşe Yılmaz" }
  ]);
  assert.match(url, /^mailto:info@dijitalpusula\.example\?/);
  assert.match(url, /subject=Demo%20talebi/);
  assert.match(url, /body=Ad%20Soyad%3A%20Ay%C5%9Fe/);
});

/* --- turnTo / midiToFreq / ROUTE_TUNES (keşif haritası) --- */
const { turnTo, midiToFreq, ROUTE_TUNES } = require("./site.js");

test("turnTo: en kısa yoldan döner", () => {
  assert.equal(turnTo(0, 90), 90);
  assert.equal(turnTo(0, 315), -45);
  assert.equal(turnTo(350, 10), 370);
  assert.equal(turnTo(-45, 0), 0);
});
test("turnTo: tam turları ekler ve hedef yönde biter", () => {
  const r = turnTo(90, 180, 3);
  assert.equal(r, 90 + 90 + 1080);
  assert.equal(((r % 360) + 360) % 360, 180);
});
test("midiToFreq: A4 440 Hz, oktav iki katı", () => {
  assert.equal(midiToFreq(69), 440);
  assert.ok(Math.abs(midiToFreq(81) - 880) < 1e-9);
});
test("ROUTE_TUNES: ana sayfadaki her harita yuvasının bir ezgisi var", () => {
  for (const key of ["hvac", "demo", "cold", "pricing", "services", "newSectors", "faq", "process"]) {
    assert.ok(ROUTE_TUNES[key] && ROUTE_TUNES[key].notes.length > 0, key);
  }
});
