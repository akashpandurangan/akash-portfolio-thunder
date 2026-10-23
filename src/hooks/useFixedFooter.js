import { useLayoutEffect, useRef, useState } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/**
 * Decides whether the footer can be a "fixed" (reveal) footer: pinned to the bottom of the screen with the page
 * sliding up over it. A fixed footer cannot scroll, so it only qualifies when it fits in the window; touch devices
 * and reduced-motion visitors keep the ordinary footer. Returns the ref for the footer, whether the effect is on,
 * and the footer's height (the page reserves exactly that much room for it).
 */
export function useFixedFooter() {
  const footerRef = useRef(null)
  const [state, setState] = useState({ fixed: false, height: 0 })

  // Layout effect: the effect is applied before the first paint, so the footer never visibly jumps into place.
  useLayoutEffect(() => {
    const footer = footerRef.current
    if (!footer) return undefined

    const fine = window.matchMedia(FINE_POINTER)
    const reduced = window.matchMedia(REDUCED_MOTION)

    const measure = () => {
      const height = Math.ceil(footer.getBoundingClientRect().height)
      const fixed = fine.matches && !reduced.matches && height > 0 && height <= window.innerHeight
      setState((current) => (current.fixed === fixed && current.height === height ? current : { fixed, height }))
    }

    measure()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(footer)
    window.addEventListener('resize', measure)
    fine.addEventListener('change', measure)
    reduced.addEventListener('change', measure)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', measure)
      fine.removeEventListener('change', measure)
      reduced.removeEventListener('change', measure)
    }
  }, [])

  return { footerRef, ...state }
}
