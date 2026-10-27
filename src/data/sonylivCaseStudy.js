import { caseStudyPath } from '../hooks/useHashRoute'
import { CASE_STUDIES } from './caseStudies'
import { COMPONENTS, DESIGN_SYSTEM_SITE, FOUNDATIONS, TOKENS } from './sonylivDesignSystem'

/*
 * Copy and structure of the Sony LIV case study (route: SONY_PATH).
 *
 * Sources: the Figma page "SonyLIV" (file ej9eb56rFBPbmGsyIsqh08, node 1146:27277), and the Sony LIV design system site
 * (https://sony-qp-ds.vercel.app), whose pages are transcribed in sonylivDesignSystem.js. The page follows the structure of
 * the other case studies (banner, overview, then one chapter each), in the order of the Figma page.
 *
 * Words: the overview, problem space, process and role text are the Figma page's own, kept as written. The design system
 * chapter is new copy, built from what the site actually contains, and the interactivity and screen captions describe what
 * the recordings and screens show.
 *
 * Left out of the Figma page on purpose:
 *  - a "venue / double bookings / court bookings" problem text, a row of six statistics ("4 surfaces on one design
 *    language", "27 sports in the onboarding catalogue"...) and a "A booking in five steps" outcome. They are in hidden
 *    layers of the page and belong to another project's template;
 *  - the guidance notes of the template ("This section should show how you arrived at your design decisions", "Key areas
 *    to showcase", "Tools: Figma and any other tools actually used during the project"), which are instructions to the
 *    author, not content (their substance is now written out in the design system chapter);
 *  - a second, identical "Feedback Review" card;
 *  - the line "Building Consistency Through Reusable Design" that the Figma page repeats under every screen and every
 *    section title; each screen has a caption of its own here;
 *  - a hidden "Design System" screen (a live "New & Hot" frame), which renders as nothing.
 * Items that need your own words are flagged with NOTE.
 */

export const SONY_SLUG = 'sonyliv'
export const SONY_PATH = caseStudyPath(SONY_SLUG)
export const chapterPath = (id) => `${SONY_PATH}/${id}`

const SONY_CARD = CASE_STUDIES.find((study) => study.id === SONY_SLUG)

/** The page index. `id` is both the section's DOM id and the last part of its address. */
export const CHAPTERS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem space' },
  { id: 'process', label: 'Process' },
  { id: 'design-system', label: 'Design system' },
  { id: 'interactivity', label: 'Interactivity' },
  { id: 'screens', label: 'TV screens' },
]

/* ---------------------------------------------------------------------------------------------- Hero */

export const HERO = {
  // "UX Enhancement & Design System", the Figma page's headline, in the banner's short lines.
  title: ['Sony LIV:', 'UX enhancement', '& design system.'],
  // The Figma overview's own sentence about the project.
  summary:
    'The project focused on improving the usability and visual consistency of the existing Sony LIV experience while maintaining its established product direction.',
  // Role and scope are the Figma page's ("UI/UX Designer / Product Designer"; "Product Design · OTT · UX/UI · Design Systems"); platforms are the tags of the card on the Projects tab.
  meta: [
    { label: 'Role', values: ['UI/UX Designer', 'Product Designer'] },
    { label: 'Scope', values: ['Product Design', 'OTT', 'UX/UI', 'Design Systems'] },
    { label: 'Platforms', values: SONY_CARD.platforms },
  ],
  primaryLink: { label: 'Watch the interactions', to: chapterPath('interactivity') },
  secondaryLink: { label: 'See the design system', to: chapterPath('design-system') },
}

/* ---------------------------------------------------------------------------------------------- Overview */

