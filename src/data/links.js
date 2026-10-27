import linkedinIcon from '../assets/contact/linkedin.svg'
import mailIcon from '../assets/contact/mail.svg'
import whatsappIcon from '../assets/contact/whatsapp.svg'
import behanceIcon from '../assets/contact/behance.svg'
import githubIcon from '../assets/contact/github.svg'

export const PROFILE = {
  name: 'Akash Pandurangan',
  email: 'akashmailbox54@gmail.com',
  phone: '+91 95669 51943',
  // The facts on the "Hire me" profile card.
  role: 'Product Designer / UI/UX Designer',
  experience: '5+ years',
  lastCompany: 'QuickPlay Pvt Ltd, Chennai',
}

/*
 * Link targets, used by the Contact bar and the footer. Change one here and every place it appears updates.
 * Email and phone come from the footer text in the design; the WhatsApp URL is derived from the phone number.
 * `newTab` opens a link in a new window even when it is not an absolute URL (the resume is a PDF in /public).
 */
export const LINKS = {
  resume: { label: 'Resume', href: `${import.meta.env.BASE_URL}Akash_Pandurangan_Senior_Product_Designer.pdf`, newTab: true },
  linkedin: { label: 'Linked in', href: 'https://www.linkedin.com/in/akashpandurangan/', icon: linkedinIcon },
  mail: { label: 'Mail', href: `mailto:${PROFILE.email}`, icon: mailIcon },
  whatsapp: { label: 'Whatsapp', href: 'https://wa.me/919566951943', icon: whatsappIcon },
  behance: { label: 'Behance', href: 'https://www.behance.net/akashpandurangan', icon: behanceIcon },
  github: { label: 'GitHub', href: 'https://github.com/akashpandurangan', icon: githubIcon },
  instagram: { label: 'Instagram', href: 'https://www.instagram.com/the_justdesign' },
  x: { label: 'x', href: 'https://x.com/the_justdesign' },
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
