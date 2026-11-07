import { caseStudyPath } from '../hooks/useHashRoute'

/*
 * Copy and structure of the Unifi TV × FIFA World Cup 2026 case study (route: UNIFI_FIFA_PATH).
 *
 * Sources, in order of authority:
 *  1. the UX document (UX.pdf: overview, vision, victory, background, problem statement and requirements, design process,
 *     the three key journeys, the six process stages and their activities);
 *  2. the Daily Pass and Season Pass design boards (Daily pass.pdf, Season Pass.pdf: 106 screens and states, the flows
 *     that connect them, and the developer notes written in the files);
 *  3. the case-study brief (the business goals, product vision and requirements groups, the audience segments, the needs,
 *     the potential pain points, the problem statement and the How Might We).
 *
 * Every image under src/assets/case-study/unifi-fifa/ is a frame (or a crop of a frame) rendered from the two boards. No
 * screen was drawn for this page.
 *
 * The FigJam board (shown as a live embed under the process map, and read directly for the Research, Audience, Needs and
 * Problem chapters) adds: the exploratory-research plan with its Completed / Reviewed and Planned / To Explore lists, the
 * audience tree and the persona summaries, the user needs and potential pain points, the problem statement with five How
 * Might We questions, and a Competitor Analysis group of saved screens (four marked DAZN, two purple ones the board does not
 * attribute; no written findings). The competitor screens are not shown as cards on the page; they stay visible in the embed.
 *
 * Still not in the material, and therefore not claimed anywhere on the page: interviews, surveys, usability test results,
 * named or validated personas, written competitor findings, wireframes, a separate design-system file, and any metric
 * (conversion, revenue, users). The page says so where a reader would expect them.
 *
 * Price, validity and date discrepancies found in the supplied screens are kept, unchanged, in SOURCE_OBSERVATIONS at the bottom of
 * this file. They are observations about the source files, not corrections: the page shows the screens as supplied.
 */

export const UNIFI_FIFA_SLUG = 'unifi-fifa'
export const UNIFI_FIFA_PATH = caseStudyPath(UNIFI_FIFA_SLUG)
export const chapterPath = (id) => `${UNIFI_FIFA_PATH}/${id}`

/** The page index. `id` is the section's DOM id and the last part of its address; `number` is its place in the story. */
export const CHAPTERS = [
  { id: 'background', label: 'Background', number: '02' },
  { id: 'goals', label: 'Goals & requirements', number: '03' },
  { id: 'process', label: 'Design process', number: '04' },
  { id: 'research', label: 'Exploratory research', number: '05' },
  { id: 'audience', label: 'Audience', number: '06' },
  { id: 'needs', label: 'Needs & pain points', number: '07' },
  { id: 'problem', label: 'Problem definition', number: '08' },
  { id: 'architecture', label: 'Information architecture', number: '09' },
  { id: 'flows', label: 'User flows', number: '10' },
  { id: 'final-ui', label: 'Final UI design', number: '11' },
  { id: 'edge-cases', label: 'Interaction & edge cases', number: '12' },
  { id: 'outcome', label: 'Outcome & learnings', number: '13' },
]

const chapter = (id) => CHAPTERS.find((item) => item.id === id)
export const chapterTitle = (id) => `${chapter(id).number}  ${chapter(id).label}`

/* ---------------------------------------------------------------------------------------------- 01 Hero */

export const HERO = {
  title: ['Unifi TV ×', 'FIFA World Cup', '2026.'],
  summary: 'Designing a seamless football streaming and pass-purchase experience.',
  meta: [
    { label: 'Role', values: ['End-to-end UI/UX Designer'] },
    // "5 platform experiences" and "4 weeks" were in the brief but nothing in the UX document, the boards or the FigJam board
    // supports them (the screens are the Unifi TV web experience plus one narrow-screen state), so they are not shown until the
    // project owner confirms them. The three journeys are named in the UX document.
    { label: 'Scope', values: ['3 key user journeys'] },
  ],
  primaryLink: { label: 'See the final UI', to: chapterPath('final-ui') },
  secondaryLink: { label: 'Read the process', to: chapterPath('process') },
}

/* ---------------------------------------------------------------------------------------------- 02 Background */

