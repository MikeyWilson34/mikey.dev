import Section from '../Section'
import Slideshow from './Slideshow'
import { INTERESTS } from './interests.config'
import { imagesBySlug } from './images'

export default function InterestGalleries() {
  return (
    <>
      {INTERESTS.map((interest, i) => (
        <Section
          key={interest.slug}
          id={interest.slug}
          index={String(i + 1).padStart(2, '0')}
          label={`interests/${interest.slug}`}
          title={interest.title}
          className="interest"
        >
          <Slideshow images={imagesBySlug[interest.slug] ?? []} title={interest.title} />
        </Section>
      ))}
    </>
  )
}
