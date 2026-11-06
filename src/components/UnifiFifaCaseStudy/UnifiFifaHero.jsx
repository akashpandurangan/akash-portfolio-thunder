import CaseStudyHero from '../CaseStudy/CaseStudyHero'
import { HERO } from '../../data/unifiFifaCaseStudy'

// Real screens from the two design boards, back to front: the event landing page, the Season Pass purchase screen overlapping
// it, the success state at the bottom left and the OTP screen cut off by the bottom edge of the card.
const LAYERS = [
  { path: 'unifi-fifa/daily/landing.webp', alt: 'The FIFA World Cup 2026 banner on the Unifi TV home page, with its Daily Pass badge and Buy Pass button', wide: [150, 0, 640], tall: [96, 8, 544] },
  { path: 'unifi-fifa/season/buy-pass.webp', alt: 'The Season Pass Buy Pass screen: pass summary, payable amount and payment methods', wide: [600, 100, 470], tall: [140, 190, 480] },
  { path: 'unifi-fifa/daily/success.webp', alt: 'The purchase Success state with Go to Events and Manage Subscription', wide: [24, 190, 300], tall: [14, 330, 280] },
  { path: 'unifi-fifa/auth/otp-hero.webp', alt: 'The Verify OTP screen', wide: [340, 300, 420], tall: [250, 430, 380] },
]

/** The banner of the Unifi TV × FIFA World Cup 2026 case study. */
export default function UnifiFifaHero() {
  return <CaseStudyHero crumb="Unifi TV × FIFA World Cup 2026" {...HERO} layers={LAYERS} />
}
