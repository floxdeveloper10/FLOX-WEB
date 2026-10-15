import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import RestaurantLogo from '../../../components/demo/RestaurantLogo.jsx'
import QIcon from '../components/QIcon.jsx'
import ConfirmSheet from '../components/ConfirmSheet.jsx'
import PedidoCard from './PedidoCard.jsx'
import { usePedidosContext } from '../pedidosState.js'
import { KITCHEN_TABS } from '../pedidos.data.js'

// Hora actual que avanza cada segundo (para los cronómetros)
function useNow() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

/**
 * App del restaurante (panel de cocina). Los pedidos llegan al instante desde la app del cliente
 * (o desde otra pestaña). La pestaña activa la controla la página, para resaltar las notas.
 */
export default function CocinaApp({ tab, onTabChange }) {
  const { orders, fresh, summary, soundOn, setSoundOn, advance, reject, simulate } = usePedidosContext()
  const now = useNow()
  const [confirm, setConfirm] = useState(null)
  const current = KITCHEN_TABS.find((t) => t.id === tab) ?? KITCHEN_TABS[0]
  const counts = Object.fromEntries(KITCHEN_TABS.map((t) => [t.id, orders.filter((o) => t.statuses.includes(o.status)).length]))
  const list = orders.filter((o) => current.statuses.includes(o.status)).sort((a, b) => a.createdAt - b.createdAt)

  const onKeyDown = (event) => {
    const i = KITCHEN_TABS.findIndex((t) => t.id === current.id)
    let next = null
    if (event.key === 'ArrowRight') next = (i + 1) % KITCHEN_TABS.length
    else if (event.key === 'ArrowLeft') next = (i - 1 + KITCHEN_TABS.length) % KITCHEN_TABS.length
    if (next === null) return
    event.preventDefault()
    onTabChange(KITCHEN_TABS[next].id)
    document.getElementById(`qk-tab-${KITCHEN_TABS[next].id}`)?.focus()
  }

  return (
    <div className="qapp qapp--cocina">
      <header className="qk-head">
        <RestaurantLogo size={34} />
        <div className="qk-head__title">
          <p className="qk-head__name">Qhapaq · Cocina</p>
          <p className="qk-head__sub">Panel del restaurante</p>
        </div>
        <button
          type="button"
          className="qiconbtn qiconbtn--dark"
          aria-pressed={soundOn}
          aria-label={soundOn ? 'Sonido de pedidos activado' : 'Sonido de pedidos desactivado'}
          onClick={() => setSoundOn(!soundOn)}
        >
          <QIcon name={soundOn ? 'sound' : 'mute'} />
        </button>
      </header>

      <dl className="qk-summary" aria-label="Resumen de hoy">
        <div>
          <dt>Pedidos</dt>
          <dd>{summary.orders}</dd>
        </div>
        <div>
          <dt>Ventas</dt>
          <dd>S/ {summary.sales.toLocaleString('es-PE')}</dd>
        </div>
        <div>
          <dt>Más vendido</dt>
          <dd className="qk-summary__top">{summary.top}</dd>
        </div>
      </dl>

      <div className="qk-tabs" role="tablist" aria-label="Pedidos por estado" onKeyDown={onKeyDown}>
        {KITCHEN_TABS.map((t) => {
          const selected = t.id === current.id
          return (
            <button
              key={t.id}
              id={`qk-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="qk-panel"
              tabIndex={selected ? 0 : -1}
              className={`qk-tab ${selected ? 'is-active' : ''}`}
              onClick={() => onTabChange(t.id)}
            >
              {t.label}
              <motion.span key={counts[t.id]} className="qk-tab__count" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 600, damping: 16 }}>
                {counts[t.id]}
              </motion.span>
            </button>
          )
        })}
      </div>

      <div id="qk-panel" role="tabpanel" aria-labelledby={`qk-tab-${current.id}`} className="qk-panel" tabIndex={-1}>
        <ul className="qk-list">
          <AnimatePresence initial={false}>
            {list.map((order) => (
              <motion.li
                key={order.id}
                layout
                initial={{ opacity: 0, x: 80, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              >
                <PedidoCard
                  order={order}
                  now={now}
                  fresh={fresh.includes(order.id)}
                  onAdvance={() => advance(order.id)}
                  onReject={() => setConfirm(order)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {list.length === 0 && (
          <p className="qk-empty">
            {current.id === 'nuevos' ? 'No hay pedidos nuevos. Haz un pedido en la app del cliente o simula uno.' : 'No hay pedidos aquí por ahora.'}
          </p>
        )}
      </div>

      <div className="qk-foot">
        <button type="button" className="qbtn qbtn--outline-light qbtn--block" onClick={simulate}>
          <QIcon name="user" />
          Simular pedido de otro cliente
        </button>
      </div>

      <AnimatePresence>
        {confirm && (
          <ConfirmSheet
            title={`¿Rechazar el pedido #${confirm.id}?`}
            text="El cliente verá que no pudimos aceptar su pedido. Esta acción no se puede deshacer."
            confirmLabel="Sí, rechazar"
            cancelLabel="No, volver"
            onCancel={() => setConfirm(null)}
            onConfirm={() => {
              reject(confirm.id)
              setConfirm(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
