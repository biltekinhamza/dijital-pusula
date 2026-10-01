"use strict";

/* home.js — ana sayfa icerigi. js/translations.js:home + pages.home'dan tasindi. */

module.exports = {
  "meta": {
    "title": "Dijital Pusula | Software for HVAC Manufacturers and Cold Storage",
    "description": "Quoting and cost software for ventilation manufacturers, and a 3D warehouse management system for fruit cold storage. Multi-tenant, cloud-based vertical software.",
    "og": "Ready-to-use vertical software: HVAC Pro Suite and the Cold Storage Management System."
  },
  "hero": {
    "title": "Ready-made software for ventilation manufacturers and cold storage operators.",
    "description": "Instead of bending a general-purpose ERP into the shape of your business, two products written for your business in the first place. Both run in the cloud, keep every company's data separate and need no installation. We're in two industries today, with more products built the same way already underway.",
    "primary": "Explore the Products",
    "secondary": "Request a Demo",
    "note": "No installation · Every company works on its own data · Browser access"
  },
  "map": {
    "kicker": "Dijital Pusula · Chart of Discovery",
    "title": "You're in the right place. Ready to become the captain of your business?",
    "lead": "Share your ideas with us, and we'll bring them together with technology for you.",
    "routesTitle": "Routes",
    "dirs": ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
    "dial": ["N", "E", "S", "W"],
    "compassLabel": "Spin the compass: pick a random route",
    "soundOn": "Route tunes on",
    "soundOff": "Route tunes off",
    "soundHint": "Every route has its own tune. Turn the sound on and hover over the cards, or spin the compass.",
    "scrollHint": "Down to the logbook",
    "soon": "Underway",
    "cards": {
      "demo": { "title": "Request a Demo", "desc": "See the product live on an example close to your business." },
      "pricing": { "title": "Packages", "desc": "Package contents are public; we quote the figure in a call." },
      "services": { "title": "Custom Software", "desc": "Integration, automation and applications built for you." },
      "newSectors": { "title": "The Blank Corner", "desc": "Products for new industries are underway. Yours could be here." },
      "faq": { "title": "Common Questions", "desc": "Installation, data safety, trial and support." },
      "process": { "title": "How We Start", "desc": "Four steps from demo request to live use." }
    }
  },
  "stats": {
    "title": "In numbers",
    "items": [
      {
        "value": "2",
        "label": "Products in production",
        "note": "Ventilation and cold storage"
      },
      {
        "value": "25",
        "label": "Ventilation part types",
        "note": "Sheet development and cost calculated"
      },
      {
        "value": "3D",
        "label": "Warehouse digital twin",
        "note": "Rooms modelled at real dimensions"
      },
      {
        "value": "{testCount}+",
        "label": "Automated tests",
        "note": "Across both products, run before every release"
      }
    ]
  },
  "products": {
    "kicker": "OUR PRODUCTS",
    "title": "Two industries, two products. Both born on a real shop floor.",
    "lead": "Each product grew out of one business's concrete problem — not from a generic template with an industry label stuck on it.",
    "cta": "View the Product",
    "badgeLive": "In production"
  },
  "why": {
    "kicker": "WHY THESE PRODUCTS",
    "title": "The upside of buying from a small team: you talk to the person who wrote it.",
    "lead": "You do not land in a large vendor's call centre. You speak to the person who writes the code, and an accepted change goes into the queue.",
    "items": [
      {
        "icon": "◧",
        "title": "Your data is yours",
        "text": "Every company's data is separated at the database level. Another company's prices, customers or quotes never appear on any screen, and that separation is continuously verified by automated tests."
      },
      {
        "icon": "⌁",
        "title": "Industry-specific maths",
        "text": "Sheet-metal development, waste allowance, stacking rules, storage billed on remaining kilograms. These are your trade's real rules, and general software does not have them."
      },
      {
        "icon": "◇",
        "title": "Tested code",
        "text": "In both products the calculation and authorisation logic is protected by automated tests. That a fix has not broken something else is verified by tests, not by hand."
      },
      {
        "icon": "▤",
        "title": "Your prices, your letterhead",
        "text": "Material prices, labour rates, profit margin and VAT rate are yours. The quote PDF carries your logo, your tax identity and your IBAN."
      },
      {
        "icon": "⇄",
        "title": "Connects to what you already run",
        "text": "On the ventilation side a quote goes to Paraşüt as a sales offer in one click; on the cold storage side every report exports to CSV, XLSX and PDF."
      },
      {
        "icon": "↻",
        "title": "Backup and rollback documented",
        "text": "Backup, restore and version rollback procedures are written down. An untested backup is not a backup."
      }
    ]
  },
  "servicesTeaser": {
    "kicker": "BEYOND THE PRODUCTS",
    "title": "If neither product is what you need.",
    "lead": "We also build custom software, system integrations and process automation for businesses. That is exactly how these products came about.",
    "cta": "See Custom Software",
    "items": [
      "Process automation",
      "System integration",
      "Web and mobile apps",
      "Reporting and dashboards",
      "Desktop applications",
      "Maintenance and support"
    ]
  },
  "process": {
    "kicker": "HOW WE START",
    "title": "Four steps from a demo request to production use.",
    "steps": [
      {
        "title": "Demo request",
        "text": "Fill in the form or write to us directly. Tell us the size of your business and how you work today."
      },
      {
        "title": "Live walkthrough",
        "text": "We show the product over a screen share, on data resembling yours. This is where the questions get asked."
      },
      {
        "title": "Trial account",
        "text": "An account is opened for your business. You enter your own materials, prices and rooms and run one real job end to end."
      },
      {
        "title": "Go live",
        "text": "If you decide to proceed, the account moves to the full version, your existing data is migrated and your users are set up."
      }
    ]
  },
  "faq": {
    "kicker": "FREQUENTLY ASKED QUESTIONS",
    "title": "What buyers ask before they decide.",
    "lead": "If your question is not here, write to us directly — technical questions are answered by the same person.",
    "link": "Send your question",
    "items": [
      {
        "q": "Do I need to install anything?",
        "a": "No. Both products run in the cloud; you open an address in your browser and use it. If you would rather run it on your own server, Docker images and setup documentation exist, and in that case we agree the installation and maintenance terms separately."
      },
      {
        "q": "Could my data get mixed up with another company's?",
        "a": "No. Every company's data is separated by its own identifier in the database, and queries enforce that separation. The isolation is verified by automated tests in every release, including an explicit test that one company's account cannot reach another company's records."
      },
      {
        "q": "Can I migrate my existing data?",
        "a": "Tabular data such as material lists, price lists, producer and product definitions can be migrated. Show us the file you have and we will scope the migration and its timing together."
      },
      {
        "q": "Is there a trial?",
        "a": "Yes. On the ventilation side a trial account runs for {trialDays} days with up to {trialUsers} users; on the cold storage side the demo account works with {demoRoomLimit} rooms per warehouse. You can work with your real data during the trial."
      },
      {
        "q": "Why are prices not listed on the site?",
        "a": "Plans vary with the size of the business, the number of users and whether data migration is needed. Plan contents are written out in full on the product pages; we give the figure in the call and follow up with a written quote."
      },
      {
        "q": "Can we run the software on our own server?",
        "a": "Yes, on the Enterprise plan. Both products are packaged with Docker and run on PostgreSQL. Who is responsible for the server, backups and updates is set out in the contract."
      },
      {
        "q": "How is support provided?",
        "a": "By email and phone. The person you reach is the person who writes the software; there is no layer in between. Bug reports are queued, and accepted feature requests go into the release plan."
      },
      {
        "q": "How does billing work?",
        "a": "Subscription renewal and invoicing are currently handled offline: written quote, contract and invoice. Online payment is not yet collected through this site."
      }
    ]
  }
};
