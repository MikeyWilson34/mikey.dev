interface MarksProps {
  items: string[]
  label?: string
}

/** A run of keywords separated by small diamonds — replaces pill tags. */
export default function Marks({ items, label }: MarksProps) {
  return (
    <ul className="marks" aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
