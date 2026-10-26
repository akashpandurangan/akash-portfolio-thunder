import { useState } from 'react'
import Section, { Block } from './ui/Section'
import Figure, { FigureGrid } from './ui/Figure'
import Tabs from './ui/Tabs'
import Tag from '../ui/Tag'
import Reveal from '../ui/Reveal'
import DemoVideo from './ui/DemoVideo'
import { asset } from '../../data/caseStudyAssets'
import { COMPONENTS } from '../../data/designSystemCaseStudy'
import cardVideo from '../../assets/projects/video/ott-design-system.mp4'
import styles from './ComponentSystem.module.css'

function Parts({ items }) {
  return (
    <ul className={styles.parts} aria-label="Parts and variants">
      {items.map((item) => (
        <li key={item}>
          <Tag roomy>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}

/** A block that offers several figures one at a time (the three seek bar modes). */
function FigureTabs({ tabs, label }) {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <Tabs
      size="sm"
      label={label}
      tabs={tabs}
      value={active}
      onChange={setActive}
      render={(tab) => <Figure {...tab.figure} span="full" />}
    />
  )
}

function CategoryPanel({ category }) {
  return (
    <div className={styles.panel}>
      <p className={styles.intro}>{category.intro}</p>
      {category.blocks.map((block) => (
        <Reveal key={block.title}>
          <Block title={block.title} text={block.text}>
            {block.parts && <Parts items={block.parts} />}
            {block.tabs && <FigureTabs tabs={block.tabs} label={`${block.title} modes`} />}
            {block.figures && (
              <FigureGrid>
                {block.figures.map((figure) => (
                  <Figure key={figure.image} {...figure} />
                ))}
              </FigureGrid>
            )}
          </Block>
        </Reveal>
      ))}
      {category.video && (
        <Reveal>
          <Block title={category.video.title} text={category.video.text}>
            <DemoVideo
              src={cardVideo}
              poster={asset('ott/cards/card-video-poster.webp').src}
              width={1356}
              height={720}
              title={category.video.title}
              caption={category.video.caption}
            />
          </Block>
        </Reveal>
      )}
    </div>
  )
}

export default function ComponentSystem() {
  const [active, setActive] = useState(COMPONENTS.categories[0].id)
  const tabs = COMPONENTS.categories.map(({ id, label }) => ({ id, label }))

  return (
    <Section id="components" title="Video-player component system" lede={COMPONENTS.lede}>
      <Tabs
        label="Component groups"
        tabs={tabs}
        value={active}
        onChange={setActive}
        render={(tab) => <CategoryPanel category={COMPONENTS.categories.find((category) => category.id === tab.id)} />}
      />
    </Section>
  )
}
