import Section, { Block } from './ui/Section'
import Figure, { FigureGrid } from './ui/Figure'
import Reveal from '../ui/Reveal'
import Tag from '../ui/Tag'
import { AI_STUDIO } from '../../data/designSystemCaseStudy'
import styles from './AiStudio.module.css'

export default function AiStudio() {
  return (
    <Section id="ai-studio" title={AI_STUDIO.title} lede={AI_STUDIO.lede}>
      <Reveal className={styles.about}>
        <p className={styles.aboutText}>{AI_STUDIO.about}</p>
        <dl className={styles.meta}>
          {AI_STUDIO.meta.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>
                <ul>
                  {item.values.map((value) => (
                    <li key={value}>
                      <Tag roomy>{value}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Block title="The product" text="Five screens of the web app, as designed. They share the system below: the same navigation, buttons, tables and cards.">
        <FigureGrid>
          {AI_STUDIO.screens.map((screen) => (
            <Figure key={screen.image} image={screen.image} title={screen.title} caption={screen.text} span={screen.span} />
          ))}
        </FigureGrid>
      </Block>

      <div className={styles.system}>
        <h3 className={styles.systemTitle}>The component system behind it</h3>
        {AI_STUDIO.system.map((group) => (
          <Reveal key={group.title}>
            <Block title={group.title} text={group.text}>
              {group.quote && (
                <blockquote className={styles.rule}>
                  <p>{group.quote}</p>
                  <footer>From the Source Navigation Drawer documentation</footer>
                </blockquote>
              )}
              <FigureGrid>
                {group.figures.map((figure) => (
                  <Figure key={figure.image} image={figure.image} title={figure.title} caption={figure.text} span={figure.span} />
                ))}
              </FigureGrid>
            </Block>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
