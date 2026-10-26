import { useRef } from 'react'
import { Check } from 'lucide-react'
import styles from './RadioList.module.css'

/**
 * A list where exactly one row is selected, as in the settings panels. It is a radio group: one tab stop, Up and Down
 * (or Left and Right) move the choice, Home and End jump. The selected row carries a check badge.
 */
export default function RadioList({ label, items, value, onChange, tone = 'brand', layout = 'rows', horizontal = true, className = '' }) {
  const ref = useRef(null)
  const found = items.findIndex((item) => item.value === value)
  const index = Math.max(0, found)

  const choose = (next) => {
    const item = items[(next + items.length) % items.length]
    if (item.disabled) return
    onChange(item.value)
    requestAnimationFrame(() => ref.current?.querySelector('[aria-checked="true"]')?.focus())
  }

  const onKeyDown = (event) => {
    const keys = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: items.length - 1 }
    if (horizontal) Object.assign(keys, { ArrowRight: index + 1, ArrowLeft: index - 1 })
    if (!(event.key in keys)) return
    event.preventDefault()
    choose(keys[event.key])
  }

  return (
    <div ref={ref} className={`${styles.list} ${className}`.trim()} role="radiogroup" aria-label={label} data-layout={layout} data-tone={tone} onKeyDown={onKeyDown}>
      {items.map((item, position) => {
        const selected = item.value === value
        // One tab stop per list: the selected row, or the first when nothing in this list is selected.
        const tabbable = found === -1 ? position === 0 : selected
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            className={styles.row}
            aria-checked={selected}
            // A row drawn as a sample ("Aa") would otherwise be named by the sample, not by what it stands for.
            aria-label={item.render ? item.label : undefined}
            tabIndex={tabbable ? 0 : -1}
            onClick={() => onChange(item.value)}
          >
            <span className={styles.label}>
              {item.render ?? item.label}
              {item.detail && <span className={styles.detail}>{item.detail}</span>}
            </span>
            {selected && (
              <span className={styles.badge} aria-hidden="true">
                <Check size={12} strokeWidth={3} />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
