"use strict";

/* model.js — içerik doğrulama: enum'lar + her enum için TEK okuyucu
   (ETKI-ANALIZI §4.4). Bilinmeyen bir enum değeri SESSİZCE yok sayılmaz,
   derlemeyi durdurur (hata fırlatır). Beş enum, beş okuyucu:
     products.<id>.status        → productState()
     products.<id>.trial.mode    → primaryCta()
     pricing.<id>.plans[].price.mode → planPrice()
     config.form.mode            → formMode()
     config.analytics            → analyticsMode()             */

const { formatTRY } = require("./format.js");

const PRODUCT_STATUS = ["live", "early-access"];
const TRIAL_MODE = ["self-serve", "request"];
const PRICE_MODE = ["fixed", "from", "quote"];
const FORM_MODE = ["mailto", "endpoint"];
const ANALYTICS_MODE = ["none", "cloudflare"];

function assertEnum(value, allowed, label) {
  if (!allowed.includes(value)) {
    throw new Error(`model: geçersiz ${label} değeri "${value}" (izin verilenler: ${allowed.join(", ")})`);
  }
}

function productState(product) {
  assertEnum(product && product.status, PRODUCT_STATUS, "products.<id>.status");
  const isLive = product.status === "live";
  return {
    status: product.status,
    isLive,
    badgeKey: isLive ? "state.live" : "state.earlyAccess"
  };
}

function primaryCta(product, t) {
  const trial = (product && product.trial) || {};
  assertEnum(trial.mode, TRIAL_MODE, "products.<id>.trial.mode");
  if (trial.mode === "self-serve") {
    if (!trial.url) {
      throw new Error(`model: trial.mode "self-serve" iken trial.url zorunlu (ürün: ${product.id || "?"})`);
    }
    return { label: t("cta.tryFree"), href: trial.url };
  }
  return { label: t("cta.requestTrial"), routeId: "contact", params: { urun: product.id } };
}

function planPrice(price) {
  assertEnum(price && price.mode, PRICE_MODE, "pricing.<id>.plans[].price.mode");
  const result = { mode: price.mode };
  if (price.mode === "fixed") {
    if (typeof price.monthly === "number") result.monthlyLabel = formatTRY(price.monthly);
    if (typeof price.yearly === "number") result.yearlyLabel = formatTRY(price.yearly);
  } else if (price.mode === "from") {
    if (typeof price.monthly === "number") result.fromLabel = formatTRY(price.monthly);
  }
  /* "quote" kipinde rakam alanı hiç üretilmez (EKRANLAR.md fiyatlandırma
     "Boş" durumu: 0 ₺ yazılmaz, "Teklif isteyin" butonu gösterilir). */
  return result;
}

function formMode(config) {
  const form = (config && config.form) || {};
  assertEnum(form.mode, FORM_MODE, "config.form.mode");
  if (form.mode === "endpoint") {
    const provider = form.provider || {};
    if (!provider.name || !provider.country) {
      throw new Error("model: form.mode \"endpoint\" iken provider.name ve provider.country zorunlu");
    }
  }
  return form.mode;
}

function analyticsMode(config) {
  assertEnum(config && config.analytics, ANALYTICS_MODE, "config.analytics");
  return config.analytics;
}

module.exports = {
  PRODUCT_STATUS,
  TRIAL_MODE,
  PRICE_MODE,
  FORM_MODE,
  ANALYTICS_MODE,
  productState,
  primaryCta,
  planPrice,
  formMode,
  analyticsMode
};
