# -*- coding: utf-8 -*-
"""Sosyal medya paylasim gorselleri (Open Graph) uretir.

Hicbir sosyal platform OG gorseli olarak SVG islemez; SVG birakilirsa
her paylasim bos kart olarak cikar. Bu yuzden PNG uretiliyor.

Yeniden yazim (ETKI-ANALIZI SS1.5/A8, arayuz-gelistirici ITIRAZ madde 7):
  - Adres artik site.config.js'teki origin'den okunur (eskiden
    biltekinhamza.github.io/dijital-pusula sabit yaziliydi).
  - Palet Yon C "Manyetik Kuzey" (TASARIM-STANDARDI.md SS1.2): kuzey
    kirmizisi #B83B1C + celik lacivert #223B57 + neredeyse-beyaz zemin
    #FBFAF7 (eski mavi degrade paleti tamamen kaldirildi).
  - Yazi tipi Windows sistem fontlari (segoeui.ttf) degil, sitenin kendi
    barindirdigi IBM Plex Sans / IBM Plex Sans Condensed woff2 dosyalari
    (src/static/assets/fonts/).
  - Baslik/aciklama/etiket metni CONTENT dosyalarindan (node tools/og-data.js
    araciligiyla) okunur; burada AYRI bir kopya elle yazilip site
    metninden ayrismaz (tek kaynak ilkesi).
  - TR ve EN cikti uretilir.
"""
import json
import subprocess
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "static" / "assets" / "og"
FONT_DIR = ROOT / "src" / "static" / "assets" / "fonts"
W, H = 1200, 630

# Yon C "Manyetik Kuzey" (TASARIM-STANDARDI.md SS1.1/1.2)
BG = (251, 250, 247)          # --color-bg
INK = (25, 30, 40)            # --color-ink
INK_MUTED = (92, 100, 112)    # --color-ink-muted
LINE = (226, 223, 214)        # --color-line
ACCENT = (184, 59, 28)        # --color-accent-primary (kuzey kirmizisi)
ACCENT_INK = (147, 47, 22)    # --color-accent-primary-ink
SECONDARY = (34, 59, 87)      # --color-accent-secondary (celik lacivert)
ACCENT_SOFT = (247, 227, 225)  # kirmizi zeminin acik tonu (rozet/chip zemini)

BOLD_COND = FONT_DIR / "ibm-plex-sans-condensed-700.woff2"
SEMI_COND = FONT_DIR / "ibm-plex-sans-condensed-600.woff2"
REG = FONT_DIR / "ibm-plex-sans-400.woff2"
MED = FONT_DIR / "ibm-plex-sans-500.woff2"
BOLD = FONT_DIR / "ibm-plex-sans-700.woff2"


def font(path, size):
    return ImageFont.truetype(str(path), size)


def load_og_data():
    """node tools/og-data.js'i calistirip JSON olarak okur (tek kaynak)."""
    result = subprocess.run(
        [sys.executable and "node" or "node", "tools/og-data.js"],
        cwd=ROOT, capture_output=True, text=True, encoding="utf-8", errors="replace", check=True
    )
    return json.loads(result.stdout)


def background():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")
    # ince izgara (blueprint kimligi, TASARIM-STANDARDI SS3.1 "kagit/blueprint")
    for x in range(0, W, 60):
        d.line([(x, 0), (x, H)], fill=LINE + (90,))
    for y in range(0, H, 60):
        d.line([(0, y), (W, y)], fill=LINE + (90,))
    # alt vurgu cizgisi: kuzey kirmizisindan celik lacivertine gecis
    for x in range(W):
        t = x / W
        c = tuple(round(a + (b - a) * t) for a, b in zip(ACCENT, SECONDARY))
        d.line([(x, H - 7), (x, H)], fill=c)
    return img


def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def compass(d, cx, cy, r):
    """Pusula ibresi: kuzey yarisi kirmizi, guney yarisi lacivert (TASARIM-STANDARDI SS1.3)."""
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=SECONDARY)
    ir = r * 0.76
    d.ellipse([cx - ir, cy - ir, cx + ir, cy + ir], outline=(255, 255, 255, 130), width=2)
    n, w = r * 0.80, r * 0.30
    d.polygon([(cx, cy - n), (cx + w, cy), (cx, cy)], fill=ACCENT)
    d.polygon([(cx, cy - n), (cx - w, cy), (cx, cy)], fill=(224, 150, 128))
    d.polygon([(cx, cy + n), (cx + w, cy), (cx, cy)], fill=(255, 255, 255))
    d.polygon([(cx, cy + n), (cx - w, cy), (cx, cy)], fill=(197, 205, 216))
    hr = r * 0.14
    d.ellipse([cx - hr, cy - hr, cx + hr, cy + hr], fill=INK)


