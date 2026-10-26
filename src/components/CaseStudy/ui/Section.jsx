import Reveal from '../../ui/Reveal'
import SectionHeading from '../../ui/SectionHeading'
import styles from './Section.module.css'

/** One chapter of the case study: a heading and an optional lede, then its content, on the portfolio's content column. */
export default function Section({ id, title, lede, children, className = '' }) {
  const titleId = `${id}-title`
  return (
    <section id={id} className={`${styles.section} ${className}`.trim()} aria-labelledby={titleId}>
      <Reveal className={styles.header}>
        <SectionHeading id={titleId}>{title}</SectionHeading>
        {lede && <p className={styles.lede}>{lede}</p>}
      </Reveal>
      {children}
    </section>
  )
}

/** A titled group inside a section: h3, optional text, then whatever follows. */
export function Block({ title, text, children, className = '' }) {
  return (
    <div className={`${styles.block} ${className}`.trim()}>
      <div className={styles.blockHeader}>
        <h3 className={styles.blockTitle}>{title}</h3>
        {text && <p className={styles.blockText}>{text}</p>}
      </div>
      {children}
    </div>
  )
}
