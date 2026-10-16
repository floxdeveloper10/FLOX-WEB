import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { whatsappLink } from '../data/site.js'
import { maintenancePlans } from '../data/precios.js'
import './MaintenancePlans.css'

// Planes de mantenimiento mensual (dentro de Precios, debajo de los precios de proyectos).
// Precios y lo que incluye cada plan: src/data/precios.js
export default function MaintenancePlans() {
  return (
    <div className="maint" data-origen="planes-mantenimiento">
      <Reveal as="header" className="maint__head">
        <h3 id="mantenimiento-titulo" className="maint__title">
          Planes de mantenimiento
        </h3>
        <p className="maint__lead">Después de entregarte tu proyecto, lo mantenemos al día por un pago mensual. Sin contratos largos.</p>
      </Reveal>

      <ul className="maint__grid" aria-labelledby="mantenimiento-titulo">
        {maintenancePlans.map((plan, i) => (
          <Reveal as="li" key={plan.id} delay={i * 0.08} className={plan.recommended ? 'maint__item--featured' : ''}>
            <article className={`card plan maint-plan ${plan.recommended ? 'plan--featured' : ''}`}>
              {plan.recommended && <p className="plan__badge">Recomendado</p>}
              <h4 className="plan__name">{plan.name}</h4>
              <p className="plan__price">
                <span className="plan__amount maint-plan__amount">S/ {plan.monthly}</span>
                <span className="plan__from">al mes</span>
              </p>
              <p className="maint-plan__summary">{plan.summary}</p>
              <ul className="plan__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                className={`btn ${plan.recommended ? 'btn--primary' : 'btn--ghost'} plan__cta`}
                href={whatsappLink(`Hola FLOX, quiero el plan de mantenimiento ${plan.name} (S/ ${plan.monthly} al mes)`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Quiero este plan: ${plan.name}`}
              >
                Quiero este plan
              </a>
            </article>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
