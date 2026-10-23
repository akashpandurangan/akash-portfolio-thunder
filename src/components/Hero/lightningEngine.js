/*
 * Mouse-reactive lightning for the hero. A single canvas, a single requestAnimationFrame loop that only runs
 * while something is visible, and listeners that exist only while the hero is on screen.
 *
 * Look, from most to least intense:
 *   1. the main trail - a jagged bright-core bolt that follows the pointer with a short delay, thicker near the head;
 *   2. forks - smaller bolts that split off the trail at varied angles and lengths, now and then with a sub-fork;
 *   3. arcs - short curved bolts that reach out to the left and right of the path, alternating sides;
 *   4. sparks and embers - sparks burst out on sharp turns and fast strokes, embers drift off the path and fade.
 * Secondary bolts "strike" outward, shimmer by re-rolling their kinks every ~80ms (never a full-frame flash) and
 * fade on their own. Everything is capped; the bolts are gone ~0.5s after the pointer stops or leaves and the last
 * embers ~0.85s after, at which point the frame loop stops.
 */

import { clamp01, hash, rand, strokeBolt } from '../../lib/lightning'

const LIFE = 520 // ms a main-trail sample stays visible
const FOLLOW_TAU = 65 // ms; smoothing time constant = the trail's slight delay behind the cursor
const STEP = [11, 19] // px between trail samples (irregular on purpose)
const MAX_POINTS = 60
const BUCKETS = 8 // the trail is stroked in this many alpha bands so fading is smooth without beading
const TURN_RADIANS = 0.95 // ~54°: a turn sharper than this throws sparks
const FAST_SPEED = 900 // px/s at which a stroke counts as fast

const MAX_BOLTS = 14 // forks + arcs + micro bolts alive at once
const BOLT_MIN_SPEED = 90 // px/s; slower than this and the trail stays clean
const BRANCH_GAP = 52 // px of travel between forks
const ARC_GAP = 118 // px of travel between arcs
const MAX_SPARKS = 40
const SPARK_LIFE = [380, 720]
const MAX_EMBERS = 36
const EMBER_LIFE = [520, 850]
const BURST_COOLDOWN = 380 // ms between bursts

