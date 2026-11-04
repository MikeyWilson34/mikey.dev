import Nav from '../components/Nav'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Skills from '../components/home/Skills'
import ContactSection from '../components/home/ContactSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
