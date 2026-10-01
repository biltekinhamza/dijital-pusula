"use strict";

/* footer.js — altbilgi (TASARIM-STANDARDI.md S5.2, ETKI-ANALIZI A2). MADDE 5
   bloğu (Elektronik Ticaret Hizmet Sağlayıcılar Yönetmeliği md. 5): "İletişim"
   başlığı altında, derlemede basılı, JS'e bağlı değil. Boş alan hiç
   render edilmez (eski main.js:52-107 davranışı korunur). 4 sütun (geniş)
   -> 2 (<1024px) -> 1 (<480px), yalnız açık rotalara bağlantı (routes.js
   tek kaynak). */

const { html, raw } = require("../../lib/html.js");
const routes = require("../../routes.js");
const { icon } = require("./icon.js");

function identityRows(ctx) {
  const address = ctx.lang === "tr" ? ctx.company.addressTr : ctx.company.addressEn;
  const fields = ctx.content.company.fields;
  const rows = [
    ["legalName", ctx.company.legalName], ["brandName", ctx.company.brandName],
    ["mersis", ctx.company.mersis], ["taxNumber", ctx.company.taxNumber],
    ["taxOffice", ctx.company.taxOffice], ["address", address],
    ["kep", ctx.company.kep], ["email", ctx.company.email],
    ["phone", ctx.company.phone], ["chamber", ctx.company.chamber]
  ].filter(([, value]) => value);
  return rows.map(([key, value]) => html`<div><dt>${fields[key]}</dt><dd>${value}</dd></div>`);
}

function productLinks(ctx) {
  const items = [];
  if (routes.byId.hvac.enabled !== false) items.push(["hvac", ctx.content.hvac.name]);
  if (routes.byId.cold.enabled !== false) items.push(["cold", ctx.content.cold.name]);
  if (routes.byId.puantaj.enabled !== false) items.push(["puantaj", ctx.content.puantaj.name]);
  items.push(["services", ctx.t("nav.services")]);
  items.push(["pricing", ctx.t("nav.packages")]);
  return items.map(([id, label]) => html`<li><a href="${ctx.url(id)}">${label}</a></li>`);
}

function resourceLinks(ctx) {
  const items = [];
  if (routes.byId.changelog.enabled !== false) items.push(["changelog", ctx.t("nav.changelog")]);
  if (routes.byId.security.enabled !== false) items.push(["security", ctx.t("nav.security")]);
  if (routes.byId.about.enabled !== false) items.push(["about", ctx.t("nav.about")]);
  items.push(["contact", ctx.t("nav.contact")]);
  return items.map(([id, label]) => html`<li><a href="${ctx.url(id)}">${label}</a></li>`);
}

function footer(ctx) {
  const altHref = ctx.route.id === "notfound"
    ? routes.notfound.path[ctx.lang === "tr" ? "en" : "tr"]
    : ctx.altLangPath(ctx.route.id);
  const legalRoutes = ["legal-privacy", "legal-cookies", "legal-terms", "legal-subscription"]
    .map((id) => routes.byId[id])
    .filter((route) => route.enabled !== false);
  const legalLabelKey = {
    "legal-privacy": "privacy", "legal-cookies": "cookies",
    "legal-terms": "terms", "legal-subscription": "subscription"
  };
  const resources = resourceLinks(ctx);

  return html`<footer id="site-footer" class="site-footer on-dark">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="${ctx.url("home")}">
          <span class="brand-mark">
            <img class="brand-mark-dial" src="${ctx.asset("assets/logo/logo-dial.svg")}" alt="" width="34" height="34">
            <img class="brand-mark-needle" src="${ctx.asset("assets/logo/logo-needle.svg")}" alt="" width="34" height="34">
          </span>
          <span>${ctx.t("brand.name")}<span class="brand-accent">${ctx.t("brand.accent")}</span></span>
        </a>
        <p>${ctx.t("footer.description")}</p>
      </div>
      <div class="footer-col">
        <h2>${ctx.t("footer.products")}</h2>
        <ul>${productLinks(ctx)}</ul>
      </div>
      ${resources.length > 0 ? html`<div class="footer-col">
        <h2>${ctx.t("footer.company")}</h2>
        <ul>${resources}</ul>
      </div>` : raw("")}
      <div class="footer-col">
        <h2>${ctx.t("footer.legal")}</h2>
        <nav aria-label="${ctx.t("footer.legal")}">
          <ul>
            ${legalRoutes.map((route) => html`<li><a href="${ctx.url(route.id)}">${ctx.t(`footer.${legalLabelKey[route.id]}`)}</a></li>`)}
          </ul>
        </nav>
      </div>
      <section class="footer-identity" aria-labelledby="footer-identity-heading">
        <h2 id="footer-identity-heading">${ctx.t("footer.contact")}</h2>
        <dl>${identityRows(ctx)}</dl>
      </section>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${String(ctx.year)} ${ctx.company.brandName}. ${ctx.t("footer.rights")}</p>
      <p><a href="${altHref}">${ctx.lang === "tr" ? "English" : "Türkçe"}</a></p>
    </div>
  </div>
</footer>`;
}

module.exports = { footer };
