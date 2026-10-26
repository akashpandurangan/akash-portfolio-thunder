import { useEffect } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const SMOOTHING_MS = 120 // easing time constant: every 120ms the page covers ~63% of the distance it still has to go
const NOTCH_MIN = 40 // px; a mouse-wheel notch is ~100px, smaller steps come from trackpads, which already glide
const LINE_PX = 100 / 6 // wheels that report lines (Firefox) → pixels
const SETTLE_PX = 0.5 // closer than this to the destination counts as arrived

/** Scrolling is locked while the intro loader, the full-screen menu or a full-size image is up. */
const scrollLocked = () => {
  const { loading, menu, lightbox } = document.documentElement.dataset
  return loading === 'true' || menu === 'open' || lightbox === 'open'
}

/** True when something under the pointer can scroll by itself in this direction (then the wheel belongs to it). */
function nestedScroller(start, delta) {
  for (let el = start; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
    if (el.hasAttribute && el.hasAttribute('data-native-scroll')) return true
    if (!/(auto|scroll)/.test(getComputedStyle(el).overflowY)) continue
    const room = el.scrollHeight - el.clientHeight
    if (room > 1 && ((delta < 0 && el.scrollTop > 0) || (delta > 0 && el.scrollTop < room - 1))) return true
  }
  return false
}

function startSmoothScroll() {
  let raf = 0
  let lastFrame = 0
  let current = window.scrollY // where the page is drawn right now
  let target = current // where the wheel has asked it to go
  let written = current // the last position this code set, to tell its own scrolling from anyone else's

  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

  /** Forget any animation and start again from wherever the page really is. */
  const sync = () => {
    cancelAnimationFrame(raf)
    raf = 0
    lastFrame = 0
    current = target = written = window.scrollY
  }

  const tick = (now) => {
    raf = 0
    const dt = Math.min(48, lastFrame ? now - lastFrame : 16)
    lastFrame = now
    current += (target - current) * (1 - Math.exp(-dt / SMOOTHING_MS))
    if (Math.abs(target - current) < SETTLE_PX) current = target
    window.scrollTo({ top: current, behavior: 'instant' }) // 'instant' so the CSS scroll-behavior doesn't smooth it twice
    written = window.scrollY
    if (current === target) lastFrame = 0
    else raf = requestAnimationFrame(tick)
  }

  const onWheel = (event) => {
    if (event.defaultPrevented || event.ctrlKey || scrollLocked()) return // ctrl+wheel is the browser's zoom
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return // a sideways gesture

    let delta = event.deltaY
    if (event.deltaMode === 1) delta *= LINE_PX
    else if (event.deltaMode === 2) delta *= window.innerHeight

    // Small pixel steps are a trackpad or a precision wheel: the browser already scrolls those smoothly.
    if (event.deltaMode === 0 && Math.abs(delta) < NOTCH_MIN) {
      if (raf) sync()
      return
    }
    if (nestedScroller(event.target, delta)) return

    event.preventDefault()
    if (!raf) sync()
    target = Math.min(maxScroll(), Math.max(0, target + delta))
    if (current !== target && !raf) raf = requestAnimationFrame(tick)
  }

  // Keyboard scrolling, anchor links, scrollbar drags and find-in-page move the page without us: follow them.
  const onScroll = () => {
    if (Math.abs(window.scrollY - written) > 2) sync()
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('scroll', onScroll)
    cancelAnimationFrame(raf)
  }
}

/**
 * Eased, inertial scrolling for mouse-wheel input. Everything else keeps scrolling the browser's own way (trackpads,
 * touch, the keyboard, anchor links, nested scrollers), and it switches itself off for reduced-motion visitors.
 * No dependency: one wheel listener, and an animation frame only while the page is still catching up.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_MOTION)
    let stop = null

    const update = () => {
      if (reduced.matches) {
        stop?.()
        stop = null
      } else if (!stop) {
        stop = startSmoothScroll()
      }
    }

    update()
    reduced.addEventListener('change', update)
    return () => {
      reduced.removeEventListener('change', update)
      stop?.()
    }
  }, [])
}
