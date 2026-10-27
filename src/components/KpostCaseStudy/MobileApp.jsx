import { useState } from 'react'
import Section from '../CaseStudy/ui/Section'
import Tabs from '../CaseStudy/ui/Tabs'
import Figure from '../CaseStudy/ui/Figure'
import { MOBILE } from '../../data/kpostCaseStudy'
import styles from './MobileApp.module.css'

/**
 * The phone screens, one module per tab, in a single row. A phone keeps a readable width, so a long row scrolls sideways
 * (the strip is a labelled group, and every screen is a button that opens it full size).
 */
function Strip({ tab }) {
  return (
    <ul className={styles.strip} role="group" aria-label={`${tab.label} screens`}>
      {tab.screens.map((screen) => (
        <li key={screen.image} className={styles.phone}>
          <Figure image={screen.image} title={screen.label} alt={`${tab.label}, mobile: ${screen.label}`} />
        </li>
      ))}
    </ul>
  )
}

export default function MobileApp() {
  const [active, setActive] = useState(MOBILE.tabs[0].id)

  return (
    <Section id="mobile" title={MOBILE.title} lede={MOBILE.lede}>
      <Tabs
        label="Mobile screens by module"
        tabs={MOBILE.tabs.map(({ id, label }) => ({ id, label }))}
        value={active}
        onChange={setActive}
        render={(tab) => <Strip tab={MOBILE.tabs.find((module) => module.id === tab.id)} />}
      />
    </Section>
  )
}
