import { useState } from 'react'
import Section from '../CaseStudy/ui/Section'
import Tabs from '../CaseStudy/ui/Tabs'
import FrameViewer from '../CaseStudy/ui/FrameViewer'
import { MODULES } from '../../data/kpostCaseStudy'
import styles from './Modules.module.css'

function ModulePanel({ tab }) {
  return (
    <div className={styles.panel}>
      {tab.text.length > 0 && (
        <div className={styles.intro}>
          {tab.text.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
      <FrameViewer key={tab.id} items={tab.items} label={`${tab.label} screens`} ratio={MODULES.ratio} />
    </div>
  )
}

/** The modules in tabs, like the component groups of the design system: what the module is, then its screens. */
export default function Modules() {
  const [active, setActive] = useState(MODULES.tabs[0].id)

  return (
    <Section id="modules" title={MODULES.title} lede={MODULES.lede}>
      <Tabs
        label="Modules"
        tabs={MODULES.tabs.map(({ id, label }) => ({ id, label }))}
        value={active}
        onChange={setActive}
        render={(tab) => <ModulePanel tab={MODULES.tabs.find((module) => module.id === tab.id)} />}
      />
    </Section>
  )
}
