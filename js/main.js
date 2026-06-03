/**
 * Finca de Garces — main.js
 * Vanilla JS, progressive enhancement only.
 * Site remains fully readable with JS disabled.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    // ── 1. HEADER SCROLL SHADOW ───────────────────────────────────────────
    const initHeaderScroll = () => {
      const header = document.querySelector('.site-header');
      if (!header) return;

      const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // run once on load in case page starts mid-scroll
    };

    // ── 2. MOBILE NAV TOGGLE ──────────────────────────────────────────────
    const initMobileNav = () => {
      const toggle  = document.querySelector('.nav-toggle');
      const nav     = document.querySelector('.site-nav');
      const overlay = document.querySelector('.nav-overlay');

      if (!toggle || !nav) return;

      const openNav = () => {
        toggle.setAttribute('aria-expanded', 'true');
        nav.classList.add('open');
        overlay && overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      };

      const closeNav = () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        overlay && overlay.classList.remove('active');
        document.body.style.overflow = '';
      };

      toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeNav() : openNav();
      });

      // Close on overlay click
      overlay && overlay.addEventListener('click', closeNav);

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          closeNav();
          toggle.focus();
        }
      });

      // Close nav when a nav link is clicked (single-page navigation feel)
      nav.querySelectorAll('.site-nav__link').forEach((link) => {
        link.addEventListener('click', () => {
          if (toggle.getAttribute('aria-expanded') === 'true') {
            closeNav();
          }
        });
      });
    };

    // ── 3. ACTIVE NAV LINK ────────────────────────────────────────────────
    const initActiveNav = () => {
      const navLinks = document.querySelectorAll('.site-nav__link');
      if (!navLinks.length) return;

      // Normalize pathname: strip trailing slash, lowercase
      const normalizePath = (path) => {
        const lower = path.toLowerCase();
        // Treat both "/" and "/index.html" as home
        if (lower === '/' || lower === '/index.html' || lower === '') return '/';
        return lower.replace(/\/$/, '');
      };

      const current = normalizePath(window.location.pathname);

      navLinks.forEach((link) => {
        const href = normalizePath(new URL(link.href, window.location.origin).pathname);
        if (href === current) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    };

    // ── 4. SCROLL REVEAL (IntersectionObserver) ───────────────────────────
    const initScrollReveal = () => {
      const elements = document.querySelectorAll('.reveal');
      if (!elements.length) return;

      // Respect prefers-reduced-motion: show all immediately
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        elements.forEach((el) => el.classList.add('visible'));
        return;
      }

      if (!('IntersectionObserver' in window)) {
        // Fallback for very old browsers
        elements.forEach((el) => el.classList.add('visible'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // reveal once only
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -60px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));
    };

    // ── 5. SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────────────
    const initSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const id = anchor.getAttribute('href');
          if (id === '#') return;

          const target = document.querySelector(id);
          if (!target) return;

          e.preventDefault();

          const headerHeight = parseInt(
            getComputedStyle(document.documentElement)
              .getPropertyValue('--header-height') || '72',
            10
          );

          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

          window.scrollTo({ top, behavior: 'smooth' });

          // Move focus to target for a11y
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        });
      });
    };

    // ── 6. CONTACT FORM HANDLING ──────────────────────────────────────────
    const initContactForm = () => {
      const form = document.querySelector('form#inquiry-form');
      if (!form) return;

      const feedback = form.parentElement
        ? form.parentElement.querySelector('.form-feedback')
        : null;

      // Helper: get field + its error element
      const getField = (name) => ({
        input: form.querySelector(`[name="${name}"]`),
        error: form.querySelector(`[data-error="${name}"]`),
      });

      const showError = (errorEl, message) => {
        if (!errorEl) return;
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      };

      const clearError = (errorEl) => {
        if (!errorEl) return;
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      };

      const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

      const validate = () => {
        let valid = true;

        const fields = [
          { name: 'name',    message: 'Please enter your name.' },
          { name: 'email',   message: 'Please enter a valid email address.' },
          { name: 'role',    message: 'Please let us know who you are.' },
          { name: 'message', message: 'Please include a message.' },
        ];

        fields.forEach(({ name, message }) => {
          const { input, error } = getField(name);
          if (!input) return;

          const value = input.value.trim();
          let fieldValid = value.length > 0;

          if (name === 'email' && fieldValid) {
            fieldValid = isValidEmail(value);
          }

          if (!fieldValid) {
            showError(error, message);
            valid = false;
          } else {
            clearError(error);
          }
        });

        return valid;
      };

      // Clear error on user input
      form.querySelectorAll('input, select, textarea').forEach((field) => {
        field.addEventListener('input', () => {
          const errorEl = form.querySelector(`[data-error="${field.name}"]`);
          clearError(errorEl);
        });
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear any previous feedback
        if (feedback) {
          feedback.classList.remove('success', 'error');
          feedback.style.display = '';
        }

        if (!validate()) return;

        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending…';
        }

        const action = form.getAttribute('action');

        // If no real action configured, show a friendly fallback message
        if (!action || action.trim() === '' || action.includes('TODO')) {
          // Simulate brief delay for perceived send
          await new Promise((resolve) => setTimeout(resolve, 800));

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }

          if (feedback) {
            feedback.textContent =
              'Thank you for your message. We’re not quite set up to receive submissions online yet — please reach us directly at hello@fincadegarces.com.';
            feedback.classList.add('error');
          }
          return;
        }

        // Real submission
        try {
          const response = await fetch(action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' },
          });

          if (response.ok) {
            form.style.display = 'none';
            if (feedback) {
              feedback.textContent =
                'Thank you — your message reached us. We’ll be in touch soon.';
              feedback.classList.add('success');
            }
          } else {
            throw new Error(`Server responded with status ${response.status}`);
          }
        } catch (err) {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }

          if (feedback) {
            feedback.textContent =
              'Something went wrong on our end. Please try again or email us directly at hello@fincadegarces.com.';
            feedback.classList.add('error');
          }

          // eslint-disable-next-line no-console
          console.error('[FDG] Form submission error:', err);
        }
      });
    };

    // ── INIT ALL ──────────────────────────────────────────────────────────
    initHeaderScroll();
    initMobileNav();
    initActiveNav();
    initScrollReveal();
    initSmoothScroll();
    initContactForm();
  });
})();
