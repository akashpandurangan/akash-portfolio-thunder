import { TOKEN_FORMATS } from '../../data/sonylivCaseStudy'
import styles from './DesignSystem.module.css'

/** The token formats the system exports, each with what the site says about it. */
export default function Tokens() {
  return (
    <ul className={styles.formats}>
      {TOKEN_FORMATS.map((format) => (
        <li key={format.id} className={styles.format}>
          <h4>{format.title}</h4>
          <p>{format.text}</p>
          {format.notes.length > 0 && (
            <ul>
              {format.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
