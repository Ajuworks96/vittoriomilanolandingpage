/**
 * VITTORIO MILANO — MAIN JS
 * Header scroll states, Mobile Navigation Drawer, Form interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initBookingForm();
  initSmoothScroll();
  initContactModal();
});

/**
 * 01. Sticky Header Translucent State
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 02. Mobile Navigation Drawer Toggle
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = () => {
    const isActive = drawer.classList.contains('active');
    if (isActive) {
      drawer.classList.remove('active');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('active');
      toggleBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * 03. Booking Form Handler
 */
function initBookingForm() {
  const form = document.querySelector('.luxury-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>CONFIRMING FITTING...</span>';

    setTimeout(() => {
      submitBtn.style.backgroundColor = '#25D366';
      submitBtn.style.borderColor = '#25D366';
      submitBtn.style.color = '#FFFFFF';
      submitBtn.innerHTML = '<span>FITTING REQUESTED ✓</span>';

      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.borderColor = '';
        submitBtn.style.color = '';
        submitBtn.innerHTML = originalText;
      }, 4000);
    }, 1200);
  });
}

/**
 * 04. Smooth Scroll for Anchor Links (excluding #contact which triggers modal)
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      if (targetId === '#contact') return; // Handled by Contact Modal Popup

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 05. Bespoke Luxury Contact Modal Popup System
 */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;

  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const doneBtn = document.getElementById('modal-done-btn');
  const popupForm = document.getElementById('popup-consultation-form');
  const successView = document.getElementById('modal-success-view');
  const serviceSelect = document.getElementById('modal-service');

  const openModal = (prefillService = '') => {
    // If mobile drawer was open, close it cleanly
    const drawer = document.querySelector('.mobile-nav-drawer');
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    if (drawer && drawer.classList.contains('active')) {
      drawer.classList.remove('active');
      if (toggleBtn) toggleBtn.classList.remove('active');
    }

    // Reset views
    if (popupForm) popupForm.style.display = 'block';
    if (successView) successView.style.display = 'none';

    // Auto-prefill service if triggered from a specific commission card
    if (prefillService && serviceSelect) {
      const lower = prefillService.toLowerCase();
      if (lower.includes('executive') || lower.includes('boardroom')) {
        serviceSelect.value = 'boardroom';
      } else if (lower.includes('evening') || lower.includes('tuxedo')) {
        serviceSelect.value = 'evening';
      } else if (lower.includes('ceremonial') || lower.includes('wedding')) {
        serviceSelect.value = 'ceremonial';
      } else if (lower.includes('classic') || lower.includes('wardrobe')) {
        serviceSelect.value = 'wardrobe';
      } else if (lower.includes('statement')) {
        serviceSelect.value = 'statement';
      }
    }

    modal.style.display = 'flex';
    requestAnimationFrame(() => {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstInput = modal.querySelector('input');
      if (firstInput) firstInput.focus();
    });
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.style.display = 'none';
      if (popupForm) {
        popupForm.reset();
        popupForm.style.display = 'block';
      }
      if (successView) successView.style.display = 'none';
    }, 350);
  };

  // Close handlers
  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (doneBtn) doneBtn.addEventListener('click', closeModal);

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach modal trigger to all CTA buttons and links
  const triggerLinks = document.querySelectorAll('a[href="#contact"], .open-consultation-modal');

  triggerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Check if button is inside a product card to detect category
      let prefill = '';
      const productCard = link.closest('.product-card');
      if (productCard) {
        const titleEl = productCard.querySelector('.product-title');
        if (titleEl) prefill = titleEl.textContent;
      }

      openModal(prefill);
    });
  });

  // Handle popup form submission
  if (popupForm) {
    popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = popupForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>CONFIRMING FITTING...</span>';

      setTimeout(() => {
        popupForm.style.display = 'none';
        if (successView) successView.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }, 1000);
    });
  }
}
