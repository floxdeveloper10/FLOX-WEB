import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { local } from '../../projects/shared/safeStorage.js'
import { extras as EXTRAS, planById, serviceById, urgency } from '../../data/precios.js'
import { rubroBySlug } from '../../data/rubros.js'

// Estado del cotizador, guardado en el navegador (try/catch en safeStorage): si recargas, sigue igual.
// Si llegas desde una página de rubro (/cotizar?rubro=…), ese rubro ya queda elegido.
const KEY = 'flox:cotizador'
export const LAST_STEP = 5 // 0 rubro · 1 servicios · 2 extras · 3 datos · 4 plan mensual · 5 resumen

// plan: id de un plan de mantenimiento o 'none' ("Por ahora no")
const EMPTY = { step: 0, rubro: null, services: [], extras: [], urgency: 'normal', name: '', business: '', plan: 'none' }
const strings = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [])
const text = (v) => (typeof v === 'string' ? v.slice(0, 80) : '')

function load(rubroFromUrl) {
  const saved = local.get(KEY, null) ?? {}
  const state = {
    step: Number.isInteger(saved.step) && saved.step >= 0 && saved.step <= LAST_STEP ? saved.step : 0,
    rubro: rubroBySlug[saved.rubro] ? saved.rubro : null,
    services: strings(saved.services).filter((id) => serviceById[id]),
    extras: strings(saved.extras).filter((id) => EXTRAS.some((e) => e.id === id)),
    urgency: urgency.some((u) => u.id === saved.urgency) ? saved.urgency : 'normal',
    name: text(saved.name),
    business: text(saved.business),
    plan: planById[saved.plan] ? saved.plan : 'none',
  }
  // Desde una página de rubro: ese rubro elegido y se empieza por el primer paso
  if (rubroBySlug[rubroFromUrl] && rubroFromUrl !== state.rubro) return { ...state, rubro: rubroFromUrl, step: 0 }
  // Nunca quedarse en un paso sin lo que pide el anterior
  if (!state.rubro) state.step = 0
  else if (state.step > 1 && state.services.length === 0) state.step = 1
  else if (state.step >= 4 && (state.name.trim().length < 2 || state.business.trim().length < 2)) state.step = 3
  return state
}

const toggle = (list, id) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])

export default function useCotizador() {
  const [params, setParams] = useSearchParams()
  const [state, setState] = useState(() => load(params.get('rubro')))

  useEffect(() => local.set(KEY, state), [state])

  // El rubro de la dirección ya se usó: se quita para que al recargar mande lo guardado
  useEffect(() => {
    if (params.get('rubro')) setParams({}, { replace: true })
  }, [params, setParams])

  const set = useCallback((patch) => setState((s) => ({ ...s, ...patch })), [])

  return {
    ...state,
    setStep: (step) => set({ step }),
    setRubro: (rubro) => set({ rubro }),
    toggleService: (id) => setState((s) => ({ ...s, services: toggle(s.services, id) })),
    toggleExtra: (id) => setState((s) => ({ ...s, extras: toggle(s.extras, id) })),
    setUrgency: (id) => set({ urgency: id }),
    setName: (name) => set({ name: text(name) }),
    setBusiness: (business) => set({ business: text(business) }),
    setPlan: (plan) => set({ plan }),
    reset: () => setState(EMPTY),
  }
}
