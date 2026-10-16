import { useEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'
import Icon from '../Icon.jsx'
import WhatsAppIcon from '../WhatsAppIcon.jsx'
import { whatsappLink } from '../../data/site.js'
import { ADVANCE, fromLabel, priceNote, urgency } from '../../data/precios.js'
import { rubroBySlug } from '../../data/rubros.js'
import { quoteMessage, soles } from './quoteMessage.js'
import { track } from '../../lib/analytics.js'

// Número que sube hasta su valor (sin animación con "reducir movimiento")
export function AnimatedSoles({ value, className = '' }) {
  const reduceMotion = useReducedMotion()
  const [shown, setShown] = useState(reduceMotion ? value : 0)
  const from = useRef(0)

  useEffect(() => {
    if (reduceMotion) {
      from.current = value
      return undefined
    }
    const controls = animate(from.current, value, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    })
    from.current = value
    return () => controls.stop()
  }, [value, reduceMotion])

  return <span className={className}>{soles(reduceMotion ? value : shown)}</span>
}

// Resumen: lo elegido, total estimado animado, 50 % de adelanto y envío por WhatsApp
export default function Resumen({ q, est, onEdit }) {
  const rubro = rubroBySlug[q.rubro]
  const urg = urgency.find((u) => u.id === q.urgency)
  const onlyApp = est.hasApp && est.total === 0

  return (
    <div className="qz-summary">
      <dl className="qz-summary__who">
        <div>
          <dt>Rubro</dt>
          <dd>{rubro?.name}</dd>
        </div>
        <div>
          <dt>Nombre</dt>
          <dd>{q.name}</dd>
        </div>
        <div>
          <dt>Negocio</dt>
          <dd>{q.business}</dd>
        </div>
      </dl>

      <div className="qz-summary__block">
        <div className="qz-summary__head">
          <h3 className="qz-summary__title">Servicios</h3>
          <button type="button" className="qz-edit" onClick={() => onEdit(1)} aria-label="Editar servicios">
            Editar
          </button>
        </div>
        <ul className="qz-lines">
          {est.services.map((s) => (
            <li key={s.id}>
              <span>{s.name}</span>
              <span className={s.quote ? 'qz-lines__quote' : ''}>{s.quote ? 'Cotización personalizada' : fromLabel(s)}</span>
            </li>
          ))}
        </ul>
      </div>

      {est.extras.length > 0 && (
        <div className="qz-summary__block">
          <div className="qz-summary__head">
            <h3 className="qz-summary__title">Extras</h3>
            <button type="button" className="qz-edit" onClick={() => onEdit(2)} aria-label="Editar extras">
              Editar
            </button>
          </div>
          <ul className="qz-lines">
            {est.extras.map((e) => (
              <li key={e.id}>
                <span>{e.name}</span>
                <span>{soles(e.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="qz-lines qz-lines--totals">
        <li>
          <span>Urgencia: {urg.name}</span>
          <span>{est.surcharge ? `+ ${soles(est.surcharge)}` : 'Sin recargo'}</span>
        </li>
      </ul>

      <div className="qz-total" aria-live="polite">
        {onlyApp ? (
          <p className="qz-total__app">App: cotización personalizada</p>
        ) : (
          <>
            <p className="qz-total__label">Total estimado</p>
            <p className="qz-total__value">
              <AnimatedSoles value={est.total} />
            </p>
            <p className="qz-total__advance">
              Adelanto del {ADVANCE * 100} % para empezar: <strong>{soles(est.advance)}</strong>
            </p>
            {est.hasApp && <p className="qz-total__app">+ app: cotización personalizada</p>}
          </>
        )}
      </div>

      {/* Plan de mantenimiento: mensual, separado del total del proyecto */}
      <div className="qz-summary__block qz-summary__plan">
        <div className="qz-summary__head">
          <h3 className="qz-summary__title">Mantenimiento mensual</h3>
          <button type="button" className="qz-edit" onClick={() => onEdit(4)} aria-label="Editar plan de mantenimiento">
            Editar
          </button>
        </div>
        <ul className="qz-lines">
          <li>
            {est.plan ? (
              <>
                <span>Plan {est.plan.name}</span>
                <span>
                  <strong>{soles(est.plan.monthly)}</strong> al mes
                </span>
              </>
            ) : (
              <>
                <span>Por ahora no</span>
                <span>—</span>
              </>
            )}
          </li>
        </ul>
        {est.plan && <p className="qz-summary__aside">Se paga cada mes, aparte del total del proyecto.</p>}
      </div>

      <p className="qz-note">
        <Icon name="simple" />
        {priceNote}
      </p>

      <a
        className="btn btn--primary qz-send"
        data-origen="cotizador"
        href={whatsappLink(quoteMessage(q, est))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track('cotizacion_enviada', {
            rubro: q.rubro,
            total_estimado: est.total,
            incluye_app: est.hasApp,
            plan_mensual: est.plan ? est.plan.monthly : 0,
            // value + currency: Google Ads puede usar el monto como valor de la conversión
            value: est.total,
            currency: 'PEN',
          })
        }
      >
        <WhatsAppIcon />
        Enviar mi cotización por WhatsApp
      </a>
    </div>
  )
}
