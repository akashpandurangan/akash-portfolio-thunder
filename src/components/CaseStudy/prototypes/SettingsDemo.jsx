import { useRef, useState } from 'react'
import { Settings } from 'lucide-react'
import { asset } from '../../../data/caseStudyAssets'
import Segmented from '../ui/Segmented'
import SettingsPanel from './SettingsPanel'
import { DEFAULT_SETTINGS, qualityShort, speedLabel } from './settingsModel'
import Subtitle from './Subtitle'
import Workbench from './Workbench'
import pv from './pv.module.css'
import styles from './SettingsDemo.module.css'

const poster = asset('ott/prototype-poster.webp')

export default function SettingsDemo() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [layout, setLayout] = useState('menu')
  const [variant, setVariant] = useState('full')
  const [orientation, setOrientation] = useState('portrait')
  const [open, setOpen] = useState(true)
  const [report, setReport] = useState('')
  const opener = useRef(null)

  const update = (patch) => setSettings((current) => ({ ...current, ...patch }))
  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => opener.current?.focus())
  }

  return (
    <Workbench
      title="Player settings"
      description="The settings panel as a working component. Choose audio, subtitles and appearance, quality and speed; the preview shows what you picked. Switch the layout, header and orientation to see each form from the specification."
      built="video player setting › portrait and landscape, full and classic, and the tabbed version 2 with its audio, subtitles, appearance, video, speed and report an issue panels; option list states."
      stageClassName={styles.benchStage}
      controlsBelow
      controls={
        <>
          <Segmented
            label="Layout"
            value={layout}
            onChange={setLayout}
            options={[
              { value: 'menu', label: 'Menu' },
              { value: 'tabs', label: 'Tabs' },
            ]}
          />
          <Segmented
            label="Header"
            value={variant}
            onChange={setVariant}
            options={[
              { value: 'full', label: 'Full' },
              { value: 'classic', label: 'Classic' },
            ]}
          />
          <Segmented
            label="Orientation"
            value={orientation}
            onChange={setOrientation}
            options={[
              { value: 'portrait', label: 'Portrait' },
              { value: 'landscape', label: 'Landscape' },
            ]}
          />
          <button type="button" className={styles.reset} onClick={() => setSettings(DEFAULT_SETTINGS)}>
            Reset selections
          </button>
        </>
      }
    >
      <div className={styles.layout}>
        <div className={styles.preview}>
          <div className={pv.picture} style={{ '--poster': `url(${poster.src})` }} aria-hidden="true" />
          <div className={styles.chips} aria-label="Current playback settings">
            <span>{speedLabel(settings.speed)}</span>
            <span>{qualityShort(settings.quality)}</span>
          </div>
          <Subtitle settings={settings} scale={0.9} />
          <button
            ref={opener}
            type="button"
            className={`${styles.gear} ${pv.focusable}`}
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-label={open ? 'Close settings' : 'Open settings'}
          >
            <Settings size={20} aria-hidden="true" />
          </button>
          <p className={styles.report} role="status" aria-live="polite">
            {report && `Report started: ${report}`}
          </p>
        </div>

        <div className={styles.panelSlot}>
          {open ? (
            <SettingsPanel
              key={`${layout}-${variant}-${orientation}`}
              settings={settings}
              onChange={update}
              layout={layout}
              variant={variant}
              orientation={orientation}
              onClose={close}
              onReport={setReport}
            />
          ) : (
            <button type="button" className={styles.reopen} onClick={() => setOpen(true)}>
              Open settings
            </button>
          )}
        </div>
      </div>
    </Workbench>
  )
}
