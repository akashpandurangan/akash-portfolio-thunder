import Reveal from '../ui/Reveal'
import Section, { Block } from './ui/Section'
import { FigureRow } from './ui/Figure'
import Tag from '../ui/Tag'
import { FOUNDATIONS } from '../../data/designSystemCaseStudy'
import styles from './Foundations.module.css'

function Swatch({ name, hex, use }) {
  return (
    <li className={styles.swatch}>
      <span className={styles.chip} style={{ '--swatch': hex }} aria-hidden="true" />
      <span className={styles.swatchText}>
        <span className={styles.swatchName}>
          {name}
          <code>{hex}</code>
        </span>
        <span className={styles.swatchUse}>{use}</span>
      </span>
    </li>
  )
}

export default function Foundations() {
  const { lede, colors, type, spacing, states, conventions } = FOUNDATIONS
  const maxWidth = Math.max(...spacing.cardWidths.map((card) => card.width))

  return (
    <Section id="foundations" title="Design foundations" lede={lede}>
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
        <Reveal className={styles.specimens}>
          {type.scales.map((scale) => (
            <div key={scale.token} className={styles.specimen}>
              <div className={styles.specimenMeta}>
                <code>{scale.token}</code>
                <span>
                  {scale.family} {scale.weight === 500 ? 'Medium' : scale.weight}
                </span>
                <span>{scale.size}px</span>
                <span>Line height {scale.line}</span>
              </div>
              <p
                className={styles.sample}
                style={{ fontSize: `min(${scale.size}px, 9vw)`, fontWeight: scale.weight, lineHeight: scale.line }}
              >
                {scale.sample}
              </p>
            </div>
          ))}
        </Reveal>
        <Reveal className={styles.table} aria-label="Where each family is used">
          <table>
            <thead>
              <tr>
                <th scope="col">Surface</th>
                <th scope="col">Typeface</th>
                <th scope="col">Sizes (px)</th>
              </tr>
            </thead>
            <tbody>
              {type.inUse.map((row) => (
                <tr key={row.surface}>
                  <th scope="row">{row.surface}</th>
                  <td>{row.style}</td>
                  <td>{row.sizes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Block>

      <Block title={spacing.title} text={spacing.intro}>
        <Reveal className={styles.spacing}>
          <dl className={styles.facts}>
            <div>
              <dt>Tokens</dt>
              {spacing.tokens.map((token) => (
                <dd key={token.name}>
                  <span>{token.name}</span>
                  <code>{token.value}</code>
                </dd>
              ))}
            </div>
            <div>
              <dt>Canvases</dt>
              {spacing.canvases.map((canvas) => (
                <dd key={canvas.name}>
                  <span>{canvas.name}</span>
                  <code>{canvas.value}</code>
                </dd>
              ))}
            </div>
          </dl>

          <div className={styles.scales}>
            <div>
              <h4 className={styles.groupTitle}>Aspect ratios</h4>
              <ul className={styles.ratios}>
                {spacing.ratios.map((ratio) => {
                  const [w, h] = ratio.split(':').map(Number)
                  // The longer side of every box is the same, so only the proportion differs.
                  const long = 96
                  const box = w >= h ? { width: long, height: Math.round((long * h) / w) } : { width: Math.round((long * w) / h), height: long }
                  return (
                    <li key={ratio} className={styles.ratio}>
                      <span className={styles.ratioBox} style={box} aria-hidden="true" />
                      <span>{ratio}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <h4 className={styles.groupTitle}>Card widths</h4>
              <ul className={styles.widths}>
                {spacing.cardWidths.map((card) => (
                  <li key={card.size}>
                    <span className={styles.widthName}>{card.size}</span>
                    <span className={styles.bar} style={{ width: `${(card.width / maxWidth) * 100}%` }} aria-hidden="true" />
                    <code>{card.width}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Block>

      <Block title={states.title} text={states.intro}>
        <ul className={styles.stateNames} aria-label="State names">
          {states.names.map((name) => (
            <li key={name}>
              <Tag roomy>{name}</Tag>
            </li>
          ))}
        </ul>
        <FigureRow figures={states.figures} label={states.title} />
      </Block>

      <Block title={conventions.title}>
        <Reveal as="dl" className={styles.conventions}>
          {conventions.items.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </Reveal>
      </Block>
    </Section>
  )
}
