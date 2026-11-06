import Reveal from '../ui/Reveal'
import Chapter from './Chapter'
import { PROBLEM } from '../../data/unifiFifaCaseStudy'
import styles from './Story.module.css'

/** 08: the problem statement, the How Might We questions of the board, and the three pillars the work had to balance. */
export default function Problem() {
  return (
    <Chapter id="problem" title="Problem definition" lede={PROBLEM.lede}>
      <Reveal>
        <p className={styles.eyebrow} style={{ marginBottom: 16 }}>
          Problem statement
        </p>
        <p className={styles.statement}>{PROBLEM.statement}</p>
      </Reveal>

      <Reveal className={styles.hmw} delay={60}>
        <span className={styles.hmwLabel}>HOW MIGHT WE</span>
        <p className={styles.hmwText}>{PROBLEM.hmw}</p>
      </Reveal>
      <ul className={`${styles.plain} ${styles.hmwMore}`}>
        {PROBLEM.hmwMore.map((question, index) => (
          <Reveal key={question} as="li" delay={index * 50}>
            <span aria-hidden="true">HMW</span>
            {question}
          </Reveal>
        ))}
      </ul>

      <p className={`${styles.eyebrow} ${styles.pillarsLabel}`}>The design challenge: three pillars in balance</p>
      <ul className={styles.pillars} style={{ marginTop: 16 }}>
        {PROBLEM.pillars.map((pillar, index) => (
          <Reveal key={pillar.name} as="li" className={styles.pillar} delay={index * 70}>
            <h4>{pillar.name}</h4>
            <p>{pillar.text}</p>
          </Reveal>
        ))}
      </ul>
    </Chapter>
  )
}
