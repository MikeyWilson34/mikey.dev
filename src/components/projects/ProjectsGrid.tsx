import FadeIn from '../FadeIn'

interface Highlight {
  label: string
  value: string
}

interface Project {
  icon: string
  title: string
  description: string
  tags: { label: string; accent?: boolean }[]
  featured?: boolean
  highlights?: Highlight[]
}

const projects: Project[] = [
  {
    icon: '📱',
    title: 'Mobile Automation Framework',
    featured: true,
    description:
      'Built a Python + Appium test framework from the ground up for iOS and Android. Implements the Page Object Model pattern for maintainability and integrates into the CI pipeline to run on every mobile release candidate. The framework reduced manual regression time significantly and serves as the team\'s primary quality gate for every release.',
    tags: [
      { label: 'Python' }, { label: 'Appium' },
      { label: 'POM Pattern' }, { label: 'CI/CD' },
      { label: 'Android' },
    ],
    highlights: [
      { label: 'Type', value: 'Mobile Test Automation' },
      { label: 'Stack', value: 'Python, Appium, pytest' },
      { label: 'Pattern', value: 'Page Object Model' },
      { label: 'Impact', value: 'Primary QA gate for every mobile release cycle' },
    ],
  },
  {
    icon: '🤖',
    title: 'Robot Framework Test Suite',
    description:
      'Designed a keyword-driven regression test suite using Robot Framework. Structured for readability by non-engineers, enabling QA and product to both contribute to test coverage with minimal friction.',
    tags: [
      { label: 'Robot Framework' }, { label: 'Python' },
      { label: 'Keyword-Driven' }, { label: 'Regression' },
    ],
  },
  {
    icon: '🌲',
    title: 'Cypress Web Test Suite',
    description:
      'Built a Cypress end-to-end test framework expanding test coverage to the web layer. Focused on reliable selectors, network request stubbing, and fast feedback loops during development.',
    tags: [
      { label: 'Cypress' }, { label: 'JavaScript' },
      { label: 'E2E Testing' }, { label: 'Web Automation' },
    ],
  },
  {
    icon: '📋',
    title: 'Mobile Release Coordination System',
    description:
      'Designed and lead a repeatable monthly release process for mobile apps — from test plan creation and sign-off coordination to deployment checklists — reducing release-day issues significantly.',
    tags: [
      { label: 'Process Design' }, { label: 'Release Management' },
      { label: 'Mobile QA' }, { label: 'Leadership' },
    ],
  },
]

export default function ProjectsGrid() {
  const featured = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)

  return (
    <section style={{ borderTop: '1px solid var(--border)' }}>
      <div className="projects-grid">

        <FadeIn delay={0}>
          <div className="project-card featured">
            <div className="project-body">
              <div className="project-icon">{featured.icon}</div>
              <div className="project-title" style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>
                {featured.title}
              </div>
              <p className="project-desc">{featured.description}</p>
              <div className="project-footer">
                {featured.tags.map((tag) => (
                  <span key={tag.label} className={`tag${tag.accent ? ' tag-accent' : ''}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-highlights">
              {featured.highlights!.map((h) => (
                <div key={h.label} className="highlight-item">
                  <span className="highlight-label">{h.label}</span>
                  <span className="highlight-value">{h.value}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {rest.map((project, i) => (
          <FadeIn key={project.title} delay={i + 1}>
            <div className="project-card">
              <div className="project-icon">{project.icon}</div>
              <div className="project-title">{project.title}</div>
              <p className="project-desc">{project.description}</p>
              <div className="project-footer">
                {project.tags.map((tag) => (
                  <span key={tag.label} className={`tag${tag.accent ? ' tag-accent' : ''}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}

      </div>
    </section>
  )
}
