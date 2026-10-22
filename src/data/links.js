import linkedinIcon from '../assets/contact/linkedin.svg'
import mailIcon from '../assets/contact/mail.svg'
import whatsappIcon from '../assets/contact/whatsapp.svg'
import behanceIcon from '../assets/contact/behance.svg'
import githubIcon from '../assets/contact/github.svg'

export const PROFILE = {
  name: 'Akash Pandurangan',
  email: 'akashmailbox54@gmail.com',
  phone: '+91 95669 51943',
}

/*
 * Link targets.
 * The Figma file contains labels but no URLs for these destinations, so `href` is left empty
 * where nothing was provided. Fill them in here and every place the link appears updates.
 * Email and phone come from the footer text in the design; the WhatsApp URL is derived from the phone number.
 */
export const LINKS = {
  resume: { label: 'Resume', href: '' },
  linkedin: { label: 'Linked in', href: '', icon: linkedinIcon },
  mail: { label: 'Mail', href: `mailto:${PROFILE.email}`, icon: mailIcon },
  whatsapp: { label: 'Whatsapp', href: 'https://wa.me/919566951943', icon: whatsappIcon },
  behance: { label: 'Behance', href: '', icon: behanceIcon },
  github: { label: 'GitHub', href: '', icon: githubIcon },
  instagram: { label: 'Instagram', href: '' },
  x: { label: 'x', href: '' },
}

/* Order and presentation in the "Contact" bar. */
export const CONTACT_BAR = ['resume', 'linkedin', 'mail', 'whatsapp', 'behance', 'github'].map((id) => ({
  id,
  ...LINKS[id],
  iconOnly: id === 'github',
}))

/* Order in the footer's third column. */
export const FOOTER_SOCIAL = ['resume', 'linkedin', 'mail', 'whatsapp', 'github', 'behance', 'instagram', 'x'].map(
  (id) => ({ id, ...LINKS[id] }),
)

export const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
]

export const CONTACT_ANCHOR = { id: 'contact', label: 'Contact', href: '#contact' }
