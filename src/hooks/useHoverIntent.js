import { useCallback, useEffect, useRef, useState } from 'react'

const OPEN_DELAY = 90
const CLOSE_DELAY = 140
const SCROLL_IDLE = 160

/*
 * Page-wide scroll state, shared by every card. While content scrolls under a stationary mouse the browser
 * fires synthetic pointer events; without this guard, hover effects would open as cards pass under the cursor.
 */
let scrolling = false
let scrollTimer = 0
let subscribers = 0

function handleScroll() {
  scrolling = true
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    scrolling = false
  }, SCROLL_IDLE)
}

/**
 * Hover that reflects deliberate pointer use only: needs real pointer movement, ignores touch and scrolling,
 * and waits a beat before opening or closing so brushing past a card doesn't flicker it.
 */
export function useHoverIntent() {
  const [hovered, setHovered] = useState(false)
  const timer = useRef(0)
  const pendingOpen = useRef(false)

  useEffect(() => {
    if (subscribers++ === 0) window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (--subscribers === 0) window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer.current)
    }
  }, [])

  const onPointerMove = useCallback(
    (event) => {
      if (event.pointerType === 'touch' || hovered || pendingOpen.current || scrolling) return
      const moved = event.movementX !== 0 || event.movementY !== 0 || event.movementX === undefined
      if (!moved) return

      pendingOpen.current = true
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        pendingOpen.current = false
        if (!scrolling) setHovered(true)
      }, OPEN_DELAY)
    },
    [hovered],
  )

  const onPointerLeave = useCallback((event) => {
    if (event.pointerType === 'touch') return
    pendingOpen.current = false
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setHovered(false), CLOSE_DELAY)
  }, [])

  return { hovered, handlers: { onPointerMove, onPointerLeave } }
}
