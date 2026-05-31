import FadeIn from './FadeIn'

interface Job {
  title: string
  company: string
  date: string
  current?: boolean
  description: string
  tags: { label: string; accent?: boolean }[]
}

const jobs: Job[] = [
  {
    title: 'QA Engineer',
    company: 'Lightspeed DMS',
    date: '2019 – Present',
    current: true,
    description:
      'Lead monthly mobile release coordination across iOS and Android platforms. Designed and maintain the team\'s core test automation framework using Python and Appium. Built Robot Framework test suites that serve as the primary regression safety net for each release cycle. Recently expanded the framework to include Cypress for web coverage.',
    tags: [
      { label: 'Python', accent: true }, { label: 'Appium', accent: true },
      { label: 'Robot Framework', accent: true }, { label: 'Cypress', accent: true },
      { label: 'Mobile QA' }, { label: 'Release Management' },
    ],
  },
  {
    title: 'QA Team Lead',
    company: 'Domega',
    date: 'Prior',
    description:
      'Led a QA team, overseeing test strategy, team processes, and quality standards. Coordinated cross-functional testing efforts and mentored junior QA engineers on best practices for test design and automation.',
    tags: [
      { label: 'Team Leadership' }, { label: 'Test Strategy' },
      { label: 'Mentoring' }, { label: 'Process Design' },
    ],
  },
  {
    title: 'QA Engineer',
    company: 'The VOID / Intellivision Entertainment',
    date: 'Prior',
    description:
      'Performed functional, regression, and exploratory testing on gaming and entertainment software. Contributed to test planning and defect management in fast-paced product environments.',
    tags: [
      { label: 'Functional Testing' }, { label: 'Regression Testing' },
      { label: 'Defect Management' }, { label: 'Gaming QA' },
    ],
  },
  {
    title: 'QA Engineer',
    company: 'Via Customers',
    date: 'Prior',
    description:
      'Executed test plans, documented defects, and collaborated with development teams on bug resolution in an agile environment.',
    tags: [
      { label: 'Agile QA' }, { label: 'Test Planning' }, { label: 'Defect Tracking' },
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-label">// experience</div>
      <h2 className="section-title">Where I've Built Things</h2>
      <div className="experience-list">
        {jobs.map((job, i) => (
          <FadeIn key={job.company} delay={i}>
            <div className={`exp-card${job.current ? ' current' : ''}`}>
              <div className="exp-header">
                <div>
                  <div className="exp-title">{job.title}</div>
                  <div className="exp-company">{job.company}</div>
                </div>
                <div className="exp-date">{job.date}</div>
              </div>
              <p className="exp-desc">{job.description}</p>
              <div className="exp-tags">
                {job.tags.map((tag) => (
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
