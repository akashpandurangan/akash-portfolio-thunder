import { caseStudyPath } from '../hooks/useHashRoute'
import { EXPERIENCE } from './experience'
import { CASE_STUDIES } from './caseStudies'

/*
 * Copy and structure of the KPOST Communication platform case study (route: KPOST_PATH).
 *
 * The page is organised like the OTT design-system case study (a banner, then overview rows, foundations, the work in tabs,
 * device sections), not in the order of the Figma frame. The words are the frame's own ("KPOST Communication platform Case
 * Study", file "Akash Pandurangan", node 166:15814), kept verbatim wherever they are quoted; the rest is signposting.
 * Left out on purpose:
 *  - the last sentence of "User pain points" ("User Katchup me with our pain points."), which is not a sentence;
 *  - the "Thank You" block, whose contact details are already in the site's footer.
 * Nothing here is a metric, a date or a team size: the frame has none. The company text, role and company are the ones of
 * the KPOST entry in experience.js, and the platforms are the tags of the card on the Projects tab.
 * Items that need your own words are flagged with NOTE.
 */

export const KPOST_SLUG = 'kpost-communication'
export const KPOST_PATH = caseStudyPath(KPOST_SLUG)
export const chapterPath = (id) => `${KPOST_PATH}/${id}`

const KPOST_JOB = EXPERIENCE.find((entry) => entry.id === 'kpost')
const KPOST_CARD = CASE_STUDIES.find((study) => study.id === KPOST_SLUG)

/** The page index. `id` is both the section's DOM id and the last part of its address. */
export const CHAPTERS = [
  { id: 'overview', label: 'Overview' },
  { id: 'feedback', label: 'User feedback' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'before-after', label: 'Old and new UI' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'sign-in', label: 'Login and signup' },
  { id: 'modules', label: 'Modules' },
  { id: 'mobile', label: 'Mobile app' },
]

/* ---------------------------------------------------------------------------------------------- Hero */

export const HERO = {
  // "...Mailing, Messaging and Calling modules integrated into ONE dashboard", from the frame's own summary.
  title: ['Mailing, messaging', 'and calling in', 'one dashboard.'],
  summary:
    'The advanced communication platform, first of its kind in the world to have the Mailing, Messaging and Calling modules integrated into ONE dashboard with many other exciting utility modules.',
  // Role is the one of the KPOST entry in experience.js; scope and platforms are the tags on the card of the Projects tab.
  meta: [
    { label: 'Role', values: [KPOST_JOB.role] },
    { label: 'Scope', values: KPOST_CARD.focusAreas },
    { label: 'Platforms', values: KPOST_CARD.platforms },
  ],
  primaryLink: { label: 'Explore the modules', to: chapterPath('modules') },
  secondaryLink: { label: 'See the mobile app', to: chapterPath('mobile') },
}

/* ---------------------------------------------------------------------------------------------- Overview */

export const OVERVIEW = {
  lede: 'What the platform is, what it set out to do, and how the design work went.',
  blocks: [
    {
      id: 'context',
      title: 'Project context',
      body: [
        KPOST_JOB.description,
        'Its communication platform brings Mailing, Messaging and Calling together in one platform, with more than 10 utility modules.',
      ],
    },
    {
      id: 'brief',
      title: 'The brief',
      body: [
        'To Provide every Indian an innovative and advanced digital communication channel, first of its kind in the world. Every user to get a secure and organic digital card, the digital identity for the user, a unique feature of KPOST. All users to be verified users, which will be deterrent to anti-social and criminal elements using the communication platform.',
      ],
    },
    {
      id: 'contribution',
      title: 'My contribution',
      body: [
        'Upon taking on the design work for this innovative and advanced digital communication channel, I identified and understood the existing issues and user pain points, brainstormed solutions, sketched a new design, developed a prototype, and conducted thorough validation.',
      ],
    },
  ],
  // The five steps of the frame, each with the part of the sentence above (or of the research text) that describes it.
  approach: {
    title: 'Design approach',
    steps: [
      { name: 'Understand', text: 'Identified and understood the existing issues and user pain points, through one-on-one interviews and feedback from various sources.' },
      { name: 'Brainstorming', text: 'Brainstormed solutions.' },
      { name: 'Sketch', text: 'Sketched a new design.' },
      { name: 'Prototype', text: 'Developed a prototype.' },
      { name: 'Validate', text: 'Conducted thorough validation.' },
    ],
  },
}

/* ---------------------------------------------------------------------------------------------- User feedback */

