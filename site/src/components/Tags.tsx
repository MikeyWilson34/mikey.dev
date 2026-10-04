interface TagsProps {
  items: string[]
  label?: string
}

/** A short run of keywords (tools, skills), set small in monospace. */
export default function Tags({ items, label }: TagsProps) {
  return (
    <ul className="tags" aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
