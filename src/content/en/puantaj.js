"use strict";

/* puantaj.js (EN) — Puantaj Pro Suite product page. Same key tree as tr/puantaj.js;
   figures come from facts.js. */

module.exports = {
  "meta": {
    "title": "Puantaj Pro Suite | Timesheet, Earned Pay and Payroll Calculation Software",
    "description": "Daily timesheets, automatic Sunday and public holiday overtime, salary and earned pay, bonus, advance and garnishment deductions, bank/cash payment lists, site tracking and staff documents. A multi-company platform for businesses with salaried staff and subcontracted workers.",
    "og": "From the timesheet to the payment list, on one platform. Puantaj Pro Suite for businesses that employ people."
  },
  "status": "live",
  "trial": { "mode": "request" },
  "code": "PNT",
  "name": "Puantaj Pro Suite",
  "subtitle": "Staff timesheets, earned pay and salary calculation",
  "tagline": "From the timesheet to the payment list, on one platform.",
  "hero": "A multi-company platform for businesses with salaried staff and subcontracted workers: it records the daily timesheet on a monthly grid or from the field by phone, turns Sunday and public holiday work into overtime by itself, and combines salary, earned pay, bonus, advance and garnishment in a single calculation.",
  "highlights": [
    "{attendanceCodes} attendance codes",
    "Automatic Sunday and holiday overtime",
    "Mobile timesheet by phone",
    "Daily site tracking",
    "Contracts and staff documents"
  ],
  "problem": "The timesheet is kept on a paper sheet or in Excel and added up line by line at the end of the month. The extra day's pay for someone who worked on a Sunday or a holiday is remembered by hand; when two holidays fall on the same day it is either forgotten or paid twice. Salaried staff and daily-wage subcontractors are calculated in separate tables, advances and garnishments are deducted somewhere else, and the answer to who worked at which site sits in yet another notebook.",
  "solution": "A monthly timesheet grid where each employee gets one code per day. Overtime is created by itself for anyone who works on a Sunday or a public holiday; salary, earned pay, bonus, advance and garnishment come together in one calculation, and the result becomes a bank and cash payment list. The field supervisor marks the day from a phone, and each day's site is recorded.",
  "benefit": "The month-end tally disappears, holiday overtime is neither forgotten nor paid twice, and the payment list comes straight from the timesheet. Who worked at which site on which day is available as a report.",
  "comparison": {
    "title": "How it differs from paper sheets and Excel",
    "lead": "This product's competitor is not other software. It is the sheet that gets added up at the end of every month. Here is exactly where they differ:",
    "before": "Paper sheet and Excel",
    "after": "With Puantaj Pro Suite",
    "rows": [
      {
        "k": "Daily timesheet",
        "before": "A paper sheet or a spreadsheet, added up row by row at month end.",
        "after": "One code per day on a monthly grid; total days are calculated automatically."
      },
      {
        "k": "Sundays and holidays",
        "before": "The extra day's pay is remembered by hand; when a Sunday and a holiday coincide it can be paid twice.",
        "after": "Marking 'Present' or 'Half Day' on a Sunday or public holiday opens the overtime record by itself; if both fall on the same day it is paid once."
      },
      {
        "k": "Salaried and daily-wage",
        "before": "Salaried staff and subcontractors in separate tables with separate formulas.",
        "after": "Company staff on a {monthlyBaseDays}-day basis of the monthly salary, subcontractors on their daily wage; calculated on the same screen."
      },
      {
        "k": "Deductions",
        "before": "Advances and garnishments are remembered from elsewhere and deducted by hand.",
        "after": "Bonus, advance and garnishment records feed the period calculation; the net amount payable comes out on one line."
      },
      {
        "k": "Payment",
        "before": "The amounts paid to the bank and in cash are worked out separately.",
        "after": "The bank/cash split is entered; the bank list is exported to Excel."
      },
      {
        "k": "Sites",
        "before": "Who worked where on which day lives in a separate notebook, or is not recorded at all.",
        "after": "Each day's site is saved together with the timesheet; a per-site report is available."
      },
      {
        "k": "Documents",
        "before": "Contracts and reports are filled in by hand from a blank template every time.",
        "after": "Fixed-term employment contract, resignation letter, absence report and pay envelope are filled from the employee record."
      }
    ]
  },
  "modules": [
    {
      "icon": "▤",
      "title": "Monthly timesheet grid",
      "text": "Employees in rows, days of the month in columns. Each day gets one of {attendanceCodes} codes: Present, Half Day, Paid Leave, Unpaid Leave, Absent. Sundays are highlighted; days outside the start and end date of employment cannot be edited."
    },
    {
      "icon": "▥",
      "title": "Mobile timesheet",
      "text": "The field supervisor marks the day from a phone browser: one tap on a card for Present, plus Unpaid Leave and Absent. 'Complete the day' records everyone not yet marked as Absent. A mobile-only user sees no other screen."
    },
    {
      "icon": "⌁",
      "title": "Automatic holiday overtime",
      "text": "When 'Present' or 'Half Day' is marked on a Sunday or public holiday, an overtime record is created by itself (at half rate for a half day), and it is updated or removed when the code changes. If a Sunday and a public holiday fall on the same day, one record is opened, not two. {fixedHolidays} fixed-date public holidays come built in."
    },
    {
      "icon": "◇",
      "title": "Salary and earned pay",
      "text": "For company staff the daily rate is the monthly salary on a {monthlyBaseDays}-day basis; for subcontractors it is the daily wage. Half-day rate, hourly overtime multiplier and daily working hours are the company's own settings."
    },
    {
      "icon": "⚖",
      "title": "Extra earnings and deductions",
      "text": "Hourly overtime is entered one by one or in bulk; bonus, advance and garnishment records are included in the period calculation. The salary/earned pay report shows the net amount payable for each employee on one line."
    },
    {
      "icon": "⇄",
      "title": "Bank and cash payment",
      "text": "For the period's net amount, the part paid to the bank is entered and the rest is calculated as cash. A bank list with name, national ID number and IBAN is exported to Excel."
    },
    {
      "icon": "◧",
      "title": "Site tracking",
      "text": "Sites are defined with a short code; each day in the timesheet gets its own site, which can be assigned in bulk to everyone on a day or to one employee for the whole month. The site report shows who worked where and for how many days. It does not affect any calculation."
    },
    {
      "icon": "✎",
      "title": "Staff documents",
      "text": "The fixed-term employment contract is produced as a PDF; the resignation letter, absence report and pay envelope are printable. All are filled from the employee record, with province, social security workplace number, probation period and pay day taken from company settings."
    }
  ],
  "integrations": [
    {
      "name": "Excel",
      "text": "Timesheet, salary/earned pay, bank/cash, site and staff lists export as .xlsx."
    },
    {
      "name": "PDF documents",
      "text": "The fixed-term employment contract is produced as a PDF with company and employee details."
    },
    {
      "name": "Mobile browser",
      "text": "No separate app for the field; the mobile timesheet runs in the phone's browser."
    },
    {
      "name": "PostgreSQL",
      "text": "PostgreSQL in production, SQLite in development. Packaged with Docker."
    }
  ],
  "specs": [
    {
      "k": "Server",
      "v": "Python 3, Django"
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
      "k": "Document output",
      "v": "PDF (WeasyPrint), Excel (.xlsx)"
    },
    {
      "k": "Mobile",
      "v": "Mobile timesheet screen for phone browsers"
    },
    {
      "k": "Access",
      "v": "Browser; no separate installation"
    },
    {
      "k": "Multi-company",
      "v": "Yes, data is separated per company"
    },
    {
      "k": "Interface language",
      "v": "Turkish"
    }
  ],
  "targetProfiles": [
    {
      "icon": "◧",
      "title": "Construction and contracting firm",
      "text": "For firms running crews on more than one site; who worked at which site on which day is recorded with the timesheet."
    },
    {
      "icon": "◇",
      "title": "Workshop and manufacturing",
      "text": "For businesses with both salaried staff and daily-wage workers; both are calculated on the same screen, each by its own rule."
    },
    {
      "icon": "▤",
      "title": "Business managing subcontracted crews",
      "text": "For businesses that mark their daily-wage crews from the field by phone; holiday overtime and the payment list come straight from the timesheet."
    }
  ],
  "faq": {
    "items": [
      {
        "q": "Can my data get mixed up with other companies?",
        "a": "No. Each company's data is separated in the database by its own identity, and queries enforce that separation. Every release is checked by automated tests that one company's records cannot be reached with another company's account."
      },
      {
        "q": "Does it produce official payroll and social security filings?",
        "a": "No. Puantaj Pro Suite calculates the timesheet, holiday overtime, earned pay and payment split. Official payroll, social security declarations and tax calculation are the job of your accountant or payroll software; the timesheet and payment reports can be handed over as Excel files."
      },
      {
        "q": "Can I import my existing staff list?",
        "a": "A staff list in table form can be imported. We look at your file and agree on the scope of the import together; it is not an automatic Excel import feature."
      },
      {
        "q": "How many users can I add?",
        "a": "Users are added by the company administrator. A field supervisor can get a user that only sees the mobile timesheet screen; salaries and company settings stay with the administrator."
      },
      {
        "q": "Are public holidays built in?",
        "a": "{fixedHolidays} fixed-date public holidays come built in. Holidays whose date changes every year, such as Ramadan and Sacrifice Feast, are added to the shared holiday list; a day that is not on the list does not create holiday overtime."
      },
      {
        "q": "Can I change overtime and pay rates?",
        "a": "Yes. Half-day rate, hourly overtime multiplier, daily working hours and Sunday/holiday overtime rates are your company's own settings and do not affect other companies."
      }
    ]
  }
};
