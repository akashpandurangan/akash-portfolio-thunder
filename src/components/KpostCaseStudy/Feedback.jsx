import Reveal from '../ui/Reveal'
import Section, { Block } from '../CaseStudy/ui/Section'
import Figure, { FigureGrid } from '../CaseStudy/ui/Figure'
import { FEEDBACK } from '../../data/kpostCaseStudy'
import styles from './Feedback.module.css'

/** What the users said: the messages set as quotes, then the messages themselves as they arrived. */
export default function Feedback() {
  return (
    <Section id="feedback" title={FEEDBACK.title} lede={FEEDBACK.lede}>
      <ul className={styles.list}>
        {FEEDBACK.quotes.map((quote, index) => (
          <li key={quote.by + index}>
            <Reveal as="figure" className={styles.card} delay={(index % 2) * 80}>
              <blockquote className={styles.text}>{quote.text}</blockquote>
              <figcaption className={styles.by}>
                <span className={styles.initial} aria-hidden="true">
                  {quote.by.charAt(0)}
                </span>
                {quote.by}
              </figcaption>
            </Reveal>
          </li>
        ))}
      </ul>

      <Block title={FEEDBACK.messages.title} text={FEEDBACK.messages.text}>
        <FigureGrid>
          {FEEDBACK.quotes.map((quote) => (
            <Figure
              key={quote.image}
              image={quote.image}
              title={quote.name}
              alt={`Message from ${quote.name}: ${quote.text}`}
              span="half-wide"
              showCaption={false}
            />
          ))}
        </FigureGrid>
      </Block>
    </Section>
  )
}
