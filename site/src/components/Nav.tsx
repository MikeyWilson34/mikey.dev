import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname, hash } = useLocation()
  const home = pathname === '/'
  // Only matters on small screens, where the links collapse behind a menu button
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the menu whenever we navigate (including back/forward)
  useEffect(() => setOpen(false), [pathname, hash])

  // Escape closes the menu and returns focus to the button
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Anchor links scroll on the home page; from other pages, navigate home first
  function anchor(hash: string) {
    return home ? hash : `/${hash}`
  }

  return (
    <nav>
      <NavLink to="/" className="nav-logo">mikey.dev</NavLink>
      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      {/* Any link click closes the menu (same-page anchors don't change pathname) */}
      <ul id="nav-links" className={`nav-links${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
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
