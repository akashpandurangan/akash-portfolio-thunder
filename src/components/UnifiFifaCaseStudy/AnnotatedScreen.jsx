import Reveal from '../ui/Reveal'
import { asset } from '../../data/caseStudyAssets'
import { useLightbox } from '../CaseStudy/ui/lightboxContext'
import styles from './Screens.module.css'

/**
 * A large screen with numbered pins on the details that matter, and what each one is beside it. Pin positions are
 * shares of the exported image (`x`, `y` in percent). The image opens full size like every figure of the case study.
 */
export default function AnnotatedScreen({ image, title, text, pins, flip = false }) {
  const openLightbox = useLightbox()
  const picture = asset(`unifi-fifa/${image}`)

  return (
    <Reveal className={styles.annotated} data-flip={flip}>
      <button
        type="button"
        className={styles.frame}
        onClick={() => openLightbox({ ...picture, alt: title, title, caption: text })}
        aria-label={`${title}. Open full size`}
      >
        <img src={picture.src} width={picture.width} height={picture.height} alt={`${title}. ${text}`} loading="lazy" decoding="async" draggable="false" />
        {pins.map((pin, index) => (
          <span key={pin.label} className={styles.pin} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} aria-hidden="true">
            {index + 1}
          </span>
        ))}
      </button>
      <div className={styles.notes}>
        <h4>{title}</h4>
        <p className={styles.text}>{text}</p>
        <ol className={styles.legend}>
          {pins.map((pin, index) => (
            <li key={pin.label}>
              <span aria-hidden="true">{index + 1}</span>
              {pin.label}
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  )
}
