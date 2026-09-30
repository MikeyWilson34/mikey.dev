import { test, expect, RESUME_PATH } from './fixtures'

for (const path of ['/', '/projects']) {
  test(`every resume link on ${path} points to the resume PDF`, async ({ page }) => {
    await page.goto(path)
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
