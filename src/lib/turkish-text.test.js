"use strict";

/* D-003 (dersler/genel): "Excel'den İçe Aktarın".toLowerCase() JS'in
   varsayılan (Türkçe olmayan) Unicode kuralında "excel'den i̇çe aktarın"
   olur (İ → i + birleşik nokta, 2 kod noktası) — "içe aktarın" ile HİÇ
   eşleşmez. turkishLowerCase() bunu düzeltir: İ→i, I→ı, sonra toLowerCase(). */

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { turkishLowerCase } = require("./turkish-text.js");

test("turkishLowerCase: büyük noktalı İ küçük noktalı i'ye döner (birleşik nokta eklemez)", () => {
  assert.equal(turkishLowerCase("İ"), "i");
  assert.equal(turkishLowerCase("İ").length, 1);
});

test("turkishLowerCase: büyük noktasız I küçük noktasız ı'ye döner", () => {
  assert.equal(turkishLowerCase("I"), "ı");
});

test("turkishLowerCase: standart JS toLowerCase()'in Türkçe'de bozduğu klasik örnek düzelir", () => {
  const jsDefault = "İstanbul".toLowerCase();
  assert.notEqual(jsDefault, "istanbul"); // JS varsayılanı bunu bozduğunu kanıtlar
  assert.equal(turkishLowerCase("İstanbul"), "istanbul");
});

test("D-003 regresyonu: \"Excel'den İçe Aktarın\" turkishLowerCase sonrası yasak ifadeyle eşleşir", () => {
  const withDefaultLower = "Excel'den İçe Aktarın".toLowerCase();
  assert.ok(!withDefaultLower.includes("içe aktarın"), "JS varsayılan toLowerCase Türkçe İ'de sessizce deliniyor olmalı (kanıt)");
  assert.ok(turkishLowerCase("Excel'den İçe Aktarın").includes("içe aktarın"));
});

test("turkishLowerCase: sıradan ASCII metinde davranış değişmez", () => {
  assert.equal(turkishLowerCase("Hello World"), "hello world");
});
