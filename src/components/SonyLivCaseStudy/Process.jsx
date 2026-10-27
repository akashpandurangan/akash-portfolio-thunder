import Reveal from '../ui/Reveal'
import Section from '../CaseStudy/ui/Section'
import { PROCESS } from '../../data/sonylivCaseStudy'
import styles from './Process.module.css'

/** The five steps in order: a number, the step with its one-line aim, and what it involved. */
export default function Process() {
  const { title, lede, steps } = PROCESS

  return (
    <Section id="process" title={title} lede={lede}>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <Reveal key={step.name} as="li" className={styles.step}>
            <span className={styles.number} aria-hidden="true">
              {index + 1}
            </span>
            <div className={styles.name}>
              <h3>{step.name}</h3>
              <p>{step.line}</p>
            </div>
            <p className={styles.text}>{step.text}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
