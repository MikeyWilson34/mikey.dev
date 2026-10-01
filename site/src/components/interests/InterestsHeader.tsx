import Sigil from '../Sigil'

export default function InterestsHeader() {
  return (
    <div className="page-header">
      <Sigil variant="wheel" className="hero-watermark" />
      <p className="hero-badge">Interests</p>
      <h1>Off the <em>Clock</em></h1>
      <p className="page-lede">
        What I'm into when I'm not testing software: a book series I love, a lot of
        video games, the Denver Nuggets and a good action movie.
      </p>
    </div>
  )
}
