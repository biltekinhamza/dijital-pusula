"use strict";

/* cold.js — Soğuk Hava Deposu ürün sayfası içeriği.
   Paket/fiyat verisi ADR-4 gereği pricing.js'e taşındı, burada tekrarlanmaz. */

module.exports = {
  "meta": {
    "title": "Soğuk Hava Deposu Yönetim Sistemi | 3D Depo Yerleşimi ve Stok",
    "description": "Meyve soğuk hava depoları için deponun 3D dijital ikizi: sürükle-bırak palet yerleşimi, çakışma ve istif kuralları, kalan KG üzerinden depolama hesabı, çoklu depo ve raporlar.",
    "og": "Deponun 3D dijital ikizi. Meyve soğuk hava depoları için yerleşim, stok ve depolama hesabı."
  },
  /* status: bugünkü (yeniden kurulumdan önceki) site de "Yayında" diyordu;
     S5 (ETKI-ANALIZI §9) bunu netleştirmeyi bekliyor ("bir müşteriye
     açılıp kullandırılabilir mi, yoksa erken erişim mi"). Karar gelene
     kadar mevcut davranışı değiştirmeyen "live" varsayımıyla ilerlendi —
     S5 yanıtlanınca tek satır "early-access"e döner. */
  "status": "live",
  "trial": { "mode": "request" },
  "code": "SHD",
  "name": "Soğuk Hava Deposu Yönetim Sistemi",
  "subtitle": "3D depo yerleşimi, stok ve depolama hesabı",
  "tagline": "Deponun 3D dijital ikizi.",
  "hero": "Meyve soğuk hava depoları için, odaları gerçek ölçüleriyle modelleyen; paletin yerini sürükle-bırak ile belirleyip çakışma, istif ve koridor kurallarını sunucuda doğrulayan depo yönetim sistemi.",
  "highlights": [
    "3D oda modeli",
    "Sürükle-bırak yerleşim",
    "Kalan KG üzerinden hesap",
    "Çoklu depo",
    "CSV / XLSX / PDF rapor"
  ],
  "problem": "Hangi odada ne var, hangi palet kimin ve oda ne kadar dolu. Bunların cevabı defterde, Excel'de ve depo sorumlusunun aklında duruyor. Paletin nereye konacağı sahada karar veriliyor; koridor kapanıyor, istif dengesiz kalıyor, sonradan taşımak gerekiyor. Sezon sonunda depolama bedeli hesaplanırken kalan kilo elle çıkarılıyor ve fiyat değişikliği geçmişi de bozuyor.",
  "solution": "Odaların metre cinsinden modellendiği, her paletin ve Palsan biriminin odada kendi ikonuyla durduğu bir 3D yerleşim ekranı. Yerleştirmeden önce kural sunucuda doğrulanır: birim başka bir birimin üstüne binmiyor, koridor bandını kapatmıyor ve istif dengeli. Depolama bedeli daima kalan KG ile o girişin fiyatı üzerinden hesaplanır; sonradan yapılan fiyat değişikliği geçmiş kayıtları yeniden yazmaz.",
  "benefit": "Depo doluluğu ve ürünün yeri ekrandan görülür, yerleştirme hatası sahada değil ekranda yakalanır ve depolama bedeli tartışma götürmeyen bir kayda dayanır.",
  "comparison": {
    "title": "Defter ve Excel ile yürütülen düzenden farkı",
    "lead": "Bu ürünün rakibi başka bir yazılım değil; depo defteri, Excel dosyası ve depo sorumlusunun hafızası. Fark tam olarak şurada:",
    "before": "Defter ve Excel ile",
    "after": "Bu sistemle",
    "rows": [
      {
        "k": "Odada ne var",
        "before": "Giriş-çıkış deftere yazılır; hangi paletin nerede durduğu depo sorumlusunun aklındadır.",
        "after": "Oda gerçek ölçüleriyle modellenir; her palet ve Palsan birimi odada kendi yerinde görünür."
      },
      {
        "k": "Yerleştirme kararı",
        "before": "Sahada verilir. Koridor kapanır, istif dengesiz kalır, sonradan taşımak gerekir.",
        "after": "Yerleştirmeden önce kural sunucuda doğrulanır; ekranda yeşil ya da kırmızı hayalet olarak görünür."
      },
      {
        "k": "Depolama bedeli",
        "before": "Sezon sonunda kalan kilo elle çıkarılır; hesap tartışmaya açıktır.",
        "after": "Kalan KG × girişte sabitlenen fiyat. Hesap her an ekranda ve kayda dayanır."
      },
      {
        "k": "Fiyat değişikliği",
        "before": "Yeni fiyat girilince eski hesaplar da kayar.",
        "after": "Fiyat giriş anında kayda sabitlenir; sonraki değişiklik geçmiş kaydı yeniden yazmaz."
      },
      {
        "k": "Birden çok depo",
        "before": "Her depo ayrı dosya; hangisinin fiyatı hangisi karışır.",
        "after": "Her deponun kendi KG fiyatı ve kendi defteri var; işletme sahibi hepsini tek girişten görür."
      },
      {
        "k": "Rapor",
        "before": "Muhasebeye giden çıktı elle derlenir.",
        "after": "Stok, doluluk, giriş, çıkış, üretici ve ödeme raporları; CSV, XLSX ve PDF olarak dışarı alınır."
      },
      {
        "k": "İzlenebilirlik",
        "before": "Kaydı kimin ne zaman değiştirdiği belli değildir.",
        "after": "Hareket geçmişi silinmez; ayrıca kim neyi değiştirdi denetim kaydında durur."
      }
    ]
  },
  "modules": [
    {
      "icon": "◫",
      "title": "3D yerleşim",
      "text": "Odaların metre cinsinden modeli. Sürükle-bırak yerleştirme, 90 derece döndürme, istifleme, oda içinde taşıma ve odalar arası transfer. Her kap odada kendi ikonuyla durur: 20 Palsanlık bir giriş, odada 20 ayrı birim olarak görünür."
    },
    {
      "icon": "◈",
      "title": "Yerleşim kuralları",
      "text": "Çakışma, koridor bandı ve istif desteği kuralları sunucu tarafında doğrulanır; ekranda yeşil veya kırmızı hayalet olarak gösterilir. Üst birim alttakiyle en az %{stackOverlapMinPercent} örtüşmezse istif kabul edilmez. Koridor genişliği parametre ekranından değiştirilir, kodda sabit değildir."
    },
    {
      "icon": "▤",
      "title": "Stok ve hareket",
      "text": "Üretici, meyve, çeşit ve kap bazında ürün girişi; kısmi ve tam çıkış; otomatik stok kodu ve silinmeyen hareket geçmişi. Palet meyve kasalarının istiflenmesiyle oluşur: girişte palet başına kasa adedi kaydedilir, çıkış kasa bazında yapılabilir ve kasaları azalan palet, son kasa çıkana kadar odadaki yerini korur."
    },
    {
      "icon": "₺",
      "title": "Depolama hesabı",
      "text": "Hesap daima kalan KG × standart KG fiyatı şeklindedir; gün sayısına bağlı değildir. Fiyat, stok girişinde kayda sabitlenir, sonraki fiyat değişiklikleri geçmiş kayıtları yeniden yazmaz. Her deponun kendi KG fiyatı ve kendi defteri vardır."
    },
    {
      "icon": "◧",
      "title": "Çoklu depo ve işletme",
      "text": "Bir hesap tam olarak bir depoyu temsil eder; işletme sahibi tüm depolarını tek girişten görür. Her depo kendi fiyatı, kendi defteri ve kendi raporlarıyla ayrıdır. Farklı işletmelerin verisi birbirine hiçbir ekranda görünmez."
    },
    {
      "icon": "⚿",
      "title": "Personel ve yevmiye",
      "text": "Personel kayıtları, yevmiyeci grupları ve grup bazlı ödeme takibi. Pro ve Kurumsal paketlerde açıktır."
    },
    {
      "icon": "▥",
      "title": "Raporlar",
      "text": "Panel göstergeleri ve stok, doluluk, giriş, çıkış, üretici, ödeme raporları. Hepsi CSV, XLSX ve PDF olarak dışarı alınabilir."
    },
    {
      "icon": "↻",
      "title": "Sistem ve güvenlik",
      "text": "Rol bazlı yetkilendirme, silinmeyen denetim kaydı (audit log), arayüzden tek tıkla yedek alma ve parametre yönetimi. Şifre, jeton ve kişisel veri günlüğe yazılmaz."
    }
  ],
  "integrations": [
    {
      "name": "CSV / XLSX / PDF",
      "text": "Bütün raporlar üç biçimde dışarı alınabilir; muhasebeye giden çıktı elle hazırlanmaz."
    },
    {
      "name": "REST API",
      "text": "OpenAPI 3 şeması, Swagger ve ReDoc arayüzleriyle belgeli /api/v1 uç noktaları."
    },
    {
      "name": "PostgreSQL",
      "text": "Üretimde PostgreSQL. Uygulama içinden yedek alınır, geri yükleme yordamı belgelidir."
    },
    {
      "name": "Docker",
      "text": "Tek konteynerde API ve arayüz. Dağıtım betiği başarısız sağlık kontrolünde önceki sürüme geri döner."
    }
  ],
  "specs": [
    {
      "k": "Sunucu",
      "v": "Python 3.12, FastAPI, SQLAlchemy 2.0"
    },
    {
      "k": "Arayüz",
      "v": "React 18, TypeScript, React Three Fiber (Three.js)"
    },
    {
      "k": "Veritabanı",
      "v": "PostgreSQL 14+ (üretim), SQLite (geliştirme)"
    },
    {
      "k": "Dağıtım",
      "v": "Docker / Docker Compose, Alembic göçleri"
    },
    {
      "k": "Tarayıcı",
      "v": "WebGL 2 destekleyen güncel tarayıcı (3D görünüm için)"
    },
    {
      "k": "Test",
      "v": "{backendTestCount} sunucu + {frontendTestCount} arayüz testi, ayrıca uçtan uca duman testleriyle doğrulanır"
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
      "icon": "◧",
      "title": "Depo işletmecisi / sahibi",
      "text": "Birden çok deposu olan ya da tek depoyu büyüten işletme sahipleri için; tüm depolar tek girişten görülür."
    },
    {
      "icon": "◫",
      "title": "Depo sorumlusu",
      "text": "Yerleşimi ve günlük giriş-çıkışı sahada yürüten depo sorumluları için; yerleştirme kuralı ekranda anında doğrulanır."
    },
    {
      "icon": "▤",
      "title": "Muhasebe / finans sorumlusu",
      "text": "Depolama bedelini ve raporları izleyen muhasebe tarafı için; stok, doluluk ve ödeme raporları CSV/XLSX/PDF olarak dışarı alınır."
    }
  ],
  "faq": {
    "items": [
      {
        "q": "Verilerim başka işletmelerle karışır mı?",
        "a": "Karışmaz. Her işletmenin verisi veritabanında kendi kimliğiyle ayrılır; farklı işletmelerin verisi hiçbir ekranda birbirine görünmez."
      },
      {
        "q": "Deneme hesabında kaç oda açabilirim?",
        "a": "Canlı lisansı olmayan (deneme) bir depo en fazla {demoRoomLimit} oda açabilir. Lisans alındığında bu sınır kalkar."
      },
      {
        "q": "Fiyat değiştirirsem geçmiş kayıtlar etkilenir mi?",
        "a": "Etkilenmez. Depolama bedeli stok girişinde kayda sabitlenir; sonraki fiyat değişikliği geçmiş kaydı yeniden yazmaz."
      },
      {
        "q": "Personel ve yevmiye takibi hangi pakette var?",
        "a": "Personel kayıtları, yevmiyeci grupları ve grup bazlı ödeme takibi Pro ve Kurumsal paketlerde açıktır."
      },
      {
        "q": "Raporları hangi biçimde alabilirim?",
        "a": "Stok, doluluk, giriş, çıkış, üretici ve ödeme raporlarının hepsi CSV, XLSX ve PDF olarak dışarı alınabilir."
      },
      {
        "q": "Kim neyi değiştirdi görebilir miyim?",
        "a": "Evet. Hareket geçmişi silinmez ve kim neyi ne zaman değiştirdi denetim kaydında (audit log) durur."
      }
    ]
  }
};
