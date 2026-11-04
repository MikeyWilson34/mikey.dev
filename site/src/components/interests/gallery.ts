/**
 * Pure helpers behind the Interests slideshows. No Vite or DOM APIs here, so
 * the e2e suite can import and check them directly.
 */

export const AUTO_ADVANCE_MS = 5000

export interface GalleryImage {
  src: string
  filename: string
  /** Derived from the filename; may be empty (e.g. `01.jpg`) */
  alt: string
}

export function filenameOf(path: string): string {
  return path.split('/').pop() ?? path
}

/**
 * Readable alt text from a filename: drop the extension, any leading number
 * used for ordering, and turn dashes and underscores into spaces.
 * `03-golden_son-cover.jpg` -> `golden son cover`
 */
export function altFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+(?=[\s._-]|$)[\s._-]*/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Groups `{ '/src/assets/interests/<slug>/<file>': url }` (the shape
 * `import.meta.glob` returns) by folder, each group sorted by filename.
 * Numeric-aware, so `2-x` sorts before `10-x`.
 */
export function groupImages(files: Record<string, string>): Record<string, GalleryImage[]> {
  const groups: Record<string, GalleryImage[]> = {}
  for (const [path, src] of Object.entries(files)) {
    const parts = path.split('/')
    const slug = parts[parts.length - 2]
    const filename = parts[parts.length - 1]
    ;(groups[slug] ??= []).push({ src, filename, alt: altFromFilename(filename) })
  }
  for (const images of Object.values(groups)) {
    images.sort((a, b) => a.filename.localeCompare(b.filename, 'en', { numeric: true, sensitivity: 'base' }))
  }
  return groups
}

/** Index arithmetic that wraps both ways: -1 is the last slide. */
export function wrapIndex(index: number, count: number): number {
  if (count <= 0) return 0
  return ((index % count) + count) % count
}

export interface AutoAdvanceState {
  count: number
  reducedMotion: boolean
  hovered: boolean
  focused: boolean
  pageHidden: boolean
  userPaused: boolean
}

/** Rotate only with 2+ slides, motion allowed, and nobody looking closely. */
export function shouldAutoAdvance(state: AutoAdvanceState): boolean {
  return (
    state.count > 1 &&
    !state.reducedMotion &&
    !state.hovered &&
    !state.focused &&
    !state.pageHidden &&
    !state.userPaused
  )
}
