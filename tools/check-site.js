#!/usr/bin/env node
"use strict";

/* tools/check-site.js — 13 kuralın CLI'dan çalıştırılması (ETKI-ANALIZI §4.5).
   Saf kural fonksiyonları src/lib/checks.js'te (node --test ile sınanır);
   bu dosya yalnız onları gerçek proje verisiyle çağırıp özet basar.

   Kullanım:
     node tools/check-site.js            # uyarı kuralları (10/11/12) hata SAYILMAZ
     node tools/check-site.js --release  # 10/11 hataya döner; yayın öncesi zorunlu */

const path = require("node:path");
const checks = require("../src/lib/checks.js");
const build = require("./build.js");
const routes = require("../src/routes.js");
const siteConfig = require("../src/site.config.js");
const company = require("../src/company.js");
const pricing = require("../src/content/pricing.js");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "site");

function main() {
  const release = process.argv.includes("--release");
  const files = build.collectOutputFiles();

  const results = [
    checks.checkBuildMatches(OUT_DIR),
    checks.checkContentParity(),
    checks.checkHtmlStructure(files, siteConfig),
    checks.checkInternalLinks(files),
    checks.checkImages(files),
    checks.checkJsonLd(files, pricing),
    checks.checkSitemapAndRobots(files, siteConfig),
    checks.checkNoLeakedHosts(files),
    checks.checkForbiddenClaimsOnDisk(),
    checks.checkFactsSourced(require("../src/content/facts.js")),
    checks.checkCompanyMandatoryFields(company, { release }),
    checks.checkOriginPlaceholder(siteConfig, { release }),
    checks.checkPricingFreshness(pricing),
    checks.checkFormEndpointConfig(siteConfig)
  ];

  let hardFail = false;
  console.log(`check-site${release ? " --release" : ""}: ${files.size} dosya denetlendi\n`);
  for (const r of results) {
    const status = r.ok ? "OK  " : "FAIL";
    console.log(`[${status}] kural ${r.id} — denetlenen: ${r.count}${r.details.length ? `, bulgu: ${r.details.length}` : ""}`);
    if (!r.ok) {
      hardFail = true;
      r.details.slice(0, 20).forEach((d) => console.log(`         - ${d}`));
    } else if (r.details.length) {
      // ok:true ama detay var (uyarı seviyesi, release değil)
      r.details.slice(0, 20).forEach((d) => console.log(`         (uyarı) ${d}`));
    }
  }

  if (hardFail) {
    console.error("\ncheck-site: BAŞARISIZ — yukarıdaki kurallar hata verdi.");
    process.exitCode = 1;
    return;
  }
  console.log("\ncheck-site: tüm kurallar geçti.");
}

if (require.main === module) {
  main();
}

module.exports = { main };
