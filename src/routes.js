"use strict";

/* routes.js — TEK KAYNAK: rota kimliği, yol, açık/kapalı durum, eski URL
   yönlendirmeleri. Menü, altbilgi, site haritası, dil bağlantıları ve iç
   bağlantılar hepsi bu tablodan türer (ETKI-ANALIZI §3.2, §7 "Tek kaynak").
   Kapalı (enabled:false) bir rotaya src/lib/urls.js#url() çağrısı derlemeyi
   durdurur — bu dosyada "kapatmak" tek satırlık bir değişikliktir. */

const list = [
  { id: "home", template: "home", contentId: "home", metaPath: "home.meta", heroPath: "home.hero.title", path: { tr: "/", en: "/en/" }, enabled: true, legacy: [] },
  { id: "hvac", template: "product", contentId: "hvac", productId: "hvac", metaPath: "hvac.meta", heroPath: "hvac.name", path: { tr: "/hvac-pro-suite/", en: "/en/hvac-pro-suite/" }, enabled: true, legacy: ["/havalandirma-yazilimi.html", "/havalandirma-yazilimi"] },
  { id: "cold", template: "product", contentId: "cold", productId: "cold", metaPath: "cold.meta", heroPath: "cold.name", path: { tr: "/soguk-hava-deposu/", en: "/en/cold-storage/" }, enabled: true, legacy: ["/soguk-hava-deposu-yazilimi.html", "/soguk-hava-deposu-yazilimi"] },
  { id: "pricing", template: "pricing", contentId: "pricing", metaPath: "pricing.meta", heroPath: "pricing.intro.title", path: { tr: "/fiyatlandirma/", en: "/en/pricing/" }, enabled: true, legacy: [] },
  { id: "services", template: "services", contentId: "services", metaPath: "services.meta", heroPath: "services.hero.title", path: { tr: "/ozel-yazilim/", en: "/en/custom-software/" }, enabled: true, legacy: ["/ozel-yazilim.html"] },
  { id: "contact", template: "contact", contentId: "contact", metaPath: "contact.meta", heroPath: "contact.title", path: { tr: "/iletisim/", en: "/en/contact/" }, enabled: true, legacy: [] },
  { id: "legal-privacy", template: "legal", contentId: "legal", legalKey: "privacy", metaPath: "legal.privacy.meta", heroPath: "legal.privacy.title", path: { tr: "/yasal/kvkk-aydinlatma-metni/", en: "/en/legal/privacy-notice/" }, enabled: true, legacy: ["/gizlilik.html", "/gizlilik"] },
  { id: "legal-cookies", template: "legal", contentId: "legal", legalKey: "cookies", metaPath: "legal.cookies.meta", heroPath: "legal.cookies.title", path: { tr: "/yasal/cerez-politikasi/", en: "/en/legal/cookie-policy/" }, enabled: true, legacy: ["/cerez-politikasi.html"] },
  { id: "legal-terms", template: "legal", contentId: "legal", legalKey: "terms", metaPath: "legal.terms.meta", heroPath: "legal.terms.title", path: { tr: "/yasal/kullanim-kosullari/", en: "/en/legal/terms-of-use/" }, enabled: true, legacy: ["/kullanim-sartlari.html", "/kullanim-sartlari"] },
  { id: "about", template: "about", contentId: "about", metaPath: null, heroPath: null, path: { tr: "/hakkimizda/", en: "/en/about/" }, enabled: false, legacy: [] },
  { id: "changelog", template: "changelog", contentId: "changelog", metaPath: null, heroPath: null, path: { tr: "/surum-notlari/", en: "/en/changelog/" }, enabled: false, legacy: [] },
  { id: "security", template: "security", contentId: "security", metaPath: null, heroPath: null, path: { tr: "/guvenlik/", en: "/en/security/" }, enabled: false, legacy: [] },
  { id: "legal-subscription", template: "legal", contentId: "legal", legalKey: "subscription", metaPath: null, heroPath: null, path: { tr: "/yasal/abonelik-sartlari/", en: "/en/legal/subscription-terms/" }, enabled: false, legacy: [] }
];

const notfound = {
  id: "notfound",
  template: "notfound",
  contentId: "notfound",
  metaPath: "notfound.meta",
  heroPath: "notfound.title",
  path: { tr: "/404.html", en: "/en/404.html" }
};

const byId = Object.fromEntries(list.map((route) => [route.id, route]));

function get(id) {
  const route = byId[id];
  if (!route) throw new Error(`routes: bilinmeyen rota kimliği "${id}"`);
  return route;
}

function enabledRoutes() {
  return list.filter((route) => route.enabled !== false);
}

module.exports = { list, byId, get, enabledRoutes, notfound };
