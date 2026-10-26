import { SETTINGS } from '../../../data/designSystemCaseStudy'

/** What the Figma settings popups show as their selections. */
export const DEFAULT_SETTINGS = { audio: 'English', subtitle: 'Tamil', quality: 'Auto Recommended', speed: 1, size: 'Small', style: 0, position: 'Bottom' }

export const qualityShort = (label) => SETTINGS.video.find((item) => item.label === label)?.detail || label
export const speedLabel = (value) => SETTINGS.speed.find((item) => item.value === value)?.label ?? 'Normal'