def chip(d, x, y, text, fnt):
    pad_x, h = 16, 34
    w = round(d.textlength(text, font=fnt)) + pad_x * 2
    d.rounded_rectangle([x, y, x + w, y + h], radius=6, fill=ACCENT_SOFT, outline=ACCENT)
    d.text((x + pad_x, y + h / 2), text, font=fnt, fill=ACCENT_INK, anchor="lm")
    return x + w + 10


def build(name, host, brand, tagline, eyebrow, title, subtitle, chips):
    img = background()
    d = ImageDraw.Draw(img, "RGBA")
    f_eyebrow = font(SEMI_COND, 22)
    f_title = font(BOLD_COND, 62)
    f_sub = font(REG, 30)
    f_chip = font(MED, 20)
    f_brand = font(BOLD, 30)
    f_tag = font(BOLD, 22)
    f_url = font(MED, 20)

    x = 78
    compass(d, x + 23, 83, 23)
    d.text((x + 62, 71), "Dijital", font=f_brand, fill=INK)
    bw = d.textlength("Dijital", font=f_brand)
    d.text((x + 62 + bw, 71), "Pusula", font=f_brand, fill=ACCENT)

    d.text((x, 122), tagline, font=f_tag, fill=ACCENT_INK)

    d.text((x, 168), eyebrow.upper(), font=f_eyebrow, fill=SECONDARY)

    y = 210
    for line in wrap(d, title, f_title, W - x * 2):
        d.text((x, y), line, font=f_title, fill=INK)
        y += 74

    y += 26
    for line in wrap(d, subtitle, f_sub, W - x * 2 - 40):
        d.text((x, y), line, font=f_sub, fill=INK_MUTED)
        y += 40

    cx = x
    for text in chips:
        cx = chip(d, cx, 508, text, f_chip)

    d.text((x, 578), host, font=f_url, fill=INK_MUTED)

    path = OUT / name
    OUT.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    print(f"{name}  {path.stat().st_size // 1024} KB")


def main():
    data = load_og_data()
    host = urlparse(data["origin"]).netloc or data["origin"]
    brand = "Dijital Pusula"

    pages = [
        ("home", lambda t: t["home"]["title"].split(" | ")[0], lambda t: t["home"]["og"] or t["home"]["description"], "home"),
        ("hvac", lambda t: t["hvac"]["meta"]["title"].split(" | ")[1] if " | " in t["hvac"]["meta"]["title"] else t["hvac"]["meta"]["title"], lambda t: t["hvac"]["meta"]["og"] or t["hvac"]["meta"]["description"], "hvac"),
        ("cold", lambda t: t["cold"]["meta"]["title"].split(" | ")[1] if " | " in t["cold"]["meta"]["title"] else t["cold"]["meta"]["title"], lambda t: t["cold"]["meta"]["og"] or t["cold"]["meta"]["description"], "cold"),
        ("puantaj", lambda t: t["puantaj"]["meta"]["title"].split(" | ")[1] if " | " in t["puantaj"]["meta"]["title"] else t["puantaj"]["meta"]["title"], lambda t: t["puantaj"]["meta"]["og"] or t["puantaj"]["meta"]["description"], "puantaj"),
    ]

    for lang in ("tr", "en"):
        tree = data[lang]
        tagline = tree["tagline"]  # brand.tagline (icerikten - elle yazilmaz, D-003)
        for page_id, title_fn, sub_fn, chips_key in pages:
            title = title_fn(tree)
            subtitle = sub_fn(tree)
            chips = tree[chips_key]["highlights"][:3]
            page_eyebrow = tree["homeEyebrow"] if page_id == "home" else tree[page_id]["meta"]["title"].split(" | ")[0]
            suffix = "" if lang == "tr" else "-en"
            build(
                f"og-{page_id}{suffix}.png",
                host, brand, tagline,
                page_eyebrow, title, subtitle, chips
            )


if __name__ == "__main__":
    main()
