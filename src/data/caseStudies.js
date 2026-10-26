import sonylivPhone from '../assets/projects/case-studies/sonyliv-phone.webp'
import sonylivTv from '../assets/projects/case-studies/sonyliv-tv.webp'
import sonylivTablet from '../assets/projects/case-studies/sonyliv-tablet.webp'
import aiLeft from '../assets/projects/case-studies/ai-left.webp'
import aiRight from '../assets/projects/case-studies/ai-right.webp'
import unifiPhone from '../assets/projects/case-studies/unifi-phone.webp'
import unifiTv from '../assets/projects/case-studies/unifi-tv.webp'
import unifiTablet from '../assets/projects/case-studies/unifi-tablet.webp'
import kpostDesktop from '../assets/projects/case-studies/kpost-desktop.webp'
import kpostMobile from '../assets/projects/case-studies/kpost-mobile.webp'
import kampusDesktop from '../assets/projects/case-studies/kampus-desktop.webp'
import ottDevice from '../assets/projects/case-studies/ott-device.webp'
import ottVideo from '../assets/projects/video/ott-design-system.mp4'

/*
 * The six case-study cards of the Projects tab, as laid out in the Figma "Section" frame (node 1054:36319).
 *
 * Each card has a text block and a stage with device mockups. The mockups are Figma 2x exports, already cropped by the
 * card's bottom edge, so they are placed by their design coordinates:
 *   stage  = the card's media frame: `width` × `height` design pixels (the visible part, down to the card's bottom edge)
 *   shot   = one exported device. `x` / `y` / `w` are its top-left corner and width on the stage (design px, export
 *            padding included); `pxWidth` / `pxHeight` are the file's own size and only reserve the aspect ratio
 *   caption = the pill above a device (`x` / `y` = its top-left corner, `scale` = size relative to the 12px original)
 * CSS turns these into percentages of the stage, so the whole composition scales as one piece.
 *
 * `video` (OTT Design System only) is the Figma video fill: `frame` is the rounded clip it lives in and `rect` its box
 * inside that clip. The device export underneath already shows the video's still frame, which stays visible until the
 * video actually plays (or for good if it can't).
 *
 * Copy is the Figma text verbatim, with one exception: the OTT card's last focus tag reads "ross-Platform UX" in the
 * file (a dropped "C"), which is corrected here. `href` is the prototype link of the card; none was supplied for
 * Unifi TV 2.0, so its button stays inert (SmartLink's convention for a missing URL).
 */

const SONYLIV_STAGE = { width: 1038.695, height: 504 }

const tvShots = (phone, tv, tablet) => [
  {
    src: phone,
    alt: 'Mobile profile and settings screen',
    pxWidth: 466,
    pxHeight: 799,
    x: -4.664,
    y: 104.532,
    w: 233,
    caption: { text: 'Mobile | Setting screen', x: 16.07, y: 61.28 },
  },
  {
    src: tv,
    alt: 'TV New & Hot screen',
    pxWidth: 789,
    pxHeight: 919,
    x: 269.632,
    y: 44.852,
    w: 394.5,
    caption: { text: 'TV | New & Hot', x: 403.611, y: 0 },
  },
  {
    src: tablet,
    alt: 'Tablet home screen',
    pxWidth: 670,
    pxHeight: 842,
    x: 706.888,
    y: 83.023,
    w: 335,
    caption: { text: 'Tablet | Home screen', x: 789.622, y: 38.3 },
  },
]

