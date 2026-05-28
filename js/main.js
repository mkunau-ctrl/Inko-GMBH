/* Inko GmbH — gemeinsames JS */
(function () {
  'use strict';

  /* ---- Mobile Navigation ---- */
  var toggle = document.querySelector('.nav__toggle');
  var menu   = document.querySelector('.nav__menu');
  var mainNav = document.querySelector('.main-nav');

  if (toggle && menu && mainNav) {
    var setMenuTop = function () {
      var h = mainNav.getBoundingClientRect().height;
      menu.style.top = mainNav.offsetTop + h + 'px';
    };
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (open) setMenuTop();
    });
    menu.querySelectorAll('a').forEach(function (l) {
      l.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
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
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLB(); });
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
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ---- Feature Slider ---- */
  var sliderWrap = document.querySelector('.slider-wrap');
  var dotsWrap   = document.querySelector('.slider-dots');
  if (sliderWrap) {
    var track    = sliderWrap.querySelector('.slider-track');
    var slides   = sliderWrap.querySelectorAll('.slider-slide');
    var btnPrev  = sliderWrap.querySelector('.slider-btn--prev');
    var btnNext  = sliderWrap.querySelector('.slider-btn--next');
    var current  = 0;
    var dots     = [];

    function visibleCount() {
      var w = sliderWrap.offsetWidth;
      if (w < 500)  return 1;
      if (w < 820)  return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, slides.length - visibleCount());
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIndex()));
      var pct = (100 / visibleCount()) * current;
      track.style.transform = 'translateX(-' + pct + '%)';
      btnPrev.disabled = current === 0;
      btnNext.disabled = current === maxIndex();
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === current); });
    }

    // Build dots
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var d = document.createElement('button');
        d.className = 'slider-dot' + (i === 0 ? ' is-active' : '');
        d.setAttribute('aria-label', 'Folie ' + (i + 1));
        d.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(d);
        dots.push(d);
      });
    }

    btnPrev.addEventListener('click', function () { goTo(current - 1); });
    btnNext.addEventListener('click', function () { goTo(current + 1); });

    // Swipe support
    var touchStartX = 0;
    sliderWrap.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    sliderWrap.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
    }, { passive: true });

    // Re-calculate on resize
    window.addEventListener('resize', function () { goTo(current); });

    goTo(0);
  }
})();
