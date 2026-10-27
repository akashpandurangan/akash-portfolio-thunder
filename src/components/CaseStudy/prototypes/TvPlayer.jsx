import { useCallback, useEffect, useRef, useState } from 'react'
import { Captions, Gauge, Layers, Pause, Play, RotateCcw, SkipForward, Video } from 'lucide-react'
import { SETTINGS } from '../../../data/designSystemCaseStudy'
import { asset } from '../../../data/caseStudyAssets'
import OptionButton from './OptionButton'
import RadioList from './RadioList'
import SeekBar from './SeekBar'
import { SEEK_MODES } from './seekBarModel'
import Subtitle from './Subtitle'
import pv from './pv.module.css'
import styles from './TvPlayer.module.css'

const poster = asset('ott/prototype-poster.webp')
const MAX = SEEK_MODES.content.max

const OPTIONS = [
  { id: 'speed', label: 'Speed', icon: Gauge, panel: 'speed' },
  { id: 'quality', label: 'Video Quality', icon: Video, panel: 'quality' },
  { id: 'audio', label: 'Subtitles & Audio', icon: Captions, panel: 'audio' },
  { id: 'episodes', label: 'Episodes', icon: Layers, panel: 'episodes' },
  { id: 'next', label: 'Next Episode', icon: SkipForward },
]
const ROW_LENGTH = [4, OPTIONS.length] // row 0: restart, play or pause, next, seek bar. Row 1: the options.

const QUALITY = ['Auto', 'Low', 'Medium', 'High'].map((value) => ({ value, label: value }))
const AUDIO = ['Tamil', 'Telugu'].map((value) => ({ value, label: value }))
const SUBTITLES = ['Off', 'English', 'Tamil'].map((value) => ({ value, label: value }))
const SPEEDS = SETTINGS.speed.map((item) => ({ value: item.value, label: item.label, detail: item.value === 1 ? '1.0x' : `${item.value}x` }))
const EPISODES = [1, 2, 3, 4]

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/**
 * The TV player as a working prototype, driven the way a remote drives it: arrow keys move a visible focus through a
 * grid (the seek bar row, then the options), Enter selects, Escape or Back closes a panel and returns focus to the option
 * that opened it. The on-screen remote sends the same key events, so pointer users get the same behaviour.
 */
