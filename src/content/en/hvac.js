"use strict";

/* hvac.js — HVAC Pro Suite ürün sayfası içeriği.
   Paket/fiyat verisi ADR-4 gereği pricing.js'e taşındı, burada tekrarlanmaz. */

module.exports = {
  "meta": {
    "title": "HVAC Pro Suite | Ventilation Quoting and Cost Software",
    "description": "Sheet-metal development and cost calculation for {partTypes} part types, a self-service customer order page, branded PDF quotes and Paraşüt integration. A multi-tenant platform for ventilation manufacturers.",
    "og": "From sheet-metal development to the quote, on one platform. HVAC Pro Suite for ventilation manufacturers."
  },
  "status": "live",
  "trial": { "mode": "request" },
  "code": "HVAC",
  "name": "HVAC Pro Suite",
  "subtitle": "Ventilation quoting, costing and order management",
  "tagline": "From sheet-metal development to the quote, on one platform.",
  "hero": "A multi-tenant platform for ventilation manufacturers that calculates sheet development and cost for {partTypes} part types, lets the customer enter the dimensions themselves, and produces a branded PDF quote that can be pushed to Paraşüt.",
  "highlights": [
    "{partTypes} part types",
    "Login-free customer order page",
    "Branded PDF quotes",
    "Paraşüt export",
    "Android client"
  ],
  "problem": "Quotes are rebuilt in Excel every time. Sheet development, waste allowance, labour and margin change with whoever prepares the quote, so the same job can end up with two different prices. The customer describes the dimensions over the phone; when they are written down wrong, the manufacturing error comes back as cost. The quote PDF is formatted by hand, and the invoice is issued in a completely different program.",
  "solution": "A calculation engine that goes from a part's geometry to its sheet development, cut area, waste and weight, then through flange, gasket, bolts, insulation, paint and labour to the total cost. The customer enters their own dimensions on a company-specific address, the request lands in the dashboard, and the quote lines are adjusted and issued as a PDF on your letterhead.",
  "benefit": "Quote preparation gets faster, price inconsistency between quotes disappears, and responsibility for a wrong dimension becomes clear — the customer entered it themselves, and it is on record.",
  "comparison": {
    "title": "How it differs from running on Excel",
    "lead": "This product's competitor is not other software — it is the spreadsheets on the workshop desk. Here is exactly where they differ:",
    "before": "On Excel, by hand",
    "after": "With HVAC Pro Suite",
    "rows": [
      {
        "k": "Sheet development",
        "before": "A separate formula per part; it breaks as the file is copied, and nobody knows who added which allowance.",
        "after": "{partTypes} part types inside the product; seam, elbow gore and damper allowances are named constants, tested in every release."
      },
      {
        "k": "Price consistency",
        "before": "Whoever prepares the quote uses their own sheet, so the same job gets two different prices.",
        "after": "One material and labour list; the price comes out the same whoever prepares the quote."
      },
      {
        "k": "Taking dimensions",
        "before": "The customer describes them on the phone, someone writes them down, and the error surfaces in production.",
        "after": "The customer enters the dimensions themselves, guided by the part's photograph and markers, and it stays on record."
      },
      {
        "k": "Quote output",
        "before": "A document formatted by hand every time.",
        "after": "A branded PDF: logo, tax identity, IBAN, VAT rate and validity date come through automatically."
      },
      {
        "k": "Getting to the invoice",
        "before": "The quote lives in one place and the invoice in a different program; lines get retyped.",
        "after": "An approved quote goes to Paraşüt as a sales offer in one click, with lines in m² and metres."
      },
      {
        "k": "Finding past work",
        "before": "Version tracking by filename; finding last year's quote is a job in itself.",
        "after": "Every quote is stored, searchable by customer name and phone, and paginated."
      },
      {
        "k": "Permissions",
        "before": "Anyone who opens the file can change the cost and the margin.",
        "after": "Material cost and profit rate stay with managers; staff run the daily work."
      }
    ]
  },
  "modules": [
    {
      "icon": "⌁",
      "title": "Calculation engine",
      "text": "{partTypes} rectangular and round part types. For each part: sheet development (net area), cut area and waste, weight; then flange, gasket, bolts, insulation, paint and labour. Fabrication allowances such as seam width, elbow gore allowance and damper blade edge allowance are named constants inside the product, so they never quietly disappear from a quote."
    },
    {
      "icon": "▣",
      "title": "Dimension markers",
      "text": "On each part's photograph, lines show which dimension belongs where. The customer does not have to ask which one is dimension A, and the wrong figure does not land in the wrong field."
    },
    {
      "icon": "◧",
      "title": "Customer order page",
      "text": "An order screen that works without a login, on a company-specific address (/s/company-name). The customer picks a part, enters the dimensions, adds it to the basket and requests a quote. Pricing uses that company's own material prices and labour rates."
    },
    {
      "icon": "▤",
      "title": "Quote management",
      "text": "Incoming requests are listed in the dashboard; lines are added, removed and edited. Profit rate and shipping are set per quote. The quote is issued as a PDF with your logo, tax identity, IBAN and validity date."
    },
    {
      "icon": "◇",
      "title": "Materials and labour",
      "text": "Sheet thicknesses, material cost and availability, and labour rates are managed from the dashboard. A new company starts with a default material template and starting labour rates; you enter your own prices."
    },
    {
      "icon": "⚿",
      "title": "Users and roles",
      "text": "Owner, admin and staff roles. Staff run the daily work — quote lines, shipping, PDF, listings — while material cost, profit rate and company settings stay with managers."
    },
    {
      "icon": "⇄",
      "title": "Paraşüt integration",
      "text": "An approved quote is pushed to Paraşüt as a sales offer in one click, with lines carrying their real sales unit such as m² or metres. Each company enters its own Paraşüt credentials; a company that does not is never shown the option."
    },
    {
      "icon": "▥",
      "title": "Android client",
      "text": "A mobile API and Android app for taking dimensions and calculating on site. The device connects with an activation code."
    }
  ],
  "integrations": [
    {
      "name": "Paraşüt",
      "text": "Quote to sales-offer export. Each company connects its own account."
    },
    {
      "name": "PDF quote",
      "text": "Quote output on your letterhead, with logo, tax identity and IBAN."
    },
    {
      "name": "Android",
      "text": "Mobile client for field use, over the /api/v1 mobile interface."
    },
    {
      "name": "PostgreSQL",
      "text": "PostgreSQL in production, SQLite in development. A backup script ships with the product."
    }
  ],
  "specs": [
    {
      "k": "Server",
      "v": "Python 3, FastAPI"
    },
    {
      "k": "Database",
      "v": "PostgreSQL (production), SQLite (development)"
    },
    {
      "k": "Deployment",
      "v": "Docker / Docker Compose"
    },
    {
      "k": "Quote output",
      "v": "PDF (reportlab)"
    },
    {
      "k": "Mobile",
      "v": "Android client + REST mobile API"
    },
    {
      "k": "Access",
      "v": "Browser; no separate installation"
    },
    {
      "k": "Multi-tenant",
      "v": "Yes, data separated per company"
    },
    {
      "k": "Interface language",
      "v": "Turkish"
    }
  ],
  "targetProfiles": [
    {
      "icon": "⌁",
      "title": "Duct manufacturers",
      "text": "For workshops that make ventilation ducts and fittings; sheet development and cost come out of one engine."
    },
    {
      "icon": "◇",
      "title": "Sheet-metal workshops",
      "text": "For workshops pricing by cut and bend; fabrication allowances such as seam, elbow gore and damper edge stay as named constants."
    },
    {
      "icon": "▤",
      "title": "Contracting firms",
      "text": "For contracting firms that sub out ventilation work or run their own crew; quotes and orders sit in one dashboard."
    }
  ],
  "faq": {
    "items": [
      {
        "q": "Could my data get mixed up with another company's?",
        "a": "No. Every company's data is separated by its own identifier in the database; this isolation is verified by automated tests in every release."
      },
      {
        "q": "Can I migrate my existing material and price lists?",
        "a": "Tabular material and price lists can be migrated. Show us the file you have and we will scope the migration together; this is not an automatic Excel import feature."
      },
      {
        "q": "How many users can I add?",
        "a": "The trial account allows up to {trialUsers} users. On the Pro plan the number of users is not limited."
      },
      {
        "q": "Do my company details and logo appear on the quote?",
        "a": "Yes. The quote PDF carries your logo, your tax identity and your IBAN."
      },
      {
        "q": "What happens when the trial ends, is my data deleted?",
        "a": "Your account becomes inactive; your data is not deleted automatically. If you decide to continue, we move the account to the full version."
      },
      {
        "q": "The part type I use is not on the list, can it be added?",
        "a": "If you need something beyond the {partTypes} ready-made part types, we talk to you through our custom software line; that is a development request, not an automatic feature."
      }
    ]
  }
};
