import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AgenciaIcon from '../components/AgenciaIcon.jsx'
import TourCard from '../components/TourCard.jsx'
import Filters from '../components/catalog/Filters.jsx'
import FilterSheet from '../components/catalog/FilterSheet.jsx'
import EmptyState from '../components/catalog/EmptyState.jsx'
import { useAgencia, useAgenciaTitle } from '../agenciaState.js'
import { durations, sorts, tours } from '../agencia.data.js'
import { categoryOf, difficultyOf, filterTours, filtersToParams, formatDate, parseFilters, sortTours } from '../utils.js'

const CLEARED = { q: '', categoria: [], duracion: '', dificultad: [], precio: null, fecha: '' }

// Catálogo de tours. Los filtros viven en la URL (#/proyectos/agencia/tours?categoria=aventura…)
// para poder compartir el enlace con los filtros aplicados.
export default function Tours() {
  const { t, lang, price } = useAgencia()
  useAgenciaTitle(t.pageTitle.tours)
  const [params, setParams] = useSearchParams()
  const filters = useMemo(() => parseFilters(params), [params])
  const [sheetOpen, setSheetOpen] = useState(false)
  const filtersButton = useRef(null)

  const update = (patch) => setParams(filtersToParams({ ...filters, ...patch }), { replace: true })
  const clear = () => update(CLEARED)
  const results = sortTours(filterTours(tours, filters), filters.orden)

  // Chips de los filtros activos (cada uno se quita con un toque)
  const chips = [
    filters.q.trim() && { key: 'q', label: t.catalog.queryChip(filters.q.trim()), remove: { q: '' } },
    ...filters.categoria.map((id) => ({ key: `c-${id}`, label: categoryOf(id).label[lang], remove: { categoria: filters.categoria.filter((x) => x !== id) } })),
    filters.duracion && { key: 'd', label: durations.find((d) => d.id === filters.duracion).label[lang], remove: { duracion: '' } },
    ...filters.dificultad.map((id) => ({ key: `f-${id}`, label: difficultyOf(id).label[lang], remove: { dificultad: filters.dificultad.filter((x) => x !== id) } })),
    filters.precio && { key: 'p', label: t.catalog.upTo(price(filters.precio)), remove: { precio: null } },
    filters.fecha && { key: 'fe', label: t.catalog.dateChip(formatDate(filters.fecha, t.locale)), remove: { fecha: '' } },
    filters.personas && { key: 'pe', label: t.catalog.peopleChip(filters.personas), remove: { personas: null } },
  ].filter(Boolean)
  const activeCount = chips.filter((c) => c.key !== 'pe').length

  const closeSheet = () => {
    setSheetOpen(false)
    requestAnimationFrame(() => filtersButton.current?.focus({ preventScroll: true }))
  }

  return (
    <>
      <section className="acat-hero" aria-labelledby="acat-title">
        <div className="a-container">
          <p className="a-eyebrow">{t.catalog.eyebrow}</p>
          <h1 id="acat-title" className="a-title">
            {t.catalog.title}
          </h1>
          <p className="a-lead">{t.catalog.lead}</p>
        </div>
      </section>

      <div className="a-container acat">
        <div className="acat__toolbar">
          <div className="acat__search">
            <label className="a-visually-hidden" htmlFor="acat-q">
              {t.catalog.searchLabel}
            </label>
            <AgenciaIcon name="search" />
            <input
              id="acat-q"
              className="a-input"
              type="search"
              placeholder={t.catalog.searchPlaceholder}
              value={filters.q}
              onChange={(e) => update({ q: e.target.value })}
              autoComplete="off"
            />
          </div>
          <button ref={filtersButton} type="button" className="a-btn a-btn--outline acat__filters-btn" onClick={() => setSheetOpen(true)} aria-haspopup="dialog">
            <AgenciaIcon name="filter" />
            {t.catalog.filters}
            {activeCount > 0 && <span className="acat__badge">{activeCount}</span>}
          </button>
          <div className="acat__sort">
            <label className="a-label" htmlFor="acat-sort">
              {t.catalog.sort}
            </label>
            <select id="acat-sort" className="a-input" value={filters.orden} onChange={(e) => update({ orden: e.target.value })}>
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label[lang]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="acat__layout">
          <aside className="acat__aside" aria-label={t.catalog.filters}>
            <div className="acat__aside-head">
              <h2 className="acat__aside-title">{t.catalog.filters}</h2>
              {activeCount > 0 && (
                <button type="button" className="acat__clear-link" onClick={clear}>
                  {t.catalog.clear}
                </button>
              )}
            </div>
            <Filters filters={filters} update={update} idPrefix="aside" />
          </aside>

          <div className="acat__results">
            <div className="acat__summary">
              <p className="acat__count" aria-live="polite">
                {t.catalog.found(results.length)}
              </p>
              {chips.length > 0 && (
                <ul className="acat__chips" aria-label={t.catalog.activeFilters}>
                  {chips.map((c) => (
                    <li key={c.key}>
                      <button type="button" className="acat__chip" onClick={() => update(c.remove)} aria-label={t.catalog.removeChip(c.label)}>
                        {c.label}
                        <AgenciaIcon name="close" />
                      </button>
                    </li>
                  ))}
                  {activeCount > 0 && (
                    <li>
                      <button type="button" className="acat__clear-link" onClick={clear}>
                        {t.catalog.clear}
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>

            {results.length === 0 ? (
              <EmptyState onClear={clear} />
            ) : (
              <motion.ul className="acat__grid" layout>
                <AnimatePresence mode="popLayout" initial={false}>
                  {results.map((tour) => (
                    <motion.li
                      key={tour.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <TourCard tour={tour} headingLevel="h2" />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {sheetOpen && <FilterSheet filters={filters} update={update} count={results.length} onClear={clear} onClose={closeSheet} />}
      </AnimatePresence>
    </>
  )
}
