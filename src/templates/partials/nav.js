"use strict";

/* nav.js — header + ürün açılır menüsü + dil anahtarı + CTA
   (TASARIM-STANDARDI.md S5.1, ETKI-ANALIZI A2). Yalnız routes.enabledRoutes()
   üzerinden bağlantı üretir; kapalı rota hiçbir zaman menüde görünmez.
   Ürün açılır menüsü ve mobil menü <details>/<summary> ile kurulur —
   JS kapalıyken de açılıp kapanır (ETKI-ANALIZI S3.9 "her içerik JS
   kapalıyken görünür" kısıtı); site.js yalnız Esc ile kapatma, dışa
   tıklamada kapatma ve odak dönüşünü zenginleştirir (src/client/site.js). */

const { html, raw } = require("../../lib/html.js");
const routes = require("../../routes.js");
const { icon } = require("./icon.js");
const { productState } = require("../../lib/model.js");

/* Durum rozeti tek okuyucudan (model.js productState()) gelir — ETKI-ANALIZI
   §4.4/§7 "5 yerde tutarlı" kuralı: home.js'deki yön kapısı/vitrin ile aynı
   çağrıyı kullanır, geçersiz bir status derlemeyi durdurur. */
function productMenuRow(ctx, route, content) {
  const state = productState(content);
  return html`<a href="${ctx.url(route.id)}">
    <strong>${content.name}</strong>
    <span>${content.tagline}</span>
    <span class="badge ${raw(state.isLive ? "badge-live" : "badge-early-access")}">${ctx.t(state.badgeKey)}</span>
  </a>`;
}

function primaryNavItems(ctx) {
  const items = [];
  const hvacRoute = routes.byId.hvac;
  const coldRoute = routes.byId.cold;
  const servicesRoute = routes.byId.services;
  if (hvacRoute.enabled !== false && coldRoute.enabled !== false) {
    items.push(html`<li>
      <details class="nav-products">
        <summary>${ctx.t("nav.products")} ${icon(ctx, "chevron-down")}</summary>
        <div class="nav-products-panel">
          ${productMenuRow(ctx, hvacRoute, ctx.content.hvac)}
          ${productMenuRow(ctx, coldRoute, ctx.content.cold)}
          ${routes.byId.puantaj.enabled !== false ? productMenuRow(ctx, routes.byId.puantaj, ctx.content.puantaj) : ""}
          <a href="${ctx.url(servicesRoute.id)}"><strong>${ctx.t("nav.services")}</strong></a>
        </div>
      </details>
    </li>`);
  }
  items.push(html`<li><a href="${ctx.url("pricing")}"${ctx.route.id === "pricing" ? raw(' aria-current="page"') : raw("")}>${ctx.t("nav.packages")}</a></li>`);
  if (routes.byId.security.enabled !== false) {
    items.push(html`<li><a href="${ctx.url("security")}">${ctx.t("nav.security")}</a></li>`);
  }
  if (routes.byId.about.enabled !== false) {
    items.push(html`<li><a href="${ctx.url("about")}">${ctx.t("nav.about")}</a></li>`);
  }
  items.push(html`<li><a href="${ctx.url("contact")}"${ctx.route.id === "contact" ? raw(' aria-current="page"') : raw("")}>${ctx.t("nav.contact")}</a></li>`);
  return items;
}

function mobileNavLinks(ctx) {
  const links = [];
  if (routes.byId.hvac.enabled !== false) links.push(["hvac", ctx.content.hvac.name]);
  if (routes.byId.cold.enabled !== false) links.push(["cold", ctx.content.cold.name]);
  if (routes.byId.puantaj.enabled !== false) links.push(["puantaj", ctx.content.puantaj.name]);
  links.push(["services", ctx.t("nav.services")]);
  links.push(["pricing", ctx.t("nav.packages")]);
  if (routes.byId.security.enabled !== false) links.push(["security", ctx.t("nav.security")]);
  if (routes.byId.about.enabled !== false) links.push(["about", ctx.t("nav.about")]);
  links.push(["contact", ctx.t("nav.contact")]);
  return links.map(([id, label]) => html`<li><a href="${ctx.url(id)}">${label}</a></li>`);
}

function brandMark(ctx, size) {
  return html`<span class="brand-mark" style="width:${String(size)}px;height:${String(size)}px">
    <img class="brand-mark-dial" src="${ctx.asset("assets/logo/logo-dial.svg")}" alt="" width="${String(size)}" height="${String(size)}">
    <img class="brand-mark-needle" src="${ctx.asset("assets/logo/logo-needle.svg")}" alt="" width="${String(size)}" height="${String(size)}">
  </span>`;
}

function primaryCtaHref(ctx) {
  return ctx.url("contact");
}

function nav(ctx) {
  const altHref = ctx.route.id === "notfound"
    ? routes.notfound.path[ctx.lang === "tr" ? "en" : "tr"]
    : ctx.altLangPath(ctx.route.id);
  const ctaLabel = ctx.t("cta.requestTrial");
  const ctaHref = primaryCtaHref(ctx);

  return html`<header class="site-header" id="site-header" data-scroll-surface>
  <div class="container nav-row">
    <a class="brand" href="${ctx.url("home")}">
      ${brandMark(ctx, 34)}
      <span>${ctx.t("brand.name")}<span class="brand-accent">${ctx.t("brand.accent")}</span></span>
    </a>
    <ul class="primary-nav">${primaryNavItems(ctx)}</ul>
    <div class="nav-actions">
      <a class="lang-switch" href="${altHref}" aria-label="${ctx.t("a11y.language")}">${ctx.lang === "tr" ? "EN" : "TR"}</a>
      <a class="btn desktop-only" href="${ctaHref}">${ctaLabel}</a>
      <details class="mobile-menu">
        <summary class="menu-toggle" aria-label="${ctx.t("a11y.openMenu")}">
          ${icon(ctx, "menu", { class: "icon-menu" })}
          ${icon(ctx, "x", { class: "icon-x" })}
        </summary>
        <div class="mobile-panel">
          <div class="mobile-panel-head">
            <a class="brand" href="${ctx.url("home")}">
              ${brandMark(ctx, 30)}
              <span>${ctx.t("brand.name")}<span class="brand-accent">${ctx.t("brand.accent")}</span></span>
            </a>
          </div>
          <div class="mobile-panel-body">
            <div class="btn-row">
              <a class="lang-switch" href="${altHref}">${ctx.lang === "tr" ? "English" : "Türkçe"}</a>
            </div>
            <div class="btn-row">
              <a class="btn btn-block" href="${ctaHref}">${ctaLabel}</a>
            </div>
            <ul class="mobile-nav-list">${mobileNavLinks(ctx)}</ul>
          </div>
        </div>
      </details>
    </div>
  </div>
</header>`;
}

module.exports = { nav };
