"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { html, raw, esc } = require("./html.js");

test("esc() kaçışlar: &, <, >, \", '", () => {
  assert.equal(esc(`<a href="x">T'om & Jerry</a>`), "&lt;a href=&quot;x&quot;&gt;T&#39;om &amp; Jerry&lt;/a&gt;");
});

test("esc() null/undefined için boş dize döner", () => {
  assert.equal(esc(null), "");
  assert.equal(esc(undefined), "");
});

test("html`` etiketli şablon varsayılan olarak değişkeni kaçışlar", () => {
  const isim = `<script>alert(1)</script>`;
  const sonuc = String(html`<h1>${isim}</h1>`);
  assert.equal(sonuc, "<h1>&lt;script&gt;alert(1)&lt;/script&gt;</h1>");
});

test("raw() ile işaretlenen değer kaçışlanmadan basılır", () => {
  const parca = raw("<b>kalın</b>");
  const sonuc = String(html`<div>${parca}</div>`);
  assert.equal(sonuc, "<div><b>kalın</b></div>");
});

test("html`` iç içe kullanılabilir (bileşik şablon kaçışlamaz)", () => {
  const ic = html`<span>${"a&b"}</span>`;
  const dis = String(html`<p>${ic}</p>`);
  assert.equal(dis, "<p><span>a&amp;b</span></p>");
});

test("html`` dizi değeri birleştirir, her elemanı kendi kuralınca kaçışlar", () => {
  const satirlar = ["a&b", raw("<i>c</i>")];
  const sonuc = String(html`<ul>${satirlar}</ul>`);
  assert.equal(sonuc, "<ul>a&amp;b<i>c</i></ul>");
});

test("Türkçe karakterler kaçışlama sonrası bozulmadan kalır", () => {
  const sonuc = String(html`<p>${"Çağ Öztürk Ğşıİ"}</p>`);
  assert.equal(sonuc, "<p>Çağ Öztürk Ğşıİ</p>");
});
