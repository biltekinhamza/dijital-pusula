"use strict";
/* site.js — tarayıcı betiği (TASARIM-STANDARDI.md S "Bileşenler" giriş
   cümlesi: "Tümü JS kapalıyken tam görünür olmalı"; JS yalnız mobil menü/
   ürün açılır menüsü zenginleştirmesi, aylık-yıllık seçici ve form
   doğrulama+gönderimi için kullanılır — ETKI-ANALIZI A6).

   Bu dosya HEM düz bir <script defer> olarak tarayıcıda çalışır HEM DE
   `require()` ile Node testinden (node:test) doğrudan içe aktarılabilir:
   saf mantık (DOM'a dokunmayan) fonksiyonlar dosyanın üstünde tanımlanır
   ve en altta `module` varsa dışa aktarılır; DOM'a bağlı kurulum kodu
   yalnız `document` gerçekten varken çalışır. Derleme adımı yok (ADR-1),
   bu yüzden ES modülü değil, klasik script + UMD-benzeri dışa aktarım. */

/* ---------------------------------------------------------------------
 * SAF MANTIK — node:test ile sınanır (src/client/site.test.js)
 * ------------------------------------------------------------------- */

/* parseQueryParam: window.location.search'e dokunmadan, verilen bir
   sorgu dizesinden (örn. "?urun=hvac") bir anahtarın değerini okur. */
function parseQueryParam(search, key) {
  const qs = String(search || "").replace(/^\?/, "");
  if (!qs) return null;
  for (const pair of qs.split("&")) {
    if (!pair) continue;
    const eq = pair.indexOf("=");
    const rawKey = eq === -1 ? pair : pair.slice(0, eq);
    const rawVal = eq === -1 ? "" : pair.slice(eq + 1);
    if (decodeURIComponent(rawKey) === key) {
      return decodeURIComponent(rawVal.replace(/\+/g, " "));
    }
  }
  return null;
}

/* resolveProductPreselect: "?urun=hvac" / "?urun=soguk-hava" (ve birkaç
   makul eşanlamlı) değerini, formun <select id="interest"> seçeneğinde
   zaten var olan (derlemede content'ten basılan) tam metinle eşler.
   options = { hvac: "<hvac select metni>", cold: "<cold select metni>" }
   (bkz. contact.js şablonu data-product-hvac/data-product-cold). */
function resolveProductPreselect(urun, options) {
  if (!urun) return null;
  const key = String(urun).toLowerCase();
  if (key === "hvac") return options.hvac || null;
  if (key === "cold" || key === "soguk-hava" || key === "soguk_hava_deposu" || key === "shd") {
    return options.cold || null;
  }
  return null;
}

/* validateContactForm: EKRANLAR.md "İletişim" dört durum + TASARIM-STANDARDI
   S5.18 kuralları. values: { name, email, phone, description, ... }.
   messages: { required, invalidEmail, shortDescription } (data-msg-*'ten). */
