import Sigil, { SigilVariant } from '../Sigil'
import Marks from '../Marks'

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

interface Highlight {
  label: string
  value: string
}

interface Project {
  sigil: SigilVariant
  title: string
  description: string
  tags: string[]
  featured?: boolean
  highlights?: Highlight[]
}

const projects: Project[] = [
  {
    sigil: 'spire',
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
    sigil: 'wheel',
    title: 'Robot Framework Test Suite',
    description:
      'Designed a keyword-driven regression test suite using Robot Framework. Structured for readability by non-engineers, enabling QA and product to both contribute to test coverage with minimal friction.',
    tags: [
      'Robot Framework', 'Python',
      'Keyword-Driven', 'Regression',
    ],
  },
  {
    sigil: 'gate',
    title: 'Cypress Web Test Suite',
    description:
      'Built a Cypress end-to-end test framework expanding test coverage to the web layer. Focused on reliable selectors, network request stubbing, and fast feedback loops during development.',
    tags: [
      'Cypress', 'JavaScript',
      'E2E Testing', 'Web Automation',
    ],
  },
  {
    sigil: 'ledger',
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
      <article className="plate plate-featured">
        <div className="project-body">
          <div className="project-mark">
            <span className="project-num" aria-hidden="true">{NUMERALS[0]}</span>
            <Sigil variant={featured.sigil} className="plate-sigil" />
          </div>
          <h2 className="project-title">{featured.title}</h2>
          <p className="project-desc">{featured.description}</p>
          <Marks items={featured.tags} />
        </div>
        <dl className="project-highlights">
          {featured.highlights!.map((h) => (
            <div key={h.label} className="highlight-item">
              <dt>{h.label}</dt>
              <dd>{h.value}</dd>
            </div>
          ))}
        </dl>
      </article>

      <div className="projects-grid">
        {rest.map((project, i) => (
          <article key={project.title} className="plate">
            <div className="project-mark">
              <span className="project-num" aria-hidden="true">{NUMERALS[i + 1]}</span>
              <Sigil variant={project.sigil} className="plate-sigil" />
            </div>
            <h2 className="project-title">{project.title}</h2>
            <p className="project-desc">{project.description}</p>
            <Marks items={project.tags} />
          </article>
        ))}
      </div>
    </section>
  )
}
