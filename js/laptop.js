/* ==========================================================================
   LAPTOP MODE
   A tiny window manager. It re-uses the exact same app containers as the
   phone (experienceC, todoAppC, ...): opening an app just moves that
   container into a draggable window; closing it moves it back to storage.
   ========================================================================== */
(function () {
  'use strict';

  var DOCK_H = 72; // keep in sync with --dock-h in laptop.css

  // c = container id, w/h = preferred window size, bg = window background theme.
  var APPS = {
    experience: { title: 'Experience', c: 'experienceC', w: 680, h: 540, bg: 'purple' },
    education: { title: 'Education', c: 'educationC', w: 620, h: 480, bg: 'purple' },
    skills: { title: 'Skills', c: 'skillsC', w: 640, h: 520, bg: 'purple' },
    projects: { title: 'Projects', c: 'projectsC', w: 800, h: 560, bg: 'purple' },
    messages: { title: 'Messages', c: 'messagesC', w: 400, h: 560, bg: 'dark', init: function () { window.initMessagesApp && window.initMessagesApp(); } },
    music: { title: 'Music', c: 'musicAppC', w: 380, h: 440, bg: 'purple', init: function () { initMusicPlayer(); } },
    photos: { title: 'Photos', c: 'photosAppC', w: 580, h: 480, bg: 'dark', init: function () { loadPhotos(); } },
    notes: { title: 'Notes', c: 'notesAppC', w: 460, h: 380, bg: 'dark', init: function () { loadNote(); } },
    weather: { title: 'Weather', c: 'weatherAppC', w: 360, h: 380, bg: 'weather', init: function () { fetchWeather(); } },
    calculator: { title: 'Calculator', c: 'calculatorAppC', w: 320, h: 480, bg: 'dark' },
    todo: { title: 'Todo List', c: 'todoAppC', w: 400, h: 520, bg: 'purple' },
    books: { title: 'Books', c: 'booksAppC', w: 580, h: 560, bg: 'dark', init: function () { loadBooks(); } }
  };
  var DOCK_GROUPS = [
    ['experience', 'education', 'skills', 'projects'],
    ['messages'],
    ['music', 'photos', 'notes', 'weather', 'calculator', 'todo', 'books']
  ];

  var wins = {};      // key -> { el, cfg }
  var zTop = 10;
  var focusedKey = null;
  var mq = window.matchMedia(window.LAPTOP_QUERY);

  var screenEl, desktop, layer, store, dock, mbApp, deviceScreen;

  function $(s, r) { return (r || document).querySelector(s); }
  function mk(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function isLaptop() { return document.documentElement.dataset.mode === 'laptop'; }
  function cont(id) { return document.getElementById(APPS[id].c); }

  /* ---------- Dock ---------- */
  function buildDock() {
    DOCK_GROUPS.forEach(function (group, gi) {
      if (gi) dock.appendChild(mk('span', 'dock-sep'));
      group.forEach(function (id) {
        var b = mk('button', 'dock-item',
          '<img alt="" data-img-kind="icons" data-img-key="' + id + '">' +
          '<span class="dock-tip">' + APPS[id].title + '</span><i class="dock-dot"></i>');
        b.type = 'button';
        b.dataset.app = id;
        b.setAttribute('aria-label', 'Open ' + APPS[id].title);
        b.addEventListener('click', function () { openApp(id); });
        dock.appendChild(b);
      });
    });
  }

  function updateDock() {
    dock.querySelectorAll('.dock-item').forEach(function (b) {
      var w = wins[b.dataset.app];
      b.classList.toggle('open', !!w);
      b.classList.toggle('min', !!w && w.el.classList.contains('min'));
    });
  }

  /* ---------- Windows ---------- */
  function focusWin(key) {
    var w = wins[key];
    if (!w) return;
    focusedKey = key;
    w.el.style.zIndex = ++zTop;
    Object.keys(wins).forEach(function (k) { wins[k].el.classList.toggle('focused', k === key); });
    mbApp.textContent = w.title;
    updateDock();
  }

  function focusTopmost() {
    var best = null;
    Object.keys(wins).forEach(function (k) {
      if (wins[k].el.classList.contains('min')) return;
      if (!best || +wins[k].el.style.zIndex > +wins[best].el.style.zIndex) best = k;
    });
    if (best) focusWin(best);
    else { focusedKey = null; mbApp.textContent = 'Desktop'; updateDock(); }
  }

  function makeWindow(key, title, pw, ph, bg) {
    var dw = desktop.clientWidth, dh = desktop.clientHeight - DOCK_H;
    var w = Math.min(pw, dw - 30), h = Math.min(ph, dh - 20);
    var n = Object.keys(wins).length % 6;
    var x = clamp(70 + n * 34, 8, Math.max(8, dw - w - 8));
    var y = clamp(18 + n * 28, 6, Math.max(6, dh - h));

    var win = mk('div', 'win',
      '<div class="win-bar"><div class="lights">' +
      '<button type="button" class="l close" aria-label="Close"></button>' +
      '<button type="button" class="l min" aria-label="Minimize"></button>' +
      '<button type="button" class="l max" aria-label="Maximize"></button></div>' +
      '<div class="win-title"></div></div><div class="win-body"></div>' +
      ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(function (d) {
        return '<i class="rz rz-' + d + '" data-dir="' + d + '"></i>';
      }).join(''));
    win.dataset.bg = bg || 'dark';
    $('.win-title', win).textContent = title;
    win.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;';
    layer.appendChild(win);

    var entry = { el: win, body: $('.win-body', win), title: title, cfg: {} };
    wins[key] = entry;

    win.addEventListener('pointerdown', function () { if (focusedKey !== key) focusWin(key); });
    $('.close', win).addEventListener('click', function () { closeWin(key); });
    $('.min', win).addEventListener('click', function () { win.classList.add('min'); focusTopmost(); });
    $('.max', win).addEventListener('click', function () { win.classList.toggle('max'); });
    bindDrag(win, $('.win-bar', win));
    bindResize(win);
    focusWin(key);
    return entry;
  }

  function bindDrag(win, bar) {
    bar.addEventListener('dblclick', function (e) {
      if (!e.target.closest('.l')) win.classList.toggle('max');
    });
    bar.addEventListener('pointerdown', function (e) {
      if (e.button || e.target.closest('.l') || win.classList.contains('max')) return;
      var sx = e.clientX, sy = e.clientY, ox = win.offsetLeft, oy = win.offsetTop;
      bar.setPointerCapture(e.pointerId);
      win.classList.add('dragging');
      function move(ev) {
        var dw = desktop.clientWidth, dh = desktop.clientHeight;
        win.style.left = clamp(ox + ev.clientX - sx, 140 - win.offsetWidth, dw - 140) + 'px';
        win.style.top = clamp(oy + ev.clientY - sy, 0, dh - 44) + 'px';
      }
      function up() {
        bar.removeEventListener('pointermove', move);
        bar.removeEventListener('pointerup', up);
        bar.removeEventListener('pointercancel', up);
        win.classList.remove('dragging');
      }
      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', up);
      bar.addEventListener('pointercancel', up);
    });
  }

  function bindResize(win) {
    win.querySelectorAll('.rz').forEach(function (h) {
      h.addEventListener('pointerdown', function (e) {
        if (e.button || win.classList.contains('max')) return;
        e.preventDefault();
        e.stopPropagation();
        var dir = h.dataset.dir, sx = e.clientX, sy = e.clientY;
        var r = { l: win.offsetLeft, t: win.offsetTop, w: win.offsetWidth, h: win.offsetHeight };
        h.setPointerCapture(e.pointerId);
        win.classList.add('dragging');
        function move(ev) {
          var dx = ev.clientX - sx, dy = ev.clientY - sy, l = r.l, t = r.t, w = r.w, hh = r.h;
          if (dir.indexOf('e') > -1) w = Math.max(300, r.w + dx);
          if (dir.indexOf('s') > -1) hh = Math.max(200, r.h + dy);
          if (dir.indexOf('w') > -1) { w = Math.max(300, r.w - dx); l = r.l + (r.w - w); }
          if (dir.indexOf('n') > -1) { hh = Math.max(200, r.h - dy); t = Math.max(0, r.t + (r.h - hh)); }
          win.style.left = l + 'px'; win.style.top = t + 'px';
          win.style.width = w + 'px'; win.style.height = hh + 'px';
        }
        function up() {
          h.removeEventListener('pointermove', move);
          h.removeEventListener('pointerup', up);
          h.removeEventListener('pointercancel', up);
          win.classList.remove('dragging');
        }
        h.addEventListener('pointermove', move);
        h.addEventListener('pointerup', up);
        h.addEventListener('pointercancel', up);
      });
    });
  }

  function closeWin(key) {
    var w = wins[key];
    if (!w) return;
    if (w.cfg.c) {
      var c = document.getElementById(w.cfg.c);
      c.style.display = 'none';
      store.appendChild(c);
    }
    if (key === 'photos') {
      var lb = document.getElementById('photoLightbox');
      if (lb) { lb.style.display = 'none'; store.appendChild(lb); }
    }
    w.el.remove();
    delete wins[key];
    if (focusedKey === key) focusTopmost(); else updateDock();
  }

  function closeAll() { Object.keys(wins).forEach(closeWin); }

  function openApp(id) {
    if (!APPS[id]) return;
    var w = wins[id];
    if (w) {
      w.el.classList.remove('min');
      focusWin(id);
      return;
    }
    var cfg = APPS[id];
    var entry = makeWindow(id, cfg.title, cfg.w, cfg.h, cfg.bg);
    entry.cfg = cfg;
    var c = cont(id);
    entry.body.appendChild(c);
    c.style.display = ''; // let the stylesheet decide (flex/grid)
    if (id === 'photos') {
      var lb = document.getElementById('photoLightbox');
      if (lb) { lb.style.display = 'none'; entry.body.appendChild(lb); }
    }
    if (cfg.init) { try { cfg.init(); } catch (err) { console.error(err); } }
  }

  // Local projects (e.g. the drawing app) open in a window instead of a new tab.
  function openEmbed(id, title, url) {
    var key = 'embed:' + id;
    if (wins[key]) { wins[key].el.classList.remove('min'); focusWin(key); return; }
    var entry = makeWindow(key, title, 880, 580, 'dark');
    var f = mk('iframe', 'win-embed');
    f.src = url;
    f.title = title;
    entry.body.appendChild(f);
  }

  /* ---------- Phone <-> laptop switching ---------- */
  function parkAll() {
    Object.keys(APPS).forEach(function (id) {
      var c = cont(id);
      c.style.display = 'none';
      store.appendChild(c);
    });
    var lb = document.getElementById('photoLightbox');
    if (lb) { lb.style.display = 'none'; store.appendChild(lb); }
    var modal = document.getElementById('emailModal');
    if (modal) screenEl.appendChild(modal);
  }

  function restorePhone() {
    Object.keys(APPS).forEach(function (id) {
      var c = cont(id);
      c.style.display = 'none';
      deviceScreen.appendChild(c);
    });
    ['photoLightbox', 'emailModal'].forEach(function (id) {
      var e = document.getElementById(id);
      if (e) { e.style.display = 'none'; deviceScreen.appendChild(e); }
    });
    if (window.resetToHome) window.resetToHome();
  }

  function rebuildWidgets() {
    ['createStoryGraphWidget', 'createMusicWidget', 'createQuotesWidget'].forEach(function (fn) {
      if (typeof window[fn] === 'function') window[fn]();
    });
  }

  function onModeChange() {
    var next = mq.matches ? 'laptop' : 'phone';
    if (next === document.documentElement.dataset.mode) return;
    closeAll();
    if (window.resetToHome) window.resetToHome();
    document.documentElement.dataset.mode = next;
    if (next === 'laptop') parkAll(); else restorePhone();
    rebuildWidgets();
    window.applySiteImages();
  }

  /* ---------- Login + clock ---------- */
  function setupLogin() {
    var ls = document.getElementById('loginScreen');
    if (!ls) return;
    var dots = ls.querySelectorAll('.login-dots span');
    var hint = $('.login-hint', ls);
    var started = false;
    function go() {
      if (started) return;
      started = true;
      hint.textContent = 'Welcome back';
      var i = 0;
      var t = setInterval(function () {
        if (i < dots.length) { dots[i++].classList.add('filled'); return; }
        clearInterval(t);
        ls.classList.add('hide');
        setTimeout(function () {
          ls.remove();
          if (isLaptop()) (window.LAPTOP_AUTO_OPEN || []).forEach(openApp);
        }, 450);
      }, 200);
    }
    ls.addEventListener('click', go);
    ls.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') go(); });
  }

  function tickClock() {
    var el = document.getElementById('mbClock');
    if (el) el.textContent = new Date().toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    screenEl = document.getElementById('laptop-screen');
    if (!screenEl) return;
    desktop = document.getElementById('desktop');
    layer = document.getElementById('windows');
    store = document.getElementById('app-store');
    dock = document.getElementById('dock');
    mbApp = document.getElementById('mbApp');
    deviceScreen = document.getElementById('device-screen');

    buildDock();
    setupLogin();
    tickClock();
    setInterval(tickClock, 15000);

    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-open]');
      if (o && isLaptop()) { openApp(o.dataset.open); return; }
      var m = e.target.closest('[data-embed]');
      if (m && isLaptop()) { e.preventDefault(); openEmbed(m.dataset.embed, m.dataset.title, m.getAttribute('href')); }
    });

    if (isLaptop()) parkAll();
    window.applySiteImages();

    if (mq.addEventListener) mq.addEventListener('change', onModeChange);
    else mq.addListener(onModeChange);
  });
})();
