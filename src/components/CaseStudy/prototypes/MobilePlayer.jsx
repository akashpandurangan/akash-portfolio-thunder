import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, Cast, ChevronsLeft, ChevronsRight, Maximize, Pause, Play, Settings } from 'lucide-react'
import { asset } from '../../../data/caseStudyAssets'
import SeekBar from './SeekBar'
import { SEEK_MODES } from './seekBarModel'
import SettingsPanel from './SettingsPanel'
import { DEFAULT_SETTINGS } from './settingsModel'
import Subtitle from './Subtitle'
import pv from './pv.module.css'
import styles from './MobilePlayer.module.css'

const poster = asset('ott/prototype-poster.webp')
const MAX = SEEK_MODES.content.max
const INTRO_END = 90 // the intro runs for the first 90 seconds
const HIDE_AFTER = 3000

/**
 * The mobile player as a working prototype: tap the picture for the controls (they hide again while playing), skip the
 * intro, scrub, open the settings sheet, and let the episode end to see the next-up card. The settings sheet is the same
 * component as in the playground, so choices (speed, subtitles) apply here.
 */
export default function MobilePlayer() {
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(30)
  const [shown, setShown] = useState(true)
  const [sheet, setSheet] = useState(false)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [ended, setEnded] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const frameRef = useRef(null)
  const gearRef = useRef(null)
  const hideTimer = useRef(0)

  const reveal = useCallback(() => {
    setShown(true)
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => {
      // Controls stay while a control inside them has focus, so a keyboard user never loses their place.
      if (!frameRef.current?.contains(document.activeElement)) setShown(false)
    }, HIDE_AFTER)
  }, [])

  useEffect(() => () => window.clearTimeout(hideTimer.current), [])

  // Real time, at the chosen speed.
  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setInterval(() => {
      setTime((current) => {
        const next = current + 0.5 * settings.speed
        if (next >= MAX) {
          setPlaying(false)
          setEnded(true)
          return MAX
        }
        return next
      })
    }, 500)
    return () => window.clearInterval(timer)
  }, [playing, settings.speed])

  const togglePlay = () => {
    if (ended) {
      setEnded(false)
      setDismissed(false)
      setTime(0)
    }
    setPlaying((current) => !current)
    reveal()
  }
  const skip = (seconds) => {
    setTime((current) => Math.min(MAX, Math.max(0, current + seconds)))
    reveal()
  }
  const seek = (next) => {
    setTime(next)
    setEnded(false)
    setDismissed(false)
    reveal()
  }
  const closeSheet = () => {
    setSheet(false)
    requestAnimationFrame(() => gearRef.current?.focus())
  }

  const showNext = ended && !dismissed
  const controls = shown && !showNext

  return (
    <div className={`${pv.tokens} ${styles.phone}`}>
      <div className={styles.screen}>
        <div
          ref={frameRef}
          className={styles.player}
          data-controls={controls}
          onPointerMove={reveal}
          onFocus={() => setShown(true)}
          onKeyDown={reveal}
        >
          <div className={pv.picture} style={{ '--poster': `url(${poster.src})` }} aria-hidden="true" />
          <button type="button" className={styles.tapArea} onClick={() => (shown ? setShown(false) : reveal())} aria-label={shown ? 'Hide controls' : 'Show controls'} tabIndex={-1} />
          <Subtitle settings={playing ? settings : { ...settings, subtitle: 'Off' }} scale={0.62} />

          <div className={styles.controls} aria-hidden={!controls || undefined} inert={!controls || undefined}>
            <div className={styles.top}>
              <button type="button" className={`${styles.iconButton} ${pv.focusable}`} aria-label="Back">
                <ArrowLeft size={22} aria-hidden="true" />
              </button>
              <span className={styles.spacer} />
              <button type="button" className={`${styles.iconButton} ${pv.focusable}`} aria-label="Cast">
                <Cast size={20} aria-hidden="true" />
              </button>
              <button
                ref={gearRef}
                type="button"
                className={`${styles.iconButton} ${pv.focusable}`}
                aria-label="Settings"
                aria-expanded={sheet}
                onClick={() => setSheet(true)}
              >
                <Settings size={20} aria-hidden="true" />
              </button>
              <button type="button" className={`${styles.iconButton} ${pv.focusable}`} aria-label="Fullscreen">
                <Maximize size={20} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.center}>
              <button type="button" className={`${styles.iconButton} ${pv.focusable}`} aria-label="Rewind 10 seconds" onClick={() => skip(-10)}>
                <ChevronsLeft size={26} aria-hidden="true" />
              </button>
              <button type="button" className={`${styles.playButton} ${pv.focusable}`} aria-label={playing ? 'Pause' : 'Play'} onClick={togglePlay}>
                {playing ? <Pause size={30} fill="currentColor" aria-hidden="true" /> : <Play size={30} fill="currentColor" aria-hidden="true" />}
              </button>
              <button type="button" className={`${styles.iconButton} ${pv.focusable}`} aria-label="Forward 10 seconds" onClick={() => skip(10)}>
                <ChevronsRight size={26} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.bottom}>
              {time < INTRO_END && (
                <button type="button" className={`${styles.skip} ${pv.focusable}`} onClick={() => seek(INTRO_END)}>
                  Skip Intro
                </button>
              )}
              <SeekBar className={styles.seek} mode="content" value={time} onChange={seek} timeFormat="remaining" label="Seek" />
            </div>
          </div>

          {showNext && (
            <div className={styles.next} role="group" aria-label="Next episode">
              <p>
                Recommended next in <strong>5 sec</strong>
              </p>
              <h3>Series Name, Episode 2</h3>
              <div className={styles.nextActions}>
                <button type="button" className={`${styles.nextCancel} ${pv.focusable}`} onClick={() => setDismissed(true)}>
                  Cancel
                </button>
                <button type="button" className={`${styles.nextPlay} ${pv.focusable}`} onClick={togglePlay}>
                  Play Now
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.details}>
          <h3>Series Name</h3>
          <p>S1 E1 · 42 min</p>
          <p className={styles.note}>
            Audio {settings.audio}, subtitles {settings.subtitle}, speed {settings.speed}x.
          </p>
        </div>

        <div className={styles.episodes}>
          <h4>Episodes</h4>
          <ul>
            {[1, 2].map((number) => (
              <li key={number}>
                <button type="button" className={styles.episode} aria-current={number === 1 ? 'true' : undefined}>
                  <span className={styles.art} aria-hidden="true" />
                  <span className={styles.episodeText}>
                    <strong>Episode {number}</strong>
                    <span>25 Dec 2024 • 42min</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {sheet && (
          <div className={styles.sheet}>
            <button type="button" className={styles.scrim} onClick={closeSheet} aria-label="Close settings" tabIndex={-1} />
            <SettingsPanel
              settings={settings}
              onChange={(patch) => setSettings((current) => ({ ...current, ...patch }))}
              layout="menu"
              variant="full"
              orientation="portrait"
              onClose={closeSheet}
            />
          </div>
        )}
      </div>
    </div>
  )
}
