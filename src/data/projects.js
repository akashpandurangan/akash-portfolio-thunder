
/* The Frontend, UI Screens and Graphic Design tabs use one image per card, exported from Figma at 2x. */
const imageModules = import.meta.glob('../assets/projects/{frontend,ui,graphic}/*.webp', {
  eager: true,
  import: 'default',
})
const imageFor = (folder, name) => imageModules[`../assets/projects/${folder}/${name}.webp`]

const screen = (id, title, alt, name) => ({
  id: `ui-${id}`,
  title,
  alt,
  image: imageFor('ui', name),
  category: 'UI Screens',
  href: '',
})

/* Filter tabs shown above the grid. The design hides an "All" tab, so "Case Study" is the default. */
export const PROJECT_FILTERS = ['Case Study', 'Frontend', 'UI Screens', 'Graphic Design']

/*
 * The grid cards of the Frontend and UI Screens tabs (the Case Study tab is the stacked list in caseStudies.js).
 * Copy is reproduced exactly as it appears in the Figma file, including repeated tags and
 * descriptions that don't match their titles — see the notes in the project hand-off.
 * `href` is optional: when set, the whole card links there (a Figma prototype, opened in a new tab).
 * Cards without a description or tags (the UI Screens tab) render as just an image and a caption.
 */
export const PROJECTS = [
  /* ---- Frontend ---- */
  {
    id: 'knb-innovations',
    title: 'KNB Innovations',
    description:
      'A modern, responsive interior design website built with React and Vite, featuring elegant layouts, immersive interior imagery, smooth animations, and interactive components to deliver a premium digital experience.',
    tags: [
      'Frontend Development',
      'HTML5',
      'CSS',
      'JavaScript',
      'React',
      'Vite',
      'Responsive Design',
      'Web Animations',
      'Claude code',
    ],
    category: 'Frontend',
    image: imageFor('frontend', 'knb-innovations'),
    alt: 'KNB Innovations interior design website on a laptop',
    href: '',
  },
  {
    id: 'smash-booking',
    title: 'Smash Booking',
    description:
      'A badminton court booking platform that helps facility owners manage courts, pricing, and availability, while allowing players to book slots through unique, shareable booking links.',
    tags: [
      'Product Design',
      'UI/UX Design',
      'React',
      'Vite',
      'Supabase',
      'Booking Platform',
      'Multi-Tenant Architecture',
      'Responsive Design',
      'Real-Time Availability',
    ],
    category: 'Frontend',
    image: imageFor('frontend', 'smash-booking'),
    alt: 'Smash Booking court booking site on a laptop',
    href: '',
  },

  /* ---- UI Screens (ordered row by row, left to right, as in the design) ---- */
  screen('purepath-mobile', 'Purepath Mobile', 'Purepath mobile app screens', 'ui-01'),
  screen('mobile-payments', 'Mobile UI', 'Mobile wallet and bill payment app screens', 'ui-02'),
  screen('legende-dashboard', 'Dashboard', 'Legende.ai welcome dashboard', 'ui-03'),
  screen('mobile-home-loan', 'Mobile UI', 'Home loan comparison mobile app screens', 'ui-04'),
  screen('mobile-services', 'Mobile UI', 'Wellness services booking app screens', 'ui-05'),
  screen('mobile-rewards', 'Mobile UI', 'Credit union rewards app screens', 'ui-06'),
  screen('mobile-sportsal', 'Mobile UI', 'Sportsal sports app screens', 'ui-07'),
  screen('saas-mail', 'Saas', 'KPost mail and chat workspace', 'ui-08'),
  screen('mobile-purepath-program', 'Mobile UI', 'Purepath rebooting program app screens', 'ui-09'),
  screen('web-popcorn', 'Web UI', 'Popcorn OTT news web interface', 'ui-10'),
  screen('saas-ai-studio', 'Saas', 'AI studio dashboard', 'ui-11'),
  screen('tablet-home-loan', 'Tablet UI', 'Home loan comparison tablet interface', 'ui-12'),
]

const graphic = (name, alt, width, height, extra) => ({
  id: name,
  alt,
  image: imageFor('graphic', name),
  width,
  height,
  category: 'Graphic Design',
  ...extra,
})

/*
 * Graphic Design is a two-column masonry (each column is independent, so tall posters sit beside short banners).
 * An array inside a column is a row of two small tiles. Only the Everest tile has a caption in the design.
 * Reading order on narrow screens interleaves the columns: left 1, right 1, left 2, right 2…
 */
export const GRAPHIC_COLUMNS = [
  [
    graphic('graphic-01', "Aryan's Dal Makhni package design", 1040, 1042),
    graphic('graphic-03', 'Brightex Hong Kong Sony Xperia advertisement', 1042, 868),
    [
      graphic('graphic-05', 'Everest Timber Indonesia logo', 476, 384, { title: 'Poster Design', arrow: false }),
      graphic('graphic-06', 'Deft Shares and Trades Management logo', 476, 476),
    ],
    [
      graphic('graphic-09', 'i Natural online foodmart logo', 476, 476),
      graphic('graphic-10', 'Brokers Layout logo', 476, 476),
    ],
    graphic('graphic-13', 'Radhe Herbal Products logo on a printed card', 1040, 1298),
    graphic('graphic-15', 'Brightex Hong Kong branded canopy tent mockup', 1040, 1302),
  ],
  [
    graphic('graphic-02', 'Super 4 Tournament poster', 1040, 1474),
    graphic('graphic-04', 'Brightex Hong Kong Sony and HTC smartphones graphic', 1040, 636),
    [
      graphic('graphic-07', 'Ascentyo logo', 476, 476),
      graphic('graphic-08', "Aryan's logo", 476, 476),
    ],
    [
      graphic('graphic-11', 'Silver lettering logo on black', 476, 476),
      graphic('graphic-12', 'i Natural online foodmart logo on yellow', 476, 476),
    ],
    graphic('graphic-14', 'Manjal Vandi Kadai logo', 1040, 1304),
    graphic('graphic-16', 'First time in Tamilnadu pre-launch poster', 1042, 1042),
  ],
]
