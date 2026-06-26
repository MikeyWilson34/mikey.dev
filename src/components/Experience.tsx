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
    date: 'Jan 2023 – Present',
    current: true,
    description:
      'Built a mobile test automation framework using Python, Appium, and Robot Framework. Lead QA for mobile project — wrote and maintained 400+ test cases and coordinated monthly regression tests on Android and iOS. Coordinated monthly releases managing cross-team readiness and stakeholder communication. Partnered with developers in sprint planning to define test strategies. Coordinated app Beta testing program including tester onboarding docs and feedback triage. API endpoint testing via Postman and data integrity validation using PostgreSQL.',
    tags: [
      { label: 'Python',  }, { label: 'Appium',  },
      { label: 'Robot Framework',  }, { label: 'Postman',  },
      { label: 'Mobile QA' }, { label: 'Release Management' }, { label: 'PostgreSQL' },
    ],
  },
  {
    title: 'Senior Product Specialist',
    company: 'Via Customers',
    date: 'Jan 2022 – Dec 2022',
    description:
      'Owned bug triage and prioritization in Jira. Bridged communication between Engineering and Support/Sales by providing product knowledge and triaging new product issues. Created data reports for Support, Sales, and Customers using PostgreSQL. Managed customer complaints to identify the biggest pain points in the product.',
    tags: [
      { label: 'Jira',  }, { label: 'PostgreSQL',  },
      { label: 'Bug Triage' }, { label: 'Product Analysis' },
    ],
  },
  {
    title: 'QA Engineer',
    company: 'Intellivision Entertainment',
    date: 'Oct 2020 – Dec 2021',
    description:
      'Created and maintained test cases for 16 game titles, handling several game and console platforms simultaneously. Coordinated with developers across different studios providing testing reports and gameplay feedback. Coordinated Play Test Demos and delivered weekly QA status reports to the CEO via Jira highlighting risk, trends, and release readiness.',
    tags: [
      { label: 'Jira',  }, { label: 'Game QA',  },
      { label: 'Test Cases' }, { label: 'Regression Testing' }, { label: 'Reporting' },
    ],
  },
  {
    title: 'QA Automation Engineer',
    company: 'The VOID',
    date: 'Jun 2019 – Aug 2020',
    description:
      'Built automated testing for the company website using Selenium and Python. Handled testing of cutting-edge VR technology and equipment. Created and maintained 200+ test cases covering website and user flow through VR experiences. Held weekly coordination meetings with product and development teams to improve test coverage.',
    tags: [
      { label: 'Selenium',  }, { label: 'Python',  },
      { label: 'VR Testing' }, { label: 'Test Automation' },
    ],
  },
  {
    title: 'Data Collection Programmer | Team Lead',
    company: 'Domega',
    date: 'Dec 2014 – Jun 2019',
    description:
      'Built large-scale web scraping and data automation using Python and Selenium. Improved team efficiency by adding a Google scrape script and website template recognition — adding hundreds of new sites and fixing broken scripts in bulk. Led team training in Python scripting and best practices.',
    tags: [
      { label: 'Python',  }, { label: 'Selenium',  },
      { label: 'Web Scraping' }, { label: 'Team Lead' }, { label: 'Data Automation' },
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
