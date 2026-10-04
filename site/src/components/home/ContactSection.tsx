import Section from '../Section'

export default function ContactSection() {
  return (
    <Section id="resume" index="03" label="Resume" title="Get in touch">
      <div className="callout">
        <div className="callout-text">
          <h3>Let's work together.</h3>
          <p>
            I'm currently open to Senior QA Engineer and SDET roles. If you're building
            something that needs a quality-obsessed engineer who can also write the automation
            to prove it, I'd love to talk.
          </p>
        </div>
        <div className="callout-actions">
          <a href="mailto:mikeawilson34@gmail.com" className="btn btn-primary">Send an Email</a>
          <a href="/michael_wilson_resume.pdf" download className="btn btn-secondary">Download Resume</a>
          <a href="https://www.linkedin.com/in/michael-wilson-213788a7/" className="btn btn-secondary" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  )
}
