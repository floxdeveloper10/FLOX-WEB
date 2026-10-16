import { useId } from 'react'
import Icon from '../Icon.jsx'
import RubroIcon from '../soluciones/RubroIcon.jsx'
import { extrasFor, fromLabel, services, urgency } from '../../data/precios.js'
import { rubroBySlug, rubros } from '../../data/rubros.js'
import { soles } from './quoteMessage.js'

// Paso 1: tu rubro (6 botones; si vienes de una página de rubro, ya está elegido)
export function StepRubro({ q }) {
  return (
    <div className="qz-options qz-options--rubros" role="radiogroup" aria-label="Tu rubro">
      {rubros.map((r) => {
        const on = q.rubro === r.slug
        return (
          <button
            key={r.slug}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on || (!q.rubro && r === rubros[0]) ? 0 : -1}
            className={`qz-rubro ${on ? 'is-on' : ''}`}
            onClick={() => q.setRubro(r.slug)}
            onKeyDown={(e) => {
              // Flechas para moverse entre rubros (como un grupo de opciones)
              const i = rubros.indexOf(r)
              const next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? i - 1 : null
              if (next === null) return
              e.preventDefault()
              const target = rubros[(next + rubros.length) % rubros.length]
              q.setRubro(target.slug)
              e.currentTarget.parentElement.querySelectorAll('button')[(next + rubros.length) % rubros.length].focus()
            }}
          >
            <span className="qz-rubro__icon" aria-hidden="true">
              <RubroIcon name={r.icon} />
            </span>
            <span className="qz-rubro__name">{r.menuName}</span>
            {on && (
              <span className="qz-check" aria-hidden="true">
                <Icon name="check" strokeWidth={3} />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function CheckOption({ checked, onChange, title, detail, price, tag, quote }) {
  return (
    <label className={`qz-option ${checked ? 'is-on' : ''} ${quote ? 'qz-option--quote' : ''}`}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="qz-option__box" aria-hidden="true">
        <Icon name="check" strokeWidth={3} />
      </span>
      <span className="qz-option__text">
        <span className="qz-option__title">
          {title}
          {tag && <span className="qz-tag">{tag}</span>}
        </span>
        <span className="qz-option__detail">{detail}</span>
      </span>
      <span className="qz-option__price">{price}</span>
    </label>
  )
}

// Paso 2: ¿qué necesitas? (los recomendados para tu rubro van primero)
export function StepServicios({ q }) {
  const rubro = rubroBySlug[q.rubro]
  const suggested = rubro?.suggested ?? []
  const ordered = [...services].sort((a, b) => suggested.includes(b.id) - suggested.includes(a.id))
  return (
    <fieldset className="qz-options">
      <legend className="visually-hidden">Servicios que necesitas</legend>
      {ordered.map((s) => (
        <CheckOption
          key={s.id}
          checked={q.services.includes(s.id)}
          onChange={() => q.toggleService(s.id)}
          title={s.name}
          detail={s.detail}
          price={fromLabel(s)}
          quote={s.quote}
          tag={suggested.includes(s.id) ? `Recomendado para ${rubro.name.toLowerCase()}` : null}
        />
      ))}
    </fieldset>
  )
}

// Paso 3: extras que aplican a lo elegido
export function StepExtras({ q }) {
  const available = extrasFor(q.services)
  return (
    <fieldset className="qz-options">
      <legend className="visually-hidden">Extras opcionales</legend>
      {available.map((e) => (
        <CheckOption
          key={e.id}
          checked={q.extras.includes(e.id)}
          onChange={() => q.toggleExtra(e.id)}
          title={e.name}
          detail={e.detail}
          price={`+ ${soles(e.price)}`}
        />
      ))}
    </fieldset>
  )
}

// Paso 4: urgencia y tus datos
export function StepDatos({ q, showErrors }) {
  const id = useId()
  const nameError = q.name.trim().length < 2 ? 'Escribe tu nombre.' : null
  const businessError = q.business.trim().length < 2 ? 'Escribe el nombre de tu negocio.' : null

  return (
    <div className="qz-datos">
      <fieldset className="qz-urgency">
        <legend className="qz-label">¿Para cuándo lo necesitas?</legend>
        {urgency.map((u) => (
          <label key={u.id} className={`qz-radio ${q.urgency === u.id ? 'is-on' : ''}`}>
            <input type="radio" name={`${id}-urgencia`} value={u.id} checked={q.urgency === u.id} onChange={() => q.setUrgency(u.id)} />
            <span className="qz-radio__text">
              <span className="qz-option__title">
                {u.name}
                {u.surcharge > 0 && <span className="qz-tag qz-tag--warn">+{Math.round(u.surcharge * 100)} %</span>}
              </span>
              <span className="qz-option__detail">{u.detail}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="qz-fields">
        <div className="qz-field">
          <label className="qz-label" htmlFor={`${id}-name`}>
            Tu nombre
          </label>
          <input
            id={`${id}-name`}
            className="qz-input"
            autoComplete="name"
            value={q.name}
            onChange={(e) => q.setName(e.target.value)}
            aria-invalid={(showErrors && Boolean(nameError)) || undefined}
            aria-describedby={showErrors && nameError ? `${id}-name-err` : undefined}
          />
          {showErrors && nameError && (
            <p id={`${id}-name-err`} className="qz-error">
              {nameError}
            </p>
          )}
        </div>
        <div className="qz-field">
          <label className="qz-label" htmlFor={`${id}-business`}>
            Nombre de tu negocio
          </label>
          <input
            id={`${id}-business`}
            className="qz-input"
            autoComplete="organization"
            value={q.business}
            onChange={(e) => q.setBusiness(e.target.value)}
            aria-invalid={(showErrors && Boolean(businessError)) || undefined}
            aria-describedby={showErrors && businessError ? `${id}-business-err` : undefined}
          />
          {showErrors && businessError && (
            <p id={`${id}-business-err`} className="qz-error">
              {businessError}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
