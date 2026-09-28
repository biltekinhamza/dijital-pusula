# Tasarım standardı — Dijital Pusula

Arketip: **Tanıtım sitesi** (B2B ürün pazarlama + ikna) · Referans aile: teknik
çizim/harita kağıdı zanaati + kurumsal SaaS netliği (Linear/Stripe düzeyinde uygulama
titizliği, ama "SaaS kart kiti" görünümü değil) · **Durum: onaylandı (Yön C —
Manyetik Kuzey) — 2026-09-28**

**Tasarım Okuması:** Havalandırma imalatçıları ve soğuk hava deposu işletmecileri
(geleneksel, teknik olmayan KOBİ sahipleri) için; işini bilen tek kişilik bir
yazılımcının "sahaya dair kanıt dosyası" niteliğinde bir B2B ürün sitesi; ton dürüst,
somut, mühendislik hassasiyetinde ama sıcak ve ulaşılabilir; pusula/rota/harita
metaforuna dayanan, kurumsal ama şablon-SaaS olmayan özgün bir görsel dil.

---

## 0. Seçilen yön — onaylandı

Kullanıcı **Yön C — "Manyetik Kuzey"**'i seçti (2026-09-28), revize istemedi. Bu
belgenin geri kalanı yalnız bu yönü anlatır; §1-§2'deki renk/tipografi tek bir kesin
sistemdir — `arayuz-gelistirici` ve `gorsel-denetici`'nin "hangi yön" diye tekrar
karar vermesi gerekmez.

**Seçilen:** marka rengi doğrudan pusula ibresinin geleneksel renginden (kuzey
kırmızısı `#B83B1C` + derin çelik lacivert `#223B57`); zemin neredeyse-beyaz
(`#FBFAF7`); tipografi IBM Plex Sans Condensed (başlık) + IBM Plex Sans (gövde) —
"net, iddialı, ibre-marka bağı en sıkı" kişilik. Gerekçe: gerçek pusula ibrelerinin
kuzeyi kırmızı, güneyi beyaz/siyahtır; bu seçim marka rengini doğrudan ürünün kendi
simgesinin rengine bağlıyor (§1.2).

**Değerlendirilen, seçilmeyen alternatifler** (kısa özet — ayrıntı belge sonunda "Ek"
bölümünde, kayıt amaçlı): *Yön A — Harita Kağıdı* (pirinç/lacivert, sıcak-davetkâr
kişilik, Space Grotesk + Source Sans 3); *Yön B — Mühendis Defteri* (çelik mavisi/
kırşım kalemi kırmızısı, soğukkanlı-teknik kişilik, Archivo + Public Sans). İkisi de
aynı erişilebilirlik/klişe-önleme tabanını geçiyordu ve teknik bir kusurları yoktu;
seçim marka-ibre bağının gücüne göre yapıldı.

Marka kısıtları (ad, pusula simgesi geometrisi, "Doğru yerdesiniz." sloganı,
`compass-seek` ibre mekaniği) bu seçimle değişmedi — ETKI-ANALIZI ADR-3 aynen geçerli.

---

## 1. Renk

### 1.1 Ortak anlamsal renkler

Marka renginden bağımsız, sabit durum renkleri — "başarı/uyarı/hata/bilgi" her zaman
aynı davranır.

| Jeton | Hex | Kullanım | Kontrast (`--color-bg` `#FBFAF7` üstünde) |
|---|---|---|---|
| `--color-success` | `#256B3B` | Metin/ikon: "Yayında" rozeti, form başarı mesajı | 6.19:1 — geçer |
| `--color-success-bg` | `#E4F1E8` | Rozet/not kutusu **zemini** (metin her zaman `--color-success` ile) | — |
| `--color-warning` | `#855014` | Metin/ikon: "Erken erişim" rozeti, uyarı notu | 6.36:1 — geçer |
| `--color-warning-bg` | `#F7E8D2` | Rozet/not kutusu zemini | — |
| `--color-error` | `#A23327` | Form hata metni, gerekli-alan işareti | 6.61:1 — geçer |
| `--color-error-bg` | `#F7E3E1` | Hata kutusu zemini | — |
| `--color-info` | `#2C6E8C` | Not kutusu (KDV, fiyat tarihi vb.) | 5.40:1 — geçer |
| `--color-info-bg` | `#E3EEF2` | Not kutusu zemini | — |

Kural: durum renkleri **her zaman** açık tonlu zemin + koyu tonlu metin çiftinde
kullanılır (doygun renk zemin + beyaz metin değil) — tek istisna birincil eylem
butonu (§1.4), o ayrıca hesaplanmıştır.

Önceki hesap notu (iz bırakılır, `gorsel-denetici` tekrar ölçsün): `#2E7D46` yeşili
ilk denemede en zor zeminde 4.48:1 çıktı — 4.5 eşiğinin **altında**, bu yüzden
`#256B3B`'ye koyulaştırıldı (6.19:1). Aynı şekilde `#B4741A` turuncusu 3.40:1 ile
yalnız iri metne yetiyordu, `#855014`'e koyulaştırıldı. Göz kararı değil, hesap.

