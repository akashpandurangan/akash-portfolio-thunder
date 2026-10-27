import { useEffect, useRef, useState } from 'react'
import { useMatchMedia } from '../../hooks/useMatchMedia'
import { createHireMeLightning } from './hireMeLightning'
import styles from './HireMeCTA.module.css'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
// The header turns into the full desktop bar at 768px (see Navbar.module.css); below that it is the compact mobile row.
const PLACEMENT = { floating: '(min-width: 768px)', header: 'not all and (min-width: 768px)' }

const effectAllowed = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(FINE_POINTER).matches &&
  !window.matchMedia(REDUCED_MOTION).matches

/**
 * The "Hire me" pill, which opens the profile card (HireMeCard) through `onClick`. There is only ever one on screen:
 *   - `floating` (from 768px): fixed to the top-left of the screen, level with the header where there is room and
 *     just under it where there isn't;
 *   - `header` (below 768px): the first item of the header's left group, beside the Akash pill.
 * The component is rendered in both places and each copy is hidden by CSS outside its own breakpoint, so the hidden
 * one is neither visible nor focusable, and its lightning engine isn't running.
 * Moving a mouse toward it charges it: `radius` is how far away (px) that starts. Touch devices and reduced-motion
 * visitors get the plain button; the lightning canvas is never rendered for them. The header also uses `onClick` to
 * close its menu when the CTA is used.
 */
export default function HireMeCTA({ variant = 'floating', radius = 240, label = 'Hire me', onClick }) {
  const canvasRef = useRef(null)
  const buttonRef = useRef(null)
  const [effectOn, setEffectOn] = useState(effectAllowed)
  const placed = useMatchMedia(PLACEMENT[variant])
  const enabled = effectOn && placed

  useEffect(() => {
    const queries = [window.matchMedia(FINE_POINTER), window.matchMedia(REDUCED_MOTION)]
    const update = () => setEffectOn(effectAllowed())
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
    <div className={styles.root} data-variant={variant}>
      {/* Decorative, click-through, drawn beneath the button so it never covers the label. */}
      {enabled && <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />}
      <button ref={buttonRef} type="button" className={styles.cta} aria-haspopup="dialog" onClick={onClick}>
        {label}
      </button>
    </div>
  )
}
