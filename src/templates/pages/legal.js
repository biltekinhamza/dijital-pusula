"use strict";

/* legal.js — yasal sayfa şablonu (4 rota: legal-privacy, legal-cookies,
   legal-terms, legal-subscription — TASARIM-STANDARDI.md S5.19,
   ETKI-ANALIZI ADR-7/ADR-9). ctx.legal.* (transferParagraph/cookieParagraph/
   bindingNote) config.form.mode / config.analytics'e bağlı paragraflardır
   (src/lib/legal-text.js, gelistirici); data-legal öznitelikleri G6'nın
   "config değişince yalnız bu paragraf değişir" testinin kancasıdır —
   Aşama 0'daki stub.js'te de aynı işaretle vardı, burada korunuyor.
   "Son güncelleme" tarihi legal.js içeriğinde bir ISO tarih alanı olarak
   yok (yalnız etiket metni var) — bkz. arayuz-gelistirici İTİRAZ'ı; alan
   eklenince aşağıdaki koşullu blok otomatik görünür hale gelir. */

const { html, raw } = require("../../lib/html.js");
const { formatDate } = require("../../lib/format.js");
const { noteBox } = require("../partials/ui.js");

function legalExtras(ctx) {
  if (ctx.route.id === "legal-privacy") {
    return html`${noteBox(ctx, html`<p data-legal="transfer">${ctx.legal.transferParagraph()}</p>`, "info")}
      ${noteBox(ctx, html`<p data-legal="cookie">${ctx.legal.cookieParagraph()}</p>`, "info")}
      ${ctx.legal.bindingNote() ? noteBox(ctx, html`<p data-legal="binding">${ctx.legal.bindingNote()}</p>`, "warning") : raw("")}`;
  }
  if (ctx.route.id === "legal-cookies") {
    return noteBox(ctx, html`<p data-legal="cookie">${ctx.legal.cookieParagraph()}</p>`, "info");
  }
  if (ctx.legal.bindingNote()) {
    return noteBox(ctx, html`<p data-legal="binding">${ctx.legal.bindingNote()}</p>`, "warning");
  }
  return raw("");
}

function legal(ctx) {
  const entry = ctx.content.legal[ctx.route.legalKey];
  return html`<article data-route="${ctx.route.id}">
    <section class="section-tight">
      <div class="container legal-doc">
        <h1>${entry.title}</h1>
        ${entry.updatedAt ? html`<p class="legal-updated">${entry.updated}: ${formatDate(entry.updatedAt, ctx.lang)}</p>` : raw("")}
        ${legalExtras(ctx)}
        ${entry.body.map((section) => html`<section>
          <h2>${section.h}</h2>
          ${section.p.map((paragraph) => html`<p>${paragraph}</p>`)}
        </section>`)}
        ${entry.disclaimer ? noteBox(ctx, html`<p>${entry.disclaimer}</p>`, "warning") : raw("")}
      </div>
    </section>
  </article>`;
}

module.exports = { legal };
