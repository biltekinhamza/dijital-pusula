"use strict";

/* common.js — sayfalar arasi paylasilan metin (marka, erisilebilirlik etiketleri,
   navigasyon, urun etiketleri, durum rozeti (state.*), birincil CTA (cta.*),
   altbilgi ve MADDE 5 alan basliklari). ETKI-ANALIZI js/translations.js en' den tasindi.
   state.* ve cta.* TASARIM-STANDARDI.md SS5.1/5.10'daki onayli etiketlerdir. */

module.exports = {
  "brand": {
    "name": "Dijital",
    "accent": "Pusula",
    "full": "Dijital Pusula",
    "tagline": "You’re in the right place.",
    "taglineSub": "The software for your industry is here."
  },
  "a11y": {
    "skip": "Skip to content",
    "openMenu": "Open menu",
    "navigation": "Main navigation",
    "language": "Language selection",
    "backToTop": "Back to top",
    "close": "Close",
    "next": "Go to next section",
    "products": "Products menu"
  },
  "nav": {
    "products": "Products",
    "hvac": "HVAC Software",
    "cold": "Cold Storage",
    "packages": "Plans",
    "services": "Custom Software",
    "about": "About",
    "contact": "Contact",
    "demo": "Request a Demo",
    "home": "Home"
  },
  "productLabels": {
    "problem": "How it works today",
    "solution": "What the product does",
    "modules": "Modules",
    "tech": "Technology",
    "benefit": "What changes",
    "specs": "Technical summary",
    "packages": "Plans",
    "screens": "Screens",
    "integrations": "Connections",
    "repo": "Source code on GitHub",
    "demoCta": "Request a demo of this product",
    "backHome": "All products",
    "live": "In production",
    "included": "Included",
    "excluded": "Not included",
    "representative": "Representative image",
    "featuredPlan": "Recommended"
  },
  "state": {
    "live": "In production",
    "earlyAccess": "Early access"
  },
  "cta": {
    "tryFree": "Start Free Trial",
    "requestTrial": "Request a Trial"
  },
  "footer": {
    "description": "Vertical software for ventilation manufacturers and fruit cold storage operators. Custom software and automation development.",
    "products": "Products",
    "company": "Company",
    "legal": "Legal",
    "contact": "Contact",
    "rights": "All rights reserved.",
    "privacy": "Privacy and KVKK",
    "cookies": "Cookie Policy",
    "terms": "Terms of Use"
  },
  "company": {
    "identityTitle": "Company details",
    "fields": {
      "legalName": "Trade name",
      "brandName": "Business name",
      "mersis": "MERSİS number",
      "taxNumber": "Tax identification number",
      "taxOffice": "Tax office",
      "address": "Head office address",
      "kep": "Registered electronic mail (KEP)",
      "email": "Email",
      "phone": "Phone",
      "chamber": "Professional chamber"
    }
  }
};
