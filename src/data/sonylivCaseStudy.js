import { caseStudyPath } from '../hooks/useHashRoute'
import { CASE_STUDIES } from './caseStudies'
import { COMPONENTS, DESIGN_SYSTEM_SITE, FOUNDATIONS } from './sonylivDesignSystem'

/*
 * Copy and structure of the Sony LIV case study (route: SONY_PATH).
 *
 * Sources: the Figma page "SonyLIV" (file ej9eb56rFBPbmGsyIsqh08, node 1146:27277), and the Sony LIV design system site
 * (https://sony-qp-ds.vercel.app), whose pages are transcribed in sonylivDesignSystem.js (kept whole; this file only
 * picks from it).
 *
 * The page is a short story, not documentation: overview, problem, approach, four key improvements, the design system
 * and its six most important components, the mobile and TV screens, then the outcome. Its words are the Figma page's
 * own (the overview, problem, process and role text), shortened; the captions describe only what a screen or recording
 * shows. No metric, research finding or result is claimed anywhere: the outcome is the Figma page's own "intended"
 * statement, and the "learnings" are labelled design reflections.
 *
 * Kept in the data but not shown (so nothing is lost, and each is one line away from coming back):
 *  - the full design system tables (every colour, the whole type scale, spacing, radius, elevation, layout), the 15
 *    components' Do and Don't rules and the token formats: the live design system site has them all and is linked;
 *  - the "Full flow" recording (it replays the Home, Search and Download clips) and 17 of the 23 TV screens
 *    (`featured: false`, or not in FEATURED_TV);
 *  - the Tokens page screenshot is used under "Scalable design system" in the improvements, not in the design system.
 *
 * Left out of the Figma page on purpose (template leftovers): a "venue / double bookings / court bookings" problem text,
 * a row of six statistics and a "A booking in five steps" outcome (hidden layers of another project's template), the
 * author's guidance notes, a second identical "Feedback Review" card, and the line "Building Consistency Through
 * Reusable Design" that the Figma page repeats under every screen.
 * Items that need your own words are flagged with NOTE.
 */

export const SONY_SLUG = 'sonyliv'
export const SONY_PATH = caseStudyPath(SONY_SLUG)
export const chapterPath = (id) => `${SONY_PATH}/${id}`

const SONY_CARD = CASE_STUDIES.find((study) => study.id === SONY_SLUG)

// A count at the start of a sentence reads better as a word ("Fifteen component groups…").
const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']
const numberWord = (n) => NUMBER_WORDS[n] ?? String(n)
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1)

/**
 * The page index. `id` is both the section's DOM id and the last part of its address. The old addresses keep working:
 * `…/interactivity` and `…/screens` are anchors inside the "mobile-tv" chapter.
 */
export const CHAPTERS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem statement' },
  { id: 'process', label: 'Design approach' },
  { id: 'improvements', label: 'Key improvements' },
  { id: 'design-system', label: 'Design system' },
  { id: 'components', label: 'UI components' },
  { id: 'mobile-tv', label: 'Mobile & Smart TV' },
  { id: 'outcome', label: 'Outcome & learnings' },
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
  title: 'Project overview',
  lede: 'What the project was and what I did.',
  blocks: [
    {
      id: 'project',
      title: 'The project',
      body: [
        'Sony LIV is an OTT streaming platform for entertainment content, movies, TV shows and live sports. The project improved the usability and visual consistency of the existing experience while keeping its established product direction.',
        'Rather than a major UX overhaul, the team reviewed the existing experience and proposed targeted enhancements to make key interactions more intuitive and consistent.',
      ],
    },
    {
      id: 'role',
      title: 'My role',
      body: [
        'I evaluated existing user journeys, suggested usability improvements, contributed to the design system and designed UI screens aligned with the product requirements and established design direction.',
      ],
      // The Figma page's "Project focus" line, as tags.
      focus: ['Usability improvements', 'UX recommendations', 'Design system development', 'UI screen design'],
    },
  ],
  // NOTE: "Tools" says Figma only; the Figma page's own line adds "and any other tools actually used", which is an unfilled placeholder.
  details: [
    { label: 'Platforms', value: 'Mobile, web, Smart TV, STB' },
    { label: 'Collaboration', value: 'Sony LIV stakeholders and the internal product and design team' },
    { label: 'Tools', value: 'Figma' },
  ],
}

/* ---------------------------------------------------------------------------------------------- Problem statement */

