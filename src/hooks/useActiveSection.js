import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the reading line near the top of the viewport.
 * Pass `enabled = false` while the sections are not on the page (another page is showing); it starts again,
 * on the freshly mounted elements, when it flips back.
 */
export function useActiveSection(ids, enabled = true) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    if (!enabled) return undefined
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActiveId(hit.target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids, enabled])

  return activeId
}
