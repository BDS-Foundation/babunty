/**
 * Babunty Devi Sahani Foundation - Interactive Client Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Metric Counters Animation (IntersectionObserver)
  const metricNumbers = document.querySelectorAll('.metric-number[data-target]');
  if ('IntersectionObserver' in window && metricNumbers.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          if (!isNaN(target)) {
            animateCounter(el, target);
          }
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    metricNumbers.forEach(num => observer.observe(num));
  }

  function animateCounter(element, target) {
    let current = 0;
    const duration = 1600;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target >= 1000 ? `${target.toLocaleString()}+` : (target === 24 ? '24/7' : target.toString());
        clearInterval(timer);
      } else {
        const displayVal = Math.floor(current);
        element.textContent = target >= 1000 ? `${displayVal.toLocaleString()}+` : displayVal.toString();
      }
    }, stepTime);
  }

  // 4. Contact Form Validation and Submission UX
  const contactForm = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success-message');
  const resetBtn = document.getElementById('form-reset-btn');

  if (contactForm && successBox) {
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');
    const submitBtn = document.getElementById('form-submit-btn');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameGroup = nameInput.parentElement;
      if (!nameInput.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = emailInput.parentElement;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageGroup = messageInput.parentElement;
      if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
        messageGroup.classList.add('has-error');
        isValid = false;
      } else {
        messageGroup.classList.remove('has-error');
      }

      if (!isValid) {
        return;
      }

      // Simulated loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending message...';

      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'none';
        successBox.style.display = 'flex';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 700);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        successBox.style.display = 'none';
        contactForm.style.display = 'flex';
      });
    }

    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(input => {
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('has-error')) {
          input.parentElement.classList.remove('has-error');
        }
      });
    });
  }

  // 5. Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
