import { caseStudyPath } from '../hooks/useHashRoute'
import { EXPERIENCE } from './experience'
import { CASE_STUDIES } from './caseStudies'

/*
 * Copy and structure of the AI Studio case study (route: AI_PATH).
 *
 * Source: the Figma file "Ai studio _ Initial Draft" (CAm8Qst3egQvp3ZF84hv6q), nodes 2075:13962 (the board of the
 * dashboard, trends, narrative and performance screens), 3889:24014 (trend insights and filters), 15127:34451 (the
 * library) and 897:32907 (the brand kit). The page follows the structure of the other case studies (banner, overview,
 * then one chapter per area of the product), not the order of the board.
 *
 * What the file does not contain, and this page therefore does not say: the problem, the users, research, the team,
 * dates, decisions or results. Everything below describes what the screens show, in the words of the screens where a
 * label is quoted. The role is the one of the Quickplay entry in experience.js; scope and platforms are the tags of the
 * AI Studio card on the Projects tab. Items that need your own words are flagged with NOTE.
 *
 * Choices worth knowing:
 *  - Where the board holds two versions of a flow, the later one is used (the narrative flow of 19-02-2026).
 *  - Most screens are 1440 × 1024 as drawn. The trend page and the brand assets page are longer pages; the filter
 *    states of the trend page are cropped to the "Related clips" panel they change.
 *  - Figma returned the screens at their drawn size (1x).
 *  - The sidebar is not named the same on every screen (Social Signals, Social Trends; Narrative, Campaigns), so no
 *    navigation list is given.
 */

export const AI_SLUG = 'ai-studio'
export const AI_PATH = caseStudyPath(AI_SLUG)
export const chapterPath = (id) => `${AI_PATH}/${id}`

const AI_JOB = EXPERIENCE.find((entry) => entry.id === 'quickplay')
const AI_CARD = CASE_STUDIES.find((study) => study.id === AI_SLUG)

/** The page index. `id` is both the section's DOM id and the last part of its address. */
export const CHAPTERS = [
  { id: 'overview', label: 'Overview' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'trends', label: 'Social trends' },
  { id: 'insights', label: 'Trend insights' },
  { id: 'narrative', label: 'Create narrative' },
  { id: 'performance', label: 'Performance' },
  { id: 'library', label: 'Library' },
  { id: 'brand-kit', label: 'Brand Kit' },
]

/** Aspect ratios of the screens, for the viewers (width over height of the exports). */
const SCREEN = 1439 / 1024
const FILTER_PANEL = 1199 / 982

const shot = (group, name, title, text) => ({ image: `ai-studio/${group}/${name}.webp`, thumb: `ai-studio/${group}/${name}-t.webp`, title, text })

/* ---------------------------------------------------------------------------------------------- Hero */

export const HERO = {
  // The card's own subtitle, "AI-Powered Content Creation Platform", broken into the banner's three lines.
  title: ['AI-powered', 'content creation', 'platform.'],
  summary: AI_CARD.description,
  // Role is the one of the Quickplay entry in experience.js; scope and platforms are the tags on the card of the Projects tab.
  meta: [
    { label: 'Role', values: [AI_JOB.role] },
    { label: 'Scope', values: AI_CARD.focusAreas },
    { label: 'Platforms', values: AI_CARD.platforms },
  ],
  primaryLink: { label: 'Explore the screens', to: chapterPath('dashboard') },
  secondaryLink: { label: 'See the library', to: chapterPath('library') },
}

/* ---------------------------------------------------------------------------------------------- Overview */

