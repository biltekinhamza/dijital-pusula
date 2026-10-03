# Durum — dijital-pusula
Güzergâh: 2-büyük   Faz: TESLIM   Durum: onay_bekliyor
Güncelleme: 2026-09-28

## Varsayımlar
- Kullanıcı "en yaratıcı ve iyi web sitesini uyarlayalım, dosyalara bağlı kalma, değiştir/sil"
  dedi — bu, mimari ölçekte bir yeniden tasarım isteği olarak yorumlandı (Güzergâh 2 BÜYÜK).
- docs/site-arastirma-raporu.md zaten kapsamlı bir dönüşüm araştırması içeriyor (ajans
  sitesinden ürün sitesine geçiş, sayfa mimarisi, fiyatlandırma, güven unsurları, SEO/hreflang,
  yasal yükümlülükler) — mimar bunu girdi olarak kullandı, yeniden araştırma yapılmadı.
- Barındırma Cloudflare Workers'a taşınmış ve `dijital-pusula` servisi yayına
  alınmıştır; canonical origin `src/site.config.js` içinde tutulur.
- S3-S17 (kadro/ETKI-ANALIZI.md §9 — fiyat gösterimi, deneme adresi, SHD durumu, form kipi,
  ekran görüntüsü kaynağı, hakkımızda, sürüm notları, güvenlik sayfası bilgileri, EN kapsamı,
  erken kullanıcı programı, analitik, alan adı, GitHub Pages kapatma, yasal sayfa birleştirme,
  örnek hesap tablosu) TASARIM fazını engellemiyor — UYGULAMA/içerik/yayın aşamasında
  cevaplanacak, o zamana kadar mimarın önerdiği varsayılan/yer tutucu değerlerle ilerlenir.

## Tamamlanan fazlar
- TEST — sinayici, bağımsız doğrulama: 166/166 test, build/check-site rakamları teyitli, gerçek HTTP+jsdom ile uçtan uca yol denendi, kırık bulunmadı — 2026-09-28
- INCELEME — denetici ∥ bekci ∥ gorsel-denetici (paralel) — 2026-09-28
  bekci: 0 engelleyici (yalnız bilinen S14/S16 uyarıları)
  gorsel-denetici: 0 engelleyici, 6 kozmetik bulgu (bkz. kapsam dışı bulgular)
  denetici: 4 ENGELLEYİCİ bulundu → gelistirici + arayuz-gelistirici (sıralı) düzeltti → denetici bağımsızca tekrar doğruladı, hepsi KAPANDI
  Son test: 175-176 arası (glob farkı, hepsi geçiyor), node tools/build.js + check-site.js temiz
- KESIF — kesifci raporu (sohbet içi, dosyaya yazılmadı) — 2026-09-28
- ETKI_ANALIZI — kadro/ETKI-ANALIZI.md — 2026-09-28
- TASARIM — kadro/TASARIM-STANDARDI.md + kadro/EKRANLAR.md — 2026-09-28
- UYGULAMA Aşama 0 (G0-G6) — gelistirici, dal: yeniden-kurulum, commit atılmadı (henüz istenmedi) — 2026-09-28
  134 test yeşil; build belirlenimci; check-site --release MADDE5/origin eksikliğini doğru şekilde FAIL veriyor (S14/S16 bekliyor)
  G5'te 2 gerçek içerik hatası bulunup düzeltildi: istif örtüşme eşiği %60→%30 (üründeki gerçek sabit), test sayısı iddiaları güncellendi (775 gerçek test)
- UYGULAMA-ARAYUZ Aşama 1 (A1-A8) — arayuz-gelistirici — 2026-09-28
  9 maddelik İTİRAZ açıldı (içerik modeli eksikleri, build.js CSS/JS birleştirme eksik, make-og.py eski, 2 test hatası, em tire),
  gelistirici tarafından çözüldü, arayuz-gelistirici doğruladı ve P3/P12 entegrasyonunu kendi tarafında tamamladı.
  Son durum: 166/166 test yeşil, node tools/build.js → 20 HTML/47 dosya, check-site kural 1-13 [OK] (yalnız beklenen S14/S16 uyarıları)

