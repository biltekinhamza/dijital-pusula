"use strict";

/* head.js — <head> içeriği (ETKI-ANALIZI G4, §4.5 kural 3/6/7/8).
   G (gelistirici) sahipliğinde — dosya sahipliği tablosunda tek istisna
   (§5 başı: "A → src/templates/ (head.js hariç)"). title/description/
   canonical/hreflang/OG/Twitter/JSON-LD (Organization her sayfa;
   SoftwareApplication ürün sayfalarında; AggregateOffer yalnız fixed/from
   fiyat modunda — bugün tüm planlar "quote" olduğundan hiç basılmaz;
   FAQPage yalnız SSS içeriği olan sayfada; BreadcrumbList ana sayfa ve
   404 hariç her sayfada). Metin yalnız ctx.t()'den gelir. */

const { html, raw } = require("../../lib/html.js");
const { planPrice } = require("../../lib/model.js");

function jsonLd(obj) {
  return raw(`<script type="application/ld+json">${JSON.stringify(obj)}</script>`);
}

function organizationSchema(ctx) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ctx.company.brandName,
    url: ctx.config.origin,
    email: ctx.company.email || undefined,
    sameAs: [ctx.company.github, ctx.company.linkedin].filter(Boolean)
  };
}

function softwareApplicationSchema(ctx) {
  if (!ctx.route.productId) return null;
  const product = ctx.content[ctx.route.contentId];
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    url: ctx.canonical(ctx.route.id),
    operatingSystem: "Web"
  };
}

/* AggregateOffer yalnız price.mode "fixed" ya da "from" olan planlar için
   basılır (§4.4). Bugün S3 kararı verilmediği için tüm planlar "quote";
   bu durumda dizi boş kalır ve şema hiç basılmaz (kural 6: basılırsa
   sayfadaki fiyatla aynı olmalı — hiç basılmazsa uyuşmazlık riski de yok). */
function aggregateOfferSchema(ctx) {
  if (!ctx.route.productId) return null;
  const productPricing = ctx.pricing[ctx.route.productId];
  if (!productPricing) return null;
  const offers = productPricing.plans
    .map((plan) => planPrice(plan.price))
    .filter((p) => p.mode === "fixed" || p.mode === "from");
  if (offers.length === 0) return null;
  const prices = offers.map((o) => o.monthlyLabel || o.fromLabel).filter(Boolean);
  if (prices.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    priceCurrency: "TRY",
    offerCount: offers.length
  };
}

function faqPageSchema(ctx) {
  const faq = ctx.route.id === "home" ? ctx.content.home.faq : null;
  if (!faq || !Array.isArray(faq.items) || faq.items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };
}

function breadcrumbSchema(ctx) {
  if (ctx.route.id === "home" || ctx.route.id === "notfound") return null;
  const heroText = ctx.t(ctx.route.heroPath);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ctx.t("nav.home"), item: ctx.canonical("home") },
      { "@type": "ListItem", position: 2, name: heroText, item: ctx.canonical(ctx.route.id) }
    ]
  };
}

/* og:image (ETKI-ANALIZI A8/§1.5, arayuz-gelistirici İTİRAZ madde 7):
   home/hvac/cold kendi görseline sahip; diğer sayfalar og-home'a düşer
   (dedicated görseli olmayan bir sayfanın OG kartı boş kalmasındansa marka
   görseliyle çıkması tercih edilir). Dosyalar tools/make-og.py ile üretilir
   (src/static/assets/og/) — burada yalnız var olan dosyaya bağlanılır;
   ctx.asset() dosya yoksa zaten derlemeyi durdurur. */
function ogImageAsset(ctx) {
  const withImage = ["home", "hvac", "cold"];
  const pageId = withImage.includes(ctx.route.id) ? ctx.route.id : "home";
  const suffix = ctx.lang === "en" ? "-en" : "";
  return `assets/og/og-${pageId}${suffix}.png`;
}

function head(ctx) {
  const meta = ctx.route.metaPath ? ctx.t(ctx.route.metaPath) : { title: ctx.company.brandName, description: ctx.company.brandName, og: ctx.company.brandName };
  const canonical = ctx.route.id === "notfound"
    ? ctx.config.origin.replace(/\/+$/, "") + ctx.route.path[ctx.lang]
    : ctx.canonical(ctx.route.id);

  const hreflangLinks = ctx.route.id === "notfound"
    ? [
        { lang: "tr", href: ctx.config.origin.replace(/\/+$/, "") + ctx.route.path.tr },
        { lang: "en", href: ctx.config.origin.replace(/\/+$/, "") + ctx.route.path.en },
        { lang: "x-default", href: ctx.config.origin.replace(/\/+$/, "") + ctx.route.path.tr }
      ]
    : [
        { lang: "tr", href: ctx.config.origin.replace(/\/+$/, "") + ctx.route.path.tr },
        { lang: "en", href: ctx.config.origin.replace(/\/+$/, "") + ctx.route.path.en },
        { lang: "x-default", href: ctx.config.origin.replace(/\/+$/, "") + ctx.route.path.tr }
      ];

  const schemas = [
    organizationSchema(ctx),
    softwareApplicationSchema(ctx),
    aggregateOfferSchema(ctx),
    faqPageSchema(ctx),
    breadcrumbSchema(ctx)
  ].filter(Boolean);

  const ogImageUrl = ctx.config.origin.replace(/\/+$/, "") + ctx.asset(ogImageAsset(ctx));

  return html`<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${meta.title}</title>
<meta name="description" content="${meta.description}">
<link rel="canonical" href="${canonical}">
${raw(hreflangLinks.map((l) => `<link rel="alternate" hreflang="${l.lang}" href="${l.href}">`).join("\n"))}
<meta property="og:type" content="website">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.og || meta.description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImageUrl}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${meta.title}">
<meta name="twitter:description" content="${meta.og || meta.description}">
<meta name="twitter:image" content="${ogImageUrl}">
${raw(schemas.map(jsonLd).map(String).join("\n"))}`;
}

module.exports = { head, organizationSchema, softwareApplicationSchema, aggregateOfferSchema, faqPageSchema, breadcrumbSchema };
