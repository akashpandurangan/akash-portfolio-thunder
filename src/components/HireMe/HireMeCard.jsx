import { useEffect, useId, useRef, useState } from 'react'
import { Building2, Check, Clock, Copy, FileText, Mail, Phone, X } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import portrait from '../../assets/profile/akash.webp'
import { copyText } from '../../lib/copyText'
import { LINKS, PROFILE } from '../../data/links'
import styles from './HireMeCard.module.css'

const COPIED_MS = 1600 // how long the row says "copied"

const FACTS = [
  { id: 'experience', icon: Clock, label: 'Experience', value: PROFILE.experience },
  { id: 'company', icon: Building2, label: 'Last company', value: PROFILE.lastCompany },
  // The email and mobile values are links (mail and dialler), each with a button after it that copies the value.
  { id: 'email', icon: Mail, label: 'Email', value: PROFILE.email, href: LINKS.mail.href, copyLabel: 'email address' },
  { id: 'mobile', icon: Phone, label: 'Mobile', value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}`, copyLabel: 'phone number' },
]

/** An email address may break after the @ (never in the middle of a word) when the card is narrow. */
function Breakable({ text }) {
  const [name, domain] = text.split('@')
  return domain === undefined ? (
    text
  ) : (
    <>
      {name}@<wbr />
      {domain}
    </>
  )
}

/**
 * One fact: an icon, a small label and the value. With an `href` the value is a link; with a `copyLabel` a button right
 * after it copies the value (the footer's copy button, in the same place), and the label says so for a moment (also to
 * screen readers, through a live region).
 */
function Fact({ icon: Icon, label, value, href, copyLabel }) {
  const [copy, setCopy] = useState('idle') // idle | copied | failed
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleCopy = async () => {
    setCopy((await copyText(value)) ? 'copied' : 'failed')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopy('idle'), COPIED_MS)
  }

  const message = copy === 'copied' ? `${label} copied` : copy === 'failed' ? 'Couldn’t copy. Select it instead.' : ''
  const text = <Breakable text={value} />

  return (
    <li className={styles.fact}>
      <span className={styles.factIcon} aria-hidden="true">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <span className={styles.factText}>
        <span className={styles.label} data-state={copy}>
          {message || label}
        </span>
        <span className={styles.valueLine}>
          {href ? (
            <a className={`${styles.value} ${styles.valueLink}`} href={href}>
              {text}
            </a>
          ) : (
            <span className={styles.value}>{text}</span>
          )}
          {copyLabel && (
            <button type="button" className={styles.copy} onClick={handleCopy} aria-label={`Copy ${copyLabel}`} data-state={copy}>
              {copy === 'copied' ? <Check size={16} strokeWidth={2.2} aria-hidden="true" /> : <Copy size={16} strokeWidth={1.8} aria-hidden="true" />}
            </button>
          )}
        </span>
      </span>
      {copyLabel && (
        <span className="visually-hidden" role="status">
          {message}
        </span>
      )}
    </li>
  )
}

/*
 * The "Hire me" profile card: who I am, the facts a recruiter scans for, the email (to open or copy), and the two links
 * that matter, the resume and LinkedIn. It is not a form. A native <dialog>, like the full-size image viewer: it traps
 * focus, closes on Escape and hands focus back to the "Hire me" button that opened it. It is mounted while it is open;
 * `onClose` runs once it has closed, however it was closed (Escape, the close button, a click on the backdrop).
 */
export default function HireMeCard({ onClose }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    if (!dialog.open) dialog.showModal()
    // The flag the image viewer uses: holds the page (and the smooth scroller) still while a dialog is open.
    document.documentElement.dataset.lightbox = 'open'
    return () => {
      delete document.documentElement.dataset.lightbox
    }
  }, [])

  const close = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <div className={styles.card}>
        <button type="button" className={styles.close} onClick={close} aria-label="Close" autoFocus>
          <X size={18} aria-hidden="true" />
        </button>

        <header className={styles.header}>
          {/* The name beside it says who this is, so the photo needs no text of its own. */}
          <span className={styles.avatar}>
            <img src={portrait} alt="" width="64" height="64" />
          </span>
          <div className={styles.identity}>
            <h2 id={titleId} className={styles.name}>
              {PROFILE.name}
            </h2>
            {/* A no-break space ties each " / " to the word before it, so a wrap leaves the slash at the end of the line. */}
            <p className={styles.role}>{PROFILE.role.replaceAll(' / ', ' / ')}</p>
          </div>
        </header>

        <ul className={styles.facts}>
          {FACTS.map((fact) => (
            <Fact key={fact.id} {...fact} />
          ))}
        </ul>

        <div className={styles.actions}>
          <SmartLink className={styles.resume} href={LINKS.resume.href} newTab={LINKS.resume.newTab}>
            <FileText size={18} aria-hidden="true" />
            View resume
          </SmartLink>
          <SmartLink className={styles.linkedin} href={LINKS.linkedin.href} aria-label="LinkedIn (opens in a new tab)">
            <img src={LINKS.linkedin.icon} alt="" width="20" height="20" />
            LinkedIn
          </SmartLink>
        </div>
      </div>
    </dialog>
  )
}
