import card1 from '../assets/projects/card-1.webp'
import card2 from '../assets/projects/card-2.webp'
import card3 from '../assets/projects/card-3.webp'
import card4 from '../assets/projects/card-4.webp'
import card5 from '../assets/projects/card-5.webp'
import card6 from '../assets/projects/card-6.webp'

/* Filter tabs shown above the grid. The design hides an "All" tab, so "Case Study" is the default. */
export const PROJECT_FILTERS = ['Case Study', 'Frontend', 'UI Screens', 'Graphic Design']

/*
 * Copy is reproduced exactly as it appears in the Figma file, including repeated tags and
 * descriptions that don't match their titles — see the notes in the project hand-off.
 * `href` is optional: add a case-study URL and the card title becomes a link.
 */
export const PROJECTS = [
  {
    id: 'sonyliv',
    title: 'SonyLIV',
    description:
      'A next-generation SonyLIV experience concept focused on making OTT discovery more personalized, intelligent, and interactive.',
    tags: ['Product Strategy', 'Product Strategy', 'Product Strategy'],
    category: 'Case Study',
    image: card1,
    href: '',
  },
  {
    id: 'xcourt-sports',
    title: 'Xcourt Sports',
    description:
      'Quickplay CMS is a content and operations management platform designed to help media teams manage, organize, schedule, and monitor large volumes of video and live-streaming content from a single interface.',
    tags: ['SaaS', 'Sports', 'Product Strategy', 'Product Strategy', 'Product Strategy'],
    category: 'Case Study',
    image: card2,
    href: '',
  },
  {
    id: 'ai-studio',
    title: 'Ai studio',
    description:
      'The OTT Design System was created to standardize and scale user experiences across TV, STB, Web, Mobile, Smart TV, and gaming consoles. The goal was to establish a unified design foundation covering navigation, movie cards, content rails, video player components, interaction patterns, and theming systems.',
    tags: ['AI', 'SaaS'],
    category: 'Case Study',
    image: card3,
    href: '',
  },
  {
    id: 'ott-design-system',
    title: 'OTT Design System',
    description:
      'The OTT Design System was created to standardize and scale user experiences across TV, STB, Web, Mobile, Smart TV, and gaming consoles. The goal was to establish a unified design foundation covering navigation, movie cards, content rails, video player components, interaction patterns, and theming systems.',
    tags: ['Design systems'],
    category: 'Case Study',
    image: card4,
    href: '',
  },
  {
    id: 'kampus-ueducate',
    title: 'KAMPUS UEducate',
    description:
      'KAMPUS UEducate is a live, production-grade e-learning platform implemented for schools to digitize academic operations and enhance remote learning experiences. The platform supports students, teachers, and administrators through role-based dashboards integrating live classes, attendance tracking, assignments, examinations, performance analytics, and announcements.',
    tags: ['Saas', 'E-learning'],
    category: 'Case Study',
    image: card5,
    href: '',
  },
  {
    id: 'kpost-communication',
    title: 'KPOST Communication',
    description:
      'KPOST is a large-scale enterprise communication platform designed to unify collaboration, productivity, and commerce tools into a single ecosystem. The platform integrates chat, mail, voice communication, scheduling, directory management, cloud storage, and e-commerce capabilities to streamline organizational workflows.',
    tags: ['Enterprise', 'Saas'],
    category: 'Case Study',
    image: card6,
    href: '',
  },
]
