import arrowIcon from '../../assets/footer/arrow-up-right.svg'
import Tag from '../ui/Tag'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project }) {
  const { title, description, tags, image, href } = project

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img
          className={styles.image}
          src={image}
          alt={`${title} interface preview`}
          width="1042"
          height="1014"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            {href ? (
              <a className={styles.titleLink} href={href}>
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <img className={styles.arrow} src={arrowIcon} alt="" width="20" height="20" />
        </div>

        <p className={styles.description}>{description}</p>

        <ul className={styles.tags} aria-label="Tags">
          {tags.map((tag, index) => (
            <li key={`${tag}-${index}`}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
