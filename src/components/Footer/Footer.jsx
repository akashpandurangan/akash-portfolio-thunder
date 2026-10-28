import boltLogo from '../../assets/footer/bolt-logo.svg'
import boltWordmark from '../../assets/footer/bolt-wordmark.webp'
import arrowIcon from '../../assets/footer/arrow-up-right.svg'
import SmartLink from '../ui/SmartLink'
import Snackbar from '../ui/Snackbar'
import CopyableLink from './CopyableLink'
import { FOOTER_SOCIAL, NAV_LINKS, PROFILE } from '../../data/links'
import { useFixedFooter } from '../../hooks/useFixedFooter'
import { useInView } from '../../hooks/useInView'
import { useSnackbar } from '../../hooks/useSnackbar'
import styles from './Footer.module.css'

const CURRENT_YEAR = new Date().getFullYear()

/* Layered translucent wisps rising through the bolt: x position, size, duration and (negative) delay so the loop is already mid-flight on load. */
const SMOKE = [
  { '--x': '4%', '--size': '78%', '--dur': '8.5s', '--delay': '-1s' },
  { '--x': '34%', '--size': '66%', '--dur': '6.8s', '--delay': '-4.2s' },
  { '--x': '52%', '--size': '84%', '--dur': '10s', '--delay': '-7s' },
  { '--x': '18%', '--size': '58%', '--dur': '7.4s', '--delay': '-2.6s' },
  { '--x': '62%', '--size': '62%', '--dur': '9.2s', '--delay': '-5.5s' },
]

/* Tiny embers that drift up and sway around the bolt: x position, size, rise time, delay and sideways drift. */
const EMBERS = [
  { '--x': '12%', '--y': '58%', '--s': '3px', '--dur': '5.2s', '--delay': '-0.8s', '--drift': '10px' },
  { '--x': '30%', '--y': '44%', '--s': '2px', '--dur': '4.4s', '--delay': '-2.9s', '--drift': '-14px' },
  { '--x': '46%', '--y': '62%', '--s': '4px', '--dur': '6.1s', '--delay': '-4.1s', '--drift': '16px' },
  { '--x': '60%', '--y': '38%', '--s': '2px', '--dur': '4.8s', '--delay': '-1.7s', '--drift': '-8px' },
  { '--x': '72%', '--y': '52%', '--s': '3px', '--dur': '5.6s', '--delay': '-3.3s', '--drift': '12px' },
  { '--x': '84%', '--y': '34%', '--s': '2px', '--dur': '4.2s', '--delay': '-0.3s', '--drift': '-12px' },
  { '--x': '22%', '--y': '30%', '--s': '2px', '--dur': '5.9s', '--delay': '-5.2s', '--drift': '9px' },
  { '--x': '54%', '--y': '28%', '--s': '3px', '--dur': '6.4s', '--delay': '-2.2s', '--drift': '-16px' },
]

const COPY_FAILED = 'Couldn’t copy. Select the text instead.'

export default function Footer() {
  // Observe the wrapper that scrolls with the page: a fixed footer is always "on screen" for an observer of its own.
  const [revealRef, inView] = useInView()
  const { footerRef, fixed, height } = useFixedFooter()
  const [snack, showSnack] = useSnackbar()
  const reportCopy = (message) => (ok) => (ok ? showSnack(message) : showSnack(COPY_FAILED, 'error'))

  // A fixed footer that is still covered by the page can't be seen, so keyboard focus inside it brings it into view.
  const revealOnFocus = () => {
    const wrapper = revealRef.current
    if (fixed && wrapper && wrapper.getBoundingClientRect().bottom > window.innerHeight + 1) {
      wrapper.scrollIntoView({ block: 'end', behavior: 'instant' })
    }
  }

  return (
    <div
      ref={revealRef}
      id="footer"
      className={styles.reveal}
      data-fixed={fixed}
      style={fixed ? { '--footer-height': `${height}px` } : undefined}
      onFocusCapture={revealOnFocus}
    >
      <footer ref={footerRef} className={styles.footer}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#home" aria-label="Back to top">
              <img src={boltLogo} alt="" width="20.8" height="32" />
            </a>
            <p className={styles.copyright}>
              {PROFILE.name} © {CURRENT_YEAR}
            </p>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            <ul className={styles.column}>
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a className={styles.link} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className={styles.column}>
              <CopyableLink
                href={`mailto:${PROFILE.email}`}
                text={PROFILE.email}
                label="email address"
                onCopy={reportCopy('Email address copied')}
              />
              <CopyableLink
                href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
                text={PROFILE.phone}
                label="phone number"
                onCopy={reportCopy('Phone number copied')}
              />
            </ul>

            <ul className={styles.column}>
              {FOOTER_SOCIAL.map((link) => (
                <li key={link.id}>
                  <SmartLink className={`${styles.link} ${styles.external}`} href={link.href} newTab={link.newTab}>
                    {link.label}
                    <img className={styles.arrow} src={arrowIcon} alt="" width="20" height="20" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.wordmark} data-active={inView} aria-hidden="true">
          <div className={styles.wordmarkRow}>
            <div className={styles.bolt}>
              <img className={styles.boltImage} src={boltWordmark} alt="" width="172" height="265" />
              {/* Smoke and pulse are masked to the bolt's own silhouette; embers drift around it. All clipped to the footer art. */}
              <div className={styles.fx}>
                {SMOKE.map((wisp, index) => (
                  <span key={index} className={styles.smoke} style={wisp} />
                ))}
                <span className={styles.pulse} />
              </div>
              {EMBERS.map((ember, index) => (
                <span key={index} className={styles.ember} style={ember} />
              ))}
            </div>
            <span className={styles.wordmarkText}>{PROFILE.name}</span>
          </div>
        </div>

        <Snackbar {...snack} />
      </footer>
    </div>
  )
}
