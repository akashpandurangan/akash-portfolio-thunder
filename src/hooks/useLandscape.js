import { useEffect, useLayoutEffect } from 'react'
import { LAND_UNITS, VIEW_WIDTH } from '../components/Hero/landscapeShapes'

// The land (pine tops to the bottom edge) is 27.5% of the hero, as in the approved reference (242 of 880px).
const SHARE = 0.275
const MIN_HEIGHT = 72
const MAX_HEIGHT = 300
// The call-to-action row is boxed and sits above the scene, so the hills may rise a little behind it, never behind the summary.
const OVERLAP = 40
// However narrow the screen, the scene is never drawn more than this much taller than wide (relative to the reference).
const MAX_STRETCH = 1.8

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/** How far an element is moved up or down by its own transform (0 when it has none). */
const shiftY = (element) => {
  const { transform } = getComputedStyle(element)
  return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m42
}

/**
 * Scales the scene (`--ll-sx`, `--ll-sy`) to the hero it sits in. The whole composition always fits the width (the pines
 * at both edges stay in view); its height is the land's 27.5% of the card, held back so the peaks stop below the summary
 * text on short screens and never stretched past MAX_STRETCH on narrow ones. The element to keep clear of is marked
 * `data-landscape-avoid` in the hero. It also publishes where the copy is (`--ll-band`, `--ll-copy-w`), which the sky's stars
 * and lightning use to keep out from behind the text. Runs before the first paint and again whenever the card, that
 * element or its group changes size.
 */
export function useLandscapeFit(ref) {
  useLayoutEffect(() => {
    const root = ref.current
    const card = root?.parentElement
    if (!root || !card) return undefined
    const avoid = card.querySelector('[data-landscape-avoid]')
    const group = avoid?.parentElement
    const copy = group?.firstElementChild

    const fit = () => {
      const cardRect = card.getBoundingClientRect()
      const sx = cardRect.width / VIEW_WIDTH
      let land = clamp(cardRect.height * SHARE, MIN_HEIGHT, MAX_HEIGHT)
      if (avoid) {
        // The hero lifts its content group with a transform; the scene is sized from where that group is laid out, so
        // lifting the copy does not change the landscape.
        const laidOutBottom = avoid.getBoundingClientRect().bottom - shiftY(avoid.parentElement)
        const free = cardRect.bottom - laidOutBottom
        land = Math.min(land, Math.max(MIN_HEIGHT, free + OVERLAP))
      }
      const sy = Math.min(land / LAND_UNITS, sx * MAX_STRETCH)
      root.style.setProperty('--ll-sx', sx.toFixed(4))
      root.style.setProperty('--ll-sy', sy.toFixed(4))
      // Where the copy is, as seen: the sky above its first line (the far lightning keeps to it) and how wide that line is (the
      // stars leave a window round it), so nothing bright sits behind the small text.
      if (copy) {
        root.style.setProperty('--ll-band', `${Math.round(copy.getBoundingClientRect().top - cardRect.top)}px`)
        root.style.setProperty('--ll-copy-w', `${Math.round(copy.getBoundingClientRect().width)}px`)
      }
    }

    fit()
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(fit)
    observer.observe(card)
    if (avoid) observer.observe(avoid)
    if (group) observer.observe(group)
    return () => observer.disconnect()
  }, [ref])
}

// Windows of the 80-second cycle (as a fraction of it) in which the costlier layers need to move at all.
// Wider than the moments the layers are visible, so each is already in motion before it fades in.
const WINDOWS = {
  night: [0.46, 0.9], // stars twinkle
  rain: [0.66, 0.97], // rain falls (and gusts)
}
const CLOCK_MS = 500

// Layers that only matter in part of the cycle are marked `data-phase="day"` (and so on) in the markup. Outside its window
// such a layer is invisible, but a running animation costs a little every frame even at opacity 0, so while a phase is idle
// the root lists it in `data-idle` and the stylesheet pauses its animations; when its window comes they are first set to
// the clock's time, so they stay in step with everything else, and then let go. Each window is wider than the time the
// layer is visible, its animations are at rest at both ends, and one that wraps past the end of the cycle has from > to.
const PHASES = {
  day: [0, 0.47],
  sunset: [0.26, 0.49],
  dusk: [0.28, 0.62],
  night: [0.46, 0.92],
  storm: [0.6, 1],
}

/**
 * Keeps the landscape cheap. It does three things, all written straight to the element (no re-render):
 *  - pauses it (`data-paused="true"`, which the stylesheet turns into paused animations) while the hero is off screen
 *    or the browser tab is hidden, and resumes it where it stopped;
 *  - while it runs, reads the cycle's clock twice a second and sets `data-night` and `data-rain` while those
 *    parts of the cycle are on, so the stylesheet can stop animating stars and rain the rest of the time
 *    (they are invisible then, but animating them would still cost frames);
 *  - lists the phase-driven layers (PHASES) whose part of the cycle is not on in `data-idle`, so the stylesheet pauses them,
 *    and puts them back in step with the clock when they wake.
 * The clock is the sky layer marked `data-clock`: its CSS animation is the 80s cycle. Without animation (reduced motion)
 * there is no clock, nothing is set and the still scene is left alone.
 */
export function useLandscapeActivity(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root) return undefined
    const clock = root.querySelector('[data-clock]')
    const awake = {}

    const tick = () => {
      const animation = clock?.getAnimations()[0]
      const progress = animation?.effect?.getComputedTiming().progress
      if (typeof progress !== 'number') return
      for (const [name, [from, to]] of Object.entries(WINDOWS)) root.dataset[name] = String(progress >= from && progress <= to)
      const duration = animation.effect.getTiming().duration
      const idle = []
      for (const [name, [from, to]] of Object.entries(PHASES)) {
        const on = from <= to ? progress >= from && progress <= to : progress >= from || progress <= to
        if (!on) idle.push(name)
        else if (awake[name] === false) {
          // Waking up: the animations stood still while idle, so move them to where the cycle is now before they go on.
          for (const element of root.querySelectorAll(`[data-phase="${name}"]`)) {
            for (const layerAnimation of element.getAnimations()) {
              if (layerAnimation.effect.getTiming().duration === duration) layerAnimation.currentTime = animation.currentTime
            }
          }
        }
        awake[name] = on
      }
      const value = idle.join(' ')
      if (root.dataset.idle !== value) root.dataset.idle = value
    }

    let timer = 0
    let onScreen = true
    const apply = () => {
      const paused = !onScreen || document.hidden
      root.dataset.paused = String(paused)
      window.clearInterval(timer)
      timer = 0
      if (!paused) {
        tick()
        timer = window.setInterval(tick, CLOCK_MS)
      }
    }

    let observer = null
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting
        apply()
      })
      observer.observe(root)
    }
    document.addEventListener('visibilitychange', apply)
    apply()

    return () => {
      window.clearInterval(timer)
      observer?.disconnect()
      document.removeEventListener('visibilitychange', apply)
    }
  }, [ref])
}
