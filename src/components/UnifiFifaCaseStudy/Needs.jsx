import Reveal from '../ui/Reveal'
import Chapter from './Chapter'
import { CHAPTERS, NEEDS, chapterPath } from '../../data/unifiFifaCaseStudy'
import styles from './Story.module.css'

const labelOf = (id) => CHAPTERS.find((chapter) => chapter.id === id).label

function Items({ items }) {
  return (
    <ul className={styles.plain}>
      {items.map((item) => (
        <li key={item.title} className={styles.item}>
          <h4 className={styles.itemTitle}>{item.title}</h4>
          <p className={styles.itemResponse}>
            {item.response} <a href={chapterPath(item.go)}>{labelOf(item.go)} →</a>
          </p>
        </li>
      ))}
    </ul>
  )
}

/** 07: two contrasting panels, what users need and what might get in the way, each item with the design response. */
export default function Needs() {
  return (
    <Chapter id="needs" title="User needs & pain points" lede={NEEDS.lede}>
      <div className={styles.contrast}>
        <Reveal className={styles.panelNeeds}>
          <p className={styles.panelKicker}>Users need</p>
          <h3 className={styles.panelTitle}>User needs</h3>
          <Items items={NEEDS.needs} />
        </Reveal>
        <Reveal className={styles.panelPains} delay={80}>
          <p className={styles.panelKicker}>Might get in the way</p>
          <h3 className={styles.panelTitle}>Potential pain points</h3>
          <Items items={NEEDS.pains} />
        </Reveal>
      </div>
    </Chapter>
  )
}
