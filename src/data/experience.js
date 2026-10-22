import quickplayLogo from '../assets/experience/logo-quickplay.png'
import kpostLogo from '../assets/experience/logo-kpost.png'
import thinkDigitalLogo from '../assets/experience/logo-think-digital.png'

/*
 * Each role has six photographs (assets/experience/photos/<slug>-1…6.webp, ordered left → right).
 * They are the polaroids from the Figma design, exported one by one so they can be revealed individually.
 */
const photoModules = import.meta.glob('../assets/experience/photos/*-?.webp', { eager: true, import: 'default' })
const photosFor = (slug) =>
  Array.from({ length: 6 }, (_, index) => photoModules[`../assets/experience/photos/${slug}-${index + 1}.webp`])

/* The same paragraph is used for all three roles in the Figma file. */
const DESCRIPTION =
  'My process combines product thinking, user-centered design, and scalable design systems to deliver consistent digital experiences across OTT, Mobile, Web, Smart TV, and STB platforms. I collaborate closely with product, engineering, and QA teams throughout the product lifecycle, from initial requirements to implementation and design QA.'

export const EXPERIENCE = [
  {
    id: 'quickplay',
    role: 'Senior Product Designer',
    period: 'Jul 2024 - Oct 2026',
    company: 'Quickplay Media Pvt Ltd, Chennai, India',
    logo: { src: quickplayLogo, width: 10, height: 18 },
    description: DESCRIPTION,
    photos: photosFor('quickplay'),
    photosLabel: 'Photos from my time at Quickplay Media',
  },
  {
    id: 'kpost',
    role: 'UI UX Designer',
    period: 'Sep 2022 - Jul 2024',
    company: 'KPOST Software Pvt Ltd, Chennai, India',
    logo: { src: kpostLogo, width: 21.0857, height: 18 },
    description: DESCRIPTION,
    photos: photosFor('kpost'),
    photosLabel: 'Photos from my time at KPOST Software',
  },
  {
    id: 'think-digital',
    role: 'Graphic & UI UX Designer',
    period: 'Jul 2021 - Sep 2022',
    company: 'Think Digital Wordings Pvt Ltd, Chennai, India',
    logo: { src: thinkDigitalLogo, width: 16.7143, height: 18 },
    description: DESCRIPTION,
    photos: photosFor('think-digital'),
    photosLabel: 'Photos from my time at Think Digital Wordings',
  },
]
