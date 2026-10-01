import SectionHead from '../SectionHead'

export default function ContactSection() {
  return (
    <section id="resume">
      <SectionHead numeral="IV" label="Resume" title="Get In Touch" />
      <div className="seal">
        <div className="seal-text">
          <h3>Let's work together.</h3>
          <p>
            I'm currently open to Senior QA Engineer and SDET roles. If you're building
            something that needs a quality-obsessed engineer who can also write the automation
            to prove it, I'd love to talk.
          </p>
        </div>
        <div className="seal-actions">
          <a href="mailto:mikeawilson34@gmail.com" className="btn btn-gold">Send an Email</a>
          <a href="/michael_wilson_resume.pdf" download className="btn btn-outline">Download Resume</a>
          <a href="https://www.linkedin.com/in/michael-wilson-213788a7/" className="btn btn-outline" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
