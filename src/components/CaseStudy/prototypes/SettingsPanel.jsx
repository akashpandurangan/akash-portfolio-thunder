import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Captions, ChevronRight, CirclePlay, Gauge, Globe, Info, Languages, Video, Volume2, X } from 'lucide-react'
import { SETTINGS } from '../../../data/designSystemCaseStudy'
import RadioList from './RadioList'
import { qualityShort, speedLabel } from './settingsModel'
import styles from './SettingsPanel.module.css'

const toItems = (values) => values.map((value) => ({ value, label: value }))
const AUDIO_ITEMS = toItems(SETTINGS.audio)
const LANGUAGE_ITEMS = toItems(SETTINGS.subtitleLanguage)
const VIDEO_ITEMS = SETTINGS.video.map((item) => ({ value: item.label, label: item.label, detail: item.detail }))
const SPEED_ITEMS = SETTINGS.speed.map((item) => ({ value: item.value, label: item.label, detail: item.value === 1 ? '1.0x' : `${item.value}x` }))
const SIZE_ITEMS = SETTINGS.subtitleSizes.map((size, index) => ({
  value: size,
  label: size,
  render: <span style={{ fontSize: 13 + index * 3 }}>Aa</span>,
}))
const STYLE_ITEMS = SETTINGS.subtitleStyles.map((name, index) => ({
  value: index,
  label: name,
  render: <span className={styles.swatch} data-style={index}>Aa</span>,
}))
const POSITION_ITEMS = toItems(['Top', 'Bottom'])
const ISSUE_ICONS = [Globe, Captions, CirclePlay, Volume2]

const TITLES = { audio: 'Audio', subtitles: 'Subtitles', appearance: 'Subtitles', video: 'Video', speed: 'Speed', report: 'Report an issue' }
const ROOT_ROWS = [
  { id: 'audio', label: 'Audio', icon: Languages },
  { id: 'subtitles', label: 'Subtitles', icon: Captions },
  { id: 'video', label: 'Video', icon: Video },
  { id: 'speed', label: 'Speed', icon: Gauge },
]
const TABS = [
  { id: 'audio', label: 'Audio' },
  { id: 'subtitles', label: 'Subtitles' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'video', label: 'Video' },
  { id: 'speed', label: 'Speed' },
  { id: 'report', label: 'Report an issue' },
]