export const OVERVIEW = {
  lede: 'What AI Studio is, what its screens cover, and how to read them.',
  blocks: [
    {
      id: 'product',
      title: 'The product',
      body: [
        AI_CARD.description,
        'AI Studio is a web app: a dashboard where trends, content, narratives and brands meet, with an AI assistant and AI-generated clips running through it.',
      ],
    },
    {
      id: 'role',
      title: 'My role',
      // NOTE: only the role and employer come from your experience entry. The file lists no responsibilities, so none are claimed.
      body: [`${AI_JOB.role} at Quickplay Media, Chennai.`],
    },
    {
      id: 'reading',
      title: 'Reading the screens',
      // NOTE: "sample content" is read from the screens (placeholder hints, round figures, third-party titles); please confirm.
      body: [
        'The screens are shown as drawn in Figma: 1440 pixels wide, in the dark theme. Select any of them to see it at full size.',
        'The names, brands and figures in the screens are sample content from the design file, not real data.',
      ],
    },
  ],
  areasTitle: 'In this case study',
  areas: [
    { id: 'dashboard', name: 'Dashboard', text: 'The home page: AI moment search, social trends, suggested content, narratives and recent work.' },
    { id: 'trends', name: 'Social trends', text: 'Trending topics by region and time, with search and custom categories.' },
    { id: 'insights', name: 'Trend insights', text: 'Why a topic is trending, what is related, and clips to make from it.' },
    { id: 'narrative', name: 'Create narrative', text: 'A conversation with the AI Assistant that turns topics and an audience into a narrative.' },
    { id: 'performance', name: 'Performance', text: 'How the channel, a single video and a narrative are doing.' },
    { id: 'library', name: 'Library', text: 'Browsing and filtering content, adding videos, generating clips and viewing AI metadata.' },
    { id: 'brand-kit', name: 'Brand Kit', text: 'A brand’s assets, and templates built from them.' },
  ],
}

/* ---------------------------------------------------------------------------------------------- Dashboard */

export const DASHBOARD = {
  title: 'Dashboard',
  lede: 'The home page of AI Studio. It puts an AI search for moments, the social trends of the day, suggested content, narratives and recent work on one page.',
  figures: [
    {
      image: 'ai-studio/dashboard/overview-empty.webp',
      title: 'No narratives yet',
      caption: 'AI Moments Search, Social Trends and Suggested Content, then an empty Narrative section that invites the user to create one.',
    },
    {
      image: 'ai-studio/dashboard/overview-narratives.webp',
      title: 'With narratives',
      caption: 'Once narratives exist the Narrative section lists them, with Create New Narrative and View all, above Newly Added Contents.',
    },
    {
      image: 'ai-studio/dashboard/overview-workflows.webp',
      title: 'Channel performance and workflows',
      caption: 'My Channel Performance summarises total growth and each platform. Newly Added Shorts and My Workflows (Export, Upload, Generate Shorts, Smart Crop) follow.',
    },
  ],
}

/* ---------------------------------------------------------------------------------------------- Social trends */

export const TRENDS = {
  title: 'Social trends',
  lede: 'Social Trends lists what is rising, with the number of users, the growth and how long ago each topic started. The list can be narrowed by category, region and time, searched, and extended with categories of the user’s own.',
  ratio: SCREEN,
  tabs: [
    {
      id: 'region',
      label: 'Region',
      text: ['Trends can be limited to a region. A region with sub-regions opens a second list beside the first: Canada, for example, opens its provinces.'],
      items: [
        shot('trends', 'region-menu', 'Choosing a region', 'The Trend Location menu, with a search field and the regions; Canada is open with its provinces beside it.'),
        shot('trends', 'region-result', 'Trends in Canada', 'After choosing Canada the list shows trends from there and the filter reads Canada.'),
      ],
    },
    {
      id: 'time',
      label: 'Time range',
      text: ['The time filter sets how recently a topic started trending.'],
      items: [
        shot('trends', 'time-menu', 'Started trending', 'Past one hour, four hours, 24 hours, 48 hours or seven days.'),
        shot('trends', 'time-result', 'Past 48 hours', 'The list and the filter update to the chosen range.'),
      ],
    },
    {
      id: 'search',
      label: 'Search',
      text: ['Search narrows the list to the topics that match, and says so when nothing does.'],
      items: [
        shot('trends', 'search-start', 'Before searching', 'The search icon sits beside the region and time filters.'),
        shot('trends', 'search-typing', 'Search field open', 'The icon opens a field for trend topics.'),
        shot('trends', 'search-result', 'A result', 'Searching for “Josh safdie” leaves the topic that matches. The content below is headed “Contents based on Above Trends”.'),
        shot('trends', 'search-none', 'No result', 'No trend topics found matching “Best Picture Shortlist”, with the hint to try a different search term.'),
      ],
    },
    {
      id: 'custom',
      label: 'Custom categories',
      text: ['The plus beside All, Entertainment, News and Sports adds a category of the user’s own. A category can be deleted again after a confirmation.'],
      items: [
        shot('trends', 'custom-new', 'Create Custom Trend Category', 'A dialog asks for the category name and suggests ready-made ones: Autos and Vehicles, Business and Finance, Beauty and Fashion, Climate.'),
        shot('trends', 'custom-entered', 'Typing a name', 'Typing “Oscar” suggests matching categories: Oscar Nominations, Oscar 97th Academy Awards, Oscar moments and Oscar predictions.'),
        shot('trends', 'custom-result', 'The new category', 'Oscar Nominations joins the tabs beside the default categories, next to a WWE Raw category.'),
        shot('trends', 'custom-delete', 'Delete a category', 'Delete “Oscar Nominations” category? It will be permanently removed from the Social Trends view.'),
      ],
    },
  ],
}

