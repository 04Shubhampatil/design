/* ==========================================================================
   Glitedge — UI interactions (no dependencies). window.GE.interactions.init()
   ========================================================================== */
window.GE = window.GE || {};

GE.interactions = (() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  function header() {
    const el = $('#header'), bar = $('#progress');
    if (!el) return;
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      el.classList.toggle('is-scrolled', y > 24);   // compact frosted bar stays visible in both scroll directions
      last = y;
      if (bar) { const max = document.documentElement.scrollHeight - window.innerHeight; bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function mobileNav() {
    const burger = $('#burger'), nav = $('#nav');
    if (!burger || !nav) return;
    $$('.nav__list li', nav).forEach((li, i) => li.style.setProperty('--i', i));
    const setOpen = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    };
    burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
    $$('a', nav).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  function activeLinks() {
    const links = $$('.nav__list a[href^="#"]');
    const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
    if (!('IntersectionObserver' in window) || !sections.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${en.target.id}`)); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
  }

  /* Expertise section: tab-style service navigation driving the media crossfade and panel */
  function expertise() {
    const nav = $('#xsNav'), panel = $('#xsPanel'), dataEl = $('#xsData');
    if (!nav || !panel || !dataEl) return;
    let data; try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }
    const items = $$('.xs__item', nav), btns = $$('.xs__btn', nav);
    const imgs = $$('.xs__media img');
    const inner = $('.xs__panel-inner', panel), ghost = $('.xs__ghost', panel);
    const title = $('.xs__panel-title', inner), quote = $('.xs__quote', inner), points = $$('.xs__points li', inner);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0, timer;

    const render = (i) => {
      const d = data[i];
      title.textContent = d.title;
      quote.textContent = '\u201C' + d.quote + '\u201D';
      points.forEach((li, k) => { const icon = li.firstElementChild; li.textContent = ''; li.appendChild(icon); li.append(d.points[k] || ''); li.hidden = !d.points[k]; });
      if (ghost) ghost.textContent = String(i + 1).padStart(2, '0');
      imgs.forEach((img) => img.classList.toggle('is-active', img.dataset.media === d.media));
    };

    const activate = (i) => {
      items.forEach((el, k) => el.classList.toggle('is-active', k === i));
      btns.forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
      if (i === current) return;
      current = i;
      if (reduce) { render(i); return; }
      panel.classList.add('is-switching'); clearTimeout(timer);
      timer = setTimeout(() => { render(i); panel.classList.remove('is-switching'); }, 260);
    };

    btns.forEach((b, i) => {
      b.addEventListener('click', () => activate(i));
      b.addEventListener('keydown', (e) => {
        const n = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? i - 1 : null;
        if (n === null) return;
        e.preventDefault(); const t = (n + btns.length) % btns.length; activate(t); btns[t].focus();
      });
    });
    btns.forEach((b, k) => { b.tabIndex = k === 0 ? 0 : -1; });
  }

  /* Testimonials: buttons, keyboard, swipe, autoplay (paused on hover) */
  function voices() {
    const track = $('#tTrack');
    const items = track ? $$('.voice', track) : [];
    if (!items.length) return;
    const prev = $('#tPrev'), next = $('#tNext'), idx = $('#tIndex'), total = $('#tTotal');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0, timer;
    const pad = (n) => String(n + 1).padStart(2, '0');
    total.textContent = pad(items.length - 1);
    const go = (n) => { i = (n + items.length) % items.length; items.forEach((el, k) => el.classList.toggle('is-active', k === i)); idx.textContent = pad(i); };
    const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(i + 1), 8000); };
    const step = (d) => { go(i + d); auto(); };
    prev.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
    track.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } });
    let x0 = null;
    track.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
    track.addEventListener('pointerup', (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); });
    track.addEventListener('pointercancel', () => { x0 = null; });
    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', auto);
    auto();
  }

  function form() {
    const f = $('#enquiryForm');
    if (!f) return;
    const status = $('#formStatus');
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      $$('.field', f).forEach((field) => { const input = field.querySelector('input, select, textarea'); const valid = input.checkValidity(); field.classList.toggle('is-invalid', !valid); if (!valid) ok = false; });
      if (!ok) { status.textContent = 'Please complete the highlighted fields.'; return; }
      status.textContent = 'Thank you — an advocate will call you back within one working day.';
      f.reset();
      // TODO: connect to the production form handler / email service.
    });
    $$('input, select, textarea', f).forEach((el) => el.addEventListener('input', () => el.closest('.field').classList.remove('is-invalid')));
  }

  function anchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href'); if (id.length < 2) return;
        const target = $(id); if (!target) return;
        e.preventDefault();
        if (GE.lenis) GE.lenis.scrollTo(target, { offset: -72, duration: 1.4 }); else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* Document index (Expertise page): highlight the chapter in view */
  function docNav() {
    const links = $$('.doc__nav a[data-doc]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    const map = new Map(links.map((a) => [a.dataset.doc, a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle('is-active', a === map.get(en.target.id))); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* Insights page: audience filter chips */
  function insightFilter() {
    const btns = $$('.filters__btn');
    const items = $$('#insightList .entry');
    const empty = $('#insightEmpty');
    if (!btns.length || !items.length) return;
    btns.forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.filter;
      btns.forEach((x) => { const on = x === b; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', String(on)); });
      let shown = 0;
      items.forEach((it) => { const ok = f === 'all' || (it.dataset.audience || '').split(' ').includes(f); it.classList.toggle('is-hidden', !ok); if (ok) shown++; });
      if (empty) empty.hidden = shown > 0;
    }));
  }

  function year() { const y = $('#year'); if (y) y.textContent = new Date().getFullYear(); }

  return { init() { header(); mobileNav(); activeLinks(); expertise(); voices(); form(); anchors(); docNav(); insightFilter(); year(); } };
})();
