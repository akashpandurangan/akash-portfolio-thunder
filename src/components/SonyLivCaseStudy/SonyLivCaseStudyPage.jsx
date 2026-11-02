import CaseStudyShell from '../CaseStudy/CaseStudyShell'
import SonyLivHero from './SonyLivHero'
import Overview from './Overview'
import Problem from './Problem'
import Process from './Process'
import Improvements from './Improvements'
import DesignSystem from './DesignSystem'
import KeyComponents from './KeyComponents'
import MobileTv from './MobileTv'
import Outcome from './Outcome'
import { CHAPTERS, SONY_PATH, SONY_SLUG } from '../../data/sonylivCaseStudy'

const TITLE = 'Sony LIV | UX enhancement and design system | Akash Pandurangan'

/**
 * The Sony LIV case study, at #/case-studies/sonyliv. It shares the page shell of the other case studies (image viewer,
 * chapter links, "More projects") and is a short story: a banner, the overview, the problem, the approach, four key
 * improvements, the design system and its important components, the mobile and TV screens, and the outcome.
 */
export default function SonyLivCaseStudyPage({ section }) {
  return (
    <CaseStudyShell title={TITLE} slug={SONY_SLUG} chapters={CHAPTERS} basePath={SONY_PATH} section={section} hero={<SonyLivHero />}>
      <Overview />
      <Problem />
      <Process />
      <Improvements />
      <DesignSystem />
      <KeyComponents />
      <MobileTv />
      <Outcome />
    </CaseStudyShell>
  )
}
