import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import ExperienceCard from './ExperienceCard'
import { EXPERIENCE } from '../../data/experience'
import styles from './ExperienceSection.module.css'

export default function ExperienceSection() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <Reveal>
        <SectionHeading id="experience-title">Experience</SectionHeading>
      </Reveal>

      <ol className={styles.list}>
        {EXPERIENCE.map((role) => (
          <li key={role.id}>
            <Reveal>
              <ExperienceCard role={role} />
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
