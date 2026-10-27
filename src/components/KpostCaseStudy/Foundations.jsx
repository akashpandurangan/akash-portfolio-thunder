import { useState } from 'react'
import Reveal from '../ui/Reveal'
import Section, { Block } from '../CaseStudy/ui/Section'
import Figure, { FigureGrid } from '../CaseStudy/ui/Figure'
import Segmented from '../CaseStudy/ui/Segmented'
import { FOUNDATIONS } from '../../data/kpostCaseStudy'
import styles from './Foundations.module.css'

function Swatch({ name, hex }) {
  return (
    <li className={styles.swatch}>
      <span className={styles.chip} style={{ '--swatch': hex }} aria-hidden="true" />
      <span className={styles.swatchName}>{name}</span>
      <code className={styles.swatchHex}>{hex}</code>
    </li>
  )
}

/**
 * The style guide of the frame, set live rather than pasted: the palette as swatches, the Inter scale as specimens (desktop
 * or mobile), the four button states drawn with the guide's fills, and the icon set.
 */
export default function Foundations() {
  const { title, lede, colors, type, buttons, icons } = FOUNDATIONS
  const [scale, setScale] = useState('desktop')

  return (
    <Section id="foundations" title={title} lede={lede}>
      <Block title={colors.title} text={colors.intro}>
        <div className={styles.colorGroups}>
          {colors.groups.map((group) => (
            <Reveal key={group.name} className={styles.colorGroup}>
              <h4 className={styles.groupTitle}>{group.name}</h4>
              <ul className={styles.swatches}>
                {group.swatches.map((swatch) => (
                  <Swatch key={swatch.name} {...swatch} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block title={type.title} text={type.intro}>
        <Segmented
          label="Scale"
          value={scale}
          onChange={setScale}
          options={[
            { value: 'desktop', label: 'Desktop' },
            { value: 'mobile', label: 'Mobile' },
          ]}
        />
        <Reveal as="ul" className={styles.specimens} aria-label={`Inter type scale, ${scale}`}>
          {type.rows.map((row) => {
            const size = row[scale]
            return (
              <li key={row.name} className={styles.specimen}>
                <span className={styles.spec}>
                  <strong>{row.name}</strong>
                  <span>
                    {row.weight >= 700 ? 'Bold' : row.weight >= 500 ? 'Medium' : 'Regular'} · {size} / {row.line}
                  </span>
                </span>
                <span className={styles.sample} style={{ fontSize: size, fontWeight: row.weight, lineHeight: row.line }}>
                  {row.sample}
                </span>
              </li>
            )
          })}
        </Reveal>
        <p className={styles.note}>{type.rows.find((row) => row.note)?.note}</p>
      </Block>

      <Block title={buttons.title} text={buttons.intro}>
        <Reveal as="ul" className={styles.buttons} aria-label="Button states">
          {buttons.states.map((state) => (
            <li key={state.id} className={styles.buttonItem}>
              <span className={styles.button} data-state={state.id} style={{ '--fill': state.fill }} aria-hidden="true">
                Submit
              </span>
              <span className={styles.stateName}>{state.label}</span>
            </li>
          ))}
        </Reveal>
      </Block>

      <Block title={icons.title} text={icons.intro}>
        <FigureGrid>
          <Figure {...icons.figure} span="full" />
        </FigureGrid>
      </Block>
    </Section>
  )
}
