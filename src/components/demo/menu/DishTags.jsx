import MenuIcon, { ChiliIcon } from './MenuIcon.jsx'
import { menuUi, tagLabels } from '../../../data/carta.js'

// Etiquetas de un plato: popular, nuevo, vegetariano… y los ajíes del picante.
export default function DishTags({ dish, lang, limit }) {
  const tags = limit ? dish.tags.slice(0, limit) : dish.tags

  return (
    <span className="tags">
      {tags.map((tag) => (
        <span key={tag} className={`tag tag--${tag}`}>
          {tag === 'veg' && <MenuIcon name="leaf" />}
          {tagLabels[tag][lang]}
        </span>
      ))}
      {dish.spicy > 0 && (
        <span className="tag tag--spicy" title={menuUi.spicyLevels[lang][dish.spicy]}>
          {Array.from({ length: dish.spicy }, (_, i) => (
            <ChiliIcon key={i} />
          ))}
          <span className="visually-hidden">
            {menuUi.spicyTitle[lang]}: {menuUi.spicyLevels[lang][dish.spicy]}
          </span>
        </span>
      )}
    </span>
  )
}
