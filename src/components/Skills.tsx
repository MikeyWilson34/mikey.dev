import FadeIn from './FadeIn'

interface SkillCategory {
  icon: string
  iconClass: string
  title: string
  tags: { label: string; accent?: boolean }[]
}

const categories: SkillCategory[] = [
  {
    icon: '🧪', iconClass: 'icon-blue', title: 'Test Automation',
    tags: [
      { label: 'Cypress', accent: true }, { label: 'Appium', accent: true },
      { label: 'Robot Framework', accent: true }, { label: 'Selenium' },
      { label: 'pytest' }, { label: 'Page Object Model' },
    ],
  },
  {
    icon: '🐍', iconClass: 'icon-green', title: 'Languages',
    tags: [
      { label: 'Python', accent: true }, { label: 'JavaScript', accent: true },
      { label: 'TypeScript', accent: true }, { label: 'SQL' },
      { label: 'Bash' }, { label: 'HTML/CSS' },
    ],
  },
  {
    icon: '📱', iconClass: 'icon-orange', title: 'Mobile QA',
    tags: [
      { label: 'iOS Testing', accent: true }, { label: 'Android Testing', accent: true },
      { label: 'Appium' }, { label: 'Mobile Release Mgmt' }, { label: 'Device Farms' },
    ],
  },
  {
    icon: '⚙️', iconClass: 'icon-purple', title: 'CI/CD & Tooling',
    tags: [
      { label: 'Git', accent: true }, { label: 'Jenkins' }, { label: 'Jira' },
      { label: 'Postman' }, { label: 'Database Validation' }, { label: 'API Testing' },
    ],
  },
  {
    icon: '🔬', iconClass: 'icon-blue', title: 'QA Methodologies',
    tags: [
      { label: 'Test Planning', accent: true }, { label: 'Risk-Based Testing', accent: true },
      { label: 'BDD' }, { label: 'Regression Testing' },
      { label: 'Exploratory Testing' }, { label: 'Performance Testing' },
    ],
  },
  {
    icon: '🤝', iconClass: 'icon-green', title: 'Leadership',
    tags: [
      { label: 'Release Coordination', accent: true }, { label: 'Team Lead', accent: true },
      { label: 'Mentoring' }, { label: 'Cross-functional Collab' }, { label: 'Process Design' },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-label">// skills</div>
      <h2 className="section-title">Tools &amp; Tech Stack</h2>
      <div className="skills-grid">
        {categories.map((cat, i) => (
          <FadeIn key={cat.title} delay={i}>
            <div className="skill-category">
              <div className={`skill-cat-icon ${cat.iconClass}`}>{cat.icon}</div>
              <div className="skill-cat-title">{cat.title}</div>
              <div className="skill-tags">
                {cat.tags.map((tag) => (
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
