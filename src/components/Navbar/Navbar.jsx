import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logoBolt from '../../assets/nav/logo-bolt.svg'
import moonStarIcon from '../../assets/nav/moon-star.svg'
import sunIcon from '../../assets/nav/sun-01.svg'
import { CONTACT_ANCHOR, NAV_LINKS } from '../../data/links'
import { useScrolled } from '../../hooks/useScrolled'
import styles from './Navbar.module.css'

const MOBILE_MENU_LINKS = [...NAV_LINKS, CONTACT_ANCHOR]
const DESKTOP_QUERY = '(min-width: 768px)'

// Space between the nav items once the bar collapses on scroll.
const COMPACT_GAP = 10

// Jagged bolt (plus a short branch) across the brand pill's 105 × 48 box.
const ZAP_MAIN = 'M2 30 L16 20 L25 28 L39 12 L48 23 L62 8 L71 20 L85 14 L103 27'
const ZAP_BRANCH = 'M48 23 L55 36 L67 30'

function ThemeToggle({ theme, onToggle, className = '', buttonRef }) {
  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  // The icon shows what the button switches to: the sun while the page is dark, the moon while it is light.
  const icon = theme === 'dark' ? sunIcon : moonStarIcon
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles.pill} ${styles.iconButton} ${className}`.trim()}
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      <span className={styles.themeIcon} style={{ '--icon': `url("${icon}")` }} aria-hidden="true" />
    </button>
  )
}

export default function Navbar({ activeId, theme, onToggleTheme }) {
  const scrolled = useScrolled(24)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const menuRef = useRef(null)
  const headerRef = useRef(null)
  const brandRef = useRef(null)
  const linksRef = useRef(null)
  const contactRef = useRef(null)
  const toggleRef = useRef(null)

  const closeMenu = () => setMenuOpen(false)

  // Size the collapsed bar to its content so every item sits exactly COMPACT_GAP apart, whatever the font renders at.
  useLayoutEffect(() => {
    const header = headerRef.current
    const items = [brandRef, linksRef, contactRef, toggleRef].map((ref) => ref.current)
    if (!header || items.some((item) => !item)) return undefined

    const measure = () => {
      const widths = items.map((item) => item.getBoundingClientRect().width)
      if (widths.some((width) => width === 0)) return // hidden in the mobile layout
      const total = widths.reduce((sum, width) => sum + width, 0) + COMPACT_GAP * 3
      header.style.setProperty('--nav-compact', `${Math.round(total * 100) / 100}px`)
    }

    measure()
    const observer = new ResizeObserver(measure)
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  // Lock page scroll while the full-screen menu is open, and close it on Escape or when the layout goes desktop.
  useEffect(() => {
    if (!menuOpen) return undefined

    const root = document.documentElement
    root.dataset.menu = 'open'

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onChange = (event) => event.matches && setMenuOpen(false)

    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onChange)
    menuRef.current?.querySelector('a')?.focus({ preventScroll: true })

    return () => {
      delete root.dataset.menu
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onChange)
    }
  }, [menuOpen])

  return (
    <header ref={headerRef} className={styles.header} data-scrolled={scrolled} data-menu-open={menuOpen}>
      <nav className={styles.nav} aria-label="Primary">
        <a ref={brandRef} className={`${styles.pill} ${styles.brand}`} href="#home" onClick={closeMenu}>
          {/* Lightning that arcs through the pill on hover / keyboard focus. Drawn behind the logo and text. */}
          <svg className={styles.zap} viewBox="0 0 105 48" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className={styles.zapGlow} pathLength="1" d={ZAP_MAIN} />
            <path className={styles.zapGlow} pathLength="1" d={ZAP_BRANCH} />
            <path className={styles.zapCore} pathLength="1" d={ZAP_MAIN} />
            <path className={styles.zapCore} pathLength="1" d={ZAP_BRANCH} />
          </svg>
          <img className={styles.brandIcon} src={logoBolt} alt="" width="16" height="24" />
          <span className={styles.brandName}>Akash</span>
        </a>

        <ul ref={linksRef} className={`${styles.pill} ${styles.links}`}>
          {NAV_LINKS.map((link) => {
            const active = activeId === link.id
            return (
              <li key={link.id} className={styles.linkItem}>
                <a
                  className={styles.link}
                  href={link.href}
                  data-active={active}
                  aria-current={active ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className={styles.actions}>
          <a ref={contactRef} className={`${styles.pill} ${styles.contact}`} href={CONTACT_ANCHOR.href}>
            {CONTACT_ANCHOR.label}
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} className={styles.desktopOnly} buttonRef={toggleRef} />
          <button
            ref={menuButtonRef}
            type="button"
            className={`${styles.pill} ${styles.iconButton} ${styles.menuButton}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={styles.menu}
        data-open={menuOpen}
        onClick={(event) => event.target === event.currentTarget && closeMenu()}
      >
        <ul className={styles.menuLinks}>
          {MOBILE_MENU_LINKS.map((link, index) => (
            <li key={link.id} style={{ '--i': index }}>
              <a
                className={styles.menuLink}
                href={link.href}
                onClick={closeMenu}
                aria-current={activeId === link.id ? 'true' : undefined}
                tabIndex={menuOpen ? undefined : -1}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.menuFooter} style={{ '--i': MOBILE_MENU_LINKS.length }}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}
