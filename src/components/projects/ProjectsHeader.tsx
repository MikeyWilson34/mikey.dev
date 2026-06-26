import FadeIn from '../FadeIn'

export default function ProjectsHeader() {
  return (
    <FadeIn className="page-header">
      <div style={{ border: '1px solid rgba(0, 204, 51, 0.5)', boxShadow: '0 0 24px rgba(0, 204, 51, 0.2), var(--shadow)', background: 'var(--card)', borderRadius: 'var(--radius)', padding: '2rem 2.5rem' }}>
        <div className="section-label">// projects</div>
        <h1>Things I've <em>Built</em></h1>
        <p>
          A collection of automation frameworks, tooling, and systems I've designed —
          built to make software shipping faster, safer, and more reliable.
        </p>
      </div>
    </FadeIn>
  )
}
