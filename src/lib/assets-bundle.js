"use strict";

/* assets-bundle.js — src/styles/*.css ve src/client/site.js'i tek dosyaya
   birleştirir (ETKI-ANALIZI §4.2: "styles/*.css (sabit sırayla birleştir)
   → site/assets/site.css"). arayuz-gelistirici'nin elle birleştirdiği sıra
   (bkz. İTİRAZ madde 6) referans alındı: tokens, base, layout, sonra
   components/* SABİT sırayla. Sıra elle bozulursa (bir bileşen dosyası
   silinirse) sessizce atlamak yerine hata fırlatılır — CSS'te "önce gelen
   kazanır" türü kurallar bu sıraya bağlı olabilir. */

const fs = require("node:fs");
const path = require("node:path");

const CSS_COMPONENT_ORDER = [
  "brand", "buttons", "badge", "note-box", "nav", "footer", "hero",
  "facts-strip", "showcase", "comparison-table", "spec-panel", "steps",
  "faq", "plan-card", "cta-band", "form", "legal", "misc", "compass-map"
];

function readFile(absPath) {
  if (!fs.existsSync(absPath)) {
    throw new Error(`assets-bundle: dosya yok: ${absPath}`);
  }
  return fs.readFileSync(absPath, "utf8");
}

function bundleStyles(stylesDir) {
  const parts = [];
  for (const base of ["tokens.css", "base.css", "layout.css"]) {
    parts.push(`/* --- ${base} --- */\n${readFile(path.join(stylesDir, base))}`);
  }
  for (const name of CSS_COMPONENT_ORDER) {
    const file = path.join(stylesDir, "components", `${name}.css`);
    parts.push(`/* --- components/${name}.css --- */\n${readFile(file)}`);
  }
  return parts.join("\n");
}

function bundleClientJs(clientDir) {
  return readFile(path.join(clientDir, "site.js"));
}

module.exports = { bundleStyles, bundleClientJs, CSS_COMPONENT_ORDER };