export const PROBLEM = {
  title: 'Problem statement',
  heading: 'Understanding the existing experience',
  lede: [
    'For an established OTT platform, improving the experience means balancing usability with existing product requirements, business priorities and design patterns. The goal was not to redesign from scratch, but to make the experience clearer, more consistent and easier to navigate without disrupting familiar behaviour.',
  ],
  areas: [
    { title: 'Usability and interaction clarity', text: 'Simplify decisions and make important actions easier to understand.' },
    { title: 'Consistency across the experience', text: 'Align components, spacing, typography, states and hierarchy through shared patterns.' },
    { title: 'Scalable design system', text: 'Reusable components and patterns, so similar elements are not designed again and again.' },
    { title: 'Product and stakeholder alignment', text: 'Respect the Sony LIV team’s product direction, functional requirements and approval process.' },
  ],
  challengeTitle: 'Design challenge',
  challenge:
    'How might we improve the usability and consistency of an established OTT experience while preserving its core UX direction and working within existing product constraints?',
}

/* ---------------------------------------------------------------------------------------------- Design approach */

export const PROCESS = {
  title: 'UX/UI design approach',
  lede: 'Five steps, from understanding the product as it was to screens reviewed against requirements and feedback.',
  steps: [
    {
      name: 'Existing experience audit',
      line: 'Understand before changing',
      text: 'Reviewed existing screens, journeys, interaction patterns and product requirements to see where refinements could help.',
    },
    {
      // NOTE: the Figma card is worded as an instruction ("Use relevant app-store comments..."), unlike the other four, and
      // does not say what was actually found. Reworded in the present tense; please confirm this step happened as described.
      name: 'Feedback review',
      line: 'Understand user pain points',
      text: 'App-store comments, Google reviews and client feedback are reviewed for recurring usability concerns and grouped into themes.',
    },
    {
      name: 'UX recommendations',
      line: 'Improve without overhauling',
      text: 'Weighed improvements against usability, consistency, feasibility and existing requirements, and proposed focused refinements.',
    },
    {
      name: 'Design system',
      line: 'Establish reusable patterns',
      text: 'Organised and standardised UI elements and defined consistent component behaviour to support the proposed screens.',
    },
    {
      name: 'UI design and validation',
      line: 'Translate decisions into screens',
      text: 'Designed and refined screens from the agreed UX direction and reusable components, reviewing them against requirements and stakeholder feedback.',
    },
  ],
}

/* ---------------------------------------------------------------------------------------------- Key design improvements */

/*
 * The four areas of the problem statement, each with one real screen. `aim` is what the project set out to do in that
 * area (the Figma page's own wording, shortened); the figure's caption says only what the screen shows. Nothing here
 * claims a result: the page has no before / after, research or metrics to base one on.
 */
export const IMPROVEMENTS = {
  title: 'Key design improvements',
  lede: 'The work focused on four areas. Each is shown with a screen from the project; the caption describes only what the screen shows.',
  items: [
    {
      id: 'usability',
      area: 'Usability and interaction clarity',
      aim: 'Make important actions easier to find and understand.',
      figure: {
        image: 'sonyliv/tv/player-pause.webp',
        title: 'Paused player',
        caption: 'The title details with Resume, Play From Beginning, More Like This and Like.',
      },
    },
    {
      id: 'consistency',
      area: 'Consistency across the experience',
      aim: 'Apply shared patterns for components, spacing and hierarchy.',
      figure: {
        image: 'sonyliv/tv/home-upcoming.webp',
        title: 'Home with an upcoming title',
        caption: 'A large 2:3 card with a Remind me action, above a row of 1:1 cards.',
      },
    },
    {
      id: 'system',
      area: 'Scalable design system',
      aim: 'Build reusable components from a single set of tokens.',
      figure: {
        image: 'sonyliv/ds/tokens.webp',
        title: 'Tokens page of the design system',
        caption: 'The same tokens as Figma Variables, a Tailwind theme and a flat JSON, from one source file.',
      },
    },
    {
      id: 'alignment',
      area: 'Product and stakeholder alignment',
      aim: 'Keep proposals within the established product direction and requirements.',
      figure: {
        image: 'sonyliv/tv/menu.webp',
        title: 'Side menu',
        caption: 'Subscribe Now, Search, Home, My List, New & Hot, TV Shows, Movies, Sports, Originals and the profile.',
      },
    },
  ],
}

/* ---------------------------------------------------------------------------------------------- Design system */

const COLOUR_TOKENS = FOUNDATIONS.colour.reduce((total, group) => total + group.items.length, 0)

