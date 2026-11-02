import { ArrowUpRight } from 'lucide-react'
import SmartLink from '../ui/SmartLink'
import styles from './SiteLink.module.css'

/** The pill that opens the live design system site in a new tab. */
export default function SiteLink({ label, href }) {
  return (
    <SmartLink className={styles.link} href={href}>
      {label}
      <ArrowUpRight size={16} aria-hidden="true" />
    </SmartLink>
  )
}
