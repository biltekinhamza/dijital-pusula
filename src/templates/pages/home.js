"use strict";

/* home.js — ana sayfa (TASARIM-STANDARDI.md, EKRANLAR.md "Ana sayfa",
   ETKI-ANALIZI S3.4 H1-H10). Bölüm sırası H1..H10 ile birebir; kapılı/boş
   veri olan bölümler (H6 sürüm bandı, H5'in tam kişi kartı hali) hiç
   render edilmez ya da yalnız izin verilen kısmıyla render edilir — bkz.
   EKRANLAR.md "Durumlar" ve ui.js yorumları. */

const { html, raw } = require("../../lib/html.js");
const { icon } = require("../partials/icon.js");
const { productState } = require("../../lib/model.js");
const {
  requestCtaHref, firstSentence, screenFrame, capabilityList, faqList, ctaBand
} = require("../partials/ui.js");

/* Durum rozeti tek okuyucudan (model.js productState()) gelir — ETKI-ANALIZI
   §4.4/§7 "5 yerde tutarlı" kuralı: yön kapısı, ürün vitrini ve nav.js'deki
   ürün menüsü aynı çağrıyı kullanır, geçersiz bir status derlemeyi durdurur. */
function doorway(ctx, routeId, product) {
  const state = productState(product);
  return html`<a class="doorway" href="${ctx.url(routeId)}">
    <span class="badge ${raw(state.isLive ? "badge-live" : "badge-early-access")}">${ctx.t(state.badgeKey)}</span>
    <h3>${icon(ctx, "compass-rose")} ${product.name}</h3>
    <p>${product.tagline}</p>
    <span class="link-directional">${ctx.t("home.products.cta")} ${icon(ctx, "arrow-right")}</span>
  </a>`;
}

function heroSection(ctx) {
  const home = ctx.content.home;
  return html`<section class="hero">
    <div class="container hero-home-grid">
      <div class="hero-copy">
        <p class="eyebrow">${icon(ctx, "compass-rose")} ${ctx.t("brand.tagline")}</p>
        <h1>${home.hero.title}</h1>
        <p class="lead">${home.hero.description}</p>
        <div class="btn-row" style="margin-top: var(--space-24)">
          <a class="btn" href="#urunler">${home.hero.primary}</a>
          <a class="btn btn-secondary" href="${requestCtaHref(ctx)}">${home.hero.secondary}</a>
        </div>
        <ul class="risk-list">
          ${home.hero.note.split(" · ").filter(Boolean).map((item) => html`<li>${icon(ctx, "check")}${item}</li>`)}
        </ul>
      </div>
      <div class="doorway-pair">
        ${doorway(ctx, "hvac", ctx.content.hvac)}
        <div class="doorway-divider" aria-hidden="true">${icon(ctx, "compass-rose")}</div>
        ${doorway(ctx, "cold", ctx.content.cold)}
      </div>
    </div>
  </section>`;
}

function factsSection(ctx) {
  const stats = ctx.content.home.stats;
  return html`<section class="facts-strip">
    <div class="container chip-row">
      ${stats.items.map((item) => html`<span class="chip"><strong>${item.value}</strong><span>${item.label}</span></span>`)}
    </div>
  </section>`;
}

function productVitrine(ctx, routeId, product, reverse) {
  const screen = ctx.asset(`assets/screens/${routeId}/temsili.svg`);
  const state = productState(product);
  return html`<div class="zigzag-row${reverse ? " zigzag-reverse" : ""}">
    <div class="zigzag-media">
      ${screenFrame(ctx, {
        src: screen, width: 1200, height: 780,
        alt: `${product.name}. ${ctx.t("productLabels.screens")}.`,
        representative: true
      })}
    </div>
    <div class="zigzag-text">
      <span class="badge ${raw(state.isLive ? "badge-live" : "badge-early-access")}" style="margin-bottom: var(--space-8)">${ctx.t(state.badgeKey)}</span>
      <h3>${product.name}</h3>
      <p class="lead">${firstSentence(product.problem)}</p>
      ${capabilityList(ctx, product.highlights.slice(0, 3))}
      <div class="showcase-links">
        <a class="link-directional" href="${ctx.url(routeId)}">${ctx.t("home.products.cta")} ${icon(ctx, "arrow-right")}</a>
        <a href="${ctx.url("pricing", { hash: routeId === "cold" ? "soguk-hava" : "hvac" })}">${ctx.t("nav.packages")}</a>
      </div>
    </div>
  </div>`;
}

