import { ReactNode } from 'react'

interface SectionProps {
  id?: string
  /** Two-digit index shown beside the label, e.g. "01" */
  index: string
  label: string
  title: ReactNode
  className?: string
  children: ReactNode
}

/**
 * A ruled page section: a small index and label in the left column, the
 * heading and content in the right. Collapses to one column on narrow screens.
 */
export default function Section({ id, index, label, title, className, children }: SectionProps) {
  return (
    <section id={id} className={`section${className ? ` ${className}` : ''}`}>
      <p className="section-label">
        <span className="section-index" aria-hidden="true">{index}</span>
        {label}
      </p>
      <div className="section-body">
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  )
}
