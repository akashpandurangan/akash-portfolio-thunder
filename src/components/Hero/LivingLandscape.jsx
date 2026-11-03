import { useRef } from 'react'
import { useLandscapeActivity, useLandscapeFit } from '../../hooks/useLandscape'
import { CLOUDS, FOG, GLOW, LAYERS, RAIN, STAR_SETS, SUN, VIEW_HEIGHT, VIEW_WIDTH } from './landscapeShapes'
import styles from './LivingLandscape.module.css'

const VIEW_BOX = `0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`
const pct = (value, of) => `${(value / of) * 100}%`

const rainStyle = {
  '--ll-near-w': `${RAIN.tile.near.width}px`,
  '--ll-near-h': `${RAIN.tile.near.height}px`,
  '--ll-far-w': `${RAIN.tile.far.width}px`,
  '--ll-far-h': `${RAIN.tile.far.height}px`,
  '--ll-rain-near-dark': RAIN.nearDark,
  '--ll-rain-near-light': RAIN.nearLight,
  '--ll-rain-far-dark': RAIN.farDark,
  '--ll-rain-far-light': RAIN.farLight,
  // Where the sun is at the reference moment, and the glow around it, as shares of the stage (the CSS positions with these).
  '--ll-sun-x': pct(SUN.x, VIEW_WIDTH),
  '--ll-sun-y': pct(SUN.y, VIEW_HEIGHT),
  '--ll-glow-x': pct(GLOW.x, VIEW_WIDTH),
  '--ll-glow-y': pct(GLOW.y, VIEW_HEIGHT),
  '--ll-glow-rx': pct(GLOW.rx, VIEW_WIDTH),
  '--ll-glow-ry': pct(GLOW.ry, VIEW_HEIGHT),
}

/** The four tone levels of a traced cloud, outermost first. Their opacity is multiplied by `--ll-cg`, set by whoever draws the cloud. */
function CloudLevels({ cloud }) {
  return cloud.levels.map((level) => (
    <path key={level.a} d={level.d} fillRule="evenodd" style={{ fillOpacity: `calc(${level.a} * var(--ll-cg))` }} />
  ))
}

function Stars({ set, className, glow = false }) {
  return (
    <svg className={`${styles.stars} ${className}`} width="100%" height="100%" focusable="false">
      {glow && set.map(([x, y, r, o]) => <circle key={`g${x}-${y}`} className={styles.starGlow} cx={`${x}%`} cy={`${y}%`} r={r * 4.5} fill="url(#ll-star-glow)" opacity={o * 0.5} />)}
      {set.map(([x, y, r, o, tint]) => (
        <circle key={`${x}-${y}`} cx={`${x}%`} cy={`${y}%`} r={r} opacity={o} fill={tint} />
      ))}
    </svg>
  )
}

/** A soft ellipse for a fog bank: `amount` is how much brighter than what is behind it, `strength` how bright it can get. */
function Blob({ blob, gradient, strength }) {
  const [x, y, sx, sy, amount] = blob
  return <ellipse cx={x} cy={y} rx={sx * 2.4} ry={sy * 2.4} fill={`url(#${gradient})`} opacity={Math.min(0.62, amount / strength)} />
}

/**
 * Masks that pick out parts of a ridge from its own outline: the slopes that face left or right (the shape minus itself moved
 * sideways, softly) and a thin crest line along its top edges (the shape minus itself moved down). Everything that lights or
 * shades a ridge below is painted through them, so the light follows the ridge's real, irregular edge.
 */
function RidgeMasks({ k, slope = 0, crest: [crestFrom, crestTo] }) {
  const mask = (id, dx, dy, blur, cut = false) => (
    <mask id={id} maskUnits="userSpaceOnUse" x="-10" y="-10" width={VIEW_WIDTH + 20} height={VIEW_HEIGHT + 20}>
      <use href={`#ll-p-${k}`} fill="#fff" />
      <use href={`#ll-p-${k}`} fill="#000" transform={`translate(${dx} ${dy})`} filter={blur ? `url(#ll-edge-${blur})` : undefined} />
      {cut && <rect x="-10" y="-10" width={VIEW_WIDTH + 20} height={VIEW_HEIGHT + 20} fill={`url(#ll-cut-${k})`} />}
    </mask>
  )
  return (
    <>
      {/* The crest light only reaches down to a given height, so it stays on the skyline and never follows the foggy lower flanks. */}
      <linearGradient id={`ll-cut-${k}`} gradientUnits="userSpaceOnUse" x1="0" y1={crestFrom} x2="0" y2={crestTo}>
        <stop offset="0" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="1" />
      </linearGradient>
      {slope > 0 && mask(`ll-sl-${k}`, slope, 0, 'soft')}
      {slope > 0 && mask(`ll-sr-${k}`, -slope, 0, 'soft')}
      {mask(`ll-rim-${k}`, 0, 2.8, 'thin', true)}
    </>
  )
}

