import Reveal from '../ui/Reveal'
import Section, { Block } from '../CaseStudy/ui/Section'
import Figure, { FigureGrid } from '../CaseStudy/ui/Figure'
import Foundations from './Foundations'
import SiteLink from './SiteLink'
import { DESIGN_SYSTEM } from '../../data/sonylivCaseStudy'
import styles from './DesignSystem.module.css'

/**
 * The design system in one screen of reading: what it is, four counts, the three rules of its colour model, the
 * foundations at a glance, how the tokens travel, and the site's own Foundations page. The full documentation is the
 * live site, linked at the end; the counts come from the transcribed site data, not from typing.
 */
export default function DesignSystem() {
  const { title, lede, facts, principles, glanceTitle, tokens, also, figure, site } = DESIGN_SYSTEM

  return (
    <Section id="design-system" title={title} lede={lede}>
      <div className={styles.stack}>
        <Reveal as="ul" className={styles.facts}>
          {facts.map((fact) => (
            <li key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </li>
          ))}
        </Reveal>

        <Reveal as="ul" className={styles.principles}>
          {principles.map((principle) => (
            <li key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </li>
          ))}
        </Reveal>

        <Block title={glanceTitle}>
          <Foundations />
          <div className={styles.notes}>
            <p>{tokens}</p>
            <p>{also}</p>
          </div>
        </Block>

        <FigureGrid>
          <Figure {...figure} span="full" />
        </FigureGrid>

        <SiteLink {...site} />
      </div>
    </Section>
  )
}
