import { useLayoutEffect } from 'react'

const smoothstep = (t) => t * t * (3 - 2 * t)
const clamp01 = (value) => Math.min(1, Math.max(0, value))

/**
 * Drives the stacked project cards without a single React re-render while scrolling.
 *
 * The pinning itself is plain CSS (`position: sticky` on each list item). This hook only supplies three numbers:
 *  - `--text-h` on the list: the tallest text block, so every pinned card can share one height (CSS adds the media
 *    height and caps it at the viewport). Re-measured whenever a text block changes size.
 *  - `--depth` on each item: how many cards currently lie on top of it (0 = in front, 1 = one card has fully covered it,
 *    fractions while the next card is sliding over). CSS turns it into a small scale / lift / dim.
 *  - focus: a keyboard user who tabs into a card that is buried (or not yet pinned) is scrolled to that card's own
 *    pinned position, so focus is never on something you cannot see.
 * Depth is only computed while the list is on screen, in one animation frame per scroll tick, and only written when it
 * changed. When the items are not sticky (small screens, reduced motion) every variable is cleared.
 */
export function useStackedCards(listRef) {
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return undefined

    const items = Array.from(list.children)
    const lastDepth = items.map(() => null)
    let raf = 0
    let listening = false

    const isPinned = () => items.length > 0 && getComputedStyle(items[0]).position === 'sticky'

    const measureText = () => {
      let tallest = 0
      for (const item of items) {
        const text = item.querySelector('[data-stack-text]')
        if (text) tallest = Math.max(tallest, text.offsetHeight)
      }
      if (tallest > 0) list.style.setProperty('--text-h', `${Math.ceil(tallest)}px`)
    }

    const clearDepth = () => {
      items.forEach((item, index) => {
        if (lastDepth[index] !== null) item.style.removeProperty('--depth')
        lastDepth[index] = null
      })
    }

    const updateDepth = () => {
      raf = 0
      if (!isPinned()) {
        clearDepth()
        return
      }

      const rects = items.map((item) => item.getBoundingClientRect())
      let depth = 0
      for (let index = items.length - 1; index >= 0; index -= 1) {
        // How far the next card's top has risen past this card's bottom, as a share of this card's height.
        if (index < items.length - 1) {
          const { top, height } = rects[index]
          depth += smoothstep(clamp01((top + height - rects[index + 1].top) / height))
        }
        const rounded = Math.round(depth * 1000) / 1000
        if (rounded !== lastDepth[index]) {
          lastDepth[index] = rounded
          items[index].style.setProperty('--depth', String(rounded))
        }
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(updateDepth)
    }

    const listen = () => {
      if (listening) return
      listening = true
      list.dataset.active = 'true' // lets the CSS promote the cards to their own layers only while they animate
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
      schedule()
    }

    const unlisten = () => {
      if (!listening) return
      listening = false
      delete list.dataset.active
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }

    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? listen() : unlisten()), {
      rootMargin: '240px 0px',
    })
    visibility.observe(list)

    const sizes = new ResizeObserver(() => {
      measureText()
      schedule()
    })
    items.forEach((item) => {
      const text = item.querySelector('[data-stack-text]')
      if (text) sizes.observe(text)
    })
    measureText()

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    motion.addEventListener('change', schedule)

    const onFocusIn = (event) => {
      const index = items.findIndex((item) => item.contains(event.target))
      if (index < 0 || !isPinned()) return

      requestAnimationFrame(() => {
        const item = items[index]
        const pinnedTop = parseFloat(getComputedStyle(item).top) || 0
        const buried = (lastDepth[index] ?? 0) > 0.02
        if (!buried && Math.abs(item.getBoundingClientRect().top - pinnedTop) <= 4) return

        // Where the page must be for this card's natural slot to sit at its pinned position.
        let slot = list.getBoundingClientRect().top + window.scrollY
        for (let before = 0; before < index; before += 1) {
          slot += items[before].offsetHeight + (parseFloat(getComputedStyle(items[before]).marginBottom) || 0)
        }
        window.scrollTo({ top: slot - pinnedTop, behavior: 'smooth' })
      })
    }
    list.addEventListener('focusin', onFocusIn)

    return () => {
      cancelAnimationFrame(raf)
      unlisten()
      visibility.disconnect()
      sizes.disconnect()
      motion.removeEventListener('change', schedule)
      list.removeEventListener('focusin', onFocusIn)
      list.style.removeProperty('--text-h')
      clearDepth()
    }
  }, [listRef])
}
