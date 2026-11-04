import { test, expect, RESUME_PATH, openNavMenuIfCollapsed } from './fixtures'

for (const path of ['/', '/experience', '/projects', '/interests']) {
  test(`every resume link on ${path} points to the resume PDF`, async ({ page }) => {
    await page.goto(path)
    // Some pages' only resume link is the nav button, behind the menu on phones
    await openNavMenuIfCollapsed(page)
    const resumeLinks = page.getByRole('link', { name: /resume/i })

    await expect(resumeLinks.first()).toBeVisible()
    for (const link of await resumeLinks.all()) {
      await expect(link).toHaveAttribute('href', RESUME_PATH)
    }
  })
}

test('the resume PDF is served as a PDF', async ({ request }) => {
  const response = await request.get(RESUME_PATH)

  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('application/pdf')
})
