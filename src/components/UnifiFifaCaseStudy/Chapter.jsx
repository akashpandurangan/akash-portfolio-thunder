import Section from '../CaseStudy/ui/Section'
import { CHAPTERS } from '../../data/unifiFifaCaseStudy'
import styles from './Story.module.css'

/** One numbered chapter of the case study: the shared section (heading, lede, content), with its number above the title. */
export default function Chapter({ id, title, lede, className = '', children }) {
  const { number, label } = CHAPTERS.find((chapter) => chapter.id === id)
  return (
    <Section
      id={id}
      lede={lede}
      className={className}
      title={
        <>
          <span className={styles.number}>{number}</span>
          {title ?? label}
        </>
      }
    >
      {children}
    </Section>
  )
}
