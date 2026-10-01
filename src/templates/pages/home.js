"use strict";

/* home.js — ana sayfa: "Keşif Haritası" (parşömen harita + merkez pusula +
   8 yönde rota kartları), altında seyir defteri (süreç, SSS, kapanış CTA).
   Tema yalnız bu sayfada body.theme-parchment ile açılır (layout.js);
   stiller components/compass-map.css, davranış + rota ezgileri
   client/site.js "Keşif haritası" bölümünde. JS kapalıyken kartlar düz
   bağlantıdır; pusula ve ses yalnız zenginleştirmedir. */

const { html, raw } = require("../../lib/html.js");
const { icon } = require("../partials/icon.js");
const { productState } = require("../../lib/model.js");
const { requestCtaHref, firstSentence, faqList, ctaBand, stepsList } = require("../partials/ui.js");

/* Kart yuvaları saat yönünde, Kuzey'den başlar; açı = sıra × 45°.
   Ürünler ana yönlerde (K, D, G), ikincil rotalar ara yönlerde. */
const SLOTS = ["hvac", "demo", "cold", "pricing", "puantaj", "services", "faq", "process"];

/* Harita koordinatları: 1000×1000 viewBox, kart merkezleri r=390 çemberinde
   (CSS'teki --map-r: 39% ile aynı oran). */
const MAP_R = 390;
function slotPoint(index, r = MAP_R) {
  const a = (index * 45 * Math.PI) / 180;
  return [Math.round(500 + r * Math.sin(a)), Math.round(500 - r * Math.cos(a))];
}

/* Bakır gravür havasında küçük vinyetler (200×105, currentColor ile
   mürekkep rengini alır). Fotoğraf yok: dış barındırıcıya bağımlılık
   olmasın ve ürün dışı kartlar uydurma ekran göstermesin. */
const VIGNETTES = {
  demo: `<path d="M30 70 Q60 92 120 86 Q150 80 160 64 L28 64 Z" fill="currentColor" fill-opacity=".18"/>
    <path d="M30 70 Q60 92 120 86 Q150 80 160 64 L28 64 Z"/>
    <path d="M70 64 V14 M118 64 V22"/>
    <path d="M70 18 Q96 30 70 58 Z M118 26 Q140 38 118 58 Z" fill="currentColor" fill-opacity=".12"/>
    <path d="M70 14 l14 4 -14 4" fill="currentColor"/>
    <path d="M10 92 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke-width="1"/>`,
  pricing: `<path d="M100 18 V86 M70 92 H130 M44 34 H156"/>
    <circle cx="100" cy="16" r="4" fill="currentColor"/>
    <path d="M44 34 L28 64 H60 Z M156 34 L140 64 H172 Z" stroke-width="1"/>
    <path d="M26 64 Q44 76 62 64 M138 64 Q156 76 174 64"/>
    <ellipse cx="44" cy="60" rx="9" ry="3" fill="currentColor" fill-opacity=".3"/>
    <ellipse cx="44" cy="56" rx="9" ry="3" fill="currentColor" fill-opacity=".3"/>
    <ellipse cx="44" cy="52" rx="9" ry="3" fill="currentColor" fill-opacity=".3"/>
    <path d="M150 60 l6 -12 l6 12 z" fill="currentColor" fill-opacity=".25"/>`,
  services: `<circle cx="78" cy="54" r="24" stroke-width="9" stroke-dasharray="5.2 4.2"/>
    <circle cx="78" cy="54" r="15"/><circle cx="78" cy="54" r="4" fill="currentColor"/>
    <circle cx="124" cy="40" r="15" stroke-width="7" stroke-dasharray="4 3.4"/>
    <circle cx="124" cy="40" r="8"/>
    <path d="M150 90 Q164 60 186 22 Q176 58 156 88 Z" fill="currentColor" fill-opacity=".15"/>
    <path d="M150 90 L186 22"/>`,
  faq: `<path d="M44 22 H150 Q160 22 160 32 V82 Q160 92 150 92 H52"/>
    <path d="M44 22 Q34 22 34 32 Q34 42 44 42 H54 V22" fill="currentColor" fill-opacity=".12"/>
    <path d="M52 92 Q42 92 42 82 Q42 72 52 72 H62 V92"/>
    <path d="M74 36 H146 M74 48 H140 M74 60 H130 M74 72 H120" stroke-width="1" stroke-dasharray="3 3"/>
    <text x="146" y="80" text-anchor="middle" font-size="22" font-family="serif" fill="currentColor" stroke="none">?</text>`,
  process: `<path d="M22 80 Q50 30 82 62 T140 40 T178 28" stroke-dasharray="3 5"/>
    <circle cx="22" cy="80" r="7" fill="currentColor" fill-opacity=".2"/>
    <circle cx="82" cy="62" r="7" fill="currentColor" fill-opacity=".2"/>
    <circle cx="140" cy="40" r="7" fill="currentColor" fill-opacity=".2"/>
    <path d="M172 22 l12 12 M184 22 l-12 12" stroke-width="2.4"/>
    <text font-size="9" font-family="serif" fill="currentColor" stroke="none" text-anchor="middle"><tspan x="22" y="83">1</tspan><tspan x="82" y="65">2</tspan><tspan x="140" y="43">3</tspan></text>`
};

