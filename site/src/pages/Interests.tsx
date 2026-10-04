import Nav from '../components/Nav'
import InterestsHeader from '../components/interests/InterestsHeader'
import InterestGalleries from '../components/interests/InterestGalleries'
import Footer from '../components/Footer'

export default function Interests() {
  return (
    <>
      <Nav />
      <main id="main">
        <InterestsHeader />
        <InterestGalleries />
      </main>
      <Footer />
    </>
  )
}