### 1.2 Marka renkleri — Manyetik Kuzey

| Jeton | Hex | Kullanım | Kontrast |
|---|---|---|---|
| `--color-bg` | `#FBFAF7` | Sayfa zemini — neredeyse beyaz, çok hafif ılık kağıt/vellum tonu | — |
| `--color-bg-soft` | `#F1EEE6` | Bölüm ayırıcı zemin | — |
| `--color-surface` | `#FFFFFF` | Kart, form, dropdown zemini | — |
| `--color-ink` | `#191E28` | Gövde metni, başlık | >15:1 — AAA |
| `--color-ink-muted` | `#5C6470` | İkincil metin | ~5.9:1 — AA |
| `--color-line` | `#E2DFD6` | Kenarlık | — |
| `--color-accent-primary` | `#B83B1C` (kuzey kırmızısı) | Birincil buton, bağlantı, odak halkası | Metin: 5.45:1 · beyaz üstünde buton: 5.71:1 |
| `--color-accent-primary-ink` | `#932F16` | Hover/basılı hali | — |
| `--color-accent-secondary` | `#223B57` (derin çelik lacivert) | Header/footer koyu bant zemini, ikincil buton, ikon | Beyaz metin üstünde: 11.48:1 |

Not: gerçek pusula ibrelerinin kuzeyi kırmızı, güneyi beyaz/siyahtır — bu palet marka
rengini doğrudan ibrenin kendi geleneksel rengine bağlar; seçimin gerekçesi buydu (§0).

### 1.3 Logo yeniden renklendirme

Geometri aynen kalır (ADR-3, kadran + ibre yol verisi değişmez), yalnız renk
güncellenir. `arayuz-gelistirici` ve `gorsel-denetici` doğrudan bu değerleri kullanır:

- Kadran halkası gradyanı: `#B83B1C → #223B57`
- Yüz (face) gradyanı: `#FFFFFF → #FBFAF7`
- İbre kuzey yarısı: `#B83B1C`
- İbre güney yarısı: `#223B57`
- Merkez göbek: `#191E28`

### 1.4 Favicon
`--color-accent-primary` (`#B83B1C`) + `--color-ink` (`#191E28`) ikilisiyle, kadran
çizgileri sadeleştirilmiş tek renkli varyant (16-32px'te okunur olması için ara yön
çizgileri ve gradyan kaldırılır, yalnız dış halka + ibre kalır). PNG yedek +
apple-touch-icon aynı paletle üretilir (ETKI-ANALIZI A8).

---

## 2. Tipografi

En fazla 2 yazı tipi ailesi (marka kuralı). **Başlık: IBM Plex Sans Condensed
(600/700). Gövde: IBM Plex Sans (400/500/700).** Tek aile (2 dosya, tek karakter),
"mühendislik yazılımı" hissi — Manyetik Kuzey paletiyle tutarlı, teknik/kurumsal ton.
Kendi sunucumuzdan barındırılan OFL lisanslı woff2 dosyaları (ADR-6) — Google
Fonts'a hiçbir istek gitmez. `arayuz-gelistirici` İ/ı/ğ/ş/ç/ö glyphlarını içeren alt
kümeyi indirip gerçek tarayıcıda görsel olarak doğrular (D-003: varsayılmaz, denenir).

### 2.1 Ölçek (sayısal tabandan, §3.1) ve satır yüksekliği

| Jeton | px | Kullanım | Satır yüksekliği |
|---|---|---|---|
| `--font-size-12` | 12 | Yasal küçük yazı, footer meta | 1.5 |
| `--font-size-14` | 14 | İkincil metin, form label, nav | 1.5 |
| `--font-size-16` | 16 | Gövde (taban) | 1.6 |
| `--font-size-18` | 18 | Vurgulu gövde, büyük SSS sorusu | 1.55 |
| `--font-size-20` | 20 | Kart/bileşen başlığı (H3-eşdeğeri) | 1.35 |
| `--font-size-24` | 24 | Alt bölüm başlığı | 1.25 |
| `--font-size-30` | 30 | Bölüm başlığı (H2), dar ekran hero H1 | 1.2 |
| `--font-size-36` | 36 | Bölüm başlığı (H2) geniş ekran | 1.15 |
| `--font-size-48` | 48 | Hero H1 üst sınır | 1.08 |

**Hero H1, sabit 48px değil, `clamp(1.875rem, 1.1rem + 2.4vw, 3rem)` (30px→48px)
ile akışkan.** Sabit büyük punto TASLAK'ın kısıtına aykırı düşer: TR metin EN'den
%20-30 uzun, sabit 56-64px "dev başlık" örüntüsü uzun TR cümlede satır kırılmasını
öngörülemez hale getirir. 48px tavanı bu riski önler ve sayısal tabanın en üst
basamağını (§3.1) aşmaz.