function vitrineSection(ctx) {
  const products = ctx.content.home.products;
  return html`<section id="urunler">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">${products.kicker}</p>
        <h2>${products.title}</h2>
        <p class="lead">${products.lead}</p>
      </div>
      ${productVitrine(ctx, "hvac", ctx.content.hvac, false)}
      ${productVitrine(ctx, "cold", ctx.content.cold, true)}
    </div>
  </section>`;
}

/* H5: about.js kapılı (S8) — yalnız erişilebilirlik kısmı (kanal/saat),
   isim/foto yok. Başlık için home.js'te özel bir alan yok (İTİRAZ'da
   listelendi); mevcut, onaylı bir çeviri anahtarı (nav.contact) yeniden
   kullanılır, yeni metin uydurulmaz. */
function accessibilitySection(ctx) {
  if (!ctx.content.about.pending) return raw("");
  const contact = ctx.content.contact;
  const company = ctx.company;
  return html`<section class="bleed-soft">
    <div class="container">
      <div class="section-head">
        <h2>${ctx.t("nav.contact")}</h2>
        <p class="lead">${contact.responseNote}</p>
      </div>
      <div class="contact-channels" style="max-width:520px">
        <div class="contact-channel">
          ${icon(ctx, "message-circle")}
          <div><a href="https://wa.me/${company.whatsapp}" target="_blank" rel="noopener">${contact.whatsapp}</a></div>
        </div>
        <div class="contact-channel">
          ${icon(ctx, "mail")}
          <div><span>${contact.email}</span><a href="mailto:${company.email}">${company.email}</a></div>
        </div>
        <div class="contact-channel">
          ${icon(ctx, "phone")}
          <div><span>${contact.phone}</span><a href="tel:${company.phoneHref}">${company.phone}</a></div>
        </div>
        <div class="contact-channel">
          ${icon(ctx, "clock")}
          <div><span>${contact.hours}</span><strong>${contact.hoursValue}</strong></div>
        </div>
      </div>
    </div>
  </section>`;
}

/* H6 (sürüm bandı): changelog.releases boşken ADR-10 kapı kuralı gereği
   hiç render edilmez (uydurma sürüm notu yazılmaz). */
function releasesSection(ctx) {
  if (!ctx.changelog.releases || ctx.changelog.releases.length === 0) return raw("");
  return raw(""); // Kapılı rota bugün üretilmiyor; içerik gelince changelog.js şablonundaki desenle doldurulur.
}

function pricingSummarySection(ctx) {
  const intro = ctx.content.pricing.intro;
  return html`<section class="bleed-soft">
    <div class="container pricing-summary">
      <h2>${intro.title}</h2>
      <p class="lead">${intro.lead}</p>
      <a class="btn" href="${ctx.url("pricing")}">${ctx.t("nav.packages")} ${icon(ctx, "arrow-right")}</a>
    </div>
  </section>`;
}

function faqSection(ctx) {
  const faq = ctx.content.home.faq;
  return html`<section>
    <div class="container faq-layout">
      <div class="faq-heading">
        <p class="eyebrow">${faq.kicker}</p>
        <h2>${faq.title}</h2>
        <p class="lead">${faq.lead}</p>
        <a class="link-directional faq-link" href="${requestCtaHref(ctx)}">${faq.link} ${icon(ctx, "arrow-right")}</a>
      </div>
      ${faqList(ctx, faq.items, "faq-home")}
    </div>
  </section>`;
}

function servicesTeaserSection(ctx) {
  const teaser = ctx.content.home.servicesTeaser;
  return html`<section class="section-tight">
    <div class="container services-teaser-band">
      <p><strong>${teaser.title}</strong> ${teaser.lead}</p>
      <a class="link-directional" href="${ctx.url("services")}">${teaser.cta} ${icon(ctx, "arrow-right")}</a>
    </div>
  </section>`;
}

function closingCtaSection(ctx) {
  const home = ctx.content.home;
  return ctaBand(ctx, {
    heading: ctx.t("brand.tagline"),
    body: firstSentence(home.hero.description),
    primaryHref: requestCtaHref(ctx),
    primaryLabel: home.hero.secondary
  });
}

function home(ctx) {
  return html`<article data-route="home">
    ${heroSection(ctx)}
    ${factsSection(ctx)}
    ${vitrineSection(ctx)}
    ${accessibilitySection(ctx)}
    ${releasesSection(ctx)}
    ${pricingSummarySection(ctx)}
    ${faqSection(ctx)}
    ${servicesTeaserSection(ctx)}
    ${closingCtaSection(ctx)}
  </article>`;
}

module.exports = { home };
