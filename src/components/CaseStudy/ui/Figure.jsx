import { Maximize2 } from 'lucide-react'
import { asset } from '../../../data/caseStudyAssets'
import { useLightbox } from './lightboxContext'
import styles from './Figure.module.css'

/**
 * An exported Figma image with a caption. Selecting it opens the full-size view; the image reserves its box from the
 * export's real dimensions, so nothing shifts as it loads.
 */
export default function Figure({ image, title, caption, span = 'default', priority = false, alt, className = '' }) {
  const openLightbox = useLightbox()
  const picture = asset(image)
  const description = alt ?? [title, caption].filter(Boolean).join('. ')

  return (
    <figure className={`${styles.figure} ${className}`.trim()} data-span={span}>
      <button
        type="button"
        className={styles.frame}
        onClick={() => openLightbox({ ...picture, alt: description, title, caption })}
        aria-label={`${title}. Open full size`}
      >
        <img
          className={styles.image}
          src={picture.src}
          width={picture.width}
          height={picture.height}
          alt={description}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
        />
        <span className={styles.zoom} aria-hidden="true">
          <Maximize2 size={16} />
        </span>
      </button>
      {(title || caption) && (
        <figcaption className={styles.caption}>
          {title && <strong>{title}</strong>}
          {caption && <span>{caption}</span>}
        </figcaption>
      )}
    </figure>
  )
}

/** The 6-column grid figures sit in. A figure's `span` decides how many columns it takes. */
export function FigureGrid({ children, className = '' }) {
  return <div className={`${styles.grid} ${className}`.trim()}>{children}</div>
}