## Alınan onaylar
- S1 (ADR-1, yapım yöntemi — bağımlılıksız Node üretici + commit'lenen site/) — onaylandı — 2026-09-28
- S2 (ADR-3, marka — ad+simge+slogan sabit, görsel dil tasarımcıya açık) — onaylandı — 2026-09-28
- Tasarım yönü — Yön C "Manyetik Kuzey" (kuzey kırmızısı #B83B1C + derin çelik lacivert #223B57, IBM Plex Sans Condensed/IBM Plex Sans) — onaylandı — 2026-09-28

## Açık itirazlar
(yok)

## Bu turda yazılan dersler
(yok)

## Kapsam dışı bulgular
- assets/icons/ui-icons.svg hiç kullanılmıyor (ölü asset) — [eski kod, yeniden-kurulum'da zaten silinecek listesindeydi]
- translations.js içindeki notFound.* (tr+en) bloğu 404.html tarafından hiç okunmuyor — [aynı, eski kod]
- SITE_COMPANY.kep/taxNumber/mersis hâlâ boş — e-ticaret yönetmeliği md.5 yükümlülüğü karşılanmıyor (S16 bekliyor)
- FORM_ENDPOINT boş — form mailto yedek modda (S6 bekliyor)
- Barındırma hâlâ GitHub Pages'e işaret ediyor — yeniden-kurulum dalında origin site.config.js'te tek yerde, yer tutucu (S14 bekliyor)
- ETKI-ANALIZI.md §9: 15 açık soru (S3-S17), UYGULAMA/yayın aşamasında kullanıcıya sorulacak
- EN içerik dosyalarında (hvac.js, cold.js, home.js, contact.js — en/) hâlâ em tire (—) var (yalnız TR cold.js düzeltildi) — INCELEME'de (denetici) ele alınacak
- product.js şablonundaki requestCtaHref() model.js'in primaryCta() tek-okuyucusunu kullanmıyor, "request" davranışını sabit varsayıyor — self-serve/trial.url eklenirse (S4 cevaplanırsa) şablon güncellenmeli
- ui.js'teki statusBadge() (ürün sayfası P1 hero'sunda) hâlâ kendi bağımsız status kontrolünü yapıyor, productState()/assertEnum'a bağlı değil — şu an sessiz yanlış sonuç üretmiyor (home.js zaten her derlemede assertEnum'u tetikliyor) ama kod tekrarı/bakım riski
- gorsel-denetici'nin 6 kozmetik bulgusu: (1) EN içerikte 8 yerde em tire hâlâ var (TR temiz), (2) yön kapısı merkez pusula-gülü ikonu CSS'te flex-shrink eksikliğiyle görünmez oluyor, (3) ürün sayfası "Modüller" bölümü EKRANLAR.md'nin istediği tekrarlı zigzag yerine tek-zigzag+liste hibrit, (4) bazı link-list ikonları SVG sprite yerine ham Unicode glyph, (5) fiyatlandırma sayfasında "Plan karşılaştırma tablosu" hiç render edilmiyor (pricing.js'de geliştiricinin kendi notu: "kurulamıyor"), (6) ürün açılır menüsü aria-haspopup/aria-expanded yerine native <details> (işlevsel ama spec'in ARIA örüntüsü değil)
- denetici'nin ek kozmetik bulguları: ALL-CAPS "kicker" etiketleri tutarsız (bazı yerlerde cümle biçiminde), "→" oku bazı yerlerde genel metinde kullanılmış (yalnız yön/hareket anlamı taşıyan yerlerde olmalı), services.js'te ölü içerik anahtarı (detailLabel, hiç okunmuyor), contact.js'te honeypot etiketi şablona sabit yazılmış (ctx.t() değil)
