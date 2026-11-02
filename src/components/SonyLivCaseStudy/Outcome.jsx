import Reveal from '../ui/Reveal'
import Section, { Block } from '../CaseStudy/ui/Section'
import { OUTCOME } from '../../data/sonylivCaseStudy'
import styles from './Outcome.module.css'

/**
 * The outcome the project set out for (the Figma page's own sentence), what was designed, and three design reflections.
 * No result is claimed: the reflections are labelled as such and say where they come from.
 */
export default function Outcome() {
  const { title, outcomeTitle, outcome, producedTitle, produced, reflectionsTitle, reflectionsNote, reflections } = OUTCOME

  return (
    <Section id="outcome" title={title}>
      <div className={styles.stack}>
        <Reveal as="figure" className={styles.outcome}>
          <figcaption>{outcomeTitle}</figcaption>
          <blockquote>{outcome}</blockquote>
        </Reveal>

        <Reveal className={styles.produced}>
          <h3>{producedTitle}</h3>
          <ul>
            {produced.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Block title={reflectionsTitle} text={reflectionsNote}>
          <ul className={styles.reflections}>
            {reflections.map((item, index) => (
              <Reveal key={item.title} as="li" className={styles.reflection} delay={index * 80}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </Block>
      </div>
    </Section>
  )
}
