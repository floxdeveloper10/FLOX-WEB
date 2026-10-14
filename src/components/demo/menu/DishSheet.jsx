import { useId, useState } from 'react'
import DishArt from './DishArt.jsx'
import DishTags from './DishTags.jsx'
import MenuIcon, { ChiliIcon } from './MenuIcon.jsx'
import Sheet from './Sheet.jsx'
import { allergenLabels, menuUi } from '../../../data/carta.js'

// Ficha completa de un plato: ilustración grande, descripción, picante, alérgenos y cantidad.
export default function DishSheet({ dish, lang, formatPrice, onAdd, onClose }) {
  const [qty, setQty] = useState(1)
  const titleId = useId()
  const name = dish.name[lang]

  return (
    <Sheet labelledBy={titleId} closeLabel={menuUi.close[lang]} onClose={onClose} className="sheet--dish">
      <div className="dsheet__hero">
        <DishArt art={dish.art} size={132} />
      </div>

      <div className="dsheet__head">
        <h4 id={titleId} className="dsheet__name">
          {name}
        </h4>
        <span className="dsheet__price">{formatPrice(dish.price)}</span>
      </div>
      <DishTags dish={dish} lang={lang} />
      <p className="dsheet__detail">{dish.detail[lang]}</p>

      <dl className="dsheet__facts">
        <div>
          <dt>{menuUi.spicyTitle[lang]}</dt>
          <dd>
            {dish.spicy > 0 && (
              <span className="dsheet__chilis">
                {Array.from({ length: dish.spicy }, (_, i) => (
                  <ChiliIcon key={i} />
                ))}
              </span>
            )}
            {menuUi.spicyLevels[lang][dish.spicy]}
          </dd>
        </div>
        <div>
          <dt>{menuUi.allergensTitle[lang]}</dt>
          <dd className="dsheet__allergens">
            {dish.allergens.length === 0
              ? menuUi.noAllergens[lang]
              : dish.allergens.map((a) => (
                  <span key={a} className="dsheet__allergen">
                    {allergenLabels[a][lang]}
                  </span>
                ))}
          </dd>
        </div>
      </dl>

      <div className="dsheet__actions">
        <div className="stepper" role="group" aria-label={menuUi.quantity[lang]}>
          <button
            type="button"
            className="stepper__btn"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty === 1}
            aria-label={menuUi.removeOne[lang]}
          >
            <MenuIcon name="minus" />
          </button>
          <span className="stepper__value" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            className="stepper__btn"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            aria-label={menuUi.addOne[lang]}
          >
            <MenuIcon name="plus" />
          </button>
        </div>
        <button
          type="button"
          className="menu-btn menu-btn--primary dsheet__add"
          onClick={() => {
            onAdd(qty)
            onClose()
          }}
        >
          <span>{menuUi.addToOrder[lang]}</span>
          <span>{formatPrice(dish.price * qty)}</span>
        </button>
      </div>
    </Sheet>
  )
}
