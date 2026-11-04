import Section from '../Section'
import Tags from '../Tags'

interface SkillCategory {
  title: string
  tags: string[]
}

const categories: SkillCategory[] = [
  {
    title: 'Testing & Automation',
    tags: ['Selenium', 'Appium', 'Robot Framework', 'Cypress', 'Playwright', 'Mobile Testing', 'Regression Testing', 'API Testing'],
  },
  {
    title: 'Languages',
    tags: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'PostgreSQL', 'MySQL'],
  },
  {
    title: 'Tools',
    tags: ['Jira', 'Git', 'Postman', 'AWS', 'X-ray', 'Confluence', 'Android Studio', 'Google Play', 'TestFlight'],
  },
  {
    title: 'Methodologies',
    tags: ['Agile/Scrum', 'Test Planning', 'Release Management'],
  },
]

export default function Skills() {
  return (
    <Section id="skills" index="02" label="Skills" title={<>Tools &amp; tech stack</>}>
      <div className="rows">
        {categories.map((cat) => (
          <div key={cat.title} className="row skill-group">
            <h3 className="row-title">{cat.title}</h3>
            <Tags items={cat.tags} />
          </div>
        ))}
      </div>
    </Section>
  )
}
