import Reveal from '../ui/Reveal'
import Chapter from './Chapter'
import { ARCHITECTURE } from '../../data/unifiFifaCaseStudy'
import styles from './Diagrams.module.css'

/**
 * One column of the map: the pass's own steps, each in its own grid row so the shared journeys can sit beside them. A step
 * with `branch` is conditional ("If payment fails"): it is drawn dashed and is not numbered.
 */
function Steps({ steps, column }) {
  let number = 0
  return steps.map((step, index) => {
    const item = typeof step === 'string' ? { label: step } : step
    if (!item.branch) number += 1
    return (
      <div
        key={item.label}
        className={styles.node}
        data-step={item.branch ? '↩' : number}
        data-branch={item.branch ? 'true' : undefined}
        data-last={index === steps.length - 1}
        style={{ gridColumn: column, gridRow: index + 2 }}
      >
        <span>
          {item.label}
          {item.note && <small>{item.note}</small>}
        </span>
      </div>
    )
  })
}

/** 09: Unifi TV > FIFA World Cup 2026 > Event landing page, then Daily Pass and Season Pass with the account and payment journeys between them. */
export default function Architecture() {
  const { trunk, daily, season, shared, lede, note } = ARCHITECTURE
  const [account, payment] = shared

  return (
    <Chapter id="architecture" title="Information architecture" lede={lede}>
      <Reveal className={styles.ia}>
        <ol className={styles.trunk} aria-label="Where the passes sit in Unifi TV">
          {trunk.map((name) => (
            <li key={name}>
              <span className={styles.trunkNode}>{name}</span>
            </li>
          ))}
        </ol>
        <div className={styles.fork} aria-hidden="true" />

        <div className={styles.map}>
          {/* Every item has its own grid cell on wide screens, so the source order is free: each pass's title is followed by its steps,
              which is also the order the single column below 900px (and a screen reader) follows. */}
          <h3 className={styles.branchTitle} style={{ gridColumn: 1 }}>
            {daily.title}
          </h3>
          <p className={styles.supportLabel}>Shared supporting journeys</p>
          <Steps steps={daily.steps} column={1} />

          <h3 className={styles.branchTitle} style={{ gridColumn: 3 }}>
            {season.title}
          </h3>
          <Steps steps={season.steps} column={3} />

          <div className={styles.support} style={{ gridColumn: 2, gridRow: '4 / span 2' }}>
            <h4>{account.title}</h4>
            <ul>
              {account.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          <div className={styles.support} style={{ gridColumn: 2, gridRow: '6 / span 3' }}>
            <h4>{payment.title}</h4>
            <ul>
              {payment.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className={styles.iaNote}>{note}</p>
      </Reveal>
    </Chapter>
  )
}
