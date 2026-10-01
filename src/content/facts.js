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
  /* Puantaj Pro Suite — kaynak: E:/Projelerim/puantaj, "coklu-sirket" dalı
     (çoklu şirket ve izolasyon bu dalda; master'a birleşmeden site iddiası
     master'daki üründe karşılıksız kalır). */
  puantaj: {
    attendanceCodes: {
      value: 5,
      source: "E:/Projelerim/puantaj/apps/puantaj/adapter.py:6 (PUANTAJ_KODLARI: G, Y, İ, U, X)",
      checkedAt: "2026-10-01"
    },
    mobileCodes: {
      value: 3,
      source: "E:/Projelerim/puantaj/apps/puantaj/mobile_views.py:18 (MOBIL_KODLAR: G, U, X)",
      checkedAt: "2026-10-01"
    },
    fixedHolidays: {
      value: 7,
      source: "E:/Projelerim/puantaj/apps/ayarlar/services.py:14 (SABIT_TATILLER — 7 sabit tarihli tatil; dini bayramlar elle eklenir)",
      checkedAt: "2026-10-01"
    },
    monthlyBaseDays: {
      value: 30,
      source: "E:/Projelerim/puantaj/apps/puantaj/services/puantaj_service.py:103-117 (şirket personelinde aylık maaş / 30, ay 30 gün bazına normalize)",
      checkedAt: "2026-10-01"
    },
    testCount: {
      value: 106,
      source: "E:/Projelerim/puantaj/apps/*/tests*.py — \"    def test_\" satır sayımı (6 dosya, coklu-sirket dalı), 2026-10-01",
      checkedAt: "2026-10-01"
    }
  },
  /* Ana sayfa "Gerçeklik şeridi"nde (H2) ürünlerin birlikte anılan tek sayı
     ("{testCount}+ Otomatik test") için toplam — üç ayrı sayılmış girdinin
     toplamıdır, kendi başına ürün kodunda aranmaz. */
  combined: {
    testCount: {
      value: 881, // hvac.testCount(142) + cold.backendTestCount(559) + cold.frontendTestCount(74) + puantaj.testCount(106)
      source: "toplam: facts.hvac.testCount + facts.cold.backendTestCount + facts.cold.frontendTestCount + facts.puantaj.testCount",
      checkedAt: "2026-10-01"
    }
  }
};
