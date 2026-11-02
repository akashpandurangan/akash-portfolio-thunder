import Reveal from '../ui/Reveal'
import Section from '../CaseStudy/ui/Section'
import Figure, { FigureGrid } from '../CaseStudy/ui/Figure'
import SiteLink from './SiteLink'
import { KEY_COMPONENTS } from '../../data/sonylivCaseStudy'
import styles from './KeyComponents.module.css'

/** Six of the fifteen component groups, one sentence each, over the design system site's own Components page. */
export default function KeyComponents() {
  const { title, lede, items, figure, more, site } = KEY_COMPONENTS

  return (
    <Section id="components" title={title} lede={lede}>
      <div className={styles.stack}>
        <ul className={styles.grid}>
          {items.map((item, index) => (
            <Reveal key={item.name} as="li" className={styles.card} delay={(index % 3) * 80}>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </ul>

        <FigureGrid>
          <Figure {...figure} span="full" />
        </FigureGrid>

        <Reveal className={styles.more}>
          <p>{more}</p>
          <SiteLink {...site} />
        </Reveal>
      </div>
    </Section>
  )
}
