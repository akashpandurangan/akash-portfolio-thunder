import { asset } from './caseStudyAssets'
import { CASE_STUDY_PATH } from '../hooks/useHashRoute'

/*
 * Copy and structure of the OTT video-player design-system case study (route: CASE_STUDY_PATH).
 *
 * Everything here comes from the Figma files "Design System: Video Player" and "Ai studio: Initial Draft" (the navigation
 * chapter) — names, counts, values and behaviour were read from the files, and the portfolio's own text (Projects tab,
 * Experience).
 * Nothing is a business metric: there are no team sizes, dates or outcome figures because none were provided.
 * Items that need your own words are flagged with NOTE.
 */

/** The page index. `id` is both the section's DOM id and the last part of its address. */
export const CHAPTERS = [
  { id: 'overview', label: 'Overview' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'components', label: 'Components' },
  { id: 'playground', label: 'Playground' },
  { id: 'demos', label: 'Mobile and TV' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'takeaways', label: 'Takeaways' },
]

export const chapterPath = (id) => `${CASE_STUDY_PATH}/${id}`

/* ---------------------------------------------------------------------------------------------- Hero */

export const HERO = {
  title: ['One system.', 'Multiple platforms.', 'Consistent experiences.'],
  summary:
    'Building scalable UI foundations for OTT entertainment and digital products through reusable components, thoughtful interaction patterns, and consistent cross-platform experiences.',
  // NOTE: role is the title used across the portfolio; scope and platforms are the tags on the OTT card of the Projects tab.
  meta: [
    { label: 'Role', values: ['Senior Product Designer'] },
    { label: 'Scope', values: ['Design System', 'Component Libraries', 'Design Tokens', 'Cross-Platform UX'] },
    { label: 'Platforms', values: ['Mobile', 'Web', 'Tablet', 'TV'] },
  ],
  primaryLink: { label: 'Explore the components', to: chapterPath('components') },
  secondaryLink: { label: 'Try the playground', to: chapterPath('playground') },
}

/* ---------------------------------------------------------------------------------------------- Overview */

export const OVERVIEW = {
  lede: 'An OTT player has to feel like one product on a phone, in a browser and on a television. This system documents that player in Figma as reusable components, each with its parts, states and usage.',
  blocks: [
    {
      id: 'context',
      title: 'Project context',
      body: [
        'The files cover the mobile player in portrait and landscape, a remote-driven TV player, and a web player, along with the pieces they share: the seek bar, player options, settings panels, content cards, dialogs and error states.',
        'Each component is documented in the same way: a header, the component with its variants, and a usage area that shows it in a real screen.',
      ],
    },
    {
      id: 'challenge',
      title: 'Design challenge',
      body: [
        'Screen size, input and playback state all change at once. A phone is touched, a TV is driven by a remote and needs a clear focus, and a browser has a pointer and a keyboard.',
        'The same player also has to handle content, live streams and ads, plus menus, overlays and failures, and stay recognisable in every one of them.',
      ],
    },
    {
      id: 'contribution',
      title: 'My contribution',
      // NOTE: adapted from the Quickplay entry in experience.js and the OTT card on the Projects tab. Edit to your own words.
      body: [
        'I worked on building a consistent and scalable design system for OTT platforms: streamlining UI components, design tokens and reusable patterns so the same player experience could be applied across mobile, web, tablet and TV.',
        'My process combines product thinking, user-centred design and scalable design systems, working with product, engineering and QA teams from requirements through to implementation and design QA.',
      ],
    },
    {
      id: 'approach',
      title: 'Design approach',
      list: [
        'Document every component the same way, with its parts, its variants and where it is used.',
        'Name states once and reuse them: default, focused, pressed, disabled and active mean the same thing on every platform.',
        'Explore layouts side by side, such as the TV player layout versions and the mobile settings in full, classic and tabbed forms.',
        'Design the failure paths too, with a documented set of playback and account errors.',
        'Keep example content neutral in the specification so the structure is what you read.',
      ],
    },
  ],
}

/* ---------------------------------------------------------------------------------------------- Foundations */

