import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import AppsIcon from './AppsIcon.jsx'
import { appsPage } from '../../data/apps.js'

// "¿Qué app necesita tu negocio?": ideas con ícono y una línea de descripción
export default function AppIdeas() {
  const { ideas } = appsPage
  const headingId = `${ideas.id}-titulo`

  return (
    <section id={ideas.id} className="section section--crema apps-ideas" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} eyebrow={ideas.eyebrow} title={ideas.title} lead={ideas.lead} />
        <ul className="apps-ideas__grid">
          {ideas.items.map((idea, i) => (
            <Reveal
              as="li"
              key={idea.title}
              delay={(i % 3) * 0.08}
              className={`apps-idea ${i === ideas.items.length - 1 ? 'apps-idea--custom' : ''}`}
            >
              <span className="apps-idea__icon">
                <AppsIcon name={idea.icon} />
              </span>
              <h3 className="apps-idea__title">{idea.title}</h3>
              <p className="apps-idea__text">{idea.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
