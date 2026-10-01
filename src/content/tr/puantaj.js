"use strict";

/* puantaj.js — Puantaj Pro Suite ürün sayfası içeriği.
   Sayısal iddialar facts.js'ten ({attendanceCodes}, {fixedHolidays} …) gelir;
   her cümle E:/Projelerim/puantaj kodunda sınanabilir bir davranışa karşılık
   gelir (ETKI-ANALIZI §1.6 yöntemi). Ürünün YAPMADIĞI işler (resmi bordro,
   SGK bildirimi) SSS'de açıkça yazılır. Paket verisi pricing.js'te. */

module.exports = {
  "meta": {
    "title": "Puantaj Pro Suite | Personel Puantaj, Hakediş ve Maaş Yazılımı",
    "description": "Günlük puantaj, Pazar ve resmi tatil mesaisinin otomatik hesabı, maaş ve hakediş, prim, avans ve icra kesintisi, banka/elden ödeme listesi, şantiye takibi ve personel evrakları. Şirket personeli ve taşeron çalıştıran işletmeler için çok şirketli platform.",
    "og": "Puantajdan ödeme listesine kadar tek platform. Personel çalıştıran işletmeler için Puantaj Pro Suite."
  },
  "status": "live",
  "trial": { "mode": "request" },
  "code": "PNT",
  "name": "Puantaj Pro Suite",
  "subtitle": "Personel puantajı, hakediş ve maaş hesabı",
  "tagline": "Puantajdan ödeme listesine kadar tek platform.",
  "hero": "Şirket personeli ve taşeron çalışanı olan işletmeler için; günlük puantajı aylık tabloda ya da sahadan telefonla işleyen, Pazar ve resmi tatil çalışmasını mesaiye kendiliğinden çeviren, maaşı, hakedişi, primi, avansı ve icra kesintisini tek hesapta birleştiren çok şirketli platform.",
  "highlights": [
    "{attendanceCodes} puantaj kodu",
    "Pazar ve tatil mesaisi otomatik",
    "Telefondan mobil puantaj",
    "Gün bazında şantiye takibi",
    "Sözleşme ve personel evrakları"
  ],
  "problem": "Puantaj kâğıt çizelgede ya da Excel'de tutuluyor, ay sonunda tek tek toplanıyor. Pazar ve bayramda çalışanın fazladan yevmiyesi elle hatırlanıyor; iki tatil aynı güne denk gelince ya unutuluyor ya iki kez ödeniyor. Aylık maaşlı personel ile yevmiyeli taşeron ayrı tablolarda hesaplanıyor, avans ve icra kesintisi ayrı bir yerden düşülüyor; kim hangi şantiyede çalıştı sorusunun cevabı da bir başka defterde.",
  "solution": "Her personelin her günü için tek bir kod girilen aylık puantaj tablosu. Pazar ya da resmi tatilde çalışan için mesai kaydı kendiliğinden oluşur; maaş, hakediş, prim, avans ve icra aynı hesapta birleşir, sonuç banka ve elden ödeme listesine dönüşür. Sahadaki sorumlu günü telefonundan işaretler, her günün şantiyesi kayda geçer.",
  "benefit": "Ay sonu toplama işi ortadan kalkar, tatil mesaisi unutulmaz ya da iki kez ödenmez, ödeme listesi puantajdan doğrudan çıkar. Kimin hangi gün hangi şantiyede çalıştığı rapor olarak elinizdedir.",
  "comparison": {
    "title": "Kâğıt çizelge ve Excel ile yürütülen düzenden farkı",
    "lead": "Bu ürünün rakibi başka bir yazılım değil, ay sonunda toplanan çizelgenin kendisi. Fark tam olarak şurada:",
    "before": "Çizelge ve Excel",
    "after": "Puantaj Pro Suite ile",
    "rows": [
      {
        "k": "Günlük puantaj",
        "before": "Kâğıt çizelge ya da tablo; ay sonunda satır satır toplanır.",
        "after": "Aylık tabloda her gün için tek kod; toplam gün kendiliğinden hesaplanır."
      },
      {
        "k": "Pazar ve tatil",
        "before": "Fazladan yevmiye elle hatırlanır; Pazar ile bayram çakışınca iki kez ödenebilir.",
        "after": "Pazar ya da resmi tatilde 'Geldi' ya da 'Yarım Gün' işaretlenince mesai kaydı kendiliğinden açılır; ikisi aynı güne denk gelirse tek kez ödenir."
      },
      {
        "k": "Maaşlı ve yevmiyeli",
        "before": "Aylık maaşlı personel ve taşeron ayrı tablolarda, ayrı formüllerle.",
        "after": "Şirket personeli aylık maaşın {monthlyBaseDays} gün bazında, taşeron günlük yevmiyeyle; aynı ekranda hesaplanır."
      },
      {
        "k": "Kesintiler",
        "before": "Avans ve icra ayrı bir yerden hatırlanıp elle düşülür.",
        "after": "Prim, avans ve icra kayıtları dönem hesabına girer; net ödenecek tutar tek satırda çıkar."
      },
      {
        "k": "Ödeme",
        "before": "Bankaya yatacak ve elden verilecek tutar ayrı ayrı hesaplanır.",
        "after": "Banka ve elden ödeme dağılımı girilir; banka listesi Excel olarak alınır."
      },
      {
        "k": "Şantiye",
        "before": "Kimin hangi gün nerede çalıştığı ayrı bir defterde ya da hiç tutulmuyor.",
        "after": "Her günün şantiyesi puantajla birlikte kaydedilir; şantiye bazında rapor alınır."
      },
      {
        "k": "Evrak",
        "before": "Sözleşme ve tutanak her seferinde boş bir belgeden elle doldurulur.",
        "after": "Belirli süreli iş sözleşmesi, istifa dilekçesi, devamsızlık tutanağı ve maaş zarfı personel kaydından doldurulur."
      }
    ]
  },
  "modules": [
    {
      "icon": "▤",
      "title": "Aylık puantaj tablosu",
      "text": "Personel satırda, ayın günleri sütunda. Her gün için {attendanceCodes} koddan biri seçilir: Geldi, Yarım Gün, Ücretli İzin, Ücretsiz İzin, Devamsız. Pazar günleri işaretli görünür; işe giriş ve çıkış tarihinin dışındaki günler düzenlenemez."
    },
    {
      "icon": "▥",
      "title": "Mobil puantaj",
      "text": "Sahadaki sorumlu telefonunun tarayıcısından günü işaretler: karta tek dokunuşla Geldi, ayrıca Ücretsiz İzin ve Gelmedi. 'Günü tamamla' işaretlenmeyenleri Gelmedi olarak kaydeder. Yalnız mobil yetkili kullanıcı başka ekran görmez."
    },
    {
      "icon": "⌁",
      "title": "Otomatik tatil mesaisi",
      "text": "Pazar ya da resmi tatilde 'Geldi' ya da 'Yarım Gün' işaretlendiğinde mesai kaydı kendiliğinden oluşur (yarım günde yarım oranla), kod değişince güncellenir ya da silinir. Pazar ile resmi tatil aynı güne denk gelirse iki ayrı kayıt değil, tek kayıt açılır. {fixedHolidays} sabit tarihli resmi tatil hazır gelir."
    },
    {
      "icon": "◇",
      "title": "Maaş ve hakediş",
      "text": "Şirket personelinde günlük ücret aylık maaşın {monthlyBaseDays} gün bazıyla, taşeronda günlük yevmiyeyle hesaplanır. Yarım gün oranı, saatlik mesai katsayısı ve günlük çalışma saati şirketin kendi ayarıdır."
    },
    {
      "icon": "⚖",
      "title": "Ek kazanç ve kesintiler",
      "text": "Saatlik mesai tek tek ya da toplu girilir; prim, avans ve icra kayıtları dönem hesabına katılır. Maaş/hakediş raporu her personel için net ödenecek tutarı tek satırda gösterir."
    },
    {
      "icon": "⇄",
      "title": "Banka ve elden ödeme",
      "text": "Dönemin net tutarı için bankaya yatacak kısım girilir, kalanı elden ödenecek olarak hesaplanır. Ad, T.C. kimlik no ve IBAN içeren banka listesi Excel olarak alınır."
    },
    {
      "icon": "◧",
      "title": "Şantiye takibi",
      "text": "Şantiyeler kısa koduyla tanımlanır; puantajdaki her günün şantiyesi ayrı seçilir, bir günün tüm personeline ya da bir personelin tüm ayına toplu atanabilir. Şantiye raporu kimin nerede kaç gün çalıştığını gösterir. Hesaplamayı etkilemez."
    },
    {
      "icon": "✎",
      "title": "Personel evrakları",
      "text": "Belirli süreli iş sözleşmesi PDF olarak, istifa dilekçesi, devamsızlık tutanağı ve maaş zarfı yazdırılabilir olarak personel kaydından doldurulur. İl, SGK işyeri sicil no, deneme süresi ve ödeme günü şirket ayarlarından gelir."
    }
  ],
  "integrations": [
    {
      "name": "Excel",
      "text": "Puantaj, maaş/hakediş, banka/elden, şantiye ve personel listeleri .xlsx olarak alınır."
    },
    {
      "name": "PDF belge",
      "text": "Belirli süreli iş sözleşmesi şirket ve personel bilgileriyle PDF olarak çıkar."
    },
    {
      "name": "Mobil tarayıcı",
      "text": "Saha için ayrı uygulama kurulmaz; mobil puantaj ekranı telefon tarayıcısında çalışır."
    },
    {
      "name": "PostgreSQL",
      "text": "Üretimde PostgreSQL, geliştirmede SQLite. Docker ile paketlenir."
    }
  ],
  "specs": [
    {
      "k": "Sunucu",
      "v": "Python 3, Django"
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
      "k": "Belge çıktısı",
      "v": "PDF (WeasyPrint), Excel (.xlsx)"
    },
    {
      "k": "Mobil",
      "v": "Telefon tarayıcısına uyumlu mobil puantaj ekranı"
    },
    {
      "k": "Erişim",
      "v": "Tarayıcı; ayrı kurulum gerekmez"
    },
    {
      "k": "Çok şirketli",
      "v": "Evet, veri şirket bazında ayrılır"
    },
    {
      "k": "Arayüz dili",
      "v": "Türkçe"
    }
  ],
  "targetProfiles": [
    {
      "icon": "◧",
      "title": "İnşaat ve taahhüt firması",
      "text": "Birden fazla şantiyede ekip çalıştıran firmalar için; kimin hangi gün hangi şantiyede çalıştığı puantajla birlikte kayda geçer."
    },
    {
      "icon": "◇",
      "title": "İmalathane ve atölye",
      "text": "Aylık maaşlı personeli ve günlük yevmiyeli çalışanı aynı anda olan işletmeler için; ikisi aynı ekranda, kendi kuralıyla hesaplanır."
    },
    {
      "icon": "▤",
      "title": "Taşeron ekip yöneten işletme",
      "text": "Yevmiyeli ekiplerini sahadan telefonla işaretleyen işletmeler için; tatil mesaisi ve ödeme listesi puantajdan doğrudan çıkar."
    }
  ],
  "faq": {
    "items": [
      {
        "q": "Verilerim başka firmalarla karışır mı?",
        "a": "Karışmaz. Her şirketin verisi veritabanında kendi kimliğiyle ayrılır ve sorgular bu ayrımı zorunlu kılar. Bir şirketin kaydına başka bir şirketin hesabıyla erişilemediği her sürümde otomatik testlerle doğrulanır."
      },
      {
        "q": "Resmi bordro ve SGK bildirimi yapıyor mu?",
        "a": "Hayır. Puantaj Pro Suite puantajı, tatil mesaisini, hakedişi ve ödeme dağılımını hesaplar. Resmi bordro, SGK bildirgesi ve vergi hesabı mali müşavirinizin ya da bordro programınızın işidir; puantaj ve ödeme raporları ona Excel olarak verilebilir."
      },
      {
        "q": "Mevcut personel listemi aktarabilir miyim?",
        "a": "Tablo halindeki personel listesi aktarılabilir. Elinizdeki dosyayı görüp aktarımın kapsamını birlikte netleştiririz; otomatik bir Excel içe aktarma özelliği değildir."
      },
      {
        "q": "Kaç kullanıcı ekleyebilirim?",
        "a": "Kullanıcıları şirket yöneticisi ekler. Sahadaki sorumlu için yalnız mobil puantaj ekranını gören bir kullanıcı açılabilir; maaş ve şirket ayarları yöneticide kalır."
      },
      {
        "q": "Resmi tatiller hazır geliyor mu?",
        "a": "{fixedHolidays} sabit tarihli resmi tatil hazır gelir. Ramazan ve Kurban Bayramı gibi tarihi her yıl değişen tatiller ortak tatil listesine eklenir; listede olmayan bir gün tatil mesaisi üretmez."
      },
      {
        "q": "Mesai ve maaş oranlarını değiştirebilir miyim?",
        "a": "Evet. Yarım gün oranı, saatlik mesai katsayısı, günlük çalışma saati ve Pazar/tatil mesai oranları şirketinizin kendi ayarıdır ve başka şirketleri etkilemez."
      }
    ]
  }
};
