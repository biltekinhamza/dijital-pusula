/* Her sayfayi jsdom icinde gercekten calistirir:
   - main.js hata firlatiyor mu
   - dinamik bloklar gercekten doluyor mu
   - TR ve EN'de ayni sekilde calisiyor mu                        */
const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const ROOT = "E:\\proje-bahcesi";
let fail = 0;
const bad = (m) => { console.log("  HATA  " + m); fail++; };

/* Her sayfada dolu olmasi beklenen kaplar */
const EXPECT = {
  "index.html": ["stat-grid", "product-grid", "why-grid", "service-teaser", "process-list", "faq-list"],
  "havalandirma-yazilimi.html": ["product-highlights", "module-grid", "integration-grid", "spec-list", "plan-grid", "comparison-body"],
  "soguk-hava-deposu-yazilimi.html": ["product-highlights", "module-grid", "integration-grid", "spec-list", "plan-grid", "comparison-body"],
  "ozel-yazilim.html": ["service-grid", "process-list", "tech-groups"],
  "gizlilik.html": ["legal-body"],
  "cerez-politikasi.html": ["legal-body"],
  "kullanim-sartlari.html": ["legal-body"]
};

async function run(file, lang) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on("jsdomError", (e) => errors.push(e.message));
  vc.on("error", (m) => errors.push(String(m)));

  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, file), "utf8"), {
    runScripts: "dangerously",
    resources: undefined,
    url: "https://biltekinhamza.github.io/proje-bahcesi/" + file,
    virtualConsole: vc,
    pretendToBeVisual: true
  });
  const { window } = dom;
  window.localStorage.setItem("proje-bahcesi-language", lang);
  // <script src> yuklenmiyor; elle enjekte et
  for (const js of ["js/translations.js", "js/main.js"]) {
    const el = window.document.createElement("script");
    el.textContent = fs.readFileSync(path.join(ROOT, js), "utf8");
    try { window.document.body.appendChild(el); }
    catch (e) { errors.push(`${js}: ${e.message}`); }
  }

  if (errors.length) errors.forEach((e) => bad(`${file} [${lang}] calisma hatasi: ${e.split("\n")[0]}`));

  for (const id of EXPECT[file] || []) {
    const node = window.document.getElementById(id);
    if (!node) { bad(`${file} [${lang}]: #${id} yok`); continue; }
    const text = node.textContent.replace(/\s+/g, " ").trim();
    if (text.length < 20) bad(`${file} [${lang}]: #${id} bos kaldi ("${text}")`);
  }

  // baslik gerekten dile gore degisiyor mu
  const title = window.document.title;
  if (lang === "en" && /Havalandırma|Soğuk|Özel Yazılım ve/.test(title) && file !== "gizlilik.html" && !file.startsWith("cerez") && !file.startsWith("kullanim")) {
    bad(`${file} [en]: baslik cevrilmemis -> ${title}`);
  }

  // urun sayfasinda urun adi dolu mu
  if (file.includes("yazilimi.html")) {
    const name = window.document.getElementById("product-name");
    const hero = window.document.getElementById("product-hero");
    if (!name || !name.textContent.trim()) bad(`${file} [${lang}]: urun adi bos`);
    if (!hero || hero.textContent.trim().length < 40) bad(`${file} [${lang}]: urun ozeti bos`);
  }

  const rows = (id) => (window.document.getElementById(id)?.children.length) || 0;
  const summary = (EXPECT[file] || []).map((id) => `${id}=${rows(id)}`).join(" ");
  console.log(`  ok    ${file.padEnd(34)} [${lang}]  ${summary}  "${title.slice(0, 40)}..."`);
  window.close();
}

(async () => {
  for (const file of Object.keys(EXPECT)) {
    for (const lang of ["tr", "en"]) await run(file, lang);
  }
  console.log(fail ? `\nSONUC: ${fail} hata` : "\nSONUC: butun sayfalar iki dilde de sorunsuz calisti");
  process.exit(fail ? 1 : 0);
})();
