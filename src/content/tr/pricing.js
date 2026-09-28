"use strict";

/* pricing.js — fiyatlandırma sayfası METİN içeriği (ADR-4). Sayısal/mod verisi
   (price.mode, updatedAt) dilden bağımsız src/content/pricing.js'tedir. */

module.exports = {
  "meta": {
    "title": "Fiyatlandırma | Dijital Pusula",
    "description": "HVAC Pro Suite ve Soğuk Hava Deposu Yönetim Sistemi paket içerikleri, deneme koşulları ve faturalama bilgileri.",
    "og": "İki ürünün paket içerikleri ve deneme koşulları tek sayfada."
  },
  "intro": {
    "title": "Fiyatlandırma",
    "lead": "Paket içerikleri aşağıda; rakamı görüşmede netleştirip yazılı teklif gönderiyoruz."
  },
  "hvac": {
    "note": "Paket içerikleri aşağıda; rakamı görüşmede netleştirip yazılı teklif gönderiyoruz.",
    "plans": {
      "trial": {
        "name": "Deneme",
        "priceNote": "Ücretsiz",
        "summary": "Ürünü kendi malzemeleriniz ve fiyatlarınızla denemek için.",
        "features": [
          "{trialDays} gün süreli hesap",
          "En fazla {trialUsers} kullanıcı",
          "Tüm hesaplama motoru",
          "Müşteri sipariş ekranı",
          "PDF teklif"
        ],
        "missing": [
          "Paraşüt entegrasyonu",
          "Sınırsız kullanıcı"
        ],
        "cta": "Deneme Hesabı İsteyin"
      },
      "pro": {
        "name": "Pro",
        "priceNote": "Fiyat teklifi ile",
        "summary": "Tek işletme, tam kapsam. Havalandırma imalatçılarının çoğu için doğru paket.",
        "features": [
          "Sınırsız kullanıcı ve rol",
          "Tüm hesaplama motoru ve parça tipleri",
          "Girişsiz müşteri sipariş ekranı",
          "Antetli PDF teklif (logo, vergi kimliği, IBAN)",
          "Paraşüt entegrasyonu",
          "Android istemci",
          "Malzeme, işçilik ve kâr oranı yönetimi",
          "E-posta ve telefon desteği"
        ],
        "missing": [],
        "cta": "Fiyat Teklifi Alın"
      },
      "enterprise": {
        "name": "Kurumsal",
        "priceNote": "Fiyat teklifi ile",
        "summary": "Kendi sunucunuzda çalıştırma, özel geliştirme veya çok şubeli kullanım gerekiyorsa.",
        "features": [
          "Pro paketin tamamı",
          "Kendi sunucunuzda kurulum (Docker)",
          "Özel geliştirme talepleri",
          "Veri aktarımı desteği",
          "Öncelikli destek",
          "Eğitim oturumu"
        ],
        "missing": [],
        "cta": "Görüşme Talep Edin"
      }
    }
  },
  "cold": {
    "note": "Paket içerikleri aşağıda; rakamı görüşmede netleştirip yazılı teklif gönderiyoruz.",
    "plans": {
      "standard": {
        "name": "Standart",
        "priceNote": "Fiyat teklifi ile",
        "summary": "Tek depoyla çalışan, temel depo operasyonu yeten işletmeler için.",
        "features": [
          "3D yerleşim ve yerleşim kuralları",
          "Stok giriş, kısmi ve tam çıkış",
          "Hareket geçmişi ve stok kodu",
          "Depolama hesabı (kalan KG × KG fiyatı)",
          "Stok ve doluluk raporları",
          "Rol bazlı yetkilendirme"
        ],
        "missing": [
          "Personel ve yevmiyeci modülü",
          "Ödeme takibi"
        ],
        "cta": "Fiyat Teklifi Alın"
      },
      "pro": {
        "name": "Pro",
        "priceNote": "Fiyat teklifi ile",
        "summary": "Personel ve yevmiye takibi de yapan, birden çok deposu olan işletmeler için.",
        "features": [
          "Standart paketin tamamı",
          "Çoklu depo (her depo kendi fiyatı ve defteri)",
          "Personel kayıtları",
          "Yevmiyeci grupları",
          "Grup bazlı ödeme takibi",
          "Bütün raporlar (CSV / XLSX / PDF)",
          "Denetim kaydı",
          "E-posta ve telefon desteği"
        ],
        "missing": [],
        "cta": "Fiyat Teklifi Alın"
      },
      "enterprise": {
        "name": "Kurumsal",
        "priceNote": "Fiyat teklifi ile",
        "summary": "Kendi sunucunuzda çalıştırma, özel geliştirme veya çok şubeli kullanım gerekiyorsa.",
        "features": [
          "Pro paketin tamamı",
          "Sonradan eklenen modüllere erişim",
          "Kendi sunucunuzda kurulum (Docker)",
          "Özel geliştirme talepleri",
          "Veri aktarımı desteği",
          "Öncelikli destek",
          "Eğitim oturumu"
        ],
        "missing": [],
        "cta": "Görüşme Talep Edin"
      }
    }
  }
};