function validateContactForm(values, messages) {
  const errors = {};
  const name = String(values.name || "").trim();
  const email = String(values.email || "").trim();
  const description = String(values.description || "").trim();

  if (!name) errors.name = messages.required;
  if (!email) {
    errors.email = messages.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = messages.invalidEmail;
  }
  if (!description) {
    errors.description = messages.required;
  } else if (description.length < 20) {
    errors.description = messages.shortDescription;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/* buildMailtoUrl: ADR-7 "mailto" kipi. fields = [{ label, value }] (yalnız
   dolu alanlar çağıran tarafça filtrelenir). Satırlar "Etiket: değer"
   biçiminde, mailto gövdesi RFC 2368 gereği CRLF + encodeURIComponent. */
function buildMailtoBody(fields) {
  return fields
    .filter((f) => f.value != null && String(f.value).trim() !== "")
    .map((f) => `${f.label}: ${f.value}`)
    .join("\r\n");
}

function buildMailtoUrl(to, subject, fields) {
  const body = buildMailtoBody(fields);
  const params = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return `mailto:${to}?${params}`;
}

/* ---------------------------------------------------------------------
 * DOM KURULUMU — yalnız tarayıcıda çalışır
 * ------------------------------------------------------------------- */

if (typeof document !== "undefined") {
  (function initSiteBehaviour() {
    /* --- Header: kaydırmada saydamdan yüzeye geçiş --- */
    var header = document.querySelector("[data-scroll-surface]");
    if (header) {
      var applyScrollState = function () {
        if (window.scrollY > 4) header.classList.add("site-header--scrolled");
        else header.classList.remove("site-header--scrolled");
      };
      applyScrollState();
      window.addEventListener("scroll", applyScrollState, { passive: true });
    }

    /* --- <details> tabanlı açılır menüler: Esc ile kapat, tetikleyiciye
       odağı geri ver, dışına tıklayınca kapat. Temel açma/kapama zaten
       tarayıcı yerlisi (JS'siz de çalışır); burası yalnız zenginleştirme. --- */
    var disclosures = document.querySelectorAll("details.nav-products, details.mobile-menu");
    disclosures.forEach(function (details) {
      var summary = details.querySelector("summary");
      details.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && details.open) {
          details.open = false;
          if (summary) summary.focus();
        }
      });
      document.addEventListener("click", function (event) {
        if (details.open && !details.contains(event.target)) {
          details.open = false;
        }
      });
    });

    /* Ürün açılır menüsünde ok tuşlarıyla satırlar arası gezinme
       (TASARIM-STANDARDI.md S5.1). */
    var productsMenu = document.querySelector("details.nav-products");
    if (productsMenu) {
      var panel = productsMenu.querySelector(".nav-products-panel");
      var summaryEl = productsMenu.querySelector("summary");
      if (summaryEl) {
        summaryEl.addEventListener("keydown", function (event) {
          if (event.key === "ArrowDown" && panel) {
            var first = panel.querySelector("a");
            if (first) { productsMenu.open = true; first.focus(); event.preventDefault(); }
          }
        });
      }
      if (panel) {
        panel.addEventListener("keydown", function (event) {
          var links = Array.prototype.slice.call(panel.querySelectorAll("a"));
          var index = links.indexOf(document.activeElement);
          if (event.key === "ArrowDown" && index > -1) {
            event.preventDefault();
            links[(index + 1) % links.length].focus();
          } else if (event.key === "ArrowUp" && index > -1) {
            event.preventDefault();
            links[(index - 1 + links.length) % links.length].focus();
          }
        });
      }
    }

    /* --- "?urun=" önseçimi (iletişim formu) --- */
    var interestSelect = document.getElementById("interest");
    var contactForm = document.getElementById("contact-form");
    if (interestSelect && contactForm) {
      var urun = parseQueryParam(window.location.search, "urun");
      var preselect = resolveProductPreselect(urun, {
        hvac: contactForm.getAttribute("data-product-hvac"),
        cold: contactForm.getAttribute("data-product-cold")
      });
      if (preselect) interestSelect.value = preselect;
    }

    /* --- İletişim formu: doğrulama + gönderim (dört durum) --- */
    if (contactForm) {
      var statusEl = document.getElementById("contact-form-status");
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var messages = {
        required: contactForm.getAttribute("data-msg-required"),
        invalidEmail: contactForm.getAttribute("data-msg-invalid-email"),
        shortDescription: contactForm.getAttribute("data-msg-short-description")
      };

      var setFieldError = function (fieldId, message) {
        var errorEl = document.getElementById(fieldId + "-error");
        var inputEl = document.getElementById(fieldId);
        if (errorEl) errorEl.textContent = message || "";
        if (inputEl) inputEl.setAttribute("aria-invalid", message ? "true" : "false");
      };

      var readValues = function () {
        var data = new FormData(contactForm);
        return {
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          interest: data.get("interest"),
          size: data.get("size"),
          description: data.get("description"),
          contactMethod: data.get("contactMethod")
        };
      };

      var fieldLabel = function (fieldId) {
        var label = contactForm.querySelector('label[for="' + fieldId + '"]');
        return label ? label.textContent.replace(/\s*\*\s*$/, "").trim() : fieldId;
      };

      var showStatus = function (state, message, withFallback) {
        if (!statusEl) return;
        statusEl.setAttribute("data-state", state);
        var html = "<p>" + message + "</p>";
        if (withFallback) {
          html += '<p class="fallback-channels">' +
            '<a href="https://wa.me/' + contactForm.getAttribute("data-whatsapp-fallback") + '">WhatsApp</a>' +
            ' <a href="mailto:' + contactForm.getAttribute("data-mail-to") + '">' + contactForm.getAttribute("data-mail-to") + "</a></p>";
        }
        statusEl.innerHTML = html;
      };

      contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var values = readValues();
        var result = validateContactForm(values, messages);
        ["name", "email", "description"].forEach(function (id) { setFieldError(id, result.errors[id]); });
        if (!result.valid) {
          var firstInvalid = Object.keys(result.errors)[0];
          var el = document.getElementById(firstInvalid);
          if (el) el.focus();
          return;
        }

        var mode = contactForm.getAttribute("data-mode");
        submitBtn.setAttribute("disabled", "disabled");
        submitBtn.setAttribute("aria-busy", "true");
        showStatus("sending", contactForm.getAttribute("data-msg-sending"), false);

        var fields = [
          { label: fieldLabel("name"), value: values.name },
          { label: fieldLabel("company"), value: values.company },
          { label: fieldLabel("email"), value: values.email },
          { label: fieldLabel("phone"), value: values.phone },
          { label: fieldLabel("interest"), value: values.interest },
          { label: fieldLabel("size"), value: values.size },
          { label: fieldLabel("description"), value: values.description },
          { label: "İletişim tercihi", value: values.contactMethod }
        ];

        if (mode === "endpoint") {
          var endpoint = contactForm.getAttribute("data-endpoint");
          fetch(endpoint, { method: "POST", body: new FormData(contactForm) })
            .then(function (response) {
              submitBtn.removeAttribute("disabled");
              submitBtn.removeAttribute("aria-busy");
              if (response.ok) {
                showStatus("success", contactForm.getAttribute("data-msg-sent"), true);
                contactForm.reset();
              } else {
                showStatus("error", contactForm.getAttribute("data-msg-failed"), true);
              }
              /* ADR-7: 2xx dışı yanıtta OTOMATİK YENİDEN DENEME YOK. */
            })
            .catch(function () {
              submitBtn.removeAttribute("disabled");
              submitBtn.removeAttribute("aria-busy");
              showStatus("error", contactForm.getAttribute("data-msg-failed"), true);
            });
        } else {
          showStatus("sending", contactForm.getAttribute("data-msg-preparing"), false);
          var mailto = buildMailtoUrl(
            contactForm.getAttribute("data-mail-to"),
            contactForm.getAttribute("data-mail-subject"),
            fields
          );
          window.location.href = mailto;
          submitBtn.removeAttribute("disabled");
          submitBtn.removeAttribute("aria-busy");
          showStatus("success", contactForm.getAttribute("data-msg-mail-fallback"), true);
        }
      });
    }
  })();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    parseQueryParam,
    resolveProductPreselect,
    validateContactForm,
    buildMailtoBody,
    buildMailtoUrl
  };
}
