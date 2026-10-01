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
   options = { hvac: "<hvac select metni>", cold: "<cold select metni>", puantaj: "<puantaj select metni>" }
   (bkz. contact.js şablonu data-product-hvac/-cold/-puantaj). */
function resolveProductPreselect(urun, options) {
  if (!urun) return null;
  const key = String(urun).toLowerCase();
  if (key === "hvac") return options.hvac || null;
  if (key === "cold" || key === "soguk-hava" || key === "soguk_hava_deposu" || key === "shd") {
    return options.cold || null;
  }
  if (key === "puantaj") return options.puantaj || null;
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

/* --- Keşif haritası (ana sayfa) --- */

/* turnTo: iğnenin mutlak dönüşü `current` iken `target` (0-359) yönüne en
   kısa yoldan dönmesi için yeni mutlak açıyı verir. extraTurns kadar tam
   tur eklenir (pusulayı çevirme animasyonu). */
function turnTo(current, target, extraTurns) {
  let diff = (target - (current % 360)) % 360;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  const turns = extraTurns || 0;
  return current + diff + turns * 360;
}

/* midiToFreq: MIDI nota numarasını Hz'e çevirir (A4 = 69 = 440 Hz). */
function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/* ROUTE_TUNES: her rotanın ezgisi. Nota: [başlangıç(s), MIDI, süre(s)].
   voice ses rengini seçer (DOM tarafındaki playTune yorumlar); air:true
   ezginin altına rüzgâr hışırtısı ekler. Ürünler kendi işinin sesini
   taşır: havalandırma yükselen bir esinti, soğuk hava kristal çan,
   puantaj mesai saatinin düzenli tıkırtısı. */
const ROUTE_TUNES = {
  hvac: { voice: "flute", air: true, notes: [[0, 74, 0.5], [0.14, 78, 0.5], [0.28, 81, 0.55], [0.44, 86, 0.9]] },
  cold: { voice: "bell", notes: [[0, 88, 1.2], [0.16, 83, 1.2], [0.32, 80, 1.3], [0.5, 76, 1.6]] },
  puantaj: { voice: "pluck", notes: [[0, 79, 0.12], [0.12, 79, 0.12], [0.24, 79, 0.12], [0.36, 84, 0.12], [0.5, 83, 0.12], [0.62, 79, 0.5]] },
  services: { voice: "pluck", notes: [[0, 72, 0.18], [0.08, 76, 0.18], [0.16, 79, 0.18], [0.24, 84, 0.18], [0.32, 88, 0.18], [0.4, 91, 0.4]] },
  pricing: { voice: "coin", notes: [[0, 83, 0.08], [0.08, 88, 0.55], [0.42, 95, 0.4]] },
  demo: { voice: "horn", notes: [[0, 67, 0.14], [0.15, 72, 0.14], [0.3, 76, 0.14], [0.45, 79, 0.75]] },
  faq: { voice: "flute", notes: [[0, 76, 0.22], [0.22, 74, 0.22], [0.44, 81, 0.6, 1]] },
  process: { voice: "bell", notes: [[0, 60, 1.4], [0, 72, 0.4], [0.22, 74, 0.4], [0.44, 76, 0.4], [0.66, 79, 0.9]] }
};

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
        cold: contactForm.getAttribute("data-product-cold"),
        puantaj: contactForm.getAttribute("data-product-puantaj")
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

/* --- Keşif haritası: iğne, rota ışınları, pusulayı çevirme, rota ezgileri.
   Kartlar JS'siz de düz bağlantıdır; burası yalnız zenginleştirme. Ses
   varsayılan KAPALI, yalnız kullanıcı anahtarı açınca çalar (tarayıcı
   otomatik oynatma kuralı da bunu gerektirir); tercih localStorage'da
   tutulur, depolama yoksa sessizce varsayılana döner. --- */
if (typeof document !== "undefined") {
  (function initCompassMap() {
    var map = document.querySelector("[data-chart]");
    if (!map) return;
    var compass = document.getElementById("compass");
    var needle = document.getElementById("compass-needle");
    var cards = Array.prototype.slice.call(map.querySelectorAll(".map-card"));
    var rays = Array.prototype.slice.call(map.querySelectorAll(".map-ray"));
    var toggle = document.getElementById("sound-toggle");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var rotation = 0;
    var spinning = false;
    var resetTimer = null;
    var lastSpin = -1;

    /* --- Ses motoru (Web Audio, dosya yok) --- */
    var AudioCtor = window.AudioContext || window.webkitAudioContext;
    var audio = null;
    var master = null;
    var currentBus = null;
    var lastTune = { key: null, at: 0 };
    var soundOn = false;
    try { soundOn = window.localStorage.getItem("dp-route-tunes") === "on"; } catch (e) { soundOn = false; }

    var ensureAudio = function () {
      if (!AudioCtor) return null;
      if (!audio) {
        audio = new AudioCtor();
        master = audio.createGain();
        master.gain.value = 0.22;
        /* Hafif yankı: kısa gecikme + geri besleme, "açık deniz" havası. */
        var delay = audio.createDelay();
        delay.delayTime.value = 0.23;
        var feedback = audio.createGain();
        feedback.gain.value = 0.28;
        var wet = audio.createGain();
        wet.gain.value = 0.3;
        master.connect(audio.destination);
        master.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(wet);
        wet.connect(audio.destination);
      }
      if (audio.state === "suspended") audio.resume();
      return audio;
    };

    var voiceNote = function (bus, voice, start, midi, dur, bend) {
      var freq = midiToFreq(midi);
      var t0 = audio.currentTime + 0.02 + start;
      var env = audio.createGain();
      var osc = audio.createOscillator();
      var peak = 0.5;
      var attack = 0.02;
      var out = env;
      if (voice === "flute") { osc.type = "sine"; attack = 0.05; peak = 0.55; }
      else if (voice === "bell") { osc.type = "triangle"; attack = 0.003; peak = 0.5; }
      else if (voice === "pluck") { osc.type = "square"; attack = 0.003; peak = 0.22; }
      else if (voice === "coin") { osc.type = "square"; attack = 0.002; peak = 0.18; }
      else if (voice === "horn") { osc.type = "sawtooth"; attack = 0.04; peak = 0.28; }
      else { osc.type = "sine"; attack = 0.25; peak = 0.35; }
      osc.frequency.setValueAtTime(freq, t0);
      if (bend) osc.frequency.exponentialRampToValueAtTime(freq * Math.pow(2, bend / 12), t0 + dur);
      if (voice === "pluck" || voice === "horn") {
        var filter = audio.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(voice === "pluck" ? 2400 : 1500, t0);
        filter.frequency.exponentialRampToValueAtTime(500, t0 + dur + 0.1);
        env.connect(filter);
        out = filter;
      }
      if (voice === "flute" || voice === "mist" || voice === "horn") {
        var lfo = audio.createOscillator();
        var depth = audio.createGain();
        lfo.frequency.value = voice === "mist" ? 4.5 : 5.5;
        depth.gain.value = freq * 0.006;
        lfo.connect(depth);
        depth.connect(osc.frequency);
        lfo.start(t0);
        lfo.stop(t0 + dur + 0.6);
      }
      env.gain.setValueAtTime(0.0001, t0);
      env.gain.exponentialRampToValueAtTime(peak, t0 + attack);
      env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + (voice === "bell" ? 0.4 : 0.15));
      osc.connect(env);
      out.connect(bus);
      osc.start(t0);
      osc.stop(t0 + dur + 0.6);
      if (voice === "bell") {
        /* Çan rengi: uyumsuz üst kısmi (×2.76) kısa ve hafif. */
        var partial = audio.createOscillator();
        var pEnv = audio.createGain();
        partial.type = "sine";
        partial.frequency.value = freq * 2.76;
        pEnv.gain.setValueAtTime(0.0001, t0);
        pEnv.gain.exponentialRampToValueAtTime(0.12, t0 + 0.003);
        pEnv.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * 0.5);
        partial.connect(pEnv);
        pEnv.connect(bus);
        partial.start(t0);
        partial.stop(t0 + dur);
      }
    };

    var breeze = function (bus, start, dur) {
      var len = Math.floor(audio.sampleRate * dur);
      var buffer = audio.createBuffer(1, len, audio.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      var src = audio.createBufferSource();
      src.buffer = buffer;
      var band = audio.createBiquadFilter();
      band.type = "bandpass";
      band.Q.value = 1.2;
      var t0 = audio.currentTime + 0.02 + start;
      band.frequency.setValueAtTime(400, t0);
      band.frequency.exponentialRampToValueAtTime(2600, t0 + dur * 0.7);
      var env = audio.createGain();
      env.gain.setValueAtTime(0.0001, t0);
      env.gain.exponentialRampToValueAtTime(0.35, t0 + dur * 0.4);
      env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.connect(band);
      band.connect(env);
      env.connect(bus);
      src.start(t0);
      src.stop(t0 + dur);
    };

    var playTune = function (key) {
      var tune = ROUTE_TUNES[key];
      if (!soundOn || !tune || !ensureAudio()) return;
      var now = Date.now();
      if (lastTune.key === key && now - lastTune.at < 700) return;
      lastTune = { key: key, at: now };
      /* Önceki ezgiyi kısa bir sönümle sustur; üst üste binmesin. */
      if (currentBus) {
        currentBus.gain.setTargetAtTime(0.0001, audio.currentTime, 0.04);
      }
      var bus = audio.createGain();
      bus.connect(master);
      currentBus = bus;
      if (tune.air) breeze(bus, 0, 1.1);
      tune.notes.forEach(function (n) { voiceNote(bus, tune.voice, n[0], n[1], n[2], n[3]); });
    };

    var tick = function (at, pitch) {
      var t0 = audio.currentTime + at;
      var osc = audio.createOscillator();
      var env = audio.createGain();
      osc.type = "square";
      osc.frequency.value = pitch;
      env.gain.setValueAtTime(0.0001, t0);
      env.gain.exponentialRampToValueAtTime(0.08, t0 + 0.002);
      env.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.03);
      osc.connect(env);
      env.connect(master);
      osc.start(t0);
      osc.stop(t0 + 0.05);
    };

    /* Pusula dönerken cırcır sesi: aralıklar giderek uzar, iğneyle
       birlikte yavaşlar. */
    var ratchet = function (duration) {
      if (!soundOn || !ensureAudio()) return;
      var t = 0;
      var gap = 0.03;
      while (t < duration * 0.92) {
        tick(t, 1800 + Math.random() * 300);
        t += gap;
        gap *= 1.11;
      }
    };

    /* --- İğne ve vurgu --- */
    var setNeedle = function (angle, turns) {
      rotation = turnTo(rotation, angle, turns);
      needle.style.transform = "rotate(" + rotation + "deg)";
    };
    var highlight = function (index) {
      cards.forEach(function (card, i) { card.classList.toggle("is-active", i === index); });
      rays.forEach(function (ray, i) { ray.classList.toggle("is-active", i === index); });
      map.classList.toggle("is-pointing", index > -1);
    };
    var pointTo = function (index) {
      if (spinning) return;
      clearTimeout(resetTimer);
      setNeedle(Number(cards[index].getAttribute("data-angle")), 0);
      highlight(index);
      playTune(cards[index].getAttribute("data-tune"));
    };
    var releaseNeedle = function () {
      if (spinning) return;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        highlight(-1);
        setNeedle(0, 0);
      }, 120);
    };

    cards.forEach(function (card, index) {
      card.addEventListener("mouseenter", function () { pointTo(index); });
      card.addEventListener("focus", function () { pointTo(index); });
      card.addEventListener("mouseleave", releaseNeedle);
      card.addEventListener("blur", releaseNeedle);
    });

    if (compass) {
      compass.addEventListener("click", function () {
        if (spinning) return;
        var index;
        do { index = Math.floor(Math.random() * cards.length); } while (cards.length > 1 && index === lastSpin);
        lastSpin = index;
        var duration = reduceMotion ? 0 : 2.6;
        spinning = true;
        clearTimeout(resetTimer);
        highlight(-1);
        map.classList.add("is-pointing");
        compass.classList.toggle("is-spinning", !reduceMotion);
        setNeedle(Number(cards[index].getAttribute("data-angle")), reduceMotion ? 0 : 3);
        ratchet(duration);
        setTimeout(function () {
          spinning = false;
          compass.classList.remove("is-spinning");
          highlight(index);
          playTune(cards[index].getAttribute("data-tune"));
          resetTimer = setTimeout(function () { highlight(-1); setNeedle(0, 0); }, 4000);
        }, duration * 1000 + 50);
      });
    }

    /* --- Ses anahtarı: Web Audio yoksa hiç gösterilmez --- */
    if (toggle && AudioCtor) {
      var label = toggle.querySelector(".sound-toggle-label");
      var render = function () {
        toggle.setAttribute("aria-pressed", soundOn ? "true" : "false");
        if (label) label.textContent = toggle.getAttribute(soundOn ? "data-label-on" : "data-label-off");
      };
      toggle.hidden = false;
      render();
      toggle.addEventListener("click", function () {
        soundOn = !soundOn;
        try { window.localStorage.setItem("dp-route-tunes", soundOn ? "on" : "off"); } catch (e) { /* depolama yok: yalnız bu oturum */ }
        render();
        if (soundOn) {
          ensureAudio();
          lastTune.key = null;
          playTune("process");
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
    buildMailtoUrl,
    turnTo,
    midiToFreq,
    ROUTE_TUNES
  };
}
