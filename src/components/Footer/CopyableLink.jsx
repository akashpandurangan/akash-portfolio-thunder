import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import styles from './Footer.module.css'

const COPIED_MS = 1600 // how long the button shows its "done" tick

/** Writes to the clipboard; falls back to a hidden textarea where the async API is unavailable (e.g. plain http). */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const previous = document.activeElement
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
    document.body.appendChild(area)
    area.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    area.remove()
    previous?.focus?.()
    return ok
  }
}

/**
 * A footer contact line (mail / phone) with a copy button. The button fades in to the left of the text on hover or
 * keyboard focus (it is always visible where there is no hover, or no room to its left) and reports through `onCopy`.
 */
export default function CopyableLink({ href, text, label, onCopy }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleCopy = async () => {
    const ok = await copyText(text)
    if (ok) {
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), COPIED_MS)
    }
    onCopy(ok)
  }

  return (
    <li className={styles.copyRow}>
      <a className={styles.link} href={href}>
        {text}
      </a>
      <button type="button" className={styles.copyButton} onClick={handleCopy} aria-label={`Copy ${label}`} data-copied={copied}>
        {copied ? <Check size={16} strokeWidth={2.2} aria-hidden="true" /> : <Copy size={16} strokeWidth={1.8} aria-hidden="true" />}
      </button>
    </li>
  )
}
