import CaseStudyShell from '../CaseStudy/CaseStudyShell'
import SonyLivHero from './SonyLivHero'
import Overview from './Overview'
import Problem from './Problem'
import Process from './Process'
import DesignSystem from './DesignSystem'
import Interactivity from './Interactivity'
import Screens from './Screens'
import { CHAPTERS, SONY_PATH, SONY_SLUG } from '../../data/sonylivCaseStudy'

const TITLE = 'Sony LIV | UX enhancement and design system | Akash Pandurangan'

/**
 * The Sony LIV case study, at #/case-studies/sonyliv. It shares the page shell of the other case studies (image viewer,
 * chapter links, "More projects"): a banner, the overview, the problem space and the process, the design system, the
 * prototype recordings and the TV screens.
 */
export default function SonyLivCaseStudyPage({ section }) {
  return (
    <CaseStudyShell title={TITLE} slug={SONY_SLUG} chapters={CHAPTERS} basePath={SONY_PATH} section={section} hero={<SonyLivHero />}>
      <Overview />
      <Problem />
      <Process />
      <DesignSystem />
      <Interactivity />
      <Screens />
    </CaseStudyShell>
  )
}
