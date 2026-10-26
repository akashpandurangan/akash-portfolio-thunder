import Reveal from '../ui/Reveal'
import Section from './ui/Section'
import { OVERVIEW } from '../../data/designSystemCaseStudy'
import styles from './Overview.module.css'

export default function Overview() {
  const { lede, blocks, deliverables } = OVERVIEW

  return (
    <Section id="overview" title="Project overview" lede={lede}>
      <div className={styles.rows}>
        {blocks.map((block) => (
          <Reveal key={block.id} className={styles.row}>
            <h3 className={styles.rowTitle}>{block.title}</h3>
            <div className={styles.rowBody}>
              {block.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {block.list && (
                <ul className={styles.list}>
                  {block.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.deliverables}>
        <div className={styles.deliverablesHeader}>
          <h3 className={styles.rowTitle}>{deliverables.title}</h3>
          <p>{deliverables.note}</p>
        </div>
        <ul className={styles.grid}>
          {deliverables.items.map((item) => (
            <li key={item.label} className={styles.item}>
              <span className={styles.value}>{item.value}</span>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.detail}>{item.detail}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
