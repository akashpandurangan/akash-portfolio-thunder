import { Block } from '../CaseStudy/ui/Section'
import { FOUNDATIONS } from '../../data/sonylivDesignSystem'
import styles from './DesignSystem.module.css'

const SPECIMEN = 'Maharani 4 — Rise, Rule, Revenge'
const BAR_MAX = 192 // the widest spacing bar, in px (space-16 is 64px, drawn at 3x)

/** "24/32 · 700" as the size, line height and weight of a type step. */
const parseType = (spec) => {
  const [sizes, weight] = spec.split(' · ')
  const [size, line] = sizes.split('/')
  return { fontSize: `${size}px`, lineHeight: `${line}px`, fontWeight: Number(weight) }
}

/**
 * The foundations the way the design system site documents them: the colour model and its three rules, every colour token as
 * a live swatch, the type scale set in its own sizes, then spacing, radius, elevation, iconography and layout.
 */
export default function Foundations() {
  const f = FOUNDATIONS

  return (
    <div className={styles.stack}>
      <Block title="Colour model" text={f.colourModel}>
        <ul className={styles.principles}>
          {f.principles.map((principle) => (
            <li key={principle.title}>
              <h4>{principle.title}</h4>
              <p>{principle.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {f.colour.map((group) => (
        <Block key={group.title} title={group.title} text={group.text}>
          <ul className={styles.swatches}>
            {group.items.map((item) => (
              <li key={item.cssVar} className={styles.swatch}>
                <span className={styles.chip} style={{ background: item.hex }} aria-hidden="true" />
                <span className={styles.swatchText}>
                  <span className={styles.swatchName}>
                    <strong>{item.name}</strong>
                    <code>{item.hex}</code>
                  </span>
                  <span className={styles.use}>{item.use}</span>
                </span>
              </li>
            ))}
          </ul>
          {group.note && <p className={styles.note}>{group.note}</p>}
        </Block>
      ))}

      <Block title="Typography" text={f.typeIntro}>
        <ul className={styles.typeScale}>
          {f.typeScale.map((step) => (
            <li key={step.name}>
              <span className={styles.specimen} style={parseType(step.spec)}>
                {SPECIMEN}
              </span>
              <span className={styles.typeMeta}>
                <strong>{step.name}</strong>
                <code>{step.spec}</code>
              </span>
              <span className={styles.use}>{step.use}</span>
            </li>
          ))}
        </ul>
        <ul className={styles.weights}>
          {f.weights.map((weight) => (
            <li key={weight.name}>
              <strong>{weight.name}</strong>
              <span>{weight.use}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Spacing" text={f.spacing.text}>
        <ul className={styles.table}>
          {f.spacing.items.map((item) => (
            <li key={item.name}>
              <span className={styles.tableName}>
                <strong>{item.name}</strong>
                <code>{item.px}</code>
              </span>
              <span className={styles.bar} style={{ width: Math.max(2, Math.min(BAR_MAX, Number.parseFloat(item.px) * 3)) }} aria-hidden="true" />
              <span className={styles.use}>{item.use}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Radius" text={f.radius.text}>
        <ul className={styles.table}>
          {f.radius.items.map((item) => (
            <li key={item.name}>
              <span className={styles.tableName}>
                <strong>{item.name}</strong>
                <code>{item.px}</code>
              </span>
              <span className={styles.corner} style={{ borderRadius: item.px }} aria-hidden="true" />
              <span className={styles.use}>{item.use}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Elevation" text={f.elevation.text}>
        <ul className={styles.plain}>
          {f.elevation.items.map((item) => (
            <li key={item.name}>
              <strong>
                <code>{item.name}</code>
              </strong>
              <span className={styles.use}>{item.use}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Iconography" text={f.iconography.text} />

      <Block title="Layout" text={f.layout.text}>
        <ul className={styles.tiles}>
          {f.layout.items.map((item) => (
            <li key={item.name}>
              <strong>{item.value}</strong>
              <span className={styles.tileName}>{item.name}</span>
              <span className={styles.use}>{item.use}</span>
            </li>
          ))}
        </ul>
      </Block>
    </div>
  )
}
