import FadeIn from './FadeIn'

interface SkillCategory {
  icon: string
  iconClass: string
  title: string
  tags: { label: string; accent?: boolean }[]
}

const categories: SkillCategory[] = [
  {
    icon: '🧪', iconClass: 'icon-blue', title: 'Testing & Automation',
    tags: [
      { label: 'Selenium'}, { label: 'Appium'},
      { label: 'Robot Framework'}, { label: 'Cypress'},
      { label: 'Mobile Testing' }, { label: 'Regression Testing' }, { label: 'API Testing' },
    ],
  },
  {
    icon: '🐍', iconClass: 'icon-green', title: 'Languages',
    tags: [
      { label: 'Python'}, { label: 'JavaScript'},
      { label: 'TypeScript'}, { label: 'SQL' },
      { label: 'PostgreSQL' }, { label: 'MySQL' },
    ],
  },
  {
    icon: '⚙️', iconClass: 'icon-purple', title: 'Tools',
    tags: [
      { label: 'Jira'}, { label: 'Git'},
      { label: 'Postman'}, { label: 'AWS' },
      { label: 'X-ray' }, { label: 'Confluence' }, { label: 'Android Studio' },
      { label: 'Google Play' }, { label: 'TestFlight' },
    ],
  },
  {
    icon: '🔬', iconClass: 'icon-blue', title: 'Methodologies',
    tags: [
      { label: 'Agile/Scrum'}, { label: 'Test Planning'},
      { label: 'Release Management'},
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
