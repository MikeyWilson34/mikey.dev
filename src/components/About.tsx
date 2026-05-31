export default function About() {
  return (
    <section id="about">
      <div className="section-label">// about</div>
      <h2 className="section-title">
        Quality is a craft,<br />not a checkbox.
      </h2>
      <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '640px', lineHeight: 1.8, marginBottom: '1.25rem' }}>
        I'm a QA Engineer with a developer's mindset. Based in Utah, I currently lead monthly
        mobile release coordination at Lightspeed DMS and build the test automation infrastructure
        the team relies on every day.
      </p>
      <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '640px', lineHeight: 1.8 }}>
        My focus is on building scalable, maintainable test frameworks — not just finding bugs,
        but designing systems that prevent them. I work across Python, Appium, Robot Framework,
        and Cypress, and I'm always learning the next tool that helps ship software with confidence.
      </p>
    </section>
  )
}
