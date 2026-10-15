import IIcon from '../components/IIcon.jsx'
import StockBar from '../components/StockBar.jsx'
import { categoryLabel } from '../inventario.data.js'
import { STATUS_LABEL, suggestedQty } from '../useInventario.js'
import { useInv } from '../invState.js'
import { dateTime, expiryText, shortDate, soles } from '../format.js'

// Ficha del producto con su historial de movimientos
export default function Ficha({ code }) {
  const { products, movements, stats, go } = useInv()
  const p = products.find((x) => x.code === code)

  if (!p) {
    return (
      <div className="iscreen__inner">
        <p className="iempty">No encontramos ese producto.</p>
        <button type="button" className="ibtn ibtn--primary" onClick={() => go('productos')}>
          Ver productos
        </button>
      </div>
    )
  }

  const st = stats.statuses[p.code]
  const margin = ((p.price - p.cost) / p.price) * 100
  const history = movements.filter((m) => m.code === p.code).sort((a, b) => b.at - a.at)

  return (
    <div className="iscreen__inner">
      <header className="ihead ihead--back">
        <button type="button" className="iiconbtn" aria-label="Volver a productos" onClick={() => go('productos')}>
          <IIcon name="back" />
        </button>
        <div>
          <p className="ihead__eyebrow">
            {categoryLabel[p.category]} · {p.code}
          </p>
          <h2 className="ihead__title ihead__title--sm">{p.name}</h2>
        </div>
      </header>

      <section className="icard ifile">
        <div className="ifile__stock">
          <p className="ifile__big">
            {p.stock} <span>und</span>
          </p>
          <span className={`itag itag--${st.main}`}>{STATUS_LABEL[st.main]}</span>
        </div>
        <StockBar stock={p.stock} min={p.min} status={st.main === 'vence' ? 'ok' : st.main} />
        <p className="imuted">
          Stock mínimo: {p.min} und
          {(st.critical || st.low) && ` · Pedido sugerido: ${suggestedQty(p)} und`}
        </p>
        <dl className="ifile__data">
          <div>
            <dt>Costo</dt>
            <dd>{soles(p.cost)}</dd>
          </div>
          <div>
            <dt>Precio de venta</dt>
            <dd>{soles(p.price)}</dd>
          </div>
          <div>
            <dt>Margen</dt>
            <dd>{margin.toFixed(0)} %</dd>
          </div>
          <div>
            <dt>Proveedor</dt>
            <dd>{p.supplier}</dd>
          </div>
          <div>
            <dt>Vencimiento</dt>
            <dd>
              {shortDate(p.expires)}
              {p.expires && <span className={st.expiring ? 'ifile__warn' : 'imuted'}> · {expiryText(st.left)}</span>}
            </dd>
          </div>
          <div>
            <dt>Valor en stock</dt>
            <dd>{soles(p.stock * p.cost)}</dd>
          </div>
        </dl>
        <div className="ifile__actions">
          <button type="button" className="ibtn ibtn--in" onClick={() => go('movimiento', { code: p.code, type: 'entrada' })}>
            <IIcon name="arrowIn" />
            Registrar entrada
          </button>
          <button type="button" className="ibtn ibtn--out" onClick={() => go('movimiento', { code: p.code, type: 'salida' })}>
            <IIcon name="arrowOut" />
            Registrar salida
          </button>
        </div>
      </section>

      <section className="icard" aria-labelledby="ihist-title">
        <h3 id="ihist-title" className="icard__title">
          Historial de movimientos
        </h3>
        {history.length === 0 ? (
          <p className="imuted">Todavía no hay movimientos de este producto.</p>
        ) : (
          <ul className="ihistory">
            {history.slice(0, 12).map((m) => (
              <li key={m.id} className={`ihistory__item ihistory__item--${m.type}`}>
                <span className="ihistory__icon" aria-hidden="true">
                  <IIcon name={m.type === 'entrada' ? 'arrowIn' : 'arrowOut'} />
                </span>
                <span className="ihistory__info">
                  <span className="ihistory__reason">{m.reason}</span>
                  <span className="imuted">{dateTime(m.at)}</span>
                </span>
                <span className="ihistory__qty">
                  {m.type === 'entrada' ? '+' : '−'}
                  {m.qty}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
