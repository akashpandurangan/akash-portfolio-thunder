import Section, { Block } from '../CaseStudy/ui/Section'
import Figure, { FigureGrid, FigureRow } from '../CaseStudy/ui/Figure'
import FrameViewer from '../CaseStudy/ui/FrameViewer'
import { BRAND_KIT, DASHBOARD, INSIGHTS, NARRATIVE, PERFORMANCE } from '../../data/aiStudioCaseStudy'

/** The home page, three states of it side by side: these are long pages, so each takes a third of the width. */
export function Dashboard() {
  const { title, lede, figures } = DASHBOARD
  return (
    <Section id="dashboard" title={title} lede={lede}>
      <FigureGrid>
        {figures.map((figure, index) => (
          <Figure key={figure.image} {...figure} span="narrow" priority={index === 0} />
        ))}
      </FigureGrid>
    </Section>
  )
}

/** The page of one trend, the filters on its related clips as a viewer, and the three filter lists. */
export function Insights() {
  const { title, lede, page, filters, options } = INSIGHTS
  return (
    <Section id="insights" title={title} lede={lede}>
      <Block title={page.title} text={page.text}>
        <FigureGrid>
          <Figure {...page.figure} span="full" />
        </FigureGrid>
      </Block>
      <Block title={filters.title} text={filters.text}>
        <FrameViewer items={filters.items} label="Related clips filter screens" ratio={filters.ratio} />
      </Block>
      <Block title={options.title} text={options.text}>
        <FigureRow figures={options.figures} label="The three filter lists" />
      </Block>
    </Section>
  )
}

/** The assistant conversation, step by step, in one viewer. */
export function Narrative() {
  const { title, lede, items, ratio } = NARRATIVE
  return (
    <Section id="narrative" title={title} lede={lede}>
      <FrameViewer items={items} label="Create narrative screens" ratio={ratio} />
    </Section>
  )
}

/** Channel, video and narrative performance, two by two. */
export function Performance() {
  const { title, lede, figures } = PERFORMANCE
  return (
    <Section id="performance" title={title} lede={lede}>
      <FigureGrid>
        {figures.map((figure) => (
          <Figure key={figure.image} {...figure} span="half-wide" />
        ))}
      </FigureGrid>
    </Section>
  )
}

/** The Brand Center pages side by side, then the template builder as a viewer. */
export function BrandKit() {
  const { title, lede, assets, template } = BRAND_KIT
  return (
    <Section id="brand-kit" title={title} lede={lede}>
      <Block title={assets.title} text={assets.text}>
        <FigureGrid>
          {assets.figures.map((figure) => (
            <Figure key={figure.image} {...figure} span="half-wide" />
          ))}
        </FigureGrid>
      </Block>
      <Block title={template.title} text={template.text}>
        <FrameViewer items={template.items} label="Create template screens" ratio={template.ratio} />
      </Block>
    </Section>
  )
}
