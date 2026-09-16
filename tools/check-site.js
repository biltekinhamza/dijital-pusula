/* Site butunluk denetimi:
   1) main.js sozdizimi
   2) TR/EN katalog anahtar esligi
   3) HTML icindeki data-i18n yollarinin iki dilde de cozulmesi
   4) Ic baglantilarin ve varlik dosyalarinin gercekten var olmasi   */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// Proje koku script konumundan turetilir; klasor adi degisirse bozulmaz.
const ROOT = path.resolve(__dirname, "..");
let fail = 0;
const bad = (msg) => { console.log("  HATA  " + msg); fail++; };
const ok = (msg) => console.log("  ok    " + msg);

/* --- 1) sozdizimi --------------------------------------------------- */
for (const f of ["js/translations.js", "js/main.js"]) {
  try {
    new vm.Script(fs.readFileSync(path.join(ROOT, f), "utf8"), { filename: f });
    ok(`${f} sozdizimi`);
  } catch (e) { bad(`${f}: ${e.message}`); }
}

/* --- 2) katalog ----------------------------------------------------- */
const sandbox = { window: {}, localStorage: null };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "js/translations.js"), "utf8"), sandbox);
const catalog = sandbox.window.SITE_CONTENT;
const company = sandbox.window.SITE_COMPANY;
if (!catalog || !catalog.tr || !catalog.en) { bad("SITE_CONTENT tr/en yok"); process.exit(1); }

function paths(obj, prefix = "") {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) out.push(...paths(v, p));
    else out.push(p);
  }
  return out;
}
const trKeys = new Set(paths(catalog.tr));
const enKeys = new Set(paths(catalog.en));
const onlyTr = [...trKeys].filter((k) => !enKeys.has(k));
const onlyEn = [...enKeys].filter((k) => !trKeys.has(k));
if (onlyTr.length) bad(`sadece TR'de olan anahtarlar: ${onlyTr.join(", ")}`);
if (onlyEn.length) bad(`sadece EN'de olan anahtarlar: ${onlyEn.join(", ")}`);
if (!onlyTr.length && !onlyEn.length) ok(`katalog esligi (${trKeys.size} anahtar)`);

/* dizi uzunluklari da esit olmali (kartlar tek tek eslesiyor) */
function arrays(obj, prefix = "") {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) out[p] = v.length;
    else if (v && typeof v === "object") Object.assign(out, arrays(v, p));
  }
  return out;
}
const at = arrays(catalog.tr), ae = arrays(catalog.en);
let arrMismatch = 0;
for (const k of Object.keys(at)) {
  if (ae[k] !== undefined && ae[k] !== at[k]) { bad(`dizi uzunlugu farkli: ${k} (tr=${at[k]}, en=${ae[k]})`); arrMismatch++; }
}
if (!arrMismatch) ok("dizi uzunluklari esit");

/* --- 3) HTML data-i18n ---------------------------------------------- */
const resolve = (lang, p) => p.split(".").reduce((v, k) => (v == null ? v : v[k]), catalog[lang]);
const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));
let missing = 0, checked = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(ROOT, file), "utf8");
  for (const m of html.matchAll(/data-i18n(?:-aria|-placeholder|-title)?="([^"]+)"/g)) {
    checked++;
    for (const lang of ["tr", "en"]) {
      const v = resolve(lang, m[1]);
      if (typeof v !== "string") { bad(`${file}: "${m[1]}" ${lang} icinde cozulmuyor (${typeof v})`); missing++; }
    }
  }
}
if (!missing) ok(`data-i18n yollari (${checked} kullanim, iki dilde de cozuluyor)`);

/* --- 4) baglantilar ve varliklar ------------------------------------ */
let broken = 0, links = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(ROOT, file), "utf8");
  const refs = [
    /* (?<![-\w]) : data-company-href="email" gibi baska bir oznitelige denk gelmesin */
    ...[...html.matchAll(/(?<![-\w])href="([^"#][^"]*?)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/(?<![-\w])src="([^"]+)"/g)].map((m) => m[1])
  ];
  for (let ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
    links++;
    let target = ref.split("#")[0];
    if (!target) continue;
    if (target.startsWith("/dijital-pusula/")) target = target.slice("/dijital-pusula/".length) || "index.html";
    if (target.endsWith("/")) target += "index.html";
    if (!fs.existsSync(path.join(ROOT, target))) { bad(`${file}: kirik baglanti -> ${ref}`); broken++; }
  }
}
if (!broken) ok(`ic baglantilar (${links} adet, hepsi mevcut)`);

/* --- 5) main.js'in aradigi id'ler ------------------------------------ */
const main = fs.readFileSync(path.join(ROOT, "js/main.js"), "utf8");
const wanted = [...new Set([...main.matchAll(/[$]\("#([a-z-]+)"/g)].map((m) => m[1]))];
const allHtml = htmlFiles.map((f) => fs.readFileSync(path.join(ROOT, f), "utf8")).join("\n");
const orphan = wanted.filter((id) => !allHtml.includes(`id="${id}"`));
if (orphan.length) console.log(`  not   main.js su id'leri ariyor ama hicbir sayfada yok: ${orphan.join(", ")}`);
else ok("main.js'in aradigi butun id'ler en az bir sayfada var");

/* --- 6) yer tutucu uyarisi ------------------------------------------ */
const placeholders = [];
if (/ornek@|example/.test(company.email)) placeholders.push("email");
if (company.phone.includes("_")) placeholders.push("phone");
if (!company.kep) placeholders.push("kep (yonetmelik md.5 zorunlu)");
if (!company.taxNumber && !company.mersis) placeholders.push("taxNumber/mersis (yonetmelik md.5 zorunlu)");
if (/eklenecek|to be added/.test(company.addressTr)) placeholders.push("adres");
console.log(`\n  YAYIN ONCESI DOLDURULACAK (SITE_COMPANY): ${placeholders.join(", ") || "yok"}`);

console.log(fail ? `\nSONUC: ${fail} hata` : "\nSONUC: temiz");
process.exit(fail ? 1 : 0);
