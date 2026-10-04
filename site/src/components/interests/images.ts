import { groupImages } from './gallery'

// Every image under src/assets/interests/<slug>/, resolved to a URL at build
// time. Adding or removing a file is all it takes; there is no list to edit.
const files = import.meta.glob<string>(
  '/src/assets/interests/*/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}',
  { eager: true, query: '?url', import: 'default' },
)

export const imagesBySlug = groupImages(files)
