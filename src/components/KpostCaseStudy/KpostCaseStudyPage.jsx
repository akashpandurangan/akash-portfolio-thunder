import CaseStudyShell from '../CaseStudy/CaseStudyShell'
import KpostHero from './KpostHero'
import Overview from './Overview'
import Feedback from './Feedback'
import Foundations from './Foundations'
import BeforeAfter from './BeforeAfter'
import { Dashboard, SignIn } from './Screens'
import Modules from './Modules'
import MobileApp from './MobileApp'
import { CHAPTERS, KPOST_PATH, KPOST_SLUG } from '../../data/kpostCaseStudy'
import styles from './KpostCaseStudyPage.module.css'

const TITLE = 'KPOST Communication Platform | UI/UX case study | Akash Pandurangan'

/**
 * The KPOST Communication platform case study, at #/case-studies/kpost-communication. It is organised like the OTT
 * design-system case study and shares its page shell (image viewer, chapter links, "More projects"): a banner, the overview
 * as rows, what the users said, the foundations, the redesign, the screens, the modules in tabs and the mobile app.
 */
export default function KpostCaseStudyPage({ section }) {
  return (
    <CaseStudyShell
      title={TITLE}
      slug={KPOST_SLUG}
      chapters={CHAPTERS}
      basePath={KPOST_PATH}
      section={section}
      hero={<KpostHero />}
      className={styles.theme}
    >
      <Overview />
      <Feedback />
      <Foundations />
      <BeforeAfter />
      <Dashboard />
      <SignIn />
      <Modules />
      <MobileApp />
    </CaseStudyShell>
  )
}
