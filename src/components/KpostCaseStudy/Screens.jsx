import Section from '../CaseStudy/ui/Section'
import Figure, { FigureGrid } from '../CaseStudy/ui/Figure'
import FrameViewer from '../CaseStudy/ui/FrameViewer'
import { DASHBOARD, SIGN_IN } from '../../data/kpostCaseStudy'

/** The dashboard page, across the full width. */
export function Dashboard() {
  const { title, lede, figure } = DASHBOARD
  return (
    <Section id="dashboard" title={title} lede={lede}>
      <FigureGrid>
        <Figure {...figure} span="full" />
      </FigureGrid>
    </Section>
  )
}

/** The four entry screens: one large, the others a thumbnail away. */
export function SignIn() {
  const { title, lede, items, ratio } = SIGN_IN
  return (
    <Section id="sign-in" title={title} lede={lede}>
      <FrameViewer items={items} label="Login and signup screens" ratio={ratio} />
    </Section>
  )
}
