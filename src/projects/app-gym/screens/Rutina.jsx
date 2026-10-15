import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GymIcon from '../components/GymIcon.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import { routine } from '../gym.data.js'
import { useGym } from '../gymState.js'
import { vibrate } from '../useGymStore.js'

const TOTAL = routine.rest * 1000

// Temporizador de descanso: cuenta regresiva circular de 60 s; al terminar vibra
function RestTimer() {
  const [remaining, setRemaining] = useState(TOTAL)
  const [endAt, setEndAt] = useState(null)
  const [finished, setFinished] = useState(false)
  const running = endAt !== null

  useEffect(() => {
    if (endAt === null) return undefined
    const id = setInterval(() => {
      const left = endAt - Date.now()
      if (left <= 0) {
        setRemaining(0)
        setEndAt(null)
        setFinished(true)
        vibrate([200, 100, 200])
      } else {
        setRemaining(left)
      }
    }, 100)
    return () => clearInterval(id)
  }, [endAt])

  const start = () => {
    const from = remaining <= 0 ? TOTAL : remaining
    setFinished(false)
    setRemaining(from)
    setEndAt(Date.now() + from)
  }
  const pause = () => {
    setRemaining(Math.max(0, endAt - Date.now()))
    setEndAt(null)
  }
  const reset = () => {
    setEndAt(null)
    setFinished(false)
    setRemaining(TOTAL)
  }

  const seconds = Math.ceil(remaining / 1000)

  return (
    <section className="gcard gtimer" aria-labelledby="gtimer-title">
      <div className="gtimer__ring">
        <ProgressRing value={remaining / TOTAL} size={112} stroke={10}>
          <strong className="gtimer__secs" role="timer" aria-live="off">
            {seconds}
          </strong>
          <span>seg</span>
        </ProgressRing>
      </div>
      <div className="gtimer__side">
        <h3 id="gtimer-title" className="gtimer__title">
          Descanso
        </h3>
        <p className="gmuted gtimer__status" aria-live="polite">
          {finished ? '¡A la siguiente serie!' : running ? 'Respira y recupera' : `${routine.rest} s entre series`}
        </p>
        <div className="gtimer__buttons">
          {running ? (
            <button type="button" className="gbtn gbtn--primary gbtn--sm" onClick={pause}>
              <GymIcon name="pause" strokeWidth={3} />
              Pausar
            </button>
          ) : (
            <button type="button" className="gbtn gbtn--primary gbtn--sm" onClick={start}>
              <GymIcon name="play" />
              {remaining < TOTAL && remaining > 0 ? 'Seguir' : 'Iniciar'}
            </button>
          )}
          <button type="button" className="giconbtn giconbtn--sm" aria-label="Reiniciar temporizador" onClick={reset}>
            <GymIcon name="reset" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default function Rutina() {
  const { done, toggleDone } = useGym()
  const total = routine.exercises.length
  const count = routine.exercises.filter((e) => done.includes(e.id)).length
  const complete = count === total

  const toggle = (id) => {
    toggleDone(id)
    vibrate(12)
  }

  return (
    <div className="gscreen__inner">
      <header className="ghead">
        <div>
          <p className="ghead__date">{routine.focus}</p>
          <h2 className="gscreen__title">{routine.title}</h2>
        </div>
      </header>

      <div className="gprogress" aria-label={`${count} de ${total} ejercicios hechos`} role="img">
        <div className="gprogress__bar">
          <motion.span className="gprogress__fill" initial={false} animate={{ scaleX: count / total }} transition={{ duration: 0.4 }} />
        </div>
        <p className="gprogress__text" aria-hidden="true">
          {count}/{total}
        </p>
      </div>

      <AnimatePresence initial={false}>
        {complete && (
          <motion.p className="gdone-banner" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <GymIcon name="star" />
            ¡Rutina completada! Desbloqueaste un logro.
          </motion.p>
        )}
      </AnimatePresence>

      <RestTimer />

      <p className="gsub">Toca cada ejercicio al terminarlo</p>
      <ul className="gexercises">
        {routine.exercises.map((e, i) => {
          const isDone = done.includes(e.id)
          return (
            <li key={e.id}>
              <button
                type="button"
                className={`gcard gexercise ${isDone ? 'is-done' : ''}`}
                aria-pressed={isDone}
                onClick={() => toggle(e.id)}
              >
                <span className="gexercise__check" aria-hidden="true">
                  {isDone ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 22 }}>
                      <GymIcon name="check" strokeWidth={3} />
                    </motion.span>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="gexercise__info">
                  <span className="gexercise__name">{e.name}</span>
                  <span className="gexercise__meta">
                    {e.sets} series × {e.reps} · {e.load}
                  </span>
                </span>
                <span className="gexercise__muscle">{e.muscle}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
