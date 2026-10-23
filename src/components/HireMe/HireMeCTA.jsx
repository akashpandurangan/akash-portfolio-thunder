import { useEffect, useRef, useState } from 'react'
import { CONTACT_ANCHOR } from '../../data/links'
import { createHireMeLightning } from './hireMeLightning'
import styles from './HireMeCTA.module.css'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

const effectAllowed = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(FINE_POINTER).matches &&
  !window.matchMedia(REDUCED_MOTION).matches

/**
 * A "Hire me" pill fixed to the top-left of the screen that leads to the existing Contact section. It sits level with
 * the header where there is room and just under it where there isn't (see the CSS), and mirrors the header's Contact
 * pill in size and type. Moving a mouse toward it charges it: `radius` is how far away (px) that starts.
 * Touch devices and reduced-motion visitors get the plain button; the lightning canvas is never rendered for them.
 */
export default function HireMeCTA({ radius = 240, label = 'Hire me' }) {
  const canvasRef = useRef(null)
  const buttonRef = useRef(null)
  const [enabled, setEnabled] = useState(effectAllowed)

  useEffect(() => {
    const queries = [window.matchMedia(FINE_POINTER), window.matchMedia(REDUCED_MOTION)]
    const update = () => setEnabled(effectAllowed())
    queries.forEach((query) => query.addEventListener('change', update))
    return () => queries.forEach((query) => query.removeEventListener('change', update))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const button = buttonRef.current
    if (!enabled || !canvas || !button) return undefined
    return createHireMeLightning({ canvas, button, radius })
  }, [enabled, radius])

  return (
    <div className={styles.root}>
      {/* Decorative, click-through, drawn beneath the button so it never covers the label. */}
      {enabled && <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />}
      <a ref={buttonRef} className={styles.cta} href={CONTACT_ANCHOR.href}>
        {label}
      </a>
    </div>
  )
}
