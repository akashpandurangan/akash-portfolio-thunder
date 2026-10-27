import { Check, ChevronDown, X } from 'lucide-react'
import { COMPONENTS } from '../../data/sonylivDesignSystem'
import styles from './DesignSystem.module.css'

/** The first sentence of a description, for the closed row. */
const firstSentence = (text) => `${text.split('. ')[0].replace(/\.$/, '')}.`

/**
 * The component groups of the design system, each a row that opens to its description and its Do and Don't rules (the
 * rules the site gives, three of each). The first group starts open; the rows are native <details>.
 */
export default function ComponentGroups() {
  return (
    <ul className={styles.components}>
      {COMPONENTS.items.map((item, index) => (
        <li key={item.name}>
          <details className={styles.component} open={index === 0}>
            <summary>
              <span className={styles.componentHead}>
                <strong>{item.name}</strong>
                <span className={styles.componentLine}>{firstSentence(item.text)}</span>
              </span>
              <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
            </summary>
            <div className={styles.componentBody}>
              <p>{item.text}</p>
              <div className={styles.rules}>
                <section>
                  <h4>
                    <Check size={16} strokeWidth={2.4} aria-hidden="true" data-rule="do" />
                    Do
                  </h4>
                  <ul>
                    {item.do.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h4>
                    <X size={16} strokeWidth={2.4} aria-hidden="true" data-rule="dont" />
                    Don’t
                  </h4>
                  <ul>
                    {item.dont.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </details>
        </li>
      ))}
    </ul>
  )
}
