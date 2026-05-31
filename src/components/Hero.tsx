export default function Hero() {
  return (
    <div className="hero">
      <div>
        <div className="hero-badge">Open to opportunities</div>
        <h1>
          Senior SDET &amp;<br />
          <em>QA Engineer</em>
        </h1>
        <p className="hero-sub">
          6+ years building test automation frameworks and leading mobile QA initiatives.
          I bridge the gap between quality engineering and software development — writing
          the code that keeps code reliable.
        </p>
        <div className="hero-actions">
          <a href="#experience" className="btn btn-primary">View My Work</a>
          <a href="#resume" className="btn btn-outline">Download Resume</a>
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
