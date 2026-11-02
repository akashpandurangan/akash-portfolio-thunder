import { FOUNDATIONS } from '../../data/sonylivDesignSystem'
import { DESIGN_SYSTEM } from '../../data/sonylivCaseStudy'
import styles from './DesignSystem.module.css'

const SPECIMEN = 'Maharani 4'

/** "24/32 · 700" as the size, line height and weight of a type step. */
const parseType = (spec) => {
  const [sizes, weight] = spec.split(' · ')
  const [size, line] = sizes.split('/')
  return { fontSize: `${size}px`, lineHeight: `${line}px`, fontWeight: Number(weight) }
}

const COLOURS = FOUNDATIONS.colour.flatMap((group) => group.items)

/** The colours the page shows, from the site's own tokens. "premium" is the site's purple gradient (its start and end). */
function pickedSwatches(picks) {
  const find = (cssVar) => COLOURS.find((item) => item.cssVar === cssVar)
  return picks
    .map((pick) => {
      if (pick === 'premium') {
        const start = find('--color-premium-start')
        const end = find('--color-premium-end')
        return start && end ? { name: 'premium', hex: `${start.hex} → ${end.hex}`, background: `linear-gradient(135deg, ${start.hex}, ${end.hex})` } : null
      }
      const item = find(pick)
      return item ? { name: item.name, hex: item.hex, background: item.hex } : null
    })
    .filter(Boolean)
}

/**
 * The foundations at a glance: the colours that matter, as swatches, and five steps of the type scale set in their own
 * sizes. The rest of the foundations (every colour, spacing, radius, elevation) is on the design system site.
 */
export default function Foundations() {
  const { colourPicks, typePicks, typeNote } = DESIGN_SYSTEM
  const swatches = pickedSwatches(colourPicks)
  const steps = typePicks.map((name) => FOUNDATIONS.typeScale.find((step) => step.name === name)).filter(Boolean)

  return (
    <div className={styles.glance}>
      <div className={styles.glanceColumn}>
        <h4 className={styles.label}>Colour</h4>
        <ul className={styles.swatches}>
          {swatches.map((swatch) => (
            <li key={swatch.name} className={styles.swatch}>
              <span className={styles.chip} style={{ background: swatch.background }} aria-hidden="true" />
              <span className={styles.swatchText}>
                <strong>{swatch.name}</strong>
                <code>{swatch.hex}</code>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.glanceColumn}>
        <h4 className={styles.label}>
          Typography <span>{typeNote}</span>
        </h4>
        <ul className={styles.typeScale}>
          {steps.map((step) => (
            <li key={step.name}>
              <span className={styles.specimen} style={parseType(step.spec)}>
                {SPECIMEN}
              </span>
              <span className={styles.typeMeta}>
                <strong>{step.name}</strong>
                <code>{step.spec}</code>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
