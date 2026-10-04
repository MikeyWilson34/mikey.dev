const stats = [
  { num: '6+', label: 'Years QA experience' },
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
        <span className="hero-role">Senior QA Engineer</span>
      </h1>
      <div className="hero-grid">
        <div>
          <p className="hero-sub">
            6+ years building scalable test automation and leading release coordination.
            Expert in Python-based frameworks, mobile QA, and Agile development —
            delivering high-quality software through strategic testing.
          </p>
          <div className="actions">
            <a href="#experience" className="btn btn-primary">View My Work</a>
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