export const OVERVIEW = {
  lede: 'What the project was, what changed and what I did.',
  blocks: [
    {
      id: 'product',
      title: 'The project',
      body: [
        'Sony LIV is an OTT streaming platform offering entertainment content, movies, TV shows, and live sports. The project focused on improving the usability and visual consistency of the existing Sony LIV experience while maintaining its established product direction.',
        'The Sony LIV team had a clear understanding of the product requirements and overall experience. Rather than introducing a major UX overhaul, our team reviewed the existing experience, identified opportunities for improvement, and proposed targeted UX enhancements to make key interactions more intuitive and consistent.',
      ],
    },
    {
      id: 'role',
      title: 'My role',
      body: [
        'My role involved evaluating existing user journeys, suggesting usability improvements, contributing to the design system, and designing UI screens aligned with the product requirements and established design direction.',
        'Project focus: Usability improvements, UX recommendations, design system development, and UI screen design.',
      ],
    },
  ],
  cards: [
    {
      id: 'problem',
      title: 'The problem',
      text: 'The existing product direction was established, but there were opportunities to refine usability, improve interaction clarity, and create more consistent UI patterns across screens.',
    },
    {
      id: 'designed',
      title: 'What I designed',
      text: "Targeted UX improvements, refined user flows and interactions, reusable design system components, and UI screens aligned with Sony LIV's established product requirements.",
    },
    {
      id: 'outcome',
      title: 'The outcome',
      text: 'A more structured design approach, clearer interaction patterns, and a reusable UI foundation intended to improve consistency and support efficient design across the product.',
    },
  ],
  detailsTitle: 'Project details',
  // NOTE: "Tools" says Figma only; the Figma page's own line adds "and any other tools actually used", which is an unfilled placeholder.
  details: [
    { label: 'Role', value: 'UI/UX Designer / Product Designer' },
    { label: 'Project', value: 'Sony LIV — UX Enhancement and Design System' },
    {
      label: 'Responsibilities',
      value:
        'Existing experience review, UX recommendations, design system contribution, UI screen design, and design refinement based on product requirements and stakeholder feedback.',
    },
    { label: 'Collaboration', value: 'Sony LIV stakeholders and the internal product and design team.' },
    { label: 'Platforms', value: 'Mobile, web, Smart TV, STB' },
    { label: 'Tools', value: 'Figma' },
  ],
}

/* ---------------------------------------------------------------------------------------------- Problem space */

export const PROBLEM = {
  title: 'Problem space',
  heading: 'Understanding the existing experience',
  lede: [
    'For an established OTT platform like Sony LIV, improving the user experience requires balancing usability improvements with existing product requirements, business priorities, and established design patterns.',
    'The objective was not to redesign the platform from scratch. It was to identify areas where the experience could be made clearer, more consistent, and easier to navigate without disrupting familiar user behaviours.',
  ],
  areas: [
    {
      title: 'Usability and interaction clarity',
      text: 'Review existing screens and interactions to identify opportunities to simplify user decisions and make important actions easier to understand.',
    },
    {
      title: 'Consistency across the experience',
      text: 'Identify inconsistencies in components, spacing, typography, interaction states, and visual hierarchy that could be addressed through shared design patterns.',
    },
    {
      title: 'Scalable design system',
      text: 'Create or refine reusable components and interaction patterns to support consistent implementation and reduce the need to design similar elements repeatedly.',
    },
    {
      title: 'Product and stakeholder alignment',
      text: "Ensure proposed enhancements respected the Sony LIV team's established product direction, functional requirements, and approval process.",
    },
  ],
  challengeTitle: 'Design challenge',
  challenge:
    'How might we improve the usability and consistency of an established OTT experience while preserving its core UX direction and working within existing product constraints?',
}

/* ---------------------------------------------------------------------------------------------- Process */

export const PROCESS = {
  title: 'UX and UI process',
  lede: 'Five steps, from understanding the product as it was to screens that were reviewed against requirements and feedback.',
  steps: [
    {
      name: 'Existing experience audit',
      line: 'Understand before changing',
      text: 'Reviewed existing screens, user journeys, interaction patterns, and established product requirements to understand how the experience worked and where refinements might be useful.',
    },
    {
      // NOTE: the Figma card is worded as an instruction ("Use relevant app-store comments..."), unlike the other four, and
      // does not say what was actually found. Reworded in the present tense; please confirm this step happened as described.
      name: 'Feedback review',
      line: 'Understand user pain points',
      text: 'Relevant app-store comments, Google reviews, and client feedback are reviewed for recurring usability concerns. They are grouped into themes, separating issues that can be acted on from individual preferences.',
    },
    {
      name: 'UX recommendations',
      line: 'Improve without overhauling',
      text: 'Evaluated potential improvements against usability, consistency, feasibility, and existing requirements. Proposed focused refinements rather than changing established patterns without a clear reason.',
    },
    {
      name: 'Design system',
      line: 'Establish reusable patterns',
      text: 'Worked on the design system to organize and standardize UI elements, define consistent component behaviour, and support the implementation of the proposed screens.',
    },
    {
      name: 'UI design and validation',
      line: 'Translate decisions into screens',
      text: 'Designed and refined the relevant screens using the agreed UX direction and reusable components. Reviewed the designs against requirements and stakeholder feedback, making refinements where needed.',
    },
  ],
}

