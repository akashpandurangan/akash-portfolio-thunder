import Section from './ui/Section'
import Figure, { FigureGrid } from './ui/Figure'
import Reveal from '../ui/Reveal'
import SmartLink from '../ui/SmartLink'
import { SAAS_NAVIGATION } from '../../data/designSystemCaseStudy'
import styles from './SaasNavigation.module.css'

/*
 * A module for the separate SaaS navigation design system. It renders whatever SAAS_NAVIGATION holds: while the status
 * is "pending" it shows a quiet placeholder, and once a summary, a Figma link, principles and figures are added (and the
 * status is set to "ready") it becomes a full chapter without any change here. `visible: false` removes it entirely.
 */
export default function SaasNavigation() {
  const { visible, status, title, summary, figmaUrl, principles, figures } = SAAS_NAVIGATION
  if (!visible) return null
  const ready = status === 'ready'

  return (
    <Section
      id="saas-navigation"
      title={title}
      lede={ready ? summary : 'This chapter is reserved for the SaaS navigation design system. Its Figma reference and screens will be added here.'}
    >
      {ready ? (
        <div className={styles.ready}>
          {principles.length > 0 && (
            <Reveal as="ul" className={styles.principles}>
              {principles.map((principle) => (
                <li key={principle.title ?? principle}>
                  {principle.title && <strong>{principle.title}</strong>}
                  <span>{principle.text ?? principle}</span>
                </li>
              ))}
            </Reveal>
          )}
          {figures.length > 0 && (
            <FigureGrid>
              {figures.map((figure) => (
                <Figure key={figure.image} {...figure} />
              ))}
            </FigureGrid>
          )}
          {figmaUrl && (
            <SmartLink className={styles.link} href={figmaUrl}>
              Open the Figma file
            </SmartLink>
          )}
        </div>
      ) : (
        <Reveal className={styles.pending}>
          <p>
            Nothing is shown for this system until its source is added, so no navigation design is invented here. The module takes a summary, a Figma link, a list of principles and screenshots.
          </p>
        </Reveal>
      )}
    </Section>
  )
}
