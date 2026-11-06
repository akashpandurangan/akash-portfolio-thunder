import Reveal from '../ui/Reveal'
import Chapter from './Chapter'
import { OUTCOME } from '../../data/unifiFifaCaseStudy'
import styles from './Story.module.css'

/** 14: what was delivered, in words (no metric is claimed), and a short reflection. */
export default function Outcome() {
  return (
    <Chapter id="outcome" title="Outcome & learnings" lede={OUTCOME.lede}>
      <div className={styles.outcomeGrid}>
        <Reveal>
          <p className={styles.eyebrow} style={{ marginBottom: 12 }}>
            Delivered
          </p>
          <ol className={`${styles.plain} ${styles.delivered}`} style={{ borderBottom: '1px solid var(--color-divider)' }}>
            {OUTCOME.delivered.map((line, index) => (
              <li key={line}>
                <span aria-hidden="true">{index + 1}</span>
                {line}
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal className={styles.reflection} delay={80}>
          <h3>{OUTCOME.reflectionTitle}</h3>
          {OUTCOME.reflection.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </Chapter>
  )
}
