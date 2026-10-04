import { test, expect, RESUME_PATH, openNavMenuIfCollapsed } from './fixtures'
import type { Page } from '@playwright/test'

const NAV_LINKS = ['Home', 'Experience', 'Projects', 'Interests', 'Resume']

// Every page link, with where it goes. Each test starts on a page other than
// the link's own, so the click is a real navigation.
const PAGE_LINKS = [
  { name: 'Home', url: /\/$/, heading: /Michael Wilson/ },
  { name: 'Experience', url: /\/experience$/, heading: /Where I've built things/ },
  { name: 'Projects', url: /\/projects$/, heading: /Things I've Built/ },
  { name: 'Interests', url: /\/interests$/, heading: /Off the Clock/ },
]

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
}

// Gated by device type rather than duplicated: the `mobile` project runs the
// first block, the desktop projects (chromium, webkit) run the second.
test.describe('nav on a phone', () => {
  test.skip(({ isMobile }) => !isMobile, 'phone layout only')
  // A typical iPhone width, slightly narrower than the project's Pixel 7.
  test.use({ viewport: { width: 390, height: 844 } })

  for (const path of ['/', '/experience', '/projects', '/interests']) {
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
      await expect(nav.getByRole('link', { name: 'Experience' })).toBeHidden()

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

  for (const { name, url, heading } of PAGE_LINKS) {
    test(`menu link ${name} navigates to the ${name} page and closes the menu`, async ({ page }) => {
      await page.goto(name === 'Home' ? '/projects' : '/')
      const nav = page.getByRole('navigation')
      const toggle = nav.getByRole('button', { name: 'Menu' })

      await toggle.click()
      await nav.getByRole('link', { name }).click()

      await expect(page).toHaveURL(url)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
      await expect(nav.getByRole('link', { name })).toBeHidden()

      // The link for the current page is marked once the menu is reopened
      await toggle.click()
      await expect(nav.getByRole('link', { name })).toHaveClass(/active/)
    })
  }

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
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Experience' })).toBeHidden()
  })
})

test.describe('nav on a desktop', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop layout only')

  for (const path of ['/', '/experience', '/projects', '/interests']) {
    test(`every nav link on ${path} is visible without a menu button`, async ({ page }) => {
      await page.goto(path)
      const nav = page.getByRole('navigation')

      await expect(nav.getByRole('button', { name: 'Menu' })).toBeHidden()
      for (const name of NAV_LINKS) {
        await expect(nav.getByRole('link', { name })).toBeVisible()
      }
    })
  }

  for (const { name, url, heading } of PAGE_LINKS) {
    test(`nav link ${name} navigates to the ${name} page and marks itself active`, async ({ page }) => {
      await page.goto(name === 'Home' ? '/projects' : '/')
      const link = page.getByRole('navigation').getByRole('link', { name })

      await link.click()

      await expect(page).toHaveURL(url)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
      await expect(link).toHaveClass(/active/)
    })
  }
})

// Exactly one page link is active on each route. Home matches only "/",
// not every path that starts with it.
for (const { name: current, url } of PAGE_LINKS) {
  const path = current === 'Home' ? '/' : `/${current.toLowerCase()}`
  test(`only the ${current} nav link is active on ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page).toHaveURL(url)
    const nav = page.getByRole('navigation')
    await openNavMenuIfCollapsed(page)

    for (const { name } of PAGE_LINKS) {
      const link = nav.getByRole('link', { name })
      if (name === current) await expect(link).toHaveClass(/active/)
      else await expect(link).not.toHaveClass(/active/)
    }
  })
}