export const BACKGROUND = {
  lede: 'Unifi TV set out to bring the FIFA World Cup 2026 to its streaming platform.',
  paragraphs: [
    'Football fans can follow the tournament through two paid viewing options: a Daily Pass for a selected match day, and a Season Pass for tournament content throughout the pass validity period.',
    'The experience had to live inside the existing Unifi TV platform and give new and existing users one clear route from discovering the tournament, to choosing a pass, paying for it and watching.',
    'I was the end-to-end UI/UX designer on the project, from framing the problem to developer handoff. My job was to connect four moments that are easy to design separately: content discovery, pass selection, purchase and match access.',
  ],
  // The UX document's own Vision and Victory lists.
  vision: [
    'Make Unifi TV a preferred destination for FIFA World Cup 2026.',
    'Deliver a seamless football streaming experience.',
    'Provide flexible viewing options for football fans.',
    'Simplify access through Daily Pass and Season Pass.',
  ],
  victory: [
    'Increase Daily Pass and Season Pass purchases.',
    'Improve FIFA content engagement.',
    'Attract new Unifi TV users.',
    'Simplify the purchase-to-viewing journey.',
    'Deliver a smooth and reliable streaming experience.',
  ],
}

/* ---------------------------------------------------------------------------------------------- 03 Goals */

export const GOALS = {
  lede: 'Four views of the same brief: what the business wanted, what the product should feel like, what it should achieve, and what it had to do.',
  business: [
    { title: 'More pass purchases', text: 'Increase FIFA World Cup 2026 pass purchases.' },
    { title: 'New customers', text: 'Attract new customers to Unifi TV.' },
    { title: 'Deeper engagement', text: 'Improve content engagement.' },
    { title: 'Subscription revenue', text: 'Generate revenue through pass subscriptions.' },
  ],
  vision: ['A seamless FIFA viewing experience.', 'Flexible tournament access.', 'Pass discovery and purchasing that feel simple.'],
  // The "Product Goals" card of the FigJam board's Understanding Project Goals group, as written there.
  productGoals: [
    'Simplify Daily Pass and Season Pass selection.',
    'Reduce friction during registration and payment.',
    'Provide clear purchase confirmation and content access.',
  ],
  requirements: [
    'Daily Pass selection and purchase',
    'Season Pass selection and purchase',
    'Existing-user sign-in',
    'New-user registration',
    'OTP verification',
    'Guest access option',
    'Multiple payment options',
    'Voucher redemption',
    'Payment status and confirmation',
    'Post-purchase content access',
  ],
}

/* ---------------------------------------------------------------------------------------------- 04 Process */

/*
 * The six stages of the UX document, with the brief's names. `status` of each activity:
 *   evidence — there is something in the project files for it (the UX document, the design boards or the brief): a solid dot;
 *   listed   — it is part of the process in the UX document or the board's plan, but no artefact was supplied, so nothing is
 *              claimed about it: a half-filled dot. The intro of the chapter explains both dots.
 */
export const PROCESS = {
  lede: [
    'The UX document organises the work around three pillars, Business, User and Technology, and six stages that move from understanding the problem to implementation.',
    'A solid dot marks an activity with an artefact in the project files. A half-filled dot marks one that is only named in the UX document or the board’s plan, so the page does not claim research or testing that is not in the material.',
  ],
  note: 'The arrows can run both ways: findings from a later stage send the work back to an earlier one.',
  stages: [
    {
      id: 'discovery',
      number: '01',
      name: 'Discovery',
      aim: 'Understand the project.',
      items: [
        { label: 'Business goals', status: 'evidence' },
        { label: 'Product vision', status: 'evidence' },
        { label: 'Product requirements', status: 'evidence' },
        { label: 'Stakeholder expectations', status: 'listed' },
        { label: 'Project context', status: 'evidence' },
      ],
    },
    {
      id: 'research',
      number: '02',
      name: 'Research & Analysis',
      aim: 'Explore and question.',
      items: [
        { label: 'Exploratory research', status: 'evidence' },
        { label: 'Competitor analysis', status: 'evidence' },
        { label: 'Football-viewing behaviour', status: 'listed' },
        { label: 'Audience identification', status: 'evidence' },
        { label: 'User needs and expectations', status: 'evidence' },
        { label: 'Potential purchase friction', status: 'evidence' },
      ],
    },
    {
      id: 'framing',
      number: '03',
      name: 'Framing',
      aim: 'Define the problem.',
      items: [
        { label: 'Problem definition', status: 'evidence' },
        { label: 'User needs', status: 'evidence' },
        { label: 'Pain points', status: 'evidence' },
        { label: 'How Might We questions', status: 'evidence' },
        { label: 'Feature prioritisation', status: 'listed' },
        { label: 'Success criteria', status: 'evidence' },
      ],
    },
    {
      id: 'architecture',
      number: '04',
      name: 'UX Architecture',
      aim: 'Structure the journeys.',
      items: [
        { label: 'Information architecture', status: 'evidence' },
        { label: 'Daily Pass user flow', status: 'evidence' },
        { label: 'Season Pass user flow', status: 'evidence' },
        { label: 'Authentication and purchase flow', status: 'evidence' },
        { label: 'User stories', status: 'listed' },
        { label: 'Wireframes', status: 'listed' },
      ],
    },
    {
      id: 'design',
      number: '05',
      name: 'Conception & UI Design',
      aim: 'Design the experience.',
      items: [
        { label: 'Visual direction', status: 'evidence' },
        { label: 'Interface design', status: 'evidence' },
        { label: 'Interaction design', status: 'evidence' },
        { label: 'Design system', status: 'listed' },
        { label: 'Responsive considerations (one narrow-screen state)', status: 'evidence' },
      ],
    },
    {
      id: 'validation',
      number: '06',
      name: 'Validation & Implementation',
      aim: 'Review, hand off, check.',
      items: [
        { label: 'Prototype review', status: 'listed' },
        { label: 'Design review', status: 'listed' },
        { label: 'Usability evaluation', status: 'listed' },
        { label: 'Developer handoff', status: 'evidence' },
        { label: 'Design specifications', status: 'evidence' },
        { label: 'Asset and icon documentation', status: 'listed' },
        { label: 'Developer collaboration', status: 'evidence' },
        { label: 'Design QA', status: 'listed' },
      ],
    },
  ],
  // Short handwritten-style notes on the map.
  notes: { start: 'start here', loop: 'what I learn later changes what I decide earlier', end: 'built, then checked' },
}

