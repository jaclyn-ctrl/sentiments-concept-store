/**
 * Custom Homepage Parallax Effects
 * Handles scroll-triggered animations and pull-up card effects
 */

class CustomHomepage {
  constructor() {
    this.init();
  }

  init() {
    this.setupStickyHeader();
    this.setupParallaxEffects();
    this.setupScrollAnimations();
  }

  setupStickyHeader() {
    const header = document.querySelector('.header-wrapper');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  setupParallaxEffects() {
    const heroBackground = document.querySelector('.custom-hero__background');
    if (!heroBackground) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const rate = scrollY * -0.5;
      
      /** @type {HTMLElement} */ (heroBackground).style.transform = `translateY(${rate}px)`;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  setupScrollAnimations() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    if (!parallaxSections.length) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    parallaxSections.forEach(section => {
      observer.observe(section);
    });

    // Smooth reveal animation for text elements
    const textElements = document.querySelectorAll('.custom-hero__content > *, .parallax-section__content > *');
    
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          /** @type {HTMLElement} */ (entry.target).style.opacity = '1';
          /** @type {HTMLElement} */ (entry.target).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    textElements.forEach((element, index) => {
      /** @type {HTMLElement} */ (element).style.opacity = '0';
      /** @type {HTMLElement} */ (element).style.transform = 'translateY(30px)';
      /** @type {HTMLElement} */ (element).style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
      textObserver.observe(element);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CustomHomepage();
});

// Handle theme editor updates
document.addEventListener('shopify:section:load', () => {
  new CustomHomepage();
});
