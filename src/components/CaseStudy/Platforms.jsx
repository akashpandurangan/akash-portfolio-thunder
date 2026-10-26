import { useState } from 'react'
import Section from './ui/Section'
import Tabs from './ui/Tabs'
import Reveal from '../ui/Reveal'
import { asset } from '../../data/caseStudyAssets'
import { PLATFORMS } from '../../data/designSystemCaseStudy'
import { useLightbox } from './ui/lightboxContext'
import styles from './Platforms.module.css'

function Device({ device }) {
  const openLightbox = useLightbox()
  const picture = asset(device.image.path)

  return (
    <div className={styles.device}>
      <div className={styles.visual}>
        <button
          type="button"
          className={styles.frame}
          onClick={() => openLightbox({ ...picture, alt: device.image.alt, title: `${device.label} player`, caption: device.caption })}
          aria-label={`${device.caption} Open full size`}
        >
          <img key={device.id} className={styles.image} src={picture.src} width={picture.width} height={picture.height} alt={device.image.alt} decoding="async" />
        </button>
        <p className={styles.caption}>{device.caption}</p>
      </div>

      <dl className={styles.facts}>
        {device.facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function Platforms() {
  const [active, setActive] = useState(PLATFORMS.devices[0].id)
  const { compare } = PLATFORMS

  return (
    <Section id="platforms" title="Multi-platform component adaptation" lede={PLATFORMS.lede}>
      <Tabs
        label="Platform"
        tabs={PLATFORMS.devices.map(({ id, label }) => ({ id, label }))}
        value={active}
        onChange={setActive}
        render={(tab) => <Device device={PLATFORMS.devices.find((device) => device.id === tab.id)} />}
      />

      <Reveal className={styles.compare}>
        <h3 className={styles.compareTitle}>Side by side</h3>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <span className="visually-hidden">Property</span>
                </th>
                {compare.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td key={compare.columns[index]}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.note}>{PLATFORMS.note}</p>
      </Reveal>
    </Section>
  )
}
