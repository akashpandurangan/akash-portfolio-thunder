import { useState } from 'react'
import { GripVertical } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Section from '../CaseStudy/ui/Section'
import { asset } from '../../data/caseStudyAssets'
import { BEFORE_AFTER } from '../../data/kpostCaseStudy'
import styles from './BeforeAfter.module.css'

/**
 * The old UI and the new UI in one frame. The new UI is the picture; the old UI sits over its left part, up to the handle.
 * The handle is a range input laid over the frame, so a pointer drags it, a finger drags it, and the arrow keys, Home and
 * End move it, with the position announced in words.
 */
export default function BeforeAfter() {
  const { title, lede, old, new: current } = BEFORE_AFTER
  const [position, setPosition] = useState(50)
  const before = asset(old.image)
  const after = asset(current.image)

  return (
    <Section id="before-after" title={title} lede={lede}>
      <Reveal className={styles.compare} style={{ '--position': `${position}%`, '--ratio': `${after.width} / ${after.height}` }}>
        <img className={styles.after} src={after.src} width={after.width} height={after.height} alt={current.alt} loading="lazy" decoding="async" draggable="false" />
        <img className={styles.before} src={before.src} width={before.width} height={before.height} alt={old.alt} loading="lazy" decoding="async" draggable="false" />

        <span className={`${styles.chip} ${styles.chipOld}`} aria-hidden="true">
          {old.label}
        </span>
        <span className={`${styles.chip} ${styles.chipNew}`} aria-hidden="true">
          {current.label}
        </span>

        <input
          className={styles.range}
          type="range"
          min="0"
          max="100"
          step="1"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Compare the old UI and the new UI"
          aria-valuetext={`${position}% old UI, ${100 - position}% new UI`}
        />
        <span className={styles.handle} aria-hidden="true">
          <span className={styles.grip}>
            <GripVertical size={18} />
          </span>
        </span>
      </Reveal>
    </Section>
  )
}
