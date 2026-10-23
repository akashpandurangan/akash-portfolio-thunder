import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import FilterTabs from './FilterTabs'
import GraphicGallery from './GraphicGallery'
import ProjectCard from './ProjectCard'
import { GRAPHIC_COLUMNS, PROJECTS, PROJECT_FILTERS } from '../../data/projects'
import styles from './ProjectsSection.module.css'

const GALLERY_FILTER = 'Graphic Design'

export default function ProjectsSection() {
  const [filter, setFilter] = useState(PROJECT_FILTERS[0])
  const visibleProjects = PROJECTS.filter((project) => project.category === filter)
  const isGallery = filter === GALLERY_FILTER

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <Reveal className={styles.header}>
        <SectionHeading id="projects-title">Projects</SectionHeading>
        <FilterTabs filters={PROJECT_FILTERS} active={filter} onChange={setFilter} />
      </Reveal>

      {isGallery ? (
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
