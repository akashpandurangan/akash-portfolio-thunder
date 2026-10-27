import Reveal from '../ui/Reveal'
import Tag from '../ui/Tag'
import { asset } from '../../data/caseStudyAssets'
import styles from './CaseStudyHero.module.css'

/*
 * The banner of a case study page, the same for every one: breadcrumb, the title in short lines, the summary, a few
 * labelled tags, two links to chapters, and a collage of real screens.
 *
 * The collage is one composition drawn on a fixed stage, so it scales as a single piece. Each layer is a real Figma
 * export placed by its design coordinates (`[x, y, width]`), back to front. There are two stages: a wide one under the
 * text (narrow windows, `wide`) and a tall one beside it (from 1200px, `tall`); CSS picks the set that matches.
 */
const WIDE_STAGE = { width: 1104, height: 500 }
const TALL_STAGE = { width: 640, height: 560 }

const pct = (value, total) => `${(value / total) * 100}%`
const place = (stage, [x, y, w]) => ({ left: pct(x, stage.width), top: pct(y, stage.height), width: pct(w, stage.width) })

export default function CaseStudyHero({ crumb, title, summary, meta, primaryLink, secondaryLink, layers }) {
  return (
    <section className={styles.hero} aria-labelledby="case-study-title">
      <div className={styles.card}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.text}>
          <Reveal as="nav" aria-label="Breadcrumb" className={styles.crumb}>
            <a href="#projects">Projects</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{crumb}</span>
          </Reveal>

          <Reveal as="h1" id="case-study-title" className={styles.title} delay={60}>
            {title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </Reveal>

          <Reveal as="p" className={styles.summary} delay={120}>
            {summary}
          </Reveal>

          <Reveal as="dl" className={styles.meta} delay={180}>
            {meta.map((item) => (
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
            <a className={styles.primary} href={primaryLink.to}>
              {primaryLink.label}
            </a>
            <a className={styles.secondary} href={secondaryLink.to}>
              {secondaryLink.label}
            </a>
          </Reveal>
        </div>

        <Reveal className={styles.stageWrap} delay={200}>
          <div className={styles.stage}>
            {layers.map((layer, index) => {
              const picture = asset(layer.path)
              const wide = place(WIDE_STAGE, layer.wide)
              const tall = place(TALL_STAGE, layer.tall)
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
