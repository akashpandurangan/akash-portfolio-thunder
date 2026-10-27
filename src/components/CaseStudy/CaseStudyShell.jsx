import { useEffect } from 'react'
import ProjectsSection from '../Projects/ProjectsSection'
import ChapterNav from './ChapterNav'
import { LightboxProvider } from './ui/Lightbox'
import styles from './CaseStudyShell.module.css'

/**
 * What every case-study page has in common: the full-size image viewer, the hero, the chapter links beside the article
 * (a rail from 768px, a pill above it below), and the home page's Projects section at the end, without this case study.
 * `section` is the chapter the address asks for (…/components); the page scrolls there once it is mounted.
 */
export default function CaseStudyShell({ title, slug, chapters, basePath, section, hero, className = '', children }) {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])

  useEffect(() => {
    if (!section) return
    const target = document.getElementById(section)
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }, [section])

  return (
    <LightboxProvider>
      <div className={`${styles.page} ${className}`.trim()}>
        {hero}
        <div className={styles.layout}>
          <ChapterNav chapters={chapters} basePath={basePath} section={section} />
          <div className={styles.article}>{children}</div>
        </div>
        <ProjectsSection id="more-projects" title="More projects" excludeCaseStudy={slug} />
      </div>
    </LightboxProvider>
  )
}
