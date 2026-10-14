import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Steps from '../components/checkout/Steps.jsx'
import TravelerForm from '../components/checkout/TravelerForm.jsx'
import OrderReview from '../components/checkout/OrderReview.jsx'
import ConfirmStep from '../components/checkout/ConfirmStep.jsx'
import { session } from '../../shared/safeStorage.js'
import { useAgencia, useAgenciaTitle } from '../agenciaState.js'
import { bookingCode, orderMessage, to } from '../utils.js'
// En la demo, la reserva llega al WhatsApp de FLOX (src/data/site.js).
// En la web de una agencia real, aquí iría el número de WhatsApp de la agencia.
import { whatsappLink } from '../../../data/site.js'

export const CHECKOUT_KEY = 'andes-ruta:checkout' // paso y datos del formulario (sobreviven a una recarga)
export const LAST_ORDER_KEY = 'andes-ruta:ultima-reserva' // comprobante de la última reserva

const EMPTY_FORM = { name: '', email: '', country: '', whatsapp: '', hotel: '', comments: '' }

function loadCheckout() {
  const saved = session.get(CHECKOUT_KEY, {})
  return {
    step: [1, 2, 3].includes(saved.step) ? saved.step : 1,
    form: { ...EMPTY_FORM, ...(saved.form ?? {}) },
  }
}

export default function Reserva() {
  const { t, lang, currency, price, cart, clearCart } = useAgencia()
  useAgenciaTitle(t.pageTitle2.checkout)
  const navigate = useNavigate()
  const [state, setState] = useState(loadCheckout)
  const topRef = useRef(null)
  const { step, form } = state

  useEffect(() => session.set(CHECKOUT_KEY, state), [state])

  const goStep = (next) => {
    setState((s) => ({ ...s, step: next }))
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: 'start' })
      topRef.current?.focus({ preventScroll: true })
    })
  }

  const confirm = () => {
    const code = bookingCode()
    const message = orderMessage({ code, form, items: cart, t, lang, price })
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
    session.set(LAST_ORDER_KEY, { code, form, items: cart, currency, issued: new Date().toISOString() })
    session.set(CHECKOUT_KEY, { step: 1, form: EMPTY_FORM })
    clearCart()
    navigate(to('/reserva/confirmada'))
  }

  if (cart.length === 0) {
    return (
      <section className="a-section acheck" aria-labelledby="acheck-title">
        <div className="a-container acheck__empty">
          <h1 id="acheck-title" className="a-title">
            {t.checkout.emptyTitle}
          </h1>
          <p className="a-lead">{t.checkout.emptyText}</p>
          <Link to={to('/tours')} className="a-btn a-btn--primary">
            {t.cart.explore}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="a-section acheck" aria-labelledby="acheck-title">
      <div className="a-container acheck__inner">
        <div ref={topRef} tabIndex={-1} className="acheck__top">
          <p className="a-eyebrow">{t.checkout.eyebrow}</p>
          <h1 id="acheck-title" className="a-title">
            {t.checkout.title}
          </h1>
        </div>
        <Steps step={step} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
            {step === 1 && <TravelerForm form={form} onChange={(next) => setState((s) => ({ ...s, form: next }))} onNext={() => goStep(2)} />}
            {step === 2 && <OrderReview items={cart} form={form} onEditData={() => goStep(1)} onBack={() => goStep(1)} onNext={() => goStep(3)} />}
            {step === 3 && <ConfirmStep items={cart} onBack={() => goStep(2)} onConfirm={confirm} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
