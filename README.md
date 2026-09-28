# Dijital Pusula — ürün sitesi

İki yazılım ürününü tanıtan ve satışa yönlendiren, iki dilli (TR / EN) statik site.

- **HVAC Pro Suite** — havalandırma imalatçıları için teklif, maliyet ve sipariş yönetimi
- **Soğuk Hava Deposu Yönetim Sistemi** — meyve soğuk hava depoları için 3D yerleşim, stok ve depolama hesabı
- **Özel yazılım / otomasyon** — ürünlerin dışında kalan işler (ikincil)

Site **kaynaktan üretilir**: `src/` altındaki içerik/şablon dosyaları elle
düzenlenir, `node tools/build.js` bunlardan statik HTML/CSS/JS üretip
`site/` klasörüne yazar, `site/` **de depoya commit'lenir**. Barındırıcıda
(Cloudflare Pages) hiçbir derleme çalışmaz — orada yalnız `site/` dizini
olduğu gibi yayınlanır. Bağımlılıksız: `package.json` yok, üretici yalnız
Node'un yerleşik modüllerini kullanır; testler `node --test` ile çalışır.

Ayrıntılı gerekçeler için [`kadro/ETKI-ANALIZI.md`](kadro/ETKI-ANALIZI.md).

---

## İçerik düzenleme akışı

Her değişiklik aynı üç adımı izler:

```bash
# 1. src/ altında ilgili dosyayı düzenle (aşağıdaki tablo)
# 2. site/'i yeniden üret
node tools/build.js

# 3. üretimin kurallara uyduğunu denetle
node tools/check-site.js

# 4. commit (hem src/ hem site/ birlikte)
```

`site/` **elle düzenlenmez** — bir sonraki `node tools/build.js` onu
sıfırdan yeniden yazıp üzerine yazar. `site/`'i düzenleyip commit
unutulursa canlı site kaynaktan sapar; bunu yakalamak için:

```bash
node tools/build.js --check
```

Bu komut `site/`'i belleğe yeniden üretir ve diskteki `site/` ile
karşılaştırır; fark varsa (`src/` değişmiş ama `build.js` çalıştırılmamışsa)
sıfırdan farklı bir çıkış koduyla durur ve farkları listeler. Commit
öncesi bunu otomatikleştirmek isterseniz (isteğe bağlı):

```bash
git config core.hooksPath tools/githooks
```

`tools/githooks/pre-commit` her commit'ten önce `build --check` ve
`check-site`'ı çalıştırır; biri başarısız olursa commit durur.

### Sık yapılan işler — hangi dosya

| İş | Dosya |
|---|---|
| Ürün metni (sorun/çözüm, karşılaştırma, modüller, SSS) | `src/content/{tr,en}/hvac.js`, `cold.js` |
| Ana sayfa metni | `src/content/{tr,en}/home.js` |
| Fiyat / paket verisi | `src/content/pricing.js` (dilden bağımsız, tamsayı TL) |
| Ölçülebilir ürün gerçekleri (deneme süresi, parça sayısı, …) | `src/content/facts.js` — her girdide `source` (dosya:satır) ve `checkedAt` zorunlu |
| Sürüm notları / yol haritası | `src/content/changelog.js` |
| Yasal metinler (KVKK, çerez, kullanım koşulları) | `src/content/{tr,en}/legal.js` — **tek kaynak**, başka hiçbir dosyada tekrarlanmaz |
| Firma bilgisi (MADDE 5) | `src/company.js` |
| Alan adı, form ayarı, analitik | `src/site.config.js` |
| Rota tablosu, menü, site haritası | `src/routes.js` |
| Renk / tipografi / boşluk jetonları | `src/styles/tokens.css` |
| Sayfa iskeleti, bileşenler | `src/templates/` |

Kural: **`tr` ve `en` içerik ağaçlarının anahtarları ve dizi uzunlukları
birebir eşit olmalı.** Eksik bir EN anahtarı `node tools/build.js`'i
durdurur (anahtar yolunu yazar); sessizce atlanmaz.

---

## Alan adı — tek yer

Gerçek alan adı **yalnızca** `src/site.config.js` içindeki `origin`
alanında yazılır:

