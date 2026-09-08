/* Proje Bahcesi - site icerik katmani (TR / EN).
   Butun sayfalar bu tek katalogu paylasir. main.js icindeki t("a.b.c")
   noktali yol cozumlemesi dogrudan bu agac uzerinde calisir; sayfa
   markup'inda data-i18n="a.b.c" yazmak yeterlidir.

   YAYIN ONCESI DEGISTIRILECEK TEK YER: asagidaki COMPANY blogu. */

window.SITE_COMPANY = {
  /* Gercek sirket bilgileriyle degistirin. Sitede gecen her yerde bu
     degerler kullanilir; baska bir dosyada tekrarlanmaz.

     ZORUNLULUK NOTU: Elektronik Ticaret Hizmet Saglayicilar Hakkinda
     Yonetmelik (RG 29/12/2022, 32058) MADDE 5, ana sayfada "Iletisim"
     basligi altinda dogrudan erisilebilir sekilde sunlari sart kosar:
       - tacir icin:  ticaret unvani + MERSIS numarasi + merkez adresi
       - esnaf icin:  ad soyad + vergi kimlik numarasi + merkez adresi
       - her halde:   KEP adresi, e-posta, telefon
       - mensubu olunan meslek odasi ve davranis kurallari bilgisi
     Hangi kategoriye girdiginizi (dolayisiyla MERSIS mi VKN mi
     yazacaginizi) mali musavirinize sorun. Bos birakilan alanlar
     sitede hic gosterilmez. */
  legalName: "Proje Bahcesi",            // PLACEHOLDER - ticari unvan ya da ad soyad
  brandName: "",                          // Varsa isletme adi / tescilli marka
  email: "ornek@projebahcesi.com",       // PLACEHOLDER
  phone: "+90 (___) ___ __ __",          // PLACEHOLDER
  phoneHref: "",                          // orn. "+905xxxxxxxxx" - bos ise tel: linki verilmez
  whatsapp: "",                           // orn. "905xxxxxxxxx" - bos ise WhatsApp butonu gizlenir
  kep: "",                                // KEP adresi - ZORUNLU
  addressTr: "Sirket adresi yayin oncesi eklenecek",
  addressEn: "Company address to be added before launch",
  taxOffice: "",                          // Vergi dairesi
  taxNumber: "",                          // VKN / TCKN
  mersis: "",                             // MERSIS (tacir ise)
  chamber: "",                            // Mensubu olunan meslek odasi
  chamberUrl: "",                         // Odanin davranis kurallarina erisim adresi
  github: "https://github.com/biltekinhamza",
  linkedin: ""                            // bos ise LinkedIn baglantisi gizlenir
};

