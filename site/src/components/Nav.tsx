import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

// One entry per page. To add a page, add its route here; the bar and the
// small-screen menu both lay out from this list.
const links = [
  { label: 'Home', to: '/' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Interests', to: '/interests' },
]

export default function Nav() {
  const { pathname, hash } = useLocation()
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
      {/* Any link click closes the menu (including a click on the current page's link) */}
      <ul id="nav-links" className={`nav-links${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        {links.map((link) => (
          <li key={link.label}>
            {/* `end` so Home is only active on "/" itself, not on every route */}
            <NavLink to={link.to} end className={({ isActive }) => (isActive ? 'active' : '')}>
              {link.label}
            </NavLink>
          </li>
        ))}
        <li className="nav-resume-item">
          <a href="/michael_wilson_resume.pdf" download className="nav-resume">Resume</a>
        </li>
      </ul>
    </nav>
  )
}