/*
 * The project's FigJam board, shown under the process map with Figma's official embed (view only). `boardUrl` is the board
 * itself (it must stay shared as "anyone with the link can view"); `embedUrl` is the same board in Figma's embed form.
 */
export const FIGJAM = {
  title: 'Explore the Design Process',
  text: 'Explore the thinking, research and design decisions behind the FIFA World Cup 2026 experience.',
  name: 'Unifi TV x FIFA 26',
  boardUrl: 'https://www.figma.com/board/POWyRqV8DAjT5byB6Jqh9w/Unifi-TV-x-FIFA-26?node-id=0-1',
  embedUrl: 'https://embed.figma.com/board/POWyRqV8DAjT5byB6Jqh9w/Unifi-TV-x-FIFA-26?node-id=0-1&embed-host=share&theme=dark',
}

/* ---------------------------------------------------------------------------------------------- 05 Research */

export const RESEARCH = {
  lede: [
    'The FigJam board records how the research was planned, what had been reviewed and what was still to explore. What was completed is a review of the requirements; the user-facing activities are marked as planned. The material contains no interviews, surveys or usability tests, so nothing on this page is a user finding.',
  ],
  // The ten sticky notes of the board's "Exploratory Research" group, in the order they sit.
  planTitle: 'The research plan',
  planText: 'Ten activities, in the order the board lays them out: first understand, then shape the features.',
  plan: [
    'Gather user insights',
    'Understand viewing behaviour',
    'Define user personas',
    'Analyse competitors',
    'Identify user pain points',
    'Brainstorm feature ideas',
    'Categorise features',
    'Evaluate feasibility',
    'Prioritise features',
    'Validate prioritisation',
  ],
  // The green and orange notes of the same group.
  statusTitle: 'Completed, and still to explore',
  statusText: 'The board separates what had been reviewed from what was planned. I keep the same split.',
  completed: {
    title: 'Completed / Reviewed',
    status: 'evidence',
    items: ['Understand business requirements', 'Review product goals', 'Identify functional requirements', 'Review technical considerations'],
  },
  planned: {
    title: 'Planned / To explore',
    status: 'listed',
    items: ['Gather user insights', 'Understand viewing behaviour', 'Define user personas', 'Analyse competitors', 'Identify user pain points'],
  },
  statusNote:
    'The board’s Research Insights & Opportunities card names four headings, business insights, competitor observations, potential user expectations and design opportunities, with no entries under them.',
  hypothesesTitle: 'Potential pain points to investigate',
  hypothesesText: 'The board calls these potential pain points. Nothing in the material shows users confirming them, so I treat them as hypotheses the design has to answer.',
  hypotheses: [
    'Confusion between Daily Pass and Season Pass.',
    'Unclear pass validity.',
    'Complicated account registration.',
    'Payment failures.',
    'Delayed purchase confirmation.',
    'Unclear content access after purchase.',
  ],
}

