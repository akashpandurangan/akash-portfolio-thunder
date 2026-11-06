import Reveal from '../ui/Reveal'
import Figure, { FigureGrid } from '../CaseStudy/ui/Figure'
import AnnotatedScreen from './AnnotatedScreen'
import Chapter from './Chapter'
import { FINAL_UI } from '../../data/unifiFifaCaseStudy'
import styles from './Screens.module.css'

// How many columns of the six-column figure grid a figure takes, by how many share the row.
const SPAN = { 1: 'full', 2: 'default', 3: 'narrow', 4: 'default', 6: 'narrow' }

function Row({ row }) {
  return (
    <Reveal as="section" className={styles.rowBlock} aria-label={row.title}>
      <div className={styles.rowHead}>
        <h4 className={styles.rowTitle}>{row.title}</h4>
        <p className={styles.text}>{row.text}</p>
      </div>
      <FigureGrid>
        {row.figures.map((figure) => (
          <Figure key={figure.image} {...figure} image={`unifi-fifa/${figure.image}`} span={SPAN[row.figures.length] ?? 'default'} />
        ))}
      </FigureGrid>
    </Reveal>
  )
}

function Group({ group }) {
  return (
    <section className={styles.group} aria-label={group.title}>
      <Reveal className={styles.groupHead}>
        <p className={styles.eyebrow}>Journey</p>
        <h3 className={styles.groupTitle}>{group.title}</h3>
        <p className={styles.text}>{group.text}</p>
      </Reveal>
      {group.items.map((item, index) => (
        <AnnotatedScreen key={item.id} {...item} flip={index % 2 === 1} />
      ))}
      {group.rows.map((row) => (
        <Row key={row.id} row={row} />
      ))}
    </section>
  )
}

/** 12: the real Daily Pass and Season Pass screens from the two boards, grouped by journey, the large ones annotated. */
export default function FinalUi() {
  return (
    <Chapter id="final-ui" title="Final UI design" lede={FINAL_UI.lede}>
      <Group group={FINAL_UI.daily} />
      <Group group={FINAL_UI.season} />
    </Chapter>
  )
}
