import SmartLink from '../ui/SmartLink'
import Tag from '../ui/Tag'
import StageVideo from './StageVideo'
import styles from './CaseStudyCard.module.css'

const pct = (value, total) => `${(value / total) * 100}%`

function TagRow({ label, items }) {
  return (
    <div className={styles.tagRow}>
      <span className={styles.tagLabel}>{label}</span>
      <ul className={styles.tags} aria-label={label.replace(/:$/, '')}>
        {items.map((item) => (
          <li key={item}>
            <Tag roomy>{item}</Tag>
          </li>
        ))}
      </ul>
    </div>
  )
}

/*
 * One full-width case-study card: the text block on top and, below it, the stage with the device mockups.
 * The stage scales as a single piece (see the CSS), so nothing here depends on the viewport — shots, captions and the
 * optional video are all placed in percentages of the stage's design size, taken straight from the Figma frame.
 */
export default function CaseStudyCard({ study }) {
  const { id, title, subtitle, description, platforms, focusAreas, href, stage, shots, video } = study
  const titleId = `case-study-${id}`

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.text} data-stack-text="">
        <div className={styles.heading}>
          <h3 id={titleId} className={styles.title}>
            {title}
          </h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <p className={styles.description}>{description}</p>
        <TagRow label="Platforms:" items={platforms} />
        <TagRow label="Focus Areas" items={focusAreas} />
        <SmartLink className={styles.cta} href={href}>
          View case study<span className="visually-hidden"> — {title}</span>
        </SmartLink>
      </div>

      <div className={styles.stage} style={{ '--w': stage.width, '--h': stage.height }}>
        <div className={styles.canvas}>
          {shots.map((shot) => (
            <img
              key={shot.src}
              className={styles.shot}
              src={shot.src}
              alt={`${title}: ${shot.alt}`}
              width={shot.pxWidth}
              height={shot.pxHeight}
              loading="lazy"
              decoding="async"
              draggable="false"
              style={{ left: pct(shot.x, stage.width), top: pct(shot.y, stage.height), width: pct(shot.w, stage.width) }}
            />
          ))}
          {video && <StageVideo video={video} stage={stage} />}
          {shots.map((shot) => (
            <span
              key={shot.caption.text}
              className={styles.caption}
              aria-hidden="true"
              style={{
                left: pct(shot.caption.x, stage.width),
                top: pct(shot.caption.y, stage.height),
                '--ls': shot.caption.scale,
              }}
            >
              {shot.caption.text}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
