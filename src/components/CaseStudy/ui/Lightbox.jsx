import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Maximize2, Minimize2, X } from 'lucide-react'
import { LightboxContext } from './lightboxContext'
import styles from './Lightbox.module.css'

/*
 * A native <dialog>: it traps focus, closes on Escape and returns focus to the control that opened it. The image starts
 * fitted to the window and can be switched to its real size, which is how the small print in the Figma exports is read.
 */
export function LightboxProvider({ children }) {
  const dialogRef = useRef(null)
  const [item, setItem] = useState(null)
  const [actual, setActual] = useState(false)

  const open = useCallback((next) => {
    setActual(false)
    setItem(next)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !item) return undefined
    if (!dialog.open) dialog.showModal()
    document.documentElement.dataset.lightbox = 'open'
    return () => {
      delete document.documentElement.dataset.lightbox
    }
  }, [item])

  const close = () => dialogRef.current?.close()
  const value = useMemo(() => open, [open])

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={item ? `${item.title}, full size` : 'Full size image'}
        onClose={() => setItem(null)}
        onClick={(event) => event.target === event.currentTarget && close()}
      >
        {item && (
          <div className={styles.panel}>
            <div className={styles.bar}>
              <p className={styles.title}>
                <strong>{item.title}</strong>
                {item.caption && <span>{item.caption}</span>}
              </p>
              <div className={styles.actions}>
                <button type="button" className={styles.button} onClick={() => setActual((current) => !current)} aria-pressed={actual}>
                  {actual ? <Minimize2 size={16} aria-hidden="true" /> : <Maximize2 size={16} aria-hidden="true" />}
                  {actual ? 'Fit to window' : 'Actual size'}
                </button>
                <button type="button" className={styles.button} onClick={close} autoFocus>
                  <X size={16} aria-hidden="true" />
                  Close
                </button>
              </div>
            </div>
            <div className={styles.viewport} data-native-scroll="" data-actual={actual} tabIndex={0}>
              <img
                className={styles.image}
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.alt}
                style={actual ? { width: item.width } : undefined}
              />
            </div>
          </div>
        )}
      </dialog>
    </LightboxContext.Provider>
  )
}
