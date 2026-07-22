/* ============================================================
   ELEXONS.CH — MAIN JAVASCRIPT
   main.js | Version 1.0
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky Header ── */
  const header = document.querySelector('.header');
  if (header) {
    function updateHeader() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
        header.classList.remove('transparent');
      } else {
        header.classList.remove('scrolled');
        if (header.dataset.transparent === 'true') {
          header.classList.add('transparent');
        }
      }
    }
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ── Mobile Menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');

  function openMenu() {
    hamburger && hamburger.classList.add('open');
    mobileMenu && mobileMenu.classList.add('open');
    overlay && overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger && hamburger.classList.remove('open');
    mobileMenu && mobileMenu.classList.remove('open');
    overlay && overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay && overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu__link').forEach(l => l.addEventListener('click', closeMenu));

  /* ── Hero Image Animation ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Reveal on Scroll ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── Lazy Loading Images ── */
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length > 0) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          lazyObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImages.forEach(img => lazyObserver.observe(img));
  }

  /* ── Counter Animation ── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || el.textContent.replace(/[^\d.]/g, ''));
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    const isInt = Number.isInteger(target);

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      el.textContent = (isInt ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  /* ── Smooth Scroll for anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .mobile-menu__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── WhatsApp Floating Button ── */
  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/41799109999';
  waBtn.className = 'whatsapp-float';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.setAttribute('aria-label', 'WhatsApp');
  waBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="#fff">
    <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.467 2.027 7.773L.062 31.123l7.523-1.966A15.937 15.937 0 0016 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 01-6.772-1.853l-.486-.289-5.036 1.317 1.341-4.898-.316-.502A13.266 13.266 0 012.667 16C2.667 8.635 8.635 2.667 16 2.667S29.333 8.635 29.333 16 23.365 29.333 16 29.333zm7.27-9.916c-.4-.2-2.358-1.163-2.724-1.295-.366-.133-.633-.2-.9.2-.266.4-1.033 1.295-1.266 1.561-.233.267-.466.3-.866.1-.4-.2-1.686-.62-3.21-1.98-1.186-1.058-1.987-2.365-2.22-2.765-.234-.4-.025-.616.175-.815.18-.178.4-.466.6-.7.2-.233.267-.4.4-.666.134-.267.067-.5-.033-.7-.1-.2-.9-2.162-1.233-2.961-.325-.78-.655-.674-.9-.686-.233-.012-.5-.015-.766-.015-.267 0-.7.1-1.067.5-.366.4-1.4 1.366-1.4 3.328s1.434 3.861 1.634 4.128c.2.267 2.822 4.307 6.836 6.036.956.412 1.701.659 2.283.844.959.306 1.833.263 2.523.16.77-.114 2.358-.963 2.69-1.894.333-.932.333-1.73.234-1.895-.1-.166-.367-.266-.767-.466z"/>
  </svg>`;
  document.body.appendChild(waBtn);

  /* ── Back / Home Button (on subpages) ── */
  const isSubpage = currentPath !== '' && currentPath !== 'index.html';
  if (isSubpage) {
    const backBtn = document.createElement('a');
    backBtn.href = 'index.html';
    backBtn.className = 'home-float';
    backBtn.setAttribute('aria-label', 'Zur Startseite');
    backBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>`;
    document.body.appendChild(backBtn);
  }

  /* ── Desktop Dropdown (hover with delay — prevents gap-close) ── */
  document.querySelectorAll('.nav__dropdown').forEach(el => {
    let t;
    el.addEventListener('mouseenter', () => {
      clearTimeout(t);
      el.classList.add('is-open');
    });
    el.addEventListener('mouseleave', () => {
      t = setTimeout(() => el.classList.remove('is-open'), 220);
    });
  });

  /* ── Mobile Services Accordion ── */
  const mobToggle = document.getElementById('mobServicesToggle');
  const mobList = document.getElementById('mobServicesList');
  if (mobToggle && mobList) {
    mobToggle.addEventListener('click', () => {
      const isOpen = mobList.classList.toggle('open');
      mobToggle.classList.toggle('open', isOpen);
    });
  }

})();