/* ---------------------------------------------------------------------------------------------- 06 Audience */

export const AUDIENCE = {
  lede: 'The board names three audience segments and gives each a persona summary: a profile, a goal, needs and potential pain points. They are planning assumptions, not validated personas.',
  root: 'FIFA World Cup 2026 Audience',
  branches: [
    {
      id: 'existing',
      title: 'Existing Subscribers',
      who: 'Current Unifi TV users',
      persona: [
        { label: 'Profile', text: 'Already has a Unifi TV account.' },
        { label: 'Goal', text: 'Purchase a FIFA pass and start watching quickly.' },
        { label: 'Needs', text: 'Easy sign-in, clear pass details, simple payment.' },
        { label: 'Potential pain points', text: 'Confusing purchase steps, account verification issues.' },
      ],
    },
    {
      id: 'new',
      title: 'New Users',
      who: 'Non-subscribers interested in FIFA',
      persona: [
        { label: 'Profile', text: 'Interested in FIFA but doesn’t have a Unifi TV account.' },
        { label: 'Goal', text: 'Purchase a pass and access tournament content.' },
        { label: 'Needs', text: 'Easy registration, clear pricing, flexible payment.' },
        { label: 'Potential pain points', text: 'Lengthy registration, uncertainty about account requirements.' },
      ],
    },
    {
      id: 'fans',
      title: 'Football Fans',
      who: 'Occasional and dedicated viewers',
      persona: [
        { label: 'Profile', text: 'Watches selected matches or follows the entire tournament.' },
        { label: 'Goal', text: 'Choose a pass that suits their viewing habits.' },
        { label: 'Needs', text: 'Match information, Daily Pass, Season Pass.' },
        { label: 'Potential pain points', text: 'Difficulty comparing pass options, unclear access validity.' },
      ],
    },
  ],
  note: 'Persona summaries from the FigJam board. Define User Personas is still listed under Planned / To explore, and these summaries have no names, quotes or user data behind them.',
}

/* ---------------------------------------------------------------------------------------------- 07 Needs */

export const NEEDS = {
  lede: 'The board lists six user needs and six potential pain points. Each is set against the part of the design that answers it. The one extra pain point, account verification issues, comes from the Existing Subscribers persona summary.',
  needs: [
    { title: 'Easy pass selection', response: 'The event sits in the Unifi TV navigation and home banner; each match day has its own pass page.', go: 'final-ui' },
    { title: 'Clear pricing', response: 'The pass summary card carries the price, the validity, what is included and an itemised payable amount.', go: 'final-ui' },
    { title: 'Simple registration', response: 'One email-first screen offers sign-in, sign-up and Continue as Guest.', go: 'edge-cases' },
    { title: 'Secure payment', response: 'Credit card, FPX and voucher redemption, chosen before anything is charged.', go: 'flows' },
    { title: 'Instant access confirmation', response: 'A success state with Go to Events and Manage Subscription, then a You have Access banner.', go: 'edge-cases' },
    { title: 'Easy content discovery', response: 'The banner leads the home page; channels and highlights sit under it.', go: 'final-ui' },
  ],
  pains: [
    { title: 'Confusing pass options', response: 'A Daily Pass or Season Pass badge on the banner, and a separate journey for each.', go: 'final-ui' },
    { title: 'Unclear pass validity', response: 'Valid on, Start from and Valid until are rows of the pass summary, not fine print.', go: 'final-ui' },
    { title: 'Complicated sign-up', response: 'Sign-up and Continue as Guest sit one tap away on the sign-in screen.', go: 'edge-cases' },
    { title: 'Payment failures', response: 'A Failed state that offers Change Payment Method or Go Back.', go: 'edge-cases' },
    { title: 'Delayed confirmation', response: 'A banner that says what is happening and that the pass can take 15 minutes to appear.', go: 'edge-cases' },
    { title: 'Unclear content access', response: 'An explicit access state, and a gate that tells the user what pass the content needs.', go: 'edge-cases' },
    { title: 'Account verification issues', response: 'A single-purpose OTP screen with Resend OTP and Confirm OTP, and a screen for when no contact is on file.', go: 'edge-cases' },
  ],
}

/* ---------------------------------------------------------------------------------------------- 08 Problem */

