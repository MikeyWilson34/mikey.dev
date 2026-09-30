# GitHub Actions deploys to Netlify; Netlify auto-builds are off

Netlify only hosts the site. GitHub Actions runs the tests and then deploys with the Netlify CLI, and Netlify's own build-on-push is disabled. Netlify's auto-build does not wait for tests, so it couldn't enforce the Deploy Gate. Don't turn Netlify builds back on.
