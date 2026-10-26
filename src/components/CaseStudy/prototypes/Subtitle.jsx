import { SETTINGS } from '../../../data/designSystemCaseStudy'
import styles from './Subtitle.module.css'

const SAMPLE = {
  English: { lang: 'en', text: 'Subtitles appear here' },
  Tamil: { lang: 'ta', text: 'வசனங்கள் இங்கே தோன்றும்' },
  Hindi: { lang: 'hi', text: 'उपशीर्षक यहाँ दिखाई देंगे' },
}

/** A line of subtitle in the chosen language, size, style and position, drawn over the player picture. */
export default function Subtitle({ settings, scale = 1 }) {
  const sample = SAMPLE[settings.subtitle]
  if (!sample) return null
  const size = [15, 19, 24][Math.max(0, SETTINGS.subtitleSizes.indexOf(settings.size))]

  return (
    <p
      className={styles.subtitle}
      data-style={settings.style}
      data-position={settings.position.toLowerCase()}
      lang={sample.lang}
      style={{ fontSize: `${size * scale}px` }}
    >
      <span>{sample.text}</span>
    </p>
  )
}
