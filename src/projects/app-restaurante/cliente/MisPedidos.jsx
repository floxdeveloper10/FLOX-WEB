import QIcon from '../components/QIcon.jsx'
import { statusLabel } from '../pedidos.data.js'
import { usePedidosContext } from '../pedidosState.js'
import { lineName } from '../usePedidos.js'
import { when } from '../format.js'

// Historial de pedidos del cliente, con "Volver a pedir"
export default function MisPedidos({ go }) {
  const { orders, reorder } = usePedidosContext()
  const mine = orders.filter((o) => o.mine).sort((a, b) => b.createdAt - a.createdAt)

  return (
    <div className="qscreen__inner">
      <h2 className="qtitle">Mis pedidos</h2>
      {mine.length === 0 ? (
        <div className="qempty qempty--inline">
          <span className="qempty__art" aria-hidden="true">
            <QIcon name="receipt" />
          </span>
          <p className="qmuted">Aún no has hecho pedidos. Cuando pidas algo, podrás seguirlo aquí.</p>
          <button type="button" className="qbtn qbtn--primary" onClick={() => go('inicio')}>
            Ver la carta
          </button>
        </div>
      ) : (
        <ul className="qorders">
          {mine.map((o) => {
            const count = o.items.reduce((n, it) => n + it.qty, 0)
            return (
              <li key={o.id} className="qcard qorder">
                <div className="qorder__head">
                  <p className="qorder__id">Pedido #{o.id}</p>
                  <span className={`qbadge qbadge--${o.status}`}>{statusLabel(o.status, o.type)}</span>
                </div>
                <p className="qmuted">
                  {when(o.createdAt)} · {count} {count === 1 ? 'plato' : 'platos'} · S/ {o.total}
                </p>
                <p className="qorder__items">{o.items.map((it) => `${it.qty} × ${lineName(it)}`).join(', ')}</p>
                <div className="qorder__actions">
                  <button type="button" className="qbtn qbtn--ghost qbtn--sm" onClick={() => go('seguimiento', o.id)}>
                    Ver seguimiento
                  </button>
                  <button
                    type="button"
                    className="qbtn qbtn--primary qbtn--sm"
                    onClick={() => {
                      reorder(o)
                      go('carrito')
                    }}
                  >
                    <QIcon name="repeat" />
                    Volver a pedir
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