/**
 * One traced ridge layer: its tone, haze at its foot (distance), light and shade on its slopes and, in their own layers that
 * fade with the hour, the warm light of the low sun along its crest (`lit`).
 */
function Ridge({ name, k, fill, slope = false, haze = false, lit = false, soft = false }) {
  const crest = (paint) => <rect x="-10" y="-10" width={VIEW_WIDTH + 20} height={VIEW_HEIGHT + 20} fill={paint} mask={`url(#ll-rim-${k})`} />
  return (
    <div className={`${styles.layer} ${styles[name]}`}>
      <svg className={`${styles.art} ${soft ? styles.soft : ''}`} viewBox={VIEW_BOX} preserveAspectRatio="none" focusable="false">
        <use href={`#ll-p-${k}`} fill={fill} />
        {slope && <rect x="-10" y="-10" width={VIEW_WIDTH + 20} height={VIEW_HEIGHT + 20} fill="url(#ll-slope-l)" mask={`url(#ll-sl-${k})`} />}
        {slope && <rect x="-10" y="-10" width={VIEW_WIDTH + 20} height={VIEW_HEIGHT + 20} fill="url(#ll-slope-r)" mask={`url(#ll-sr-${k})`} />}
      </svg>
      {/* Haze at the foot of the ridge (distance): thin at sunset, thickest by day and in the rain. */}
      {haze && (
        <div className={styles.haze}>
          <svg className={styles.art} viewBox={VIEW_BOX} preserveAspectRatio="none" focusable="false">
            <use href={`#ll-p-${k}`} fill={`url(#ll-haze-${k})`} />
          </svg>
        </div>
      )}
      {/* The sun's warm light on this ridge only (not on the sky behind it): a copy of the ridge painted with the glow, and its crest line. */}
      {lit && (
        <div className={styles.lit}>
          <svg className={styles.art} viewBox={VIEW_BOX} preserveAspectRatio="none" focusable="false">
            <use href={`#ll-p-${k}`} fill="url(#ll-fill-lit)" />
            {crest('url(#ll-rim-warm)')}
          </svg>
        </div>
      )}
    </div>
  )
}

/** A band of mist: soft patches that drift sideways, thinning and thickening with the weather. */
function Mist({ name, phase }) {
  return (
    <div className={`${styles.mist} ${styles[name]}`} data-phase={phase}>
      <div className={styles.mistDrift} />
    </div>
  )
}

/**
 * "A Living Landscape": the approved sunset-over-mountains hero, running a slow, seamless cycle (sunrise, day, sunset,
 * night, rain, back to sunrise) in about 80 seconds. It begins on the sunset of the reference image, and that sunset is
 * also the still scene shown for reduced motion.
 *
 * Two parts. The STAGE is the vector tracing of the reference along the bottom of the hero (see landscapeShapes.js): the
 * far skyline, the central mountain, fog and mist between them, the dark hills and mid-distance pines, the black foreground
 * pines and ground, the sun and its glow, and the reference's two clouds. Its shapes never change; its ridges only gain
 * depth (haze, slope shading) and the light of the hour along their edges. The SKY and WEATHER cover the whole hero behind
 * the copy, from the top to the bottom: the sky's gradients, stars, shooting stars and lightning, with the rain in front.
 * Only light, sky and weather ever change.
 *
 * Inline SVG and plain CSS animation (opacity and transform only): no canvas, video or library. Decorative: aria-hidden,
 * and it never takes input. The cycle's clock is the CSS animations themselves: every phase-driven layer runs the same
 * 80s animation from the same moment, so they stay in step, and pausing them (hero off screen, tab hidden) pauses the clock.
 */
