import Reveal from '../ui/Reveal'
import ProjectCard from './ProjectCard'
import styles from './GraphicGallery.module.css'

/*
 * Two independent columns (tall posters beside short banners), with small tiles paired two to a row.
 * Below 760px the columns dissolve into one stack; `--order` keeps the left / right interleaving.
 */
export default function GraphicGallery({ columns }) {
  return (
    <div className={styles.gallery}>
      {columns.map((column, columnIndex) => (
        <ul className={styles.column} key={columnIndex} role="list">
          {column.map((block, blockIndex) => {
            const key = Array.isArray(block) ? block.map((item) => item.id).join('+') : block.id
            return (
              <li
                className={styles.block}
                key={key}
                style={{ '--order': blockIndex * columns.length + columnIndex }}
              >
                {Array.isArray(block) ? (
                  <ul className={styles.pair} role="list">
                    {block.map((item, itemIndex) => (
                      <li key={item.id}>
                        <Reveal delay={itemIndex * 90}>
                          <ProjectCard project={item} />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Reveal delay={columnIndex * 90}>
                    <ProjectCard project={block} />
                  </Reveal>
                )}
              </li>
            )
          })}
        </ul>
      ))}
    </div>
  )
}
