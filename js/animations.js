/**
 * VITTORIO MILANO — ANIMATIONS & REVEAL SYSTEM
 * Subtle IntersectionObserver scroll reveals & numerical counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initStatCounters();
});

/**
 * 01. Reveal On Scroll Animations
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (!revealElements.length || !('IntersectionObserver' in window)) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  // Inject helper CSS rule
  const style = document.createElement('style');
  style.innerHTML = `
    .reveal-on-scroll.revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * 02. Statistics Counter Animation
 */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetText = el.getAttribute('data-target') || el.textContent;
        const numericVal = parseInt(targetText.replace(/\D/g, ''), 10);
        const suffix = targetText.replace(/[0-9]/g, '');

        if (!isNaN(numericVal)) {
          let count = 0;
          const duration = 2000;
          const stepTime = 30;
          const increment = Math.ceil(numericVal / (duration / stepTime));

          const timer = setInterval(() => {
            count += increment;
            if (count >= numericVal) {
              el.textContent = numericVal + suffix;
              clearInterval(timer);
            } else {
              el.textContent = count + suffix;
            }
          }, stepTime);
        }

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}
