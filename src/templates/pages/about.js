"use strict";

/* about.js — Hakkımızda (KAPILI, S8). routes.js'te enabled:false olduğu
   sürece build.js bu şablonu hiç çağırmaz (yalnız routes.enabledRoutes()
   üzerinden üretim yapılır) — bu yüzden burada "pending" durumunu ayrıca
   kontrol etmiyoruz, S8 onaylanıp içerik gelince ve routes.js'te
   enabled:true yapılınca bu şablon devreye girer.

   Beklenen içerik şekli (about.js içerik dosyası, gelistirici doldurur):
   { meta, kicker, title, lead, person: { photoSrc, photoAlt, name, role, bio },
     principlesTitle, principles: [{ title, text }], origin: [paragraf...],
     bridge: { text, label } }
   arayuz-gelistirici bu şekli EKRANLAR.md "Hakkımızda" bölümünden türetti
   (kişi kartının genişletilmiş hali + çalışma ilkeleri listesi + doğuş
   hikayesi + özel yazılıma köprü); gerçekleştirilmeden önce gelistirici ile
   doğrulanmalı (bkz. arayuz-gelistirici İTİRAZ'ı). */

const { html } = require("../../lib/html.js");
const { icon } = require("../partials/icon.js");
const { requestCtaHref } = require("../partials/ui.js");

function about(ctx) {
  const a = ctx.content.about;
  return html`<article data-route="about">
    <section class="hero">
      <div class="container">
        <p class="eyebrow">${icon(ctx, "compass-rose")} ${a.kicker}</p>
        <h1>${a.title}</h1>
        <p class="lead">${a.lead}</p>
      </div>
    </section>
    <section class="section-tight">
      <div class="container person-card">
        <img src="${a.person.photoSrc}" alt="${a.person.photoAlt}" width="200" height="200">
        <div>
          <h2>${a.person.name}</h2>
          <p class="person-role">${a.person.role}</p>
          <p>${a.person.bio}</p>
        </div>
      </div>
    </section>
    <section class="bleed-soft">
      <div class="container">
        <h2>${a.principlesTitle}</h2>
        <ul class="capability-list">
          ${a.principles.map((p) => html`<li>${icon(ctx, "check")}<div><strong>${p.title}</strong><span>${p.text}</span></div></li>`)}
        </ul>
      </div>
    </section>
    <section>
      <div class="container legal-doc">
        ${a.origin.map((paragraph) => html`<p>${paragraph}</p>`)}
      </div>
    </section>
    <section class="section-tight">
      <div class="container">
        <a class="link-directional" href="${ctx.url("services")}">${a.bridge.text} ${icon(ctx, "arrow-right")}</a>
      </div>
    </section>
  </article>`;
}

module.exports = { about };
