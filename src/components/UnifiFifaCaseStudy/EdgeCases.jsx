import Reveal from '../ui/Reveal'
import { asset } from '../../data/caseStudyAssets'
import { useLightbox } from '../CaseStudy/ui/lightboxContext'
import Chapter from './Chapter'
import { EDGE_CASES } from '../../data/unifiFifaCaseStudy'
import styles from './Screens.module.css'

function Case({ item, index }) {
  const openLightbox = useLightbox()
  const picture = asset(`unifi-fifa/${item.image}`)
  return (
    <Reveal as="li" className={styles.case} delay={(index % 3) * 70}>
      <button
        type="button"
        className={styles.caseMedia}
        onClick={() => openLightbox({ ...picture, alt: item.title, title: item.title, caption: item.text })}
        aria-label={`${item.title}. Open full size`}
      >
        <img src={picture.src} width={picture.width} height={picture.height} alt={`${item.title}: ${item.text}`} loading="lazy" decoding="async" draggable="false" />
      </button>
      <div className={styles.caseBody}>
        <span className={styles.caseIndex}>{String(index + 1).padStart(2, '0')}</span>
        <h3 className={styles.caseTitle}>{item.title}</h3>
        <p className={styles.caseText}>{item.text}</p>
      </div>
    </Reveal>
  )
}

/** 12: ten situations the designs cover, each with its screen, in three columns. */
export default function EdgeCases() {
  const { cases, lede } = EDGE_CASES

  return (
    <Chapter id="edge-cases" title="Interaction & edge cases" lede={lede}>
      <ul className={`${styles.plain} ${styles.cases}`}>
        {cases.map((item, index) => (
          <Case key={item.title} item={item} index={index} />
        ))}
      </ul>
    </Chapter>
  )
}
