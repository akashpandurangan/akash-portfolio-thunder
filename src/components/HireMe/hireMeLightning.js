/*
 * Cursor-attracted lightning for the "Hire me" CTA.
 *
 * The cursor's distance to the button (not just hovering it) sets a smoothed "charge" from 0 to 1. The charge drives:
 *   - the button's own glow, through the --charge custom property it writes on the button;
 *   - a jagged main bolt that leaves the button's edge and stretches toward the cursor (short, fragmented tendrils
 *     from far away, a continuous bolt that reaches the cursor when it is close);
 *   - forks that split off the main bolt aimed at the cursor, a few short arcs crackling around the button when the
 *     cursor is on top of it, and tiny sparks.
 * It charges quickly and drains slowly, so letting go makes the bolt retract, break into pieces and fade instead of
 * snapping off. Nothing is left behind: when the charge reaches zero the canvas is cleared and the frame loop stops.
 *
 * One transparent canvas, bounded to the area around the button, drawn beneath the button and never receiving input.
 * The cursor is ignored over the header's other controls (and while the full-screen menu is open), so the nav is never zapped. The drawing primitives are shared with the hero.
 */

import { clamp01, hash, rand, strokeBolt } from '../../lib/lightning'

const RISE_MS = 80 // charging time constant
const FALL_MS = 340 // draining time constant: slower, so the bolt retracts instead of vanishing
const TIP_FOLLOW_MS = 60 // how closely the bolt's tip chases the cursor
const PAD = 28 // px of canvas beyond the radius so the glow is never clipped
const MAX_FORKS = 6
const MAX_SPARKS = 24
const SPARK_LIFE = [300, 560]
const STOP_SHORT = 8 // px the bolt stops before the cursor itself
const DRAINED = 0.02 // charge under which the button counts as back at rest
const BOLT_MIN = 0.025 // below this charge no bolt is drawn, so there is nothing to animate

/** Distance from the centre of a capsule (pill) to its edge along a unit direction. */
function capsuleExit(halfWidth, halfHeight, dx, dy) {
  const core = Math.max(0, halfWidth - halfHeight)
  const flat = Math.abs(dy) > 1e-6 ? halfHeight / Math.abs(dy) : Infinity
  if (Math.abs(flat * dx) <= core) return flat
  const side = Math.sign(dx) || 1
  const b = core * side * dx
  return b + Math.sqrt(Math.max(0, b * b - core * core + halfHeight * halfHeight))
}

/** Smooth, continuous noise in [-1, 1] that drifts to a new value every `period` ms (writhing, not flashing). */
function drift(key, now, period) {
  const step = Math.floor(now / period)
  const f = now / period - step
  const w = f * f * (3 - 2 * f)
  return hash(key + step * 3.77) * (1 - w) + hash(key + (step + 1) * 3.77) * w
}

