import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { local } from '../shared/safeStorage.js'
import {
  SHIPPING,
  dayBase,
  dishById,
  dishes,
  exampleAddress,
  extras as EXTRAS,
  portions,
  promo,
  sampleAddresses,
  sampleCustomers,
  sampleNotes,
  STATUSES,
} from './pedidos.data.js'
import { ding } from './sound.js'

// Pedidos compartidos por la app del cliente y la del restaurante.
// Se guardan en el navegador y se sincronizan entre pestañas con BroadcastChannel.
const ORDERS_KEY = 'qhapaq-pedidos:pedidos'
const CART_KEY = 'qhapaq-pedidos:carrito'
const CHANNEL = 'qhapaq-pedidos'
const MIN = 60 * 1000

const pick = (list) => list[Math.floor(Math.random() * list.length)]

export function lineName(item) {
  if (item.promo) return promo.title
  return dishById[item.dishId]?.name ?? item.dishId
}

// "Para compartir (2–3) · Ají extra" o el detalle de la promo
export function lineDetails(item) {
  if (item.promo) return item.note
  const parts = []
  if (item.portion === 'compartir') parts.push(portions.find((p) => p.id === 'compartir').label)
  item.extras.forEach((id) => parts.push(EXTRAS.find((e) => e.id === id)?.label))
  return parts.filter(Boolean).join(' · ')
}

export function unitPrice(dishId, portionId, extraIds) {
  const dish = dishById[dishId]
  const portion = portions.find((p) => p.id === portionId) ?? portions[0]
  const base = Math.round(dish.price * portion.factor)
  return base + EXTRAS.filter((e) => extraIds.includes(e.id)).reduce((sum, e) => sum + e.price, 0)
}

const item = (dishId, qty = 1, extra = {}) => ({
  key: `${dishId}-${Math.random().toString(36).slice(2, 8)}`,
  dishId,
  portion: 'personal',
  extras: [],
  note: '',
  qty,
  unitPrice: unitPrice(dishId, extra.portion ?? 'personal', extra.extras ?? []),
  ...extra,
})

function totals(items, type) {
  const subtotal = items.reduce((sum, it) => sum + it.unitPrice * it.qty, 0)
  const shipping = type === 'delivery' ? SHIPPING : 0
  return { subtotal, shipping, total: subtotal + shipping }
}

function makeOrder({ id, customer, mine, type, table, address, items, createdAt, status }) {
  const times = {}
  STATUSES.slice(0, STATUSES.indexOf(status) + 1).forEach((s, i) => {
    times[s] = createdAt + i * 2 * MIN
  })
  return { id, customer, mine, type, table, address, items, createdAt, status, times, ...totals(items, type) }
}

// Al empezar, la cocina ya tiene algunos pedidos (uno lleva 17 min: su cronómetro está en rojo)
function initialOrders() {
  const now = Date.now()
  return {
    nextId: 1024,
    orders: [
      makeOrder({
        id: 1021,
        customer: 'Rosa M.',
        type: 'delivery',
        address: 'Av. El Sol 820',
        items: [item('chiriuchu', 1, { extras: ['aji'], unitPrice: unitPrice('chiriuchu', 'personal', ['aji']) }), item('chicha-morada', 2)],
        createdAt: now - 17 * MIN,
        status: 'preparacion',
      }),
      makeOrder({
        id: 1022,
        customer: 'Carlos Q.',
        type: 'mesa',
        table: 4,
        items: [item('adobo', 2, { note: 'Uno sin cebolla' }), item('mate', 2)],
        createdAt: now - 9 * MIN,
        status: 'listo',
      }),
      makeOrder({
        id: 1023,
        customer: 'Lucía V.',
        type: 'recojo',
        items: [item('rocoto', 1), item('picarones', 1)],
        createdAt: now - 2 * MIN,
        status: 'recibido',
      }),
    ],
  }
}

function loadOrders() {
  const saved = local.get(ORDERS_KEY, null)
  if (!saved || !Array.isArray(saved.orders) || typeof saved.nextId !== 'number') return initialOrders()
  return saved
}

function loadCart() {
  const saved = local.get(CART_KEY, [])
  return Array.isArray(saved) ? saved.filter((it) => it && (it.promo || dishById[it.dishId]) && it.qty > 0) : []
}

