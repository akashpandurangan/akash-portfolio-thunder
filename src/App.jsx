import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import HireMeCTA from './components/HireMe/HireMeCTA'
import HireMeCard from './components/HireMe/HireMeCard'
import Hero from './components/Hero/Hero'
import ContactSection from './components/Contact/ContactSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import AboutSection from './components/About/AboutSection'
import ExperienceSection from './components/Experience/ExperienceSection'
import Footer from './components/Footer/Footer'
import { useActiveSection } from './hooks/useActiveSection'
import { useHashRoute } from './hooks/useHashRoute'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useTheme } from './hooks/useTheme'

// Each case study is a separate chunk: visitors who stay on the portfolio never download it. The key is the slug of
// #/case-studies/<slug>.
const CASE_STUDY_PAGES = {
  'ott-design-system': lazy(() => import('./components/CaseStudy/CaseStudyPage')),
  'kpost-communication': lazy(() => import('./components/KpostCaseStudy/KpostCaseStudyPage')),
  'ai-studio': lazy(() => import('./components/AiStudioCaseStudy/AiStudioCaseStudyPage')),
  sonyliv: lazy(() => import('./components/SonyLivCaseStudy/SonyLivCaseStudyPage')),
}

const SECTION_IDS = ['home', 'projects', 'about', 'experience']
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  // loading → leaving (hero starts its entrance) → done (loader removed)
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? 'done' : 'loading'))
  const [theme, toggleTheme] = useTheme()
  const route = useHashRoute()
  const CaseStudyPage = route.name === 'case-study' ? CASE_STUDY_PAGES[route.slug] : undefined
  const onCaseStudy = Boolean(CaseStudyPage)
  const homeActiveId = useActiveSection(SECTION_IDS, !onCaseStudy)
  // A case study belongs to the Projects section, so that is the nav item that stays lit.
  const activeId = onCaseStudy ? 'projects' : homeActiveId
  useSmoothScroll()

  useEffect(() => {
    const root = document.documentElement
    root.dataset.loading = String(phase === 'loading')
    root.dataset.ready = String(phase !== 'loading')
  }, [phase])

  // Switching pages: the browser only scrolls to an anchor that already exists, so do it once the new page is mounted.
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (onCaseStudy) {
      if (!route.section) window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const target = document.getElementById(window.location.hash.slice(1))
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [onCaseStudy, route.section])

  const handleLeave = useCallback(() => setPhase((current) => (current === 'loading' ? 'leaving' : current)), [])
  const handleDone = useCallback(() => setPhase('done'), [])

  // The "Hire me" profile card: opened by either copy of the Hire me button (floating, or in the header on phones).
  const [hireMeOpen, setHireMeOpen] = useState(false)
  const openHireMe = useCallback(() => setHireMeOpen(true), [])
  const closeHireMe = useCallback(() => setHireMeOpen(false), [])

  return (
    <>
      {phase !== 'done' && <Loader onLeave={handleLeave} onDone={handleDone} />}
      <Navbar activeId={activeId} theme={theme} onToggleTheme={toggleTheme} onHireMe={openHireMe} />
      <HireMeCTA onClick={openHireMe} />
      {hireMeOpen && <HireMeCard onClose={closeHireMe} />}
      <main>
        {onCaseStudy ? (
          <Suspense fallback={null}>
            <CaseStudyPage section={route.section} />
          </Suspense>
        ) : (
          <>
            <Hero />
            <ContactSection />
            <ProjectsSection />
            <AboutSection />
            <ExperienceSection />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