export const PROBLEM = {
  statement:
    'Football fans need a simple and flexible way to access FIFA World Cup 2026 content through Unifi TV. However, choosing the right pass, completing account verification, and understanding content access can create friction in the purchase journey.',
  hmw: 'How might we simplify the FIFA World Cup 2026 pass purchase experience and help users access their favourite matches with confidence?',
  // The four follow-up questions under it on the board.
  hmwMore: [
    'Make FIFA World Cup 2026 pass selection simple and understandable?',
    'Help new users purchase a pass without a complicated registration process?',
    'Make payment and purchase confirmation clear and reliable?',
    'Help users access their purchased FIFA content easily?',
  ],
  lede: 'The challenge, as the UX document puts it, is a purchase that works for occasional viewers and dedicated fans alike: understand the options, pay with minimal friction, and reach the content without confusion.',
  // The three pillars of the UX document's "Design process".
  pillars: [
    { name: 'Business', text: 'Sell Daily and Season Passes, bring in new customers, raise engagement.' },
    { name: 'User', text: 'Choose the right pass, verify an account and understand access without friction.' },
    { name: 'Technology', text: 'Fit the existing Unifi TV platform: accounts, payments, entitlements.' },
  ],
}

/* ---------------------------------------------------------------------------------------------- 09 Architecture */

export const ARCHITECTURE = {
  lede: 'The structure the screens follow: one event, two passes, and two supporting journeys, account and payment, that both passes share.',
  trunk: ['Unifi TV', 'FIFA World Cup 2026', 'Event landing page'],
  daily: {
    title: 'Daily Pass',
    steps: [
      'Select match day',
      'View pass information',
      'Buy Pass',
      'Account / purchase handling',
      'Payment',
      { label: 'If payment fails', note: 'Change Payment Method or Go Back, then back to Payment', branch: true },
      'Purchase confirmation',
      'Access available content',
    ],
  },
  season: {
    title: 'Season Pass',
    steps: [
      'View Season Pass details',
      'Buy Pass',
      'Sign in / Sign up / Continue as Guest',
      'Account verification',
      'Payment',
      { label: 'If payment fails', note: 'Change Payment Method or Go Back, then back to Payment', branch: true },
      'Purchase confirmation',
      'Tournament content access',
    ],
  },
  shared: [
    { title: 'Account', steps: ['Sign in', 'Sign up', 'Continue as Guest', 'OTP verification', 'Choose profile'] },
    { title: 'Payment', steps: ['Payment summary', 'Credit Card', 'FPX', 'Voucher redemption', 'Status: success, pending, failed'] },
  ],
  note: 'Only structures that appear in the screens and the requirements are drawn.',
}

/* ---------------------------------------------------------------------------------------------- 10 Flows */

export const FLOWS = {
  lede: 'Three journeys, as the UX document names them. The third runs inside the first two, and it is where most of the exception states live.',
  flows: [
    {
      id: 'daily',
      number: '1',
      title: 'Daily Pass journey',
      line: 'Select a match day, purchase a pass, and access the available content.',
      steps: [
        { label: 'FIFA World Cup landing page' },
        { label: 'Select Daily Pass' },
        { label: 'Select match date' },
        { label: 'View pass details' },
        { label: 'Buy Pass', kind: 'action' },
        { label: 'Documented purchase and account route', kind: 'decision', note: 'See journey 3' },
        { label: 'Payment' },
        { label: 'If payment fails', kind: 'decision', note: 'Change Payment Method or Go Back, then back to Payment' },
        { label: 'Purchase confirmation' },
        { label: 'Access selected match-day content', kind: 'end' },
      ],
    },
    {
      id: 'season',
      number: '2',
      title: 'Season Pass journey',
      line: 'Select the Season Pass, complete account verification and payment, and access tournament content.',
      steps: [
        { label: 'FIFA World Cup landing page' },
        { label: 'Select Season Pass' },
        { label: 'View pass details' },
        { label: 'Buy Pass', kind: 'action' },
        { label: 'Choose account route', kind: 'decision' },
        { label: 'Sign in / Sign up / Continue as Guest' },
        { label: 'OTP verification, where applicable', kind: 'decision' },
        { label: 'Payment' },
        { label: 'If payment fails', kind: 'decision', note: 'Change Payment Method or Go Back, then back to Payment' },
        { label: 'Purchase confirmation' },
        { label: 'Access tournament content', kind: 'end' },
      ],
    },
    {
      id: 'auth',
      number: '3',
      title: 'Authentication & purchase journey',
      line: 'Sign in or register, verify the account, complete payment, and receive purchase confirmation.',
      steps: [
        { label: 'Buy Pass', kind: 'action' },
        { label: 'Account identification', kind: 'decision' },
        { label: 'Existing user / New user / Guest' },
        { label: 'Sign in / Sign up / Guest continuation' },
        { label: 'OTP verification, where applicable', kind: 'decision' },
        { label: 'Payment summary' },
        { label: 'Payment method' },
        { label: 'Payment processing' },
        { label: 'Success / Pending / Failure', kind: 'decision' },
        { label: 'Purchase confirmation or recovery path' },
        { label: 'Content access when entitlement is active', kind: 'end' },
      ],
    },
  ],
  statesTitle: 'The states between the steps',
  statesText: 'Nothing here is simplified away. Each of these is a screen in the design files, and each one has a way out.',
  states: [
    { label: 'Email not registered', image: 'auth/email-not-registered.webp', text: 'The field turns red and says how to recover.' },
    { label: 'OTP verification', image: 'auth/otp.webp', text: 'One task, with Resend OTP beside Confirm OTP.' },
    { label: 'Credit Card', image: 'daily/payment-details.webp', text: 'Card details on their own screen, with Cancel and Pay.' },
    { label: 'FPX', image: 'daily/buy-pass-fpx.webp', text: 'The method is chosen on the pass screen, before payment.' },
    { label: 'Voucher redemption', image: 'season/voucher.webp', text: 'A code field replaces the card form.' },
    { label: 'Payment failed', image: 'daily/failed.webp', text: 'Change Payment Method, or Go Back.' },
    { label: 'Payment confirmation pending', image: 'season/pending.webp', text: 'A banner says it can take up to 15 minutes.' },
    { label: 'Purchase request submitted', image: 'season/submitted.webp', text: 'Acknowledged, with the same 15-minute window.' },
    { label: 'Access state', image: 'daily/access.webp', text: 'The banner changes to You have Access.' },
  ],
}

