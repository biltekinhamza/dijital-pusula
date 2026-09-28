"use strict";

/* legal-text.js — KVKK/gizlilik metninin config'e bağımlı bölümleri
   (ETKI-ANALIZI ADR-7, G6). "Config yalanı" riskine karşı (§7): form.mode
   ya da analytics değişince bu paragraflar YENİDEN DERLEMEDE kendiliğinden
   güncellenir, elle iki yerde tutulmaz. formMode()/analyticsMode() üzerinden
   aynı doğrulamayı (§4.4 tek okuyucu ilkesi) kullanır. */

const { formMode, analyticsMode } = require("./model.js");

function transferParagraph(config, lang) {
  const mode = formMode(config); // "endpoint" kipinde provider eksikse burada zaten hata fırlatır
  if (mode === "mailto") {
    return lang === "tr"
      ? "Form verileriniz yalnızca e-posta yoluyla iletilir; formu ileten bağımsız bir üçüncü taraf hizmet kullanılmaz, yurt dışına aktarım yapılmaz."
      : "Your form data is sent only by email; no independent third-party form service is used and no transfer takes place abroad.";
  }
  const { name, country } = config.form.provider;
  return lang === "tr"
    ? `Form verileriniz, formu ileten hizmet sağlayıcı ${name} (${country}) aracılığıyla iletilir; bu aktarım 6698 sayılı Kanun madde 9 kapsamında yurt dışına aktarım sayılır ve buna uygun bir dayanak (standart sözleşme ya da istisna) gerektirir.`
    : `Your form data is transferred through the form service provider ${name} (${country}); this counts as a transfer abroad under Article 9 of Law No. 6698 (KVKK) and requires an appropriate legal basis (standard contract or exemption).`;
}

function cookieParagraph(config, lang) {
  const mode = analyticsMode(config);
  if (mode === "none") {
    return lang === "tr"
      ? "Bu site çerez ya da tarayıcı yerel depolaması (localStorage) kullanmaz."
      : "This site does not use cookies or browser local storage.";
  }
  return lang === "tr"
    ? "Bu sitede yalnızca çerezsiz çalışan Cloudflare Web Analytics kullanılır; bireysel ziyaretçi izlenmez, kişisel veri toplanmaz. Çerez ya da tarayıcı yerel depolaması (localStorage) kullanılmaz."
    : "This site uses only cookie-free Cloudflare Web Analytics; individual visitors are not tracked and no personal data is collected. No cookies or browser local storage are used.";
}

function contactNotice(config, lang) {
  const mode = formMode(config);
  if (mode === "mailto") {
    return lang === "tr"
      ? "Gönderdiğiniz bilgiler yalnızca e-posta yoluyla, doğrudan bize iletilir."
      : "The details you send are delivered directly to us, only by email.";
  }
  const { name, country } = config.form.provider;
  return lang === "tr"
    ? `Gönderdiğiniz bilgiler ${name} (${country}) hizmet sağlayıcısı üzerinden iletilir.`
    : `The details you send are delivered through the ${name} (${country}) service provider.`;
}

function bindingNote(lang) {
  if (lang !== "en") return null;
  return "The binding text is the Turkish version of this page; this English text is provided for convenience only, pending legal review.";
}

module.exports = { transferParagraph, cookieParagraph, contactNotice, bindingNote };
