import { ReactNode } from 'react'
import SectionHead from '../SectionHead'
import Sigil, { SigilVariant } from '../Sigil'

interface Favorite {
  label: string
  value: ReactNode
}

interface Interest {
  id: string
  numeral: string
  label: string
  title: string
  sigil: SigilVariant
  intro: ReactNode
  favorites: Favorite[]
}

const interests: Interest[] = [
  {
    id: 'red-rising',
    numeral: 'I',
    label: 'Books',
    title: 'Red Rising',
    sigil: 'dawn',
    intro: (
      <>
        Pierce Brown's <cite>Red Rising</cite> series is my favorite set of books, and the
        reason this site is dressed in black, red and gold.
      </>
    ),
    favorites: [
      { label: 'Favorite book', value: <><cite>Golden Son</cite>, book two</> },
      { label: 'Favorite character', value: 'Sevro' },
    ],
  },
  {
    id: 'video-games',
    numeral: 'II',
    label: 'Video Games',
    title: 'Games I Keep Coming Back To',
    sigil: 'pad',
    intro: (
      <>
        I've been gaming for a long time. I couldn't pick one all-time favorite, so it's a tie.
      </>
    ),
    favorites: [
      {
        label: 'All-time favorites',
        value: (
          <>
            <cite>The Legend of Zelda: Ocarina of Time</cite> and <cite>God of War</cite> (2018), tied
          </>
        ),
      },
      { label: 'Playing now', value: <><cite>Overwatch</cite>, with friends</> },
      { label: 'Playing since 2005', value: <cite>World of Warcraft</cite> },
    ],
  },
  {
    id: 'nba',
    numeral: 'III',
    label: 'NBA',
    title: 'Denver Nuggets',
    sigil: 'orb',
    intro: <>I've been a Nuggets fan since 2003, so 2023 was a long time coming.</>,
    favorites: [
      { label: 'Fan since', value: '2003' },
      { label: 'Favorite Nugget', value: 'Nikola Jokić' },
      { label: 'Favorite moment', value: 'Winning the 2023 championship' },
      { label: 'All-time favorite', value: 'Charles Barkley' },
    ],
  },
  {
    id: 'action-movies',
    numeral: 'IV',
    label: 'Film',
    title: 'Action Movies',
    sigil: 'reel',
    intro: <>A few action movies I'd recommend, from the big and loud to the ones fewer people have seen.</>,
    favorites: [
      { label: 'Guilty pleasure', value: <cite>Pacific Rim</cite> },
      { label: 'Pure action', value: <cite>The Raid</cite> },
      {
        label: 'Hidden gems',
        value: <><cite>War of the Arrows</cite> and <cite>Sicario</cite></>,
      },
    ],
  },
]

export default function InterestSections() {
  return (
    <>
      {interests.map((interest) => (
        <section key={interest.id} id={interest.id} className="interest">
          <SectionHead numeral={interest.numeral} label={interest.label} title={interest.title} />
          <div className="interest-body">
            <div className="interest-intro">
              <Sigil variant={interest.sigil} className="interest-sigil" />
              <p>{interest.intro}</p>
            </div>
            <dl className="plate favorites">
              {interest.favorites.map((favorite) => (
                <div key={favorite.label} className="favorite">
                  <dt>{favorite.label}</dt>
                  <dd>{favorite.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ))}
    </>
  )
}
