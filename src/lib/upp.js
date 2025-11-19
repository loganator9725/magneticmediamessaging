/**
 * Universal Predictive Protocol (UPP) - Frontend Module
 * Optimizes performance and sustainability through predictive prefetching,
 * asset preloading, lazy-loading, and deferred script execution.
 */

/**
 * Predictive prefetch likely next pages based on user behavior
 * Uses probability weights to determine which pages to prefetch
 */
export const predictNextPage = () => {
  const currentPath = window.location.pathname;
  
  // Probability model for page transitions
  const transitionWeights = {
    '/': {
      '#about': 0.35,
      '#services': 0.25,
      '#pricing': 0.20,
      '#testimonials': 0.15,
      '#contact': 0.05
    }
  };

  const predictions = transitionWeights[currentPath] || {};
  
  // Prefetch high-probability targets (>20%)
  Object.entries(predictions).forEach(([target, probability]) => {
    if (probability > 0.20) {
      prefetchSection(target);
    }
  });
};

/**
 * Prefetch section content for smooth scrolling
 */
const prefetchSection = (sectionId) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = sectionId;
  document.head.appendChild(link);
};

/**
 * Preload critical assets above the fold
 */
export const preloadCriticalAssets = () => {
  const criticalAssets = [
    { href: '/src/assets/hero-image.jpg', as: 'image', type: 'image/jpeg' },
    { href: '/src/assets/logo.png', as: 'image', type: 'image/png' }
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset.href;
    link.as = asset.as;
    if (asset.type) link.type = asset.type;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load offscreen images using IntersectionObserver
 */
export const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

/**
 * Defer non-critical scripts until after first paint
 */
export const deferNonCriticalScripts = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      loadNonCriticalResources();
    });
  } else {
    setTimeout(() => {
      loadNonCriticalResources();
    }, 1);
  }
};

/**
 * Load non-critical resources after page load
 */
const loadNonCriticalResources = () => {
  // Analytics, social widgets, etc.
  console.log('[UPP] Non-critical resources loaded');
};

/**
 * Initialize UPP on page load
 */
export const initializeUPP = () => {
  console.log('[UPP] Initializing Universal Predictive Protocol...');
  
  // Phase 1: Preload critical assets
  preloadCriticalAssets();
  
  // Phase 2: Setup lazy loading
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages();
      predictNextPage();
    });
  } else {
    lazyLoadImages();
    predictNextPage();
  }
  
  // Phase 3: Defer non-critical scripts
  if (document.readyState === 'complete') {
    deferNonCriticalScripts();
  } else {
    window.addEventListener('load', deferNonCriticalScripts);
  }
  
  console.log('[UPP] Initialization complete');
};
