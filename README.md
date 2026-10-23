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
    Projects/      filter tabs, project cards, graphic-design gallery
    About/         About AP
    Experience/    role cards with photo strips
    Footer/        link columns + oversized wordmark
    ui/            Reveal, SmartLink, SectionHeading, Tag
  data/            all copy and links (projects.js, experience.js, links.js)
  hooks/           useReveal, useActiveSection, useScrolled, useHoverIntent, useInView, useTheme
  assets/          images/icons exported from Figma (photos converted to WebP)
public/            favicon and the resume PDF (served from the site root)
```

Styling uses CSS Modules per component; colours, rings and spacing come from tokens in `src/index.css`.

## Links and content you can change

The Figma file has labels but no URLs, so these were supplied separately and live in two data files:

- **Profile links** — LinkedIn, Behance, GitHub, Instagram, X, and the **Resume** → `src/data/links.js`. They appear in both the Contact bar and the footer, open in a new tab (`rel="noopener noreferrer"`, announced to screen readers), and a link left empty renders as an inert anchor instead of a dead `#`.
- **Resume PDF** → `public/Akash_Pandurangan_Senior_Product_Designer.pdf` (served at `/Akash_Pandurangan_Senior_Product_Designer.pdf`, opens in a new window). To update it, replace that file and keep the name, or change the `resume` entry in `links.js`.
- **Case-study links** → `href` on each case study in `src/data/projects.js`. When set, the whole card is the link (Figma prototypes, new tab) and keyboard focus draws one ring around the card. The Frontend, UI Screens and Graphic Design cards have no links because none were provided.
- **Experience copy** → `src/data/experience.js`. Quickplay still carries the paragraph from the Figma file; KPOST and Think Digital Wordings have their own descriptions.

Mail (`mailto:`), phone (`tel:`) and WhatsApp (`wa.me/919566951943`) are derived from the email and phone number shown in the design.

## Refinements from the RareUI reference

Figma is the baseline for content, colours and identity. Sizing, spacing and motion were then tuned against measurements taken from the live [RareUI](https://www.rareui.com/) site (the template the Figma design is built on):

- **Header:** fixed, 48px pills, a symmetric 768px bar that tightens to ~530px after ~24px of scroll (ease-out, ~0.45s) and gains a soft shadow; full bar from 768px, full-screen blurred menu below it.
- **Hero:** card height `min(100svh − 12px, 960px)`, 72px/72px headline (36 → 48 → 60 → 72 across breakpoints), 18px/28px summary, 48px mono pill + CTA, CTA hover `#e64500`, blur-and-rise entrance (~0.5s, ~100ms stagger).
- **Cards / pills:** 1px edge ring, card hover `#121212 → #171717` (200ms), pill hover `#262626`. Corners are plain circular radii (32px cards around 24px media, 8px padding) so the ring, background and image always share one outline.
- **Scroll:** sections reveal with the same blur-and-rise language (shorter and softer). The reference hero has no scroll-linked parallax or fade, so none was added.

All motion is disabled under `prefers-reduced-motion`.

## Interactive details

- **Experience cards:** clean by default (text only). The whole card is the control: hovering with real pointer movement (not scrolling past) reveals six individual polaroids on an orange rope; a click, tap, or Enter / Space on the focusable job title pins them open (shown with a faint orange edge) and again to close. The keyboard focus ring wraps the whole card. Clicks on the photo strip, links, or after selecting text never toggle it, and the strip swipes sideways on phones without closing the card. The photos are Figma's own polaroids exported one by one (`src/assets/experience/photos/<role>-1…6.webp`); their layout is in `src/data/polaroids.js`.
- **Projects tabs:** *Case Study* (six cards), *Frontend* (KNB Innovations, Smash Booking — description plus wrapping tags), *UI Screens* (twelve captioned screens, row by row) and *Graphic Design* (a two-column masonry; small logo tiles sit two to a row, and only the Everest tile has a caption because only that one is captioned in the design). All of it lives in `src/data/projects.js`; the images are Figma's 2× exports as WebP in `src/assets/projects/{frontend,ui,graphic}/` and load lazily. Below 760px the gallery becomes one stack that keeps the left / right order.
- **Hero lightning:** an orange electric trail follows the mouse inside the hero (`src/components/Hero/lightningEngine.js`, drawn on one transparent, click-through canvas behind the content). A bright, irregular main bolt lags the cursor slightly; smaller forks (some with a sub-fork) split off at varied angles, short curved arcs reach out to the left and right of the path, sparks burst on sharp turns and fast strokes, and embers drift off and fade. Secondary bolts strike outward, shimmer by re-rolling their kinks (no full-frame flashes) and are fainter than the trail. Counts and lifetimes are capped (14 bolts, 40 sparks, 36 embers; the bolts are gone ~0.5s after the pointer stops or leaves, the last embers ~0.85s, and the reach from the path stays under ~100px). It exists only for fine-pointer devices without reduced motion, runs only while the pointer is moving inside the visible hero, and stops scheduling frames when idle.
- **Footer copy buttons:** hovering (or keyboard-focusing) the email or phone number in the footer reveals a copy icon on the left of the text. Clicking it copies the text as shown, turns the icon into an orange tick for ~1.6s and shows a snackbar ("Email address copied" / "Phone number copied") for ~2.2s; if the browser refuses, the snackbar says so instead. The snackbar (`ui/Snackbar.jsx`, state in `hooks/useSnackbar.js`) is a polite live region that is always mounted, click-through, themed and never steals focus. Where there is no hover or no room to the left of the text (touch devices, windows under 600px) the icon is always visible and sits just after the text. The mail and phone links themselves still work.
- **Brand icons:** tooltips ("SonyLIV", "Telekom Malaysia", "AI Studio") on hover, keyboard focus and tap; Escape dismisses.
- **Text selection:** orange text on a faint orange tint (`--selection-bg` / `--selection-text` in `src/index.css`), matching the reference screenshot.
- **Header brand (“Akash”):** one short orange lightning pass with a glow and trail on hover or keyboard focus.
- **Footer bolt:** slow glow, rising smoke clipped to the bolt's silhouette, drifting embers and an occasional soft pulse. It only animates while on screen; reduced-motion users get a still glow.

## Notes on the design source

- Only a desktop (1920) frame exists in Figma. Tablet and mobile layouts are my responsive interpretation of it.
- There is no particle-network effect in this project, in the Figma file, or on the RareUI hero.
- The design is dark only. The nav's theme toggle switches to a **light theme that is not in Figma** (tokens in `src/index.css` under `[data-theme='light']`). Dark is the default. The light values follow the written brief — page `#FAFAFA`, card `#F1F1F1`, text `#111111`, secondary text `#626262`, card border `#E2E2E2` (`--color-card-border`) — and cards, experience cards and tags all read the same tokens: `--ring-surface` (card outline), `--color-media-ring` (hairline around project media, transparent in dark) and `--color-tag-bg` / `--color-tag-border`. The two reference screenshots that brief mentions did not arrive, so the light theme has not been compared against them.
- Copy is reproduced exactly as designed, including placeholder-looking content (repeated "Product Strategy" tags, matching experience descriptions, project descriptions that don't match their titles).
