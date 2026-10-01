#!/usr/bin/env node
"use strict";

/* tools/og-data.js — make-og.py'nin OG görsellerine basacağı metni JSON
   olarak verir (ETKI-ANALIZI §1.5/A8, arayuz-gelistirici İTİRAZ madde 7).
   Tek kaynak ilkesi: OG görseli metni site içeriğinden AYRI elle
   yazılmaz; facts.js parametreleri de burada aynı yolla ({param}) çözülür.
   Kullanım: node tools/og-data.js  →  stdout'a JSON basar. */

const facts = require("../src/content/facts.js");
const siteConfig = require("../src/site.config.js");
const { loadContentTree } = require("../src/lib/content.js");
const { interpolateDeep } = require("../src/lib/i18n.js");

function factParams() {
  return {
    trialDays: facts.hvac.trialDays.value,
    trialUsers: facts.hvac.trialUsers.value,
    partTypes: facts.hvac.partTypes.value,
    demoRoomLimit: facts.cold.demoRoomLimit.value,
    stackOverlapMinPercent: facts.cold.stackOverlapMinPercent.value,
    backendTestCount: facts.cold.backendTestCount.value,
    frontendTestCount: facts.cold.frontendTestCount.value,
    attendanceCodes: facts.puantaj.attendanceCodes.value,
    mobileCodes: facts.puantaj.mobileCodes.value,
    fixedHolidays: facts.puantaj.fixedHolidays.value,
    monthlyBaseDays: facts.puantaj.monthlyBaseDays.value,
    puantajTestCount: facts.puantaj.testCount.value,
    testCount: facts.combined.testCount.value
  };
}

function buildOgData() {
  const params = factParams();
  const data = { origin: siteConfig.origin, tr: {}, en: {} };
  for (const lang of ["tr", "en"]) {
    const tree = interpolateDeep(loadContentTree(lang), params);
    data[lang] = {
      tagline: tree.brand.tagline,
      homeEyebrow: tree.home.products.kicker,
      home: { ...tree.home.meta, highlights: [tree.hvac.name, tree.cold.name, tree.puantaj.name] },
      hvac: { meta: tree.hvac.meta, highlights: tree.hvac.highlights },
      cold: { meta: tree.cold.meta, highlights: tree.cold.highlights },
      puantaj: { meta: tree.puantaj.meta, highlights: tree.puantaj.highlights }
    };
  }
  return data;
}

if (require.main === module) {
  process.stdout.write(JSON.stringify(buildOgData()));
}

module.exports = { buildOgData };
