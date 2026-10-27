import CaseStudyHero from '../CaseStudy/CaseStudyHero'
import { HERO } from '../../data/sonylivCaseStudy'

// Real screens, back to front, placed like the layers of the other banners: the TV homepage behind, the player overlapping
// it, a phone with the home hero banner at the bottom left and the TV search results cut off by the bottom edge of the card.
const LAYERS = [
  { path: 'sonyliv/tv/homepage.webp', alt: 'The Sony LIV TV homepage with its hero banner and the Continue Watching rail', wide: [128, 0, 640], tall: [96, 8, 544] },
  { path: 'sonyliv/tv/player.webp', alt: 'The Sony LIV TV video player with its progress bar', wide: [580, 118, 500], tall: [170, 196, 470] },
  { path: 'sonyliv/poster/hero-banner.webp', alt: 'The Sony LIV mobile home screen with its hero banner', wide: [18, 150, 176], tall: [0, 318, 200] },
  { path: 'sonyliv/tv/search-results.webp', alt: 'Search results on the Sony LIV TV app', wide: [318, 392, 440], tall: [214, 440, 420] },
]

/** The banner of the Sony LIV case study. */
export default function SonyLivHero() {
  return <CaseStudyHero crumb="Sony LIV" {...HERO} layers={LAYERS} />
}
