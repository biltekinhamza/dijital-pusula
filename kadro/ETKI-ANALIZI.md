# ETKİ ANALİZİ — Dijital Pusula sitesinin yeniden kurulumu

Tarih: 2026-09-28 · Faz: ETKI_ANALIZI (Güzergâh 2, BÜYÜK) · Yazan: mimar
Girdiler: `docs/site-arastirma-raporu.md` (2026-09-08), `README.md`, kesifci haritası,
mevcut kod (satır numaraları okunarak), ürün depoları `E:/HVAC Pro Suite`,
`E:/soguk_hava_deposu` (yalnız doğrulama amaçlı, okuma).

> Bu belge **onay noktasıdır**. Kullanıcı §9'daki kararları vermeden TASARIM fazına
> geçilmez. Görsel dil, renk, tipografi ve hareket kararları bu belgede **yoktur**; onlar
> tasarımcının `TASARIM-STANDARDI.md` belgesinde verilecek. Bu belge yalnız bilgi mimarisini,
> dosya yapısını, yapım yöntemini ve görev sırasını belirler.

---

## 0. Kararların özeti

| # | Karar | Seçilen | Gerekçe (kısa) |
|---|---|---|---|
| ADR-1 | Yapım yöntemi | **Bağımlılıksız Node üretici** (`tools/build.js`) + **commit'lenen statik çıktı** (`site/`). Barındırıcıda derleme yok. | 8 sayfanın header/footer'ı elle kopyalanıyor; ayrı dil URL'leri bunu 28 dosyaya çıkarır. Elle kopya tutulamaz. |
| ADR-2 | Dil | **Ayrı URL** (`/…` TR, `/en/…` EN) + karşılıklı `hreflang`, JS ile dil değiştirme kalkar | Bugün yalnız TR dizine giriyor (README:236-239). |
| ADR-3 | Marka | Ad + pusula simgesi (3 SVG katmanı) + slogan **korunur**; görsel dilin geri kalanı tasarımcıya açık | Marka 2 commit önce kuruldu (24c7b95), varlıklar sağlam. Kullanıcı onayı istenir (S2). |
| ADR-4 | Fiyat sayfası | **Tek `/fiyatlandirma/`**, içinde iki ürün bölümü | KDV/ödeme/iade notları ve faturalama SSS'i tek yerde kalır. |
| ADR-5 | Çerez bandı | **Kaldırılır**; `localStorage` kullanımı da kalkar | Rapor 6.8 (DOĞRULANDI): zorunlu olmayan çerez yoksa bant gerekmez. Dil artık URL'den gelir. |
| ADR-6 | Yazı tipleri | **Kendi sunucumuzdan** (woff2) | `css/style.css:1` Google Fonts'a istek atıyor; üçüncü taraf isteği gereksiz yere oluşuyor. |
| ADR-7 | Form | İki kip korunur (`mailto` / `endpoint`), **açılışta `mailto` + WhatsApp + e-posta**, kip tek ayardan, KVKK metni aynı ayardan üretilir | Rapor 4.7: form servisi yurt dışı aktarım yükü getirir. |
| ADR-8 | Zorunlu rıza kutusu | **Kaldırılır**, yerine aydınlatma bildirimi | Rapor 6.6 (DOĞRULANDI): gereksiz açık rıza istemek hatalı uygulama. |
| ADR-9 | Yasal sayfalar | 3 sayfa (KVKK+gizlilik birleşik, çerez, kullanım) + koşula bağlı abonelik şartları | Tek kişi bakıyor; metinlerin çoğu örtüşüyor. |
| ADR-10 | Sürüm notları + yol haritası | **Tek sayfa** (`/surum-notlari/`), veri dosyası ayrı | İkisi de aynı kişi tarafından aynı anda güncellenir. |
| ADR-11 | Etkileşimli hesap gösterimi | Formül **JS'e kopyalanmaz**; gösterilecekse ürünün kendi motorunun ürettiği sabit örnek veriyle | Tek kaynak: sitedeki sayı üründen ayrışamaz. |

---

## 1. Neyi kırar, hangi dosyalar

### 1.1 Korunacaklar (taşınır, içeriği değişmez)

| Varlık | Nerede | Yeni yeri | Not |
|---|---|---|---|
| `SITE_COMPANY` (MADDE 5 verisi + yorum bloğu) | `js/translations.js:8-38` | `src/company.js` | **Birebir** taşınır, yorumlar dahil. Boş alanın gösterilmemesi davranışı korunur (`main.js:52-107` mantığı üreticiye geçer). |
| Pusula logosu (3 katman) | `assets/logo/logo-mark.svg`, `logo-dial.svg`, `logo-needle.svg` | `src/static/assets/logo/` | Değişmez. |
| İbre animasyonu | `css/style.css:72-110` (`compass-seek`), `:211` reduced-motion | Marka bileşeni CSS'i | Kadran sabit, ibre döner, `prefers-reduced-motion`'da durur. Bu üç kural değişmez; süre/renk tasarımcıya açık. |
| Favicon | `favicon.svg` | `src/static/favicon.svg` | PNG yedek + apple-touch-icon eklenir (rapor 8.5). |
| Ürün metinleri (sorun/çözüm, Excel karşılaştırması, modüller, bağlantılar, künye) | `js/translations.js:192-348` (TR), EN karşılığı `:665-821` | `src/content/{tr,en}/hvac.js`, `cold.js` | İçerik korunur; sabit sayılar `facts.js`'e çekilir (§4.4). |
| Özel yazılım içeriği | `js/translations.js:353-396` | `src/content/{tr,en}/services.js` | Modal kalkar, detaylar sayfada açılır (`<details>`). |
| OG üretici | `tools/make-og.py` | aynı yer | Kalır ama **düzeltilir** (bkz. 1.5). |
| Araştırma raporu | `docs/site-arastirma-raporu.md` | aynı yer | Dokunulmaz. |

### 1.2 Kökten değişecekler

