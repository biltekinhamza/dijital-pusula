"use strict";

/* hosting.js — barındırma dosyaları (ETKI-ANALIZI §4.6, G4).
   sitemap.xml / robots.txt / _redirects / _headers yalnız açık rotalardan
   (routes.enabledRoutes()) ve site.config.js'ten üretilir; alan adı tek
   yerde (config.origin). */

function originOf(config) {
  return config.origin.replace(/\/+$/, "");
}

function buildSitemap(allRoutes, config) {
  const origin = originOf(config);
  const routes = allRoutes.filter((r) => r.enabled !== false);
  const urls = [];
  for (const route of routes) {
    for (const lang of ["tr", "en"]) {
      const loc = origin + route.path[lang];
      const alternates = ["tr", "en"]
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${origin + route.path[l]}" />`)
        .join("\n");
      urls.push(`  <url>\n    <loc>${loc}</loc>\n${alternates}\n  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

function buildRobots(config) {
  const origin = originOf(config);
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
}

function buildRedirects(allRoutes) {
  const routes = allRoutes.filter((r) => r.enabled !== false);
  const lines = [];
  for (const route of routes) {
    for (const legacy of route.legacy || []) {
      lines.push(`${legacy}  ${route.path.tr}  301`);
    }
  }
  return lines.join("\n") + (lines.length ? "\n" : "");
}

function buildHeaders() {
  return [
    "/*",
    "  X-Content-Type-Options: nosniff",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "  Permissions-Policy: camera=(), microphone=(), geolocation=()",
    "  X-Frame-Options: DENY",
    ""
  ].join("\n");
}

module.exports = { buildSitemap, buildRobots, buildRedirects, buildHeaders };
