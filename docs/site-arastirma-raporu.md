# Dijital Pusula — Ürün Satan Siteye Dönüşüm Araştırma Raporu

**Tarih:** 2026-09-08
**Kapsam:** `https://biltekinhamza.github.io/dijital-pusula/` sitesinin, "özel yazılım ajansı" tanıtım sitesinden **iki gerçek ürünü yayınlayan ve satan** bir ürün sitesine dönüştürülmesi.
**Ürünler:** HVAC Pro Suite (çok kiracılı havalandırma/sac imalat teklif-sipariş SaaS'i) ve Soğuk Hava Deposu (detayları netleşmemiş).
**Kısıtlar:** GitHub Pages statik barındırma, sunucu yok, veritabanı yok, ücretli bağımlılık yok, TR/EN çift dil korunacak, vanilla HTML/CSS/JS, build adımı yok.

> Bu rapor araştırma çıktısıdır. Hiçbir site dosyası değiştirilmemiştir. Yasal bölümdeki
> "Doğrulanmadı" işaretli maddeler mali müşavir/avukat teyidi olmadan uygulanmamalıdır.

---

## 1. Özet — Temelde ne değişiyor?

Şu anki site bir **ajans sitesi**dir: ziyaretçiyi "bu ekip benim için yazılım yapabilir mi?" sorusuna ikna etmeye çalışır. Satılan şey belirsiz bir hizmettir; fiyat yoktur, ürün yoktur, dönüşüm hedefi tek bir `mailto:` formudur.

Hedeflenen site bir **ürün sitesi**dir: ziyaretçiyi "bu ürünü deneyeyim mi / bu ürüne ayda şu kadar ödeyeyim mi?" sorusuna ikna eder. Bu, kozmetik bir düzenleme değil, sitenin işinin değişmesidir. Somut sonuçları:

| Boyut | Bugün (ajans) | Hedef (ürün) |
|---|---|---|
| URL yapısı | Tek sayfa + `#anchor` | Ürün başına ayrı URL (`/hvac-pro-suite/`, `/fiyatlandirma/`) |
| Navigasyon | Hizmetler / Çözümler / Teknolojiler | Ürünler / Fiyatlandırma / Destek / Giriş |
| Birincil CTA | "Teklif Al" → mailto | "Ücretsiz Dene" → uygulamadaki kayıt ekranı |
| İçerik kanıtı | Yetkinlik iddiaları, "örnek konsept" kartları | Gerçek ekran görüntüleri, sayısal limitler, fiyat |
| Sosyal kanıt | Yok | Yok — ve **uydurulmayacak** (bkz. Bölüm 6) |
| Yasal yüzey | Gizlilik + çerez + kullanım koşulları taslakları | ETHS bilgi verme yükümlülüğü, KVKK aydınlatma, ETBİS, muhtemelen mesafeli satış seti |
| Barındırma | GitHub Pages | GitHub Pages **kullanım şartları açısından riskli** (bkz. P0) |
| Dil | Tek URL'de JS ile TR/EN | Ayrı URL'ler + `hreflang` (SEO için zorunlu) |

**Bu raporun en kritik üç bulgusu:**

1. **GitHub Pages, ticari SaaS pazarlama/satış sitesi barındırmayı kullanım şartlarında açıkça yasaklıyor.** (Bölüm 7, P0) Ücretsiz ve doğrudan alternatifi var: Cloudflare Pages.
2. **Türkiye'de kendi e-ticaret ortamında hizmet satan bir sağlayıcının sitesinde "İletişim" başlığı altında göstermesi zorunlu, adı adı sayılmış bir bilgi listesi var** — MERSİS/vergi kimlik no, merkez adresi, **KEP adresi** dahil. Bugünkü footer'da bunların hiçbiri yok (yer tutucular var). (Bölüm 5)
3. **Ödeme tahsilatı henüz yok.** Bu bir eksik değil, bir *tasarım kısıtı*: fiyat sayfası "Satın Al"a değil, "Ücretsiz Dene" + "Aboneliğe geç: bizimle iletişime geçin"e çıkmalı. Bunu dürüstçe söylemek, kapalı bir checkout'tan daha iyi dönüşür.

---

## 2. Referans araştırması — Karşılaştırılabilir ürünler ne yapıyor?

### 2.1 Türkiye — B2B SaaS / KOBİ dikey yazılımı

| Vendor | Fiyat açık mı? | KDV gösterimi | Deneme | Birincil CTA | Dikkat çeken bölümler |
|---|---|---|---|---|---|
| **Paraşüt** | Evet, 2 paket | **"+ KDV"** (hariç) | 14 gün, kart istemiyor | "Ücretsiz Deneyin" / "Hemen Başvurun" | Aylık↔Yıllık, "6.120₺ + KDV daha hesaplı", e-kontör paketleri, 4.7/5 · 2097 yorum, "Yerli Üretim", SSS |
| **Bizim Hesap** | Evet, 2 paket | **"+ KDV"** | 14 gün | "14 Gün Ücretsiz Deneyin" | Yıllık/aylık yan yana + tasarruf tutarı, tam karşılaştırma tablosu, 9 maddelik SSS, FAQPage schema |
| **ikas** | Evet, 4 paket + 1 "custom" | **"+KDV"** | Ücretsiz "Start" planı (₺0 ömür boyu) | "Ücretsiz E-Ticaret Siteni Aç" / üst paketlerde "Sizi Arayalım" | Uzun özellik matrisi, "En Çok Tercih Edilen" rozeti, +100.000 kullanıcı, TOBB/ŞikayetVar ödülleri |
| **Kolay İK** | **Hayır** — "Şirketinize özel teklif alın" | Yok | 15 gün (form sonrası) | "Hemen Teklif Alın" | Kişi başı ücretlendirme anlatımı, ISO 27001/9001/27701, "2.000+ şirket", iyzico ile ödeme notu |
| **Logo** | **Hayır** | — | Yok | "Fiyat Al" | 200.000+ işletme, 15+ vaka çalışması, iş ortağı ağı, Destek Merkezi + Logo Akademi |
| **DentSoft** (küçük dikey SaaS) | Evet, 3 paket, kullanıcı başı €| — | Yok | "Fiyat Bilgisi Alın" → **WhatsApp** | Pen-test iddiası, günlük yedek vaadi, ücretsiz online eğitim (3 seans), e-Fatura/e-Arşiv/İYS uyumu vurgusu |

**Türkiye deseninden çıkan kurallar:**
- B2B'de fiyat **her zaman "+ KDV"** yazılır (KDV hariç). Tüketiciye satışta "KDV dahil" yazılır. Sizin alıcınız firma → **"+ KDV"**.
- Aylık ve yıllık **aynı ekranda** gösterilir ve yıllığın tasarrufu **TL cinsinden** yazılır ("yıllıkta 4.560 ₺ tasarruf"), yüzde olarak değil.
- Self-servis KOBİ ürünlerinde fiyat açıktır ve **14–15 gün** deneme vardır. Satış temsilcisi gerektiren/kişi başı fiyatlı ürünlerde "Teklif Al" tercih edilir.
- En üst paket neredeyse her zaman **"Sizi Arayalım" / "Teklif Alın"** olur — fiyat yazılmaz.
- Küçük satıcılar **WhatsApp**'ı birincil iletişim kanalı yapıyor (DentSoft). Türkiye KOBİ pazarında bu bir zayıflık değil, avantaj.
- "Yerli üretim" / "yerli yazılım" rozeti Türkiye'de gerçek bir güven sinyali (Paraşüt, Kolay İK).

### 2.2 Uluslararası — İnşaat/HVAC/imalat keşif-teklif dikeyi

| Vendor | Model | Fiyat | Bölüm sırası (ana sayfa/fiyat) |
|---|---|---|---|
| **Jobber** (KOBİ, self-servis) | Ürün-öncelikli | Açık, 4 kademe | Hero → ekip boyutu + faturalama seçici → plan kartları → **plan sihirbazı** → karşılaştırma tablosu → tek müşteri sözü → eklentiler → çok şubeli CTA → SSS → footer. CTA: "Try Jobber For Free", "Book A Demo". "No credit card required", 14 gün, 4.9/5 · 153 yorum |
| **ServiceTitan** (kurumsal, satış-öncelikli) | Demo-kapılı | **Yayınlanmıyor** | Hero → müşteri logo şeridi → sekmeli özellik bloğu → video → ticari/konut karşılaştırma → metrik karuseli (+%5 net kâr, +10M$ ciro) → vaka çalışmaları → entegrasyonlar → demo formu → footer. CTA: "Get Demo" |
| **QuoteSoft** (sac/kanal keşif yazılımı — sizin en yakın işlevsel muadiliniz) | Satış-öncelikli | **Yayınlanmıyor** | Kampanya bandı → ürün anlatımı → **"Excel ile karşılaştırma"** → benzersiz özellikler → aboneliğe dahil olanlar → çok kullanıcı/ağ → dahil olan her şey → **"rakip yazılımdan geçiş"** bölümü → teknik destek aboneliği → footer. CTA: "Contact Sales", "Live Web Demo" |

**Uluslararası desenden çıkan, sizin için doğrudan kullanılabilir üç fikir:**

1. **"Excel ile karşılaştırma" bölümü.** QuoteSoft'un ana ürün sayfasındaki en güçlü bölümü bu. HVAC Pro Suite'in gerçek rakibi başka bir yazılım değil, **atölyedeki Excel tablosu ve elle hesap**. Bir "Excel'de nasıl / HVAC Pro Suite'te nasıl" tablosu, soyut özellik listesinden çok daha ikna edicidir.
2. **"Mevcut sisteminizden geçiş" bölümü.** Yeni müşterinin en büyük engeli veri taşıma (malzeme fiyat listesi, işçilik oranları). Bunu bir bölüm olarak ele almak, engelin kendisini satış argümanına çevirir.
3. **Sayısal sonuç iddiası yerine sayısal ürün gerçeği.** ServiceTitan "+%9 teknisyen başına ciro" diyebiliyor çünkü müşteri verisi var. Sizde yok. Yerine: "43 parça tipi", "her parça için ayrı sac açınım formülü", "teklif PDF'i 3 saniyede" gibi **ürünün kendisine ait ölçülebilir gerçekler** kullanın. (Bölüm 6)

---

## 3. Önerilen site mimarisi

### 3.1 Sayfa haritası

```
/                                   Ana sayfa — ürün vitrini
/hvac-pro-suite/                    Ürün sayfası (uzun, tam anlatım)
/hvac-pro-suite/fiyatlandirma/      Fiyat + paket karşılaştırma
/soguk-hava-deposu/                 Ürün sayfası (içerik netleşince)
/entegrasyonlar/                    Paraşüt, e-Fatura, Android, (ileride ödeme)
/guvenlik/                          Veri güvenliği, yedekleme, kiracı izolasyonu, KVKK
/destek/                            Yardım/başlangıç kılavuzu + destek kanalları
/surum-notlari/                     Changelog (geliştirilen her sürüm)
/yol-haritasi/                      Roadmap — "yapılıyor / planlandı" (P2)
/hakkimizda/                        Kim geliştiriyor, neden
/iletisim/                          Form + doğrudan kanallar + zorunlu firma bilgileri
/yasal/kvkk-aydinlatma-metni/
/yasal/gizlilik-politikasi/
/yasal/cerez-politikasi/
/yasal/kullanim-kosullari/
/yasal/mesafeli-satis-sozlesmesi/   (satış/tahsilat açıldığında)
/yasal/on-bilgilendirme-formu/      (satış/tahsilat açıldığında)
/en/...                             Tüm yapının EN aynası
```

GitHub Pages'te bunlar klasör + `index.html` olarak yapılır (`/hvac-pro-suite/index.html`), böylece build adımı gerekmez ve URL'ler `.html` uzantısız olur.

### 3.2 Hangi bölüm nerede?

| Bölüm | Ana sayfa | Ürün sayfası | Not |
|---|:---:|:---:|---|
| Hero (tek cümlelik değer önerisi + 2 CTA) | ✔ | ✔ | Ana sayfada "iki ürün", ürün sayfasında "bu ürün" |
| Ürün vitrini (2 kart: HVAC / Soğuk Hava) | ✔ | — | Ana sayfanın *asıl* işi |
| Kime göre? (hedef kitle netleştirme) | ✔ kısa | ✔ uzun | "Havalandırma kanalı imalatçısı, sac işleme atölyesi, taahhüt firması" |
| Problem → çözüm anlatımı | ✔ kısa | ✔ uzun | |
| **Excel/elle hesap karşılaştırması** | — | ✔ | En güçlü bölüm |
| Özellik blokları (3–6 adet, ekran görüntülü) | ✔ 3 tanesi | ✔ hepsi | |
| Ürün turu / ekran görüntüsü galerisi | ✔ 1 görsel | ✔ galeri | **Zorunlu.** Ekran görüntüsü olmayan SaaS sitesi satmaz |
| Nasıl çalışır (3–4 adım) | ✔ | ✔ | |
| Entegrasyonlar | ✔ logo şeridi | ✔ | Paraşüt gerçek bir entegrasyon — öne çıkarın |
| Fiyatlandırma | ✔ özet 3 kart | ✔ tam tablo | Ana sayfada özet + "Tüm detaylar" linki |
| Güvenlik & veri | — | ✔ özet + link | Ayrı `/guvenlik/` sayfası |
| SSS (satın alma itirazlarını yanıtlayan) | ✔ 4–5 soru | ✔ 8–12 soru | FAQPage schema |
| Sosyal kanıt | ✔ (dürüst versiyonu) | ✔ | Bölüm 6 |
| Changelog / Yol haritası | ana sayfada link | ✔ link | Yeni satıcı için **en güçlü canlılık sinyali** |
| Destek & dokümantasyon | footer | ✔ link | |
| Son CTA bandı | ✔ | ✔ | |
| İletişim formu | ✔ | ✔ link | |
| **Yasal firma bilgileri** | footer | footer | Bölüm 5 — zorunlu |
| Ajans/özel yazılım hizmetleri | ↓ küçültülüp `/hakkimizda/` altına | — | Silinmesin; ikincil gelir kanalı ama **ana sayfayı işgal etmemeli** |

### 3.3 Navigasyon

```
Logo | Ürünler ▾ | Fiyatlandırma | Destek | Hakkımızda | TR/EN | [Ücretsiz Dene]
        ├ HVAC Pro Suite
        ├ Soğuk Hava Deposu
        └ Özel Yazılım & Otomasyon  ← eski ajans içeriği buraya iner
```

Bugünkü 8 maddelik menü (Ana Sayfa / Hakkımızda / Hizmetler / Çözümler / Projeler / Çalışma Sürecimiz / Teknolojiler / İletişim) ürün sitesi için fazla kalabalık ve hepsi aynı sayfaya çıkıyor. Ürün sitelerinde menü **4–5 madde + 1 renkli CTA butonu**dur (Jobber, Paraşüt, ikas hepsi böyle).

Sağ üstteki buton bugün "Teklif Al". Ürün sitesinde **"Ücretsiz Dene"** olmalı ve doğrudan HVAC Pro Suite'in `/register` ekranına gitmeli.

---

## 4. Bölüm bölüm öneriler (somut metin yönü ile)

### 4.1 Ana sayfa hero

**Yapmayın:** "İşletmenize Özel Yazılım ve Akıllı Otomasyon Çözümleri" — bu cümle 10.000 ajans sitesinde var, hiçbir şey vaat etmiyor.

**Yapın:** Kimin, hangi işini, ne kadar hızlı yaptığını söyleyin.

> **Havalandırma kanalı teklifini dakikalar içinde, elle hesapsız çıkarın.**
> HVAC Pro Suite; sac açınım hesabını, malzeme ve işçilik maliyetini, kâr oranını ve
> müşteriye gidecek PDF teklifi tek akışta üretir. Müşterileriniz kendi sipariş
> sayfanızdan doğrudan talep girer.
>
> [Ücretsiz Dene]  [Ürünü İncele]
> *Kurulum yok · Kredi kartı istemiyoruz*

Hero altına küçük bir "gerçeklik satırı": `Sac açınım motoru · Çok kullanıcılı panel · PDF teklif · Paraşüt entegrasyonu · Android uygulama`

### 4.2 Ürün vitrini (ana sayfa)

İki kart. Her kart: ürün adı, tek satır tanım, 3 madde, durum rozeti, "İncele" linki.

**Durum rozeti dürüstlüğü önemli.** HVAC Pro Suite çalışıyor → rozet yok veya "Yayında". Soğuk Hava Deposu henüz netleşmemiş → **"Yakında" / "Erken erişim"** rozeti ve "haber verilsin" formu. Bitmemiş ürünü bitmiş gibi göstermek, ilk müşteride güveni sıfırlar.

### 4.3 "Excel yerine" karşılaştırma bölümü (ürün sayfası)

QuoteSoft'un yaptığı iş. İki sütun tablo:

| Bugün Excel / elle | HVAC Pro Suite ile |
|---|---|
| Her parça için açınım formülünü elle veya ayrı tabloda hesaplıyorsunuz | Parça tipini seçip ölçüyü giriyorsunuz; açınım, fire ve kg otomatik |
| Sac fiyatı değişince tüm tabloları tek tek güncelliyorsunuz | Malzeme fiyatını bir yerde güncelliyorsunuz, tüm yeni teklifler etkileniyor |
| Teklif PDF'ini Word'de elle biçimlendiriyorsunuz | Kendi firma bilgilerinizle PDF tek tıkla |
| Müşteri talebi telefonda/WhatsApp'ta kayboluyor | Müşteri kendi sipariş sayfanızdan giriyor, sisteme düşüyor |
| Fiyatı kim değiştirdi belli değil | Kullanıcı rolleri: maliyet ve kâr oranını sadece yönetici değiştirebilir |

Bu tablodaki her satır **kodda gerçekten var olan** bir davranışa karşılık gelmeli. Olmayan satırı yazmayın.

### 4.4 Özellik blokları

Her blok: **kısa başlık + 2 cümle + 1 gerçek ekran görüntüsü**. Öneri sıra (HVAC Pro Suite için):

1. **Sac açınım ve maliyet motoru** — parça tipi bazlı hesap, fire payı, kenet/dilim payları, minimum m² kuralı.
2. **Müşteri sipariş sayfası** — her firmaya özel bağlantı (`/s/firma-adi`), müşteri kendi ölçüsünü girer.
3. **Teklif ve sipariş paneli** — kalem ekleme, kâr oranı, nakliye, PDF.
4. **Firma bazlı izolasyon ve kullanıcı rolleri** — her firmanın malzemesi ve işçilik oranı kendine ait; sahibi/yönetici/personel ayrımı.
5. **Paraşüt entegrasyonu** — teklifi Paraşüt'e satış teklifi olarak aktarma.
6. **Android uygulaması** — sahada hesap.

**Ekran görüntüsü kritik.** Bugün sitede `assets/images/` altında sadece soyut SVG çizimler var. Gerçek uygulamadan alınmış, gerçek (ama anonimleştirilmiş) verili ekran görüntüleri olmadan bu site "ürün var" demiyor, "ürün olacak" diyor.

### 4.5 SSS — satın alma itirazlarını yanıtlayan

Bugünkü SSS "proje süreci" hakkında (ajans SSS'i). Ürün SSS'i **itiraz kırar**. Yazılacak sorular:

- Verilerim kimde duruyor, sunucular nerede?
- Aboneliği bırakırsam verilerim ne olur, dışa aktarabilir miyim?
- Mevcut malzeme fiyat listemi Excel'den aktarabilir miyim?
- Kaç kullanıcı ekleyebilirim?
- Kendi firma bilgilerim/logom teklifte görünür mü?
- Faturayı nasıl alıyorum? (e-Arşiv/e-Fatura)
- Deneme süresi bitince ne oluyor, verim siliniyor mu?
- İnternet olmadan çalışır mı? / Mobil uygulama neyi yapıyor?
- Özel bir parça tipim var, eklenebilir mi? (→ ajans tarafına köprü)
- Fiyat neye göre artar? Sözleşme süresi var mı?

Bu soruların bir kısmının cevabı **bugün üründe yok** (veri dışa aktarma, Excel içe aktarma, ödeme, kendi logosu). SSS'i yazmak, hangi ürün eksiklerinin satışı bloke ettiğini de ortaya çıkarır — bu, bu araştırmanın ikinci faydası.

### 4.6 Changelog ve yol haritası

Tek kişilik bir satıcı için **en ucuz ve en etkili güven unsuru** budur. `/surum-notlari/` sayfası, tarih + 3–5 maddelik değişiklik listesi. İki ay üst üste güncellenmiş bir changelog, "bu ürün terk edilmemiş" mesajını hiçbir metnin veremeyeceği kadar net verir. Statik sitede maliyeti sıfırdır.

### 4.7 İletişim ve form

`mailto:` bir ürün sitesi için yetersiz: mobilde çoğu kullanıcıda e-posta uygulaması yapılandırılmamıştır ve gönderim doğrulanamaz. Statik sitede seçenekler:

| Servis | Ücretsiz kota | Sunucu konumu | Not |
|---|---|---|---|
| **Web3Forms** | 250 gönderim/ay, sınırsız form/alan adı, hCaptcha dahil | **ABD (US-East)**, AB veri yerleşimi seçeneği yok; DPA yayınlanmış | Kayıtsız/anahtar bazlı, statik site için en pratik |
| **Formspree** | 50 gönderim/ay | AWS ABD; SOC 2 Type II, SCC'li GDPR taahhüdü | Kota düşük |
| **FormSubmit** | Kayıt gerektirmez | Belirsiz | Belge/DPA zayıf — ticari site için **önerilmez** |
| **mailto:** (bugünkü) | — | Yok (veri siteye hiç gitmez) | KVKK açısından en temiz, dönüşüm açısından en zayıf |

**KVKK sonucu:** Üçüncü taraf form servisi kullanmak, ziyaretçinin ad/e-posta/telefonunu **yurt dışına aktarmak** demektir. 6698 sayılı Kanun'un 9. maddesi 12/3/2024 tarihli 7499 sayılı Kanun'la değiştirildi ve 1/6/2024'te yürürlüğe girdi; artık aktarım için ya yeterlilik kararı, ya uygun güvence (standart sözleşme / bağlayıcı şirket kuralları), ya da istisna gerekiyor. Standart sözleşme metinleri Kurul'un 4/6/2024 tarihli 2024/959 sayılı kararıyla kabul edildi ve **imzalanmasından itibaren 5 iş günü içinde Kuruma bildirilmesi** gerekiyor.

**Pratik öneri:** Formu iki katmanlı yapın —
- Birincil: **WhatsApp bağlantısı** ve **doğrudan e-posta adresi** (aktarım yok, KVKK yüzeyi minimum, Türkiye KOBİ pazarında en yüksek yanıt oranı — DentSoft aynen böyle yapıyor).
- İkincil: form. Eğer form servisi kullanılacaksa, aydınlatma metninde **hangi servis, hangi ülke** açıkça yazılmalı ve yurt dışı aktarım dayanağı kurulmalı. Kurulamıyorsa `mailto:` ile kalın.

Formun yanına **ayrı bir onay kutusu** koymayın refleksle: KVKK'da açık rıza tek dayanak değildir; iletişim formu için genellikle "sözleşmenin kurulması" veya "meşru menfaat" dayanağı yeterlidir ve gereksiz rıza istemek hatalı bir uygulamadır. Zorunlu olan **aydınlatma**dır (kim veri sorumlusu, hangi amaç, hangi hukuki sebep, nereye aktarılıyor). Ayrı açık rıza kutusu **sadece** "size kampanya/duyuru e-postası göndereyim mi?" için gerekir.

---

## 5. Fiyatlandırma sunumu

### 5.1 Pazar gerçeği (Bölüm 2'den damıtılmış)

- **Şeffaf fiyat + deneme** = self-servis KOBİ ürünü (Paraşüt, Bizim Hesap, ikas, Jobber).
- **"Teklif Al"** = kişi/ölçek bazlı fiyat, satış görüşmesi gerekiyor (Kolay İK, Logo, ServiceTitan, QuoteSoft).
- HVAC Pro Suite **self-servis** bir üründür (kayıt → deneme → kullanım). Dolayısıyla **fiyat açık yazılmalı.** Fiyat gizlemek, bu ölçekte bilinmeyen bir satıcı için dönüşümü düşürür: ziyaretçi "pahalıdır" varsayıp kapatır.

### 5.2 Önerilen fiyat bölümü yapısı

```
[Başlık]  Basit ve öngörülebilir fiyatlandırma
[Alt]     Tüm paketler 7 gün ücretsiz denemeyle başlar. Kredi kartı istemiyoruz.

[Seçici]  ( Aylık )  ( Yıllık — 2 ay hediye )      ← tek satır, tıklanabilir

┌──────────────┐ ┌──────────────────────┐ ┌──────────────┐
│ Başlangıç    │ │ Profesyonel   POPÜLER│ │ Kurumsal     │
│ X.XXX ₺ +KDV │ │ X.XXX ₺ +KDV /ay     │ │ Fiyat için   │
│ /ay          │ │                      │ │ görüşelim    │
│ 2 kullanıcı  │ │ 10 kullanıcı         │ │ Sınırsız     │
│ ✔ ...        │ │ ✔ ... ✔ Paraşüt      │ │ ✔ Özel parça │
│ [Ücretsiz    │ │ [Ücretsiz Dene]      │ │ [Bizi Arayın]│
│  Dene]       │ │                      │ │              │
└──────────────┘ └──────────────────────┘ └──────────────┘

[Not]     Fiyatlara KDV dahil değildir. Fiyatlar 08.09.2026 tarihinde güncellenmiştir.
[Not]     Ödeme şu an banka havalesi/EFT ile alınmakta ve karşılığında e-Arşiv fatura
          düzenlenmektedir. Online kart ile ödeme yakında eklenecektir.

[Tablo]   Tam özellik karşılaştırması (satır: özellik, sütun: paket)
[SSS]     Faturalama, iptal, deneme sonrası, kullanıcı ekleme, fiyat artışı
```

### 5.3 Somut kararlar

| Karar | Öneri | Gerekçe |
|---|---|---|
| Para birimi | **TL** | Hedef kitle Türk imalatçı. DentSoft'un € kullanması bir istisna ve KOBİ'de dirençle karşılanır. |
| KDV gösterimi | **"+ KDV"** (hariç), kart altında "Fiyatlara KDV dahil değildir" | Alıcı firma; KDV'yi indirim konusu yapıyor. Paraşüt/Bizim Hesap/ikas hepsi böyle. |
| Aylık/yıllık | İkisi de, **seçici ile**, yıllık tasarrufu **TL cinsinden** yaz | Bizim Hesap: "yıllıkta 4.560 ₺ tasarruf" |
| Kademe sayısı | **3** (+ ücretsiz deneme) | 2 az, 5 kafa karıştırıcı. Ortadaki "Popüler" işaretlensin. |
| Kademe farkı ne olacak? | **Kullanıcı sayısı** birincil, **Paraşüt entegrasyonu + özel parça talebi** ikincil | Kodda bugün sadece `TRIAL_USER_LIMIT = 2` fiilen uygulanıyor; `pro`/`enterprise` etiket düzeyinde. Fiyat sayfasında yazdığınız limit, **ürün tarafında zorlanmıyorsa yazmayın** — yazdığınız her limit bir söz. |
| Deneme süresi | Kodda **7 gün** (`TRIAL_TERM_DAYS = 7`). Piyasa normu **14–15 gün** | 7 gün, imalat sezonunda ürünü değerlendirmeye yetmeyebilir. 14 güne çıkarmak dönüşümü artırır; en azından "uzatma isteyin" yolunu yazın. |
| En üst kademe | Fiyat yazma, **"Bizi Arayın"** | Tüm referanslarda böyle; ayrıca sizin için özel parça/entegrasyon işine köprü. |
| Birincil CTA | **"Ücretsiz Dene"** → uygulamanın `/register` ekranı | Checkout yok. Deneme, ödeme olmadan çalışan **gerçek** bir akış. |
| İkincil CTA | **"Demo İsteyin"** → iletişim / WhatsApp | Ekranı görmek isteyen ama kayıt olmak istemeyen için |
| Ödeme yokluğu | **Açıkça yazın** | "Havale/EFT ile, faturalı" cümlesi kurumsal alıcıyı rahatlatır; sessiz kalmak şüphe uyandırır. |
| Fiyat tarihi | Kart altına "Fiyatlar GG.AA.YYYY tarihinde güncellenmiştir" | Statik sitede fiyatın bayatlaması en sık hata; tarih hem dürüstlük hem kendinize hatırlatma. |

### 5.4 Yıllık abonelik ve iade

Ödeme tahsilatı yokken bile **iptal/iade politikanızı yazın**: "Yıllık ödemede ilk 14 gün içinde iade, sonrasında kalan dönem iade edilmez" gibi. Jobber bunu SSS'inde açıkça yapıyor. Yazılı politikası olmayan satıcı, ilk anlaşmazlıkta hem parayı hem müşteriyi kaybeder.

---

## 6. Yasal yükümlülükler (TR)

> **Uyarı:** Aşağıdaki "Doğrulandı" maddeleri birincil kaynak (mevzuat metni / kurum sayfası)
> ile teyit edilmiştir. "Doğrulanmadı" maddeleri yorum içerir ve **mali müşavir/avukat teyidi
> gerektirir**. Bu bölüm hukuki görüş değildir.

### 6.1 ✅ DOĞRULANDI — Sitede gösterilmesi zorunlu firma bilgileri

**Elektronik Ticaret Aracı Hizmet Sağlayıcı ve Elektronik Ticaret Hizmet Sağlayıcılar Hakkında Yönetmelik** (RG 29/12/2022, 32058), **MADDE 5** — ETHS kendine ait elektronik ticaret ortamının ana sayfasında, **"İletişim" başlığı altında doğrudan erişilebilir** şekilde şunları bulundurur:

> **a)** Tacir için **ticaret unvanı, MERSİS numarası ve merkez adresi**; esnaf ve sanatkâr için **adı ve soyadı, vergi kimlik numarası ve merkez adresi**.
> **b)** **KEP adresi, elektronik posta adresi, telefon numarası** ve varsa işletme adı ile tescilli markası.
> **c)** Mensubu olduğu meslek odası, meslekle ilgili davranış kuralları ve bunlara elektronik olarak ne şekilde ulaşılabileceğine ilişkin bilgiler.

