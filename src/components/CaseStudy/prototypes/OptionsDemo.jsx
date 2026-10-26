import { useRef, useState } from 'react'
import { Settings, SkipForward, Video, Volume2 } from 'lucide-react'
import { asset } from '../../../data/caseStudyAssets'
import Segmented from '../ui/Segmented'
import OptionButton from './OptionButton'
import Workbench from './Workbench'
import pv from './pv.module.css'
import styles from './OptionsDemo.module.css'

const poster = asset('ott/prototype-poster.webp')

const OPTIONS = [
  { id: 'quality', label: 'Video Quality', icon: Video },
  { id: 'audio', label: 'Audio and Subtitles', icon: Volume2 },
  { id: 'setting', label: 'Setting', icon: Settings },
  { id: 'next', label: 'Next Episode', icon: SkipForward },
]

export default function OptionsDemo() {
  const [variant, setVariant] = useState('fill')
  const [shape, setShape] = useState('label')
  const [state, setState] = useState('interactive')
  const [position, setPosition] = useState('center')
  const [nextDisabled, setNextDisabled] = useState(false)
  const [active, setActive] = useState(0)
  const [pressing, setPressing] = useState(null)
  const [message, setMessage] = useState('Press an option to see it respond.')
  const refs = useRef([])
  const timer = useRef(0)

  const enabled = OPTIONS.map((option, index) => (option.id === 'next' && nextDisabled ? -1 : index)).filter((index) => index >= 0)

  const press = (option) => {
    setPressing(option.id)
    setMessage(`Opens ${option.label}`)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setPressing(null), 160)
  }

  // A remote moves focus with the arrow keys, so the toolbar does too (one tab stop, roving focus).
  const onKeyDown = (event) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1 }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      const target = event.key === 'Home' ? enabled[0] : enabled[enabled.length - 1]
      setActive(target)
      refs.current[target]?.focus()
      return
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    const at = enabled.indexOf(active)
    const target = enabled[(at + keys[event.key] + enabled.length) % enabled.length]
    setActive(target)
    refs.current[target]?.focus()
  }

  const justify = { left: 'flex-start', center: 'center', right: 'flex-end' }[position]
  const pinned = state !== 'interactive'

  return (
    <Workbench
      title="Player options"
      description="Chips and icon buttons for audio, subtitles, quality and the next episode. Tab into the row, then move with the arrow keys the way a remote would. Pin a state to inspect it."
      built="player options › option style (fill, standard, outline × default, focused, pressed, disabled), icon button, options position (left, centre, right) and the list of options."
      controls={
        <>
          <Segmented
            label="Style"
            value={variant}
            onChange={setVariant}
            options={[
              { value: 'fill', label: 'Fill' },
              { value: 'standard', label: 'Standard' },
              { value: 'outline', label: 'Outline' },
            ]}
          />
          <Segmented
            label="Shape"
            value={shape}
            onChange={setShape}
            options={[
              { value: 'label', label: 'Labelled' },
              { value: 'icon', label: 'Icon only' },
            ]}
          />
          <Segmented
            label="State"
            value={state}
            onChange={setState}
            options={[
              { value: 'interactive', label: 'Live' },
              { value: 'default', label: 'Default' },
              { value: 'focused', label: 'Focused' },
              { value: 'pressed', label: 'Pressed' },
              { value: 'disabled', label: 'Disabled' },
            ]}
          />
          <Segmented
            label="Position"
            value={position}
            onChange={setPosition}
            options={[
              { value: 'left', label: 'Left' },
              { value: 'center', label: 'Centre' },
              { value: 'right', label: 'Right' },
            ]}
          />
          <Segmented
            label="Next Episode"
            value={nextDisabled ? 'off' : 'on'}
            onChange={(next) => {
              setNextDisabled(next === 'off')
              if (next === 'off' && active === 3) setActive(0)
            }}
            disabled={pinned}
            options={[
              { value: 'on', label: 'Available' },
              { value: 'off', label: 'Unavailable' },
            ]}
          />
        </>
      }
    >
      <div className={pv.picture} style={{ '--poster': `url(${poster.src})` }} aria-hidden="true" />
      <div className={styles.stage}>
        <div className={styles.row} style={{ justifyContent: justify }} role="toolbar" aria-label="Player options" onKeyDown={pinned ? undefined : onKeyDown}>
          {OPTIONS.map((option, index) => (
            <OptionButton
              key={option.id}
              buttonRef={(node) => (refs.current[index] = node)}
              label={option.label}
              icon={option.icon}
              variant={variant}
              shape={shape}
              state={state}
              disabled={option.id === 'next' && nextDisabled}
              pressing={pressing === option.id}
              tabIndex={pinned ? -1 : index === active ? 0 : -1}
              onFocus={() => setActive(index)}
              onPress={() => press(option)}
            />
          ))}
        </div>
        <p className={styles.status} role="status" aria-live="polite">
          {pinned ? `Showing every option in the ${state} state.` : message}
        </p>
      </div>
    </Workbench>
  )
}
