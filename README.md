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
    HireMe/        fixed "Hire me" CTA with cursor-attracted lightning
    Contact/       "Contact" link bar
    Projects/      filter tabs, stacked case-study cards (+ OTT video), project cards, graphic-design gallery
    CaseStudy/     the OTT Design System case-study page (lazy-loaded; own route, see "Design system case study")
    About/         About AP
    Experience/    role cards with photo strips
    Footer/        link columns + oversized wordmark
    ui/            Reveal, SmartLink, SectionHeading, Tag
  data/            all copy and links (caseStudies.js, projects.js, experience.js, links.js, designSystemCaseStudy.js, caseStudyAssets.js)
  lib/             lightning.js (bolt drawing shared by the hero trail and the Hire me CTA)
  hooks/           useReveal, useActiveSection, useScrolled, useHoverIntent, useInView, useTheme, useStackedCards, useHashRoute
  assets/          images/icons exported from Figma (photos converted to WebP); case-study/ holds the design-system crops
public/            favicon and the resume PDF (served from the site root)
```

Styling uses CSS Modules per component; colours, rings and spacing come from tokens in `src/index.css`.

## Links and content you can change

The Figma file has labels but no URLs, so these were supplied separately and live in two data files:

- **Profile links** — LinkedIn, Behance, GitHub, Instagram, X, and the **Resume** → `src/data/links.js`. They appear in both the Contact bar and the footer, open in a new tab (`rel="noopener noreferrer"`, announced to screen readers), and a link left empty renders as an inert anchor instead of a dead `#`.
- **Resume PDF** → `public/Akash_Pandurangan_Senior_Product_Designer.pdf` (served at `/Akash_Pandurangan_Senior_Product_Designer.pdf`, opens in a new window). To update it, replace that file and keep the name, or change the `resume` entry in `links.js`.
- **Case-study cards** → `src/data/caseStudies.js`: the six cards of the Case Study tab (copy, platform / focus-area tags, the mockup images with their Figma coordinates, and the OTT video). The "View case study" button of each is its `href` (Figma prototype, new tab), except **OTT Design System**, whose `to` (an address on this site) wins over `href` and opens the case-study page below; delete `to` to send that button back to the Figma prototype. **Unifi TV 2.0 has no `href` yet** — none was supplied — so its button is inert until you add one. The Frontend, UI Screens and Graphic Design cards (`src/data/projects.js`) have no links because none were provided.
- **Experience copy** → `src/data/experience.js`. Quickplay still carries the paragraph from the Figma file; KPOST and Think Digital Wordings have their own descriptions.

Mail (`mailto:`), phone (`tel:`) and WhatsApp (`wa.me/919566951943`) are derived from the email and phone number shown in the design.

## Stacked case-study cards

The Case Study tab is a stack: each card pins just under the header (CSS `position: sticky`), the next one slides up over it, and the cards underneath recede a little (a few px of scale and lift, plus a dim, capped so the pile stays thin).

- **Where:** `ProjectStack` (list + CSS), `CaseStudyCard` (one card), `useStackedCards` (scroll hook), `StageVideo` (OTT video).
- **Fits the window:** a pinned card is never taller than the space between the header and the bottom of the window (`100svh − 92px − 16px`), and the mockups scale down to the room left after the text (container query units, so no JavaScript sizing). Spacing, then type, tighten at ≤960 / 840 / 740px of height. All six cards share one height (the tallest text block is measured once and re-measured on resize).
- **Distance per card:** `--stack-gap` (24px, the gap you see) plus `--stack-dwell` (`clamp(48px, 16svh, 180px)` of extra scroll) in `ProjectStack.module.css`. The list ends with the last card, which leaves the page normally.
- **Not pinned:** below 768px wide, in windows shorter than 560px, and under `prefers-reduced-motion` the cards are an ordinary list (phones show the mockups at a minimum of 40% of their design size, cropped by the card edges, without the captions below 600px).
- **Scrolling is never intercepted:** the hook only listens passively (one animation frame per scroll tick, only while the list is on screen) and writes a `--depth` number per card; nothing re-renders. Tabbing into a buried card scrolls it back to its own pinned position.
- **OTT Design System video:** `src/assets/projects/video/ott-design-system.mp4` (the Figma video layer "Card Design System (1)"). It sits over the device mockup exactly where Figma has it, is only downloaded when the card is within 400px of the screen, plays muted and looping while ≥40% visible, and pauses otherwise. The mockup's own still frame is the fallback and stays if the file is missing, autoplay is refused, the visitor prefers reduced motion or has Save-Data on.

## Design system case study

The OTT Design System card opens a page of its own: **`#/case-studies/ott-design-system`** (add `/<chapter>` to deep-link, e.g. `…/components`). There is no router: `hooks/useHashRoute.js` reads the hash and `App.jsx` swaps the home sections for the page, which is a `React.lazy` chunk, so the home page does not pay for it. `#projects`, `#contact` and the other home anchors in the header and in the closing section lead back.