Aynı Yönetmelik **MADDE 4**, ETHS'yi "elektronik ticaret pazar yerinde ya da **kendine ait elektronik ticaret ortamında** mal veya hizmetlerinin teminine yönelik **sözleşme yapan ya da sipariş alan** hizmet sağlayıcı" olarak tanımlar. **MADDE 34** ile 26/8/2015 tarihli 29457 sayılı eski Yönetmelik yürürlükten kaldırılmıştır (internette dolaşan eski listeler geçersiz).

**Şahıs şirketi vs. limited farkı — doğrudan bu maddeden çıkıyor:**

| | Şahıs (esnaf/sanatkâr) | Şahıs (tacir) / Limited / A.Ş. |
|---|---|---|
| Kimlik | Ad + Soyad | Ticaret unvanı |
| Numara | **Vergi kimlik numarası** | **MERSİS numarası** |
| Adres | Merkez adresi | Merkez adresi |
| KEP | Zorunlu | Zorunlu |
| E-posta, telefon | Zorunlu | Zorunlu |

> ⚠️ Not: Vergi mükellefi bir şahıs işletmesi, TTK anlamında **tacir** de olabilir (esnaf sınırını aşan ticari işletme). Hangi kategoriye girdiğiniz — dolayısıyla MERSİS mi vergi no mu yazacağınız — **mali müşavirinize sorulmalıdır.**

