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
})();