export function createLightningEngine(canvas, host) {
  const ctx = canvas.getContext('2d')
  const target = { x: 0, y: 0 }
  const head = { x: 0, y: 0 }

  let width = 0
  let height = 0
  let dpr = 1
  let visible = false
  let listening = false
  let raf = 0
  let lastFrame = 0
  let lastMove = 0
  let lastSample = null
  let heading = null
  let nextStep = STEP[0]
  let sinceSpark = 0
  let sinceBranch = 0
  let sinceArc = 0
  let arcSide = 1
  let lastBurst = 0
  let dirty = null
  let points = []
  let bolts = []
  let sparks = []
  let embers = []

  const isLight = () => document.documentElement.dataset.theme === 'light'

  function resize() {
    const rect = host.getBoundingClientRect()
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = rect.width
    height = rect.height
    canvas.width = Math.max(1, Math.round(width * dpr))
    canvas.height = Math.max(1, Math.round(height * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    dirty = null
  }

  const clearAll = () => {
    ctx.clearRect(0, 0, width, height)
    dirty = null
  }

  function reset() {
    points = []
    bolts = []
    sparks = []
    embers = []
    lastSample = null
    heading = null
    sinceSpark = 0
    sinceBranch = 0
    sinceArc = 0
    clearAll()
  }

  function emitSparks(x, y, count, around, now) {
    for (let i = 0; i < count && sparks.length < MAX_SPARKS; i++) {
      const angle = around + rand(-1, 1) * Math.PI * 0.6
      const speed = rand(40, 150)
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 18,
        born: now,
        life: rand(SPARK_LIFE[0], SPARK_LIFE[1]),
        size: rand(0.8, 1.9),
      })
    }
  }

  function emitEmber(x, y, now) {
    if (embers.length >= MAX_EMBERS) return
    embers.push({
      x,
      y,
      vx: rand(-14, 14),
      vy: rand(-30, -6), // embers drift up a little as they cool
      born: now,
      life: rand(EMBER_LIFE[0], EMBER_LIFE[1]),
      size: rand(0.9, 2),
      alpha: rand(0.22, 0.42),
    })
  }

  /**
   * A short jagged bolt. `bend` curves it (arcs), `wander` roughens it (forks), `jag` is how far its kinks re-roll
   * on each shimmer. Returns nothing; bolts are capped by MAX_BOLTS so a fast mouse can never build a storm.
   */
  function makeBolt({ x, y, angle, length, segments, bend = 0, wander, jag, life, intensity, width: lineScale, delay = 0, now, canFork = false }) {
    if (bolts.length >= MAX_BOLTS) return
    const pts = [{ x, y, nx: 0, ny: 0, heading: angle }]
    const cumulative = [0]
    let a = angle
    let cx = x
    let cy = y
    let total = 0
    for (let i = 0; i < segments; i++) {
      a += bend + rand(-wander, wander)
      const run = (length / segments) * rand(0.75, 1.3)
      cx += Math.cos(a) * run
      cy += Math.sin(a) * run
      total += run
      pts.push({ x: cx, y: cy, nx: -Math.sin(a), ny: Math.cos(a), heading: a })
      cumulative.push(total)
    }
    bolts.push({
      pts,
      cumulative,
      total,
      born: now + delay,
      life,
      intensity,
      width: lineScale,
      jag,
      seed: Math.random() * 1000,
      restrike: rand(65, 105),
      grow: rand(70, 120),
    })

    // Now and then a fork splits again, smaller and a beat later.
    if (canFork && segments >= 3 && Math.random() < 0.3) {
      const from = pts[2]
      makeBolt({
        x: from.x,
        y: from.y,
        angle: from.heading + (Math.random() < 0.5 ? -1 : 1) * rand(0.5, 0.95),
        length: length * rand(0.4, 0.55),
        segments: 2,
        wander: wander * 0.8,
        jag: jag * 0.8,
        life: life * 0.8,
        intensity: intensity * 0.7,
        width: lineScale * 0.8,
        delay: 45,
        now,
      })
    }
  }

  const makeFork = (x, y, pathAngle, side, v, now) =>
    makeBolt({
      x,
      y,
      angle: pathAngle + side * rand(0.35, 1.05),
      length: rand(26, 78) * (0.7 + 0.5 * v),
      segments: Math.random() < 0.5 ? 3 : 4,
      wander: 0.55,
      jag: 3.5,
      life: rand(280, 440),
      intensity: 0.78,
      width: 0.6,
      now,
      canFork: true,
    })

  const makeArc = (x, y, pathAngle, side, v, now) =>
    makeBolt({
      x,
      y,
      angle: pathAngle + side * rand(1.15, 1.65), // out to the side of the path…
      bend: -side * rand(0.18, 0.34), // …curving back toward the direction of travel
      length: rand(34, 84) * (0.7 + 0.4 * v),
      segments: Math.random() < 0.5 ? 4 : 5,
      wander: 0.3,
      jag: 2.2,
      life: rand(320, 500),
      intensity: 0.66,
      width: 0.5,
      now,
    })

  /** Energy burst: sparks plus a couple of very short bolts thrown out around the direction of travel. */
  function burst(x, y, angle, strength, now) {
    if (now - lastBurst < BURST_COOLDOWN) return
    lastBurst = now
    emitSparks(x, y, Math.round(rand(5, 9) * strength), angle, now)
    for (const side of [-1, 1]) {
      makeBolt({
        x,
        y,
        angle: angle + side * rand(0.8, 1.6),
        length: rand(16, 38),
        segments: 2,
        wander: 0.4,
        jag: 1.8,
        life: rand(150, 240),
        intensity: 0.55,
        width: 0.4,
        now,
      })
    }
  }

  /** Advance the simulation: ease the head toward the pointer, lay down trail samples, age everything. */
  function step(now, dt) {
    const k = 1 - Math.exp(-dt / FOLLOW_TAU)
    const px = head.x
    const py = head.y
    head.x += (target.x - head.x) * k
    head.y += (target.y - head.y) * k
    const speed = (Math.hypot(head.x - px, head.y - py) / Math.max(dt, 1)) * 1000

    if (!lastSample) lastSample = { x: head.x, y: head.y }
    const dx = head.x - lastSample.x
    const dy = head.y - lastSample.y
    const distance = Math.hypot(dx, dy)

    if (distance >= nextStep) {
      const angle = Math.atan2(dy, dx)
      const nx = -Math.sin(angle)
      const ny = Math.cos(angle)
      const v = clamp01(speed / FAST_SPEED)
      const kink = Math.random() < 0.14 ? 1.8 : 1 // the odd sharper kink keeps the main bolt from looking drawn
      const amplitude = (3.5 + Math.min(speed * 0.007, 9)) * kink
      const jitter = rand(-1, 1) * amplitude
      const sample = { x: head.x + nx * jitter, y: head.y + ny * jitter, born: now, mid: rand(-1, 1) * amplitude * 0.85 }

      points.push(sample)
      if (points.length > MAX_POINTS) points.shift()

      // A sharp change of direction throws sparks and a small burst.
      if (heading !== null) {
        let turn = Math.abs(angle - heading)
        if (turn > Math.PI) turn = Math.PI * 2 - turn
        if (turn > TURN_RADIANS && speed > 120) {
          emitSparks(head.x, head.y, Math.round(rand(3, 6)), angle, now)
          burst(sample.x, sample.y, angle, 0.7, now)
        }
      }
      // A fast stroke occasionally releases a burst of its own.
      if (speed > FAST_SPEED * 1.15) burst(sample.x, sample.y, angle + Math.PI, 1, now)

      // …and a thin trickle of sparks and embers along the path.
      sinceSpark += distance
      if (sinceSpark > 110 && Math.random() < 0.4) {
        emitSparks(head.x, head.y, 1, angle + Math.PI, now)
        sinceSpark = 0
      }
      if (Math.random() < 0.45) emitEmber(sample.x + nx * rand(-9, 9), sample.y + ny * rand(-9, 9), now)

      // Forks and arcs only while the pointer is actually travelling, spaced by distance so it never becomes a storm.
      if (speed > BOLT_MIN_SPEED) {
        sinceBranch += distance
        sinceArc += distance
        if (sinceBranch > BRANCH_GAP && Math.random() < 0.3 + 0.4 * v) {
          const side = Math.random() < 0.5 ? -1 : 1
          makeFork(sample.x, sample.y, angle, side, v, now)
          if (Math.random() < 0.22) makeFork(sample.x, sample.y, angle, -side, v, now) // a Y-shaped split
          sinceBranch = rand(0, 20)
        }
        if (sinceArc > ARC_GAP && Math.random() < 0.55) {
          arcSide = -arcSide // alternate left and right of the path
          makeArc(sample.x, sample.y, angle, arcSide, v, now)
          sinceArc = rand(0, 30)
        }
      }

      heading = angle
      lastSample = { x: head.x, y: head.y }
      nextStep = rand(STEP[0], STEP[1])
    }

    points = points.filter((p) => now - p.born < LIFE)
    bolts = bolts.filter((b) => now - b.born < b.life)

    const seconds = dt / 1000
    sparks = sparks.filter((s) => now - s.born < s.life)
    for (const s of sparks) {
      s.x += s.vx * seconds
      s.y += s.vy * seconds
      s.vy += 90 * seconds
      s.vx *= 1 - 2.2 * seconds
    }
    embers = embers.filter((e) => now - e.born < e.life)
    for (const e of embers) {
      e.x += e.vx * seconds
      e.y += e.vy * seconds
      e.vx *= 1 - 1.4 * seconds
    }
  }

  const stroke = (pts, alpha, scale, light) => strokeBolt(ctx, pts, alpha, scale, light)

  /** The bolt as drawn right now: grown out to `progress` of its length, kinks re-rolled for this shimmer `epoch`. */
  function shapeBolt(bolt, epoch, progress) {
    const limit = bolt.total * progress
    const shaped = []
    for (let i = 0; i < bolt.pts.length; i++) {
      const p = bolt.pts[i]
      const offset = i === 0 ? 0 : hash(bolt.seed + i * 7.13 + epoch * 3.77) * bolt.jag
      const x = p.x + p.nx * offset
      const y = p.y + p.ny * offset
      if (bolt.cumulative[i] <= limit) {
        shaped.push({ x, y })
        continue
      }
      const prev = shaped[shaped.length - 1]
      const span = bolt.cumulative[i] - bolt.cumulative[i - 1]
      const t = span > 0 ? (limit - bolt.cumulative[i - 1]) / span : 0
      shaped.push({ x: prev.x + (x - prev.x) * t, y: prev.y + (y - prev.y) * t })
      break
    }
    return shaped
  }

  function draw(now) {
    if (dirty) ctx.clearRect(dirty.x0, dirty.y0, dirty.x1 - dirty.x0, dirty.y1 - dirty.y0)

    const light = isLight()
    ctx.globalCompositeOperation = light ? 'source-over' : 'lighter'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    let x0 = Infinity
    let y0 = Infinity
    let x1 = -Infinity
    let y1 = -Infinity
    const grow = (x, y, pad) => {
      if (x - pad < x0) x0 = x - pad
      if (y - pad < y0) y0 = y - pad
      if (x + pad > x1) x1 = x + pad
      if (y + pad > y1) y1 = y + pad
    }

    // Embers sit furthest back: small cooling dots that linger after the bolt has gone.
    for (const ember of embers) {
      const life = 1 - (now - ember.born) / ember.life
      const alpha = ember.alpha * life * life
      const radius = ember.size * (0.5 + life * 0.5)
      ctx.fillStyle = light ? `rgba(230, 70, 0, ${alpha * 0.3})` : `rgba(252, 76, 1, ${alpha * 0.35})`
      ctx.beginPath()
      ctx.arc(ember.x, ember.y, radius * 3.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = light ? `rgba(210, 55, 0, ${alpha * 1.6})` : `rgba(255, 150, 70, ${alpha * 1.6})`
      ctx.beginPath()
      ctx.arc(ember.x, ember.y, radius, 0, Math.PI * 2)
      ctx.fill()
      grow(ember.x, ember.y, radius * 3.2 + 2)
    }

    // Forks, arcs and micro bolts: fainter and thinner than the trail so the trail stays the hero.
    for (const bolt of bolts) {
      const age = now - bolt.born
      if (age < 0) continue // a sub-fork waiting for its parent
      const fade = Math.pow(1 - age / bolt.life, 1.35)
      const epoch = Math.floor(age / bolt.restrike)
      const flicker = 0.8 + 0.1 * (1 + hash(bolt.seed + epoch * 1.93)) // 0.8 – 1: shimmer, never a strobe
      const eased = clamp01(age / bolt.grow)
      const shaped = shapeBolt(bolt, epoch, 1 - (1 - eased) * (1 - eased))
      stroke(shaped, fade * flicker * bolt.intensity, bolt.width, light)
      for (const p of shaped) grow(p.x, p.y, 16)
    }

    // Main trail: the sampled path, with a jagged midpoint inside each segment, plus a live segment to the head.
    if (points.length) {
      const tailAge = (now - points[points.length - 1].born) / LIFE
      const path = points.map((p) => ({ ...p, age: (now - p.born) / LIFE }))
      path.push({ x: head.x, y: head.y, age: tailAge, mid: 0 }) // the head fades with the tail once the pointer rests
      let band = -1
      let run = []
      const flush = () => {
        if (run.length > 1) {
          const alpha = 1 - (band + 0.5) / BUCKETS
          stroke(run, alpha, 0.55 + 0.45 * alpha, light)
        }
      }
      for (let i = 1; i < path.length; i++) {
        const a = path[i - 1]
        const b = path[i]
        const bandOfSegment = Math.min(BUCKETS - 1, Math.floor(b.age * BUCKETS))
        const sx = b.x - a.x
        const sy = b.y - a.y
        const length = Math.hypot(sx, sy) || 1
        const mx = (a.x + b.x) / 2 + (-sy / length) * b.mid
        const my = (a.y + b.y) / 2 + (sx / length) * b.mid
        if (bandOfSegment !== band) {
          flush()
          band = bandOfSegment
          run = [a]
        }
        run.push({ x: mx, y: my }, b)
        grow(a.x, a.y, 18)
        grow(b.x, b.y, 18)
        grow(mx, my, 18)
      }
      flush()

      // A soft hot spot at the head so the bolt reads as energy coming from the cursor.
      const glow = 1 - tailAge
      if (glow > 0.02) {
        ctx.fillStyle = light ? `rgba(252, 76, 1, ${0.1 * glow})` : `rgba(252, 76, 1, ${0.16 * glow})`
        ctx.beginPath()
        ctx.arc(head.x, head.y, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = light ? `rgba(220, 60, 0, ${0.5 * glow})` : `rgba(255, 190, 140, ${0.5 * glow})`
        ctx.beginPath()
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2)
        ctx.fill()
        grow(head.x, head.y, 22)
      }
    }

    for (const spark of sparks) {
      const life = 1 - (now - spark.born) / spark.life
      const radius = spark.size * (0.35 + life * 0.65)
      ctx.fillStyle = `rgba(252, 76, 1, ${0.32 * life})`
      ctx.beginPath()
      ctx.arc(spark.x, spark.y, radius * 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = light ? `rgba(200, 50, 0, ${life})` : `rgba(255, 224, 196, ${life})`
      ctx.beginPath()
      ctx.arc(spark.x, spark.y, radius, 0, Math.PI * 2)
      ctx.fill()
      grow(spark.x, spark.y, radius * 3 + 2)
    }

    dirty = x0 === Infinity ? null : { x0: Math.max(0, x0), y0: Math.max(0, y0), x1: Math.min(width, x1), y1: Math.min(height, y1) }
  }

  const isActive = (now) =>
    points.length > 1 ||
    bolts.length > 0 ||
    sparks.length > 0 ||
    embers.length > 0 ||
    (now - lastMove < 400 && Math.hypot(target.x - head.x, target.y - head.y) > 0.5)

  function frame(now) {
    raf = 0
    const dt = Math.min(48, lastFrame ? now - lastFrame : 16)
    lastFrame = now
    step(now, dt)
    draw(now)
    if (visible && !document.hidden && isActive(now)) {
      raf = requestAnimationFrame(frame)
    } else {
      lastFrame = 0
      if (!isActive(now)) clearAll()
    }
  }

  const wake = () => {
    if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame)
  }

  const toLocal = (event) => {
    const rect = host.getBoundingClientRect()
    target.x = event.clientX - rect.left
    target.y = event.clientY - rect.top
  }

  function onEnter(event) {
    if (event.pointerType === 'touch') return
    if (Math.abs((window.devicePixelRatio || 1) - dpr) > 0.01 && dpr < 2) resize()
    toLocal(event)
    // Start from where the pointer entered, so there is no streak from wherever it last was.
    head.x = target.x
    head.y = target.y
    lastSample = null
    heading = null
  }

  function onMove(event) {
    if (event.pointerType === 'touch') return
    toLocal(event)
    lastMove = performance.now()
    wake()
  }

  const onLeave = () => {
    lastMove = 0
  }

  function listen(on) {
    if (on === listening) return
    listening = on
    const method = on ? 'addEventListener' : 'removeEventListener'
    host[method]('pointerenter', onEnter, { passive: true })
    host[method]('pointermove', onMove, { passive: true })
    host[method]('pointerleave', onLeave, { passive: true })
  }

  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf)
      raf = 0
      lastFrame = 0
    } else {
      wake()
    }
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  resize()

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    listen(visible)
    if (!visible) {
      cancelAnimationFrame(raf)
      raf = 0
      lastFrame = 0
      reset()
    }
  })
  intersection.observe(host)
  document.addEventListener('visibilitychange', onVisibility)

  return function destroy() {
    cancelAnimationFrame(raf)
    listen(false)
    resizeObserver.disconnect()
    intersection.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    reset()
  }
}