- **Content:** every word, list and link is in `src/data/designSystemCaseStudy.js` (chapters, hero, overview, foundations, component groups and their figures, the twelve error types, playground presets, mobile and TV frame lists, platform facts, AI Studio, takeaways, closing). Components only render it. Copy was kept to what the Figma frames show. Lines flagged `NOTE` in that file are the places that need your own wording.
- **Chapter navigation:** `components/CaseStudy/ChapterNav.jsx` renders the nine chapter links from `VISIBLE_CHAPTERS`, in one of two forms by CSS alone. From 768px it is a vertical rail in the first column of the page layout (`CaseStudyPage.module.css`: 144px wide, 200px from 1200px; the rail and the 1152px article are centred as one piece). The rail is `position: sticky`, so it stays on screen under the header while the article scrolls and ends with the article, which is why it can never cover the hero or the footer; `--rail-top` in `ChapterNav.module.css` is its offset (100px from 1100px, 156px from 768 to 1099px, where the fixed "Hire me" button sits under the header on the left). Below 768px the layout is plain blocks and the links are the horizontal pill under the header, hidden until the headline has scrolled away. The lit link follows the scroll position (`useActiveSection`, the home page's reading line); when the address names a chapter (a click, a shared link, back / forward) that chapter is lit at once and stays lit for ~1.4s or until the reader scrolls, so the links in between don't flash. The lit link carries `aria-current="location"`, using the link again re-scrolls to its chapter, and scrolling is instant under `prefers-reduced-motion`.
- **Images:** `src/assets/case-study/**` are WebP crops exported from the Figma files (Design System: Video Player `TgMNcIeG7rWiYgZtyy0w8X` and the AI Studio file). `manifest.json` next to them holds each image's intrinsic size so every `<img>` has `width` / `height` (no layout shift); `src/data/caseStudyAssets.js` looks files up with `asset('ott/components/seek-content.webp')` and throws if one is missing. **If you add, replace or rename an image, regenerate the manifest entry for it.**
- **Live prototypes** (chapter "Playground", plus the mobile and TV players under "Demos") are React recreations in `components/CaseStudy/prototypes/`, built from the Figma component names and states: seek bar (content / live / ad, pointer and keyboard), player options (default / focused / pressed / disabled), settings panel (menu or tabs, full or classic, portrait or landscape), media card (sizes, types, ratios, layers) and the twelve error states. Each sits in a "Workbench" with a "Live prototype" badge and a "Built from" line naming the Figma components, so it can't be mistaken for the Figma frames, which are shown as images elsewhere and open in a full-size dialog (native `<dialog>`: focus trap, Esc, actual-size toggle).
- **Video:** there is no recording of the player in the project, so none was invented. The only video is the existing `src/assets/projects/video/ott-design-system.mp4`, shown in the cards group with its poster; it loads when within 400px, plays muted and looping while ≥40% visible, pauses when hidden or when the tab is hidden, and stays still for reduced-motion or Save-Data visitors. A play / pause button is always available and a pause you make is respected.
- **SaaS navigation module:** `SAAS_NAVIGATION` in the data file is `status: 'pending'` and renders a short "reserved" placeholder. Set `status: 'ready'` and fill `title`, `lede`, `figures` (and `figmaUrl`) to show the full chapter, or `visible: false` to remove it (and its chapter-nav entry) entirely.
- **Dependency:** `@fontsource/roboto` (400 / 500 / 700, latin) — the video-player Figma files use Roboto. It is imported only inside the lazy case-study chunk. Nothing else was added.
- **Accessibility and motion:** tabs, radio groups, toolbars and the seek bar follow the roving-tabindex patterns (arrow keys, Home / End), the seek bar is a `role="slider"` with `aria-valuetext`, status changes are announced through live regions, and every reveal, auto-hiding control and video respects `prefers-reduced-motion`. The prototypes keep their dark player look in the light theme on purpose (a player is dark); the page around them follows the theme.

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
- **Smooth scrolling:** mouse-wheel scrolling is eased (`src/hooks/useSmoothScroll.js`, no dependency): each notch glides to its destination in well under a second, notches add up while the wheel keeps turning, and the page never overshoots either end. It only handles mouse-wheel notches. Trackpads, touch, the keyboard (arrows, Space, PageUp/Down, Home/End), anchor links, scrollbar drags, `ctrl`+wheel zoom and scrollable boxes under the pointer (add `data-native-scroll` to any element that should keep its own wheel) all scroll the browser's own way, and the page follows them. It stays off while the intro loader or the full-screen menu is up and for reduced-motion visitors, and it only requests animation frames while the page is still catching up.
- **Fixed footer:** the footer is pinned to the bottom of the screen and the page slides up over it, uncovering it as you reach the end (`useFixedFooter.js` + the `.reveal` wrapper in `Footer.module.css`: the wrapper reserves the footer's height and clips it, so the covered part can't be seen or clicked). A fixed footer can't scroll, so the effect only applies with a mouse, without reduced motion, and when the footer fits in the window; phones, touch devices and short windows keep the ordinary footer. Keyboard focus in a covered footer scrolls it fully into view, and its ambient animation only runs once it is near.
- **"Hire me" CTA:** a pill (`components/HireMe/`) that leads to the existing `#contact` section (`CONTACT_ANCHOR`). There is only ever one on screen: from 768px it floats, fixed to the top-left of the screen; on phones it is the first item of the header row. It has the header Contact pill's size (48px tall, 14px type, 20px padding, fully rounded) but is filled with the brand orange (`--color-accent`, `#FC4C01`) with a white, semi-bold (600) label, a soft bevel, a subtle orange edge and glow, and the deeper `--color-accent-hover` (`#E64500`) on hover — the same look in both themes. The floating one sits level with the header from 1100px, where the centred 768px nav leaves room on its left, and just under the header row from 768px, so it never touches the logo, the pills or the theme toggle, expanded or compacted; it respects safe-area insets, sits beneath the header, and appears with the page once the intro loader has left. **Mobile header (below 768px):** the row is two groups pushed to opposite ends by `justify-content: space-between` — left, "Hire me" then the Akash pill; right, the theme toggle then the menu button — each with an 8px gap, all four centred on the row, the Akash text never wrapping, and the CTA staying in the row (above the overlay, closing the menu when used) while the full-screen menu is open. Sizes are exactly the desktop ones from 360px up; below 360px, only to keep everything on screen down to 320px, the side margin and gaps shrink and the CTA / Akash pills lose 4px of side padding (heights, radii and icons never change). The menu keeps its own theme toggle as well. The desktop header is laid out exactly as before (the left group dissolves with `display: contents`). Moving a mouse toward it charges it: the distance to the button (not only hovering it) drives a smoothed 0–1 charge that swells the button's glow and grows a jagged orange bolt from its edge toward the cursor, with forks aimed at the cursor, a few arcs crackling around the button when the cursor is on top of it, and tiny sparks. Far away the bolt is broken into fragments and only becomes continuous as the cursor closes in; when the cursor leaves, the charge drains slowly, so the bolt retracts, breaks apart and fades, and the canvas is cleared and the frame loop stops (no trails). The effect radius is the `radius` prop (default 240px). The canvas is one transparent, click-through layer bounded to the area around the button and drawn beneath it, nothing is drawn over the header, and it is off for touch devices and reduced-motion visitors (they get the plain button with a static glow). In the header the canvas sits beneath the neighbouring pills, the cursor over the Akash pill, toggle or menu button never triggers it (only the CTA itself does), and it is paused while the menu is open. The bolt drawing (`src/lib/lightning.js`) is shared with the hero's mouse trail.
- **Brand icons:** tooltips ("SonyLIV", "Telekom Malaysia", "AI Studio") on hover, keyboard focus and tap; Escape dismisses.
- **Text selection:** orange text on a faint orange tint (`--selection-bg` / `--selection-text` in `src/index.css`), matching the reference screenshot.
- **Header brand (“Akash”):** one short orange lightning pass with a glow and trail on hover or keyboard focus.
- **Footer bolt:** slow glow, rising smoke clipped to the bolt's silhouette, drifting embers and an occasional soft pulse. It only animates while on screen; reduced-motion users get a still glow.

## Notes on the design source

- Only a desktop (1920) frame exists in Figma. Tablet and mobile layouts are my responsive interpretation of it.
- There is no particle-network effect in this project, in the Figma file, or on the RareUI hero.
- The design is dark only. The nav's theme toggle switches to a **light theme that is not in Figma** (tokens in `src/index.css` under `[data-theme='light']`). Dark is the default. The light values follow the written brief — page `#FAFAFA`, card `#F1F1F1`, text `#111111`, secondary text `#626262`, card border `#E2E2E2` (`--color-card-border`) — and cards, experience cards and tags all read the same tokens: `--ring-surface` (card outline), `--color-media-ring` (hairline around project media, transparent in dark) and `--color-tag-bg` / `--color-tag-border`. The hero's round brand-logo chips read `--color-chip-bg` / `--color-chip-border` (black with the design's `#474747` edge in dark, white with a soft hairline in light). The two reference screenshots that brief mentions did not arrive, so the light theme has not been compared against them.
- Copy is reproduced exactly as designed, including placeholder-looking content (repeated "Product Strategy" tags, matching experience descriptions, project descriptions that don't match their titles).