```js
module.exports = {
  origin: "https://www.dijitalpusula.example", // RFC 2606 yer tutucu
  ...
};
```

Canonical, hreflang, OG etiketleri, JSON-LD, `sitemap.xml`, `robots.txt`
ve OG paylaşım görselleri (`tools/make-og.py`) hepsi buradan üretilir.
Gerçek alan adı alınana kadar yer tutucu kalır; `node tools/check-site.js
--release` bu alan hâlâ `.example` içeriyorsa yayını **durdurur** (kural 11).

---

## Form ve yasal metin — tek ayardan üretilir

`src/site.config.js` → `form` bloğu iki kipi destekler:

```js
form: {
  mode: "mailto", // "mailto" | "endpoint"
  provider: { name: "", country: "", endpoint: "", accessKey: "" }
}
```

- **`mailto`** (açılış kipi): form ziyaretçinin e-posta uygulamasında hazır
  bir taslak açar. Ayrıca WhatsApp ve e-posta birincil kanal olarak
  gösterilir. Kurulum gerektirmez, üçüncü taraf veri aktarımı yoktur.
- **`endpoint`**: form bir uç noktaya doğrudan POST edilir (`provider.name`
  ve `provider.country` bu kipte **zorunludur** — boşsa derleme durur).
  Bu kip KVKK md. 9 anlamında yurt dışı aktarım sayılabilir.

`mode` değiştirip yeniden derlediğinizde **tek bir yerde elle güncelleme
yapmadan** şunlar kendiliğinden değişir: istemci formunun davranışı,
KVKK aydınlatma metnindeki "aktarım" paragrafı, iletişim sayfasındaki not.
Aynı mekanizma `analytics: "none" | "cloudflare"` için de geçerli — analitik
açılırsa çerez politikası metni buna göre güncellenir. **Cloudflare
panelinden analitik açmak tek başına yetmez**; `site.config.js` güncellenip
yeniden derlenmeden panel ayarı depoda görünmez ve yasal metinle çelişir.

Bunu doğrulayan test: `form.mode` iki farklı değerle iki kez derlenip
çıktı karşılaştırılıyor — yalnız beklenen paragraflar farklı çıkıyor mu
diye (`node --test`, G6 bitti ölçütü).

---

## Kapalı (henüz yayınlanmayan) bir rotayı açmak

`src/routes.js` site haritasının **tek kaynağıdır**; menü, altbilgi,
`sitemap.xml` ve dil bağlantıları hepsi bu tablodan türer. Şu an kapalı
(`enabled: false`) dört rota var: `about` (hakkımızda), `changelog`
(sürüm notları), `security` (güvenlik), `legal-subscription` (abonelik
şartları). Bir rotayı açmak için:

1. `src/routes.js` içinde ilgili girdide `enabled: false` → `enabled: true`.
2. O rotanın gerçek içeriğini ilgili `src/content/{tr,en}/*.js` dosyasına
   yaz (şablon zaten mevcut, kapalıyken de derlenebilir durumda tutulur).
3. `node tools/build.js && node tools/check-site.js`.

Kapalıyken o rotaya bir şablon `ctx.url()` ile bağlantı vermeye kalkarsa
derleme durur — kapalı bir sayfa hiçbir yerde ölü bağlantı olarak kalmaz.
Tersi yönde: bir rotayı kapatmak da tek satırlık bir değişikliktir
(`enabled: true` → `false`); menüden, altbilgiden ve site haritasından
aynı anda kalkar.

---

## Yerel önizleme

`site/` içindeki yollar temiz URL'lerdir (`/fiyatlandirma/` gibi klasör
altında `index.html`); bu yüzden `file://` ile açmak klasör listesi
gösterir, **yerel bir sunucu gerekir**:

```bash
node tools/build.js
npx serve site
# veya
python -m http.server -d site
```

---

## Denetim

```bash
node tools/check-site.js
```

