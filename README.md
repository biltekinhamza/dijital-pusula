# Proje Bahçesi — ürün sitesi

İki yazılım ürününü tanıtan ve satışa yönlendiren, iki dilli (TR / EN) statik site.

- **HVAC Pro Suite** — havalandırma imalatçıları için teklif, maliyet ve sipariş yönetimi
- **Soğuk Hava Deposu Yönetim Sistemi** — meyve soğuk hava depoları için 3D yerleşim, stok ve depolama hesabı
- **Özel yazılım / otomasyon** — ürünlerin dışında kalan işler (ikincil)

Derleme adımı, çerçeve, paket bağımlılığı yok: semantik HTML5, CSS3 ve düz JavaScript.

---

## 🔴 Yayın öncesi kritik: barındırma

**GitHub Pages bu siteyi barındırmak için kullanılamaz.** GitHub'ın kendi ek ürün
şartları (GitHub Terms for Additional Products and Features → GitHub Pages) aynen
şunu diyor:

> "GitHub Pages is not intended for or allowed to be used as a free web hosting
> service to run your online business, e-commerce site, or any other website that
> is primarily directed at either facilitating commercial transactions or
> providing commercial software as a service (SaaS)."

Site bir tanıtım/portfolyo sitesiyken bu madde sorun değildi. Fiyat/paket bölümü,
deneme çağrısı ve ürün satışı eklendiği anda kapsamın içine giriyor.

**Ne yapılmalı:** dosyalar aynen kalacak şekilde barındırma taşınmalı. Ticari
kullanıma izin veren, ücretsiz katmanı olan ve derleme adımı gerektirmeyen
seçenek: **Cloudflare Pages** (veya Netlify). Bu depoyu bağlamak yeterli;
`build command` boş, `output directory` kök dizin.

Taşındıktan sonra bu dosyalardaki adresler güncellenmeli:

- her `.html` içindeki `<link rel="canonical">` ve `og:url` / `og:image`
- `sitemap.xml` içindeki `<loc>` değerleri
- `robots.txt` içindeki `Sitemap:` satırı
- `404.html` içindeki `/proje-bahcesi/...` mutlak yolları (özel alan adında `/...` olur)

---

## Yayın öncesi kontrol listesi

- [ ] **Barındırmayı taşı** (yukarıdaki bölüm) — P0
- [ ] `js/translations.js` içindeki **`SITE_COMPANY`** bloğunu gerçek bilgilerle doldur — P0
- [ ] Form uç noktasını bağla (`js/main.js` → `FORM_ENDPOINT`) — P0
- [ ] Yasal metinleri avukata okut (`gizlilik.html`, `cerez-politikasi.html`, `kullanim-sartlari.html`)
- [ ] ETBİS kaydı gerekip gerekmediğini mali müşavire sor
- [ ] `node tools/check-site.js` temiz dönüyor mu
- [ ] Gerçek ekran görüntülerini `assets/images/product-*.svg` yerine koy

### `SITE_COMPANY` neden zorunlu

Elektronik Ticaret Hizmet Sağlayıcılar Hakkında Yönetmelik (RG 29/12/2022, 32058)
**MADDE 5**, ana sayfada **"İletişim" başlığı altında doğrudan erişilebilir** şekilde
şunları şart koşuyor:

| | Esnaf / sanatkâr | Tacir (limited, A.Ş. veya esnaf sınırını aşan şahıs işletmesi) |
|---|---|---|
| Kimlik | Ad + soyad | Ticaret unvanı |
| Numara | Vergi kimlik numarası | **MERSİS numarası** |
| Adres | Merkez adresi | Merkez adresi |
| KEP | Zorunlu | Zorunlu |
| E-posta, telefon | Zorunlu | Zorunlu |
| Meslek odası | Zorunlu | Zorunlu |

Hangi kategoriye girdiğinizi mali müşavirinize sorun. `SITE_COMPANY` içinde boş
bıraktığınız alan sitede hiç gösterilmez — yani eksik bırakırsanız yükümlülük
sessizce karşılanmamış olur. `node tools/check-site.js` hangi alanların hâlâ yer
tutucu olduğunu her çalıştırmada listeler.

---

## Dosya yapısı

```text
proje-bahcesi/
├── index.html                        # ana sayfa (ürün vitrini + SSS + iletişim)
├── havalandirma-yazilimi.html        # HVAC Pro Suite ürün sayfası
├── soguk-hava-deposu-yazilimi.html   # Soğuk Hava Deposu ürün sayfası
├── ozel-yazilim.html                 # özel yazılım / otomasyon hizmetleri
├── gizlilik.html                     # KVKK aydınlatma metni
├── cerez-politikasi.html
├── kullanim-sartlari.html
├── 404.html                          # kendi kendine yeten, iki dilli
├── sitemap.xml
├── robots.txt
├── css/style.css
├── js/
│   ├── translations.js               # SITE_COMPANY + bütün site metni (TR/EN)
│   └── main.js                       # i18n motoru, sayfa çizicileri, form
├── assets/
│   ├── images/                       # ürün görselleri + OG kartları (PNG)
│   └── logo/
├── tools/                            # geliştirme yardımcıları (siteye dahil değil)
└── docs/site-arastirma-raporu.md     # dönüşüm araştırması ve öncelik listesi
```

---

## İçerik nasıl güncellenir

**Bütün metin `js/translations.js` içinde.** HTML'de metin aramayın; sayfalarda
`data-i18n="products.hvac.name"` gibi noktalı yollar var, `main.js` bunları
katalogtan çözer.

```js
// js/translations.js
tr: { products: { hvac: { name: "HVAC Pro Suite", ... } } }
en: { products: { hvac: { name: "HVAC Pro Suite", ... } } }
```

