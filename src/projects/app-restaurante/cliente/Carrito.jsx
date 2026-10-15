import { useId, useState } from 'react'
import DishArt from '../../../components/demo/menu/DishArt.jsx'
import QIcon from '../components/QIcon.jsx'
import Stepper from '../components/Stepper.jsx'
import { SHIPPING, TABLES, dishById, exampleAddress, orderTypes, paymentNote } from '../pedidos.data.js'
import { usePedidosContext } from '../pedidosState.js'
import { lineDetails, lineName } from '../usePedidos.js'

const TYPE_ICONS = { delivery: 'bike', recojo: 'store', mesa: 'table' }

// Carrito: cantidades, tipo de pedido y total. El pago es al recibir (sin campos de pago).
export default function Carrito({ go }) {
  const { cart, setQty, placeOrder } = usePedidosContext()
  const [type, setType] = useState('delivery')
  const [table, setTable] = useState(5)
  const [address, setAddress] = useState(exampleAddress)
  const [error, setError] = useState('')
  const id = useId()

  const subtotal = cart.reduce((sum, it) => sum + it.unitPrice * it.qty, 0)
  const shipping = type === 'delivery' ? SHIPPING : 0

  const submit = () => {
    if (type === 'delivery' && !address.trim()) {
      setError('Escribe la dirección de entrega.')
      document.getElementById(`${id}-dir`)?.focus()
      return
    }
    const orderId = placeOrder({ type, table, address: address.trim() })
    go('seguimiento', orderId)
  }

  if (!cart.length) {
    return (
      <div className="qscreen__inner qempty">
        <span className="qempty__art" aria-hidden="true">
          <QIcon name="cart" />
        </span>
        <h2 className="qtitle">Tu carrito está vacío</h2>
        <p className="qmuted">Elige algo rico de la carta.</p>
        <button type="button" className="qbtn qbtn--primary" onClick={() => go('inicio')}>
          Ver la carta
        </button>
      </div>
    )
  }

  return (
    <div className="qscreen__inner">
      <h2 className="qtitle">Tu pedido</h2>

      <ul className="qcart">
        {cart.map((it) => (
          <li key={it.key} className="qcart__item">
            <span className="qcart__art">
              <DishArt art={dishById[it.dishId]?.art} size={44} />
            </span>
            <span className="qcart__info">
              <span className="qcart__name">{lineName(it)}</span>
              {lineDetails(it) && <span className="qcart__meta">{lineDetails(it)}</span>}
              {!it.promo && it.note && <span className="qcart__note">“{it.note}”</span>}
              <span className="qcart__price">S/ {it.unitPrice * it.qty}</span>
            </span>
            <Stepper value={it.qty} min={0} onChange={(q) => setQty(it.key, q)} label={lineName(it)} size="sm" />
          </li>
        ))}
      </ul>

      <fieldset className="qfield">
        <legend className="qfield__legend">¿Cómo lo quieres?</legend>
        <div className="qtypes">
          {orderTypes.map((t) => (
            <label key={t.id} className={`qtype ${type === t.id ? 'is-on' : ''}`}>
              <input type="radio" name={`${id}-tipo`} value={t.id} checked={type === t.id} onChange={() => setType(t.id)} />
              <QIcon name={TYPE_ICONS[t.id]} />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {type === 'delivery' && (
        <div className="qfield">
          <label className="qfield__legend" htmlFor={`${id}-dir`}>
            Dirección de entrega
          </label>
          <input
            id={`${id}-dir`}
            className="qinput"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
              setError('')
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-err` : undefined}
          />
          {error && (
            <p id={`${id}-err`} className="qerror" role="alert">
              {error}
            </p>
          )}
        </div>
      )}

      {type === 'mesa' && (
        <div className="qfield">
          <label className="qfield__legend" htmlFor={`${id}-mesa`}>
            Número de mesa
          </label>
          <select id={`${id}-mesa`} className="qinput" value={table} onChange={(e) => setTable(Number(e.target.value))}>
            {TABLES.map((n) => (
              <option key={n} value={n}>
                Mesa {n}
              </option>
            ))}
          </select>
        </div>
      )}

      {type === 'recojo' && <p className="qhint">Recógelo en la picantería: Cuesta San Blas 115, Cusco.</p>}

      <dl className="qtotals">
        <div>
          <dt>Subtotal</dt>
          <dd>S/ {subtotal}</dd>
        </div>
        {type === 'delivery' && (
          <div>
            <dt>Envío</dt>
            <dd>S/ {shipping}</dd>
          </div>
        )}
        <div className="qtotals__total">
          <dt>Total</dt>
          <dd>S/ {subtotal + shipping}</dd>
        </div>
      </dl>

      <p className="qpay">
        <QIcon name="receipt" />
        {paymentNote}
      </p>

      <button type="button" className="qbtn qbtn--primary qbtn--block qbtn--lg" onClick={submit}>
        Hacer pedido · S/ {subtotal + shipping}
      </button>
    </div>
  )
}