export const FOUNDATIONS = {
  lede: 'These are the foundations that exist in the files: colour that carries meaning, one type family per surface, a small spacing base, and a consistent way of naming states.',
  colors: {
    title: 'Colour',
    intro: 'Colour tells you what the player is doing. On TV and web the seek bar is white for content, orange for a live stream and yellow for an ad. The mobile player uses the brand red for progress and amber for ads.',
    groups: [
      {
        name: 'Playback modes',
        swatches: [
          { name: 'Brand', hex: '#FF2600', use: 'The Brand paint style. Mobile progress and selected check badges.' },
          { name: 'Live progress', hex: '#FF5E00', use: 'Played position of a live stream on TV, and the check in TV panels.' },
          { name: 'Live dot', hex: '#EC2027', use: 'The red dot of the Live tag on mobile (#FF0000 on TV).' },
          { name: 'Ad', hex: '#E3DB30', use: 'Ad progress, Ad tag and ad markers on TV. Mobile uses amber #FFB800.' },
        ],
      },
      {
        name: 'Surfaces and text',
        swatches: [
          { name: 'Component surface', hex: '#1B1B1B', use: 'Cards, options and panels in the TV and web documentation.' },
          { name: 'Mobile panel', hex: '#17181A', use: 'Settings popups on mobile.' },
          { name: 'TV screen surface', hex: '#1E1F20', use: 'Episode cards and dialogs on TV screens.' },
          { name: 'Text', hex: '#FFFFFF', use: 'Primary text and icons. Secondary text sits at #A7A7A7 and #8E918F.' },
          { name: 'Outline', hex: '#79747E', use: 'Outlines of unselected options in the mobile settings.' },
        ],
      },
    ],
  },
  type: {
    title: 'Typography',
    intro: 'Roboto carries the TV, web and mobile settings. The portrait player base components use Mulish at smaller sizes. The TV scale is built on 16, 24, 30 and 48px; the web scale on 14, 18 and 40px.',
    scales: [
      { token: 'Text/TV/Body-16px/Medium', family: 'Roboto', weight: 500, size: 16, line: 1.5, sample: 'Next episode starts in 8 seconds' },
      { token: 'Text/TV/H5-24px/Medium', family: 'Roboto', weight: 500, size: 24, line: 1.2, sample: 'Audio and Subtitles' },
      { token: 'TV/4xl-30px', family: 'Roboto', weight: 500, size: 30, line: 1.2, sample: 'Video Quality' },
      { token: 'Text/TV/H2-48px/Medium', family: 'Roboto', weight: 500, size: 48, line: 1.2, sample: 'Series Name' },
    ],
    inUse: [
      { surface: 'TV and web components', style: 'Roboto Medium and SemiBold', sizes: '28 to 30' },
      { surface: 'Mobile settings', style: 'Roboto Regular, Medium and SemiBold', sizes: '14 to 20' },
      { surface: 'Portrait player base', style: 'Mulish Medium, SemiBold and Bold', sizes: '10 to 14' },
    ],
  },
  spacing: {
    title: 'Spacing and sizing',
    intro: 'The variables are deliberately small: a 2 and a 4 base unit, a full-pill radius and a 10px radius. Everything else is set by the canvas each component lives on.',
    tokens: [
      { name: 'Baseline 1', value: '2' },
      { name: 'Baseline 2', value: '4' },
      { name: 'Radius 1', value: '100 (full pill)' },
      { name: 'Rounded', value: '10' },
    ],
    canvases: [
      { name: 'TV and web screen', value: '1920 × 1080' },
      { name: 'Mobile popup width', value: '390' },
      { name: 'Mobile mini player', value: '390 × 219' },
      { name: 'TV option chip height', value: '90' },
    ],
    ratios: ['16:9', '1:1', '4:3', '2:3', '3:2', '21:9', '3:1', '7:4', '3:4'],
    cardWidths: [
      { size: 'XS', width: 262 },
      { size: 'S', width: 409 },
      { size: 'M', width: 555 },
      { size: 'L', width: 703 },
    ],
  },
  states: {
    title: 'Component states',
    intro: 'States are named once and reused. Option chips, list rows, cards and multi-camera options all draw from the same words.',
    figures: [
      { image: 'ott/components/opt-style.webp', title: 'Option styles and states', caption: 'Fill, standard and outline, each as default, focused, pressed and disabled.', span: 'full' },
      { image: 'ott/components/panel-lists.webp', title: 'List row states', caption: 'Default, hover, active, hover with active, and outline.', span: 'narrow' },
    ],
    names: ['Default', 'Hover', 'Focused', 'Pressed', 'Active', 'Disabled'],
  },
  conventions: {
    title: 'Design conventions',
    items: [
      { title: 'Components beside usage', text: 'Each block has a header, the component with its variants, and a usage area that puts it in a real screen.' },
      { title: 'Pictograms in property names', text: 'Variant properties carry a pictogram so they scan in the panel: state, position, variant, size, type and timer.' },
      { title: 'Orientation is a property', text: 'Panels exist as portrait and landscape versions of one component, not as separate designs.' },
      { title: 'Neutral placeholders', text: 'The card specification uses a flame placeholder and generic copy, so layout and states are what you read.' },
    ],
  },
}

/* ---------------------------------------------------------------------------------------------- Components */

