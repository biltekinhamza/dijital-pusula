"use strict";

/* cold.js — Soğuk Hava Deposu ürün sayfası içeriği.
   Paket/fiyat verisi ADR-4 gereği pricing.js'e taşındı, burada tekrarlanmaz. */

module.exports = {
  "meta": {
    "title": "Cold Storage Management System | 3D Warehouse Layout and Stock",
    "description": "A 3D digital twin of your cold store: drag-and-drop pallet placement, collision and stacking rules, storage billing on remaining kilograms, multi-warehouse support and reports.",
    "og": "A 3D digital twin of your cold store. Layout, stock and storage billing for fruit cold storage."
  },
  "status": "live",
  "trial": { "mode": "request" },
  "code": "SHD",
  "name": "Cold Storage Management System",
  "subtitle": "3D warehouse layout, stock and storage billing",
  "tagline": "A 3D digital twin of your cold store.",
  "hero": "A warehouse management system for fruit cold storage that models rooms at their real dimensions, places pallets by drag and drop, and validates collision, stacking and aisle rules on the server.",
  "highlights": [
    "3D room model",
    "Drag-and-drop layout",
    "Billing on remaining kg",
    "Multiple warehouses",
    "CSV / XLSX / PDF reports"
  ],
  "problem": "What is in which room, whose pallet is whose, and how full a room is. The answers live in a ledger, a spreadsheet and the warehouse manager's head. Where a pallet goes is decided on the floor; an aisle gets blocked, a stack ends up unbalanced, and things have to be moved again later. At the end of the season the storage charge is worked out by hand from the remaining kilograms, and a price change corrupts the history.",
  "solution": "A 3D layout screen where rooms are modelled in metres and every pallet and Palsan unit stands in the room as its own icon. Before a unit is placed, the rules are validated on the server: it does not overlap another unit, does not block the aisle band, and the stack is balanced. Storage is always billed as remaining kilograms at the price recorded on entry; a later price change never rewrites past records.",
  "benefit": "Occupancy and the location of goods are visible on screen, a placement mistake is caught on the screen rather than on the floor, and the storage charge rests on a record nobody has to argue about.",
  "comparison": {
    "title": "How it differs from a ledger and a spreadsheet",
    "lead": "This product's competitor is not other software — it is the warehouse ledger, a spreadsheet, and the manager's memory. Here is exactly where they differ:",
    "before": "Ledger and spreadsheet",
    "after": "With this system",
    "rows": [
      {
        "k": "What is in the room",
        "before": "Intake and release go into a ledger; where each pallet stands lives in the manager's head.",
        "after": "The room is modelled at real dimensions; every pallet and Palsan unit stands in its own place."
      },
      {
        "k": "Placement decisions",
        "before": "Made on the floor. An aisle gets blocked, a stack ends up unbalanced, things get moved again.",
        "after": "Rules are validated on the server before placement and shown on screen as a green or red ghost."
      },
      {
        "k": "Storage charge",
        "before": "Remaining kilograms are worked out by hand at the end of the season, and the figure is open to argument.",
        "after": "Remaining kg × the price fixed at intake. The figure is on screen at any moment and rests on a record."
      },
      {
        "k": "Price changes",
        "before": "Entering a new price shifts the old calculations too.",
        "after": "The price is fixed to the record on intake; a later change never rewrites past records."
      },
      {
        "k": "Multiple warehouses",
        "before": "A separate file per warehouse, and it gets unclear whose price is whose.",
        "after": "Each warehouse has its own kg price and ledger; the owner sees all of them from one login."
      },
      {
        "k": "Reports",
        "before": "Anything going to accounting is compiled by hand.",
        "after": "Stock, occupancy, intake, release, producer and payment reports export to CSV, XLSX and PDF."
      },
      {
        "k": "Traceability",
        "before": "Who changed a record, and when, is not recorded.",
        "after": "The movement history is never deleted, and who changed what is kept in the audit log."
      }
    ]
  },
  "modules": [
    {
      "icon": "◫",
      "title": "3D layout",
      "text": "Rooms modelled in metres. Drag-and-drop placement, 90-degree rotation, stacking, moving within a room and transfer between rooms. Every container stands in the room as its own icon: an intake of 20 Palsan units appears as 20 separate units."
    },
    {
      "icon": "◈",
      "title": "Placement rules",
      "text": "Collision, aisle band and stack support rules are validated server-side and shown on screen as a green or red ghost. A stack is rejected if the upper unit overlaps the one below by less than {stackOverlapMinPercent}%. Aisle width is a parameter you set on screen, not a constant in the code."
    },
    {
      "icon": "▤",
      "title": "Stock and movements",
      "text": "Intake by producer, fruit, variety and container; partial and full release; automatic stock codes and a movement history that is never deleted. A pallet is a stack of fruit crates: the crate count per pallet is recorded on intake, release can be by crate, and a pallet losing crates keeps its place in the room until the last crate leaves."
    },
    {
      "icon": "₺",
      "title": "Storage billing",
      "text": "The charge is always remaining kg × the standard kg price; it does not depend on the number of days. The price is fixed to the record on intake, and later price changes never rewrite past records. Every warehouse has its own kg price and its own ledger."
    },
    {
      "icon": "◧",
      "title": "Multiple warehouses and businesses",
      "text": "One account represents exactly one warehouse; the business owner sees all of theirs from a single login. Each warehouse is separate, with its own price, ledger and reports. Different businesses never see each other's data on any screen."
    },
    {
      "icon": "⚿",
      "title": "Personnel and day labour",
      "text": "Personnel records, day-labourer groups and payment tracking per group. Available on the Pro and Enterprise plans."
    },
    {
      "icon": "▥",
      "title": "Reports",
      "text": "Dashboard indicators plus stock, occupancy, intake, release, producer and payment reports. All of them export to CSV, XLSX and PDF."
    },
    {
      "icon": "↻",
      "title": "System and security",
      "text": "Role-based authorisation, an audit log that is never deleted, one-click backup from the interface and parameter management. Passwords, tokens and personal data are never written to the log."
    }
  ],
  "integrations": [
    {
      "name": "CSV / XLSX / PDF",
      "text": "Every report exports in three formats; nothing going to accounting is prepared by hand."
    },
    {
      "name": "REST API",
      "text": "Documented /api/v1 endpoints with an OpenAPI 3 schema and Swagger and ReDoc interfaces."
    },
    {
      "name": "PostgreSQL",
      "text": "PostgreSQL in production. Backups are taken from inside the application and the restore procedure is documented."
    },
    {
      "name": "Docker",
      "text": "API and interface in a single container. The deploy script rolls back to the previous image if the health check fails."
    }
  ],
  "specs": [
    {
      "k": "Server",
      "v": "Python 3.12, FastAPI, SQLAlchemy 2.0"
    },
    {
      "k": "Interface",
      "v": "React 18, TypeScript, React Three Fiber (Three.js)"
    },
    {
      "k": "Database",
      "v": "PostgreSQL 14+ (production), SQLite (development)"
    },
    {
      "k": "Deployment",
      "v": "Docker / Docker Compose, Alembic migrations"
    },
    {
      "k": "Browser",
      "v": "A current browser with WebGL 2 (for the 3D view)"
    },
    {
      "k": "Tests",
      "v": "{backendTestCount} server + {frontendTestCount} interface tests, also verified with end-to-end smoke tests"
    },
    {
      "k": "Multi-tenant",
      "v": "Yes, data separated per business"
    },
    {
      "k": "Interface language",
      "v": "Turkish"
    }
  ],
  "targetProfiles": [
    {
      "icon": "◧",
      "title": "Warehouse owner / operator",
      "text": "For owners running more than one warehouse, or growing a single one; every warehouse is visible from one login."
    },
    {
      "icon": "◫",
      "title": "Warehouse manager",
      "text": "For managers running the daily layout and intake/release on the floor; placement rules are validated on screen instantly."
    },
    {
      "icon": "▤",
      "title": "Accounting / finance",
      "text": "For the accounting side tracking storage charges and reports; stock, occupancy and payment reports export to CSV/XLSX/PDF."
    }
  ],
  "faq": {
    "items": [
      {
        "q": "Could my data get mixed up with another business's?",
        "a": "No. Every business's data is separated by its own identifier in the database; different businesses never see each other's data on any screen."
      },
      {
        "q": "How many rooms can I open on the trial account?",
        "a": "A warehouse with no live licence (a demo) may open up to {demoRoomLimit} rooms. That limit is lifted once a licence is in place."
      },
      {
        "q": "If I change the price, are past records affected?",
        "a": "No. The storage charge is fixed to the record on stock intake; a later price change never rewrites past records."
      },
      {
        "q": "Which plan includes personnel and day-labour tracking?",
        "a": "Personnel records, day-labourer groups and payment tracking per group are available on the Pro and Enterprise plans."
      },
      {
        "q": "What formats can I get reports in?",
        "a": "Stock, occupancy, intake, release, producer and payment reports all export to CSV, XLSX and PDF."
      },
      {
        "q": "Can I see who changed what?",
        "a": "Yes. The movement history is never deleted, and who changed what and when is kept in the audit log."
      }
    ]
  }
};
