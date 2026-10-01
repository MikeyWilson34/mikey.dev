import { test, expect, RESUME_PATH } from './fixtures'
import type { Page } from '@playwright/test'

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Resume']

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
}

// Gated by device type rather than duplicated: the `mobile` project runs the
// first block, the desktop projects (chromium, webkit) run the second.
test.describe('nav on a phone', () => {
  test.skip(({ isMobile }) => !isMobile, 'phone layout only')
  // A typical iPhone width, slightly narrower than the project's Pixel 7.
  test.use({ viewport: { width: 390, height: 844 } })

  for (const path of ['/', '/projects']) {
    test(`${path} has no horizontal overflow, with the menu closed or open`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(await hasHorizontalOverflow(page)).toBe(false)

      await page.getByRole('button', { name: 'Menu' }).click()
      expect(await hasHorizontalOverflow(page)).toBe(false)
    })

    test(`every nav link on ${path} is reachable through the menu`, async ({ page }) => {
      await page.goto(path)
      const nav = page.getByRole('navigation')
      const toggle = nav.getByRole('button', { name: 'Menu' })

      // Collapsed by default: links are hidden until the menu is opened
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
      await expect(nav.getByRole('link', { name: 'About' })).toBeHidden()

      await toggle.click()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')

      const viewportWidth = page.viewportSize()!.width
      for (const name of NAV_LINKS) {
        const link = nav.getByRole('link', { name })
        await expect(link).toBeVisible()
        const box = (await link.boundingBox())!
        expect(box.x, `${name} starts inside the viewport`).toBeGreaterThanOrEqual(0)
        expect(box.x + box.width, `${name} ends inside the viewport`).toBeLessThanOrEqual(viewportWidth)
      }
    })
  }

  for (const name of ['About', 'Skills', 'Experience']) {
    test(`menu link ${name} scrolls to its section and closes the menu`, async ({ page }) => {
      await page.goto('/')
      const nav = page.getByRole('navigation')
      const toggle = nav.getByRole('button', { name: 'Menu' })

      await toggle.click()
      await nav.getByRole('link', { name }).click()

      await expect(page).toHaveURL(new RegExp(`#${name.toLowerCase()}$`))
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
      await expect(nav.getByRole('link', { name })).toBeHidden()
    })
  }

  test('menu link Projects navigates to the Projects page', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation')

    await nav.getByRole('button', { name: 'Menu' }).click()
    await nav.getByRole('link', { name: 'Projects' }).click()

    await expect(page).toHaveURL(/\/projects$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Things I've Built/)
    await expect(nav.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  test('menu link Resume downloads the resume PDF', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation')

    await nav.getByRole('button', { name: 'Menu' }).click()
    const download = page.waitForEvent('download')
    await nav.getByRole('link', { name: 'Resume' }).click()

    expect((await download).url()).toContain(RESUME_PATH)
  })

  test('Escape closes the menu and returns focus to the menu button', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Menu' })

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
    await expect(page.getByRole('navigation').getByRole('link', { name: 'About' })).toBeHidden()
  })
})

test.describe('nav on a desktop', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop layout only')

  for (const path of ['/', '/projects']) {
    test(`every nav link on ${path} is visible without a menu button`, async ({ page }) => {
      await page.goto(path)
      const nav = page.getByRole('navigation')

      await expect(nav.getByRole('button', { name: 'Menu' })).toBeHidden()
      for (const name of NAV_LINKS) {
        await expect(nav.getByRole('link', { name })).toBeVisible()
      }
    })
  }
})
