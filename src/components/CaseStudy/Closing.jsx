import Reveal from '../ui/Reveal'
import SmartLink from '../ui/SmartLink'
import { CLOSING } from '../../data/designSystemCaseStudy'
import { LINKS } from '../../data/links'
import styles from './Closing.module.css'

/** The end of the case study: a short conclusion, and the ways back to the portfolio and to me. */
export default function Closing() {
  return (
    <section id="closing" className={styles.closing} aria-labelledby="closing-title">
      <Reveal className={styles.card}>
        <h2 id="closing-title" className={styles.title}>
          {CLOSING.title}
        </h2>
        <p className={styles.text}>{CLOSING.text}</p>

        <div className={styles.actions}>
          <a className={styles.primary} href={CLOSING.links[0].href}>
            {CLOSING.links[0].label}
          </a>
          <a className={styles.secondary} href={CLOSING.links[1].href}>
            {CLOSING.links[1].label}
          </a>
        </div>

        <ul className={styles.more} aria-label="Also">
          {['resume', 'linkedin', 'mail'].map((id) => (
            <li key={id}>
              <SmartLink href={LINKS[id].href} newTab={LINKS[id].newTab}>
                {LINKS[id].label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
