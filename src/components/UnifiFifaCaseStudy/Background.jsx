import Reveal from '../ui/Reveal'
import Chapter from './Chapter'
import { BACKGROUND } from '../../data/unifiFifaCaseStudy'
import styles from './Story.module.css'

/** 02: the project context, then the vision and victory of the UX document side by side in one row. */
export default function Background() {
  return (
    <Chapter id="background" title="Background">
      <div className={styles.backgroundGrid}>
        <Reveal className={styles.prose}>
          <p>{BACKGROUND.lede}</p>
          {BACKGROUND.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.body}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal className={styles.pair} delay={80}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Vision</h3>
            <ul className={`${styles.plain} ${styles.dashes}`}>
              {BACKGROUND.vision.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Victory</h3>
            <ul className={`${styles.plain} ${styles.dashes}`}>
              {BACKGROUND.victory.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Chapter>
  )
}
