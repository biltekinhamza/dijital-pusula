"use strict";

/* services.js — özel yazılım (TASARIM-STANDARDI.md, EKRANLAR.md "Özel
   yazılım"). Hizmet ayrıntısı <details> ile açılır (mevcut modal kalkıyor,
   ETKI-ANALIZI S1.2) — odak tuzağı yok, JS'siz çalışır. */

const { html, raw } = require("../../lib/html.js");
const { icon } = require("../partials/icon.js");
const { requestCtaHref, stepsList, ctaBand } = require("../partials/ui.js");

function serviceItem(ctx, item) {
  return html`<article class="service-item">
    <h3><span aria-hidden="true">${item.icon}</span> ${item.title}</h3>
    <p>${item.text}</p>
    <details>
      <summary>${ctx.content.services.more}</summary>
      <p>${item.detail}</p>
      <p><strong>${ctx.content.services.includes}</strong></p>
      <ul>
        ${item.bullets.map((b) => html`<li>${icon(ctx, "check")}${b}</li>`)}
      </ul>
    </details>
  </article>`;
}

function services(ctx) {
  const s = ctx.content.services;
  return html`<article data-route="services">
    <section class="hero">
      <div class="container">
        <p class="eyebrow">${icon(ctx, "compass-rose")} ${s.hero.eyebrow}</p>
        <h1>${s.hero.title}</h1>
        <p class="lead">${s.hero.description}</p>
        <div class="btn-row">
          <a class="btn" href="${requestCtaHref(ctx)}">${s.hero.primary}</a>
          <a class="btn btn-secondary" href="${ctx.url("home", { hash: "urunler" })}">${s.hero.secondary}</a>
        </div>
      </div>
    </section>
    <section class="bleed-soft">
      <div class="container service-list">
        ${s.items.map((item) => serviceItem(ctx, item))}
      </div>
    </section>
    <section>
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">${icon(ctx, "compass-rose")} ${s.process.kicker}</p>
          <h2>${s.process.title}</h2>
        </div>
        ${stepsList(s.process.steps)}
      </div>
    </section>
    <section class="bleed-soft">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">${icon(ctx, "compass-rose")} ${s.tech.kicker}</p>
          <h2>${s.tech.title}</h2>
          <p class="lead">${s.tech.lead}</p>
        </div>
        <div class="tech-groups">
          ${s.tech.groups.map((group) => html`<div class="tech-group">
            <h3>${group.title}</h3>
            <div class="cluster">${group.items.map((i) => html`<span>${i}</span>`)}</div>
          </div>`)}
        </div>
      </div>
    </section>
    ${ctaBand(ctx, {
      heading: s.hero.title,
      body: s.hero.description,
      primaryHref: requestCtaHref(ctx),
      primaryLabel: s.discuss
    })}
  </article>`;
}

module.exports = { services };
