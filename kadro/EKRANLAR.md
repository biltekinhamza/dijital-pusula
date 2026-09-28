# Ekranlar — Dijital Pusula

Girdi: `kadro/ETKI-ANALIZI.md` §3 (bilgi mimarisi, bölüm sırası, sınırlar) ve
`kadro/TASARIM-STANDARDI.md` (jetonlar, bileşenler). Bu projede ayrı bir GEREKSİNİM
fazı/`REQ-` veritabanı çalışmadı; **REQ kimliği yerine ETKI-ANALIZI'nın kendi rota ve
bölüm kimlikleri kullanılır**: `REQ-<rota-kimliği>` (ETKI-ANALIZI §3.2 tablosu) ve
gerekirse `-<bölüm-kodu>` (§3.4 H1-H10, §3.5 P1-P14). Her ekran girdisi hangi rotaları
kapsadığını başında listeler.

Tüm ekranlar: JS kapalıyken tam görünür (menü açılır/dil/fiyat seçici/form JS ister,
gövde içerik istemez); `prefers-reduced-motion` altında her hareket durur; görseller
WebP + açık `width`/`height`; TR metin EN'den ~%20-30 uzun olduğu için hiçbir bileşen
sabit genişlikte metin kutusu varsaymaz (satır kırılması normal kabul edilir, kesme
`text-overflow: ellipsis` yalnız gerçekten tek satır garantili yerlerde — nav linki,
rozet kelimesi).

---

### Ana sayfa — REQ-home (H1-H10)

**Amaç:** Ziyaretçi 10 saniyede kendi sektörüne ait ürünü bulup oraya gitsin; olmazsa
"kim, ne kadar gerçek, kime ulaşırım" sorularına burada cevap bulsun.

**Yerleşim — dar (~390px):**
```
[Header: logo | ☰]
──────────────────
[Eyebrow: 🧭 Doğru yerdesiniz.]
[H1: somut değer cümlesi]
[Açıklama 2 cümle]
[Yön kapısı — HVAC]      (tam genişlik kart)
[Yön kapısı — SHD]       (tam genişlik kart, altta)
[Risk satırı: ✓ Kurulum yok  ✓ Kredi kartı yok]
──────────────────
[Gerçeklik şeridi — çipler alt alta sarar, 2 sütun]
──────────────────
[HVAC vitrini: sorun cümlesi / yetenek listesi (dikey) / 1 ekran / 2 link]
──────────────────
[SHD vitrini: aynı yapı + durum rozeti]
──────────────────
[Kişi kartı: foto üstte, metin altta, tam genişlik]
──────────────────
[Sürüm bandı: son tarih + 3 not + "Sırada" 2 madde, dikey liste]
──────────────────
[Fiyat özeti: kip notu + buton]
──────────────────
[SSS: 5 <details>, tam genişlik]
──────────────────
[Özel yazılım bandı: küçük, ikincil, tek satır + link]
──────────────────
[CTA bandı: başlık + buton + WhatsApp/e-posta]
[Footer]
```

**Yerleşim — geniş (~1440px):**
```
[Header: logo | Ürünler▾ Fiyatlandırma Güvenlik* Hakkımızda* İletişim | TR·EN | CTA]
────────────────────────────────────────────────────────────────────
[Eyebrow]                              
[H1 (max-width ~9 kelime satırı)]      [Yön kapısı HVAC | Yön kapısı SHD]  (H1 metni
[Açıklama]                              solda, kapılar sağda 2 sütun, orta pusula-gülü
[Risk satırı]                           ayracıyla — bkz. TASARIM-STANDARDI §5.3-5.4)
────────────────────────────────────────────────────────────────────
[Gerçeklik şeridi — tek satır, çipler yan yana, taşarsa sarar]
────────────────────────────────────────────────────────────────────
[HVAC vitrini: sol %45 metin, sağ %55 ekran görüntüsü]
[SHD vitrini: ters düzen (zigzag) — sol %55 ekran, sağ %45 metin]
────────────────────────────────────────────────────────────────────
[Kişi kartı: sol foto (sabit ~200px), sağ metin+kanal+saat]
────────────────────────────────────────────────────────────────────
[Sürüm bandı: sol "son sürüm" özeti, sağ "Sırada" 2 madde — 2 sütun]
────────────────────────────────────────────────────────────────────
[Fiyat özeti: ortalanmış, dar içerik genişliği (~680px)]
────────────────────────────────────────────────────────────────────
[SSS: sol sticky başlık (~%30), sağ soru listesi (~%70)]
────────────────────────────────────────────────────────────────────
[Özel yazılım bandı: tam genişlik, düşük yükseklik]
[CTA bandı]  [Footer: 4 sütun]
```

