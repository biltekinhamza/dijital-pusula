"use strict";

/* format.js — para ve tarih biçimleme. Para: tamsayı TL, float yok
   (dersler/gelistirici: "Para Decimal, float değil"; burada JS ortamında
   karşılığı tamsayı kuruş içermeyen TL + Intl.NumberFormat("tr-TR")). */

function formatTRY(amount) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    throw new Error(`formatTRY: sayı bekleniyor, alınan: ${amount}`);
  }
  if (!Number.isInteger(amount)) {
    throw new Error(`formatTRY: tamsayı TL bekleniyor (float değil), alınan: ${amount}`);
  }
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(amount);
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function formatDate(isoDate, lang) {
  if (typeof isoDate !== "string" || !ISO_DATE.test(isoDate)) {
    throw new Error(`formatDate: ISO tarih bekleniyor (YYYY-MM-DD), alınan: ${isoDate}`);
  }
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (Number.isNaN(date.getTime()) || date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) {
    throw new Error(`formatDate: geçersiz tarih: ${isoDate}`);
  }
  const locale = lang === "en" ? "en-GB" : "tr-TR";
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(date);
}

module.exports = { formatTRY, formatDate };
