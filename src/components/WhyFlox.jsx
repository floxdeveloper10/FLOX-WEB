import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { whyFlox } from '../data/site.js'
import './WhyFlox.css'

const ACCENTS = ['fucsia', 'naranja', 'turquesa']

export default function WhyFlox() {
  const headingId = `${whyFlox.id}-titulo`

  return (
    <section id={whyFlox.id} className="section section--crema why" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} eyebrow={whyFlox.eyebrow} title={whyFlox.title} />

        <ul className="why__list">
          {whyFlox.reasons.map((reason, i) => (
            <Reveal as="li" key={reason.title} delay={i * 0.1} className={`why__item accent--${ACCENTS[i]}`}>
              <span className="why__icon">
                <Icon name={reason.icon} />
              </span>
              <h3 className="why__title">{reason.title}</h3>
              <p className="why__text">{reason.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
