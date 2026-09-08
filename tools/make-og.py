# -*- coding: utf-8 -*-
"""Sosyal medya paylasim gorselleri (Open Graph) uretir.

Hicbir sosyal platform OG gorseli olarak SVG islemez; SVG birakilirsa
her paylasim bos kart olarak cikar. Bu yuzden PNG uretiliyor.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(r"E:\proje-bahcesi\assets\images")
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
    img = Image.new("RGB", (W, H), (5, 13, 26))
    d = ImageDraw.Draw(img)
    # kosegen degrade
    top, bottom = (10, 26, 52), (4, 10, 21)
    for y in range(H):
        d.line([(0, y), (W, y)], fill=lerp(top, bottom, y / H))
    # sol ust mavi parlama
    glow = Image.new("RGB", (W, H), (0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for r in range(520, 0, -8):
        t = 1 - r / 520
        gd.ellipse([160 - r, -60 - r, 160 + r, -60 + r], fill=lerp((0, 0, 0), (26, 115, 232), t * 0.55))
    img = Image.blend(img, Image.blend(img, glow, 0.0), 0.0) if False else img
    img = Image.composite(Image.blend(img, glow, 0.45), img, Image.new("L", (W, H), 90))
    # ince izgara
    d = ImageDraw.Draw(img, "RGBA")
    for x in range(0, W, 60):
        d.line([(x, 0), (x, H)], fill=(30, 136, 229, 16))
    for y in range(0, H, 60):
        d.line([(0, y), (W, y)], fill=(30, 136, 229, 16))
    # alt vurgu cizgisi
    for x in range(W):
        d.line([(x, H - 7), (x, H)], fill=lerp((26, 115, 232), (0, 188, 212), x / W))
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


def chip(d, x, y, text, fnt):
    pad_x, h = 16, 34
    w = round(d.textlength(text, font=fnt)) + pad_x * 2
    d.rounded_rectangle([x, y, x + w, y + h], radius=8,
                        fill=(20, 42, 78), outline=(40, 84, 145))
    d.text((x + pad_x, y + h / 2), text, font=fnt, fill=(159, 198, 255), anchor="lm")
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
    # marka
    d.rounded_rectangle([x, 60, x + 46, 106], radius=12, fill=(26, 115, 232))
    d.text((x + 23, 83), "P", font=f_brand, fill=(255, 255, 255), anchor="mm")
    d.text((x + 62, 71), "Proje", font=f_brand, fill=(240, 244, 255))
    bw = d.textlength("Proje", font=f_brand)
    d.text((x + 62 + bw, 71), "Bahçesi", font=f_brand, fill=(66, 165, 245))

    d.text((x, 168), eyebrow.upper(), font=f_eyebrow, fill=(100, 181, 246))

    y = 210
    for line in wrap(d, title, f_title, W - x * 2):
        d.text((x, y), line, font=f_title, fill=(255, 255, 255))
        y += 78

    y += 26
    for line in wrap(d, subtitle, f_sub, W - x * 2 - 40):
        d.text((x, y), line, font=f_sub, fill=(143, 168, 200))
        y += 40

    cx = x
    for text in chips:
        cx = chip(d, cx, 508, text, f_chip)

    d.text((x, 578), "biltekinhamza.github.io/proje-bahcesi", font=f_url, fill=(90, 108, 136))

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
