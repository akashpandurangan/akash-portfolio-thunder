import { useState } from 'react'
import Section from '../CaseStudy/ui/Section'
import Tabs from '../CaseStudy/ui/Tabs'
import DemoVideo from '../CaseStudy/ui/DemoVideo'
import { asset } from '../../data/caseStudyAssets'
import { INTERACTIVITY } from '../../data/sonylivCaseStudy'
import { SONY_VIDEOS } from '../../data/sonylivVideos'
import styles from './Interactivity.module.css'

/** One recording in a phone-sized player, beside what it shows. The video is fetched only once it is near the screen. */
function Clip({ clip }) {
  const poster = asset(clip.poster)
  return (
    <div className={styles.clip}>
      <div className={styles.phone}>
        <DemoVideo
          src={SONY_VIDEOS[clip.video]}
          poster={poster.src}
          width={poster.width}
          height={poster.height}
          title={`${clip.title}: a screen recording of the prototype`}
        />
      </div>
      <div className={styles.about}>
        <p className={styles.meta}>Prototype recording · {clip.seconds} seconds, on a loop</p>
        <h3>{clip.title}</h3>
        <p>{clip.text}</p>
      </div>
    </div>
  )
}

/** The five prototype recordings of the Figma page, one at a time, chosen with tabs. */
export default function Interactivity() {
  const { title, lede, clips } = INTERACTIVITY
  const [active, setActive] = useState(clips[0].id)

  return (
    <Section id="interactivity" title={title} lede={lede}>
      <Tabs
        label="Prototype recordings"
        tabs={clips.map(({ id, tab }) => ({ id, label: tab }))}
        value={active}
        onChange={setActive}
        render={(tab) => <Clip key={tab.id} clip={clips.find((clip) => clip.id === tab.id)} />}
      />
    </Section>
  )
}
