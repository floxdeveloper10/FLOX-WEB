import Difficulty from '../Difficulty.jsx'
import { useAgencia } from '../../agenciaState.js'
import { categories, difficulties, durations } from '../../agencia.data.js'
import { MAX_PRICE, MIN_PRICE } from '../../utils.js'

const toggleIn = (list, id) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])

// Filtros del catálogo: categoría, duración, dificultad y precio máximo.
// Se usan en la columna lateral (escritorio) y en el panel "Filtros" (celular).
export default function Filters({ filters, update, idPrefix }) {
  const { t, lang, price } = useAgencia()
  const max = filters.precio ?? MAX_PRICE
  const priceText = filters.precio ? t.catalog.upTo(price(filters.precio)) : t.catalog.priceAny

  return (
    <div className="afilters">
      <fieldset className="afilters__group">
        <legend className="afilters__legend">{t.catalog.category}</legend>
        <div className="afilters__pills">
          {categories.map((c) => (
            <label key={c.id} className="afilters__pill">
              <input
                type="checkbox"
                checked={filters.categoria.includes(c.id)}
                onChange={() => update({ categoria: toggleIn(filters.categoria, c.id) })}
              />
              <span>{c.label[lang]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="afilters__group">
        <legend className="afilters__legend">{t.catalog.duration}</legend>
        <div className="afilters__pills">
          {durations.map((d) => (
            <label key={d.id} className="afilters__pill">
              <input
                type="checkbox"
                checked={filters.duracion === d.id}
                onChange={() => update({ duracion: filters.duracion === d.id ? '' : d.id })}
              />
              <span>{d.label[lang]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="afilters__group">
        <legend className="afilters__legend">{t.catalog.difficulty}</legend>
        <div className="afilters__checks">
          {difficulties.map((d) => (
            <label key={d.id} className="afilters__check">
              <input
                type="checkbox"
                checked={filters.dificultad.includes(d.id)}
                onChange={() => update({ dificultad: toggleIn(filters.dificultad, d.id) })}
              />
              <Difficulty id={d.id} />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="afilters__group">
        <label className="afilters__legend" htmlFor={`${idPrefix}-price`}>
          {t.catalog.price}
        </label>
        <input
          id={`${idPrefix}-price`}
          className="afilters__range"
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step="5"
          value={max}
          aria-valuetext={priceText}
          style={{ '--fill': `${((max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%` }}
          onChange={(e) => {
            const v = Number(e.target.value)
            update({ precio: v >= MAX_PRICE ? null : v })
          }}
        />
        <p className="afilters__price" aria-hidden="true">
          <span>{price(MIN_PRICE)}</span>
          <strong>{priceText}</strong>
        </p>
      </div>
    </div>
  )
}