/* ---------------------------------------------------------------------------------------------- Trend insights */

export const INSIGHTS = {
  title: 'Trend insights',
  lede: 'Choosing a trend opens its own page: why it is trending, what is related to it, and clips that could be made from it.',
  page: {
    title: 'The trend page',
    text: 'For WWE RAW the page gives the users, the growth, the engagement and a rising label, then an AI insight on why it is trending, related topics and hashtags, and a graph of similar trends around it.',
    figure: {
      image: 'ai-studio/insights/page-top.webp',
      title: 'Trend detail',
      caption: 'A button at the top right creates a narrative from the trend.',
    },
  },
  filters: {
    title: 'Related clips and filters',
    text: 'Below the insight, clips related to the trend can be searched in plain language and narrowed with filters. The example in the field reads “Show me clips that’ll work best on TikTok for viewers in California age 18-24”.',
    ratio: FILTER_PANEL,
    items: [
      shot('insights', 'filters-default', 'Related clips', 'The search field with an Add Filter button and an Audience: All chip, above the clips, each with an Open in Editor button.'),
      shot('insights', 'filters-menu', 'Add Filter', 'Select Filter lists Audience, Social Platforms and Aspect Ratio.'),
      shot('insights', 'filters-platforms', 'Social Platforms', 'YouTube is ticked in a list of YouTube, Instagram, X, TikTok and Facebook, then Apply.'),
      shot('insights', 'filters-audience', 'Audience', 'Age groups from 13–17 to 55+, with All ticked.'),
      shot('insights', 'filters-applied', 'Filters applied', 'The chips read Audience: All, Social Platforms: YouTube and Aspect Ratio: All.'),
    ],
  },
  options: {
    title: 'Filter options',
    text: 'The three filters share one pattern: a back arrow, All, and a checklist.',
    figures: [
      { image: 'ai-studio/insights/pop-platforms.webp', title: 'Social Platforms', caption: 'All, YouTube, Instagram, X, TikTok, Facebook.' },
      { image: 'ai-studio/insights/pop-audience.webp', title: 'Audience', caption: 'All and six age groups.' },
      { image: 'ai-studio/insights/pop-ratio.webp', title: 'Aspect Ratio', caption: 'All, 9:16, 16:9, 1:1.' },
    ],
  },
}

/* ---------------------------------------------------------------------------------------------- Create narrative */

