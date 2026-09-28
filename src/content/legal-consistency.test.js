"use strict";

/* legal-consistency.test.js — denetici bulgusu (INCELEME): "Hukuki sebep"
   bölümü ADR-8 sonrası hâlâ "açık rızanız" diyordu (site hiç toplamadığı
   bir rızaya dayandığını iddia ediyordu) ve "Tarayıcı depolaması"/"Kullanılan
   teknolojiler" bölümleri ADR-2 (dil URL'den)/ADR-5 (localStorage yok) ile
   çelişen eski davranışı anlatmaya devam ediyordu — üstteki dinamik
   ctx.legal.cookieParagraph() doğruyu söylerken hemen altındaki statik
   gövde metni tam tersini söylüyordu. Bu test o sınıftaki hatayı kilitler. */

const { test } = require("node:test");
const assert = require("node:assert/strict");

const trLegal = require("./tr/legal.js");
const enLegal = require("./en/legal.js");

function bodyText(doc) {
  return doc.body.map((section) => section.p.join(" ")).join(" ");
}

test("legal.privacy: 'Hukuki sebep' artık açık rızaya dayanmadığını söylüyor (ADR-8)", () => {
  const text = bodyText(trLegal.privacy);
  assert.ok(!text.includes("açık rızanız"), "TR metin hâlâ 'açık rızanız' diyor");
  assert.match(text, /meşru menfaat/);
  const textEn = bodyText(enLegal.privacy);
  assert.ok(!textEn.toLowerCase().includes("your explicit consent"), "EN metin hâlâ 'your explicit consent' diyor");
  assert.match(textEn.toLowerCase(), /legitimate interest/);
});

test("legal.privacy ve legal.cookies: localStorage/çerez KULLANILMADIĞI tutarlı anlatılıyor (ADR-5)", () => {
  for (const doc of [trLegal.privacy, trLegal.cookies]) {
    const text = bodyText(doc);
    assert.ok(!text.includes("yerel depolama alanında saklar"), "hâlâ localStorage kullanıldığını iddia ediyor");
    assert.ok(!/Yalnızca tarayıcınızın yerel depolama/.test(text));
  }
  for (const doc of [enLegal.privacy, enLegal.cookies]) {
    const text = bodyText(doc).toLowerCase();
    assert.ok(!text.includes("the site stores your language preference"));
    assert.ok(!text.includes("only your browser's local storage is used"));
  }
});

test("legal.cookies: dil tercihinin artık URL'den geldiği, tarayıcıda saklanmadığı yazıyor (ADR-2)", () => {
  const text = bodyText(trLegal.cookies);
  assert.match(text, /adresten|URL/);
  const textEn = bodyText(enLegal.cookies).toLowerCase();
  assert.match(textEn, /address|url/);
});

test("legal.cookies 'Üçüncü taraf': varsayılan mailto davranışı doğru anlatılıyor, her zaman bir form sağlayıcısı varmış gibi yazmıyor (ADR-7)", () => {
  const text = bodyText(trLegal.cookies);
  assert.ok(!/Demo talep formu bir form hizmet sağlayıcısına gönderilir/.test(text));
  assert.match(text, /yalnızca e-posta ile iletilir/);
});
