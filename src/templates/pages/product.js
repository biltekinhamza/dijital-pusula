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
  return productId === "cold" ? "soguk-hava" : productId === "hvac" ? "hvac" : productId;
}

function heroSection(ctx, product, productId) {
  const screen = ctx.asset(`assets/screens/${productId}/temsili.svg`);
  const badge = statusBadge(ctx, product);
  return html`<section class="hero">
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
