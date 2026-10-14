import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AgenciaIcon from '../AgenciaIcon.jsx'
import { useAgencia } from '../../agenciaState.js'
import { MAX_PEOPLE, tours } from '../../agencia.data.js'
import { EMPTY_FILTERS, filtersToParams, to, todayISO } from '../../utils.js'

// Buscador de la portada: destino o tour, fecha y personas → catálogo con esos filtros.
export default function HeroSearch() {
  const { t, lang } = useAgencia()
  const navigate = useNavigate()
  const uid = useId()
  const [q, setQ] = useState('')
  const [fecha, setFecha] = useState('')
  const [personas, setPersonas] = useState(2)

  const onSubmit = (event) => {
    event.preventDefault()
    const params = filtersToParams({ ...EMPTY_FILTERS, q: q.trim(), fecha: fecha >= todayISO() ? fecha : '', personas })
    navigate(`${to('/tours')}?${params}`)
  }

  return (
    <form className="asearch" onSubmit={onSubmit} aria-label={t.search.label}>
      <div className="a-field asearch__field asearch__field--q">
        <label className="a-label" htmlFor={`${uid}-q`}>
          {t.search.destination}
        </label>
        <div className="asearch__control">
          <AgenciaIcon name="search" />
          <input
            id={`${uid}-q`}
            className="a-input"
            type="search"
            list={`${uid}-tours`}
            placeholder={t.search.destinationPlaceholder}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
          />
          <datalist id={`${uid}-tours`}>
            {tours.map((tour) => (
              <option key={tour.id} value={tour.name[lang]} />
            ))}
          </datalist>
        </div>
      </div>
      <div className="a-field asearch__field">
        <label className="a-label" htmlFor={`${uid}-date`}>
          {t.search.date}
        </label>
        <div className="asearch__control">
          <AgenciaIcon name="calendar" />
          <input id={`${uid}-date`} className="a-input" type="date" min={todayISO()} value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
      </div>
      <div className="a-field asearch__field">
        <label className="a-label" htmlFor={`${uid}-people`}>
          {t.search.people}
        </label>
        <div className="asearch__control">
          <AgenciaIcon name="users" />
          <select id={`${uid}-people`} className="a-input" value={personas} onChange={(e) => setPersonas(Number(e.target.value))}>
            {Array.from({ length: MAX_PEOPLE }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {t.search.peopleOption(n)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="a-btn a-btn--primary asearch__submit">
        <AgenciaIcon name="search" />
        {t.search.button}
      </button>
    </form>
  )
}
