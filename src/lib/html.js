"use strict";

/* Kaçışlamalı HTML şablon yardımcısı.
   Kural (ETKI-ANALIZI §4.1): html`` etiketli şablon değişkenleri VARSAYILAN
   olarak kaçışlar. Kaçışlamamak isteyen kod açıkça raw(deger) çağırmalıdır.
   Bu, eski main.js:24 esc()'nin elle çağrılmayı unutulabilmesi sorununu
   (sessiz XSS/bozuk-HTML riski) ortadan kaldırır: kaçışlama varsayılan davranış. */

class RawString {
  constructor(value) {
    this.value = String(value);
  }
  toString() {
    return this.value;
  }
}

function raw(value) {
  return value instanceof RawString ? value : new RawString(value);
}

const ESCAPE_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function esc(value) {
  if (value instanceof RawString) return value.value;
  if (value == null) return "";
  return String(value).replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);
}

function renderValue(value) {
  if (Array.isArray(value)) {
    return value.map(renderValue).join("");
  }
  if (value instanceof RawString) return value.value;
  return esc(value);
}

/* html`...${deger}...` — her ${} değeri renderValue() ile işlenir; dönen
   değer bir RawString'dir, böylece iç içe html`` çağrıları çift kaçışlamaz. */
function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) {
    out += renderValue(values[i]);
    out += strings[i + 1];
  }
  return new RawString(out);
}

module.exports = { html, raw, esc, RawString };
