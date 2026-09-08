(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Demo/fiyat formunun gonderilecegi adres.

     Bos birakilirsa form, ziyaretcinin e-posta uygulamasinda taslak acar
     (kurulum gerektirmeyen yedek davranis). Formspree / Web3Forms gibi
     ucretsiz bir servisten aldiginiz endpoint'i buraya yazdiginiz anda
     form dogrudan POST etmeye baslar; baska hicbir yeri degistirmeniz
     gerekmez.

       Formspree  ->  "https://formspree.io/f/xxxxxxxx"
       Web3Forms  ->  "https://api.web3forms.com/submit"  (+ FORM_ACCESS_KEY)
     ------------------------------------------------------------------ */
  const FORM_ENDPOINT = "";
  const FORM_ACCESS_KEY = "";   // yalnizca Web3Forms icin gerekli

  const catalog = window.SITE_CONTENT;
  const company = window.SITE_COMPANY || {};

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value == null ? "" : value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const page = document.body.dataset.page || "home";
  const productKey = document.body.dataset.product || "";
  const legalKey = document.body.dataset.legal || "";

  /* localStorage gizli sekmede veya site verisi engellendiginde firlatir.
     Sarmalanmazsa butun betik olur ve sayfa cevrilmemis kalir. */
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* yok say */ } }
  };

  let language = store.get("proje-bahcesi-language") === "en" ? "en" : "tr";
  let lastFocused = null;

  /* Bazi gomulu tarayicilarda ve test ortamlarinda matchMedia yoktur;
     sarmalanmazsa tek bir eksik API butun betigi durdurur. */
  function prefersReducedMotion() {
    return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function t(path) {
    return String(path).split(".").reduce((value, key) => (value == null ? value : value[key]), catalog[language]);
  }

  /* ---------------------------------------------------------------- */
  /* Sirket bilgileri: tek kaynaktan (SITE_COMPANY) doldurulur.        */

  function fillCompany() {
    const address = language === "tr" ? company.addressTr : company.addressEn;
    const values = {
      legalName: company.legalName, email: company.email, phone: company.phone,
      address, taxOffice: company.taxOffice, taxNumber: company.taxNumber, mersis: company.mersis
    };
    $$("[data-company]").forEach((el) => {
      const value = values[el.dataset.company];
      if (value) el.textContent = value;
    });
    $$("[data-company-href='email']").forEach((el) => { el.href = `mailto:${company.email}`; });
    $$("[data-company-href='phone']").forEach((el) => {
      if (company.phoneHref) el.href = `tel:${company.phoneHref}`;
      else { el.removeAttribute("href"); el.classList.add("is-static"); }
    });
    $$("[data-company-href='whatsapp']").forEach((el) => {
      if (company.whatsapp) el.href = `https://wa.me/${company.whatsapp}`;
      else el.hidden = true;
    });
    $$("[data-company-href='github']").forEach((el) => {
      if (company.github) el.href = company.github; else el.hidden = true;
    });
    $$("[data-company-href='linkedin']").forEach((el) => {
      if (company.linkedin) el.href = company.linkedin; else el.hidden = true;
    });
    /* Vergi kimligi satiri: hicbir alan doldurulmadiysa hic gosterilmez. */
    const identity = $("#footer-identity");
    if (identity) identity.hidden = !(company.taxNumber || company.mersis || company.taxOffice);

    renderIdentity(address);
  }

  /* Elektronik Ticaret Hizmet Saglayicilar Yonetmeligi md. 5: ana sayfada
     "Iletisim" basligi altinda dogrudan erisilebilir firma bilgileri.
     SITE_COMPANY icinde bos birakilan alan hic basilmaz. */
  function renderIdentity(address) {
    const holder = $("#company-identity");
    if (!holder) return;
    const labels = t("contact.fields") || {};
    const rows = [
      ["legalName", company.legalName], ["brandName", company.brandName],
      ["mersis", company.mersis], ["taxNumber", company.taxNumber],
      ["taxOffice", company.taxOffice], ["address", address],
      ["kep", company.kep], ["email", company.email],
      ["phone", company.phone], ["chamber", company.chamber]
    ].filter(([, value]) => value);
    holder.innerHTML = rows.map(([key, value]) => {
      const shown = key === "chamber" && company.chamberUrl
        ? `<a href="${esc(company.chamberUrl)}" target="_blank" rel="noopener">${esc(value)} ↗</a>`
        : esc(value);
      return `<div><dt>${esc(labels[key] || key)}</dt><dd>${shown}</dd></div>`;
    }).join("");
    holder.hidden = rows.length === 0;
    const heading = $("#company-identity-title");
    if (heading) heading.hidden = rows.length === 0;
  }

  /* ---------------------------------------------------------------- */
  /* Metin cevirisi: data-i18n="a.b.c" -> t("a.b.c")                    */

  function translatePage() {
    $$("[data-i18n]").forEach((el) => {
      const value = t(el.dataset.i18n);
      if (typeof value === "string") el.textContent = value;
    });
    $$("[data-i18n-aria]").forEach((el) => {
      const value = t(el.dataset.i18nAria);
      if (typeof value === "string") el.setAttribute("aria-label", value);
    });
    $$("[data-i18n-placeholder]").forEach((el) => {
      const value = t(el.dataset.i18nPlaceholder);
      if (typeof value === "string") el.placeholder = value;
    });
    $$("[data-i18n-title]").forEach((el) => {
      const value = t(el.dataset.i18nTitle);
      if (typeof value === "string") el.title = value;
    });
  }

  /* ---------------------------------------------------------------- */
  /* Sayfa bazli dinamik bloklar. Hepsi kabin yoksa sessizce atlar.    */

  const html = {
    checkItem: (text) => `<li><span aria-hidden="true">✓</span><span>${esc(text)}</span></li>`,
    crossItem: (text) => `<li class="is-missing"><span aria-hidden="true">×</span><span>${esc(text)}</span></li>`,
    tag: (text) => `<span>${esc(text)}</span>`
  };

  function fill(selector, markup) {
    const node = $(selector);
    if (node) node.innerHTML = markup;
    return node;
  }

  function renderHome() {
    const c = catalog[language].home;
    const p = catalog[language].products;

    fill("#stat-grid", c.stats.items.map((item) => `
      <article class="stat-card reveal">
        <strong>${esc(item.value)}</strong>
        <b>${esc(item.label)}</b>
        <small>${esc(item.note)}</small>
      </article>`).join(""));

    const cards = [
      { key: "hvac", href: "havalandirma-yazilimi.html", shot: "assets/images/product-hvac.svg" },
      { key: "cold", href: "soguk-hava-deposu-yazilimi.html", shot: "assets/images/product-soguk-hava.svg" }
    ];
    fill("#product-grid", cards.map(({ key, href, shot }) => {
      const item = p[key];
      return `
      <article class="product-card reveal">
        <a class="product-shot" href="${href}" tabindex="-1" aria-hidden="true">
          <img src="${shot}" width="960" height="600" loading="lazy" alt="">
        </a>
        <div class="product-body">
          <div class="product-head">
            <span class="product-code">${esc(item.code)}</span>
            <span class="badge badge-live"><i aria-hidden="true"></i>${esc(c.products.badgeLive)}</span>
          </div>
          <h3><a href="${href}">${esc(item.name)}</a></h3>
          <p class="product-subtitle">${esc(item.subtitle)}</p>
          <p>${esc(item.tagline)}</p>
          <div class="tag-list">${item.highlights.map(html.tag).join("")}</div>
          <a class="button button-secondary" href="${href}">
            <span>${esc(c.products.cta)}</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>`;
    }).join(""));

    fill("#why-grid", c.why.items.map((item) => `
      <article class="feature-card reveal">
        <span class="card-icon" aria-hidden="true">${esc(item.icon)}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.text)}</p>
      </article>`).join(""));

    fill("#service-teaser", c.services.items.map(html.tag).join(""));

    fill("#process-list", c.process.steps.map((item, i) => `
      <li class="reveal">
        <span class="timeline-marker">0${i + 1}</span>
        <div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></div>
      </li>`).join(""));

    renderFaq(c.faq.items);
  }

  function renderProduct() {
    const p = catalog[language].products;
    const item = p[productKey];
    if (!item) return;
    const L = p.labels;

    fill("#product-highlights", item.highlights.map(html.tag).join(""));

    fill("#module-grid", item.modules.map((mod) => `
      <article class="feature-card reveal">
        <span class="card-icon" aria-hidden="true">${esc(mod.icon)}</span>
        <h3>${esc(mod.title)}</h3>
        <p>${esc(mod.text)}</p>
      </article>`).join(""));

    fill("#integration-grid", item.integrations.map((row) => `
      <article class="integration-card reveal">
        <h3>${esc(row.name)}</h3>
        <p>${esc(row.text)}</p>
      </article>`).join(""));

    fill("#spec-list", item.specs.map((row) => `
      <div><dt>${esc(row.k)}</dt><dd>${esc(row.v)}</dd></div>`).join(""));

    fill("#plan-grid", item.packages.plans.map((plan) => `
      <article class="plan-card reveal${plan.featured ? " plan-featured" : ""}">
        <header>
          <h3>${esc(plan.name)}</h3>
          <p class="plan-price">${esc(plan.price)}</p>
          <p class="plan-price-note">${esc(plan.priceNote)}</p>
        </header>
        <p class="plan-summary">${esc(plan.summary)}</p>
        <ul class="plan-features">
          ${plan.features.map(html.checkItem).join("")}
          ${(plan.missing || []).map(html.crossItem).join("")}
        </ul>
        <a class="button${plan.featured ? "" : " button-secondary"}" href="#iletisim">
          <span>${esc(plan.cta)}</span><span aria-hidden="true">↗</span>
        </a>
      </article>`).join(""));

    const cmp = item.comparison;
    if (cmp) {
      fill("#comparison-body", cmp.rows.map((row) => `
        <tr>
          <th scope="row">${esc(row.k)}</th>
          <td>${esc(row.before)}</td>
          <td class="is-good">${esc(row.after)}</td>
        </tr>`).join(""));
      const heads = {
        "#comparison-title": cmp.title, "#comparison-lead": cmp.lead,
        "#comparison-before": cmp.before, "#comparison-after": cmp.after
      };
      Object.entries(heads).forEach(([selector, value]) => {
        const node = $(selector);
        if (node) node.textContent = value;
      });
    }

    /* Etiketler ve baslik metinleri */
    const map = {
      "#label-problem": L.problem, "#label-solution": L.solution, "#label-benefit": L.benefit,
      "#label-modules": L.modules, "#label-specs": L.specs, "#label-packages": L.packages,
      "#label-integrations": L.integrations
    };
    Object.entries(map).forEach(([selector, value]) => {
      const node = $(selector);
      if (node) node.textContent = value;
    });
    const text = {
      "#product-name": item.name, "#product-subtitle": item.subtitle,
      "#product-tagline": item.tagline, "#product-hero": item.hero,
      "#product-problem": item.problem, "#product-solution": item.solution,
      "#product-benefit": item.benefit, "#product-code": item.code,
      "#plan-note": item.packages.note, "#badge-live": L.live,
      "#product-demo-cta": L.demoCta, "#product-back": L.backHome
    };
    Object.entries(text).forEach(([selector, value]) => {
      const node = $(selector);
      if (node && typeof value === "string") node.textContent = value;
    });
  }

  function renderServices() {
    const s = catalog[language].services;

    fill("#service-grid", s.items.map((item, i) => `
      <article class="service-card reveal">
        <span class="service-number">0${i + 1}</span>
        <span class="card-icon" aria-hidden="true">${esc(item.icon)}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.text)}</p>
        <button class="service-link" type="button" data-service="${i}">
          <span>${esc(s.more)}</span><span aria-hidden="true">↗</span>
        </button>
      </article>`).join(""));

    fill("#process-list", s.process.steps.map((item, i) => `
      <li class="reveal">
        <span class="timeline-marker">0${i + 1}</span>
        <div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></div>
      </li>`).join(""));

    fill("#tech-groups", s.tech.groups.map((group) => `
      <article class="tech-group">
        <h3>${esc(group.title)}</h3>
        <div>${group.items.map(html.tag).join("")}</div>
      </article>`).join(""));
  }

  function renderLegal() {
    const doc = t(`legal.${legalKey}`);
    if (!doc) return;
    const node = $("#legal-body");
    if (node) {
      node.innerHTML = doc.body.map((block) => `
        <section><h2>${esc(block.h)}</h2>${block.p.map((line) => `<p>${esc(line)}</p>`).join("")}</section>`).join("");
    }
    const title = $("#legal-heading");
    if (title) title.textContent = doc.title;
    const note = $("#legal-disclaimer");
    if (note) note.textContent = doc.disclaimer;
  }

  function renderFaq(items) {
    fill("#faq-list", items.map((item, i) => `
      <article class="faq-item">
        <h3><button type="button" aria-expanded="false" aria-controls="faq-${i}">
          <span>${esc(item.q)}</span><i aria-hidden="true"></i>
        </button></h3>
        <div class="faq-answer" id="faq-${i}" hidden><p>${esc(item.a)}</p></div>
      </article>`).join(""));
  }

  function renderForm() {
    const f = catalog[language].form;
    fillSelect($("select[name=interest]"), f.interests);
    fillSelect($("select[name=size]"), f.sizes);
  }

  function fillSelect(select, options) {
    if (!select) return;
    const previous = select.value;
    select.innerHTML = `<option value="">${esc(catalog[language].form.select)}</option>` +
      options.map((option) => `<option value="${esc(option)}">${esc(option)}</option>`).join("");
    if ([...select.options].some((option) => option.value === previous)) select.value = previous;
  }

  function renderDynamicContent() {
    if (page === "home") renderHome();
    else if (page === "product") renderProduct();
    else if (page === "services") renderServices();
    else if (page === "legal") renderLegal();
    renderForm();
    observeReveals();
  }

  /* ---------------------------------------------------------------- */

  function applyMeta() {
    const key = page === "product" ? productKey : (page === "legal" ? legalKey : page);
    const meta = t(`pages.${key}`);
    if (!meta) return;
    document.title = meta.title;
    const set = (selector, value) => { const node = $(selector); if (node) node.content = value; };
    set('meta[name="description"]', meta.description);
    set('meta[property="og:title"]', meta.title);
    set('meta[property="og:description"]', meta.og || meta.description);
    set('meta[name="twitter:title"]', meta.title);
    set('meta[name="twitter:description"]', meta.og || meta.description);
    const schema = $("#structured-data");
    if (schema) {
      try {
        const data = JSON.parse(schema.textContent);
        data.inLanguage = language;
        if (data.description) data.description = meta.description;
        schema.textContent = JSON.stringify(data);
      } catch { /* semayi bozmaktansa dokunma */ }
    }
  }

  function setLanguage(next) {
    language = next === "en" ? "en" : "tr";
    store.set("proje-bahcesi-language", language);
    document.documentElement.lang = language;
    $$("[data-lang]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === language)));
    /* Baslik ve meta once guncellenir: govde cizimindeki bir hata,
       sayfa basliginin cevrilmeden kalmasina yol acmasin. */
    applyMeta();
    translatePage();
    fillCompany();
    renderDynamicContent();
  }

  /* ---------------------------------------------------------------- */

  let revealObserver;
  function observeReveals() {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }
    revealObserver ||= new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
    }), { threshold: .1 });
    $$(".reveal:not(.visible)").forEach((el) => revealObserver.observe(el));
  }

  function openService(index) {
    const service = t("services.items")[index];
    if (!service) return;
    lastFocused = document.activeElement;
    $("#modal-icon").textContent = service.icon;
    $("#modal-title").textContent = service.title;
    $("#modal-description").textContent = service.detail;
    $("#modal-features").innerHTML = service.bullets.map(html.checkItem).join("");
    $("#modal-includes").textContent = t("services.includes");
    $("#modal-label").textContent = t("services.detailLabel");
    $("#modal-cta").textContent = t("services.discuss");
    $("#service-modal").hidden = false;
    document.body.classList.add("modal-open");
    $("#service-modal .modal-close").focus();
  }

  function closeService() {
    const modal = $("#service-modal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  /* ---------------------------------------------------------------- */
  /* Demo / fiyat formu                                                */

  function validateForm(form) {
    let valid = true;
    const f = catalog[language].form;
    $$(".error", form).forEach((error) => { error.textContent = ""; });
    $$(".invalid", form).forEach((field) => field.classList.remove("invalid"));
    $$("[required]", form).forEach((field) => {
      let message = "";
      const empty = field.type === "checkbox" ? !field.checked : !field.value.trim();
      if (empty) message = f.requiredError;
      else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) message = f.invalidEmail;
      else if (field.name === "description" && field.value.trim().length < 20) message = f.shortDescription;
      if (message) {
        valid = false;
        field.classList.add("invalid");
        const holder = field.closest("label") || field.closest("fieldset");
        const error = holder && $(".error", holder);
        if (error) error.textContent = message;
      }
    });
    const first = $(".invalid", form);
    if (first) first.focus();
    return valid;
  }

  function mailBody(data) {
    const labels = catalog[language].form.mailLabels;
    return [
      `${labels.name}: ${data.get("name")}`,
      `${labels.company}: ${data.get("company") || "-"}`,
      `${labels.email}: ${data.get("email")}`,
      `${labels.phone}: ${data.get("phone") || "-"}`,
      `${labels.interest}: ${data.get("interest")}`,
      `${labels.size}: ${data.get("size") || "-"}`,
      `${labels.contactMethod}: ${data.get("preference") || "-"}`,
      "",
      `${labels.description}:`,
      data.get("description")
    ].join("\n");
  }

  async function submitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validateForm(form)) return;

    const f = catalog[language].form;
    const status = $("#form-status");
    const button = $(".submit-button", form);
    const data = new FormData(form);

    if (!FORM_ENDPOINT) {
      status.className = "form-status";
      status.textContent = f.preparing;
      location.href = `mailto:${company.email}?subject=${encodeURIComponent(f.mailSubject)}&body=${encodeURIComponent(mailBody(data))}`;
      setTimeout(() => { status.textContent = `${f.mailFallback} ${company.email}`; }, 600);
      return;
    }

    data.set("_subject", f.mailSubject);
    if (FORM_ACCESS_KEY) data.set("access_key", FORM_ACCESS_KEY);
    button.disabled = true;
    status.className = "form-status";
    status.textContent = f.sending;
    try {
      const response = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      renderForm();
      status.className = "form-status is-ok";
      status.textContent = f.sent;
    } catch {
      status.className = "form-status is-error";
      status.textContent = `${f.failed} ${company.email}`;
    } finally {
      button.disabled = false;
    }
  }

  /* ---------------------------------------------------------------- */

  function setupEvents() {
    $$("[data-lang]").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));

    const toggle = $(".menu-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(open));
        toggle.classList.toggle("open", open);
        $("#primary-nav").classList.toggle("open", open);
      });
    }
    $$("#primary-nav a").forEach((link) => link.addEventListener("click", () => {
      if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.classList.remove("open"); }
      $("#primary-nav").classList.remove("open");
    }));

    /* Urun acilir menusu: tiklama ile acilir, disari tiklayinca ve Esc ile kapanir. */
    const dropdown = $(".nav-dropdown");
    if (dropdown) {
      const trigger = $(".nav-dropdown-trigger", dropdown);
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const open = trigger.getAttribute("aria-expanded") !== "true";
        trigger.setAttribute("aria-expanded", String(open));
        dropdown.classList.toggle("open", open);
      });
      document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) {
          trigger.setAttribute("aria-expanded", "false");
          dropdown.classList.remove("open");
        }
      });
    }

    document.addEventListener("click", (event) => {
      const service = event.target.closest("[data-service]");
      if (service) openService(Number(service.dataset.service));

      const faq = event.target.closest(".faq-item button");
      if (faq) {
        const expanded = faq.getAttribute("aria-expanded") === "true";
        $$(".faq-item button").forEach((other) => {
          other.setAttribute("aria-expanded", "false");
          $(`#${other.getAttribute("aria-controls")}`).hidden = true;
        });
        faq.setAttribute("aria-expanded", String(!expanded));
        $(`#${faq.getAttribute("aria-controls")}`).hidden = expanded;
      }

      if (event.target.closest("[data-close-modal]")) closeService();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      closeService();
      const dropdownOpen = $(".nav-dropdown.open");
      if (dropdownOpen) {
        $(".nav-dropdown-trigger", dropdownOpen).setAttribute("aria-expanded", "false");
        dropdownOpen.classList.remove("open");
      }
    });

    const form = $("#contact-form");
    if (form) form.addEventListener("submit", submitForm);

    const top = $(".back-to-top");
    if (top) {
      top.addEventListener("click", () => scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth"
      }));
    }

    const banner = $("#cookie-banner");
    const accept = $("#cookie-accept");
    if (accept && banner) {
      accept.addEventListener("click", () => {
        store.set("proje-bahcesi-cookie-notice", "accepted");
        banner.hidden = true;
      });
    }

    if ("IntersectionObserver" in window) {
      const sections = $$("main section[id]");
      if (sections.length) {
        const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          $$("#primary-nav a[href^='#']").forEach((link) => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
        }), { rootMargin: "-38% 0px -52%" });
        sections.forEach((section) => observer.observe(section));
      }
    }

    addEventListener("scroll", () => {
      $("#site-header").classList.toggle("scrolled", scrollY > 20);
      if (top) top.classList.toggle("visible", scrollY > 600);
    }, { passive: true });
  }

  /* ---------------------------------------------------------------- */

  const year = $("#current-year");
  if (year) year.textContent = new Date().getFullYear();
  setLanguage(language);
  setupEvents();
  const banner = $("#cookie-banner");
  if (banner) banner.hidden = store.get("proje-bahcesi-cookie-notice") === "accepted";
})();
