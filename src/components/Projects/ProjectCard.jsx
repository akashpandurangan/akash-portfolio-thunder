import arrowIcon from '../../assets/footer/arrow-up-right.svg'
import SmartLink from '../ui/SmartLink'
import Tag from '../ui/Tag'
import styles from './ProjectCard.module.css'

/*
 * One card for every Projects tab. Case studies and frontend projects carry a description and tags, UI screens only a
 * caption, and Graphic Design tiles are often just an image (a `title` adds the caption, `arrow: false` drops the arrow).
 * Pass the image's own `width` / `height` to size the media box to its aspect ratio instead of the 522:509 default.
 */
export default function ProjectCard({ project }) {
  const { title, description, tags = [], image, alt, href, arrow = true, width = 1042, height = 1014 } = project
  const ratio = project.width ? `${width} / ${height}` : undefined

  return (
    <article className={styles.card} data-stretch={Boolean(ratio && title)}>
      <div className={styles.media} style={ratio ? { '--ratio': ratio } : undefined}>
        <img
          className={styles.image}
          src={image}
          alt={alt ?? `${title} interface preview`}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </div>

      {title && (
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>
              {href ? (
                <SmartLink className={styles.titleLink} href={href}>
                  {title}
                </SmartLink>
              ) : (
                title
              )}
            </h3>
            {arrow && <img className={styles.arrow} src={arrowIcon} alt="" width="20" height="20" />}
          </div>

          {description && <p className={styles.description}>{description}</p>}

          {tags.length > 0 && (
            <ul className={styles.tags} aria-label="Tags">
              {tags.map((tag, index) => (
                <li key={`${tag}-${index}`}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  )
}
