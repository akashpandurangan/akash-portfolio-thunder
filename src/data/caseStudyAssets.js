import manifest from '../assets/case-study/manifest.json'

/*
 * Images of the case-study page, exported from the Figma files (see README → "Design system case study").
 * `manifest.json` holds each file's intrinsic size, so every <img> can reserve its box before it loads.
 * Paths are relative to src/assets/case-study/, e.g. asset('ott/tv/live.webp').
 */
const modules = import.meta.glob('../assets/case-study/**/*.webp', { eager: true, import: 'default' })

export function asset(path) {
  const src = modules[`../assets/case-study/${path}`]
  const size = manifest[path]
  if (!src || !size) throw new Error(`Case-study image not found: ${path}`)
  return { src, width: size[0], height: size[1] }
}