export const NARRATIVE = {
  title: 'Create narrative',
  lede: [
    'A narrative gathers topics and an audience into one brief for content. Creating one is a conversation with the AI Assistant: it offers trending topics, asks who the narrative is for, suggests names and shows a summary to confirm.',
    'Each step is a message with chips to choose from, or a reply typed at the bottom.',
  ],
  ratio: SCREEN,
  items: [
    shot('narrative', 'start', 'Start with topics', 'The assistant offers trending topics as chips (WWE RAW, Elon Musk, Taylor Swift and more), with Add Custom Topic and More Topics.'),
    shot('narrative', 'topic-details', 'Topic details', 'Hovering a topic shows its users, growth and engagement, a short summary and related topics, with a More Details link.'),
    shot('narrative', 'topic-added', 'Topic added', 'The choice appears as the user’s reply. The assistant confirms it and offers Add More Topics or Select Target Audience.'),
    shot('narrative', 'custom-topic', 'More and custom topics', 'More Topics lists further trending topics by category. A custom topic is typed in the reply box, with suggestions as the user types.'),
    shot('narrative', 'similar', 'Similar topics', 'After a topic the assistant suggests related ones that trend with the same audience, here artists similar to Lil Poppa.'),
    shot('narrative', 'second-topic', 'Second topic added', 'Rod Wave is added and Select Target Audience is highlighted. The assistant then asks who the narrative is for and offers segments.'),
    shot('narrative', 'audience', 'Target audience', 'Saved Audiences lists segments based on earlier demographics, interests and engagement, next to Add Custom Audience.'),
    shot('narrative', 'custom-audience', 'Custom audience', 'A description is typed in the reply box, with suggested segments above it.'),
    shot('narrative', 'name', 'Name the narrative', 'The assistant suggests names, such as Melodic Streets, or a custom name. Choosing one leads to a summary of topics, audience and name.'),
    shot('narrative', 'summary', 'Confirm', 'The summary asks whether to create the narrative, with Create Narrative and Make changes.'),
    shot('narrative', 'created', 'Narrative created', 'The assistant confirms the narrative was created, with View Narrative Details and Create Another Narrative.'),
  ],
}

/* ---------------------------------------------------------------------------------------------- Performance */

export const PERFORMANCE = {
  title: 'Performance',
  lede: 'Once content is published, AI Studio reports how it is doing: for the whole channel, for a single video and for a narrative.',
  figures: [
    {
      image: 'ai-studio/performance/channel-overview.webp',
      title: 'My Channel Performance',
      caption: 'Overall performance by platform (All Platforms, YouTube, X-Twitter, TikTok, Facebook, Instagram), then each piece of content with its views, engagement, likes, comments and shares.',
    },
    {
      image: 'ai-studio/performance/video-detail.webp',
      title: 'A single video',
      caption: '“Why This Video is Performing Well” explains the result next to the video’s totals, followed by relevant clips to create from it.',
    },
    {
      image: 'ai-studio/performance/narrative-performance.webp',
      title: 'A narrative’s performance',
      caption: 'Total views, total engagement, average engagement rate and videos published for a narrative, then its published videos with status, views, likes, comments and shares.',
    },
    {
      image: 'ai-studio/performance/narrative-clips.webp',
      title: 'Clips for a narrative',
      caption: 'Related clips to the narrative’s topic, with the same search and filters as the trend page: Audience, Social Platforms and Aspect Ratio.',
    },
  ],
}

/* ---------------------------------------------------------------------------------------------- Library */