/* ---------------------------------------------------------------------------------------------- 11 Final UI */

export const FINAL_UI = {
  lede: 'The final screens of the two boards, in the order a user meets them. Each group says what the screens decide, and the pins on the larger ones point at the details.',
  daily: {
    title: 'Daily Pass',
    text: 'Pick a match day, see exactly what the pass covers, pay, and watch.',
    items: [
      {
        id: 'daily-landing',
        image: 'daily/landing.webp',
        title: 'FIFA event landing page',
        text: 'The event lives in the Unifi TV navigation and leads the home page with a banner. A Daily Pass badge and a single Buy Pass button say what is on offer before anything else.',
        pins: [
          { x: 51, y: 15, label: 'FIFA World Cup 2026 has its own item in the main navigation.' },
          { x: 35, y: 39, label: 'The badge names the pass type.' },
          { x: 26.5, y: 54, label: 'One primary action, Buy Pass.' },
          { x: 11, y: 70, label: 'The rest of the home page stays where Unifi TV users expect it.' },
        ],
      },
      {
        id: 'daily-day',
        image: 'daily/day-page.webp',
        title: 'Daily Pass discovery and date-based pages',
        text: 'Each match day has its own page, with the date as the title, the channels the pass includes under the banner, and highlights below.',
        pins: [
          { x: 35.5, y: 30, label: 'The match day is the headline.' },
          { x: 26, y: 49, label: 'Buy Pass for that day.' },
          { x: 14, y: 64, label: 'The channels that come with the pass.' },
        ],
      },
      {
        id: 'daily-buy',
        image: 'daily/buy-pass.webp',
        title: 'Selected-day pass details and the purchase action',
        text: 'The Buy Pass screen is the contract. It names the pass, its validity and what it includes, breaks the amount down, and asks for a payment method.',
        pins: [
          { x: 17, y: 33, label: 'Pass name, validity and what it includes.' },
          { x: 9.5, y: 60, label: 'Payable amount, itemised.' },
          { x: 90.5, y: 34, label: 'Choose how to pay: Credit Card or FPX.' },
          { x: 90.5, y: 47, label: 'Cancel or Continue, nothing is charged yet.' },
        ],
      },
    ],
    rows: [
      {
        id: 'daily-payment',
        title: 'Payment and status',
        text: 'Card details, then an explicit outcome with a next step either way.',
        figures: [
          { image: 'daily/payment-details.webp', title: 'Payment details', caption: 'Card details on their own screen.' },
          { image: 'daily/success.webp', title: 'Success', caption: 'Go to Events or Manage Subscription.' },
          { image: 'daily/failed.webp', title: 'Failed', caption: 'Change Payment Method or Go Back.' },
        ],
      },
      {
        id: 'daily-access',
        title: 'Post-purchase access',
        text: 'The banner changes to You have Access, and the pass appears under Manage Subscription.',
        figures: [
          { image: 'daily/access.webp', title: 'Access state', caption: 'The pass is active on the match day page.' },
          { image: 'daily/manage.webp', title: 'Manage Subscription', caption: 'The pass among the user’s other subscriptions.' },
        ],
      },
    ],
  },
  season: {
    title: 'Season Pass',
    text: 'The same banner and the same steps, with more to settle before payment: who the user is, and how they want to pay.',
    items: [
      {
        id: 'season-landing',
        image: 'season/landing-sign-in.webp',
        title: 'Season Pass discovery',
        text: 'The Season Pass banner covers the whole tournament window. Before sign-in the button reads Sign In; once the user is in it reads Buy Pass.',
        pins: [
          { x: 25, y: 26, label: 'Date range of the pass, 11 Jun to 19 Jul 2026.' },
          { x: 36.5, y: 39, label: 'Season Pass badge.' },
          { x: 26.5, y: 54, label: 'The button names the next step.' },
        ],
      },
      {
        id: 'season-buy',
        image: 'season/buy-pass.webp',
        title: 'Pass details, validity and Buy Pass',
        text: 'Start and end of the validity are rows of the summary card. Voucher redemption is a third way to pay, next to credit card and FPX.',
        pins: [
          { x: 17, y: 36.5, label: 'Start from and Valid until, stated plainly.' },
          { x: 17, y: 44, label: 'What the pass includes.' },
          { x: 88.5, y: 30, label: 'Credit Card, FPX or Redeem Voucher.' },
        ],
      },
    ],
    rows: [
      {
        id: 'season-account',
        title: 'Account: sign in, register, verify',
        text: 'Email first. The screen that follows depends on who the user is.',
        figures: [
          { image: 'auth/sign-in.webp', title: 'Sign in', caption: 'Create account, or Continue as Guest.' },
          { image: 'auth/email-not-registered.webp', title: 'Email not registered', caption: 'The error explains the way out.' },
          { image: 'auth/otp.webp', title: 'Verify OTP', caption: 'One-time password, with Resend OTP.' },
          { image: 'auth/password.webp', title: 'Enter password', caption: 'For an existing account.' },
          { image: 'auth/profiles.webp', title: 'Who’s watching?', caption: 'Choose a profile.' },
          { image: 'auth/contact-details.webp', title: 'Update your contact details', caption: 'When the account has no valid contact on file.' },
        ],
      },
      {
        id: 'season-payment',
        title: 'Voucher, pending and outcome states',
        text: 'The states that make a multi-step purchase trustworthy.',
        figures: [
          { image: 'season/voucher.webp', title: 'Redeem a voucher', caption: 'Enter the code, then Continue.' },
          { image: 'season/pending.webp', title: 'Payment confirmation pending', caption: 'A banner under the form.' },
          { image: 'season/submitted.webp', title: 'Purchase request submitted', caption: 'Acknowledged, effective in 15 minutes.' },
          { image: 'season/success.webp', title: 'Success', caption: 'Go to Events or Manage Subscription.' },
        ],
      },
      {
        id: 'season-access',
        title: 'Tournament access',
        text: 'The pass is visible where the user already looks.',
        figures: [
          { image: 'season/access.webp', title: 'Access state', caption: 'You have Access on the Season Pass banner.' },
          { image: 'season/manage.webp', title: 'Manage Subscription', caption: 'The pass among the other subscriptions.' },
          { image: 'season/home.webp', title: 'Event on the platform home', caption: 'The banner above the apps, channels and kids rails.' },
        ],
      },
    ],
  },
}

