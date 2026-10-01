"use strict";

/* common.js — sayfalar arasi paylasilan metin (marka, erisilebilirlik etiketleri,
   navigasyon, urun etiketleri, durum rozeti (state.*), birincil CTA (cta.*),
   altbilgi ve MADDE 5 alan basliklari). ETKI-ANALIZI js/translations.js tr' den tasindi.
   state.* ve cta.* TASARIM-STANDARDI.md SS5.1/5.10'daki onayli etiketlerdir. */

module.exports = {
  "brand": {
    "name": "Dijital",
    "accent": "Pusula",
    "full": "Dijital Pusula",
    "tagline": "Doğru yerdesiniz.",
    "taglineSub": "Sektörünüzün yazılımı burada."
  },
  "a11y": {
    "skip": "İçeriğe geç",
    "openMenu": "Menüyü aç",
    "navigation": "Ana navigasyon",
    "language": "Dil seçimi",
    "backToTop": "Yukarı dön",
    "close": "Kapat",
    "next": "Sonraki bölüme geç",
    "products": "Ürün menüsü"
  },
  "nav": {
    "products": "Ürünler",
    "hvac": "Havalandırma Yazılımı",
    "cold": "Soğuk Hava Deposu",
    "packages": "Paketler",
    "services": "Özel Yazılım",
    "about": "Hakkımızda",
    "contact": "İletişim",
    "demo": "Demo Talep Et",
    "home": "Ana Sayfa"
  },
  "productLabels": {
    "problem": "Bugün nasıl yürüyor",
    "solution": "Ürün ne yapıyor",
    "modules": "Modüller",
    "tech": "Teknoloji",
    "benefit": "Ne değişiyor",
    "specs": "Teknik künye",
    "packages": "Paketler",
    "screens": "Ekranlar",
    "integrations": "Bağlantılar",
    "repo": "Kaynak kodu GitHub'da",
    "demoCta": "Bu ürün için demo isteyin",
    "backHome": "Tüm ürünler",
    "live": "Yayında",
    "included": "Var",
    "excluded": "Yok",
    "representative": "Temsilî görsel",
    "featuredPlan": "Önerilen"
  },
  "state": {
    "live": "Yayında",
    "earlyAccess": "Erken erişim"
  },
  "cta": {
    "tryFree": "Ücretsiz Deneyin",
    "requestTrial": "Deneme Hesabı İsteyin"
  },
  "footer": {
    "description": "Havalandırma imalatçıları, meyve soğuk hava depoları ve personel çalıştıran işletmeler için sektörel yazılım. Özel yazılım ve otomasyon geliştirme.",
    "products": "Ürünler",
    "company": "Kurumsal",
    "legal": "Yasal",
    "contact": "İletişim",
    "rights": "Tüm hakları saklıdır.",
    "privacy": "Gizlilik ve KVKK",
    "cookies": "Çerez Politikası",
    "terms": "Kullanım Koşulları"
  },
  "company": {
    "identityTitle": "Firma bilgileri",
    "fields": {
      "legalName": "Ticari unvan",
      "brandName": "İşletme adı",
      "mersis": "MERSİS numarası",
      "taxNumber": "Vergi kimlik numarası",
      "taxOffice": "Vergi dairesi",
      "address": "Merkez adresi",
      "kep": "KEP adresi",
      "email": "E-posta",
      "phone": "Telefon",
      "chamber": "Meslek odası"
    }
  }
};
