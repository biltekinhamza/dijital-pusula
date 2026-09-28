"use strict";

/* urls.js — bağlantı ve varlık üretimi (ETKI-ANALIZI §4.3, §4.6).
   Kural: bağlantılar yalnız url(routeId, lang, opts) ile üretilir; elle
   yazılmış iç bağlantı yok. KAPALI rotaya (routes.enabled === false) çağrı
   derlemeyi durdurur. Tüm yollar kök-mutlak üretilir (ör. "/fiyatlandirma/")
   — 404 için gereken "her derinlikte çalışır" özelliği (ETKI §4.3) böylece
   normal sayfalar için de aynı, daha basit ve daha güvenli kuralla sağlanır. */

function makeUrlHelper({ routes, config }) {
  function pathFor(routeId, lang, opts = {}) {
    const route = routes.get(routeId);
    if (route.enabled === false) {
      throw new Error(`url(): kapalı rotaya bağlantı üretilemez: "${routeId}" (routes.js'te enabled:false)`);
    }
    const base = route.path[lang];
    if (!base) throw new Error(`url(): rota "${routeId}" için "${lang}" dili tanımlı değil`);
    return opts.hash ? `${base}#${opts.hash}` : base;
  }

  function url(routeId, lang, opts) {
    return pathFor(routeId, lang, opts);
  }

  function canonical(routeId, lang) {
    const origin = config.origin.replace(/\/+$/, "");
    return origin + pathFor(routeId, lang);
  }

  function altLangPath(routeId, currentLang) {
    const other = currentLang === "tr" ? "en" : "tr";
    return pathFor(routeId, other);
  }

  function notFoundPath(lang) {
    const path = routes.notfound.path[lang];
    if (!path) throw new Error(`url(): 404 için "${lang}" dili tanımlı değil`);
    return path;
  }

  return { url, canonical, altLangPath, notFoundPath };
}

/* asset(relPath) — dosya var mı diye kontrol eder (yoksa derleme durur),
   css/js için içerik hash'i (?v=) ekler (ETKI-ANALIZI §4.3). exists/hash
   enjekte edilir: gerçek build.js fs tabanlı, testler sahte fonksiyon verir. */
function makeAssetHelper({ exists, hash }) {
  return function asset(relPath) {
    const clean = relPath.replace(/^\/+/, "");
    if (!exists(clean)) {
      throw new Error(`asset(): dosya yok: ${clean}`);
    }
    const rooted = `/${clean}`;
    if (/\.(css|js)$/.test(clean)) {
      return `${rooted}?v=${hash(clean)}`;
    }
    return rooted;
  };
}

module.exports = { makeUrlHelper, makeAssetHelper };
