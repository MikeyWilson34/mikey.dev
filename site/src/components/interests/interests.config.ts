/**
 * The Interests page, one section per entry, in display order.
 *
 * Each `slug` is the name of a folder in `src/assets/interests/`, and every
 * image in that folder appears in the section's slideshow. To add an
 * interest, create the folder and add one line here. See
 * `src/assets/interests/README.md`.
 */
export interface Interest {
  slug: string
  title: string
}

export const INTERESTS: Interest[] = [
  { slug: 'books', title: 'Books' },
  { slug: 'games', title: 'Video games' },
  { slug: 'basketball', title: 'Basketball' },
  { slug: 'movies', title: 'Movies' },
]
