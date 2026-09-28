"use strict";

/* changelog.js — Sürüm notları + yol haritası (KAPILI, S9, ADR-10). routes.js'te
   enabled:false olduğu sürece bu şablon hiç çalışmaz. src/content/changelog.js
   dilden bağımsız TEK dosyadır (ETKI-ANALIZI S4.1), her girdi kendi içinde
   tr/en taşır: releases[] = [{ date:"YYYY-MM-DD", product:"hvac"|"cold"|null,
   type:"new"|"fix"|"improvement", tr:{title,description}, en:{...} }],
   roadmap[] = [{ status:"in-progress"|"planned"|"considering", tr:{text}, en:{...} }].
   Bu şekil arayuz-gelistirici'nin TASARIM-STANDARDI.md S5.15'ten türettiği
   varsayımdır, gelistirici ile doğrulanmalı (bkz. İTİRAZ). */

const { html } = require("../../lib/html.js");
const { formatDate } = require("../../lib/format.js");

const ROADMAP_COLUMNS = ["in-progress", "planned", "considering"];

function roadmapColumn(ctx, status, entries) {
  const items = entries.filter((e) => e.status === status);
  return html`<div class="roadmap-column">
    <h3>${ctx.t(`changelog.roadmap.${status.replace("-", "")}`)}</h3>
    ${items.length === 0
      ? html`<p class="roadmap-empty">${ctx.t("changelog.roadmap.empty")}</p>`
      : html`<ul>${items.map((e) => html`<li>${e[ctx.lang].text}</li>`)}</ul>`}
  </div>`;
}

function releaseEntry(ctx, release) {
  const text = release[ctx.lang];
  const product = release.product ? ctx.content[release.product].name : null;
  return html`<div class="release-entry">
    <time class="release-date" datetime="${release.date}">${formatDate(release.date, ctx.lang)}</time>
    <div>
      <div class="release-tags">
        ${product ? html`<span class="release-tag">${product}</span>` : ""}
        <span class="release-tag">${ctx.t(`changelog.type.${release.type}`)}</span>
      </div>
      <h3>${text.title}</h3>
      <p>${text.description}</p>
    </div>
  </div>`;
}

function changelog(ctx) {
  const roadmap = ctx.changelog.roadmap;
  const releases = ctx.changelog.releases;
  return html`<article data-route="changelog">
    <section class="hero">
      <div class="container">
        <h1>${ctx.t("changelog.title")}</h1>
        <p class="lead">${ctx.t("changelog.lead")}</p>
      </div>
    </section>
    <section class="section-tight">
      <div class="container">
        <div class="section-head"><h2>${ctx.t("changelog.roadmap.heading")}</h2></div>
        <div class="roadmap-columns">
          ${ROADMAP_COLUMNS.map((status) => roadmapColumn(ctx, status, roadmap))}
        </div>
      </div>
    </section>
    <section class="bleed-soft">
      <div class="container">
        <div class="section-head"><h2>${ctx.t("changelog.releasesHeading")}</h2></div>
        <div>${releases.map((r) => releaseEntry(ctx, r))}</div>
      </div>
    </section>
  </article>`;
}

module.exports = { changelog };
