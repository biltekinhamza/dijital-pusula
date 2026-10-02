"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { bundleStyles, bundleClientJs, CSS_COMPONENT_ORDER } = require("./assets-bundle.js");

function makeStylesFixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "dp-styles-"));
  fs.mkdirSync(path.join(dir, "components"));
  fs.writeFileSync(path.join(dir, "tokens.css"), "/* tokens */\n:root{--a:1}\n");
  fs.writeFileSync(path.join(dir, "base.css"), "/* base */\nbody{margin:0}\n");
  fs.writeFileSync(path.join(dir, "layout.css"), "/* layout */\n.container{}\n");
  for (const name of CSS_COMPONENT_ORDER) {
    fs.writeFileSync(path.join(dir, "components", `${name}.css`), `/* ${name} */\n.${name}{}\n`);
  }
  return dir;
}

test("bundleStyles: tokens, base, layout sonra bileşenler SABİT sırayla birleşir", () => {
  const dir = makeStylesFixture();
  try {
    const css = bundleStyles(dir);
    const tokensIdx = css.indexOf("/* tokens */");
    const baseIdx = css.indexOf("/* base */");
    const layoutIdx = css.indexOf("/* layout */");
    assert.ok(tokensIdx >= 0 && tokensIdx < baseIdx && baseIdx < layoutIdx);
    let lastIdx = layoutIdx;
    for (const name of CSS_COMPONENT_ORDER) {
      const idx = css.indexOf(`/* ${name} */`);
      assert.ok(idx > lastIdx, `${name} beklenen sırada değil`);
      lastIdx = idx;
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("bundleStyles: eksik bir bileşen dosyasında hata fırlatır (sessizce atlamaz)", () => {
  const dir = makeStylesFixture();
  try {
    fs.rmSync(path.join(dir, "components", "misc.css"));
    assert.throws(() => bundleStyles(dir), /misc\.css/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("bundleStyles: belirlenimci — iki çağrı aynı bayt dizisini üretir", () => {
  const dir = makeStylesFixture();
  try {
    assert.equal(bundleStyles(dir), bundleStyles(dir));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("bundleClientJs: src/client/site.js içeriğini döner", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "dp-client-"));
  try {
    fs.writeFileSync(path.join(dir, "site.js"), "console.log('x');\n");
    const js = bundleClientJs(dir);
    assert.match(js, /console\.log\('x'\)/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("CRLF kaydedilmiş girdiler paketi bozmaz — site.css/site.js her koşulda LF (check-site kural 1 regresyonu)", () => {
  const crlfDir = makeStylesFixture();
  const lfDir = makeStylesFixture();
  const clientDir = fs.mkdtempSync(path.join(os.tmpdir(), "dp-client-"));
  try {
    fs.writeFileSync(path.join(crlfDir, "tokens.css"), "/* tokens */\r\n:root{--a:1}\r\n");
    fs.writeFileSync(path.join(crlfDir, "components", "misc.css"), "/* misc */\r\n.misc{}\r\n");
    fs.writeFileSync(path.join(clientDir, "site.js"), "console.log('x');\r\n");

    const crlfCss = bundleStyles(crlfDir);
    assert.ok(!crlfCss.includes("\r"), "site.css CRLF satır sonu içermemeli");
    /* ?v= hash'i paketin ham baytından üretiliyor; CRLF girdi, commit'lenen
       LF asset'e uymayan bir hash demek. Aynı içerik LF ve CRLF kaynakla
       bayt bayt aynı paketi üretmeli. */
    assert.equal(crlfCss, bundleStyles(lfDir));

    const js = bundleClientJs(clientDir);
    assert.ok(!js.includes("\r"), "site.js CRLF satır sonu içermemeli");
  } finally {
    fs.rmSync(crlfDir, { recursive: true, force: true });
    fs.rmSync(lfDir, { recursive: true, force: true });
    fs.rmSync(clientDir, { recursive: true, force: true });
  }
});

test("gerçek proje: src/styles ve src/client üzerinde hatasız birleşir, boş değil", () => {
  const stylesDir = path.join(__dirname, "..", "styles");
  const clientDir = path.join(__dirname, "..", "client");
  const css = bundleStyles(stylesDir);
  const js = bundleClientJs(clientDir);
  assert.ok(css.length > 1000, "gerçek CSS paketi beklenenden küçük");
  assert.ok(js.length > 50, "gerçek JS paketi beklenenden küçük");
});