**Bileşenler:** header+ürün menüsü+dil+CTA · hero (ana sayfa varyantı) · yön kapısı
(×2) · gerçeklik şeridi · ürün vitrini (×2, zigzag) · kişi kartı · sürüm notu özeti +
yol haritası özeti · fiyat özeti (not kutusu + link) · SSS · CTA bandı (küçük, özel
yazılım) · CTA bandı (büyük, kapanış) · footer. Tüm jetonlar TASARIM-STANDARDI §5.

**Durumlar:**
- Boş: H5 (kişi kartı) yalnız S8 yanıtlanmadıysa yalnız ulaşılabilirlik kısmı gösterir
  (isim/foto yok) — "ulaşılabilirlik" alt bileşeni tek başına render edilebilir
  olmalı, boş kutu bırakılmaz.
- Yükleniyor: yok (statik sayfa).
- Hata: yok (bu sayfa hata durumu üretmez; 404 ayrı ekran).
- Başarı/Dolu: SHD durumu `early-access` ise vitrin + yön kapısı + rozet birlikte
  değişir (aynı `productState()` okuyucusu, §ETKI-ANALIZI 4.4).

**Erişilebilirlik:** Tek `<h1>` (hero). Klavye sırası header → yön kapıları (ikisi de
tab-erişilebilir tam kart, sadece "İncele" linki değil — kart tıklanabilir alanı link
ile örtüşür, `<a>` kartı sarar) → vitrin bağlantıları → SSS `<details>` → CTA. Yön
kapısı odaklandığında görünür halka + (varsa) §4 ibre-yönelme genişletmesi tetiklenir.
Gerçeklik şeridi çipleri dekoratif değil, gerçek veri — `aria-hidden` uygulanmaz.

