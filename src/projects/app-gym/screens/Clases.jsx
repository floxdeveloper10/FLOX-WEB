import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GymIcon from '../components/GymIcon.jsx'
import { useGym } from '../gymState.js'
import { vibrate } from '../useGymStore.js'
import { dayChip, dayName, longDate } from '../utils.js'

function spotsText(c) {
  if (c.full) return 'Clase llena'
  return c.left === 1 ? 'Queda 1 cupo' : `Quedan ${c.left} cupos`
}

function ClassCard({ c, dayLabel }) {
  const { toggleBooking, toggleWaitlist, toast } = useGym()
  // Al reservar o cancelar, el botón cambia: el foco pasa al nuevo botón (teclado y lectores)
  const wantFocus = useRef(false)
  const focusIfNeeded = (el) => {
    if (el && wantFocus.current) {
      wantFocus.current = false
      el.focus({ preventScroll: true })
    }
  }

  const book = () => {
    wantFocus.current = true
    toggleBooking(c.id)
    vibrate(20)
    toast(c.booked ? `Reserva cancelada: ${c.name}` : `¡Reservado! ${c.name}, ${dayLabel} ${c.time}`)
  }
  const wait = () => {
    toggleWaitlist(c.id)
    vibrate(20)
    toast(c.waiting ? 'Saliste de la lista de espera' : 'Te avisaremos si se libera un cupo')
  }

  return (
    <li className={`gcard gclass ${c.booked ? 'is-booked' : ''}`}>
      <span className={`gclass__bar gdot--${c.type}`} aria-hidden="true" />
      <div className="gclass__info">
        <p className="gclass__name">{c.name}</p>
        <p className="gclass__meta">
          <GymIcon name="clock" />
          {c.time} · {c.minutes} min
        </p>
        <p className="gclass__meta">
          <GymIcon name="user" />
          {c.coach}
        </p>
        <p className={`gclass__spots ${c.full ? 'is-full' : ''} ${!c.full && c.left <= 3 ? 'is-low' : ''}`}>
          <GymIcon name="users" />
          {/* El número cambia con una pequeña animación */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={`${c.left}-${c.booked}`} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.18 }}>
              {spotsText(c)}
            </motion.span>
          </AnimatePresence>
        </p>
      </div>

      <div className="gclass__action">
        {c.booked ? (
          <>
            <motion.span
              key="booked"
              className="gbtn gbtn--done gbtn--sm"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1.12, 1], opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <GymIcon name="check" strokeWidth={3} />
              Reservado
            </motion.span>
            <button ref={focusIfNeeded} type="button" className="gclass__cancel" onClick={book} aria-label={`Cancelar reserva de ${c.name}, ${c.time}`}>
              Cancelar
            </button>
          </>
        ) : c.full ? (
          <button
            type="button"
            className={`gbtn gbtn--sm ${c.waiting ? 'gbtn--waiting' : 'gbtn--outline'}`}
            aria-pressed={c.waiting}
            onClick={wait}
            aria-label={`Lista de espera para ${c.name}, ${c.time}`}
          >
            {c.waiting ? 'En espera' : 'Lista de espera'}
          </button>
        ) : (
          <button ref={focusIfNeeded} type="button" className="gbtn gbtn--primary gbtn--sm" onClick={book} aria-label={`Reservar ${c.name}, ${c.time}`}>
            Reservar
          </button>
        )}
      </div>
    </li>
  )
}

export default function Clases() {
  const { days, booked } = useGym()
  const [selected, setSelected] = useState(0)
  const day = days[selected]

  return (
    <div className="gscreen__inner">
      <header className="ghead">
        <div>
          <p className="ghead__date">{booked.length === 1 ? '1 clase reservada' : `${booked.length} clases reservadas`}</p>
          <h2 className="gscreen__title">Clases</h2>
        </div>
      </header>

      {/* Selector de días deslizable */}
      <div className="gdays" role="group" aria-label="Elige el día">
        {days.map((d, i) => {
          const chip = dayChip(d.dayIndex, d.date)
          const hasBooking = d.classes.some((c) => c.booked)
          return (
            <button
              key={d.iso}
              type="button"
              className={`gdays__day ${i === selected ? 'is-active' : ''}`}
              aria-pressed={i === selected}
              aria-label={`${longDate(d.date)}${hasBooking ? ', tienes una reserva' : ''}`}
              onClick={() => setSelected(i)}
            >
              <span className="gdays__top">{chip.top}</span>
              <span className="gdays__num">{chip.bottom}</span>
              <span className={`gdays__mark ${hasBooking ? 'is-on' : ''}`} aria-hidden="true" />
            </button>
          )
        })}
      </div>

      <p className="gsub">
        {dayName(day.dayIndex, day.date)} · {day.classes.length} clases
      </p>
      <ul className="gclasses">
        {day.classes.map((c) => (
          <ClassCard key={c.id} c={c} dayLabel={dayName(day.dayIndex, day.date).toLowerCase()} />
        ))}
      </ul>
    </div>
  )
}
