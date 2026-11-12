/* ==========================================================================
   Glitedge — motion choreography (GSAP + ScrollTrigger). Reduced, purposeful.
   ========================================================================== */
window.GE = window.GE || {};

GE.animations = (() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = 'power3.out';

  /* Wrap words of section titles in masks (hero lines are pre-wrapped in HTML) */
  function prepareTitles() {
    document.querySelectorAll('.title').forEach((h) => {
      if (h.dataset.split || h.classList.contains('title--ribbon')) return;
      h.dataset.split = '1';
      const wrap = (node) => {
        if (node.nodeType === 3) {
          const frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const inner = document.createElement('span'); inner.textContent = part;
            w.appendChild(inner); frag.appendChild(w);
          });
          node.replaceWith(frag);
        } else if (node.nodeType === 1) Array.from(node.childNodes).forEach(wrap);
      };
      Array.from(h.childNodes).forEach(wrap);
    });
  }

  function tagReveals() {
    const sel = [
      '.ae-story > *', '.ae-badge', '.ae-photo--team', '.xs__left > *', '.xs__media', '.xs__panel',
      '.why__head', '.why__story', '.why__points div', '.rec__head', '.rec__ledger li', '.rec__strip li',
      '.voices__wrap > *', '.marquee', '.insights .folio', '.feature__panel', '.feature__more li',
      '.contact__intro > *', '.form > *', '.footer__grid > *',
      '.chead__lead', '.channels li', '.csplit__form > *', '.csplit__office > *', '.prep__grid > *', '.mag__bar', '.story__panel', '.entry', '.check__grid > *', '.rhead__text > *', '.wall__head', '.wall__year', '.moments__head', '.masonry__item', '.channel-band__grid > *', '.dhead__lead', '.method li', '.doc__nav', '.chapter__head', '.chapter__cols > div', '.chapter__list', '.chapter__aside', '.chapter__when', '.colophon__lead', '.colophon__facts', '.founder__text > *', '.timeline__head', '.timeline__item', '.team__text > *', '.cta__grid > *'
    ].join(',');
    document.querySelectorAll(sel).forEach((el) => el.setAttribute('data-reveal', ''));
  }

  function showEverything() {
    document.documentElement.classList.remove('js-anim');
    const loader = document.getElementById('loader');
    if (loader) loader.remove();
    document.querySelectorAll('[data-count]').forEach((el) => { el.textContent = el.dataset.count; });
  }

  function intro() {
    const tl = gsap.timeline({ defaults: { ease: EASE } });
    const loader = document.getElementById('loader');
    tl.to('.loader__mark img', { opacity: 1, duration: 0.6 })
      .to('.loader__line', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.3')
      .to(loader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', onComplete: () => loader.remove() }, '+=0.15')
      .to('.header', { opacity: 1, duration: 0.8, onComplete: () => document.documentElement.classList.add('is-ready') }, '-=0.45');

    if (document.querySelector('.hero__photo')) {                       // homepage hero
      tl.to('.hero__panel', { scaleY: 1, duration: 1.1, ease: 'power4.inOut' }, '-=0.6')
        .to('.hero__photo', { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut' }, '-=0.8')
        .fromTo('.hero__photo img', { scale: 1.12 }, { scale: 1, duration: 2, ease: 'power3.out' }, '<')
        .to('.hero__rule', { scaleX: 1, duration: 0.8, ease: 'power2.out' }, '-=1.3')
        .to('.hero__eyebrow', { opacity: 1, duration: 0.6 }, '<')
        .to('.hero__line > span', { y: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, '-=0.5')
        .to(['.hero__lead', '.hero__actions', '.hero__loc'], { opacity: 1, duration: 0.9, stagger: 0.12 }, '-=0.7')
        .to(['.hero__outline', '.hero__corner', '.hero__card', '.hero__scroll'], { opacity: 1, duration: 0.8, stagger: 0.08 }, '-=0.6');
    } else if (document.querySelector('.phero')) {                       // internal page hero
      tl.to('.phero__media', { clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'power4.inOut' }, '-=0.6')
        .fromTo('.phero__media img', { scale: 1.1 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, '<')
        .to('.phero__panel', { opacity: 1, y: 0, duration: 1 }, '-=0.9');
    }
    return tl;
  }

  function reveals() {
    gsap.utils.toArray('.title').forEach((h) => {
      const words = h.querySelectorAll('.w > span');
      if (!words.length) return;
      gsap.to(words, { y: 0, duration: 1.1, stagger: 0.05, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
    });
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: EASE, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    gsap.utils.toArray('.img-reveal').forEach((el) => {
      gsap.to(el, { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
  }

  /* Counters only for figures already published by Glitedge */
  function counters() {
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      const obj = { v: 0 };
      gsap.to(obj, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(obj.v); }, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
  }

  function parallax() {
    if (window.matchMedia('(max-width: 1023px)').matches) return;
    if (document.querySelector('.hero__photo img')) gsap.to('.hero__photo img', { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    if (document.querySelector('.team__media img')) gsap.fromTo('.team__media img', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.team__media', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  return {
    init() {
      const ok = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
      if (!ok || reduce) { showEverything(); return; }
      gsap.registerPlugin(ScrollTrigger);
      prepareTitles();
      tagReveals();
      document.documentElement.classList.add('js-anim');
      const tl = intro(); reveals(); counters(); parallax();
      // Safety net: if the ticker has stalled (occluded window, throttled rAF), drop the choreography and show the page
      setTimeout(() => {
        if (tl.progress() < 0.05) { tl.kill(); ScrollTrigger.getAll().forEach((t) => t.kill()); showEverything(); }
        const l = document.getElementById('loader'); if (l) l.remove();
      }, 4500);
      window.addEventListener('load', () => ScrollTrigger.refresh());
    }
  };
})();
