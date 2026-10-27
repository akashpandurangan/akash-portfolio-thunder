import CaseStudyShell from '../CaseStudy/CaseStudyShell'
import AiStudioHero from './AiStudioHero'
import Overview from './Overview'
import ScreenTabs from './ScreenTabs'
import { BrandKit, Dashboard, Insights, Narrative, Performance } from './Screens'
import { AI_PATH, AI_SLUG, CHAPTERS, LIBRARY, TRENDS } from '../../data/aiStudioCaseStudy'

const TITLE = 'AI Studio | UI/UX case study | Akash Pandurangan'

/**
 * The AI Studio case study, at #/case-studies/ai-studio. It shares the page shell of the other case studies (image viewer,
 * chapter links, "More projects"): a banner, the overview, then one chapter per area of the product, each made of the
 * real screens.
 */
export default function AiStudioCaseStudyPage({ section }) {
  return (
    <CaseStudyShell title={TITLE} slug={AI_SLUG} chapters={CHAPTERS} basePath={AI_PATH} section={section} hero={<AiStudioHero />}>
      <Overview />
      <Dashboard />
      <ScreenTabs id="trends" data={TRENDS} />
      <Insights />
      <Narrative />
      <Performance />
      <ScreenTabs id="library" data={LIBRARY} />
      <BrandKit />
    </CaseStudyShell>
  )
}
