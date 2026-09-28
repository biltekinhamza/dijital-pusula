"use strict";

/* i18n.js — derleme-zamanlı çeviri okuyucu.
   ETKI-ANALIZI §1.2 / §7: eski main.js:45-47 t() anahtar bulunamazsa
   sessizce undefined dönüyordu, HTML'de TR metin kalıyordu. Burada eksik
   anahtar ya da eksik parametre DERLEMEYİ DURDURUR (hata fırlatır). */

function makeTranslator(tree, lang) {
  return function t(path, params) {
    const parts = String(path).split(".");
    let node = tree;
    for (const part of parts) {
      if (node == null || typeof node !== "object" || !(part in node)) {
        throw new Error(`i18n: eksik anahtar "${path}" (dil: ${lang})`);
      }
      node = node[part];
    }
    if (typeof node === "string" && node.includes("{")) {
      return node.replace(/\{(\w+)\}/g, (match, key) => {
        if (!params || !(key in params)) {
          throw new Error(`i18n: "${path}" (dil: ${lang}) parametre bekliyor ama "${key}" verilmedi`);
        }
        return String(params[key]);
      });
    }
    return node;
  };
}

/* İki dil ağacının anahtar kümesi ve dizi uzunlukları eşit mi (check-site kural 2). */
function diffKeyTrees(a, b, prefix = "") {
  const diffs = [];
  const keysA = a && typeof a === "object" ? Object.keys(a) : [];
  const keysB = b && typeof b === "object" ? Object.keys(b) : [];
  const allKeys = new Set([...keysA, ...keysB]);
  for (const key of allKeys) {
    const path = prefix ? `${prefix}.${key}` : key;
    const inA = keysA.includes(key);
    const inB = keysB.includes(key);
    if (!inA) { diffs.push(`${path}: yalnız ikinci dilde var`); continue; }
    if (!inB) { diffs.push(`${path}: yalnız birinci dilde var`); continue; }
    const va = a[key];
    const vb = b[key];
    if (Array.isArray(va) || Array.isArray(vb)) {
      if (!Array.isArray(va) || !Array.isArray(vb)) {
        diffs.push(`${path}: bir dilde dizi, diğerinde değil`);
      } else if (va.length !== vb.length) {
        diffs.push(`${path}: dizi uzunluğu farklı (${va.length} / ${vb.length})`);
      } else {
        va.forEach((item, i) => {
          if (item && typeof item === "object") {
            diffs.push(...diffKeyTrees(item, vb[i], `${path}[${i}]`));
          }
        });
      }
    } else if (va && typeof va === "object" && vb && typeof vb === "object") {
      diffs.push(...diffKeyTrees(va, vb, path));
    }
  }
  return diffs;
}

/* interpolateDeep(value, params) — bir alt ağacı (dizi/nesne, ör. bir SSS
   listesi) bütünüyle dolaşıp her yaprak dizedeki {param} yer tutucularını
   doldurur. t(path, params) yalnız TEK bir yaprağı çözer; bir şablon bütün
   bir listeyi (ör. t("home.faq.items")) çektiğinde bu yeterli olmaz — build.js
   bu yüzden facts.js'ten türeyen sabit parametrelerle içerik ağacının
   tamamını BİR KEZ, en başta çözer (bkz. tools/build.js). */
function interpolateDeep(value, params) {
  if (typeof value === "string") {
    if (!value.includes("{")) return value;
    return value.replace(/\{(\w+)\}/g, (match, key) => {
      if (!params || !(key in params)) {
        throw new Error(`i18n: interpolateDeep parametre eksik: "${key}" (metin: "${value}")`);
      }
      return String(params[key]);
    });
  }
  if (Array.isArray(value)) return value.map((item) => interpolateDeep(item, params));
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = interpolateDeep(item, params);
    return out;
  }
  return value;
}

module.exports = { makeTranslator, diffKeyTrees, interpolateDeep };
