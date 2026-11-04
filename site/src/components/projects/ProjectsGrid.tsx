import Tags from '../Tags'

/** Zero-padded index, e.g. 2 -> '02' */
const indexLabel = (i: number) => String(i + 1).padStart(2, '0')

interface Highlight {
  label: string
  value: string
}

interface Project {
  title: string
  description: string
  tags: string[]
  featured?: boolean
  highlights?: Highlight[]
  links?: { label: string; href: string }[]
}

const projects: Project[] = [
  {
    title: 'Portfolio Test & Deploy Pipeline',
    featured: true,
    description:
      'This site is tested and deployed by its own pipeline. Every pull request runs a Playwright suite (page loads, navigation, axe accessibility checks across Chromium, WebKit and mobile) against a Netlify preview deploy, and main only changes through a pull request that passes. Merging deploys to production through GitHub Actions, followed by a smoke test against the live site.',
    tags: [
      'Playwright', 'TypeScript',
      'GitHub Actions', 'Netlify',
      'CI/CD', 'Accessibility',
    ],
    highlights: [
      { label: 'Type', value: 'CI/CD + End-to-End Testing' },
      { label: 'Stack', value: 'Playwright, TypeScript, GitHub Actions' },
      { label: 'Gate', value: 'Tests must pass before merge and deploy' },
      { label: 'Browsers', value: 'Chromium, WebKit, mobile' },
    ],
    links: [
      { label: 'View the repo', href: 'https://github.com/MikeyWilson34/mikey.dev' },
      { label: 'See the test runs', href: 'https://github.com/MikeyWilson34/mikey.dev/actions' },
    ],
  },
  {
    title: 'Mobile Automation Framework',
    description:
      'Built a Python + Appium test framework from scratch for iOS and Android, using the Page Object Model and running in CI on every release candidate. It cut manual regression from 3 days to under 1 and is the team\'s main quality gate for each release.',
    tags: [
      'Python', 'Appium',
      'POM Pattern', 'CI/CD',
      'Android',
    ],
  },
  {
    title: 'Robot Framework Test Suite',
    description:
      'Designed a keyword-driven regression test suite using Robot Framework. Structured for readability by non-engineers, enabling QA and product to both contribute to test coverage with minimal friction.',
    tags: [
      'Robot Framework', 'Python',
      'Keyword-Driven', 'Regression',
    ],
  },
  {
    title: 'Cypress Web Test Suite',
    description:
      'Built a Cypress end-to-end test framework expanding test coverage to the web layer. Focused on reliable selectors, network request stubbing, and fast feedback loops during development.',
    tags: [
      'Cypress', 'JavaScript',
      'E2E Testing', 'Web Automation',
    ],
  },
  {
    title: 'Mobile Release Coordination System',
    description:
      'Designed and led a repeatable monthly release process for the mobile apps, from test plans and sign-off coordination to deployment checklists.',
    tags: [
      'Process Design', 'Release Management',
      'Mobile QA', 'Leadership',
    ],
  },
]

export default function ProjectsGrid() {
  const featured = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)

  return (
    <section className="projects">
      <article className="featured">
        <div className="featured-body">
          <p className="kicker"><span aria-hidden="true">{indexLabel(0)}</span> Featured project</p>
          <h2 className="project-title">{featured.title}</h2>
          <p className="project-desc">{featured.description}</p>
          <Tags items={featured.tags} />
          {featured.links && (
            <div className="actions featured-links">
              {featured.links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={i === 0 ? 'btn btn-primary' : 'btn btn-secondary'}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <dl className="spec">
          {featured.highlights!.map((h) => (
            <div key={h.label}>
              <dt>{h.label}</dt>
              <dd>{h.value}</dd>
            </div>
          ))}
        </dl>
      </article>

      <div className="rows project-list">
        {rest.map((project, i) => (
          <article key={project.title} className="row project">
            <p className="project-index" aria-hidden="true">{indexLabel(i + 1)}</p>
            <div>
              <h2 className="project-title">{project.title}</h2>
              <p className="project-desc">{project.description}</p>
              <Tags items={project.tags} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
