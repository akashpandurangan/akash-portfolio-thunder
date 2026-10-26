import { useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { asset } from '../../../data/caseStudyAssets'
import Segmented from '../ui/Segmented'
import SeekBar from './SeekBar'
import { SEEK_MODES } from './seekBarModel'
import Workbench from './Workbench'
import pv from './pv.module.css'
import styles from './SeekBarDemo.module.css'

const poster = asset('ott/prototype-poster.webp')
const START = { content: 495, live: 7200, ad: 15 } // 8:15 of 42:00, 23:43 behind live, 15 seconds into the ad

export default function SeekBarDemo() {
  const [mode, setMode] = useState('content')
  const [timeFormat, setTimeFormat] = useState('elapsed')
  const [timerPosition, setTimerPosition] = useState('beside')
  const [values, setValues] = useState(START)
  const [playing, setPlaying] = useState(false)

  const setValue = (next) => setValues((current) => ({ ...current, [mode]: next }))

  // Real time: every half second the position moves by half a second. Content and ads stop at their end.
  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setInterval(() => {
      setValues((current) => {
        const { max } = SEEK_MODES[mode]
        const next = Math.min(max, current[mode] + 0.5)
        if (next >= max && mode !== 'live') setPlaying(false)
        return { ...current, [mode]: next }
      })
    }, 500)
    return () => window.clearInterval(timer)
  }, [playing, mode])

  const changeMode = (next) => {
    setPlaying(false)
    setMode(next)
  }

  return (
    <Workbench
      title="Seek bar"
      description="Drag it, hover it for a preview, or tab to the handle and step with the arrow keys. Colour tells you the mode: white for content, orange for live, yellow for an ad."
      built="seek bar › content, live and ad progress bar, handle, timer runtime, live tag, ad tag and ad markers; seek thumbnail › seek step chips."
      controls={
        <>
          <Segmented
            label="Mode"
            value={mode}
            onChange={changeMode}
            options={[
              { value: 'content', label: 'Content' },
              { value: 'live', label: 'Live' },
              { value: 'ad', label: 'Ad' },
            ]}
          />
          <Segmented
            label="Timer format"
            value={timeFormat}
            onChange={setTimeFormat}
            disabled={mode !== 'content'}
            options={[
              { value: 'elapsed', label: 'Elapsed first' },
              { value: 'total', label: 'Total first' },
              { value: 'single', label: 'Time only' },
            ]}
          />
          <Segmented
            label="Timer position"
            value={timerPosition}
            onChange={setTimerPosition}
            options={[
              { value: 'beside', label: 'Beside' },
              { value: 'above', label: 'Above' },
            ]}
          />
          <p className={styles.hint}>
            Keys: <kbd>←</kbd> <kbd>→</kbd> step 5 seconds (1 in an ad), <kbd>Shift</kbd> doubles it, <kbd>Home</kbd> and <kbd>End</kbd> jump to the ends.
          </p>
        </>
      }
    >
      <div className={pv.picture} style={{ '--poster': `url(${poster.src})` }} aria-hidden="true" />
      <div className={styles.stage}>
        <button
          type="button"
          className={`${styles.play} ${pv.focusable}`}
          onClick={() => setPlaying((current) => !current)}
          aria-label={playing ? 'Pause' : 'Play'}
          aria-pressed={playing}
        >
          {playing ? <Pause size={28} fill="currentColor" aria-hidden="true" /> : <Play size={28} fill="currentColor" aria-hidden="true" />}
        </button>
        <div className={styles.bar}>
          <SeekBar mode={mode} value={values[mode]} onChange={setValue} timeFormat={timeFormat} timerPosition={timerPosition} />
        </div>
      </div>
    </Workbench>
  )
}
