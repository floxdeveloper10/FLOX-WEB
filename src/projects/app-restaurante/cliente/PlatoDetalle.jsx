import { useId, useRef, useState } from 'react'
import DishArt from '../../../components/demo/menu/DishArt.jsx'
import QIcon from '../components/QIcon.jsx'
import Stepper from '../components/Stepper.jsx'
import { dishById, extras, portions } from '../pedidos.data.js'
import { usePedidosContext } from '../pedidosState.js'
import { unitPrice } from '../usePedidos.js'

// Detalle del plato: porción, extras, nota para cocina y cantidad
export default function PlatoDetalle({ dishId, go, fly }) {
  const { addToCart } = usePedidosContext()
  const dish = dishById[dishId] ?? dishById.chiriuchu
  const [portion, setPortion] = useState('personal')
  const [chosen, setChosen] = useState([])
  const [note, setNote] = useState('')
  const [qty, setQty] = useState(1)
  const artRef = useRef(null)
  const id = useId()
  const price = unitPrice(dish.id, portion, chosen)

  const add = () => {
    addToCart({ dishId: dish.id, portion, extras: chosen, note: note.trim(), qty, unitPrice: price })
    fly(dish.art, artRef.current)
    setTimeout(() => go('inicio'), 450)
  }

  return (
    <div className="qdetail">
      <div className="qdetail__scroll">
        <div className="qdetail__hero">
          <button type="button" className="qiconbtn qdetail__back" aria-label="Volver a la carta" onClick={() => go('inicio')}>
            <QIcon name="back" />
          </button>
          <span ref={artRef} className="qdetail__art">
            <DishArt art={dish.art} size={150} />
          </span>
        </div>
        <div className="qdetail__body">
          <h2 className="qdetail__name">{dish.name}</h2>
          <p className="qdetail__price">S/ {dish.price}</p>
          <p className="qdetail__text">{dish.detail}</p>

          {dish.food && (
            <>
              <fieldset className="qfield">
                <legend className="qfield__legend">Porción</legend>
                {portions.map((p) => (
                  <label key={p.id} className={`qoption ${portion === p.id ? 'is-on' : ''}`}>
                    <input type="radio" name={`${id}-porcion`} value={p.id} checked={portion === p.id} onChange={() => setPortion(p.id)} />
                    <span className="qoption__label">{p.label}</span>
                    <span className="qoption__price">S/ {Math.round(dish.price * p.factor)}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="qfield">
                <legend className="qfield__legend">Extras</legend>
                {extras.map((e) => (
                  <label key={e.id} className={`qoption ${chosen.includes(e.id) ? 'is-on' : ''}`}>
                    <input
                      type="checkbox"
                      checked={chosen.includes(e.id)}
                      onChange={() => setChosen((list) => (list.includes(e.id) ? list.filter((x) => x !== e.id) : [...list, e.id]))}
                    />
                    <span className="qoption__label">{e.label}</span>
                    <span className="qoption__price">+ S/ {e.price}</span>
                  </label>
                ))}
              </fieldset>
            </>
          )}

          <div className="qfield">
            <label className="qfield__legend" htmlFor={`${id}-nota`}>
              Nota para cocina <span className="qmuted">(opcional)</span>
            </label>
            <textarea
              id={`${id}-nota`}
              className="qinput"
              rows={2}
              maxLength={120}
              placeholder="Ej.: sin cebolla, bien caliente…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="qdetail__bar">
        <Stepper value={qty} onChange={setQty} label={dish.name} />
        <button type="button" className="qbtn qbtn--primary qdetail__add" onClick={add}>
          Agregar · S/ {price * qty}
        </button>
      </div>
    </div>
  )
}
