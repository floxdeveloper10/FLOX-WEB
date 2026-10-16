import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { compromiso } from '../data/compromiso.js'
import './Compromiso.css'

const ACCENTS = ['fucsia', 'naranja', 'turquesa', 'amarillo']

// "Nuestro compromiso": 4 garantías (textos en src/data/compromiso.js)
export default function Compromiso() {
  const headingId = `${compromiso.id}-titulo`

  return (
    <section id={compromiso.id} className="section section--crema commit" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} eyebrow={compromiso.eyebrow} title={compromiso.title} />

        <ul className="commit__list">
          {compromiso.points.map((point, i) => (
            <Reveal as="li" key={point.title} delay={i * 0.08} className={`card commit__item accent--${ACCENTS[i % ACCENTS.length]}`}>
              <span className="commit__icon">
                <Icon name={point.icon} />
              </span>
              <h3 className="commit__title">{point.title}</h3>
              <p className="commit__text">{point.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
