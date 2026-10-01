"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const facts = require("./facts.js");

function flatten(node, prefix = "") {
  const out = [];
  for (const [key, value] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && "value" in value) {
      out.push([path, value]);
    } else if (value && typeof value === "object") {
      out.push(...flatten(value, path));
    }
  }
  return out;
}

test("facts.js: her girdi source (dosya:satır) ve checkedAt taşır, hiçbiri boş değil", () => {
  const entries = flatten(facts);
  assert.ok(entries.length > 0, "facts.js boş olmamalı");
  for (const [path, entry] of entries) {
    assert.ok(typeof entry.value === "number", `${path}: value sayı olmalı`);
    assert.ok(entry.source && entry.source.trim().length > 0, `${path}: source boş olamaz`);
    assert.match(entry.source, /:\d+|\*\.\w+|^toplam:/, `${path}: source dosya:satır, dosya deseni ya da "toplam:" türetme açıklaması içermeli`);
    assert.match(entry.checkedAt, /^\d{4}-\d{2}-\d{2}$/, `${path}: checkedAt ISO tarih olmalı`);
  }
});

test("facts.js: hvac.partTypes 25 (part_config.py PARTS sözlüğüyle doğrulandı)", () => {
  assert.equal(facts.hvac.partTypes.value, 25);
});

test("facts.js: hvac.trialDays 7, hvac.trialUsers 2 (licensing.py sabitleriyle doğrulandı)", () => {
  assert.equal(facts.hvac.trialDays.value, 7);
  assert.equal(facts.hvac.trialUsers.value, 2);
});

test("facts.js: combined.testCount sayılmış girdilerin gerçek toplamı (elle yazılmamış)", () => {
  const toplam = facts.hvac.testCount.value + facts.cold.backendTestCount.value + facts.cold.frontendTestCount.value
    + facts.puantaj.testCount.value;
  assert.equal(facts.combined.testCount.value, toplam);
});
