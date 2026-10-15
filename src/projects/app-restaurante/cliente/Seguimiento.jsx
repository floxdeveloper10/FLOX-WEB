import { AnimatePresence, motion } from 'framer-motion'
import QIcon from '../components/QIcon.jsx'
import RouteMap from '../components/RouteMap.jsx'
import { STATUSES, estimateMinutes, paymentNote, statusDetail, statusLabel } from '../pedidos.data.js'
import { usePedidosContext } from '../pedidosState.js'
import { lineDetails, lineName } from '../usePedidos.js'
import { clock } from '../format.js'

const STATUS_ICON = { recibido: 'receipt', preparacion: 'pot', listo: 'check', entregado: 'spark', rechazado: 'x' }
const SALIDA_ICON = { delivery: 'bike', recojo: 'store', mesa: 'table' }

// Una animación distinta para cada estado
const STATUS_MOTION = {
  recibido: { animate: { scale: [1, 1.08, 1] }, transition: { duration: 1.6, repeat: Infinity } },
  preparacion: { animate: { rotate: [0, -6, 6, 0] }, transition: { duration: 1.4, repeat: Infinity } },
  listo: { initial: { scale: 0.4 }, animate: { scale: 1 }, transition: { type: 'spring', stiffness: 500, damping: 14 } },
  salida: { animate: { x: [-4, 4, -4] }, transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } },
  entregado: { initial: { scale: 0.3, rotate: -40 }, animate: { scale: 1, rotate: 0 }, transition: { type: 'spring', stiffness: 300, damping: 12 } },
  rechazado: { initial: { scale: 0.6 }, animate: { scale: 1 } },
}

// Seguimiento: línea de tiempo con el estado del pedido (se actualiza sola cuando la cocina avanza)
export default function Seguimiento({ orderId, go }) {
  const { orders } = usePedidosContext()
  const order = orders.find((o) => o.id === orderId)

  if (!order) {
    return (
      <div className="qscreen__inner qempty">
        <h2 className="qtitle">No encontramos ese pedido</h2>
        <button type="button" className="qbtn qbtn--primary" onClick={() => go('pedidos')}>
          Ver mis pedidos
        </button>
      </div>
    )
  }

  const { status, type } = order
  const rejected = status === 'rechazado'
  const doneIndex = STATUSES.indexOf(status)
  const eta = order.createdAt + estimateMinutes[type] * 60 * 1000
  const icon = status === 'salida' ? SALIDA_ICON[type] : STATUS_ICON[status]
  const etaText = type === 'delivery' ? 'Llega aprox.' : type === 'recojo' ? 'Listo para recoger aprox.' : 'En tu mesa aprox.'

  return (
    <div className="qscreen__inner">
      <div className="qtrack-head">
        <button type="button" className="qiconbtn" aria-label="Volver a mis pedidos" onClick={() => go('pedidos')}>
          <QIcon name="back" />
        </button>
        <div>
          <h2 className="qtitle">Pedido #{order.id}</h2>
          <p className="qmuted">
            {type === 'delivery' ? 'Delivery' : type === 'recojo' ? 'Recojo en local' : `Mesa ${order.table}`} · {clock(order.createdAt)}
          </p>
        </div>
      </div>

      {/* Estado actual: se anuncia a los lectores de pantalla cuando cambia */}
      <section className={`qstatus qstatus--${status}`} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.span key={status} className="qstatus__icon" aria-hidden="true" {...STATUS_MOTION[status]}>
            <QIcon name={icon} strokeWidth={2.2} />
          </motion.span>
        </AnimatePresence>
        <div>
          <p className="qstatus__label">{statusLabel(status, type)}</p>
          <p className="qstatus__text">{statusDetail(status, type)}</p>
          {!rejected && status !== 'entregado' && (
            <p className="qstatus__eta">
              <QIcon name="clock" />
              {etaText} {clock(eta)}
            </p>
          )}
        </div>
      </section>

      {type === 'delivery' && !rejected && <RouteMap status={status} address={order.address} />}

      {!rejected && (
        <ol className="qtimeline" aria-label="Estados del pedido">
          {STATUSES.map((s, i) => {
            const state = i < doneIndex ? 'done' : i === doneIndex ? 'current' : 'todo'
            return (
              <li key={s} className={`qtimeline__step is-${state}`}>
                <span className="qtimeline__dot" aria-hidden="true">
                  {state !== 'todo' && <QIcon name="check" strokeWidth={3} />}
                </span>
                <span className="qtimeline__label">{statusLabel(s, type)}</span>
                <span className="qtimeline__time">{order.times[s] ? clock(order.times[s]) : ''}</span>
                <span className="q-hidden">{state === 'done' ? 'completado' : state === 'current' ? 'estado actual' : 'pendiente'}</span>
              </li>
            )
          })}
        </ol>
      )}

      <section className="qcard" aria-labelledby="qtrack-items">
        <h3 id="qtrack-items" className="qcard__title">
          Tu pedido
        </h3>
        <ul className="qlines">
          {order.items.map((it) => (
            <li key={it.key}>
              <span>
                {it.qty} × {lineName(it)}
                {lineDetails(it) && <span className="qlines__meta">{lineDetails(it)}</span>}
              </span>
              <span>S/ {it.unitPrice * it.qty}</span>
            </li>
          ))}
          {order.shipping > 0 && (
            <li>
              <span>Envío</span>
              <span>S/ {order.shipping}</span>
            </li>
          )}
        </ul>
        <p className="qlines__total">
          <span>Total</span>
          <strong>S/ {order.total}</strong>
        </p>
        <p className="qmuted">{paymentNote}</p>
      </section>
    </div>
  )
}
