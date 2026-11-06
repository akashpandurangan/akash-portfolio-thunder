import Reveal from '../ui/Reveal'
import { asset } from '../../data/caseStudyAssets'
import { useLightbox } from '../CaseStudy/ui/lightboxContext'
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

function Screen({ screen }) {
  const openLightbox = useLightbox()
  const picture = asset(`unifi-fifa/${screen.image}`)
  return (
    <Reveal as="li" className={styles.screen}>
      <button
        type="button"
        className={styles.screenMedia}
        onClick={() => openLightbox({ ...picture, alt: screen.title, title: screen.title, caption: screen.text })}
        aria-label={`${screen.title}. Open full size`}
      >
        <img src={picture.src} width={picture.width} height={picture.height} alt={`${screen.title}. ${screen.text}`} loading="lazy" decoding="async" draggable="false" />
      </button>
      <div className={styles.screenBody}>
        <h4>{screen.title}</h4>
        <p>{screen.text}</p>
      </div>
    </Reveal>
  )
}

/**
 * 05: the research as the FigJam board records it: the plan, what was completed and what is still to explore, the competitor
 * screens the board holds, and the pain points as hypotheses. No user finding is claimed.
 */
export default function Research() {
  const { competitors } = RESEARCH
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

      <Reveal className={styles.researchBlock}>
        <span className={styles.mark} data-status={competitors.status}>
          {competitors.statusText}
        </span>
        <h3 className={styles.groupTitle} style={{ marginTop: 12 }}>
          {competitors.title}
        </h3>
        <p className={styles.body} style={{ marginTop: 10, maxWidth: 720 }}>
          {competitors.text}
        </p>
      </Reveal>
      <ul className={`${styles.plain} ${styles.screens}`}>
        {competitors.screens.map((screen) => (
          <Screen key={screen.image} screen={screen} />
        ))}
      </ul>
      <p className={`${styles.body} ${styles.fineNote}`}>{competitors.note}</p>

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
