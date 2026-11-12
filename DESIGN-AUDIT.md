# Glitedge — Design Audit & New Creative Direction

Prepared before any new code, as requested. Measured against the live build at 1440 × 900 on 12 Nov 2026.

---

## 0. What I was able to inspect

| Asset / reference | Status |
| --- | --- |
| Existing Glitedge site renders ("Desktop 4", "Desktop - 3", "Glidege home 1") | Inspected in full. Source of logo, founder photo, team/office/award photos, contact details, testimonials, awards, articles, stats. |
| AI mockup "Premium RERA Consultancy Homepage Design" | Inspected (generic; not used). |
| **Reference B — interior-design studio site** | **Not received.** |
| **References C & D — creative-agency sites** | **Not received.** |
| **Reference A — wireframe vs. visual** | **Not received.** |

The only images that have reached this project are renders of Glitedge's own site. The brief's design principles (editorial type, bleed photography, asymmetry, overlap, negative space) are followed below, but I cannot compare composition against B/C/D until those files are dropped into the project or Downloads.

---

## 1. Audit of the current build — as a creative director would see it

Page height at 1440 × 900: **10,186 px = 11.3 screens.** Section heights: hero 880 · stats 303 · about 1,073 · expertise 1,388 · why 1,093 · recognition 1,708 · testimonials 958 · insights 1,261 · contact 959 · footer 540.

### 1.1 Why it still reads as a template

1. **One rhythm repeated nine times.** Every section opens the same way — gold eyebrow with a rule, a Playfair title at the same size, an optional grey note — inside the same 1280 px container with the same vertical padding. Bodies differ, openings don't. That is the "repetitive layout" the client is reacting to even though the grids underneath are different.
2. **The hero is still "text left, photo right in a box".** The portrait sits inside the container with a frame around it. Nothing bleeds, nothing overlaps, the headline never touches the image. References of this calibre let the photograph own an edge of the viewport and let type cross into it.
3. **Photography is small and boxed.** About collage images are ~560 px; recognition "moments" are thumbnails. The brief asks for large image compositions; we have postcards.
4. **Flat typographic hierarchy.** All eight section titles are the same clamp size. There is no single giant display moment, no deliberate small-vs-huge contrast, no marginalia. The only large numerals (19, 11:30) are inside cards.
5. **Hairlines as the universal device.** Stats, index, awards, process, footer all use the same 1 px ivory/charcoal rule. It becomes wallpaper.
6. **Three dark sections look identical.** Why, Testimonials and Footer are the same forest green with the same left-aligned eyebrow. The dark sections should be *one* cinematic moment, not a recurring background colour.
7. **Recognition is three layouts stacked** (feature + ledger + four tiles = 1,708 px). It is the longest section and the least focused.
8. **Content density.** Roughly 1,100 words on the homepage. Reference sites of this kind run 350–500.
9. **Stats band is a leftover.** A hairline row of four numbers is exactly the "floating statistics" pattern the brief says to avoid; it also costs 300 px.
10. **Image quality.** All photographs are extracted from site renders (398–720 px). On a 2× display they are soft. This is a content problem, not a design one, but it caps how "premium" any layout can feel.

### 1.2 What is worth keeping

- The palette, Playfair + Manrope pairing, the real logo, and all verified content.
- The interactive service index (hover → sticky panel) — the one genuinely non-template interaction.
- The 11:30 PM story — the strongest piece of brand storytelling on the site.
- The motion system (loader, word-mask titles, clip reveals, Lenis) — it just needs fewer things to animate.

---

## 2. New visual direction — "The Ledger"

**Concept.** A legal-editorial magazine for real estate: large display serif, photography that bleeds to the viewport edge, type that overlaps imagery, and small typographic *marginalia* (dates, folio numbers, place names) that give the page the authority of a well-set document. Gold is used only as ink — rules, numerals, one italic word — never as a surface.

**Rules that make it different from the current build**

- No two sections open with the same device. Openers rotate between: giant numeral · bleed image · running headline · marginalia column · full-bleed dark.
- At least one element per section crosses a boundary (image → text column, type → image, dark → ivory).
- One hairline family only (gold, 1 px) and never as a grid — only as a rule *under* type.
- Container is 1360 px; images may leave it, text may not.
- Budget: **≤ 7 screens at 1440 × 900** (≈ 6,300 px). Word budget ≈ 450.

### 2.1 Homepage — section by section