export const FEEDBACK = {
  title: 'User feedback',
  lede: 'Conduct one-on-one interviews with users to gain deep insights into their experiences, challenges, and needs. Collect and analyze feedback, and analyze the user pain points. Collect feedback from various sources. Organize the feedback into categories based on the types of pain points.',
  // The six messages of the frame, set as text and shown as the screenshots of the messages themselves (`image`). NOTE: the text
  // cards name users by first name and initial (`by`); the screenshots show the full name and photo, `name` is for their description.
  messages: { title: 'The messages as received', text: 'The same six messages as they arrived. Select one to open it full size.' },
  quotes: [
    { by: 'Deepak V.', name: 'Deepak Vishwa', image: 'kpost/pain/pain-1.webp', text: 'KPOST Directory Finding a contact is hard; the user profile picture in the dropdown is easy to find now that the name is only visible.' },
    { by: 'Kiruthika M.', name: 'Kiruthika Murugesan', image: 'kpost/pain/pain-2.webp', text: 'The attachment loading bar for uploading the attachments makes it easy for the user to understand the attachment upload percentage.' },
    { by: 'Selvakumar M.', name: 'Selvakumar Murugan', image: 'kpost/pain/pain-3.webp', text: 'How to view my important message There is no option to see my important message.' },
    { by: 'Balamurugan R.', name: 'Balamurugan Rajamani', image: 'kpost/pain/pain-4.webp', text: 'delete and edit a group message, like a personal message, that is useful for the user.' },
    { by: 'Jaga D.', name: 'Jaga Deesan', image: 'kpost/pain/pain-5.webp', text: 'There is no way to download images to a mobile device. Only I took a screenshot. Being able to download images is extremely useful.' },
    { by: 'Kaarthick K.', name: 'Kaarthick Kasi', image: 'kpost/pain/pain-6.webp', text: 'The attachment loading bar for uploading the attachments makes it easy for the user to understand the attachment upload percentage.' },
  ],
}

/* ---------------------------------------------------------------------------------------------- Foundations */

export const FOUNDATIONS = {
  title: 'Design foundations',
  lede: 'The style guide behind the screens: the colour palette, the Inter type scale for desktop and mobile, the button states and the icon set.',
  colors: {
    title: 'Colour',
    intro: 'Blue in six steps, from a light tint to a dark navy, a grey scale of six, and system colours for black, white, background, error, success and validation.',
    // NOTE: the frame's labels and swatches disagree in places: the "Black", "BG" and "Success" swatches are filled with
    // #054694, #F2F3F4 and #6FC614, and the Gray row is labelled with the Blue hex codes. The labelled values are used for
    // System and Blue (they are the ones the type and buttons use); Gray is the colour of the swatches themselves.
    groups: [
      {
        name: 'System',
        swatches: [
          { name: 'Black', hex: '#1F2227' },
          { name: 'White', hex: '#FFFFFF' },
          { name: 'BG', hex: '#EDEEEF' },
          { name: 'Error', hex: '#E62D2D' },
          { name: 'Success', hex: '#85C83E' },
          { name: 'Validation', hex: '#FFD748' },
        ],
      },
      {
        name: 'Blue',
        swatches: [
          { name: 'Light', hex: '#DAE3EF' },
          { name: 'Light active', hex: '#B2C6DE' },
          { name: 'Normal', hex: '#054694' },
          { name: 'Hover', hex: '#053F85' },
          { name: 'Active', hex: '#043876' },
          { name: 'Dark', hex: '#032A59' },
        ],
      },
      {
        name: 'Gray',
        swatches: [
          { name: 'Gray 50', hex: '#DAE3EF' },
          { name: 'Gray 100', hex: '#B8BABF' },
          { name: 'Gray 200', hex: '#898F98' },
          { name: 'Gray 300', hex: '#474D57' },
          { name: 'Gray 400', hex: '#2E323A' },
          { name: 'Gray 500', hex: '#252525' },
        ],
      },
    ],
  },
  type: {
    title: 'Typography',
    intro: 'One family, Inter, in two scales: desktop and mobile. Headlines are bold at a 120% line height, body text runs at 140%, buttons are medium.',
    // `weight` is the CSS weight; sizes are px; `line` is the line height as written in the frame.
    rows: [
      { name: 'Headlines 1', weight: 700, line: '120%', desktop: 56, mobile: 32, sample: 'Mailing, messaging and calling' },
      { name: 'Headlines 2', weight: 700, line: '120%', desktop: 40, mobile: 28, sample: 'One dashboard' },
      { name: 'Headlines 3', weight: 700, line: '120%', desktop: 28, mobile: 24, sample: 'Katchup, Kmail, Kall and KDiary' },
      { name: 'Headlines 4', weight: 700, line: '120%', desktop: 20, mobile: 20, sample: 'Recents and Contacts' },
      { name: 'Body 1', weight: 400, line: '140%', desktop: 18, mobile: 16, sample: 'An instant digital messaging module' },
      { name: 'Body 1 Bold', weight: 700, line: '140%', desktop: 18, mobile: 16, sample: 'An instant digital messaging module' },
      { name: 'Body 2', weight: 400, line: '140%', desktop: 16, mobile: 14, sample: 'All the mails are parked in contact’s folders' },
      { name: 'Body 2 Bold', weight: 700, line: '140%', desktop: 16, mobile: 14, sample: 'All the mails are parked in contact’s folders' },
      { name: 'Body 3', weight: 400, line: '140%', desktop: 14, mobile: 12, sample: 'Subject: Lorem ipsum is simply dummy text' },
      { name: 'Body 3 Bold', weight: 700, line: '140%', desktop: 14, mobile: 12, sample: 'Subject: Lorem ipsum is simply dummy text' },
      { name: 'Button', weight: 500, line: '24px', desktop: 20, mobile: 16, sample: 'Submit', note: 'Desktop also lists a 16 / 24 button.' },
    ],
  },
  buttons: {
    title: 'Buttons',
    intro: 'Active, hover, default and inactive. Default is the Normal blue; hover and active go to the deeper blue; inactive is the same button, faded.',
    // The fills of the frame's buttons: #054694 by default, #00336E for active and hover; inactive is the default fill faded.
    states: [
      { id: 'active', label: 'Active', fill: '#00336E' },
      { id: 'hover', label: 'Hover', fill: '#00336E' },
      { id: 'default', label: 'Default', fill: '#054694' },
      { id: 'inactive', label: 'Inactive', fill: '#054694' },
    ],
  },
  icons: {
    title: 'Icons',
    intro: 'One icon set, drawn outlined and filled.',
    figure: { image: 'kpost/style/icons.webp', title: 'Icons', caption: 'Outlined and filled.' },
  },
}

