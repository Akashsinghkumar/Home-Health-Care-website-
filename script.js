/**
 * SHRISTY HOME HEALTH CARE
 * Core Application Logic & GSAP Animations
 * Pure Vanilla JavaScript + Bootstrap 5 + GSAP 3 + ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize GSAP & ScrollTrigger
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    initGsapAnimations();
  }

  // 2. Initialize Bootstrap Components
  initBootstrapComponents();

  // 3. Setup Booking & Enquiry Form Handler (WhatsApp Direct)
  initBookingForm();

  // 4. Setup Dynamic Stats Counter
  initStatsCounter();

  // 5. Setup Care Pillars Interactive Filter
  initCarePillarsFilter();

  // 6. Global Failsafe: Ensure all cards & services are 100% visible across the site
  ensureElementsVisible();
});

/**
 * Robust GSAP Visual & Scroll Animations
 * Uses clearProps: 'all', once: true, and early trigger thresholds so content is never hidden
 */
function initGsapAnimations() {
  // Refresh ScrollTrigger when images load to recalculate true page coordinates
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
    ensureElementsVisible();
  });

  document.querySelectorAll('img').forEach(img => {
    if (img.complete) return;
    img.addEventListener('load', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, { once: true });
  });

  // Hero Tag & Quote
  const topTags = document.querySelectorAll('.hero-tag, .hero-tag-quote');
  if (topTags.length > 0) {
    gsap.from(topTags, {
      opacity: 0,
      y: -15,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }

  // Hero Content Direct Reveal Over Banner
  const heroContent = document.querySelectorAll('.hero-content-direct, .hero-h1, .hero-p, .hero-cta-flex, .trust-strip-hero');
  if (heroContent.length > 0) {
    gsap.from(heroContent, {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.12,
      delay: 0.15,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }

  // Hero Pillar Mini Cards Stagger
  const miniCards = document.querySelectorAll('.hero-pillar-mini-card');
  if (miniCards.length > 0) {
    gsap.from(miniCards, {
      opacity: 0,
      x: 20,
      duration: 0.7,
      stagger: 0.12,
      delay: 0.45,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }

  // Scroll Button Animation & Click Smooth Scroll
  const scrollBtn = document.getElementById('heroScrollBtn');
  if (scrollBtn) {
    gsap.from(scrollBtn, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.7,
      ease: 'power2.out',
      clearProps: 'all'
    });

    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('care-pillars') || document.getElementById('about');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Core Pillars Showcase Scroll Trigger
  const pillarCards = document.querySelectorAll('.pillar-showcase-card');
  if (pillarCards.length > 0) {
    gsap.from(pillarCards, {
      scrollTrigger: {
        trigger: '#care-pillars',
        start: 'top 95%',
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }

  // Service Cards (OUR CARE SERVICES) Scroll Trigger
  const serviceCards = document.querySelectorAll('.service-card-bs');
  if (serviceCards.length > 0) {
    gsap.from(serviceCards, {
      scrollTrigger: {
        trigger: '#services',
        start: 'top 95%',
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }

  // Exclusive Care Packages Animation
  const packageCards = document.querySelectorAll('.offer-mini-card, .offer-hero-floating-card, .package-card-premium');
  if (packageCards.length > 0) {
    gsap.from(packageCards, {
      scrollTrigger: {
        trigger: '#special-offers',
        start: 'top 95%',
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }

  // Process / Step Cards Animation
  const stepCards = document.querySelectorAll('.step-card-bs, .process-step-card');
  if (stepCards.length > 0) {
    const stepSection = document.getElementById('how-it-works') || (stepCards[0] ? stepCards[0].closest('section') : null);
    if (stepSection) {
      gsap.from(stepCards, {
        scrollTrigger: {
          trigger: stepSection,
          start: 'top 95%',
          once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }

  // Why Us / Feature Cards Animation
  const whyCards = document.querySelectorAll('.why-card-bs, .feature-card-premium');
  if (whyCards.length > 0) {
    const whySection = document.getElementById('why-us') || (whyCards[0] ? whyCards[0].closest('section') : null);
    if (whySection) {
      gsap.from(whyCards, {
        scrollTrigger: {
          trigger: whySection,
          start: 'top 95%',
          once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }

  // Testimonial Cards
  const testimonials = document.querySelectorAll('.testi-card-bs, .testimonial-card');
  if (testimonials.length > 0) {
    const testiSection = document.getElementById('testimonials') || (testimonials[0] ? testimonials[0].closest('section') : null);
    if (testiSection) {
      gsap.from(testimonials, {
        scrollTrigger: {
          trigger: testiSection,
          start: 'top 95%',
          once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }

  // Gallery Items Reveal
  const galleryItems = document.querySelectorAll('.gallery-card-bs, .gallery-card-item');
  if (galleryItems.length > 0) {
    const gallerySection = document.getElementById('gallery') || (galleryItems[0] ? galleryItems[0].closest('section') : null);
    if (gallerySection) {
      gsap.from(galleryItems, {
        scrollTrigger: {
          trigger: gallerySection,
          start: 'top 95%',
          once: true
        },
        opacity: 0,
        y: 25,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }

  // FAQ Accordion Cards
  const faqItems = document.querySelectorAll('.accordion-item');
  if (faqItems.length > 0) {
    const faqSection = document.getElementById('faq') || (faqItems[0] ? faqItems[0].closest('.accordion') || faqItems[0].closest('section') : null);
    if (faqSection) {
      gsap.from(faqItems, {
        scrollTrigger: {
          trigger: faqSection,
          start: 'top 95%',
          once: true
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }
}

/**
 * Universal Failsafe: Guarantees no card or section is ever left invisible
 * Executes at startup, after timeouts, and on scroll
 */
function ensureElementsVisible() {
  const criticalSelectors = [
    '.service-card-bs',
    '.pillar-showcase-card',
    '.offer-mini-card',
    '.offer-hero-floating-card',
    '.step-card-bs',
    '.why-card-bs',
    '.testi-card-bs',
    '.gallery-card-bs',
    '.accordion-item',
    '.service-detail-box-bs',
    '.hero-pillar-mini-card',
    '.hero-content-direct',
    '.trust-strip-hero'
  ];

  const clearStuck = () => {
    criticalSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el.style.opacity === '0') {
          el.style.opacity = '1';
        }
        if (el.style.visibility === 'hidden') {
          el.style.visibility = 'visible';
        }
        if (el.style.transform && el.style.transform.includes('translate') && el.style.opacity === '0') {
          el.style.transform = 'none';
        }
      });
    });
  };

  clearStuck();
  setTimeout(clearStuck, 400);
  setTimeout(clearStuck, 1000);
  setTimeout(clearStuck, 2500);
}

/**
 * Bootstrap 5 Utilities & Mobile Navbar Behavior
 */
function initBootstrapComponents() {
  // Auto-close mobile navbar on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarMain');

  if (navbarCollapse && typeof bootstrap !== 'undefined') {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // Active Navigation item detection based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href !== 'index.html') {
      link.classList.remove('active');
    }
  });
}

/**
 * Number Counter Animation for Trust Indicators
 */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('[data-counter-target]');
  if (statNumbers.length === 0) return;

  statNumbers.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-counter-target')) || 0;
    const prefix = stat.getAttribute('data-counter-prefix') || '';
    const suffix = stat.getAttribute('data-counter-suffix') || '';

    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          if (target % 1 !== 0) {
            stat.textContent = `${prefix}${obj.val.toFixed(1)}${suffix}`;
          } else {
            stat.textContent = `${prefix}${Math.floor(obj.val)}${suffix}`;
          }
        }
      });
    }
  });
}

/**
 * Caregiver Enquiry Form Handler (WhatsApp & Modal confirmation)
 */
function initBookingForm() {
  const forms = document.querySelectorAll('#careEnquiryForm');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const service = form.querySelector('#enquiryService')?.value || 'General Home Care';
      const shift = form.querySelector('#enquiryShift')?.value || '12-Hour Shift';
      const patient = form.querySelector('#patientDetails')?.value || 'Not specified';
      const name = form.querySelector('#userName')?.value || 'Valued Family';
      const phone = form.querySelector('#userPhone')?.value || '';
      const locality = form.querySelector('#userLocality')?.value || 'Patna';
      const notes = form.querySelector('#userMessage')?.value || 'None';

      // Format WhatsApp Message
      const waMessage = 
`*New Caregiver Enquiry - Shristy Home Health Care*
----------------------------------------
👤 *Family Contact:* ${name}
📞 *Phone:* ${phone}
📍 *Location / Area:* ${locality}
🏷️ *Required Service:* ${service}
⏰ *Preferred Shift:* ${shift}
🩺 *Patient Details:* ${patient}
📝 *Specific Notes:* ${notes}
----------------------------------------
_Sent via Shristy Home Care Website_`;

      const encodedMessage = encodeURIComponent(waMessage);
      const whatsappUrl = `https://wa.me/910987654321?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      // Visual feedback on button
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-check2-circle"></i> Opening WhatsApp...';
        submitBtn.classList.add('btn-success');
        submitBtn.classList.remove('btn-teal');

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.classList.remove('btn-success');
          submitBtn.classList.add('btn-teal');
        }, 3500);
      }
    });
  });
}

/**
 * Care Pillars Interactive Category Filter
 */
function initCarePillarsFilter() {
  const filterBtns = document.querySelectorAll('.care-filter-btn');
  const pillarCols = document.querySelectorAll('#carePillarsGrid .pillar-card-col');

  if (filterBtns.length === 0 || pillarCols.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-pillar-filter');

      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      pillarCols.forEach(col => {
        const cat = col.getAttribute('data-pillar-cat');
        const card = col.querySelector('.pillar-showcase-card');
        
        if (filter === 'all' || cat === filter) {
          col.classList.remove('d-none');
          if (card) {
            card.style.opacity = '1';
            card.style.visibility = 'visible';
          }
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(col, 
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'opacity,transform' }
            );
          }
        } else {
          col.classList.add('d-none');
        }
      });
    });
  });
}

