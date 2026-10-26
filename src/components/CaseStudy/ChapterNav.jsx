import { useEffect, useMemo, useRef, useState } from 'react'
import { VISIBLE_CHAPTERS as CHAPTERS, chapterPath } from '../../data/designSystemCaseStudy'
import { useActiveSection } from '../../hooks/useActiveSection'
import styles from './ChapterNav.module.css'

// How long an address-chosen chapter stays lit while the page scrolls to it, so the links in between don't flash by.
const PIN_MS = 1400

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*
 * The chapter links. From 768px they are a vertical rail beside the article (sticky, so it follows the reader and
 * leaves with the article instead of covering the hero or the footer); below that they are a pill under the header,
 * hidden until the headline has scrolled away, that scrolls sideways. The links are real addresses
 * (#/case-studies/…/<chapter>), so each chapter can be opened, copied and shared on its own.
 *
 * The lit chapter follows the scroll position (`useActiveSection`, the same reading line as the home page). When the
 * address names a chapter (a click, a shared link, back / forward) that chapter is lit at once and stays lit until the
 * scroll to it is over or the reader scrolls by hand.
 */
export default function ChapterNav({ section = null, heroId = 'case-study-title' }) {
  const [shown, setShown] = useState(false)
  const [pin, setPin] = useState(section)
  const [pinnedFor, setPinnedFor] = useState(section)
  const listRef = useRef(null)

  const ids = useMemo(() => CHAPTERS.map((chapter) => chapter.id), [])
  const spied = useActiveSection(ids)
  const activeId = pin ?? spied

  // A new address pins its chapter (adjusted while rendering, so the right link is lit on the first paint).
  if (section !== pinnedFor) {
    setPinnedFor(section)
    setPin(section)
  }

  // Let go of the pinned chapter once the scroll has had time to arrive, or as soon as the reader takes over.
  useEffect(() => {
    if (!pin) return undefined
    const release = () => setPin(null)
    const timer = window.setTimeout(release, PIN_MS)
    const events = ['wheel', 'touchstart', 'keydown']
    events.forEach((name) => window.addEventListener(name, release, { passive: true }))
    return () => {
      window.clearTimeout(timer)
      events.forEach((name) => window.removeEventListener(name, release))
    }
  }, [pin])

  // Below 768px the pill appears once the headline is above the top of the window (the rail ignores this).
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const hero = document.getElementById(heroId)
    if (!hero) return undefined
    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0), {
      rootMargin: '-80px 0px 0px 0px',
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [heroId])

  // Keep the lit link in view when the list itself scrolls (the pill sideways, a short window's rail up and down).
  useEffect(() => {
    const list = listRef.current
    const link = list?.querySelector('[aria-current]')
    if (!list || !link) return
    if (list.scrollWidth > list.clientWidth + 1) list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2 })
    else if (list.scrollHeight > list.clientHeight + 1) list.scrollTo({ top: link.offsetTop - (list.clientHeight - link.offsetHeight) / 2 })
  }, [activeId])

  // The address doesn't change when the open chapter's own link is used again, so there is no hashchange to scroll with.
  const onClick = (event, path, id) => {
    if (window.location.hash !== path) return
    event.preventDefault()
    setPin(id)
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <nav className={styles.nav} aria-label="Case study chapters" data-shown={shown}>
      <ul ref={listRef} className={styles.list}>
        {CHAPTERS.map((chapter) => {
          const path = chapterPath(chapter.id)
          return (
            <li key={chapter.id}>
              <a
                className={styles.link}
                href={path}
                aria-current={activeId === chapter.id ? 'location' : undefined}
                onClick={(event) => onClick(event, path, chapter.id)}
              >
                {chapter.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
