import Reveal from '../ui/Reveal'
import Figure, { FigureGrid } from '../CaseStudy/ui/Figure'
import Chapter from './Chapter'
import { EXPLORATION } from '../../data/unifiFifaCaseStudy'
import styles from './Screens.module.css'

/** 11: design exploration (the material has final designs, not wireframes): how the content, pass information, CTA, account and payment states are organised. */
export default function Exploration() {
  const { topics, states, statesTitle, statesText, filesNotes, lede } = EXPLORATION

  return (
    <Chapter id="exploration" title="Wireframes & design exploration" lede={lede}>
      <ul className={`${styles.plain} ${styles.topics}`}>
        {topics.map((topic, index) => (
          <Reveal key={topic.title} as="li" className={styles.topic} delay={(index % 2) * 70}>
            <h4>{topic.title}</h4>
            <p>{topic.text}</p>
          </Reveal>
        ))}
      </ul>

      <div className={styles.block}>
        <div className={styles.blockHead}>
          <p className={styles.eyebrow}>Same layout, four states</p>
          <h3 className={styles.h3}>{statesTitle}</h3>
          <p className={styles.text}>{statesText}</p>
        </div>
        <FigureGrid>
          {states.map((state) => (
            <Figure key={state.label} image={`unifi-fifa/${state.image}`} title={state.label} caption={state.text} />
          ))}
        </FigureGrid>
        <ul className={`${styles.plain} ${styles.fileNotes}`}>
          {filesNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </Chapter>
  )
}
