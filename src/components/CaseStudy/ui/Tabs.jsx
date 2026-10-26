import { useId, useRef } from 'react'
import styles from './Tabs.module.css'

/**
 * Tabs that follow the WAI-ARIA pattern: one tab stop, arrow keys (and Home / End) move between tabs and select them.
 * `render(tab)` draws the active panel, so inactive panels cost nothing.
 */
export default function Tabs({ label, tabs, value, onChange, render, size = 'md', className = '' }) {
  const base = useId()
  const listRef = useRef(null)
  const index = Math.max(0, tabs.findIndex((tab) => tab.id === value))

  const select = (next) => {
    const tab = tabs[(next + tabs.length) % tabs.length]
    onChange(tab.id)
    requestAnimationFrame(() => listRef.current?.querySelector('[aria-selected="true"]')?.focus())
  }

  const onKeyDown = (event) => {
    const keys = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: tabs.length - 1 }
    if (!(event.key in keys)) return
    event.preventDefault()
    select(keys[event.key])
  }

  return (
    <div className={`${styles.tabs} ${className}`.trim()} data-size={size}>
      <div ref={listRef} className={styles.list} role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`${base}-tab-${tab.id}`}
            type="button"
            role="tab"
            className={styles.tab}
            aria-selected={tab.id === value}
            aria-controls={`${base}-panel-${tab.id}`}
            tabIndex={tab.id === value ? 0 : -1}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) =>
        tab.id === value ? (
          <div
            key={tab.id}
            id={`${base}-panel-${tab.id}`}
            className={styles.panel}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${tab.id}`}
            tabIndex={-1}
          >
            {render(tab)}
          </div>
        ) : null,
      )}
    </div>
  )
}
