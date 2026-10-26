import { useEffect, useRef, useState } from 'react'
import { asset } from '../../../data/caseStudyAssets'
import { SEEK_MODES, formatTime } from './seekBarModel'
import styles from './SeekBar.module.css'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const poster = asset('ott/prototype-poster.webp')

/**
 * The seek bar, built from the Figma parts: handle, timer, live tag, ad tag, ad markers and played position. It is a
 * real slider: drag it, or focus the handle and use the arrow keys (5 seconds, 10 with Shift), Home and End.
 * Colour carries the mode: white for content, orange for live, yellow for an ad.
 */
export default function SeekBar({ mode, value, onChange, timeFormat = 'elapsed', timerPosition = 'beside', label = 'Seek', verticalKeys = true, handleProps, className = '' }) {
  const { max, step, markers } = SEEK_MODES[mode]
  const ratio = clamp(value / max, 0, 1)
  const trackRef = useRef(null)
  const handleRef = useRef(null)
  const chipTimer = useRef(0)
  const [dragging, setDragging] = useState(false)
  const [hover, setHover] = useState(null)
  const [chip, setChip] = useState(null)

  useEffect(() => () => window.clearTimeout(chipTimer.current), [])

  const atLiveEdge = mode === 'live' && value >= max - 1
  const preview = dragging ? ratio : hover

  const fromPointer = (event) => {
    const rect = trackRef.current.getBoundingClientRect()
    return clamp((event.clientX - rect.left) / rect.width, 0, 1) * max
  }

  const showChip = (text) => {
    window.clearTimeout(chipTimer.current)
    setChip(text)
    chipTimer.current = window.setTimeout(() => setChip(null), 900)
  }

  const onPointerDown = (event) => {
    trackRef.current.setPointerCapture(event.pointerId)
    setDragging(true)
    onChange(fromPointer(event))
    handleRef.current?.focus({ preventScroll: true })
  }
  const onPointerMove = (event) => {
    const rect = trackRef.current.getBoundingClientRect()
    setHover(clamp((event.clientX - rect.left) / rect.width, 0, 1))
    if (dragging) onChange(fromPointer(event))
  }
  const onPointerUp = () => setDragging(false)

  const onKeyDown = (event) => {
    const jump = event.shiftKey ? step * 2 : step
    // On a TV, Up and Down move between rows of controls, so the host can switch them off here.
    const moves = verticalKeys ? { ArrowRight: jump, ArrowUp: jump, ArrowLeft: -jump, ArrowDown: -jump } : { ArrowRight: jump, ArrowLeft: -jump }
    if (event.key in moves) {
      event.preventDefault()
      const delta = moves[event.key]
      onChange(clamp(value + delta, 0, max))
      showChip(delta > 0 ? `${jump}s »` : `« ${jump}s`)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      onChange(event.key === 'Home' ? 0 : max)
    }
  }

  const valueText =
    mode === 'content'
      ? `${formatTime(value)} of ${formatTime(max)}`
      : mode === 'live'
        ? atLiveEdge
          ? 'Live'
          : `${formatTime(max - value)} behind live`
        : `${formatTime(max - value)} left in the ad`

  // ---- timers and tags, placed by the "timer position" variant
  const elapsed = <strong>{formatTime(value)}</strong>
  const total = <span>{formatTime(max)}</span>
  const timer =
    mode === 'content' ? (
      timeFormat === 'single' ? (
        <span className={styles.time}>{elapsed}</span>
      ) : timeFormat === 'remaining' ? (
        <span className={styles.time}>
          <strong>-{formatTime(max - value)}</strong>
        </span>
      ) : timeFormat === 'total' ? (
        <span className={styles.time}>
          {total} / {elapsed}
        </span>
      ) : (
        <span className={styles.time}>
          {elapsed} / {total}
        </span>
      )
    ) : mode === 'live' ? (
      <span className={styles.time}>
        <strong>-{formatTime(max - value)}</strong>
      </span>
    ) : (
      <span className={styles.time}>
        <strong>-{formatTime(max - value)}</strong>
      </span>
    )

  const tag =
    mode === 'live' ? (
      <button
        type="button"
        className={styles.liveTag}
        data-live={atLiveEdge}
        onClick={() => onChange(max)}
        aria-label={atLiveEdge ? 'Live' : 'Go to live'}
        aria-disabled={atLiveEdge}
      >
        <span className={styles.liveDot} aria-hidden="true" />
        Live
      </button>
    ) : mode === 'ad' ? (
      <span className={styles.adTag}>Ad</span>
    ) : null

  return (
    <div className={`${styles.root} ${className}`.trim()} data-mode={mode} data-dragging={dragging}>
      {timerPosition === 'above' && (
        <div className={styles.above}>
          {mode === 'content' && (
            <>
              <span className={styles.time}>{timeFormat === 'total' ? total : elapsed}</span>
              {timeFormat !== 'single' && <span className={styles.time}>{timeFormat === 'total' ? elapsed : total}</span>}
            </>
          )}
          {mode === 'live' && (
            <>
              {timer}
              {tag}
            </>
          )}
          {mode === 'ad' && (
            <>
              <span className={styles.adCount}>
                {tag}
                <span>Ad 1 of 2</span>
              </span>
              {timer}
            </>
          )}
        </div>
      )}

      <div className={styles.row}>
        {timerPosition === 'beside' && mode !== 'content' && (mode === 'live' ? timer : tag)}
        <div
          ref={trackRef}
          className={styles.track}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={() => setHover(null)}
        >
          <span className={styles.rail} />
          <span className={styles.fill} style={{ width: `${ratio * 100}%` }} />
          {markers.map((marker) => (
            <span key={marker} className={styles.marker} style={{ left: `${marker * 100}%` }} aria-hidden="true" />
          ))}
          <span
            ref={handleRef}
            className={styles.handle}
            style={{ left: `${ratio * 100}%` }}
            role="slider"
            tabIndex={0}
            aria-label={label}
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={Math.round(value)}
            aria-valuetext={valueText}
            onKeyDown={onKeyDown}
            {...handleProps}
          />
          {preview !== null && (
            <span className={styles.preview} style={{ '--at': preview }} aria-hidden="true">
              <span
                className={styles.thumb}
                style={{ backgroundImage: `url(${poster.src})`, backgroundPosition: `${preview * 100}% ${30 + preview * 40}%` }}
              />
              <span className={styles.previewTime}>{formatTime(preview * max)}</span>
            </span>
          )}
          {chip && (
            <span className={styles.chip} style={{ left: `${ratio * 100}%` }} aria-hidden="true">
              {chip}
            </span>
          )}
        </div>
        {timerPosition === 'beside' && (mode === 'content' ? timer : mode === 'live' ? tag : timer)}
      </div>
    </div>
  )
}
