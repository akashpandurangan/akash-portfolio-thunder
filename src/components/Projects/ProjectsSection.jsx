import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import FilterTabs from './FilterTabs'
import GraphicGallery from './GraphicGallery'
import ProjectCard from './ProjectCard'
import ProjectStack from './ProjectStack'
import { CASE_STUDIES } from '../../data/caseStudies'
import { GRAPHIC_COLUMNS, PROJECTS, PROJECT_FILTERS } from '../../data/projects'
import styles from './ProjectsSection.module.css'

const CASE_STUDY_FILTER = 'Case Study'
const GALLERY_FILTER = 'Graphic Design'

/**
 * The Projects section of the home page. A case study page reuses it for "More projects": `id` and `title` rename it, and
 * `excludeCaseStudy` leaves the case study you are reading out of the stack.
 */
export default function ProjectsSection({ id = 'projects', title = 'Projects', excludeCaseStudy = null }) {
  const [filter, setFilter] = useState(PROJECT_FILTERS[0])
  const caseStudies = CASE_STUDIES.filter((study) => study.id !== excludeCaseStudy)
  const visibleProjects = PROJECTS.filter((project) => project.category === filter)
  const isStack = filter === CASE_STUDY_FILTER
  const isGallery = filter === GALLERY_FILTER

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Reveal className={styles.header}>
        <SectionHeading id={`${id}-title`}>{title}</SectionHeading>
        <FilterTabs filters={PROJECT_FILTERS} active={filter} onChange={setFilter} />
      </Reveal>

      {isStack ? (
        <ProjectStack key={filter} studies={caseStudies} />
      ) : isGallery ? (
        <GraphicGallery key={filter} columns={GRAPHIC_COLUMNS} />
      ) : visibleProjects.length > 0 ? (
        <ul className={styles.grid} key={filter}>
          {visibleProjects.map((project, index) => (
            <li key={project.id}>
              <Reveal delay={(index % 2) * 90}>
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty} role="status">
          No {filter} projects yet.
        </p>
      )}
    </section>
  )
}
