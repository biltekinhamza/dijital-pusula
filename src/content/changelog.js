"use strict";

/* changelog.js — sürüm notları + yol haritası (ADR-10). ADR-10 kapı kuralı: gerçek
   sürüm kaydı yoksa sayfa üretilmez (routes.js: changelog enabled:false). S9 onayı
   gelince buraya releases[]/roadmap[] eklenir, her girdi { tr:{...}, en:{...} } taşır. */

module.exports = {
  "releases": [],
  "roadmap": []
};
