import { useRef, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { asset } from '../../../data/caseStudyAssets'
import { useLightbox } from './lightboxContext'
import styles from './FrameViewer.module.css'

/**
 * A set of real Figma frames, one large with its caption and a strip of thumbnails to choose from. The thumbnails are a
 * radio group (arrow keys move through them), and the large frame opens at full size.
 */
export default function FrameViewer({ items, label, tone = 'wide' }) {
  const [index, setIndex] = useState(0)
  const stripRef = useRef(null)
  const openLightbox = useLightbox()
  const item = items[index]
  const picture = asset(item.image)

  const choose = (next) => {
    setIndex((next + items.length) % items.length)
    requestAnimationFrame(() => stripRef.current?.querySelector('[aria-checked="true"]')?.focus())
  }
  const onKeyDown = (event) => {
    const keys = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: items.length - 1 }
    if (!(event.key in keys)) return
    event.preventDefault()
    choose(keys[event.key])
  }

  return (
    <div className={styles.viewer} data-tone={tone}>
      <button
        type="button"
        className={styles.frame}
        onClick={() => openLightbox({ ...picture, alt: `${item.title}. ${item.text}`, title: item.title, caption: item.text })}
        aria-label={`${item.title}. Open full size`}
      >
        <img
          key={item.image}
          className={styles.image}
          src={picture.src}
          width={picture.width}
          height={picture.height}
          alt={`${item.title}. ${item.text}`}
          decoding="async"
        />
        <span className={styles.zoom} aria-hidden="true">
          <Maximize2 size={16} />
        </span>
      </button>

      <p className={styles.caption} aria-live="polite">
        <strong>{item.title}</strong>
        <span>{item.text}</span>
      </p>

      <div ref={stripRef} className={styles.strip} role="radiogroup" aria-label={label} onKeyDown={onKeyDown}>
        {items.map((entry, position) => {
          const thumb = asset(entry.image)
          return (
            <button
              key={entry.image}
              type="button"
              role="radio"
              className={styles.thumb}
              aria-checked={position === index}
              aria-label={entry.title}
              tabIndex={position === index ? 0 : -1}
              onClick={() => setIndex(position)}
            >
              <img src={thumb.src} width={thumb.width} height={thumb.height} alt="" loading="lazy" decoding="async" draggable="false" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
