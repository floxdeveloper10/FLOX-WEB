import { useCallback, useEffect, useMemo, useState } from 'react'
import { local } from '../shared/safeStorage.js'
import { addDays, initialMovements, initialProducts, isoDate } from './inventario.data.js'

// Inventario guardado en el navegador (try/catch en safeStorage). Todas las cifras
// (valor, alertas, gráfico, top 5) se calculan a partir de productos y movimientos.
const STORE_KEY = 'stock-andino:estado'
const DAY = 24 * 60 * 60 * 1000

function initialState() {
  const products = initialProducts()
  const { movements, nextId } = initialMovements(products)
  return { products, movements, nextId }
}

function loadState() {
  const saved = local.get(STORE_KEY, null)
  if (!saved || !Array.isArray(saved.products) || !Array.isArray(saved.movements)) return initialState()
  return saved
}

// Días hasta el vencimiento (null si no vence)
export function daysLeft(expires, today = new Date()) {
  if (!expires) return null
  const [y, m, d] = expires.split('-').map(Number)
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.round((new Date(y, m - 1, d) - start) / DAY)
}

// Estado del stock: crítico (la mitad del mínimo o menos), bajo (menos que el mínimo),
// por vencer (7 días o menos) u OK. Un producto puede estar bajo y por vencer a la vez.
export function productStatus(p, today = new Date()) {
  const critical = p.stock <= Math.floor(p.min / 2)
  const low = !critical && p.stock < p.min
  const left = daysLeft(p.expires, today)
  const expiring = left !== null && left <= 7
  const main = critical ? 'critico' : low ? 'bajo' : expiring ? 'vence' : 'ok'
  return { critical, low, expiring, left, main }
}

export const STATUS_LABEL = { ok: 'OK', bajo: 'Stock bajo', critico: 'Crítico', vence: 'Por vencer' }

// Cantidad sugerida para pedir: lo necesario para llegar al doble del mínimo
export const suggestedQty = (p) => Math.max(0, p.min * 2 - p.stock)

export default function useInventario() {
  const [state, setState] = useState(loadState)
  const [today] = useState(() => new Date())

  useEffect(() => local.set(STORE_KEY, state), [state])

  // Devuelve { ok, error?, product? }
  const addMovement = useCallback(
    ({ code, type, qty, reason }) => {
      const product = state.products.find((p) => p.code === code)
      if (!product) return { ok: false, error: 'Elige un producto.' }
      if (!Number.isInteger(qty) || qty <= 0) return { ok: false, error: 'La cantidad debe ser un número entero mayor que 0.' }
      if (type === 'salida' && qty > product.stock) return { ok: false, error: `Solo hay ${product.stock} unidades en stock.` }
      const stock = type === 'entrada' ? product.stock + qty : product.stock - qty
      setState((s) => ({
        ...s,
        products: s.products.map((p) => (p.code === code ? { ...p, stock } : p)),
        movements: [...s.movements, { id: s.nextId, code, type, qty, reason, at: Date.now() }],
        nextId: s.nextId + 1,
      }))
      return { ok: true, product: { ...product, stock } }
    },
    [state.products],
  )

  const addProduct = useCallback((product) => {
    setState((s) => ({
      ...s,
      products: [...s.products, product],
      movements: product.stock > 0 ? [...s.movements, { id: s.nextId, code: product.code, type: 'entrada', qty: product.stock, reason: 'Stock inicial', at: Date.now() }] : s.movements,
      nextId: s.nextId + 1,
    }))
  }, [])

  const reset = useCallback(() => setState(initialState()), [])

  const stats = useMemo(() => {
    const { products, movements } = state
    const statuses = Object.fromEntries(products.map((p) => [p.code, productStatus(p, today)]))
    const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
    // Entradas vs salidas de los últimos 7 días (unidades)
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(today, i - 6)
      const from = date.getTime()
      const to = from + DAY
      const inDay = movements.filter((m) => m.at >= from && m.at < to)
      return {
        iso: isoDate(date),
        date,
        entradas: inDay.filter((m) => m.type === 'entrada').reduce((n, m) => n + m.qty, 0),
        salidas: inDay.filter((m) => m.type === 'salida').reduce((n, m) => n + m.qty, 0),
      }
    })
    const weekStart = days[0].date.getTime()
    const sold = {}
    movements
      .filter((m) => m.type === 'salida' && m.reason === 'Venta' && m.at >= weekStart)
      .forEach((m) => (sold[m.code] = (sold[m.code] ?? 0) + m.qty))
    const top = Object.entries(sold)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([code, qty]) => ({ product: products.find((p) => p.code === code), qty }))
      .filter((t) => t.product)

    return {
      statuses,
      totalValue: products.reduce((sum, p) => sum + p.stock * p.cost, 0),
      lowCount: products.filter((p) => statuses[p.code].critical || statuses[p.code].low).length,
      criticalCount: products.filter((p) => statuses[p.code].critical).length,
      expiringCount: products.filter((p) => statuses[p.code].expiring).length,
      movesToday: movements.filter((m) => m.at >= startToday).length,
      alerts: products.filter((p) => statuses[p.code].critical || statuses[p.code].low || statuses[p.code].expiring),
      days,
      top,
    }
  }, [state, today])

  return { ...state, today, stats, addMovement, addProduct, reset }
}
