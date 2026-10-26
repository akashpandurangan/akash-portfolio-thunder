import { useId } from 'react'
import styles from './Toggle.module.css'

/** An on/off switch for the prototype settings (a button with role="switch", so it works with Space and Enter). */
export default function Toggle({ label, checked, onChange, disabled = false }) {
  const id = useId()
  return (
    <button
      id={id}
      type="button"
      role="switch"
      className={styles.toggle}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.knob} />
      </span>
      <span>{label}</span>
    </button>
  )
}
