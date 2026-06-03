# CLAUDE.md — Finca de Garces Website
> Project instructions for Claude Code. Read this fully before writing any code.
> Source of truth for everything below is the **Finca de Garces Full Brand Guidelines (2026)** by theveecrafts.
---
## 1. Project Overview
Build the public-facing marketing website for **Finca de Garces**, a family-run specialty coffee farm in **Pangantucan, Bukidnon, Philippines**, sitting in the Mt. Kalatungan range.
The site is a **story-driven brand showcase**, not an e-commerce checkout. The brand sells to roasters, café owners, and enthusiasts; the primary conversion is an **inquiry** (the brand's standing CTA is *"Inquire Now"*), not an add-to-cart. Treat the site as a narrative + credibility + contact engine.
**What the farm offers (use as content pillars):**
- Specialty-grade coffee — green beans and roasted
- Experimental, carefully nursed coffee seedlings
- Farm consulting for other farmers to improve quality and value
**One-line brief:** *Quiet luxury meets earthen heritage — a calm, premium, photography-led site that makes a visitor feel the patience and care behind every cup.*
### Decisions made (defaults — change if you disagree)
- **Stack:** plain HTML / CSS / vanilla JS, no framework, no build step. (Matches the Totsy approach.)
- **Pages:** Home, Our Story, Coffee, The Farm & Process, Education & Consulting, Awards, Contact. See §7.
- **No cart/payments.** Every "buy" intent routes to the inquiry/contact flow.
- **Hosting target:** static host (GitHub Pages / Netlify). Keep everything relative-path safe.
- These are starting points. If a brief detail is missing, prefer the brand-safe choice and leave a clearly-marked `<!-- TODO: confirm with client -->`.
---
## 2. Tech Stack & Conventions
- **HTML5**, semantic landmarks (`<header> <nav> <main> <section> <article> <footer>`).
- **CSS:** one `styles.css` using **CSS custom properties** for the full design system (§4). Mobile-first. Use `clamp()` for fluid type/spacing. Flexbox + Grid only — no CSS frameworks.
- **JS:** vanilla, progressive enhancement only. Site must be fully readable with JS disabled. Use `js/main.js` for nav toggle, scroll reveals, lightbox, form handling.
- **No** jQuery, Bootstrap, Tailwind, or external UI kits.
- **Fonts:** self-host if licensed files are provided; otherwise Google Fonts (§4.2).
- **Images:** lazy-load below the fold (`loading="lazy"`), serve `.webp` with `<picture>` fallbacks, always meaningful `alt` text written in brand voice.
- **Formatting:** 2-space indent, lowercase-hyphen filenames (`our-story.html`), BEM-ish class naming (`.hero__title`, `.card--coffee`).
- **Accessibility & performance are requirements, not extras** — see §9.
---
## 3. Brand Foundation
**Who we are:** A family-run specialty coffee farm rooted in faith, resilience, and purpose. Born during the pandemic as a survival project, grown into a nationally awarded force in Philippine specialty coffee, while staying true to community, sustainability, and quality. The name joins the family name *Garces* with *finca* — a farm rooted in tradition, care, and community.
**Purpose:** Elevate Philippine coffee and honor the people, passion, and hard work behind every cup, while inspiring and uplifting farmers and communities.
**Vision:** Bring Filipino coffee to the world stage carrying a story of resilience, stewardship, and purpose.
**Mission:** Produce high-quality specialty coffee while helping and inspiring farmers to grow with us — cultivating purpose, community, and opportunity.
**USP:** The only Philippine specialty coffee farm combining internationally competitive quality with active farmer education, indigenous community partnerships, and a deeply personal family story.
### Brand Values (use as a section / weave through copy)
1. **Resilience & Patience**
2. **Community & Kinship**
3. **Faith & Purpose**
4. **Excellence Without Rush**
5. **Stewardship of Land**
6. **Authenticity**
### Archetypes → design implication
- **Primary: The Caregiver** — nurtures farmers, community, land; generous, warm, builds others up.
- **Secondary: The Sage** — pursues mastery through knowledge and research; teaches.
- **Design implication:** generous whitespace, unhurried pacing, educational depth available but never shouted. Warm, not clinical. Confident, not loud.
### Tone & Vibe (drive everything)
- **Tone:** Warm · Earnest · Measured · Educational · Poetic
- **Vibe:** Quiet Luxury · Earthen Heritage · Slow Living · Trusted Guide · Purposeful
---
## 4. Design System
### 4.1 Color
Define ALL colors as CSS variables on `:root`. Use the brand's **hierarchy ratios** as the rule for how much of each appears on any screen.
```css
:root {
  /* PRIMARY — ~25% each, dominant across the site */
  --color-roast:        #171717; /* Deep Earth Roast — near-black, depth/soil/roast */
  --color-cream:        #FAFAFD; /* Morning Mist Cream — soft warm off-white, default bg */
  /* SECONDARY — ~10% each, accents only */
  --color-canopy:       #0A3C30; /* Deep Canopy Green — anchor, grounded/serious */
  --color-field:        #346233; /* Cultivated Field Green — cultivated growth */
  --color-sienna:       #BD3010; /* Aged Sienna — heritage, maturity, craft */
  --color-clay:         #EC5803; /* Burnt Clay Orange — transformation, Philippine soil */
  --color-gold:         #EB9C35; /* Sunlit Harvest Gold — energy, ripeness, momentum */
  /* semantic roles */
  --bg:                 var(--color-cream);
  --bg-inverse:         var(--color-roast);
  --text:               var(--color-roast);
  --text-inverse:       var(--color-cream);
  --accent:             var(--color-canopy);  /* primary accent / links */
  --accent-warm:        var(--color-clay);    /* CTAs, highlights */
}
```
**Usage rules (enforce):**
- **Roast + Cream do ~80% of the work.** Most sections are cream background with roast text, or roast background with cream text (use roast-bg sparingly for impact — e.g. story moments, footer).
- **Canopy Green is the anchor accent** — links, secondary buttons, section dividers, the "serious/grounded" surfaces.
- **Sienna / Clay / Gold are sparing warm accents** — primary CTA fill, hover states, small highlights, never large fields. Think 5–10% of a screen, max.
- Never introduce colors outside this palette. No pure `#000` or `#fff` — use Roast and Cream.
- Maintain WCAG AA contrast (§9). Gold-on-cream fails for text — use gold for shapes/borders, not body copy.
### 4.2 Typography
Three roles, exactly as the guide specifies. Self-host the licensed brand fonts if files are provided; otherwise use the Google Fonts substitutes below (closest free matches) and keep the fallback stack.
| Role | Brand font | Web substitute (Google) | Used for |
|---|---|---|---|
| **Display / Headings** | Oldstyle (old-style serif) | **Sorts Mill Goudy** (alt: EB Garamond) | H1–H2, hero, big statements |
| **Secondary / accent** | Jimmy Script | **Caveat** (alt: Sacramento) | Sub-headlines, labels, poetic accents — used *sparingly* |
| **Body** | Poppins | **Poppins** (exact, free) | Body, paragraphs, UI, labels, buttons |
```css
:root {
  --font-display: "Sorts Mill Goudy", "EB Garamond", Georgia, serif;
  --font-script:  "Caveat", "Sacramento", cursive;
  --font-body:    "Poppins", system-ui, -apple-system, sans-serif;
}
```
**Type rules (enforce):**
- The **display serif is a flourish** — short, never long paragraphs, never overused. Headlines should be a few words.
- The **script does the "heavy lifting on subheaders"** but stays restrained — one accent per section at most. Never set body or long text in script. Never all-caps the script.
- **Poppins weights:** Regular (400), Medium (500), SemiBold (600), Bold (700).
- Fluid scale (mobile→desktop):
  ```css
  --fs-hero:   clamp(2.5rem, 6vw, 5rem);    /* display serif */
  --fs-h1:     clamp(2rem, 4.5vw, 3.5rem);
  --fs-h2:     clamp(1.5rem, 3vw, 2.25rem);
  --fs-h3:     clamp(1.25rem, 2vw, 1.5rem);
  --fs-body:   clamp(1rem, 1.1vw, 1.125rem);
  --fs-small:  0.875rem;
  ```
- Body line-height 1.6–1.75 (slow, readable). Display line-height 1.05–1.15. Generous paragraph spacing — let copy breathe.
- Buttons/labels: Poppins, often letter-spaced uppercase for small labels (e.g. `INQUIRE NOW`), tracking ~0.08em.
### 4.3 Spacing, layout, motion
- Spacing scale (rem): `0.25 / 0.5 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8`. Expose as `--space-*`.
- **Generous whitespace is a brand signature** — sections breathe, content is uncrowded. Vertical section padding `clamp(4rem, 10vw, 9rem)`.
- Max content width ~1200px; text measure max ~68ch.
- **Logo clear space:** always keep clear space around the logo equal to the height of the bean/star element. Never crowd it.
- Corners: subtle. Slightly rounded cards (4–8px) or square — quiet, not bubbly. No heavy shadows; if any, soft and low.
- Motion: gentle, slow (300–600ms, ease-out). Subtle fade/rise on scroll reveal. Nothing bouncy or flashy — motion should feel like *slow living*. Respect `prefers-reduced-motion`.
---
## 5. Logo & Iconography
- **Logo:** one continuous line drawing of **Mt. Kalatungan** with an integrated **sprout + coffee bean**, paired with the **FINCA de GARCES** old-style serif wordmark. The bean is inspired by a real bean-shaped stone formation at the farm's processing area; the line symbolizes the family's shared connection.
- **Lockups:** logomark (icon only), vertical (stacked — for tight/centered/formal), horizontal (wide — **use this for site header, footer, banners**).
- **Logo color:** only Roast or Cream. Never recolor, distort, reorient elements, or change opacity arbitrarily.
- Provide the logo as **inline SVG** where possible (crisp, recolorable via `currentColor`).
- **Iconography / decorative motifs:** coffee cherries, leaves, botanical elements, mountains/terrain, hand-drawn organic line art, and a family crest / farm seal motif. Use the mountain line as a recurring subtle decorative element (e.g. faint watermark behind section headers, like the brand deck does).
> `<!-- TODO: drop final logo SVGs + seal into /assets/logo/ -->`
---
## 6. Imagery & Art Direction
**Do:**
- Farm & nature photography — lush, earthy, **natural lighting**.
- Close-ups of coffee cherries, processing, harvesting.
- Candid human moments — farmers at work, family, community.
- Clean, minimal product shots on natural or cream backgrounds.
- Warm, **film-like tones**.
**Avoid:**
- Loud, commercial, or trendy aesthetics.
- Artificial or heavily filtered visuals.
- Generic stock photography.
- Cold, sterile, corporate design.
**Treatment:**
- Full-bleed hero imagery (cherries-in-hands energy from the cover is the signature shot).
- Text-on-photography: keep type legible with a subtle roast gradient scrim, never a heavy box. Poetic short lines (see §8 phrase bank).
- Mountain line-art overlays as elegant framing.
> Use placeholder images in `/assets/img/` with descriptive filenames and `<!-- TODO -->` until client photos arrive. Do not invent awards, names, or facts in captions.
---
## 7. Site Map & Page Specs
Global: sticky-ish header with horizontal logo + nav + `Inquire` button; footer with logo, short brand line, contact, socials (`@fincadegarces`), location. Consistent section rhythm.
### Home (`index.html`)
- **Hero:** full-bleed cherry photo, display headline, tagline *"From our family farm to your cup"*, primary CTA `Inquire Now`.
- **Intro / who we are:** short warm paragraph (Caregiver voice) + link to Story.
- **What we offer:** 3 cards — Specialty Coffee (green + roasted), Seedlings, Farm Consulting.
- **Story teaser:** roast-bg section, poetic line + photo, CTA to Our Story.
- **Values strip:** the 6 values as quiet, icon-led items.
- **Awards teaser:** "nationally awarded" credibility row → link to Awards.
- **Closing CTA band:** hook *"This is not just coffee, this is something meaningful"* + Inquire.
### Our Story (`our-story.html`)
- Long-form narrative built from the **Brand Story** (pandemic origin → research & patience → going all in → indigenous community wisdom → stewardship → today). Break with pull-quotes in the display serif and farm photography. This is the emotional core — give it room.
### Coffee (`coffee.html`)
- Offerings: green beans, roasted, seedlings. Present as elegant cards/specimens, not a shop grid. Each routes to inquiry. Room for tasting notes / process info (Sage voice — educational depth).
### The Farm & Process (`farm.html`)
- Place + practice: Mt. Kalatungan / Bukidnon highlands, elevation, regenerative & sustainable practices, "stewarded, not just grown." Process walk-through (harvest → processing → nursery). Map or location block.
### Education & Consulting (`education.html`)
- The Sage in full: farmer education, walking alongside fellow farmers, indigenous partnerships, consulting offer. CTA to inquire about consulting.
### Awards (`awards.html`)
- Credibility wall of national awards. `<!-- TODO: client to supply award names, years, competitions -->` — do not fabricate.
### Contact / Inquire (`contact.html`)
- Inquiry form (name, email, who they are: roaster / café / enthusiast / farmer, message), location, socials, email. Form posts to a configurable endpoint (Formspree/Netlify Forms) — leave `action` as a clearly-marked TODO. Success/error states handled in JS with graceful no-JS fallback.
---
## 8. Voice & Copy Guidelines
**We sound like:** warm & approachable · thoughtful & purposeful · quietly confident · storytelling-forward · sincere & honest.
**We do NOT sound like:** loud or boastful · overly commercial/salesy · trendy or artificial · cold or corporate · generic or forgettable.
**Core message:** *Behind every cup is a story of patience, hard work, and love — and great coffee can change lives.*
**Tagline:** *From our family farm to your cup*
**Hook:** *This is not just coffee, this is something meaningful*
**Phrase bank (from the deck — use for hero/overlay lines):** "carefully grown, patiently processed" · "not rushed, only refined" · "highland grown" · "grounded excellence" · "the land speaks through every bean" · "crafted by nature, nurtured by humans."
**Rules:** short poetic display lines; let body copy explain with calm authority; never hype; prefer truth and substance over spectacle; write `alt` text and microcopy in the same voice.
---
## 9. Accessibility, Performance, SEO
- **A11y:** semantic HTML, one `<h1>` per page, logical heading order, visible focus states, keyboard-navigable nav + lightbox + form, `aria-label`s on icon buttons, WCAG **AA contrast** (verify gold/clay on cream — use for shapes not text), `prefers-reduced-motion` honored, forms with `<label>`s and inline error messaging.
- **Performance:** compressed `.webp`, responsive `srcset`, lazy-load below fold, `font-display: swap`, minimal JS, no layout shift (set image dimensions). Target Lighthouse ≥ 90 across the board.
- **SEO:** unique `<title>` + meta description per page, Open Graph + Twitter cards (use the cherry hero), `LocalBusiness`/`Organization` JSON-LD with name, location (Pangantucan, Bukidnon, PH), and `@fincadegarces` social, semantic landmarks, sitemap.xml + robots.txt, descriptive alt text.
---
## 10. File Structure
```
finca-de-garces/
├── CLAUDE.md
├── index.html
├── our-story.html
├── coffee.html
├── farm.html
├── education.html
├── awards.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── logo/        (svg lockups: horizontal, vertical, mark, seal)
│   ├── img/         (photography, webp + fallback)
│   └── icons/       (botanical / line-art svgs)
├── robots.txt
└── sitemap.xml
```
---
## 11. Workflow Notes for Claude Code
- Build the **design system in `styles.css` first** (tokens from §4), then components, then pages. Pages should consume tokens — no hard-coded hex/px for brand values.
- Build **Home end-to-end first** as the reference for rhythm, then reuse patterns across pages.
- Keep components consistent: one header partial pattern, one footer, one card style, one button system (`.btn`, `.btn--primary` clay fill, `.btn--ghost` canopy outline).
- Where content/photos/awards are unknown, insert realistic brand-voice placeholders + `<!-- TODO -->`. **Never invent awards, partner names, elevations, or certifications.**
- After each page, self-check against this file: palette ratios, type roles, whitespace, voice, a11y, no off-brand colors.
## 12. Quick Don'ts
- ❌ Colors outside the palette; pure black/white; gold text on cream.
- ❌ Display serif in long paragraphs; script in body or all-caps; overusing either.
- ❌ Crowding the logo; recoloring/distorting it.
- ❌ Loud, trendy, filtered, or stock-y imagery; heavy shadows; bouncy motion.
- ❌ Salesy/boastful copy; cart/checkout flows; fabricated facts.