**Bugünkü durum:** Footer'da `info@dijitalpusula.example`, `+90 (___) ___ __ __`, "Şirket adresi buraya eklenecek" yer tutucuları var. Yayın öncesi **P0**.

### 6.2 ✅ DOĞRULANDI — 6563 md. 3, bilgi verme yükümlülüğü

6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun md. 3, sözleşme kurulmadan **önce** alıcının kolayca ulaşabileceği ve güncel şekilde: sözleşmenin kurulması için izlenecek teknik adımlar, sözleşme metninin saklanıp saklanmayacağı ve sonradan erişilebilirliği, veri girişi hatalarının belirlenmesi ve düzeltilmesine ilişkin teknik araçlar, uygulanan gizlilik kuralları ve varsa alternatif uyuşmazlık çözüm mekanizmaları bilgisini sunma yükümlülüğü getirir. Kanunun "alıcı" tanımı **gerçek veya tüzel kişi**yi kapsar — yani B2B satış da bu kanunun kapsamındadır.

### 6.3 ✅ DOĞRULANDI — ETBİS

ETBİS'e kayıt, 6563 kapsamında **"hizmet sağlayıcı ve aracı hizmet sağlayıcılar faaliyete başlamadan önce"** yapılır (T.C. Ticaret Bakanlığı duyurusu). Yaptırım idari para cezasıdır.

