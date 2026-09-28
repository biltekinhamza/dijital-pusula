"use strict";

/* pricing.js — fiyatlandırma sayfası METİN içeriği (ADR-4). Sayısal/mod verisi
   (price.mode, updatedAt) dilden bağımsız src/content/pricing.js'tedir. */

module.exports = {
  "meta": {
    "title": "Pricing | Dijital Pusula",
    "description": "Plan contents, trial terms and billing information for HVAC Pro Suite and the Cold Storage Management System.",
    "og": "Plan contents and trial terms for both products, on one page."
  },
  "intro": {
    "title": "Pricing",
    "lead": "Plan contents are below; we confirm the figure in the call and send a written quote."
  },
  "hvac": {
    "note": "Plan contents are below; we confirm the figure in the call and send a written quote.",
    "plans": {
      "trial": {
        "name": "Trial",
        "priceNote": "Free",
        "summary": "To try the product with your own materials and prices.",
        "features": [
          "{trialDays}-day account",
          "Up to {trialUsers} users",
          "The full calculation engine",
          "Customer order page",
          "PDF quotes"
        ],
        "missing": [
          "Paraşüt integration",
          "Unlimited users"
        ],
        "cta": "Request a Trial"
      },
      "pro": {
        "name": "Pro",
        "priceNote": "Quoted",
        "summary": "One company, full scope. The right plan for most ventilation manufacturers.",
        "features": [
          "Unlimited users and roles",
          "Full calculation engine and all part types",
          "Login-free customer order page",
          "Branded PDF quotes (logo, tax identity, IBAN)",
          "Paraşüt integration",
          "Android client",
          "Material, labour and profit rate management",
          "Email and phone support"
        ],
        "missing": [],
        "cta": "Get a Quote"
      },
      "enterprise": {
        "name": "Enterprise",
        "priceNote": "Quoted",
        "summary": "For running it on your own server, custom development, or multi-branch use.",
        "features": [
          "Everything in Pro",
          "Installation on your own server (Docker)",
          "Custom development requests",
          "Data migration support",
          "Priority support",
          "Training session"
        ],
        "missing": [],
        "cta": "Request a Call"
      }
    }
  },
  "cold": {
    "note": "Plan contents are below; we confirm the figure in the call and send a written quote.",
    "plans": {
      "standard": {
        "name": "Standard",
        "priceNote": "Quoted",
        "summary": "For a single warehouse where basic depot operations are enough.",
        "features": [
          "3D layout and placement rules",
          "Intake, partial and full release",
          "Movement history and stock codes",
          "Storage billing (remaining kg × kg price)",
          "Stock and occupancy reports",
          "Role-based authorisation"
        ],
        "missing": [
          "Personnel and day-labour module",
          "Payment tracking"
        ],
        "cta": "Get a Quote"
      },
      "pro": {
        "name": "Pro",
        "priceNote": "Quoted",
        "summary": "For businesses tracking personnel and day labour, with more than one warehouse.",
        "features": [
          "Everything in Standard",
          "Multiple warehouses (each with its own price and ledger)",
          "Personnel records",
          "Day-labourer groups",
          "Payment tracking per group",
          "All reports (CSV / XLSX / PDF)",
          "Audit log",
          "Email and phone support"
        ],
        "missing": [],
        "cta": "Get a Quote"
      },
      "enterprise": {
        "name": "Enterprise",
        "priceNote": "Quoted",
        "summary": "For running it on your own server, custom development, or multi-branch use.",
        "features": [
          "Everything in Pro",
          "Access to modules added later",
          "Installation on your own server (Docker)",
          "Custom development requests",
          "Data migration support",
          "Priority support",
          "Training session"
        ],
        "missing": [],
        "cta": "Request a Call"
      }
    }
  }
};
