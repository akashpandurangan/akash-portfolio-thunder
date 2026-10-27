import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SmartLink from '../ui/SmartLink'
import Section from '../CaseStudy/ui/Section'
import Tabs from '../CaseStudy/ui/Tabs'
import Figure, { FigureGrid } from '../CaseStudy/ui/Figure'
import Foundations from './Foundations'
import ComponentGroups from './ComponentGroups'
import Tokens from './Tokens'
import { DESIGN_SYSTEM } from '../../data/sonylivCaseStudy'
import styles from './DesignSystem.module.css'

const CONTENT = { foundations: Foundations, components: ComponentGroups, tokens: Tokens }

function Panel({ tab }) {
  const Content = CONTENT[tab.id]
  return (
    <div className={styles.panel}>
      <p className={styles.intro}>{tab.text}</p>
      <Content />
      <FigureGrid>
        <Figure {...tab.figure} span="full" />
      </FigureGrid>
    </div>
  )
}

/**
 * The design system: what it is and what it documents, then its foundations, components and tokens in tabs, each ending
 * with the matching page of the live site. The counts come from the transcribed site data, not from typing.
 */
export default function DesignSystem() {
  const { title, lede, closing, facts, site, tabs } = DESIGN_SYSTEM
  const [active, setActive] = useState(tabs[0].id)

  return (
    <Section id="design-system" title={title} lede={lede}>
      <Reveal as="ul" className={styles.facts}>
        {facts.map((fact) => (
          <li key={fact.label}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </li>
        ))}
      </Reveal>

      <Reveal className={styles.closing}>
        <p>{closing}</p>
        <SmartLink className={styles.siteLink} href={site.href}>
          {site.label}
          <ArrowUpRight size={16} aria-hidden="true" />
        </SmartLink>
      </Reveal>

      <Tabs
        label="Design system"
        tabs={tabs.map(({ id, label }) => ({ id, label }))}
        value={active}
        onChange={setActive}
        render={(tab) => <Panel tab={tabs.find((entry) => entry.id === tab.id)} />}
      />
    </Section>
  )
}
