import { AnimatePresence, motion } from 'framer-motion'
import DishArt from './DishArt.jsx'
import DishTags from './DishTags.jsx'
import MenuIcon from './MenuIcon.jsx'
import { menuUi } from '../../../data/carta.js'

// Tarjeta de un plato: al tocarla se abre la ficha; el botón + lo agrega al pedido.
export default function DishCard({ dish, lang, price, qty, onOpen, onAdd }) {
  const name = dish.name[lang]

  return (
    <article className="dish">
      <button type="button" className="dish__open" onClick={onOpen} aria-haspopup="dialog">
        <span className="dish__name">{name}</span>
        <span className="dish__desc">{dish.description[lang]}</span>
        <span className="dish__bottom">
          <span className="dish__price">{price}</span>
          <DishTags dish={dish} lang={lang} limit={2} />
        </span>
      </button>

      <div className="dish__media">
        <DishArt art={dish.art} size={72} className="dish__art" />
        <motion.button
          type="button"
          className="dish__add"
          onClick={onAdd}
          whileTap={{ scale: 0.85 }}
          aria-label={`${menuUi.add[lang]}: ${name}`}
        >
          <MenuIcon name="plus" />
        </motion.button>
        <AnimatePresence>
          {qty > 0 && (
            <motion.span
              key={qty}
              className="dish__qty"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            >
              {qty}
              <span className="visually-hidden"> {menuUi.inOrder[lang]}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </article>
  )
}
