/* Inko GmbH — gemeinsames JS */
(function () {
  'use strict';

  /* ---- Scroll-aware Header ---- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile Drawer ---- */
  var toggle   = document.getElementById('nav-toggle');
  var drawer   = document.getElementById('nav-drawer');
  var backdrop = document.getElementById('nav-backdrop');

  function openDrawer() {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle && drawer && backdrop) {
    toggle.addEventListener('click', function () {
      drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
    });
    backdrop.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(function (l) {
      l.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /* ---- Scroll Reveal ---- */
  var revEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revEls.forEach(function (el) { io.observe(el); });
  } else {
    revEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Galerie-Filter ---- */
  var filterBtns = document.querySelectorAll('.filter__btn');
  var galItems   = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        galItems.forEach(function (item) {
          var cat = item.getAttribute('data-category');
          item.classList.toggle('is-hidden', filter !== 'alle' && cat !== filter);
        });
      });
    });
  }

  /* ---- Lightbox ---- */
  var lightbox = document.querySelector('.lightbox');
  var lbImg    = document.querySelector('.lightbox__img');
  var lbClose  = document.querySelector('.lightbox__close');
  if (lightbox && lbImg) {
    galItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var src = item.querySelector('img') ? item.querySelector('img').src : '';
        if (!src) return;
        lbImg.src = src;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLB() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      lbImg.src = '';
    }
    if (lbClose) lbClose.addEventListener('click', closeLB);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLB(); });
  }

  /* ---- Kontaktformular ---- */
  var form   = document.querySelector('.form');
  var status = document.querySelector('.form__status');
  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      status.textContent = 'Vielen Dank! Wir melden uns schnellstmöglich bei Ihnen.';
      status.classList.add('is-visible');
      form.reset();
      setTimeout(function () { status.classList.remove('is-visible'); }, 6000);
    });
  }

  /* ---- Jahreszahl ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- Feature Slider ---- */
  var sliderWrap    = document.querySelector('.slider-wrap');
  var progressEl    = document.querySelector('.slider-progress-fill');

  if (sliderWrap) {
    var track    = sliderWrap.querySelector('.slider-track');
    var slides   = sliderWrap.querySelectorAll('.slider-slide');
    var btnPrev  = sliderWrap.querySelector('.slider-btn--prev');
    var btnNext  = sliderWrap.querySelector('.slider-btn--next');
    var current  = 0;

    function visibleCount() {
      var w = sliderWrap.offsetWidth;
      if (w < 500) return 1;
      if (w < 820) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, slides.length - visibleCount());
    }

    function updateProgress() {
      if (!progressEl) return;
      var steps = maxIndex() + 1;
      var w = (100 / steps);
      progressEl.style.width  = w + '%';
      progressEl.style.left   = (current * w) + '%';
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIndex()));
      var pct = (100 / visibleCount()) * current;
      track.style.transform = 'translateX(-' + pct + '%)';
      btnPrev.disabled = current === 0;
      btnNext.disabled = current === maxIndex();
      updateProgress();
    }

    btnPrev.addEventListener('click', function () { goTo(current - 1); });
    btnNext.addEventListener('click', function () { goTo(current + 1); });

    /* Swipe */
    var touchStartX = 0;
    sliderWrap.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    sliderWrap.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });

    window.addEventListener('resize', function () { goTo(current); });

    goTo(0);
  }
})();