const fig = (image, title, caption, extra = {}) => ({ image, title, caption, ...extra })

export const COMPONENTS = {
  lede: 'The video-player components, grouped by what they do for the viewer. Select any figure to open it at full size.',
  categories: [
    {
      id: 'cards',
      label: 'Content cards',
      intro: 'Cards for episodes, recommendations, next-up and camera angles. They share sizes, ratios and focus.',
      blocks: [
        {
          title: 'Card and supporting layers',
          // One row, each card at its real size relative to the others (the Large cards are wider than the Small ones).
          layout: 'row',
          text: 'A card is a media tile with optional layers: a badge, a partner or brand mark, a play button and a progress bar. The specification shows four sizes, each as standard and compact; the component also offers classic and wide types.',
          parts: ['XS', 'S', 'M', 'L', 'Standard', 'Compact', 'Badge', 'Brand layer', 'Play button', 'Progress bar'],
          figures: [
            fig('ott/cards/card-spec.webp', 'Card with supporting layers', 'A poster card with a Free badge, title, secondary text and description.', { span: 'poster' }),
            fig('ott/cards/card-L-std.webp', 'Large, standard', 'Media with the title below.', { span: 'wide' }),
            fig('ott/cards/card-L-compact.webp', 'Large, compact', 'Media with the title on the image.', { span: 'wide' }),
            fig('ott/cards/card-S-std.webp', 'Small, standard', 'The same card at 409 wide.', { span: 'half-wide' }),
            fig('ott/cards/card-S-compact.webp', 'Small, compact', 'Compact at the small size.', { span: 'half-wide' }),
          ],
        },
        {
          title: 'Supporting layers up close',
          layout: 'row',
          text: 'Badges, brand marks, play buttons and progress bars scale with the card size, so a layer never has to be redrawn per size.',
          figures: [
            fig('ott/cards/card-brand.webp', 'Brand layer, play button and progress', 'Five sizes of each layer.', { span: 'full' }),
            fig('ott/cards/card-badge.webp', 'Badge layer', 'Badge placement in six positions across five sizes.', { span: 'full' }),
            fig('ott/cards/card-progress.webp', 'Progress bar layer', 'Progress at five sizes in three treatments.', { span: 'full' }),
          ],
        },
        {
          title: 'Episodes, more like this, and next up',
          layout: 'row',
          text: 'Episode cards have landscape and portrait forms with a focused and a default state. The next-up card adds Playing Next and Watch Credits actions.',
          figures: [
            fig('ott/components/episode.webp', 'Episode card', 'Landscape and portrait, focused and default.', { span: 'narrow' }),
            fig('ott/components/play-next.webp', 'Next up', 'Portrait and landscape forms with two actions.', { span: 'wide' }),
            fig('ott/components/play-icon-pos.webp', 'Play icon positions', 'Centre and the four corners.', { span: 'full' }),
          ],
        },
        {
          title: 'Multi-camera options',
          layout: 'row',
          text: 'Camera angles are cards with a label and a Now Playing state. They can sit as list rows or as media cards, each with default, active, focused and focused-active states.',
          figures: [
            fig('ott/components/multicam-angle.webp', 'Camera angle cards', 'Three styles across the four states.', { span: 'wide' }),
            fig('ott/components/multicam-opt1.webp', 'Option style 1', 'Default, default active, focused and focused active.', { span: 'narrow' }),
            fig('ott/components/multicam-opt3.webp', 'Option style 3', 'Default and focused.', { span: 'half-wide' }),
            fig('ott/components/multicam-opt2.webp', 'Option style 2', 'Text-only option.', { span: 'half-wide' }),
          ],
        },
      ],
      video: {
        title: 'Card component properties',
        text: 'A screen recording of the card component in Figma. Choosing the size, the type (standard, classic, wide standard, wide classic or compact), the ratio, a badge label and the supporting layers shows how one component covers every card.',
        caption: 'Screen recording from Figma: setting the card component’s properties.',
      },
    },
    {
      id: 'playback',
      label: 'Playback and progress',
      intro: 'Everything that tells you where you are and lets you move: the seek bar and its parts, titles and ratings, seek steps, thumbnails and the Skip Intro button.',
      blocks: [
        {
          title: 'Seek bar anatomy',
          text: 'A seek bar is assembled from a handle, a runtime timer, a live pointer and tag, an ad tag with its counter, and ad markers on the track.',
          parts: ['Seek handle', 'Timer runtime', 'Live pointer', 'Live tag', 'Ad tag', 'Ad 1 of 2', 'Ad marker', 'Played position'],
          figures: [fig('ott/components/seek-parts.webp', 'Seek bar parts', 'The parts, and the track at several played positions.', { span: 'full' })],
        },
        {
          title: 'Content, live and ad seek bars',
          layout: 'row',
          text: 'The same anatomy runs in three modes. White is content, orange is live, yellow is an ad. Timers and tags can sit above, left or right, and the elapsed and remaining time can swap.',
          tabs: [
            { id: 'content', label: 'Content', figure: fig('ott/components/seek-content.webp', 'Content seek bar variations', 'Elapsed and total time, or remaining time, in different positions.') },
            { id: 'live', label: 'Live', figure: fig('ott/components/seek-live.webp', 'Live seek bar variations', 'The Live tag is red at the live edge and grey when behind it.') },
            { id: 'ad', label: 'Ad', figure: fig('ott/components/seek-ad.webp', 'Ad seek bar variations', 'Yellow progress with an Ad tag and the remaining ad time.') },
          ],
          figures: [fig('ott/components/seek-final.webp', 'Final seek bars', 'One of each mode as it ships.', { span: 'full' })],
        },
        {
          title: 'Titles and ratings',
          text: 'The title header aligns left or right, and the rating block can be shown or hidden. A red rule sets the rating apart from the title.',
          figures: [
            fig('ott/components/titles-title.webp', 'Title header', 'Movie and series titles with a description, aligned left or right.'),
            fig('ott/components/titles-ratings.webp', 'Rating block', 'Rating and genres, aligned left or right.'),
          ],
        },
        {
          title: 'Seek steps and thumbnails',
          layout: 'row',
          text: 'While scrubbing, the player shows the time, a step chip (5s, 10s, or a 1x to 3x speed) and a thumbnail with an orange frame on the selected moment.',
          figures: [
            fig('ott/components/thumb-sneek.webp', 'Seek thumbnails', 'A strip of moments with the selected one outlined, above the seek bar.', { span: 'full' }),
            fig('ott/components/fwd-rew.webp', 'Forward and rewind chips', 'Step chips beside the timer.', { span: 'wide' }),
            fig('ott/components/seek-speed.webp', 'Seek speed chips', '5s, 10s and 1x to 3x, forward and back.', { span: 'narrow' }),
          ],
        },
        {
          title: 'Skip Intro',
          text: 'A pill that sits above the seek bar and can be placed left, centre or right.',
          figures: [fig('ott/components/skip-button.webp', 'Skip Intro placements', 'Left, centre and right above the seek bar.', { span: 'full' })],
        },
      ],
    },
    {
      id: 'options',
      label: 'Options and menus',
      intro: 'How a viewer changes audio, subtitles, quality and speed: option chips, icon buttons, and the panels and sheets they open.',
      blocks: [
        {
          title: 'Player options',
          text: 'Options come as labelled chips or icon buttons, in three styles. Focused is a white fill on TV, and a disabled option dims.',
          parts: ['Fill', 'Standard', 'Outline', 'Default', 'Focused', 'Pressed', 'Disabled'],
          figures: [
            fig('ott/components/opt-style.webp', 'Option style and state', 'Three styles in four states.', { span: 'full' }),
            fig('ott/components/opt-icon-button.webp', 'Icon button states', 'Icon-only options in the same states.', { span: 'narrow' }),
            fig('ott/components/opt-icon-set.webp', 'Icon button set', 'Back, pause, audio, subtitles, video and settings, with or without dividers.', { span: 'wide' }),
          ],
        },
        {
          title: 'Option list and final bar',
          text: 'The list of available options (audio and subtitles, setting, subtitles, audio, video quality, next episode, scorecard, key moments) and the final bar in left, centre or right position.',
          figures: [
            fig('ott/components/opt-list.webp', 'Options', 'The option labels and their icons.', { span: 'narrow' }),
            fig('ott/components/opt-final.webp', 'Final player options', 'Video Quality, Audio and Subtitles, Setting and Next Episode.', { span: 'wide' }),
          ],
        },
        {
          title: 'Options control panel',
          text: 'Panels open beside or below the options. Language and quality share a two-column panel, subtitle size, style and position get their own, and every panel exists in portrait and landscape.',
          figures: [
            fig('ott/components/panel-lang-portrait.webp', 'Language and quality, portrait', 'Two columns with a check on the selected value.'),
            fig('ott/components/panel-subtitle-portrait.webp', 'Subtitle, portrait', 'Language list beside size, style and position.'),
            fig('ott/components/panel-lang-landscape.webp', 'Language and quality, landscape', 'The same content laid out as rows.', { span: 'wide' }),
            fig('ott/components/panel-quality-portrait.webp', 'Video quality', 'Auto, low, medium and high.', { span: 'narrow' }),
            fig('ott/components/panel-audsub-landscape.webp', 'Audio and subtitle, landscape', 'Audio above subtitle, with a selected state.', { span: 'wide' }),
            fig('ott/components/drawer-portrait.webp', 'Modal drawer', 'A closable drawer with the selected row.', { span: 'narrow' }),
          ],
        },
      ],
    },
    {
      id: 'overlays',
      label: 'Overlays and dialogs',
      intro: 'Subtitles, dialogs and errors sit over the picture, so they are designed against it: gradients, blur and neutral backgrounds.',
      blocks: [
        {
          title: 'Subtitles',
          text: 'Subtitles are specified in three sizes and four styles, in English, Tamil and Hindi, and can sit at the top or the bottom of the picture.',
          parts: ['Small', 'Medium', 'Large', 'Style 1', 'Style 2', 'Style 3', 'Style 4', 'English', 'Tamil', 'Hindi', 'Top', 'Bottom'],
          figures: [fig('ott/components/subtitle-custom.webp', 'Customise subtitle', 'Three sizes by four styles in English, Tamil and Hindi.', { span: 'full' })],
        },
        {
          title: 'Dialogs and errors',
          text: 'Dialogs are built from a heading, a description, an icon and a button set. They come as standard, full-screen and two-column types, with the icon outside, inside or on top, over a solid, blurred or empty background.',
          parts: ['Standard', 'Full screen', 'Two column', 'Icon outside', 'Icon inside', 'Icon top', 'Solid', 'Blur', 'No background'],
          figures: [
            fig('ott/tv/error-dialog.webp', 'Dialog over the picture', 'A standard dialog with a primary and a secondary action.', { span: 'half-wide' }),
            fig('ott/tv/error-full.webp', 'Full-screen dialog', 'The same message over a blurred background.', { span: 'half-wide' }),
            fig('ott/tv/error-doc.webp', 'Error documentation', 'Five groups of errors, each with its message and actions.', { span: 'full' }),
          ],
        },
      ],
    },
  ],
}

