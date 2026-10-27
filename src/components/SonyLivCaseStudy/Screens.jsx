import Section from '../CaseStudy/ui/Section'
import FrameViewer from '../CaseStudy/ui/FrameViewer'
import { SCREENS } from '../../data/sonylivCaseStudy'

/** The TV screens, in the order of a viewer's journey, in one viewer with a strip of thumbnails. */
export default function Screens() {
  const { title, lede, items, ratio } = SCREENS
  return (
    <Section id="screens" title={title} lede={lede}>
      <FrameViewer items={items} label="TV screens" ratio={ratio} />
    </Section>
  )
}
