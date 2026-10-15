import QIcon from '../components/QIcon.jsx'
import { nextAction, statusLabel } from '../pedidos.data.js'
import { lineDetails, lineName } from '../usePedidos.js'
import { clock, elapsed } from '../format.js'

const TYPE = {
  delivery: { icon: 'bike', label: () => 'Delivery' },
  recojo: { icon: 'store', label: () => 'Recojo' },
  mesa: { icon: 'table', label: (o) => `Mesa ${o.table}` },
}

// Tarjeta de un pedido en la cocina: platos, extras, notas, total y cronómetro
export default function PedidoCard({ order, now, fresh, onAdvance, onReject }) {
  const ms = now - order.createdAt
  const minutes = ms / 60000
  // Verde hasta 10 min, ámbar hasta 15 y rojo si tarda más de 15
  const timer = minutes > 15 ? 'late' : minutes > 10 ? 'warn' : 'ok'
  const action = nextAction(order.status, order.type)
  const type = TYPE[order.type]

  return (
    <article className={`qk-card ${fresh ? 'is-fresh' : ''}`} aria-label={`Pedido ${order.id}`}>
      <header className="qk-card__head">
        <p className="qk-card__id">#{order.id}</p>
        <span className="qk-card__type">
          <QIcon name={type.icon} />
          {type.label(order)}
        </span>
        <span className={`qk-timer qk-timer--${timer}`} title="Tiempo desde que llegó el pedido">
          <QIcon name="clock" />
          <span className="q-hidden">Esperando hace </span>
          {elapsed(ms)}
        </span>
      </header>
      <p className="qk-card__meta">
        {clock(order.createdAt)} · {order.customer}
        {order.status === 'salida' && <span className="qk-card__state"> · {statusLabel(order.status, order.type)}</span>}
      </p>
      {order.address && (
        <p className="qk-card__meta">
          <QIcon name="pin" />
          {order.address}
        </p>
      )}

      <ul className="qk-items">
        {order.items.map((it) => (
          <li key={it.key}>
            <span className="qk-items__qty">{it.qty}×</span>
            <span className="qk-items__info">
              <span className="qk-items__name">{lineName(it)}</span>
              {lineDetails(it) && <span className="qk-items__extras">{lineDetails(it)}</span>}
              {!it.promo && it.note && (
                <span className="qk-items__note">
                  <QIcon name="note" />
                  {it.note}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <p className="qk-card__total">
        Total <strong>S/ {order.total}</strong>
      </p>

      <div className="qk-card__actions">
        {order.status === 'recibido' && (
          <button type="button" className="qbtn qbtn--ghost-light" onClick={onReject} aria-label={`Rechazar pedido ${order.id}`}>
            Rechazar
          </button>
        )}
        {action && (
          <button type="button" className="qbtn qbtn--go" onClick={onAdvance} aria-label={`${action}: pedido ${order.id}`}>
            {action}
            <QIcon name="chevron" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </article>
  )
}
