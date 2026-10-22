import styles from './SectionHeading.module.css'

export default function SectionHeading({ children, className = '', ...rest }) {
  return (
    <h2 className={`${styles.heading} ${className}`.trim()} {...rest}>
      {children}
    </h2>
  )
}
