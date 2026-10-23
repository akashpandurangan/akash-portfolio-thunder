import { useEffect, useId, useRef, useState } from 'react'
import Tag from '../ui/Tag'
import PhotoStrip from './PhotoStrip'
import { useHoverIntent } from '../../hooks/useHoverIntent'
import styles from './ExperienceCard.module.css'

/** Start fetching a card's photos a little before it scrolls into view so the reveal never waits on the network. */
function useNearViewport(ref, margin = '800px 0px') {
  const [near, setNear] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || near) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: margin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, margin, near])

  return near
}

// Clicks that start on these never toggle the card (the photo strip must stay swipeable and never closes the card).
const NO_TOGGLE = '[data-gallery], a, input, select, textarea, [data-no-toggle]'

/**
 * The whole card is the control: hover (with intent) shows the photos, and a click, tap, or Enter / Space
 * on the focusable job title pins them open. Cards without photos are plain, non-interactive text.
 */
export default function ExperienceCard({ role }) {
  const { role: title, period, company, logo, description, photos, photosLabel } = role

  const interactive = photos.some(Boolean)
  const cardRef = useRef(null)
  const galleryId = useId()
  const hintId = useId()
  const { hovered, handlers } = useHoverIntent()
  const [pinned, setPinned] = useState(false)
  const loadPhotos = useNearViewport(cardRef)

  const open = interactive && (hovered || pinned)

  const toggle = (event) => {
    if (!interactive || event.target.closest(NO_TOGGLE)) return
    // Releasing the mouse after selecting text inside the card shouldn't count as a click on it.
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed && cardRef.current?.contains(selection.anchorNode)) return
    setPinned((value) => !value)
  }

  return (
    <article
      ref={cardRef}
      className={styles.card}
      data-interactive={interactive}
      data-open={open}
      data-pinned={interactive && pinned}
      onClick={toggle}
      {...(interactive ? handlers : {})}
    >
      <header className={styles.header}>
        <h3 className={styles.title}>
          {interactive ? (
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={open}
              aria-controls={galleryId}
              aria-describedby={hintId}
            >
              {title}
            </button>
          ) : (
            title
          )}
        </h3>
        <Tag>{period}</Tag>
      </header>

      <p className={styles.company}>
        <img className={logo.mono ? styles.logoMono : undefined} src={logo.src} alt="" width={logo.width} height={logo.height} />
        <span>{company}</span>
      </p>

      <p className={styles.description}>{description}</p>

      {interactive && (
        <>
          <span id={hintId} className="visually-hidden">
            {open ? 'Hide' : 'Show'} {photosLabel.toLowerCase()}
          </span>
          <PhotoStrip id={galleryId} open={open} photos={photos} label={photosLabel} load={loadPhotos} />
        </>
      )}
    </article>
  )
}
