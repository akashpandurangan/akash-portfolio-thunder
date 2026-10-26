/** The three seek bar modes of the specification. `max` is in seconds; markers are where ads break the content. */
export const SEEK_MODES = {
  content: { max: 2520, step: 5, markers: [0.17, 0.34, 0.51, 0.68, 0.85] }, // 42:00
  live: { max: 8623, step: 5, markers: [] }, // a 2:23:43 window; the end is the live edge
  ad: { max: 30, step: 1, markers: [] },
}

export const formatTime = (seconds) => {
  const total = Math.max(0, Math.floor(seconds))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`
}
