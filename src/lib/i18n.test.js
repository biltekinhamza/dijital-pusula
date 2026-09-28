"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { makeTranslator, diffKeyTrees, interpolateDeep } = require("./i18n.js");

test("t() noktalı yolu çözer", () => {
  const t = makeTranslator({ nav: { home: "Ana Sayfa" } }, "tr");
  assert.equal(t("nav.home"), "Ana Sayfa");
});

test("t() eksik anahtarda yolu içeren hata fırlatır (sessizce undefined dönmez)", () => {
  const t = makeTranslator({ nav: { home: "Ana Sayfa" } }, "tr");
  assert.throws(() => t("nav.contact"), /nav\.contact/);
});

test("t() {param} yer tutucularını doldurur", () => {
  const t = makeTranslator({ trial: { note: "Deneme hesabı {trialDays} gün sürer." } }, "tr");
  assert.equal(t("trial.note", { trialDays: 7 }), "Deneme hesabı 7 gün sürer.");
});

test("t() eksik parametrede hata fırlatır", () => {
  const t = makeTranslator({ trial: { note: "{trialDays} gün" } }, "tr");
  assert.throws(() => t("trial.note", {}), /trialDays/);
});

test("t() dizi/obje değerleri olduğu gibi döner (param verilmeden)", () => {
  const t = makeTranslator({ items: ["a", "b"] }, "tr");
  assert.deepEqual(t("items"), ["a", "b"]);
});

test("diffKeyTrees: iki dil aynı anahtar ağacındaysa boş liste döner", () => {
  const tr = { a: { b: "x" }, list: ["1", "2"] };
  const en = { a: { b: "y" }, list: ["3", "4"] };
  assert.deepEqual(diffKeyTrees(tr, en), []);
});

test("diffKeyTrees: EN'de eksik anahtarı bulur", () => {
  const tr = { a: { b: "x", c: "y" } };
  const en = { a: { b: "y" } };
  const fark = diffKeyTrees(tr, en);
  assert.equal(fark.length, 1);
  assert.match(fark[0], /a\.c/);
});

test("diffKeyTrees: dizi uzunluğu farkını bulur", () => {
  const tr = { items: ["1", "2", "3"] };
  const en = { items: ["1", "2"] };
  const fark = diffKeyTrees(tr, en);
  assert.equal(fark.length, 1);
  assert.match(fark[0], /items/);
});

/* --- interpolateDeep: t() yalnız tek bir yolu (leaf) çözer; bir sayfa       */
/* SSS gibi bütün bir alt ağacı (dizi içindeki nesneler) çektiğinde her       */
/* yaprak dizedeki {param}'lar da doldurulmalı — build.js bunu tüm içerik    */
/* ağacına bir kez, facts.js'ten türeyen sabit parametrelerle uygular.       */

test("interpolateDeep: iç içe nesne ve dizilerdeki tüm {param} yer tutucularını doldurur", () => {
  const tree = {
    faq: { items: [{ q: "Deneme?", a: "{trialDays} gün sürer." }, { q: "x", a: "sabit metin" }] }
  };
  const sonuc = interpolateDeep(tree, { trialDays: 7 });
  assert.equal(sonuc.faq.items[0].a, "7 gün sürer.");
  assert.equal(sonuc.faq.items[1].a, "sabit metin");
});

test("interpolateDeep: eksik parametrede hata fırlatır (sessizce {param} bırakmaz)", () => {
  assert.throws(() => interpolateDeep({ a: "{eksik}" }, {}), /eksik/);
});

test("interpolateDeep: parametresiz düz metne dokunmaz", () => {
  const sonuc = interpolateDeep({ a: "değişmeyen metin" }, {});
  assert.equal(sonuc.a, "değişmeyen metin");
});
