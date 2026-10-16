import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import GymIcon from '../components/GymIcon.jsx'
import { whatsappLink } from '../../../data/site.js'
import { member, membership, plans } from '../gym.data.js'
import { useGym } from '../gymState.js'
import { membershipEnd, soles } from '../utils.js'

function Switch({ label, checked, onChange, icon }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className="gsetting" onClick={() => onChange(!checked)}>
      <span className="gsetting__icon" aria-hidden="true">
        <GymIcon name={icon} />
      </span>
      <span className="gsetting__label">{label}</span>
      <span className={`gswitch ${checked ? 'is-on' : ''}`} aria-hidden="true">
        <span className="gswitch__knob" />
      </span>
    </button>
  )
}

// Renovar membresía: elige un plan y continúa por WhatsApp (en la demo no hay pagos)
function RenewSheet({ onClose }) {
  const [planId, setPlanId] = useState('trimestral')
  const sheetRef = useRef(null)
  const plan = plans.find((p) => p.id === planId)

  useEffect(() => {
    sheetRef.current?.querySelector('input:checked')?.focus({ preventScroll: true })
  }, [])

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
    }
    if (event.key !== 'Tab') return
    // El foco no sale de la hoja mientras está abierta
    const items = [...sheetRef.current.querySelectorAll('input:checked, button, a[href]')]
    const first = items[0]
    const last = items.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  // En la demo llega al WhatsApp de FLOX. En la app de un gimnasio real,
  // aquí iría el número de WhatsApp del gimnasio (o su pasarela de pago).
  const message = `Hola Puma Fit, quiero renovar mi membresía: ${plan.name} (${soles(plan.price)}). Socio: ${member.fullName}, código ${member.code}. (Mensaje de la demo de FLOX)`

  return (
    <motion.div className="gsheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        ref={sheetRef}
        className="gsheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gsheet-title"
        onKeyDown={onKeyDown}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 38 }}
      >
        <span className="gsheet__grab" aria-hidden="true" />
        <div className="gsheet__head">
          <h3 id="gsheet-title" className="gcard__title">
            Renovar membresía
          </h3>
          <button type="button" className="giconbtn giconbtn--sm" aria-label="Cerrar" onClick={onClose}>
            <GymIcon name="x" />
          </button>
        </div>
        <fieldset className="gplans">
          <legend className="g-hidden">Elige tu plan</legend>
          {plans.map((p) => (
            <label key={p.id} className={`gplan ${p.id === planId ? 'is-on' : ''}`}>
              <input type="radio" name="gplan" value={p.id} checked={p.id === planId} onChange={() => setPlanId(p.id)} />
              <span className="gplan__info">
                <span className="gplan__name">
                  {p.name}
                  {p.popular && <span className="gplan__tag">Popular</span>}
                </span>
                <span className="gplan__detail">{p.detail}</span>
              </span>
              <span className="gplan__price">{soles(p.price)}</span>
            </label>
          ))}
        </fieldset>
        <a className="gbtn gbtn--primary gbtn--block" data-origen="demo-puma-fit" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
          <GymIcon name="chat" />
          Continuar por WhatsApp
        </a>
        <p className="gsheet__note">Demo: sin pagos. La renovación se coordina por WhatsApp con el gimnasio.</p>
      </motion.div>
    </motion.div>
  )
}

export default function Perfil() {
  const { theme, setTheme, logout, reset, toast, appEl } = useGym()
  const [renewing, setRenewing] = useState(false)
  const [reminders, setReminders] = useState(true)
  const renewButton = useRef(null)

  const closeRenew = () => {
    setRenewing(false)
    requestAnimationFrame(() => renewButton.current?.focus({ preventScroll: true }))
  }

  return (
    <div className="gscreen__inner">
      <header className="gprofile">
        <span className="gprofile__avatar" aria-hidden="true">
          DQ
        </span>
        <div>
          <h2 className="gscreen__title gprofile__name">{member.fullName}</h2>
          <p className="gmuted">
            Socio {member.code} · desde {member.memberSince}
          </p>
        </div>
      </header>

      <section className="gcard gplancard" aria-labelledby="gplancard-title">
        <p className="glabel">Tu plan</p>
        <h3 id="gplancard-title" className="gplancard__name">
          {membership.plan}
        </h3>
        <p className="gmuted">
          Vence el {membershipEnd()} · quedan {membership.daysLeft} días
        </p>
        <button ref={renewButton} type="button" className="gbtn gbtn--primary gbtn--block" onClick={() => setRenewing(true)}>
          Renovar membresía
        </button>
      </section>

      <section className="gcard" aria-labelledby="gdata-title">
        <h3 id="gdata-title" className="gcard__title">
          Mis datos
        </h3>
        <dl className="gdata">
          <div>
            <dt>Correo</dt>
            <dd>{member.email}</dd>
          </div>
          <div>
            <dt>Celular</dt>
            <dd>{member.phone}</dd>
          </div>
          <div>
            <dt>Objetivo</dt>
            <dd>{member.goal}</dd>
          </div>
          <div>
            <dt>Estatura</dt>
            <dd>{member.height}</dd>
          </div>
        </dl>
      </section>

      <section className="gcard gsettings" aria-labelledby="gsettings-title">
        <h3 id="gsettings-title" className="gcard__title">
          Ajustes
        </h3>
        <Switch label="Modo oscuro" icon={theme === 'dark' ? 'moon' : 'sun'} checked={theme === 'dark'} onChange={(on) => setTheme(on ? 'dark' : 'light')} />
        <Switch label="Recordatorios de clases" icon="bell" checked={reminders} onChange={setReminders} />
        <button
          type="button"
          className="gsetting"
          onClick={() => {
            reset()
            toast('Demo reiniciada')
          }}
        >
          <span className="gsetting__icon" aria-hidden="true">
            <GymIcon name="reset" />
          </span>
          <span className="gsetting__label">Reiniciar demo</span>
        </button>
        <button type="button" className="gsetting" onClick={logout}>
          <span className="gsetting__icon" aria-hidden="true">
            <GymIcon name="logout" />
          </span>
          <span className="gsetting__label">Cerrar sesión</span>
        </button>
      </section>

      {appEl && createPortal(<AnimatePresence>{renewing && <RenewSheet onClose={closeRenew} />}</AnimatePresence>, appEl)}
    </div>
  )
}
