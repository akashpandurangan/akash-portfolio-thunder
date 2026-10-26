import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import styles from './DemoVideo.module.css'

/** True for visitors who asked for less motion or less data: the video then waits for them to press play. */
const holdBack = () =>
  typeof IntersectionObserver === 'undefined' ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  Boolean(navigator.connection?.saveData)

/**
 * A muted, looping demonstration video.
 * - Nothing is downloaded until it is within 400px of the screen (or the visitor presses play).
 * - It plays while at least 40% of it is visible, and pauses when it scrolls away or the tab is hidden.
 * - The poster shows until the first frame, and stays if the file can't play, so the box never changes size.
 * - A real button toggles playback; a visitor's pause is respected until they press play again.
 */
export default function DemoVideo({ src, poster, width, height, title, caption }) {
  const frameRef = useRef(null)
  const videoRef = useRef(null)
  const [armed, setArmed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(() => holdBack())
  const pausedByUser = useRef(userPaused)
  const syncRef = useRef(null)

  useEffect(() => {
    pausedByUser.current = userPaused
    syncRef.current?.()
  }, [userPaused])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame || typeof IntersectionObserver === 'undefined') return undefined
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true)
          near.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    near.observe(frame)
    return () => near.disconnect()
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    const video = videoRef.current
    if (!armed || !frame || !video) return undefined

    video.muted = true // React does not reflect the attribute reliably; autoplay needs the property
    let visible = false

    const sync = () => {
      if (visible && !document.hidden && !pausedByUser.current) video.play()?.catch(() => {})
      else video.pause()
    }

    const watch = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        sync()
      },
      { threshold: 0.4 },
    )
    watch.observe(frame)

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    video.addEventListener('playing', onPlay)
    video.addEventListener('pause', onPause)
    document.addEventListener('visibilitychange', sync)
    syncRef.current = sync

    return () => {
      syncRef.current = null
      watch.disconnect()
      video.pause()
      video.removeEventListener('playing', onPlay)
      video.removeEventListener('pause', onPause)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [armed])

  const toggle = () => {
    setArmed(true)
    setUserPaused((paused) => !paused)
  }

  return (
    <figure className={styles.figure}>
      <div ref={frameRef} className={styles.frame} style={{ aspectRatio: `${width} / ${height}` }}>
        <video
          ref={videoRef}
          className={styles.video}
          src={armed ? src : undefined}
          poster={poster}
          preload={armed ? 'auto' : 'none'}
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-label={title}
          tabIndex={-1}
        />
        <button type="button" className={styles.toggle} onClick={toggle} aria-pressed={playing}>
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          <span>{playing ? 'Pause video' : 'Play video'}</span>
        </button>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}