13 kuralı çalıştırır (ETKI-ANALIZI.md §4.5): `site/`'in kaynakla eşleştiği,
TR/EN anahtar ve dizi uzunluğu eşliği, her HTML'de tek `<h1>`/doğru
`lang`/canonical/karşılıklı `hreflang`, iç bağlantı ve çapa hedeflerinin
var olduğu (kapalı rotaya bağlantı yok), görsellerin `width`/`height`/`alt`
taşıdığı, JSON-LD'nin ayrıştığı ve sayfadaki fiyatla aynı olduğu,
`sitemap.xml`/`robots.txt` doğruluğu, sitede eski alan adının hiç
geçmediği, yasak iddia listesinin (§3.1 ETKI-ANALIZI) geçmediği, MADDE 5
alanlarının doluluğu, `origin`'in yer tutucu olup olmadığı, fiyatın
bayatlayıp bayatlamadığı, `endpoint` kipinde sağlayıcı bilgisinin dolu
olduğu. Çıktı denetlenen sayfa/bağlantı/görsel **sayılarını** basar; sıfır
sayı hatadır.

```bash
node tools/check-site.js --release
```

Aynı 13 kural, ama normalde yalnız **uyarı** olan üç madde (eksik MADDE 5
alanı, yer tutucu `origin`, bayat fiyat tarihi) burada **hata** sayılır ve
sıfır olmayan çıkış koduyla durur. **Yayına almadan önce bu komut mutlaka
temiz dönmeli.**

```bash
node --test
```

Bütün birim ve içerik/üretim testlerini çalıştırır (Node'un yerleşik test
koşucusu, ek paket gerekmez).

```bash
python tools/make-og.py    # Pillow gerekir
```

Sosyal medya paylaşım kartlarını (`src/static/assets/og/*.png`, TR + EN)
yeniden üretir. Başlık/açıklama içerik dosyalarından (`tools/og-data.js`
aracılığıyla) okunur, elle ayrı bir kopya yazılmaz; adres
`site.config.js`'teki `origin`'den gelir. PNG zorunludur — hiçbir sosyal
platform OG görseli olarak SVG işlemez.

---

## Barındırma — Cloudflare Pages

Bu depo doğrudan Cloudflare Pages'e bağlanır:

