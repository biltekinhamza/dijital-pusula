"use strict";

/* contact.js — iletişim sayfası içeriği. ADR-8 gereği zorunlu rıza kutusu metni
   (form.consent/consentLink) kaldırıldı; yerine kısa aydınlatma notu (notice) kondu. */

module.exports = {
  "meta": {
    "title": "İletişim | Dijital Pusula",
    "description": "Demo ve fiyat talebi için iletişim kanalları ve form.",
    "og": "Demo ve fiyat talebi için bize ulaşın."
  },
  "kicker": "İLETİŞİM",
  "title": "Ürünü görmek en hızlı yol. Bir demo ayarlayalım.",
  "lead": "İşletmenizi ve bugün nasıl çalıştığınızı kısaca yazın. Size uygun ürünü ekran paylaşımıyla gösterelim; uygun değilse bunu da söyleyelim.",
  "email": "E-posta",
  "phone": "Telefon",
  "whatsapp": "WhatsApp'tan yazın",
  "address": "Adres",
  "hours": "Çalışma saatleri",
  "hoursValue": "Hafta içi 09:00 - 18:00",
  "responseNote": "Talepler genellikle aynı iş günü içinde yanıtlanır.",
  "form": {
    "title": "Demo ve Fiyat Talebi",
    "required": "* Zorunlu alanlar",
    "name": "Ad Soyad",
    "company": "Firma",
    "email": "E-posta",
    "phone": "Telefon",
    "interest": "İlgilendiğiniz ürün",
    "size": "İşletme büyüklüğü",
    "description": "Kısaca anlatın",
    "contactMethod": "Tercih ettiğiniz iletişim yolu",
    "methodEmail": "E-posta",
    "methodPhone": "Telefon",
    "submit": "Talebi Gönderin",
    "select": "Seçiniz",
    "namePlaceholder": "Adınız ve soyadınız",
    "companyPlaceholder": "Firma adı",
    "emailPlaceholder": "ornek@firma.com",
    "phonePlaceholder": "+90 5xx xxx xx xx",
    "descriptionPlaceholder": "Kaç kullanıcı olacak, bugün hangi programı kullanıyorsunuz, en çok hangi adım vakit alıyor...",
    "interests": [
      "HVAC Pro Suite (havalandırma)",
      "Soğuk Hava Deposu Yönetim Sistemi",
      "İkisini de görmek istiyorum",
      "Özel yazılım / otomasyon",
      "Henüz emin değilim"
    ],
    "sizes": [
      "1 - 5 kullanıcı",
      "6 - 20 kullanıcı",
      "21 - 50 kullanıcı",
      "50+ kullanıcı",
      "Bilmiyorum"
    ],
    "requiredError": "Bu alan zorunludur.",
    "invalidEmail": "Geçerli bir e-posta adresi girin.",
    "shortDescription": "Lütfen en az 20 karakterlik bir açıklama girin.",
    "sending": "Gönderiliyor...",
    "sent": "Talebiniz alındı. En kısa sürede dönüş yapacağız.",
    "failed": "Gönderim başarısız oldu. Lütfen doğrudan e-posta ile yazın:",
    "preparing": "E-posta hazırlanıyor...",
    "mailFallback": "E-posta uygulamanız açıldı. Açılmadıysa doğrudan yazabilirsiniz:",
    "mailSubject": "Demo / fiyat talebi - Dijital Pusula",
    "note": "Bilgileriniz yalnızca talebinizi yanıtlamak için kullanılır, üçüncü taraflarla paylaşılmaz.",
    "mailLabels": {
      "name": "Ad Soyad",
      "company": "Firma",
      "email": "E-posta",
      "phone": "Telefon",
      "interest": "İlgilendiği ürün",
      "size": "İşletme büyüklüğü",
      "description": "Açıklama",
      "contactMethod": "İletişim tercihi"
    }
  },
  "notice": {
    "text": "Gönderdiğiniz bilgiler yalnızca bu talebi yanıtlamak için kullanılır.",
    "link": "Aydınlatma metnini okuyun"
  }
};
