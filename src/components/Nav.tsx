import { NavLink, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  const home = pathname === '/'

  // Anchor links scroll on the home page; from other pages, navigate home first
  function anchor(hash: string) {
    return home ? hash : `/${hash}`
  }

  return (
    <nav>
      <NavLink to="/" className="nav-logo">mikey.dev</NavLink>
      <ul className="nav-links">
        <li><a href={anchor('#about')}>About</a></li>
        <li><a href={anchor('#skills')}>Skills</a></li>
        <li><a href={anchor('#experience')}>Experience</a></li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Projects
          </NavLink>
        </li>
        <li><a href="/michael_wilson_resume.pdf" download className="nav-resume">Resume</a></li>
      </ul>
    </nav>
  )
}
