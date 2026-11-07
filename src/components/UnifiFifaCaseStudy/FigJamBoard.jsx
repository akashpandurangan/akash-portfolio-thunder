import { useCallback, useEffect, useRef, useState } from 'react'
import { Block } from '../CaseStudy/ui/Section'
import { FIGJAM } from '../../data/unifiFifaCaseStudy'
import styles from './FigJamBoard.module.css'

/*
 * "Explore the Design Process": the project's FigJam board, shown with Figma's official embed (embed.figma.com, view only).
 *
 * What the embed gives us, tested in a real browser, and what it does not:
 *  - Native, working inside the page: drag to pan, the + / − buttons, Ctrl/⌘ + scroll (and a trackpad pinch) to zoom, and
 *    Figma's own fullscreen button. A plain scroll over the board scrolls the page, so the board never traps the reader.
 *  - Not available: the embed is a cross-origin iframe and has no zoom or pan API (the only message it sends the page is
 *    INITIAL_LOAD), so the zoom level cannot be read or set from here. There is therefore no zoom toolbar or percentage in
 *    this component; the board's own controls are the zoom controls.
 *  - What this component adds, all of it real: lazy loading, a loading state, a notice when the board is slow or blocked,
 *    "Reset view" (reloads the embed at its starting view), fullscreen for the whole viewer (the Fullscreen API, or a
 *    full-window fallback where a browser has none, such as iPhone Safari), and a tap-to-explore step on touch screens so
 *    a finger on the board does not stop the page from scrolling.
 */

const FIGMA_HOST = 'figma.com'
const SLOW_AFTER_MS = 20000 // the embed's document has not even loaded
const UNCONFIRMED_AFTER_LOAD_MS = 15000 // the document loaded but the board has not said it is ready (an error page, say)

const isFigmaOrigin = (origin) => {
  try {
    const host = new URL(origin).hostname
    return host === FIGMA_HOST || host.endsWith(`.${FIGMA_HOST}`)
  } catch {
    return false
  }
}

const isReadyMessage = (data) => data === 'INITIAL_LOAD' || (data && typeof data === 'object' && data.type === 'INITIAL_LOAD')

const requestFullscreen = (node) => (node.requestFullscreen ?? node.webkitRequestFullscreen)?.call(node)
const exitFullscreen = () => (document.exitFullscreen ?? document.webkitExitFullscreen)?.call(document)
const currentFullscreenElement = () => document.fullscreenElement ?? document.webkitFullscreenElement ?? null

