import { useRef, useState } from 'react'
import DishArt from '../../../components/demo/menu/DishArt.jsx'
import RestaurantLogo from '../../../components/demo/RestaurantLogo.jsx'
import QIcon from '../components/QIcon.jsx'
import { dishes, menuCategories, popularIds, promo, restaurant } from '../pedidos.data.js'
import { usePedidosContext } from '../pedidosState.js'

// Inicio: promo del día, categorías deslizables y platos
export default function Inicio({ go, fly }) {
  const { addPromo } = usePedidosContext()
  const [category, setCategory] = useState('populares')
  const [added, setAdded] = useState(false)
  const promoArt = useRef(null)
  const list = category === 'populares' ? popularIds.map((id) => dishes.find((d) => d.id === id)) : dishes.filter((d) => d.category === category)

  return (
    <div className="qscreen__inner">
      <header className="qhome-head">
        <RestaurantLogo size={42} />
        <div>
          <p className="qhome-head__name">{restaurant.name}</p>
          <p className="qmuted">
            {restaurant.place} · <span className="qopen">Abierto</span>
          </p>
        </div>
      </header>

      <section className="qpromo" aria-labelledby="qpromo-title">
        <div className="qpromo__text">
          <p className="qpromo__eyebrow">
            <QIcon name="spark" />
            {promo.title}
          </p>
          <h2 id="qpromo-title" className="qpromo__title">
            {promo.text}
          </h2>
          <p className="qpromo__price">
            S/ {promo.price} <s>S/ {promo.before}</s>
          </p>
          <button
            type="button"
            className="qbtn qbtn--light qbtn--sm"
            onClick={() => {
              addPromo()
              fly(promo.art, promoArt.current)
              setAdded(true)
            }}
          >
            {added ? 'Agregar otra' : 'Agregar promo'}
          </button>
        </div>
        <span ref={promoArt} className="qpromo__art">
          <DishArt art={promo.art} size={104} />
        </span>
      </section>

      <div className="qchips" role="group" aria-label="Categorías">
        {menuCategories.map((c) => (
          <button key={c.id} type="button" className="qchip" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
            {c.label}
          </button>
        ))}
      </div>

      <h2 className="qsection-title">{menuCategories.find((c) => c.id === category).label}</h2>
      <ul className="qdishes">
        {list.map((dish) => (
          <li key={dish.id}>
            <button type="button" className="qdish" onClick={() => go('plato', dish.id)}>
              <span className="qdish__art">
                <DishArt art={dish.art} size={58} />
              </span>
              <span className="qdish__info">
                <span className="qdish__name">{dish.name}</span>
                <span className="qdish__desc">{dish.description}</span>
                <span className="qdish__price">S/ {dish.price}</span>
              </span>
              <span className="qdish__add" aria-hidden="true">
                <QIcon name="plus" strokeWidth={2.5} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
