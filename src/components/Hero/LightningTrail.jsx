import { useEffect, useRef, useState } from 'react'
import { createLightningEngine } from './lightningEngine'
import styles from './LightningTrail.module.css'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

const effectAllowed = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(FINE_POINTER).matches &&
  !window.matchMedia(REDUCED_MOTION).matches

/**
 * Orange lightning that follows the mouse inside its parent (the hero card). It renders nothing on touch-only
 * devices or when the visitor prefers reduced motion, and it never intercepts clicks, scrolling or keyboard input.
 */
export default function LightningTrail() {
  const canvasRef = useRef(null)
  const [enabled, setEnabled] = useState(effectAllowed)

  useEffect(() => {
    const queries = [window.matchMedia(FINE_POINTER), window.matchMedia(REDUCED_MOTION)]
    const update = () => setEnabled(effectAllowed())
    queries.forEach((query) => query.addEventListener('change', update))
    return () => queries.forEach((query) => query.removeEventListener('change', update))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!enabled || !canvas?.parentElement) return undefined
    return createLightningEngine(canvas, canvas.parentElement)
  }, [enabled])

  if (!enabled) return null
  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
