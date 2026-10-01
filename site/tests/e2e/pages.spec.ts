import { test, expect } from './fixtures'

const pages = [
  { name: 'Home', path: '/', heading: /Michael Wilson/ },
  { name: 'Projects', path: '/projects', heading: /Things I've Built/ },
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

  await nav.getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(mainHeading).toHaveText(/Things I've Built/)

  await nav.getByRole('link', { name: 'mikey.dev' }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(mainHeading).toHaveText(/Michael Wilson/)
})

// Netlify has no /projects file, so this relies on the SPA rule in public/_redirects
// (/* -> /index.html 200); without it a direct load or refresh returns Netlify's 404.
// Locally it always passes because `vite preview` falls back to index.html itself.
test('direct load and hard refresh of /projects serve the Projects page', async ({ page }) => {
  const firstLoad = await page.goto('/projects')
  expect(firstLoad?.status()).toBeLessThan(400)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Things I've Built/)

  const reload = await page.reload()
  expect(reload?.status()).toBeLessThan(400)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Things I've Built/)
})
