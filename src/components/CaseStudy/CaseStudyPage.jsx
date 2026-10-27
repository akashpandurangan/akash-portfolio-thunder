// The design system is set in Roboto, so the prototypes and specimens load it. It only downloads on this page.
import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-500.css'
import '@fontsource/roboto/latin-700.css'
import CaseStudyShell from './CaseStudyShell'
import ComponentSystem from './ComponentSystem'
import Demos from './Demos'
import Foundations from './Foundations'
import Hero from './Hero'
import Navigation from './Navigation'
import Overview from './Overview'
import Platforms from './Platforms'
import Playground from './Playground'
import Takeaways from './Takeaways'
import { CHAPTERS } from '../../data/designSystemCaseStudy'
import { CASE_STUDY_PATH } from '../../hooks/useHashRoute'

const TITLE = 'OTT Video Player Design System | Akash Pandurangan'

/** The OTT video-player design-system case study, at #/case-studies/ott-design-system. */
export default function CaseStudyPage({ section }) {
  return (
    <CaseStudyShell
      title={TITLE}
      slug="ott-design-system"
      chapters={CHAPTERS}
      basePath={CASE_STUDY_PATH}
      section={section}
      hero={<Hero />}
    >
      <Overview />
      <Foundations />
      <ComponentSystem />
      <Playground />
      <Demos />
      <Platforms />
      <Navigation />
      <Takeaways />
    </CaseStudyShell>
  )
}