/** The 12 documented errors, grouped as in the Figma "error screens" documentation. Actions are written as labels. */
export const ERRORS = [
  {
    group: 'Network',
    items: [
      { id: 'offline', name: 'No internet connection', message: 'No Internet Connection. Please check your network settings and try again.', actions: ['Retry', 'Check network settings'] },
      { id: 'slow', name: 'Low bandwidth or slow internet', message: 'Your connection is too slow for smooth playback. The video may buffer or switch to a lower quality.', actions: ['Continue in low quality', 'Retry connection'] },
    ],
  },
  {
    group: 'Playback',
    items: [
      { id: 'unavailable', name: 'Content unavailable', message: 'This video is currently unavailable. Please try again later.', actions: ['Retry', 'Go back to home'] },
      { id: 'drm', name: 'DRM restriction', message: 'This content cannot be played on your device due to licensing restrictions.', actions: ['Contact support', 'More info'] },
      { id: 'timeout', name: 'Playback timeout or stream not loading', message: 'Something went wrong while loading the video. Please try again.', actions: ['Retry', 'Go to home'] },
      { id: 'streams', name: 'Too many concurrent streams', message: 'You have reached the maximum number of active streams on your account.', actions: ['Manage devices', 'Upgrade plan'] },
    ],
  },
  {
    group: 'App and system',
    items: [
      { id: 'crash', name: 'App crash or unexpected error', message: 'Oops! Something went wrong. Please restart the app and try again.', actions: ['Restart app', 'Report issue'] },
      { id: 'outdated', name: 'Firmware or app version outdated', message: 'Your app version is outdated. Please update to continue watching.', actions: ['Update app', 'Later'] },
      { id: 'storage', name: 'Device storage full', message: 'Your device storage is full. Clear some space to continue.', actions: ['Manage storage', 'Clear cache'] },
    ],
  },
  {
    group: 'Account',
    items: [
      { id: 'signed-out', name: 'Not logged in or session expired', message: 'Please sign in to continue watching.', actions: ['Sign in', 'Back to home'] },
      { id: 'subscription', name: 'Subscription required or expired', message: 'This content is available for subscribers only. Please renew your subscription.', actions: ['Subscribe now', 'Manage subscription'] },
    ],
  },
  {
    group: 'Region',
    items: [{ id: 'geo', name: 'Content not available in region', message: 'This video is not available in your location.', actions: ['More info', 'Go back'] }],
  },
]

