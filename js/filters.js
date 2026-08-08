/**
 * VITTORIO MILANO — FILTERS & INTERACTIVE COMPONENTS
 * Collection category filters, Fabric swatches, and Process timeline switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  initCollectionFilters();
  initProcessSwitcher();
});

/**
 * 01. Signature Collection Category Filter
 */
function initCollectionFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * 02. Bespoke Process Step Switcher
 */
function initProcessSwitcher() {
  const steps = document.querySelectorAll('.process-step');
  const detailTitle = document.getElementById('process-detail-title');
  const detailDesc = document.getElementById('process-detail-desc');
  const detailImage = document.getElementById('process-detail-img');

  if (!steps.length || !detailTitle) return;

  const stepData = [
    {
      title: "01. Sartorial Consultation",
      desc: "An intimate initial meeting with our Master Tailor to understand your lifestyle, wardrobe requirements, and personal aesthetic preference.",
      img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "02. Fabric & Styling Selection",
      desc: "Select from over 3,500 prestigious cloths from Loro Piana, Scabal, Dormeuil, and Zegna, paired with natural horn buttons and silk linings.",
      img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "03. Hand Pattern Draft",
      desc: "A individual paper pattern is drafted entirely from scratch based on 26 precise body measurements and posture observations.",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "04. Basted Fitting",
      desc: "The suit is loosely hand-basted together for your first fitting. Shoulder angle, drape, and length are adjusted to perfection.",
      img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "05. Artisan Hand Sewing",
      desc: "Over 5,000 hand stitches construct the floating canvas, lapels, and hand-worked buttonholes over 60 hours of craftsmanship.",
      img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "06. Final Fitting & Delivery",
      desc: "Your completed masterpiece is presented in a handcrafted cedar suit case, ready to elevate your personal style legacy.",
      img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
    }
  ];

  steps.forEach((step, idx) => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const data = stepData[idx];
      if (data) {
        detailTitle.textContent = data.title;
        detailDesc.textContent = data.desc;
        if (detailImage) detailImage.src = data.img;
      }
    });
  });
}
