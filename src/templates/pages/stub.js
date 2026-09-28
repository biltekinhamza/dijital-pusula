"use strict";

/* stub.js — şablon YÖNLENDİRİCİ (Aşama 1). tools/build.js her rota için
   sabit `templates.stub(ctx)` çağırıyor (bkz. tools/build.js:146,
   `DEFAULT_TEMPLATES = { stub }` — build.js'in kendisi arayuz-gelistirici
   sahipliğinde değil, bu yüzden dosya adı/ihracat adı "stub" olarak
   KALIYOR ama içi artık route.template alanına göre gerçek sayfa
   şablonlarından birini seçen bir yönlendiricidir (bkz. eski dosyanın
   üstündeki not: "arayuz-gelistirici Aşama 1'de route.template alanına
   göre 7 ayrı şablonla bunun yerini alacak" — burası tam olarak o). */

const { home } = require("./home.js");
const { product } = require("./product.js");
const { pricing } = require("./pricing.js");
const { services } = require("./services.js");
const { contact } = require("./contact.js");
const { legal } = require("./legal.js");
const { notfound } = require("./notfound.js");
const { about } = require("./about.js");
const { security } = require("./security.js");
const { changelog } = require("./changelog.js");

const TEMPLATES_BY_ID = {
  home, product, pricing, services, contact, legal, notfound, about, security, changelog
};

function stub(ctx) {
  const renderer = TEMPLATES_BY_ID[ctx.route.template];
  if (!renderer) {
    throw new Error(`stub(): route.template için şablon yok: "${ctx.route.template}" (rota: ${ctx.route.id})`);
  }
  return renderer(ctx);
}

module.exports = { stub };