/** Underlined tabs with arrow-key navigation, used for the tab layout and for Language / Appearance. */
function UnderTabs({ label, tabs, value, onChange }) {
  const ref = useRef(null)
  const enabled = tabs.filter((tab) => !tab.disabled)

  const onKeyDown = (event) => {
    const at = enabled.findIndex((tab) => tab.id === value)
    const keys = { ArrowRight: at + 1, ArrowLeft: at - 1, Home: 0, End: enabled.length - 1 }
    if (!(event.key in keys)) return
    event.preventDefault()
    const next = enabled[(keys[event.key] + enabled.length) % enabled.length]
    onChange(next.id)
    requestAnimationFrame(() => ref.current?.querySelector('[aria-selected="true"]')?.focus())
  }

  return (
    <div ref={ref} className={styles.tabs} role="tablist" aria-label={label} onKeyDown={onKeyDown}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          className={styles.tab}
          aria-selected={tab.id === value}
          tabIndex={tab.id === value ? 0 : -1}
          disabled={tab.disabled}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

/**
 * The player settings, in every form the specification has: a menu that opens one screen at a time, or tabs; the full
 * header (back arrow and close) or the classic one; and as a portrait sheet or a landscape panel. The selections live in
 * `settings`, so whatever hosts the panel can show their effect.
 */
export default function SettingsPanel({ settings, onChange, layout = 'menu', variant = 'full', orientation = 'portrait', onClose, onReport }) {
  const [screen, setScreen] = useState('root')
  const [subtitleTab, setSubtitleTab] = useState('subtitles')
  const [tab, setTab] = useState('audio')
  const headingRef = useRef(null)
  const mounted = useRef(false)
  const subtitlesOff = settings.subtitle === 'Off'

  // Appearance only applies while subtitles are on; if they are switched off, the Language tab takes over.
  const subtitleTabNow = subtitlesOff ? 'subtitles' : subtitleTab
  const tabNow = subtitlesOff && tab === 'appearance' ? 'subtitles' : tab

  const sub = layout === 'menu' && screen !== 'root'
  const activeTab = layout === 'tabs' ? tabNow : screen === 'subtitles' ? subtitleTabNow : screen
  const title = layout === 'tabs' ? 'Settings' : screen === 'root' ? 'Settings' : TITLES[screen]

  // After moving to another screen, put focus on its heading so a keyboard or screen-reader user lands in the right place.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    headingRef.current?.focus({ preventScroll: true })
  }, [screen])

  const back = () => setScreen('root')
  const closeOrBack = () => (variant === 'classic' && sub ? back() : onClose?.())

  const onKeyDown = (event) => {
    if (event.key !== 'Escape') return
    event.stopPropagation()
    if (sub) back()
    else onClose?.()
  }

  const body = () => {
    switch (activeTab) {
      case 'audio':
        return <RadioList label="Audio language" items={AUDIO_ITEMS} value={settings.audio} onChange={(audio) => onChange({ audio })} />
      case 'subtitles':
        return <RadioList label="Subtitle language" items={LANGUAGE_ITEMS} value={settings.subtitle} onChange={(subtitle) => onChange({ subtitle })} />
      case 'appearance':
        return (
          <div className={styles.appearance}>
            <div>
              <h3 className={styles.group}>Size</h3>
              <RadioList label="Subtitle size" layout="chips" items={SIZE_ITEMS} value={settings.size} onChange={(size) => onChange({ size })} />
            </div>
            <div>
              <h3 className={styles.group}>Style</h3>
              <RadioList label="Subtitle style" layout="chips" items={STYLE_ITEMS} value={settings.style} onChange={(style) => onChange({ style })} />
            </div>
            <div>
              <h3 className={styles.group}>Position</h3>
              <RadioList label="Subtitle position" layout="chips" items={POSITION_ITEMS} value={settings.position} onChange={(position) => onChange({ position })} />
            </div>
          </div>
        )
      case 'video':
        return <RadioList label="Video quality" items={VIDEO_ITEMS} value={settings.quality} onChange={(quality) => onChange({ quality })} />
      case 'speed':
        return <RadioList label="Playback speed" items={SPEED_ITEMS} value={settings.speed} onChange={(speed) => onChange({ speed })} />
      case 'report':
        return (
          <ul className={styles.issues}>
            {SETTINGS.issues.map((issue, index) => {
              const Icon = ISSUE_ICONS[index]
              return (
                <li key={issue.label}>
                  <button type="button" className={styles.issue} onClick={() => onReport?.(issue.label)}>
                    <Icon size={18} aria-hidden="true" />
                    <span>
                      <strong>{issue.label}</strong>
                      <span>{issue.detail}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )
      default:
        return null
    }
  }

  const values = { audio: settings.audio, subtitles: settings.subtitle, video: qualityShort(settings.quality), speed: speedLabel(settings.speed) }

  return (
    <section className={styles.panel} data-orientation={orientation} data-variant={variant} aria-label="Player settings" onKeyDown={onKeyDown}>
      {orientation === 'portrait' && <span className={styles.handle} aria-hidden="true" />}

      <header className={styles.header}>
        {variant === 'full' && sub && (
          <button type="button" className={styles.icon} onClick={back} aria-label="Back to settings">
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
        )}
        <h2 ref={headingRef} className={styles.title} tabIndex={-1}>
          {title}
        </h2>
        <button type="button" className={styles.icon} onClick={closeOrBack} aria-label={variant === 'classic' && sub ? 'Back to settings' : 'Close settings'}>
          <X size={20} aria-hidden="true" />
        </button>
      </header>

      {layout === 'tabs' && (
        <UnderTabs
          label="Settings sections"
          tabs={TABS.map((item) => ({ ...item, disabled: item.id === 'appearance' && subtitlesOff }))}
          value={tabNow}
          onChange={setTab}
        />
      )}

      {layout === 'menu' && screen === 'root' && (
        <div className={styles.root}>
          <ul>
            {ROOT_ROWS.map((row) => (
              <li key={row.id}>
                <button type="button" className={styles.rootRow} onClick={() => setScreen(row.id)}>
                  <row.icon size={18} aria-hidden="true" />
                  <span className={styles.rootLabel}>{row.label}</span>
                  <span className={styles.rootValue}>{values[row.id]}</span>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className={`${styles.rootRow} ${styles.reportRow}`} onClick={() => setScreen('report')}>
            <Info size={18} aria-hidden="true" />
            <span className={styles.rootLabel}>Report an issue</span>
          </button>
        </div>
      )}

      {layout === 'menu' && screen === 'subtitles' && (
        <UnderTabs
          label="Subtitle settings"
          tabs={[
            { id: 'subtitles', label: 'Language' },
            { id: 'appearance', label: 'Appearance', disabled: subtitlesOff },
          ]}
          value={subtitleTabNow}
          onChange={setSubtitleTab}
        />
      )}

      {!(layout === 'menu' && screen === 'root') && <div className={styles.body}>{body()}</div>}
    </section>
  )
}
