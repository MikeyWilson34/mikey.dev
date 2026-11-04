import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Interests from './pages/Interests'

export default function App() {
  const { pathname } = useLocation()

  // A new page starts at the top. BrowserRouter keeps the old scroll position
  // otherwise, so following a nav link from far down a page would land mid-page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/interests" element={<Interests />} />
    </Routes>
  )
}
