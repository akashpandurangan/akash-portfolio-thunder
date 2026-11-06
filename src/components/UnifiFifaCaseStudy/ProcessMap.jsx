import { useMemo } from 'react'
import Reveal from '../ui/Reveal'
import Chapter from './Chapter'
import FigJamBoard from './FigJamBoard'
import { handArrow, handLoop, wobblyCircle } from './handDrawn'
import { PROCESS } from '../../data/unifiFifaCaseStudy'
import styles from './ProcessMap.module.css'

// The drawing is 900 x 905 units: six circles in two rows, read left to right and then back right to left.
const W = 900
const H = 905
const R = 88
const CENTRES = [
  [150, 130],
  [450, 130],
  [750, 130],
  [750, 600],
  [450, 600],
  [150, 600],
]

const pctX = (x) => `${(x / W) * 100}%`
const pctY = (y) => `${(y / H) * 100}%`

/** The strokes of the map, drawn once: two passes round each circle, the arrows between them, and the loop back. */
function useDrawing() {
  return useMemo(() => {
    const rings = CENTRES.map(([x, y], index) => ({
      main: wobblyCircle(x, y, R, 11 + index),
      light: wobblyCircle(x, y, R + 4, 41 + index, { jitter: 0.045, overshoot: 0.1 }),
    }))
    const gap = R + 12
    const arrows = [
      handArrow([CENTRES[0][0] + gap, 126], [CENTRES[1][0] - gap, 134], 3, { bend: 0.05 }),
      handArrow([CENTRES[1][0] + gap, 134], [CENTRES[2][0] - gap, 126], 4, { bend: -0.05 }),
      // down the right-hand side, round the lists, into the first circle of the second row
      handLoop(
        [
          [818, 192],
          [866, 252],
          [885, 362],
          [868, 474],
          [820, 540],
        ],
        5,
      ),
      handArrow([CENTRES[3][0] - gap, 606], [CENTRES[4][0] + gap, 594], 6, { bend: 0.05 }),
      handArrow([CENTRES[4][0] - gap, 594], [CENTRES[5][0] + gap, 606], 7, { bend: -0.05 }),
    ]
    const loop = handLoop(
      [
        [66, 626],
        [24, 584],
        [8, 410],
        [18, 232],
        [62, 160],
      ],
      9,
    )
    const start = handArrow([112, 24], [136, 50], 12, { bend: 0.2, head: 10 })
    return { rings, arrows, loop, start }
  }, [])
}

/** A small hand-drawn ring for the stack's number badges. */
function Badge({ number, index }) {
  const d = useMemo(() => wobblyCircle(32, 32, 27, 70 + index, { points: 22 }), [index])
  return (
    <span className={styles.badge}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d={d} />
      </svg>
      <span>{number}</span>
    </span>
  )
}

function DownArrow() {
  const { shaft, head } = useMemo(() => handArrow([12, 2], [12, 40], 33, { bend: 0.12 }), [])
  return (
    <svg className={styles.down} viewBox="0 0 24 44" aria-hidden="true">
      <path d={shaft} />
      <path d={head} />
    </svg>
  )
}

/** 04: the design process as a hand-drawn journey map, then the project's FigJam board to explore it in full. */
export default function ProcessMap() {
  const { stages, lede, note, notes } = PROCESS
  const { rings, arrows, loop, start } = useDrawing()

  return (
    <Chapter id="process" title="Design process overview" lede={lede}>
      <Reveal className={styles.panel}>
        <p className={styles.note}>{note}</p>

        <div className={styles.canvas} aria-hidden="true">
          <svg className={styles.drawing} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            {rings.map((ring, index) => (
              <g key={stages[index].id}>
                <path className={styles.ringLight} d={ring.light} />
                <path className={styles.ring} d={ring.main} />
              </g>
            ))}
            {arrows.map((arrow) => (
              <g key={arrow.shaft}>
                <path className={styles.arrow} d={arrow.shaft} />
                <path className={styles.arrow} d={arrow.head} />
              </g>
            ))}
            <path className={styles.loop} d={loop.shaft} />
            <path className={styles.arrow} d={loop.head} />
            <path className={styles.arrow} d={start.shaft} />
            <path className={styles.arrow} d={start.head} />
          </svg>

          {stages.map((stage, index) => {
            const [x, y] = CENTRES[index]
            return (
              <div key={stage.id}>
                <div className={styles.stage} style={{ left: pctX(x - R), top: pctY(y - R) }}>
                  <span className={styles.stageNumber}>{stage.number}</span>
                  <h3 className={styles.stageName}>{stage.name}</h3>
                  <p className={styles.stageAim}>{stage.aim}</p>
                </div>
                <ul className={styles.items} style={{ left: pctX(x - 119), top: pctY(y + R + 22) }}>
                  {stage.items.map((item) => (
                    <li key={item.label} className={styles.item} data-status={item.status}>
                      <span className={styles.dot} data-status={item.status} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          <p className={styles.hand} style={{ left: pctX(14), top: pctY(2) }}>
            {notes.start}
          </p>
          <p className={`${styles.hand} ${styles.handLoop}`} style={{ left: pctX(-14), top: pctY(640) }}>
            {notes.loop}
          </p>
        </div>

        <ol className={styles.stack}>
          {stages.map((stage, index) => (
            <li key={stage.id}>
              <div className={styles.stackStage}>
                <Badge number={stage.number} index={index} />
                <div className={styles.stackBody}>
                  <h3>{stage.name}</h3>
                  <p>{stage.aim}</p>
                  <ul className={styles.stackList}>
                    {stage.items.map((item) => (
                      <li key={item.label} data-status={item.status}>
                        <span className={styles.dot} data-status={item.status} />
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {index < stages.length - 1 && <DownArrow />}
            </li>
          ))}
        </ol>
      </Reveal>

      <FigJamBoard />
    </Chapter>
  )
}