### 6.4 ⚠️ DOĞRULANMADI — ETBİS, sadece tanıtım yapan siteyi kapsıyor mu?

Mevzuat, yükümlülüğü "elektronik ticaret" faaliyetine (sözleşme yapmak ya da sipariş almak) bağlıyor. **Salt tanıtım yapan, sipariş almayan ve ödeme toplamayan bir site** için açık bir hüküm bulunamadı. Ticaret Bakanlığı sayfası bu ayrımı açıkça yapmıyor.

**Sizin durumunuz tam olarak bu sınırda:** site fiyat gösterecek ve "Ücretsiz Dene" ile **başka bir alan adındaki uygulamaya** yönlendirecek. Sözleşme ve sipariş, pazarlama sitesinde değil uygulamada kuruluyor. Yine de:
- **Uygulamanın kendisi** (kayıt + abonelik) neredeyse kesinlikle ETHS'dir.
- Pazarlama sitesine fiyat + "abone ol" akışı eklendiği anda kapsam tartışması biter.

**Karar:** ETBİS kaydını yapmak, yapmamaktan çok daha ucuz. **Mali müşavir/avukata sorun; büyük ihtimalle "kaydol" diyecektir.**

### 6.5 ⚠️ DOĞRULANMADI (kısmen) — Mesafeli satış sözleşmesi / ön bilgilendirme / cayma hakkı