window.SITE_CONTENT = {
  tr: {
    brand: { name: "Proje", accent: "Bahçesi", tagline: "Sektörel yazılım" },

    a11y: {
      skip: "İçeriğe geç", openMenu: "Menüyü aç", navigation: "Ana navigasyon",
      language: "Dil seçimi", backToTop: "Yukarı dön", close: "Kapat",
      next: "Sonraki bölüme geç", products: "Ürün menüsü"
    },

    nav: {
      products: "Ürünler", hvac: "Havalandırma Yazılımı", cold: "Soğuk Hava Deposu",
      packages: "Paketler", services: "Özel Yazılım", about: "Hakkımızda",
      contact: "İletişim", demo: "Demo Talep Et", home: "Ana Sayfa"
    },

    pages: {
      home: {
        title: "Proje Bahçesi | Havalandırma ve Soğuk Hava Deposu Yazılımları",
        description: "Havalandırma imalatçıları için teklif ve maliyet yazılımı, meyve soğuk hava depoları için 3D depo yönetim sistemi. Çok işletmeli, buluttan çalışan sektörel yazılımlar.",
        og: "Sektörünüz için hazır, buluttan çalışan yazılımlar: HVAC Pro Suite ve Soğuk Hava Deposu Yönetim Sistemi."
      },
      hvac: {
        title: "HVAC Pro Suite | Havalandırma Teklif ve Maliyet Yazılımı",
        description: "25 parça tipi için sac açılımı ve maliyet hesabı, müşterinin kendi siparişini girdiği ekran, antetli PDF teklif ve Paraşüt entegrasyonu. Havalandırma imalatçıları için çok işletmeli platform.",
        og: "Sac açılımından teklife kadar tek platform. Havalandırma imalatçıları için HVAC Pro Suite."
      },
      cold: {
        title: "Soğuk Hava Deposu Yönetim Sistemi | 3D Depo Yerleşimi ve Stok",
        description: "Meyve soğuk hava depoları için deponun 3D dijital ikizi: sürükle-bırak palet yerleşimi, çakışma ve istif kuralları, kalan KG üzerinden depolama hesabı, çoklu depo ve raporlar.",
        og: "Deponun 3D dijital ikizi. Meyve soğuk hava depoları için yerleşim, stok ve depolama hesabı."
      },
      services: {
        title: "Özel Yazılım ve Otomasyon | Proje Bahçesi",
        description: "Hazır ürünlerin dışında kalan ihtiyaçlar için özel yazılım, sistem entegrasyonu ve süreç otomasyonu geliştiriyoruz.",
        og: "İşletmenize özel yazılım, entegrasyon ve süreç otomasyonu."
      },
      privacy: {
        title: "Gizlilik ve KVKK Aydınlatma Metni | Proje Bahçesi",
        description: "Proje Bahçesi internet sitesi üzerinden toplanan kişisel verilere ilişkin KVKK aydınlatma metni ve gizlilik açıklaması.",
        og: "KVKK aydınlatma metni ve gizlilik açıklaması."
      },
      cookies: {
        title: "Çerez Politikası | Proje Bahçesi",
        description: "Proje Bahçesi internet sitesinde kullanılan tarayıcı depolaması ve çerez uygulamalarına ilişkin politika.",
        og: "Çerez ve tarayıcı depolaması politikası."
      },
      terms: {
        title: "Kullanım Koşulları | Proje Bahçesi",
        description: "Proje Bahçesi internet sitesinin kullanım koşulları, bağlayıcılık ve sorumluluk sınırları.",
        og: "Sitenin kullanım koşulları ve sorumluluk sınırları."
      }
    },

    home: {
      hero: {
        eyebrow: "Sektörüne göre yazılmış, kutudan çıkar çıkmaz çalışan yazılımlar",
        title: "Havalandırma ve soğuk hava deposu işletmeleri için hazır yazılım.",
        description: "Genel amaçlı bir ERP'yi işinize benzetmeye çalışmak yerine, doğrudan sizin işiniz için yazılmış iki ürün. İkisi de buluttan çalışır, her işletmenin verisi birbirinden ayrıdır ve kurulum gerektirmez.",
        primary: "Ürünleri İnceleyin",
        secondary: "Demo Talep Edin",
        note: "Kurulum yok · Her işletme kendi verisiyle çalışır · Tarayıcıdan erişim"
      },
      stats: {
        title: "Rakamlarla",
        items: [
          { value: "2", label: "Yayında olan ürün", note: "Havalandırma ve soğuk hava deposu" },
          { value: "25", label: "Havalandırma parça tipi", note: "Sac açılımı ve maliyeti hesaplanan" },
          { value: "3D", label: "Depo dijital ikizi", note: "Odalar gerçek ölçüleriyle modellenir" },
          { value: "390+", label: "Otomatik test", note: "İki üründe, her sürüm öncesi çalıştırılır" }
        ]
      },
      products: {
        kicker: "ÜRÜNLERİMİZ",
        title: "İki sektör, iki ürün. İkisi de gerçek bir sahada doğdu.",
        lead: "Her iki ürün de bir işletmenin somut probleminden çıktı; genel bir şablonun üstüne sektör etiketi yapıştırılarak yapılmadı.",
        cta: "Ürünü İnceleyin",
        badgeLive: "Yayında"
      },
      why: {
        kicker: "NEDEN BU ÜRÜNLER",
        title: "Küçük bir ekipten yazılım almanın karşılığı: doğrudan muhatap.",
        lead: "Büyük bir yazılım firmasının çağrı merkezine düşmezsiniz. Talebinizi yazan kişiyle konuşursunuz, kabul edilen değişiklik sıraya girer.",
        items: [
          { icon: "◧", title: "Verileriniz sizin", text: "Her işletmenin verisi veritabanı seviyesinde ayrılır. Başka bir firmanın fiyatı, müşterisi veya teklifi hiçbir ekranda görünmez; bu ayrım otomatik testlerle sürekli doğrulanır." },
          { icon: "⌁", title: "Sektöre özgü hesap", text: "Sac açılımı, fire payı, istif kuralı, kalan KG üzerinden depolama bedeli. Bunlar genel yazılımlarda olmayan, sizin işinizin gerçek kuralları." },
          { icon: "◇", title: "Test edilmiş kod", text: "Her iki üründe de hesaplama ve yetkilendirme mantığı otomatik testlerle korunur. Bir düzeltmenin başka bir yeri bozmadığı elle değil, testle doğrulanır." },
          { icon: "▤", title: "Kendi fiyatınız, kendi antetiniz", text: "Malzeme fiyatı, işçilik oranı, kâr marjı ve KDV oranı sizindir. Teklif PDF'i sizin logonuz, vergi kimliğiniz ve IBAN'ınızla çıkar." },
          { icon: "⇄", title: "Var olan düzeninize bağlanır", text: "Havalandırma tarafında teklif tek tıkla Paraşüt'e satış teklifi olarak gider; soğuk hava tarafında raporlar CSV, XLSX ve PDF olarak dışarı alınır." },
          { icon: "↻", title: "Yedek ve geri dönüş belgeli", text: "Yedek alma, geri yükleme ve sürüm geri alma yordamları yazılı. Testi yapılmamış yedek, yedek sayılmaz." }
        ]
      },
      services: {
        kicker: "ÜRÜNLERİN DIŞINDA",
        title: "İhtiyacınız bu iki üründen biri değilse.",
        lead: "İşletmelere özel yazılım, sistem entegrasyonu ve süreç otomasyonu da geliştiriyoruz. Ürünlerimiz zaten bu şekilde ortaya çıktı.",
        cta: "Özel Yazılım Tarafına Bakın",
        items: ["Süreç otomasyonu", "Sistem entegrasyonu", "Web ve mobil uygulama", "Raporlama ve panel", "Masaüstü uygulama", "Bakım ve destek"]
      },
      process: {
        kicker: "NASIL BAŞLIYORUZ",
        title: "Demo talebinden canlı kullanıma dört adım.",
        steps: [
          { title: "Demo talebi", text: "Formu doldurun ya da doğrudan yazın. İşletmenizin büyüklüğünü ve bugün nasıl çalıştığınızı öğrenelim." },
          { title: "Canlı gösterim", text: "Ürünü sizin verilerinize benzer bir örnek üzerinde ekran paylaşımıyla gösteririz. Sorular burada sorulur." },
          { title: "Deneme hesabı", text: "İşletmenize ait bir hesap açılır. Kendi malzemelerinizi, fiyatlarınızı ve odalarınızı girip gerçek bir işi baştan sona denersiniz." },
          { title: "Devreye alma", text: "Karar verirseniz hesap tam sürüme geçer, mevcut verileriniz aktarılır ve kullanıcılarınız tanımlanır." }
        ]
      },
      faq: {
        kicker: "SIK SORULAN SORULAR",
        title: "Satın alma öncesi en çok sorulanlar.",
        lead: "Burada olmayan bir sorunuz varsa doğrudan yazabilirsiniz; teknik soruları da aynı kişi yanıtlıyor.",
        link: "Sorunuzu iletin",
        items: [
          { q: "Kurulum yapmam gerekiyor mu?", a: "Hayır. Her iki ürün de buluttan çalışır; tarayıcıdan adrese girip kullanırsınız. Kendi sunucunuzda çalıştırmak isterseniz Docker imajı ve kurulum belgeleri mevcuttur, bu durumda kurulum ve bakım koşullarını ayrıca konuşuruz." },
          { q: "Verilerim başka firmalarla karışır mı?", a: "Karışmaz. Her işletmenin verisi veritabanında kendi kimliğiyle ayrılır ve sorgular bu ayrımı zorunlu kılar. Bu izolasyon her sürümde otomatik testlerle doğrulanır; bir firmanın kaydına başka bir firmanın hesabıyla erişilemediği ayrıca test edilir." },
          { q: "Mevcut verilerimi aktarabilir miyim?", a: "Malzeme listesi, fiyat listesi, üretici ve ürün tanımları gibi tablo halindeki veriler aktarılabilir. Elinizdeki dosyayı görelim, aktarımın kapsamını ve süresini birlikte netleştirelim." },
          { q: "Deneme sürümü var mı?", a: "Evet. Havalandırma tarafında deneme hesabı 7 gün ve 2 kullanıcı ile açılır; soğuk hava tarafında demo hesap depo başına 2 oda ile çalışır. Deneme süresince gerçek verinizle çalışabilirsiniz." },
          { q: "Fiyatlar neden sitede yazmıyor?", a: "Paketler işletme büyüklüğüne, kullanıcı sayısına ve veri aktarımı gerekip gerekmediğine göre değişiyor. Paket içerikleri sayfalarda açıkça yazılı; rakamı görüşmede net veriyoruz ve yazılı teklif gönderiyoruz." },
          { q: "Yazılımı biz kendi sunucumuzda çalıştırabilir miyiz?", a: "Kurumsal pakette mümkün. Her iki ürün de Docker ile paketlenmiştir ve PostgreSQL üzerinde çalışır. Sunucu, yedekleme ve güncelleme sorumluluğunun kimde olacağını sözleşmede belirleriz." },
          { q: "Destek nasıl veriliyor?", a: "E-posta ve telefon ile. Arayan kişi yazılımı yazan kişiye ulaşır; ara katman yoktur. Hata bildirimleri sıraya alınır, kabul edilen geliştirme talepleri sürüm planına girer." },
          { q: "Faturalandırma nasıl işliyor?", a: "Şu anda abonelik yenilemesi ve faturalandırma çevrimdışı yürütülüyor: yazılı teklif, sözleşme ve fatura. Site üzerinden çevrimiçi ödeme henüz alınmıyor." }
        ]
      }
    },

    /* --------------------------------------------------------------- */

    products: {
      labels: {
        problem: "Bugün nasıl yürüyor",
        solution: "Ürün ne yapıyor",
        modules: "Modüller",
        tech: "Teknoloji",
        benefit: "Ne değişiyor",
        specs: "Teknik künye",
        packages: "Paketler",
        screens: "Ekranlar",
        integrations: "Bağlantılar",
        repo: "Kaynak kodu GitHub'da",
        demoCta: "Bu ürün için demo isteyin",
        backHome: "Tüm ürünler",
        live: "Yayında",
        included: "Var",
        excluded: "Yok"
      },

      hvac: {
        code: "HVAC",
        name: "HVAC Pro Suite",
        subtitle: "Havalandırma teklif, maliyet ve sipariş yönetimi",
        tagline: "Sac açılımından teklife kadar tek platform.",
        hero: "Havalandırma imalatçıları için, 25 parça tipinin sac açılımını ve maliyetini hesaplayan; müşterinin ölçüyü kendisinin girdiği; teklifin antetli PDF olarak çıktığı ve Paraşüt'e aktarılabildiği çok işletmeli platform.",
        highlights: ["25 parça tipi", "Girişsiz müşteri sipariş ekranı", "Antetli PDF teklif", "Paraşüt aktarımı", "Android istemci"],
        problem: "Teklifler Excel'de her seferinde yeniden kuruluyor. Sac açılımı, fire payı, işçilik ve kâr marjı teklifi hazırlayan kişiye göre değişiyor; aynı işe iki farklı fiyat çıkabiliyor. Müşteri ölçüyü telefonda tarif ediyor, ölçü yanlış aktarılınca imalat hatası maliyet olarak geri dönüyor. Teklif PDF'i elde biçimlendiriliyor, fatura ise bambaşka bir programda kesiliyor.",
        solution: "Parçanın geometrisinden sac açılımını, kesilen alanı, fireyi ve kilogramı; oradan flanş, conta, cıvata, izolasyon, boya ve işçiliği geçerek toplam maliyeti çıkaran bir hesaplama motoru. Müşteri kendi ölçüsünü firmaya özel bir adresten kendisi giriyor, talep panele düşüyor; teklif kalemleri düzenlenip firma antetiyle PDF olarak veriliyor.",
        benefit: "Teklif hazırlama süresi kısalır, teklifler arasındaki fiyat tutarsızlığı ortadan kalkar ve ölçü hatasının sorumluluğu netleşir; ölçüyü müşteri kendi eliyle girer, kayıt altındadır.",
        comparison: {
          title: "Excel ile yürütülen düzenden farkı",
          lead: "Bu ürünün rakibi başka bir yazılım değil, atölyedeki tabloların kendisi. Fark tam olarak şurada:",
          before: "Excel ve elle",
          after: "HVAC Pro Suite ile",
          rows: [
            { k: "Sac açılımı", before: "Her parça için ayrı formül; dosya kopyalandıkça bozulur, kimin hangi payı eklediği belli olmaz.", after: "25 parça tipi ürünün içinde; kenet, dirsek ek payı ve klape payı adlandırılmış sabitler, her sürümde test edilir." },
            { k: "Fiyat tutarlılığı", before: "Teklifi kim hazırlıyorsa onun tablosuna göre; aynı işe iki farklı fiyat çıkar.", after: "Tek malzeme ve işçilik listesi; teklifi kim hazırlarsa hazırlasın aynı fiyat çıkar." },
            { k: "Ölçü alma", before: "Müşteri telefonda tarif eder, karşı taraf elle yazar; hata imalatta ortaya çıkar.", after: "Müşteri parçanın fotoğrafı ve ölçü işaretleri üzerinden ölçüyü kendisi girer, kayıt altında kalır." },
            { k: "Teklif çıktısı", before: "Her seferinde elle biçimlendirilen bir belge.", after: "Antetli PDF: logo, vergi kimliği, IBAN, KDV oranı ve geçerlilik tarihi otomatik gelir." },
            { k: "Faturaya geçiş", before: "Teklif bir yerde, fatura bambaşka bir programda; kalemler yeniden yazılır.", after: "Onaylanan teklif tek tıkla Paraşüt'e satış teklifi olarak gider; kalemler m² ve metre birimiyle." },
            { k: "Geçmişe erişim", before: "Dosya adında sürüm takibi; geçen yılki teklifi bulmak ayrı bir iş.", after: "Bütün teklifler kayıtlı; müşteri adı ve telefonundan aranır, sayfalanır." },
            { k: "Yetki", before: "Dosyayı açan herkes maliyeti ve marjı değiştirebilir.", after: "Malzeme maliyeti ve kâr oranı yönetici yetkisinde; personel günlük işi yürütür." }
          ]
        },
        modules: [
          { icon: "⌁", title: "Hesaplama motoru", text: "Kare ve yuvarlak 25 parça tipi. Her parça için sac açılımı (net alan), kesilen alan ve fire, kilogram; ardından flanş, conta, cıvata, izolasyon, boya ve işçilik. Kenet genişliği, dirsek ek payı ve klape kanat payı gibi imalat payları ürünün içinde adlandırılmış sabitlerdir, teklifte kaybolmaz." },
          { icon: "▣", title: "Ölçü işaretleri", text: "Her parçanın fotoğrafı üzerinde hangi ölçünün nereye ait olduğu çizgilerle gösterilir. Müşteri 'A ölçüsü neresi' diye sormaz; yanlış alan yanlış yere yazılmaz." },
          { icon: "◧", title: "Müşteri sipariş ekranı", text: "Firmaya özel adres (/s/firma-adi) üzerinden, giriş yapmadan çalışan sipariş ekranı. Müşteri parçayı seçer, ölçüyü girer, sepete ekler ve teklif ister. Fiyatlandırma o firmanın kendi malzeme fiyatları ve işçilik oranlarıyla yapılır." },
          { icon: "▤", title: "Teklif yönetimi", text: "Gelen talepler panelde listelenir; kalem eklenir, çıkarılır, düzenlenir. Kâr oranı ve nakliye bedeli teklif bazında ayarlanır. Teklif; logonuz, vergi kimliğiniz, IBAN'ınız ve geçerlilik tarihinizle antetli PDF olarak çıkar." },
          { icon: "◇", title: "Malzeme ve işçilik", text: "Sac kalınlıkları, malzeme maliyeti ve stok durumu, işçilik oranları panelden yönetilir. Yeni bir işletme açıldığında varsayılan malzeme kartı ve işçilik oranları hazır gelir; siz kendi fiyatınızı girersiniz." },
          { icon: "⚿", title: "Kullanıcı ve rol", text: "Sahip, yönetici ve personel rolleri. Personel günlük işi yürütür (teklif kalemi, nakliye, PDF, listeler); malzeme maliyeti, kâr oranı ve şirket ayarları yönetici yetkisindedir." },
          { icon: "⇄", title: "Paraşüt entegrasyonu", text: "Onaylanan teklif tek tıkla Paraşüt'e satış teklifi olarak aktarılır; kalemler m² veya metre gibi gerçek satış birimiyle gider. Her işletme kendi Paraşüt bilgisini panelden girer, girmeyen işletmeye bu seçenek hiç gösterilmez." },
          { icon: "▥", title: "Android istemci", text: "Sahada ölçü alıp hesaplama yapmak için mobil API ve Android uygulaması. Cihaz aktivasyon koduyla bağlanır." }
        ],
        integrations: [
          { name: "Paraşüt", text: "Teklif → satış teklifi aktarımı. Her işletme kendi hesabını bağlar." },
          { name: "PDF teklif", text: "Firma antetli, logolu, vergi kimliği ve IBAN içeren teklif çıktısı." },
          { name: "Android", text: "Saha kullanımı için mobil istemci ve /api/v1 mobil arayüzü." },
          { name: "PostgreSQL", text: "Üretimde PostgreSQL, geliştirmede SQLite. Yedekleme betiği ürünle birlikte gelir." }
        ],
        specs: [
          { k: "Sunucu", v: "Python 3, FastAPI" },
          { k: "Veritabanı", v: "PostgreSQL (üretim), SQLite (geliştirme)" },
          { k: "Dağıtım", v: "Docker / Docker Compose" },
          { k: "Teklif çıktısı", v: "PDF (reportlab)" },
          { k: "Mobil", v: "Android istemci + REST mobil API" },
          { k: "Erişim", v: "Tarayıcı; ayrı kurulum gerekmez" },
          { k: "Çok işletmeli", v: "Evet, veri işletme bazında ayrılır" },
          { k: "Arayüz dili", v: "Türkçe" }
        ],
        packages: {
          note: "Paket içerikleri aşağıda; rakamı görüşmede netleştirip yazılı teklif gönderiyoruz.",
          plans: [
            {
              name: "Deneme", price: "7 gün", priceNote: "Ücretsiz",
              summary: "Ürünü kendi malzemeleriniz ve fiyatlarınızla denemek için.",
              features: ["7 gün süreli hesap", "En fazla 2 kullanıcı", "Tüm hesaplama motoru", "Müşteri sipariş ekranı", "PDF teklif"],
              missing: ["Paraşüt entegrasyonu", "Sınırsız kullanıcı"],
              cta: "Deneme Hesabı İsteyin", featured: false
            },
            {
              name: "Pro", price: "Yıllık lisans", priceNote: "Fiyat teklifi ile",
              summary: "Tek işletme, tam kapsam. Havalandırma imalatçılarının çoğu için doğru paket.",
              features: ["Sınırsız kullanıcı ve rol", "Tüm hesaplama motoru ve parça tipleri", "Girişsiz müşteri sipariş ekranı", "Antetli PDF teklif (logo, vergi kimliği, IBAN)", "Paraşüt entegrasyonu", "Android istemci", "Malzeme, işçilik ve kâr oranı yönetimi", "E-posta ve telefon desteği"],
              missing: [],
              cta: "Fiyat Teklifi Alın", featured: true
            },
            {
              name: "Kurumsal", price: "Görüşmeye bağlı", priceNote: "Fiyat teklifi ile",
              summary: "Kendi sunucunuzda çalıştırma, özel geliştirme veya çok şubeli kullanım gerekiyorsa.",
              features: ["Pro paketin tamamı", "Kendi sunucunuzda kurulum (Docker)", "Özel geliştirme talepleri", "Veri aktarımı desteği", "Öncelikli destek", "Eğitim oturumu"],
              missing: [],
              cta: "Görüşme Talep Edin", featured: false
            }
          ]
        }
      },

      cold: {
        code: "SHD",
        name: "Soğuk Hava Deposu Yönetim Sistemi",
        subtitle: "3D depo yerleşimi, stok ve depolama hesabı",
        tagline: "Deponun 3D dijital ikizi.",
        hero: "Meyve soğuk hava depoları için, odaları gerçek ölçüleriyle modelleyen; paletin yerini sürükle-bırak ile belirleyip çakışma, istif ve koridor kurallarını sunucuda doğrulayan depo yönetim sistemi.",
        highlights: ["3D oda modeli", "Sürükle-bırak yerleşim", "Kalan KG üzerinden hesap", "Çoklu depo", "CSV / XLSX / PDF rapor"],
        problem: "Hangi odada ne var, hangi palet kimin ve oda ne kadar dolu — bunların cevabı defterde, Excel'de ve depo sorumlusunun aklında duruyor. Paletin nereye konacağı sahada karar veriliyor; koridor kapanıyor, istif dengesiz kalıyor, sonradan taşımak gerekiyor. Sezon sonunda depolama bedeli hesaplanırken kalan kilo elle çıkarılıyor ve fiyat değişikliği geçmişi de bozuyor.",
        solution: "Odaların metre cinsinden modellendiği, her paletin ve Palsan biriminin odada kendi ikonuyla durduğu bir 3D yerleşim ekranı. Yerleştirmeden önce kural sunucuda doğrulanır: birim başka bir birimin üstüne binmiyor, koridor bandını kapatmıyor ve istif dengeli. Depolama bedeli daima kalan KG ile o girişin fiyatı üzerinden hesaplanır; sonradan yapılan fiyat değişikliği geçmiş kayıtları yeniden yazmaz.",
        benefit: "Depo doluluğu ve ürünün yeri ekrandan görülür, yerleştirme hatası sahada değil ekranda yakalanır ve depolama bedeli tartışma götürmeyen bir kayda dayanır.",
        comparison: {
          title: "Defter ve Excel ile yürütülen düzenden farkı",
          lead: "Bu ürünün rakibi başka bir yazılım değil; depo defteri, Excel dosyası ve depo sorumlusunun hafızası. Fark tam olarak şurada:",
          before: "Defter ve Excel ile",
          after: "Bu sistemle",
          rows: [
            { k: "Odada ne var", before: "Giriş-çıkış deftere yazılır; hangi paletin nerede durduğu depo sorumlusunun aklındadır.", after: "Oda gerçek ölçüleriyle modellenir; her palet ve Palsan birimi odada kendi yerinde görünür." },
            { k: "Yerleştirme kararı", before: "Sahada verilir. Koridor kapanır, istif dengesiz kalır, sonradan taşımak gerekir.", after: "Yerleştirmeden önce kural sunucuda doğrulanır; ekranda yeşil ya da kırmızı hayalet olarak görünür." },
            { k: "Depolama bedeli", before: "Sezon sonunda kalan kilo elle çıkarılır; hesap tartışmaya açıktır.", after: "Kalan KG × girişte sabitlenen fiyat. Hesap her an ekranda ve kayda dayanır." },
            { k: "Fiyat değişikliği", before: "Yeni fiyat girilince eski hesaplar da kayar.", after: "Fiyat giriş anında kayda sabitlenir; sonraki değişiklik geçmiş kaydı yeniden yazmaz." },
            { k: "Birden çok depo", before: "Her depo ayrı dosya; hangisinin fiyatı hangisi karışır.", after: "Her deponun kendi KG fiyatı ve kendi defteri var; işletme sahibi hepsini tek girişten görür." },
            { k: "Rapor", before: "Muhasebeye giden çıktı elle derlenir.", after: "Stok, doluluk, giriş, çıkış, üretici ve ödeme raporları; CSV, XLSX ve PDF olarak dışarı alınır." },
            { k: "İzlenebilirlik", before: "Kaydı kimin ne zaman değiştirdiği belli değildir.", after: "Hareket geçmişi silinmez; ayrıca kim neyi değiştirdi denetim kaydında durur." }
          ]
        },
        modules: [
          { icon: "◫", title: "3D yerleşim", text: "Odaların metre cinsinden modeli. Sürükle-bırak yerleştirme, 90 derece döndürme, istifleme, oda içinde taşıma ve odalar arası transfer. Her kap odada kendi ikonuyla durur: 20 Palsanlık bir giriş, odada 20 ayrı birim olarak görünür." },
          { icon: "◈", title: "Yerleşim kuralları", text: "Çakışma, koridor bandı ve istif desteği kuralları sunucu tarafında doğrulanır; ekranda yeşil veya kırmızı hayalet olarak gösterilir. Üst birim alttakiyle en az %60 örtüşmezse istif kabul edilmez. Koridor genişliği parametre ekranından değiştirilir, kodda sabit değildir." },
          { icon: "▤", title: "Stok ve hareket", text: "Üretici, meyve, çeşit ve kap bazında ürün girişi; kısmi ve tam çıkış; otomatik stok kodu ve silinmeyen hareket geçmişi. Palet meyve kasalarının istiflenmesiyle oluşur: girişte palet başına kasa adedi kaydedilir, çıkış kasa bazında yapılabilir ve kasaları azalan palet, son kasa çıkana kadar odadaki yerini korur." },
          { icon: "₺", title: "Depolama hesabı", text: "Hesap daima kalan KG × standart KG fiyatı şeklindedir; gün sayısına bağlı değildir. Fiyat, stok girişinde kayda sabitlenir, sonraki fiyat değişiklikleri geçmiş kayıtları yeniden yazmaz. Her deponun kendi KG fiyatı ve kendi defteri vardır." },
          { icon: "◧", title: "Çoklu depo ve işletme", text: "Bir hesap tam olarak bir depoyu temsil eder; işletme sahibi tüm depolarını tek girişten görür. Her depo kendi fiyatı, kendi defteri ve kendi raporlarıyla ayrıdır. Farklı işletmelerin verisi birbirine hiçbir ekranda görünmez." },
          { icon: "⚿", title: "Personel ve yevmiye", text: "Personel kayıtları, yevmiyeci grupları ve grup bazlı ödeme takibi. Pro ve Kurumsal paketlerde açıktır." },
          { icon: "▥", title: "Raporlar", text: "Panel göstergeleri ve stok, doluluk, giriş, çıkış, üretici, ödeme raporları. Hepsi CSV, XLSX ve PDF olarak dışarı alınabilir." },
          { icon: "↻", title: "Sistem ve güvenlik", text: "Rol bazlı yetkilendirme, silinmeyen denetim kaydı (audit log), arayüzden tek tıkla yedek alma ve parametre yönetimi. Şifre, jeton ve kişisel veri günlüğe yazılmaz." }
        ],
        integrations: [
          { name: "CSV / XLSX / PDF", text: "Bütün raporlar üç biçimde dışarı alınabilir; muhasebeye giden çıktı elle hazırlanmaz." },
          { name: "REST API", text: "OpenAPI 3 şeması, Swagger ve ReDoc arayüzleriyle belgeli /api/v1 uç noktaları." },
          { name: "PostgreSQL", text: "Üretimde PostgreSQL. Uygulama içinden yedek alınır, geri yükleme yordamı belgelidir." },
          { name: "Docker", text: "Tek konteynerde API ve arayüz. Dağıtım betiği başarısız sağlık kontrolünde önceki sürüme geri döner." }
        ],
        specs: [
          { k: "Sunucu", v: "Python 3.12, FastAPI, SQLAlchemy 2.0" },
          { k: "Arayüz", v: "React 18, TypeScript, React Three Fiber (Three.js)" },
          { k: "Veritabanı", v: "PostgreSQL 14+ (üretim), SQLite (geliştirme)" },
          { k: "Dağıtım", v: "Docker / Docker Compose, Alembic göçleri" },
          { k: "Tarayıcı", v: "WebGL 2 destekleyen güncel tarayıcı (3D görünüm için)" },
          { k: "Test", v: "248 sunucu + 32 arayüz testi, 86 kontrollü uçtan uca test" },
          { k: "Çok işletmeli", v: "Evet, veri işletme bazında ayrılır" },
          { k: "Arayüz dili", v: "Türkçe" }
        ],
        packages: {
          note: "Paket içerikleri aşağıda; rakamı görüşmede netleştirip yazılı teklif gönderiyoruz.",
          plans: [
            {
              name: "Standart", price: "Yıllık lisans", priceNote: "Fiyat teklifi ile",
              summary: "Tek depoyla çalışan, temel depo operasyonu yeten işletmeler için.",
              features: ["3D yerleşim ve yerleşim kuralları", "Stok giriş, kısmi ve tam çıkış", "Hareket geçmişi ve stok kodu", "Depolama hesabı (kalan KG × KG fiyatı)", "Stok ve doluluk raporları", "Rol bazlı yetkilendirme"],
              missing: ["Personel ve yevmiyeci modülü", "Ödeme takibi"],
              cta: "Fiyat Teklifi Alın", featured: false
            },
            {
              name: "Pro", price: "Yıllık lisans", priceNote: "Fiyat teklifi ile",
              summary: "Personel ve yevmiye takibi de yapan, birden çok deposu olan işletmeler için.",
              features: ["Standart paketin tamamı", "Çoklu depo (her depo kendi fiyatı ve defteri)", "Personel kayıtları", "Yevmiyeci grupları", "Grup bazlı ödeme takibi", "Bütün raporlar (CSV / XLSX / PDF)", "Denetim kaydı", "E-posta ve telefon desteği"],
              missing: [],
              cta: "Fiyat Teklifi Alın", featured: true
            },
            {
              name: "Kurumsal", price: "Görüşmeye bağlı", priceNote: "Fiyat teklifi ile",
              summary: "Kendi sunucunuzda çalıştırma, özel geliştirme veya çok şubeli kullanım gerekiyorsa.",
              features: ["Pro paketin tamamı", "Sonradan eklenen modüllere erişim", "Kendi sunucunuzda kurulum (Docker)", "Özel geliştirme talepleri", "Veri aktarımı desteği", "Öncelikli destek", "Eğitim oturumu"],
              missing: [],
              cta: "Görüşme Talep Edin", featured: false
            }
          ]
        }
      }
    },

    /* --------------------------------------------------------------- */

    services: {
      hero: {
        eyebrow: "Ürünlerin dışında kalan işler",
        title: "İşletmenize özel yazılım, entegrasyon ve süreç otomasyonu.",
        description: "Hazır ürünlerimiz iki sektöre çözüm üretiyor. Bunların dışındaki ihtiyaçlar için, tıpkı bu ürünlerin doğduğu gibi, işin kendisinden başlayarak yazılım geliştiriyoruz.",
        primary: "Projenizi Anlatın",
        secondary: "Ürünlere Bakın"
      },
      items: [
        { icon: "{ }", title: "Özel yazılım", text: "Hazır paketlerin karşılamadığı süreçler için sıfırdan uygulama.", detail: "İşin bugün nasıl yürüdüğünü anlamakla başlar; hangi adımın yazılıma taşınmaya değdiğini birlikte belirleriz.", bullets: ["Süreç analizi ve kapsam çıkarma", "Web tabanlı uygulama", "Rol ve yetki yapısı", "Raporlama", "Kurulum ve devreye alma"] },
        { icon: "⇄", title: "Sistem entegrasyonu", text: "Birbirinden habersiz çalışan programları konuşturmak.", detail: "Muhasebe, e-ticaret, üretim ve saha sistemleri arasında veriyi elle taşımayı bitiren bağlantı katmanı.", bullets: ["API ve webhook bağlantıları", "Veri eşleme kuralları", "Hata ve yeniden deneme yönetimi", "Aktarım günlüğü"] },
        { icon: "⌁", title: "Süreç otomasyonu", text: "Tekrar eden elle işleri sisteme devretmek.", detail: "Aynı veriyi ikinci kez yazdığınız, aynı raporu her ay elle hazırladığınız her yer otomasyon adayıdır.", bullets: ["Excel ve raporlama otomasyonu", "Belge ve veri işleme", "Onay akışları", "Bildirim ve hatırlatma"] },
        { icon: "▥", title: "Raporlama ve panel", text: "Karar için gereken sayıyı aramayı bırakmak.", detail: "Dağınık kaynaklardaki veriyi tek panelde toplayan, role göre farklı gösteren karar destek ekranı.", bullets: ["Veri bağlantıları", "Gösterge tasarımı", "Planlı rapor", "Dışa aktarma"] },
        { icon: "▤", title: "Masaüstü ve saha", text: "Her iş tarayıcıda çözülmez.", detail: "Atölyede, sahada veya internetsiz ortamda çalışması gereken uygulamalar.", bullets: ["Masaüstü uygulama", "Android uygulama", "Çevrimdışı çalışma", "Cihaz ve yazıcı bağlantıları"] },
        { icon: "↻", title: "Bakım ve destek", text: "Devreye alma bitiş değil, başlangıç.", detail: "Yayına aldığımız sistemin çalışmaya devam etmesi, güncellenmesi ve yedeklenmesi.", bullets: ["Hata giderme", "Sürüm güncelleme", "Yedekleme ve geri yükleme", "İzleme"] }
      ],
      detailLabel: "HİZMET DETAYI",
      includes: "Kapsamında neler var?",
      more: "Detayları Gör",
      discuss: "Projenizi Konuşalım",
      process: {
        kicker: "ÇALIŞMA SÜRECİMİZ",
        title: "Belirsizliği azaltan, görünür bir proje süreci.",
        steps: [
          { title: "İhtiyaç analizi", text: "İşin bugün nasıl yürüdüğünü, hangi adımın kime yük olduğunu ve neyin ölçüleceğini konuşuruz." },
          { title: "Kapsam ve teklif", text: "Yapılacak işi yazılı kapsam olarak çıkarır, süre ve bedelle birlikte sunarız. Kapsam dışı kalanlar da yazılır." },
          { title: "Geliştirme", text: "Parça parça teslim ederiz; her parçayı çalışır halde görürsünüz. Ara teslimlerde yön değiştirmek mümkündür." },
          { title: "Devreye alma", text: "Kurulum, veri aktarımı, kullanıcı eğitimi ve canlıya geçiş." },
          { title: "Destek", text: "Hata giderme, güncelleme ve yeni talepler. Devam eden ilişki, tek seferlik teslim değil." }
        ]
      },
      tech: {
        kicker: "TEKNOLOJİ",
        title: "Araç, işe göre seçilir.",
        lead: "Tek bir yığına bağlı kalmıyoruz; ölçek, güvenlik, bakım ve entegrasyon ihtiyacına göre karar veriyoruz.",
        groups: [
          { title: "Sunucu", items: ["Python", "FastAPI", "Django", "Node.js", "REST API"] },
          { title: "Arayüz", items: ["React", "TypeScript", "Vite", "Three.js", "HTML / CSS"] },
          { title: "Veri", items: ["PostgreSQL", "SQLite", "SQLAlchemy", "Alembic"] },
          { title: "İşletim", items: ["Docker", "GitHub Actions", "nginx", "Linux"] },
          { title: "Mobil ve masaüstü", items: ["Android", "Kotlin", "Masaüstü uygulama"] }
        ]
      }
    },

    /* --------------------------------------------------------------- */

    contact: {
      kicker: "İLETİŞİM",
      title: "Ürünü görmek en hızlı yol. Bir demo ayarlayalım.",
      lead: "İşletmenizi ve bugün nasıl çalıştığınızı kısaca yazın. Size uygun ürünü ekran paylaşımıyla gösterelim; uygun değilse bunu da söyleyelim.",
      email: "E-posta",
      phone: "Telefon",
      whatsapp: "WhatsApp'tan yazın",
      address: "Adres",
      hours: "Çalışma saatleri",
      hoursValue: "Hafta içi 09:00 - 18:00",
      responseNote: "Talepler genellikle aynı iş günü içinde yanıtlanır.",
      identityTitle: "Firma bilgileri",
      fields: {
        legalName: "Ticari unvan", brandName: "İşletme adı", mersis: "MERSİS numarası",
        taxNumber: "Vergi kimlik numarası", taxOffice: "Vergi dairesi", address: "Merkez adresi",
        kep: "KEP adresi", email: "E-posta", phone: "Telefon", chamber: "Meslek odası"
      }
    },

    form: {
      title: "Demo ve Fiyat Talebi",
      required: "* Zorunlu alanlar",
      name: "Ad Soyad", company: "Firma", email: "E-posta", phone: "Telefon",
      interest: "İlgilendiğiniz ürün", size: "İşletme büyüklüğü",
      description: "Kısaca anlatın",
      contactMethod: "Tercih ettiğiniz iletişim yolu",
      methodEmail: "E-posta", methodPhone: "Telefon",
      consent: "Aydınlatma metnini okudum; talebimin değerlendirilmesi için iletişim bilgilerimin işlenmesine izin veriyorum.",
      consentLink: "Aydınlatma metni",
      submit: "Talebi Gönderin",
      select: "Seçiniz",
      namePlaceholder: "Adınız ve soyadınız",
      companyPlaceholder: "Firma adı",
      emailPlaceholder: "ornek@firma.com",
      phonePlaceholder: "+90 5xx xxx xx xx",
      descriptionPlaceholder: "Kaç kullanıcı olacak, bugün hangi programı kullanıyorsunuz, en çok hangi adım vakit alıyor...",
      interests: ["HVAC Pro Suite (havalandırma)", "Soğuk Hava Deposu Yönetim Sistemi", "İkisini de görmek istiyorum", "Özel yazılım / otomasyon", "Henüz emin değilim"],
      sizes: ["1 - 5 kullanıcı", "6 - 20 kullanıcı", "21 - 50 kullanıcı", "50+ kullanıcı", "Bilmiyorum"],
      requiredError: "Bu alan zorunludur.",
      invalidEmail: "Geçerli bir e-posta adresi girin.",
      shortDescription: "Lütfen en az 20 karakterlik bir açıklama girin.",
      sending: "Gönderiliyor...",
      sent: "Talebiniz alındı. En kısa sürede dönüş yapacağız.",
      failed: "Gönderim başarısız oldu. Lütfen doğrudan e-posta ile yazın:",
      preparing: "E-posta hazırlanıyor...",
      mailFallback: "E-posta uygulamanız açıldı. Açılmadıysa doğrudan yazabilirsiniz:",
      mailSubject: "Demo / fiyat talebi - Proje Bahçesi",
      note: "Bilgileriniz yalnızca talebinizi yanıtlamak için kullanılır, üçüncü taraflarla paylaşılmaz.",
      mailLabels: { name: "Ad Soyad", company: "Firma", email: "E-posta", phone: "Telefon", interest: "İlgilendiği ürün", size: "İşletme büyüklüğü", description: "Açıklama", contactMethod: "İletişim tercihi" }
    },

    footer: {
      description: "Havalandırma imalatçıları ve meyve soğuk hava depoları için sektörel yazılım. Özel yazılım ve otomasyon geliştirme.",
      products: "Ürünler", company: "Kurumsal", legal: "Yasal", contact: "İletişim",
      rights: "Tüm hakları saklıdır.",
      privacy: "Gizlilik ve KVKK", cookies: "Çerez Politikası", terms: "Kullanım Koşulları",
      identityNote: "Ticari unvan, adres ve vergi bilgileri yayın öncesinde eklenecektir."
    },

    cookie: {
      title: "Çerez ve gizlilik",
      text: "Bu site yalnızca dil tercihinizi ve bu bildirimi kapattığınızı tarayıcınızda saklar. Takip veya reklam çerezi kullanılmaz.",
      details: "Detaylar", accept: "Anladım"
    },

    legal: {
      privacy: {
        title: "Gizlilik ve KVKK Aydınlatma Metni",
        updated: "Son güncelleme",
        body: [
          { h: "Veri sorumlusu", p: ["Bu internet sitesi üzerinden ilettiğiniz kişisel veriler bakımından veri sorumlusu, sitenin altbilgisinde ticari unvanı ve iletişim bilgileri yer alan işletmedir."] },
          { h: "İşlenen veriler ve amaç", p: ["Sitede yalnızca demo ve fiyat talep formu üzerinden veri toplanır. Bu formda ad soyad, firma adı, e-posta adresi, telefon numarası, ilgilendiğiniz ürün, işletme büyüklüğü ve serbest metin açıklamanız yer alır.", "Bu veriler yalnızca talebinizin değerlendirilmesi, size dönüş yapılması ve teklif hazırlanması amacıyla işlenir. Pazarlama amacıyla ayrıca izin alınmadan kullanılmaz."] },
          { h: "Hukuki sebep", p: ["Veriler, sizin açık rızanız ve talebiniz üzerine sözleşme öncesi görüşmelerin yürütülmesi hukuki sebeplerine dayanılarak işlenir."] },
          { h: "Aktarım", p: ["Form verileriniz, formu ileten hizmet sağlayıcı dışında üçüncü kişilerle paylaşılmaz; yurt dışına aktarım yapılan hallerde bu husus bu metinde açıkça belirtilir."] },
          { h: "Saklama süresi", p: ["Talebiniz sonuçlanana kadar ve sonrasında yasal saklama yükümlülükleri süresince saklanır; süre sonunda silinir."] },
          { h: "Haklarınız", p: ["6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 11. maddesi uyarınca; verilerinize erişme, düzeltilmesini, silinmesini veya anonim hâle getirilmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz. Taleplerinizi altbilgideki iletişim adresine iletebilirsiniz."] },
          { h: "Tarayıcı depolaması", p: ["Site, dil tercihinizi ve çerez bildirimini kapattığınızı tarayıcınızın yerel depolama alanında saklar. Bu veriler sunucuya gönderilmez. Takip, analiz veya reklam çerezi kullanılmaz."] }
        ],
        disclaimer: "Bu metin taslaktır ve hukuk uzmanı incelemesinden geçmemiştir. Yayın öncesinde işletmenin gerçek veri işleme süreçlerine göre bir avukat tarafından gözden geçirilmelidir."
      },
      cookies: {
        title: "Çerez Politikası",
        updated: "Son güncelleme",
        body: [
          { h: "Kullanılan teknolojiler", p: ["Bu sitede takip veya reklam çerezi kullanılmaz. Yalnızca tarayıcınızın yerel depolama (localStorage) alanı kullanılır."] },
          { h: "Saklanan bilgiler", p: ["Dil tercihiniz (Türkçe / İngilizce) ve çerez bildirimini kapattığınız bilgisi saklanır. Bu iki bilgi de yalnızca sizin cihazınızda kalır, sunucuya gönderilmez ve kimliğinizi belirlemek için kullanılmaz."] },
          { h: "Nasıl kaldırılır", p: ["Tarayıcınızın ayarlarından bu site için site verilerini temizleyerek bu tercihleri istediğiniz zaman kaldırabilirsiniz."] },
          { h: "Üçüncü taraf", p: ["Site üzerinde üçüncü taraf analiz veya reklam kodu çalıştırılmaz. Demo talep formu bir form hizmet sağlayıcısına gönderilir; bu sağlayıcının kendi gizlilik koşulları geçerlidir."] }
        ],
        disclaimer: "Bu metin taslaktır ve hukuk uzmanı incelemesinden geçmemiştir."
      },
      terms: {
        title: "Kullanım Koşulları",
        updated: "Son güncelleme",
        body: [
          { h: "Sitenin amacı", p: ["Bu site, sunulan yazılım ürünlerini ve hizmetleri tanıtmak amacıyla yayımlanmaktadır. Site üzerinden doğrudan satış veya çevrimiçi ödeme alınmamaktadır."] },
          { h: "Bağlayıcılık", p: ["Sitede yer alan paket içerikleri, özellik listeleri ve süreler bilgilendirme amaçlıdır ve tek başına bağlayıcı bir teklif oluşturmaz. Bedel, kapsam ve süre; yazılı teklif ve taraflarca imzalanan sözleşme ile bağlayıcılık kazanır."] },
          { h: "Ürün bilgileri", p: ["Sitede tanıtılan ürünlerin özellikleri, geliştirme sürecinde değişebilir. Yayımlanan ekran görüntüleri ve görseller temsilidir."] },
          { h: "Fikri mülkiyet", p: ["Site içeriği, metinleri ve görselleri üzerindeki haklar saklıdır. Kaynak kodu açık olarak yayımlanan bileşenler, ilgili depoda belirtilen lisans koşullarına tabidir."] },
          { h: "Sorumluluk", p: ["Sitedeki bilgilerin güncel ve doğru olması için özen gösterilir; ancak site içeriğine dayanılarak alınan kararlardan doğan sonuçlardan sorumluluk kabul edilmez."] }
        ],
        disclaimer: "Bu metin taslaktır ve hukuk uzmanı incelemesinden geçmemiştir."
      }
    },

    notFound: {
      code: "404",
      title: "Aradığınız sayfa bulunamadı.",
      text: "Adres değişmiş veya sayfa kaldırılmış olabilir. Aşağıdan devam edebilirsiniz.",
      home: "Ana sayfaya dön"
    }
  },

  /* =================================================================== */

  en: {
    brand: { name: "Proje", accent: "Bahçesi", tagline: "Vertical software" },

    a11y: {
      skip: "Skip to content", openMenu: "Open menu", navigation: "Main navigation",
      language: "Language selection", backToTop: "Back to top", close: "Close",
      next: "Go to next section", products: "Products menu"
    },

    nav: {
      products: "Products", hvac: "HVAC Software", cold: "Cold Storage",
      packages: "Plans", services: "Custom Software", about: "About",
      contact: "Contact", demo: "Request a Demo", home: "Home"
    },

    pages: {
      home: {
        title: "Proje Bahçesi | Software for HVAC Manufacturers and Cold Storage",
        description: "Quoting and cost software for ventilation manufacturers, and a 3D warehouse management system for fruit cold storage. Multi-tenant, cloud-based vertical software.",
        og: "Ready-to-use vertical software: HVAC Pro Suite and the Cold Storage Management System."
      },
      hvac: {
        title: "HVAC Pro Suite | Ventilation Quoting and Cost Software",
        description: "Sheet-metal development and cost calculation for 25 part types, a self-service customer order page, branded PDF quotes and Paraşüt integration. A multi-tenant platform for ventilation manufacturers.",
        og: "From sheet-metal development to the quote, on one platform. HVAC Pro Suite for ventilation manufacturers."
      },
      cold: {
        title: "Cold Storage Management System | 3D Warehouse Layout and Stock",
        description: "A 3D digital twin of your cold store: drag-and-drop pallet placement, collision and stacking rules, storage billing on remaining kilograms, multi-warehouse support and reports.",
        og: "A 3D digital twin of your cold store. Layout, stock and storage billing for fruit cold storage."
      },
      services: {
        title: "Custom Software and Automation | Proje Bahçesi",
        description: "For needs our products do not cover, we build custom software, system integrations and process automation.",
        og: "Custom software, integration and process automation for your business."
      },
      privacy: {
        title: "Privacy Notice (KVKK) | Proje Bahçesi",
        description: "Privacy notice and KVKK disclosure for personal data collected through the Proje Bahçesi website.",
        og: "Privacy notice and KVKK disclosure."
      },
      cookies: {
        title: "Cookie Policy | Proje Bahçesi",
        description: "Policy on browser storage and cookie use on the Proje Bahçesi website.",
        og: "Cookie and browser storage policy."
      },
      terms: {
        title: "Terms of Use | Proje Bahçesi",
        description: "Terms of use for the Proje Bahçesi website, including binding effect and limits of liability.",
        og: "Terms of use and limits of liability."
      }
    },

    home: {
      hero: {
        eyebrow: "Software written for one industry, working from day one",
        title: "Ready-made software for ventilation manufacturers and cold storage operators.",
        description: "Instead of bending a general-purpose ERP into the shape of your business, two products written for your business in the first place. Both run in the cloud, keep every company's data separate and need no installation.",
        primary: "Explore the Products",
        secondary: "Request a Demo",
        note: "No installation · Every company works on its own data · Browser access"
      },
      stats: {
        title: "In numbers",
        items: [
          { value: "2", label: "Products in production", note: "Ventilation and cold storage" },
          { value: "25", label: "Ventilation part types", note: "Sheet development and cost calculated" },
          { value: "3D", label: "Warehouse digital twin", note: "Rooms modelled at real dimensions" },
          { value: "390+", label: "Automated tests", note: "Across both products, run before every release" }
        ]
      },
      products: {
        kicker: "OUR PRODUCTS",
        title: "Two industries, two products. Both born on a real shop floor.",
        lead: "Each product grew out of one business's concrete problem — not from a generic template with an industry label stuck on it.",
        cta: "View the Product",
        badgeLive: "In production"
      },
      why: {
        kicker: "WHY THESE PRODUCTS",
        title: "The upside of buying from a small team: you talk to the person who wrote it.",
        lead: "You do not land in a large vendor's call centre. You speak to the person who writes the code, and an accepted change goes into the queue.",
        items: [
          { icon: "◧", title: "Your data is yours", text: "Every company's data is separated at the database level. Another company's prices, customers or quotes never appear on any screen, and that separation is continuously verified by automated tests." },
          { icon: "⌁", title: "Industry-specific maths", text: "Sheet-metal development, waste allowance, stacking rules, storage billed on remaining kilograms. These are your trade's real rules, and general software does not have them." },
          { icon: "◇", title: "Tested code", text: "In both products the calculation and authorisation logic is protected by automated tests. That a fix has not broken something else is verified by tests, not by hand." },
          { icon: "▤", title: "Your prices, your letterhead", text: "Material prices, labour rates, profit margin and VAT rate are yours. The quote PDF carries your logo, your tax identity and your IBAN." },
          { icon: "⇄", title: "Connects to what you already run", text: "On the ventilation side a quote goes to Paraşüt as a sales offer in one click; on the cold storage side every report exports to CSV, XLSX and PDF." },
          { icon: "↻", title: "Backup and rollback documented", text: "Backup, restore and version rollback procedures are written down. An untested backup is not a backup." }
        ]
      },
      services: {
        kicker: "BEYOND THE PRODUCTS",
        title: "If neither product is what you need.",
        lead: "We also build custom software, system integrations and process automation for businesses. That is exactly how these products came about.",
        cta: "See Custom Software",
        items: ["Process automation", "System integration", "Web and mobile apps", "Reporting and dashboards", "Desktop applications", "Maintenance and support"]
      },
      process: {
        kicker: "HOW WE START",
        title: "Four steps from a demo request to production use.",
        steps: [
          { title: "Demo request", text: "Fill in the form or write to us directly. Tell us the size of your business and how you work today." },
          { title: "Live walkthrough", text: "We show the product over a screen share, on data resembling yours. This is where the questions get asked." },
          { title: "Trial account", text: "An account is opened for your business. You enter your own materials, prices and rooms and run one real job end to end." },
          { title: "Go live", text: "If you decide to proceed, the account moves to the full version, your existing data is migrated and your users are set up." }
        ]
      },
      faq: {
        kicker: "FREQUENTLY ASKED QUESTIONS",
        title: "What buyers ask before they decide.",
        lead: "If your question is not here, write to us directly — technical questions are answered by the same person.",
        link: "Send your question",
        items: [
          { q: "Do I need to install anything?", a: "No. Both products run in the cloud; you open an address in your browser and use it. If you would rather run it on your own server, Docker images and setup documentation exist, and in that case we agree the installation and maintenance terms separately." },
          { q: "Could my data get mixed up with another company's?", a: "No. Every company's data is separated by its own identifier in the database, and queries enforce that separation. The isolation is verified by automated tests in every release, including an explicit test that one company's account cannot reach another company's records." },
          { q: "Can I migrate my existing data?", a: "Tabular data such as material lists, price lists, producer and product definitions can be migrated. Show us the file you have and we will scope the migration and its timing together." },
          { q: "Is there a trial?", a: "Yes. On the ventilation side a trial account runs for 7 days with up to 2 users; on the cold storage side the demo account works with 2 rooms per warehouse. You can work with your real data during the trial." },
          { q: "Why are prices not listed on the site?", a: "Plans vary with the size of the business, the number of users and whether data migration is needed. Plan contents are written out in full on the product pages; we give the figure in the call and follow up with a written quote." },
          { q: "Can we run the software on our own server?", a: "Yes, on the Enterprise plan. Both products are packaged with Docker and run on PostgreSQL. Who is responsible for the server, backups and updates is set out in the contract." },
          { q: "How is support provided?", a: "By email and phone. The person you reach is the person who writes the software; there is no layer in between. Bug reports are queued, and accepted feature requests go into the release plan." },
          { q: "How does billing work?", a: "Subscription renewal and invoicing are currently handled offline: written quote, contract and invoice. Online payment is not yet collected through this site." }
        ]
      }
    },

    /* --------------------------------------------------------------- */

    products: {
      labels: {
        problem: "How it works today",
        solution: "What the product does",
        modules: "Modules",
        tech: "Technology",
        benefit: "What changes",
        specs: "Technical summary",
        packages: "Plans",
        screens: "Screens",
        integrations: "Connections",
        repo: "Source code on GitHub",
        demoCta: "Request a demo of this product",
        backHome: "All products",
        live: "In production",
        included: "Included",
        excluded: "Not included"
      },

      hvac: {
        code: "HVAC",
        name: "HVAC Pro Suite",
        subtitle: "Ventilation quoting, costing and order management",
        tagline: "From sheet-metal development to the quote, on one platform.",
        hero: "A multi-tenant platform for ventilation manufacturers that calculates sheet development and cost for 25 part types, lets the customer enter the dimensions themselves, and produces a branded PDF quote that can be pushed to Paraşüt.",
        highlights: ["25 part types", "Login-free customer order page", "Branded PDF quotes", "Paraşüt export", "Android client"],
        problem: "Quotes are rebuilt in Excel every time. Sheet development, waste allowance, labour and margin change with whoever prepares the quote, so the same job can end up with two different prices. The customer describes the dimensions over the phone; when they are written down wrong, the manufacturing error comes back as cost. The quote PDF is formatted by hand, and the invoice is issued in a completely different program.",
        solution: "A calculation engine that goes from a part's geometry to its sheet development, cut area, waste and weight, then through flange, gasket, bolts, insulation, paint and labour to the total cost. The customer enters their own dimensions on a company-specific address, the request lands in the dashboard, and the quote lines are adjusted and issued as a PDF on your letterhead.",
        benefit: "Quote preparation gets faster, price inconsistency between quotes disappears, and responsibility for a wrong dimension becomes clear — the customer entered it themselves, and it is on record.",
        comparison: {
          title: "How it differs from running on Excel",
          lead: "This product's competitor is not other software — it is the spreadsheets on the workshop desk. Here is exactly where they differ:",
          before: "On Excel, by hand",
          after: "With HVAC Pro Suite",
          rows: [
            { k: "Sheet development", before: "A separate formula per part; it breaks as the file is copied, and nobody knows who added which allowance.", after: "25 part types inside the product; seam, elbow gore and damper allowances are named constants, tested in every release." },
            { k: "Price consistency", before: "Whoever prepares the quote uses their own sheet, so the same job gets two different prices.", after: "One material and labour list; the price comes out the same whoever prepares the quote." },
            { k: "Taking dimensions", before: "The customer describes them on the phone, someone writes them down, and the error surfaces in production.", after: "The customer enters the dimensions themselves, guided by the part's photograph and markers, and it stays on record." },
            { k: "Quote output", before: "A document formatted by hand every time.", after: "A branded PDF: logo, tax identity, IBAN, VAT rate and validity date come through automatically." },
            { k: "Getting to the invoice", before: "The quote lives in one place and the invoice in a different program; lines get retyped.", after: "An approved quote goes to Paraşüt as a sales offer in one click, with lines in m² and metres." },
            { k: "Finding past work", before: "Version tracking by filename; finding last year's quote is a job in itself.", after: "Every quote is stored, searchable by customer name and phone, and paginated." },
            { k: "Permissions", before: "Anyone who opens the file can change the cost and the margin.", after: "Material cost and profit rate stay with managers; staff run the daily work." }
          ]
        },
        modules: [
          { icon: "⌁", title: "Calculation engine", text: "25 rectangular and round part types. For each part: sheet development (net area), cut area and waste, weight; then flange, gasket, bolts, insulation, paint and labour. Fabrication allowances such as seam width, elbow gore allowance and damper blade edge allowance are named constants inside the product, so they never quietly disappear from a quote." },
          { icon: "▣", title: "Dimension markers", text: "On each part's photograph, lines show which dimension belongs where. The customer does not have to ask which one is dimension A, and the wrong figure does not land in the wrong field." },
          { icon: "◧", title: "Customer order page", text: "An order screen that works without a login, on a company-specific address (/s/company-name). The customer picks a part, enters the dimensions, adds it to the basket and requests a quote. Pricing uses that company's own material prices and labour rates." },
          { icon: "▤", title: "Quote management", text: "Incoming requests are listed in the dashboard; lines are added, removed and edited. Profit rate and shipping are set per quote. The quote is issued as a PDF with your logo, tax identity, IBAN and validity date." },
          { icon: "◇", title: "Materials and labour", text: "Sheet thicknesses, material cost and availability, and labour rates are managed from the dashboard. A new company starts with a default material template and starting labour rates; you enter your own prices." },
          { icon: "⚿", title: "Users and roles", text: "Owner, admin and staff roles. Staff run the daily work — quote lines, shipping, PDF, listings — while material cost, profit rate and company settings stay with managers." },
          { icon: "⇄", title: "Paraşüt integration", text: "An approved quote is pushed to Paraşüt as a sales offer in one click, with lines carrying their real sales unit such as m² or metres. Each company enters its own Paraşüt credentials; a company that does not is never shown the option." },
          { icon: "▥", title: "Android client", text: "A mobile API and Android app for taking dimensions and calculating on site. The device connects with an activation code." }
        ],
        integrations: [
          { name: "Paraşüt", text: "Quote to sales-offer export. Each company connects its own account." },
          { name: "PDF quote", text: "Quote output on your letterhead, with logo, tax identity and IBAN." },
          { name: "Android", text: "Mobile client for field use, over the /api/v1 mobile interface." },
          { name: "PostgreSQL", text: "PostgreSQL in production, SQLite in development. A backup script ships with the product." }
        ],
        specs: [
          { k: "Server", v: "Python 3, FastAPI" },
          { k: "Database", v: "PostgreSQL (production), SQLite (development)" },
          { k: "Deployment", v: "Docker / Docker Compose" },
          { k: "Quote output", v: "PDF (reportlab)" },
          { k: "Mobile", v: "Android client + REST mobile API" },
          { k: "Access", v: "Browser; no separate installation" },
          { k: "Multi-tenant", v: "Yes, data separated per company" },
          { k: "Interface language", v: "Turkish" }
        ],
        packages: {
          note: "Plan contents are below; we confirm the figure in the call and send a written quote.",
          plans: [
            {
              name: "Trial", price: "7 days", priceNote: "Free",
              summary: "To try the product with your own materials and prices.",
              features: ["7-day account", "Up to 2 users", "The full calculation engine", "Customer order page", "PDF quotes"],
              missing: ["Paraşüt integration", "Unlimited users"],
              cta: "Request a Trial", featured: false
            },
            {
              name: "Pro", price: "Annual licence", priceNote: "Quoted",
              summary: "One company, full scope. The right plan for most ventilation manufacturers.",
              features: ["Unlimited users and roles", "Full calculation engine and all part types", "Login-free customer order page", "Branded PDF quotes (logo, tax identity, IBAN)", "Paraşüt integration", "Android client", "Material, labour and profit rate management", "Email and phone support"],
              missing: [],
              cta: "Get a Quote", featured: true
            },
            {
              name: "Enterprise", price: "By agreement", priceNote: "Quoted",
              summary: "For running it on your own server, custom development, or multi-branch use.",
              features: ["Everything in Pro", "Installation on your own server (Docker)", "Custom development requests", "Data migration support", "Priority support", "Training session"],
              missing: [],
              cta: "Request a Call", featured: false
            }
          ]
        }
      },

      cold: {
        code: "SHD",
        name: "Cold Storage Management System",
        subtitle: "3D warehouse layout, stock and storage billing",
        tagline: "A 3D digital twin of your cold store.",
        hero: "A warehouse management system for fruit cold storage that models rooms at their real dimensions, places pallets by drag and drop, and validates collision, stacking and aisle rules on the server.",
        highlights: ["3D room model", "Drag-and-drop layout", "Billing on remaining kg", "Multiple warehouses", "CSV / XLSX / PDF reports"],
        problem: "What is in which room, whose pallet is whose, and how full a room is — the answers live in a ledger, a spreadsheet and the warehouse manager's head. Where a pallet goes is decided on the floor; an aisle gets blocked, a stack ends up unbalanced, and things have to be moved again later. At the end of the season the storage charge is worked out by hand from the remaining kilograms, and a price change corrupts the history.",
        solution: "A 3D layout screen where rooms are modelled in metres and every pallet and Palsan unit stands in the room as its own icon. Before a unit is placed, the rules are validated on the server: it does not overlap another unit, does not block the aisle band, and the stack is balanced. Storage is always billed as remaining kilograms at the price recorded on entry; a later price change never rewrites past records.",
        benefit: "Occupancy and the location of goods are visible on screen, a placement mistake is caught on the screen rather than on the floor, and the storage charge rests on a record nobody has to argue about.",
        comparison: {
          title: "How it differs from a ledger and a spreadsheet",
          lead: "This product's competitor is not other software — it is the warehouse ledger, a spreadsheet, and the manager's memory. Here is exactly where they differ:",
          before: "Ledger and spreadsheet",
          after: "With this system",
          rows: [
            { k: "What is in the room", before: "Intake and release go into a ledger; where each pallet stands lives in the manager's head.", after: "The room is modelled at real dimensions; every pallet and Palsan unit stands in its own place." },
            { k: "Placement decisions", before: "Made on the floor. An aisle gets blocked, a stack ends up unbalanced, things get moved again.", after: "Rules are validated on the server before placement and shown on screen as a green or red ghost." },
            { k: "Storage charge", before: "Remaining kilograms are worked out by hand at the end of the season, and the figure is open to argument.", after: "Remaining kg × the price fixed at intake. The figure is on screen at any moment and rests on a record." },
            { k: "Price changes", before: "Entering a new price shifts the old calculations too.", after: "The price is fixed to the record on intake; a later change never rewrites past records." },
            { k: "Multiple warehouses", before: "A separate file per warehouse, and it gets unclear whose price is whose.", after: "Each warehouse has its own kg price and ledger; the owner sees all of them from one login." },
            { k: "Reports", before: "Anything going to accounting is compiled by hand.", after: "Stock, occupancy, intake, release, producer and payment reports export to CSV, XLSX and PDF." },
            { k: "Traceability", before: "Who changed a record, and when, is not recorded.", after: "The movement history is never deleted, and who changed what is kept in the audit log." }
          ]
        },
        modules: [
          { icon: "◫", title: "3D layout", text: "Rooms modelled in metres. Drag-and-drop placement, 90-degree rotation, stacking, moving within a room and transfer between rooms. Every container stands in the room as its own icon: an intake of 20 Palsan units appears as 20 separate units." },
          { icon: "◈", title: "Placement rules", text: "Collision, aisle band and stack support rules are validated server-side and shown on screen as a green or red ghost. A stack is rejected if the upper unit overlaps the one below by less than 60%. Aisle width is a parameter you set on screen, not a constant in the code." },
          { icon: "▤", title: "Stock and movements", text: "Intake by producer, fruit, variety and container; partial and full release; automatic stock codes and a movement history that is never deleted. A pallet is a stack of fruit crates: the crate count per pallet is recorded on intake, release can be by crate, and a pallet losing crates keeps its place in the room until the last crate leaves." },
          { icon: "₺", title: "Storage billing", text: "The charge is always remaining kg × the standard kg price; it does not depend on the number of days. The price is fixed to the record on intake, and later price changes never rewrite past records. Every warehouse has its own kg price and its own ledger." },
          { icon: "◧", title: "Multiple warehouses and businesses", text: "One account represents exactly one warehouse; the business owner sees all of theirs from a single login. Each warehouse is separate, with its own price, ledger and reports. Different businesses never see each other's data on any screen." },
          { icon: "⚿", title: "Personnel and day labour", text: "Personnel records, day-labourer groups and payment tracking per group. Available on the Pro and Enterprise plans." },
          { icon: "▥", title: "Reports", text: "Dashboard indicators plus stock, occupancy, intake, release, producer and payment reports. All of them export to CSV, XLSX and PDF." },
          { icon: "↻", title: "System and security", text: "Role-based authorisation, an audit log that is never deleted, one-click backup from the interface and parameter management. Passwords, tokens and personal data are never written to the log." }
        ],
        integrations: [
          { name: "CSV / XLSX / PDF", text: "Every report exports in three formats; nothing going to accounting is prepared by hand." },
          { name: "REST API", text: "Documented /api/v1 endpoints with an OpenAPI 3 schema and Swagger and ReDoc interfaces." },
          { name: "PostgreSQL", text: "PostgreSQL in production. Backups are taken from inside the application and the restore procedure is documented." },
          { name: "Docker", text: "API and interface in a single container. The deploy script rolls back to the previous image if the health check fails." }
        ],
        specs: [
          { k: "Server", v: "Python 3.12, FastAPI, SQLAlchemy 2.0" },
          { k: "Interface", v: "React 18, TypeScript, React Three Fiber (Three.js)" },
          { k: "Database", v: "PostgreSQL 14+ (production), SQLite (development)" },
          { k: "Deployment", v: "Docker / Docker Compose, Alembic migrations" },
          { k: "Browser", v: "A current browser with WebGL 2 (for the 3D view)" },
          { k: "Tests", v: "248 server + 32 interface tests, 86-check end-to-end test" },
          { k: "Multi-tenant", v: "Yes, data separated per business" },
          { k: "Interface language", v: "Turkish" }
        ],
        packages: {
          note: "Plan contents are below; we confirm the figure in the call and send a written quote.",
          plans: [
            {
              name: "Standard", price: "Annual licence", priceNote: "Quoted",
              summary: "For a single warehouse where basic depot operations are enough.",
              features: ["3D layout and placement rules", "Intake, partial and full release", "Movement history and stock codes", "Storage billing (remaining kg × kg price)", "Stock and occupancy reports", "Role-based authorisation"],
              missing: ["Personnel and day-labour module", "Payment tracking"],
              cta: "Get a Quote", featured: false
            },
            {
              name: "Pro", price: "Annual licence", priceNote: "Quoted",
              summary: "For businesses tracking personnel and day labour, with more than one warehouse.",
              features: ["Everything in Standard", "Multiple warehouses (each with its own price and ledger)", "Personnel records", "Day-labourer groups", "Payment tracking per group", "All reports (CSV / XLSX / PDF)", "Audit log", "Email and phone support"],
              missing: [],
              cta: "Get a Quote", featured: true
            },
            {
              name: "Enterprise", price: "By agreement", priceNote: "Quoted",
              summary: "For running it on your own server, custom development, or multi-branch use.",
              features: ["Everything in Pro", "Access to modules added later", "Installation on your own server (Docker)", "Custom development requests", "Data migration support", "Priority support", "Training session"],
              missing: [],
              cta: "Request a Call", featured: false
            }
          ]
        }
      }
    },

    /* --------------------------------------------------------------- */

    services: {
      hero: {
        eyebrow: "The work outside the products",
        title: "Custom software, integration and process automation.",
        description: "Our ready-made products solve two industries. For anything else, we build software the same way those products came about: starting from the work itself.",
        primary: "Tell Us About Your Project",
        secondary: "See the Products"
      },
      items: [
        { icon: "{ }", title: "Custom software", text: "An application from scratch for processes off-the-shelf packages do not cover.", detail: "It starts with understanding how the work runs today; together we decide which step is worth moving into software.", bullets: ["Process analysis and scoping", "Web-based application", "Roles and permissions", "Reporting", "Setup and go-live"] },
        { icon: "⇄", title: "System integration", text: "Making programs that ignore each other talk.", detail: "A connective layer that ends manual re-entry between accounting, e-commerce, production and field systems.", bullets: ["API and webhook connections", "Data mapping rules", "Error and retry handling", "Transfer log"] },
        { icon: "⌁", title: "Process automation", text: "Handing repetitive manual work to the system.", detail: "Anywhere you type the same data twice, or build the same report by hand every month, is a candidate.", bullets: ["Spreadsheet and reporting automation", "Document and data processing", "Approval flows", "Notifications and reminders"] },
        { icon: "▥", title: "Reporting and dashboards", text: "No longer hunting for the number a decision needs.", detail: "A decision screen that pulls scattered sources into one place and shows each role what it needs.", bullets: ["Data connections", "Indicator design", "Scheduled reports", "Export"] },
        { icon: "▤", title: "Desktop and field", text: "Not every job is solved in a browser.", detail: "Applications that have to work in the workshop, in the field, or without a connection.", bullets: ["Desktop application", "Android application", "Offline operation", "Device and printer connections"] },
        { icon: "↻", title: "Maintenance and support", text: "Go-live is the start, not the end.", detail: "Keeping the system we launched running, updated and backed up.", bullets: ["Bug fixing", "Version updates", "Backup and restore", "Monitoring"] }
      ],
      detailLabel: "SERVICE DETAIL",
      includes: "What it can include",
      more: "View Details",
      discuss: "Let's Discuss Your Project",
      process: {
        kicker: "OUR PROCESS",
        title: "A visible project process that reduces uncertainty.",
        steps: [
          { title: "Requirement analysis", text: "We talk through how the work runs today, which step burdens whom, and what will be measured." },
          { title: "Scope and quote", text: "We write the work up as a defined scope and present it with a timeline and a price. What is out of scope is written down too." },
          { title: "Development", text: "We deliver in pieces and you see each piece working. Changing direction at an interim delivery is possible." },
          { title: "Go-live", text: "Installation, data migration, user training and the switch to production." },
          { title: "Support", text: "Bug fixing, updates and new requests. An ongoing relationship, not a one-off delivery." }
        ]
      },
      tech: {
        kicker: "TECHNOLOGY",
        title: "The tool is chosen for the job.",
        lead: "We are not tied to one stack; we decide on scale, security, maintenance and integration needs.",
        groups: [
          { title: "Server", items: ["Python", "FastAPI", "Django", "Node.js", "REST API"] },
          { title: "Interface", items: ["React", "TypeScript", "Vite", "Three.js", "HTML / CSS"] },
          { title: "Data", items: ["PostgreSQL", "SQLite", "SQLAlchemy", "Alembic"] },
          { title: "Operations", items: ["Docker", "GitHub Actions", "nginx", "Linux"] },
          { title: "Mobile and desktop", items: ["Android", "Kotlin", "Desktop apps"] }
        ]
      }
    },

    /* --------------------------------------------------------------- */

    contact: {
      kicker: "CONTACT",
      title: "Seeing the product is the fastest route. Let's set up a demo.",
      lead: "Briefly describe your business and how you work today. We will show you the product that fits over a screen share — and tell you if neither one does.",
      email: "Email",
      phone: "Phone",
      whatsapp: "Message on WhatsApp",
      address: "Address",
      hours: "Working hours",
      hoursValue: "Weekdays 09:00 - 18:00",
      responseNote: "Requests are usually answered the same working day.",
      identityTitle: "Company details",
      fields: {
        legalName: "Trade name", brandName: "Business name", mersis: "MERSİS number",
        taxNumber: "Tax identification number", taxOffice: "Tax office", address: "Head office address",
        kep: "Registered electronic mail (KEP)", email: "Email", phone: "Phone", chamber: "Professional chamber"
      }
    },

    form: {
      title: "Demo and Pricing Request",
      required: "* Required fields",
      name: "Full name", company: "Company", email: "Email", phone: "Phone",
      interest: "Product of interest", size: "Business size",
      description: "Tell us briefly",
      contactMethod: "Preferred contact method",
      methodEmail: "Email", methodPhone: "Phone",
      consent: "I have read the privacy notice and consent to my contact details being processed so my request can be evaluated.",
      consentLink: "Privacy notice",
      submit: "Send Request",
      select: "Select",
      namePlaceholder: "Your full name",
      companyPlaceholder: "Company name",
      emailPlaceholder: "name@company.com",
      phonePlaceholder: "+90 5xx xxx xx xx",
      descriptionPlaceholder: "How many users, what you use today, which step takes the most time...",
      interests: ["HVAC Pro Suite (ventilation)", "Cold Storage Management System", "I would like to see both", "Custom software / automation", "Not sure yet"],
      sizes: ["1 - 5 users", "6 - 20 users", "21 - 50 users", "50+ users", "I don't know"],
      requiredError: "This field is required.",
      invalidEmail: "Enter a valid email address.",
      shortDescription: "Please enter a description of at least 20 characters.",
      sending: "Sending...",
      sent: "Your request has been received. We will get back to you shortly.",
      failed: "Sending failed. Please write to us directly:",
      preparing: "Preparing your email...",
      mailFallback: "Your email application has opened. If it did not, write to us directly:",
      mailSubject: "Demo / pricing request - Proje Bahçesi",
      note: "Your details are used only to answer your request and are not shared with third parties.",
      mailLabels: { name: "Full name", company: "Company", email: "Email", phone: "Phone", interest: "Product of interest", size: "Business size", description: "Description", contactMethod: "Contact preference" }
    },

    footer: {
      description: "Vertical software for ventilation manufacturers and fruit cold storage operators. Custom software and automation development.",
      products: "Products", company: "Company", legal: "Legal", contact: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy and KVKK", cookies: "Cookie Policy", terms: "Terms of Use",
      identityNote: "Trade name, address and tax details will be added before launch."
    },

    cookie: {
      title: "Cookies and privacy",
      text: "This site stores only your language preference and the fact that you dismissed this notice, in your browser. No tracking or advertising cookies are used.",
      details: "Details", accept: "Understood"
    },

    legal: {
      privacy: {
        title: "Privacy Notice (KVKK)",
        updated: "Last updated",
        body: [
          { h: "Data controller", p: ["For personal data you submit through this website, the data controller is the business whose trade name and contact details appear in the site footer."] },
          { h: "Data processed and purpose", p: ["Data is collected only through the demo and pricing request form. The form covers your name, company name, email address, phone number, the product you are interested in, your business size and your free-text description.", "This data is processed only to evaluate your request, respond to you and prepare a quote. It is not used for marketing without separate consent."] },
          { h: "Legal basis", p: ["Data is processed on the basis of your explicit consent and, at your request, the conduct of pre-contractual discussions."] },
          { h: "Transfers", p: ["Your form data is not shared with third parties other than the service provider that delivers the form; where a transfer abroad occurs, that is stated explicitly in this notice."] },
          { h: "Retention", p: ["Data is retained until your request is concluded and thereafter for the duration of statutory retention obligations, after which it is deleted."] },
          { h: "Your rights", p: ["Under Article 11 of Turkish Law No. 6698 on the Protection of Personal Data you have the right to access your data, to request its correction, deletion or anonymisation, and to object to its processing. Requests can be sent to the contact address in the footer."] },
          { h: "Browser storage", p: ["The site stores your language preference and the fact that you dismissed the cookie notice in your browser's local storage. This data is not sent to a server. No tracking, analytics or advertising cookies are used."] }
        ],
        disclaimer: "This text is a draft and has not been reviewed by a legal professional. It must be reviewed by a lawyer against the business's actual data processing before launch."
      },
      cookies: {
        title: "Cookie Policy",
        updated: "Last updated",
        body: [
          { h: "Technologies used", p: ["This site uses no tracking or advertising cookies. Only your browser's local storage is used."] },
          { h: "What is stored", p: ["Your language preference (Turkish / English) and the fact that you dismissed the cookie notice. Both stay on your device only, are never sent to a server, and are not used to identify you."] },
          { h: "How to remove it", p: ["You can remove these preferences at any time by clearing site data for this site in your browser settings."] },
          { h: "Third parties", p: ["No third-party analytics or advertising code runs on this site. The demo request form is submitted to a form service provider, whose own privacy terms apply."] }
        ],
        disclaimer: "This text is a draft and has not been reviewed by a legal professional."
      },
      terms: {
        title: "Terms of Use",
        updated: "Last updated",
        body: [
          { h: "Purpose of the site", p: ["This site is published to present the software products and services offered. No direct sale or online payment is taken through the site."] },
          { h: "Binding effect", p: ["Plan contents, feature lists and timeframes on the site are informational and do not on their own constitute a binding offer. Price, scope and duration become binding through a written quote and a contract signed by the parties."] },
          { h: "Product information", p: ["The features of the products presented may change during development. Published screenshots and images are representative."] },
          { h: "Intellectual property", p: ["Rights in the site's content, text and images are reserved. Components published as open source are subject to the licence stated in the relevant repository."] },
          { h: "Liability", p: ["Care is taken to keep the information on this site current and accurate; however, no liability is accepted for outcomes of decisions taken in reliance on site content."] }
        ],
        disclaimer: "This text is a draft and has not been reviewed by a legal professional."
      }
    },

    notFound: {
      code: "404",
      title: "The page you were looking for was not found.",
      text: "The address may have changed or the page may have been removed. You can continue from below.",
      home: "Back to home"
    }
  }
};

/* Geriye uyumluluk: eski dosya adiyla erisen kod varsa kirilmasin. */
window.PROJE_BAHCESI_TRANSLATIONS = window.SITE_CONTENT;
