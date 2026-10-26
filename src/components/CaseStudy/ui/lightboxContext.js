import { createContext, useContext } from 'react'

export const LightboxContext = createContext(() => {})

/** Opens an image at full size. Figures call this; the dialog itself lives once, at the top of the page. */
export const useLightbox = () => useContext(LightboxContext)
