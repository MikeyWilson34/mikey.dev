import AxeBuilder from '@axe-core/playwright'
import { test, expect } from './fixtures'

const BLOCKING_IMPACTS = ['serious', 'critical']

for (const path of ['/', '/projects']) {
  test(`${path} has no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    const { violations } = await new AxeBuilder({ page }).analyze()
    const blocking = violations
      .filter((violation) => BLOCKING_IMPACTS.includes(violation.impact ?? ''))
      .map(({ id, impact, help, nodes }) => ({
        id,
        impact,
        help,
        nodes: nodes.map((node) => `${node.target.join(' ')} -> ${node.failureSummary}`),
      }))

    expect(blocking).toEqual([])
  })
}
