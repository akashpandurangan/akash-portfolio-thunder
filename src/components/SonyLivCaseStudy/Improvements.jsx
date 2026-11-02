import Reveal from '../ui/Reveal'
import Section from '../CaseStudy/ui/Section'
import Figure from '../CaseStudy/ui/Figure'
import { IMPROVEMENTS } from '../../data/sonylivCaseStudy'
import styles from './Improvements.module.css'

/**
 * The four areas of the problem statement as four cards: a real screen that opens full size, the area, the aim, and
 * what the screen shows. There is no before and after, and no result is claimed.
 */
export default function Improvements() {
  const { title, lede, items } = IMPROVEMENTS

  return (
    <Section id="improvements" title={title} lede={lede}>
      <ul className={styles.grid}>
        {items.map((item, index) => (
          <Reveal key={item.id} as="li" className={styles.card} delay={(index % 2) * 80}>
            <Figure {...item.figure} showCaption={false} />
            <div className={styles.text}>
              <p className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3>{item.area}</h3>
              <p className={styles.aim}>{item.aim}</p>
              <p className={styles.shows}>
                <strong>{item.figure.title}.</strong> {item.figure.caption}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
