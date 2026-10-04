import Nav from '../components/Nav'
import ExperienceHeader from '../components/experience/ExperienceHeader'
import Experience from '../components/experience/Experience'
import Footer from '../components/Footer'

export default function ExperiencePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <ExperienceHeader />
        <Experience />
      </main>
      <Footer />
    </>
  )
}
