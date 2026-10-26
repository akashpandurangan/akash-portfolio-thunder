import { Flame, Play } from 'lucide-react'
import styles from './MediaCard.module.css'

/** Card widths from the specification (standard cards, XS to L). */
const CARD_WIDTHS = { XS: 262, S: 409, M: 555, L: 703 }

/**
 * The card component: a media tile with optional layers (badge, play button, progress bar), in four sizes, standard or
 * compact, at any of the nine aspect ratios. The flame is the neutral placeholder the specification itself uses.
 */
export default function MediaCard({ size = 'L', type = 'standard', ratio = '16:9', state = 'interactive', badge = true, progress = true, play = true, title = 'Title goes here' }) {
  const [rw, rh] = ratio.split(':').map(Number)
  const pinned = state !== 'interactive'

  return (
    <button
      type="button"
      className={styles.card}
      data-type={type}
      data-state={pinned ? state : undefined}
      data-pinned={pinned || undefined}
      style={{ '--card-w': `${CARD_WIDTHS[size]}px`, '--ratio': `${rw} / ${rh}` }}
      tabIndex={pinned ? -1 : 0}
    >
      <span className={styles.media}>
        <Flame className={styles.flame} strokeWidth={1.25} aria-hidden="true" />
        {badge && <span className={styles.badge}>Free</span>}
        {play && (
          <span className={styles.play} aria-hidden="true">
            <Play size={size === 'XS' ? 14 : 18} fill="currentColor" />
          </span>
        )}
        {progress && (
          <span className={styles.progress} aria-hidden="true">
            <span />
          </span>
        )}
        {type === 'compact' && <span className={styles.overlayTitle}>{title}</span>}
      </span>
      {type === 'standard' && <span className={styles.title}>{title}</span>}
    </button>
  )
}
