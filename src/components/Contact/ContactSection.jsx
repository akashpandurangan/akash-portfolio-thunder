import SectionHeading from '../ui/SectionHeading'
import SmartLink from '../ui/SmartLink'
import Reveal from '../ui/Reveal'
import { CONTACT_BAR } from '../../data/links'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <Reveal className={styles.inner}>
        <SectionHeading id="contact-title">Contact</SectionHeading>

        <ul className={styles.links}>
          {CONTACT_BAR.map((link) => (
            <li key={link.id}>
              <SmartLink
                className={styles.pill}
                href={link.href}
                aria-label={link.iconOnly ? link.label : undefined}
                data-icon-only={link.iconOnly || undefined}
              >
                {link.icon && (
                  <span className={styles.icon}>
                    <img src={link.icon} alt="" width="24" height="24" />
                  </span>
                )}
                {!link.iconOnly && <span className={styles.label}>{link.label}</span>}
              </SmartLink>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
