/* =========================================================
   Inko GmbH — Gemeinsames JavaScript
   Navigation, Scroll-Reveal, Galerie-Filter, Kontaktformular
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Mobile Navigation ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.querySelector('.nav__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Menü schließen, wenn ein Link geklickt wird (Mobile)
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll-Reveal Animation ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: alles sichtbar
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Galerie-Filter ---------- */
  var filterBtns = document.querySelectorAll('.filter__btn');
  var galleryItems = document.querySelectorAll('.gallery__item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        galleryItems.forEach(function (item) {
          var cat = item.getAttribute('data-category');
          var show = filter === 'alle' || cat === filter;
          item.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ---------- Kontaktformular (Demo-Validierung) ---------- */
  var form = document.querySelector('.form');
  var status = document.querySelector('.form__status');

  if (form && status) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.textContent =
        'Vielen Dank für Ihre Nachricht! Wir melden uns zeitnah bei Ihnen.';
      status.classList.add('is-visible');
      form.reset();
      setTimeout(function () {
        status.classList.remove('is-visible');
      }, 6000);
    });
  }

  /* ---------- Aktuelles Jahr im Footer ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
