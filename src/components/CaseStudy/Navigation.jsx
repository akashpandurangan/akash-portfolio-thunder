import Section from './ui/Section'
import { FigureRow } from './ui/Figure'
import Reveal from '../ui/Reveal'
import { NAVIGATION } from '../../data/designSystemCaseStudy'
import styles from './Navigation.module.css'

/** The navigation system of the AI Studio web app: its atoms, items, drawer and contextual submenus. */
export default function Navigation() {
  return (
    <Section id="navigation" title={NAVIGATION.title} lede={NAVIGATION.lede}>
      <Reveal>
        <blockquote className={styles.rule}>
          <p>{NAVIGATION.quote}</p>
          <footer>From the Source Navigation Drawer documentation</footer>
        </blockquote>
      </Reveal>

      <FigureRow
        label="Navigation components"
        figures={NAVIGATION.figures.map(({ image, title, text }) => ({ image, title, caption: text }))}
      />
    </Section>
  )
}
