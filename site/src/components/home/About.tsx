import SectionHead from '../SectionHead'

export default function About() {
  return (
    <section id="about" className="about">
      <SectionHead
        numeral="I"
        label="About"
        title={<>Quality is a craft,<br />not a checkbox.</>}
      />
      <div className="about-text">
        <p>
          QA Engineer with 6+ years of experience building scalable test automation and leading release
          coordination. Skilled in manual testing, mobile &amp; web automation, and cross-functional
          collaboration.
        </p>
        <p>
          Expert in Python-based test frameworks, release management, and Agile development.
          Seeking to deliver high-quality software through strategic testing and continuous improvement.
        </p>
      </div>
    </section>
  )
}
