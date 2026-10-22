import { useCallback, useEffect, useState } from 'react'
import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import ContactSection from './components/Contact/ContactSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import AboutSection from './components/About/AboutSection'
import ExperienceSection from './components/Experience/ExperienceSection'
import Footer from './components/Footer/Footer'
import { useActiveSection } from './hooks/useActiveSection'
import { useTheme } from './hooks/useTheme'

const SECTION_IDS = ['home', 'contact', 'projects', 'about', 'experience']
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  // loading → leaving (hero starts its entrance) → done (loader removed)
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? 'done' : 'loading'))
  const [theme, toggleTheme] = useTheme()
  const activeId = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.loading = String(phase === 'loading')
    root.dataset.ready = String(phase !== 'loading')
  }, [phase])

  const handleLeave = useCallback(() => setPhase((current) => (current === 'loading' ? 'leaving' : current)), [])
  const handleDone = useCallback(() => setPhase('done'), [])

  return (
    <>
      {phase !== 'done' && <Loader onLeave={handleLeave} onDone={handleDone} />}
      <Navbar activeId={activeId} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <ContactSection />
        <ProjectsSection />
        <AboutSection />
        <ExperienceSection />
      </main>
      <Footer />
    </>
  )
}
