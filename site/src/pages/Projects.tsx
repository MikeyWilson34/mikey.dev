import Nav from '../components/Nav'
import ProjectsHeader from '../components/projects/ProjectsHeader'
import ProjectsGrid from '../components/projects/ProjectsGrid'
import ProjectsCTA from '../components/projects/ProjectsCTA'
import Footer from '../components/Footer'

export default function Projects() {
  return (
    <>
      <Nav />
      <ProjectsHeader />
      <ProjectsGrid />
      <ProjectsCTA />
      <Footer />
    </>
  )
}
