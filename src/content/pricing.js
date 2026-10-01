"use strict";

/* pricing.js — dilden bağımsız fiyat verisi (ADR-4, ETKI-ANALIZI §4.4). Bugün S3
   (fiyat gösterim kipi) karara bağlanmadığı için tüm planlar price.mode: "quote"
   (rakam yazılmaz, "Teklif isteyin"). updatedAt 90 günden eskiyse check-site uyarır. */

module.exports = {
  "updatedAt": "2026-09-28",
  "hvac": {
    "plans": [
      {
        "id": "trial",
        "price": {
          "mode": "quote"
        },
        "featured": false
      },
      {
        "id": "pro",
        "price": {
          "mode": "quote"
        },
        "featured": true
      },
      {
        "id": "enterprise",
        "price": {
          "mode": "quote"
        },
        "featured": false
      }
    ]
  },
  "puantaj": {
    "plans": [
      {
        "id": "standard",
        "price": {
          "mode": "quote"
        },
        "featured": true
      }
    ]
  },
  "cold": {
    "plans": [
      {
        "id": "standard",
        "price": {
          "mode": "quote"
        },
        "featured": false
      },
      {
        "id": "pro",
        "price": {
          "mode": "quote"
        },
        "featured": true
      },
      {
        "id": "enterprise",
        "price": {
          "mode": "quote"
        },
        "featured": false
      }
    ]
  }
};
