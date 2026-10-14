import { useEffect, useMemo, useRef, useState } from 'react'
import AgenciaIcon from '../AgenciaIcon.jsx'
import { useAgencia } from '../../agenciaState.js'
import { addDaysISO, dayStatus, toISO, todayISO } from '../../utils.js'

const parse = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const monthKey = (d) => d.getFullYear() * 12 + d.getMonth()

/**
 * Calendario de salidas (sin librerías).
 * Solo se pueden elegir los días de salida del tour; las fechas pasadas y las agotadas no.
 * Teclado: flechas (día / semana), Inicio y Fin (semana), RePág y AvPág (mes), Enter o Espacio para elegir.
 */
export default function Calendar({ tour, value, onChange, soldOut, labelledBy, invalid }) {
  const { t, lang } = useAgencia()
  const today = todayISO()
  const firstAvailable = useMemo(() => {
    for (let i = 0; i < 120; i++) {
      const iso = addDaysISO(today, i)
      if (dayStatus(tour, iso, soldOut) === 'available') return iso
    }
    return today
  }, [tour, soldOut, today])

  const [month, setMonth] = useState(() => {
    const base = parse(value || firstAvailable)
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })
  const [focusIso, setFocusIso] = useState(value || firstAvailable)
  const keyboardMove = useRef(false)
  const gridRef = useRef(null)

  const minMonth = new Date(parse(today).getFullYear(), parse(today).getMonth(), 1)
  const maxMonth = new Date(minMonth.getFullYear(), minMonth.getMonth() + 11, 1)

  // Mover el foco al día elegido con el teclado (también al cambiar de mes)
  useEffect(() => {
    if (!keyboardMove.current) return
    keyboardMove.current = false
    gridRef.current?.querySelector(`[data-iso="${focusIso}"]`)?.focus()
  }, [focusIso, month])

  const weekdays = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(t.locale, { weekday: 'narrow' })
    const long = new Intl.DateTimeFormat(t.locale, { weekday: 'long' })
    // 2023-01-02 fue lunes: la semana empieza en lunes
    return Array.from({ length: 7 }, (_, i) => ({ short: fmt.format(new Date(2023, 0, 2 + i)), long: long.format(new Date(2023, 0, 2 + i)) }))
  }, [t.locale])

  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1)
    const offset = (first.getDay() + 6) % 7
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    const list = Array.from({ length: offset }, () => null)
    for (let d = 1; d <= daysInMonth; d++) list.push(toISO(new Date(month.getFullYear(), month.getMonth(), d)))
    while (list.length % 7) list.push(null)
    return list
  }, [month])

  const goMonth = (step) => {
    const next = new Date(month.getFullYear(), month.getMonth() + step, 1)
    if (monthKey(next) < monthKey(minMonth) || monthKey(next) > monthKey(maxMonth)) return
    setMonth(next)
  }

  const moveFocus = (iso) => {
    if (iso < today) iso = today
    const d = parse(iso)
    if (monthKey(d) > monthKey(maxMonth)) return
    keyboardMove.current = true
    setFocusIso(iso)
    if (monthKey(d) !== monthKey(month)) setMonth(new Date(d.getFullYear(), d.getMonth(), 1))
  }

  const onKeyDown = (event) => {
    const d = parse(focusIso)
    const weekday = (d.getDay() + 6) % 7
    const moves = {
      ArrowLeft: () => addDaysISO(focusIso, -1),
      ArrowRight: () => addDaysISO(focusIso, 1),
      ArrowUp: () => addDaysISO(focusIso, -7),
      ArrowDown: () => addDaysISO(focusIso, 7),
      Home: () => addDaysISO(focusIso, -weekday),
      End: () => addDaysISO(focusIso, 6 - weekday),
      PageUp: () => toISO(new Date(d.getFullYear(), d.getMonth() - 1, Math.min(d.getDate(), 28))),
      PageDown: () => toISO(new Date(d.getFullYear(), d.getMonth() + 1, Math.min(d.getDate(), 28))),
    }
    if (moves[event.key]) {
      event.preventDefault()
      moveFocus(moves[event.key]())
    }
  }

  const select = (iso) => {
    setFocusIso(iso)
    if (dayStatus(tour, iso, soldOut) === 'available') onChange(iso)
  }

  const statusText = { available: t.booking.available, soldout: t.booking.soldOutLabel, none: t.booking.noDeparture, past: t.booking.past }
  const longDate = new Intl.DateTimeFormat(t.locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const monthTitle = new Intl.DateTimeFormat(t.locale, { month: 'long', year: 'numeric' }).format(month)
  // Si el día enfocado no está en el mes visible, el primer día del mes recibe el Tab
  const tabIso = cells.includes(focusIso) ? focusIso : cells.find(Boolean)

  return (
    <div className={`acal ${invalid ? 'is-invalid' : ''}`}>
      <div className="acal__head">
        <button type="button" className="acal__nav" onClick={() => goMonth(-1)} disabled={monthKey(month) <= monthKey(minMonth)} aria-label={t.booking.prevMonth}>
          <AgenciaIcon name="prev" />
        </button>
        <p className="acal__month" aria-live="polite">
          {monthTitle}
        </p>
        <button type="button" className="acal__nav" onClick={() => goMonth(1)} disabled={monthKey(month) >= monthKey(maxMonth)} aria-label={t.booking.nextMonth}>
          <AgenciaIcon name="next" />
        </button>
      </div>

      <div ref={gridRef} className="acal__grid" role="group" aria-labelledby={labelledBy} onKeyDown={onKeyDown}>
        {weekdays.map((w) => (
          <abbr key={w.long} className="acal__weekday" title={w.long}>
            {w.short}
          </abbr>
        ))}
        {cells.map((iso, i) => {
          if (!iso) return <span key={`vacio-${i}`} className="acal__empty" aria-hidden="true" />
          const status = dayStatus(tour, iso, soldOut)
          const selected = iso === value
          const label = `${longDate.format(parse(iso))}, ${selected ? `${t.booking.selected}, ` : ''}${statusText[status]}`
          return (
            <button
              key={iso}
              type="button"
              data-iso={iso}
              className={`acal__day is-${status} ${selected ? 'is-selected' : ''} ${iso === today ? 'is-today' : ''}`}
              tabIndex={iso === tabIso ? 0 : -1}
              aria-label={label}
              aria-pressed={selected}
              aria-disabled={status !== 'available'}
              onClick={() => select(iso)}
              lang={lang}
            >
              <span>{parse(iso).getDate()}</span>
              {status === 'soldout' && <small className="acal__tag">{t.booking.soldOut}</small>}
            </button>
          )
        })}
      </div>

      <ul className="acal__legend" aria-hidden="true">
        <li>
          <i className="is-available" />
          {t.booking.legendAvailable}
        </li>
        <li>
          <i className="is-soldout" />
          {t.booking.legendSoldOut}
        </li>
        <li>
          <i className="is-none" />
          {t.booking.legendNone}
        </li>
      </ul>
    </div>
  )
}
