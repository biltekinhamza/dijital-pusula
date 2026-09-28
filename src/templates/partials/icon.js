"use strict";

/* icon.js — ortak SVG sprite kullanım yardımcısı (TASARIM-STANDARDI.md S4
   "ikon dili": tek stil, 1.5px çizgi, 24px ızgara, dolgu yok). Sprite
   src/static/assets/icons.svg içinde <symbol id="icon-*"> olarak tanımlı;
   burada yalnız <use> ile dışarıdan referans verilir (tek dosya, tarayıcı
   önbelleğinde bir kez indirilir). Semboller: bkz. assets/icons.svg. */

const { html, raw } = require("../../lib/html.js");

function icon(ctx, name, opts = {}) {
  const cls = opts.class ? ` ${opts.class}` : "";
  const hidden = opts.decorative === false ? "" : ' aria-hidden="true"';
  return html`<svg class="icon${raw(cls)}"${raw(hidden)}><use href="${ctx.asset("assets/icons.svg")}#icon-${raw(name)}"></use></svg>`;
}

module.exports = { icon };
