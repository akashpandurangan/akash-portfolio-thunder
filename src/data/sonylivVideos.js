import heroBanner from '../assets/case-study/sonyliv/video/hero-banner-vertical-buttons.mp4'
import detailScreen from '../assets/case-study/sonyliv/video/detail-screen.mp4'
import downloadVideo from '../assets/case-study/sonyliv/video/download-video.mp4'
import search from '../assets/case-study/sonyliv/video/search.mp4'
import homeSearchDownload from '../assets/case-study/sonyliv/video/home-search-download.mp4'

/*
 * The five prototype recordings of the Sony LIV case study. They are the video layers of the Figma page's "Prototype"
 * section (their layer names are these file names) and are also served by the design system site. Each is a muted
 * phone-screen recording of 16 to 62 seconds; the file size is why they are only fetched when they are on screen.
 * The keys are the file names, as the clips of sonylivCaseStudy.js refer to them.
 */
export const SONY_VIDEOS = {
  'hero-banner-vertical-buttons': heroBanner,
  'detail-screen': detailScreen,
  'download-video': downloadVideo,
  search,
  'home-search-download': homeSearchDownload,
}
