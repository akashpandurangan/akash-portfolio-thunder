import styles from './Tag.module.css'

/** Small monospace pill used for project tags and role dates. `roomy` is the wider 24px pill of the case-study cards. */
export default function Tag({ children, as: Element = 'span', roomy = false }) {
  return <Element className={roomy ? `${styles.tag} ${styles.roomy}` : styles.tag}>{children}</Element>
}