export default function LivingLandscape() {
  const rootRef = useRef(null)
  useLandscapeFit(rootRef)
  useLandscapeActivity(rootRef)

  const fogHalf = Math.ceil(FOG.length / 2)

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true" data-paused="false" style={rainStyle}>
      {/* Shared paint: fog, ridge outlines and masks, the reference clouds, and the fills of the traced layers. */}
      <svg className={styles.defs} width="0" height="0" focusable="false">
        <defs>
          <radialGradient id="ll-fog">
            <stop offset="0" style={{ stopColor: 'var(--ll-fog)', stopOpacity: 1 }} />
            <stop offset="0.25" style={{ stopColor: 'var(--ll-fog)', stopOpacity: 0.835 }} />
            <stop offset="0.5" style={{ stopColor: 'var(--ll-fog)', stopOpacity: 0.487 }} />
            <stop offset="0.75" style={{ stopColor: 'var(--ll-fog)', stopOpacity: 0.198 }} />
            <stop offset="1" style={{ stopColor: 'var(--ll-fog)', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="ll-star-glow">
            <stop offset="0" stopColor="#dbe6ff" stopOpacity="0.9" />
            <stop offset="0.35" stopColor="#c8d8ff" stopOpacity="0.28" />
            <stop offset="1" stopColor="#c8d8ff" stopOpacity="0" />
          </radialGradient>
          {/* Tones of the traced layers by height (view-box y), measured on the reference. */}
          <linearGradient id="ll-fill-far" gradientUnits="userSpaceOnUse" x1="0" y1="190" x2="0" y2="300">
            <stop offset="0" style={{ stopColor: 'var(--ll-far-top)' }} />
            <stop offset="0.55" style={{ stopColor: 'var(--ll-far-mid)' }} />
            <stop offset="1" style={{ stopColor: 'var(--ll-far-bottom)' }} />
          </linearGradient>
          <linearGradient id="ll-fill-mountain" gradientUnits="userSpaceOnUse" x1="0" y1="235" x2="0" y2="330">
            <stop offset="0" style={{ stopColor: 'var(--ll-mountain-top)' }} />
            <stop offset="0.58" style={{ stopColor: 'var(--ll-mountain-mid)' }} />
            <stop offset="1" style={{ stopColor: 'var(--ll-mountain-bottom)' }} />
          </linearGradient>
          <linearGradient id="ll-fill-dark" gradientUnits="userSpaceOnUse" x1="0" y1="180" x2="0" y2="380">
            <stop offset="0" style={{ stopColor: 'var(--ll-dark-top)' }} />
            <stop offset="1" style={{ stopColor: 'var(--ll-dark-bottom)' }} />
          </linearGradient>
          {/* Distance: the foot of each ridge is veiled by haze, more the farther the ridge. */}
          <linearGradient id="ll-haze-skyline" gradientUnits="userSpaceOnUse" x1="0" y1="305" x2="0" y2="190">
            <stop offset="0" style={{ stopColor: 'var(--ll-haze)', stopOpacity: 0.2 }} />
            <stop offset="1" style={{ stopColor: 'var(--ll-haze)', stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id="ll-haze-mountain" gradientUnits="userSpaceOnUse" x1="0" y1="335" x2="0" y2="240">
            <stop offset="0" style={{ stopColor: 'var(--ll-haze)', stopOpacity: 0.1 }} />
            <stop offset="1" style={{ stopColor: 'var(--ll-haze)', stopOpacity: 0 }} />
          </linearGradient>
          {/* Slopes: those that face the sun's side of the scene catch its light, those that face away are in shade. */}
          <linearGradient id="ll-slope-l" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VIEW_WIDTH} y2="0">
            <stop offset="0" style={{ stopColor: 'var(--ll-slope-shade)', stopOpacity: 0.3 }} />
            <stop offset="0.36" style={{ stopColor: 'var(--ll-slope-shade)', stopOpacity: 0.2 }} />
            <stop offset="0.5" style={{ stopColor: 'var(--ll-slope-shade)', stopOpacity: 0 }} />
            <stop offset="0.6" style={{ stopColor: 'var(--ll-slope-lit)', stopOpacity: 0 }} />
            <stop offset="0.78" style={{ stopColor: 'var(--ll-slope-lit)', stopOpacity: 0.13 }} />
            <stop offset="1" style={{ stopColor: 'var(--ll-slope-lit)', stopOpacity: 0.15 }} />
          </linearGradient>
          <linearGradient id="ll-slope-r" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VIEW_WIDTH} y2="0">
            <stop offset="0" style={{ stopColor: 'var(--ll-slope-lit)', stopOpacity: 0.15 }} />
            <stop offset="0.22" style={{ stopColor: 'var(--ll-slope-lit)', stopOpacity: 0.13 }} />
            <stop offset="0.4" style={{ stopColor: 'var(--ll-slope-lit)', stopOpacity: 0 }} />
            <stop offset="0.5" style={{ stopColor: 'var(--ll-slope-shade)', stopOpacity: 0 }} />
            <stop offset="0.64" style={{ stopColor: 'var(--ll-slope-shade)', stopOpacity: 0.2 }} />
            <stop offset="1" style={{ stopColor: 'var(--ll-slope-shade)', stopOpacity: 0.3 }} />
          </linearGradient>
          {/* The sun's warm light on the ridges: a band along the horizon behind the sun, strongest at the ridge tops (measured on the reference). */}
          <radialGradient id="ll-fill-lit" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform={`translate(${GLOW.x} ${GLOW.y - 15}) scale(${GLOW.rx} 30)`}>
            <stop offset="0" stopColor="#ff5a23" stopOpacity="0.2" />
            <stop offset="0.6" stopColor="#ff6e32" stopOpacity="0.12" />
            <stop offset="1" stopColor="#ff7c40" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ll-rim-warm" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform={`translate(${GLOW.x} ${GLOW.y - 10}) scale(${GLOW.rx * 1.25} 120)`}>
            <stop offset="0" style={{ stopColor: 'var(--ll-rim-warm)', stopOpacity: 0.55 }} />
            <stop offset="0.5" style={{ stopColor: 'var(--ll-rim-warm)', stopOpacity: 0.26 }} />
            <stop offset="1" style={{ stopColor: 'var(--ll-rim-warm)', stopOpacity: 0 }} />
          </radialGradient>
          {/* Soft edges for the masks below. */}
          <filter id="ll-edge-soft" x="-5%" y="-10%" width="110%" height="120%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="ll-edge-thin" x="-2%" y="-10%" width="104%" height="120%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
          {/* The traced ridges, drawn once and used by the layers and their masks. */}
          <path id="ll-p-skyline" d={LAYERS.skyline} fillRule="evenodd" />
          <path id="ll-p-mountain" d={LAYERS.mountain} fillRule="evenodd" />
          <path id="ll-p-dark" d={LAYERS.dark} fillRule="evenodd" />
          <RidgeMasks k="skyline" slope={18} crest={[232, 272]} />
          <RidgeMasks k="mountain" slope={22} crest={[258, 284]} />
          <RidgeMasks k="dark" crest={[236, 276]} />
          {/* The two clouds of the reference, as shapes the reference's own clouds are drawn from (in view-box units). */}
          <g id="ll-cloud-left">
            <CloudLevels cloud={CLOUDS.left} />
          </g>
          <g id="ll-cloud-right">
            <CloudLevels cloud={CLOUDS.right} />
          </g>
        </defs>
      </svg>

      {/* The sky, from the top of the hero to the bottom: gradients that crossfade; dawn is the base, each later sky fades in over the one before. */}
      <div className={styles.sky}>
        <div className={`${styles.layer} ${styles.skyDawn}`} data-clock />
        <div className={`${styles.layer} ${styles.skyDay}`} data-phase="day" />
        <div className={`${styles.layer} ${styles.skySunset}`} data-phase="sunset" />
        <div className={`${styles.layer} ${styles.skyDusk}`} data-phase="dusk" />
        <div className={`${styles.layer} ${styles.skyNight}`} data-phase="night" />
        <div className={`${styles.layer} ${styles.skyStorm}`} data-phase="storm" />
        {/* The warm light of sunrise and sunset spreading from the horizon up into the sky. */}
        <div className={`${styles.layer} ${styles.skyWash}`} />
      </div>

      {/* Weather across the whole hero, behind the stage: stars, shooting stars and lightning. */}
      <div className={styles.weather}>
        <div className={styles.starField} data-phase="night">
          <div className={styles.nebula} />
          <Stars set={STAR_SETS[0]} className={styles.starsA} />
          <Stars set={STAR_SETS[1]} className={styles.starsB} />
          <Stars set={STAR_SETS[2]} className={styles.starsC} />
          <Stars set={STAR_SETS[3]} className={styles.starsD} />
          <Stars set={STAR_SETS[4]} className={styles.starsE} glow />
        </div>
        <span className={`${styles.shoot} ${styles.shootA}`} data-phase="night" />
        <span className={`${styles.shoot} ${styles.shootB}`} data-phase="night" />

        {/* Distant lightning: only a soft glow in the sky, never a line. */}
        <div className={`${styles.flash} ${styles.flashA}`} data-phase="storm" />
        <div className={`${styles.flash} ${styles.flashB}`} data-phase="storm" />
      </div>

      {/* The stage is the reference's 1710 x 380 view box, scaled to the hero and fixed to its bottom edge. Its shapes never change. */}
      <div className={styles.stage}>
        {/* The reference's horizon glow reaches further than the sun's own: a warm band, widest to the right. */}
        <div className={styles.glowLobe} />
        <div className={styles.glowBand} />

        <div className={styles.sunTrack}>
          <span className={`${styles.sunGlow} ${styles.glowWarm}`} />
          <span className={`${styles.sunGlow} ${styles.glowDay}`} data-phase="day" />
          <span className={`${styles.sunDisc} ${styles.sunWarm}`} />
          <span className={`${styles.sunDisc} ${styles.sunDay}`} data-phase="day" />
        </div>

        {/* The reference's own two clouds, exactly where it has them; they sway a little and come and go with the light. */}
        <div className={styles.refClouds}>
          <svg className={styles.art} viewBox={VIEW_BOX} preserveAspectRatio="none" focusable="false">
            <use href="#ll-cloud-left" />
            <use href="#ll-cloud-right" />
          </svg>
        </div>

        <Ridge name="far" k="skyline" fill="url(#ll-fill-far)" slope haze lit soft />
        <Mist name="mistFar" />
        <Ridge name="mountain" k="mountain" fill="url(#ll-fill-mountain)" slope haze lit />
        <Mist name="mistMid" />

        <div className={`${styles.fog} ${styles.fogA}`}>
          <div className={styles.fogDrift}>
            <svg className={styles.art} viewBox={VIEW_BOX} preserveAspectRatio="none" focusable="false">
              {FOG.slice(0, fogHalf).map((blob) => (
                <Blob key={`${blob[0]}-${blob[1]}`} blob={blob} gradient="ll-fog" strength={82} />
              ))}
            </svg>
          </div>
        </div>
        <div className={`${styles.fog} ${styles.fogB}`}>
          <div className={styles.fogDrift}>
            <svg className={styles.art} viewBox={VIEW_BOX} preserveAspectRatio="none" focusable="false">
              {FOG.slice(fogHalf).map((blob) => (
                <Blob key={`${blob[0]}-${blob[1]}`} blob={blob} gradient="ll-fog" strength={82} />
              ))}
            </svg>
          </div>
        </div>

        {/* The light of the hour, laid over the far ridges, the central mountain and the fog (the dark hills and the pines stay silhouettes). */}
        <div className={styles.tints}>
          <div className={`${styles.tint} ${styles.tintDay}`} data-phase="day" />
          <div className={`${styles.tint} ${styles.tintNight}`} data-phase="night" />
          <div className={`${styles.tint} ${styles.tintStorm}`} data-phase="storm" />
        </div>
        <Ridge name="dark" k="dark" fill="url(#ll-fill-dark)" />
        <Mist name="mistLow" />
        {/* Extra mist that only comes with the rain, so the rainy air is a little thicker among the hills. */}
        <Mist name="mistRain" phase="storm" />
        {/* Lightning softly lighting the mountains (above the hills, below the black pines). */}
        <div className={styles.flashLand} data-phase="storm" />
        <div className={`${styles.layer} ${styles.black}`}>
          <svg className={styles.art} viewBox={VIEW_BOX} preserveAspectRatio="none" focusable="false">
            <path d={LAYERS.black} fill="var(--ll-black)" fillRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Rain in front of everything, across the whole hero. */}
      <div className={styles.rain} data-phase="storm">
        <div className={styles.rainGust}>
          <div className={styles.rainFar} />
          <div className={styles.rainNear} />
        </div>
      </div>
    </div>
  )
}