/* ---------------------------------------------------------------------------------------------- 12 Edge cases */

export const EDGE_CASES = {
  lede: 'A purchase is mostly the moments when something is not quite as planned. These are the ones the designs cover, in the words the screens use.',
  cases: [
    { title: 'Existing users', image: 'auth/password.webp', text: 'Email first, then Enter password; Forgot Password sits under the field. Profiles follow with Who’s watching?' },
    { title: 'New users', image: 'auth/sign-in.webp', text: 'Create account? Sign Up is on the sign-in screen itself, so a new user does not have to back out to find it.' },
    { title: 'Guest users', image: 'auth/email-not-registered.webp', text: 'Continue as Guest is offered beneath Sign In, as a quiet link rather than a competing button.' },
    { title: 'Unregistered email', image: 'parts/field-error.webp', text: '“Email not registered. Please check spelling or create an account.” The field and the message turn red together, and both ways out stay on screen.' },
    { title: 'OTP verification', image: 'auth/otp.webp', text: 'The screen says where the one-time password went, with the address partly masked, and offers Resend OTP.' },
    { title: 'Payment failure', image: 'daily/failed.webp', text: 'Failed, then two plain actions: Change Payment Method or Go Back.' },
    { title: 'Delayed payment confirmation', image: 'parts/notice-delayed.webp', text: '“Payment confirmation is taking longer than expected. If successful, your subscription will appear in Manage Subscriptions within 15 minutes.”' },
    { title: 'Voucher redemption', image: 'season/voucher-error.webp', text: 'The code field turns red on an invalid code, and a note reads “Select content worth equal to your voucher value”.' },
    { title: 'Purchase request submission', image: 'parts/notice-submitted.webp', text: '“Your purchase request has been submitted! It will be effective within 15 mins.”' },
    { title: 'Access after purchase', image: 'daily/channel-pass.webp', text: 'Success sends the user to Go to Events or Manage Subscription. Gated content says what is missing: “You need an active daily pass to watch this channel.”' },
  ],
}

