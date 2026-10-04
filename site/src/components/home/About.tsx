import Section from '../Section'

export default function About() {
  return (
    <Section id="about" index="01" label="About" title="Quality is a craft, not a checkbox." className="about">
      <div className="prose">
        <p className="lead">
          I've tested VR experiences, console games, and mobile apps, and today I run the monthly mobile
          release process at Lightspeed DMS. I care about automation that catches real bugs and releases
          that go out without surprises.
        </p>
      </div>
    </Section>
  )
}
