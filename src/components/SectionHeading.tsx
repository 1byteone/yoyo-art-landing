import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id?: string
  eyebrow: string
  title: ReactNode
  description?: string
  number?: string
  align?: 'left' | 'right'
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  number,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={'section-heading section-heading--' + align} data-reveal>
      <div className="section-heading__topline">
        <span className="eyebrow">{eyebrow}</span>
        {number && <span className="section-heading__number">{number}</span>}
      </div>
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
