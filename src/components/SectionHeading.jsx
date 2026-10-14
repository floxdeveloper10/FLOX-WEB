import Reveal from './Reveal.jsx'

// Encabezado común de sección: antetítulo pequeño (opcional) + título + subtítulo (opcional).
// tone="dark" para secciones con fondo morado.
export default function SectionHeading({ id, eyebrow, title, lead, align = 'center', tone = 'light' }) {
  return (
    <Reveal as="header" className={`section-heading section-heading--${align} section-heading--${tone}`}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {lead && <p className="section-heading__lead">{lead}</p>}
    </Reveal>
  )
}