- **Build command:** boş (derleme yerelde yapılıp `site/` commit'lenir).
- **Output directory:** `site`.
- `site/_redirects` eski `.html` adreslerinden (`havalandirma-yazilimi.html`
  vb.) yeni yollara 301 yönlendirir; `src/routes.js`'teki `legacy`
  alanından üretilir.
- `site/_headers`: `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy`, `X-Frame-Options` — güvenlik başlıkları.
- Kökte `site/404.html` bulunduğu için bilinmeyen yollar 404 koduyla
  sunulmalıdır (varsayım; ilk yayında gerçek bir olmayan URL'ye istek
  atılıp durum kodu gözle doğrulanmalı — D-005: çıkış kodu/"başarılı"
  paneli tek başına kanıt sayılmaz).

GitHub Pages **kullanılmaz** (ticari SaaS tanıtımı GitHub'ın Pages şartına
aykırı düşer, ayrıca derleme adımı çalıştırmaz); geçiş sonrası eski
`github.io` yayını kapatılır ya da yeni adrese yönlendirilir.

---

## Firma bilgisi — MADDE 5

Elektronik Ticaret Hizmet Sağlayıcılar Hakkında Yönetmelik (RG 29/12/2022,
32058) **MADDE 5**, ana sayfada **"İletişim" başlığı altında doğrudan
erişilebilir** şekilde şunları şart koşuyor:

| | Esnaf / sanatkâr | Tacir (limited, A.Ş. veya esnaf sınırını aşan şahıs işletmesi) |
|---|---|---|
| Kimlik | Ad + soyad | Ticaret unvanı |
| Numara | Vergi kimlik numarası | **MERSİS numarası** |
| Adres | Merkez adresi | Merkez adresi |
| KEP | Zorunlu | Zorunlu |
| E-posta, telefon | Zorunlu | Zorunlu |
| Meslek odası | Zorunlu | Zorunlu |

Hangi kategoriye girdiğinizi mali müşavirinize sorun. Tüm alanlar
`src/company.js` içinde **tek yerde**; boş bırakılan alan sitede hiç
gösterilmez — yani eksik bırakılırsa yükümlülük sessizce karşılanmamış
olur. `node tools/check-site.js` hangi alanların hâlâ boş olduğunu her
çalıştırmada listeler (kural 10); `--release` bunu hataya çevirir.

---

## Marka

| | |
|---|---|
| Ad | **Dijital Pusula** |
| Slogan | **Doğru yerdesiniz.** (EN: *You're in the right place.*) |
| Simge | Pusula — kadran + ibre, 3 SVG katmanı: `src/static/assets/logo/logo-mark.svg` (statik), `logo-dial.svg` + `logo-needle.svg` (animasyonlu kullanım) |
| Favicon | `src/static/favicon.svg` (+ PNG yedek, apple-touch-icon) |

Ad, simge geometrisi ve slogan sabit kabul edilir (ETKI-ANALIZI ADR-3);
görsel dilin geri kalanı (renk, tipografi, hareket) `kadro/TASARIM-STANDARDI.md`
belirler. İbre animasyonu `prefers-reduced-motion` açıkken durur.

---

## Dosya yapısı

```text
dijital-pusula/
├── src/                     # KAYNAK — elle düzenlenen her şey burada
│   ├── site.config.js       # alan adı, form kipi, analitik
│   ├── company.js           # MADDE 5 firma bilgisi
│   ├── routes.js            # rota → {tr, en} yol, açık/kapalı, eski URL
│   ├── lib/                 # üretici yardımcıları (tarayıcıya gitmez)
│   ├── content/              # dile göre metin + fiyat/gerçek/sürüm verisi
│   │   ├── facts.js pricing.js changelog.js
│   │   └── tr/  en/          # her ikisinde birebir aynı anahtar ağacı
│   ├── templates/            # sayfa/parça şablonları (JS template literal)
│   ├── styles/                # tokens.css + bileşen CSS'leri (kaynakta bölünür)
│   ├── client/site.js         # tarayıcıya giden tek JS dosyası
│   └── static/                 # olduğu gibi kopyalanır (logo, font, ikon, og, favicon)
├── site/                     # ÜRETİLEN ÇIKTI — elle düzenlenmez, commit'lenir
├── tools/
│   ├── build.js               # üretici (--check: fark raporu)
│   ├── check-site.js          # 13 kural (--release: uyarılar hataya döner)
│   ├── make-og.py             # OG paylaşım görselleri
│   └── githooks/pre-commit    # isteğe bağlı: build --check + check-site
├── docs/site-arastirma-raporu.md
├── kadro/                     # süreç belgeleri (ETKI-ANALIZI, TASARIM-STANDARDI, …)
└── README.md
```

`package.json` yok: çalışma anı ve geliştirme bağımlılığı yok. Testler
Node'un yerleşik `node --test` çalıştırıcısıyla yazılır.

---

## Bilinen eksikler

- **Ekran görüntüleri temsilîdir.** `src/static/assets/screens/<ürün>/temsili.svg`
  dosyaları elle çizilmiş arayüz taslaklarıdır, "temsilî" etiketiyle
  gösterilir. Gerçek (anonimleştirilmiş) ekran görüntüleri en güçlü güven
  unsurudur; geldiklerinde bu dosyaların yerine geçer.
- **Dört rota kapalı** (`about`, `changelog`, `security`,
  `legal-subscription`) — içerikleri iş kararı bekliyor (ETKI-ANALIZI §9,
  S8-S10, S3).
- **Analitik yok** (`site.config.js` → `analytics: "none"`). Çerezli bir
  araç eklenirse KVKK'ya göre opt-in bant zorunlu hâle gelir; çerezsiz bir
  seçenek (Cloudflare Web Analytics) bu yükü doğurmaz.
- **Çevrimiçi ödeme yok.** Fiyat sayfası teklif/talep akışına yönlendirir;
  sitede tahsilat yapılmaz.

Ayrıntılı gerekçeler, kabul edilmeyen alternatifler ve kullanıcı onayı
bekleyen kararlar için [`kadro/ETKI-ANALIZI.md`](kadro/ETKI-ANALIZI.md).
Araştırma raporu için
[docs/site-arastirma-raporu.md](docs/site-arastirma-raporu.md).
