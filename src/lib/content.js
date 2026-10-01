"use strict";

/* content.js — src/content/{tr,en}/*.js dosyalarını tek bir dil ağacında
   birleştirir. common.js kökte açılır (t("nav.home"), t("brand.full") gibi
   eski kullanım biçimini korur); diğer sayfa dosyaları kendi ad alanında
   kalır (t("home.hero.title"), t("hvac.name"), t("pricing.hvac.plans...")). */

const path = require("node:path");

const PAGE_FILES = [
  "home", "hvac", "cold", "puantaj", "pricing", "services", "contact",
  "about", "security", "changelog", "legal", "notfound"
];

function loadContentTree(lang) {
  const dir = path.join(__dirname, "..", "content", lang);
  const common = require(path.join(dir, "common.js"));
  const tree = { ...common };
  for (const name of PAGE_FILES) {
    tree[name] = require(path.join(dir, `${name}.js`));
  }
  return tree;
}

module.exports = { loadContentTree, PAGE_FILES };