/* ---------------------------------------------------------------------------------------------- Old and new UI */

export const BEFORE_AFTER = {
  title: 'Old and new UI',
  lede: 'The same kind of screen, before and after the redesign. Drag the handle, or use the arrow keys, to move between them.',
  old: { image: 'kpost/redesign/old-ui.webp', label: 'Old UI', alt: 'The old UI: a blue header, with Katchup, Diary and KNews in columns' },
  new: { image: 'kpost/redesign/new-ui.webp', label: 'New UI', alt: 'The new UI: the KPOST dashboard, with Home (Recents and Contacts), KNews, KEcommerce, Diary, KBooking and Widgets in panels' },
}

/* ---------------------------------------------------------------------------------------------- Dashboard */

export const DASHBOARD = {
  title: 'Dashboard page',
  lede: 'An Advanced Communication Platform, Conceptualized, Created And Built In India For Indians And For The Whole World - A True Shift In Paradigm. First of its kind in the World to have the Mailing, Messaging and Calling integrated into ONE platform with more than 10 exciting utility modules',
  figure: { image: 'kpost/redesign/dashboard.webp', title: 'Dashboard', caption: 'Recents, KNews, KEcommerce, Diary, KBooking and widgets on one screen.' },
}

/* ---------------------------------------------------------------------------------------------- Login and signup */

export const SIGN_IN = {
  title: 'Login and signup',
  lede: 'The login setup offers three levels: Small Company, Medium Company, and Large Company, as well as a Multi-level Company option. Users can create their own accounts accordingly.',
  ratio: 1239 / 801,
  // Named after the heading each screen carries.
  items: [
    { image: 'kpost/login/login-1.webp', title: 'Select account option', text: 'Personal, Business or Institution.' },
    { image: 'kpost/login/login-2.webp', title: 'Category definitions', text: 'Small, Medium, Large and Multi-National.' },
    { image: 'kpost/login/login-3.webp', title: 'Login', text: 'Country and KPOST ID or mobile number.' },
    { image: 'kpost/login/login-4.webp', title: 'Sign up', text: 'KPOST Personal: mobile number, name, email, gender, date of birth and postal pin code.' },
  ],
}

/* ---------------------------------------------------------------------------------------------- Modules */

const screens = (module, titles) =>
  titles.map((entry, index) => {
    const [title, text] = Array.isArray(entry) ? entry : [entry]
    return { image: `kpost/modules/${module}-${index + 1}.webp`, title, text: text ?? '' }
  })

/**
 * The modules, one tab each. `text` is the module's description in the frame's own words (a paragraph each); `items` its
 * home screen and then its screens, titled as in the frame.
 */
