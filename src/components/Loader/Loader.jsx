import { useEffect, useState } from 'react'
import bolt from '../../assets/nav/logo-bolt.svg'
import styles from './Loader.module.css'

const HOLD_MS = 2200
const EXIT_MS = 600
const SKIP_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart']

/**
 * Brief brand intro (~2.2s). Anyone can skip it with a click, key press or scroll,
 * and it is never shown when the visitor prefers reduced motion.
 */
export default function Loader({ onLeave, onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLeaving(true), HOLD_MS)
    const skip = () => setLeaving(true)
    SKIP_EVENTS.forEach((type) => window.addEventListener(type, skip, { once: true, passive: true }))

    return () => {
      clearTimeout(timer)
      SKIP_EVENTS.forEach((type) => window.removeEventListener(type, skip))
    }
  }, [])

  useEffect(() => {
    if (!leaving) return undefined
    onLeave()
    const timer = setTimeout(onDone, EXIT_MS)
    return () => clearTimeout(timer)
  }, [leaving, onLeave, onDone])

  return (
    <div className={styles.loader} data-leaving={leaving} role="status" aria-live="polite">
      <span className="visually-hidden">Loading portfolio</span>
      <div className={styles.stack} aria-hidden="true">
        <div className={styles.mark}>
          <img className={styles.bolt} src={bolt} alt="" />
        </div>
        <div className={styles.track}>
          <span className={styles.bar} style={{ '--hold': `${HOLD_MS}ms` }} />
        </div>
      </div>
    </div>
  )
}
