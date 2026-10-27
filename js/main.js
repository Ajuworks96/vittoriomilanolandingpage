/**
 * VITTORIO MILANO — MAIN JS
 * Header scroll states, Mobile Navigation Drawer, Form interactions
 * Dual Integration: vm.enquires@gmail.com + Google Sheet (VM Leads)
 */

// Google Sheet Webhook Configuration (Bound to Sheet: 104sYL4M5wIJbJ6PiZlLUDfFAXXODoPFfmQAnX6gDP4c)
const GOOGLE_SHEET_WEBAPP_URL = window.VM_GOOGLE_SHEET_URL || "";
const ENQUIRY_EMAIL_ENDPOINT = "https://formsubmit.co/ajax/vm.enquires@gmail.com";

/**
 * Dispatches lead data to the deployed Google Apps Script Web App
 */
async function recordLeadToGoogleSheet(leadData) {
  if (!GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_WEBAPP_URL.includes("PASTE_YOUR_APPS_SCRIPT_URL_HERE")) {
    console.info("Google Sheet Webhook URL awaiting deployment. Leads dispatched via FormSubmit.");
    return;
  }
  try {
    await fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(leadData)
    });
    console.log("Lead successfully transmitted to Google Sheet.");
  } catch (err) {
    console.warn("Google Sheet sync dispatch note:", err);
  }
}

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
 * 02. Mobile Navigation Drawer Toggle & Close Handlers
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    if (toggleBtn) toggleBtn.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    if (toggleBtn) toggleBtn.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (drawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/**
 * 03. Booking Form Handler
 */
function initBookingForm() {
  const form = document.querySelector('.luxury-form.editorial-form') || document.querySelector('.editorial-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>CONFIRMING FITTING...</span>';

    const serviceSelect = form.querySelector('#service');
    const locationSelect = form.querySelector('#location');
    const timeSelect = form.querySelector('#time');

    const sheetPayload = {
      "Full Name": form.querySelector('#full-name')?.value || '',
      "Phone Number": form.querySelector('#phone')?.value || '',
      "Email Address": form.querySelector('#email')?.value || '',
      "Commission of Interest": serviceSelect ? (serviceSelect.options[serviceSelect.selectedIndex]?.text || serviceSelect.value) : '',
      "Preferred Venue": locationSelect ? (locationSelect.options[locationSelect.selectedIndex]?.text || locationSelect.value) : '',
      "Preferred Date": form.querySelector('#date')?.value || 'Not specified',
      "Preferred Time": timeSelect ? (timeSelect.options[timeSelect.selectedIndex]?.text || timeSelect.value) : '',
      "Sartorial Vision / Notes": form.querySelector('#notes')?.value || 'None provided',
      "Source": "Website Suite Form (Section)"
    };

    const payload = {
      ...sheetPayload,
      "_subject": `New Vittorio Milano Consultation: ${sheetPayload["Full Name"] || 'VIP Client'}`,
      "_template": "table",
      "_captcha": "false"
    };

    // Parallel execution: Google Sheet sync + FormSubmit email delivery
    recordLeadToGoogleSheet(sheetPayload);

    try {
      await fetch(ENQUIRY_EMAIL_ENDPOINT, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn("FormSubmit transmission note:", err);
    }

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
    }, 4500);
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
    const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');
    if (drawer && drawer.classList.contains('active')) {
      drawer.classList.remove('active');
      if (toggleBtn) toggleBtn.classList.remove('active');
      if (drawerBackdrop) drawerBackdrop.classList.remove('active');
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
    popupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = popupForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>CONFIRMING FITTING...</span>';

      const serviceSelect = popupForm.querySelector('#modal-service');
      const locationSelect = popupForm.querySelector('#modal-location');

      const sheetPayload = {
        "Full Name": popupForm.querySelector('#modal-full-name')?.value || '',
        "Phone Number": popupForm.querySelector('#modal-phone')?.value || '',
        "Email Address": popupForm.querySelector('#modal-email')?.value || '',
        "Commission of Interest": serviceSelect ? (serviceSelect.options[serviceSelect.selectedIndex]?.text || serviceSelect.value) : '',
        "Preferred Venue": locationSelect ? (locationSelect.options[locationSelect.selectedIndex]?.text || locationSelect.value) : '',
        "Preferred Date": popupForm.querySelector('#modal-date')?.value || 'Not specified',
        "Preferred Time": "-",
        "Sartorial Vision / Notes": popupForm.querySelector('#modal-notes')?.value || 'None provided',
        "Source": "Modal Consultation Popup"
      };

      const payload = {
        ...sheetPayload,
        "_subject": `New Vittorio Milano Fitting Request (Modal): ${sheetPayload["Full Name"] || 'VIP Client'}`,
        "_template": "table",
        "_captcha": "false"
      };

      // Parallel execution: Google Sheet sync + FormSubmit email delivery
      recordLeadToGoogleSheet(sheetPayload);

      try {
        await fetch(ENQUIRY_EMAIL_ENDPOINT, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn("Modal FormSubmit transmission note:", err);
      }

      popupForm.style.display = 'none';
      if (successView) successView.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    });
  }
}
