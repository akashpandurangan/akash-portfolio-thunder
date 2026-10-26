import { useState } from 'react'
import { ERRORS } from '../../../data/designSystemCaseStudy'
import { asset } from '../../../data/caseStudyAssets'
import warningIcon from '../../../assets/case-study/ott/dialog/warning.svg'
import buttonIconDark from '../../../assets/case-study/ott/dialog/button-icon-dark.svg'
import buttonIconLight from '../../../assets/case-study/ott/dialog/button-icon-light.svg'
import Segmented from '../ui/Segmented'
import Toggle from '../ui/Toggle'
import RadioList from './RadioList'
import Workbench from './Workbench'
import pv from './pv.module.css'
import styles from './ErrorDemo.module.css'

const poster = asset('ott/prototype-poster.webp')
const ALL = ERRORS.flatMap((group) => group.items)

/**
 * The dialog box of the "error screens" frames, at the sizes of the 1920 × 1080 TV canvas (every length in the CSS is a
 * multiple of `--u`, one design pixel). Three types: standard (a box over the picture), full screen, and two column
 * (icon and text at the left, the buttons stacked at the right); each sits on a solid, blurred or empty background.
 * The buttons carry the icon slot of the component, which the file leaves on its Subtitles placeholder.
 */
export default function ErrorDemo() {
  const [selectedId, setSelectedId] = useState('streams')
  const [type, setType] = useState('standard')
  const [background, setBackground] = useState('solid')
  const [icons, setIcons] = useState(true)
  const [pressed, setPressed] = useState('')
  const error = ALL.find((item) => item.id === selectedId)

  const choose = (id) => {
    setSelectedId(id)
    setPressed('')
  }

  return (
    <Workbench
      title="Error states"
      description="Twelve documented failures in five groups, each with its message and two actions. Pick one to see the dialog, then change its type and the background it sits on."
      built="dialog box › type (standard, full screen, two column), heading, description, icon and button set; background (solid, blur, none); the error screens documentation for the messages and actions."
      stageClassName={styles.stage}
      controlsBelow
      controls={
        <>
          <Segmented
            label="Type"
            value={type}
            onChange={setType}
            options={[
              { value: 'standard', label: 'Standard' },
              { value: 'full', label: 'Full screen' },
              { value: 'columns', label: 'Two column' },
            ]}
          />
          <Segmented
            label="Background"
            value={background}
            onChange={setBackground}
            options={[
              { value: 'solid', label: 'Solid' },
              { value: 'blur', label: 'Blur' },
              { value: 'none', label: 'None' },
            ]}
          />
          <Toggle label="Button icons" checked={icons} onChange={setIcons} />
          <div className={styles.groups}>
            {ERRORS.map((group) => (
              <div key={group.group} className={styles.group}>
                <h4>{group.group}</h4>
                <RadioList
                  label={`${group.group} errors`}
                  items={group.items.map((item) => ({ value: item.id, label: item.name }))}
                  value={group.items.some((item) => item.id === selectedId) ? selectedId : null}
                  onChange={choose}
                  tone="accent"
                />
              </div>
            ))}
          </div>
        </>
      }
    >
      <div className={styles.canvas}>
        <div className={styles.scene} data-type={type} data-background={background}>
          <div className={pv.picture} style={{ '--poster': `url(${poster.src})` }} aria-hidden="true" />
          <div className={styles.dialog} role="alertdialog" aria-labelledby="error-title" aria-describedby="error-message" data-type={type} data-background={background}>
            <div className={styles.set}>
              <div className={styles.lead}>
                <span className={styles.iconFrame}>
                  <img src={warningIcon} width="52" height="52" alt="" draggable="false" />
                </span>
                <div className={styles.content}>
                  <h4 id="error-title" className={styles.title}>
                    {error.name}
                  </h4>
                  <p id="error-message" className={styles.message}>
                    {error.message}
                  </p>
                </div>
              </div>
              <div className={styles.actions}>
                {error.actions.map((action, index) => (
                  <button key={action} type="button" className={styles.action} data-primary={index === 0} onClick={() => setPressed(action)}>
                    {icons && <img src={index === 0 ? buttonIconDark : buttonIconLight} width="52" height="52" alt="" draggable="false" />}
                    <span>{action}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.status} role="status" aria-live="polite">
        {pressed && `${pressed} selected`}
      </p>
    </Workbench>
  )
}