export default function TvPlayer() {
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(495)
  const [panel, setPanel] = useState(null)
  const [settings, setSettings] = useState({ audio: 'Tamil', subtitle: 'Off', quality: 'Auto', speed: 1 })
  const [episode, setEpisode] = useState(1)
  const [message, setMessage] = useState('')
  const frameRef = useRef(null)
  const panelRef = useRef(null)
  const openerRef = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setInterval(() => {
      setTime((current) => {
        const next = current + 0.5 * settings.speed
        if (next >= MAX) {
          setPlaying(false)
          return MAX
        }
        return next
      })
    }, 500)
    return () => window.clearInterval(timer)
  }, [playing, settings.speed])

  const update = (patch) => setSettings((current) => ({ ...current, ...patch }))
  const find = (r, c) => frameRef.current?.querySelector(`[data-tv="${r}-${c}"]`)

  // A TV always shows its focused item, however focus got there. :focus-visible is not enough: browsers drop it for focus
  // that a script moves after a mouse click, which is exactly how the on-screen remote works, so the screen marks it itself.
  const markFocus = (target) => {
    frameRef.current?.querySelectorAll('[data-tv-focus]').forEach((element) => element.removeAttribute('data-tv-focus'))
    target?.setAttribute('data-tv-focus', '')
  }

  const openPanel = (option, event) => {
    openerRef.current = event.currentTarget
    setPanel(option.panel)
  }
  const closePanel = useCallback(() => {
    setPanel(null)
    requestAnimationFrame(() => openerRef.current?.focus())
  }, [])

  // When a panel opens, focus goes into it: the selected row, or the first card of the episodes rail.
  useEffect(() => {
    if (!panel) return
    requestAnimationFrame(() => panelRef.current?.querySelector('[role="radio"][aria-checked="true"], [data-first]')?.focus())
  }, [panel])

  const press = (option, event) => {
    if (option.panel) openPanel(option, event)
    else {
      setEpisode((current) => current + 1)
      setTime(0)
      setMessage(`Playing episode ${episode + 1}`)
    }
  }

  // The focus grid. Left and Right belong to the seek bar while it is focused, so it can seek.
  const onKeyDown = (event) => {
    if (panel) return
    const item = event.target.closest('[data-tv]')
    if (!item) return
    const [r, c] = item.dataset.tv.split('-').map(Number)
    const onSeek = item.getAttribute('role') === 'slider'
    if (onSeek && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) return
    const target = { ArrowLeft: [r, c - 1], ArrowRight: [r, c + 1], ArrowUp: [r - 1, c], ArrowDown: [r + 1, c] }[event.key]
    if (!target) return
    event.preventDefault()
    const row = clamp(target[0], 0, ROW_LENGTH.length - 1)
    const col = clamp(target[1], 0, ROW_LENGTH[row] - 1)
    find(row, col)?.focus()
  }

  // Panels: Escape or Back closes; in the two-column audio panel Left and Right hop between the lists.
  const onPanelKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Backspace') {
      event.preventDefault()
      event.stopPropagation()
      closePanel()
      return
    }
    if (panel === 'audio' && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
      const lists = [...panelRef.current.querySelectorAll('[role="radiogroup"]')]
      const at = lists.findIndex((list) => list.contains(event.target))
      const next = lists[clamp(at + (event.key === 'ArrowRight' ? 1 : -1), 0, lists.length - 1)]
      if (next && next !== lists[at]) {
        event.preventDefault()
        next.querySelector('[aria-checked="true"]')?.focus()
      }
    }
    if (panel === 'episodes' && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
      const cards = [...panelRef.current.querySelectorAll('[data-card]')]
      const at = cards.indexOf(document.activeElement)
      if (at >= 0) {
        event.preventDefault()
        cards[clamp(at + (event.key === 'ArrowRight' ? 1 : -1), 0, cards.length - 1)].focus()
      }
    }
  }

  // The remote presses keys on whatever has focus inside the screen, so it behaves exactly like the keyboard. The first
  // press of a remote that has not been used yet only shows where the focus starts (the play button), as a TV does.
  const remote = (key) => {
    const last = lastFocus.current && frameRef.current?.contains(lastFocus.current) ? lastFocus.current : null
    const target = last ?? find(0, 1)
    if (!target) return
    target.focus({ preventScroll: true })
    markFocus(target)
    if (!last) return
    if (key === 'Enter') target.click()
    else target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
  }

  const seek = (next) => setTime(next)

  return (
    <div className={`${pv.tokens} ${styles.wrap}`}>
      <div className={styles.tv}>
        <div className={styles.screen}>
          <div
            ref={frameRef}
            className={styles.ui}
            role="group"
            aria-label="TV player prototype. Use the arrow keys, Enter and Escape, or the remote."
            onKeyDown={onKeyDown}
            onFocusCapture={(event) => {
              lastFocus.current = event.target
              markFocus(event.target)
            }}
            onBlurCapture={(event) => {
              if (!frameRef.current?.contains(event.relatedTarget)) markFocus(null)
            }}
          >
            <div className={pv.picture} style={{ '--poster': `url(${poster.src})` }} aria-hidden="true" />
            <Subtitle settings={{ ...settings, size: 'Medium', style: 1, position: 'Bottom' }} scale={1.9} />

            <header className={styles.title}>
              <h3>Series Name</h3>
              <p>S1 E{episode}</p>
            </header>

            <div className={styles.bottom}>
              <div className={styles.row}>
                <OptionButton label="Restart" icon={RotateCcw} shape="icon" variant="fill" data-tv="0-0" onPress={() => { setTime(0); setMessage('Restarted') }} />
                <OptionButton
                  label={playing ? 'Pause' : 'Play'}
                  icon={playing ? Pause : Play}
                  shape="icon"
                  variant="fill"
                  data-tv="0-1"
                  onPress={() => setPlaying((current) => !current)}
                />
                <OptionButton label="Next episode" icon={SkipForward} shape="icon" variant="fill" data-tv="0-2" onPress={() => { setEpisode((current) => current + 1); setTime(0); setMessage(`Playing episode ${episode + 1}`) }} />
                <SeekBar className={styles.seek} mode="content" value={time} onChange={seek} label="Seek" verticalKeys={false} handleProps={{ 'data-tv': '0-3' }} />
              </div>
              <div className={styles.row}>
                {OPTIONS.map((option, index) => (
                  <OptionButton
                    key={option.id}
                    label={option.label}
                    icon={option.icon}
                    variant="fill"
                    data-tv={`1-${index}`}
                    aria-haspopup={option.panel ? 'dialog' : undefined}
                    aria-expanded={option.panel ? panel === option.panel : undefined}
                    onPress={(event) => press(option, event)}
                  />
                ))}
              </div>
            </div>

            {panel && panel !== 'episodes' && (
              <div ref={panelRef} className={styles.panel} role="dialog" aria-label={panel === 'audio' ? 'Subtitles and audio' : panel === 'quality' ? 'Video quality' : 'Speed'} onKeyDown={onPanelKeyDown}>
                {panel === 'quality' && (
                  <section>
                    <h4>Video Quality</h4>
                    <RadioList label="Video quality" items={QUALITY} value={settings.quality} onChange={(quality) => update({ quality })} tone="accent" horizontal={false} />
                  </section>
                )}
                {panel === 'speed' && (
                  <section>
                    <h4>Speed</h4>
                    <RadioList label="Playback speed" items={SPEEDS} value={settings.speed} onChange={(speed) => update({ speed })} tone="accent" horizontal={false} />
                  </section>
                )}
                {panel === 'audio' && (
                  <div className={styles.columns}>
                    <section>
                      <h4>Audio</h4>
                      <RadioList label="Audio language" items={AUDIO} value={settings.audio} onChange={(audio) => update({ audio })} tone="accent" horizontal={false} />
                    </section>
                    <section>
                      <h4>Subtitle</h4>
                      <RadioList label="Subtitle language" items={SUBTITLES} value={settings.subtitle} onChange={(subtitle) => update({ subtitle })} tone="accent" horizontal={false} />
                    </section>
                  </div>
                )}
              </div>
            )}

            {panel === 'episodes' && (
              <div ref={panelRef} className={styles.rail} role="dialog" aria-label="Episodes" onKeyDown={onPanelKeyDown}>
                <h4>Episodes</h4>
                <ul>
                  {EPISODES.map((number) => (
                    <li key={number}>
                      <button
                        type="button"
                        className={styles.card}
                        data-card=""
                        data-first={number === episode ? '' : undefined}
                        aria-current={number === episode ? 'true' : undefined}
                        onClick={() => {
                          setEpisode(number)
                          setTime(0)
                          setMessage(`Playing episode ${number}`)
                          closePanel()
                        }}
                      >
                        <span className={styles.art} aria-hidden="true" />
                        <strong>Episode {number}</strong>
                        <span className={styles.meta}>25 Dec 2024 • 42min</span>
                        <span className={styles.about}>A young woman goes missing in the city, prompting a detective to investigate a shadowy underworld.</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <p className={styles.status} role="status" aria-live="polite">
          {message}
        </p>
      </div>

      <div className={styles.remote} role="group" aria-label="On-screen remote">
        <div className={styles.dpad}>
          <button type="button" aria-label="Up" onClick={() => remote('ArrowUp')} onMouseDown={(event) => event.preventDefault()} data-key="up" />
          <button type="button" aria-label="Left" onClick={() => remote('ArrowLeft')} onMouseDown={(event) => event.preventDefault()} data-key="left" />
          <button type="button" aria-label="Select" onClick={() => remote('Enter')} onMouseDown={(event) => event.preventDefault()} data-key="ok">
            OK
          </button>
          <button type="button" aria-label="Right" onClick={() => remote('ArrowRight')} onMouseDown={(event) => event.preventDefault()} data-key="right" />
          <button type="button" aria-label="Down" onClick={() => remote('ArrowDown')} onMouseDown={(event) => event.preventDefault()} data-key="down" />
        </div>
        <button type="button" className={styles.back} onClick={() => remote('Escape')} onMouseDown={(event) => event.preventDefault()}>
          Back
        </button>
      </div>
    </div>
  )
}
