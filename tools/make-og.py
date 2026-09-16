# -*- coding: utf-8 -*-
"""Sosyal medya paylasim gorselleri (Open Graph) uretir.

Hicbir sosyal platform OG gorseli olarak SVG islemez; SVG birakilirsa
her paylasim bos kart olarak cikar. Bu yuzden PNG uretiliyor.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# Proje koku script konumundan turetilir; klasor adi degisirse bozulmaz.
OUT = Path(__file__).resolve().parent.parent / "assets" / "images"
W, H = 1200, 630

FONT_DIR = Path(r"C:\Windows\Fonts")
BOLD = FONT_DIR / "segoeuib.ttf"
SEMI = FONT_DIR / "seguisb.ttf"
REG = FONT_DIR / "segoeui.ttf"
MONO = FONT_DIR / "consola.ttf"


def font(path, size):
    return ImageFont.truetype(str(path if path.exists() else REG), size)


def lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def background():
    img = Image.new("RGB", (W, H), (246, 248, 251))
    d = ImageDraw.Draw(img)
    # sol ust cok hafif mavi parlama (siteki .hero::before ile ayni mantik)
    glow = Image.new("RGB", (W, H), (246, 248, 251))
    gd = ImageDraw.Draw(glow)
    for r in range(560, 0, -8):
        t = 1 - r / 560
        gd.ellipse([160 - r, -80 - r, 160 + r, -80 + r], fill=lerp((246, 248, 251), (26, 115, 232), t * 0.16))
    img = Image.composite(glow, img, Image.new("L", (W, H), 110))
    # ince izgara
    d = ImageDraw.Draw(img, "RGBA")
    for x in range(0, W, 60):
        d.line([(x, 0), (x, H)], fill=(15, 23, 42, 10))
    for y in range(0, H, 60):
        d.line([(0, y), (W, y)], fill=(15, 23, 42, 10))
    # alt vurgu cizgisi
    for x in range(W):
        d.line([(x, H - 7), (x, H)], fill=lerp((26, 115, 232), (13, 71, 161), x / W))
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
    """Site logosunun PNG karsiligi: dolu mavi kadran + iki tonlu ibre."""
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(26, 115, 232))
    ir = r * 0.76
    d.ellipse([cx - ir, cy - ir, cx + ir, cy + ir], outline=(255, 255, 255, 120), width=2)
    n, w = r * 0.80, r * 0.30
    d.polygon([(cx, cy - n), (cx + w, cy), (cx, cy)], fill=(255, 255, 255))
    d.polygon([(cx, cy - n), (cx - w, cy), (cx, cy)], fill=(197, 220, 250))
    d.polygon([(cx, cy + n), (cx + w, cy), (cx, cy)], fill=(28, 79, 150))
    d.polygon([(cx, cy + n), (cx - w, cy), (cx, cy)], fill=(21, 60, 116))
    hr = r * 0.14
    d.ellipse([cx - hr, cy - hr, cx + hr, cy + hr], fill=(255, 255, 255))


def chip(d, x, y, text, fnt):
    pad_x, h = 16, 34
    w = round(d.textlength(text, font=fnt)) + pad_x * 2
    d.rounded_rectangle([x, y, x + w, y + h], radius=8,
                        fill=(234, 241, 251), outline=(180, 205, 235))
    d.text((x + pad_x, y + h / 2), text, font=fnt, fill=(11, 79, 160), anchor="lm")
    return x + w + 10


def build(name, eyebrow, title, subtitle, chips):
    img = background()
    d = ImageDraw.Draw(img, "RGBA")
    f_eyebrow = font(SEMI, 22)
    f_title = font(BOLD, 66)
    f_sub = font(REG, 30)
    f_chip = font(SEMI, 20)
    f_brand = font(BOLD, 30)
    f_url = font(MONO, 20)

    x = 78
    # marka: pusula isareti + iki tonlu kelime markasi
    compass(d, x + 23, 83, 23)
    d.text((x + 62, 71), "Dijital", font=f_brand, fill=(16, 25, 43))
    bw = d.textlength("Dijital", font=f_brand)
    d.text((x + 62 + bw, 71), "Pusula", font=f_brand, fill=(11, 79, 160))

    d.text((x, 122), "Doğru yerdesiniz.", font=font(BOLD, 24), fill=(11, 79, 160))

    d.text((x, 168), eyebrow.upper(), font=f_eyebrow, fill=(11, 79, 160))

    y = 210
    for line in wrap(d, title, f_title, W - x * 2):
        d.text((x, y), line, font=f_title, fill=(16, 25, 43))
        y += 78

    y += 26
    for line in wrap(d, subtitle, f_sub, W - x * 2 - 40):
        d.text((x, y), line, font=f_sub, fill=(87, 102, 126))
        y += 40

    cx = x
    for text in chips:
        cx = chip(d, cx, 508, text, f_chip)

    d.text((x, 578), "biltekinhamza.github.io/dijital-pusula", font=f_url, fill=(133, 146, 168))

    path = OUT / name
    img.save(path, "PNG", optimize=True)
    print(f"{name}  {path.stat().st_size // 1024} KB")


build(
    "og-home.png",
    "Sektörel yazılım",
    "Havalandırma ve soğuk hava deposu için hazır yazılım",
    "Kutudan çıkar çıkmaz çalışan iki ürün. Kurulum yok, her işletme kendi verisiyle çalışır.",
    ["HVAC Pro Suite", "Soğuk Hava Deposu", "Çok işletmeli"],
)

build(
    "og-hvac.png",
    "HVAC Pro Suite",
    "Sac açılımından teklife kadar tek platform",
    "25 parça tipi için maliyet hesabı, müşterinin kendi girdiği ölçü, antetli PDF teklif.",
    ["25 parça tipi", "Paraşüt aktarımı", "Android istemci"],
)

build(
    "og-soguk-hava.png",
    "Soğuk Hava Deposu Yönetim Sistemi",
    "Deponun 3D dijital ikizi",
    "Sürükle-bırak palet yerleşimi, istif ve koridor kuralları, kalan KG üzerinden hesap.",
    ["3D yerleşim", "Çoklu depo", "CSV / XLSX / PDF"],
)
