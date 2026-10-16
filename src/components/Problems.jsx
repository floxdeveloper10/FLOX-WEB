import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { problems } from '../data/site.js'
import './Problems.css'

// En el inicio la franja andina va arriba del selector de rubro (que sigue a la portada)
export default function Problems() {
  const headingId = `${problems.id}-titulo`

  return (
    <section id={problems.id} className="section section--crema problems problems--plain" aria-labelledby={headingId}>

      <div className="container">
        <SectionHeading id={headingId} eyebrow={problems.eyebrow} title={problems.title} />

        <ul className="card-grid">
          {problems.items.map((item, i) => (
            <Reveal as="li" key={item.question} delay={i * 0.1}>
              <article className={`card problem-card accent--${item.accent}`}>
                <span className="problem-card__icon">
                  <Icon name={item.icon} />
                </span>
                <h3 className="problem-card__question">{item.question}</h3>
                <p className="problem-card__solution">
                  <Icon name="flecha" className="problem-card__arrow" />
                  <span>{item.solution}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