**Etkileşim:** Birincil eylem = yön kapılarından biri (ikisi eşit ağırlıkta, "tek
baskın eylem" kuralı burada istisna: site girişinde iki eşdeğer yol kasıtlı). Onay
isteyen eylem yok bu sayfada (form yok, iletişime yönlendirme var).

---

### Ürün sayfası şablonu (tek şablon, iki ürün) — REQ-hvac, REQ-cold (P1-P14)

**Amaç:** "Bu, benim işimi biliyor" dedirtmek; itirazları SSS'te kırmak; fiyata ve
denemeye yönlendirmek.

**Yerleşim — dar (~390px):**
```
[Header]
[Eyebrow: kategori] [H1] [Durum rozeti] [Açıklama]
[CTA birincil] [CTA ikincil: Fiyatlar]
[Ekran görüntüsü / temsilî çerçeve — tam genişlik]
──────
[Gerçeklik şeridi — P2, çip grid 2 sütun]
──────
[Kime göre: 2-3 profil, dikey kart listesi, her biri ikon+başlık+1 cümle]
──────
[Bugün nasıl → Ürün ne yapıyor: 2 blok üst üste, "Bugün" muted / "Ürünle" vurgulu]
──────
[Excel karşılaştırması — kart yığını, §TASARIM-STANDARDI 5.7]
──────
[Yetenek blokları — dikey, her biri: ekran yuvası üstte, metin altta]
──────
[Teknik derinlik paneli — spec kutusu, sol vurgu çubuğu]
  [isteğe bağlı: örnek hesap mini tablo]
──────
[Adımlar — dikey, numaralı, bağlayıcı çizgi sola]
──────
[Bağlantı listesi — satır satır]
──────
[Güvenlik özeti — 3-4 madde, liste + "Daha fazla" linki (rota açıksa)]
──────
[Fiyat özeti — not kutusu + buton]
──────
[SSS — 8-12 <details>]
──────
[CTA bandı]
[Teknik künye — <details>, kapalı başlar]
[Footer]
```

**Yerleşim — geniş (~1440px):**
```
[Header]
[Eyebrow][H1][Rozet][Açıklama]        [Ekran görüntüsü / çerçeve, sağ %50]
[CTA birincil][CTA ikincil]
──────────────────────────────────────────────
[Gerçeklik şeridi — tek satır]
──────────────────────────────────────────────
[Kime göre — 2-3 profil, yatay flex, eşit değil (biri geniş vurgulu olabilir)]
──────────────────────────────────────────────
[Bugün nasıl / Ürün ne yapıyor — 2 sütun yan yana, ortada ince ayraç]
──────────────────────────────────────────────
[Excel karşılaştırması — tam genişlik tablo]
──────────────────────────────────────────────
[Yetenek blok 1: metin sol %45 / ekran sağ %55]
[Yetenek blok 2: ekran sol %55 / metin sağ %45]   (zigzag devam eder)
[Yetenek blok 3: metin sol / ekran sağ]
──────────────────────────────────────────────
[Teknik derinlik paneli — geniş, iki sütun: sol açıklama, sağ ölçü tablosu]
──────────────────────────────────────────────
[Adımlar — yatay zaman çizgisi, 3-4 nokta]
──────────────────────────────────────────────
[Bağlantılar]   [Güvenlik özeti]   (2 sütun yan yana, eşit değil ~60/40)
──────────────────────────────────────────────
[Fiyat özeti — ortalanmış]
──────────────────────────────────────────────
[SSS — sol sticky başlık / sağ liste]
[CTA bandı]
[Teknik künye — <details>]
[Footer]
```

**Bileşenler:** hero (ürün varyantı) · "temsilî" etiketli ekran çerçevesi · gerçeklik
şeridi · profil kartı listesi (kart değil, liste — 2-3 öğe için ızgara kurulmaz) ·
karşılaştırma tablosu · yetenek bloğu + ekran yuvası (zigzag) · teknik derinlik bloğu
· adımlar · bağlantı kartı · durum rozeti · SSS · fiyat özeti (not kutusu) · CTA bandı
· teknik künye (`<details>`, mevcut `specs` içeriği).

**Durumlar:**
- Boş: güvenlik özeti bölümü, `/guvenlik/` kapalıyken **hiç render edilmez** (boş
  kutu bırakılmaz, ETKI-ANALIZI §3.9 kuralı — kapılı rotaya bağlantı derlemeyi
  durdurur, o yüzden bölüm koşullu olarak tamamen kaldırılır).
- Yükleniyor: yok.
- Hata: yok (form bu sayfada yok, CTA `/iletisim/?urun=…`'a gider).
- Başarı/Dolu: `status: live` iken rozet, CTA metni ve JSON-LD birlikte "Yayında"
  durumuna döner (`productState()`, tek okuyucu → 5 yerde tutarlı).

**Erişilebilirlik:** Tek `<h1>` (ürün adı + değer önerisi). Ekran yuvası görselinin
`alt` metni gerçek içeriği anlatır (ör. "HVAC Pro Suite teklif ekranı, kalem listesi
ve PDF önizlemesi"), temsilî iken `alt="Temsilî görsel: …"`. Teknik künye `<details>`
kapalı başlar, `summary` klavye odaklanabilir. Karşılaştırma tablosunda satır başına
onay ikonu `aria-hidden="true"` + yanındaki metin anlamı zaten taşır (renk+ikon+metin
üçlüsü, yalnız renk değil).

**Etkileşim:** Birincil eylem = hero'daki CTA (deneme/talep). İkincil: "Fiyatlar"
(aynı sayfada değil, `/fiyatlandirma/#<ürün>`'e gider — onay istemez, navigasyon).
Onay isteyen eylem yok.

---

### Fiyatlandırma — REQ-pricing (§3.6)

**Amaç:** Ziyaretçi fiyatı/paket içeriğini görüp ya kayıt olur ya da itirazı SSS'te
çözer; iki ürün tek sayfada, çapayla ayrılır (`#hvac`, `#soguk-hava`).

**Yerleşim — dar (~390px):**
```
[Header]
[H1: Fiyatlandırma] [Risk azaltıcı 2 cümle]
[Ürün seçici: "HVAC Pro Suite" / "Soğuk Hava Deposu" — iki büyük sekme/link,
 JS'siz de çalışır (sayfa içi çapa), aktif olan vurgulu]
──────
# HVAC Pro Suite bölümü
[Aylık/Yıllık seçici — yalnız yearly verisi varsa]
[Not kutusu: +KDV, "Fiyatlar GG.AA.YYYY güncellendi", ödeme yöntemi]
[Plan kartı 1]
[Plan kartı 2 — "Önerilen" ince kenarlık]
[Plan kartı 3]
[Plan karşılaştırma tablosu — kart yığını]
[Faturalama SSS — <details> listesi]
──────
# Soğuk Hava Deposu bölümü (aynı yapı tekrar, kimlikler ürün önekli)
──────
[Erken kullanıcı programı — S12 evetse, not kutusu + link]
[CTA bandı]
[Footer]
```

**Yerleşim — geniş (~1440px):**
```
[Header]
[H1][Risk azaltıcı cümleler]           [Ürün seçici — sağda sabit/sticky, iki sekme]
──────────────────────────────────────────────
# HVAC Pro Suite (çapa: #hvac)
[Aylık/Yıllık seçici — ortalanmış]
[Not kutusu — tam genişlik, ince]
[Plan kartı 1] [Plan kartı 2 — Önerilen] [Plan kartı 3]   (3 sütun, eşit genişlik —
                                                             gerçek fiyat modeli, klişe
                                                             istisnası)
[Plan karşılaştırma tablosu — tam genişlik]
[Faturalama SSS — sol başlık / sağ liste]
──────────────────────────────────────────────
# Soğuk Hava Deposu (çapa: #soguk-hava) — aynı yapı
──────────────────────────────────────────────
[Erken kullanıcı programı]
[CTA bandı] [Footer]
```

**Bileşenler:** not kutusu · plan kartı (3 kip) · aylık/yıllık seçici · plan
karşılaştırma tablosu · SSS (`<details>`, ürün önekli kimlik) · CTA bandı.

**Durumlar:**
- Boş: `pricing.<id>.plans[].price.mode === "quote"` iken kartta rakam alanı hiç
  render edilmez (boş `0 ₺` yazılmaz), yerine "Teklif isteyin" butonu.
- Yükleniyor: yok.
- Hata: yok.
- Başarı/Dolu: `updatedAt` 90 günden eskiyse bu ekranda **görünür** bir işaret yok
  (yalnız `check-site` uyarısı, ETKI-ANALIZI §4.5 kural 12) — tasarım bunu sessiz
  tutar, yanlış "güncel değil" izlenimi vermemek için.

**Erişilebilirlik:** Aylık/yıllık seçici gerçek `role="radiogroup"` + `<input
type="radio">`, yalnız CSS ile segment görünümü — ekran okuyucu "İki seçenekten biri"
olarak okur. Plan kartları `<article>` + kendi `<h3>`'ü. Karşılaştırma tablosu §5.7
deseni. Çapa hedefleri (`#hvac`, `#soguk-hava`) `tabindex="-1"` ile odak alabilir
(sayfa içi atlama sonrası klavye kullanıcısı kaybolmasın).

**Etkileşim:** Birincil eylem = plan kartındaki CTA (`primaryCta()` ya da "Teklif
isteyin"). Yıllık/aylık değişimi anlık, sayfa yeniden yüklenmez (istemci JS, saf
fonksiyon, `node --test` ile sınanır — ETKI-ANALIZI A5).

---

### İletişim — REQ-contact (§3.7)

**Amaç:** Kanalları göster, formu al, MADDE 5'i tekrar sun.

**Yerleşim — dar (~390px):**
```
[Header]
[H1: İletişim] [Açıklama]
[İletişim kanalları — dikey liste: WhatsApp, e-posta, telefon, saat]
──────
[Form — tam genişlik, tek sütun alanlar]
  (ürün önseçimi `?urun=hvac` ise üstte küçük not: "HVAC Pro Suite için yazıyorsunuz")
[Aydınlatma kısa notu + bağlantı — not kutusu]
[Gönder butonu — tam genişlik]
[Form durum alanı — boş/gizli, gerekince dolar]
──────
[İletişim başlığı altında MADDE 5 tam seti]
[Footer]
```

**Yerleşim — geniş (~1440px):**
```
[Header]
[H1][Açıklama]                          
[İletişim kanalları — sol sticky sütun ~%35]   [Form — sağ ~%65, 2 sütunlu alan ızgarası]
                                                 [Aydınlatma notu]
                                                 [Gönder]
──────────────────────────────────────────────
[MADDE 5 tam seti — "İletişim" başlığı altında, tam genişlik, 2-3 sütun bilgi grid]
[Footer]
```

**Bileşenler:** iletişim kanalları · form (4 durum) · not kutusu (aydınlatma) ·
MADDE 5 bloğu (footer'dakiyle aynı veri, burada ayrıca "İletişim" başlığı altında —
ETKI-ANALIZI 1.1 kuralı, yönetmelik gereği ana sayfada da erişilebilir olmalı, burada
tekrar tam görünür).

**Durumlar (formun 4 durumu, tam liste):**
- **Boş (idle):** tüm alanlar boş, etiketler görünür, gönder butonu aktif.
- **Yükleniyor:** gönder butonu `disabled` + `aria-busy="true"`, metin "Gönderiliyor…",
  ikinci tıklama engellenir (çift gönderim koruması).
- **Hata:** `mailto` kipinde e-posta istemcisi açılmazsa (ör. yapılandırılmamış
  istemci) — form gönderimi zaten istemci tarafında, "e-posta uygulamanız açılmadıysa
  doğrudan yazın: [e-posta] · [WhatsApp]" notu her zaman görünür (kip fark etmeksizin
  yedek kanal her zaman ekranda, gizli değil). `endpoint` kipinde 2xx dışı yanıt →
  kırmızı not kutusu ("Gönderilemedi, lütfen WhatsApp'tan yazın") + aynı yedek
  kanallar, **otomatik yeniden deneme yok** (ADR-7).
- **Başarı:** form alanları yerini yeşil not kutusuna bırakır ("Mesajınız alındı,
  [saat] içinde dönüş yapıyoruz") + yedek kanallar yine görünür kalır (bir kez daha
  ulaşmak isteyebilir), `aria-live="polite"` ile duyurulur.

**Erişilebilirlik:** Her alan `<label>` + `aria-describedby` hata metnine bağlı.
Tercih alanı (varsa: "Nasıl dönelim: e-posta/telefon") `<fieldset><legend>`. Gizli bal
küpü alanı görünmez + ekran okuyucudan gizli (§TASARIM-STANDARDI 5.18).

**Etkileşim:** Birincil eylem = form gönder. Onay isteyen eylem yok (silme/geri
alınamaz işlem içermiyor).

---

### Özel yazılım — REQ-services

**Amaç:** İkincil hizmet hattını göster, iletişime yönlendir (ana odak ürünler).

**Yerleşim — dar (~390px):**
```
[Header]
[H1] [Açıklama]
[6 hizmet — dikey liste, her biri: başlık + 1 cümle + <details> "Ayrıntı"]
[Süreç — kısa adım listesi (adımlar bileşeni)]
[Teknoloji etiketleri — satır, wrap]
[CTA: İletişime geç]
[Footer]
```

**Yerleşim — geniş (~1440px):**
```
[Header]
[H1][Açıklama]
[Hizmet listesi — 2 sütun asimetrik (3+3 değil, ör. 2 geniş + 4 dar zigzag) veya
 tek sütun dikey liste — 3'lü eşit ızgara KURULMAZ]
[Süreç — yatay zaman çizgisi]
[Teknoloji etiketleri]
[CTA bandı]
[Footer]
```

**Bileşenler:** yetenek bloğu deseni (hizmetler için yeniden kullanılır, kart yerine
`<details>` ile açılır ayrıntı — mevcut modal kalkıyor, ETKI-ANALIZI 1.2) · adımlar ·
bağlantı/etiket listesi · CTA bandı.

**Durumlar:** Boş/yükleniyor/hata yok (statik, form yok — CTA iletişime link). Başarı/
dolu: her zaman dolu (6 hizmet sabit içerik).

**Erişilebilirlik:** Her hizmetin ayrıntısı `<details>` (odak tuzağı yok, eski modal
sorunu ETKI-ANALIZI 1.2'de çözülüyor).

**Etkileşim:** Birincil eylem = CTA bandı → iletişim.

---

### Hakkımızda — REQ-about — **Kapılı (S8 onayı bekliyor)**

**Amaç:** "Kim geliştiriyor" güven unsuru (rapor #8).

**Yerleşim — dar/geniş:** Kişi kartının genişletilmiş hali — foto, kısa geçmiş (3-4
cümle), çalışma ilkeleri (bugünkü "Neden" kartlarının taşındığı yer, dikey liste, kart
ızgarası değil), ürünlerin doğuş hikayesi (1-2 paragraf), özel yazılıma köprü (link).
Dar: tek sütun. Geniş: sol sticky foto+kanal, sağ metin akışı.

**Bileşenler:** kişi kartı (genişletilmiş) · çalışma ilkeleri listesi · CTA (özel
yazılıma köprü).

**Durumlar:** Rota `enabled: false` iken **hiçbir yerde bağlantı üretilmez** (menü,
footer, site haritasında yok) — bu sayfanın kendisi "boş" durumdadır, derlenmez.
İçerik onaylanınca (S8 evet + foto + metin) `enabled: true` olur, şablon zaten hazır.

**Erişilebilirlik:** Foto `alt` gerçek isim+bağlam içerir (dekoratif değil).

**Etkileşim:** Birincil eylem = özel yazılım/iletişim köprüsü.

---

### Güvenlik — REQ-security — **Kapılı (S10 onayı bekliyor)**

**Amaç:** Veri güvenliği güven unsuru (rapor #10).

**Yerleşim:** Not kutusu deseninin tekrarı — her madde (veri ayrımı, roller, bağlantı
şifrelemesi, yedekleme sıklığı/saklama, verinin ülkesi, abonelik bitince ne olur) ayrı
bir madde kartı, dikey liste (dar) / 2 sütun (geniş). Kart ızgarası değil, liste —
madde sayısı değişebilir (5-6), esnek olmalı.

**Bileşenler:** not kutusu (bilgi tonunda, uyarı değil) tekrar deseni.

**Durumlar:** Kapalı rota — §about ile aynı kural. S10 cevapsız kaldığı sürece hiç
yayınlanmaz (ETKI-ANALIZI §3.7 açık kuralı).

**Erişilebilirlik:** Standart liste semantği (`<ul>`), her madde başlık+açıklama.

**Etkileşim:** Yok (bilgilendirme sayfası, CTA'sız da olabilir ya da alt CTA bandı).

---

### Sürüm notları — REQ-changelog — **Kapılı (S9 onayı bekliyor)**

**Amaç:** "Ürün yaşıyor" kanıtı + açık yol haritası (rapor #4, #5).

**Yerleşim — dar:**
```
[H1] ["Sırada ne var" — Yapılıyor/Planlandı, dikey 2 blok]
[Tarihli sürümler — kronolojik liste, en yeni üstte, her biri sürüm notu girdisi]
```
**Geniş:**
```
[H1]         ["Sırada" — 2-3 sütun yan yana]
[Sürümler — tek sütun akış, sol tarafta ince zaman çizgisi çubuğu]
```

**Bileşenler:** yol haritası sütunu (§TASARIM-STANDARDI 5.15) · sürüm notu girdisi.

**Durumlar:**
- **Boş:** Bir ürünün o an "Planlandı" sütununda maddesi yoksa "Şu an bu aşamada
  madde yok" — sütun görünür kalır (boş kutu değil ama sütun başlığı yine gösterilir,
  yapının tutarlılığı için).
- Kapalı rota, S9 onayına kadar (gerçek sürüm kaydı yoksa hiç üretilmez — ADR-10
  kapı kuralı, uydurma not yazılmaz).

**Erişilebilirlik:** Kronolojik liste `<ol>` (gerçek sıra taşıyor), her girdi tarih +
başlık ilişkisi net.

**Etkileşim:** Yok (bilgilendirme).

---

### Yasal sayfa şablonu — REQ-legal-privacy, REQ-legal-cookies, REQ-legal-terms,
### REQ-legal-subscription (`legal-subscription` **Kapılı**, S3 onayı bekliyor)

**Amaç:** Yasal metni okunabilir sunmak, güncellik ve taslak durumunu açık etmek.

**Yerleşim — dar/geniş (aynı, tek sütun tasarım — yasal metinde çok sütun okumayı
zorlaştırır):**
```
[Header]
[H1: sayfa başlığı] [Son güncelleme: GG.AA.YYYY]
[Taslak notu — varsa, not kutusu (uyarı tonu)]
[EN sürümünde: "Bağlayıcı olan Türkçe metindir" notu]
[Gövde — başlık/paragraf akışı, max-width 720px, geniş ekranda ortalanmış]
[Footer]
```

**Bileşenler:** yasal metin düzeni · not kutusu (taslak uyarısı, bilgi/uyarı tonu).

**Durumlar:** `legal-subscription` kapalı rota (S3'e bağlı, ADR-9). Diğer üçü MVP,
her zaman "dolu" (boş/yükleniyor/hata durumu yok, statik metin).

**Erişilebilirlik:** Başlık hiyerarşisi metnin kendi madde numaralamasını izler (`h2`
madde başlıkları), tek `<h1>` sayfa başlığı. Uzun sayfada (KVKK+gizlilik birleşik)
isteğe bağlı bir "sayfa içi bağlantılar" listesi eklenebilir (COULD, engelleyici
değil) — eklenirse `<nav aria-label="Bu sayfada">`.

**Etkileşim:** Yok.

---

### 404 — REQ-notfound

**Amaç:** Kaybolan ziyaretçiyi 3 gerçek çıkışa yönlendirmek.

**Yerleşim — dar/geniş (aynı, tek ortalanmış blok):**
```
[Header — sade, menüsüz de olabilir ama tutarlılık için tam header]
[Pusula ikonu — büyük, "arıyor" varyantı (§TASARIM-STANDARDI 5.21)]
[Kısa mesaj: "Bu sayfa yok / bulunamadı."]
[Ana sayfaya dön] [HVAC Pro Suite] [Soğuk Hava Deposu]  (dar: dikey, geniş: yatay)
[Footer]
```

**Bileşenler:** hero benzeri sade blok · 3 bağlantı (buton stilinde) · footer.

**Durumlar:** Bu ekranın kendisi sitenin **hata** durumudur; ayrıca kendi içinde
boş/yükleniyor/başarı yok.

**Erişilebilirlik:** Kök-mutlak yollar (her derinlikte doğru çalışır), `<h1>` "Sayfa
bulunamadı" (İngilizce sürümde `<html lang="en">` + kendi mesajı). Sunucu **gerçek
404 durum kodu** döndürmeli (D-005: çıkış kodu/"başarılı" görünümü kanıt değildir,
ilk yayında gerçek istekle doğrulanır — bu bir yayın/altyapı kontrolü, tasarım
dosyasının değil ama burada hatırlatılır çünkü görsel doğru olsa da durum kodu yanlışsa
SEO ve güven zarar görür).

**Etkileşim:** Üç bağlantı, hepsi eşit ağırlıkta (tek baskın eylem kuralı burada da
istisna: kaybolan ziyaretçiye tek bir yol dayatmak yanlış olur).
