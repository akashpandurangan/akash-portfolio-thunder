import CaseStudyShell from '../CaseStudy/CaseStudyShell'
import UnifiFifaHero from './UnifiFifaHero'
import Background from './Background'
import Goals from './Goals'
import ProcessMap from './ProcessMap'
import Research from './Research'
import Audience from './Audience'
import Needs from './Needs'
import Problem from './Problem'
import Architecture from './Architecture'
import Flows from './Flows'
import FinalUi from './FinalUi'
import EdgeCases from './EdgeCases'
import Outcome from './Outcome'
import { CHAPTERS, UNIFI_FIFA_PATH, UNIFI_FIFA_SLUG } from '../../data/unifiFifaCaseStudy'

const TITLE = 'Unifi TV × FIFA World Cup 2026 | Pass-purchase UX case study | Akash Pandurangan'

/**
 * The Unifi TV × FIFA World Cup 2026 case study, at #/case-studies/unifi-fifa. It shares the page shell of the other case
 * studies (image viewer, chapter links, "More projects") and tells one story from the brief to the final screens: the
 * background, goals and requirements, the design process, research, audience, needs, the problem, the structure and
 * flows, the final UI, the edge cases and the outcome. Every screen is a frame from the
 * Daily Pass and Season Pass design boards.
 */
export default function UnifiFifaCaseStudyPage({ section }) {
  return (
    <CaseStudyShell title={TITLE} slug={UNIFI_FIFA_SLUG} chapters={CHAPTERS} basePath={UNIFI_FIFA_PATH} section={section} hero={<UnifiFifaHero />}>
      <Background />
      <Goals />
      <ProcessMap />
      <Research />
      <Audience />
      <Needs />
      <Problem />
      <Architecture />
      <Flows />
      <FinalUi />
      <EdgeCases />
      <Outcome />
    </CaseStudyShell>
  )
}
