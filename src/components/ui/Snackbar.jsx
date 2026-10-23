import { createPortal } from 'react-dom'
import { Check, Info } from 'lucide-react'
import styles from './Snackbar.module.css'

/**
 * A small message pill at the bottom of the screen. The live region is always mounted (and only its text changes),
 * so screen readers announce every message; it never takes focus or blocks clicks.
 */
export default function Snackbar({ message, open, tone = 'success', nonce }) {
  return createPortal(
    <div className={styles.snackbar} data-open={open} data-tone={tone} role="status" aria-live="polite" aria-atomic="true">
      {message && (
        <span key={nonce} className={styles.message}>
          <span className={styles.icon} aria-hidden="true">
            {tone === 'error' ? <Info size={14} strokeWidth={2.4} /> : <Check size={14} strokeWidth={2.8} />}
          </span>
          {message}
        </span>
      )}
    </div>,
    document.body,
  )
}
