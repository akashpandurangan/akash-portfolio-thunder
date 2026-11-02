import Section from '../CaseStudy/ui/Section'
import DemoVideo from '../CaseStudy/ui/DemoVideo'
import Figure, { FigureGrid } from '../CaseStudy/ui/Figure'
import { asset } from '../../data/caseStudyAssets'
import { INTERACTIVITY, MOBILE_TV, SCREENS } from '../../data/sonylivCaseStudy'
import { SONY_VIDEOS } from '../../data/sonylivVideos'
import styles from './MobileTv.module.css'

// The four recordings differ by about 1% in shape (444 to 452 px wide, 1000 px tall). Side by side that would put their
// captions at slightly different heights, so every frame gets the same shape; the picture is cropped by under 1%.
const PHONE_WIDTH = 450
const PHONE_HEIGHT = 1000

/** One recording in a phone-sized player, with its title and what it shows. The video is fetched only once it is near the screen. */
function Clip({ clip }) {
  const poster = asset(clip.poster)
  return (
    <div className={styles.clip}>
      <div className={styles.phone}>
        <DemoVideo
          src={SONY_VIDEOS[clip.video]}
          poster={poster.src}
          width={PHONE_WIDTH}
          height={PHONE_HEIGHT}
          title={`${clip.title}: a screen recording of the prototype`}
        />
      </div>
      <div className={styles.about}>
        <p className={styles.meta}>{clip.seconds} seconds, on a loop</p>
        <h4>{clip.title}</h4>
        <p>{clip.text}</p>
      </div>
    </div>
  )
}

/**
 * One chapter for both platforms: the four mobile recordings side by side in one row (a row you swipe below 1200px),
 * then six TV screens in a grid that open full size. The two parts keep the anchors of the chapters they replace
 * (#/…/interactivity and #/…/screens), so old links still land on them.
 */
export default function MobileTv() {
  return (
    <Section id="mobile-tv" title={MOBILE_TV.title} lede={MOBILE_TV.lede}>
      <div className={styles.parts}>
        <div id={INTERACTIVITY.id} className={styles.part}>
          <header className={styles.partHeader}>
            <h3>{INTERACTIVITY.title}</h3>
            <p>{INTERACTIVITY.lede}</p>
          </header>
          <ul className={styles.phones} aria-label="Prototype recordings">
            {INTERACTIVITY.clips.map((clip) => (
              <li key={clip.id}>
                <Clip clip={clip} />
              </li>
            ))}
          </ul>
        </div>

        <div id={SCREENS.id} className={styles.part}>
          <header className={styles.partHeader}>
            <h3>{SCREENS.title}</h3>
            <p>{SCREENS.lede}</p>
          </header>
          <FigureGrid>
            {SCREENS.items.map((screen) => (
              <Figure key={screen.id} image={screen.image} title={screen.title} caption={screen.text} />
            ))}
          </FigureGrid>
        </div>
      </div>
    </Section>
  )
}
