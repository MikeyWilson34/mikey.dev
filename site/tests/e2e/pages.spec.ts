import { test, expect, openNavMenuIfCollapsed } from './fixtures'

const pages = [
  { name: 'Home', path: '/', heading: /Michael Wilson/ },
  { name: 'Projects', path: '/projects', heading: /Things I've Built/ },
  { name: 'Interests', path: '/interests', heading: /Off the Clock/ },
]

for (const { name, path, heading } of pages) {
  test(`${name} loads without console or page errors`, async ({ page, pageErrors }) => {
    await page.goto(path, { waitUntil: 'load' })

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
    expect(pageErrors).toEqual([])
  })
}

test('nav links move between Home and Projects', async ({ page }) => {
  await page.goto('/')
  const nav = page.getByRole('navigation')
  const mainHeading = page.getByRole('heading', { level: 1 })

  await openNavMenuIfCollapsed(page)
  await nav.getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(mainHeading).toHaveText(/Things I've Built/)

  await nav.getByRole('link', { name: 'mikey.dev' }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(mainHeading).toHaveText(/Michael Wilson/)
})

// Netlify has no /projects or /interests file, so this relies on the SPA rule in
// public/_redirects (/* -> /index.html 200); without it a direct load or refresh
// returns Netlify's 404. Locally it always passes because `vite preview` falls
// back to index.html itself.
for (const { name, path, heading } of pages.filter((p) => p.path !== '/')) {
  test(`direct load and hard refresh of ${path} serve the ${name} page`, async ({ page }) => {
    const firstLoad = await page.goto(path)
    expect(firstLoad?.status()).toBeLessThan(400)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)

    const reload = await page.reload()
    expect(reload?.status()).toBeLessThan(400)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
  })
}

test('the Skills section lists Playwright under Testing & Automation', async ({ page }) => {
  await page.goto('/')
  const testingGroup = page
    .locator('#skills .plate')
    .filter({ has: page.getByRole('heading', { name: 'Testing & Automation' }) })

  await expect(testingGroup.getByRole('listitem').filter({ hasText: /^Playwright$/ })).toBeVisible()
})
