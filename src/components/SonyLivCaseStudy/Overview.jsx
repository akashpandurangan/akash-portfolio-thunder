import Reveal from '../ui/Reveal'
import Section from '../CaseStudy/ui/Section'
import { OVERVIEW } from '../../data/sonylivCaseStudy'
import styles from './Overview.module.css'

/** The project and my role as rows, the problem, what I designed and the outcome as three cards, then the project details. */
export default function Overview() {
  const { lede, blocks, cards, detailsTitle, details } = OVERVIEW

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

        <Reveal className={styles.cardsRow}>
          <ul className={styles.cards}>
            {cards.map((card) => (
              <li key={card.id} className={styles.card} data-tone={card.id === 'outcome' ? 'outcome' : undefined}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className={styles.row}>
          <h3 className={styles.rowTitle}>{detailsTitle}</h3>
          <dl className={styles.details}>
            {details.map((item) => (
              <div key={item.label} className={styles.detail}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
