"use strict";

/* pricing.js — fiyatlandırma (TASARIM-STANDARDI.md S5.13, EKRANLAR.md
   "Fiyatlandırma", ETKI-ANALIZI S3.6/ADR-4). Üç fiyat kipi (fixed/from/quote)
   destekleniyor; bugün içerik tamamen "quote" (S3 karara bağlanmadı).
   Aylık/yıllık seçici yalnız yearly verisi varsa render edilir — bugün hiç
   plan yearly taşımadığı için render edilmiyor (kod buna hazır, veri
   gelince otomatik çıkar). Plan karşılaştırma matrisi (S5.13 son madde)
   içerikte plan başına farklı şekilli features/missing dizileri olarak
   durduğu için hizalı bir tablo kurulamıyor; 3 kart zaten aynı bilgiyi
   taşıyor (bkz. arayuz-gelistirici raporu "Kalan/çözülemeyen"). */

const { html, raw } = require("../../lib/html.js");
const { icon } = require("../partials/icon.js");
const { planPrice } = require("../../lib/model.js");
const { requestCtaHref, faqList, tOrNull, ctaBand } = require("../partials/ui.js");

function planCard(ctx, productId, planId, featured) {
  const content = ctx.content.pricing[productId].plans[planId];
  const featuredTag = featured ? tOrNull(ctx, "productLabels.featuredPlan") : null;
  const href = `${requestCtaHref(ctx, productId)}&plan=${encodeURIComponent(planId)}`;
  return html`<article class="plan-card${featured ? " plan-card-featured" : ""}">
    ${featuredTag ? html`<span class="plan-card-tag">${featuredTag}</span>` : raw("")}
    <h3>${content.name}</h3>
    <p class="plan-price-note">${content.priceNote}</p>
    <p class="plan-summary">${content.summary}</p>
    <ul class="plan-features">
      ${content.features.map((f) => html`<li>${icon(ctx, "check")}<span>${f}</span></li>`)}
    </ul>
    ${content.missing.length > 0 ? html`<ul class="plan-missing">
      ${content.missing.map((f) => html`<li>${icon(ctx, "x")}<span>${f}</span></li>`)}
    </ul>` : raw("")}
    <a class="btn${featured ? "" : " btn-secondary"}" href="${href}">${content.cta}</a>
  </article>`;
}

function productPricingSection(ctx, productId, anchorId, title) {
  const numeric = ctx.pricing[productId];
  const textContent = ctx.content.pricing[productId];
  return html`<section id="${anchorId}" tabindex="-1">
    <div class="container">
      <h2>${title}</h2>
      <div class="note" style="margin: var(--space-16) 0 var(--space-32)">
        ${icon(ctx, "file-text")}
        <p>${textContent.note}</p>
      </div>
      <div class="plan-grid">
        ${numeric.plans.map((plan) => { planPrice(plan.price); return planCard(ctx, productId, plan.id, plan.featured); })}
      </div>
    </div>
  </section>`;
}

/* Faturalama sorusu: home.js SSS listesindeki tek faturalandırma
   sorusunun (son madde) yeniden kullanımı — pricing.js içinde ayrı,
   ürün başına bir "faturalama SSS" listesi yok (bkz. İTİRAZ). */
function billingFaqSection(ctx) {
  const items = ctx.content.home.faq.items;
  const billingItem = items[items.length - 1];
  return html`<section class="bleed-soft">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">${ctx.content.home.faq.kicker}</p>
        <h2>${ctx.content.home.faq.title}</h2>
      </div>
      ${faqList(ctx, [billingItem], "faq-billing")}
    </div>
  </section>`;
}

function pricing(ctx) {
  const intro = ctx.content.pricing.intro;
  return html`<article data-route="pricing">
    <section class="hero">
      <div class="container">
        <h1>${intro.title}</h1>
        <p class="lead">${intro.lead}</p>
        <nav class="product-section-switch" aria-label="${ctx.t("nav.products")}">
          <a href="#hvac">${ctx.content.hvac.name}</a>
          <a href="#soguk-hava">${ctx.content.cold.name}</a>
          <a href="#puantaj">${ctx.content.puantaj.name}</a>
        </nav>
      </div>
    </section>
    ${productPricingSection(ctx, "hvac", "hvac", ctx.content.hvac.name)}
    ${productPricingSection(ctx, "cold", "soguk-hava", ctx.content.cold.name)}
    ${productPricingSection(ctx, "puantaj", "puantaj", ctx.content.puantaj.name)}
    ${billingFaqSection(ctx)}
    ${ctaBand(ctx, {
      heading: intro.title,
      body: intro.lead,
      primaryHref: requestCtaHref(ctx),
      primaryLabel: ctx.t("cta.requestTrial")
    })}
  </article>`;
}

module.exports = { pricing };
