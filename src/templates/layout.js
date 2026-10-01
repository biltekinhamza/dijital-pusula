"use strict";

/* layout.js — Aşama 1 kabuğu (TASARIM-STANDARDI.md, ETKI-ANALIZI A2).
   head.js (meta/JSON-LD) hariç bu dosya arayuz-gelistirici sahipliğindedir.
   Burada ayrıca stylesheet/favicon/theme-color/betik etiketleri eklenir:
   tools/build.js henüz src/styles/*.css'i site/assets/site.css'e
   BİRLEŞTİRMİYOR (yalnız src/static/** birebir kopyalanıyor) — bu yüzden
   derlenmiş CSS/JS doğrudan src/static/assets/{site.css,site.js} olarak
   tutulur (bkz. o dosyaların başındaki köprü notu) ve burada normal bir
   statik varlık gibi ctx.asset() ile bağlanır. Metin yalnız ctx.t()'den
   gelir. */

const { html, raw } = require("../lib/html.js");
const { head } = require("./partials/head.js");
const { nav } = require("./partials/nav.js");
const { footer } = require("./partials/footer.js");

/* Tema sınıfı: ana sayfa + ürün sayfaları aynı "parşömen" aile jetonlarını
   (compass-map.css .theme-parchment) paylaşır — nav/footer/buton/başlık
   tipografisi otomatik uyumlu olur. Ürün sayfaları ayrıca kendi
   `theme-product-<id>` değiştiricisini taşır (yalnız hero zemini/motifi
   bundan farklılaşır, bkz. compass-map.css "Ürün sayfası" bölümü) — her
   ürünün kendi arka planı olsun, hepsi aynı görünmesin isteğiyle. */
function bodyThemeClass(route) {
  if (route.id === "home") return "theme-parchment";
  if (route.template === "product") return `theme-parchment theme-product-${route.productId}`;
  return "";
}

function layout(ctx, bodyHtml) {
  return html`<!doctype html>
<html lang="${ctx.lang}">
<head>
${head(ctx)}
<link rel="preload" href="${ctx.asset("assets/fonts/ibm-plex-sans-400.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${ctx.asset("assets/fonts/ibm-plex-sans-condensed-700.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${ctx.asset("assets/site.css")}">
<link rel="icon" href="${ctx.asset("favicon.svg")}" type="image/svg+xml">
<link rel="alternate icon" href="${ctx.asset("favicon.png")}" type="image/png">
<link rel="apple-touch-icon" href="${ctx.asset("apple-touch-icon.png")}">
<meta name="theme-color" content="#FBFAF7">
</head>
<body${raw(bodyThemeClass(ctx.route) ? ` class="${bodyThemeClass(ctx.route)}"` : "")}>
<a class="skip-link" href="#icerik">${ctx.t("a11y.skip")}</a>
${nav(ctx)}
<main id="icerik">
${bodyHtml}
</main>
${footer(ctx)}
<script src="${ctx.asset("assets/site.js")}" defer></script>
</body>
</html>
`;
}

module.exports = { layout };
