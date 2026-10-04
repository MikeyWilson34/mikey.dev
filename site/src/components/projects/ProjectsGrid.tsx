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
}

const projects: Project[] = [
  {
    title: 'Mobile Automation Framework',
    featured: true,
    description:
      'Built a Python + Appium test framework from the ground up for iOS and Android. Implements the Page Object Model pattern for maintainability and integrates into the CI pipeline to run on every mobile release candidate. The framework reduced manual regression time significantly and serves as the team\'s primary quality gate for every release.',
    tags: [
      'Python', 'Appium',
      'POM Pattern', 'CI/CD',
      'Android',
    ],
    highlights: [
      { label: 'Type', value: 'Mobile Test Automation' },
      { label: 'Stack', value: 'Python, Appium, pytest' },
      { label: 'Pattern', value: 'Page Object Model' },
      { label: 'Impact', value: 'Primary QA gate for every mobile release cycle' },
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
      'Designed and lead a repeatable monthly release process for mobile apps — from test plan creation and sign-off coordination to deployment checklists — reducing release-day issues significantly.',
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