function vignette(key) {
  return raw(`<svg class="map-card-art" viewBox="0 0 200 105" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${VIGNETTES[key]}</svg>`);
}

function slotTarget(ctx, key) {
  switch (key) {
    case "hvac": return ctx.url("hvac");
    case "cold": return ctx.url("cold");
    case "puantaj": return ctx.url("puantaj");
    case "demo": return requestCtaHref(ctx);
    case "pricing": return ctx.url("pricing");
    case "services": return ctx.url("services");
    case "faq": return "#sss";
    case "process": return "#nasil-basliyoruz";
    default: throw new Error(`home: bilinmeyen harita yuvası "${key}"`);
  }
}

function mapCard(ctx, key, index) {
  const map = ctx.content.home.map;
  const angle = index * 45;
  const badge = `${angle}° ${map.dirs[index]}`;
  const isProduct = key === "hvac" || key === "cold" || key === "puantaj";
  let title;
  let desc;
  let figure;
  let status = raw("");
  if (isProduct) {
    const product = ctx.content[key];
    const state = productState(product);
    title = product.name;
    desc = product.tagline;
    figure = html`<img src="${ctx.asset(`assets/screens/${key}/temsili.svg`)}" alt="" width="1200" height="780" loading="lazy" decoding="async">`;
    status = html`<span class="map-card-status${raw(state.isLive ? " is-live" : "")}">${ctx.t(state.badgeKey)}</span>`;
  } else {
    title = map.cards[key].title;
    desc = map.cards[key].desc;
    figure = vignette(key);
  }
  return html`<li class="map-slot" style="--slot:${String(index)}">
    <a class="map-card map-card--${raw(key)}${raw(isProduct ? " map-card--product" : "")}" href="${slotTarget(ctx, key)}" data-angle="${String(angle)}" data-tune="${key}">
      <span class="map-card-figure">${figure}<span class="map-card-badge">${badge}</span></span>
      <span class="map-card-title">${title}</span>
      <span class="map-card-desc">${desc}</span>
      ${status}
    </a>
  </li>`;
}

/* Arka plan haritası: portolan rüzgâr çizgileri, kıyılar, rota ağı ve
   pinler. Pin ve ışın koordinatları kart yuvalarından türetilir ki
   kartla birebir hizalansın. */
function mapArt() {
  const rhumbs = [];
  for (let i = 0; i < 32; i++) {
    const [x, y] = slotPoint(i * 0.25, 700);
    rhumbs.push(`<line x1="500" y1="500" x2="${x}" y2="${y}"/>`);
  }
  const points = SLOTS.map((_, i) => slotPoint(i));
  const rays = points.map(([x, y], i) => `<line class="map-ray" data-ray="${i}" x1="500" y1="500" x2="${x}" y2="${y}"/>`);
  const pins = points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6"/>`);
  return raw(`<svg class="map-art" viewBox="0 0 1000 1000" aria-hidden="true" focusable="false">
    <g class="map-art-rhumbs">${rhumbs.join("")}</g>
    <g class="map-art-grid">
      <circle cx="500" cy="500" r="${MAP_R}"/><circle cx="500" cy="500" r="${MAP_R + 40}"/><circle cx="500" cy="500" r="200"/>
    </g>
    <g class="map-art-land">
      <path d="M0 0 H210 Q190 60 140 70 T60 150 Q30 200 0 190 Z"/>
      <path d="M1000 0 V230 Q950 200 920 150 T830 90 Q800 40 820 0 Z"/>
      <path d="M0 1000 V820 Q60 800 90 850 T170 920 Q200 960 190 1000 Z"/>
      <path d="M1000 1000 H780 Q800 940 860 930 T940 850 Q970 800 1000 790 Z"/>
    </g>
    <g class="map-art-coast">
      <path d="M210 0 Q190 60 140 70 T60 150 Q30 200 0 190"/>
      <path d="M230 0 Q206 74 150 86 T74 162 Q40 214 0 210"/>
      <path d="M1000 230 Q950 200 920 150 T830 90 Q800 40 820 0"/>
      <path d="M0 820 Q60 800 90 850 T170 920 Q200 960 190 1000"/>
      <path d="M780 1000 Q800 940 860 930 T940 850 Q970 800 1000 790"/>
    </g>
    <path class="map-art-route" d="M${points.map(([x, y]) => `${x} ${y}`).join(" L")} Z"/>
    <g class="map-art-rays">${rays.join("")}</g>
    <g class="map-art-pins">${pins.join("")}</g>
    <g class="map-art-ship" transform="translate(800 560) scale(.55)">
      <path d="M20 60 Q50 90 100 80 Q120 50 110 30 L10 30 Z"/>
      <path d="M40 30 V0 M80 30 V-10" fill="none"/>
      <path d="M40 5 Q60 0 40 -15 Q25 0 40 5 M80 -5 Q100 -10 80 -25 Q65 -10 80 -5"/>
    </g>
    <g class="map-art-serpent" transform="translate(120 600)">
      <path d="M0 30 q14 -30 28 0 q14 -30 28 0 q12 -24 24 0 M80 30 q8 -14 16 -6" fill="none"/>
      <circle cx="94" cy="22" r="1.8"/>
    </g>
    <g class="map-art-rose" transform="translate(880 900)">
      <circle r="34" fill="none"/><path d="M0 -46 L6 0 L0 46 L-6 0 Z M-46 0 L0 -6 L46 0 L0 6 Z"/>
    </g>
  </svg>`);
}

