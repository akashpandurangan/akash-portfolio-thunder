import { useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { ERRORS } from '../../../data/designSystemCaseStudy'
import { asset } from '../../../data/caseStudyAssets'
import Segmented from '../ui/Segmented'
import RadioList from './RadioList'
import Workbench from './Workbench'
import pv from './pv.module.css'
import styles from './ErrorDemo.module.css'

const poster = asset('ott/prototype-poster.webp')
const ALL = ERRORS.flatMap((group) => group.items)

export default function ErrorDemo() {
  const [selectedId, setSelectedId] = useState('streams')
  const [background, setBackground] = useState('solid')
  const [pressed, setPressed] = useState('')
  const error = ALL.find((item) => item.id === selectedId)

  const choose = (id) => {
    setSelectedId(id)
    setPressed('')
  }

  return (
    <Workbench
      title="Error states"
      description="Twelve documented failures in five groups, each with its message and two actions. Pick one to see the dialog, and change the background it sits on."
      built="dialog box › heading, description, icon and button set; background (solid, blur, none); the error screens documentation for the messages and actions."
      stageClassName={styles.stage}
      controlsBelow
      controls={
        <>
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
      <div className={styles.scene} data-background={background}>
        <div className={pv.picture} style={{ '--poster': `url(${poster.src})` }} aria-hidden="true" />
        <div className={styles.dialog} role="alertdialog" aria-labelledby="error-title" aria-describedby="error-message" data-background={background}>
          <TriangleAlert size={32} strokeWidth={1.5} aria-hidden="true" />
          <h4 id="error-title" className={styles.title}>
            {error.name}
          </h4>
          <p id="error-message" className={styles.message}>
            {error.message}
          </p>
          <div className={styles.actions}>
            {error.actions.map((action, index) => (
              <button key={action} type="button" className={styles.action} data-primary={index === 0} onClick={() => setPressed(action)}>
                {action}
              </button>
            ))}
          </div>
          <p className={styles.status} role="status" aria-live="polite">
            {pressed && `${pressed} selected`}
          </p>
        </div>
      </div>
    </Workbench>
  )
}
