import { Activity, Check, TrendingUp, UserPlus, Wallet } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Chapter from './Chapter'
import { GOALS } from '../../data/unifiFifaCaseStudy'
import styles from './Story.module.css'

const ICONS = [TrendingUp, UserPlus, Activity, Wallet]

/** 03: business goals, product vision and product requirements, three groups with three different treatments. */
export default function Goals() {
  return (
    <Chapter id="goals" title="Business goals, product vision & requirements" lede={GOALS.lede}>
      <div className={styles.groups}>
        <Reveal as="section" className={styles.group} aria-label="Business goals">
          <div className={styles.groupHead}>
            <p className={styles.eyebrow}>What the business wanted</p>
            <h3 className={styles.groupTitle}>Business goals</h3>
          </div>
          <ul className={`${styles.plain} ${styles.businessGrid}`}>
            {GOALS.business.map((goal, index) => {
              const Icon = ICONS[index]
              return (
                <li key={goal.title} className={styles.businessItem}>
                  <span className={styles.businessIcon} aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h4>{goal.title}</h4>
                    <p>{goal.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal as="section" className={styles.group} aria-label="Product vision">
          <div className={styles.groupHead}>
            <p className={styles.eyebrow}>What it should feel like</p>
            <h3 className={styles.groupTitle}>Product vision</h3>
          </div>
          <ul className={`${styles.plain} ${styles.visionList}`}>
            {GOALS.vision.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className={styles.group} aria-label="Product requirements">
          <div className={styles.groupHead}>
            <p className={styles.eyebrow}>What it had to do</p>
            <h3 className={styles.groupTitle}>Product requirements</h3>
          </div>
          <ul className={`${styles.plain} ${styles.reqGrid}`}>
            {GOALS.requirements.map((requirement) => (
              <li key={requirement} className={styles.req}>
                <span className={styles.reqCheck} aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
                {requirement}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Chapter>
  )
}