export const LIBRARY = {
  title: 'Library',
  lede: 'The Library holds the movies, shows, news, sports and short videos the studio works from. Content can be browsed and filtered, opened for its clips, and sent to the AI to generate clips or read its metadata.',
  ratio: SCREEN,
  tabs: [
    {
      id: 'browse',
      label: 'Browse',
      text: ['Movies as a list or a grid, with search, filters, refresh, a switch between the two views and a Content button.'],
      items: [
        shot('library', 'list', 'List view', 'Preview, title, clips, genre, status, created date and actions in a table, with paging: showing 20 of 100.'),
        shot('library', 'grid', 'Grid view', 'The same content as cards, with the preview, the number of clips, genre, status and date.'),
      ],
    },
    {
      id: 'filters',
      label: 'Filters',
      text: ['A filter is built in steps: choose a field, set an operator and a value, apply. Applied filters appear as chips that can be saved or cleared.'],
      items: [
        shot('library', 'filter-menu', 'Select Filter', 'Saved Filters and fields such as Content Type, Status, Title, Description, Tags, dates, Ad Enabled, Allow Download, Genre and Rating.'),
        shot('library', 'filter-value', 'Operator and value', 'An operator (Equal to) and a value to enter, with Close and Apply.'),
        shot('library', 'filter-applied', 'Applied filters', 'Chips such as Genre: Action sit above the table, with Save Filter and Clear Filter.'),
      ],
    },
    {
      id: 'clips',
      label: 'Clips',
      text: ['Opening a title shows its clips in two tabs, Auto Generated and Generate Your Own. A video can also be added by its URL.'],
      items: [
        shot('library', 'clips-list', 'Clips for a title', 'The Auto Generated tab lists each clip with its status, description and the prompt used.'),
        shot('library', 'add-video', 'Add New Video', 'A dialog asks for a title and a video URL.'),
        shot('library', 'add-video-filled', 'Filled in', 'A title and a URL entered, ready to add.'),
        shot('library', 'clips-added', 'Video added', 'The new video, The Beach Scene, appears at the top of the list.'),
      ],
    },
    {
      id: 'generate',
      label: 'Generate clips',
      text: ['Generate Your Own is a prompt box: describe the clips, choose the model, aspect ratio, number of clips, Brand Kit and user cohort, and the AI creates them.'],
      items: [
        shot('library', 'gen-start', 'Generate Your Own', 'The prompt box with the model, 16:9, 3 Clips, Brand Kit and User Cohort options.'),
        shot('library', 'gen-prompt', 'A short prompt', '“Create all the Magic Moments from the Video with proper Shorts content”.'),
        shot('library', 'gen-long', 'A detailed prompt', 'A longer prompt can ask for every key moment as concise, high-impact shorts for YouTube Shorts, Instagram Reels and TikTok.'),
        shot('library', 'gen-creating', 'Creating clips', 'Quickplay AI answers that creating clips takes an estimated 3 minutes, and to check back soon.'),
        shot('library', 'gen-done', 'Clips generated', 'Each clip comes with a score out of 10, a one-line reason, a description, and Edit and Delete actions.'),
      ],
    },
    {
      id: 'metadata',
      label: 'AI metadata',
      text: ['A title’s metadata opens in a Dataflow View, organised as series, season and episode.'],
      items: [
        shot('library', 'meta-flow', 'Dataflow View', 'Series Name, Season 1 and Episode 1 as rows that open, each with an edit action.'),
        shot('library', 'meta-detail', 'Episode metadata', 'An episode lists its description, number of clips, dates, cast, genre, topics, hashtags and keywords.'),
      ],
    },
  ],
}

/* ---------------------------------------------------------------------------------------------- Brand Kit */

export const BRAND_KIT = {
  title: 'Brand Kit',
  lede: 'The Brand Kit keeps each brand’s assets and turns them into templates for new content, so shorts follow the brand’s guidelines.',
  assets: {
    title: 'Brand assets and templates',
    text: 'The Brand Center has two tabs. Brand Assets holds everything a brand uses; Brand Templates lists the templates made from it.',
    figures: [
      {
        image: 'ai-studio/brand/assets.webp',
        title: 'Brand Assets',
        caption: 'One brand’s colours, logo, fonts, intro and outro videos, brand images and subtitle styles, with the list of brands beside them.',
      },
      {
        image: 'ai-studio/brand/templates.webp',
        title: 'Brand Templates',
        caption: 'Templates filtered by brand, status, social platform and layout. Each card shows its status (Approved or Draft), platform and creation date.',
      },
    ],
  },
  template: {
    title: 'Create a template',
    text: 'A template is built from the brand’s content: Layout, Subtitles, Logo, Intro Videos, Outro Videos and Brand Images. A preview of the short updates as choices are made, with the brand’s selections listed beneath it.',
    ratio: SCREEN,
    items: [
      shot('brand', 'size', 'Layout', 'A size or aspect ratio is chosen, here 9:16, and shown in the preview.'),
      shot('brand', 'subtitles', 'Subtitles', 'A style, then opacity, alignment and position, including a custom position; the preview follows.'),
      shot('brand', 'save', 'Save Template', 'A name and a description, then Send to approval or Save as Draft.'),
    ],
  },
}