export const DESIGN_SYSTEM = {
  title: 'Design system',
  lede: [
    'A dark-only design system for the Sony LIV mobile app, documented as a live site. It turns the product’s visual language into reusable components and shared tokens, so screens stay consistent and future updates are easier to manage.',
  ],
  // Counts of what the site documents, taken from its own data.
  facts: [
    { value: COLOUR_TOKENS, label: 'colour tokens' },
    { value: FOUNDATIONS.typeScale.length, label: 'type sizes' },
    { value: FOUNDATIONS.spacing.items.length, label: 'spacing steps' },
    { value: COMPONENTS.items.length, label: 'component groups' },
  ],
  // The three rules of the site's colour model, shortened.
  principles: [
    { title: 'White carries priority', text: 'The most important control on any screen is the white one.' },
    { title: 'Gold means money', text: 'Gold marks the brand and anything behind the paywall.' },
    { title: 'Surface means depth', text: 'Each lighter surface reads as one level closer; shadows are only a supporting cue.' },
  ],
  glanceTitle: 'Foundations at a glance',
  // Which of the site's tokens the page shows (the rest is on the site): `cssVar` for colours, `name` for type steps.
  colourPicks: ['--color-bg', '--color-surface-1', '--color-surface-2', '--color-surface-3', '--color-action-primary', '--color-gold', 'premium', '--color-live'],
  typePicks: ['display-24', 'title-20', 'title-16', 'body-14', 'caption-10'],
  typeNote: 'Inter on a 4px grid.',
  tokens: 'One token file produces Figma Variables, a Tailwind v4 theme and a flat JSON for other platforms.',
  also: `Also documented on the site: ${FOUNDATIONS.spacing.items.length} spacing steps, ${FOUNDATIONS.radius.items.length} corner radii, elevation, iconography and layout.`,
  figure: {
    image: 'sonyliv/ds/foundations.webp',
    title: 'Foundations page of the design system site',
    caption: 'Colour, type, spacing, radius, elevation, iconography and layout, each with its token names.',
  },
  site: { label: 'Open the design system', href: DESIGN_SYSTEM_SITE },
}

/* ---------------------------------------------------------------------------------------------- Important UI components */

export const KEY_COMPONENTS = {
  title: 'Important UI components',
  lede: `${capitalise(numberWord(COMPONENTS.items.length))} component groups assemble every screen. These six cover browsing, search and the detail screen.`,
  // One sentence each, from the component's description on the site.
  items: [
    { name: 'Button', text: 'Four variants cover the hierarchy of a screen: primary, subscribe, secondary and ghost.' },
    { name: 'Card and PosterCard', text: 'The catalogue card, and the 2:3 portrait card used by every rail and search grid.' },
    { name: 'Rail and SectionHeader', text: 'Together they build the browse experience; the rail bleeds past the gutter so a partly visible card shows the row scrolls.' },
    { name: 'SearchField', text: 'One pill covers the empty, focused and submitted states of search.' },
    { name: 'TabBar', text: 'Evenly divided underline tabs on the detail screen. The indicator is white, because gold is reserved for the paywall.' },
    { name: 'MetaRow and ProgressBar', text: 'MetaRow sets the two metadata lines of the detail screen; ProgressBar is the 4px resume track.' },
  ],
  figure: {
    image: 'sonyliv/ds/components.webp',
    title: 'Components page of the design system site',
    caption: 'Each component with its variants, a live example, Do and Don’t rules and its API.',
  },
  more: 'The other components, with their Do and Don’t rules, are on the live design system.',
  site: { label: 'Open the design system', href: DESIGN_SYSTEM_SITE },
}

/* ---------------------------------------------------------------------------------------------- Mobile and Smart TV */

// The recordings are the video layers of the Figma page; `featured: false` ones are kept but not shown.
const CLIPS = [
  {
    id: 'hero-banner',
    tab: 'Home hero',
    title: 'Home hero banner',
    video: 'hero-banner-vertical-buttons',
    poster: 'sonyliv/poster/hero-banner.webp',
    seconds: 18,
    text: 'Add and play buttons stacked vertically at the bottom of the Home hero banner, above the Continue Watching rail.',
  },
  {
    id: 'detail-screen',
    tab: 'Detail screen',
    title: 'Search to the detail screen',
    video: 'detail-screen',
    poster: 'sonyliv/poster/detail-screen.webp',
    seconds: 18,
    text: 'From search into a title: Watch Free Episode and Subscribe Now, the Watchlist, Like and Download actions, then episodes in ranges.',
  },
  {
    id: 'download',
    tab: 'Download',
    title: 'Downloading an episode',
    video: 'download-video',
    poster: 'sonyliv/poster/download-video.webp',
    seconds: 16,
    text: 'Download starts from the title’s detail screen, and the episode row shows its progress.',
  },
  {
    id: 'search',
    tab: 'Search',
    title: 'Search',
    video: 'search',
    poster: 'sonyliv/poster/search.webp',
    seconds: 53,
    text: 'Search from its empty state, through recent and trending searches and a loading state, to results for “Tamil Movies”.',
  },
  {
    // Replays Home, Search and Download, which have a clip each above.
    id: 'flow',
    tab: 'Full flow',
    title: 'Home, search and downloads',
    video: 'home-search-download',
    poster: 'sonyliv/poster/home-search-download.webp',
    seconds: 62,
    featured: false,
    text: 'One continuous run: Home with an ad and the category chips, search with its trending searches, the My Download list, and back to Home.',
  },
]

