import Reveal from '../ui/Reveal'
import Section from '../CaseStudy/ui/Section'
import { OVERVIEW } from '../../data/sonylivCaseStudy'
import styles from './Overview.module.css'

/** The project and my role as two rows (the focus areas as tags), then three facts that the banner does not show. */
export default function Overview() {
  const { title, lede, blocks, details } = OVERVIEW

  return (
    <Section id="overview" title={title} lede={lede}>
      <div className={styles.rows}>
        {blocks.map((block) => (
          <Reveal key={block.id} className={styles.row}>
            <h3 className={styles.rowTitle}>{block.title}</h3>
            <div className={styles.rowBody}>
              {block.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {block.focus && (
                <ul className={styles.tags} aria-label="Project focus">
                  {block.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}

        <Reveal as="dl" className={styles.details}>
          {details.map((item) => (
            <div key={item.label} className={styles.detail}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
