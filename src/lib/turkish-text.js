"use strict";

/* turkish-text.js — Türkçe-farkında küçük harfe çevirme (D-003, dersler/genel).
   Standart String#toLowerCase() yerel ayardan bağımsız Unicode kuralı
   kullanır: "İ".toLowerCase() === "i̇" (i + BİRLEŞİK NOKTA, U+0307 — 2 kod
   noktası), tek karakterlik "i" DEĞİL. Bu yüzden case-insensitive bir
   Türkçe alt dize araması (ör. yasak ifade taraması, kural 9) büyük
   noktalı İ ile yazılmış bir eşleşmeyi SESSİZCE kaçırabilir.
   turkishLowerCase() önce İ→i ve I→ı çevirir, ardından toLowerCase()
   uygular; sonuç Türkçe alfabede beklenen küçük harf karşılıklarıdır. */

function turkishLowerCase(value) {
  return String(value)
    .replace(/İ/g, "i")
    .replace(/I/g, "ı")
    .toLowerCase();
}

module.exports = { turkishLowerCase };
