import { useEffect, useRef, useState } from 'react'
import styles from './BrandChip.module.css'

const TAP_VISIBLE_MS = 2600
const EDGE_GAP = 8

/**
 * A brand logo chip with a small tooltip. The tooltip opens on hover, on keyboard focus, and on tap (so it
 * never depends on hover alone). Escape dismisses it whichever way it was opened, without moving the pointer
 * or focus. The accessible name comes from `aria-label`, so the visual tooltip is hidden from assistive tech
 * to avoid announcing the brand twice.
 */
export default function BrandChip({ name, children }) {
  const wrapRef = useRef(null)
  const tipRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [tapped, setTapped] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const active = hovered || focused || tapped

  // Keep the tooltip inside the viewport on narrow screens by nudging it sideways.
  const positionTip = () => {
    const tip = tipRef.current
    const wrap = wrapRef.current
    if (!tip || !wrap) return
    const rect = wrap.getBoundingClientRect()
    const center = rect.left + rect.width / 2
    const half = tip.offsetWidth / 2
    let shift = 0
    if (center - half < EDGE_GAP) shift = EDGE_GAP - (center - half)
    else if (center + half > window.innerWidth - EDGE_GAP) shift = window.innerWidth - EDGE_GAP - (center + half)
    tip.style.setProperty('--shift', `${Math.round(shift)}px`)
  }

  // While a tooltip is showing, Escape dismisses it (WCAG 1.4.13: dismissible without moving pointer or focus).
  useEffect(() => {
    if (!active) return undefined
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setDismissed(true)
      setTapped(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active])

  // A tap shows the tooltip briefly; tapping elsewhere or scrolling dismisses it.
  useEffect(() => {
    if (!tapped) return undefined
    const hide = () => setTapped(false)
    const timer = setTimeout(hide, TAP_VISIBLE_MS)
    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) hide()
    }
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('scroll', hide, { passive: true })
    return () => {
      clearTimeout(timer)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('scroll', hide)
    }
  }, [tapped])

  return (
    <span
      ref={wrapRef}
      className={styles.wrap}
      data-open={tapped}
      data-dismissed={dismissed}
      onPointerEnter={(event) => {
        if (event.pointerType === 'touch') return
        positionTip()
        setHovered(true)
      }}
      onPointerLeave={() => {
        setHovered(false)
        setDismissed(false)
      }}
    >
      <button
        type="button"
        className={styles.chip}
        aria-label={name}
        onFocus={() => {
          positionTip()
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
          setDismissed(false)
        }}
        onClick={() => {
          positionTip()
          setDismissed(false)
          setTapped((value) => !value)
        }}
      >
        {children}
      </button>
      <span ref={tipRef} className={styles.tip} aria-hidden="true">
        {name}
      </span>
    </span>
  )
}
