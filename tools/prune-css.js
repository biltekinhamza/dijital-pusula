/* Eski tasarimdan kalan olu CSS kurallarini temizler (postcss ile).

   Kural: bir secici, icinde EN AZ BIR sinif varsa ve o siniflarin HEPSI
   hicbir HTML/JS dosyasinda gecmiyorsa oludur. Bir kuralin butun
   secicileri oluyse kural silinir; karisik kurallarda yalnizca olu
   seciciler ayiklanir. Element secicilerine (body, h1, a) dokunulmaz. */
const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

// Proje koku script konumundan turetilir; klasor adi degisirse bozulmaz.
const ROOT = path.resolve(__dirname, "..");
const CSS = path.join(ROOT, "css/style.css");
const apply = process.argv.includes("--apply");

const css = fs.readFileSync(CSS, "utf8");
const used = [
  ...fs.readdirSync(ROOT).filter((f) => f.endsWith(".html")).map((f) => path.join(ROOT, f)),
  path.join(ROOT, "js/main.js"), path.join(ROOT, "js/translations.js")
].map((f) => fs.readFileSync(f, "utf8")).join("\n");

const KEEP = new Set(["visually-hidden", "skip-link", "noscript"]);
const cache = new Map();
function dead(cls) {
  if (KEEP.has(cls)) return false;
  if (!cache.has(cls)) {
    cache.set(cls, !new RegExp(`["' .]${cls}["' >:.,)]|class="[^"]*\\b${cls}\\b`).test(used));
  }
  return cache.get(cls);
}
function selectorDead(sel) {
  const classes = [...sel.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]);
  return classes.length > 0 && classes.every(dead);
}

const root = postcss.parse(css, { from: CSS });
const removed = [];
const liveClassesBefore = new Set();
root.walkRules((rule) => {
  for (const m of rule.selector.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
    if (!dead(m[1])) liveClassesBefore.add(m[1]);
  }
});

root.walkRules((rule) => {
  const selectors = rule.selectors;
  const alive = selectors.filter((s) => !selectorDead(s));
  if (alive.length === selectors.length) return;
  if (alive.length === 0) {
    removed.push(rule.selector.replace(/\s+/g, " ").slice(0, 100));
    /* kural silinince yorumu da anlamsizlasiyorsa birakiyoruz;
       postcss yorumlari ayri dugum tutar, dokunmuyoruz. */
    rule.remove();
  } else {
    removed.push(`(kismi) ${selectors.filter((s) => selectorDead(s)).join(", ")}`);
    rule.selectors = alive;
  }
});

/* icinde kural kalmayan @media bloklarini da temizle */
root.walkAtRules((at) => {
  if (at.nodes && at.nodes.length === 0) { removed.push(`@${at.name} ${at.params} (bosaldi)`); at.remove(); }
});

const out = root.toString().replace(/\n{3,}/g, "\n\n");

/* --- dogrulama ---------------------------------------------------- */
const after = postcss.parse(out, { from: undefined });
const liveClassesAfter = new Set();
after.walkRules((rule) => {
  for (const m of rule.selector.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
    if (!dead(m[1])) liveClassesAfter.add(m[1]);
  }
});
const lost = [...liveClassesBefore].filter((c) => !liveClassesAfter.has(c));

console.log(`onceki : ${(css.length / 1024).toFixed(1)} KB`);
console.log(`sonraki: ${(out.length / 1024).toFixed(1)} KB`);
console.log(`silinen kural: ${removed.length}`);
console.log(`hala kullanilan sinif sayisi: ${liveClassesBefore.size} -> ${liveClassesAfter.size}`);
if (lost.length) {
  console.log(`\nDURDURULDU - kullanilan siniflarin kurallari kayboldu: ${lost.join(", ")}`);
  process.exit(1);
}
console.log("dogrulama: kullanilan hicbir sinifin kurali kaybolmadi");

if (apply) { fs.writeFileSync(CSS, out, "utf8"); console.log("\nyazildi."); }
else console.log("\n(kuru calisma - yazmak icin --apply)");
