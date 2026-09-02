/* ═══════════════════════════════════════════════════════════════════════
   LDT INC — navigation framework
   Stage 1 / Stage 2 only: section awareness, chrome inversion, INDEX.
   No reveal or scroll-choreography system yet (Stage 3).
   Scrolling stays native — nothing here intercepts wheel or touch.
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var root     = document.documentElement;
  var chrome   = document.getElementById('chrome');
  var counter  = document.querySelector('[data-current]');
  var fields   = Array.prototype.slice.call(document.querySelectorAll('.field'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-section]'));
  var spineLinks = Array.prototype.slice.call(document.querySelectorAll('.spine__link'));

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Section awareness ─────────────────────────────────────────────── */

  var lastTheme = null;
  var lastIndex = -1;
  var ticking = false;

  function fieldAt(y) {
    for (var i = fields.length - 1; i >= 0; i--) {
      var r = fields[i].getBoundingClientRect();
      if (r.top <= y && r.bottom > y) return fields[i];
    }
    return fields[0] || null;
  }

  function sectionIndexAt(y) {
    var index = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= y) index = i;
    }
    return index;
  }

  function update() {
    ticking = false;

    /* Chrome inverts against whichever field sits beneath the top bar. */
    var probe = chrome ? chrome.getBoundingClientRect().height * 0.5 : 28;
    var field = fieldAt(probe);
    if (field) {
      var theme = field.classList.contains('field--light') ? 'light' : 'dark';
      if (theme !== lastTheme) {
        root.setAttribute('data-chrome', theme);
        lastTheme = theme;
      }
    }

    /* Active section drives the spine and the mobile counter. */
    var idx = sectionIndexAt(window.innerHeight * 0.42);
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      idx = sections.length - 1;
    }
    if (idx !== lastIndex) {
      for (var i = 0; i < spineLinks.length; i++) {
        spineLinks[i].classList.toggle('is-active', i === idx);
        if (i === idx) spineLinks[i].setAttribute('aria-current', 'true');
        else spineLinks[i].removeAttribute('aria-current');
      }
      if (counter) counter.textContent = '0' + idx;
      lastIndex = idx;
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('load', update);
  update();

  /* ── INDEX overlay ─────────────────────────────────────────────────── */

  var overlay   = document.getElementById('index-overlay');
  var openBtn   = document.getElementById('index-open');
  var closeBtn  = document.getElementById('index-close');
  var lastFocus = null;
  var closeTimer = null;

  var FOCUSABLE = 'a[href], button:not([disabled])';

  function openIndex() {
    if (!overlay || !overlay.hidden) return;
    window.clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    overlay.hidden = false;
    root.style.overflow = 'hidden';
    openBtn.setAttribute('aria-expanded', 'true');
    window.requestAnimationFrame(function () { overlay.classList.add('is-open'); });
    if (closeBtn) closeBtn.focus();
  }

  function closeIndex(restore) {
    if (!overlay || overlay.hidden) return;
    overlay.classList.remove('is-open');
    root.style.overflow = '';
    openBtn.setAttribute('aria-expanded', 'false');
    closeTimer = window.setTimeout(function () { overlay.hidden = true; }, 200);
    if (restore !== false && lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (openBtn)  openBtn.addEventListener('click', openIndex);
  if (closeBtn) closeBtn.addEventListener('click', function () { closeIndex(true); });

  document.addEventListener('keydown', function (e) {
    if (!overlay || overlay.hidden) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeIndex(true);
      return;
    }

    if (e.key === 'Tab') {
      var items = Array.prototype.slice.call(overlay.querySelectorAll(FOCUSABLE));
      if (!items.length) return;
      var first = items[0];
      var last  = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* Index entries close the overlay, then move to the section. */
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('.index__list a') : null;
      if (!link) return;
      e.preventDefault();
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      closeIndex(false);
      if (target) {
        target.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
        if (history.replaceState) history.replaceState(null, '', '#' + id);
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  }
})();


/* ═══════════════════════════════════════════════════════════════════════
   MOTION  ·  Stage 3
   Three classes, and they behave differently on purpose.

     A  SIGNATURE     the opening. Once per load, never on re-entry.
     B  READING       state is derived from scroll position every frame, so a
                      statement unfolds as it is read, reverses when the
                      reader goes back, and is never "finished".
     C  CONSTRUCTION  arrival. Completes and rests, then re-arms once the
                      reader has genuinely left the section — far enough that
                      small movements at the boundary cannot make it chatter.

   Native scroll only: nothing here intercepts wheel or touch. One rAF-gated
   pass drives everything, reading geometry for a curated set of elements.
   Without JS, or with reduced motion, the page is the approved Stage 2.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root    = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Preparation ───────────────────────────────────────────────────── */

  /* Split into words without disturbing the markup around them: text nodes
     are walked in place, so <strong> and the copy itself are untouched. */
  function splitWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) if (n.nodeValue.trim()) nodes.push(n);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(function (tok) {
        if (!tok.length) return;
        if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
        var s = document.createElement('span');
        s.className = 'w';
        s.textContent = tok;
        frag.appendChild(s);
      });
      node.parentNode.replaceChild(frag, node);
    });
    var words = el.querySelectorAll('.w');
    for (var i = 0; i < words.length; i++) words[i].style.setProperty('--wi', i);
    el.style.setProperty('--n', words.length);
    return words.length;
  }

  function clip(el) {
    if (el.querySelector('.m-clip')) return;
    var inner = document.createElement('span');
    while (el.firstChild) inner.appendChild(el.firstChild);
    var outer = document.createElement('span');
    outer.className = 'm-clip';
    outer.appendChild(inner);
    el.appendChild(outer);
  }

  /* ── B · the curated reading set ───────────────────────────────────── */
  /* Only statements the reader is meant to move through. Everything else
     is left as body copy. */
  var READ = [
    { sel: '.hero__statement',        unit: 'word' },
    { sel: '#core .lead',             unit: 'word' },
    { sel: '.dimensions',             unit: '.dimensions__term' },
    { sel: '#core .reading--offset p strong', unit: 'word', quiet: true },
    { sel: '.credits',                unit: '.credits__item' },
    { sel: '.anchor',                 unit: 'word' },
    { sel: '#workshops .lead',        unit: 'word' },
    { sel: '.contact__availability',  unit: 'word' }
  ];

  var readers = [];
  READ.forEach(function (r) {
    Array.prototype.forEach.call(document.querySelectorAll(r.sel), function (el) {
      var n;
      if (r.unit === 'word') {
        n = splitWords(el);
      } else {
        var kids = el.querySelectorAll(r.unit);
        n = kids.length;
        for (var i = 0; i < kids.length; i++) {
          kids[i].classList.add('runit');
          kids[i].style.setProperty('--wi', i);
        }
        el.style.setProperty('--n', n);
      }
      if (!n) return;
      el.setAttribute('data-read', '');
      readers.push({ el: el, p: -1 });
    });
  });

  /* ── C · the construction set ──────────────────────────────────────── */
  var PLAN = [
    { sel: '.section-head', head: true, mask: ['.section-head__num', '.section-head__title'] },
    { sel: '.hero__name', mask: ['.hero__name-line'] },
    { sel: '.scroll-cue', mode: 'cue', once: true },

    { sel: '#core .reading' },
    { sel: '.dimensions', build: true },

    { sel: '#focus .indexed', stagger: '.indexed__item', step: 60 },

    { sel: '#track .lead', mask: true },
    { sel: '.track__label' },
    { sel: '.track__narrative', stagger: 'p', step: 40 },
    { sel: '.track__note', from: 200 },

    { sel: '#transformation .lead', mask: true },
    { sel: '#transformation .reading', stagger: 'p', step: 90 },
    { sel: '.layers', build: true, stagger: '.layers__item', from: 300, step: 90 },
    { sel: '#transformation .indexed', stagger: '.indexed__item', step: 55 },

    { sel: '#workshops .reading', stagger: 'p', step: 90 },
    { sel: '.framework', stagger: '.framework__item', step: 90 },
    { sel: '.formats', stagger: '.formats__item', step: 110 },
    { sel: '.fieldmap', build: true, stagger: '.fieldmap__node', from: 560, step: 60 },
    { sel: '.modes', stagger: '.modes__row', step: 80 },

    { sel: '.subsection__title' },
    { sel: '.contact__list', stagger: '.contact__row', step: 130, from: 180 },
    { sel: '.cmark', build: true },
    { sel: '.footer__inner' }
  ];

  var builds = [];
  PLAN.forEach(function (rule) {
    Array.prototype.forEach.call(document.querySelectorAll(rule.sel), function (el) {
      var parts = null;

      if (rule.mask === true) { clip(el); el.setAttribute('data-m', 'mask'); }
      else if (!rule.mask && !rule.stagger && !rule.mode) el.setAttribute('data-m', '');

      if (Array.isArray(rule.mask)) {
        parts = [];
        rule.mask.forEach(function (s) {
          Array.prototype.forEach.call(el.querySelectorAll(s), function (p) { parts.push(p); });
        });
        if (!parts.length) return;
        parts.forEach(function (p, i) {
          clip(p);
          p.setAttribute('data-m', 'mask');
          p.style.setProperty('--m-delay', (i * 110) + 'ms');
        });
      }

      if (rule.stagger) {
        var kids = Array.prototype.slice.call(el.querySelectorAll(rule.stagger));
        kids.forEach(function (k, i) {
          k.setAttribute('data-m', '');
          k.style.setProperty('--m-delay', ((rule.from || 0) + i * (rule.step || 70)) + 'ms');
        });
        parts = (parts || []).concat(kids);
      }

      if (rule.from && !rule.stagger) el.style.setProperty('--m-delay', rule.from + 'ms');
      if (rule.build) el.classList.add('m-built');
      if (rule.head)  el.classList.add('m-head');
      if (rule.mode === 'cue') el.setAttribute('data-m', 'cue');

      builds.push({ el: el, parts: parts, on: false, once: !!rule.once, doneT: 0 });
    });
  });

  /* The Contact signature assembles in the approved order. Same component
     set and same sequence as the opening; only the timing is tighter,
     because it arrives inside a section rather than over a black field. */
  (function () {
    var STEP = { 1: 0, 2: 300, 3: 640, 4: 1060 }, seen = {};
    Array.prototype.forEach.call(document.querySelectorAll('.cmark__part'), function (el) {
      var k = el.getAttribute('data-step');
      seen[k] = (seen[k] || 0);
      el.style.setProperty('--m-delay', (STEP[k] + seen[k] * 100) + 'ms');
      seen[k]++;
    });
  })();

  /* ── Reduced motion: everything resolves now, nothing is tracked ───── */
  if (reduced.matches) {
    builds.forEach(function (b) {
      b.el.classList.add('is-in', 'is-done');
      if (b.parts) b.parts.forEach(function (p) { p.classList.add('is-in', 'is-done'); });
    });
    var op = document.querySelector('.opening');
    if (op) op.parentNode.removeChild(op);
    return;
  }

  /* ── One shared driver ─────────────────────────────────────────────── */

  var vh = window.innerHeight;
  var ticking = false, lastY = window.scrollY, lastT = Date.now();

  function setIn(b, on, instant) {
    if (b.on === on) return;
    b.on = on;
    var m = on ? 'add' : 'remove';
    if (instant && on) {
      b.el.classList.add('is-instant');
      if (b.parts) b.parts.forEach(function (p) { p.classList.add('is-instant'); });
    }
    b.el.classList[m]('is-in');
    if (b.parts) b.parts.forEach(function (p) { p.classList[m]('is-in'); });
    if (!on) {
      b.el.classList.remove('is-done', 'is-instant');
      if (b.parts) b.parts.forEach(function (p) { p.classList.remove('is-done', 'is-instant'); });
    } else {
      b.doneT = Date.now() + 1500;
    }
  }

  function update() {
    ticking = false;
    var fast = root.classList.contains('is-fast');
    var now = Date.now();
    var i, r, rect;

    /* B — progress is a position, not an event, so it is simply read off
       the geometry each pass and applies equally in both directions. */
    for (i = 0; i < readers.length; i++) {
      r = readers[i];
      rect = r.el.getBoundingClientRect();
      if (rect.bottom < -vh || rect.top > vh * 2) continue;
      var span = rect.height + vh * 0.42;
      var p = (vh * 0.80 - rect.top) / span;
      p = p < 0 ? 0 : (p > 1 ? 1 : p);
      if (Math.abs(p - r.p) > 0.004) {
        r.p = p;
        r.el.style.setProperty('--p', p.toFixed(3));
      }
    }

    /* C — arrival, with hysteresis wide enough that a boundary wobble
       cannot re-trigger anything. */
    for (i = 0; i < builds.length; i++) {
      var b = builds[i];
      rect = b.el.getBoundingClientRect();
      var enter = rect.top < vh * 0.94 && rect.bottom > vh * 0.06;
      if (enter) {
        setIn(b, true, fast || rect.bottom < 0);
      } else if (b.on && !b.once) {
        /* a full viewport clear of the section before it may play again */
        if (rect.bottom < -vh * 0.85 || rect.top > vh * 1.85) setIn(b, false);
      }
      if (b.on && b.doneT && now > b.doneT) {
        b.doneT = 0;
        b.el.classList.add('is-done');
        if (b.parts) b.parts.forEach(function (p) { p.classList.add('is-done'); });
      }
    }
  }

  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    var now = Date.now(), dt = now - lastT;
    if (dt > 16) {
      var v = Math.abs(window.scrollY - lastY) / dt;
      lastY = window.scrollY; lastT = now;
      if (v > 2.0) {
        root.classList.add('is-fast');
        window.clearTimeout(onScroll._t);
        onScroll._t = window.setTimeout(function () { root.classList.remove('is-fast'); }, 240);
      }
    }
    if (window.scrollY > 8) root.classList.add('has-scrolled');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    vh = window.innerHeight;
    for (var i = 0; i < readers.length; i++) readers[i].p = -1;
    update();
  }, { passive: true });

  update();
  window.addEventListener('load', update);
  if (document.fonts) document.fonts.ready.then(function () { vh = window.innerHeight; update(); });

  /* ── A · the opening ───────────────────────────────────────────────── */
  (function () {
    var op = document.querySelector('.opening');
    if (!op) return;

    root.classList.add('is-opening');

    /* 1 the structure · 2 the curve · 3 the three components · 4 INC. */
    var STEP = { 1: 0, 2: 480, 3: 1020, 4: 1680 };
    var seen = {};
    Array.prototype.forEach.call(op.querySelectorAll('.opening__part'), function (p) {
      var s = p.getAttribute('data-step');
      seen[s] = (seen[s] || 0);
      p.style.setProperty('--m-delay', (STEP[s] + seen[s] * 120) + 'ms');
      seen[s]++;
    });

    var timers = [];
    function at(ms, fn) { timers.push(window.setTimeout(fn, ms)); }

    function clear() {
      timers.forEach(window.clearTimeout);
      op.classList.add('is-set');
      root.classList.remove('is-opening');
      op.classList.add('is-out');
      window.setTimeout(function () {
        op.hidden = true;
        if (op.parentNode) op.parentNode.removeChild(op);
        update();
      }, 800);
    }

    at(220,  function () { op.classList.add('is-armed'); });
    /* the assembled mark holds before it gives way */
    at(2900, function () { op.classList.add('is-set'); });
    at(3560, function () { root.classList.remove('is-opening'); op.classList.add('is-out'); });
    at(4420, function () {
      op.hidden = true;
      if (op.parentNode) op.parentNode.removeChild(op);
      update();
    });

    /* It is an opening, not a gate: any intent to read cuts it short. */
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (ev) {
      window.addEventListener(ev, function once() {
        ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (e2) {
          window.removeEventListener(e2, once);
        });
        if (!op.parentNode) return;
        clear();
      }, { passive: true, once: false });
    });
  })();
})();
