import SectionHead from '../SectionHead'
import Sigil, { SigilVariant } from '../Sigil'
import Marks from '../Marks'

interface SkillCategory {
  sigil: SigilVariant
  title: string
  tags: string[]
}

const categories: SkillCategory[] = [
  {
    sigil: 'wheel', title: 'Testing & Automation',
    tags: ['Selenium', 'Appium', 'Robot Framework', 'Cypress', 'Mobile Testing', 'Regression Testing', 'API Testing'],
  },
  {
    sigil: 'ledger', title: 'Languages',
    tags: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'PostgreSQL', 'MySQL'],
  },
  {
    sigil: 'gate', title: 'Tools',
    tags: ['Jira', 'Git', 'Postman', 'AWS', 'X-ray', 'Confluence', 'Android Studio', 'Google Play', 'TestFlight'],
  },
  {
    sigil: 'spire', title: 'Methodologies',
    tags: ['Agile/Scrum', 'Test Planning', 'Release Management'],
  },
]

export default function Skills() {
  return (
    <section id="skills">
      <SectionHead numeral="II" label="Skills" title={<>Tools &amp; Tech Stack</>} />
      <div className="skills-grid">
        {categories.map((cat) => (
          <div key={cat.title} className="plate">
            <div className="plate-head">
              <Sigil variant={cat.sigil} className="plate-sigil" />
              <h3 className="plate-title">{cat.title}</h3>
            </div>
            <Marks items={cat.tags} />
          </div>
        ))}
      </div>
    </section>
  )
}
