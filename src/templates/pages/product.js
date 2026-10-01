"use strict";

/* product.js — ürün sayfası (tek şablon, iki ürün: hvac/cold).
   TASARIM-STANDARDI.md + EKRANLAR.md "Ürün sayfası şablonu" (P1-P14),
   ETKI-ANALIZI S3.5. P3 (kime göre, targetProfiles) ve P12 (ürün SSS, faq)
   içerik gelince eklendi (gelistirici, İTİRAZ madde 2 kapatıldı) — artık
   gerçek veriden render ediliyor. P10 (güvenlik özeti) yalnız /guvenlik/
   açıksa render edilir. */

const { html, raw } = require("../../lib/html.js");
const { icon } = require("../partials/icon.js");
const routes = require("../../routes.js");
const {
  requestCtaHref, screenFrame, chipRow, stepsList, ctaBand, statusBadge, faqList
} = require("../partials/ui.js");

function pricingHashFor(productId) {
  return productId === "cold" ? "soguk-hava" : productId;
}

/* Ürün hero'su arkasındaki bakır-gravür üslubunda, ürüne özgü dekoratif
   motif (home.js'teki VIGNETTES ile aynı aile, aynı çizgi kalınlığı/üslubu
   — ana sayfayla "uyumlu" olmanın bir parçası). Yalnız dekoratif: aria-hidden,
   anlam taşımaz. Zemin/renk farkı compass-map.css'teki .theme-product-*
   değiştiricilerinden gelir, bu yalnız motifin kendi çizgi sanatı. */
const PRODUCT_MOTIFS = {
  hvac: `<g><circle cx="260" cy="130" r="54" stroke-opacity=".6"/>
    <circle cx="260" cy="130" r="9" fill="currentColor" stroke="none"/>
    <path d="M260 130 Q272 104 260 76 Q248 104 260 130 Z" fill="currentColor" fill-opacity=".16" transform="rotate(0 260 130)"/>
    <path d="M260 130 Q272 104 260 76 Q248 104 260 130 Z" fill="currentColor" fill-opacity=".16" transform="rotate(60 260 130)"/>
    <path d="M260 130 Q272 104 260 76 Q248 104 260 130 Z" fill="currentColor" fill-opacity=".16" transform="rotate(120 260 130)"/>
    <path d="M260 130 Q272 104 260 76 Q248 104 260 130 Z" fill="currentColor" fill-opacity=".16" transform="rotate(180 260 130)"/>
    <path d="M260 130 Q272 104 260 76 Q248 104 260 130 Z" fill="currentColor" fill-opacity=".16" transform="rotate(240 260 130)"/>
    <path d="M260 130 Q272 104 260 76 Q248 104 260 130 Z" fill="currentColor" fill-opacity=".16" transform="rotate(300 260 130)"/></g>
    <path d="M40 280 H190 V248 H230 V280 H360"/>
    <path d="M40 310 H190 V278 H230 V310 H360" stroke-opacity=".5"/>
    <path d="M70 280 V310 M100 280 V310 M130 280 V310 M160 280 V310" stroke-width="1.2" stroke-opacity=".5"/>
    <path d="M260 310 V340 M290 310 V340 M320 310 V340 M350 310 V340" stroke-width="1.2" stroke-opacity=".5"/>
    <path d="M20 180 H80 M68 172 L80 180 L68 188" stroke-dasharray="4 5" stroke-opacity=".55"/>
    <path d="M20 212 H60 M48 204 L60 212 L48 220" stroke-dasharray="4 5" stroke-opacity=".4"/>`,
  cold: `<g transform="translate(290 100)">
    <path d="M0 -60 V60 M-52 -30 L52 30 M52 -30 L-52 30" stroke-opacity=".6"/>
    <path d="M0 -60 L-12 -42 M0 -60 L12 -42 M0 60 L-12 42 M0 60 L12 42" stroke-width="1.3"/>
    <path d="M-52 -30 L-30 -38 M-52 -30 L-40 -10 M52 30 L30 38 M52 30 L40 10" stroke-width="1.3"/>
    <path d="M52 -30 L30 -22 M52 -30 L44 -4 M-52 30 L-30 22 M-52 30 L-44 4" stroke-width="1.3"/></g>
    <rect x="40" y="240" width="90" height="60" rx="2"/>
    <rect x="130" y="260" width="90" height="40" rx="2" stroke-opacity=".6"/>
    <path d="M40 270 H130 M85 240 V300" stroke-width="1.2" stroke-opacity=".5"/>
    <path d="M130 280 H220" stroke-width="1.2" stroke-opacity=".5"/>
    <path d="M20 330 Q70 310 110 330 T200 330 T290 330 T370 330" stroke-opacity=".4"/>`,
  puantaj: `<rect x="60" y="60" width="220" height="180" rx="4"/>
    <path d="M60 100 H280"/>
    <path d="M104 60 V240 M148 60 V240 M192 60 V240 M236 60 V240" stroke-width="1.2" stroke-opacity=".5"/>
    <path d="M60 140 H280 M60 180 H280" stroke-width="1.2" stroke-opacity=".5"/>
    <path d="M114 118 L122 126 L136 108" stroke-width="2"/>
    <circle cx="170" cy="120" r="5" fill="currentColor" stroke="none"/>
    <path d="M114 158 L122 166 L136 148" stroke-width="2"/>
    <circle cx="214" cy="160" r="5" fill="currentColor" stroke="none"/>
    <path d="M300 260 Q330 230 340 270 T380 260" stroke-dasharray="3 6" stroke-opacity=".6"/>
    <circle cx="380" cy="260" r="6" fill="currentColor" stroke="none"/>`
};

