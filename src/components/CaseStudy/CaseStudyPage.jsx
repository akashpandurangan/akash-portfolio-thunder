import { useEffect } from 'react'
// The design system is set in Roboto, so the prototypes and specimens load it. It only downloads on this page.
import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-500.css'
import '@fontsource/roboto/latin-700.css'
import AiStudio from './AiStudio'
import ChapterNav from './ChapterNav'
import Closing from './Closing'
import ComponentSystem from './ComponentSystem'
import Demos from './Demos'
import Foundations from './Foundations'
import Hero from './Hero'
import Overview from './Overview'
import Platforms from './Platforms'
import Playground from './Playground'
import SaasNavigation from './SaasNavigation'
import Takeaways from './Takeaways'
import { LightboxProvider } from './ui/Lightbox'
import styles from './CaseStudyPage.module.css'

const TITLE = 'OTT Video Player Design System | Akash Pandurangan'

/**
 * The OTT video-player design-system case study, at #/case-studies/ott-design-system. `section` is the chapter the
 * address asks for (…/components); the page scrolls there once it is mounted.
 */
export default function CaseStudyPage({ section }) {
  useEffect(() => {
    const previous = document.title
    document.title = TITLE
    return () => {
      document.title = previous
    }
  }, [])

  useEffect(() => {
    if (!section) return
    const target = document.getElementById(section)
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }, [section])

  return (
    <LightboxProvider>
      <div className={styles.page}>
        <Hero />
        {/* The chapter nav and the article share one layout: a rail beside the article from 768px, a pill above it below. */}
        <div className={styles.layout}>
          <ChapterNav section={section} />
          <div className={styles.article}>
            <Overview />
            <Foundations />
            <ComponentSystem />
            <Playground />
            <Demos />
            <Platforms />
            <AiStudio />
            <SaasNavigation />
            <Takeaways />
            <Closing />
          </div>
        </div>
      </div>
    </LightboxProvider>
  )
}
