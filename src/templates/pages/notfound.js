"use strict";

/* notfound.js — 404 (TASARIM-STANDARDI.md S5.21, EKRANLAR.md "404").
   Aynı kabuk (header/footer), kök-mutlak yollar (ctx.url() zaten
   kök-mutlak üretir, ETKI-ANALIZI S4.3). Gerçek 404 durum kodu barındırma
   ayarının işi (ETKI-ANALIZI S4.6) — bu şablonun kapsamı dışında. */

const { html } = require("../../lib/html.js");
const routes = require("../../routes.js");

function notfound(ctx) {
  const n = ctx.content.notfound;
  return html`<article data-route="notfound">
    <div class="container notfound-block">
      <span class="brand-mark compass-seeking" style="width:96px;height:96px" aria-hidden="true">
        <img class="brand-mark-dial" src="${ctx.asset("assets/logo/logo-dial.svg")}" alt="" width="96" height="96">
        <img class="brand-mark-needle" src="${ctx.asset("assets/logo/logo-needle.svg")}" alt="" width="96" height="96">
      </span>
      <h1>${n.title}</h1>
      <p>${n.text}</p>
      <div class="notfound-links">
        <a class="btn" href="${ctx.url("home")}">${n.home}</a>
        ${routes.byId.hvac.enabled !== false ? html`<a class="btn btn-secondary" href="${ctx.url("hvac")}">${ctx.content.hvac.name}</a>` : ""}
        ${routes.byId.cold.enabled !== false ? html`<a class="btn btn-secondary" href="${ctx.url("cold")}">${ctx.content.cold.name}</a>` : ""}
      </div>
    </div>
  </article>`;
}

module.exports = { notfound };
