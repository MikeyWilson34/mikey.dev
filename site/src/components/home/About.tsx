import Section from '../Section'

export default function About() {
  return (
    <Section id="about" index="01" label="About" title="About me" className="about">
      <div className="prose">
        <p className="lead">
          I'm Michael, but everyone calls me Mikey. I'm an SDET and QA engineer in Utah, and right now I work on
          mobile test automation. Along the way I've tested VR experiences and built browser automation with
          Python and Selenium. I like learning new technologies and working with others.
        </p>
      </div>
    </Section>
  )
}
