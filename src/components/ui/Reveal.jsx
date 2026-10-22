import { useReveal } from '../../hooks/useReveal'
import styles from './Reveal.module.css'

/** Fades its children in once they scroll into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${className}`.trim()}
      data-visible={visible}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
