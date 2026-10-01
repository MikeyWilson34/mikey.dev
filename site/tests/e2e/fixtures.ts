import { test as base, expect, type Page } from '@playwright/test'

/**
 * Collects browser console errors and uncaught page errors for the whole test.
 * Tests call `expect(pageErrors).toEqual([])` once the page has settled.
 */
export const test = base.extend<{ pageErrors: string[] }>({
  pageErrors: async ({ page }, use) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(`console.error: ${message.text()}`)
    })
    page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
    await use(errors)
  },
})

export { expect }

export const RESUME_PATH = '/michael_wilson_resume.pdf'

/**
 * On small screens the nav links sit behind a menu button. Opens it if it's
 * there, so the same test steps work on desktop and mobile projects.
 */
export async function openNavMenuIfCollapsed(page: Page) {
  const toggle = page.getByRole('button', { name: 'Menu' })
  if (await toggle.isVisible()) {
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  }
}
