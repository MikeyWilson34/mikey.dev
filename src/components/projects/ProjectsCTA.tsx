import FadeIn from '../FadeIn'

export default function ProjectsCTA() {
  return (
    <section>
      <FadeIn>
        <div className="resume-section" style={{ border: '1px solid rgba(0, 204, 51, 0.5)', boxShadow: '0 0 24px rgba(0, 204, 51, 0.2), var(--shadow)' }}>
          <div className="resume-text">
            <h3>Want to see more?</h3>
            <p style={{ marginTop: '0.5rem' }}>
              These are highlights from my professional work. If you'd like to discuss
              a specific project or see code samples, feel free to reach out.
            </p>
          </div>
          <div className="resume-actions">
            <a href="mailto:mikeawilson34@gmail.com" className="btn btn-primary">✉️ Get In Touch</a>
            <a href="/michael_wilson_resume.pdf" download className="btn btn-outline">⬇️ Download Resume</a>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