/* ---------------------------------------------------------------------------------------------- Design system */

const COLOUR_TOKENS = FOUNDATIONS.colour.reduce((total, group) => total + group.items.length, 0)

export const DESIGN_SYSTEM = {
  title: 'Design system',
  lede: [
    "The design system was an important part of the project, helping translate the product's visual language into reusable and consistent UI patterns. Rather than treating every screen as an independent design task, the approach focused on shared components, standardized visual properties, and predictable interaction behaviour. It provided a structured foundation for designing screens, maintaining consistency, and supporting future product updates.",
    'It is documented as a live site for the mobile app. The system is dark only, set in Inter on a 4px grid, with five surface steps, white as the action colour and yellow reserved for the paywall. Fifteen component groups assemble every screen, and one token file produces the Figma variables, the CSS for the web build and a flat JSON for other platforms.',
  ],
  closing:
    'The goal was to connect design decisions with a scalable component-based approach, reducing visual inconsistencies and making future refinements easier to manage.',
  // Counts of what the site documents, taken from its own data.
  facts: [
    { value: COLOUR_TOKENS, label: 'colour tokens' },
    { value: FOUNDATIONS.typeScale.length, label: 'type sizes' },
    { value: FOUNDATIONS.spacing.items.length, label: 'spacing steps' },
    { value: COMPONENTS.items.length, label: 'component groups' },
  ],
  site: { label: 'Open the design system', href: DESIGN_SYSTEM_SITE },
  tabs: [
    {
      id: 'foundations',
      label: 'Foundations',
      text: FOUNDATIONS.intro,
      figure: {
        image: 'sonyliv/ds/foundations.webp',
        title: 'The Foundations page of the design system site',
        caption: 'Colour, type, spacing, radius, elevation, iconography and layout, each with its token names.',
      },
    },
    {
      id: 'components',
      label: 'Components',
      text: COMPONENTS.intro,
      figure: {
        image: 'sonyliv/ds/components.webp',
        title: 'The Components page of the design system site',
        caption: 'Each component with its variants, a live example, Do and Don’t rules and its API.',
      },
    },
    {
      id: 'tokens',
      label: 'Tokens',
      text: TOKENS.intro,
      figure: {
        image: 'sonyliv/ds/tokens.webp',
        title: 'The Tokens page of the design system site',
        caption: 'The same tokens as Figma Variables, a Tailwind theme and a flat JSON, generated from one source file.',
      },
    },
  ],
}

/** The token formats, in the words of the site's Tokens page (its notes, in order). */
export const TOKEN_FORMATS = [
  { id: 'figma', title: 'Figma Variables', text: TOKENS.notes[0], notes: [TOKENS.notes[1], TOKENS.notes[2]] },
  { id: 'tailwind', title: 'Tailwind v4 theme', text: TOKENS.notes[3], notes: [] },
  { id: 'json', title: 'Flat JSON', text: 'Platform-neutral export for iOS, Android, or a Style Dictionary pipeline.', notes: [] },
]

/* ---------------------------------------------------------------------------------------------- Interactivity */

export const INTERACTIVITY = {
  title: 'Interactivity',
  lede: [
    'Five screen recordings of the mobile prototype, the ones used in the design file. Each plays on its own while it is on screen and can be paused; choose one from the list.',
  ],
  clips: [
    {
      id: 'hero-banner',
      tab: 'Home hero',
      title: 'Home hero banner',
      video: 'hero-banner-vertical-buttons',
      poster: 'sonyliv/poster/hero-banner.webp',
      seconds: 18,
      text: 'The hero banner on Home, with its add and play buttons stacked vertically at the bottom of the banner, above the Continue Watching rail.',
    },
    {
      id: 'detail-screen',
      tab: 'Detail screen',
      title: 'Search to the detail screen',
      video: 'detail-screen',
      poster: 'sonyliv/poster/detail-screen.webp',
      seconds: 18,
      text: 'From search results into a title: the title art, Watch Free Episode and Subscribe Now, the Watchlist, Like and Download actions, then episodes grouped in ranges.',
    },
    {
      id: 'download',
      tab: 'Download',
      title: 'Downloading an episode',
      video: 'download-video',
      poster: 'sonyliv/poster/download-video.webp',
      seconds: 16,
      text: 'On a title’s detail screen, Download starts the download and the episode row shows its progress.',
    },
    {
      id: 'search',
      tab: 'Search',
      title: 'Search',
      video: 'search',
      poster: 'sonyliv/poster/search.webp',
      seconds: 53,
      text: 'Search from its empty state, with an example query, You Might Like chips, recent searches and trending searches, through a loading state to the results for “Tamil Movies”.',
    },
    {
      id: 'flow',
      tab: 'Full flow',
      title: 'Home, search and downloads',
      video: 'home-search-download',
      poster: 'sonyliv/poster/home-search-download.webp',
      seconds: 62,
      text: 'One continuous run: Home with an ad and the category chips, search with its trending searches, the My Download list, and back to Home.',
    },
  ],
}

