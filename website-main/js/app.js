/**
 * App.js – simple interactivity for the index site
 * Countdown timers and smooth scroll for anchor links
 */

(function () {
  'use strict';

  // Countdown display for elements with .countdown and data-start (ISO date)
  function updateCountdowns() {
    var now = new Date();
    document.querySelectorAll('.countdown[data-start]').forEach(function (el) {
      var startStr = el.getAttribute('data-start');
      if (!startStr) return;
      var start = new Date(startStr);
      if (start <= now) {
        el.textContent = 'Started';
        return;
      }
      var diff = start - now;
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      if (days > 0) {
        el.textContent = days + 'd ' + hours + 'h ' + mins + 'm';
      } else if (hours > 0) {
        el.textContent = hours + 'h ' + mins + 'm';
      } else {
        el.textContent = mins + 'm';
      }
    });
  }

  // Run countdown every minute
  updateCountdowns();
  setInterval(updateCountdowns, 60000);

  // Smooth scroll for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var id = anchor.getAttribute('href');
    if (id === '#') return;
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Header nav scroll arrows
  var navInner = document.querySelector('.header-nav-inner');
  var arrowLeft = document.querySelector('.nav-arrow-left');
  var arrowRight = document.querySelector('.nav-arrow-right');
  if (navInner && arrowLeft && arrowRight) {
    var scrollStep = 200;
    arrowLeft.addEventListener('click', function () {
      navInner.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });
    arrowRight.addEventListener('click', function () {
      navInner.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });
  }

  // BINARY view buttons: toggle active state
  document.querySelectorAll('.binary-view-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.binary-view-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
})();