**Doğrulanan:**
- 6502 sayılı Kanun'da **tüketici**, "ticari veya mesleki olmayan amaçlarla hareket eden gerçek veya tüzel kişi"dir. 6502'nin "mal" tanımı, elektronik ortamda kullanılmak üzere hazırlanan yazılımı da kapsar.
- Mesafeli Sözleşmeler Yönetmeliği, satıcı/sağlayıcı ile **tüketici** arasındaki mesafeli sözleşmeleri düzenler.
- Yönetmelik md. 15/1-(ğ): **"elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar"** cayma hakkının istisnasıdır.

**Doğrulanmayan / yorum:**
- HVAC Pro Suite alıcısı bir **imalat firması**dır; ticari amaçla hareket eder → 6502 anlamında **tüketici değildir**. Bu yorum doğruysa, mesafeli satış sözleşmesi ve ön bilgilendirme formu **hukuken zorunlu değildir**. Bu **hukukçu teyidi gerektirir.**
- 2022 değişikliklerinden sonra, tüketicinin onayı alınmadan ani ifaya başlanan hizmetlerde cayma hakkının kullanılabildiği yönünde değerlendirmeler var — istisnaya güvenmeden önce teyit alın.

**Pratik öneri:** Zorunlu olmasa bile bir **"Abonelik Sözleşmesi / Hizmet Şartları"** metni yazın (süre, ücret, KDV, yenileme, iptal, veri sahipliği, SLA yokluğu, sorumluluk sınırı). Ödeme tahsilatı açıldığında ve/veya bireysel/serbest meslek alıcı ihtimali doğduğunda **mesafeli satış sözleşmesi + ön bilgilendirme formu** setini avukatla hazırlatın.

### 6.6 ✅ DOĞRULANDI — KVKK aydınlatma ve açık rıza

- **Aydınlatma yükümlülüğü** kişisel veri toplayan her veri sorumlusu için geçerlidir; VERBİS'ten muaf olmak aydınlatma yükümlülüğünü ortadan kaldırmaz.
- **Açık rıza tek dayanak değildir.** Sözleşmenin kurulması/ifası ve meşru menfaat da hukuki sebeptir; her işleme için rıza istemek hatalı uygulamadır. Açık rıza **ayrıştırılmış, bilgilendirilmiş ve özgür iradeyle** verilmiş olmalıdır ve hizmetin şartına bağlanamaz.
- **Uygulama:** İletişim formu için aydınlatma metni + hukuki sebep beyanı yeterlidir. Pazarlama e-postası için **ayrı** bir açık rıza kutusu gerekir.

### 6.7 ⚠️ DOĞRULANDI (ikincil kaynak) — VERBİS

Yıllık çalışan sayısı **50'den az** ve yıllık mali bilanço toplamı **100.000.000 TL'den az** olan, ana faaliyeti özel nitelikli veri işleme olmayan veri sorumluları VERBİS kayıt yükümlülüğünden istisnadır. Tek kişilik bir işletme bu istisnaya girer.
**Kaynak notu:** Bu eşikler hukuk bürosu özetlerinden alındı; Kurul kararlarıyla **değişebilir**. kvkk.gov.tr üzerinden güncel eşiği teyit edin. İstisna, **aydınlatma/güvenlik yükümlülüklerini kaldırmaz.**

### 6.8 ✅ DOĞRULANDI — Çerezler

KVKK "Çerez Uygulamaları Hakkında Rehber" (Aralık 2022) ve 2022/229, 2022/1358 sayılı Kurul kararları:
- Sitenin düzgün çalışması için **kesinlikle gerekli çerezler** açık rıza gerektirmez.
- **Reklam, pazarlama ve performans/analitik** amaçlı çerezler **açık rıza**ya tabidir.
- Rıza, açık bir **opt-in** mekanizmasıyla, aktif olumlayıcı eylemle alınmalı; kullanıcıyı onaya zorlayan tasarımlar kullanılmamalıdır.

**Uygulama:** Bugünkü site çerez kullanmıyor, sadece `localStorage`'da dil tercihi tutuyor — bu haliyle temiz ve **çerez banner'ı zorunlu değil**. Google Analytics eklendiği anda **opt-in banner + reddet seçeneği** zorunlu hale gelir. Bu, Bölüm 7'deki analitik önerisinin doğrudan gerekçesidir.

### 6.9 ✅ DOĞRULANDI — İYS / ticari elektronik ileti

- 6563 md. 6: Ticari elektronik iletiler alıcılara **ancak önceden onayları alınmak kaydıyla** gönderilebilir.
- **B2B istisnası:** Alıcının **tacir veya esnaf** olması hâlinde önceden onay alınması zorunlu değildir.
- **Ama:** İYS'de onayı bulunmayan alıcılara ticari elektronik ileti gönderilemez → tacir/esnaf alıcıların adreslerinin de **İYS'ye kaydedilmesi** gerekir.
- **Reddetme (opt-out) hakkı** tacir/esnaf için de vardır; ret geldiğinde gönderim durdurulmalıdır.

**Uygulama:** Siteye bir "bülten/duyuru" formu koyacaksanız İYS süreci başlar. **Koymayın** (P0 kapsamı dışına çıkarır) ya da İYS kaydını yapıp gönderim altyapısını ona göre kurun. Deneme başlatan kullanıcıya gönderilen **işlemsel** e-postalar (şifre sıfırlama, deneme bitiş uyarısı) ticari elektronik ileti değildir — ama pazarlama içeriği eklendiği anda olur.

### 6.10 ⚠️ DOĞRULANDI (ikincil kaynak) — Faturalama (e-Arşiv / e-Fatura)

