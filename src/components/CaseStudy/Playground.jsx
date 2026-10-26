import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import Section from './ui/Section'
import Tabs from './ui/Tabs'
import Reveal from '../ui/Reveal'
import CardsDemo from './prototypes/CardsDemo'
import ErrorDemo from './prototypes/ErrorDemo'
import OptionsDemo from './prototypes/OptionsDemo'
import SeekBarDemo from './prototypes/SeekBarDemo'
import SettingsDemo from './prototypes/SettingsDemo'
import { PLAYGROUND } from '../../data/designSystemCaseStudy'
import styles from './Playground.module.css'

const BENCHES = [
  { id: 'seek', label: 'Seek bar', Component: SeekBarDemo },
  { id: 'options', label: 'Player options', Component: OptionsDemo },
  { id: 'settings', label: 'Settings', Component: SettingsDemo },
  { id: 'cards', label: 'Cards', Component: CardsDemo },
  { id: 'errors', label: 'Errors', Component: ErrorDemo },
]

export default function Playground() {
  const [active, setActive] = useState(BENCHES[0].id)

  return (
    <Section id="playground" title="Interactive component playground" lede={PLAYGROUND.lede}>
      <Reveal as="ul" className={styles.legend} aria-label="How to read the figures and prototypes">
        {PLAYGROUND.legend.map((item) => (
          <li key={item.kind}>
            {item.kind === 'live' ? <span className={styles.dot} aria-hidden="true" /> : <ImageIcon size={14} aria-hidden="true" />}
            <strong>{item.label}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </Reveal>

      <Tabs
        label="Prototypes"
        tabs={BENCHES.map(({ id, label }) => ({ id, label }))}
        value={active}
        onChange={setActive}
        render={(tab) => {
          const { Component } = BENCHES.find((bench) => bench.id === tab.id)
          return <Component />
        }}
      />
    </Section>
  )
}
