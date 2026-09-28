"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { formatTRY, formatDate } = require("./format.js");

test("formatTRY tamsayıyı tr-TR biçiminde basar", () => {
  const sonuc = formatTRY(12500);
  assert.match(sonuc, /12\.500/);
  assert.match(sonuc, /₺|TL/);
});

test("formatTRY ondalıklı (float) değerde hata fırlatır — para Decimal/tamsayı, float değil", () => {
  assert.throws(() => formatTRY(12500.5), /tamsayı/);
});

test("formatTRY negatif olmayan sıfırı kabul eder", () => {
  assert.doesNotThrow(() => formatTRY(0));
});

test("formatDate tr-TR için GG.AA.YYYY sırasını üretir", () => {
  const sonuc = formatDate("2026-09-28", "tr");
  assert.equal(sonuc, "28.09.2026");
});

test("formatDate en için GG/AA/YYYY (en-GB) sırasını üretir", () => {
  const sonuc = formatDate("2026-09-28", "en");
  assert.equal(sonuc, "28/09/2026");
});

test("formatDate geçersiz ISO tarihte hata fırlatır", () => {
  assert.throws(() => formatDate("28-09-2026", "tr"));
});
