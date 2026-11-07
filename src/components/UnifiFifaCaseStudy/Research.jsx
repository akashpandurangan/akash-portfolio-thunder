import Reveal from '../ui/Reveal'
import Chapter from './Chapter'
import { RESEARCH } from '../../data/unifiFifaCaseStudy'
import styles from './Story.module.css'

function StatusCard({ group }) {
  return (
    <div className={`${styles.card} ${styles.statusCard}`}>
      <span className={styles.mark} data-status={group.status}>
        {group.title}
      </span>
      <ul className={`${styles.plain} ${styles.dashes}`}>
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

/**
 * 05: the research as the FigJam board records it: the plan, what was completed and what is still to explore, and the pain
 * points as hypotheses. No user finding is claimed.
 */
export default function Research() {
  return (
    <Chapter id="research" title="Exploratory research" lede={RESEARCH.lede}>
      <Reveal>
        <h3 className={styles.groupTitle}>{RESEARCH.planTitle}</h3>
        <p className={styles.body} style={{ marginTop: 10, maxWidth: 640 }}>
          {RESEARCH.planText}
        </p>
      </Reveal>
      <ol className={`${styles.plain} ${styles.planGrid}`}>
        {RESEARCH.plan.map((step, index) => (
          <Reveal key={step} as="li" className={styles.planStep} delay={(index % 5) * 50}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            {step}
          </Reveal>
        ))}
      </ol>

      <Reveal className={styles.researchBlock}>
        <h3 className={styles.groupTitle}>{RESEARCH.statusTitle}</h3>
        <p className={styles.body} style={{ marginTop: 10, maxWidth: 640 }}>
          {RESEARCH.statusText}
        </p>
      </Reveal>
      <div className={styles.statusPair}>
        <Reveal>
          <StatusCard group={RESEARCH.completed} />
        </Reveal>
        <Reveal delay={70}>
          <StatusCard group={RESEARCH.planned} />
        </Reveal>
      </div>
      <p className={`${styles.body} ${styles.fineNote}`}>{RESEARCH.statusNote}</p>

      <Reveal className={styles.hypotheses}>
        <div>
          <p className={styles.eyebrow}>Hypotheses, not findings</p>
          <h3 className={styles.groupTitle} style={{ marginTop: 8 }}>
            {RESEARCH.hypothesesTitle}
          </h3>
          <p className={styles.body} style={{ marginTop: 14 }}>
            {RESEARCH.hypothesesText}
          </p>
        </div>
        <ul className={`${styles.plain} ${styles.hypothesisList}`}>
          {RESEARCH.hypotheses.map((hypothesis) => (
            <li key={hypothesis} className={styles.hypothesis}>
              <span>Hypothesis</span>
              {hypothesis}
            </li>
          ))}
        </ul>
      </Reveal>
    </Chapter>
  )
}
