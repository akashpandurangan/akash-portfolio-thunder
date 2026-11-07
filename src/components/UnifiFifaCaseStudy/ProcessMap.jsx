import { useMemo } from 'react'
import Reveal from '../ui/Reveal'
import Chapter from './Chapter'
import FigJamBoard from './FigJamBoard'
import { handArrow, handLoop, wobblyCircle } from './handDrawn'
import { PROCESS } from '../../data/unifiFifaCaseStudy'
import styles from './ProcessMap.module.css'

// The drawing is 900 x 905 units: six circles in two rows, read left to right and then back right to left. Solid arrows go forward
// from stage to stage; dashed orange arrows come back, one under each forward arrow, one up the middle from the fourth stage to
// the third, and one long loop up the left from the last stage to the first, because later findings send the work back.
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

/** A dashed return arrow that dips under the gap between two circles: from (x1, y) to (x2, y), `dip` units below. */
function under(x1, x2, y, dip, seed) {
  const span = x2 - x1
  return handLoop(
    [
      [x1, y],
      [x1 + span * 0.2, y + dip * 0.78],
      [x1 + span * 0.5, y + dip],
      [x1 + span * 0.8, y + dip * 0.78],
      [x2, y],
    ],
    seed,
    { head: 13 },
  )
}

/** The strokes of the map, drawn once: two passes round each circle, the forward arrows, and every way back. */
function useDrawing() {
  return useMemo(() => {
    const rings = CENTRES.map(([x, y], index) => ({
      main: wobblyCircle(x, y, R, 11 + index),
      light: wobblyCircle(x, y, R + 4, 41 + index, { jitter: 0.045, overshoot: 0.1 }),
    }))
    const gap = R + 12
    const forward = [
      handArrow([CENTRES[0][0] + gap, 126], [CENTRES[1][0] - gap, 134], 3, { bend: 0.05, head: 15 }),
      handArrow([CENTRES[1][0] + gap, 134], [CENTRES[2][0] - gap, 126], 4, { bend: -0.05, head: 15 }),
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
        { head: 15 },
      ),
      handArrow([CENTRES[3][0] - gap, 606], [CENTRES[4][0] + gap, 594], 6, { bend: 0.05, head: 15 }),
      handArrow([CENTRES[4][0] - gap, 594], [CENTRES[5][0] + gap, 606], 7, { bend: -0.05, head: 15 }),
    ]
    const back = [
      under(370, 230, 167, 30, 21), // 2 back to 1
      under(670, 530, 167, 30, 22), // 3 back to 2
      // 4 back to 3, up the corridor between the second and third lists
      handLoop(
        [
          [674, 557],
          [632, 522],
          [603, 462],
          [600, 330],
          [618, 246],
          [697, 201],
        ],
        25,
        { head: 13 },
      ),
      under(530, 670, 637, 30, 23), // 5 back to 4
      under(230, 370, 637, 30, 24), // 6 back to 5
      // 6 all the way back to 1, up the left-hand side
      handLoop(
        [
          [66, 626],
          [24, 584],
          [8, 410],
          [18, 232],
          [62, 160],
        ],
        9,
        { head: 13 },
      ),
    ]
    const start = handArrow([112, 24], [136, 50], 12, { bend: 0.2, head: 10 })
    return { rings, forward, back, start }
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

/** Between two stacked stages: a solid arrow down, and a dashed one curving back up beside it. */
function Connector() {
  const down = useMemo(() => handArrow([22, 2], [22, 44], 33, { bend: 0.1, head: 11 }), [])
  const up = useMemo(
    () =>
      handLoop(
        [
          [40, 46],
          [52, 36],
          [52, 14],
          [41, 4],
        ],
        34,
        { head: 10 },
      ),
    [],
  )
  return (
    <svg className={styles.connector} viewBox="0 0 64 50" aria-hidden="true">
      <path className={styles.forward} d={down.shaft} />
      <path className={styles.forward} d={down.head} />
      <path className={styles.returnLine} d={up.shaft} />
      <path className={styles.returnHead} d={up.head} />
    </svg>
  )
}

/** A short sample stroke for the key: a solid forward arrow or a dashed return arrow. */
function KeySample({ kind }) {
  const forward = useMemo(() => handArrow([2, 10], [50, 10], 51, { bend: 0.02, head: 9 }), [])
  const back = useMemo(
    () =>
      handLoop(
        [
          [50, 6],
          [38, 16],
          [14, 16],
          [3, 8],
        ],
        52,
        { head: 8 },
      ),
    [],
  )
  return (
    <svg className={styles.sample} viewBox="0 0 54 20" aria-hidden="true">
      {kind === 'forward' ? (
        <>
          <path className={styles.forward} d={forward.shaft} />
          <path className={styles.forward} d={forward.head} />
        </>
      ) : (
        <>
          <path className={styles.returnLine} d={back.shaft} />
          <path className={styles.returnHead} d={back.head} />
        </>
      )}
    </svg>
  )
}

/** 04: the design process as a hand-drawn journey map, then the project's FigJam board to explore it in full. */
export default function ProcessMap() {
  const { stages, lede, note, notes } = PROCESS
  const { rings, forward, back, start } = useDrawing()

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
            {back.map((arrow) => (
              <g key={arrow.shaft}>
                <path className={styles.returnLine} d={arrow.shaft} />
                <path className={styles.returnHead} d={arrow.head} />
              </g>
            ))}
            {forward.map((arrow) => (
              <g key={arrow.shaft}>
                <path className={styles.forward} d={arrow.shaft} />
                <path className={styles.forward} d={arrow.head} />
              </g>
            ))}
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
              {index < stages.length - 1 && <Connector />}
            </li>
          ))}
          <li className={styles.stackLoop}>
            <span className={styles.visuallyHidden}>Findings from the last stage can send the work back to the first.</span>
            <p aria-hidden="true">{notes.loop}</p>
          </li>
        </ol>

        <div className={styles.keys}>
          <ul className={styles.arrowKey} aria-label="Arrows">
            <li>
              <KeySample kind="forward" />
              <span>
                <strong>Forward</strong>
                On to the next stage.
              </span>
            </li>
            <li>
              <KeySample kind="back" />
              <span>
                <strong>Return</strong>
                What a later stage finds sends the work back.
              </span>
            </li>
          </ul>
        </div>
      </Reveal>

      <FigJamBoard />
    </Chapter>
  )
}
