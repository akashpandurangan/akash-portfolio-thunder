import { Maximize2 } from 'lucide-react'
import { asset } from '../../../data/caseStudyAssets'
import { useLightbox } from './lightboxContext'
import styles from './Figure.module.css'

/**
 * An exported Figma image with a caption. Selecting it opens the full-size view; the image reserves its box from the
 * export's real dimensions, so nothing shifts as it loads. `showCaption={false}` leaves the caption out (the title still
 * names the button and the full-size view).
 */
export default function Figure({ image, title, caption, span = 'default', priority = false, alt, showCaption = true, className = '' }) {
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
      {showCaption && (title || caption) && (
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

/**
 * Figures in a single row. Each column is as wide as its export, so differently sized items (the Large and Small
 * cards) keep their real size relative to one another; the images share a baseline and the captions a row of their
 * own. A row that does not fit the screen scrolls sideways instead of wrapping.
 */
export function FigureRow({ figures, label }) {
  const columns = figures.map((figure) => `minmax(0, ${asset(figure.image).width}fr)`).join(' ')
  return (
    <div className={styles.rowScroll} role="group" aria-label={label}>
      <div className={styles.row} style={{ gridTemplateColumns: columns }}>
        {figures.map((figure) => (
          <Figure key={figure.image} {...figure} span="row" />
        ))}
      </div>
    </div>
  )
}
