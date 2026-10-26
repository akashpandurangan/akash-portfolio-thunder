import Reveal from '../ui/Reveal'
import Section from './ui/Section'
import { OVERVIEW } from '../../data/designSystemCaseStudy'
import styles from './Overview.module.css'

export default function Overview() {
  const { lede, blocks } = OVERVIEW

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
    </Section>
  )
}
