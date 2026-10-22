import { useEffect, useId, useRef, useState } from 'react'
import { Images } from 'lucide-react'
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

export default function ExperienceCard({ role }) {
  const { role: title, period, company, logo, description, photos, photosLabel } = role

  const cardRef = useRef(null)
  const lastPointerType = useRef('mouse')
  const galleryId = useId()
  const { hovered, handlers } = useHoverIntent()
  const [pinned, setPinned] = useState(false)
  const loadPhotos = useNearViewport(cardRef)

  // Photos show on deliberate hover, or when pinned open with the button (keyboard) or a tap (touch).
  const open = hovered || pinned
  const togglePinned = () => setPinned((value) => !value)

  return (
    <article
      ref={cardRef}
      className={styles.card}
      data-open={open}
      onPointerDown={(event) => {
        lastPointerType.current = event.pointerType
      }}
      onClick={(event) => {
        // Touch has no hover, so a tap on the card toggles the photos (the button handles its own clicks).
        if (lastPointerType.current === 'touch' && !event.target.closest('button, a')) togglePinned()
      }}
      {...handlers}
    >
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <Tag>{period}</Tag>
          <button
            type="button"
            className={styles.toggle}
            onClick={togglePinned}
            aria-expanded={pinned}
            aria-controls={galleryId}
            aria-label={`${pinned ? 'Hide' : 'Show'} ${photosLabel.toLowerCase()}`}
            title={`${pinned ? 'Hide' : 'Show'} photos`}
          >
            <Images size={14} aria-hidden="true" />
          </button>
        </div>
      </header>

      <p className={styles.company}>
        <img src={logo.src} alt="" width={logo.width} height={logo.height} />
        <span>{company}</span>
      </p>

      <p className={styles.description}>{description}</p>

      <PhotoStrip id={galleryId} open={open} photos={photos} label={photosLabel} load={loadPhotos} />
    </article>
  )
}
