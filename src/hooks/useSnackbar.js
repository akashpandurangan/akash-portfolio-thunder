import { useCallback, useEffect, useRef, useState } from 'react'

const VISIBLE_MS = 2200 // how long a message stays up
const CLEAR_MS = 350 // after it has faded out, the text is removed so the next message is announced afresh

/** State for a single snackbar: `show(message, tone)` displays it and hides it again on its own. */
export function useSnackbar() {
  const [snack, setSnack] = useState({ message: '', open: false, tone: 'success', nonce: 0 })
  const timers = useRef([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const show = useCallback(
    (message, tone = 'success') => {
      clearTimers()
      setSnack((current) => ({ message, tone, open: true, nonce: current.nonce + 1 }))
      timers.current = [
        setTimeout(() => setSnack((current) => ({ ...current, open: false })), VISIBLE_MS),
        setTimeout(() => setSnack((current) => ({ ...current, message: '' })), VISIBLE_MS + CLEAR_MS),
      ]
    },
    [clearTimers],
  )

  useEffect(() => clearTimers, [clearTimers])

  return [snack, show]
}
