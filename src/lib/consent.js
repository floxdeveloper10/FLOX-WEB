import { useSyncExternalStore } from 'react'
import { local } from '../projects/shared/safeStorage.js'
import { disableAnalytics, enableAnalytics } from './analytics.js'

// Elección de cookies del visitante, recordada en el navegador (try/catch en safeStorage).
// 'all' → acepta la medición · 'necessary' → solo necesarias · null → aún no elige (se ve el aviso)
const KEY = 'flox:cookies'
const VALID = ['all', 'necessary']

const saved = local.get(KEY, null)
let state = { choice: VALID.includes(saved) ? saved : null, bannerOpen: !VALID.includes(saved) }
const listeners = new Set()

function emit(patch) {
  state = { ...state, ...patch }
  listeners.forEach((fn) => fn())
}

const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// Al iniciar la web: si ya había aceptado antes, se carga la medición
export function initConsent() {
  if (state.choice === 'all') enableAnalytics()
}

export function setConsent(choice) {
  local.set(KEY, choice)
  if (choice === 'all') enableAnalytics()
  else disableAnalytics()
  emit({ choice, bannerOpen: false })
}

// Enlace "Cookies" del pie de página: vuelve a mostrar el aviso
export function openCookieSettings() {
  emit({ bannerOpen: true })
}

export function useConsent() {
  return useSyncExternalStore(subscribe, () => state)
}