export const MODULES = {
  title: 'The modules',
  lede: 'Mailing, Messaging and Calling sit in one dashboard, next to the other modules. These are the ones this case study designs, each with its description and its screens.',
  ratio: 1236 / 800,
  tabs: [
    {
      id: 'katchup',
      label: 'Katchup',
      text: [
        'An Instant Digital messaging module tightly integrated with all other modules of KPOST. User can experience seamless options of mailing and calling the contacts while he is in Messaging module.',
        'It gives a convenience of openable message trail which obviates going up and down in search of the related messages. User can find all messages of a contact in one exclusive folder for the contact.',
      ],
      items: [
        { image: 'kpost/modules/katchup-hero.webp', title: 'Katchup', text: 'Recents, with KNews, KEcommerce, Diary, KBooking and widgets beside it.' },
        ...screens('katchup', ['Bulk Message', 'Select Contacts', 'Katchup Group Info', 'Advanced Search', 'Katchup Group Message', 'Write Message']),
      ],
    },
    {
      id: 'kmail',
      label: 'Kmail',
      text: [
        'Mailing will not be same boring experience with KMail. KMail is set in a fresh frame with multiple innovative features. No more inbox or Outbox. All the mails are parked in contact’s folders in reverse chronological order with newer mails at the top of the stack.',
        'It allows you to open multiple reference mails while drafting a new mail or while replying, first of its kind.',
      ],
      items: [
        { image: 'kpost/modules/kmail-hero.webp', title: 'Kmail', text: 'Recents, Contacts and Status of Mails, with two mails open side by side.' },
        ...screens('kmail', ['Write Mail', 'Edit Mail', 'Kmail Folder View', 'Kmail Folder View', 'Status of Mails', 'Group Mail Info']),
      ],
    },
    {
      id: 'kall',
      label: 'Kall',
      text: [
        'Kall provides One on One Internet Audio Call and Video Call. It also provides for Call to Registered Mobile number, to Alternate mobile number of the user and also to Landline number.',
        'It provides FaceTime Call for iOS devices. Audio and video Scheduled Conference calls are available.',
      ],
      items: [
        { image: 'kpost/modules/kall-hero.webp', title: 'Kall', text: 'Call history, with KNews, KEcommerce, Diary and KBooking beside it.' },
        ...screens('kall', ['Kall Contact Screen', 'Kool Kall Screen', 'Create Kool Kall', 'Digital Card']),
      ],
    },
    {
      id: 'kdiary',
      label: 'KDiary',
      // NOTE: the frame's KDiary heading carries a paragraph about the KDirectory; it is reproduced as written.
      text: ['The KDirectory will help the User to locate any other KPOST User across the world. It can help to locate Government Officials and Corporate Contacts in no time for any need.'],
      items: [
        { image: 'kpost/modules/kdiary-hero.webp', title: 'KDiary', text: 'The day’s schedule and a calendar, beside Recents.' },
        ...screens('kdiary', ['Add Schedule One Time', 'Add Schedule Repeated']),
      ],
    },
    {
      id: 'other',
      label: 'Other screens',
      text: [],
      items: screens('other', [
        'Setting Screen',
        'Data & Storage',
        ['Personalize - Change Theme', 'Red theme.'],
        ['Personalize - Change Theme', 'Dark theme.'],
        'Kloud Data & Storage Info',
        'KDocuments',
      ]),
    },
  ],
}

/* ---------------------------------------------------------------------------------------------- Mobile app */

const phone = (index, label) => ({ image: `kpost/mobile/m-${String(index).padStart(2, '0')}.webp`, label })

/** The mobile screens, grouped by the module their header names. Each is labelled with that header. */
export const MOBILE = {
  title: 'Mobile app',
  lede: 'The modules on the phone: twenty screens of the mobile UI, grouped by module.',
  tabs: [
    { id: 'katchup', label: 'Katchup', screens: [phone(11, 'Recents'), phone(13, 'Message thread'), phone(6, 'Write message'), phone(8, 'Group info')] },
    { id: 'kmail', label: 'Kmail', screens: [phone(14, 'Mail list'), phone(16, 'Mail'), phone(7, 'Attach menu'), phone(12, 'Select album'), phone(1, 'Mail with copies'), phone(17, 'Group mail info')] },
    { id: 'kall', label: 'Kall', screens: [phone(2, 'Recents'), phone(19, 'Kool Kall'), phone(9, 'Kool Kall invitation')] },
    { id: 'kdiary', label: 'KDiary', screens: [phone(3, 'Add schedule'), phone(18, 'Add schedule, repeated')] },
    { id: 'settings', label: 'Settings', screens: [phone(15, 'Settings'), phone(4, 'General settings: notifications'), phone(10, 'General settings: data and storage'), phone(5, 'Kloud storage'), phone(20, 'Profile creation')] },
  ],
}
