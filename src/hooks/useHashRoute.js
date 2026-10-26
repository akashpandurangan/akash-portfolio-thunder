import { useEffect, useState } from 'react'

/** Where the OTT design-system case study lives. Sections are addressed as `<this>/<section-id>`. */
export const CASE_STUDY_PATH = '#/case-studies/ott-design-system'

const CASE_STUDY = /^#\/case-studies\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?\/?$/

function parse(hash) {
  const match = CASE_STUDY.exec(hash)
  if (match) return { name: 'case-study', slug: match[1], section: match[2] ?? null }
  return { name: 'home', slug: null, section: null }
}

/**
 * The page the address bar points at. The site is one static page with `#section` anchors, so a case study is a
 * `#/case-studies/<slug>` hash: it needs no router, and works on any static host without rewrite rules.
 */
export function useHashRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash))

  useEffect(() => {
    const update = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  return route
}
