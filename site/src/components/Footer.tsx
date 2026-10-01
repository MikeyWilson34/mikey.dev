import Sigil from './Sigil'

export default function Footer() {
  return (
    <footer>
      <div className="footer-rule" aria-hidden="true">
        <Sigil className="footer-sigil" />
      </div>
      <p>Built by Mikey &nbsp;·&nbsp; SDET &amp; QA Engineer &nbsp;·&nbsp; Utah</p>
    </footer>
  )
}
