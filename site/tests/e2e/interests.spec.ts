import { readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { test, expect } from './fixtures'
import { INTERESTS } from '../../src/components/interests/interests.config'
import {
  altFromFilename,
  groupImages,
  shouldAutoAdvance,
  wrapIndex,
  type AutoAdvanceState,
} from '../../src/components/interests/gallery'

const IMAGES_DIR = fileURLToPath(new URL('../../src/assets/interests/', import.meta.url))
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i

/** Image files in an interest's folder, as the build will see them. */
function imageFiles(slug: string) {
  return readdirSync(IMAGES_DIR + slug).filter((name) => IMAGE_EXT.test(name))
}

test.describe('Interests page', () => {
  // Works whether or not photos have been added yet, so it keeps passing as
  // the owner fills the folders: each section shows either the placeholder or
  // a working slideshow, matching what's in its folder.
  for (const { slug, title } of INTERESTS) {
    test(`the ${title} section matches the contents of interests/${slug}`, async ({ page, pageErrors }) => {
      await page.goto('/interests')
      const section = page.locator(`section#${slug}`)
      await expect(section.getByRole('heading', { level: 2, name: title })).toBeVisible()

      const count = imageFiles(slug).length
      const carousel = section.getByRole('region', { name: `${title} photos` })

      if (count === 0) {
        await expect(section.getByText('Photos coming soon')).toBeVisible()
        await expect(section.getByRole('img')).toHaveCount(0)
        await expect(carousel).toHaveCount(0)
      } else if (count === 1) {
        const image = section.getByRole('img')
        await expect(image).toBeVisible()
        await expect(image).toHaveAttribute('alt', /\S/)
        await expect(carousel).toHaveCount(0)
        await expect(section.getByRole('button')).toHaveCount(0)
      } else {
        await expect(carousel.getByRole('button', { name: /^Show photo \d+ of \d+$/ })).toHaveCount(count)
        const current = carousel.getByRole('button', { name: `Show photo 1 of ${count}` })
        await expect(current).toHaveAttribute('aria-current', 'true')
        await expect(carousel.getByRole('img').first()).toHaveAttribute('alt', /\S/)

        await carousel.getByRole('button', { name: 'Next photo' }).click()
        await expect(carousel.getByRole('button', { name: `Show photo 2 of ${count}` })).toHaveAttribute('aria-current', 'true')

        await carousel.getByRole('button', { name: 'Previous photo' }).click()
        await carousel.getByRole('button', { name: 'Previous photo' }).click()
        await expect(carousel.getByRole('button', { name: `Show photo ${count} of ${count}` })).toHaveAttribute('aria-current', 'true')
      }

      expect(pageErrors).toEqual([])
    })
  }

  // Photos are never cropped: each shows whole inside a square frame, and the
  // space around a non-square one is the page colour so it blends in.
  for (const { slug, title } of INTERESTS) {
    test(`the ${title} photos load and show whole in a square frame`, async ({ page, browserName }) => {
      test.skip(imageFiles(slug).length === 0, `no photos in interests/${slug} yet`)
      await page.goto('/interests')
      const section = page.locator(`section#${slug}`)
      const frame = section.locator('.gallery-frame')
      await frame.scrollIntoViewIfNeeded()
      await expect(section.getByRole('img').first()).toBeVisible()

      // Every photo rendered so far (the current one and the next) must load.
      // Playwright's WebKit build on Windows can't decode AVIF at all, though
      // Safari 16+ can, so AVIF is only checked there for its styling.
      const images = section.locator('.gallery-frame img')
      for (const image of await images.all()) {
        const src = (await image.getAttribute('src')) ?? ''
        if (!(browserName === 'webkit' && process.platform === 'win32' && /\.avif$/i.test(src))) {
          await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth), src).toBeGreaterThan(0)
        }
        await expect(image).toHaveCSS('object-fit', 'contain')
      }

      const box = await frame.boundingBox()
      expect(box).not.toBeNull()
      expect(Math.abs(box!.width - box!.height)).toBeLessThanOrEqual(1)
      expect(box!.width).toBeLessThanOrEqual(560)

      const pageBackground = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
      await expect(frame).toHaveCSS('background-color', pageBackground)
    })
  }

  test('sections appear in the configured order', async ({ page }) => {
    await page.goto('/interests')
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(INTERESTS.map((i) => i.title))
  })
})

// Pure logic and repo layout. No browser needed, so run them once.
test.describe('Interests gallery logic', () => {
  test.skip(({ browserName, isMobile }) => browserName !== 'chromium' || isMobile, 'browser-independent; desktop Chromium only')

  test('every configured interest has a folder, and every folder is configured', () => {
    const folders = readdirSync(IMAGES_DIR).filter((name) => statSync(IMAGES_DIR + name).isDirectory())
    expect(folders.sort()).toEqual(INTERESTS.map((i) => i.slug).sort())
  })

  test('alt text is derived from the filename', () => {
    expect(altFromFilename('01-golden-son.jpg')).toBe('golden son')
    expect(altFromFilename('3_morning_star-cover.WEBP')).toBe('morning star cover')
    expect(altFromFilename('Jokic dunk.png')).toBe('Jokic dunk')
    expect(altFromFilename('2023-finals.jpg')).toBe('finals')
    expect(altFromFilename('pacific-rim-2.jpeg')).toBe('pacific rim 2')
    expect(altFromFilename('01.jpg')).toBe('')
  })

  test('images are grouped by folder and sorted by filename, numbers compared numerically', () => {
    const groups = groupImages({
      '/src/assets/interests/books/10-dark-age.jpg': 'c',
      '/src/assets/interests/books/02-morning-star.jpg': 'b',
      '/src/assets/interests/movies/the-raid.png': 'm',
      '/src/assets/interests/books/01-golden-son.jpg': 'a',
    })

    expect(Object.keys(groups).sort()).toEqual(['books', 'movies'])
    expect(groups.books.map((image) => image.src)).toEqual(['a', 'b', 'c'])
    expect(groups.books[0]).toEqual({ src: 'a', filename: '01-golden-son.jpg', alt: 'golden son' })
    expect(groups.movies).toHaveLength(1)
  })

  test('slide indexes wrap in both directions', () => {
    expect(wrapIndex(3, 3)).toBe(0)
    expect(wrapIndex(-1, 3)).toBe(2)
    expect(wrapIndex(4, 3)).toBe(1)
    expect(wrapIndex(0, 0)).toBe(0)
  })

  test('the slideshow auto-advances only when nothing should hold it', () => {
    const idle: AutoAdvanceState = {
      count: 3,
      reducedMotion: false,
      hovered: false,
      focused: false,
      pageHidden: false,
      userPaused: false,
    }
    expect(shouldAutoAdvance(idle)).toBe(true)

    expect(shouldAutoAdvance({ ...idle, count: 1 })).toBe(false)
    expect(shouldAutoAdvance({ ...idle, count: 0 })).toBe(false)
    for (const hold of ['reducedMotion', 'hovered', 'focused', 'pageHidden', 'userPaused'] as const) {
      expect(shouldAutoAdvance({ ...idle, [hold]: true }), hold).toBe(false)
    }
  })
})