/* ---------------------------------------------------------------------------------------------- Playground */

/** Real option lists from the settings popups, with the selections the Figma frames show. */
export const SETTINGS = {
  audio: ['English', 'Tamil', 'Hindi'],
  subtitleLanguage: ['Off', 'Tamil', 'Hindi'],
  video: [
    { label: 'Auto Recommended', detail: 'Auto' },
    { label: 'Full HD', detail: '1080p' },
    { label: 'High', detail: '720p' },
    { label: 'Medium', detail: '480p' },
    { label: 'Data Saver', detail: '' },
  ],
  speed: [
    { label: 'Slowest', value: 0.5 },
    { label: 'Slow', value: 0.75 },
    { label: 'Normal', value: 1 },
    { label: 'Fast', value: 1.25 },
    { label: 'Fastest', value: 1.5 },
  ],
  issues: [
    { label: 'Buffering & Streaming', detail: 'Frequent buffering, video won’t start or similar issues' },
    { label: 'Subtitle Issues', detail: 'Missing, mismatched with audio or incorrect' },
    { label: 'Video Issues', detail: 'Video is blurry, broken or fuzzy' },
    { label: 'Audio Issues', detail: 'Audio is low, mismatched or missing' },
  ],
  subtitleSizes: ['Small', 'Medium', 'Large'],
  subtitleStyles: ['Plain', 'White on black', 'Yellow on black', 'Black on white'],
}

