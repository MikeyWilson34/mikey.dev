import MatrixRain from '../components/MatrixRain'
import Nav from '../components/Nav'
import ProjectsHeader from '../components/projects/ProjectsHeader'
import ProjectsGrid from '../components/projects/ProjectsGrid'
import ProjectsCTA from '../components/projects/ProjectsCTA'
import Footer from '../components/Footer'

export default function Projects() {
  return (
    <>
      <MatrixRain />
      <div className="projects-page" style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <ProjectsHeader />
        <ProjectsGrid />
        <ProjectsCTA />
        <Footer />
      </div>
    </>
  )
}