/* ---------------------------------------------------------------------------------------------- TV screens */

// Ordered by a viewer's journey (sign in, profile, browse, a title, search, the player, settings), not as the Figma page lists them.
const tv = (name, title, text) => ({ image: `sonyliv/tv/${name}.webp`, thumb: `sonyliv/tv/${name}-t.webp`, title, text })

export const SCREENS = {
  title: 'TV screens',
  lede: 'Twenty-three landscape screens for TV, from signing in and setting up a profile to browsing, search, the player and settings.',
  ratio: 858 / 483,
  items: [
    tv('sign-in-qr', 'Sign in with a QR code', 'A QR code to scan, or a code to enter in the mobile app, with sign-in by mobile number as the alternative.'),
    tv('sign-in-mobile', 'Sign in with a mobile number', 'An on-screen keypad for the number, a Proceed button and the way back to the QR code.'),
    tv('parental-pin', 'Parental PIN', 'A keypad and four digit fields for the PIN, with Submit and Reset PIN.'),
    tv('onboarding', 'Profile setup', 'Name, date of birth, gender, a kids profile switch, language and preferred genre, then Save & Continue or Delete Profile.'),
    tv('profile-avatar', 'Choosing an avatar', 'An avatar collection beside the profile, with Save & Continue and Reset changes.'),
    tv('homepage', 'Homepage', 'The hero banner for a title with its action, over the Continue Watching rail, with the side navigation at the left.'),
    tv('home-upcoming', 'Home with an upcoming title', 'An upcoming title in a large 2:3 card with a Remind me action, above a row of 1:1 cards.'),
    tv('menu', 'Side menu', 'The menu opened: Subscribe Now, Search, Home, My List, New & Hot, TV Shows, Movies, Sports, Originals and the profile.'),
    tv('new-and-hot', 'New & Hot', 'Trending, New Releases, Upcoming, Sports and Liv Originals tabs over a dated feed of titles.'),
    tv('collection', 'Collection page', 'Shelves of 1:1 cards: a row of channel tiles and a row of large circular cards.'),
    tv('title-page', 'Title page', 'Watch Free Preview and Subscribe to Watch Full Movie, with the title’s details and the Trailers & More and More Like This tabs.'),
    tv('episodes', 'Episodes', 'Seasons at the left and the episode list beside them, each with a thumbnail, number, date, duration and synopsis.'),
    tv('trailer', 'Trailer', 'A trailer playing, with My List and Watch Now, the progress bar, and Play From Beginning, Settings and Play Next.'),
    tv('search', 'Search', 'An on-screen keyboard beside the recent searches and the trending searches by category.'),
    tv('trending-searches', 'Trending searches', 'Trending searches as a grid of posters, with category chips above it.'),
    tv('ios-search', 'iOS search', 'Typing along a horizontal letter strip: “Mah” brings up suggestions and the top results.'),
    tv('search-results', 'Search results', 'A title match with its actions, then Related Videos and More Results with category chips.'),
    tv('player', 'Video player', 'The player with the progress bar and time remaining, and Play From Beginning and Settings.'),
    tv('player-pause', 'Player pause state', 'The paused player: the title art and details, with Resume, Play From Beginning, More Like This and Like.'),
    tv('player-settings', 'Player settings', 'Audio Preference, Subtitle, Video Quality and Speed over the paused picture, with subtitle size and style options.'),
    tv('settings', 'Settings', 'Manage Profile, My Account, Activate Offer, Advance Settings, Device Management and Content Preference, with language and genre cards.'),
    tv('advanced-settings', 'Advanced settings', 'Parental Control, Allow Ad Personalization and Auto Playback.'),
    tv('error', 'Error', '“Oops, something went wrong!” with Try Again and Restart App.'),
  ],
}
