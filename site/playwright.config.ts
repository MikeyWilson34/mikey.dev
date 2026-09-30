import { defineConfig, devices } from '@playwright/test'

const PREVIEW_PORT = 4173
const isCI = !!process.env.CI

// BASE_URL points the suite at a deployed site (a Preview Deploy or production).
// When it's unset, we build the site and serve it locally with `vite preview`.
const externalBaseURL = process.env.BASE_URL
const baseURL = externalBaseURL ?? `http://localhost:${PREVIEW_PORT}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  // One retry in CI: a test that fails then passes on retry is a Flaky Test.
  retries: isCI ? 1 : 0,
  reporter: isCI
    ? [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    // FadeIn is decorative; tests never assert on it.
    reducedMotion: 'reduce',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: externalBaseURL
    ? undefined
    : {
        command: `npm run build && npm run preview -- --port ${PREVIEW_PORT} --strictPort`,
        url: baseURL,
        reuseExistingServer: !isCI,
        timeout: 120_000,
      },
})