function Icon({ name }) {
  const paths = {
    reset: <path d="M3.5 8a4.5 4.5 0 1 1 1.4 3.25M3.5 3.5V8H8" />,
    expand: <path d="M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10" />,
    collapse: <path d="M6 2.5V6H2.5M10 6h3.5M10 6V2.5M10 13.5V10h3.5M6 10v3.5M6 10H2.5" />,
    done: <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />,
  }
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

/** The viewer: a bar with the controls this page can honestly offer, and the embedded board under it. */
function Viewer() {
  const viewerRef = useRef(null)
  const frameRef = useRef(null)
  const timers = useRef([])

  // Near the screen once: the board starts loading (at once where IntersectionObserver does not exist).
  const [armed, setArmed] = useState(() => typeof IntersectionObserver === 'undefined')
  const [attempt, setAttempt] = useState(0) // bumped by "Reset view" and "Try again": a fresh embed
  const [phase, setPhase] = useState('loading') // loading | ready | slow
  const [fullscreen, setFullscreen] = useState(false)
  const [windowed, setWindowed] = useState(false) // the full-window fallback
  const [touch] = useState(() => window.matchMedia('(pointer: coarse)').matches)
  const [engaged, setEngaged] = useState(false) // touch only: the board has been tapped and takes the finger

  const full = fullscreen || windowed

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }

  // Start loading the board a little before it comes on screen; it is a heavy embed.
  useEffect(() => {
    const node = viewerRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // The embed tells the page when the board is ready. Anything else, including Figma's own access message, is the embed's.
  useEffect(() => {
    if (!armed) return undefined
    const onMessage = (event) => {
      if (event.source !== frameRef.current?.contentWindow || !isFigmaOrigin(event.origin)) return
      if (isReadyMessage(event.data)) {
        clearTimers()
        setPhase('ready')
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [armed])

  // A fresh embed starts a fresh wait.
  useEffect(() => {
    if (!armed) return undefined
    timers.current.push(window.setTimeout(() => setPhase((current) => (current === 'loading' ? 'slow' : current)), SLOW_AFTER_MS))
    return clearTimers
  }, [armed, attempt])

  const onFrameLoad = () => {
    // The document is in and the board normally announces itself within moments. If it does not, what is showing is probably
    // an error page from Figma (a private board, a blocked request): stop covering it and say what could be wrong.
    timers.current.push(window.setTimeout(() => setPhase((current) => (current === 'ready' ? current : 'slow')), UNCONFIRMED_AFTER_LOAD_MS))
  }

  // The real Fullscreen API changes the state from outside (Esc, the browser's own button), so follow it.
  useEffect(() => {
    const sync = () => setFullscreen(currentFullscreenElement() === viewerRef.current)
    document.addEventListener('fullscreenchange', sync)
    document.addEventListener('webkitfullscreenchange', sync)
    return () => {
      document.removeEventListener('fullscreenchange', sync)
      document.removeEventListener('webkitfullscreenchange', sync)
    }
  }, [])

  // The full-window fallback: scroll is locked while it is open and Esc closes it.
  useEffect(() => {
    if (!windowed) return undefined
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    const onKey = (event) => event.key === 'Escape' && setWindowed(false)
    document.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [windowed])

  const toggleFullscreen = useCallback(async () => {
    const node = viewerRef.current
    if (!node) return
    if (windowed) {
      setWindowed(false)
      return
    }
    if (currentFullscreenElement() === node) {
      await exitFullscreen()
      return
    }
    try {
      if (!(node.requestFullscreen || node.webkitRequestFullscreen)) throw new Error('no fullscreen api')
      await requestFullscreen(node)
    } catch {
      setWindowed(true)
    }
  }, [windowed])

  const resetView = () => {
    clearTimers()
    setPhase('loading')
    setAttempt((count) => count + 1)
  }

  useEffect(() => clearTimers, [])

  const showCover = armed && phase === 'loading'
  // Touch screens: the board only takes the finger after a tap, so the page can still be scrolled past it.
  const interactive = !touch || engaged || full

  return (
    <div ref={viewerRef} className={styles.viewer} data-full={full ? 'true' : undefined}>
      <div className={styles.bar}>
        <p className={styles.barTitle}>
          <span className={styles.live} aria-hidden="true" />
          <span className={styles.barName}>FigJam board</span>
          <span className={styles.badge}>View only</span>
        </p>
        <div className={styles.actions}>
          {touch && engaged && !full && (
            <button type="button" className={styles.action} onClick={() => setEngaged(false)}>
              <Icon name="done" />
              Done
            </button>
          )}
          <button type="button" className={styles.action} onClick={resetView} title="Reload the board at its starting view" aria-label="Reset view">
            <Icon name="reset" />
            <span className={styles.label}>Reset view</span>
          </button>
          <button type="button" className={styles.action} onClick={toggleFullscreen} aria-pressed={full} aria-label={full ? 'Exit fullscreen' : 'Fullscreen'}>
            <Icon name={full ? 'collapse' : 'expand'} />
            <span className={styles.label}>{full ? 'Exit fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      <div className={styles.stage}>
        {armed && (
          <iframe
            key={attempt}
            ref={frameRef}
            className={styles.frame}
            src={FIGJAM.embedUrl}
            title={`${FIGJAM.name}: the FigJam design-process board (view only)`}
            allow="fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={onFrameLoad}
          />
        )}

        {showCover && (
          <div className={styles.cover} role="status">
            <span className={styles.spinner} aria-hidden="true" />
            Loading the FigJam board…
          </div>
        )}

        {armed && phase === 'slow' && (
          <div className={styles.notice} role="status">
            <p>
              <strong>The board hasn&rsquo;t finished loading.</strong> It needs a connection to Figma and a link that anyone can view, and an ad
              or privacy blocker can stop it. If Figma shows its own message above, that is the reason.
            </p>
            <div className={styles.noticeActions}>
              <button type="button" className={styles.noticeButton} onClick={resetView}>
                Try again
              </button>
              <a className={styles.noticeLink} href={FIGJAM.boardUrl} target="_blank" rel="noopener noreferrer">
                Open in Figma
              </a>
            </div>
          </div>
        )}

        {!interactive && (
          <button type="button" className={styles.gate} onClick={() => setEngaged(true)}>
            <span>Tap to explore the board</span>
          </button>
        )}
      </div>
    </div>
  )
}

/** The chapter block: heading, the sentence under it, the viewer, and one line on how to move around the board. */
export default function FigJamBoard() {
  return (
    <div className={styles.wrap}>
      <Block title={FIGJAM.title} text={FIGJAM.text}>
        <Viewer />
        <p className={styles.hint}>
          Drag to pan. Zoom with the + and − buttons on the board, with Ctrl or ⌘ and scroll, or by pinching. A plain scroll moves the page, not
          the board.
        </p>
      </Block>
    </div>
  )
}
