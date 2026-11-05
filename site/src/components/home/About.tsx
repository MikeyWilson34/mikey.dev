import Section from '../Section'

export default function About() {
  return (
    <Section id="about" index="01" label="About" title="About me" className="about">
      <div className="prose">
        <p className="lead">
          I'm Michael, an SDET and QA engineer in Utah with 6+ years in quality. At Lightspeed DMS I built
          the mobile test automation framework (Python, Appium, Robot Framework) and run the monthly release
          process. Before that I tested VR experiences at The VOID and 16 console games at Intellivision, and
          spent nearly five years automating web data collection with Python and Selenium.
        </p>
      </div>
    </Section>
  )
}
