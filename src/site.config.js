"use strict";

/* site.config.js — barındırma/ayar TEK KAYNAK (ETKI-ANALIZI §4.6, ADR-7).
   Canonical origin, Cloudflare Worker'ın yayın adresidir. Gerçek alan adı
   alınınca burada TEK satır değişir. check-site --release bu değer ".example"
   içerdiği sürece yayını durdurur (kural 11). */

module.exports = {
  origin: "https://dijital-pusula.biltekinhamza.workers.dev",

  /* ADR-7: form.mode değişince (a) istemci formunun data-mode özniteliği,
     (b) KVKK "aktarım" paragrafı, (c) iletişim sayfası notu hep BURADAN
     üretilir — elle iki yerde güncelleme riski kalkar. */
  form: {
    mode: "mailto", // "mailto" | "endpoint"
    provider: {
      name: "",     // "endpoint" kipinde zorunlu
      country: "",  // "endpoint" kipinde zorunlu
      endpoint: "",
      accessKey: ""
    }
  },

  /* "none" | "cloudflare". "cloudflare" açılırsa çerez bandı ADR-5 gereği
     geri gelmelidir (Cloudflare Web Analytics çerezsizdir); başka bir
     çerezli araç eklenecekse bu ayar yalnız iskelet, karar S13'e bağlı. */
  analytics: "none"
};
