import { useEffect, useRef, useState } from 'react'
import styles from './StageVideo.module.css'

const pct = (value, total) => `${(value / total) * 100}%`

/** Whether this visitor asked for less motion or less data, in which case the still frame stays a still frame. */
const keepStill = () =>
  typeof IntersectionObserver === 'undefined' ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  Boolean(navigator.connection?.saveData)

/**
 * A muted, looping screen recording laid over the device mockup, exactly where Figma has it (`frame` = the rounded clip,
 * `rect` = the recording inside it, both in the stage's design pixels).
 *
 * - Nothing is downloaded until the card is within 400px of the screen; then it plays while at least 40% of it is
 *   visible and pauses otherwise (and while the tab is hidden).
 * - The video stays transparent until it is really playing, so the mockup's own still frame shows through if the file
 *   is missing, still loading, or autoplay is refused (`play()` rejections are swallowed on purpose).
 * - It never takes part in layout: it is absolutely placed in percentages of the stage, so it cannot shift anything.
 */
export default function StageVideo({ video, stage }) {
  const { src, frame, rect } = video
  const ref = useRef(null)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || keepStill()) return undefined
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true)
          near.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    near.observe(node)
    return () => near.disconnect()
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!armed || !node) return undefined

    node.muted = true // React doesn't reflect the `muted` attribute reliably; autoplay needs the property
    let visible = false

    const sync = () => {
      if (visible && !document.hidden) node.play()?.catch(() => {})
      else node.pause()
    }
    const onPlaying = () => {
      node.dataset.playing = 'true'
    }
    const onStopped = () => {
      delete node.dataset.playing
    }

    const watch = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        sync()
      },
      { threshold: 0.4 },
    )
    watch.observe(node)

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => {
      if (motion.matches) {
        visible = false
        node.pause()
      }
    }

    node.addEventListener('playing', onPlaying)
    node.addEventListener('error', onStopped)
    document.addEventListener('visibilitychange', sync)
    motion.addEventListener('change', onMotion)

    return () => {
      watch.disconnect()
      node.pause()
      node.removeEventListener('playing', onPlaying)
      node.removeEventListener('error', onStopped)
      document.removeEventListener('visibilitychange', sync)
      motion.removeEventListener('change', onMotion)
    }
  }, [armed])

  return (
    <div
      className={styles.frame}
      aria-hidden="true"
      style={{
        left: pct(frame.x, stage.width),
        top: pct(frame.y, stage.height),
        width: pct(frame.w, stage.width),
        height: pct(frame.h, stage.height),
        '--radius': frame.radius,
      }}
    >
      <video
        ref={ref}
        className={styles.video}
        src={armed ? src : undefined}
        preload={armed ? 'auto' : 'none'}
        muted
        loop
        playsInline
        disablePictureInPicture
        tabIndex={-1}
        style={{
          left: pct(rect.x, frame.w),
          top: pct(rect.y, frame.h),
          width: pct(rect.w, frame.w),
          height: pct(rect.h, frame.h),
        }}
      />
    </div>
  )
}
