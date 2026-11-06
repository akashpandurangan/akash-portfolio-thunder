import Reveal from '../ui/Reveal'
import Chapter from './Chapter'
import { AUDIENCE } from '../../data/unifiFifaCaseStudy'
import styles from './Story.module.css'

/** 06: the audience as a tree: one root, three segments, each with the board's persona summary. */
export default function Audience() {
  return (
    <Chapter id="audience" title="Audience" lede={AUDIENCE.lede}>
      <Reveal className={styles.tree}>
        <div className={styles.root}>{AUDIENCE.root}</div>
        <ul className={styles.branches}>
          {AUDIENCE.branches.map((branch) => (
            <li key={branch.id} className={styles.branch}>
              <div className={`${styles.card} ${styles.branchCard}`}>
                <h3 className={styles.cardTitle} style={{ marginBottom: 4 }}>
                  {branch.title}
                </h3>
                <p className={styles.branchWho}>{branch.who}</p>
                <dl className={styles.persona}>
                  {branch.persona.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.treeNote}>{AUDIENCE.note}</p>
      </Reveal>
    </Chapter>
  )
}
