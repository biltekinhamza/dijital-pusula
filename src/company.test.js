"use strict";

/* G2 bitti ölçütü: "Eski ve yeni SITE_COMPANY alan alan eşit (betikle
   karşılaştırma)." Eski dosyayı (js/translations.js) window şimiyle
   gerçekten çalıştırıp okuyoruz — beklenen değerleri burada elle
   yazmıyoruz (D-003: Türkçe sabiti elle yazma, kaynaktan oku).

   G7'de kökteki js/translations.js silindiği için (ETKI-ANALIZI.md §1.3)
   karşılaştırma artık dondurulmuş bir kopyadan okunuyor:
   src/fixtures/legacy-site-company.js — bu dosya silinmeden hemen önce
   `git show` ile birebir çıkarıldı, elle yazılmadı. Orijinalin tamamı
   git geçmişinde durur. */

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const company = require("./company.js");

function loadOldCompany() {
  const file = path.join(__dirname, "fixtures", "legacy-site-company.js");
  const code = fs.readFileSync(file, "utf8");
  const win = {};
  new Function("window", code)(win);
  return win.SITE_COMPANY;
}

test("company.js: eski js/translations.js SITE_COMPANY ile alan alan birebir eşit", () => {
  const old = loadOldCompany();
  const oldKeys = Object.keys(old).sort();
  const newKeys = Object.keys(company).sort();
  assert.deepEqual(newKeys, oldKeys, "anahtar kümesi farklı");
  for (const key of oldKeys) {
    assert.equal(company[key], old[key], `alan farklı: ${key}`);
  }
});

test("company.js: MADDE 5 alanlarından en az biri (legalName) dolu", () => {
  assert.ok(company.legalName && company.legalName.trim().length > 0);
});
