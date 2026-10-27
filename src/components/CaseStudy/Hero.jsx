import CaseStudyHero from './CaseStudyHero'
import { HERO } from '../../data/designSystemCaseStudy'

const LAYERS = [
  { path: 'ott/web-player.webp', alt: 'Web player with a labelled control bar', wide: [128, 0, 660], tall: [96, 8, 544] },
  { path: 'ott/tv/audio-popup.webp', alt: 'TV player with the Audio popup open', wide: [580, 118, 500], tall: [170, 196, 470] },
  { path: 'ott/mobile/settings/portrait-full-appearance.webp', alt: 'Mobile subtitle appearance sheet', wide: [18, 214, 268], tall: [0, 318, 236] },
  { path: 'ott/components/seek-final.webp', alt: 'Content, live and ad seek bars', wide: [318, 392, 590], tall: [110, 494, 524] },
]

/** The banner of the OTT design-system case study. */
export default function Hero() {
  return <CaseStudyHero crumb="OTT Design System" {...HERO} layers={LAYERS} />
}
