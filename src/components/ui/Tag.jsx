import styles from './Tag.module.css'

/** Small monospace pill used for project tags and role dates. */
export default function Tag({ children, as: Element = 'span' }) {
  return <Element className={styles.tag}>{children}</Element>
}
