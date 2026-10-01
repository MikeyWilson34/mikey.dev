import { ReactNode } from 'react'

interface SectionHeadProps {
  /** Roman numeral shown in the diamond; decorative */
  numeral: string
  label: string
  title: ReactNode
}

/** Numbered, ruled heading used at the top of every section. */
export default function SectionHead({ numeral, label, title }: SectionHeadProps) {
  return (
    <>
      <div className="section-head">
        <span className="section-num" aria-hidden="true">{numeral}</span>
        <span className="section-label">{label}</span>
      </div>
      <h2 className="section-title">{title}</h2>
    </>
  )
}
