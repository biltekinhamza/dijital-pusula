"use strict";

/* contact.js — iletişim sayfası içeriği. ADR-8 gereği zorunlu rıza kutusu metni
   (form.consent/consentLink) kaldırıldı; yerine kısa aydınlatma notu (notice) kondu. */

module.exports = {
  "meta": {
    "title": "Contact | Dijital Pusula",
    "description": "Contact channels and the demo/pricing request form.",
    "og": "Get in touch for a demo or a pricing request."
  },
  "kicker": "CONTACT",
  "title": "Seeing the product is the fastest route. Let's set up a demo.",
  "lead": "Briefly describe your business and how you work today. We will show you the product that fits over a screen share — and tell you if neither one does.",
  "email": "Email",
  "phone": "Phone",
  "whatsapp": "Message on WhatsApp",
  "address": "Address",
  "hours": "Working hours",
  "hoursValue": "Weekdays 09:00 - 18:00",
  "responseNote": "Requests are usually answered the same working day.",
  "form": {
    "title": "Demo and Pricing Request",
    "required": "* Required fields",
    "name": "Full name",
    "company": "Company",
    "email": "Email",
    "phone": "Phone",
    "interest": "Product of interest",
    "size": "Business size",
    "description": "Tell us briefly",
    "contactMethod": "Preferred contact method",
    "methodEmail": "Email",
    "methodPhone": "Phone",
    "submit": "Send Request",
    "select": "Select",
    "namePlaceholder": "Your full name",
    "companyPlaceholder": "Company name",
    "emailPlaceholder": "name@company.com",
    "phonePlaceholder": "+90 5xx xxx xx xx",
    "descriptionPlaceholder": "How many users, what you use today, which step takes the most time...",
    "interests": [
      "HVAC Pro Suite (ventilation)",
      "Cold Storage Management System",
      "Puantaj Pro Suite (staff timesheets)",
      "I would like to see more than one",
      "Custom software / automation",
      "Not sure yet"
    ],
    "sizes": [
      "1 - 5 users",
      "6 - 20 users",
      "21 - 50 users",
      "50+ users",
      "I don't know"
    ],
    "requiredError": "This field is required.",
    "invalidEmail": "Enter a valid email address.",
    "shortDescription": "Please enter a description of at least 20 characters.",
    "sending": "Sending...",
    "sent": "Your request has been received. We will get back to you shortly.",
    "failed": "Sending failed. Please write to us directly:",
    "preparing": "Preparing your email...",
    "mailFallback": "Your email application has opened. If it did not, write to us directly:",
    "mailSubject": "Demo / pricing request - Dijital Pusula",
    "note": "Your details are used only to answer your request and are not shared with third parties.",
    "mailLabels": {
      "name": "Full name",
      "company": "Company",
      "email": "Email",
      "phone": "Phone",
      "interest": "Product of interest",
      "size": "Business size",
      "description": "Description",
      "contactMethod": "Contact preference"
    }
  },
  "notice": {
    "text": "The details you send are used only to answer this request.",
    "link": "Read the privacy notice"
  }
};