// sound: el sonido de pedidos nuevos (en /apps solo se ve la app del cliente, sin sonido)
export default function usePedidos({ sound = true } = {}) {
  const [data, setData] = useState(loadOrders)
  const [cart, setCart] = useState(loadCart)
  const [soundOn, setSoundOn] = useState(sound)
  const [fresh, setFresh] = useState([]) // pedidos recién llegados (para su animación)
  const channelRef = useRef(null)
  const fromRemote = useRef(false)
  const knownIds = useRef(null)
  const soundRef = useRef(soundOn)

  useEffect(() => {
    soundRef.current = soundOn
  }, [soundOn])

  // Canal entre pestañas: lo que pasa en una pestaña llega a las demás
  useEffect(() => {
    let channel = null
    try {
      channel = new BroadcastChannel(CHANNEL)
      channel.onmessage = (event) => {
        if (event.data?.type !== 'pedidos' || !Array.isArray(event.data.state?.orders)) return
        fromRemote.current = true
        setData(event.data.state)
      }
      channelRef.current = channel
    } catch {
      // Navegador sin BroadcastChannel: la demo funciona igual en una sola pestaña
    }
    return () => {
      try {
        channel?.close()
      } catch {
        // nada
      }
      channelRef.current = null
    }
  }, [])

  // Guardar y avisar a las otras pestañas (solo si el cambio se hizo aquí)
  useEffect(() => {
    local.set(ORDERS_KEY, data)
    if (fromRemote.current) {
      fromRemote.current = false
    } else {
      try {
        channelRef.current?.postMessage({ type: 'pedidos', state: data })
      } catch {
        // nada
      }
    }
    // Pedidos nuevos: sonido corto y animación de entrada en la cocina
    const ids = data.orders.map((o) => o.id)
    if (knownIds.current) {
      const added = data.orders.filter((o) => !knownIds.current.has(o.id) && o.status === 'recibido').map((o) => o.id)
      if (added.length) {
        if (soundRef.current) ding()
        setFresh((list) => [...list, ...added])
        setTimeout(() => setFresh((list) => list.filter((id) => !added.includes(id))), 4000)
      }
    }
    knownIds.current = new Set(ids)
  }, [data])

  useEffect(() => local.set(CART_KEY, cart), [cart])

  const addToCart = useCallback((entry) => setCart((list) => [...list, { key: `${Date.now()}-${list.length}`, ...entry }]), [])
  const addPromo = useCallback(
    () =>
      setCart((list) => [
        ...list,
        { key: `promo-${Date.now()}`, promo: true, dishId: promo.art, portion: 'personal', extras: [], note: promo.text, qty: 1, unitPrice: promo.price },
      ]),
    [],
  )
  const setQty = useCallback((key, qty) => setCart((list) => (qty <= 0 ? list.filter((it) => it.key !== key) : list.map((it) => (it.key === key ? { ...it, qty } : it)))), [])

  const placeOrder = useCallback(
    ({ type, table, address }) => {
      const id = data.nextId
      const order = makeOrder({
        id,
        customer: 'Tú (cliente de la demo)',
        mine: true,
        type,
        table: type === 'mesa' ? table : null,
        address: type === 'delivery' ? address || exampleAddress : null,
        items: cart.map((it) => ({ ...it })),
        createdAt: Date.now(),
        status: 'recibido',
      })
      setData((d) => ({ nextId: Math.max(d.nextId, id) + 1, orders: [...d.orders, order] }))
      setCart([])
      return id
    },
    [cart, data.nextId],
  )

  const updateOrder = useCallback((id, fn) => setData((d) => ({ ...d, orders: d.orders.map((o) => (o.id === id ? fn(o) : o)) })), [])

  const advance = useCallback(
    (id) =>
      updateOrder(id, (o) => {
        const next = STATUSES[STATUSES.indexOf(o.status) + 1]
        return next ? { ...o, status: next, times: { ...o.times, [next]: Date.now() } } : o
      }),
    [updateOrder],
  )

  const reject = useCallback((id) => updateOrder(id, (o) => ({ ...o, status: 'rechazado', times: { ...o.times, rechazado: Date.now() } })), [updateOrder])

  // Pedido aleatorio de otro cliente
  const simulate = useCallback(() => {
    setData((d) => {
      const type = pick(['delivery', 'delivery', 'recojo', 'mesa'])
      const count = 1 + Math.floor(Math.random() * 3)
      const chosen = [...dishes].sort(() => Math.random() - 0.5).slice(0, count)
      const items = chosen.map((dish) => {
        const extraIds = dish.food && Math.random() < 0.4 ? [pick(EXTRAS).id] : []
        const portion = dish.food && Math.random() < 0.25 ? 'compartir' : 'personal'
        return item(dish.id, 1 + Math.floor(Math.random() * 2), {
          portion,
          extras: extraIds,
          note: dish.food ? pick(sampleNotes) : '',
          unitPrice: unitPrice(dish.id, portion, extraIds),
        })
      })
      const order = makeOrder({
        id: d.nextId,
        customer: pick(sampleCustomers),
        type,
        table: type === 'mesa' ? 1 + Math.floor(Math.random() * 12) : null,
        address: type === 'delivery' ? pick(sampleAddresses) : null,
        items,
        createdAt: Date.now(),
        status: 'recibido',
      })
      return { nextId: d.nextId + 1, orders: [...d.orders, order] }
    })
  }, [])

  // "Volver a pedir": copia los platos de un pedido al carrito
  const reorder = useCallback((order) => {
    setCart((list) => [...list, ...order.items.map((it, i) => ({ ...it, key: `${Date.now()}-${i}` }))])
  }, [])

  const reset = useCallback(() => {
    knownIds.current = null
    setData(initialOrders())
    setCart([])
  }, [])

  // Resumen del día (ventas de ejemplo + los pedidos de la demo)
  const summary = useMemo(() => {
    const valid = data.orders.filter((o) => o.status !== 'rechazado')
    const counts = { ...dayBase.dishCounts }
    valid.forEach((o) => o.items.forEach((it) => (counts[it.dishId] = (counts[it.dishId] ?? 0) + it.qty)))
    const [topId] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    return {
      orders: dayBase.orders + valid.length,
      sales: dayBase.sales + valid.reduce((sum, o) => sum + o.total, 0),
      top: dishById[topId]?.name ?? topId,
    }
  }, [data.orders])

  return {
    orders: data.orders,
    cart,
    fresh,
    summary,
    soundOn,
    setSoundOn,
    addToCart,
    addPromo,
    setQty,
    placeOrder,
    advance,
    reject,
    simulate,
    reorder,
    reset,
  }
}
