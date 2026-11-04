import Tags from '../Tags'

interface Job {
  title: string
  company: string
  date: string
  current?: boolean
  description: string
  tags: string[]
}

const jobs: Job[] = [
  {
    title: 'QA Engineer',
    company: 'Lightspeed DMS',
    date: 'Jan 2023 – Present',
    current: true,
    description:
      'Built the mobile test automation framework (Python, Appium, Robot Framework) and led QA for the mobile app: 400+ test cases and monthly Android/iOS regression. Coordinate monthly releases and the Beta testing program across teams. Test APIs in Postman and validate data in PostgreSQL.',
    tags: [
      'Python', 'Appium',
      'Robot Framework', 'Postman',
      'Mobile QA', 'Release Management', 'PostgreSQL',
    ],
  },
  {
    title: 'Senior Product Specialist',
    company: 'Via Customers',
    date: 'Jan 2022 – Dec 2022',
    description:
      'Owned bug triage and prioritization in Jira, bridging Engineering with Support and Sales. Built PostgreSQL reports for Support, Sales and customers. Used customer complaints to surface the product\'s biggest pain points.',
    tags: [
      'Jira', 'PostgreSQL',
      'Bug Triage', 'Product Analysis',
    ],
  },
  {
    title: 'QA Engineer',
    company: 'Intellivision Entertainment',
    date: 'Oct 2020 – Dec 2021',
    description:
      'Wrote and maintained test cases for 16 game titles across several game and console platforms. Sent test reports and gameplay feedback to developers at multiple studios and ran Play Test Demos. Delivered weekly QA status reports to the CEO on risk, trends and release readiness.',
    tags: [
      'Jira', 'Game QA',
      'Test Cases', 'Regression Testing', 'Reporting',
    ],
  },
  {
    title: 'QA Automation Engineer',
    company: 'The VOID',
    date: 'Jun 2019 – Aug 2020',
    description:
      'Built automated tests for the company website with Selenium and Python. Wrote and maintained 200+ test cases covering the website and the user flow through VR experiences. Met weekly with product and development to improve test coverage.',
    tags: [
      'Selenium', 'Python',
      'VR Testing', 'Test Automation',
    ],
  },
  {
    title: 'Data Collection Programmer | Team Lead',
    company: 'Domega',
    date: 'Dec 2014 – Jun 2019',
    description:
      'Built large-scale web scraping and data automation with Python and Selenium. Added a Google scrape script and website template recognition, which brought on hundreds of new sites and fixed broken scripts in bulk. Trained the team in Python scripting and best practices.',
    tags: [
      'Python', 'Selenium',
      'Web Scraping', 'Team Lead', 'Data Automation',
    ],
  },
]

export default function Experience() {
  return (
    <section className="section-plain" aria-label="Job history">
      <ol className="rows timeline">
        {jobs.map((job) => (
          <li key={job.company} className="row job">
            <div className="job-meta">
              <p className="job-date">{job.date}</p>
              {job.current && <p className="job-current">Current</p>}
            </div>
            <div className="job-body">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-company">{job.company}</p>
              <p className="job-desc">{job.description}</p>
              <Tags items={job.tags} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
