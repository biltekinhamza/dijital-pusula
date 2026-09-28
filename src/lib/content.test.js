"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { loadContentTree, PAGE_FILES } = require("./content.js");
const { diffKeyTrees } = require("./i18n.js");

test("loadContentTree: tr ve en ağaçları hatasız yüklenir", () => {
  const tr = loadContentTree("tr");
  const en = loadContentTree("en");
  assert.ok(tr.brand.full);
  assert.ok(en.brand.full);
});

test("loadContentTree: sayfa dosyaları kendi ad alanlarında görünür", () => {
  const tr = loadContentTree("tr");
  assert.ok(tr.home.hero.title);
  assert.ok(tr.hvac.name);
  assert.ok(tr.cold.name);
  assert.ok(tr.pricing.hvac.plans);
  assert.ok(tr.legal.privacy.title);
  assert.ok(tr.notfound.title);
});

test("PAGE_FILES: hem tr hem en'de eksiksiz mevcut (G2 eşlik denetimi girdisi)", () => {
  for (const name of PAGE_FILES) {
    assert.doesNotThrow(() => require(`../content/tr/${name}.js`));
    assert.doesNotThrow(() => require(`../content/en/${name}.js`));
  }
});

test("G2 bitti ölçütü: tr/en anahtar ağacı ve dizi uzunluğu tamamen eşit (kural 2)", () => {
  const tr = loadContentTree("tr");
  const en = loadContentTree("en");
  const fark = diffKeyTrees(tr, en);
  assert.deepEqual(fark, []);
});

test("G2 bitti ölçütü: içerikte gömülü \"7 gün\"/\"7 days\"/\"25 parça\" sabiti yok", () => {
  const tr = JSON.stringify(loadContentTree("tr"));
  const en = JSON.stringify(loadContentTree("en"));
  assert.ok(!tr.includes("7 gün"), 'TR içerikte "7 gün" sabiti kalmış olmamalı');
  assert.ok(!tr.includes("25 parça"), 'TR içerikte "25 parça" sabiti kalmış olmamalı');
  assert.ok(!en.includes("7 days"), 'EN içerikte "7 days" sabiti kalmış olmamalı');
  assert.ok(!en.includes("25 part"), 'EN içerikte "25 part" sabiti kalmış olmamalı');
});
