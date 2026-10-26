import { useRef } from 'react'
import CaseStudyCard from './CaseStudyCard'
import { useStackedCards } from '../../hooks/useStackedCards'
import styles from './ProjectStack.module.css'

/*
 * The case studies as a stack of cards: each one pins (CSS `position: sticky`) while the next slides up over it, and the
 * ones underneath recede a little. Below 768px, in short windows and for reduced motion nothing is pinned and this is
 * just a list. useStackedCards supplies the depth values the CSS animates; see ProjectStack.module.css.
 */
export default function ProjectStack({ studies }) {
  const listRef = useRef(null)
  useStackedCards(listRef)

  return (
    <ul className={styles.stack} ref={listRef}>
      {studies.map((study) => (
        <li className={styles.item} key={study.id}>
          <div className={styles.depth}>
            <CaseStudyCard study={study} />
          </div>
        </li>
      ))}
    </ul>
  )
}
