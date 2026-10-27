import Reveal from '../ui/Reveal'
import Section, { Block } from '../CaseStudy/ui/Section'
import { PROBLEM } from '../../data/sonylivCaseStudy'
import styles from './Problem.module.css'

/** What had to be balanced, the four areas the work looked at, and the question the project set. */
export default function Problem() {
  const { title, heading, lede, areas, challengeTitle, challenge } = PROBLEM

  return (
    <Section id="problem" title={title} lede={lede}>
      <Block title={heading}>
        <ul className={styles.areas}>
          {areas.map((area, index) => (
            <Reveal key={area.title} as="li" className={styles.area} delay={(index % 2) * 80}>
              <h4>{area.title}</h4>
              <p>{area.text}</p>
            </Reveal>
          ))}
        </ul>
      </Block>

      <Reveal as="figure" className={styles.challenge}>
        <figcaption>{challengeTitle}</figcaption>
        <blockquote>{challenge}</blockquote>
      </Reveal>
    </Section>
  )
}
