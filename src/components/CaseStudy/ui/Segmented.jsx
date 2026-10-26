import { useId, useRef } from 'react'
import styles from './Segmented.module.css'

/**
 * A single-choice control for the prototype settings. It is a radio group: one tab stop, arrows move the choice.
 * `label` names the group for screen readers and is shown above it unless `hideLabel` is set.
 */
export default function Segmented({ label, options, value, onChange, hideLabel = false, disabled = false }) {
  const labelId = useId()
  const ref = useRef(null)
  const index = Math.max(0, options.findIndex((option) => option.value === value))

  const move = (next) => {
    const option = options[(next + options.length) % options.length]
    onChange(option.value)
    requestAnimationFrame(() => ref.current?.querySelector('[aria-checked="true"]')?.focus())
  }

  const onKeyDown = (event) => {
    const keys = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: options.length - 1 }
    if (!(event.key in keys)) return
    event.preventDefault()
    move(keys[event.key])
  }

  return (
    <div className={styles.field}>
      <span id={labelId} className={hideLabel ? 'visually-hidden' : styles.label}>
        {label}
      </span>
      <div ref={ref} className={styles.group} role="radiogroup" aria-labelledby={labelId} onKeyDown={onKeyDown}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            className={styles.option}
            aria-checked={option.value === value}
            tabIndex={option.value === value ? 0 : -1}
            disabled={disabled || option.disabled}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
