/* ==========================================================================
   Glitedge — bootstrap
   Order: smooth scroll (Lenis) → interactions → animations
   ========================================================================== */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function smoothScroll() {
    if (reduce || typeof Lenis === 'undefined') return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    GE.lenis = lenis;
    document.documentElement.classList.add('lenis');

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  function boot() {
    smoothScroll();
    GE.interactions.init();
    GE.animations.init();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
