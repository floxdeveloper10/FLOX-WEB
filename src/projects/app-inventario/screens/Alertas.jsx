import IIcon from '../components/IIcon.jsx'
import StockBar from '../components/StockBar.jsx'
import { whatsappLink } from '../../../data/site.js'
import { business } from '../inventario.data.js'
import { STATUS_LABEL, suggestedQty } from '../useInventario.js'
import { useInv } from '../invState.js'
import { expiryText, soles } from '../format.js'

// Pedido sugerido para un proveedor: cada producto bajo el mínimo hasta llegar al doble del mínimo
function orderMessage(supplier, items) {
  const lines = items.map((p) => `• ${p.name} (cód. ${p.code}): ${suggestedQty(p)} und`)
  const total = items.reduce((sum, p) => sum + suggestedQty(p) * p.cost, 0)
  return [
    `Hola ${supplier}, les escribe ${business.store}.`,
    'Quisiéramos hacer el siguiente pedido:',
    '',
    ...lines,
    '',
    `Total aproximado a costo: ${soles(total)}`,
    '¿Nos confirman disponibilidad y fecha de entrega? ¡Gracias!',
    '(Pedido generado con la demo Stock Andino de FLOX)',
  ].join('\n')
}

// Productos bajo el mínimo o por vencer, con pedido sugerido al proveedor por WhatsApp
export default function Alertas() {
  const { stats, go } = useInv()
  const low = stats.alerts.filter((p) => stats.statuses[p.code].critical || stats.statuses[p.code].low)
  const expiring = stats.alerts.filter((p) => stats.statuses[p.code].expiring).sort((a, b) => stats.statuses[a.code].left - stats.statuses[b.code].left)
  const bySupplier = low.reduce((acc, p) => {
    ;(acc[p.supplier] ??= []).push(p)
    return acc
  }, {})

  return (
    <div className="iscreen__inner">
      <header className="ihead">
        <div>
          <p className="ihead__eyebrow">{stats.alerts.length} productos necesitan atención</p>
          <h2 className="ihead__title">Alertas</h2>
        </div>
      </header>

      <section aria-labelledby="ilow-title" className="ialerts">
        <h3 id="ilow-title" className="isub">
          <IIcon name="alert" />
          Bajo el stock mínimo ({low.length})
        </h3>
        {low.length === 0 && <p className="iempty">Todo el stock está sobre el mínimo.</p>}
        {Object.entries(bySupplier).map(([supplier, items]) => (
          <article key={supplier} className="icard isupplier">
            <header className="isupplier__head">
              <span className="isupplier__icon" aria-hidden="true">
                <IIcon name="truck" />
              </span>
              <div>
                <h4 className="isupplier__name">{supplier}</h4>
                <p className="imuted">
                  Pedido sugerido: {items.length} {items.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            </header>
            <ul className="ialert-list">
              {items.map((p) => {
                const st = stats.statuses[p.code]
                return (
                  <li key={p.code} className="ialert">
                    <button type="button" className="ialert__name" onClick={() => go('ficha', { code: p.code })}>
                      {p.name}
                    </button>
                    <span className={`itag itag--${st.main}`}>{STATUS_LABEL[st.main]}</span>
                    <StockBar stock={p.stock} min={p.min} status={st.main} label={`Stock ${p.stock}, mínimo ${p.min}`} />
                    <span className="ialert__qty">
                      {p.stock} / mín. {p.min} · pedir <strong>{suggestedQty(p)}</strong>
                    </span>
                  </li>
                )
              })}
            </ul>
            {/* En la demo el pedido llega al WhatsApp de FLOX. En la app de un negocio real,
                aquí iría el número de WhatsApp de cada proveedor. */}
            <a className="ibtn ibtn--wa" data-origen="demo-stock-andino" href={whatsappLink(orderMessage(supplier, items))} target="_blank" rel="noopener noreferrer">
              <IIcon name="chat" />
              Pedir al proveedor
            </a>
          </article>
        ))}
      </section>

      <section aria-labelledby="iexp-title" className="ialerts">
        <h3 id="iexp-title" className="isub">
          <IIcon name="clock" />
          Por vencer en 7 días ({expiring.length})
        </h3>
        {expiring.length === 0 ? (
          <p className="iempty">Nada por vencer esta semana.</p>
        ) : (
          <ul className="icard ialert-list">
            {expiring.map((p) => (
              <li key={p.code} className="ialert ialert--exp">
                <button type="button" className="ialert__name" onClick={() => go('ficha', { code: p.code })}>
                  {p.name}
                </button>
                <span className="itag itag--vence">{expiryText(stats.statuses[p.code].left)}</span>
                <span className="ialert__qty">
                  {p.stock} und · sugerencia: ofertar o rotar al frente
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