Eyebrow/slogan ("Doğru yerdesiniz.", ADR-3 gereği sabit): `--font-size-14`, orta
kalınlık, **büyük harf DEĞİL** (AI klişe #5 "ALL-CAPS eyebrow" örüntüsünden kasıtlı
sapma — slogan brief'te sabit ama render biçimi tasarımcıya açık), cümle biçiminde,
başında küçük bir pusula-gülü ikonu (düz çizgi tire değil).

---

## 3. Boşluk ve biçim

### 3.1 Sayısal taban — tartışılmaz

- Boşluk: `--space-0..64` → `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64` (px)
- Yazı boyutu: `12, 14, 16, 18, 20, 24, 30, 36, 48` (§2.1)
- Köşe yarıçapı (en fazla 3): `--radius-0: 0` (rozet, tablo başlığı, "spec" kutuları —
  bilinçli keskin köşe, blueprint kimliğinin parçası), `--radius-sm: 6px` (buton,
  form alanı, çip), `--radius-md: 12px` (kart, ekran çerçevesi, modal). **Her şeyi aynı
  büyük yarıçapla yuvarlamak yasak** (AI klişe #4 "SaaS kart kiti") — varsayılan
  bileşen çoğunlukla `--radius-sm` ya da `--radius-0` kullanır, `--radius-md` yalnız
  büyük yüzeylerde (kart, modal, ekran görüntüsü çerçevesi).
- Gölge (en fazla 3 seviye): `--shadow-0: none` (varsayılan — site çoğunlukla
  gölgesiz, ayraç **çizgiyle** kurulur, "kağıt/blueprint" kimliğinin parçası),
  `--shadow-1: 0 2px 8px rgba(25, 30, 40, .08)` (hover, düşük kaldırma),
  `--shadow-2: 0 16px 40px rgba(25, 30, 40, .16)` (dropdown, modal, açılır menü) —
  `25, 30, 40` seçilen paletin `--color-ink` (`#191E28`) RGB bileşenleridir.
- Kenar kalınlığı (tek değer): `--border-width: 1px`. Ayrı bir jeton olarak
  `--bar-thick: 3px` yalnız durum/not kutularının sol vurgu çubuğu için — bu bir
  "kenarlık" değil, bilgi taşıyan bir işaretleyici (hangi durumda olduğunu renkle +
  kalınlıkla gösterir), bu yüzden "tek kenarlık değeri" kuralını ihlal etmez.

### 3.2 Kırılma noktaları — tek belirteç dosyası (ETKI-ANALIZI §3.9)

`src/styles/tokens.css` içinde tek yerde tanımlanır, başka hiçbir dosyada piksel
değeri elle yazılmaz:

| Jeton | px | Ne değişir |
|---|---|---|
| `--bp-sm` | 480 | Küçük telefon ince ayarları (nadiren gerekir) |
| `--bp-md` | 768 | Gezinme hamburgere döner; çok sütunlu ızgaralar tek sütuna iner |
| `--bp-lg` | 1024 | Masaüstü yerleşimi başlar (yan yana ızgaralar, sticky sütunlar) |
| `--bp-xl` | 1280 | İçerik kapsayıcı üst sınırı (`--container-max`) |

Zorunlu test genişlikleri (kısıt §): **~390px** (dar) ve **~1440px** (geniş). 768-1024
arası akışkan aralık ayrıca piksel-piksel tasarlanmaz, iki uçtaki kurallardan
enterpole olur.

Kapsayıcı: `--container-max: 1200px`, kenar boşluğu dar ekranda `--space-20`
(20px), geniş ekranda `--space-48` (48px).

---

## 4. Marka — pusula ibresi mekaniği (sabit) ve genişletmesi (açık)

**Sabit (dokunulmaz, ETKI-ANALIZI ADR-3):** kadran (`logo-dial.svg`) sabit durur,
yalnız ibre (`logo-needle.svg`) döner; `compass-seek` keyframe'i (7s, ease-in-out,
sonunda 0deg'e oturur) davranışı aynen korunur; `prefers-reduced-motion` açıkken
animasyon tamamen durur (ibre 0deg'de sabit kalır). Header'daki hover'da süre 7s→2.6s
kısalması (`.brand:hover ... animation-duration`) davranışı da korunur.

**Açık (tasarımcı kararı, bu belgeyle onaylanıyor):**
- Renk: §1.2'deki marka renklerine göre boyanır (geometri/yol verisi değişmez, §1.3).
- **İsteğe bağlı (COULD, engelleyici değil) genişletme — "yön kapısına yönelme":**
  Ana sayfa hero'sunda iki yön kapısı (§ Bileşenler) varken, kapılardan birine
  klavye odağı/fare hover'ı geldiğinde header'daki ibre `compass-seek` döngüsünü
  duraklatıp o kapının yönüne (sol kapı ≈ -22deg, sağ kapı ≈ +22deg) yumuşak geçiş
  yapar (`transition: transform .4s ease`), odak/hover kalktığında `compass-seek`
  döngüsüne geri döner. **`prefers-reduced-motion` açıkken bu genişletme de tamamen
  kapanır** — ibre yalnız 0deg'de durur, hover'da da kıpırdamaz. Bu, A1/A3 görevini
  engellemez; uygulanmazsa da temel mekanik (sabit kadran + `compass-seek`) yeterlidir.
- İkon dili: tek stil, 1.5px kalınlığında çizgi ikon, 24px ızgara, dolgu yok (outline).
  MIT/OFL lisanslı bir açık kaynak set (ör. Lucide) taban alınır, satır içi SVG
  sembol olarak `site/assets/icons.svg`'ye gömülür (sprite, harici istek yok). İki
  markaya özgü ikon elle çizilir: **yön ok işareti** (bearing arrow — yön kapısı
  ayracında) ve **mini pusula gülü** (eyebrow/slogan öncesi, §2.1).

---

## 5. Bileşenler

Her bileşen: ad · amaç · jetonlar · özel kural. Tümü JS kapalıyken tam görünür
olmalı (ETKI-ANALIZI §3.9 sınırı); JS yalnız mobil menü, ürün açılır menüsü,
aylık/yıllık seçici ve form gönderimi için kullanılır.

### 5.1 Header + ürün açılır menüsü + dil anahtarı + CTA
- Sticky, `min-height: 72px` (mobil) / `78px` (masaüstü); kaydırmada
  `--color-surface` + `backdrop-filter: blur(16px)` + alt kenarlık (`--color-line`)
  belirir — boş sayfa üstünde şeffaf.
- Logo: `.brand-mark-animated` 34px (header) / 44px (varsa özel "orbit" bağlam).
  Kelime markası "Dijital**Pusula**" — ikinci hece `--color-accent-primary`.
- Ürün açılır menüsü: `button[aria-haspopup="true"][aria-expanded]` + panel
  (`--shadow-2`, `--radius-sm`); her satır ürün adı + tek cümle + (SHD için) durum
  rozeti (§5.10). Klavye: Enter/Space açar, ok tuşları satırlar arası gezinir, Esc
  kapatıp düğmeye odağı geri verir.
- Dil anahtarı: gerçek `<a href>` çifti (TR/EN), JS state değil — her sayfa kendi
  karşı-dil URL'sine bağlanır (`hreflang` ile aynı veri, ADR-2). Aktif dil
  `aria-current="page"`.
- Birincil CTA: `primaryCta()` etiketi (§ETKI-ANALIZI 3.3) — buton, `--color-accent-primary`
  zemin, beyaz metin, `--radius-sm`.
- Dar ekran (`<768px`): logo solda, hamburger sağda; açılan panel tam genişlik,
  `--shadow-2`, üstte dil anahtarı + CTA, altta ürün listesi düz (accordion değil,
  tek uzun liste — yalnız 4 üst düzey öğe var, akordeon gereksiz karmaşıklık).

### 5.2 Altbilgi (MADDE 5 bloğu dahil)
- Koyu bant: `--color-accent-secondary` (`#223B57`) doğrudan kullanılır (zaten koyu,
  ek jeton gerekmez). Metin: beyaz/açık gri, kontrast ≥ 11:1 (§1.2, koyu zemin +
  beyaz metin standart desendir, `gorsel-denetici` son hali ölçer).
- 4 sütun (geniş) → 2 sütun (`<1024px`) → 1 sütun (`<480px`): marka+slogan+kısa not,
  Ürünler, Kaynaklar (Sürüm notları, Güvenlik — kapılıysa gizlenir), Yasal.
- **"İletişim" başlığı altında MADDE 5 tam seti** (`company.js`'den, JS'e bağlı değil,
  derlemede basılı) — kimlik, VKN/MERSİS, adres, KEP, e-posta, telefon, meslek odası.
  Boş alan hiç render edilmez (mevcut davranış korunur, ETKI-ANALIZI §1.1).
- Alt satır: telif + dil linki; buraya **em tire yok**, nokta ile ayrılır.

### 5.3 Hero — iki varyant
**Ana sayfa (H1):** eyebrow (slogan, §2.1 kuralı) → H1 (somut değer önerisi, clamp
ölçek) → açıklama (≤2 cümle) → **yön kapısı çifti** (§5.4) → risk azaltıcı satır.
**Ürün sayfası (P1):** eyebrow (ürün kategorisi, ör. "Havalandırma yazılımı") → H1
(ürüne özgü değer önerisi) → durum rozeti → açıklama → CTA çifti (birincil + "Fiyatlar")
→ ekran görüntüsü/çerçevesi (§5.6) sağda (geniş) / altta (dar).
- Risk azaltıcı satır: madde başına **onay ikonu** (✓, anlamı taşıyan, dekoratif nokta
  değil — AI klişe "her satırda renkli nokta"nın yerine geçer), yalnız doğrulanmış
  ifadeler (ETKI-ANALIZI §3.1 dürüstlük kuralı).

### 5.4 Yön kapısı (`yön kapısı`, H1 içi)
- Amaç: ziyaretçiyi 10 saniyede doğru ürüne yönlendirmek (ETKI-ANALIZI §3.4).
- Yerleşim: geniş ekranda 2 sütun yan yana, aralarında ince dikey çizgi + merkezde
  küçük pusula-gülü ikonu (iki kapının da "aynı merkezden" çıktığını gösteren yapısal
  öğe, süsleme değil); dar ekranda dikey yığın, ayraç yatay çizgiye döner.
- İçerik: ürün adı (`--font-size-24`), tek cümle iş tanımı, durum rozeti (§5.10),
  "İncele →" bağlantısı (ok karakteri **yalnız burada**, gerçek yön/hareket anlamı
  taşıdığı için — genel buton sonu süsü olarak kullanılmaz).
- Etkileşim: hover/focus'ta kenarlık `--color-line` → `--color-accent-primary`,
  arka plan `--color-bg-soft`; §4'teki isteğe bağlı ibre-yönelme genişletmesi burada
  tetiklenir.

### 5.5 Gerçeklik şeridi (H2, P2)
- **Araştırma raporundaki örnek metin (§4.1) " · " ile ayrılmış yazılmıştır — bu
  içerik önerisidir, görsel biçim değildir. Burada orta nokta (·) ile zincirlenmiş
  tek satır KULLANILMAZ** (AI klişe #5: "orta noktayla birleşen meta diziler").
  Bunun yerine: her gerçek kendi kenarlıklı çipinde (`--radius-0` ya da `--radius-sm`,
  `1px` `--color-line` kenarlık, `--space-12` iç boşluk), satır içi flex-wrap, çipler
  arası gerçek `border-right` ile ayrılır (glyph değil, yapısal çizgi).
- Veri `facts.js`'ten (§ETKI-ANALIZI 4.4), her rakam `{param}` ile basılır, elle sayı
  yazılmaz.

### 5.6 Ürün vitrini (H3/H4) ve yetenek bloğu + ekran yuvası (P6)
- **3 eşit kart yan yana KURULMAZ** (AI klişe: "3 eşit özellik kartı"). Ürün
  vitrini: sorun cümlesi (tek satır) → yetenek listesi **dikey, kompakt, ikon+etiket**
  (kart değil, liste) → tek ekran görüntüsü → 2 bağlantı.
- Yetenek bloğu (P6, ürün sayfası, modül sayısı 4-6): **dikey art arda satırlar,
  sol/sağ değişen (zigzag)** — her satır görsel (ekran yuvası) + metin ikilisi;
  yalnızca 2-3 modül varsa bile aynı dikey desen korunur (3'lü yatay ızgaraya
  dönüştürülmez).
- Ekran yuvası: `--radius-md` çerçeve, ince `--color-line` kenarlık, üstte tarayıcı
  benzeri sade bir şerit (3 nokta değil — **süs amaçlı sahte pencere ikonu yok**, düz
  bir kenarlık yeterli). Görsel WebP, açık `width`/`height`, `loading="lazy"`
  (hero/LCP görseli hariç).
- **"Temsilî" etiketi:** gerçek ekran görüntüsü gelene kadar (S7), çerçevenin sağ üst
  köşesinde küçük bir rozet (`--color-warning-bg`/`--color-warning`, `--radius-0`)
  "Temsilî görsel" yazar; gerçek görsel gelince rozet ve yer tutucu görsel birlikte
  kaldırılır (kod: `screen.representative: true|false` alanı, §ETKI-ANALIZI A8).

### 5.7 Karşılaştırma tablosu (P5, "Excel yerine")
- Geniş: 2 sütunlu tablo, sol sütun (`Bugün`) `--color-ink-muted` metin, sağ sütun
  (`HVAC Pro Suite ile`) `--color-ink` + satır başına küçük onay ikonu
  (`--color-accent-primary`), sağ sütun zemini hafif `--color-bg-soft`.
- Dar (`<768px`): yatay kaydırma **yok** (kısıt), her satır bir karta döner: üstte
  küçük "Bugün" etiketi + metin, altta ince ayraç, "İle" etiketi + metin + onay ikonu.
- Başlık satırı `<th>` sayısal değil ama hizalama kuralı (evrensel taban: sayı sağa,
  metin sola) yine geçerli — burada tüm hücreler metin, sola hizalı.

### 5.8 Teknik derinlik bloğu (P7)
- Görsel olarak ayrı bir "spec panel": `--radius-0`, `1px` kenarlık, sol kenarda
  `--bar-thick` (3px) `--color-accent-secondary` çubuğu (bilgi taşır: "bu, doğrulanmış
  teknik veri" sinyali). Ölçü/oran değerleri `font-variant-numeric: tabular-nums`
  ile hizalı gösterilir — **ayrı bir mono yazı tipi eklenmez** (AI klişe: "küçük veri
  etiketleri için mono font"), aynı gövde ailesinde tabular rakamla çözülür.
- İçerik: kenet payı, dirsek ek payı, klape payı, %60 istif örtüşmesi vb. (ETKI-ANALIZI
  §3.5 P7). İsteğe bağlı örnek hesap tablosu (ADR-11, S17'ye bağlı) aynı panel
  deseniyle, `facts`/`data/hvac-ornek-hesap.json`'dan.

### 5.9 Adımlar (P8, "Nasıl başlarsınız")
- Gerçek bir sıra olduğu için **numaralandırma meşru** (AI klişe istisnası: "01/02/03
  yalnız içerik gerçekten bir sıra/aşamaysa"). 3-4 adım, geniş ekranda yatay zaman
  çizgisi (ince `--color-line` bağlayıcı çizgi + numaralı daire), dar ekranda dikey
  liste, bağlayıcı çizgi sola kayar.

### 5.10 Durum rozeti
- İki değer: `Yayında` (`--color-success` / `--color-success-bg`, nokta+etiket),
  `Erken erişim` (`--color-warning` / `--color-warning-bg`). `--radius-0` veya
  `--radius-sm`, `--font-size-12`, kalın. `productState()` (§ETKI-ANALIZI 4.4) tek
  okuyucudan gelir — 5 yerde (rozet, yön kapısı, ürün hero, JSON-LD, fiyat bölümü)
  aynı görünür.

### 5.11 Bağlantı kartı (P9, entegrasyonlar)
- Az sayıda öğe (bugün: Paraşüt, Android) — kart ızgarası değil, esnek satır listesi
  (logo/ikon + ad + tek cümle), `flex-wrap`, öğe sayısı arttıkça doğal olarak sarar.

### 5.12 SSS (`<details>/<summary>`)
- JS'siz çalışır (kısıt). `summary` odaklanabilir, `::marker` yerine sağda dönen
  ok ikonu (`transform: rotate(180deg)` açıkken), `:focus-visible` halkası görünür.
  Her soru kimliği ürün önekli (`faq-hvac-3`) — aynı sayfada iki SSS bloğu varsa
  (fiyat sayfası) çakışmaz (ETKI-ANALIZI §7 "kimlik").

### 5.13 Plan kartı (3 kip) + aylık/yıllık seçici + plan karşılaştırma tablosu
- 3 plan kartı yan yana (geniş) → dikey yığın (dar, kısıt: yatay kaydırma yok). Bu,
  3'lü ızgara olsa da AI klişesi değildir çünkü **gerçek** bir fiyat modelidir
  (fonksiyonel, dekoratif değil); yine de "hepsi aynı" görünmesin diye önerilen plan
  yalnız ince kenarlık rengi (`--color-accent-primary`) ve küçük "Önerilen" etiketiyle
  ayrılır — parıltı/ölçek büyütme efekti yok.
- Kip'e göre alan gizlenir (`planPrice()` §ETKI-ANALIZI 4.4): `fixed` → aylık/yıllık
  rakam; `from` → "…'den başlayan"; `quote` → "Teklif isteyin" + buton, rakam yok.
- Aylık/yıllık seçici: iki seçenekli segment kontrolü (`role="radiogroup"`, gerçek
  `<input type="radio">` altyapısı, görsel segment), **yalnız `yearly` verisi varsa
  render edilir**. Yıllık tasarruf rakamı derlemede hesaplanır (elle yazılmaz).
- Plan karşılaştırma tablosu: aynı desen §5.7 (geniş tablo → dar kart yığını).

### 5.14 Not kutusu
- `--color-info-bg` zemin, `--color-info` metin, sol `--bar-thick` çubuk, `--radius-0`.
  KDV notu, fiyat tarihi, "taslak — avukat onayı bekliyor" uyarısı bu bileşeni
  kullanır (uyarı niteliğindeyse `--color-warning*` paleti).

### 5.15 Sürüm notu girdisi + yol haritası sütunu
- Sürüm notu: tarih (`tr-TR`/`en-GB` biçimi) + ürün etiketi (küçük rozet, marka rengi
  değil nötr `--color-bg-soft` zemin) + tür etiketi (Yeni/Düzeltme/İyileştirme, üç ayrı
  nötr renk **değil**, tek nötr stil + kelime yeterli — renk kod şişmesine gerek yok)
  + açıklama.
- Yol haritası: "Yapılıyor / Planlandı / Değerlendiriliyor" 3 sütun (geniş) → dikey
  yığın (dar), her sütun başlığı + madde listesi. Sütun boşsa (§6 dört durum, "boş")
  "Şu an bu aşamada madde yok" nötr metni, boş kutu bırakılmaz.

### 5.16 Kişi kartı (H5, hakkımızda)
- Gerçek fotoğraf (yuvarlak avatar **değil** — hafif yuvarlatılmış dikdörtgen,
  `--radius-md`, kişisel/"otantik" his verir, jenerik yuvarlak avatar klişesinden
  kaçınır) + ad + 2 cümle + doğrudan kanal butonu + çalışma saati/yanıt süresi notu.

### 5.17 İletişim kanalları
- WhatsApp (birincil, `--color-success` ikonuyla değil marka rengiyle — WhatsApp
  yeşili kullanılmaz, tutarlı marka paleti), e-posta, telefon, saat — dikey liste,
  her satır ikon + etiket + değer, `tel:`/`mailto:`/`wa.me` gerçek bağlantı.

### 5.18 Form (durumlar §6.2'de ayrıntılı)
- Etiket her zaman görünür (placeholder değil). Hata alanın **altında değil yanında/
  hemen altında**, `aria-describedby` ile bağlı, `aria-invalid="true"`. Zorunlu alan
  `*` + `aria-required`. Gizli bal küpü alanı (`endpoint` kipi) `aria-hidden="true"`
  + `tabindex="-1"` + CSS ile gizli (ekran okuyucudan da gizli, gerçek kullanıcıdan
  görünmez alan).

### 5.19 Yasal metin düzeni
- Tek sütun, `max-width: 720px`, `--font-size-16`/1.6. Üstte "Son güncelleme: GG.AA.YYYY"
  (içerikten, derleme tarihinden değil). "Taslak — avukat onayı bekliyor" notu §5.14
  deseni. EN sürümünde en üstte "Bağlayıcı olan Türkçe metindir" notu.

### 5.20 CTA bandı (H10, P13)
- Tam genişlik bant, `--color-accent-secondary` (`#223B57`) zemin + açık metin,
  başlık + alt metin + birincil CTA + WhatsApp/e-posta ikincil bağlantı.

### 5.21 404
- Aynı kabuk (header/footer), kısa mesaj + ana sayfa + iki ürün bağlantısı, kök-mutlak
  yollar. İsteğe bağlı anlatı dokunuşu: ibre `compass-seek` genişletilmiş bir
  varyantla (daha uzun, hiç 0deg'de oturmayan bir arama döngüsü) "yön arıyor" hissini
  pekiştirir — **reduced-motion'da bu da tamamen durur**, ibre sabit 0deg.

### 5.22 Buton / bağlantı / ikon genel kuralı
- Birincil buton: `--color-accent-primary` zemin, beyaz metin, `--radius-sm`,
  min-height 48px (dokunma hedefi). İkincil buton: `--color-surface` zemin,
  `--color-line` kenarlık. Bağlantı sonunda "→" **yalnız gerçek yön/hareket anlamı
  taşıyan yerlerde** (yön kapısı, "İncele" gibi); genel metin bağlantılarında yok.
- Sayfa başına **tek baskın birincil eylem** (evrensel taban) — ürün sayfasında P1
  birincil CTA, diğer CTA'lar (Fiyatlar, bağlantılar) görsel olarak ikincil kalır.

---

## 6. Erişilebilirlik kuralları

- Klavye sırası: skip-link → header (logo → ürün menüsü → dil → CTA) → ana içerik
  (sayfa akışı sırasıyla) → footer. Skip-link odakta görünür (`transform` ile açığa
  çıkar, mevcut mekanik korunur).
- Odak halkası: `outline: 3px solid var(--color-accent-primary); outline-offset: 3px`
  — zemin üstünde ≥3:1 (buton/link kontrastları §1.2'de zaten hesaplandı, halka aynı
  rengi kullanır).
- Anlam yalnız renkle taşınmaz: durum rozetleri renk + kelime (§5.10), form hatası
  renk + ikon + metin, "Temsilî" etiketi renk + kelime.
- Her form alanının görünür `<label>`'ı var; açılır menü `aria-haspopup`/
  `aria-expanded`; mobil menü `Esc` ile kapanır, tetikleyiciye odak döner.
- Büyük harf dönüşümü (`text-transform: uppercase`) **kullanılmaz** (eyebrow zaten
  cümle biçiminde, §2.1); kaçınılmazsa (ör. bir rozet kelimesi) `lang="tr"` doğru
  olduğu sürece İ/ı doğru render edilir ama **gerçek tarayıcıda görülmeden kabul
  edilmez** (D-003) — `sinayici`/`gorsel-denetici` görevine yazılır.
- Dar ekranda sayfa yatay kaymaz; kayan tek öğe varsa (yok, fiyat tablosu bile kart
  yığınına dönüyor) kendi kapsayıcısında kayar.
- Görseller: WebP, açık `width`/`height` (CLS önlemi), dekoratif görsel `alt=""`,
  anlamlı görsel gerçek `alt` metni.

## 7. Dört durum — her ekran, hem içerik hem form için

| Durum | İçerik ekranı örneği | Form örneği |
|---|---|---|
| **Boş** | Yol haritası sütunu boş → "Şu an bu aşamada madde yok" (nötr metin, kutu değil) | — (form her zaman alan gösterir) |
| **Yükleniyor** | — (statik site, çoğu ekranda yok) | Gönder butonu kilitlenir, "Gönderiliyor…" + spinner, `aria-busy="true"` |
| **Hata** | 404 sayfası (site geneli hata durumu) | `endpoint` kipinde 2xx dışı yanıt (429/5xx dahil) → hata banner + WhatsApp/e-posta yedek bağlantı, **otomatik yeniden deneme yok** (ADR-7) |
| **Başarı/Dolu** | Durum rozeti "Yayında", sürüm notu listesi dolu | Gönderim başarılı → form yerini başarı mesajı + yedek kanallar alır, `aria-live="polite"` ile duyurulur |

---

## 8. AI klişe kontrol listesi — `gorsel-denetici` bunu uygulanmış tasarıma karşı işaretler

- [ ] Sıcak krem zemin + serif başlık + toprak turuncu **yok** (seçilen palet bunu
  kasıtlı olarak aşar: serif yok, zemin neredeyse beyaz `#FBFAF7`, kırmızı `#B83B1C`
  toprak turuncusu değil — doğrudan pusula ibresinin kendi rengine bağlı, dekoratif
  değil).
- [ ] Neredeyse siyah zemin + tek neon vurgu **yok** (sayfa zemini neredeyse beyaz;
  koyu bant yalnız footer/CTA'da, marka ikincil rengiyle `#223B57`, tek-doygun-neon
  değil).
- [ ] Gazete düzeni (sıfır radius + yoğun sütun) tek başına **yok** — `--radius-0`
  yalnız blueprint/spec bağlamında bilinçli kullanılır, genel düzen gazete değil.
- [ ] "SaaS kart kiti" (her şey aynı yuvarlatılmış kart) **yok** — §3.1 radius
  kuralı ve §5.6/§5.13 "3'lü eşit ızgara yasağı" bunu engeller.
- [ ] Şablon çerçevesi (ALL-CAPS eyebrow, "A · B · C" meta zincir, "→" her butonda,
  "00/İNDEX", em tire) **yok** — §2.1, §5.5, §5.22'de tek tek kapatıldı.
- [ ] Em tire (—) hiçbir başlık/buton/alıntıda **yok**.
- [ ] 3 eşit kart yan yana **yok** (§5.6, §5.11).
- [ ] div'lerden sahte ekran görüntüsü **yok** — gerçek/temsilî etiketli görsel (§5.6).

---

## 9. Bilinen açık noktalar / bağımlılıklar

Renk/tipografi kararı kesinleşti (§0); bu belge artık **onaylı** ve tek bir sistemi
anlatıyor. Aşağıdaki UYGULAMA kararları (ETKI-ANALIZI §9) TASARIM'ı **engellemiyor**,
yer tutucuyla ilerleniyor:
- S3 (fiyat gösterim kipi) → §5.13 üç kipi de destekliyor, hangisi kullanılacağı iş
  kararı.
- S4 (herkese açık deneme adresi) → §5.1/§5.3 CTA etiketi `primaryCta()`'dan otomatik
  değişir, tasarım her iki etiketi de (kısa/uzun) barındıracak esneklikte.
- S5 (SHD durumu) → §5.10 rozet iki değeri de tasarlandı, veri kararı bekliyor.
- S7 (ekran görüntüleri) → §5.6 "Temsilî" etiketi gelene kadar geçerli.
- S8/S9/S10/S3(yasal) (kapılı sayfalar) → §5.15/§5.16/§5.19 şablonları hazır,
  içerik onayı bekliyor (EKRANLAR.md'de "Kapılı" işaretli).

Mevcut projeden **sapma değil, kasıtlı fark**: bugünkü `css/style.css` (DM Sans +
Manrope, mavi gradyan, yumuşak gölgeli kart) — tam olarak AI klişe #4'ün ("SaaS kart
kiti") kendisi. Bu belge kullanıcı onayıyla ondan bilerek uzaklaşıyor; "sapma" listesi
bu yüzden yok, bu bir yeniden tasarım (Güzergâh 2 BÜYÜK), koru-modernleştir değil.

---

## Ek. Değerlendirilen, seçilmeyen alternatifler (kayıt amaçlı)

Bu bölüm yalnız karar izini korumak için tutulur; **aktif tasarım sistemi değildir**,
hiçbir bileşen/uygulama görevi buradan jeton okumaz — §1-§2 tek geçerli kaynaktır.

### Yön A — Harita Kağıdı (seçilmedi)
Renk: zemin `#F2F1EA`, ink `#1C2430`, ink-muted `#5B6472`, line `#D8D4C6`, birincil
`#16305A` (lacivert), ikincil `#9C6B2E` (pusula pirinci, yalnız iri metin/UI ≥3:1).
Tipografi: Space Grotesk (başlık) + Source Sans 3 (gövde). Kişilik: sıcak, davetkâr,
"elle çizilmiş rota" hissi.

### Yön B — Mühendis Defteri (seçilmedi)
Renk: zemin `#EEF2F1`, ink `#121A2B`, ink-muted `#4E5A66`, line `#C6D0CE`, birincil
`#1E4D6B` (çelik mavisi), ikincil `#B4432E` (kırşım kalemi kırmızısı, küçük metinde
de geçerli). Tipografi: Archivo (başlık) + Public Sans (gövde). Kişilik: soğukkanlı,
teknik, "ölçülebilir" hissi.