export function createHireMeLightning({ canvas, button, radius = 240 }) {
  const ctx = canvas.getContext('2d')
  const seed = Math.random() * 1000
  const pointer = { x: 0, y: 0, active: false, overHeader: false }
  const tip = { x: 0, y: 0 }

  let rect = null
  let region = { left: 0, top: 0, width: 0, height: 0 }
  let dpr = 1
  let charge = 0
  let targetCharge = 0
  let raf = 0
  let lastFrame = 0
  let cssCharge = -1
  let sparkDebt = 0
  let sparks = []
  let listening = false

  const isLight = () => document.documentElement.dataset.theme === 'light'

  function measure() {
    rect = button.getBoundingClientRect()
    if (!rect.width) return
    const left = Math.max(0, rect.left - radius - PAD)
    const top = Math.max(0, rect.top - radius - PAD)
    const right = Math.min(window.innerWidth, rect.right + radius + PAD)
    const bottom = Math.min(window.innerHeight, rect.bottom + radius + PAD)
    region = { left, top, width: right - left, height: bottom - top }
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.style.left = `${left}px`
    canvas.style.top = `${top}px`
    canvas.style.width = `${region.width}px`
    canvas.style.height = `${region.height}px`
    canvas.width = Math.max(1, Math.round(region.width * dpr))
    canvas.height = Math.max(1, Math.round(region.height * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    updateTarget()
  }

  function setCss(value) {
    const rounded = Math.round(value * 100) / 100
    if (rounded === cssCharge) return
    cssCharge = rounded
    button.style.setProperty('--charge', String(rounded))
  }

  /** How charged the cursor's position should make the button: 0 beyond the radius, 1 on top of it. */
  function updateTarget() {
    if (!rect || !pointer.active || pointer.overHeader || document.documentElement.dataset.menu === 'open') {
      targetCharge = 0
      return
    }
    const dx = Math.max(rect.left - pointer.x, 0, pointer.x - rect.right)
    const dy = Math.max(rect.top - pointer.y, 0, pointer.y - rect.bottom)
    const closeness = clamp01(1 - Math.hypot(dx, dy) / radius)
    targetCharge = closeness * closeness * (3 - 2 * closeness)
  }

  function addSpark(x, y, now) {
    if (sparks.length >= MAX_SPARKS) return
    const angle = rand(0, Math.PI * 2)
    const speed = rand(18, 80)
    sparks.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 10, born: now, life: rand(SPARK_LIFE[0], SPARK_LIFE[1]), size: rand(0.8, 1.7) })
  }

  /** A short rough bolt from (x, y) heading `angle`, used for forks and the arcs around the button. */
  function shortBolt(x, y, angle, length, segments, wander, jag, key, now) {
    const pts = [{ x, y }]
    let a = angle + wander * drift(key, now, 240)
    let px = x
    let py = y
    for (let i = 1; i <= segments; i++) {
      a += wander * 0.7 * drift(key + i * 5.3, now, 120)
      const run = (length / segments) * (0.8 + 0.3 * (0.5 + 0.5 * hash(key + i * 2.1)))
      px += Math.cos(a) * run
      py += Math.sin(a) * run
      const kink = jag * drift(key + i * 9.9, now, 90)
      pts.push({ x: px - Math.sin(a) * kink, y: py + Math.cos(a) * kink })
    }
    return pts
  }

  function draw(now, dt) {
    ctx.clearRect(0, 0, region.width, region.height)
    const light = isLight()
    ctx.globalCompositeOperation = light ? 'source-over' : 'lighter'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (rect && charge > BOLT_MIN) {
      const cx = rect.left + rect.width / 2 - region.left
      const cy = rect.top + rect.height / 2 - region.top
      const halfW = rect.width / 2
      const halfH = rect.height / 2
      const tx = tip.x - region.left
      const ty = tip.y - region.top
      let dx = tx - cx
      let dy = ty - cy
      const toTip = Math.hypot(dx, dy) || 1
      dx /= toTip
      dy /= toTip

      // The bolt starts just inside the button's edge (the button is drawn over it, so it seems to leave the pill).
      const edge = capsuleExit(halfW, halfH, dx, dy)
      const ox = cx + dx * (edge - 2)
      const oy = cy + dy * (edge - 2)
      const full = Math.max(0, toTip - edge - STOP_SHORT)
      // Never longer than the proximity radius allows, and that allowance shrinks as the charge drains: a cursor that
      // has jumped far away makes the bolt retract toward the button instead of stretching after it.
      const len = Math.min(full * clamp01(0.28 + 0.85 * charge), radius * (0.2 + 0.8 * charge))
      const flicker = 0.8 + 0.2 * (0.5 + 0.5 * drift(seed + 99, now, 140))
      const alpha = clamp01(0.25 + 0.9 * charge) * flicker
      const scale = 0.65 + 0.45 * charge
      const nx = -dy
      const ny = dx

      let path = null
      if (len > 6) {
        const count = Math.max(3, Math.min(18, Math.round(len / (24 - 6 * charge))))
        const amp = Math.min(4 + 12 * charge, len * 0.2)
        path = []
        for (let i = 0; i <= count; i++) {
          const t = i / count
          const envelope = Math.pow(Math.sin(Math.PI * t), 0.8)
          const off = (0.7 * drift(seed + i * 7.13, now, 110) + 0.3 * drift(seed * 1.7 + i * 2.9, now, 190)) * amp * envelope
          path.push({ x: ox + dx * len * t + nx * off, y: oy + dy * len * t + ny * off })
        }
        // Weakly charged: the bolt breaks into fragments; it only becomes one continuous bolt as the charge builds.
        const keep = clamp01(charge * 2.4 + 0.2)
        let run = [path[0]]
        for (let i = 1; i < path.length; i++) {
          const visible = 0.5 + 0.5 * drift(seed * 3.1 + i * 5.3, now, 260) < keep
          if (visible) run.push(path[i])
          if ((!visible || i === path.length - 1) && run.length > 1) {
            strokeBolt(ctx, run, alpha, scale, light)
            run = []
          }
          if (!visible) run = [path[i]]
        }

        // Forks: split off the main bolt and aim for the cursor, as if drawn toward it.
        const forks = Math.min(MAX_FORKS, Math.floor(charge * 6.5))
        for (let k = 0; k < forks; k++) {
          const at = Math.max(1, Math.min(count - 1, Math.round(count * (0.18 + 0.72 * ((k + 0.5) / forks) + 0.06 * hash(seed + k * 4.1)))))
          const from = path[at]
          const side = hash(seed + k * 11.7) > 0 ? 1 : -1
          const toward = Math.atan2(ty - from.y, tx - from.x)
          const angle = toward + side * (0.3 + 0.55 * (0.5 + 0.5 * drift(seed + k * 6.3, now, 320)))
          const forkLength = (14 + 46 * (0.5 + 0.5 * drift(seed + k * 3.7, now, 380))) * (0.45 + 0.8 * charge)
          const fork = shortBolt(from.x, from.y, angle, forkLength, 3, 0.5, 3.2, seed + k * 17.9, now)
          strokeBolt(ctx, fork, alpha * 0.62, scale * 0.55, light)
          if (k < 2 && forks >= 3) {
            const child = shortBolt(fork[2].x, fork[2].y, angle + side * 0.7, forkLength * 0.45, 2, 0.45, 2.4, seed + k * 23.3, now)
            strokeBolt(ctx, child, alpha * 0.42, scale * 0.4, light)
          }
        }
      }

      // Close in (or on top of the button): short arcs crackle around its edge, leaning toward the cursor.
      const crackle = Math.round(clamp01((charge - 0.45) / 0.45) * 3)
      for (let k = 0; k < crackle; k++) {
        const around = Math.atan2(dy, dx) + (hash(seed + k * 8.8) > 0 ? 1 : -1) * (0.5 + 1.1 * (0.5 + 0.5 * drift(seed + k * 2.2, now, 420)))
        let ex = Math.cos(around)
        let ey = Math.sin(around)
        const arcLength = 12 + 18 * charge
        const rim = capsuleExit(halfW, halfH, ex, ey)
        // Near the edge of the screen an arc turns back inward instead of being cut off by it.
        if (cx + ex * (rim + arcLength) < 2) ex = Math.abs(ex)
        if (cy + ey * (rim + arcLength) < 2) ey = Math.abs(ey)
        const direction = Math.atan2(ey, ex)
        const arc = shortBolt(cx + ex * (rim - 1), cy + ey * (rim - 1), direction, arcLength, 3, 0.55, 2.2, seed + k * 31.1, now)
        strokeBolt(ctx, arc, alpha * 0.55, scale * 0.45, light)
      }

      // Sparks leave the bolt's tip and its kinks; none are made once the button has drained.
      sparkDebt += (2 + 26 * charge * charge) * (dt / 1000)
      while (sparkDebt >= 1) {
        sparkDebt -= 1
        if (path && Math.random() < 0.6) addSpark(path[path.length - 1].x, path[path.length - 1].y, now)
        else if (path) {
          const p = path[Math.floor(rand(0, path.length))]
          addSpark(p.x, p.y, now)
        } else addSpark(ox, oy, now)
      }
    }

    const seconds = dt / 1000
    sparks = sparks.filter((s) => now - s.born < s.life)
    for (const s of sparks) {
      s.x += s.vx * seconds
      s.y += s.vy * seconds
      s.vx *= 1 - 2 * seconds
      s.vy *= 1 - 2 * seconds
      const life = 1 - (now - s.born) / s.life
      const r = s.size * (0.35 + life * 0.65)
      ctx.fillStyle = `rgba(252, 76, 1, ${0.3 * life})`
      ctx.beginPath()
      ctx.arc(s.x, s.y, r * 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = light ? `rgba(200, 50, 0, ${life})` : `rgba(255, 224, 196, ${life})`
      ctx.beginPath()
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  function frame(now) {
    raf = 0
    const dt = Math.min(48, lastFrame ? now - lastFrame : 16)
    lastFrame = now
    charge += (targetCharge - charge) * (1 - Math.exp(-dt / (targetCharge > charge ? RISE_MS : FALL_MS)))
    if (targetCharge === 0 && charge < DRAINED) charge = 0 // below this nothing visible is left, so stop the tail here
    const follow = 1 - Math.exp(-dt / TIP_FOLLOW_MS)
    tip.x += (pointer.x - tip.x) * follow
    tip.y += (pointer.y - tip.y) * follow

    setCss(charge)
    draw(now, dt)

    // A cursor resting inside the radius but far from the button gives a charge too small to draw: the glow is already
    // at its value, so there is nothing to animate and the loop sleeps until the pointer moves again.
    const resting = charge < BOLT_MIN && Math.abs(targetCharge - charge) < 0.004 && !sparks.length
    if (!document.hidden && !resting && (charge > 0 || targetCharge > 0 || sparks.length)) {
      raf = requestAnimationFrame(frame)
    } else {
      lastFrame = 0
      sparks = []
      ctx.clearRect(0, 0, region.width, region.height)
    }
  }

  const wake = () => {
    if (!raf && !document.hidden) raf = requestAnimationFrame(frame)
  }

  function onMove(event) {
    if (event.pointerType === 'touch') return
    // Coming in from far away, the tip starts at the cursor instead of sweeping across from wherever it last was.
    if (charge === 0) {
      tip.x = event.clientX
      tip.y = event.clientY
    }
    pointer.x = event.clientX
    pointer.y = event.clientY
    pointer.active = true
    // Over the header's other controls nothing fires. The CTA itself may sit inside the header (on mobile) and still counts.
    pointer.overHeader = event.target instanceof Element && !!event.target.closest('header') && !button.contains(event.target)
    updateTarget()
    if (targetCharge > 0) wake()
  }

  function release() {
    pointer.active = false
    targetCharge = 0
    wake()
  }

  const onPointerOut = (event) => {
    if (!event.relatedTarget) release() // the cursor left the window
  }

  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf)
      raf = 0
      lastFrame = 0
      charge = 0
      sparks = []
      setCss(0)
      ctx.clearRect(0, 0, region.width, region.height)
    } else {
      updateTarget()
      wake()
    }
  }

  function listen(on) {
    if (on === listening) return
    listening = on
    const method = on ? 'addEventListener' : 'removeEventListener'
    window[method]('pointermove', onMove, { passive: true })
    window[method]('resize', measure, { passive: true })
    window[method]('blur', release)
    document[method]('pointerout', onPointerOut, { passive: true })
    document.documentElement[method]('mouseleave', release)
    document[method]('visibilitychange', onVisibility)
  }

  const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
  resizeObserver?.observe(button)
  measure()
  listen(true)

  return function destroy() {
    listen(false)
    resizeObserver?.disconnect()
    cancelAnimationFrame(raf)
    raf = 0
    ctx.clearRect(0, 0, region.width, region.height)
    button.style.removeProperty('--charge')
  }
}
