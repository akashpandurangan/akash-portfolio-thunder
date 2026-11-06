import Reveal from '../ui/Reveal'
import { asset } from '../../data/caseStudyAssets'
import { useLightbox } from '../CaseStudy/ui/lightboxContext'
import Chapter from './Chapter'
import { FLOWS } from '../../data/unifiFifaCaseStudy'
import styles from './Diagrams.module.css'

/** One captured state, opening full size. */
function StateCard({ state }) {
  const openLightbox = useLightbox()
  const picture = asset(`unifi-fifa/${state.image}`)
  return (
    <li className={styles.stateCard}>
      <button
        type="button"
        className={styles.stateImage}
        onClick={() => openLightbox({ ...picture, alt: state.label, title: state.label, caption: state.text })}
        aria-label={`${state.label}. Open full size`}
      >
        <img src={picture.src} width={picture.width} height={picture.height} alt={`${state.label}: ${state.text}`} loading="lazy" decoding="async" draggable="false" />
      </button>
      <div>
        <p className={styles.stateLabel}>{state.label}</p>
        <p className={styles.stateText}>{state.text}</p>
      </div>
    </li>
  )
}

/** 10: the three journeys of the UX document as step chains, then the exception states between the steps. */
export default function Flows() {
  const { flows, states, statesTitle, statesText, lede } = FLOWS

  return (
    <Chapter id="flows" title="User flows" lede={lede}>
      <div className={styles.flows}>
        {flows.map((flow) => (
          <Reveal key={flow.id} as="section" className={styles.flow} aria-label={flow.title}>
            <div className={styles.flowHead}>
              <span className={styles.flowNumber} aria-hidden="true">
                {flow.number}
              </span>
              <h3 className={styles.flowTitle}>{flow.title}</h3>
              <p className={styles.flowLine}>{flow.line}</p>
            </div>
            <ol className={styles.chain}>
              {flow.steps.map((step) => (
                <li key={step.label} className={styles.step}>
                  <span className={styles.stepBox} data-kind={step.kind ?? 'step'}>
                    {step.label}
                    {step.note && <small>{step.note}</small>}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        ))}
      </div>

      <div className={styles.states}>
        <h3 className={styles.flowTitle} style={{ marginTop: 80 }}>
          {statesTitle}
        </h3>
        <p className={styles.flowLine} style={{ marginTop: 8, maxWidth: 640 }}>
          {statesText}
        </p>
        <ul className={styles.statesGrid}>
          {states.map((state) => (
            <StateCard key={state.label} state={state} />
          ))}
        </ul>
      </div>
    </Chapter>
  )
}
