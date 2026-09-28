"use strict";

/* security.js — Güvenlik (KAPILI, S10). routes.js'te enabled:false olduğu
   sürece bu şablon hiç çalışmaz. Beklenen içerik şekli (gelistirici
   doldurur, EKRANLAR.md "Güvenlik" bölümünden): { meta, kicker, title,
   lead, items: [{ title, text }] } — madde sayısı 5-6, esnek liste (kart
   ızgarası değil). */

const { html } = require("../../lib/html.js");
const { icon } = require("../partials/icon.js");

function security(ctx) {
  const s = ctx.content.security;
  return html`<article data-route="security">
    <section class="hero">
      <div class="container">
        <p class="eyebrow">${icon(ctx, "compass-rose")} ${s.kicker}</p>
        <h1>${s.title}</h1>
        <p class="lead">${s.lead}</p>
      </div>
    </section>
    <section class="section-tight">
      <div class="container">
        <div class="grid-auto" data-cols="2">
          ${s.items.map((item) => html`<div class="note">
            ${icon(ctx, "shield-check")}
            <div><strong>${item.title}. </strong>${item.text}</div>
          </div>`)}
        </div>
      </div>
    </section>
  </article>`;
}

module.exports = { security };
