import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { pricing, whatsappLink } from '../data/site.js'
import './Pricing.css'

export default function Pricing() {
  const headingId = `${pricing.id}-titulo`

  return (
    <section id={pricing.id} className="section section--blanco pricing" aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} title={pricing.title} />

        <ul className="pricing__grid">
          {pricing.plans.map((plan, i) => (
            <Reveal as="li" key={plan.name} delay={i * 0.1} className={plan.featured ? 'pricing__item--featured' : ''}>
              <article className={`card plan ${plan.featured ? 'plan--featured' : ''}`}>
                {plan.featured && <p className="plan__badge">{pricing.featuredLabel}</p>}
                <h3 className="plan__name">{plan.name}</h3>
                <p className="plan__price">
                  <span className="plan__from">{pricing.from}</span>
                  <span className="plan__amount">S/ {plan.price}</span>
                </p>

                <ul className="plan__features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  className="btn btn--primary plan__cta"
                  href={whatsappLink(plan.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${pricing.cta}: ${plan.name}`}
                >
                  {pricing.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="pricing__notes">
          <p className="pricing__note">{pricing.note}</p>
          <p className="pricing__custom">
            {pricing.custom.before}{' '}
            <a href={whatsappLink(pricing.custom.message)} target="_blank" rel="noopener noreferrer">
              {pricing.custom.link}
            </a>{' '}
            {pricing.custom.after}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
