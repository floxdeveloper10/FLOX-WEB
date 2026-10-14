import { useId, useState } from 'react'
import AgenciaIcon from '../AgenciaIcon.jsx'
import { useAgencia } from '../../agenciaState.js'
import { countries } from '../../agencia.data.js'
import { isValidEmail } from '../../utils.js'

function validateTraveler(form) {
  const digits = form.whatsapp.replace(/\D/g, '')
  return {
    name: form.name.trim().length < 3 || !form.name.trim().includes(' ') ? 'name' : null,
    email: !isValidEmail(form.email) ? 'email' : null,
    country: !form.country ? 'country' : null,
    whatsapp: digits.length < 8 || /[^\d\s+()-]/.test(form.whatsapp) ? 'whatsapp' : null,
  }
}

const REQUIRED = ['name', 'email', 'country', 'whatsapp']

// Paso 1 · Tus datos (validación en vivo: el mensaje aparece al salir de cada campo)
export default function TravelerForm({ form, onChange, onNext }) {
  const { t, lang } = useAgencia()
  const c = t.checkout
  const uid = useId()
  const [touched, setTouched] = useState(() => new Set())
  const [submitted, setSubmitted] = useState(false)
  const errors = validateTraveler(form)
  const showError = (field) => (submitted || touched.has(field)) && errors[field]
  const list = countries[lang].includes(form.country) || !form.country ? countries[lang] : [form.country, ...countries[lang]]

  const set = (field) => (e) => onChange({ ...form, [field]: e.target.value })
  const blur = (field) => () => setTouched((s) => new Set(s).add(field))
  const props = (field) => ({
    id: `${uid}-${field}`,
    value: form[field],
    onChange: set(field),
    onBlur: blur(field),
    'aria-invalid': Boolean(showError(field)),
    'aria-describedby': [showError(field) && `${uid}-${field}-error`, field === 'whatsapp' && `${uid}-whatsapp-hint`, field === 'hotel' && `${uid}-hotel-hint`].filter(Boolean).join(' ') || undefined,
  })

  const error = (field) =>
    showError(field) && (
      <p id={`${uid}-${field}-error`} className="a-error">
        {c.errors[errors[field]]}
      </p>
    )

  const ok = (field) => touched.has(field) && !errors[field] && <AgenciaIcon name="check" className="acheck__ok" />

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    const first = REQUIRED.find((f) => errors[f])
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    onNext()
  }

  return (
    <form className="acheck__card acheck__form" onSubmit={onSubmit} noValidate>
      <div className="acheck__row">
        <div className="a-field">
          <label className="a-label" htmlFor={`${uid}-name`}>
            {c.name} {ok('name')}
          </label>
          <input className="a-input" type="text" autoComplete="name" {...props('name')} />
          {error('name')}
        </div>
        <div className="a-field">
          <label className="a-label" htmlFor={`${uid}-email`}>
            {c.email} {ok('email')}
          </label>
          <input className="a-input" type="email" autoComplete="email" inputMode="email" {...props('email')} />
          {error('email')}
        </div>
      </div>
      <div className="acheck__row">
        <div className="a-field">
          <label className="a-label" htmlFor={`${uid}-country`}>
            {c.country} {ok('country')}
          </label>
          <select
            className="a-input"
            autoComplete="country-name"
            {...props('country')}
            onChange={(e) => {
              onChange({ ...form, country: e.target.value })
              blur('country')()
            }}
          >
            <option value="">{c.chooseCountry}</option>
            {list.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {error('country')}
        </div>
        <div className="a-field">
          <label className="a-label" htmlFor={`${uid}-whatsapp`}>
            {c.whatsapp} {ok('whatsapp')}
          </label>
          <input className="a-input" type="tel" autoComplete="tel" inputMode="tel" placeholder="+51 900 000 000" {...props('whatsapp')} />
          <p id={`${uid}-whatsapp-hint`} className="acheck__hint">
            {c.whatsappHint}
          </p>
          {error('whatsapp')}
        </div>
      </div>
      <div className="a-field">
        <label className="a-label" htmlFor={`${uid}-hotel`}>
          {c.hotel} <span className="acheck__optional">({c.optional})</span>
        </label>
        <input className="a-input" type="text" {...props('hotel')} />
        <p id={`${uid}-hotel-hint`} className="acheck__hint">
          {c.hotelHint}
        </p>
      </div>
      <div className="a-field">
        <label className="a-label" htmlFor={`${uid}-comments`}>
          {c.comments} <span className="acheck__optional">({c.optional})</span>
        </label>
        <textarea className="a-input" placeholder={c.commentsPlaceholder} {...props('comments')} />
      </div>
      <div className="acheck__nav">
        <button type="submit" className="a-btn a-btn--primary">
          {c.next}
          <AgenciaIcon name="arrow" />
        </button>
      </div>
    </form>
  )
}
