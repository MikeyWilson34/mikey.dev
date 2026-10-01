import Sigil from '../Sigil'

export default function ProjectsHeader() {
  return (
    <div className="page-header">
      <Sigil variant="gate" className="hero-watermark" />
      <p className="hero-badge">Projects</p>
      <h1>Things I've <em>Built</em></h1>
      <p className="page-lede">
        A collection of automation frameworks, tooling, and systems I've designed —
        built to make software shipping faster, safer, and more reliable.
      </p>
    </div>
  )
}
