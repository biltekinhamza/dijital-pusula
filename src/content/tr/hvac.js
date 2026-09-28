"use strict";

/* hvac.js — HVAC Pro Suite ürün sayfası içeriği.
   Paket/fiyat verisi ADR-4 gereği pricing.js'e taşındı, burada tekrarlanmaz. */

module.exports = {
  "meta": {
    "title": "HVAC Pro Suite | Havalandırma Teklif ve Maliyet Yazılımı",
    "description": "{partTypes} parça tipi için sac açılımı ve maliyet hesabı, müşterinin kendi siparişini girdiği ekran, antetli PDF teklif ve Paraşüt entegrasyonu. Havalandırma imalatçıları için çok işletmeli platform.",
    "og": "Sac açılımından teklife kadar tek platform. Havalandırma imalatçıları için HVAC Pro Suite."
  },
  /* status/trial: model.js productState()/primaryCta() bu iki alanı zorunlu
     kılıyor (arayuz-gelistirici İTİRAZ maddesi 1). status: "live" — ürün
     gerçekten üretimde (ETKI-ANALIZI kararı gerekmiyor, iki sektörden biri
     zaten yayında). trial.mode: "request" — S4 (ETKI-ANALIZI §9) herkese
     açık bir deneme adresi olmadığını söylüyor; S4 yanıtlanıp bir adres
     verilince yalnız bu iki satır "self-serve" + url'e döner. */
  "status": "live",
  "trial": { "mode": "request" },
  "code": "HVAC",
  "name": "HVAC Pro Suite",
  "subtitle": "Havalandırma teklif, maliyet ve sipariş yönetimi",
  "tagline": "Sac açılımından teklife kadar tek platform.",
  "hero": "Havalandırma imalatçıları için, {partTypes} parça tipinin sac açılımını ve maliyetini hesaplayan; müşterinin ölçüyü kendisinin girdiği; teklifin antetli PDF olarak çıktığı ve Paraşüt'e aktarılabildiği çok işletmeli platform.",
  "highlights": [
    "{partTypes} parça tipi",
    "Girişsiz müşteri sipariş ekranı",
    "Antetli PDF teklif",
    "Paraşüt aktarımı",
    "Android istemci"
  ],
  "problem": "Teklifler Excel'de her seferinde yeniden kuruluyor. Sac açılımı, fire payı, işçilik ve kâr marjı teklifi hazırlayan kişiye göre değişiyor; aynı işe iki farklı fiyat çıkabiliyor. Müşteri ölçüyü telefonda tarif ediyor, ölçü yanlış aktarılınca imalat hatası maliyet olarak geri dönüyor. Teklif PDF'i elde biçimlendiriliyor, fatura ise bambaşka bir programda kesiliyor.",
  "solution": "Parçanın geometrisinden sac açılımını, kesilen alanı, fireyi ve kilogramı; oradan flanş, conta, cıvata, izolasyon, boya ve işçiliği geçerek toplam maliyeti çıkaran bir hesaplama motoru. Müşteri kendi ölçüsünü firmaya özel bir adresten kendisi giriyor, talep panele düşüyor; teklif kalemleri düzenlenip firma antetiyle PDF olarak veriliyor.",
  "benefit": "Teklif hazırlama süresi kısalır, teklifler arasındaki fiyat tutarsızlığı ortadan kalkar ve ölçü hatasının sorumluluğu netleşir; ölçüyü müşteri kendi eliyle girer, kayıt altındadır.",
  "comparison": {
    "title": "Excel ile yürütülen düzenden farkı",
    "lead": "Bu ürünün rakibi başka bir yazılım değil, atölyedeki tabloların kendisi. Fark tam olarak şurada:",
    "before": "Excel ve elle",
    "after": "HVAC Pro Suite ile",
    "rows": [
      {
        "k": "Sac açılımı",
        "before": "Her parça için ayrı formül; dosya kopyalandıkça bozulur, kimin hangi payı eklediği belli olmaz.",
        "after": "{partTypes} parça tipi ürünün içinde; kenet, dirsek ek payı ve klape payı adlandırılmış sabitler, her sürümde test edilir."
      },
      {
        "k": "Fiyat tutarlılığı",
        "before": "Teklifi kim hazırlıyorsa onun tablosuna göre; aynı işe iki farklı fiyat çıkar.",
        "after": "Tek malzeme ve işçilik listesi; teklifi kim hazırlarsa hazırlasın aynı fiyat çıkar."
      },
      {
        "k": "Ölçü alma",
        "before": "Müşteri telefonda tarif eder, karşı taraf elle yazar; hata imalatta ortaya çıkar.",
        "after": "Müşteri parçanın fotoğrafı ve ölçü işaretleri üzerinden ölçüyü kendisi girer, kayıt altında kalır."
      },
      {
        "k": "Teklif çıktısı",
        "before": "Her seferinde elle biçimlendirilen bir belge.",
        "after": "Antetli PDF: logo, vergi kimliği, IBAN, KDV oranı ve geçerlilik tarihi otomatik gelir."
      },
      {
        "k": "Faturaya geçiş",
        "before": "Teklif bir yerde, fatura bambaşka bir programda; kalemler yeniden yazılır.",
        "after": "Onaylanan teklif tek tıkla Paraşüt'e satış teklifi olarak gider; kalemler m² ve metre birimiyle."
      },
      {
        "k": "Geçmişe erişim",
        "before": "Dosya adında sürüm takibi; geçen yılki teklifi bulmak ayrı bir iş.",
        "after": "Bütün teklifler kayıtlı; müşteri adı ve telefonundan aranır, sayfalanır."
      },
      {
        "k": "Yetki",
        "before": "Dosyayı açan herkes maliyeti ve marjı değiştirebilir.",
        "after": "Malzeme maliyeti ve kâr oranı yönetici yetkisinde; personel günlük işi yürütür."
      }
    ]
  },
  "modules": [
    {
      "icon": "⌁",
      "title": "Hesaplama motoru",
      "text": "Kare ve yuvarlak {partTypes} parça tipi. Her parça için sac açılımı (net alan), kesilen alan ve fire, kilogram; ardından flanş, conta, cıvata, izolasyon, boya ve işçilik. Kenet genişliği, dirsek ek payı ve klape kanat payı gibi imalat payları ürünün içinde adlandırılmış sabitlerdir, teklifte kaybolmaz."
    },
    {
      "icon": "▣",
      "title": "Ölçü işaretleri",
      "text": "Her parçanın fotoğrafı üzerinde hangi ölçünün nereye ait olduğu çizgilerle gösterilir. Müşteri 'A ölçüsü neresi' diye sormaz; yanlış alan yanlış yere yazılmaz."
    },
    {
      "icon": "◧",
      "title": "Müşteri sipariş ekranı",
      "text": "Firmaya özel adres (/s/firma-adi) üzerinden, giriş yapmadan çalışan sipariş ekranı. Müşteri parçayı seçer, ölçüyü girer, sepete ekler ve teklif ister. Fiyatlandırma o firmanın kendi malzeme fiyatları ve işçilik oranlarıyla yapılır."
    },
    {
      "icon": "▤",
      "title": "Teklif yönetimi",
      "text": "Gelen talepler panelde listelenir; kalem eklenir, çıkarılır, düzenlenir. Kâr oranı ve nakliye bedeli teklif bazında ayarlanır. Teklif; logonuz, vergi kimliğiniz, IBAN'ınız ve geçerlilik tarihinizle antetli PDF olarak çıkar."
    },
    {
      "icon": "◇",
      "title": "Malzeme ve işçilik",
      "text": "Sac kalınlıkları, malzeme maliyeti ve stok durumu, işçilik oranları panelden yönetilir. Yeni bir işletme açıldığında varsayılan malzeme kartı ve işçilik oranları hazır gelir; siz kendi fiyatınızı girersiniz."
    },
    {
      "icon": "⚿",
      "title": "Kullanıcı ve rol",
      "text": "Sahip, yönetici ve personel rolleri. Personel günlük işi yürütür (teklif kalemi, nakliye, PDF, listeler); malzeme maliyeti, kâr oranı ve şirket ayarları yönetici yetkisindedir."
    },
    {
      "icon": "⇄",
      "title": "Paraşüt entegrasyonu",
      "text": "Onaylanan teklif tek tıkla Paraşüt'e satış teklifi olarak aktarılır; kalemler m² veya metre gibi gerçek satış birimiyle gider. Her işletme kendi Paraşüt bilgisini panelden girer, girmeyen işletmeye bu seçenek hiç gösterilmez."
    },
    {
      "icon": "▥",
      "title": "Android istemci",
      "text": "Sahada ölçü alıp hesaplama yapmak için mobil API ve Android uygulaması. Cihaz aktivasyon koduyla bağlanır."
    }
  ],
  "integrations": [
    {
      "name": "Paraşüt",
      "text": "Teklif → satış teklifi aktarımı. Her işletme kendi hesabını bağlar."
    },
    {
      "name": "PDF teklif",
      "text": "Firma antetli, logolu, vergi kimliği ve IBAN içeren teklif çıktısı."
    },
    {
      "name": "Android",
      "text": "Saha kullanımı için mobil istemci ve /api/v1 mobil arayüzü."
    },
    {
      "name": "PostgreSQL",
      "text": "Üretimde PostgreSQL, geliştirmede SQLite. Yedekleme betiği ürünle birlikte gelir."
    }
  ],
  "specs": [
    {
      "k": "Sunucu",
      "v": "Python 3, FastAPI"
    },
    {
      "k": "Veritabanı",
      "v": "PostgreSQL (üretim), SQLite (geliştirme)"
    },
    {
      "k": "Dağıtım",
      "v": "Docker / Docker Compose"
    },
    {
      "k": "Teklif çıktısı",
      "v": "PDF (reportlab)"
    },
    {
      "k": "Mobil",
      "v": "Android istemci + REST mobil API"
    },
    {
      "k": "Erişim",
      "v": "Tarayıcı; ayrı kurulum gerekmez"
    },
    {
      "k": "Çok işletmeli",
      "v": "Evet, veri işletme bazında ayrılır"
    },
    {
      "k": "Arayüz dili",
      "v": "Türkçe"
    }
  ],
  "targetProfiles": [
    {
      "icon": "⌁",
      "title": "Kanal imalatçısı",
      "text": "Havalandırma kanalı ve bağlantı parçası üreten atölyeler için; sac açılımı ve maliyet tek motordan çıkar."
    },
    {
      "icon": "◇",
      "title": "Sac atölyesi",
      "text": "Kesim ve büküme göre fiyatlayan atölyeler için; kenet, dirsek ve klape payı gibi imalat payları adlandırılmış sabitler olarak durur."
    },
    {
      "icon": "▤",
      "title": "Taahhüt firması",
      "text": "Havalandırma işini taşerona veren ya da kendi ekibiyle yürüten taahhüt firmaları için; teklif ve sipariş tek panelde toplanır."
    }
  ],
  "faq": {
    "items": [
      {
        "q": "Verilerim başka firmalarla karışır mı?",
        "a": "Karışmaz. Her işletmenin verisi veritabanında kendi kimliğiyle ayrılır; bu izolasyon her sürümde otomatik testlerle doğrulanır."
      },
      {
        "q": "Mevcut malzeme ve fiyat listemi aktarabilir miyim?",
        "a": "Tablo halindeki malzeme ve fiyat listeleri aktarılabilir. Elinizdeki dosyayı görüp aktarımın kapsamını birlikte netleştiririz; otomatik bir Excel içe aktarma özelliği değildir."
      },
      {
        "q": "Kaç kullanıcı ekleyebilirim?",
        "a": "Deneme hesabında en fazla {trialUsers} kullanıcı vardır. Pro pakette kullanıcı sayısı sınırlanmaz."
      },
      {
        "q": "Kendi firma bilgilerim ve logom teklifte görünür mü?",
        "a": "Evet. Teklif PDF'i sizin logonuz, vergi kimliğiniz ve IBAN'ınızla çıkar."
      },
      {
        "q": "Deneme süresi bitince ne oluyor, verim siliniyor mu?",
        "a": "Hesabınız pasif hale gelir, verileriniz otomatik silinmez. Devam etmek isterseniz hesabı tam sürüme geçiririz."
      },
      {
        "q": "Kullandığım parça tipim listede yok, eklenebilir mi?",
        "a": "Hazır {partTypes} parça tipinin dışında bir ihtiyacınız varsa özel yazılım tarafımızla konuşuruz; bu bir geliştirme talebidir, otomatik bir özellik değildir."
      }
    ]
  }
};
