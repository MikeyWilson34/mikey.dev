export default function Hero() {
  return (
    <div className="hero">
      <div>
        <div className="hero-badge">Open to opportunities</div>
        <h1>
          Michael Wilson <br>
          </br>
          <em>
          Senior QA Engineer
          </em>
        </h1>
        <p className="hero-sub">
          6+ years building scalable test automation and leading release coordination.
          Expert in Python-based frameworks, mobile QA, and Agile development —
          delivering high-quality software through strategic testing.
        </p>
        <div className="hero-actions">
          <a href="#experience" className="btn btn-primary">View My Work</a>
          <a href="/michael_wilson_resume.pdf" download className="btn btn-resume">Download Resume</a>
        </div>
      </div>
      <div className="hero-stats">
        <div className="stat-card">
          <div className="stat-num">6+</div>
          <div className="stat-label">Years QA Exp</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">3</div>
          <div className="stat-label">Automation Stacks</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">∞</div>
          <div className="stat-label">Bugs Caught</div>
        </div>
      </div>
    </div>
  )
}