export const PLAYGROUND = {
  lede: 'Selected components rebuilt as working React. They follow the specification (names, states, options) and respond to touch, pointer and keyboard. They are live prototypes, not exports.',
  legend: [
    { kind: 'live', label: 'Live prototype', text: 'Built in React from the Figma specification.' },
    { kind: 'figma', label: 'Figma reference', text: 'An export from the design file.' },
  ],
}

/* ---------------------------------------------------------------------------------------------- Mobile and TV */

/** The ten states of mobile layout 1, in the order the Figma frames run. */
export const MOBILE_STATES = [
  { file: 'v1-01', title: 'Content info', text: 'Rating and content advisory with the audio languages to choose from.' },
  { file: 'v1-02', title: 'Controls and Skip Intro', text: 'Back, cast, settings and fullscreen at the top; rewind, pause and forward in the middle; Skip Intro above the seek bar.' },
  { file: 'v1-03', title: 'Ad playback', text: 'A yellow progress bar, Skip Ads and the ad counter: “Ad 1 of 3, 00:20”.' },
  { file: 'v1-04', title: 'Scrubbing with a thumbnail', text: 'A thumbnail and timestamp follow the handle.' },
  { file: 'v1-05', title: 'Scrubbing with a timestamp', text: 'The timestamp alone, for when a thumbnail is not available.' },
  { file: 'v1-06', title: 'Live', text: 'The seek bar fills to the live edge and the Live tag turns red.' },
  { file: 'v1-07', title: 'Behind live', text: 'The Live tag is grey and a Go Live button returns to the edge.' },
  { file: 'v1-08', title: 'Cover view', text: 'Artwork only, with the viewer count.' },
  { file: 'v1-09', title: 'Next up', text: 'Recommended next in 5 seconds, with Cancel and Play Now.' },
  { file: 'v1-10', title: 'Replay', text: 'At the end of the content the centre control becomes replay.' },
]

export const MOBILE_LAYOUTS = [
  { file: 'v1', label: 'Layout 1', text: 'The remaining time sits beside the bar, at the right.' },
  { file: 'v2', label: 'Layout 2', text: 'The bar runs along the bottom edge, with the remaining time above it.' },
  { file: 'v3', label: 'Layout 3', text: 'Time on both sides: elapsed at the left, remaining at the right.' },
  { file: 'v4', label: 'Layout 4', text: 'The bar sits above a combined elapsed and remaining readout.' },
]

