export default function ContactSection() {
  return (
    <section id="resume">
      <div className="section-label">// resume</div>
      <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Get In Touch</h2>
      <div className="resume-section">
        <div className="resume-text">
          <h3>Let's work together.</h3>
          <p style={{ marginTop: '0.5rem' }}>
            I'm currently open to Senior QA Engineer and SDET roles. If you're building
            something that needs a quality-obsessed engineer who can also write the automation
            to prove it, I'd love to talk.
          </p>
        </div>
        <div className="resume-actions">
          <a href="mailto:your@email.com" className="btn btn-primary">
            ✉️ Send an Email
          </a>
          <a href="#" className="btn btn-outline" onClick={() => alert('Add your resume PDF link here!')}>
            ⬇️ Download Resume
          </a>
          <a href="https://linkedin.com/in/yourprofile" className="btn btn-outline" target="_blank" rel="noreferrer">
            💼 LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
