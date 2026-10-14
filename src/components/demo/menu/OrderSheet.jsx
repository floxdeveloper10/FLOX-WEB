import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DishArt from './DishArt.jsx'
import MenuIcon from './MenuIcon.jsx'
import Sheet from './Sheet.jsx'
import { allDishes, menuUi } from '../../../data/carta.js'

// Resumen del pedido: cantidades editables, total y botón para llamar al mozo.
export default function OrderSheet({ order, lang, formatPrice, onChange, onClose }) {
  const [waiterCalled, setWaiterCalled] = useState(false)
  const titleId = useId()
  const items = allDishes.filter((d) => order[d.id])
  const total = items.reduce((sum, d) => sum + d.price * order[d.id], 0)

  return (
    <Sheet labelledBy={titleId} closeLabel={menuUi.close[lang]} onClose={onClose} className="sheet--order">
      <h4 id={titleId} className="osheet__title">
        <MenuIcon name="bag" />
        {menuUi.orderTitle[lang]}
      </h4>

      <ul className="osheet__list">
        <AnimatePresence initial={false}>
          {items.map((dish) => (
            <motion.li
              key={dish.id}
              className="osheet__item"
              layout
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.2 }}
            >
              <DishArt art={dish.art} size={40} />
              <span className="osheet__info">
                <span className="osheet__name">{dish.name[lang]}</span>
                <span className="osheet__unit">{formatPrice(dish.price * order[dish.id])}</span>
              </span>
              <span className="stepper stepper--sm" role="group" aria-label={`${menuUi.quantity[lang]}: ${dish.name[lang]}`}>
                <button type="button" className="stepper__btn" onClick={() => onChange(dish.id, -1)} aria-label={menuUi.removeOne[lang]}>
                  <MenuIcon name="minus" />
                </button>
                <span className="stepper__value">{order[dish.id]}</span>
                <button type="button" className="stepper__btn" onClick={() => onChange(dish.id, 1)} aria-label={menuUi.addOne[lang]}>
                  <MenuIcon name="plus" />
                </button>
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="osheet__total">
        <span>{menuUi.total[lang]}</span>
        <strong>{formatPrice(total)}</strong>
      </div>
      <p className="osheet__hint">{menuUi.orderHint[lang]}</p>

      <button
        type="button"
        className={`menu-btn menu-btn--primary osheet__waiter ${waiterCalled ? 'is-done' : ''}`}
        onClick={() => setWaiterCalled(true)}
        aria-disabled={waiterCalled}
      >
        <MenuIcon name={waiterCalled ? 'check' : 'bell'} />
        <span aria-live="polite">{waiterCalled ? menuUi.waiterComing[lang] : menuUi.callWaiter[lang]}</span>
      </button>
      <button type="button" className="menu-btn menu-btn--ghost" onClick={onClose}>
        {menuUi.keepBrowsing[lang]}
      </button>
    </Sheet>
  )
}