Kural: **`tr` ve `en` ağaçlarının anahtarları birebir aynı olmalı**, dizilerin
uzunlukları da eşit olmalı. `node tools/check-site.js` ikisini de denetler.

### İstisna: yasal sayfalar

`gizlilik.html`, `cerez-politikasi.html` ve `kullanim-sartlari.html` içindeki
Türkçe metin **HTML'e de gömülüdür** — JavaScript çalışmadığında da okunabilsin
diye. Dil değiştirildiğinde `main.js` bu bloğu katalogtaki karşılığıyla değiştirir.
**Bir yasal metni güncellerken hem HTML'i hem `translations.js`'i güncelleyin.**
Ziyaretçinin gördüğü sürüm katalogtan gelendir.

### Sık yapılan işler

| İş | Yer |
|---|---|
| Paket içeriği / fiyat | `translations.js` → `products.<urun>.packages.plans` |
| Modül açıklaması | `products.<urun>.modules` |
| "Excel yerine" tablosu | `products.<urun>.comparison.rows` |
| SSS | `home.faq.items` |
| İletişim bilgisi | `SITE_COMPANY` (tek yer) |
| Renk / boşluk | `css/style.css` üstündeki `:root` değişkenleri |

---

## Form

Demo/fiyat formu iki kipte çalışır:

- **`FORM_ENDPOINT` boşken** (bugünkü hâli): ziyaretçinin e-posta uygulamasında
  hazır bir taslak açar. Kurulum gerektirmez ama dönüşümü düşüktür.
- **`FORM_ENDPOINT` doluyken**: form doğrudan POST edilir, ziyaretçi siteden
  ayrılmaz, sonuç ekranda gösterilir.

Bağlamak için `js/main.js` başındaki iki sabiti doldurun:

```js
const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";  // veya Web3Forms
const FORM_ACCESS_KEY = "";                               // yalnızca Web3Forms
```

Başka hiçbir yeri değiştirmeniz gerekmez. Formu bir üçüncü taraf servise
gönderdiğiniz an bu, `gizlilik.html`'de belirtilen "aktarım" kapsamına girer;
metin bunu zaten söylüyor, sağlayıcı adını eklemek isterseniz orayı güncelleyin.

---

## Yerel önizleme

Derleme yok; `index.html` doğrudan açılabilir. Göreli yollar ve `fetch` davranışı
için yerel sunucu tercih edilir:

```bash
npx serve .
# veya
python -m http.server 8000
```

## Denetim

```bash
node tools/check-site.js
```

Bağımlılıksız çalışır ve şunları denetler: JavaScript sözdizimi, TR/EN anahtar
eşliği, dizi uzunlukları, sayfalardaki her `data-i18n` yolunun iki dilde de
çözülmesi, iç bağlantıların gerçekten var olması, `main.js`'in aradığı `id`'lerin
sayfalarda bulunması ve `SITE_COMPANY` içinde kalan yer tutucular.

```bash
npm install jsdom          # yalnızca bu test için
node tools/render-test.js
```

Her sayfayı jsdom içinde gerçekten çalıştırır; dinamik blokların dolduğunu ve
sayfaların iki dilde de hatasız kurulduğunu doğrular.

```bash
npm install postcss        # yalnızca bu araç için
node tools/prune-css.js    # kuru çalışma; yazmak için --apply
```

Hiçbir HTML/JS dosyasında geçmeyen CSS kurallarını bulur. Yazmadan önce,
**kullanılan** sınıfların kurallarının kaybolmadığını doğrular ve doğrulama
başarısız olursa hiçbir şey yazmaz.

```bash
python tools/make-og.py    # Pillow gerekir
```

Sosyal medya paylaşım kartlarını (`assets/images/og-*.png`) yeniden üretir.
**Bunlar PNG olmak zorunda** — hiçbir sosyal platform OG görseli olarak SVG
işlemez, SVG bırakılırsa her paylaşım boş kart olarak çıkar.

---

## Bilinen eksikler

- **Ekran görüntüleri temsilîdir.** `assets/images/product-*.svg` dosyaları elle
  çizilmiş arayüz taslaklarıdır. Uygulamalardan alınmış gerçek (anonimleştirilmiş)
  ekran görüntüleri en güçlü güven unsurudur; ilk fırsatta değiştirilmeli.
- **İngilizce içerik ayrı URL'de değil.** Dil değişimi JavaScript ile yapılıyor,
  tek URL var; bu yüzden arama motorları yalnızca Türkçe sürümü dizine alır.
  İngilizce trafiği hedeflenecekse `/en/` altında ayrı sayfalar ve karşılıklı
  `hreflang` gerekir.
- **Çevrimiçi ödeme yok.** Paket bölümü fiyat teklifine yönlendirir; sitede
  tahsilat yapılmaz. `kullanim-sartlari.html` bunu açıkça söyler.
- **Analitik yok.** Google Analytics eklenirse KVKK'ya göre opt-in çerez onayı
  zorunlu hâle gelir. Çerezsiz bir seçenek (ör. Cloudflare Web Analytics) bu
  yükümlülüğü doğurmaz.

Ayrıntılı gerekçeler, kaynaklar ve öncelik listesi için
[docs/site-arastirma-raporu.md](docs/site-arastirma-raporu.md).

---

## Tarayıcı desteği

Chrome, Edge, Firefox ve Safari'nin güncel sürümleri. `IntersectionObserver` ve
`matchMedia` yokluğunda site çalışmaya devam eder (yalnızca animasyonlar kapanır);
`localStorage` engellendiğinde de kırılmaz — dil tercihi hatırlanmaz, o kadar.