function compass(ctx) {
  const map = ctx.content.home.map;
  return html`<button type="button" class="compass" id="compass" aria-label="${map.compassLabel}">
    <span class="compass-dial" aria-hidden="true">
      <span class="compass-ticks"></span>
      <span class="compass-dir compass-dir-n">${map.dial[0]}</span>
      <span class="compass-dir compass-dir-e">${map.dial[1]}</span>
      <span class="compass-dir compass-dir-s">${map.dial[2]}</span>
      <span class="compass-dir compass-dir-w">${map.dial[3]}</span>
    </span>
    <span class="compass-needle-turn" id="compass-needle" aria-hidden="true">
      <span class="compass-needle"><span class="needle-north"></span><span class="needle-south"></span></span>
    </span>
    <span class="compass-pivot" aria-hidden="true"></span>
  </button>`;
}

function mapSection(ctx) {
  const home = ctx.content.home;
  const map = home.map;
  return html`<section class="chart" id="urunler" aria-labelledby="chart-title">
    <div class="chart-cartouche">
      <p class="chart-kicker">${map.kicker}</p>
      <h1 id="chart-title">${map.title}</h1>
      <p class="chart-lead">${map.lead}</p>
    </div>
    <div class="chart-map" data-chart>
      ${mapArt()}
      <h2 class="visually-hidden">${map.routesTitle}</h2>
      <ol class="map-slots">
        ${SLOTS.map((key, i) => mapCard(ctx, key, i))}
      </ol>
      ${compass(ctx)}
    </div>
    <div class="chart-plate">
      <button type="button" class="sound-toggle" id="sound-toggle" aria-pressed="false" hidden
        data-label-on="${map.soundOn}" data-label-off="${map.soundOff}">
        <span class="sound-toggle-icon" aria-hidden="true">♪</span>
        <span class="sound-toggle-label">${map.soundOff}</span>
      </button>
      <p class="chart-hint">${map.soundHint}</p>
      <a class="chart-scroll" href="#seyir">${map.scrollHint} <span aria-hidden="true">↓</span></a>
    </div>
  </section>`;
}

function processSection(ctx) {
  const process = ctx.content.home.process;
  return html`<section id="nasil-basliyoruz">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">${process.kicker}</p>
        <h2>${process.title}</h2>
      </div>
      ${stepsList(process.steps)}
    </div>
  </section>`;
}

function faqSection(ctx) {
  const faq = ctx.content.home.faq;
  return html`<section id="sss" class="bleed-soft">
    <div class="container faq-layout">
      <div class="faq-heading">
        <p class="eyebrow">${faq.kicker}</p>
        <h2>${faq.title}</h2>
        <p class="lead">${faq.lead}</p>
        <a class="link-directional faq-link" href="${requestCtaHref(ctx)}">${faq.link} ${icon(ctx, "arrow-right")}</a>
      </div>
      ${faqList(ctx, faq.items, "faq-home")}
    </div>
  </section>`;
}

function closingCtaSection(ctx) {
  const home = ctx.content.home;
  return ctaBand(ctx, {
    heading: ctx.t("brand.tagline"),
    body: firstSentence(home.hero.description),
    primaryHref: requestCtaHref(ctx),
    primaryLabel: home.hero.secondary
  });
}

function home(ctx) {
  return html`<article data-route="home">
    ${mapSection(ctx)}
    <div id="seyir" class="logbook">
      ${processSection(ctx)}
      ${faqSection(ctx)}
      ${closingCtaSection(ctx)}
    </div>
  </article>`;
}

module.exports = { home };