/* ---------------------------------------------------------------------------------------------- 13 Outcome */

export const OUTCOME = {
  lede: 'No conversion, revenue or audience numbers are part of this project’s material, so I am not quoting any. What I can say is what was delivered.',
  delivered: [
    'Three key journeys mapped end to end: Daily Pass, Season Pass, and authentication and purchase.',
    'More than 100 screens and states across the Daily Pass and Season Pass boards, including the exception states that most purchase flows leave out.',
    'Developer notes written into the boards, so the design and the build rules travel together.',
  ],
  reflectionTitle: 'What I took from it',
  reflection: [
    'A multi-step streaming purchase is really three designs at once: a commercial one, a human one and a technical one. The Business, User and Technology pillars of the UX document were my check on each decision.',
    'The happy path is the easy part. Account states, voucher codes, delayed confirmations and gated content decide whether the purchase feels safe, so I designed those with the same care as the success screen.',
    'Technical constraints, like entitlements that take minutes to appear, are better said out loud than hidden. A banner that explains the delay is part of the design.',
    'I would add what the material does not have: interviews or surveys behind the persona summaries, written competitor findings, user feedback on the hypotheses, usability testing, and measured results after launch. The board lists the first of these as planned; none of them is something I can claim today.',
  ],
}

/* ---------------------------------------------------------------------------------------------- Source observations */

/*
 * What the supplied design boards show that does not add up, recorded as found and NOT corrected anywhere on the page (the screens
 * are exported as supplied). `frames` are the frame names in the board exports (Daily pass.pdf, Season Pass.pdf). Not rendered; kept
 * so the project owner can resolve them with the people who own the values.
 */
export const SOURCE_OBSERVATIONS = [
  {
    topic: 'Daily Pass amount',
    observation:
      'The Buy Pass summary lists Price of pass RM15.00 and Service Tax (8%) RM1.92, Grand Total RM16.92. 8% of RM15.00 is RM1.20, and the Pay button on the payment-details screen reads RM15.00, not the grand total.',
    frames: ['daily_21', 'daily_22', 'daily_26', 'daily_27'],
  },
  {
    topic: 'Season Pass amount',
    observation:
      'The Season Pass summary headline is RM100.00, but on most frames its payable table is the Daily Pass one (RM15.00, RM1.92, RM16.92). One frame shows RM100.00, RM8.00, RM108.00, which is consistent with 8%. The Pay button reads RM15.00 on every frame, including the RM108.00 one.',
    frames: ['season_38', 'season_39', 'season_43', 'season_44', 'season_11', 'daily_36', 'daily_41', 'daily_42'],
  },
  {
    topic: 'Season Pass validity',
    observation:
      'The banner reads 11 Jun 2026 to 19 Jul 2026, the summary reads Start from Wed, 11 Jun and Valid until Thu, 20 July, and the small print reads 11 June - 10 July.',
    frames: ['season_00', 'season_38', 'daily_36'],
  },
  {
    topic: 'Weekdays',
    observation:
      'In 2026, 11 June is a Thursday, 12 June a Friday and 20 July a Monday. The frames read Fri, 11 June; Thu, 12 Jun; Wed, 11 Jun and Thu, 20 July (Fri, 12 June is correct).',
    frames: ['daily_01', 'daily_21', 'season_38'],
  },
  {
    topic: 'Manage Subscription',
    observation:
      'The Daily Pass and Season Pass rows show 29 and 30 Jun 2026 as their dates and Subscription Amount RM0.00, which match neither pass. Other rows show Started on 15 Aug 2025.',
    frames: ['daily_09', 'daily_10', 'season_28'],
  },
]
