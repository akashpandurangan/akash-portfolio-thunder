/*
 * Hand-drawn strokes for the design-process map: slightly wobbly circles drawn twice, and arrows that bend a little and
 * end in two quick strokes. Everything is computed from fixed seeds, so the drawing is the same on every visit and on
 * the server. The output is plain SVG path data.
 */

function random(seed) {
  let state = seed | 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const fmt = (value) => Math.round(value * 10) / 10

/** A smooth curve through the points (Catmull-Rom, written as cubic Béziers). */
function smooth(points) {
  let d = `M${fmt(points[0][0])} ${fmt(points[0][1])}`
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${fmt(c1[0])} ${fmt(c1[1])} ${fmt(c2[0])} ${fmt(c2[1])} ${fmt(p2[0])} ${fmt(p2[1])}`
  }
  return d
}

/** A circle drawn by hand: it does not close exactly (the pen overshoots) and its radius drifts a little. */
export function wobblyCircle(cx, cy, r, seed, { points = 30, jitter = 0.03, overshoot = 0.14 } = {}) {
  const rand = random(seed)
  const start = rand() * Math.PI * 2
  const sweep = Math.PI * 2 * (1 + overshoot)
  const wave = rand() * 6
  const pts = []
  for (let i = 0; i <= points; i += 1) {
    const angle = start + (sweep * i) / points
    const radius = r * (1 + (rand() - 0.5) * 2 * jitter + 0.018 * Math.sin(angle * 2 + wave) + (0.022 * i) / points)
    pts.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius * 0.97])
  }
  return smooth(pts)
}

/**
 * An arrow from `from` to `to` ([x, y] each) that bows by `bend` (a share of its length, either side) with a little
 * shake along the way, and a two-stroke head. Returns the shaft and the head as separate paths.
 */
export function handArrow(from, to, seed, { bend = 0.1, head = 13 } = {}) {
  const rand = random(seed)
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const length = Math.hypot(dx, dy) || 1
  const nx = -dy / length
  const ny = dx / length
  const pts = []
  const steps = 5
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const arc = Math.sin(Math.PI * t) * bend * length
    const shake = i === 0 || i === steps ? 0 : (rand() - 0.5) * 3.2
    pts.push([from[0] + dx * t + nx * (arc + shake), from[1] + dy * t + ny * (arc + shake)])
  }
  const tip = pts[steps]
  const before = pts[steps - 1]
  const angle = Math.atan2(tip[1] - before[1], tip[0] - before[0])
  const spread = 0.46
  const wing = (sign) => [tip[0] - Math.cos(angle + sign * spread) * (head + rand() * 2), tip[1] - Math.sin(angle + sign * spread) * (head + rand() * 2)]
  const a = wing(1)
  const b = wing(-1)
  return { shaft: smooth(pts), head: `M${fmt(a[0])} ${fmt(a[1])} L${fmt(tip[0])} ${fmt(tip[1])} L${fmt(b[0])} ${fmt(b[1])}` }
}

/** A curve through the given points, shaken a little, with an arrow head on the last one. */
export function handLoop(points, seed, { head = 12 } = {}) {
  const rand = random(seed)
  const pts = points.map(([x, y], index) => (index === 0 || index === points.length - 1 ? [x, y] : [x + (rand() - 0.5) * 3, y + (rand() - 0.5) * 3]))
  const tip = pts[pts.length - 1]
  const before = pts[pts.length - 2]
  const angle = Math.atan2(tip[1] - before[1], tip[0] - before[0])
  const wing = (sign) => [tip[0] - Math.cos(angle + sign * 0.46) * head, tip[1] - Math.sin(angle + sign * 0.46) * head]
  const a = wing(1)
  const b = wing(-1)
  return { shaft: smooth(pts), head: `M${fmt(a[0])} ${fmt(a[1])} L${fmt(tip[0])} ${fmt(tip[1])} L${fmt(b[0])} ${fmt(b[1])}` }
}

/** An underline scribbled in one stroke. */
export function scribble(x, y, width, seed) {
  const rand = random(seed)
  const pts = []
  const steps = 6
  for (let i = 0; i <= steps; i += 1) pts.push([x + (width * i) / steps, y + (rand() - 0.5) * 3 + (i % 2 ? 1.2 : -1.2)])
  return smooth(pts)
}
