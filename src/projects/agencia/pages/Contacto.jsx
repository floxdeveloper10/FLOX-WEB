import { useId, useState } from 'react'
import AgenciaIcon from '../components/AgenciaIcon.jsx'
import WhatsAppIcon from '../../../components/WhatsAppIcon.jsx'
import { useAgencia, useAgenciaTitle } from '../agenciaState.js'
import { agency, tours } from '../agencia.data.js'
import { formatDate, isValidEmail, todayISO } from '../utils.js'
// En la demo, el formulario llega al WhatsApp de FLOX (src/data/site.js).
// En la web de una agencia real, aquí iría el número de WhatsApp de la agencia.
import { openWhatsApp } from '../../../lib/whatsapp.js'

const EMPTY = { name: '', email: '', tour: '', from: '', to: '', message: '' }

export default function Contacto() {
  const { t, lang } = useAgencia()
  useAgenciaTitle(t.pageTitle.contact)
  const uid = useId()
  const [form, setForm] = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const c = t.contact

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const errors = {
    name: !form.name.trim() ? c.errors.name : null,
    email: !isValidEmail(form.email) ? c.errors.email : null,
    from: form.from && form.from < todayISO() ? c.errors.past : null,
    to: form.from && form.to && form.to < form.from ? c.errors.dates : null,
  }
  const show = (field) => submitted && errors[field]

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    const first = ['name', 'email', 'from', 'to'].find((f) => errors[f])
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    const tour = tours.find((x) => x.id === form.tour)
    const dates = form.from ? `${formatDate(form.from, t.locale)}${form.to ? ` → ${formatDate(form.to, t.locale)}` : ''}` : '—'
    const message = [
      c.wa.intro,
      '',
      `• ${c.wa.name}: ${form.name.trim()}`,
      `• ${c.wa.email}: ${form.email.trim()}`,
      `• ${c.wa.tour}: ${tour ? tour.name[lang] : c.anyTour}`,
      `• ${c.wa.dates}: ${dates}`,
      form.message.trim() ? `• ${c.wa.message}: ${form.message.trim()}` : null,
      '',
      c.wa.footer,
    ]
      .filter((line) => line !== null)
      .join('\n')
    openWhatsApp(message, 'demo-agencia')
  }

  const field = (name, label, input) => (
    <div className="a-field">
      <label className="a-label" htmlFor={`${uid}-${name}`}>
        {label}
      </label>
      {input}
      {show(name) && (
        <p id={`${uid}-${name}-error`} className="a-error">
          {errors[name]}
        </p>
      )}
    </div>
  )

  const aria = (name) => ({
    id: `${uid}-${name}`,
    'aria-invalid': Boolean(show(name)),
    'aria-describedby': show(name) ? `${uid}-${name}-error` : undefined,
  })

  return (
    <section className="a-section acontact" aria-labelledby="acontact-title">
      <div className="a-container acontact__grid">
        <div>
          <p className="a-eyebrow">{c.eyebrow}</p>
          <h1 id="acontact-title" className="a-title">
            {c.title}
          </h1>
          <p className="a-lead">{c.lead}</p>

          <form className="acontact__form" onSubmit={onSubmit} noValidate>
            <div className="acontact__row">
              {field('name', c.name, <input className="a-input" type="text" autoComplete="name" value={form.name} onChange={set('name')} {...aria('name')} />)}
              {field('email', c.email, <input className="a-input" type="email" autoComplete="email" value={form.email} onChange={set('email')} {...aria('email')} />)}
            </div>
            {field(
              'tour',
              c.tour,
              <select className="a-input" value={form.tour} onChange={set('tour')} id={`${uid}-tour`}>
                <option value="">{c.anyTour}</option>
                {tours.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name[lang]}
                  </option>
                ))}
              </select>,
            )}
            <fieldset className="acontact__dates">
              <legend className="a-label">{c.dates}</legend>
              <div className="acontact__row">
                {field('from', c.dateFrom, <input className="a-input" type="date" min={todayISO()} value={form.from} onChange={set('from')} {...aria('from')} />)}
                {field('to', c.dateTo, <input className="a-input" type="date" min={form.from || todayISO()} value={form.to} onChange={set('to')} {...aria('to')} />)}
              </div>
            </fieldset>
            {field(
              'message',
              c.message,
              <textarea className="a-input" value={form.message} onChange={set('message')} placeholder={c.messagePlaceholder} id={`${uid}-message`} />,
            )}
            <button type="submit" className="a-btn a-btn--whatsapp acontact__send">
              <WhatsAppIcon />
              {c.send}
            </button>
          </form>
        </div>

        <aside className="acontact__info">
          <div className="acontact__card">
            <h2 className="acontact__card-title">
              <AgenciaIcon name="clock" />
              {c.hoursTitle}
            </h2>
            <dl className="acontact__hours">
              {agency.hours.map((h) => (
                <div key={h.time}>
                  <dt>{h.days[lang]}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="acontact__card">
            <h2 className="acontact__card-title">
              <AgenciaIcon name="pin" />
              {c.addressTitle}
            </h2>
            <p>{agency.contact.address[lang]}</p>
          </div>
          <div className="acontact__card">
            <h2 className="acontact__card-title">
              <AgenciaIcon name="phone" />
              {c.phoneTitle}
            </h2>
            {/* Datos de ejemplo: texto sin enlace */}
            <p>{agency.contact.phone}</p>
            <p>{agency.contact.email}</p>
          </div>
          <p className="acontact__note">
            <span className="a-sample">{c.exampleNote}</span>
          </p>
        </aside>
      </div>
    </section>
  )
}
