import { POLAROIDS, ROPE } from '../../data/polaroids'
import styles from './PhotoStrip.module.css'

/**
 * Photographs hanging from an orange rope, one polaroid at a time. Every polaroid is its own image
 * (frame, photo and clip as drawn in Figma), so they animate in individually rather than as a collage.
 * The strip occupies no space until `open`, then the card grows to make room for it.
 */
export default function PhotoStrip({ id, open, photos, label, load }) {
  return (
    <div id={id} className={styles.gallery} data-gallery="" data-open={open} role="group" aria-label={label} inert={!open}>
      <div className={styles.clip}>
        <div className={styles.viewport}>
          <div className={styles.stage}>
            {load && (
              <>
                <img
                  className={styles.rope}
                  src={ROPE.src}
                  alt=""
                  width={ROPE.size[0]}
                  height={ROPE.size[1]}
                  style={{ left: `${ROPE.left}%`, top: `${ROPE.top}%`, width: `${ROPE.width}%`, height: `${ROPE.height}%` }}
                  decoding="async"
                />
                {POLAROIDS.map((polaroid, index) => (
                  <img
                    key={index}
                    className={styles.polaroid}
                    src={photos[index]}
                    alt=""
                    width={polaroid.size[0]}
                    height={polaroid.size[1]}
                    decoding="async"
                    style={{
                      left: `${polaroid.left}%`,
                      top: `${polaroid.top}%`,
                      width: `${polaroid.width}%`,
                      height: `${polaroid.height}%`,
                      zIndex: polaroid.z,
                      '--i': index,
                      '--tilt': index % 2 === 0 ? 7 : -7,
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
