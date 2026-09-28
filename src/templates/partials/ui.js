"use strict";

/* ui.js — sayfa şablonları arası paylaşılan küçük bileşen üreticileri
   (TASARIM-STANDARDI.md S5). Burada iş mantığı YOK, yalnız ctx.content /
   ctx.t üzerinden okunan verinin markup'a dökülmesi var. */

const { html, raw } = require("../../lib/html.js");
const { icon } = require("./icon.js");

/* Durum rozeti (S5.10). productState() model.js'te product.status zorunlu
   kılıyor (assertEnum) — bugün hvac.js/cold.js içeriğinde bu alan yok
   (bkz. arayuz-gelistirici İTİRAZ'ı). Veri gelene kadar rozet hiç render
   edilmez (boş kutu değil, bileşen tamamen yok) — S5 karara bağlanınca
   status eklenir eklenmez bu fonksiyon otomatik çalışır. */
function statusBadge(ctx, product) {
  if (!product || !product.status) return null;
  const isLive = product.status === "live";
  return html`<span class="badge ${raw(isLive ? "badge-live" : "badge-early-access")}">${ctx.t(isLive ? "state.live" : "state.earlyAccess")}</span>`;
}

/* Birincil CTA (S4.4 primaryCta() — trial alanı içerikte yok, bkz. İTİRAZ).
   Bugünkü gerçek durum zaten "request" modudur (ETKI-ANALIZI S4: herkese
   açık deneme adresi yok); bu yüzden sabit varsayılan "request" davranışı
   dokümante edilen varsayılanla birebir aynıdır, veri uydurmaz. */
function requestCtaHref(ctx, productId) {
  const base = ctx.url("contact");
  return productId ? `${base}?urun=${encodeURIComponent(productId)}` : base;
}

function firstSentence(text) {
  const match = String(text).match(/^[^.]+\./);
  return match ? match[0] : text;
}

/* tOrNull: bir çeviri anahtarı içerikte henüz yoksa (ör. TASARIM-STANDARDI
   S5.6 "Temsilî görsel" rozet metni — common.js'te productLabels.representative
   anahtarı bugün yok, bkz. arayuz-gelistirici İTİRAZ'ı) derlemeyi
   DURDURMADAN o tek dekoratif parçayı atlamak için. ctx.t()'in eksik anahtar
   için fırlattığı hatayı yalnız BU yardımcı yutar; şablonlar başka hiçbir
   yerde ctx.t() hatasını yutmaz (eksik zorunlu metin yine derlemeyi durdurur). */
function tOrNull(ctx, path) {
  try {
    return ctx.t(path);
  } catch (err) {
    return null;
  }
}

/* "Temsilî" etiketli ekran çerçevesi (S5.6). */
function screenFrame(ctx, { src, width, height, alt, representative }) {
  const label = representative ? tOrNull(ctx, "productLabels.representative") : null;
  return html`<div class="screen-frame">
    <div class="screen-frame-bar" aria-hidden="true"></div>
    ${label ? html`<span class="badge badge-representative">${label}</span>` : raw("")}
    <img src="${src}" width="${String(width)}" height="${String(height)}" alt="${alt}" loading="lazy">
  </div>`;
}

function chipRow(items) {
  return html`<div class="chip-row">${items.map((label) => html`<span class="chip">${label}</span>`)}</div>`;
}

function capabilityList(ctx, items) {
  return html`<ul class="capability-list">${items.map((item) => html`<li>${icon(ctx, "check")}${item}</li>`)}</ul>`;
}

/* faqList: id ürün önekli (S5.12, ETKI-ANALIZI S7 "kimlik"). */
function faqList(ctx, items, idPrefix) {
  return html`<div class="faq-list">
    ${items.map((item, i) => html`<details class="faq-item" id="${idPrefix}-${String(i + 1)}">
      <summary>${item.q} ${icon(ctx, "chevron-down")}</summary>
      <p>${item.a}</p>
    </details>`)}
  </div>`;
}

function noteBox(ctx, bodyHtml, tone) {
  const toneClass = tone && tone !== "info" ? ` note-${tone}` : "";
  const iconName = tone === "warning" ? "shield-check" : tone === "error" ? "x" : "file-text";
  return html`<div class="note${raw(toneClass)}">
    ${icon(ctx, iconName)}
    <div>${bodyHtml}</div>
  </div>`;
}

function ctaBand(ctx, { heading, body, primaryHref, primaryLabel, tight }) {
  return html`<section class="cta-band${tight ? " section-tight" : ""}">
    <div class="container cta-band-inner">
      <div>
        <h2>${heading}</h2>
        <p>${body}</p>
      </div>
      <div class="cta-band-actions">
        <a class="btn btn-on-dark" href="${primaryHref}">${primaryLabel}</a>
        <a class="text-channel" href="https://wa.me/${ctx.company.whatsapp}" target="_blank" rel="noopener">${icon(ctx, "message-circle")}WhatsApp</a>
        <a class="text-channel" href="mailto:${ctx.company.email}">${icon(ctx, "mail")}${ctx.company.email}</a>
      </div>
    </div>
  </section>`;
}

function stepsList(steps) {
  return html`<ol class="steps" style="--step-count:${String(steps.length)}">
    ${steps.map((step, i) => html`<li class="step">
      <span class="step-marker" aria-hidden="true">${String(i + 1)}</span>
      <h3>${step.title}</h3>
      <p>${step.text}</p>
    </li>`)}
  </ol>`;
}

module.exports = {
  statusBadge, requestCtaHref, firstSentence, tOrNull, screenFrame, chipRow,
  capabilityList, faqList, noteBox, ctaBand, stepsList
};
