import Reveal from '../ui/Reveal'
import Tag from '../ui/Tag'
import { asset } from '../../data/caseStudyAssets'
import { HERO } from '../../data/designSystemCaseStudy'
import styles from './Hero.module.css'

/*
 * The collage is one composition drawn on a fixed stage, so it scales as a single piece. Each layer is a real Figma
 * export placed by its design coordinates (x, y, width), back to front. There are two stages: a wide one under the text
 * (narrow windows) and a tall one beside it (from 1100px); CSS picks the set of coordinates that matches.
 */
const WIDE = { width: 1104, height: 500 }
const TALL = { width: 640, height: 560 }
const LAYERS = [
  { path: 'ott/web-player.webp', alt: 'Web player with a labelled control bar', wide: [128, 0, 660], tall: [96, 8, 544] },
  { path: 'ott/tv/audio-popup.webp', alt: 'TV player with the Audio popup open', wide: [580, 118, 500], tall: [170, 196, 470] },
  { path: 'ott/mobile/settings/portrait-full-appearance.webp', alt: 'Mobile subtitle appearance sheet', wide: [18, 214, 268], tall: [0, 318, 236] },
  { path: 'ott/components/seek-final.webp', alt: 'Content, live and ad seek bars', wide: [318, 392, 590], tall: [110, 494, 524] },
]

const pct = (value, total) => `${(value / total) * 100}%`
const place = (stage, [x, y, w]) => ({ left: pct(x, stage.width), top: pct(y, stage.height), width: pct(w, stage.width) })

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="case-study-title">
      <div className={styles.card}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.text}>
          <Reveal as="nav" aria-label="Breadcrumb" className={styles.crumb}>
            <a href="#projects">Projects</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">OTT Design System</span>
          </Reveal>

          <Reveal as="h1" id="case-study-title" className={styles.title} delay={60}>
            {HERO.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </Reveal>

          <Reveal as="p" className={styles.summary} delay={120}>
            {HERO.summary}
          </Reveal>

          <Reveal as="dl" className={styles.meta} delay={180}>
            {HERO.meta.map((item) => (
              <div key={item.label} className={styles.metaRow}>
                <dt>{item.label}</dt>
                <dd>
                  <ul className={styles.tags}>
                    {item.values.map((value) => (
                      <li key={value}>
                        <Tag roomy>{value}</Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </Reveal>

          <Reveal className={styles.actions} delay={240}>
            <a className={styles.primary} href={HERO.primaryLink.to}>
              {HERO.primaryLink.label}
            </a>
            <a className={styles.secondary} href={HERO.secondaryLink.to}>
              {HERO.secondaryLink.label}
            </a>
          </Reveal>
        </div>

        <Reveal className={styles.stageWrap} delay={200}>
          <div className={styles.stage}>
            {LAYERS.map((layer, index) => {
              const picture = asset(layer.path)
              const wide = place(WIDE, layer.wide)
              const tall = place(TALL, layer.tall)
              return (
                <img
                  key={layer.path}
                  className={styles.layer}
                  src={picture.src}
                  width={picture.width}
                  height={picture.height}
                  alt={layer.alt}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable="false"
                  style={{
                    '--wl': wide.left,
                    '--wt': wide.top,
                    '--ww': wide.width,
                    '--tl': tall.left,
                    '--tt': tall.top,
                    '--tw': tall.width,
                    zIndex: index + 1,
                  }}
                />
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
