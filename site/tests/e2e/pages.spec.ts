import { test, expect, openNavMenuIfCollapsed } from './fixtures'

const pages = [
  { name: 'Home', path: '/', heading: /Michael Wilson/ },
  { name: 'Experience', path: '/experience', heading: /Where I've built things/ },
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

// Netlify has no /experience, /projects or /interests file, so this relies on the SPA rule in
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

test('Home keeps its sections short: About, Skills and Resume, numbered in order', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('main .section-label')).toHaveText(['01About', '02Skills', '03Resume'])
  // The job history lives on /experience now
  await expect(page.locator('.job')).toHaveCount(0)
})

test('the Experience page lists the full job history, current role first', async ({ page }) => {
  await page.goto('/experience')
  const jobs = page.getByRole('region', { name: 'Job history' }).getByRole('listitem').filter({ has: page.getByRole('heading', { level: 3 }) })

  await expect(jobs).toHaveCount(5)
  await expect(jobs.first()).toContainText('Lightspeed DMS')
  await expect(jobs.first()).toContainText('Current')
})

test('View My Work on Home goes to the Projects page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'View My Work' }).click()

  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Things I've Built/)
})

test('the Skills section lists Playwright under Testing & Automation', async ({ page }) => {
  await page.goto('/')
  const testingGroup = page
    .locator('#skills .skill-group')
    .filter({ has: page.getByRole('heading', { name: 'Testing & Automation' }) })

  await expect(testingGroup.getByRole('listitem').filter({ hasText: /^Playwright$/ })).toBeVisible()
})

test('following a nav link from far down a page opens the new page at the top', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('heading', { name: 'Get in touch' }).scrollIntoViewIfNeeded()
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)

  await openNavMenuIfCollapsed(page)
  await page.getByRole('navigation').getByRole('link', { name: 'Experience' }).click()

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Where I've built things/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})