| Mevcut | Satır | Sorun | Yeni durum |
|---|---|---|---|
| 8 HTML dosyası kökte, her biri kendi header/footer/cookie bandını taşıyor | `index.html:35-74, 233-285`; `havalandirma-yazilimi.html:33, 224, 267`; `soguk-hava-deposu-yazilimi.html:33, 224, 267`; `ozel-yazilim.html:33, 164, 221`; 3 yasal sayfa `:64-110` | Kabuk 7 kez kopyalı; 404 hiç paylaşmıyor | Kabuk **tek** şablon (`src/templates/layout.js`); 28 sayfa üretilir. |
| Çalışma anında çeviri | `main.js:45-47` (`t()`), `:112-129` (`translatePage`), `:383-394` (`setLanguage`) | Anahtar bulunamazsa `t()` `undefined` döner, HTML'deki TR metin **sessizce** kalır. Arama motoru yalnız TR görür. | Çeviri **derleme anında** yapılır; eksik anahtar derlemeyi **durdurur**. İstemciye çeviri kataloğu gitmez. |
| Dil tercihi `localStorage`'da | `main.js:36`, `:385` | Tek URL, tek dil dizinde | Dil URL'den gelir; `localStorage` hiç kullanılmaz. |
| Sayfa türüne göre JS'le çizim | `main.js:146-357` (`renderHome/Product/Services/Legal`) | JS kapalıyken içerik yok; SEO zayıf | Hepsi derleme anında HTML'e basılır. |
| Meta/JSON-LD çalışma anında yamalanıyor | `main.js:361-381` (`applyMeta`) | Canonical, hreflang, og:url hep TR/github.io | Sayfa başına statik, doğru dilde üretilir. |
| Tek CSS dosyası, kırılma noktaları iki yerde | `css/style.css:171-211` ve `:392-410` | İki kopya ayrışır | CSS kaynakta bölünür, derlemede tek dosyaya birleşir; kırılma noktaları tek yerde (tasarım belgesi tanımlar). |
| Google Fonts `@import` | `css/style.css:1` | Üçüncü taraf isteği, render engelleyici | woff2 kendi sunucumuzdan (ADR-6). |
| Form ayarları kodun içinde | `main.js:16-17` | Ayar değişince KVKK metni ayrı elle güncellenmeli (README:176-178) | `src/site.config.js` → hem istemci formu hem KVKK "aktarım" paragrafı buradan üretilir. |
| SSS akordeonu JS ile | `main.js:556-565` | Gereksiz JS | `<details>/<summary>` (JS'siz, erişilebilir). |
| Hizmet modalı | `main.js:410-432`, `ozel-yazilim.html` modal | Odak tuzağı, JS bağımlılığı | Sayfada açılır ayrıntı (`<details>`). |
| Zorunlu rıza kutusu + "hukuki sebep: açık rızanız" | `index.html:219-223`; `js/translations.js:427`, `:472` | Rapor 6.6 (DOĞRULANDI) ile çelişiyor | Kutu kalkar; aydınlatma bildirimi + bağlantı. Hukuki sebep "sözleşmenin kurulması / meşru menfaat" olarak yazılır (avukat onayına kadar taslak). |
| Yasal metin çift kaynaklı | `gizlilik.html`, `cerez-politikasi.html`, `kullanim-sartlari.html` içindeki gömülü TR + `js/translations.js:465-503` | JS her zaman katalogtakini basıyor; HTML kopyası ölü ama "gerçek" gibi görünüyor | Tek kaynak: `src/content/{tr,en}/legal.js`. HTML'e derlemede basılır. |
| 404 tamamen bağımsız | `404.html` (kendi stil/JS/sözlük; mutlak `/dijital-pusula/` yolları `:10, :19, :25-27`) | 3 kopyalı slogan, eski yol | Aynı kabukla üretilir, kök-mutlak yollar (`/`), TR + EN. |
| `theme-color` koyu temadan kalma | `index.html:9` (`#050d1a`) | Açık temayla uyumsuz | Tasarım belirteçlerinden gelir. |

### 1.3 Silinecekler

| Dosya / blok | Neden |
|---|---|
| `assets/icons/ui-icons.svg` | Hiçbir yerde referans yok (kesifci). |
| `assets/icons/.gitkeep`, `assets/logo/.gitkeep` | Klasörler taşınıyor / dolu. |
| `js/translations.js` içindeki `notFound` blokları (`:505-510`, `:978-…`) | 404 tarafından okunmuyor. Yeni yapıda 404 içeriği `src/content/{tr,en}/notfound.js`'ten **gerçekten okunur**; eski blok ölü kopya olarak kalmaz. |
| Kökteki 8 HTML, `css/style.css`, `js/main.js`, `js/translations.js`, kökteki `sitemap.xml`, `robots.txt` | İçerikleri `src/`'e taşındıktan sonra; çıktılar `site/` altında üretilir. |
| `tools/render-test.js` | jsdom ile çalışma anı çizimini sınıyordu; çizim artık derlemede, statik denetim yetiyor. `package.json` olmadan elle kurulmuş `node_modules`'a bağımlıydı. |
| `tools/prune-css.js` | Kurulu olmayan `postcss` istiyor, hiç çalıştırılmadı; CSS sıfırdan yazılacak. |
| `assets/images/product-hvac.svg`, `product-soguk-hava.svg` | **Koşullu.** Gerçek ekran görüntüleri gelene kadar kalır, "temsilî" etiketiyle gösterilir. Gerçekleri gelince silinir (S7). |
| `node_modules/` | Takip edilmiyor (`.gitignore:1`), render-test silinince hiçbir şey kullanmıyor. Yerelden silinmesi kullanıcıya kalmış. |

Silinenler git geçmişinde durur (geri alma §8).

### 1.4 Dışarıya dönük kırılmalar

1. **Eski URL'ler.** `havalandirma-yazilimi.html` vb. yeni yapıda yok. Yeni barındırıcıda
   `site/_redirects` ile 301 verilir (tablo §4.6). **github.io adresindeki eski bağlantılar**
   (sosyal paylaşımlar, arama dizini) yeni alan adına kendiliğinden gitmez; bu kullanıcının
   taşıma işidir (S15).
2. **GitHub Pages anında kırılabilir.** Pages depo kökünden yayın yapıyorsa, yeniden yapılanma
   `main`'e birleştiği an kökte `index.html` kalmaz ve canlı site 404 döner. Yayın ayarı GitHub
   arayüzünde durduğu için dosyalardan doğrulanamadı. **Kural:** iş `yeniden-kurulum` dalında
   yapılır, `main`'e ancak Cloudflare Pages kurulup önizleme onaylandıktan sonra birleşir.
3. **OG görselleri eski adresi taşıyor.** `tools/make-og.py:124` görselin içine
   `biltekinhamza.github.io/dijital-pusula` yazıyor; mevcut `assets/images/og-*.png` bu metni
   içeriyor. Görsel değişmeden paylaşılan her kart eski adresi gösterir (1.5).
4. **Denetim araçları geçersizleşir.** `tools/check-site.js` `data-i18n` yollarını ve
   `main.js`'in aradığı id'leri denetliyor (`:108`); yeni yapıda ikisi de yok. Araç yeniden
   yazılır (G3). Yeniden yazılana kadar "temiz" çıktısı hiçbir şey kanıtlamaz (D-002).
5. **Ziyaretçi tarayıcısında kalan anahtarlar** (`dijital-pusula-language`,
   `dijital-pusula-cookie-notice`) zararsız, işlem gerekmez.

### 1.5 Geriye dönüklük — türetilmiş, saklanan değerler

Bu sitede veritabanı yok ama **üretilip saklanan** üç şey var. Kaynağı düzeltmek bunları
kendiliğinden düzeltmez:

| Saklanan türev | Kaynağı | Eskime riski | Önlem |
|---|---|---|---|
| `site/` (commit'lenen çıktı) | `src/` | İçerik düzenlenip derleme unutulursa canlı site eski kalır | `node tools/build.js --check` çıktıyı yeniden üretip farkı raporlar; `check-site` bunu çağırır; isteğe bağlı pre-commit kancası (G8). |
| OG PNG'leri | marka adı, slogan, ürün adı, **adres** (`make-og.py:124`) | Slogan ya da alan adı değişince görseller eski kalır; sosyal platformlar da ayrıca önbellekte tutar | `make-og.py` adresi `site.config.js`'ten okur; EN sürümleri de üretilir; yeniden üretim görev listesinde (A8). Platform önbelleği bizim kontrolümüzde değil. |
| Sitede yazan ürün sayıları (25 parça tipi, 7 gün, test sayıları) | Ürün kodu | Ürün değişir, site değişmez | `src/content/facts.js`'te **tek yerde**, her girdide `source` (dosya:satır) ve `checkedAt`. Metinler sayıyı buradan alır. |

### 1.6 İçerik doğruluğu — ürün koduyla karşılaştırma (okuma, çalıştırma değil)

Kural (rapor Ek): sitede yazan her cümle üründe sınanabilir bir davranışa karşılık gelmeli.

| Sitedeki iddia | Nerede | Kod | Sonuç |
|---|---|---|---|
| Deneme 7 gün, 2 kullanıcı | `translations.js:162, :247, :249` | `E:/HVAC Pro Suite/app/licensing.py:10` (`TRIAL_TERM_DAYS = 7`), `:12` (`TRIAL_USER_LIMIT = 2`), sınır `app/web/dashboard_api.py:282` | Tutarlı. |
| 25 parça tipi | `translations.js:111, :197, :198, :208, :218` | `app/ventilation/part_config.py:12` `PARTS` sözlüğünde 25 üst düzey girdi (grep ile sayıldı) | Tutarlı. (Rapordaki "43 parça tipi" yalnız örnek cümle, kullanılmaz.) |
| Teklif PDF'inde logo | `translations.js:131, :211, :221` | Logo yükleme `dashboard_api.py:195-240`, PDF'e çizim `quote_pdf.py:348-354` | Tutarlı. **Raporun Ek tablosu (docs:642) bu konuda eskimiş.** |
| Teklif geçerlilik tarihi otomatik | `translations.js:211` | `quote_pdf.py:189` (`offer_valid_days`) | Tutarlı. Raporun Ek tablosu (docs:645) eskimiş. |
| "Yıllık lisans" | `translations.js:254` | `licensing.py:8` `LICENSE_TERM_YEARS = 1` | Tutarlı. **Aylık abonelik ürün tarafında mekanik olarak yok** (S3 için önemli). |
| "Ücretsiz Dene" → uygulamanın `/register` ekranı (rapor 3.3) | — | `E:/HVAC Pro Suite/README.md:93` "Gerçek production domain + HTTPS" **satışa hazırlık için kalanlar** listesinde | Herkese açık deneme adresi **yok gibi görünüyor**. CTA açılışta "Deneme hesabı isteyin" olur (S4). |
| Yedek saklama politikası, denetim kaydı (HVAC) | Güvenlik sayfası için gerekli | `E:/HVAC Pro Suite/README.md:95` (retention yok), `:97` (audit kapsamı yetersiz) | Güvenlik sayfasında HVAC için **yazılamaz** (S10). |
| "390+ otomatik test", "248 + 32 + 86 test" | `translations.js:113`, `:318` | Bu fazda doğrulanmadı | G5'te sayılır ya da ifade "yüzlerce otomatik test" gibi sayısız hale getirilir. |
| Veri dışa aktarma, Excel içe aktarma, çevrimiçi ödeme | Yazılmamalı | Rapor Ek | **Hiçbir sayfada iddia edilmez.** SHD rapor dışa aktarımı (CSV/XLSX/PDF) "tam veri dışa aktarma" diye yazılmaz. |

**arastirmaci'ya not (itiraz değil):** `docs/site-arastirma-raporu.md` Ek tablosunun logo ve
geçerlilik satırları 2026-09-08'den sonra ürün tarafında kapanmış. Rapora dokunulmuyor
(kısıt); içerik yazarken bu tablo değil §1.6 esas alınır.

---

## 2. Kapsam kararları (ADR)

### ADR-1: Bağımlılıksız üretici + commit'lenen statik çıktı
**Bağlam:** Ayrı dil URL'leri (ADR-2) 14 sayfayı 28 HTML dosyasına çıkarıyor. Bugün 8 dosyada
bile kabuk elle kopyalanıyor ve 404 çoktan ayrışmış. Rapor 8.3 "doğru dil HTML'de basılı
olmalı, JS sonradan değiştirmemeli" diyor; bu, metnin 28 dosyaya elle yazılması ya da
üretilmesi demek. README ve rapor "derleme adımı yok" diyordu; bu kısıt **GitHub Pages'ten**
geliyordu (Pages özel derleme çalıştırmıyor), Cloudflare'e geçişle ortadan kalkıyor.
**Karar:** `tools/build.js`, yalnız Node'un kendi modüllerini kullanan (npm paketi yok) bir
üretici. `src/`'i okur, `site/`'i **sıfırdan** yazar (önce siler; bayat sayfa kalamaz). Çıktı
**depoya commit'lenir**. Cloudflare Pages ayarı: build command **boş**, output directory
**`site`**. README'nin P0 maddesindeki "output directory kök" yalnız `site` olarak değişir.
Şablonlar JS template literal'leridir; varsayılan olarak kaçışlayan bir etiketli şablon
(`html\`…\``) kullanılır. Kaçışlamamak için açıkça `raw()` gerekir (bugün `main.js:24`
`esc()`'nin elle çağrılması unutulursa hata sessiz).
**Reddedilenler:**
- *Derlemesiz, 28 dosyayı elle yazmak:* Bugün 8 dosyada ayrışma zaten var (404). 28 dosyada
  her menü değişikliği 28 düzenleme demek.
- *İstemcide `fetch` ile parça yükleme (header.html/footer.html):* Sayfa önce kabuksuz çizilir,
  içerik JS'e bağımlı kalır, SEO sorunu çözülmez.
- *Eleventy/Astro gibi hazır statik site üretici:* npm bağımlılık zinciri, sürüm kırılmaları ve
  tek kişi için öğrenme yükü. Mevcut i18n ağacına uyarlamak için eklenti yazmak gerekir.
  300-500 satırlık kendi üreticimiz aynı işi bağımlılıksız görür.
- *Cloudflare'da derleme (build command `node tools/build.js`, `site/` commit'lenmez):*
  Türev commit'lenmediği için bayatlama riski yok, bu güçlü bir argüman. Reddedilme sebebi:
  (1) yayına giden dosya yerelde denetlenen dosya olmaz, görsel denetim başka bir çıktıyı
  onaylamış olur; (2) Cloudflare derleme imajındaki Node sürümüne bağımlılık getirir
  (**varsayım**, doğrulanmadı); (3) kullanıcının taşıma işine bir ayar daha ekler. Üretici iki
  yolu da destekler; ileride değiştirmek bir ayar işidir.
- *Cloudflare Pages Functions / HTMLRewriter ile çalışma anında birleştirme:* Barındırıcıya
  kilitlenme, sunucusuz statik site ilkesini bozar.
**Sonuçlar:** Yeni yük: her içerik değişikliğinden sonra `node tools/build.js` çalıştırılmalı;
`--check` bunu denetler. Yerel önizleme için sunucu şart (`npx serve site` ya da
`python -m http.server -d site`), çünkü temiz URL'ler (`/fiyatlandirma/`) `file://` ile
klasör listesi açar. Kapattığı kapılar: çalışma anında dil değiştirme (bilerek).
Üretici çıktısı **belirlenimci** olmalı: iki çalıştırma bayt bayt aynı dosyayı üretir; zaman
damgası basılmaz. Tek istisna telif yılı: derleme yılından gelir, 1 Ocak'ta `--check` fark
bildirir, yeniden derlemek yeter.

### ADR-2: Dil başına ayrı URL
**Bağlam:** `main.js:36` dili `localStorage`'dan okuyor; README:236-239 yalnız TR'nin dizine
girdiğini kabul ediyor. Rapor 8.3 ayrı URL + `hreflang` istiyor.
**Karar:** TR kökte, EN `/en/` altında. EN adresleri **İngilizce slug** kullanır
(`/en/pricing/`, `/en/cold-storage/`). Her sayfa `hreflang="tr"`, `hreflang="en"` ve
`x-default` (→ TR) bağlantılarını ve kendi canonical'ını taşır. Dil anahtarı, o sayfanın karşı
dildeki eşine giden düz bir bağlantıdır. Otomatik dil yönlendirmesi **yok**.
**Reddedilenler:**
- *Aynı slug (`/en/fiyatlandirma/`):* İngilizce okuyucu için anlamsız; eşleme tablosu zaten
  var (`routes.js`), maliyeti sıfır.
- *`?lang=en` sorgu parametresi:* Canonical/hreflang yönetimi karışır, önbellek ve paylaşım
  bağlantıları kırılgan.
- *`en.` alt alan adı:* DNS ve ikinci Pages projesi gerekir, tek kişilik yapıda fazla.
- *Accept-Language ile otomatik yönlendirme:* Sunucu tarafı kod ister; tarayıcıların İngilizce
  varsayılanı Türk ziyaretçiyi yanlış dile atar.
**Sonuçlar:** Her içerik girdisi iki dilde zorunludur (eşlik denetimi derlemede). Sürüm notları
da iki dilli yazılır; bu tek kişi için sürekli bir yük (S11).

### ADR-3: Marka varlıklarını koru
**Bağlam:** "Dijital Pusula" adı, pusula simgesi ve "Doğru yerdesiniz." sloganı yakın zamanda
kuruldu (commit 24c7b95), README'de kural olarak yazılı, varlıklar sorunsuz çalışıyor.
Kullanıcı "tasarım diline bağlı kalma" dedi; bu, markayı da kapsıyor olabilir.
**Karar:** **Ad, simge geometrisi (kadran + ibre katmanları) ve slogan sabit** kabul edilir.
Renk, yazı tipi, yerleşim, hareketin karakteri tamamen tasarımcıya açıktır. Slogan hero'da
**üst satır (eyebrow)** olarak kalır; H1 somut değer önerisidir (rapor 4.1: genel cümle
satmaz). Pusula metaforu sitenin işine bağlanır: ana sayfanın işi ziyaretçiyi doğru ürüne
**yönlendirmek**tir (§3.2). Bu bağın görsel karşılığı tasarımcının kararıdır.
**Reddedilenler:**
- *Markayı yeniden düşünmek (ad/simge değişikliği):* Kapsamı sitenin dışına taşır (alan adı
  seçimi, OG, e-posta imzası, ürünlerdeki marka), iki haftalık bir marka işini bu yeniden
  kuruluma ekler. Kullanıcı isterse ayrı bir iş olarak açılmalı.
- *Ürün başına ayrı marka ve alan adı:* Rapor 8.2 tek alan adını öneriyor (SEO otoritesi, tek
  yasal yüzey, tek bakım).
**Sonuçlar:** Tasarımcı simgeyi yeniden **çizmek** isterse kullanıcı onayı gerekir (S2).

### ADR-4: Tek fiyat sayfası
**Bağlam:** Rapor sayfa haritasında `/hvac-pro-suite/fiyatlandirma/`, navigasyonda üst düzey
"Fiyatlandırma" öneriyor; iki ürün var.
**Karar:** `/fiyatlandirma/` (EN `/en/pricing/`). İçinde `#hvac` ve `#soguk-hava` bölümleri.
Çapa kimlikleri dilden bağımsız ASCII'dir, iki dilde aynı çalışır. Ürün sayfaları kendi
özetini gösterip buraya bağlanır.
**Reddedilenler:** *Ürün başına ayrı fiyat sayfası:* KDV notu, ödeme yöntemi notu, fiyat tarihi,
iade politikası ve faturalama SSS'i iki kopyaya bölünür. Tek kaynak ilkesine aykırı.
**Sonuçlar:** Sayfada iki SSS ve iki plan grubu var. Kimlikler ürün önekli üretilir
(`faq-hvac-3`), çakışma denetlenir.

### ADR-5: Çerez bandı ve localStorage kalkar
**Bağlam:** Bant yalnız dil tercihini ve kendisinin kapatıldığını saklıyor
(`main.js:591-598`, `:623-624`). Rapor 6.8 (DOĞRULANDI): kesinlikle gerekli olmayan çerez
yoksa rıza gerekmez.
**Karar:** Bant, `localStorage` ve ilgili metinler kaldırılır. Çerez politikası "Bu site
çerez ya da yerel depolama kullanmaz" der. Analitik açılırsa metin **ayardan** üretilir
(ADR-7 ile aynı mekanizma).
**Reddedilenler:** *Bandı "bilgilendirme" olarak tutmak:* Gereksiz sürtünme, her sayfada
kapatılması gereken bir öğe, yanlış "izleniyorum" algısı.
**Sonuçlar:** Google Analytics gibi çerezli bir araç eklenirse opt-in bant **zorunlu** hale
gelir. Bu, README'de ve `site.config.js` yorumunda yazılı kalır.

### ADR-6: Yazı tipleri kendi sunucumuzdan
**Bağlam:** `css/style.css:1` Google Fonts `@import`: render'ı engelleyen harici istek ve her
ziyaretçide Google'a IP gönderimi. KVKK yükü **doğrulanmadı**; gereksiz olduğu kesin.
**Karar:** Tasarımcının seçtiği yazı tipleri woff2 olarak `src/static/assets/fonts/`'a konur,
lisansı kendi sunucumuzda barındırmaya izin veren yazı tipleri seçilir. `site/` içinde harici
yazı tipi isteği sıfırdır (denetlenir).
**Reddedilenler:** *Google Fonts'u korumak:* Harici bağımlılık, gizlilik metninde ek madde.
**Sonuçlar:** Yazı tipi dosyaları depoya girer (~100-300 KB).

### ADR-7: Form iki kipli, kip ve KVKK metni tek ayardan
**Bağlam:** `main.js:16-17` boş, form `mailto:` ile çalışıyor. Rapor 4.7: Web3Forms/Formspree
veriyi ABD'ye aktarır; KVKK md. 9 (7499 s. Kanun) standart sözleşme + 5 iş günü içinde Kurul'a
bildirim ister. Bugün kip değişirse KVKK metninin elle güncellenmesi gerekiyor (README:176-178),
bu bir config yalanı riski.
**Karar:** `src/site.config.js` içinde `form: { mode: "mailto" | "endpoint", provider: { name,
country, endpoint, accessKey } }`. Üretici bu ayardan (a) formun `data-` özniteliklerini, (b)
KVKK metninin "Aktarım" paragrafını, (c) iletişim sayfasındaki notu üretir. `endpoint` kipinde
`provider.name` ve `country` boşsa **derleme durur**. Açılış kipi: `mailto`, WhatsApp ve
e-posta birincil kanal (rapor 4.7). Form tek yerde durur: `/iletisim/`. Diğer sayfalar ürün
önseçimiyle (`/iletisim/?urun=hvac`) oraya bağlanır. `endpoint` kipinde gizli bal küpü alanı
eklenir (eksik-özellik kontrol listesi §2).
**Hata yolu:** Gönderim sırasında buton kilitlenir (bugün `main.js:497`). 2xx dışındaki her
yanıtta (429/5xx dahil) **otomatik yeniden deneme yok**; ziyaretçiye e-posta ve WhatsApp
bağlantısı gösterilir. Otomatik deneme, ziyaretçi formunda çift talep üretir. Ağ hatası da
aynı yola düşer.
**Reddedilenler:**
- *Her sayfada form:* Aynı davranışın birden çok örneği, sayfalar uzar. CTA bandı kanalları
  zaten gösteriyor.
- *FormSubmit:* Rapor 4.7: belge/DPA zayıf.
- *"Ürün çıkınca haber verin" e-posta listesi:* Ticari elektronik ileti, İYS süreci başlatır
  (rapor 6.9, DOĞRULANDI). Kurulmaz.
**Sonuçlar:** Kip değişikliği tek satır + yeniden derleme; yasal metin kendiliğinden uyar.

### ADR-8: Zorunlu rıza kutusu kalkar
Bkz. 1.2. Pazarlama e-postası gönderilmeyeceği için ayrı açık rıza kutusu da yok. Hukuki
sebep ifadesinin nihai hali avukat onayına bağlı; metin "taslak" uyarısını taşımaya devam eder.

### ADR-9: Yasal sayfa seti
**Karar:** `/yasal/kvkk-aydinlatma-metni/` (gizlilik + aydınlatma birleşik),
`/yasal/cerez-politikasi/`, `/yasal/kullanim-kosullari/`. `/yasal/abonelik-sartlari/`
(hizmet şartları + iade/iptal) **koşullu**: içerik iş kararı (S3), karar gelene kadar üretilmez.
Mesafeli satış / ön bilgilendirme **yapılmaz** (rapor 6.5, DOĞRULANMADI, tahsilat yok). EN
sürümlerinin başında "Bağlayıcı olan Türkçe metindir" notu (avukat onayına kadar öneri).
**Reddedilen:** *Rapordaki 4 ayrı metin (gizlilik ve aydınlatma ayrı):* İçerik %80 örtüşüyor,
tek kişi iki metni ayrı güncel tutmak zorunda kalır. Avukat ayırmak isterse yeni bir rota
eklemek bir satırdır.

### ADR-10: Sürüm notları ve yol haritası tek sayfada
**Karar:** `/surum-notlari/` en üstte "Sırada ne var" (Yapılıyor / Planlandı), altta tarihli
sürümler (ürün etiketli). Veri `src/content/changelog.js`: `releases[]` ve `roadmap[]` ayrı
diziler. Ana sayfa son 3 sürümü ve son sürüm tarihini **aynı veriden** otomatik gösterir.
**Reddedilen:** *Ayrı `/yol-haritasi/`:* 3-4 maddelik ince bir sayfa; ikinci güncelleme yeri.
Veri zaten ayrı; ayırmak ileride yalnız bir rota ekler.
**Kapı:** Gerçek sürüm kaydı yoksa sayfa üretilmez (S9). Uydurma sürüm notu yazılmaz.

### ADR-11: Etkileşimli hesap gösterimi yalnız ürünün kendi çıktısıyla
**Bağlam:** En güçlü ikna unsuru "işin içinden" teknik derinlik (rapor 7, #6). Akla gelen
"sitede mini hesaplayıcı" formülün JS'e kopyalanması demek; o kopya Python motorundan
ayrıştığı gün site, ürünün vermediği bir sayı gösterir.
**Karar:** Gösterilecekse (S17), HVAC deposunda çalıştırılan bir betik gerçek motordan birkaç
örnek hesabı (parça, ölçü, kalınlık → net alan, fire, kg) **JSON olarak** üretir, dosya
`src/content/data/hvac-ornek-hesap.json`'a konur, ürün sürümü ve tarihiyle birlikte gösterilir.
SHD'nin depolama kuralı (kalan KG × girişte sabitlenen fiyat) tek satırlık olduğu için metinle
anlatılır, hesaplayıcı yapılmaz.
**Reddedilen:** *JS'te formül kopyası:* Tek kaynak ihlali. *Sitede 3D görüntüleyici (Three.js):*
Sayfa ağırlığı; bir ekran kaydı videosu aynı işi görür.

---

## 3. Yaratıcı yön — bilgi mimarisi

Bu bölüm **hangi sayfanın hangi işi yaptığını ve bölümlerin sırasını** belirler. Görünüm
tasarımcınındır.

### 3.1 Yol gösterici ilke

Site bir ajans broşürü değil, **"işi bilen kişinin sahaya dair kanıt dosyası"**. Müşterisi ve
logosu olmayan bir satıcının ikna gücü üç şeydir: (1) sektörün içinden ayrıntı, (2) ürünün
gerçekten var olduğunun kanıtı (ekran, sürüm geçmişi), (3) karşıda gerçek ve ulaşılabilir bir
insan. Her bölüm bu üçünden birine hizmet etmiyorsa çıkarılır. Uydurma sosyal kanıt
(yorum, logo, "1000+ firma", yıldız) **hiçbir yerde** yok (rapor 7).

Dürüstlük kuralları (içerik yazarı ve denetçi için sınanabilir):
- Ürün sayıları yalnız `facts.js`'ten gelir; `facts.js`'te `source` alanı boş kayıt olamaz.
- Şu ifadeler hiçbir içerik dosyasında geçmez: veri dışa aktarma vaadi, Excel'den içe aktarma
  vaadi, kartla/çevrimiçi ödeme, "sınırsız" (ürün zorlamıyorsa), müşteri sayısı, puan.
- Durumu `early-access` olan ürün "Yayında" rozeti taşıyamaz.

### 3.2 Site haritası

| Rota kimliği | TR | EN | Durum |
|---|---|---|---|
| home | `/` | `/en/` | MVP |
| hvac | `/hvac-pro-suite/` | `/en/hvac-pro-suite/` | MVP |
| cold | `/soguk-hava-deposu/` | `/en/cold-storage/` | MVP (rozet S5) |
| pricing | `/fiyatlandirma/` | `/en/pricing/` | MVP (kip S3) |
| services | `/ozel-yazilim/` | `/en/custom-software/` | MVP |
| contact | `/iletisim/` | `/en/contact/` | MVP |
| legal-privacy | `/yasal/kvkk-aydinlatma-metni/` | `/en/legal/privacy-notice/` | MVP |
| legal-cookies | `/yasal/cerez-politikasi/` | `/en/legal/cookie-policy/` | MVP |
| legal-terms | `/yasal/kullanim-kosullari/` | `/en/legal/terms-of-use/` | MVP |
| about | `/hakkimizda/` | `/en/about/` | Kapılı (S8) |
| changelog | `/surum-notlari/` | `/en/changelog/` | Kapılı (S9) |
| security | `/guvenlik/` | `/en/security/` | Kapılı (S10) |
| legal-subscription | `/yasal/abonelik-sartlari/` | `/en/legal/subscription-terms/` | Kapılı (S3) |
| notfound | `/404.html` | `/en/404.html` | MVP |

**Kapılı** rota: `routes.js`'te `enabled: false`. Menü, altbilgi, site haritası, dil
bağlantıları ve iç bağlantılar **aynı tablodan** türediği için kapalı rota hiçbir yerde
bağlantı olarak çıkmaz. Bir şablon kapalı rotaya bağlantı üretmeye kalkarsa derleme durur.

Sonraya bırakılanlar (bu kurulumda yok): `/destek/`, `/entegrasyonlar/` (içerik ürün
sayfalarında bölüm olarak var), blog, durum sayfası, mesafeli satış seti.

### 3.3 Navigasyon

```
[Pusula] Dijital Pusula | Ürünler ▾ | Fiyatlandırma | Güvenlik* | Hakkımızda* | İletişim | TR/EN | [Birincil CTA]
                           ├ HVAC Pro Suite        (alt satır: tek cümle)
                           ├ Soğuk Hava Deposu     (alt satır + durum rozeti)
                           └ Özel Yazılım          (görsel olarak ikincil)
* rota açıksa görünür
```
Birincil CTA etiketi ürün ayarından gelir (§4.4 `trial.mode`): herkese açık deneme adresi
varsa "Ücretsiz Deneyin", yoksa "Deneme Hesabı İsteyin" (→ `/iletisim/`). Altbilgi: İletişim
başlığı altında MADDE 5 tam seti (her sayfada, derlemede basılı, JS'e bağlı değil), ürünler,
kaynaklar (sürüm notları, güvenlik), yasal, dil bağlantısı.

### 3.4 Ana sayfa (`/`) — işi: ziyaretçiyi 10 saniyede doğru ürüne yönlendirmek

| # | Bölüm | İçerik kaynağı | Güven unsuru |
|---|---|---|---|
| H1 | **Hero + iki yön kapısı.** Üst satır slogan; H1 somut ("Havalandırma imalatçıları ve soğuk hava deposu işletmecileri için, işin kendi kurallarıyla yazılmış iki yazılım."); iki büyük "kapı": her biri ürün adı, tek cümlelik iş tanımı, durum rozeti, ürüne giden bağlantı. Altında risk azaltıcı satır (yalnız doğru olanlar: "Kurulum yok · Kredi kartı istenmez · Yazılımı yazan kişiyle konuşursunuz"). | `home.js`, `facts.js`, ürün durumu | #12 |
| H2 | **Gerçeklik şeridi.** 4-5 ölçülebilir ürün gerçeği (25 parça tipi, oda 3D modeli, deneme süresi, test yaklaşımı) | `facts.js` | #7 |
| H3 | **HVAC vitrini.** Sorun cümlesi → 3 yetenek → 1 ekran görüntüsü → [Ürünü inceleyin] [Fiyatlar] | `hvac.js` özet alanları | #1 |
| H4 | **SHD vitrini.** Aynı yapı, durum rozetiyle | `cold.js` | #1 |
| H5 | **"Kiminle çalışacaksınız."** Geliştirici kartı (ad, fotoğraf, iki cümle), doğrudan kanal, çalışma saatleri, yanıt süresi. S8 yanıtlanmadıysa yalnız ulaşılabilirlik kısmı. | `about.js`, `company.js` | #8, #9 |
| H6 | **"Ürün yaşıyor."** Son sürüm tarihi + son 3 sürüm notu + "Sırada" 2 madde → `/surum-notlari/` | `changelog.js` (otomatik) | #4, #5 |
| H7 | **Fiyat özeti.** Kipe göre: deneme süresi, "+ KDV", ödeme yöntemi, → `/fiyatlandirma/` | `pricing.js` | #12 |
| H8 | **SSS (5 soru, itiraz kıran).** Veri nerede, deneme bitince ne olur, verim karışır mı, Excel'deki listem, faturalama | `home.js` | — |
| H9 | **Özel yazılım bandı** (küçük, ikincil) | `services.js` | — |
| H10 | **Son CTA bandı.** Birincil CTA + WhatsApp + e-posta | ayar + `company.js` | #9 |

Bugünkü "Neden bu ürünler" kartları (`translations.js:123-135`) `/hakkimizda/`'ya ve ürün
sayfalarındaki teknik derinlik bölümüne dağıtılır. "Nasıl başlıyoruz" 4 adımı ürün
sayfalarına iner.

### 3.5 Ürün sayfası (tek şablon, iki ürün) — işi: "bu, benim işimi biliyor" dedirtmek

| # | Bölüm | Not |
|---|---|---|
| P1 | Hero: ürüne özgü değer önerisi, durum rozeti, birincil CTA, ikincil "Fiyatlar", büyük ekran görüntüsü | |
| P2 | Gerçeklik satırı (`highlights`) | |
| P3 | Kime göre: 2-3 hedef profil | Yeni içerik (HVAC: kanal imalatçısı, sac atölyesi, taahhüt firması) |
| P4 | Bugün nasıl yürüyor → ürün ne yapıyor | Mevcut `problem`/`solution`/`benefit` |
| P5 | **Excel/defter karşılaştırması** (tablo; mobilde satır başına kart) | Mevcut `comparison.rows`, sayfanın en güçlü bölümü |
| P6 | Yetenek blokları, her biri ekran görüntüsü yuvasıyla | Mevcut `modules` |
| P7 | **Teknik derinlik: "Hesabın içinde ne var"** (kenet payı, dirsek ek payı, klape payı / %60 istif örtüşmesi, koridor bandı, girişte sabitlenen fiyat). İsteğe bağlı: ürün motorundan örnek hesap tablosu (ADR-11) | Rapor 7 #6 |
| P8 | Nasıl başlarsınız (3-4 adım: talep → deneme → verinizin aktarımı → kullanım) | Mevcut `home.process` |
| P9 | Bağlantılar | Mevcut `integrations` |
| P10 | Güvenlik özeti: **yalnız doğrulanmış** 3-4 madde (veri işletme bazında ayrı ve testli; roller; SHD denetim kaydı) → `/guvenlik/` (açıksa) | §1.6 |
| P11 | Fiyat özeti → `/fiyatlandirma/#<ürün>` | |
| P12 | Ürün SSS (8-12) | Rapor 4.5 listesi, **cevabı üründe olmayan soru "hayır, yol haritasında" diye dürüstçe cevaplanır ya da yazılmaz** |
| P13 | Son CTA bandı | |
| P14 | Teknik künye, katlanır (`<details>`) | Mevcut `specs`; alıcı için ikincil |

### 3.6 Fiyatlandırma (`/fiyatlandirma/`)
Başlık + risk azaltıcı cümleler → ürün seçici (`#hvac`/`#soguk-hava` çapaları; JS'siz iki
bölüm alt alta) → [yalnız yıllık fiyat girilmişse] aylık/yıllık seçici → 3 plan kartı →
notlar (**+ KDV**, "Fiyatlar GG.AA.YYYY tarihinde güncellenmiştir", ödeme yöntemi: havale/EFT +
e-Arşiv fatura, çevrimiçi ödeme yok) → özellik karşılaştırma tablosu (mobilde kart yığını) →
faturalama SSS'i → [S12 evetse] erken kullanıcı programı. Yıllık tasarruf **TL cinsinden
derlemede hesaplanır** (aylık × 12 − yıllık), elle yazılmaz. Plan kartı üç kipi destekler
(§4.4); hangisinin kullanılacağı iş kararıdır (S3).

### 3.7 Diğer sayfalar
- **İletişim:** kanallar (WhatsApp birincil, e-posta, telefon, saat, yanıt süresi) → form
  (ürün önseçimi `?urun=`) → aydınlatma kısa notu + bağlantı → **"İletişim" başlığı altında**
  MADDE 5 tam seti.
- **Hakkımızda (kapılı):** kim geliştiriyor (gerçek ad, fotoğraf, geçmiş, bağlantılar),
  ürünler nasıl doğdu, çalışma ilkeleri (bugünkü "Neden" kartları), özel yazılıma köprü.
- **Güvenlik (kapılı):** veri ayrımı, roller, bağlantı şifrelemesi (üretim alan adı ve HTTPS
  varsa), yedekleme sıklığı ve saklama süresi, verinin bulunduğu ülke/sağlayıcı, abonelik
  bitince veriye ne olur. S10 cevapsızsa üretilmez.
- **Sürüm notları (kapılı):** ADR-10.
- **Özel yazılım:** mevcut 6 hizmet, açılır ayrıntılı; süreç; teknoloji; → iletişim.
- **Yasal:** başlık, son güncelleme tarihi (içerikten, derleme tarihinden değil), gövde,
  "taslak" uyarısı.
- **404:** kısa mesaj + ana sayfa + iki ürün bağlantısı; kök-mutlak yollar.

### 3.8 Rapordaki 12 güven unsurunun yerleşimi

| # | Unsur | Yer | Durum |
|---|---|---|---|
| 1 | Gerçek ekran görüntüleri | H3, H4, P1, P6 | Kapılı (S7). Gelene kadar temsilî görseller "temsilî" etiketiyle. **Rapor P0-7: ekran yoksa fiyat yayınlanmaz.** |
| 2 | Ürün turu videosu | P1 yuvası | COULD, içerik yok |
| 3 | Demo hesap | CTA | HVAC'ta herkese açık adres yok (S4) |
| 4 | Sürüm notları | H6, `/surum-notlari/` | Kapılı (S9) |
| 5 | Açık yol haritası | aynı sayfa | Kapılı (S9) |
| 6 | Teknik derinlik | P7 | İçerik büyük ölçüde mevcut |
| 7 | Test edilebilir hesap iddiası | H2, P7 | Sayılar G5'te doğrulanır |
| 8 | Kim geliştiriyor | H5, `/hakkimizda/` | Kapılı (S8) |
| 9 | Ulaşılabilirlik vaadi | H5, H10, iletişim | Mevcut |
| 10 | Güvenlik sayfası | P10, `/guvenlik/` | Kapılı (S10) |
| 11 | Erken kullanıcı programı | fiyat sayfası | İş kararı (S12) |
| 12 | Risk azaltıcı cümleler | H1, fiyat | Yalnız doğrulananlar |

### 3.9 Tasarımcıya bırakılanlar ve tasarıma konan mimari sınırlar
**Tasarımcının kararı:** renk, tipografi (kendi sunucumuzdan barındırılabilir lisanslı),
yerleşim, bileşen görünümü, hareket, pusula ibresinin etkileşimi (örn. kapılara yönelmesi),
ikon dili, ekran görüntüsü çerçevesi.
**Sınırlar:** çerçeve/kütüphane yok; tek CSS dosyası (kaynakta bölünebilir); her içerik JS
kapalıyken görünür (JS yalnız menü, fiyat seçici, form gönderimi için); `prefers-reduced-motion`
bütün hareketi durdurur; TR metin EN'den ~%20-30 uzun (bileşenler buna göre); büyük harf
dönüşümü CSS `text-transform` ile yapılırsa `lang="tr"` doğru olduğu sürece İ/ı doğru çıkmalı,
gerçek tarayıcıda denenmeden kabul edilmez (D-003); fiyat tablosu mobilde yatay kaydırma değil
kart yığını; görseller WebP, açık `width`/`height`.
**Bileşen envanteri (tasarımın kapsaması gereken):** header + ürün açılır menüsü + dil
anahtarı + CTA; altbilgi (MADDE 5 bloğu dahil); hero (ana sayfa / ürün varyantı); yön kapısı;
gerçeklik şeridi; ürün vitrini; karşılaştırma tablosu; yetenek bloğu + ekran yuvası;
"temsilî" etiketli ekran çerçevesi; teknik derinlik bloğu; adımlar; bağlantı kartı; durum
rozeti (yayında / erken erişim); SSS (`<details>`); plan kartı (3 kip); aylık/yıllık seçici;
plan karşılaştırma tablosu; not kutusu; sürüm notu girdisi; yol haritası sütunu; kişi kartı;
iletişim kanalları; form (hata/gönderiliyor/başarılı/başarısız durumları); yasal metin
düzeni; CTA bandı; 404.

---

## 4. Modül ve dosya iskeleti

### 4.1 Klasör yapısı

```text
dijital-pusula/
├── src/                              # KAYNAK — elle düzenlenen her şey burada
│   ├── site.config.js                # origin (YER TUTUCU), form kipi, analitik, ürün uygulama adresleri
│   ├── company.js                    # SITE_COMPANY (translations.js:8-38'den birebir)
│   ├── routes.js                     # rota kimliği → {tr, en} yol, şablon, enabled, eski URL'ler
│   ├── lib/                          # üretici yardımcıları (tarayıcıya gitmez)
│   │   ├── html.js                   # html`` etiketli şablon (varsayılan kaçışlı) + raw()
│   │   ├── i18n.js                   # t(yol, {param}) — eksik anahtar = hata
│   │   ├── urls.js                   # göreli bağlantı, mutlak canonical, varlık ?v=hash
│   │   ├── format.js                 # TL (tamsayı), tarih (tr-TR / en-GB)
│   │   └── model.js                  # içerik doğrulama: enum'lar, zorunlu alanlar, productState()
│   ├── content/
│   │   ├── facts.js                  # dilden bağımsız ürün gerçekleri + source + checkedAt
│   │   ├── pricing.js                # dilden bağımsız fiyat verisi (tamsayı TL)
│   │   ├── changelog.js              # releases[] + roadmap[] (her girdide tr + en)
│   │   ├── data/                     # ürünlerden üretilen sabit veri (ADR-11)
│   │   ├── tr/  common.js home.js hvac.js cold.js pricing.js services.js contact.js
│   │   │        about.js security.js legal.js notfound.js
│   │   └── en/  (aynı dosya adları, birebir aynı anahtar ağacı)
│   ├── templates/
│   │   ├── layout.js                 # <html lang>, gövde iskeleti, header, footer
│   │   ├── partials/                 # head.js (meta/hreflang/JSON-LD), nav.js, footer.js,
│   │   │                             # company-identity.js, faq.js, plan-card.js, cta-band.js, …
│   │   └── pages/                    # home.js product.js pricing.js contact.js services.js
│   │                                 # about.js security.js changelog.js legal.js notfound.js
│   ├── styles/                       # tokens.css base.css layout.css components/*.css
│   ├── client/site.js                # tarayıcı JS'i (klasik betik; saf mantık node:test ile sınanır)
│   └── static/                       # olduğu gibi kopyalanır
│       ├── favicon.svg, favicon.png, apple-touch-icon.png, _headers
│       └── assets/ logo/ fonts/ screens/<urun>/ og/
├── site/                             # ÜRETİLEN ÇIKTI — elle düzenlenmez, commit'lenir,
│                                     # Cloudflare Pages "output directory"
├── tools/
│   ├── build.js                      # üretici; --check: yeniden üret ve farkı raporla
│   ├── check-site.js                 # yeniden yazılır (§4.5); --release: yayın engelleri hata olur
│   ├── make-og.py                    # korunur; adres ayardan, font yolu parametreli, TR+EN çıktı
│   └── githooks/pre-commit           # build --check (isteğe bağlı, core.hooksPath ile)
├── docs/site-arastirma-raporu.md     # dokunulmaz
├── kadro/
└── README.md                         # yeniden yazılır
```

`package.json` **eklenmez**: çalışma anı ve geliştirme bağımlılığı yok. Testler Node'un
yerleşik `node --test` çalıştırıcısıyla yazılır.

### 4.2 Veri akışı

```
src/company.js ─┐
src/site.config.js ─┤
src/routes.js ──────┼──> tools/build.js ──> model.js (doğrula; hata = dur)
src/content/** ─────┤         │
                    │         ├─ her rota × her dil (enabled olanlar):
                    │         │     ctx = { lang, route, t, url(), asset(), company,
                    │         │             facts, pricing, changelog, config, alternates }
                    │         │     html = pages/<şablon>(ctx) → layout(ctx, html)
                    │         │     → site/<yol>/index.html
                    │         ├─ styles/*.css (sabit sırayla birleştir) → site/assets/site.css
                    │         ├─ client/site.js → site/assets/site.js
                    │         ├─ static/** → site/**   (kopyala)
                    │         └─ sitemap.xml, robots.txt, _redirects → site/
                    │
tools/check-site.js <── site/ (+ build --check)
```
Tarayıcıya giden JS yalnız `site.js`: mobil menü, ürün açılır menüsü, aylık/yıllık seçici,
form (doğrulama, `?urun=` önseçimi, `mailto` taslağı ya da `endpoint` POST). Form mesajları
derlemede `data-msg-*` özniteliklerine basılır; istemciye katalog gitmez.

### 4.3 Şablon ile içerik arasındaki sözleşme
- Şablonlar metin **yazmaz**, yalnız `ctx.t("yol")` çağırır. Metin sabiti görülürse denetimde
  hata (izin verilen istisnalar: marka adı `ctx.t("brand.full")`'dan gelir, noktalama).
- Bağlantılar yalnız `ctx.url("rota-kimligi", {hash})` ile üretilir; elle yazılmış iç
  bağlantı olmaz. Kapalı rotaya `url()` çağrısı derlemeyi durdurur.
- Varlıklar yalnız `ctx.asset("assets/…")` ile: dosya yoksa derleme durur; CSS/JS için
  `?v=<içerik hash'i>` eklenir.
- 404 şablonu için `url()` kök-mutlak yol üretir (sayfa her derinlikte sunulur); diğer
  sayfalarda göreli yol.

### 4.4 İçerik modelleri, enum'lar ve okuyucuları

Enum'lar `model.js`'te tanımlıdır; bilinmeyen değer derlemeyi **durdurur** (sessizce yok
sayılmaz). Her enum'u okuyan yerler **tek bir yardımcı** üzerinden okur; sayılar aşağıda.

| Alan | Değerler | Okuyucular (hepsi yardımcı üzerinden) |
|---|---|---|
| `products.<id>.status` | `live`, `early-access` | rozet, yön kapısı, ürün hero'su, JSON-LD (`early-access`'te `offers` basılmaz), fiyat bölümü → `productState()` — 5 yer |
| `products.<id>.trial.mode` | `self-serve` (`url` zorunlu), `request` | header CTA, hero CTA, plan kartı CTA, CTA bandı → `primaryCta()` — 4 yer |
| `pricing.<id>.plans[].price.mode` | `fixed` (`monthly`/`yearly` tamsayı TL), `from` (`monthly`), `quote` | plan kartı, aylık/yıllık seçici (yalnız `yearly` varsa), JSON-LD `AggregateOffer` (yalnız `fixed`/`from`), fiyat SSS'inde "fiyat neden yazmıyor" sorusu (yalnız `quote`), ana sayfa fiyat özeti → `planPrice()` — 5 yer |
| `config.form.mode` | `mailto`, `endpoint` | istemci formu (`data-mode`), KVKK "aktarım" paragrafı, iletişim notu, check-site → `formMode()` — 4 yer |
| `config.analytics` | `none`, `cloudflare` | head betiği, çerez politikası, KVKK metni → `analytics()` — 3 yer |

Para: **tamsayı TL**, float yok. Biçim `Intl.NumberFormat("tr-TR")` derlemede. Fiyat verisi
`updatedAt` (ISO tarih) taşır; 90 günden eskiyse `check-site` uyarır (statik sitede fiyatın
bayatlaması rapordaki en sık hata).

`facts.js` örneği (biçim, değerler G5'te doğrulanır):
```js
module.exports = {
  hvac: {
    trialDays:  { value: 7,  source: "E:/HVAC Pro Suite/app/licensing.py:10", checkedAt: "2026-09-28" },
    trialUsers: { value: 2,  source: "E:/HVAC Pro Suite/app/licensing.py:12", checkedAt: "2026-09-28" },
    partTypes:  { value: 25, source: "E:/HVAC Pro Suite/app/ventilation/part_config.py:12 (PARTS)", checkedAt: "2026-09-28" }
  }
};
```
Metinde: `"Deneme hesabı {trialDays} gün ve {trialUsers} kullanıcı ile açılır."`. Eksik
parametre = derleme hatası.

### 4.5 `check-site.js` kuralları (yeniden yazım)
Her kural için kasıtlı bozulmuş bir örnekte hata verdiği gösterilmeden kural "var" sayılmaz.
Çıktı denetlenen sayfa/bağlantı/görsel **sayılarını** basar; sıfır sayı hatadır (D-002).
1. `build --check`: `site/` kaynakla eşleşiyor mu.
2. TR/EN anahtar ağacı ve dizi uzunluğu eşliği (içerik dosyası başına).
3. Her HTML: tek `<h1>`, doğru `lang`, kendi canonical'ı (`origin + yol`), karşılıklı
   `hreflang` (tr, en, x-default; her sayfa kendini de listeler), benzersiz `id`'ler.
4. İç bağlantıların ve çapaların hedefi var; kapalı rotaya bağlantı yok.
5. Görseller: dosya var, `width`/`height`/`alt` var (dekoratifse `alt=""` bilinçli).
6. JSON-LD ayrıştırılıyor; `AggregateOffer` fiyatları sayfada görünen fiyatlarla aynı;
   `aggregateRating` yok.
7. `sitemap.xml` = açık rotalar × 2 dil, `xhtml:link` alternatifleriyle; `robots.txt`
   sitemap'e işaret ediyor.
8. `site/` içinde `github.io`, `/dijital-pusula/`, `googleapis`, `gstatic` geçmiyor.
9. Yasak iddia listesi (§3.1) içerik dosyalarında geçmiyor; `facts.js`'te her `source` dolu.
10. `SITE_COMPANY` MADDE 5 alanları (kimlik türüne göre MERSİS **ya da** VKN, KEP, adres,
    e-posta, telefon, meslek odası): normalde uyarı, `--release` ile **hata**.
11. `origin` hâlâ yer tutucuysa (`.example`): normalde uyarı, `--release` ile hata.
12. `pricing.updatedAt` 90 günden eski: uyarı.
13. `endpoint` kipinde sağlayıcı adı/ülkesi boş: hata.

### 4.6 Barındırma dosyaları
- **Alan adı tek yerde:** `src/site.config.js` → `origin: "https://www.dijitalpusula.example"`
  (RFC 2606 ayrılmış alan; yanlışlıkla yayında kalırsa `check-site --release` durdurur).
  Canonical, hreflang, OG, JSON-LD, sitemap, robots ve OG görsellerindeki adres buradan gelir.
  Başka hiçbir dosyada mutlak alan adı yazılmaz.
- **`site/_redirects`** (routes.js'teki `legacy` alanından üretilir, 301):
  `/havalandirma-yazilimi.html` ve `/havalandirma-yazilimi` → `/hvac-pro-suite/`;
  `/soguk-hava-deposu-yazilimi(.html)` → `/soguk-hava-deposu/`; `/ozel-yazilim.html` →
  `/ozel-yazilim/`; `/gizlilik(.html)` → `/yasal/kvkk-aydinlatma-metni/`;
  `/cerez-politikasi.html` → `/yasal/cerez-politikasi/`; `/kullanim-sartlari(.html)` →
  `/yasal/kullanim-kosullari/`.
- **`site/_headers`:** `X-Content-Type-Options: nosniff`, `Referrer-Policy:
  strict-origin-when-cross-origin`, `Permissions-Policy` (kamera/mikrofon/konum kapalı),
  `X-Frame-Options: DENY`. CSP SHOULD: satır içi betik kalmadığı doğrulanınca eklenir.
- **Varsayımlar (doğrulanmadı, ilk yayında sınanacak):** Cloudflare Pages `_redirects` ve
  `_headers` dosyalarını çıktı kökünde okur; kökte `404.html` varsa bilinmeyen yollar için
  onu 404 koduyla sunar (yoksa SPA varsayıp `index.html`'i 200 ile döndürür); `/en/404.html`
  en yakın üst klasör kuralıyla EN yollarda kullanılır. D-005 gereği ilk yayında gerçek bir
  olmayan URL'ye istek atılıp **durum kodu** ve gövde gözle doğrulanır; çıkış kodu ya da
  panelin "başarılı" yazısı yetmez. EN 404 kuralı tutmazsa EN ziyaretçi TR 404'ü görür
  (EN bağlantılı), kabul edilebilir bozulma.

---

## 5. Sıralı görev listesi

Sahipler: **G** = `gelistirici`, **A** = `arayuz-gelistirici`. Dosya sahipliği (paralel
çalışmada çakışmamak için): G → `tools/`, `src/lib/`, `src/content/`, `src/*.js`,
`src/templates/partials/head.js`; A → `src/templates/` (head.js hariç), `src/styles/`,
`src/client/`, `src/static/`. Tek dal: `yeniden-kurulum`.

### Aşama 0 — tasarımdan bağımsız (ETKI onayından hemen sonra başlayabilir)

| # | Sahip | Görev | Bitti ölçütü |
|---|---|---|---|
| G0 | G | `yeniden-kurulum` dalını aç; `main`'e dokunma. | `git branch --show-current` → `yeniden-kurulum`. |
| G1 | G | Üretici iskeleti: `tools/build.js`, `src/lib/*`, `routes.js`, `site.config.js`, tüm rotaları çizen geçici düz bir şablon. | `node tools/build.js` → açık rota sayısı × 2 HTML + 2 × 404. Art arda iki çalıştırmada `site/` hash'leri aynı. `site/` içinde bir dosya elle değiştirilince `--check` sıfır olmayan kodla çıkar. Bir EN anahtarı yapay olarak silinince derleme anahtar yolunu yazarak durur. Kapalı bir rotaya `url()` çağrısı derlemeyi durdurur. |
| G2 | G | İçerik taşıma: `translations.js` → `src/content/{tr,en}/*.js`; `SITE_COMPANY` → `src/company.js` birebir; sabit sayılar `facts.js`'e; `notFound` → `notfound.js`; yasal metin tek kaynak. | Eski ve yeni `SITE_COMPANY` alan alan eşit (betikle karşılaştırma). İçerikte "7 gün"/"7 days"/"25 parça" sabit metni yok, hepsi `{param}`. Eşlik denetimi temiz. |
| G3 | G | `check-site.js` yeniden yazımı (§4.5, 13 kural) + `node --test` altında her kural için negatif örnek. | Her kural bozuk örnekte hata veriyor; temiz çıktıda denetlenen sayfa/bağlantı/görsel sayıları basılıyor ve sıfır değil. |
| G4 | G | `head.js`: title, description, canonical, hreflang, OG/Twitter, JSON-LD (Organization her sayfa; SoftwareApplication ürün; AggregateOffer yalnız `fixed`/`from`; FAQPage; BreadcrumbList). `sitemap.xml`, `robots.txt`, `_redirects`, `_headers` üretimi. | check-site kural 3, 6, 7, 8 temiz. `site/` içinde `github.io` 0 eşleşme. `_redirects` satır sayısı = `legacy` girdileri. |
| G5 | G | İçerik doğrulama turu (ürün depolarına karşı, §1.6): test sayıları sayılır ya da ifade sayısız yapılır; SSS "deneme bitince ne olur" cevabı `licensing.py`'dan okunur; yasak iddialar temizlenir. | `facts.js`'te her girdi `source` + `checkedAt` taşıyor; kural 9 temiz; değiştirilen her cümle için dosya:satır kaynağı raporda. |
| G6 | G | Yasal metinlerin yeniden yazımı (rapor 6.1, 6.6, 6.8, 6.9 DOĞRULANDI maddeleri): hukuki sebep, aktarım paragrafı `formMode()`'dan, çerez/yerel depolama yok, analitik koşullu, EN bağlayıcılık notu, "taslak — avukat" uyarısı korunur. DOĞRULANMADI maddeler (ETBİS, mesafeli satış) uyarı notuyla taşınır, uygulanmaz. | `form.mode` `mailto` ↔ `endpoint` değiştirilerek iki derleme alındığında yalnız aktarım paragrafı ve iletişim notu farklı (diff). `analytics` için aynı sınama. |

G2, G3, G4 G1'den sonra **paralel** yapılabilir (ayrık dosyalar). G5 G2'ye, G6 G2'ye bağlı.

### Aşama 1 — `TASARIM-STANDARDI.md` onaylandıktan sonra

| # | Sahip | Görev | Bitti ölçütü |
|---|---|---|---|
| A1 | A | Stil temeli: belirteçler, taban, yerleşim, kendi sunucumuzdan yazı tipleri, marka bileşeni (pusula animasyonu, reduced-motion). | `site/assets/site.css` tek dosya; `site/` içinde harici yazı tipi isteği 0; reduced-motion açıkken ibre duruyor (tarayıcıda gözlem). |
| A2 | A | Kabuk: layout, header, ürün açılır menüsü, dil anahtarı, CTA (`primaryCta()`), altbilgi + MADDE 5 bloğu, CTA bandı. | 28 sayfada tek kaynaktan; dil anahtarı karşı sayfaya gidiyor (kural 4); menü klavyeyle açılıp Esc ile kapanıyor; JS kapalıyken altbilgide firma bilgileri görünüyor. |
| A3 | A | Ana sayfa (§3.4, H1-H10). | Bölüm sırası §3.4 ile aynı; kapılı içerik yokken bölüm boş kutu olarak değil hiç çıkmıyor. |
| A4 | A | Ürün şablonu (§3.5, P1-P14), iki ürün tek şablon. | İki ürün sayfası aynı şablondan; `status: early-access` verildiğinde rozet, CTA ve JSON-LD birlikte değişiyor. |
| A5 | A | Fiyat şablonu (§3.6), üç kip. | Üç kip için örnek veriyle üç derleme; seçici yalnız `yearly` varken çıkıyor; mobil genişlikte tablo kart yığını. |
| A6 | A | İletişim sayfası + form + `client/site.js`. Saf mantık (doğrulama, mailto gövdesi, `?urun=` çözümü) ayrı fonksiyonlarda, `node --test` ile sınanır. | Birim testleri koşuyor (sayısı raporda); `endpoint` kipinde sahte uç noktaya 500 dönülünce yedek kanallar gösteriliyor ve otomatik tekrar yok (tarayıcıda gözlem). |
| A7 | A | Özel yazılım, yasal, 404 şablonları; kapılı sayfaların şablonları (hakkımızda, güvenlik, sürüm notları) içerik gelince açılacak halde. | 404 kök-mutlak yollarla, iki dilde; kapılı rotalar `enabled: true` yapılınca örnek içerikle derleniyor. |
| A8 | A | Görseller: ekran çerçevesi + manifest (alt metinleri iki dilde); OG PNG'lerin TR+EN yeniden üretimi (`make-og.py` adres ayardan, font yolu parametre). | Yeni OG PNG'lerde `github.io` yazısı yok (görsel kontrol); 1200×630. |

A2 önce, sonra A3-A7 paralel yapılabilir (ayrı şablon dosyaları). A1 ve A2 aynı kişide sıralı.

### Aşama 2 — temizlik ve teslim

| # | Sahip | Görev | Bitti ölçütü |
|---|---|---|---|
| G7 | G | §1.3'teki dosyaların silinmesi (ekran SVG'leri koşullu). | Kökte yalnız: `src/ site/ tools/ docs/ kadro/ README.md .gitignore`; `git status` silinenleri §1.3 ile birebir listeliyor; derleme + check temiz. |
| G8 | G | README yeniden yazımı (akış: içerik düzenle → derle → denetle → commit; Cloudflare ayarı: build command boş, output `site`; alan adının tek yeri; form/analitik değişince yasal metnin kendiliğinden güncellendiği; kapılı rotayı açma). `tools/githooks/pre-commit` + `git config core.hooksPath tools/githooks` notu. | README'deki her komut gerçekten çalıştırıldı ve çıktısı raporda. |
| T1 | sinayici / gorsel-denetici | 28 sayfa × (mobil, tablet, masaüstü) × (JS açık/kapalı) gözden geçirme; klavye gezinmesi; Türkçe karakterlerin (İ, ı, ğ, ş) başlık/büyük harf dönüşümünde doğruluğu. | Bulgu listesi; engelleyici bulgu 0. |
| T2 | kullanıcı | Cloudflare Pages projesi, `yeniden-kurulum` dalının önizleme dağıtımı, §4.6 varsayımlarının gerçek istekle sınanması; onaydan sonra `main`'e birleştirme; GitHub Pages'in kapatılması (S15). | Önizleme adresinde olmayan bir URL 404 koduyla dönüyor; eski `.html` URL 301 veriyor. |

---

## 6. Reddedilen alternatifler — özet

| Karar | Seçilen | Reddedilen | Neden |
|---|---|---|---|
| Yapım | Kendi üreticimiz, commit'lenen çıktı | Derlemesiz elle 28 dosya | Kopya ayrışması bugün bile var (404) |
| | | İstemcide parça yükleme | SEO ve JS bağımlılığı çözülmez |
| | | Eleventy/Astro | npm zinciri, tek kişiye öğrenme yükü |
| | | Cloudflare'da derleme | Yayına giden ≠ denetlenen; Node sürümü varsayımı |
| Dil | `/en/` + İngilizce slug | JS ile tek URL | Yalnız TR dizine giriyor |
| | | `?lang=`, alt alan adı, otomatik yönlendirme | Canonical karmaşası / DNS yükü / yanlış dil |
| Marka | Ad + simge + slogan sabit | Yeniden markalama | Kapsam sitenin dışına taşar; kullanıcıya soruluyor (S2) |
| Fiyat | Tek sayfa | Ürün başına sayfa | Notlar ve SSS ikiye bölünür |
| Çerez | Bant yok | Bilgilendirme bandı | Rapor 6.8: gerekmiyor; sürtünme |
| Yazı tipi | Kendi sunucumuzdan | Google Fonts | Harici istek, gizlilik maddesi |
| Form | `/iletisim/`'de tek form, ayar güdümlü | Her sayfada form; haber listesi | Çoklu davranış; İYS |
| Rıza | Aydınlatma bildirimi | Zorunlu rıza kutusu | Rapor 6.6 (DOĞRULANDI) |
| Yasal | 3 + 1 koşullu | 4 ayrı + mesafeli satış | Örtüşme; tahsilat yok |
| Sürüm notları | Tek sayfa | Ayrı yol haritası sayfası | İki güncelleme yeri |
| Hesap gösterimi | Ürün motorunun çıktısı | JS formül kopyası, 3D görüntüleyici | Tek kaynak; sayfa ağırlığı |
| SSS | `<details>` | JS akordeon | JS'siz çalışır |

---

## 7. Israrlı kontroller

- **Kimlik:** Üretici `site/`'i her seferinde sıfırdan yazar; kaldırılmış bir rota bayat dosya
  bırakamaz. Sayfa içi `id`'ler ön ekli (`faq-hvac-3`); aynı sayfada iki SSS olduğunda
  (fiyat sayfası) çakışma kural 3 ile yakalanır. Çapa kimlikleri dilden bağımsız ASCII.
- **Eşzamanlılık:** Tek dal, iki ajan, ayrık dosya sahipliği (§5 başı). Ortak dosya
  (`routes.js`) yalnız G'de; A yeni rota gerektirirse G'den ister.
- **Hata yolu:** Form uç noktası 2xx dışında (429/5xx dahil) otomatik tekrar denemez, yedek
  kanal gösterir. Derlemede eksik anahtar, bilinmeyen enum, eksik varlık ve kapalı rotaya
  bağlantı **sessizce geçilmez, derlemeyi durdurur** (bugünkü `t()` sessizce `undefined`
  dönüyor, `main.js:45-47`).
- **Config yalanı:** Her ayarın okuyanı §4.4 tablosunda. `form.mode` ve `analytics` yasal
  metni de sürer; Cloudflare panelinden analitik **yalnız** `site.config.js` güncellenip
  yeniden derlendikten sonra açılmalı (panel ayarı depoda görünmez; README'ye yazılır).
  `SITE_COMPANY`'deki boş MADDE 5 alanı `--release`'te yayını durdurur.
- **Yeni enum değeri:** Beş enum, her biri tek yardımcı üzerinden okunuyor, okuyucu sayıları
  §4.4'te. Bilinmeyen değer derlemeyi durdurur.
- **Tek kaynak:** firma bilgisi (`company.js`), ürün sayıları (`facts.js`), fiyat ve tarih
  (`pricing.js`), rota/menü/site haritası/yönlendirme (`routes.js`), alan adı
  (`site.config.js`), yasal metin (yalnız `legal.js`), sürüm notları (ana sayfa bloğu aynı
  veriden), 404 (aynı kabuk), kırılma noktaları (tek belirteç dosyası), yıllık tasarruf
  (hesaplanır, yazılmaz), JSON-LD fiyatı (görünen fiyatla aynı veriden).

---

## 8. Geri alma planı

- Depo git'te, çalışma ağacı temiz (yalnız `kadro/` izlenmiyor). Engel yok.
- Bütün iş `yeniden-kurulum` dalında. `main` ve canlı site birleştirmeye kadar etkilenmez.
- Birleştirme sonrası geri dönüş: `git revert -m 1 <birleştirme-commit'i>`; Cloudflare
  Pages'te ayrıca önceki dağıtıma panelden geri dönülebilir (**varsayım**: Pages dağıtım
  geçmişi tutar, doğrulanmadı).
- Silinen dosyalar (`main.js`, `translations.js`, eski HTML) git geçmişinde; `SITE_COMPANY`
  birebir taşındığı için veri kaybı yok.
- Geri alınamayan tek şey dış dünyadaki önbellekler: sosyal platformların OG önbelleği ve
  arama dizini. Bunlar birleştirme anında değil, alan adı değişiminde etkilenir.

---

## 9. Kullanıcıya sorular / onay bekleyen kararlar

**TASARIM fazını engelleyenler**

- **S1. Yapım yöntemi (ADR-1).** Site artık `node tools/build.js` ile üretilecek ve çıktı
  `site/` klasörüne commit'lenecek. Barındırıcıda derleme olmayacak; Cloudflare ayarı
  "build command boş, output directory `site`". Her içerik değişikliğinden sonra tek komut
  çalıştırılması gerekecek. Onaylıyor musunuz?
- **S2. Marka.** "Dijital Pusula" adı, pusula simgesi ve "Doğru yerdesiniz." sloganı sabit
  kalsın, tasarımcı yalnız görsel dili (renk, yazı tipi, yerleşim, hareket) yeniden kursun mu?
  Yoksa simgenin yeniden çizilmesine ya da markanın bütünüyle yeniden düşünülmesine de açık
  mısınız? (İkincisi bu işin kapsamını büyütür, ayrı iş olarak öneririm.)

**UYGULAMA'da içeriği ya da yayını engelleyenler (iş kararları, mimar vermez)**

- **S3. Fiyat gösterimi.** (a) Açık fiyat (TL + KDV); (b) "…'den başlayan" fiyat; (c) bugünkü
  gibi paket içeriği açık, rakam teklifle. Rapor (a)'yı öneriyor. Not: ürün **yıllık** lisans
  veriyor (`licensing.py:8`); aylık fiyat yazılırsa yenilemenin elle aylık yapılması gerekir.
  (a) veya (b) seçilirse: rakamlar, yıllık indirim, fiyat tarihi ve **iade/iptal politikası**
  (abonelik şartları sayfası bunu bekliyor). Ayrıca rapor P0-7: gerçek ekran görüntüleri
  olmadan fiyat yayınlanmamalı.
- **S4. Herkese açık deneme adresi.** HVAC Pro Suite'in herkesin kayıt olabileceği bir üretim
  adresi var mı? Ürün README'si (`:93`) üretim alan adını "kalanlar" listesinde gösteriyor.
  Yoksa birincil CTA "Deneme Hesabı İsteyin" (→ iletişim) olur; adres gelince tek ayarla
  "Ücretsiz Deneyin"e döner.
- **S5. Soğuk Hava Deposu'nun durumu.** Bugünkü site "Yayında" diyor, araştırma raporu
  "netleşmedi" diyordu. Şu an bir müşteriye açılıp kullandırılabilir mi (→ `live`), yoksa
  "Erken erişim" mi (→ `early-access`)?
- **S6. Form kipi.** Açılışta öneri: form `mailto` kipinde, WhatsApp + e-posta birincil. Web3Forms/
  Formspree bağlamak isterseniz KVKK md. 9 yurt dışı aktarım yükü doğar (standart sözleşme +
  5 iş günü içinde bildirim). Hangisi?
- **S7. Ekran görüntüleri.** Siz mi sağlayacaksınız, yoksa iki ürünü yerelde demo veriyle
  (SHD'de `seed_demo` var) çalıştırıp anonim ekran görüntülerini kadro mu alsın?
- **S8. Hakkımızda.** Gerçek ad, fotoğraf, kısa geçmiş ve bağlantılarla bir "kim geliştiriyor"
  sayfası yayınlanabilir mi? Evetse fotoğraf ve 3-4 cümle.
- **S9. Sürüm notları ve yol haritası.** İki ürün deposunun `git log`'undan taslak sürüm
  notları çıkarılıp size onaya sunulsun mu? Yol haritasına hangi maddeler girsin
  (ör. çevrimiçi ödeme, Excel'den içe aktarma, veri dışa aktarma)?
- **S10. Güvenlik sayfası bilgileri.** Sunucu sağlayıcısı ve ülkesi, yedekleme sıklığı ve
  saklama süresi, abonelik bitince verinin kaç gün tutulduğu. HVAC README'sine göre saklama
  politikası henüz yok (`:95`). Bu bilgiler gelmeden sayfa yayınlanmaz, ürün sayfalarında yalnız
  doğrulanmış kısa özet olur.
- **S11. İngilizce kapsamı.** EN tüm sayfaların tam aynası mı olsun (varsayılan), yoksa yalnız
  ana sayfa + ürünler + iletişim + yasal mı? Ürün arayüzleri yalnız Türkçe ve her sürüm notu iki
  dilde yazılmak zorunda kalacak.
- **S12. Erken kullanıcı programı** (rapor önerisi: "ilk 5 firmaya 1 yıl %50 indirim, karşılığında
  geri bildirim"). Olsun mu, koşulları ne?
- **S13. Analitik.** Açılışta Cloudflare Web Analytics (çerezsiz) açılsın mı, yoksa hiç
  analitik olmasın mı?
- **S14. Alan adı.** Hangi alan adı alınacak? O güne kadar yer tutucu `dijitalpusula.example`
  kullanılır; değişim tek satır (`src/site.config.js`).
- **S15. GitHub Pages.** Cloudflare'a geçince eski github.io sitesi kapatılsın mı, yoksa yeni
  adrese yönlendiren tek sayfalık bir yönlendirme mi bırakılsın? GitHub Pages şu an `main`
  dalının kökünden mi yayın yapıyor? Evetse birleştirme sırası §1.4-2'ye göre yapılmalı.
- **S16. Yasal sayfa birleştirme.** Gizlilik ve KVKK aydınlatma metninin tek sayfada
  birleşmesi (ADR-9) uygun mu? Avukat okuması hâlâ gerekli; MERSİS mi VKN mi yazılacağı mali
  müşavir sorusu (README:66).
- **S17. Örnek hesap tablosu (ADR-11).** HVAC ürün sayfasında gerçek hesap motorunun ürettiği
  birkaç örnek hesabı (parça, ölçü → alan, fire, kg) gösterelim mi? Bunun için HVAC deposunda
  küçük bir betik çalıştırılması gerekir.

**Bilgi (karar gerekmez):** Rapordaki "logo teklifte yok" ve "teklif geçerlilik süresi
kullanılmıyor" bulguları ürün tarafında kapanmış (§1.6); site bu iki özelliği yazmaya devam
edebilir.
