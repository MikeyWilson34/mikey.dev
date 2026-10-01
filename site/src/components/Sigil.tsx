/**
 * Small geometric marks drawn for this site (no borrowed artwork).
 * Purely decorative: always hidden from assistive tech. Colour follows
 * `currentColor`, so set it with CSS on the parent or via className.
 */
export type SigilVariant =
  | 'crest' | 'spire' | 'wheel' | 'gate' | 'ledger'
  | 'dawn' | 'pad' | 'orb' | 'reel'

interface SigilProps {
  variant?: SigilVariant
  className?: string
}

const paths: Record<SigilVariant, JSX.Element> = {
  // Diamond within a diamond, crossed by a horizon line
  crest: (
    <>
      <path d="M24 3 45 24 24 45 3 24Z" />
      <path d="M24 15 33 24 24 33 15 24Z" fill="currentColor" stroke="none" />
      <path d="M0 24h9M39 24h9M24 0v5M24 43v5" />
    </>
  ),
  // A tower: rising triangle over a base bar
  spire: (
    <>
      <path d="M24 4 38 40H10Z" />
      <path d="M24 16v18M17 34h14" />
      <path d="M6 44h36" />
      <path d="M24 9 26.5 13 24 17 21.5 13Z" fill="currentColor" stroke="none" />
    </>
  ),
  // Ring with eight spokes and a diamond hub
  wheel: (
    <>
      <circle cx="24" cy="24" r="19" />
      <circle cx="24" cy="24" r="12" />
      <path d="M24 5v7M24 36v7M5 24h7M36 24h7M10.6 10.6l5 5M32.4 32.4l5 5M37.4 10.6l-5 5M15.6 32.4l-5 5" />
      <path d="M24 19 29 24 24 29 19 24Z" fill="currentColor" stroke="none" />
    </>
  ),
  // Two pillars under a pointed arch
  gate: (
    <>
      <path d="M8 44V20L24 5l16 15v24" />
      <path d="M16 44V24l8-7 8 7v20" />
      <path d="M4 44h40" />
      <path d="M24 26 27 30 24 34 21 30Z" fill="currentColor" stroke="none" />
    </>
  ),
  // A tilted tablet with ruled lines
  ledger: (
    <>
      <path d="M24 3 45 24 24 45 3 24Z" />
      <path d="M15 20h18M12 24h24M15 28h18" />
      <path d="M24 8v4M24 36v4" />
    </>
  ),
  // A sun half-risen over a horizon, with rays
  dawn: (
    <>
      <path d="M2 32h44" />
      <path d="M12 32a12 12 0 0 1 24 0" />
      <path d="M24 6v8M9.9 15.9l5 5M38.1 15.9l-5 5M3 24h6M39 24h6" />
      <path d="M12 38h24M18 44h12" />
      <path d="M24 23 28 27.5 24 32 20 27.5Z" fill="currentColor" stroke="none" />
    </>
  ),
  // A plus-shaped direction pad with a diamond centre
  pad: (
    <>
      <path d="M18 5h12v13h13v12H30v13H18V30H5V18h13Z" />
      <path d="M24 9v5M24 34v5M9 24h5M34 24h5" />
      <path d="M24 19 29 24 24 29 19 24Z" fill="currentColor" stroke="none" />
    </>
  ),
  // A ball: a ring crossed by seams
  orb: (
    <>
      <circle cx="24" cy="24" r="19" />
      <path d="M24 5v38M5 24h38" />
      <path d="M11 10.5c5 4 8 8.5 8 13.5s-3 9.5-8 13.5M37 10.5c-5 4-8 8.5-8 13.5s3 9.5 8 13.5" />
    </>
  ),
  // A film reel trailing its strip
  reel: (
    <>
      <circle cx="24" cy="24" r="19" />
      <circle cx="24" cy="14" r="4" />
      <circle cx="33.5" cy="20.9" r="4" />
      <circle cx="29.9" cy="32.1" r="4" />
      <circle cx="18.1" cy="32.1" r="4" />
      <circle cx="14.5" cy="20.9" r="4" />
      <path d="M24 43h22" />
      <path d="M24 21.5 26.5 24 24 26.5 21.5 24Z" fill="currentColor" stroke="none" />
    </>
  ),
}

export default function Sigil({ variant = 'crest', className }: SigilProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      {paths[variant]}
    </svg>
  )
}
