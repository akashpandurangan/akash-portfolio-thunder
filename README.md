# Akash Pandurangan — Portfolio

React + Vite implementation of the Figma design **Akash Pandurangan → "1920w light"** (node `942:39964`).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run lint
```

Requires Node 20+.

## Structure

```
src/
  main.jsx, App.jsx, index.css     entry, page composition, design tokens
  components/
    Loader/        brand intro (~2.2s; skippable; off for reduced motion)
    Navbar/        floating pill nav, scroll-spy, mobile menu, theme toggle
    Hero/          hero card, badge, heading, CTA
    Contact/       "Contact" link bar
    Projects/      filter tabs + project cards
    About/         About AP
    Experience/    role cards with photo strips
    Footer/        link columns + oversized wordmark
    ui/            Reveal, SmartLink, SectionHeading, Tag
  data/            all copy and links (projects.js, experience.js, links.js)
  hooks/           useReveal, useActiveSection, useScrolled, useHoverIntent, useInView, useTheme
  assets/          images/icons exported from Figma (photos converted to WebP)
```

Styling uses CSS Modules per component; colours, rings and spacing come from tokens in `src/index.css`.

## Things to fill in

The Figma file contains labels but **no URLs** for these, so they are currently inert (rendered as anchors without `href`):

- Resume, LinkedIn, Behance, GitHub, Instagram, X → `src/data/links.js`
- Project case-study links → `href` field in `src/data/projects.js` (when set, the card title becomes a full-card link)

Mail (`mailto:`), phone (`tel:`) and WhatsApp (`wa.me/919566951943`) are derived from the email and phone number shown in the design.

## Refinements from the RareUI reference

Figma is the baseline for content, colours and identity. Sizing, spacing and motion were then tuned against measurements taken from the live [RareUI](https://www.rareui.com/) site (the template the Figma design is built on):

- **Header:** fixed, 48px pills, a symmetric 768px bar that tightens to ~530px after ~24px of scroll (ease-out, ~0.45s) and gains a soft shadow; full bar from 768px, full-screen blurred menu below it.
- **Hero:** card height `min(100svh − 12px, 960px)`, 72px/72px headline (36 → 48 → 60 → 72 across breakpoints), 18px/28px summary, 48px mono pill + CTA, CTA hover `#e64500`, blur-and-rise entrance (~0.5s, ~100ms stagger).
- **Cards / pills:** 1px edge ring, card hover `#121212 → #171717` (200ms), pill hover `#262626`, `corner-shape: squircle` where the browser supports it.
- **Scroll:** sections reveal with the same blur-and-rise language (shorter and softer). The reference hero has no scroll-linked parallax or fade, so none was added.

All motion is disabled under `prefers-reduced-motion`.

## Interactive details

- **Experience cards:** clean by default. On deliberate hover (real pointer movement, not scrolling) each card grows to reveal six individual polaroids hanging from an orange rope, swinging in one by one. A small photos button on each card does the same for keyboard users (`aria-expanded`), and tapping a card toggles it on touch devices. On phones the strip swipes sideways inside the card. The photos are Figma's own polaroids exported one by one (`src/assets/experience/photos/<role>-1…6.webp`); their layout is in `src/data/polaroids.js`.
- **Header brand (“Akash”):** one short orange lightning pass with a glow and trail on hover or keyboard focus.
- **Footer bolt:** slow glow, rising smoke clipped to the bolt's silhouette, drifting embers and an occasional soft pulse. It only animates while on screen; reduced-motion users get a still glow.

## Notes on the design source

- Only a desktop (1920) frame exists in Figma. Tablet and mobile layouts are my responsive interpretation of it.
- There is no particle-network effect in this project, in the Figma file, or on the RareUI hero.
- The design is dark only. The nav's theme toggle switches to a **light theme that is not in Figma** (tokens in `src/index.css` under `[data-theme='light']`). Dark is the default.
- Copy is reproduced exactly as designed, including placeholder-looking content (repeated "Product Strategy" tags, matching experience descriptions, project descriptions that don't match their titles).
