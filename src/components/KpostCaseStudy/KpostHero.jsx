import CaseStudyHero from '../CaseStudy/CaseStudyHero'
import { HERO } from '../../data/kpostCaseStudy'

// Real screens of the KPOST frame, back to front, placed like the layers of the OTT banner: a large one at the top, one
// overlapping it, a phone at the bottom left and a wide screen cut off by the bottom edge of the card.
const LAYERS = [
  { path: 'kpost/redesign/dashboard.webp', alt: 'The KPOST dashboard: Recents, KNews, KEcommerce, Diary and KBooking', wide: [128, 0, 640], tall: [96, 8, 544] },
  { path: 'kpost/modules/kmail-hero.webp', alt: 'Kmail with two mails open side by side', wide: [580, 118, 500], tall: [170, 196, 470] },
  { path: 'kpost/mobile/m-11.webp', alt: 'The mobile app: Katchup recents', wide: [18, 150, 176], tall: [0, 318, 200] },
  { path: 'kpost/login/login-3.webp', alt: 'The KPOST login screen', wide: [318, 392, 440], tall: [214, 440, 420] },
]

/** The banner of the KPOST case study. */
export default function KpostHero() {
  return <CaseStudyHero crumb="KPOST Communication" {...HERO} layers={LAYERS} />
}
