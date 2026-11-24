(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Mobile navigation */
  var toggle = $('.nav-toggle'), nav = $('#site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* Header state + reading progress */
  var header = $('.site-header'), bar = $('#progress-bar');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Project tabs */
  var tabs = $$('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) { p.hidden = !on; p.classList.toggle('active', on); }
      });
    });
  });

  /* Experience segments */
  var segs = $$('.seg-btn');
  segs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-seg');
      segs.forEach(function (b) { b.classList.toggle('active', b === btn); });
      $$('.seg-panel').forEach(function (p) {
        var on = p.getAttribute('data-panel') === key;
        p.hidden = !on; p.classList.toggle('active', on);
      });
    });
  });

  /* Publication filter + search */
  var filters = $$('.filter'), pubs = $$('.pub'), search = $('#pub-search'), empty = $('.no-results');
  var current = 'all';
  function applyPubs() {
    var q = (search && search.value || '').trim().toLowerCase(), shown = 0;
    pubs.forEach(function (p) {
      var okStatus = current === 'all' || p.getAttribute('data-status') === current;
      var okText = !q || p.textContent.toLowerCase().indexOf(q) !== -1;
      var show = okStatus && okText;
      p.classList.toggle('hidden', !show);
      if (show) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      current = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.classList.toggle('active', b === btn); });
      applyPubs();
    });
  });
  if (search) search.addEventListener('input', applyPubs);

  /* Active nav link + reveal */
  if ('IntersectionObserver' in window) {
    var links = $$('.site-nav a[href^="#"]'), map = {};
    links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (l) { l.classList.remove('active'); });
          map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var rev = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -6% 0px' });
      $$('.tile, .pipeline li, .toolbox > div, .side-projects article, .degree, .quote, .doc, .info-card, .section-head').forEach(function (el) {
        el.classList.add('reveal'); rev.observe(el);
      });

      /* Count-up stats */
      var counted = false;
      var statObs = new IntersectionObserver(function (entries) {
        if (counted || !entries[0].isIntersecting) return;
        counted = true;
        $$('[data-count]').forEach(function (el) {
          var end = +el.getAttribute('data-count'), t0 = null;
          function step(ts) {
            if (!t0) t0 = ts;
            var k = Math.min((ts - t0) / 1100, 1);
            el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      });
      var st = $('.stats'); if (st) statObs.observe(st);
    }
  }

  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
