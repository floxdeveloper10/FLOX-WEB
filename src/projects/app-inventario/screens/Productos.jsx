import { useId, useState } from 'react'
import IIcon from '../components/IIcon.jsx'
import StockBar from '../components/StockBar.jsx'
import { categories, categoryLabel } from '../inventario.data.js'
import { STATUS_LABEL } from '../useInventario.js'
import { useInv } from '../invState.js'

const STATUS_FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'ok', label: 'OK' },
  { id: 'bajo', label: 'Bajo' },
  { id: 'critico', label: 'Crítico' },
  { id: 'vence', label: 'Por vencer' },
]

const SORTS = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'stock', label: 'Menos stock' },
  { id: 'vencimiento', label: 'Vence antes' },
]

function matchesStatus(st, filter) {
  if (filter === 'todos') return true
  if (filter === 'critico') return st.critical
  if (filter === 'bajo') return st.low
  if (filter === 'vence') return st.expiring
  return !st.critical && !st.low && !st.expiring
}

// Normaliza para buscar sin importar tildes ni mayúsculas
const plain = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function Productos() {
  const { products, stats, go, screen } = useInv()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('todas')
  const [status, setStatus] = useState('todos')
  const [sort, setSort] = useState('nombre')
  const id = useId()

  const q = plain(query.trim())
  const list = products
    .filter((p) => !q || plain(p.name).includes(q) || p.code.includes(q))
    .filter((p) => category === 'todas' || p.category === category)
    .filter((p) => matchesStatus(stats.statuses[p.code], status))
    .sort((a, b) => {
      if (sort === 'stock') return a.stock / a.min - b.stock / b.min
      if (sort === 'vencimiento') return (stats.statuses[a.code].left ?? 9999) - (stats.statuses[b.code].left ?? 9999)
      return a.name.localeCompare(b.name, 'es')
    })

  return (
    <div className="iscreen__inner">
      <header className="ihead">
        <div>
          <p className="ihead__eyebrow">{products.length} productos</p>
          <h2 className="ihead__title">Productos</h2>
        </div>
        <button type="button" className="ibtn ibtn--primary ibtn--sm" onClick={() => go('nuevo')}>
          <IIcon name="plus" />
          Nuevo
        </button>
      </header>

      <div className="isearch">
        <IIcon name="search" />
        <input
          type="search"
          className="isearch__input"
          placeholder="Buscar por nombre o código"
          aria-label="Buscar productos por nombre o código"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="ifilters">
        <label className="iselect">
          <span className="iselect__label">Categoría</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="todas">Todas</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="iselect">
          <span className="iselect__label">Ordenar por</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="ichips" role="group" aria-label="Filtrar por estado">
        {STATUS_FILTERS.map((f) => (
          <button key={f.id} type="button" className={`ichip ichip--${f.id}`} aria-pressed={status === f.id} onClick={() => setStatus(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <p className="imuted" role="status" id={`${id}-count`}>
        {list.length === products.length ? `Mostrando los ${list.length} productos` : `${list.length} de ${products.length} productos`}
      </p>

      <ul className="iproducts" aria-describedby={`${id}-count`}>
        {list.map((p) => {
          const st = stats.statuses[p.code]
          return (
            <li key={p.code}>
              <button type="button" className={`iproduct ${screen.highlight === p.code ? 'is-new' : ''}`} onClick={() => go('ficha', { code: p.code })}>
                <span className="iproduct__main">
                  <span className="iproduct__name">{p.name}</span>
                  <span className="iproduct__meta">
                    {categoryLabel[p.category]} · {p.code}
                  </span>
                </span>
                <span className="iproduct__level">
                  <StockBar stock={p.stock} min={p.min} status={st.main === 'vence' ? 'ok' : st.main} label={`Stock ${p.stock}, mínimo ${p.min}`} />
                  <span className="iproduct__qty">
                    <strong>{p.stock}</strong> / mín. {p.min}
                  </span>
                </span>
                <span className="iproduct__tags">
                  {st.main !== 'ok' && <span className={`itag itag--${st.main}`}>{STATUS_LABEL[st.main]}</span>}
                  {st.expiring && st.main !== 'vence' && <span className="itag itag--vence">Por vencer</span>}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      {list.length === 0 && <p className="iempty">No hay productos con esos filtros.</p>}
    </div>
  )
}
