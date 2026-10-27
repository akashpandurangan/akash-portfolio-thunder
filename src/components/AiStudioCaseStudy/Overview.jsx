import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Section from '../CaseStudy/ui/Section'
import { OVERVIEW, chapterPath } from '../../data/aiStudioCaseStudy'
import styles from './Overview.module.css'

/** What the product is, my part in it and how to read the screens as rows, then the areas the page covers, each a link. */
export default function Overview() {
  const { lede, blocks, areasTitle, areas } = OVERVIEW

  return (
    <Section id="overview" title="Project overview" lede={lede}>
      <div className={styles.rows}>
        {blocks.map((block) => (
          <Reveal key={block.id} className={styles.row}>
            <h3 className={styles.rowTitle}>{block.title}</h3>
            <div className={styles.rowBody}>
              {block.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal className={styles.row}>
          <h3 className={styles.rowTitle}>{areasTitle}</h3>
          <ul className={styles.areas}>
            {areas.map((area) => (
              <li key={area.id}>
                <a className={styles.area} href={chapterPath(area.id)}>
                  <span className={styles.areaText}>
                    <strong>{area.name}</strong>
                    <span>{area.text}</span>
                  </span>
                  <ArrowRight className={styles.arrow} size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
