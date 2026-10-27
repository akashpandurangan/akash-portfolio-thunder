import { useState } from 'react'
import Section from '../CaseStudy/ui/Section'
import Tabs from '../CaseStudy/ui/Tabs'
import FrameViewer from '../CaseStudy/ui/FrameViewer'
import styles from './ScreenTabs.module.css'

function Panel({ tab, ratio }) {
  return (
    <div className={styles.panel}>
      {tab.text.length > 0 && (
        <div className={styles.intro}>
          {tab.text.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
      <FrameViewer key={tab.id} items={tab.items} label={`${tab.label} screens`} ratio={ratio} />
    </div>
  )
}

/** A chapter whose screens come in groups: tabs for the groups, each with what it is and a viewer of its screens. */
export default function ScreenTabs({ id, data }) {
  const [active, setActive] = useState(data.tabs[0].id)

  return (
    <Section id={id} title={data.title} lede={data.lede}>
      <Tabs
        label={data.title}
        tabs={data.tabs.map(({ id: tabId, label }) => ({ id: tabId, label }))}
        value={active}
        onChange={setActive}
        render={(tab) => <Panel tab={data.tabs.find((entry) => entry.id === tab.id)} ratio={data.ratio} />}
      />
    </Section>
  )
}
