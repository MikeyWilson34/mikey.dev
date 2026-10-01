import Sigil from '../Sigil'

const stats = [
  { num: '6+', label: 'Years QA Exp' },
  { num: '3', label: 'Automation Stacks' },
  { num: '∞', label: 'Bugs Caught', glyph: true },
]

export default function Hero() {
  return (
    <div className="hero">
      <Sigil className="hero-watermark" />
      <div className="hero-crest">
        <p className="hero-badge">Open to opportunities</p>
        <h1>
          <span className="hero-name">Michael Wilson</span>{' '}
          <span className="hero-role">Senior QA Engineer</span>
        </h1>
        <p className="hero-motto" lang="la">Per aspera ad astra</p>
      </div>
      <div className="hero-band">
        <div className="hero-body">
          <p className="hero-sub">
            6+ years building scalable test automation and leading release coordination.
            Expert in Python-based frameworks, mobile QA, and Agile development —
            delivering high-quality software through strategic testing.
          </p>
          <div className="hero-actions">
            <a href="#experience" className="btn btn-primary">View My Work</a>
            <a href="/michael_wilson_resume.pdf" download className="btn btn-outline">Download Resume</a>
          </div>
        </div>
        <ul className="hero-stats">
          {stats.map((stat) => (
            <li key={stat.label}>
              <span className={`stat-num${stat.glyph ? ' glyph' : ''}`}>{stat.num}</span>
              <span className="stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
