"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { buildOgData } = require("./og-data.js");

test("buildOgData: origin + tr/en home/hvac/cold meta verir", () => {
  const data = buildOgData();
  assert.equal(data.origin, "https://www.dijitalpusula.example");
  for (const lang of ["tr", "en"]) {
    assert.ok(data[lang].home.title);
    assert.ok(data[lang].hvac.meta.title);
    assert.ok(data[lang].cold.meta.title);
    assert.ok(Array.isArray(data[lang].hvac.highlights));
  }
});

test("buildOgData: {param} yer tutucuları çözülmüş olarak gelir (make-og.py'ye çiğ gitmez)", () => {
  const data = buildOgData();
  const text = JSON.stringify(data);
  assert.ok(!text.includes("{partTypes}"));
  assert.ok(!text.includes("{trialDays}"));
  assert.match(data.tr.hvac.highlights[0], /25 parça tipi/);
});

test("buildOgData: tagline/eyebrow içerikten gelir (make-og.py Türkçe metni elle yazmaz, D-003)", () => {
  const data = buildOgData();
  assert.equal(data.tr.tagline, "Doğru yerdesiniz.");
  assert.ok(data.tr.homeEyebrow.length > 0);
  assert.ok(data.en.tagline.length > 0);
});
