import Reveal from '../ui/Reveal'
import Section from '../CaseStudy/ui/Section'
import { OVERVIEW } from '../../data/kpostCaseStudy'
import styles from './Overview.module.css'

/** Project context, the brief and my part in it as rows, then the approach as the five steps of the work. */
export default function Overview() {
  const { lede, blocks, approach } = OVERVIEW

  return (
    <Section id="overview" title="Project overview" lede={lede}>
      <div className={styles.rows}>
        {blocks.map((block) => (
          <Reveal key={block.id} className={styles.row}>
            <h3 className={styles.rowTitle}>{block.title}</h3>
            <div className={styles.rowBody}>
              {block.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal className={styles.row}>
          <h3 className={styles.rowTitle}>{approach.title}</h3>
          <ol className={styles.steps}>
            {approach.steps.map((step, index) => (
              <li key={step.name} className={styles.step}>
                <span className={styles.number} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.stepText}>
                  <strong>{step.name}</strong>
                  <span>{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}