function productMotif(productId) {
  const inner = PRODUCT_MOTIFS[productId];
  if (!inner) return raw("");
  return html`<div class="hero-motif-layer" aria-hidden="true">
    <svg class="hero-motif" viewBox="0 0 400 400" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${raw(inner)}</svg>
  </div>`;
}

function heroSection(ctx, product, productId) {
  const screen = ctx.asset(`assets/screens/${productId}/temsili.svg`);
  const badge = statusBadge(ctx, product);
  return html`<section class="hero">
    ${productMotif(productId)}
    <div class="container hero-product-grid">
      <div class="hero-product-copy">
        <p class="eyebrow">${icon(ctx, "compass-rose")} ${product.subtitle}</p>
        ${badge}
        <h1>${product.tagline}</h1>
        <p class="lead">${product.hero}</p>
        <div class="btn-row">
          <a class="btn" href="${requestCtaHref(ctx, productId)}">${ctx.t("cta.requestTrial")}</a>
          <a class="btn btn-secondary" href="${ctx.url("pricing", { hash: pricingHashFor(productId) })}">${ctx.t("nav.packages")}</a>
        </div>
      </div>
      ${screenFrame(ctx, {
        src: screen, width: 1200, height: 780,
        alt: `${product.name}. ${ctx.t("productLabels.screens")}.`,
        representative: true
      })}
    </div>
  </section>`;
}

function factsSection(ctx, product) {
  return html`<section class="facts-strip">
    <div class="container">
      ${chipRow(product.highlights)}
    </div>
  </section>`;
}

/* P3: kime göre (targetProfiles) — liste, kart ızgarası değil
   (TASARIM-STANDARDI.md S5.6 "2-3 öğe için ızgara kurulmaz"). */
function targetProfilesSection(ctx, product) {
  if (!product.targetProfiles || product.targetProfiles.length === 0) return raw("");
  return html`<section>
    <div class="container">
      <div class="link-list">
        ${product.targetProfiles.map((profile) => html`<div class="link-list-item">
          <span aria-hidden="true">${profile.icon}</span>
          <div><strong>${profile.title}</strong><span>${profile.text}</span></div>
        </div>`)}
      </div>
    </div>
  </section>`;
}

function problemSolutionSection(ctx, product) {
  return html`<section class="bleed-soft">
    <div class="container split">
      <div>
        <h2>${ctx.t("productLabels.problem")}</h2>
        <p>${product.problem}</p>
      </div>
      <div>
        <h2>${ctx.t("productLabels.solution")}</h2>
        <p>${product.solution}</p>
      </div>
    </div>
    <div class="container" style="margin-top: var(--space-24)">
      <div class="note note-success">
        ${icon(ctx, "check")}
        <div><strong>${ctx.t("productLabels.benefit")}. </strong>${product.benefit}</div>
      </div>
    </div>
  </section>`;
}

function comparisonSection(ctx, product) {
  const cmp = product.comparison;
  return html`<section>
    <div class="container">
      <div class="section-head">
        <h2>${cmp.title}</h2>
        <p class="lead">${cmp.lead}</p>
      </div>
      <div class="compare-table">
        <table>
          <thead><tr><th scope="col">${cmp.before}</th><th scope="col">${cmp.after}</th></tr></thead>
          <tbody>
            ${cmp.rows.map((row) => html`<tr>
              <th scope="row" class="visually-hidden">${row.k}</th>
              <td class="col-before">${row.before}</td>
              <td class="col-after">${icon(ctx, "check")}${row.after}</td>
            </tr>`)}
          </tbody>
        </table>
        <div class="compare-cards">
          ${cmp.rows.map((row) => html`<div class="compare-card">
            <h3>${row.k}</h3>
            <span class="compare-before">${cmp.before}</span>
            <p class="compare-before-text">${row.before}</p>
            <hr>
            <span class="compare-after">${cmp.after}</span>
            <p class="compare-after-text">${icon(ctx, "check")}<span>${row.after}</span></p>
          </div>`)}
        </div>
      </div>
    </div>
  </section>`;
}

