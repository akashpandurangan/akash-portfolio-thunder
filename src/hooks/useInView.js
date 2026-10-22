import { useEffect, useRef, useState } from 'react'

/** Tracks whether an element is currently on screen, so ambient animation can pause when it isn't. */
export function useInView(margin = '120px 0px') {
  const ref = useRef(null)
  // Without IntersectionObserver, treat the element as always visible.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: margin })
    observer.observe(node)
    return () => observer.disconnect()
  }, [margin])

  return [ref, inView]
}
