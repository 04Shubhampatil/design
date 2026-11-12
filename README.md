# Glitedge Consultancy Services — website redesign

Static site: HTML5 · CSS3 · vanilla JS · GSAP + ScrollTrigger · Lenis (all via CDN).

```
index.html        ← homepage
about.html        ← long-form editorial (hero, colophon, founder, timeline, team)
expertise.html    ← reference document (method, sticky index, six chapters)
recognition.html  ← chronological wall (split opener, years spine, masonry, Simplify RERA)
insights.html     ← magazine (masthead, audience filters, featured story, list, quick check)
contact.html      ← utility split (direct channels, form, office ledger, embedded map)
assets/images/   ← photographs (extracted from the existing site renders, see below)
assets/icons/    ← logo (dark / light) and favicon
css/style.css · pages.css (internal pages) · animations.css · responsive.css
js/main.js · interactions.js · animations.js
```

Run locally (any static server works):

```bash
python -m http.server 8765
```

## Editing the homepage Expertise section

Service titles, quotes, highlight points and which photograph shows for each service live in the JSON block `#xsData` at the end of the section in `index.html`; the navigation items above it carry the icons. `media` accepts `desk`, `meeting`, `team` or `founder`.

## Deployment notes

- **Cache-busting**: every CSS/JS reference carries `?v=<date>`; bump it in all six pages when assets change (`grep -l "?v=" *.html`).
- **Motion safety net**: `js/animations.js` removes the loader and reveals all content after 4.5s if the GSAP ticker has not advanced (occluded window, throttled `requestAnimationFrame`), and immediately under `prefers-reduced-motion`.
- Static files only — any host works; the preview server used during development is `python -m http.server 8765`.

## Content provenance

All photographs, the logo, contact details, statistics, awards, testimonials and article titles were
taken from the existing site renders supplied as references. Nothing was invented.

| Asset | Source | Size | Note |
| --- | --- | --- | --- |
| `founder-amruta.jpg` / `-800.jpg` | original photograph supplied by the client | 1085×1449 / 599×800 | hero + About page, via `srcset` |
| `office-desk.jpg` / `-900.jpg` | original photograph supplied by the client | 1527×1030 / 900×607 | Insights feature strip, via `srcset` |
| `about-meeting.jpg`, `about-office.jpg`, `team-bavdhan.jpg` | existing site renders | 570–720 px | fine at current display sizes; originals preferred |
| `award-idols.jpg`, `event-seminar.jpg`, `event-forum.jpg`, `press-lokmat.jpg` | existing site renders | ~570 px | originals preferred |
| `logo-glitedge.png` / `-light.png` | existing site header | 323×86 | request the vector logo (SVG/AI) for crisp rendering |

## Still required

- Original files for the remaining photographs (office, team, awards, events).
- Social profile URLs — links marked `data-social` currently point to `#` (YouTube, Instagram, Facebook). WhatsApp is wired to +91 72628 80888.
- Article bodies: the three guides exist only as titles/excerpts on the old site; their links point to the contact section until the full texts are supplied.
- Form handler endpoint — see `js/interactions.js` → `form()`.
- Naming: confirmed as **Glitedge**, matching the logo and glitedge.com.
- Sections from the old site not carried over (FAQ, RERA quick-check calculator, video grid) can be added as secondary pages if wanted.