| # | Section | Composition | Height budget |
| --- | --- | --- | --- |
| 1 | **Hero + brand intro** | Portrait as a full-height bleed on the right 52 % of the viewport (no frame, no box). Headline at 7.5 vw sits in the left column and its last line crosses 8 % into the photograph on a translucent ivory panel. Left margin carries a vertical marginalia column: "Est. 2017 · Bavdhan, Pune · MahaRERA / Goa RERA". CTAs bottom-left, aligned to the headline's left edge. A 56 px dark strip along the bottom of the photo carries the four verified figures as a single running line — this replaces the stats band. | 100 vh |
| 2 | **About + verified experience** | Office/meeting photograph bleeds to the *left* viewport edge (56 % width, 4:5). The numeral **19** is set at 18 vw in forest green, half over the photo, half over ivory. Right column: 2-sentence introduction, founder bio as an indented pull quote, signature, "Read more". Team photo appears as a small inset at the photo's bottom-right corner, overlapping both. | ~1 screen |
| 3 | **Consultancy expertise** | Keep the index, strip it down: titles at 3 vw with numerals at 0.75 rem in the margin, no description in the list; the sticky panel becomes dark with the RERA entry carrying the Consult → Audit → File → Maintain line as four small-caps words. The separate "process" strip is removed. | ~1 screen |
| 4 | **Why Glitedge** | The *only* full-bleed dark section. Team photograph as a 12 % duotone backdrop. "11:30 PM" at 14 vw as the composition's anchor; the story paragraph set beside it; the four commitments as a 2 × 2 of small-caps labels with one-line descriptions, not a list of paragraphs. | ~1 screen |
| 5 | **Featured recognition** | Magazine spread: Idols of Maharashtra plaque bleeds to the left edge at 50 % width; the headline "Recognised for making RERA clear" runs across the gutter over the image; the seven awards set as a typographic ledger on the right with years as gold marginalia. The three event photos become one horizontal strip of 3:2 images with captions beneath, scrollable on mobile. | ~1 screen |
| 6 | **Testimonials** | Minimal: a single quotation at 3.2 vw on ivory, no card, no avatar — just the quote, a gold rule, client name, folio "01 / 03". Prev/next as text links. "Trusted by" names become one slow typographic marquee line beneath. | ~0.6 screen |
| 7 | **Insights** | Featured article as a 21:9 image strip across the full container with the title overlapping its bottom edge on an ivory panel; two supporting articles as a numbered list (01, 02) to the right of the title panel. Channel callout as a single line with a play glyph. | ~0.8 screen |
| 8 | **Contact + footer** | Split-screen: left half dark with the headline, details and WhatsApp; right half ivory with the form (no card, fields set directly on the page). Footer reduced to a single band: logo, three link columns, legal line. | ~1.2 screens |

Projected total ≈ 7 screens, ≈ 450 words.

### 2.2 Typography scale (new)

| Role | Size | Use |
| --- | --- | --- |
| Display | 7–14 vw | hero headline, "19", "11:30" |
| Section title | 3.6 vw | one per section, never the same vertical position twice |
| Index titles | 3 vw | expertise list |
| Body | 1.0625 rem / 1.7 | ≤ 46 ch measure |
| Marginalia | 0.6875 rem, +0.18 em tracking, small caps | dates, folios, places |

### 2.3 Motion (reduced, purposeful)

Loader → logo; hero portrait clip reveal from the right edge; headline word-mask; the "19" and "11:30" count in; one clip-reveal per bleed image; service index panel cross-fade; testimonial cross-fade. Nothing else animates.

---

## 3. Internal pages — distinct directions

| Page | Direction | Key composition |
| --- | --- | --- |
| **About** | Long-form editorial | Full-bleed office photo header with the page title overlapping; a vertical timeline 2007 → 2017 → 2026 (career, founding, recognition); founder portrait with bio in two columns; team photo full width. |
| **Expertise** | Reference document | Sticky left index of the six disciplines; each discipline is a chapter with a numeral, the detailed service list (promoters / buyers / agents for RERA), and a "when to call us" line. No cards. |
| **Recognition** | Chronological wall | Years as a left-hand spine; each award a row with image where available; press and events as a masonry of photographs. |
| **Insights** | Magazine | One featured story at full width, then a 2-column list with dates and categories; filter by audience (promoters / buyers / agents / societies). |
| **Contact** | Utility, generous | Split screen: map/office photo + address on the left, form on the right, office hours, WhatsApp. |

Shared: header, footer, type scale, palette, motion primitives. Nothing else is shared.

---

## 4. Content and asset gaps (unchanged, still blocking "10/10")

1. **Reference images B, C, D** — needed to compare composition, not just principles.
2. **Original photograph files** — founder portrait, office, team, awards. Current images are render extractions and will look soft at 2×.
3. **Vector logo** (SVG/AI).
4. **Social URLs** and the **form endpoint**.

---

## 5. Recommended order of work

1. Approve this direction (or redline it).
2. Homepage rebuild to the plan above — new `index.html`, new `style.css` written from scratch, motion trimmed.
3. Browser review at 1440 / 1280 / 1024 / 768 / 390 with full-page captures; creative-director pass; fixes.
4. Internal pages, one at a time, each with its own layout.
