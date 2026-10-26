import { useId, useState } from 'react'
import Segmented from '../ui/Segmented'
import Toggle from '../ui/Toggle'
import { FOUNDATIONS } from '../../../data/designSystemCaseStudy'
import MediaCard from './MediaCard'
import Workbench from './Workbench'
import styles from './CardsDemo.module.css'

const RATIOS = FOUNDATIONS.spacing.ratios

export default function CardsDemo() {
  const [size, setSize] = useState('M')
  const [type, setType] = useState('standard')
  const [ratio, setRatio] = useState('16:9')
  const [state, setState] = useState('interactive')
  const [badge, setBadge] = useState(true)
  const [progress, setProgress] = useState(true)
  const [play, setPlay] = useState(true)
  const ratioId = useId()

  return (
    <Workbench
      title="Media card"
      description="One component for every card. Change the size, type and aspect ratio, switch the supporting layers on and off, and focus it with the keyboard to see the focus ring."
      built="card › card size (XS, S, M, L), type (standard, compact), states (default, focused), aspect ratio, badge, play button and progress bar layers."
      stageClassName={styles.stage}
      controls={
        <>
          <Segmented
            label="Size"
            value={size}
            onChange={setSize}
            options={['XS', 'S', 'M', 'L'].map((value) => ({ value, label: value }))}
          />
          <Segmented
            label="Type"
            value={type}
            onChange={setType}
            options={[
              { value: 'standard', label: 'Standard' },
              { value: 'compact', label: 'Compact' },
            ]}
          />
          <div className={styles.select}>
            <label htmlFor={ratioId}>Aspect ratio</label>
            <select id={ratioId} value={ratio} onChange={(event) => setRatio(event.target.value)}>
              {RATIOS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <Segmented
            label="State"
            value={state}
            onChange={setState}
            options={[
              { value: 'interactive', label: 'Live' },
              { value: 'default', label: 'Default' },
              { value: 'focused', label: 'Focused' },
            ]}
          />
          <div className={styles.layers}>
            <span>Layers</span>
            <Toggle label="Badge" checked={badge} onChange={setBadge} />
            <Toggle label="Play button" checked={play} onChange={setPlay} />
            <Toggle label="Progress bar" checked={progress} onChange={setProgress} />
          </div>
        </>
      }
    >
      <div className={styles.canvas}>
        <MediaCard size={size} type={type} ratio={ratio} state={state} badge={badge} progress={progress} play={play} />
      </div>
    </Workbench>
  )
}
