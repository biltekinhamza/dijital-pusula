"use strict";

/* contact.js — iletişim sayfası + form (TASARIM-STANDARDI.md S5.17/5.18,
   EKRANLAR.md "İletişim", ETKI-ANALIZI A6). Form mesajları (gönderiliyor/
   başarılı/başarısız/doğrulama) derlemede data-msg-* özniteliklerine
   basılır; istemciye (src/client/site.js) çeviri kataloğu gitmez (ETKI
   S4.2). Gizli bal küpü alanı yalnız config.form.mode "endpoint" iken
   eklenir (formMode() tek okuyucu, S4.4). "?urun=" önseçimi ve mailto
   gövdesi oluşturma saf mantığı src/client/site.js'te, DOM'a dokunmadan
   node --test ile sınanıyor. */

const { html, raw } = require("../../lib/html.js");
const { icon } = require("../partials/icon.js");
const { formMode } = require("../../lib/model.js");
const { noteBox } = require("../partials/ui.js");

function textField(ctx, { id, label, type, required, placeholder, autocomplete }) {
  return html`<div class="field">
    <label for="${id}">${label}${required ? html` <span class="required-mark" aria-hidden="true">*</span>` : raw("")}</label>
    <input
      type="${type}" id="${id}" name="${id}"
      placeholder="${placeholder}"
      ${required ? raw('required aria-required="true"') : raw("")}
      ${autocomplete ? html`autocomplete="${autocomplete}"` : raw("")}
      aria-describedby="${id}-error">
    <p class="field-error" id="${id}-error" role="alert"></p>
  </div>`;
}

function selectField(ctx, { id, label, options, placeholder }) {
  return html`<div class="field">
    <label for="${id}">${label}</label>
    <select id="${id}" name="${id}" aria-describedby="${id}-error">
      <option value="">${placeholder}</option>
      ${options.map((opt) => html`<option value="${opt}">${opt}</option>`)}
    </select>
    <p class="field-error" id="${id}-error" role="alert"></p>
  </div>`;
}

function contactChannels(ctx) {
  const c = ctx.content.contact;
  const company = ctx.company;
  const address = ctx.lang === "tr" ? company.addressTr : company.addressEn;
  return html`<div class="contact-channels">
    <div class="contact-channel">
      ${icon(ctx, "message-circle")}
      <div><span>${c.whatsapp}</span><a href="https://wa.me/${company.whatsapp}" target="_blank" rel="noopener">${company.phone}</a></div>
    </div>
    <div class="contact-channel">
      ${icon(ctx, "mail")}
      <div><span>${c.email}</span><a href="mailto:${company.email}">${company.email}</a></div>
    </div>
    <div class="contact-channel">
      ${icon(ctx, "phone")}
      <div><span>${c.phone}</span><a href="tel:${company.phoneHref}">${company.phone}</a></div>
    </div>
    ${address ? html`<div class="contact-channel">
      ${icon(ctx, "map-pin")}
      <div><span>${c.address}</span><strong>${address}</strong></div>
    </div>` : raw("")}
    <div class="contact-channel">
      ${icon(ctx, "clock")}
      <div><span>${c.hours}</span><strong>${c.hoursValue}</strong><span>${c.responseNote}</span></div>
    </div>
  </div>`;
}

function contactForm(ctx) {
  const f = ctx.content.contact.form;
  const mode = formMode(ctx.config);
  return html`<div class="contact-form-panel">
    <h2>${f.title}</h2>
    <p class="lead" style="font-size: var(--font-size-14)">${f.required}</p>
    <form
      id="contact-form"
      data-mode="${mode}"
      ${mode === "endpoint" ? html`data-endpoint="${ctx.config.form.provider.endpoint}" data-access-key="${ctx.config.form.provider.accessKey}"` : raw("")}
      data-mail-to="${ctx.company.email}"
      data-whatsapp-fallback="${ctx.company.whatsapp}"
      data-mail-subject="${f.mailSubject}"
      data-msg-sending="${f.sending}"
      data-msg-sent="${f.sent}"
      data-msg-failed="${f.failed}"
      data-msg-preparing="${f.preparing}"
      data-msg-mail-fallback="${f.mailFallback}"
      data-msg-required="${f.requiredError}"
      data-msg-invalid-email="${f.invalidEmail}"
      data-msg-short-description="${f.shortDescription}"
      data-product-hvac="${f.interests[0]}"
      data-product-cold="${f.interests[1]}"
      novalidate
    >
      <div class="form-grid">
        ${textField(ctx, { id: "name", label: f.name, type: "text", required: true, placeholder: f.namePlaceholder, autocomplete: "name" })}
        ${textField(ctx, { id: "company", label: f.company, type: "text", required: false, placeholder: f.companyPlaceholder, autocomplete: "organization" })}
        ${textField(ctx, { id: "email", label: f.email, type: "email", required: true, placeholder: f.emailPlaceholder, autocomplete: "email" })}
        ${textField(ctx, { id: "phone", label: f.phone, type: "tel", required: false, placeholder: f.phonePlaceholder, autocomplete: "tel" })}
        ${selectField(ctx, { id: "interest", label: f.interest, options: f.interests, placeholder: f.select })}
        ${selectField(ctx, { id: "size", label: f.size, options: f.sizes, placeholder: f.select })}
        <div class="field field-full">
          <label for="description">${f.description} <span class="required-mark" aria-hidden="true">*</span></label>
          <textarea id="description" name="description" placeholder="${f.descriptionPlaceholder}" required aria-required="true" aria-describedby="description-error"></textarea>
          <p class="field-error" id="description-error" role="alert"></p>
        </div>
        <fieldset class="field-radiogroup field-full">
          <legend>${f.contactMethod}</legend>
          <div class="options">
            <label><input type="radio" name="contactMethod" value="${f.methodEmail}" checked> ${f.methodEmail}</label>
            <label><input type="radio" name="contactMethod" value="${f.methodPhone}"> ${f.methodPhone}</label>
          </div>
        </fieldset>
        ${mode === "endpoint" ? html`<div class="field field-full field-honeypot" aria-hidden="true">
          <label for="website">Website</label>
          <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
        </div>` : raw("")}
      </div>
      <div class="form-submit-row">
        ${noteBox(ctx, html`${ctx.content.contact.notice.text} <a href="${ctx.url("legal-privacy")}">${ctx.content.contact.notice.link}</a>`, "info")}
        <button type="submit" class="btn btn-block">${f.submit}</button>
        <div class="form-status" id="contact-form-status" data-state="" role="status" aria-live="polite"></div>
      </div>
    </form>
  </div>`;
}

function contact(ctx) {
  const c = ctx.content.contact;
  return html`<article data-route="contact">
    <section class="hero">
      <div class="container">
        <p class="eyebrow">${icon(ctx, "compass-rose")} ${c.kicker}</p>
        <h1>${c.title}</h1>
        <p class="lead">${c.lead}</p>
      </div>
    </section>
    <section class="section-tight">
      <div class="container split split-45-55">
        <div>${contactChannels(ctx)}</div>
        <div>${contactForm(ctx)}</div>
      </div>
    </section>
  </article>`;
}

module.exports = { contact };
