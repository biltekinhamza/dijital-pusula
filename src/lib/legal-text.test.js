"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { transferParagraph, cookieParagraph, contactNotice, bindingNote } = require("./legal-text.js");

const mailtoConfig = { form: { mode: "mailto", provider: {} }, analytics: "none" };
const endpointConfig = { form: { mode: "endpoint", provider: { name: "Web3Forms", country: "ABD" } }, analytics: "none" };

test("transferParagraph: mailto kipinde üçüncü taraf aktarımı olmadığını söyler", () => {
  const text = transferParagraph(mailtoConfig, "tr");
  assert.match(text, /e-posta/);
  assert.doesNotMatch(text, /Web3Forms/);
});

test("transferParagraph: endpoint kipinde sağlayıcı adı/ülkesi metne girer", () => {
  const text = transferParagraph(endpointConfig, "tr");
  assert.match(text, /Web3Forms/);
  assert.match(text, /ABD/);
});

test("transferParagraph: endpoint kipinde sağlayıcı eksikse hata fırlatır (kural 13 ile aynı doğrulama)", () => {
  const bad = { form: { mode: "endpoint", provider: {} } };
  assert.throws(() => transferParagraph(bad, "tr"));
});

test("G6 bitti ölçütü: form.mode mailto↔endpoint değişince YALNIZ aktarım paragrafı değişir, diğer bölümler aynı kalır", () => {
  const trMailto = transferParagraph(mailtoConfig, "tr");
  const trEndpoint = transferParagraph(endpointConfig, "tr");
  assert.notEqual(trMailto, trEndpoint);
  // cookieParagraph aynı config'te (analytics değişmedi) değişmemeli
  assert.equal(cookieParagraph(mailtoConfig, "tr"), cookieParagraph({ ...endpointConfig, analytics: "none" }, "tr"));
});

test("cookieParagraph: analytics none iken çerez/localStorage yok metni", () => {
  const text = cookieParagraph({ analytics: "none" }, "tr");
  assert.match(text, /çerez/i);
  assert.match(text, /kullanmaz/);
});

test("cookieParagraph: analytics cloudflare iken çerezsiz analitik açıklaması, ayrı paragraf", () => {
  const noneText = cookieParagraph({ analytics: "none" }, "tr");
  const cfText = cookieParagraph({ analytics: "cloudflare" }, "tr");
  assert.notEqual(noneText, cfText);
  assert.match(cfText, /Cloudflare/);
});

test("contactNotice: mailto ve endpoint kipinde farklı metin üretir", () => {
  const a = contactNotice(mailtoConfig, "tr");
  const b = contactNotice(endpointConfig, "tr");
  assert.notEqual(a, b);
});

test("bindingNote: yalnız EN'de bağlayıcılık notu döner, TR'de null", () => {
  assert.equal(bindingNote("tr"), null);
  assert.match(bindingNote("en"), /Turkish/);
});
