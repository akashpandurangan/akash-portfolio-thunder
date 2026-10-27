import CaseStudyHero from '../CaseStudy/CaseStudyHero'
import { HERO } from '../../data/aiStudioCaseStudy'

// Real screens, back to front, placed like the layers of the other banners: the dashboard behind, a trend page overlapping
// it, a video's performance at the bottom left and the library cut off by the bottom edge of the card.
const LAYERS = [
  { path: 'ai-studio/trends/search-start.webp', alt: 'The AI Studio dashboard with Social Trends and suggested content', wide: [128, 0, 640], tall: [96, 8, 544] },
  { path: 'ai-studio/insights/page-top.webp', alt: 'A trend page with an AI insight, related topics and a graph of similar trends', wide: [580, 118, 500], tall: [170, 196, 470] },
  { path: 'ai-studio/performance/video-detail.webp', alt: 'The performance page of a single video, with relevant clips to create from it', wide: [18, 236, 360], tall: [0, 318, 300] },
  { path: 'ai-studio/library/grid.webp', alt: 'The library as a grid of titles', wide: [330, 392, 520], tall: [214, 440, 420] },
]

/** The banner of the AI Studio case study. */
export default function AiStudioHero() {
  return <CaseStudyHero crumb="AI Studio" {...HERO} layers={LAYERS} />
}
