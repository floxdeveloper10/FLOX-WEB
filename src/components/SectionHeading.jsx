import Reveal from './Reveal.jsx'

// Encabezado común de sección: antetítulo pequeño + título.
export default function SectionHeading({ id, eyebrow, title, align = 'center' }) {
  return (
    <Reveal as="header" className={`section-heading section-heading--${align}`}>
      <p className="section-heading__eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
    </Reveal>
  )
}
