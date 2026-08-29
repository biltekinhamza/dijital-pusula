(function () {
  "use strict";

  const catalog = window.PROJE_KOYU_TRANSLATIONS;
  let language = localStorage.getItem("projekoyu-language") === "en" ? "en" : "tr";
  let selectedProject = 0;
  let lastFocused = null;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));

  function t(path) {
    return path.split(".").reduce((value, key) => value && value[key], catalog[language]);
  }

  function pageText() {
    const c = catalog[language];
    const tr = language === "tr";
    return {
      "accessibility.skip": c.a11y.skip, "accessibility.menu": c.a11y.openMenu, "accessibility.nav": c.a11y.navigation,
      "accessibility.language": c.a11y.language, "accessibility.next": tr ? "Sonraki bölüme geç" : "Go to next section",
      "accessibility.top": c.a11y.backToTop, "accessibility.close": c.a11y.close,
      "hero.eyebrow": c.hero.eyebrow, "hero.title": c.hero.title, "hero.description": c.hero.description,
      "hero.primary": c.hero.primary, "hero.secondary": c.hero.secondary, "hero.note": c.hero.principles.join(" · "),
      "hero.visualLabel": tr ? "Projeköyü çözüm mimarisi" : "Projeköyü solution architecture",
      "hero.architecture.label": tr ? "ÇÖZÜM MİMARİSİ" : "SOLUTION ARCHITECTURE", "hero.architecture.core": tr ? "Size Özel Yazılım" : "Custom Software",
      "hero.architecture.analysis": tr ? "İhtiyaç Analizi" : "Requirement Analysis", "hero.architecture.analysisNote": tr ? "İş problemini anlama" : "Understand the challenge",
      "hero.architecture.design": tr ? "Çözüm Tasarımı" : "Solution Design", "hero.architecture.designNote": tr ? "Doğru mimariyi kurma" : "Design the right architecture",
      "hero.architecture.development": tr ? "Yazılım Geliştirme" : "Software Development", "hero.architecture.developmentNote": tr ? "Sürdürülebilir ürün" : "Build a sustainable product",
      "hero.architecture.integration": tr ? "Entegrasyon" : "Integration", "hero.architecture.integrationNote": tr ? "Kesintisiz veri akışı" : "Connect data seamlessly",
      "hero.architecture.web": tr ? "Web ve Mobil" : "Web and Mobile", "hero.architecture.automation": tr ? "Otomasyon" : "Automation", "hero.architecture.ai": tr ? "Yapay Zekâ" : "Artificial Intelligence",
      "values.kicker": tr ? "TEMEL YAKLAŞIMIMIZ" : "OUR CORE APPROACH", "values.title": tr ? "Teknolojiyi ölçülebilir iş değerine dönüştürüyoruz." : "We turn technology into measurable business value.",
      "about.kicker": c.about.eyebrow, "about.title": c.about.title, "about.p1": c.about.lead, "about.p2": c.about.statement, "about.link": c.about.link,
      "about.tags.analyze": tr ? "Analiz" : "Analyze", "about.tags.design": tr ? "Tasarla" : "Design", "about.tags.improve": tr ? "Geliştir" : "Improve",
      "services.kicker": c.services.eyebrow, "services.title": c.services.title, "services.intro": c.services.lead,
      "services.detailLabel": c.services.modalEyebrow, "services.includes": c.services.modalIntro, "services.discuss": c.modal.cta,
      "automation.kicker": c.automation.eyebrow, "automation.title": c.automation.title, "automation.intro": c.automation.lead,
      "automation.opportunities": tr ? "Otomasyon Fırsatları" : "Automation Opportunities", "automation.diagram": tr ? "ETKİLEŞİMLİ İŞ AKIŞI" : "INTERACTIVE WORKFLOW",
      "automation.ready": tr ? "Sistem Hazır" : "System Ready", "automation.log": tr ? "Akışı görmek için bir adıma tıklayın." : "Select a step to inspect the flow.",
      "industries.kicker": c.industries.eyebrow, "industries.title": c.industries.title, "industries.intro": c.industries.lead,
      "projects.kicker": c.projects.eyebrow, "projects.title": c.projects.title, "projects.intro": c.projects.lead, "projects.tabLabel": tr ? "Proje konseptleri" : "Project concepts",
      "process.kicker": c.process.eyebrow, "process.title": c.process.title,
      "technologies.kicker": c.tech.eyebrow, "technologies.title": c.tech.title, "technologies.intro": c.tech.lead,
      "technologies.principleTitle": tr ? "Doğru araç, doğru problem." : "The right tool for the right problem.",
      "technologies.principleText": tr ? "Teknoloji amaç değil, iş hedeflerine ulaşmak için bir araçtır." : "Technology is a tool for reaching business goals, not an end in itself.",
      "why.kicker": c.why.eyebrow, "why.title": c.why.title,
      "why.intro": tr ? "Teknik kararları iş hedefleriyle birlikte değerlendiriyor, bugünün ihtiyacını çözerken yarının değişimine hazır sistemler kuruyoruz." : "We evaluate technical decisions alongside business goals and build systems ready for tomorrow's change.",
      "why.cta": tr ? "Birlikte Değerlendirelim" : "Let's Evaluate Together",
      "faq.kicker": c.faq.eyebrow, "faq.title": c.faq.title, "faq.intro": c.faq.lead, "faq.link": c.faq.link,
      "contact.kicker": c.contact.eyebrow, "contact.title": c.contact.title, "contact.intro": c.contact.lead,
      "contact.email": c.contact.email, "contact.phone": tr ? "Telefon / WhatsApp" : "Phone / WhatsApp", "contact.address": c.contact.address, "contact.addressValue": c.contact.addressValue,
      "form.title": tr ? "Proje Talep Formu" : "Project Request Form", "form.required": tr ? "* Zorunlu alanlar" : "* Required fields",
      "form.name": `${c.form.name} *`, "form.company": c.form.company, "form.email": `${c.form.email} *`, "form.phone": c.form.phone,
      "form.projectType": `${c.form.projectType} *`, "form.budget": c.form.budget, "form.description": `${c.form.description} *`,
      "form.preference": c.form.contactMethod, "form.emailShort": c.form.methodEmail, "form.phoneShort": c.form.methodPhone,
      "form.consent": `${c.form.consent} *`, "form.submit": c.form.submit, "form.note": c.form.note, "form.select": c.form.select,
      "form.namePlaceholder": c.form.namePlaceholder, "form.companyPlaceholder": c.form.companyPlaceholder, "form.emailPlaceholder": c.form.emailPlaceholder, "form.phonePlaceholder": c.form.phonePlaceholder, "form.descriptionPlaceholder": c.form.descriptionPlaceholder,
      "footer.description": c.footer.description, "footer.quick": c.footer.quick, "footer.services": c.footer.services, "footer.contact": c.footer.contact,
      "footer.custom": c.footer.custom, "footer.automation": c.footer.automation, "footer.integration": c.footer.integrations, "footer.support": c.footer.support,
      "footer.rights": c.footer.rights, "footer.privacy": c.footer.privacy, "footer.cookies": c.footer.cookies, "footer.terms": c.footer.terms,
      "cookie.title": c.cookie.title, "cookie.text": c.cookie.text, "cookie.details": tr ? "Detaylar" : "Details", "cookie.accept": c.cookie.accept,
      ...Object.fromEntries(Object.entries(c.nav).map(([key, value]) => [`nav.${key}`, value]))
    };
  }

  function translatePage() {
    const text = pageText();
    $$('[data-i18n]').forEach((element) => { if (text[element.dataset.i18n] !== undefined) element.textContent = text[element.dataset.i18n]; });
    $$('[data-i18n-aria]').forEach((element) => { if (text[element.dataset.i18nAria] !== undefined) element.setAttribute("aria-label", text[element.dataset.i18nAria]); });
    $$('[data-i18n-placeholder]').forEach((element) => { if (text[element.dataset.i18nPlaceholder] !== undefined) element.placeholder = text[element.dataset.i18nPlaceholder]; });
  }

  function renderDynamicContent() {
    const c = catalog[language];
    $("#value-grid").innerHTML = c.values.items.map((item) => `<article class="value-card reveal"><span class="card-icon" aria-hidden="true">${esc(item.icon)}</span><div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></div></article>`).join("");
    $("#about-list").innerHTML = c.about.points.map((item) => `<li><span>✓</span><div><b>${esc(item.title)}</b><small>${esc(item.text)}</small></div></li>`).join("");
    $("#service-grid").innerHTML = c.services.items.map((item, index) => `<article class="service-card reveal"><span class="service-number">0${index + 1}</span><span class="card-icon" aria-hidden="true">${esc(item.icon)}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p><button class="service-link" type="button" data-service="${index}"><span>${esc(c.services.details)}</span><span aria-hidden="true">↗</span></button></article>`).join("");
    $("#automation-list").innerHTML = c.automation.opportunities.map((item, index) => `<div><span>${String(index + 1).padStart(2, "0")}</span><p>${esc(item)}</p></div>`).join("");
    $("#workflow-diagram").innerHTML = c.automation.steps.map((item, index) => `${index ? '<i aria-hidden="true">→</i>' : ''}<button type="button" data-flow="${index}"><small>0${index + 1}</small><span aria-hidden="true">${["↧", "⌁", "◇", "⇄", "▥"][index]}</span><b>${esc(item)}</b></button>`).join("");
    $("#industry-grid").innerHTML = c.industries.items.map((item, index) => `<article class="industry-card reveal"><div><span class="card-icon" aria-hidden="true">${esc(item.icon)}</span><small>0${index + 1}</small></div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p><b>${language === "tr" ? "Çözüm alanı" : "Solution area"}<span>↗</span></b></article>`).join("");
    $("#process-list").innerHTML = c.process.steps.map((item, index) => `<li class="reveal"><span class="timeline-marker">0${index + 1}</span><div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></div></li>`).join("");
    $("#tech-groups").innerHTML = c.tech.groups.map((group) => `<article class="tech-group"><h3>${esc(group.title)}</h3><div>${group.items.map((item) => `<span>${esc(item)}</span>`).join("")}</div></article>`).join("");
    $("#why-list").innerHTML = c.why.items.map((item) => `<div class="why-item"><span aria-hidden="true">✓</span><p>${esc(item)}</p></div>`).join("");
    $("#faq-list").innerHTML = c.faq.items.map((item, index) => `<article class="faq-item"><h3><button type="button" aria-expanded="false" aria-controls="faq-${index}"><span>${esc(item.q)}</span><i aria-hidden="true"></i></button></h3><div class="faq-answer" id="faq-${index}" hidden><p>${esc(item.a)}</p></div></article>`).join("");
    renderProjectTabs();
    fillSelect($("select[name=projectType]"), c.form.projectTypes, true);
    fillSelect($("select[name=budget]"), c.form.budgets, false);
    observeReveals();
  }

  function fillSelect(select, options, required) {
    const oldValue = select.value;
    select.innerHTML = `<option value="">${esc(t("form.select"))}</option>${options.map((option) => `<option value="${esc(option)}">${esc(option)}</option>`).join("")}`;
    if ([...select.options].some((option) => option.value === oldValue)) select.value = oldValue;
    select.required = required;
  }

  function renderProjectTabs() {
    const projects = t("projects.items");
    $("#project-tabs").innerHTML = projects.map((project, index) => `<button type="button" role="tab" aria-selected="${index === selectedProject}" aria-controls="project-detail" data-project="${index}"><span>${esc(project.code)}${project.repo ? '<i class="tab-live" aria-hidden="true"></i>' : ""}</span>${esc(project.title)}</button>`).join("");
    renderProject(selectedProject);
  }

  function renderProject(index) {
    selectedProject = index;
    const c = catalog[language].projects;
    const project = c.items[index];
    $("#project-detail").innerHTML = `<div class="project-visual"><span class="concept-label${project.repo ? " concept-label-real" : ""}">${esc(project.label || c.label)}</span>${project.shot ? `<figure class="shot-frame"><figcaption aria-hidden="true"><i></i><i></i><i></i><span>${esc(project.repo || project.shot)}</span>${project.status ? `<em><b></b>${esc(project.status)}</em>` : ""}</figcaption><img src="${esc(project.shot)}" alt="${esc(project.title)} uygulama ekran görüntüsü" loading="lazy"></figure>` : `<div class="project-screen" aria-hidden="true"><div class="screen-side"><i></i><i></i><i></i></div><div class="screen-main"><div class="screen-bars"><i></i><i></i><i></i></div><div class="screen-chart"><span style="height:42%"></span><span style="height:68%"></span><span style="height:55%"></span><span style="height:88%"></span><span style="height:72%"></span></div></div></div>`}<h3>${esc(project.title)}</h3></div><div class="project-info"><div><small>${esc(c.problem)}</small><p>${esc(project.problem)}</p></div><div><small>${esc(c.solution)}</small><p>${esc(project.solution)}</p></div><div class="project-columns"><section><small>${esc(c.modules)}</small><ul>${project.modules.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section><section><small>${esc(c.technologies)}</small><div class="tag-list">${project.technologies.split(", ").map((item) => `<span>${esc(item)}</span>`).join("")}</div></section></div><div class="benefit"><span aria-hidden="true">↗</span><div><small>${esc(c.benefit)}</small><p>${esc(project.benefit)}</p></div></div>${project.repo ? `<a class="button project-repo" href="${esc(project.repo)}" target="_blank" rel="noopener"><span>${esc(c.repoLabel || "GitHub")}</span><span aria-hidden="true">↗</span></a>` : ""}</div>`;
    $$('[data-project]').forEach((button) => button.setAttribute("aria-selected", String(Number(button.dataset.project) === index)));
  }

  function setLanguage(next) {
    language = next === "en" ? "en" : "tr";
    localStorage.setItem("projekoyu-language", language);
    document.documentElement.lang = language;
    $$('[data-lang]').forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === language)));
    translatePage();
    renderDynamicContent();
    const meta = t("meta");
    document.title = meta.title;
    $('meta[name="description"]').content = meta.description;
    $('meta[property="og:title"]').content = meta.title;
    $('meta[property="og:description"]').content = meta.ogDescription;
    $('meta[name="twitter:title"]').content = meta.title;
    $('meta[name="twitter:description"]').content = meta.ogDescription;
    const schema = JSON.parse($("#structured-data").textContent);
    schema.description = meta.description; schema.inLanguage = language;
    $("#structured-data").textContent = JSON.stringify(schema);
  }

  let revealObserver;
  function observeReveals() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("visible")); return; }
    revealObserver ||= new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); } }), { threshold: .1 });
    $$(".reveal:not(.visible)").forEach((el) => revealObserver.observe(el));
  }

  function openService(index) {
    const service = t("services.items")[index];
    lastFocused = document.activeElement;
    $("#modal-icon").textContent = service.icon; $("#modal-title").textContent = service.title; $("#modal-description").textContent = service.detail;
    $("#modal-features").innerHTML = service.bullets.map((item) => `<li><span>✓</span>${esc(item)}</li>`).join("");
    $("#service-modal").hidden = false; document.body.classList.add("modal-open"); $("#service-modal .modal-close").focus();
  }

  function closeService() {
    $("#service-modal").hidden = true; document.body.classList.remove("modal-open"); if (lastFocused) lastFocused.focus();
  }

  function openLegal(type) {
    const legal = t(`legal.${type}`); if (!legal) return;
    $("#legal-title").textContent = legal.title; $("#legal-content").innerHTML = legal.body.map((line) => `<p>${esc(line)}</p>`).join("");
    $("#legal-dialog").showModal(); document.body.classList.add("modal-open");
  }

  function validateForm(form) {
    let valid = true;
    $$(".error", form).forEach((error) => error.textContent = ""); $$(".invalid", form).forEach((field) => field.classList.remove("invalid"));
    $$('[required]', form).forEach((field) => {
      let message = "";
      if ((field.type === "checkbox" && !field.checked) || (field.type !== "checkbox" && !field.value.trim())) message = t("form.required");
      else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) message = t("form.invalidEmail");
      else if (field.name === "description" && field.value.trim().length < 20) message = t("form.shortDescription");
      if (message) { valid = false; field.classList.add("invalid"); const error = $(".error", field.closest("label")); if (error) error.textContent = message; }
    });
    const first = $(".invalid", form); if (first) first.focus(); return valid;
  }

  function submitForm(event) {
    event.preventDefault(); const form = event.currentTarget; if (!validateForm(form)) return;
    const data = new FormData(form); const labels = t("form.mailLabels");
    const lines = [`${labels.name}: ${data.get("name")}`, `${labels.company}: ${data.get("company") || "-"}`, `${labels.email}: ${data.get("email")}`, `${labels.phone}: ${data.get("phone") || "-"}`, `${labels.projectType}: ${data.get("projectType")}`, `${labels.budget}: ${data.get("budget") || "-"}`, `${labels.contactMethod}: ${data.get("preference")}`, "", `${labels.description}:`, data.get("description")];
    $("#form-status").textContent = t("form.preparing");
    location.href = `mailto:info@projekoyu.example?subject=${encodeURIComponent(t("form.mailSubject"))}&body=${encodeURIComponent(lines.join("\n"))}`;
    setTimeout(() => $("#form-status").textContent = t("form.success"), 600);
  }

  function setupEvents() {
    $$('[data-lang]').forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
    $(".menu-toggle").addEventListener("click", (event) => { const open = event.currentTarget.getAttribute("aria-expanded") !== "true"; event.currentTarget.setAttribute("aria-expanded", open); $("#primary-nav").classList.toggle("open", open); });
    $$("#primary-nav a").forEach((link) => link.addEventListener("click", () => { $(".menu-toggle").setAttribute("aria-expanded", "false"); $("#primary-nav").classList.remove("open"); }));
    document.addEventListener("click", (event) => {
      const service = event.target.closest("[data-service]"); if (service) openService(Number(service.dataset.service));
      const project = event.target.closest("[data-project]"); if (project) renderProject(Number(project.dataset.project));
      const flow = event.target.closest("[data-flow]"); if (flow) { $$('[data-flow]').forEach((button) => button.classList.remove("active")); flow.classList.add("active"); $("#workflow-log").textContent = `${t("automation.steps")[Number(flow.dataset.flow)]}: ${language === "tr" ? "adım başarıyla doğrulandı." : "step verified successfully."}`; }
      const faq = event.target.closest(".faq-item button"); if (faq) { const expanded = faq.getAttribute("aria-expanded") === "true"; $$(".faq-item button").forEach((button) => { button.setAttribute("aria-expanded", "false"); $(`#${button.getAttribute("aria-controls")}`).hidden = true; }); faq.setAttribute("aria-expanded", String(!expanded)); $(`#${faq.getAttribute("aria-controls")}`).hidden = expanded; }
      const dialog = event.target.closest("[data-dialog]"); if (dialog) openLegal(dialog.dataset.dialog);
      if (event.target.closest("[data-close-modal]")) closeService();
      if (event.target.closest("[data-close-dialog]")) $("#legal-dialog").close();
    });
    $("#legal-dialog").addEventListener("close", () => document.body.classList.remove("modal-open"));
    $("#contact-form").addEventListener("submit", submitForm);
    $(".back-to-top").addEventListener("click", () => scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
    $("#cookie-accept").addEventListener("click", () => { localStorage.setItem("projekoyu-cookie-notice", "accepted"); $("#cookie-banner").hidden = true; });
    $$('.social-links a').forEach((link) => link.addEventListener("click", (event) => event.preventDefault()));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !$("#service-modal").hidden) closeService(); });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { $$("#primary-nav a").forEach((link) => link.classList.toggle("active", link.hash === `#${entry.target.id}`)); } }), { rootMargin: "-38% 0px -52%" });
    $$("main section[id]").forEach((section) => observer.observe(section));
    addEventListener("scroll", () => { $("#site-header").classList.toggle("scrolled", scrollY > 20); $(".back-to-top").classList.toggle("visible", scrollY > 600); }, { passive: true });
  }

  $("#current-year").textContent = new Date().getFullYear();
  setLanguage(language); setupEvents();
  $("#cookie-banner").hidden = localStorage.getItem("projekoyu-cookie-notice") === "accepted";
})();
