import Section from './ui/Section'
import Reveal from '../ui/Reveal'
import { TAKEAWAYS } from '../../data/designSystemCaseStudy'
import styles from './Takeaways.module.css'

export default function Takeaways() {
  return (
    <Section id="takeaways" title="Outcomes and learnings" lede={TAKEAWAYS.lede}>
      <div className={styles.groups}>
        {TAKEAWAYS.groups.map((group) => (
          <Reveal key={group.title} className={styles.group}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