export const INTERACTIVITY = {
  id: 'interactivity',
  title: 'Mobile prototype',
  lede: 'Screen recordings of the mobile prototype. Each plays on its own while it is on screen and can be paused.',
  clips: CLIPS.filter((clip) => clip.featured !== false),
}

// Ordered by a viewer's journey (sign in, profile, browse, a title, search, the player, settings), not as the Figma page lists them.
const tv = (name, title, text) => ({ id: name, image: `sonyliv/tv/${name}.webp`, thumb: `sonyliv/tv/${name}-t.webp`, title, text })

const TV_SCREENS = [
  tv('sign-in-qr', 'Sign in with a QR code', 'A QR code to scan, or a code to enter in the mobile app; sign-in by mobile number is the alternative.'),
  tv('sign-in-mobile', 'Sign in with a mobile number', 'An on-screen keypad for the number, a Proceed button and the way back to the QR code.'),
  tv('parental-pin', 'Parental PIN', 'A keypad and four digit fields for the PIN, with Submit and Reset PIN.'),
  tv('onboarding', 'Profile setup', 'Name, date of birth, gender, a kids profile switch, language and preferred genre.'),
  tv('profile-avatar', 'Choosing an avatar', 'An avatar collection beside the profile, with Save & Continue and Reset changes.'),
  tv('homepage', 'Homepage', 'The hero banner over the Continue Watching rail, with the side navigation at the left.'),
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
]

// The six TV screens the page shows, in the order of a viewer's journey. The other 17 stay in TV_SCREENS.
const FEATURED_TV = ['sign-in-qr', 'onboarding', 'homepage', 'title-page', 'search', 'player-settings']

export const SCREENS = {
  id: 'screens',
  title: 'Smart TV screens',
  lede: 'Landscape screens for TV, from signing in to the player. Select one to see it full size.',
  all: TV_SCREENS,
  items: FEATURED_TV.map((name) => TV_SCREENS.find((screen) => screen.id === name)),
}

export const MOBILE_TV = {
  title: 'Mobile and Smart TV experience',
  lede: `${capitalise(numberWord(INTERACTIVITY.clips.length))} prototype recordings of the mobile app and ${numberWord(SCREENS.items.length)} of the ${TV_SCREENS.length} TV screens.`,
}

/* ---------------------------------------------------------------------------------------------- Outcome and learnings */

export const OUTCOME = {
  title: 'Outcome and learnings',
  outcomeTitle: 'Intended outcome',
  // The Figma overview's own outcome sentence, kept as written (it says "intended", and so does this page).
  outcome:
    'A more structured design approach, clearer interaction patterns, and a reusable UI foundation intended to improve consistency and support efficient design across the product.',
  producedTitle: 'What I designed',
  // The Figma overview's "What I designed" card, as a list.
  produced: [
    'Targeted UX improvements',
    'Refined user flows and interactions',
    'Reusable design system components',
    'UI screens aligned with the product requirements',
  ],
  reflectionsTitle: 'Design reflections',
  reflectionsNote: 'Drawn from the project’s approach, not from measured results or research.',
  // NOTE: the Figma page has no learnings. These three follow from the approach it describes (the audit first, targeted
  // refinements, shared components) and are labelled as reflections; replace them with your own words if you have them.
  reflections: [
    { title: 'Understand before changing', text: 'Auditing the existing experience first keeps each proposal tied to how the product already works.' },
    { title: 'Targeted over total', text: 'Focused refinements suit an established product, because familiar behaviour stays intact.' },
    { title: 'Shared patterns scale', text: 'Building from shared components and tokens reduces the need to redesign similar elements.' },
  ],
}