export const TV_GROUPS = [
  {
    id: 'layouts',
    label: 'Layouts',
    intro: 'The player layout was explored in versions before settling the position of title, rating, options and controls.',
    frames: [
      { file: 'layout-v1', title: 'Version 1', text: 'Title and rating at the top left, options at the top right, controls and seek bar below.' },
      { file: 'layout-v2', title: 'Version 2', text: 'Title and rating split across the top, a centred play control and options under the bar.' },
      { file: 'layout-v3', title: 'Version 3', text: 'Title beside the controls, with icon-only options at the right.' },
      { file: 'layout-v4', title: 'Version 4', text: 'Back, restart and next at the top left, the bar full width and labelled options beneath.' },
    ],
  },
  {
    id: 'menus',
    label: 'Menus',
    intro: 'Audio, subtitle and quality menus are drawn as side panels, popups and bars.',
    frames: [
      { file: 'audio-language', title: 'Language and quality', text: 'A two-column panel with the selected value checked.' },
      { file: 'audio-popup', title: 'Audio popup', text: 'A list anchored under the options, with Off selected.' },
      { file: 'quality-panel', title: 'Video quality panel', text: 'A side panel with a focused row in white.' },
      { file: 'quality-bar', title: 'Video quality bar', text: 'The same choices as a bar along the bottom.' },
      { file: 'subtitle-panel', title: 'Subtitle panel', text: 'Language beside size, style and position.' },
      { file: 'subtitle-bar', title: 'Subtitle bar', text: 'Size, style and position above the language row.' },
      { file: 'audio-subtitle', title: 'Audio and subtitle', text: 'Both lists in one panel, with a divider between them.' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    intro: 'Episodes and recommendations replace the player controls with a rail or a list of cards.',
    frames: [
      { file: 'episodes-vertical', title: 'Episodes, vertical', text: 'Seasons on the left, a scrolling list of episodes.' },
      { file: 'episodes-horizontal', title: 'Episodes, horizontal', text: 'Season tabs above a rail of cards.' },
      { file: 'more-like-this', title: 'More like this', text: 'The same rail used for recommendations.' },
    ],
  },
  {
    id: 'moments',
    label: 'Moments',
    intro: 'The states a stream moves through: intro, credits, scrubbing, live, camera changes, ads and pause.',
    frames: [
      { file: 'skip-intro', title: 'Skip Intro', text: 'A white pill above the seek bar.' },
      { file: 'next-up-credits', title: 'Credits and next up', text: 'Playing Next in 8s and Watch Credits over the credit roll.' },
      { file: 'seek-preview', title: 'Seek preview', text: 'A strip of thumbnails with the current moment outlined.' },
      { file: 'live', title: 'Live', text: 'Live tag, viewer count and an On Live button.' },
      { file: 'multicam-a', title: 'Multi camera', text: 'A camera list down the right edge with Now Playing.' },
      { file: 'multicam-b', title: 'Multi camera, option style 2', text: 'Cards with the label on the picture.' },
      { file: 'ad', title: 'Ad', text: 'Yellow progress, an Ad tag and “Ad 1 of 2”.' },
      { file: 'paused', title: 'Paused', text: 'Options visible, the play control focused.' },
      { file: 'playing', title: 'Playing', text: 'The picture with every overlay hidden.' },
    ],
  },
  {
    id: 'errors',
    label: 'Errors',
    intro: 'A dialog over the picture, or a full-screen message over a blurred one, with a primary and a secondary action.',
    frames: [
      { file: 'error-dialog', title: 'Dialog', text: 'Streaming Limit, with Try again and Cancel.' },
      { file: 'error-full', title: 'Full screen', text: 'The same message over a blurred picture.' },
    ],
  },
]

/* ---------------------------------------------------------------------------------------------- Platforms */

export const PLATFORMS = {
  lede: 'The same patterns were drawn for the three platforms that have their own designs in these files. Pick one to see how the player, its options and its focus change.',
  note: 'Tablet and set-top box designs are not part of the referenced Figma frames, so they are not shown here.',
  devices: [
    {
      id: 'mobile',
      label: 'Mobile',
      image: { path: 'ott/mobile/player/v1-02.webp', alt: 'Mobile player with controls shown, Skip Intro and a red seek bar' },
      caption: 'Mobile player, controls shown.',
      facts: [
        { label: 'Layout and sizing', text: 'Portrait player at 390 wide, with settings as a bottom sheet with a drag handle. In landscape the same panels sit to the side. Type is 14 to 20px Roboto, 10 to 14px Mulish in the player.' },
        { label: 'Interaction', text: 'Touch. Panels carry a close X and a back arrow, and the portrait sheet has a drag handle.' },
        { label: 'Focus and selection', text: 'Selection is a checked badge in the brand red, with the selected row or chip tinted to match.' },
        { label: 'Information density', text: 'High on a small screen: icons only in the player, with text appearing in lists and sheets.' },
        { label: 'Player controls', text: 'Back, cast, settings and fullscreen at the top; rewind, pause and forward in the middle; Skip Intro, a red seek bar and the remaining time at the bottom.' },
      ],
    },
    {
      id: 'web',
      label: 'Web',
      image: { path: 'ott/web-player.webp', alt: 'Web player with a labelled bottom control bar and an amber seek bar' },
      caption: 'Web player, 1920 × 1080.',
      facts: [
        { label: 'Layout and sizing', text: 'A 1920 × 1080 frame with the title at the top left, an alert icon at the top right and a labelled control bar along the bottom.' },
        { label: 'Interaction', text: 'A pointer and keyboard surface: every option carries a text label beside its icon.' },
        { label: 'Focus and selection', text: 'The web frame shows the resting state of the controls. The option states are specified in the shared player options.' },
        { label: 'Information density', text: 'The highest of the three: seven labelled options plus volume and fullscreen share one bar.' },
        { label: 'Player controls', text: 'Restart, Speed, Video Quality, Subtitles and Audio, Key Moments, Episodes and Next Episode, with a More Videos entry at the right.' },
      ],
    },
    {
      id: 'tv',
      label: 'TV',
      image: { path: 'ott/tv/audio-popup.webp', alt: 'TV player with the Audio popup open under the options' },
      caption: 'TV player with the Audio popup open.',
      facts: [
        { label: 'Layout and sizing', text: 'A 1920 × 1080 canvas with 28 to 30px Roboto, so every control is readable from a sofa. Panels open at the side or the bottom, in portrait or landscape forms.' },
        { label: 'Interaction', text: 'A remote. Focus moves from option to option, so every option has a designed focused state.' },
        { label: 'Focus and selection', text: 'Focus is always visible: a white fill, or a white outline in the outline style. A selected row gets an orange check.' },
        { label: 'Information density', text: 'The lowest: few controls on screen at a time, with detail moved into panels.' },
        { label: 'Player controls', text: 'Restart, pause and next, a white seek bar with yellow ad markers, and options for Subtitles, Audio and Video Quality.' },
      ],
    },
  ],
  compare: {
    columns: ['Mobile', 'Web', 'TV'],
    rows: [
      { label: 'Canvas', values: ['390 wide', '1920 × 1080', '1920 × 1080'] },
      { label: 'Input', values: ['Touch', 'Pointer and keyboard', 'Remote'] },
      { label: 'Text size', values: ['10 to 20', '14 to 18, 40 for titles', '28 to 30'] },
      { label: 'Selected state', values: ['Red check badge', 'Not shown in the web frame', 'White fill and orange check'] },
      { label: 'Options', values: ['Icons, then sheets', 'Labelled bar', 'Labelled chips and panels'] },
      { label: 'Content seek bar', values: ['Red', 'Amber', 'White'] },
    ],
  },
}

/* ---------------------------------------------------------------------------------------------- Navigation */

/** The navigation system of the AI Studio web app. Its file documents it as atoms, a molecule and a drawer. */
export const NAVIGATION = {
  title: 'Navigation',
  lede: 'From the AI Studio web app rather than the video player. It is documented as atoms, a molecule and a drawer: a nav label is the smallest unit; navigation items add default, hover and active states and a dropdown; a source drawer is the master the others copy from.',
  quote: 'All copy and icon changes must be done in the Source Navigation Drawer, not inside instances.',
  figures: [
    { image: 'ai-studio/system-nav-drawer.webp', title: 'Navigation drawer', text: 'Six drawer states, one per main menu: Dashboard, Library, Projects, AI Editor, Brand Kit and Social Trends.', span: 'full' },
    { image: 'ai-studio/system-nav-submenu.webp', title: 'Contextual submenu variants', text: 'The selected main menu decides which submenu items are visible, such as only Library items under Library.', span: 'wide' },
    { image: 'ai-studio/system-nav-items.webp', title: 'Navigation items', text: 'Default, hover and active, with and without a dropdown.', span: 'narrow' },
    { image: 'ai-studio/system-nav-source.webp', title: 'Source navigation drawer', text: 'The master component and the rule for editing it.', span: 'narrow' },
  ],
}

/* ---------------------------------------------------------------------------------------------- Takeaways */

export const TAKEAWAYS = {
  lede: 'No measured results were supplied, so these are the qualitative things the files make clear.',
  groups: [
    {
      title: 'What the system documents',
      items: [
        'Components for playback, progress, options, settings, cards, subtitles, dialogs and errors, each with its variants and states.',
        'Three platform expressions of one player: a touch player, a pointer and keyboard player, and a remote-driven player.',
        'Twelve error conditions with their messages and actions.',
        'A card system that scales layers with size, so one component covers every card.',
      ],
    },
    {
      title: 'Decisions visible in the files',
      items: [
        'Colour encodes the playback mode, so a viewer reads live and ad states at a glance.',
        'Focus is a first-class state on TV, designed as a white fill or an outline, not left to a default ring.',
        'Settings exist as full, classic and tabbed forms, each in portrait and landscape.',
        'Orientation is a property of a panel, so portrait and landscape stay one component.',
      ],
    },
    {
      title: 'Carried forward',
      // NOTE: derived from the structure of the files. Replace or extend with your own reflections.
      items: [
        'Name a state once and use it everywhere; it is what let the playground reuse one settings panel on mobile and TV.',
        'Design the unhappy paths early. Errors are the states most likely to be left undefined.',
        'Document usage with the component. A component beside its real screen is easier to apply than one described in words.',
      ],
    },
  ],
}

/** Convenience for images referenced by path in the data above. */
export const resolveImage = asset
