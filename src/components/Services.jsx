import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { services, whatsappLink } from '../data/site.js'
import './Services.css'

export default function Services() {
  const headingId = `${services.id}-titulo`

  return (
    <section id={services.id} className="section section--blanco services" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} eyebrow={services.eyebrow} title={services.title} />

        <ul className="card-grid">
          {services.items.map((service, i) => (
            <Reveal as="li" key={service.name} delay={i * 0.1}>
              <article className={`card service-card accent--${service.accent}`}>
                <div className="service-card__head">
                  <h3 className="service-card__name">{service.name}</h3>
                  {service.comingSoon && <span className="service-card__badge">{service.comingSoon}</span>}
                </div>
                <p className="service-card__summary">{service.summary}</p>

                <ul className="service-card__features">
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <span className="service-card__check">
                        <Icon name="check" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  className="service-card__cta"
                  href={whatsappLink(service.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {service.cta}
                  <Icon name="flecha" />
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