export const CASE_STUDIES = [
  {
    id: 'sonyliv',
    title: 'SonyLIV',
    subtitle: 'Multi-Platform OTT Experience Design',
    description:
      'A next-generation SonyLIV experience concept focused on making OTT discovery more personalized, intelligent, and interactive.',
    platforms: ['Mobile App', 'Tablet', 'Web', 'm-Web', 'TV', 'Smart TV'],
    focusAreas: ['Design System', 'UI Enhancements', 'UX Improvements', 'Seamless Cross-Platform Experience'],
    category: 'Case Study',
    href:
      'https://www.figma.com/proto/ej9eb56rFBPbmGsyIsqh08/Akash-Pandurangan?node-id=739-20464&viewport=476%2C308%2C0.07&t=5Vb8N4FxspSqklsF-1&scaling=scale-down-width&content-scaling=fixed&page-id=589%3A8577',
    stage: SONYLIV_STAGE,
    shots: tvShots(sonylivPhone, sonylivTv, sonylivTablet),
  },
  {
    id: 'ai-studio',
    title: 'Ai Studio',
    subtitle: 'AI-Powered Content Creation Platform',
    description:
      'Designing intuitive AI-powered workflows that help users transform ideas into engaging content through streamlined tools, smart automation, and seamless creative experiences.',
    platforms: ['Web App', 'Dashboard', 'SaaS'],
    focusAreas: ['UX Optimization', 'AI-Powered Workflows', 'Design System', 'UI Enhancements'],
    category: 'Case Study',
    href:
      'https://www.figma.com/proto/ej9eb56rFBPbmGsyIsqh08/Akash-Pandurangan?node-id=739-20696&viewport=476%2C308%2C0.07&t=5Vb8N4FxspSqklsF-1&scaling=scale-down-width&content-scaling=fixed&page-id=589%3A8577',
    // This card's media frame starts 4px lower than the others, so its visible stage is 500px tall.
    stage: { width: 954.316, height: 500 },
    shots: [
      {
        src: aiLeft,
        alt: 'Create new narrative screen',
        pxWidth: 924,
        pxHeight: 837,
        x: -6,
        y: 81.701,
        w: 462,
        caption: { text: 'Mobile | Setting screen', x: 146.002, y: 50.395, scale: 0.8224 },
      },
      {
        src: aiRight,
        alt: 'Trends dashboard screen',
        pxWidth: 936,
        pxHeight: 930,
        x: 488.316,
        y: 35.306,
        w: 468,
        caption: { text: 'TV | New & Hot', x: 670.318, y: 0, scale: 0.8224 },
      },
    ],
  },
  {
    id: 'unifi-tv',
    title: 'Unifi TV 2.0',
    subtitle: 'Next-Generation Multi-Platform OTT Experience',
    description:
      'Designing a seamless entertainment experience for Telekom Malaysia’s Unifi TV 2.0, enhancing content discovery, simplifying navigation, and delivering a consistent viewing experience across Smart TVs, mobile apps, and web platforms.',
    platforms: ['Mobile App', 'Tablet', 'Web', 'm-Web', 'TV', 'Smart TV'],
    focusAreas: ['Design System', 'UI Enhancements', 'UX Improvements', 'Seamless Cross-Platform Experience'],
    category: 'Case Study',
    href: '',
    stage: SONYLIV_STAGE,
    shots: tvShots(unifiPhone, unifiTv, unifiTablet),
  },
  {
    id: 'kpost-communication',
    title: 'KPOST Communication',
    subtitle: 'Unified Digital Communication Platform',
    description:
      'Designing a seamless communication experience that helps users connect, collaborate, and manage conversations through intuitive interfaces, streamlined workflows, and consistent cross-platform experiences.',
    platforms: ['Web App', 'Mobile App', 'Dashboard'],
    focusAreas: ['Design System', 'UI Enhancements', 'UX Improvements', 'Seamless Communication Experience'],
    category: 'Case Study',
    href:
      'https://www.figma.com/proto/ej9eb56rFBPbmGsyIsqh08/Akash-Pandurangan?node-id=735-14114&viewport=476%2C308%2C0.07&t=5Vb8N4FxspSqklsF-1&scaling=scale-down-width&content-scaling=fixed&page-id=589%3A8577',
    stage: { width: 992.024, height: 504 },
    shots: [
      {
        src: kpostDesktop,
        alt: 'Write message dashboard screen',
        pxWidth: 1400,
        pxHeight: 829,
        x: 0,
        y: 89.532,
        w: 700,
        caption: { text: 'Dashboard | Write Message', x: 247.234, y: 40 },
      },
      {
        src: kpostMobile,
        alt: 'Mobile home screen',
        pxWidth: 494,
        pxHeight: 913,
        x: 747.024,
        y: 47.532,
        w: 247,
        caption: { text: 'Mobile | Home', x: 810.758, y: 0 },
      },
    ],
  },
  {
    id: 'kampus-ueducate',
    title: 'KAMPUS UEducate',
    subtitle: 'Digital Learning & Education Platform',
    description:
      'Designing an intuitive e-learning experience that helps students access educational resources, manage learning activities, and navigate digital classrooms through streamlined workflows and user-friendly interfaces.',
    platforms: ['Web App', 'Mobile App', 'Dashboard'],
    focusAreas: ['Design System', 'UI Enhancements', 'UX Improvements', 'Seamless Learning Experience'],
    category: 'Case Study',
    href:
      'https://www.figma.com/proto/ej9eb56rFBPbmGsyIsqh08/Akash-Pandurangan?node-id=742-20704&viewport=383%2C402%2C0.03&t=L9nlnW9JT62IOQnH-1&scaling=scale-down-width&content-scaling=fixed&page-id=589%3A8577',
    stage: { width: 709, height: 504 },
    shots: [
      {
        src: kampusDesktop,
        alt: 'Dashboard home screen',
        pxWidth: 1426,
        pxHeight: 913,
        x: -2,
        y: 47.532,
        w: 713,
        caption: { text: 'Dashboard | Home', x: 283.734, y: 0 },
      },
    ],
  },
  {
    id: 'ott-design-system',
    title: 'OTT Design System',
    subtitle: 'Scalable Multi-Platform OTT Design System',
    description:
      'Building a consistent and scalable design system for OTT platforms, streamlining UI components, design tokens, and reusable patterns to deliver seamless entertainment experiences across mobile, web, tablet, Smart TV, and STB.',
    platforms: ['Mobile', 'Web', 'Tablet', 'TV'],
    focusAreas: ['Design System', 'UI Enhancements', 'Component Libraries', 'Design Tokens', 'Cross-Platform UX'],
    category: 'Case Study',
    href:
      'https://www.figma.com/proto/ej9eb56rFBPbmGsyIsqh08/Akash-Pandurangan?node-id=742-20700&viewport=383%2C402%2C0.03&t=0t520il8u4c1uiKL-1&scaling=scale-down-width&content-scaling=fixed&page-id=589%3A8577',
    stage: { width: 709, height: 504 },
    shots: [
      {
        src: ottDevice,
        alt: 'Design system file open in Figma',
        pxWidth: 1426,
        pxHeight: 913,
        x: -2,
        y: 47.5,
        w: 713,
        caption: { text: 'OTT Design System & Components', x: 233.734, y: 0 },
      },
    ],
    video: {
      src: ottVideo,
      // The rounded "Blue" frame that clips the recording, and the recording's box inside it (design px).
      frame: { x: 8, y: 57.5, w: 693, h: 726, radius: 18 },
      rect: { x: -0.5, y: 0.5, w: 693, h: 457 },
    },
  },
]
