import boltBackground from '../../assets/hero/bolt-bg.svg'
import brandSonyLiv from '../../assets/hero/brand-sonyliv.webp'
import brandTwo from '../../assets/hero/brand-2.svg'
import brandThree from '../../assets/hero/brand-3.svg'
import styles from './Hero.module.css'

/* Entrance delays (ms): the reference staggers badge → headline → summary → actions by roughly 100ms. */
const delay = (ms) => ({ '--delay': `${ms}ms` })

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.card}>
        <div className={styles.boltFrame} aria-hidden="true">
          <img className={styles.bolt} src={boltBackground} alt="" width="738" height="1002" />
        </div>
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.content}>
          <div className={`${styles.item} ${styles.badge}`} style={delay(0)}>
            <span className={styles.badgeLabel}>Selected brands &amp; experiences</span>
            <span className={styles.badgeDivider} aria-hidden="true" />
            <span className={styles.chips} aria-hidden="true">
              <span className={styles.chip}>
                <span className={styles.sonyCrop}>
                  <img className={styles.sonyImage} src={brandSonyLiv} alt="" />
                </span>
              </span>
              <span className={styles.chip}>
                <img src={brandTwo} alt="" width="12.478" height="14" />
              </span>
              <span className={styles.chip}>
                <img src={brandThree} alt="" width="9.83" height="14" />
              </span>
            </span>
          </div>

          <h1 id="hero-title" className={`${styles.item} ${styles.title}`} style={delay(110)}>
            <span>Akash Pandurangan</span>
            <span>Senior Product Designer</span>
          </h1>

          <p className={`${styles.item} ${styles.summary}`} style={delay(155)}>
            I design thoughtful digital experiences that bring together user needs, business goals, and visual clarity.
            From product strategy to scalable design systems, I turn complex ideas into intuitive experiences.
          </p>

          <div className={`${styles.item} ${styles.actions}`} style={delay(240)}>
            <p className={styles.focus}>Product Strategy · Experience Architecture · Design Systems</p>
            <a className={styles.cta} href="#projects">
              View Selected Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
