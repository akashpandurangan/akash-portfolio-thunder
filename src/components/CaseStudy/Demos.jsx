import { useState } from 'react'
import Section, { Block } from './ui/Section'
import Figure, { FigureRow } from './ui/Figure'
import FrameViewer from './ui/FrameViewer'
import Tabs from './ui/Tabs'
import Reveal from '../ui/Reveal'
import MobilePlayer from './prototypes/MobilePlayer'
import TvPlayer from './prototypes/TvPlayer'
import { MOBILE_LAYOUTS, MOBILE_STATES, TV_GROUPS } from '../../data/designSystemCaseStudy'
import styles from './Demos.module.css'

const mobileStates = MOBILE_STATES.map((state) => ({ ...state, image: `ott/mobile/player/${state.file}.webp` }))

function LiveBadge({ children }) {
  return (
    <p className={styles.badge}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </p>
  )
}

function TvGroup({ group }) {
  const items = group.frames.map((frame) => ({ ...frame, image: `ott/tv/${frame.file}.webp` }))
  return (
    <div className={styles.group}>
      <p className={styles.groupIntro}>{group.intro}</p>
      <FrameViewer key={group.id} items={items} label={`${group.label} screens`} />
    </div>
  )
}

export default function Demos() {
  const [tvGroup, setTvGroup] = useState(TV_GROUPS[0].id)

  return (
    <Section
      id="demos"
      title="Mobile and TV demonstrations"
      lede="The same player on a phone and on a television. Each has a live prototype built from the shared components, next to the real screens from the design files."
    >
      <Reveal as="p" className={styles.note}>
        There is no screen recording of the player in the source files, so these are working prototypes and the real Figma frames. A recording can replace them when one exists.
      </Reveal>

      <Block
        title="Mobile"
        text="Touch first: tap the picture for the controls, skip the intro, scrub, open the settings sheet, or let the episode finish to see the next-up card. Choose a speed or subtitle in the sheet and it applies to the player."
      >
        <div className={styles.pair}>
          <Reveal className={styles.live}>
            <LiveBadge>Live prototype</LiveBadge>
            <MobilePlayer />
          </Reveal>
          <Reveal className={styles.real}>
            <h4 className={styles.subtitle}>The same states in Figma</h4>
            <FrameViewer items={mobileStates} label="Mobile player states" tone="phone" />
          </Reveal>
        </div>

        <div className={styles.layouts}>
          <h4 className={styles.subtitle}>Four seek bar layouts</h4>
          <p className={styles.layoutsText}>The portrait player was drawn with four arrangements of the bar and its time, shown here in the controls state.</p>
          <FigureRow
            label="Four seek bar layouts"
            figures={MOBILE_LAYOUTS.map((layout) => ({ image: `ott/mobile/player/${layout.file}-02.webp`, title: layout.label, caption: layout.text }))}
          />
        </div>

        <Figure
          image="ott/mobile/base-components.webp"
          title="Portrait base components"
          caption="The pieces behind those states: playback controls, seek bar variants, chips, scrubber previews, brightness and volume, media cards, next show and the locked screen."
          span="full"
        />
      </Block>

      <Block
        title="Smart TV"
        text="Driven by a remote. Use the arrow keys, Enter and Escape, or the on-screen remote: focus moves along the seek bar and the options, a panel opens at the side, and Back returns you to where you were."
      >
        <Reveal className={styles.tvLive}>
          <LiveBadge>Live prototype</LiveBadge>
          <TvPlayer />
        </Reveal>

        <div className={styles.tvReal}>
          <h4 className={styles.subtitle}>TV screens from the design file</h4>
          <Tabs
            size="sm"
            label="TV screen groups"
            tabs={TV_GROUPS.map(({ id, label }) => ({ id, label }))}
            value={tvGroup}
            onChange={setTvGroup}
            render={(tab) => <TvGroup group={TV_GROUPS.find((group) => group.id === tab.id)} />}
          />
        </div>
      </Block>
    </Section>
  )
}
