/*
 * Drawing primitives shared by the lightning effects (the hero's mouse trail and the "Hire me" CTA), so both
 * have exactly the same look: a bright core, an orange body and two soft glows, drawn as plain strokes.
 */

export const rand = (min, max) => min + Math.random() * (max - min)
export const clamp01 = (value) => Math.min(1, Math.max(0, value))

/** Deterministic noise in [-1, 1]; lets a bolt re-roll its kinks without storing them. */
export const hash = (n) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return (s - Math.floor(s)) * 2 - 1
}

/** Layered bolt: wide soft glow, tighter glow, orange body, bright core. `scale` thins the whole stack. */
export function strokeBolt(ctx, pts, alpha, scale, light) {
  if (pts.length < 2 || alpha <= 0.01) return
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
  ctx.strokeStyle = `rgba(252, 76, 1, ${(light ? 0.07 : 0.1) * alpha})`
  ctx.lineWidth = 26 * scale
  ctx.stroke()
  ctx.strokeStyle = `rgba(252, 76, 1, ${0.24 * alpha})`
  ctx.lineWidth = 12 * scale
  ctx.stroke()
  ctx.strokeStyle = light ? `rgba(240, 70, 0, ${0.6 * alpha})` : `rgba(255, 112, 32, ${0.65 * alpha})`
  ctx.lineWidth = 4 * scale
  ctx.stroke()
  ctx.strokeStyle = light ? `rgba(200, 50, 0, ${0.95 * alpha})` : `rgba(255, 232, 212, ${0.97 * alpha})`
  ctx.lineWidth = 1.6 * scale
  ctx.stroke()
}
