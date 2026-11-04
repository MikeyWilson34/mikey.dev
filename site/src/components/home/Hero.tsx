import { Link } from 'react-router-dom'

const stats = [
  { num: '6+', label: 'Years QA experience' },
  { num: '400+', label: 'Test cases written' },
  { num: '3', label: 'Automation stacks' },
]

export default function Hero() {
  return (
    <header className="hero">
      <p className="eyebrow">
        <span className="status-dot" aria-hidden="true" />
        Open to opportunities
      </p>
      <h1>
        <span className="hero-name">Michael Wilson</span>{' '}
        <span className="hero-role">SDET / QA Engineer</span>
      </h1>
      <div className="hero-grid">
        <div>
          <p className="hero-sub">
            I build test automation for mobile and web apps and coordinate the releases that
            ship them. Python, Appium and Robot Framework day to day; Playwright and GitHub
            Actions on this site.
          </p>
          <div className="actions">
            <Link to="/projects" className="btn btn-primary">View My Work</Link>
            <a href="/michael_wilson_resume.pdf" download className="btn btn-secondary">Download Resume</a>
          </div>
        </div>
        <dl className="hero-stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.num}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  )
}
