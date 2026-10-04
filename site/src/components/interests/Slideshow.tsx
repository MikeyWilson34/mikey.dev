import { FocusEvent, useEffect, useState } from 'react'
import { AUTO_ADVANCE_MS, GalleryImage, shouldAutoAdvance, wrapIndex } from './gallery'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_MOTION).matches)
  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION)
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function usePageHidden() {
  const [hidden, setHidden] = useState(() => document.visibilityState === 'hidden')
  useEffect(() => {
    const onChange = () => setHidden(document.visibilityState === 'hidden')
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])
  return hidden
}

interface SlideshowProps {
  images: GalleryImage[]
  /** The interest's title, used in labels, e.g. "Books" */
  title: string
}

/**
 * Crossfading slideshow. Rotates every few seconds unless the pointer is over
 * it, it holds keyboard focus, the tab is hidden, the visitor paused it, or
 * they prefer reduced motion. An empty list shows a placeholder; a single
 * image shows without controls.
 */
export default function Slideshow({ images, title }: SlideshowProps) {
  const count = images.length
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  // Slides shown so far; only these and the next one get an <img>
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]))
  const reducedMotion = usePrefersReducedMotion()
  const pageHidden = usePageHidden()

  const playing = shouldAutoAdvance({ count, reducedMotion, hovered, focused, pageHidden, userPaused })

  // Restarts on every slide change, so a manual step gets a full interval too
  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => setIndex((i) => wrapIndex(i + 1, count)), AUTO_ADVANCE_MS)
    return () => window.clearTimeout(timer)
  }, [playing, index, count])

  useEffect(() => {
    setSeen((prev) => (prev.has(index) ? prev : new Set(prev).add(index)))
  }, [index])

  if (count === 0) {
    return (
      <div className="gallery-frame gallery-empty">
        <p>Photos coming soon</p>
      </div>
    )
  }

  const altFor = (image: GalleryImage, i: number) => image.alt || `${title} photo ${i + 1}`

  if (count === 1) {
    return (
      <div className="gallery-frame">
        <img src={images[0].src} alt={altFor(images[0], 0)} loading="lazy" decoding="async" />
      </div>
    )
  }

  const next = wrapIndex(index + 1, count)
  const go = (i: number) => setIndex(wrapIndex(i, count))

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
  }

  return (
    <div
      className="gallery"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} photos`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
    >
      <div className="gallery-frame" aria-live={playing ? 'off' : 'polite'}>
        {images.map((image, i) => (
          <div
            key={image.filename}
            className={`gallery-slide${i === index ? ' is-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
          >
            {(seen.has(i) || i === next) && (
              <img src={image.src} alt={altFor(image, i)} loading="lazy" decoding="async" />
            )}
          </div>
        ))}
      </div>

      <div className="gallery-controls">
        <p className="gallery-count" aria-hidden="true">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
        <div className="gallery-dots">
          {images.map((image, i) => (
            <button
              key={image.filename}
              type="button"
              className="gallery-dot"
              aria-label={`Show photo ${i + 1} of ${count}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="gallery-buttons">
          {!reducedMotion && (
            <button
              type="button"
              className="gallery-btn gallery-btn-text"
              onClick={() => setUserPaused((paused) => !paused)}
            >
              {userPaused ? 'Play' : 'Pause'}
            </button>
          )}
          <button type="button" className="gallery-btn" aria-label="Previous photo" onClick={() => go(index - 1)}>
            <span aria-hidden="true">&larr;</span>
          </button>
          <button type="button" className="gallery-btn" aria-label="Next photo" onClick={() => go(index + 1)}>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  )
}
