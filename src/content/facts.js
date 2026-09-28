"use strict";

/* facts.js — dilden bağımsız ürün gerçekleri. TEK YER (ETKI-ANALIZI §1.5,
   §4.4 örneği). Her girdi { value, source, checkedAt } taşır; source dosya:satır
   biçiminde okunabilir olmalı (check-site kural 9). checkedAt bu değerin ürün
   kodunda en son ne zaman doğrulandığını gösterir — ürün değişirse burası
   yeniden kontrol edilmeli (§1.5 "Ürün değişir, site değişmez" riskine karşı).

   Test sayıları (G5, 2026-09-28): eski translations.js "390+" ve "248 sunucu +
   32 arayüz testi, 86 kontrollü uçtan uca test" ifadeleri bu fazda doğrulandı.
   Gerçek sayılar eskisinden büyük çıktı (ürün büyümüş); üçüncü e2e-kontrol
   rakamı (86) yeni kod yapısıyla birebir eşleşmediği için sayısız bırakıldı
   (§1.6 son satır kuralı: "sayılır ya da ifade sayısız yapılır"). Sayım yöntemi
   her girdinin source alanında yazılıdır; E:/HVAC Pro Suite ve
   E:/soguk_hava_deposu depolarına yazılmadı, yalnız okundu. */

module.exports = {
  hvac: {
    trialDays: {
      value: 7,
      source: "E:/HVAC Pro Suite/app/licensing.py:10 (TRIAL_TERM_DAYS)",
      checkedAt: "2026-09-28"
    },
    trialUsers: {
      value: 2,
      source: "E:/HVAC Pro Suite/app/licensing.py:12 (TRIAL_USER_LIMIT)",
      checkedAt: "2026-09-28"
    },
    partTypes: {
      value: 25,
      source: "E:/HVAC Pro Suite/app/ventilation/part_config.py:12 (PARTS sözlüğü, üst düzey anahtar sayısı)",
      checkedAt: "2026-09-28"
    },
    licenseTermYears: {
      value: 1,
      source: "E:/HVAC Pro Suite/app/licensing.py:8 (LICENSE_TERM_YEARS)",
      checkedAt: "2026-09-28"
    },
    testCount: {
      value: 142,
      source: "E:/HVAC Pro Suite/tests/*.py — \"def test_\" satır sayımı (11 dosya), 2026-09-28",
      checkedAt: "2026-09-28"
    }
  },
  cold: {
    demoRoomLimit: {
      value: 2,
      source: "E:/soguk_hava_deposu/backend/app/core/config.py:136 (DEMO_ROOM_LIMIT — canlı lisansı olmayan depo en fazla bu kadar oda açabilir)",
      checkedAt: "2026-09-28"
    },
    stackOverlapMinPercent: {
      /* G5 bulgusu: eski site metni "%60" diyordu; üründeki gerçek sabit 30.
         Kaynak ürün koduna göre düzeltildi (ETKI-ANALIZI §1.6 yöntemi: okuma,
         çalıştırma değil — kod tek doğruluk kaynağı, eski pazarlama metni değil). */
      value: 30,
      source: "E:/soguk_hava_deposu/backend/app/core/config.py:84 (MIN_SUPPORT_RATIO_PERCENT), kullanım: app/services/placement_service.py:55",
      checkedAt: "2026-09-28"
    },
    backendTestCount: {
      value: 559,
      source: "E:/soguk_hava_deposu/backend/tests/*.py — \"def test_\" satır sayımı (26 dosya), 2026-09-28",
      checkedAt: "2026-09-28"
    },
    frontendTestCount: {
      value: 74,
      source: "E:/soguk_hava_deposu/frontend/src/__tests__/*.test.* — \"test(\"/\"it(\" satır sayımı (7 dosya), 2026-09-28",
      checkedAt: "2026-09-28"
    }
  },
  /* Ana sayfa "Gerçeklik şeridi"nde (H2) iki ürün birlikte anılan tek sayı
     ("{testCount}+ Otomatik test") için toplam — üç ayrı sayılmış girdinin
     toplamıdır, kendi başına ürün kodunda aranmaz. */
  combined: {
    testCount: {
      value: 775, // hvac.testCount(142) + cold.backendTestCount(559) + cold.frontendTestCount(74)
      source: "toplam: facts.hvac.testCount + facts.cold.backendTestCount + facts.cold.frontendTestCount",
      checkedAt: "2026-09-28"
    }
  }
};