- 1 Ocak 2026'dan itibaren e-Fatura mükellefi olmayan işletmelerce düzenlenen faturaların **tutarına bakılmaksızın e-Arşiv Fatura** olarak düzenlenmesi yönünde bir uygulamaya geçildiği belirtiliyor.
- e-Ticaret faaliyetinde bulunanlar için e-Fatura'ya geçiş ciro eşiği olarak **500.000 TL** telaffuz ediliyor.
- Şahıs şirketleri de şartları sağladıkları ölçüde zorunluluğa tabidir; sağlamasalar da isteğe bağlı geçebilirler (VUK 509 Sıra No'lu Genel Tebliğ).

**Kaynak notu:** Bu rakamlar Paraşüt/Mikro/Bizim Hesap gibi yazılım firmalarının blog içeriklerinden derlendi. Eşikler **her yıl değişiyor**. **Mali müşavirinizle teyit edin**; birincil kaynak ebelge.gib.gov.tr ve VUK 509 tebliğidir.

**Site tarafına yansıması:** Fiyat sayfasındaki SSS'de "Faturam nasıl düzenleniyor?" sorusuna net cevap: *"Ödemeniz sonrası firma bilgilerinize e-Arşiv/e-Fatura düzenlenir."*

### 6.11 Yasal metin seti — ne gerekiyor?

| Metin | Gerekli mi? | Neden |
|---|---|---|
| KVKK Aydınlatma Metni | **Evet, P0** | Form + iletişim verisi topluyorsunuz |
| Gizlilik Politikası | **Evet, P0** | Aydınlatmayla birleştirilebilir ama ayrı olması net |
| Çerez Politikası | **Evet, P0** (kısa) | Çerez yoksa "çerez kullanmıyoruz" da bir politikadır |
| Kullanım Koşulları (site) | Evet, P0 | Mevcut taslak güncellenmeli |
| Abonelik / Hizmet Şartları (ürün) | **Evet, P1** | Ürün satılıyor; süre, ücret, iptal, veri sahipliği |
| Mesafeli Satış Sözleşmesi | P1/P2 — **hukukçuya sorun** | Tüketiciye satış olacaksa zorunlu |
| Ön Bilgilendirme Formu | P1/P2 — aynı | Aynı koşul |
| İade / İptal Politikası | **Evet, P1** | Zorunlu olmasa da ticari olarak gerekli |
| Veri İşleme Ekki (DPA) | P2 | Kurumsal müşteri isteyebilir |

**Bugünkü metinler yetersiz:** `js/translations.js` içindeki `legal.privacy/cookies/terms` metinleri "Bu tanıtım sitesi kişisel verileri bir sunucuya göndermez" diyor ve kendileri "hukuk uzmanı tarafından değerlendirilmelidir" notunu taşıyor. Ürün satan bir sitede bu metinler artık **yanlış** olacak (fiyat, abonelik, üçüncü taraf form/analitik).

---

## 7. Güven ve dönüşüm unsurları — müşterisi olmayan satıcı ne yapar?

Bu, tek kişilik bir yazılım satıcısının en zor problemi. **Uydurulmayacak olanlar:** müşteri yorumu, müşteri logosu, "1.000+ firma kullanıyor", sahte yıldız, sahte vaka çalışması, olmayan ISO sertifikası, uydurma ödül. Bunlar hem etik dışı hem de küçük bir sektörde (Türkiye'de havalandırma imalatı dar bir çevredir) **çok hızlı yakalanır** ve tek seferde iflas ettirir.

### Yerine konabilecek, tamamen dürüst 12 unsur

| # | Unsur | Nasıl yapılır | Maliyet |
|---|---|---|---|
| 1 | **Gerçek ekran görüntüleri** | Uygulamadan, anonimleştirilmiş gerçek veriyle. Şablonsuz. | Düşük |
| 2 | **2–3 dakikalık ürün turu videosu** | Ekran kaydı + sesli anlatım. Cilalı olmasına gerek yok; *gerçek* olmasına var. | Düşük |
| 3 | **Canlı/interaktif demo hesabı** | Örnek verili bir demo firması: `/s/demo` sipariş sayfası ve demo panel girişi. Ziyaretçi kayıt olmadan dokunabilir. | Orta |
| 4 | **Changelog** | Tarihli sürüm notları. "Ürün yaşıyor" kanıtı. | Çok düşük |
| 5 | **Açık yol haritası** | "Yapılıyor / Planlandı / Değerlendiriliyor". Ödeme entegrasyonu, Excel içe aktarma gibi eksikleri **buraya** koyun. Eksiği yol haritasına koymak, gizlemekten çok daha güçlü bir sinyaldir. | Çok düşük |
| 6 | **Teknik derinlik göstererek uzmanlık kanıtı** | "Yuvarlak dirsek dilim açısı ve ek payı", "kare-yuvarlak geçişte eğik uzunluk", "minimum 1 m² faturalama ve istisnaları" gibi **sektörün içinden** ayrıntılar. Sektör insanı bunu okuyunca "bu adam işi biliyor" der. Genel pazarlama dili bunu asla yapamaz. | Düşük |
| 7 | **Hesaplama doğruluğu iddiasını test edilebilir yapmak** | "Formüller otomatik testlerle doğrulanır" + repo linki. Kaynak kodu açmadan da test sayısı/yaklaşım anlatılabilir. | Düşük |
| 8 | **Kim geliştiriyor sayfası** | Gerçek ad, fotoğraf, kısa geçmiş, LinkedIn/GitHub. Anonim bir marka, tek kişilik bir markadan **daha az** güvenilirdir. Türkiye KOBİ pazarında "kiminle konuşacağım" sorusunun cevabı budur. | Düşük |
| 9 | **Ulaşılabilirlik vaadi** | "Hafta içi 09:00–18:00, WhatsApp'tan aynı gün dönüş." ServiceTitan'ın 7/24'üyle yarışamazsınız; **sizinle doğrudan telefonda konuşulabilmesi** sizin avantajınız. | Düşük |
| 10 | **Veri güvenliği sayfası** | Ne yaptığınızı somut yazın: firma bazlı veri izolasyonu, şifreli bağlantı, yedekleme sıklığı, verinin bulunduğu ülke, "abonelik biterse verinize X gün erişebilirsiniz". Sertifika yok — **süreç var**, onu yazın. | Orta |
| 11 | **Erken kullanıcı programı** | "İlk 5 firmaya 1 yıl %50 indirim, karşılığında geri bildirim." Müşteri yokluğunu bir **teklife** çevirir; ayrıca ilk gerçek referanslarınızı üretir. | Düşük |
| 12 | **Risk azaltıcı cümleler** | "Kredi kartı istemiyoruz", "Taahhüt yok, aylık iptal", "Verilerinizi istediğinizde dışa aktarabilirsiniz" (— ancak bu **üründe yoksa yazmayın**). | Düşük |

### Ek: "Örnek Proje Konsepti" etiketi

Bugünkü sitede projeler `"Örnek Proje Konsepti"` etiketiyle sunuluyor — bu dürüst bir çözüm ve README'de de korunması isteniyor. **Ama ürün sitesinde bu etiket zarar verir:** HVAC Pro Suite bir konsept değil, çalışan bir üründür. Konsept kartlarını ajans bölümünde bırakın; iki gerçek ürünü konseptlerden **görsel olarak da net biçimde** ayırın.

---

## 8. SEO ve teknik

### 8.1 🔴 P0 — Barındırma: GitHub Pages kullanım şartları

GitHub'ın "Terms for Additional Products and Features" belgesi, GitHub Pages için:

> "GitHub Pages is intended to host static web pages, but primarily as a showcase for personal and organizational projects."
>
> "GitHub Pages is **not intended for or allowed to be used as a free web hosting service to run your online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions or providing commercial software as a service (SaaS)**."
>
> "Some monetization efforts are permitted on Pages, such as donation buttons and crowdfunding links."

Ayrıca teknik limitler: yayımlanan site **≤ 1 GB**, kaynak repo tavsiye edilen üst sınır **1 GB**, aylık **100 GB yumuşak bant genişliği** limiti.

**Değerlendirme:** Şu anki ajans tanıtım sitesi bu şartların içinde. **Fiyat sayfası + abonelik satışı + iki ticari SaaS ürününün pazarlaması** eklendiğinde site, tam olarak "commercial software as a service sağlamaya yönelmiş" tanımının içine girer. Yaptırım genelde uyarı e-postası + kapatma şeklindedir; ticari siteniz bir sabah kapanabilir.

**Öneri — Cloudflare Pages'e taşıyın:**
- Ücretsiz plan **ticari kullanıma açık**, statik istek/bant genişliği **sınırsız**, ayda 500 build.
- Aynı repodan otomatik dağıtım; **build adımı gerekmez** (statik dosyaları doğrudan yayınlar).
- Ücretsiz SSL + özel alan adı; Cloudflare Web Analytics ile çerezsiz analitik aynı panelde.
- Netlify ücretsiz planı da ticari projeye açık (100 GB/ay bant genişliği) — ikinci alternatif.
- **Not:** Repo GitHub'da kalabilir; değişen sadece yayın hedefi.

### 8.2 Özel alan adı

`biltekinhamza.github.io/dijital-pusula/` bir ürün satan site için ciddiyet kaybıdır ve alt-dizin olduğu için ayrıca teknik sorun üretir (kök `robots.txt`/`sitemap.xml` sizin değil, GitHub'ın kökünde olur). **Kendi alan adınızı alın** (örn. `dijitalpusula.com` veya doğrudan ürün adına `hvacprosuite.com`). Apex için `A`/`ALIAS`/`ANAME`, `www` için `CNAME` kaydı gerekir.

**Karar noktası:** Tek marka altında iki ürün (`dijitalpusula.com/hvac-pro-suite/`) mi, yoksa ürün başına ayrı alan adı mı? Tek kişilik yapıda **tek alan adı + ürün alt dizinleri** doğru seçimdir: SEO otoritesi bölünmez, yasal metinler ve footer tek yerde durur, bakım maliyeti bir.

### 8.3 URL yapısı ve dil

**Bugün:** Tek `index.html`, dil `localStorage` + JS ile değişiyor. Bu, SEO açısından **iki dilin de indekslenmemesi** demektir — Google tek URL görür, tek dil indeksler.

**Yapılacak:** Her dil için ayrı URL:
```
/hvac-pro-suite/            (TR)
/en/hvac-pro-suite/         (EN)
```
Her sayfanın `<head>`'ine karşılıklı `hreflang` (her sürüm **kendisini de** listeler) + `x-default`:
```html
<link rel="alternate" hreflang="tr" href="https://alan-adi.com/hvac-pro-suite/">
<link rel="alternate" hreflang="en" href="https://alan-adi.com/en/hvac-pro-suite/">
<link rel="alternate" hreflang="x-default" href="https://alan-adi.com/hvac-pro-suite/">
```
Ve `<html lang="tr">` / `<html lang="en">` statik olarak doğru yazılmalı. `translations.js` altyapısı korunabilir — ama **sayfa yüklenirken doğru dil HTML'de basılı olmalı**, JS sonradan değiştirmemeli. Build adımı olmadığından bu, TR ve EN HTML dosyalarının paralel tutulması demektir; çeviri sözlüğü tek dosyada kalmaya devam edebilir ve JS yalnızca dil **değiştirme bağlantısı** olarak kullanılır.

### 8.4 Yapısal veri (schema.org)

Bugün sadece `Organization` var. Ürün sitesi için katman katman:

| Sayfa | Tip | Notlar |
|---|---|---|
| Tüm sayfalar | `Organization` | `name`, `url`, `logo`, `email`, `telephone`, `address` (PostalAddress), `vatID`/`taxID`, `sameAs` (LinkedIn/GitHub) |
| Ürün sayfası | **`SoftwareApplication`** | `applicationCategory: "BusinessApplication"`, `operatingSystem: "Web Browser"`, `featureList`, `screenshot`, `softwareVersion` |
| Fiyat sayfası | `SoftwareApplication` + **`AggregateOffer`** | Birden çok paket olduğu için `Offer` değil `AggregateOffer`: `lowPrice`, `highPrice`, `priceCurrency: "TRY"`. Freemium olsaydı `lowPrice: "0"` |
| SSS sayfaları | **`FAQPage`** | Bizim Hesap ve ikas ikisi de kullanıyor |
| Sayfa içi yol | `BreadcrumbList` | Alt dizinli yapıda faydalı |

**Kural:** Yapısal veri, kullanıcıya gösterilen değerlerle **birebir aynı olmalıdır**. Fiyatı schema'da yazıp sayfada gizlemek ihlaldir. `aggregateRating` **yazmayın** — gerçek yorumunuz yok.

### 8.5 Eksik teknik dosyalar

| Dosya | Durum | Yapılacak |
|---|---|---|
| `robots.txt` | **Yok** | Ekle; `Sitemap:` satırı ile sitemap'i işaret et |
| `sitemap.xml` | **Yok** | Elle yazılmış statik XML; her yeni sayfada güncelle |
| `canonical` | Var ama tek URL | Her sayfa kendi canonical'ını taşımalı |
| OG görseli | **SVG** (`og-image.svg`, `dashboard.svg`) | 🔴 **Facebook, LinkedIn, WhatsApp, X — hiçbiri OG'de SVG desteklemez.** Paylaşım kartı boş çıkar. **1200×630 PNG/JPG** üretin, ürün başına ayrı |
| `og:type` | `website` | Ürün sayfalarında `product` veya `website` + doğru başlık/açıklama |
| 404 | Var | Cloudflare Pages'te de çalışması için kontrol edin |
| Favicon | SVG var | PNG fallback ekleyin (eski tarayıcı/paylaşım) |

### 8.6 Analitik — KVKK dostu seçenekler

Google Analytics eklendiği an: çerez → **açık rıza banner'ı zorunlu** (Bölüm 6.8) + ABD'ye veri aktarımı → KVKK md. 9 yükü. Bir tanıtım sitesi için orantısız.

| Araç | Çerez | Ücretsiz? | Barındırma | Not |
|---|---|---|---|---|
| **Cloudflare Web Analytics** | Yok | Evet | Cloudflare | Cloudflare Pages'e geçerseniz **en pratik**; banner gerekmez |
| **Plausible** | Yok | Hayır (self-host ücretsiz) | AB / self-host | Veriyi 24 saat sonra anonimleştiriyor; "çerez banner'ı gerekmez" beyanı var |
| **GoatCounter** | Yok | Evet (ücretsiz barındırılan plan) | — | En minimal |
| **Umami** | Yok | Self-host | Kendi sunucunuz | Sunucunuz varsa |
| **Google Analytics** | Var | Evet | ABD | ❌ Rıza + yurt dışı aktarım yükü |

**Öneri:** Cloudflare Pages + Cloudflare Web Analytics. Çerezsiz, ücretsiz, banner'sız, ek script yükü minimum.

### 8.7 Performans ve erişilebilirlik

Mevcut site zaten iyi durumda (300 satır CSS, 205 satır JS, framework yok, `prefers-reduced-motion` desteği, skip link, ARIA). Ürün sayfaları eklenirken korunması gerekenler:
- Ekran görüntülerini **WebP** olarak, `loading="lazy"` ve açık `width`/`height` ile ekleyin (CLS).
- `translations.js` şişecek — ürün sayfası başına ayrı sözlük dosyası düşünün, ana sayfada gereksiz KB taşımayın.
- Fiyat tablosu mobilde yatay kaydırma değil, **kart yığını** olmalı.

---

## 9. Öncelik sırası

### 🔴 P0 — Yayın öncesi şart (yasal / ticari risk)

| # | İş | Neden |
|---|---|---|
| P0-1 | **Barındırmayı Cloudflare Pages'e taşı** (veya Netlify) | GitHub Pages ToS ticari SaaS sitesini açıkça yasaklıyor; site kapatılabilir |
| P0-2 | **Özel alan adı al ve bağla** | github.io alt dizini ticari ciddiyeti ve SEO'yu zedeliyor; kök `robots.txt`/`sitemap.xml` yazılamıyor |
| P0-3 | **Footer'daki yer tutucuları gerçek bilgilerle doldur** — unvan/ad-soyad, MERSİS **veya** vergi kimlik no, merkez adresi, KEP, e-posta, telefon; "İletişim" başlığı altında | ETHS Yönetmeliği md. 5 (Bölüm 6.1) |
| P0-4 | **KVKK Aydınlatma Metni + Gizlilik + Çerez + Kullanım Koşulları**'nı gerçek işleme faaliyetine göre yeniden yaz | Mevcut metinler "veri toplamıyoruz" diyor; ürün sitesinde yanlış olacak |
| P0-5 | **ETBİS kaydı için mali müşavir/avukata danış**, gerekiyorsa kaydı yap | İdari para cezası riski (Bölüm 6.3–6.4) |
| P0-6 | **OG görsellerini PNG/JPG 1200×630'a çevir** | SVG OG hiçbir platformda çalışmıyor — bugün her paylaşım boş kart |
| P0-7 | **Ekran görüntüsü yoksa fiyat yayınlama** | Ekransız + referanssız + fiyatlı site, en düşük güven kombinasyonu |
| P0-8 | Fiyat kartlarına **"+ KDV"**, fiyat güncelleme tarihi ve **ödeme yönteminin havale/EFT olduğu** notu | Yanlış fiyat beklentisi ticari uyuşmazlık üretir |

### 🟠 P1 — Önemli, yayını bloke etmez

| # | İş |
|---|---|
| P1-1 | `/hvac-pro-suite/` ürün sayfası: hero, "Excel yerine" tablosu, 6 özellik bloğu, ekran galerisi, SSS, CTA |
| P1-2 | `/hvac-pro-suite/fiyatlandirma/`: 3 kademe + aylık/yıllık seçici + karşılaştırma tablosu + faturalama SSS'i |
| P1-3 | Navigasyonu 4–5 maddeye indir, sağ üste **"Ücretsiz Dene"** butonu; ajans içeriğini `/hakkimizda/` altına taşı |
| P1-4 | `robots.txt` + `sitemap.xml` |
| P1-5 | Dil başına ayrı URL (`/en/...`) + `hreflang` + sayfa başına `canonical` |
| P1-6 | `SoftwareApplication` + `AggregateOffer` + `FAQPage` yapısal verisi |
| P1-7 | `/guvenlik/` sayfası: veri izolasyonu, yedekleme, verinin bulunduğu ülke, abonelik bitince veri politikası |
| P1-8 | `/surum-notlari/` changelog — ve düzenli güncellenmesi |
| P1-9 | **Abonelik/Hizmet Şartları + İade-İptal politikası** metni |
| P1-10 | İletişim: WhatsApp + doğrudan e-posta birincil; form ikincil. Form servisi kullanılacaksa yurt dışı aktarım dayanağını kur |
| P1-11 | Çerezsiz analitik (Cloudflare Web Analytics) |
| P1-12 | "Kim geliştiriyor" sayfası — gerçek ad, fotoğraf, geçmiş |

### 🟢 P2 — Rekabet avantajı / sonraki tur

| # | İş |
|---|---|
| P2-1 | Demo hesabı / interaktif demo (`/s/demo` örnek sipariş sayfası) |
| P2-2 | 2–3 dakikalık ürün turu videosu |
| P2-3 | `/yol-haritasi/` — ödeme entegrasyonu, Excel içe aktarma, veri dışa aktarma gibi eksikleri açıkça listele |
| P2-4 | `/entegrasyonlar/` sayfası (Paraşüt, e-Fatura, Android, ileride ödeme sağlayıcı) |
| P2-5 | `/destek/` — kayıt ve ilk teklif için kısa kullanım kılavuzu |
| P2-6 | Soğuk Hava Deposu ürün sayfası (içerik netleşince) — o zamana kadar "Yakında" kartı |
| P2-7 | Erken kullanıcı programı sayfası ("ilk 5 firma") |
| P2-8 | Blog / sektörel içerik (SEO: "havalandırma kanalı m2 hesabı", "sac açınım hesaplama") — organik trafiğin gerçek kaynağı burası |
| P2-9 | Mesafeli satış sözleşmesi + ön bilgilendirme formu (tüketiciye satış açılırsa) |
| P2-10 | Basit durum/uptime sayfası (statik site + harici ücretsiz uptime servisi linki) |

---

## 10. Kaynaklar

### Mevzuat ve kurum kaynakları (birincil)
- Elektronik Ticaret Aracı Hizmet Sağlayıcı ve Elektronik Ticaret Hizmet Sağlayıcılar Hakkında Yönetmelik (RG 29/12/2022, 32058) — MADDE 4, 5, 34: https://www.resmigazete.gov.tr/eskiler/2022/12/20221229-5.htm ve https://www.alomaliye.com/2022/12/29/elektronik-ticaret-araci-hizmet-saglayici-ve-elektronik-ticaret-hizmet-saglayicilari/
- 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun: https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6563.pdf
- T.C. Ticaret Bakanlığı — ETBİS'e Kayıt ve Bildirim Esasları: https://ticaret.gov.tr/duyurular/elektronik-ticaret-bilgi-sistemine-etbis-kayit-ve-bildirim-esaslari
- e-Ticaret Bilgi Platformu (ETBİS eğitim): https://www.eticaret.gov.tr/cevrimiciegitim/etbis-kayit-26
- Mesafeli Sözleşmeler Yönetmeliği: https://mevzuat.gov.tr/File/GeneratePdf?mevzuatNo=20237&mevzuatTur=KurumVeKurulusYonetmeligi&mevzuatTertip=5
- 6502 sayılı Tüketicinin Korunması Hakkında Kanun: https://mevzuat.gov.tr/mevzuatmetin/1.5.6502.pdf
- T.C. Ticaret Bakanlığı — Mesafeli Sözleşmeler Hakkında Bilgilendirme: https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/mesafeli-sozlesmeler-hakkinda-bilgilendirme
- KVKK — Yurt Dışına Aktarım: https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim
- KVKK — Kişisel Verilerin Yurt Dışına Aktarılması Rehberi (Yayın No: 48): https://www.kvkk.gov.tr/Icerik/8142/Kisisel-Verilerin-Yurt-Disina-Aktarilmasi-Rehberi
- KVKK — Açık Rızanın Hizmet Şartına Bağlanması: https://www.kvkk.gov.tr/Icerik/5412/Acik-Rizanin-Hizmet-Sartina-Baglanmasi
- KVKK Kurul Kararı 10/03/2022, 2022/229 (çerezler): https://www.kvkk.gov.tr/Icerik/7275/2022-229
- KVKK Kurul Kararı 23/12/2022, 2022/1358 (çerez aydınlatma/açık rıza metinleri): https://www.kvkk.gov.tr/Icerik/7595/2022-1358

### Hukuk bürosu / uzman değerlendirmeleri (ikincil — teyit gerektirir)
- Erdem & Erdem — 2024 KVKK değişiklikleri: https://www.erdem-erdem.av.tr/bilgi-bankasi/kisisel-verilerin-korunmasi-kanununda-neler-degisti
- Paksoy — Yurt dışına veri aktarımı yönetmeliği (2024): https://paksoy.av.tr/2024/07/kisisel-verileri-koruma-kurumu-yurt-disina-veri-aktarimlarina-iliskin-yeni-bir-yonetmelik-yayimladi/
- Erdem & Erdem — VERBİS istisna uygulama esasları: https://www.erdem-erdem.av.tr/bilgi-bankasi/verbis-kayit-yukumlulugune-iliskin-yeni-istisnalarin-uygulama-esaslari-aciklandi
- Aksan — Ticari elektronik ileti onayı ve reddetme hakkı: https://aksan.av.tr/blog/ticari-elektronik-ileti-onayi-ve-reddetme-hakki
- Ersan Şen Hukuk — Mevzuat kapsamında ticari elektronik iletiler: https://sen.av.tr/tr/makale/mevzuat-kapsaminda-ticari-elektronik-iletiler
- SRP-Legal — 2022 e-ticaret yönetmeliği bilgi notu: https://www.srp-legal.com/tr/2022/12/29/elektronik-ticaret-araci-hizmet-saglayici-ve-elektronik-ticaret-hizmet-saglayicilar-hakkinda-yonetmelik-resmi-gazetede-yayimlandi/

### Faturalama (ikincil — mali müşavir teyidi şart)
- Paraşüt — 2026'da e-Arşiv ve e-Fatura zorunluluğu: https://www.parasut.com/blog/e-fatura-ve-e-arsiv-zorunlulugu
- Mikro — e-Fatura geçiş zorunluluğu ve şartları: https://www.mikro.com.tr/e-fatura-gecis-zorunlulugu-ve-sartlari/
- Bizim Hesap — e-Fatura geçiş zorunluluğu: https://bizimhesap.com/blog/e-fatura-gecis-zorunlulugu-nedir-sartlari-nelerdir

### Türkiye SaaS referansları (fiyatlandırma ve sayfa yapısı)
- Paraşüt fiyatlar: https://www.parasut.com/on-muhasebe-fiyatlari
- Bizim Hesap fiyatlar: https://bizimhesap.com/fiyatlar
- ikas e-ticaret paketleri: https://ikas.com/tr/e-ticaret-paketleri
- Kolay İK fiyatlar: https://kolayik.com/insan-kaynaklari-yazilimi-fiyatlari
- Logo Yazılım: https://www.logo.com.tr/
- DentSoft fiyatlandırma (küçük dikey SaaS örneği): https://dentsoft.com.tr/pricing

### Uluslararası dikey SaaS referansları
- Jobber fiyatlandırma: https://getjobber.com/pricing/
- ServiceTitan ana sayfa: https://www.servicetitan.com/
- QuoteSoft HVAC/Sac keşif yazılımı: https://quotesoft.com/products/hvac-sheetmetal/

### Teknik / barındırma
- GitHub — Terms for Additional Products and Features (Pages yasak kullanımlar): https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features
- GitHub Pages limitleri: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- GitHub Pages özel alan adı: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
- Cloudflare ücretsiz plan: https://www.cloudflare.com/plans/free/
- Cloudflare Pages fiyatlandırma/limitler: https://developers.cloudflare.com/pages/functions/pricing/
- Netlify fiyatlandırma: https://www.netlify.com/pricing/
- Netlify — ücretsiz planda ticari kullanım: https://answers.netlify.com/t/can-we-use-netlify-free-plan-for-commercial-purposes/41545
- Google Search Central — Yerelleştirilmiş sürümler / hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
- Plausible veri politikası (çerezsiz analitik): https://plausible.io/data-policy

---

## Ek — Bu raporun ürün tarafına yansıyan bulguları

Site araştırması sırasında, sitede yazılabilecek ama **üründe henüz karşılığı olmayan** vaatler tespit edildi. Bunlar `E:\HVAC Pro Suite\docs\feature-gap-report-2026-09-08.md` ile örtüşüyor ve fiyat/SSS metinleri yazılmadan önce karara bağlanmalı:

| Sitede yazmak isteyeceğiniz | Üründeki durum |
|---|---|
| "Verilerinizi istediğiniz zaman dışa aktarın" | Dışa aktarma yolu yok |
| "Excel'den fiyat listenizi aktarın" | İçe aktarma yok |
| "Kendi logonuz teklifte" | `company.logo_url` altı boş — yükleme yolu yok, PDF'e çizilmiyor |
| "Kartla ödeyin, anında başlayın" | Ödeme sağlayıcısı yok; yenileme süper-admin butonu |
| "Sınırsız kullanıcı / Pro paket X kullanıcı" | Yalnızca `TRIAL_USER_LIMIT = 2` fiilen uygulanıyor |
| "Teklif geçerlilik süresi" | `default_offer_due_days` tanımlı ama hiç kullanılmıyor |
| "Teklif revizyon geçmişi" | Yok; güncellemeler yerinde yazıyor |
| "14 gün ücretsiz deneme" | Kodda 7 gün (`TRIAL_TERM_DAYS = 7`) |

**Kural: sitede yazdığınız her cümle, üründe test edilebilir bir davranışa karşılık gelmelidir.** Aksi hâlde ilk müşteri, ilk gün, ilk vaatte kaybedilir.