function moduleZigzag(ctx, productId, mod, reverse) {
  const screen = ctx.asset(`assets/screens/${productId}/temsili.svg`);
  return html`<div class="zigzag-row${reverse ? " zigzag-reverse" : ""}">
    <div class="zigzag-media">
      ${screenFrame(ctx, {
        src: screen, width: 1200, height: 780,
        alt: `${mod.title}. ${ctx.t("productLabels.screens")}.`,
        representative: true
      })}
    </div>
    <div class="zigzag-text">
      <h3>${mod.title}</h3>
      <p>${mod.text}</p>
    </div>
  </div>`;
}

function modulesSection(ctx, product, productId) {
  const [first, ...rest] = product.modules;
  return html`<section class="bleed-soft">
    <div class="container">
      <div class="section-head">
        <h2>${ctx.t("productLabels.modules")}</h2>
      </div>
      ${moduleZigzag(ctx, productId, first, false)}
      <div class="link-list" style="margin-top: var(--space-48)">
        ${rest.map((mod) => html`<div class="link-list-item">
          <span aria-hidden="true">${mod.icon}</span>
          <div><strong>${mod.title}</strong><span>${mod.text}</span></div>
        </div>`)}
      </div>
    </div>
  </section>`;
}

function stepsSection(ctx) {
  const steps = ctx.content.home.process.steps;
  return html`<section>
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">${ctx.content.home.process.kicker}</p>
        <h2>${ctx.content.home.process.title}</h2>
      </div>
      ${stepsList(steps)}
    </div>
  </section>`;
}

function integrationsSection(ctx, product) {
  return html`<section class="bleed-soft">
    <div class="container">
      <div class="section-head"><h2>${ctx.t("productLabels.integrations")}</h2></div>
      <div class="link-list">
        ${product.integrations.map((item) => html`<div class="link-list-item">
          ${icon(ctx, "external-link")}
          <div><strong>${item.name}</strong><span>${item.text}</span></div>
        </div>`)}
      </div>
    </div>
  </section>`;
}

/* P10: güvenlik özeti yalnız /guvenlik/ açıkken render edilir (kapılı
   rotaya bağlantı derlemeyi durdurur, ETKI-ANALIZI S3.9). */
function securitySection(ctx) {
  if (routes.byId.security.enabled === false) return raw("");
  return html`<section>
    <div class="container">
      <a class="link-directional" href="${ctx.url("security")}">${ctx.t("nav.security")} ${icon(ctx, "arrow-right")}</a>
    </div>
  </section>`;
}

function pricingSummarySection(ctx, productId) {
  const note = ctx.content.pricing[productId].note;
  return html`<section class="bleed-soft">
    <div class="container pricing-summary">
      <h2>${ctx.t("productLabels.packages")}</h2>
      <p class="lead">${note}</p>
      <a class="btn" href="${ctx.url("pricing", { hash: pricingHashFor(productId) })}">${ctx.t("nav.packages")} ${icon(ctx, "arrow-right")}</a>
    </div>
  </section>`;
}

/* P12: ürün SSS — kimlik ürün önekli (faq-hvac-1, faq-cold-1), aynı
   sayfada §5.5'teki gibi çakışma yok (ETKI-ANALIZI S7 "kimlik"). */
function faqSection(ctx, product, productId) {
  if (!product.faq || !product.faq.items || product.faq.items.length === 0) return raw("");
  return html`<section class="bleed-soft">
    <div class="container">
      <div class="section-head"><h2>${ctx.content.home.faq.title}</h2></div>
      ${faqList(ctx, product.faq.items, `faq-${productId}`)}
    </div>
  </section>`;
}

function closingCtaSection(ctx, product, productId) {
  return ctaBand(ctx, {
    heading: product.tagline,
    body: product.benefit,
    primaryHref: requestCtaHref(ctx, productId),
    primaryLabel: ctx.t("cta.requestTrial")
  });
}

function specsSection(ctx, product) {
  return html`<section class="section-tight">
    <div class="container">
      <details class="specs-details">
        <summary>${ctx.t("productLabels.specs")} ${icon(ctx, "chevron-down")}</summary>
        <table class="spec-table">
          <tbody>
            ${product.specs.map((row) => html`<tr><th scope="row">${row.k}</th><td>${row.v}</td></tr>`)}
          </tbody>
        </table>
      </details>
    </div>
  </section>`;
}

function product(ctx) {
  const productId = ctx.route.productId;
  const prod = ctx.content[ctx.route.contentId];
  return html`<article data-route="${ctx.route.id}">
    ${heroSection(ctx, prod, productId)}
    ${factsSection(ctx, prod)}
    ${targetProfilesSection(ctx, prod)}
    ${problemSolutionSection(ctx, prod)}
    ${comparisonSection(ctx, prod)}
    ${modulesSection(ctx, prod, productId)}
    ${stepsSection(ctx)}
    ${integrationsSection(ctx, prod)}
    ${securitySection(ctx)}
    ${pricingSummarySection(ctx, productId)}
    ${faqSection(ctx, prod, productId)}
    ${closingCtaSection(ctx, prod, productId)}
    ${specsSection(ctx, prod)}
  </article>`;
}

module.exports = { product };
