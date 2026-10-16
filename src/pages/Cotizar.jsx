import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import Icon from '../components/Icon.jsx'
import useCotizador, { LAST_STEP } from '../components/cotizador/useCotizador.js'
import { StepDatos, StepExtras, StepRubro, StepServicios } from '../components/cotizador/Steps.jsx'
import Resumen, { AnimatedSoles } from '../components/cotizador/Resumen.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { estimate } from '../data/precios.js'
import { rubroBySlug } from '../data/rubros.js'
import { seo } from '../data/seo.js'
import './Cotizar.css'

const STEPS = [
  { title: '¿Qué negocio tienes?', lead: 'Elige tu rubro.', short: 'Rubro' },
  { title: '¿Qué necesitas?', lead: 'Marca uno o varios. Cada uno muestra su precio "desde".', short: 'Servicios' },
  { title: 'Extras', lead: 'Opcionales, según lo que elegiste.', short: 'Extras' },
  { title: 'Urgencia y tus datos', lead: 'Para preparar tu cotización.', short: 'Tus datos' },
  { title: 'Tu cotización', lead: 'Revisa todo y envíala por WhatsApp.', short: 'Resumen' },
]

// Qué falta para pasar al siguiente paso (null si está todo bien)
function missing(q) {
  if (q.step === 0 && !q.rubro) return 'Elige tu rubro para continuar.'
  if (q.step === 1 && q.services.length === 0) return 'Marca al menos un servicio para continuar.'
  if (q.step === 3 && (q.name.trim().length < 2 || q.business.trim().length < 2)) return 'Completa tu nombre y el de tu negocio.'
  return null
}

// /cotizar — cotizador en pasos, con total estimado y envío por WhatsApp
export default function Cotizar() {
  usePageMeta(seo.cotizar)
  const q = useCotizador()
  const [error, setError] = useState(null)
  const moved = useRef(false)
  const est = estimate(q)
  const step = STEPS[q.step]

  // Al cambiar de paso, el foco va al título del paso nuevo cuando aparece
  // (aparece después de la animación de salida del anterior)
  const focusTitle = (el) => {
    if (!el || !moved.current) return
    moved.current = false
    el.focus({ preventScroll: true })
    el.closest('.qz-card')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const goTo = (n) => {
    moved.current = true
    setError(null)
    q.setStep(n)
  }

  const next = () => {
    const problem = missing(q)
    if (problem) {
      setError(problem)
      return
    }
    goTo(Math.min(LAST_STEP, q.step + 1))
  }

  const rubro = rubroBySlug[q.rubro]
  // El aviso se quita solo apenas se corrige lo que faltaba
  const shownError = error && missing(q) ? error : null

  return (
    <>
      <PageHero
        titleId="cotizar-titulo"
        eyebrow="Cotizador"
        title="Cotiza tu proyecto"
        lead="En 4 pasos sabrás un precio referencial. Al final nos lo envías por WhatsApp y te respondemos."
      />

      <section className="section section--crema qz" aria-labelledby="cotizar-titulo">
        <div className="container qz__inner">
          <div className="qz-card">
            {/* Barra de progreso */}
            <div className="qz-progress">
              <p className="qz-progress__text">
                {q.step < LAST_STEP ? `Paso ${q.step + 1} de ${LAST_STEP}` : 'Resumen'}
                {rubro && q.step > 0 && <span className="qz-progress__rubro"> · {rubro.name}</span>}
              </p>
              <div
                className="qz-progress__bar"
                role="progressbar"
                aria-label="Avance de la cotización"
                aria-valuemin={1}
                aria-valuemax={LAST_STEP + 1}
                aria-valuenow={q.step + 1}
                aria-valuetext={`${step.short}: paso ${q.step + 1} de ${LAST_STEP + 1}`}
              >
                <motion.span className="qz-progress__fill" initial={false} animate={{ scaleX: (q.step + 1) / (LAST_STEP + 1) }} transition={{ duration: 0.4 }} />
              </div>
              <ol className="qz-progress__steps">
                {STEPS.map((s, i) => (
                  <li key={s.short} className={i < q.step ? 'is-done' : i === q.step ? 'is-current' : ''}>
                    {i < q.step ? (
                      <button type="button" className="qz-progress__link" onClick={() => goTo(i)}>
                        <span className="visually-hidden">Volver a </span>
                        {s.short}
                      </button>
                    ) : (
                      <span aria-current={i === q.step ? 'step' : undefined}>{s.short}</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={q.step}
                className="qz-step"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
              >
                <h2 ref={focusTitle} tabIndex={-1} className="qz-step__title">
                  {step.title}
                </h2>
                <p className="qz-step__lead">{step.lead}</p>

                {q.step === 0 && <StepRubro q={q} />}
                {q.step === 1 && <StepServicios q={q} />}
                {q.step === 2 && <StepExtras q={q} />}
                {q.step === 3 && <StepDatos q={q} showErrors={Boolean(shownError)} />}
                {q.step === 4 && <Resumen q={q} est={est} onEdit={goTo} />}
              </motion.div>
            </AnimatePresence>

            {shownError && (
              <p className="qz-error qz-error--step" role="alert">
                {shownError}
              </p>
            )}

            <div className="qz-nav">
              {q.step > 0 ? (
                <button type="button" className="btn btn--ghost qz-back" onClick={() => goTo(q.step - 1)}>
                  Atrás
                </button>
              ) : (
                <span />
              )}

              {q.step < LAST_STEP && q.step > 0 && (
                <p className="qz-nav__total">
                  <span>Estimado</span>
                  {est.total > 0 ? <AnimatedSoles value={est.total} className="qz-nav__value" /> : <span className="qz-nav__value">—</span>}
                  {est.hasApp && <span className="qz-nav__app">+ app</span>}
                </p>
              )}

              {q.step < LAST_STEP ? (
                <button type="button" className="btn btn--primary qz-next" onClick={next}>
                  {q.step === LAST_STEP - 1 ? 'Ver mi cotización' : 'Continuar'}
                  <Icon name="flecha" />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn--ghost qz-restart"
                  onClick={() => {
                    q.reset()
                    goTo(0)
                  }}
                >
                  Empezar de nuevo
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
