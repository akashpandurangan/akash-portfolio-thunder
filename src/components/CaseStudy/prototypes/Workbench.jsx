import pv from './pv.module.css'
import styles from './Workbench.module.css'

/**
 * The frame around one live prototype: what it is, the prototype itself on a dark stage, and the controls that change
 * its variant. `built` names the Figma components it was built from, so a live version can be traced to its source.
 */
export default function Workbench({ title, description, built, controls, children, stageClassName = '', controlsBelow = false }) {
  return (
    <article className={styles.bench}>
      <header className={styles.header}>
        <div className={styles.intro}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <span className={styles.badge}>
          <span className={styles.dot} aria-hidden="true" />
          Live prototype
        </span>
      </header>

      <div className={styles.body} data-below={controlsBelow}>
        <div className={`${pv.tokens} ${styles.stage} ${stageClassName}`.trim()}>{children}</div>
        {controls && <div className={styles.controls}>{controls}</div>}
      </div>

      {built && (
        <p className={styles.built}>
          <strong>Built from</strong> {built}
        </p>
      )}
    </article>
  )
}
