import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import styles from './AboutSection.module.css'

export default function AboutSection() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <Reveal>
        <SectionHeading id="about-title">About AP</SectionHeading>

        <div className={styles.copy}>
          <p className={styles.lead}>Designing Digital Experiences That Make a Difference</p>

          <div className={styles.body}>
            <p>
              I&apos;m Akash Pandurangan, a UI/UX and Product Designer with 5 years of experience creating intuitive,
              user-centered digital experiences across mobile, web, tablet, Smart TV, and OTT platforms.
            </p>
            <p>
              I specialize in transforming complex requirements into simple, engaging, and scalable product experiences.
              From understanding user needs and mapping user journeys to designing high-fidelity interfaces, interactive
              prototypes, and scalable design systems, I focus on creating solutions that balance user needs with
              business goals.
            </p>
            <p>
              Throughout my journey, I&apos;ve collaborated with product managers, developers, and cross-functional
              teams to bring ideas to life. I&apos;m passionate about solving real-world problems through thoughtful
              design, building consistent design systems, and continuously improving the way people interact with
              digital products.
            </p>
            <p>
              For me, great design goes beyond aesthetics — it&apos;s about making products intuitive, accessible, and
              meaningful.
            </p>
          </div>

          <p className={styles.lead}>
            My goal is simple: to create digital experiences that work beautifully for both people and businesses.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
